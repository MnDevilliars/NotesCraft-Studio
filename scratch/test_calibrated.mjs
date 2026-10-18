import { parseNotesDSL } from "../src/parser.jsx";
import { SUBJECT_TEMPLATES } from "../src/templates.js";

// Test typical section
const typicalSectionBlocks = [
  { type: "heading", text: "1. Boyle\x27s Law" },
  { type: "law", text: "At constant temperature, volume is inversely proportional to pressure." },
  { type: "bullet", text: "In symbols: V ∝ 1/P" },
  { type: "bullet", text: "So: PV = constant (k)" },
  { type: "bullet", text: "For two states: P1V1 = P2V2" },
  { type: "bullet", text: "Constants in Boyle\x27s law = temperature and mass" },
  { type: "graph-row", graphs: [{ title: "P vs V" }, { title: "PV vs P" }] },
  { type: "questions", questions: [{ question: "Boyle in symbols?" }, { question: "Constants?" }, { question: "P vs V shape?" }] },
  { type: "remember", remember: "Boyle: P increases -> V decreases" }
];

function estimateBlockHeight(b) {
  const lineCount = (text) => Math.max(1, Math.ceil((text || "").length / 42));
  if (b.type === "heading") return 38;
  if (b.type === "law") return 16 + lineCount(b.text) * 24;
  if (b.type === "formula") return 38;
  if (b.type === "note") return 16 + lineCount(b.text) * 24;
  if (b.type === "bullet") return 28 + (lineCount(b.text) - 1) * 22;
  if (b.type === "must") return 32 + (b.items?.length || 1) * 24;
  if (b.type === "board") return 32 + (b.items?.length || 1) * 30;
  if (b.type === "table") return 36 + (b.rows?.length || 1) * 28;
  if (b.type === "graph-row") return 185;
  if (b.type === "questions") return 32 + (b.questions?.length || 1) * 26;
  if (b.type === "remember") return 26 + lineCount(b.remember) * 22;
  return 28;
}

const totalH = typicalSectionBlocks.reduce((sum, b) => sum + estimateBlockHeight(b), 0);
console.log("Typical section height at 100% scale:", totalH, "px");
const targetContentHeight = 800 - 146; // 654 px
console.log("Target content height for 450x600 pt preset:", targetContentHeight, "px");
console.log("Does typical section fit on 1 page without splitting?", totalH <= targetContentHeight / 0.80 ? "YES!" : "NO");
console.log("Scale for typical section:", (targetContentHeight / totalH).toFixed(2));
