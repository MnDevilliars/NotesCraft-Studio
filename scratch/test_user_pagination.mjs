import { parseNotesDSL } from '../src/parser.jsx';
import { autoPaginatePages } from '../src/utils/pagination.js';
import { PAGE_SIZE_PRESETS } from '../src/components/Navbar.jsx';
import { DEFAULT_STYLES } from '../src/components/StylePanel.jsx';
import { SUBJECT_TEMPLATES } from '../src/templates.js';

const preset = PAGE_SIZE_PRESETS['mobile-9-16'];

// Let's test with the default template
const raw = SUBJECT_TEMPLATES['physical-science-ch2'].content;
const parsed = parseNotesDSL(raw);
console.log('Raw pages count:', parsed.pages.length);

const paginatedTrue = autoPaginatePages(parsed.pages, preset, { ...DEFAULT_STYLES, autoPaginate: true });
console.log('With autoPaginate=true count:', paginatedTrue.length);
paginatedTrue.forEach((p, idx) => {
  console.log(`Sheet ${idx + 1}: title="${p.title}", left=${p.left.length}, graphs=${p.right.graphs.length}, questions=${p.right.questions.length}`);
});

const paginatedFalse = autoPaginatePages(parsed.pages, preset, { ...DEFAULT_STYLES, autoPaginate: false });
console.log('With autoPaginate=false count:', paginatedFalse.length);
