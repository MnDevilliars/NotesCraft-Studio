function testParser(text, isFormula = false) {
  // Regex matches:
  // 1. Explicit fraction: \{([^}]+)\/([^}]+)\}
  // 2. Highlight: ==([^=]+)==
  // 3. Bold: \*\*([^*]+)\*\*
  // 4. Superscript/power: ([A-Za-z0-9₀-₉θπ\)])\^(?:\{([^}]+)\}|([0-9a-zA-Z+-]+))
  // 5. Math fraction: ([A-Za-z0-9₀-₉α-ωΑ-Ωθπ]+)\s*\/\s*([A-Za-z0-9₀-₉α-ωΑ-Ωθπ]+)
  
  const regex = /(\{([^}]+)\/([^}]+)\}|==([^=]+)==|\*\*([^*]+)\*\*|([A-Za-z0-9₀-₉θπ\)])\^(?:\{([^}]+)\}|([0-9a-zA-Z+-]+))|([A-Za-z0-9₀-₉α-ωΑ-Ωθπ]+)\s*\/\s*([A-Za-z0-9₀-₉α-ωΑ-Ωθπ]+))/g;

  let lastIndex = 0;
  let match;
  const tokens = [];

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      tokens.push({ type: 'text', val: text.slice(lastIndex, match.index) });
    }

    const full = match[0];
    if (full.startsWith('{') && full.endsWith('}')) {
      tokens.push({ type: 'frac', num: match[2], den: match[3] });
    } else if (full.startsWith('==') && full.endsWith('==')) {
      tokens.push({ type: 'hl', val: match[4] });
    } else if (full.startsWith('**') && full.endsWith('**')) {
      tokens.push({ type: 'bold', val: match[5] });
    } else if (full.includes('^')) {
      const base = match[6];
      const exp = match[7] || match[8];
      tokens.push({ type: 'pow', base, exp });
    } else if (match[9] && match[10]) {
      const num = match[9];
      const den = match[10];
      // Check if it qualifies as math fraction
      const isFrac = isFormula || (/[\d₀-₉θπλαμβ]/.test(num) || /[\d₀-₉θπλαμβ]/.test(den)) || (num.length === 1 && den.length === 1) || /^(PV|RT|kT|mv)$/i.test(num);
      if (isFrac) {
        tokens.push({ type: 'frac', num, den });
      } else {
        tokens.push({ type: 'text', val: full });
      }
    }

    lastIndex = regex.lastIndex;
  }

  if (lastIndex < text.length) {
    tokens.push({ type: 'text', val: text.slice(lastIndex) });
  }

  return tokens;
}

const samples = [
  'V1/T1 = V2/T2',
  'P₁V₁ / T₁ = P₂V₂ / T₂',
  'V / T = constant',
  '4/3 πr^3',
  '{1/P}',
  'and/or',
  '==highlighted==',
  '**bold**'
];

for (const s of samples) {
  console.log(`Sample: "${s}" ->`, JSON.stringify(testParser(s)));
}
