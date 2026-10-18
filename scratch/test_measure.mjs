import { parseNotesDSL } from '../src/parser.jsx';
import { SUBJECT_TEMPLATES } from '../src/templates.js';

// Let's test the block extraction on Chapter 2
const raw = SUBJECT_TEMPLATES['physical-science-ch2'].content;
const parsed = parseNotesDSL(raw);

console.log('Parsed sections:', parsed.pages.length);
