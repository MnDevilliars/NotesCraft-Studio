import { parseNotesDSL } from "../src/parser.jsx";
import { SUBJECT_TEMPLATES } from "../src/templates.js";

function estimateBlockHeight(b) {
  const lineCount = (text) => Math.max(1, Math.ceil((text || "").length / 42));
  if (b.type === "heading") return 46;
  if (b.type === "law") return 18 + lineCount(b.text) * 28;
  if (b.type === "formula") return 44;
  if (b.type === "note") return 18 + lineCount(b.text) * 26;
  if (b.type === "bullet") return 34 + (lineCount(b.text) - 1) * 26;
  if (b.type === "must") return 52 + (b.items?.length || 1) * 28;
  if (b.type === "board") return 52 + (b.items?.length || 1) * 36;
  if (b.type === "table") return 54 + (b.rows?.length || 1) * 32;
  if (b.type === "graph-row") return 197;
  if (b.type === "questions") return 52 + (b.questions?.length || 1) * 30;
  if (b.type === "remember") return 42 + lineCount(b.remember) * 26;
  return 32;
}

function extractSectionBlocks(page, graphsPerRow = 2) {
  const blocks = [];
  for (const item of page.left || []) {
    blocks.push(item);
  }
  const graphs = page.right?.graphs || [];
  if (graphs.length > 0) {
    for (let i = 0; i < graphs.length; i += graphsPerRow) {
      blocks.push({
        type: "graph-row",
        graphs: graphs.slice(i, i + graphsPerRow)
      });
    }
  }
  for (const tbl of page.right?.tables || []) {
    blocks.push({ type: "table", ...tbl });
  }
  for (const c of page.right?.customItems || []) {
    blocks.push(c);
  }
  const questions = page.right?.questions || [];
  if (questions.length > 0) {
    blocks.push({ type: "questions", questions });
  }
  if (page.right?.remember) {
    blocks.push({ type: "remember", remember: page.right.remember });
  }
  return blocks;
}

function fitSection(page, presetHeight = 800, graphsPerRow = 2) {
  const baseTitle = (page.title || "Revision Notes").replace(/\s*\(contd\.?\s*\d*\)$/i, "").trim();
  const targetContentHeight = presetHeight - 145;
  const capacityAt80 = targetContentHeight / 0.80;
  
  let remainingBlocks = extractSectionBlocks(page, graphsPerRow);
  const resultPages = [];
  let partNumber = 0;

  while (remainingBlocks.length > 0) {
    partNumber++;
    const isContd = partNumber > 1;
    const pageTitle = isContd ? (baseTitle + " (contd.)") : baseTitle;
    
    const totalH = remainingBlocks.reduce((sum, b) => sum + estimateBlockHeight(b), 0);
    
    if (totalH <= capacityAt80) {
      let scale = 1.0;
      if (totalH <= targetContentHeight) {
        scale = Math.min(1.10, Math.max(1.0, Number((targetContentHeight / Math.max(1, totalH)).toFixed(2))));
      } else {
        scale = Math.max(0.80, Number((targetContentHeight / totalH).toFixed(2)));
      }
      resultPages.push({
        title: pageTitle,
        blocks: remainingBlocks,
        scale,
        totalH,
      });
      break;
    }

    let currH = 0;
    let splitIdx = 0;
    for (let i = 0; i < remainingBlocks.length; i++) {
      const bh = estimateBlockHeight(remainingBlocks[i]);
      if (currH + bh > capacityAt80 && i > 0) {
        break;
      }
      currH += bh;
      splitIdx = i + 1;
    }

    if (splitIdx > 1 && remainingBlocks[splitIdx - 1].type === "heading") {
      splitIdx--;
      currH -= estimateBlockHeight(remainingBlocks[splitIdx]);
    }

    const pageBlocks = remainingBlocks.slice(0, splitIdx);
    remainingBlocks = remainingBlocks.slice(splitIdx);

    const scale = Math.max(0.80, Math.min(1.10, Number((targetContentHeight / Math.max(1, currH)).toFixed(2))));
    resultPages.push({
      title: pageTitle,
      blocks: pageBlocks,
      scale,
      totalH: currH,
    });
  }

  return resultPages;
}

const raw = SUBJECT_TEMPLATES["physical-science-ch2"].content;
const parsed = parseNotesDSL(raw);

let allSheets = [];
parsed.pages.forEach((p) => {
  const sheets = fitSection(p, 800, 2);
  allSheets.push(...sheets);
});

console.log("Total fitted pages (preset=800 / 450x600 pt):", allSheets.length);
allSheets.forEach((s, idx) => {
  console.log("Page " + (idx + 1) + ": " + s.title + " | blocks=" + s.blocks.length + " | scale=" + s.scale + " | contentH=" + s.totalH + "px");
});
