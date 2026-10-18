function isMathFraction(num, den, isFormulaChip = false) {
  if (isFormulaChip) return true;
  if (!num || !den) return false;

  const trimmedNum = num.trim();
  const trimmedDen = den.trim();

  // If either has digits, subscripts, or greek letters
  if (/[\d₀-₉θπλαμβ]/.test(trimmedNum) || /[\d₀-₉θπλαμβ]/.test(trimmedDen)) {
    return true;
  }

  // If both are single letters like V/T, P/T, a/b, x/y
  if (trimmedNum.length === 1 && trimmedDen.length === 1) {
    return true;
  }

  // Common physics variable products like PV/T or kT or RT
  if (/^(PV|RT|kT|mgh|mv)$/i.test(trimmedNum) && trimmedDen.length <= 2) {
    return true;
  }

  return false;
}

const testCases = [
  'V1/T1 = V2/T2',
  'V₁/T₁ = V₂/T₂',
  'P₁V₁ / T₁ = P₂V₂ / T₂',
  'V / T = constant',
  'P / T = constant',
  '4/3 πr³',
  '1/273',
  'V₀/273',
  'θ/273',
  '1/P',
  '1/V',
  'and/or',
  'km/h',
  'True/False',
  '{opposite/hypotenuse}'
];

console.log('Testing fraction recognition:');
for (const tc of testCases) {
  // Check explicit
  const explicit = tc.match(/\{([^}]+)\/([^}]+)\}/);
  if (explicit) {
    console.log(`"${tc}" -> EXPLICIT FRACTION: ${explicit[1]} / ${explicit[2]}`);
    continue;
  }

  // Check inline
  const matches = [...tc.matchAll(/([A-Za-z0-9₀-₉α-ωΑ-Ωθπ]+)\s*\/\s*([A-Za-z0-9₀-₉α-ωΑ-Ωθπ]+)/g)];
  if (matches.length > 0) {
    for (const m of matches) {
      const isFrac = isMathFraction(m[1], m[2]);
      console.log(`"${tc}" -> token "${m[0]}" => isFrac=${isFrac} (${m[1]} / ${m[2]})`);
    }
  } else {
    console.log(`"${tc}" -> No fraction pattern`);
  }
}
