/**
 * Auto-pagination utility:
 * When Auto Paginate is ON (default ON) and blocks do not fit within the preset height,
 * cleanly moves whole blocks to continuation pages titled "[Title] (contd.)",
 * strictly keeping sub-headings attached to their first bullet, and never cutting blocks in half.
 */

export function estimateItemHeight(item) {
  if (!item) return 0;
  const lineCount = (text) => (text ? Math.max(1, Math.ceil(text.length / 32)) : 1);

  if (item.type === 'heading') return 65;
  if (item.type === 'law') return 60 + lineCount(item.text) * 28;
  if (item.type === 'formula') return 54;
  if (item.type === 'note') return 56 + lineCount(item.text) * 26;
  if (item.type === 'bullet') {
    const hasFrac = item.text && /\{[^{}]+\/[^{}]+\}/.test(item.text);
    const lines = lineCount(item.text);
    return (hasFrac ? 44 : 34) + (lines - 1) * 28;
  }
  if (item.type === 'must') {
    const count = item.items ? item.items.length : 1;
    return 60 + count * 40;
  }
  if (item.type === 'board') {
    const count = item.items ? item.items.length : 1;
    return 60 + count * 46;
  }
  if (item.type === 'table') {
    const rowCount = item.rows ? item.rows.length : 1;
    return 60 + 38 + rowCount * 36;
  }
  if (item.type === 'text') {
    return 30 + lineCount(item.text) * 26;
  }
  return 36;
}

export function autoPaginatePages(rawPages, preset, styles) {
  if (!styles.autoPaginate || !rawPages || rawPages.length === 0) {
    return rawPages;
  }

  // Safe content budget excluding header (~85px), pinned footer (~65px), padding (~52px), and gaps (~40px)
  const availableContentHeight = Math.max(340, preset.height - 280);
  const isMobile = preset.isMobile !== false;

  const paginatedPages = [];

  for (let pIdx = 0; pIdx < rawPages.length; pIdx++) {
    const origPage = rawPages[pIdx];
    const baseTitle = (origPage.title || 'Revision Notes').replace(/\s*\(contd\.\)$/i, '').trim();

    if (isMobile) {
      // Mobile Mode: Single column flow: left blocks then right blocks
      const leftItems = [...(origPage.left || [])];
      const rightGraphs = [...(origPage.right?.graphs || [])];
      const rightTables = [...(origPage.right?.tables || [])];
      const rightCustom = [...(origPage.right?.customItems || [])];
      const rightQuestions = [...(origPage.right?.questions || [])];
      const rightRemember = origPage.right?.remember || null;

      // Group graphs into rows (1 or 2 per row depending on styles.graphsPerRow)
      const perRow = styles.graphsPerRow || 2;
      const graphRows = [];
      for (let g = 0; g < rightGraphs.length; g += perRow) {
        graphRows.push(rightGraphs.slice(g, g + perRow));
      }

      let currentSheet = {
        title: baseTitle,
        left: [],
        right: {
          graphs: [],
          tables: [],
          customItems: [],
          questions: [],
          remember: null,
        },
      };
      let currentHeight = 0;
      let sheetCountForRawPage = 0;

      const finishCurrentSheet = () => {
        paginatedPages.push(currentSheet);
        sheetCountForRawPage++;
        currentSheet = {
          title: `${baseTitle}`,
          left: [],
          right: {
            graphs: [],
            tables: [],
            customItems: [],
            questions: [],
            remember: null,
          },
        };
        currentHeight = 0;
      };

      // 1. Process left items
      for (let i = 0; i < leftItems.length; i++) {
        const item = leftItems[i];
        let itemH = estimateItemHeight(item);

        // Sub-heading rule: A sub-heading stays with its first content item (bullet, law, formula, etc.)
        if (item.type === 'heading' && i + 1 < leftItems.length) {
          const nextItemH = estimateItemHeight(leftItems[i + 1]);
          if (currentHeight + itemH + nextItemH > availableContentHeight && currentHeight > 0) {
            finishCurrentSheet();
          }
          currentSheet.left.push(item);
          currentHeight += itemH;
          continue;
        }

        if (currentHeight + itemH > availableContentHeight && currentHeight > 0) {
          finishCurrentSheet();
        }

        currentSheet.left.push(item);
        currentHeight += itemH;
      }

      // 2. Process right graphs (in rows)
      for (let r = 0; r < graphRows.length; r++) {
        const rowGraphs = graphRows[r];
        const rowH = 240; // calibrated graph row height

        if (currentHeight + rowH > availableContentHeight && currentHeight > 0) {
          finishCurrentSheet();
        }

        currentSheet.right.graphs.push(...rowGraphs);
        currentHeight += rowH;
      }

      // 3. Process right tables
      for (let t = 0; t < rightTables.length; t++) {
        const tbl = rightTables[t];
        const tblH = 60 + 38 + (tbl.rows ? tbl.rows.length * 36 : 36);

        if (currentHeight + tblH > availableContentHeight && currentHeight > 0) {
          finishCurrentSheet();
        }

        currentSheet.right.tables.push(tbl);
        currentHeight += tblH;
      }

      // 4. Process custom right items
      for (let c = 0; c < rightCustom.length; c++) {
        const cItem = rightCustom[c];
        const cH = estimateItemHeight(cItem);

        if (currentHeight + cH > availableContentHeight && currentHeight > 0) {
          finishCurrentSheet();
        }

        currentSheet.right.customItems.push(cItem);
        currentHeight += cH;
      }

      // 5. Process Madhyamik Questions
      if (rightQuestions.length > 0) {
        const qH = 54 + rightQuestions.length * 44;

        if (currentHeight + qH > availableContentHeight && currentHeight > 0) {
          finishCurrentSheet();
        }

        currentSheet.right.questions.push(...rightQuestions);
        currentHeight += qH;
      }

      // 6. Process Remember Box
      if (rightRemember) {
        const remH = 80;

        if (currentHeight + remH > availableContentHeight && currentHeight > 0) {
          finishCurrentSheet();
        }

        currentSheet.right.remember = rightRemember;
        currentHeight += remH;
      }

      // Push final sheet if it has content or if no sheets pushed yet
      const hasContent =
        currentSheet.left.length > 0 ||
        currentSheet.right.graphs.length > 0 ||
        currentSheet.right.tables.length > 0 ||
        currentSheet.right.customItems.length > 0 ||
        currentSheet.right.questions.length > 0 ||
        currentSheet.right.remember !== null;

      if (hasContent || sheetCountForRawPage === 0) {
        paginatedPages.push(currentSheet);
      }
    } else {
      // A4 Mode (Two Columns): check left and right overflow
      let currentLeft = [...(origPage.left || [])];
      let currentRight = {
        graphs: [...(origPage.right?.graphs || [])],
        tables: [...(origPage.right?.tables || [])],
        customItems: [...(origPage.right?.customItems || [])],
        questions: [...(origPage.right?.questions || [])],
        remember: origPage.right?.remember || null,
      };

      let pageTitle = baseTitle;
      let isContinuation = false;

      while (true) {
        let accumulatedHeight = 0;
        let splitLeftIndex = -1;

        for (let i = 0; i < currentLeft.length; i++) {
          const itemH = estimateItemHeight(currentLeft[i]);
          if (accumulatedHeight + itemH > availableContentHeight) {
            splitLeftIndex = i;
            break;
          }
          accumulatedHeight += itemH;
        }

        if (splitLeftIndex !== -1) {
          // Rule: Keep sub-heading with its first bullet
          if (
            splitLeftIndex > 0 &&
            currentLeft[splitLeftIndex - 1]?.type === 'heading'
          ) {
            splitLeftIndex -= 1;
          }

          if (splitLeftIndex === 0 && currentLeft.length > 2) {
            splitLeftIndex = 2;
          }

          const pageLeftItems = currentLeft.slice(0, splitLeftIndex);
          const overflowLeftItems = currentLeft.slice(splitLeftIndex);

          paginatedPages.push({
            title: isContinuation ? `${baseTitle}` : baseTitle,
            left: pageLeftItems,
            right: {
              graphs: [],
              tables: [],
              customItems: [],
              questions: [],
              remember: null,
            },
          });

          currentLeft = overflowLeftItems;
          pageTitle = `${baseTitle}`;
          isContinuation = true;
          continue;
        }

        paginatedPages.push({
          title: isContinuation ? `${baseTitle}` : baseTitle,
          left: currentLeft,
          right: currentRight,
        });
        break;
      }
    }
  }

  return paginatedPages;
}
