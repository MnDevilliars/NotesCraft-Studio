import { parseNotesDSL } from '../src/parser.jsx';
import { SUBJECT_TEMPLATES } from '../src/templates.js';

const raw = SUBJECT_TEMPLATES['physical-science-ch2'].content;
const parsed = parseNotesDSL(raw);

function estimateBlockHeight(b) {
  const lineCount = (text) => Math.max(1, Math.ceil((text || '').length / 42));
  if (b.type === 'heading') return 46;
  if (b.type === 'law') return 18 + lineCount(b.text) * 28;
  if (b.type === 'formula') return 44;
  if (b.type === 'note') return 18 + lineCount(b.text) * 26;
  if (b.type === 'bullet') return 34 + (lineCount(b.text) - 1) * 26;
  if (b.type === 'must') return 52 + (b.items?.length || 1) * 28;
  if (b.type === 'board') return 52 + (b.items?.length || 1) * 36;
  if (b.type === 'table') return 54 + (b.rows?.length || 1) * 32;
  if (b.type === 'graph-row') return 197;
  if (b.type === 'questions') return 52 + (b.questions?.length || 1) * 30;
  if (b.type === 'remember') return 42 + lineCount(b.remember) * 26;
  return 32;
}

function extractSectionBlocks(page, graphsPerRow = 2) {
  const blocks = [];
  // Left items
  for (const item of page.left || []) {
    blocks.push(item);
  }
  // Right items
  const graphs = page.right?.graphs || [];
  if (graphs.length > 0) {
    for (let i = 0; i < graphs.length; i += graphsPerRow) {
      blocks.push({
        type: 'graph-row',
        graphs: graphs.slice(i, i + graphsPerRow)
      });
    }
  }
  for (const tbl of page.right?.tables || []) {
    blocks.push({ type: 'table', ...tbl });
  }
  for (const c of page.right?.customItems || []) {
    blocks.push(c);
  }
  const questions = page.right?.questions || [];
  if (questions.length > 0) {
    blocks.push({ type: 'questions', questions });
  }
  if (page.right?.remember) {
    blocks.push({ type: 'remember', remember: page.right.remember });
  }
  return blocks;
}

const targetContentHeight = 800 - 145; // 655 px for 450x600 pt preset

console.log('Target content height:', targetContentHeight, 'px');

parsed.pages.forEach((page, pIdx) => {
  const blocks = extractSectionBlocks(page, 2);
  const totalH = blocks.reduce((sum, b) => sum + estimateBlockHeight(b), 0);
  console.log();
  console.log('  Total blocks:', blocks.length, 'Total raw content height:', totalH, 'px');
  const reqScale = targetContentHeight / totalH;
  console.log('  Scale needed to fit in 1 page:', reqScale.toFixed(2));
});
