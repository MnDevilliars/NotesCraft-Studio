/**
 * Auto-pagination utility:
 * When Auto Paginate is ON (default ON) and blocks do not fit within the preset height,
 * cleanly moves whole blocks to continuation pages titled "[Title] (contd.)",
 * strictly keeping sub-headings attached to their first bullet, and never cutting blocks in half.
 */

const lineCount = (text) => (text ? Math.max(1, Math.ceil(text.length / 32)) : 1);

export function estimateItemHeight(item) {
  if (!item) return 0;

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
    if (!item.items || item.items.length === 0) return 60;
    let totalH = 50;
    for (const m of item.items) {
      const lines = lineCount(m);
      totalH += Math.max(34, lines * 28 + 8);
    }
    return totalH;
  }
  if (item.type === 'board') {
    if (!item.items || item.items.length === 0) return 60;
    let totalH = 50;
    for (const b of item.items) {
      const qText = (b.question || '') + ' ' + (b.answer || '') + ' ' + (b.years || '');
      const lines = lineCount(qText);
      totalH += Math.max(40, lines * 28 + 10);
    }
    return totalH;
  }
  if (item.type === 'table') {
    const rowCount = item.rows ? item.rows.length : 1;
    return 60 + 38 + rowCount * 36;
  }
  if (item.type === 'diagram') {
    return 240;
  }
  if (item.type === 'text') {
    return 30 + lineCount(item.text) * 26;
  }
  return 36;
}

import { getEstimatedHeaderHeight } from './titleUtils';

export function sheetHasContent(sheet) {
  if (!sheet) return false;
  const hasLeft = Array.isArray(sheet.left) && sheet.left.length > 0;
  const hasGraphs = Array.isArray(sheet.right?.graphs) && sheet.right.graphs.length > 0;
  const hasDiagrams = Array.isArray(sheet.right?.diagrams) && sheet.right.diagrams.length > 0;
  const hasTables = Array.isArray(sheet.right?.tables) && sheet.right.tables.length > 0;
  const hasCustom = Array.isArray(sheet.right?.customItems) && sheet.right.customItems.length > 0;
  const hasQuestions = Array.isArray(sheet.right?.questions) && sheet.right.questions.length > 0;
  const hasRemember = typeof sheet.right?.remember === 'string' && sheet.right.remember.trim().length > 0;
  return hasLeft || hasGraphs || hasDiagrams || hasTables || hasCustom || hasQuestions || hasRemember;
}

export function autoPaginatePages(rawPages, preset, styles) {
  if (!styles.autoPaginate || !rawPages || rawPages.length === 0) {
    return rawPages;
  }

  const isMobile = preset.isMobile !== false;
  const paginatedPages = [];

  for (let pIdx = 0; pIdx < rawPages.length; pIdx++) {
    const origPage = rawPages[pIdx];
    const baseTitle = (origPage.title || 'Revision Notes').replace(/\s*\(contd\.\)$/i, '').trim();

    // The reduced header height feeds into the existing page-fit logic, so saved space goes to content
    const estimatedHeaderH = getEstimatedHeaderHeight(baseTitle, preset, styles);
    const footerH = isMobile ? 65 : 45;
    const paddingH = (isMobile ? (Number(styles.pagePadding) || 26) : 20) * 2;
    const contentMargins = 24;
    const availableContentHeight = Math.max(340, preset.height - (estimatedHeaderH + footerH + paddingH + contentMargins));

    if (isMobile) {
      // Mobile Mode: Single column flow: left blocks then right blocks
      const leftItems = [...(origPage.left || [])];
      const rightGraphs = [...(origPage.right?.graphs || [])];
      const rightDiagrams = [...(origPage.right?.diagrams || [])];
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

      // Group diagrams into rows (1 or 2 per row depending on styles.graphsPerRow)
      const diagramRows = [];
      for (let d = 0; d < rightDiagrams.length; d += perRow) {
        diagramRows.push(rightDiagrams.slice(d, d + perRow));
      }

      const createFreshSheet = () => ({
        title: baseTitle,
        left: [],
        right: {
          graphs: [],
          diagrams: [],
          tables: [],
          customItems: [],
          questions: [],
          remember: null,
        },
      });

      let currentSheet = createFreshSheet();
      let currentHeight = 0;

      const finishCurrentSheet = () => {
        if (sheetHasContent(currentSheet)) {
          paginatedPages.push(currentSheet);
        }
        currentSheet = createFreshSheet();
        currentHeight = 0;
      };

      const getTargetList = (targetKey) => {
        return targetKey === 'left' ? currentSheet.left : currentSheet.right.customItems;
      };

      // Add a block (either regular item, must-know, or board-exam)
      const addBlock = (item, targetKey) => {
        if (!item) return;

        // Special handling for Board Exam: Keep back-to-back in ONE box
        if (item.type === 'board' && item.items && item.items.length > 0) {
          const totalBoardH = estimateItemHeight(item);

          // Case A: Fits on current sheet completely as a single box
          if (currentHeight + totalBoardH <= availableContentHeight) {
            getTargetList(targetKey).push(item);
            currentHeight += totalBoardH;
            return;
          }

          // Case B: Does not fit on current sheet, but fits on a fresh sheet
          if (currentHeight > 0 && totalBoardH <= availableContentHeight) {
            finishCurrentSheet();
            getTargetList(targetKey).push(item);
            currentHeight += totalBoardH;
            return;
          }

          // Case C: Extremely large board block (taller than availableContentHeight by itself)
          // Split across sheets, but ensure on each sheet all questions are united in ONE box
          if (currentHeight > 0) {
            finishCurrentSheet();
          }

          let currentBatch = [];
          let batchHeight = 50;

          for (let q = 0; q < item.items.length; q++) {
            const bItem = item.items[q];
            const qText = (bItem.question || '') + ' ' + (bItem.answer || '') + ' ' + (bItem.years || '');
            const qLines = lineCount(qText);
            const qH = Math.max(40, qLines * 28 + 10);

            if (currentBatch.length > 0 && currentHeight + batchHeight + qH > availableContentHeight) {
              getTargetList(targetKey).push({ type: 'board', items: currentBatch });
              currentHeight += batchHeight;
              finishCurrentSheet();
              currentBatch = [];
              batchHeight = 50;
            }
            currentBatch.push(bItem);
            batchHeight += qH;
          }

          if (currentBatch.length > 0) {
            getTargetList(targetKey).push({ type: 'board', items: currentBatch });
            currentHeight += batchHeight;
          }
          return;
        }

        // Special handling for Must Know: Keep back-to-back in ONE box
        if (item.type === 'must' && item.items && item.items.length > 0) {
          const totalMustH = estimateItemHeight(item);

          // Case A: Fits on current sheet completely
          if (currentHeight + totalMustH <= availableContentHeight) {
            getTargetList(targetKey).push(item);
            currentHeight += totalMustH;
            return;
          }

          // Case B: Does not fit on current sheet, but fits on a fresh sheet
          if (currentHeight > 0 && totalMustH <= availableContentHeight) {
            finishCurrentSheet();
            getTargetList(targetKey).push(item);
            currentHeight += totalMustH;
            return;
          }

          // Case C: Taller than an entire sheet by itself
          if (currentHeight > 0) {
            finishCurrentSheet();
          }

          let currentBatch = [];
          let batchHeight = 50;

          for (let m = 0; m < item.items.length; m++) {
            const mText = item.items[m] || '';
            const mLines = lineCount(mText);
            const mH = Math.max(34, mLines * 28 + 8);

            if (currentBatch.length > 0 && currentHeight + batchHeight + mH > availableContentHeight) {
              getTargetList(targetKey).push({ type: 'must', items: currentBatch });
              currentHeight += batchHeight;
              finishCurrentSheet();
              currentBatch = [];
              batchHeight = 50;
            }
            currentBatch.push(item.items[m]);
            batchHeight += mH;
          }

          if (currentBatch.length > 0) {
            getTargetList(targetKey).push({ type: 'must', items: currentBatch });
            currentHeight += batchHeight;
          }
          return;
        }

        // Regular items: bullet, note, formula, law, text
        const itemH = estimateItemHeight(item);
        if (currentHeight + itemH > availableContentHeight && currentHeight > 0) {
          finishCurrentSheet();
        }
        getTargetList(targetKey).push(item);
        currentHeight += itemH;
      };

      // 1. Process left items
      for (let i = 0; i < leftItems.length; i++) {
        const item = leftItems[i];

        // Sub-heading rule: A sub-heading stays attached to its first content item
        if (item.type === 'heading' && i + 1 < leftItems.length) {
          const itemH = estimateItemHeight(item);
          const nextItemH = estimateItemHeight(leftItems[i + 1]);
          if (currentHeight + itemH + nextItemH > availableContentHeight && currentHeight > 0) {
            finishCurrentSheet();
          }
          getTargetList('left').push(item);
          currentHeight += itemH;
          continue;
        }

        addBlock(item, 'left');
      }

      // 2. Process right graphs (in rows)
      for (let r = 0; r < graphRows.length; r++) {
        const rowGraphs = graphRows[r];
        const rowH = 240;

        if (currentHeight + rowH > availableContentHeight && currentHeight > 0) {
          finishCurrentSheet();
        }

        currentSheet.right.graphs.push(...rowGraphs);
        currentHeight += rowH;
      }

      // 2b. Process right diagrams (in rows: never cut across pages)
      for (let r = 0; r < diagramRows.length; r++) {
        const rowDiagrams = diagramRows[r];
        const rowH = 240;

        if (currentHeight + rowH > availableContentHeight && currentHeight > 0) {
          finishCurrentSheet();
        }

        currentSheet.right.diagrams.push(...rowDiagrams);
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

      // 4. Process custom right items (including @must and @board)
      for (let c = 0; c < rightCustom.length; c++) {
        const cItem = rightCustom[c];
        addBlock(cItem, 'customItems');
      }

      // 5. Process Madhyamik Questions
      if (rightQuestions.length > 0) {
        let qH = 54;
        for (const q of rightQuestions) {
          const qText = (q.question || '') + ' ' + (q.answer || '');
          qH += Math.max(40, lineCount(qText) * 28 + 8);
        }

        if (currentHeight + qH > availableContentHeight && currentHeight > 0) {
          finishCurrentSheet();
        }

        currentSheet.right.questions.push(...rightQuestions);
        currentHeight += qH;
      }

      // 6. Process Remember Box
      if (rightRemember) {
        const remH = 46 + lineCount(rightRemember) * 28;

        if (currentHeight + remH > availableContentHeight && currentHeight > 0) {
          finishCurrentSheet();
        }

        currentSheet.right.remember = rightRemember;
        currentHeight += remH;
      }

      // Push final sheet ONLY IF IT HAS CONTENT
      if (sheetHasContent(currentSheet)) {
        paginatedPages.push(currentSheet);
      }
    } else {
      // A4 Mode (Two Columns): check left and right overflow
      let currentLeft = [...(origPage.left || [])];
      let currentRight = {
        graphs: [...(origPage.right?.graphs || [])],
        diagrams: [...(origPage.right?.diagrams || [])],
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
              diagrams: [],
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

  // Safety guarantee: filter out any completely blank pages
  const nonEmptyPages = paginatedPages.filter((sheet) => sheetHasContent(sheet));
  return nonEmptyPages.length > 0 ? nonEmptyPages : rawPages;
}
