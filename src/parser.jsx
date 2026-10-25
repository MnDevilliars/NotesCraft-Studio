import React from 'react';

/**
 * Formats the slash character '/' by placing a thin space on both sides
 * so it never joins adjacent letters (e.g. '1/V' looking like '1N' in Kalam).
 */
export function addThinSpacesToSlash(str) {
  if (!str || typeof str !== 'string') return str;
  // Put a thin space \u2009 on both sides of any '/' that doesn't already have one
  return str.replace(/[\s\u2009]*\/[\s\u2009]*/g, '\u2009/\u2009');
}

/**
 * Determines whether a slash-separated term is a mathematical fraction.
 * Recognizes formulas like V1/T1, V₁/T₁, P₁V₁/T₁, V/T, P/T, 4/3, 1/273, θ/273, etc.
 * Ignores regular English words like 'and/or', 'km/h', 'True/False'.
 */
export function isMathFraction(num, den, isFormula = false) {
  if (isFormula) return true;
  if (!num || !den) return false;

  const trimmedNum = num.trim();
  const trimmedDen = den.trim();

  // If either has digits, subscripts, or math symbols
  if (/[\d₀-₉θπλαμβ]/.test(trimmedNum) || /[\d₀-₉θπλαμβ]/.test(trimmedDen)) {
    return true;
  }

  // If both are single letters like V/T, P/T, a/b, x/y, 1/P, 1/V
  if (trimmedNum.length === 1 && trimmedDen.length === 1) {
    return true;
  }

  // Common physics/math variable products
  if (/^(PV|RT|kT|mgh|mv|P₁V₁|P₂V₂|P1V1|P2V2)$/i.test(trimmedNum) && trimmedDen.length <= 3) {
    return true;
  }

  return false;
}

/**
 * Renders inline formatting:
 * - {a/b} or V1/T1, P₁V₁/T₁ -> Realistic stacked textbook math fraction
 * - r^3 or x^2 -> Superscript/power
 * - ==highlight== -> Highlighted text mark
 * - **bold** -> Bold text
 * - '/' -> Wrapped with thin spaces when part of text
 */
export function formatInlineText(text, isFormula = false) {
  if (!text || typeof text !== 'string') return text;

  // Regex matches:
  // 1. Explicit fraction: \{([^}]+)\/([^}]+)\}
  // 2. Highlight: ==([^=]+)==
  // 3. Bold: \*\*([^*]+)\*\*
  // 4. Superscript/power: ([A-Za-z0-9₀-₉θπ\)])\^(?:\{([^}]+)\}|([0-9a-zA-Z+-]+))
  // 5. Standalone math fraction: ([A-Za-z0-9₀-₉α-ωΑ-Ωθπ]+)\s*\/\s*([A-Za-z0-9₀-₉α-ωΑ-Ωθπ]+)
  const regex = /(\{([^}]+)\/([^}]+)\}|==([^=]+)==|\*\*([^*]+)\*\*|([A-Za-z0-9₀-₉θπ\)])\^(?:\{([^}]+)\}|([0-9a-zA-Z+-]+))|([A-Za-z0-9₀-₉α-ωΑ-Ωθπ]+)\s*\/\s*([A-Za-z0-9₀-₉α-ωΑ-Ωθπ]+))/g;

  const elements = [];
  let lastIndex = 0;
  let match;
  let keyIndex = 0;

  while ((match = regex.exec(text)) !== null) {
    // Text before match
    if (match.index > lastIndex) {
      elements.push(addThinSpacesToSlash(text.slice(lastIndex, match.index)));
    }

    const fullMatch = match[0];

    if (fullMatch.startsWith('{') && fullMatch.endsWith('}')) {
      // Explicit Fraction: match[2] = numerator, match[3] = denominator
      const num = match[2].trim();
      const den = match[3].trim();
      elements.push(
        <span key={`frac-${keyIndex++}`} className="math-fraction">
          <span className="frac-num">{formatInlineText(num, true)}</span>
          <span className="frac-bar" aria-hidden="true"></span>
          <span className="frac-den">{formatInlineText(den, true)}</span>
        </span>
      );
    } else if (fullMatch.startsWith('==') && fullMatch.endsWith('==')) {
      // Highlight: match[4]
      elements.push(
        <mark key={`hl-${keyIndex++}`} className="hand-highlight">
          {addThinSpacesToSlash(match[4])}
        </mark>
      );
    } else if (fullMatch.startsWith('**') && fullMatch.endsWith('**')) {
      // Bold: match[5]
      elements.push(
        <strong key={`b-${keyIndex++}`} className="hand-strong">
          {addThinSpacesToSlash(match[5])}
        </strong>
      );
    } else if (fullMatch.includes('^')) {
      // Power / Superscript: match[6] = base, match[7] or match[8] = exp
      const base = match[6];
      const exp = match[7] || match[8];
      elements.push(
        <span key={`pow-${keyIndex++}`} className="math-pow">
          <span className="pow-base">{base}</span>
          <sup className="pow-exp">{exp}</sup>
        </span>
      );
    } else if (match[9] && match[10]) {
      // Math fraction candidate: match[9] = num, match[10] = den
      const num = match[9];
      const den = match[10];
      if (isMathFraction(num, den, isFormula)) {
        elements.push(
          <span key={`frac-${keyIndex++}`} className="math-fraction">
            <span className="frac-num">{num}</span>
            <span className="frac-bar" aria-hidden="true"></span>
            <span className="frac-den">{den}</span>
          </span>
        );
      } else {
        elements.push(addThinSpacesToSlash(fullMatch));
      }
    }

    lastIndex = regex.lastIndex;
  }

  if (lastIndex < text.length) {
    elements.push(addThinSpacesToSlash(text.slice(lastIndex)));
  }

  return elements.length > 0 ? elements : addThinSpacesToSlash(text);
}

/**
 * Parses the raw notes text format into structured Page objects.
 */
export function parseNotesDSL(rawText) {
  if (!rawText) return { chapter: { prefix: 'Chapter 2:', name: 'Behaviour of Gases' }, pages: [] };

  const lines = rawText.split(/\r?\n/);
  let chapter = { prefix: 'Chapter 1:', name: 'General Science' };
  const pages = [];
  let currentPage = null;
  let currentColumn = 'left'; // 'left' | 'right'
  let currentTable = null;

  function ensurePage() {
    if (!currentPage) {
      currentPage = {
        title: 'Revision Notes',
        left: [],
        right: {
          graphs: [],
          diagrams: [],
          tables: [],
          questions: [],
          remember: null,
          customItems: []
        }
      };
      pages.push(currentPage);
    }
  }

  function flushTable() {
    if (currentTable) {
      if (currentColumn === 'right') {
        currentPage.right.tables.push(currentTable);
      } else {
        currentPage.left.push({ type: 'table', ...currentTable });
      }
      currentTable = null;
    }
  }

  for (let i = 0; i < lines.length; i++) {
    const rawLine = lines[i];
    const line = rawLine.trim();

    // 1. Chapter tag
    if (line.startsWith('@chapter')) {
      const match = line.replace('@chapter', '').trim();
      // Match "Chapter N: Name" or similar
      const colonIdx = match.indexOf(':');
      if (colonIdx !== -1) {
        chapter = {
          prefix: match.slice(0, colonIdx + 1).trim(),
          name: match.slice(colonIdx + 1).trim()
        };
      } else {
        chapter = {
          prefix: 'Chapter:',
          name: match
        };
      }
      continue;
    }

    // 2. Page separator
    if (line.startsWith('===') && line.toUpperCase().includes('PAGE')) {
      flushTable();
      currentPage = {
        title: 'Untitled Page',
        left: [],
        right: {
          graphs: [],
          diagrams: [],
          tables: [],
          questions: [],
          remember: null,
          customItems: []
        }
      };
      pages.push(currentPage);
      currentColumn = 'left';
      continue;
    }

    ensurePage();

    // 3. Title tag
    if (line.startsWith('@title')) {
      flushTable();
      currentPage.title = line.replace('@title', '').trim();
      continue;
    }

    // 4. Column switch
    if (line.startsWith('@left')) {
      flushTable();
      currentColumn = 'left';
      continue;
    }
    if (line.startsWith('@right')) {
      flushTable();
      currentColumn = 'right';
      continue;
    }

    // 5. Table rows handling
    if (line.startsWith('|')) {
      if (!currentTable) {
        currentTable = { title: '', headers: [], rows: [] };
      }
      // Check if separator line like |---|---|
      if (/^\|[\s\-:|]+\|$/.test(line)) {
        continue;
      }
      const cells = line.split('|')
        .slice(1, -1)
        .map(c => c.trim());

      if (currentTable.headers.length === 0) {
        currentTable.headers = cells;
      } else {
        currentTable.rows.push(cells);
      }
      continue;
    } else {
      flushTable();
    }

    if (!line) continue;

    // 6. Must Know block: @must
    if (line.startsWith('@must')) {
      flushTable();
      const mustItems = [];
      let j = i + 1;
      while (j < lines.length) {
        const nextRaw = lines[j];
        const nextLine = nextRaw.trim();
        if (!nextLine || nextLine.startsWith('@') || (nextLine.startsWith('===') && nextLine.toUpperCase().includes('PAGE'))) {
          break;
        }
        const itemText = nextLine.replace(/^[-•*]\s*/, '').trim();
        if (itemText) {
          mustItems.push(itemText);
        }
        j++;
      }
      i = j - 1;
      const mustBlock = { type: 'must', items: mustItems };
      if (currentColumn === 'left') {
        currentPage.left.push(mustBlock);
      } else {
        currentPage.right.customItems.push(mustBlock);
      }
      continue;
    }

    // 7. Board Exam block: @board
    if (line.startsWith('@board')) {
      flushTable();
      const boardItems = [];
      let j = i + 1;
      while (j < lines.length) {
        const nextRaw = lines[j];
        const nextLine = nextRaw.trim();
        if (!nextLine || nextLine.startsWith('@') || (nextLine.startsWith('===') && nextLine.toUpperCase().includes('PAGE'))) {
          break;
        }
        // format: Question => Answer | 2018, 2022
        let q = nextLine;
        let a = '';
        let years = '';

        const pipeIdx = nextLine.lastIndexOf('|');
        let qaPart = nextLine;
        if (pipeIdx !== -1) {
          years = nextLine.slice(pipeIdx + 1).trim();
          qaPart = nextLine.slice(0, pipeIdx).trim();
        }

        if (qaPart.includes('=>')) {
          const parts = qaPart.split('=>');
          q = parts[0].trim();
          a = parts.slice(1).join('=>').trim();
        } else if (qaPart.includes('->')) {
          const parts = qaPart.split('->');
          q = parts[0].trim();
          a = parts.slice(1).join('->').trim();
        } else if (qaPart.includes('?')) {
          const lastQ = qaPart.lastIndexOf('?');
          q = qaPart.slice(0, lastQ + 1).trim();
          a = qaPart.slice(lastQ + 1).trim();
        } else {
          q = qaPart;
        }

        q = q.replace(/^[-?•*]\s*/, '').trim();
        if (q || a) {
          boardItems.push({ question: q, answer: a, years });
        }
        j++;
      }
      i = j - 1;
      const boardBlock = { type: 'board', items: boardItems };
      if (currentColumn === 'left') {
        currentPage.left.push(boardBlock);
      } else {
        currentPage.right.customItems.push(boardBlock);
      }
      continue;
    }

    // 8. Table tag: @table Title
    if (line.startsWith('@table')) {
      currentTable = {
        title: line.replace('@table', '').trim(),
        headers: [],
        rows: []
      };
      continue;
    }

    // 7. Graph tag: @graph kind | Title | x label | y label | caption
    if (line.startsWith('@graph')) {
      const parts = line.replace('@graph', '').split('|').map(s => s.trim());
      const kind = (parts[0] || 'origin').toLowerCase();
      const title = parts[1] || 'Graph';
      const xLabel = parts[2] || 'X';
      const yLabel = parts[3] || 'Y';
      const caption = parts[4] || '';

      currentPage.right.graphs.push({
        type: 'graph',
        kind,
        title,
        xLabel,
        yLabel,
        caption
      });
      continue;
    }

    // 7b. Diagram tag: @diagram <type> | <Title> | <Caption> | key=value
    if (line.startsWith('@diagram')) {
      const rawParts = line.replace('@diagram', '').split('|').map((s) => s.trim());
      const diagramType = (rawParts[0] || 'concave_mirror').trim();

      let title = '';
      let caption = '';
      const overrides = {};

      const textParts = [];
      for (let p = 1; p < rawParts.length; p++) {
        const seg = rawParts[p];
        if (!seg) continue;
        const eqIdx = seg.indexOf('=');
        if (eqIdx > 0) {
          const key = seg.slice(0, eqIdx).trim().toLowerCase();
          const val = seg.slice(eqIdx + 1).trim();
          if (['cathode', 'anode', 'electrolyte', 'cathode_rxn', 'anode_rxn'].includes(key)) {
            overrides[key] = val;
            continue;
          }
        }
        textParts.push(seg);
      }

      if (textParts.length > 0) {
        title = textParts[0];
      }
      if (textParts.length > 1) {
        caption = textParts.slice(1).join(' | ');
      }

      const diagramItem = {
        type: 'diagram',
        diagramType,
        title,
        caption,
        overrides
      };

      if (currentColumn === 'left') {
        currentPage.left.push(diagramItem);
      } else {
        currentPage.right.diagrams.push(diagramItem);
      }
      continue;
    }

    // 8. Important Question: ? Question => Answer (or ? Q? -> A)
    if (line.startsWith('?')) {
      const qText = line.slice(1).trim();
      let question = qText;
      let answer = '';

      if (qText.includes('=>')) {
        const qParts = qText.split('=>');
        question = qParts[0].trim();
        answer = qParts.slice(1).join('=>').trim();
      } else if (qText.includes('->')) {
        const qParts = qText.split('->');
        question = qParts[0].trim();
        answer = qParts.slice(1).join('->').trim();
      } else if (qText.includes('?')) {
        const lastQ = qText.lastIndexOf('?');
        question = qText.slice(0, lastQ + 1).trim();
        answer = qText.slice(lastQ + 1).trim();
      }

      currentPage.right.questions.push({ question, answer });
      continue;
    }

    // 9. Remember box: @remember text
    if (line.startsWith('@remember')) {
      currentPage.right.remember = line.replace('@remember', '').trim();
      continue;
    }

    // 10. Sub-headings: # Heading
    if (line.startsWith('#')) {
      const heading = line.replace(/^#+\s*/, '').trim();
      const item = { type: 'heading', text: heading };
      if (currentColumn === 'left') {
        currentPage.left.push(item);
      } else {
        currentPage.right.customItems.push(item);
      }
      continue;
    }

    // 11. Law / Definition box: > text
    if (line.startsWith('>')) {
      const lawText = line.replace(/^>\s*/, '').trim();
      const item = { type: 'law', text: lawText };
      if (currentColumn === 'left') {
        currentPage.left.push(item);
      } else {
        currentPage.right.customItems.push(item);
      }
      continue;
    }

    // 12. Formula chip: = text
    if (line.startsWith('=')) {
      const formulaText = line.replace(/^=\s*/, '').trim();
      const item = { type: 'formula', text: formulaText };
      if (currentColumn === 'left') {
        currentPage.left.push(item);
      } else {
        currentPage.right.customItems.push(item);
      }
      continue;
    }

    // 13. Note box: ! text
    if (line.startsWith('!')) {
      const noteText = line.replace(/^!\s*/, '').trim();
      const item = { type: 'note', text: noteText };
      if (currentColumn === 'left') {
        currentPage.left.push(item);
      } else {
        currentPage.right.customItems.push(item);
      }
      continue;
    }

    // 14. Bullet point: - text or • text
    if (line.startsWith('-') || line.startsWith('•') || line.startsWith('*')) {
      const bulletText = line.replace(/^[-•*]\s*/, '').trim();
      const item = { type: 'bullet', text: bulletText };
      if (currentColumn === 'left') {
        currentPage.left.push(item);
      } else {
        currentPage.right.customItems.push(item);
      }
      continue;
    }

    // 15. Default plain paragraph
    const item = { type: 'text', text: line };
    if (currentColumn === 'left') {
      currentPage.left.push(item);
    } else {
      currentPage.right.customItems.push(item);
    }
  }

  flushTable();

  // If no pages created at all, ensure at least one empty
  if (pages.length === 0) {
    ensurePage();
  }

  return { chapter, pages };
}
