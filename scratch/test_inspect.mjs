import { parseNotesDSL } from '../src/parser.jsx';
import { SUBJECT_TEMPLATES } from '../src/templates.js';

const raw = SUBJECT_TEMPLATES['physical-science-ch2'].content;
const parsed = parseNotesDSL(raw);

console.log('Chapter:', parsed.chapter.name);
console.log('Number of raw sections:', parsed.pages.length);

parsed.pages.forEach((p, idx) => {
  console.log();
  console.log('  Left items count:', p.left.length);
  console.log('  Right graphs:', p.right.graphs.length);
  console.log('  Right tables:', p.right.tables.length);
  console.log('  Right questions:', p.right.questions.length);
  console.log('  Right remember:', !!p.right.remember);
});
