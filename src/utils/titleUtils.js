import { FONT_OPTIONS } from '../components/StylePanel';

let measureCanvas = null;
let measureCtx = null;

/**
 * Measures text width using an offscreen canvas in browser environments,
 * with an accurate character-ratio fallback for Node or test environments.
 */
function getTextWidth(text, font, fontSize) {
  if (typeof document !== 'undefined' && document.createElement) {
    if (!measureCanvas) {
      measureCanvas = document.createElement('canvas');
      measureCtx = measureCanvas.getContext('2d');
    }
    if (measureCtx) {
      measureCtx.font = font;
      // letterSpacing '-0.3px' as defined in .page-title CSS
      if ('letterSpacing' in measureCtx) {
        measureCtx.letterSpacing = '-0.3px';
      }
      return measureCtx.measureText(text).width;
    }
  }
  // Fallback for non-browser environments:
  return text.length * (fontSize * 0.56);
}

/**
 * Splits text into lines wrapping within maxWidth at the given fontSize & fontFamily.
 */
export function wrapTextToLines(text, maxWidth, fontSize, fontFamily) {
  if (!text || !text.trim()) return [];
  const words = text.trim().split(/\s+/);
  const font = `700 ${fontSize}px ${fontFamily}`;
  const lines = [];
  let currentLine = '';

  for (let i = 0; i < words.length; i++) {
    const word = words[i];
    const testLine = currentLine ? `${currentLine} ${word}` : word;
    const testWidth = getTextWidth(testLine, font, fontSize);

    if (testWidth <= maxWidth) {
      currentLine = testLine;
    } else {
      if (currentLine) {
        lines.push(currentLine);
        currentLine = word;
      } else {
        // Single word exceeds maxWidth, break characters
        let partial = '';
        for (let c = 0; c < word.length; c++) {
          if (getTextWidth(partial + word[c], font, fontSize) <= maxWidth) {
            partial += word[c];
          } else {
            if (partial) lines.push(partial);
            partial = word[c];
          }
        }
        currentLine = partial;
      }
    }
  }
  if (currentLine) {
    lines.push(currentLine);
  }
  return lines;
}

/**
 * PART 1 Implementation:
 * - "@title" text must never take more than 2 lines.
 * - Available width = page width minus page padding minus the logo width minus the gap.
 * - Start at the chosen Title Size. If text needs more than 2 lines, reduce font size 1 px at a time until it fits in 2 lines.
 * - Minimum size: 60% of chosen Title Size, and never below 16 px. Use line-height 1.1 for the title.
 * - If it still needs more than 2 lines at minimum size, cut it to 2 lines with "…" and flag isTooLong = true.
 */
export function fitTitleToTwoLines(title, preset, styles) {
  if (!title || !title.trim()) {
    return {
      fittedTitle: '',
      fontSize: styles?.titleSize || 36,
      isTooLong: false,
      linesCount: 1,
    };
  }

  const chosenSize = Number(styles?.titleSize) || 36;
  // Minimum size: 60% of chosen Title Size, and never below 16 px
  const minSize = Math.max(16, Math.round(chosenSize * 0.6));

  const isMobile = preset?.isMobile !== false;
  const pagePadding = isMobile ? (Number(styles?.pagePadding) || 26) : 20;
  const logoWidth = 56;
  const gap = 12;
  const headerPadding = 4; // 2px on left + 2px on right in .page-header
  // Available width = page width minus page padding (left + right) minus logo width minus gap
  const availableWidth = Math.max(100, (preset?.width || 600) - (pagePadding * 2) - logoWidth - gap - headerPadding);

  // Heading font
  const headingFontObj = FONT_OPTIONS.find((f) => f.id === styles?.headingFont) || FONT_OPTIONS[0];
  const fontFamily = headingFontObj?.family || "'Kalam', cursive";

  // 1. Try decreasing font size 1 px at a time from chosenSize down to minSize
  let bestSize = minSize;
  let fitsInTwoLines = false;
  let bestLines = [];

  for (let s = chosenSize; s >= minSize; s--) {
    const lines = wrapTextToLines(title, availableWidth, s, fontFamily);
    if (lines.length <= 2) {
      bestSize = s;
      fitsInTwoLines = true;
      bestLines = lines;
      break;
    }
  }

  if (fitsInTwoLines) {
    return {
      fittedTitle: title,
      fontSize: bestSize,
      isTooLong: false,
      linesCount: bestLines.length || 1,
    };
  }

  // 2. If it still needs more than 2 lines at minSize, cut it to 2 lines with "…"
  const fontAtMin = `700 ${minSize}px ${fontFamily}`;
  const linesAtMin = wrapTextToLines(title, availableWidth, minSize, fontFamily);
  const line1 = linesAtMin[0] || '';
  const remainingWords = linesAtMin.slice(1).join(' ').trim().split(/\s+/);
  let line2 = '';

  for (let i = 0; i < remainingWords.length; i++) {
    const test = line2 ? `${line2} ${remainingWords[i]}` : remainingWords[i];
    if (getTextWidth(`${test} …`, fontAtMin, minSize) <= availableWidth) {
      line2 = test;
    } else {
      break;
    }
  }

  // In case of a single long word on line 2
  if (!line2 && remainingWords.length > 0) {
    let word = remainingWords[0];
    for (let c = word.length; c >= 1; c--) {
      const sub = word.slice(0, c);
      if (getTextWidth(`${sub}…`, fontAtMin, minSize) <= availableWidth) {
        line2 = sub;
        break;
      }
    }
  }

  const fittedTitle = line2 ? `${line1} ${line2.trim()}…` : `${line1}…`;

  return {
    fittedTitle,
    fontSize: minSize,
    isTooLong: true,
    linesCount: 2,
  };
}

/**
 * Returns estimated header height so pagination and page-fit can accurately budget content space.
 */
export function getEstimatedHeaderHeight(title, preset, styles) {
  const { fontSize, linesCount } = fitTitleToTwoLines(title, preset, styles);
  const chapterRowH = 28;
  const titleH = Math.round(linesCount * fontSize * 1.1) + 6;
  const headerChromeH = 10;
  return chapterRowH + titleH + headerChromeH;
}
