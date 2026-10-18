import { parseNotesDSL } from "../src/parser.jsx";
import { autoPaginatePages } from "../src/utils/pagination.js";
import { SUBJECT_TEMPLATES } from "../src/templates.js";

// Let us construct a 12-section sample notes file based on Chapter 2 content repeated/expanded
const section1 = SUBJECT_TEMPLATES["physical-science-ch2"].content;
// Split by === PAGE === to get sections
const parts = section1.split("=== PAGE ===");
const headerPart = parts[0]; // has @chapter
const s1 = parts[1];
const s2 = parts[2];

// Build a 12 section document
let doc = headerPart;
for(let i=0; i<6; i++) {
  doc += "\n=== PAGE ===\n" + s1 + "\n=== PAGE ===\n" + s2;
}

const parsed = parseNotesDSL(doc);
console.log("Raw sections in 12-section test file:", parsed.pages.length);

const preset450x600 = { width: 600, height: 800, isMobile: true };
const styles = { graphsPerRow: 2, autoPaginate: true };

const fitted = autoPaginatePages(parsed.pages, preset450x600, styles);
console.log("Total fitted pages (after our fix):", fitted.length);

fitted.forEach((p, idx) => {
  console.log(`Sheet ${idx + 1} of ${p.totalPages}: "${p.title}" | scale=${p.scale}`);
});
