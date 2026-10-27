import React from 'react';

/**
 * Shared styling constants for Organic Chemistry SVGs
 */
const C_COLOR = '#0f172a';
const H_COLOR = '#475569';
const O_COLOR = '#dc2626';
const N_COLOR = '#2563eb';
const BR_COLOR = '#b45309';
const BOND_COLOR = '#1e293b';
const HIGHLIGHT_BG = '#fef3c7';
const HIGHLIGHT_BORDER = '#f59e0b';

/**
 * 1. Tetrahedral Geometry of Carbon / Methane (CH4)
 * sp3 hybridization, 109°28' (109.5°) bond angle, 3D wedge-dash model
 */
export function renderCarbonTetrahedron() {
  return (
    <g>
      <rect x="12" y="10" width="236" height="140" rx="8" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1" />

      {/* Central Carbon Atom at (120, 80) */}
      <circle cx="120" cy="80" r="14" fill="#0f172a" stroke="#334155" strokeWidth="1.5" />
      <text x="120" y="85" textAnchor="middle" fontSize="13" fontWeight="900" fill="#ffffff">C</text>

      {/* 1. Top In-Plane Bond to H (Straight Up) */}
      <line x1="120" y1="66" x2="120" y2="30" stroke={BOND_COLOR} strokeWidth="2.8" strokeLinecap="round" />
      <circle cx="120" cy="22" r="10" fill="#eff6ff" stroke="#3b82f6" strokeWidth="1.6" />
      <text x="120" y="26" textAnchor="middle" fontSize="11" fontWeight="800" fill="#1e40af">H</text>

      {/* 2. Left In-Plane Bond to H */}
      <line x1="108" y1="88" x2="68" y2="108" stroke={BOND_COLOR} strokeWidth="2.8" strokeLinecap="round" />
      <circle cx="60" cy="112" r="10" fill="#eff6ff" stroke="#3b82f6" strokeWidth="1.6" />
      <text x="60" y="116" textAnchor="middle" fontSize="11" fontWeight="800" fill="#1e40af">H</text>

      {/* 3. Solid Wedge Bond (Coming forward/out of page towards bottom right) */}
      <polygon points="126,86 166,118 160,126" fill="#0f172a" />
      <circle cx="168" cy="124" r="10" fill="#eff6ff" stroke="#3b82f6" strokeWidth="1.6" />
      <text x="168" y="128" textAnchor="middle" fontSize="11" fontWeight="800" fill="#1e40af">H</text>

      {/* 4. Dashed Wedge Bond (Going backward into page towards top right) */}
      {[1, 2, 3, 4, 5].map((i) => {
        const x = 120 + i * 8.5;
        const y = 80 - i * 4;
        const len = 2.5 + i * 1.5;
        return (
          <line
            key={i}
            x1={x - len * 0.4}
            y1={y - len * 0.8}
            x2={x + len * 0.4}
            y2={y + len * 0.8}
            stroke="#475569"
            strokeWidth="2"
          />
        );
      })}
      <circle cx="170" cy="56" r="10" fill="#eff6ff" stroke="#3b82f6" strokeWidth="1.6" />
      <text x="170" y="60" textAnchor="middle" fontSize="11" fontWeight="800" fill="#1e40af">H</text>

      {/* Bond Angle Arc (between top bond and left bond) */}
      <path d="M 120,50 A 30,30 0 0,0 95,72" fill="none" stroke="#d97706" strokeWidth="1.8" />
      <rect x="80" y="44" width="44" height="15" rx="3" fill="#fffbeb" stroke="#fde68a" strokeWidth="0.8" />
      <text x="102" y="55" textAnchor="middle" fontSize="8" fontWeight="800" fill="#b45309">109°28′</text>

      {/* Explanatory callouts on left */}
      <rect x="18" y="22" width="76" height="42" rx="4" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1" />
      <text x="56" y="34" textAnchor="middle" fontSize="7.5" fontWeight="800" fill="#0f172a">Methane (CH₄)</text>
      <text x="24" y="46" fontSize="6.5" fontWeight="600" fill="#475569">• sp³ hybridized</text>
      <text x="24" y="56" fontSize="6.5" fontWeight="600" fill="#475569">• Regular tetrahedron</text>

      <text x="130" y="144" textAnchor="middle" fontSize="7.5" fontWeight="700" fill="#475569">
        All 4 C–H bonds are identical in length & energy • Angle = 109.5°
      </text>
    </g>
  );
}

/**
 * 2. Chain Isomerism of Butane (C4H10)
 * Side-by-side comparison of n-Butane (straight) vs Isobutane (branched)
 */
export function renderButaneIsomerism() {
  return (
    <g>
      <rect x="12" y="10" width="236" height="140" rx="8" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1" />

      {/* Divider line between the two isomers */}
      <line x1="130" y1="18" x2="130" y2="130" stroke="#cbd5e1" strokeWidth="1.2" strokeDasharray="3,3" />

      {/* LEFT: n-Butane (Normal Butane) */}
      <g transform="translate(18, 16)">
        <text x="52" y="12" textAnchor="middle" fontSize="8.5" fontWeight="900" fill="#0f172a">1. n-Butane</text>
        <text x="52" y="22" textAnchor="middle" fontSize="7" fontWeight="600" fill="#64748b">(Straight Chain)</text>

        {/* Structural formula: H3C - CH2 - CH2 - CH3 */}
        {/* Row of 4 Carbons: C1(14, 52), C2(38, 52), C3(62, 52), C4(86, 52) */}
        {[16, 40, 64, 88].map((cx, i) => (
          <g key={i}>
            <text x={cx} y="56" textAnchor="middle" fontSize="11" fontWeight="800" fill={C_COLOR}>C</text>
            {/* Top H */}
            <line x1={cx} y1="46" x2={cx} y2="36" stroke={BOND_COLOR} strokeWidth="1.4" />
            <text x={cx} y="34" textAnchor="middle" fontSize="8" fontWeight="700" fill={H_COLOR}>H</text>
            {/* Bottom H */}
            <line x1={cx} y1="58" x2={cx} y2="68" stroke={BOND_COLOR} strokeWidth="1.4" />
            <text x={cx} y="76" textAnchor="middle" fontSize="8" fontWeight="700" fill={H_COLOR}>H</text>
            {/* C-C horizontal bonds */}
            {i < 3 && <line x1={cx + 6} y1="52" x2={cx + 18} y2="52" stroke={BOND_COLOR} strokeWidth="1.6" />}
          </g>
        ))}
        {/* Leftmost terminal H */}
        <line x1="10" y1="52" x2="4" y2="52" stroke={BOND_COLOR} strokeWidth="1.4" />
        <text x="1" y="55" textAnchor="end" fontSize="8" fontWeight="700" fill={H_COLOR}>H</text>
        {/* Rightmost terminal H */}
        <line x1="94" y1="52" x2="100" y2="52" stroke={BOND_COLOR} strokeWidth="1.4" />
        <text x="103" y="55" fontSize="8" fontWeight="700" fill={H_COLOR}>H</text>

        {/* Condensed formula & b.p. */}
        <rect x="4" y="86" width="96" height="24" rx="4" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1" />
        <text x="52" y="97" textAnchor="middle" fontSize="7.5" fontWeight="800" fill="#0369a1">CH₃–CH₂–CH₂–CH₃</text>
        <text x="52" y="106" textAnchor="middle" fontSize="7" fontWeight="700" fill="#dc2626">Boiling Pt: −0.5°C</text>
      </g>

      {/* RIGHT: Isobutane (2-Methylpropane) */}
      <g transform="translate(136, 16)">
        <text x="54" y="12" textAnchor="middle" fontSize="8.5" fontWeight="900" fill="#0f172a">2. Isobutane</text>
        <text x="54" y="22" textAnchor="middle" fontSize="7" fontWeight="600" fill="#64748b">(Branched Chain)</text>

        {/* Central C at (54, 52), Left C at (26, 52), Right C at (82, 52), Bottom C at (54, 76) */}
        {/* Central C */}
        <text x="54" y="56" textAnchor="middle" fontSize="11" fontWeight="800" fill="#b45309">C</text>
        {/* Top H on central C */}
        <line x1="54" y1="46" x2="54" y2="36" stroke={BOND_COLOR} strokeWidth="1.4" />
        <text x="54" y="34" textAnchor="middle" fontSize="8" fontWeight="700" fill={H_COLOR}>H</text>

        {/* Left CH3 */}
        <line x1="47" y1="52" x2="33" y2="52" stroke={BOND_COLOR} strokeWidth="1.6" />
        <text x="26" y="56" textAnchor="middle" fontSize="10" fontWeight="800" fill={C_COLOR}>C</text>
        <line x1="26" y1="46" x2="26" y2="36" stroke={BOND_COLOR} strokeWidth="1.2" />
        <text x="26" y="34" textAnchor="middle" fontSize="7.5" fontWeight="700" fill={H_COLOR}>H</text>
        <line x1="26" y1="58" x2="26" y2="68" stroke={BOND_COLOR} strokeWidth="1.2" />
        <text x="26" y="75" textAnchor="middle" fontSize="7.5" fontWeight="700" fill={H_COLOR}>H</text>
        <line x1="20" y1="52" x2="14" y2="52" stroke={BOND_COLOR} strokeWidth="1.2" />
        <text x="11" y="55" textAnchor="end" fontSize="7.5" fontWeight="700" fill={H_COLOR}>H</text>

        {/* Right CH3 */}
        <line x1="61" y1="52" x2="75" y2="52" stroke={BOND_COLOR} strokeWidth="1.6" />
        <text x="82" y="56" textAnchor="middle" fontSize="10" fontWeight="800" fill={C_COLOR}>C</text>
        <line x1="82" y1="46" x2="82" y2="36" stroke={BOND_COLOR} strokeWidth="1.2" />
        <text x="82" y="34" textAnchor="middle" fontSize="7.5" fontWeight="700" fill={H_COLOR}>H</text>
        <line x1="82" y1="58" x2="82" y2="68" stroke={BOND_COLOR} strokeWidth="1.2" />
        <text x="82" y="75" textAnchor="middle" fontSize="7.5" fontWeight="700" fill={H_COLOR}>H</text>
        <line x1="88" y1="52" x2="94" y2="52" stroke={BOND_COLOR} strokeWidth="1.2" />
        <text x="96" y="55" fontSize="7.5" fontWeight="700" fill={H_COLOR}>H</text>

        {/* Bottom Branch: -CH3 */}
        <line x1="54" y1="58" x2="54" y2="70" stroke="#b45309" strokeWidth="2" />
        <text x="54" y="80" textAnchor="middle" fontSize="9" fontWeight="800" fill="#b45309">CH₃</text>

        {/* Condensed formula & b.p. */}
        <rect x="6" y="86" width="96" height="24" rx="4" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1" />
        <text x="54" y="97" textAnchor="middle" fontSize="7.5" fontWeight="800" fill="#0369a1">CH(CH₃)₃</text>
        <text x="54" y="106" textAnchor="middle" fontSize="7" fontWeight="700" fill="#dc2626">Boiling Pt: −11.7°C</text>
      </g>

      {/* Summary Footer */}
      <text x="130" y="144" textAnchor="middle" fontSize="7.5" fontWeight="800" fill="#0f172a">
        Same Molecular Formula (C₄H₁₀) • Branching lowers the boiling point
      </text>
    </g>
  );
}

/**
 * 3. Key Organic Functional Groups Matrix
 * Alcohol (-OH), Aldehyde (-CHO), Ketone (>C=O), Carboxylic Acid (-COOH)
 */
export function renderFunctionalGroupsChart() {
  return (
    <g>
      <rect x="12" y="10" width="236" height="140" rx="8" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1" />

      {/* 2x2 Grid of the 4 Main Functional Groups */}
      {/* 1. Top-Left: Alcohol (-OH) */}
      <g transform="translate(18, 16)">
        <rect x="0" y="0" width="110" height="52" rx="5" fill="#eff6ff" stroke="#bfdbfe" strokeWidth="1" />
        <text x="8" y="14" fontSize="8" fontWeight="800" fill="#1e40af">1. Alcohol</text>
        <text x="64" y="14" fontSize="7" fontWeight="700" fill="#0369a1">Suffix: -ol</text>
        {/* Structural representation: -O-H */}
        <text x="16" y="34" fontSize="10" fontWeight="800" fill="#64748b">— C —</text>
        <rect x="46" y="22" width="46" height="17" rx="3" fill="#dbeafe" stroke="#3b82f6" strokeWidth="1" />
        <text x="69" y="34" textAnchor="middle" fontSize="10" fontWeight="900" fill="#1d4ed8">— O — H</text>
        <text x="8" y="47" fontSize="6.5" fontWeight="600" fill="#475569">e.g., Ethanol (C₂H₅OH)</text>
      </g>

      {/* 2. Top-Right: Aldehyde (-CHO) */}
      <g transform="translate(132, 16)">
        <rect x="0" y="0" width="110" height="52" rx="5" fill="#f0fdf4" stroke="#bbf7d0" strokeWidth="1" />
        <text x="8" y="14" fontSize="8" fontWeight="800" fill="#166534">2. Aldehyde</text>
        <text x="64" y="14" fontSize="7" fontWeight="700" fill="#15803d">Suffix: -al</text>
        {/* Structural: -C(=O)H */}
        <text x="12" y="34" fontSize="10" fontWeight="800" fill="#64748b">—</text>
        <rect x="22" y="20" width="78" height="20" rx="3" fill="#dcfce7" stroke="#22c55e" strokeWidth="1" />
        <text x="36" y="34" fontSize="10" fontWeight="900" fill="#15803d">C</text>
        {/* Double bond O */}
        <line x1="39" y1="26" x2="47" y2="21" stroke="#15803d" strokeWidth="1.3" />
        <line x1="41" y1="28" x2="49" y2="23" stroke="#15803d" strokeWidth="1.3" />
        <text x="54" y="25" fontSize="8" fontWeight="900" fill="#dc2626">=O</text>
        {/* Single bond H */}
        <line x1="42" y1="34" x2="50" y2="34" stroke="#15803d" strokeWidth="1.3" />
        <text x="56" y="37" fontSize="8" fontWeight="900" fill="#15803d">—H</text>
        <text x="8" y="47" fontSize="6.5" fontWeight="600" fill="#475569">e.g., Ethanal (CH₃CHO)</text>
      </g>

      {/* 3. Bottom-Left: Ketone (>C=O) */}
      <g transform="translate(18, 74)">
        <rect x="0" y="0" width="110" height="52" rx="5" fill="#fffbeb" stroke="#fde68a" strokeWidth="1" />
        <text x="8" y="14" fontSize="8" fontWeight="800" fill="#92400e">3. Ketone</text>
        <text x="60" y="14" fontSize="7" fontWeight="700" fill="#b45309">Suffix: -one</text>
        {/* Structural: -C(=O)- */}
        <rect x="24" y="20" width="62" height="20" rx="3" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1" />
        <text x="30" y="34" fontSize="10" fontWeight="800" fill="#64748b">—</text>
        <text x="44" y="34" fontSize="10" fontWeight="900" fill="#92400e">C</text>
        <text x="56" y="34" fontSize="10" fontWeight="800" fill="#64748b">—</text>
        <line x1="43" y1="24" x2="43" y2="18" stroke="#dc2626" strokeWidth="1.4" />
        <line x1="46" y1="24" x2="46" y2="18" stroke="#dc2626" strokeWidth="1.4" />
        <text x="44" y="17" textAnchor="middle" fontSize="7.5" fontWeight="900" fill="#dc2626">O</text>
        <text x="8" y="47" fontSize="6.5" fontWeight="600" fill="#475569">e.g., Propanone (CH₃COCH₃)</text>
      </g>

      {/* 4. Bottom-Right: Carboxylic Acid (-COOH) */}
      <g transform="translate(132, 74)">
        <rect x="0" y="0" width="110" height="52" rx="5" fill="#fef2f2" stroke="#fecaca" strokeWidth="1" />
        <text x="8" y="14" fontSize="8" fontWeight="800" fill="#991b1b">4. Carboxylic Acid</text>
        <text x="66" y="14" fontSize="7" fontWeight="700" fill="#b91c1c">-oic acid</text>
        {/* Structural: -C(=O)OH */}
        <rect x="18" y="20" width="82" height="20" rx="3" fill="#fee2e2" stroke="#ef4444" strokeWidth="1" />
        <text x="24" y="34" fontSize="10" fontWeight="800" fill="#64748b">—</text>
        <text x="36" y="34" fontSize="10" fontWeight="900" fill="#991b1b">C</text>
        <text x="48" y="26" fontSize="7.5" fontWeight="900" fill="#dc2626">=O</text>
        <text x="48" y="37" fontSize="7.5" fontWeight="900" fill="#991b1b">—OH</text>
        <text x="8" y="47" fontSize="6.5" fontWeight="600" fill="#475569">e.g., Acetic acid (CH₃COOH)</text>
      </g>

      {/* Footer */}
      <text x="130" y="138" textAnchor="middle" fontSize="7" fontWeight="700" fill="#475569">
        Functional groups dictate chemical properties of organic compounds
      </text>
    </g>
  );
}

/**
 * 4. Ethanol Structure (CH3-CH2-OH)
 * Expanded structural formula with functional group -OH highlighted
 */
export function renderEthanolStructure() {
  return (
    <g>
      <rect x="12" y="10" width="236" height="140" rx="8" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1" />

      {/* IUPAC Title Badge */}
      <text x="130" y="24" textAnchor="middle" fontSize="9" fontWeight="900" fill="#0f172a">
        Ethanol (Ethyl Alcohol) • C₂H₅OH
      </text>

      {/* Structural layout:
          H         H
          |         |
      H — C1 ——— C2 ——— O — H   (Functional group -O-H highlighted in blue box)
          |         |
          H         H
      */}
      <g transform="translate(42, 34)">
        {/* Functional group highlight box around O-H */}
        <rect x="110" y="10" width="56" height="48" rx="6" fill="#eff6ff" stroke="#3b82f6" strokeWidth="1.5" strokeDasharray="3,2" />
        <text x="138" y="6" textAnchor="middle" fontSize="7" fontWeight="800" fill="#1d4ed8">Functional Group (-OH)</text>

        {/* C1 (Methyl Carbon) at (32, 34) */}
        <text x="32" y="38" textAnchor="middle" fontSize="13" fontWeight="900" fill={C_COLOR}>C</text>
        {/* C1 - Top H */}
        <line x1="32" y1="26" x2="32" y2="14" stroke={BOND_COLOR} strokeWidth="1.6" />
        <text x="32" y="11" textAnchor="middle" fontSize="9.5" fontWeight="800" fill={H_COLOR}>H</text>
        {/* C1 - Bottom H */}
        <line x1="32" y1="42" x2="32" y2="54" stroke={BOND_COLOR} strokeWidth="1.6" />
        <text x="32" y="63" textAnchor="middle" fontSize="9.5" fontWeight="800" fill={H_COLOR}>H</text>
        {/* C1 - Left H */}
        <line x1="24" y1="34" x2="12" y2="34" stroke={BOND_COLOR} strokeWidth="1.6" />
        <text x="8" y="38" textAnchor="end" fontSize="9.5" fontWeight="800" fill={H_COLOR}>H</text>

        {/* C1 to C2 bond */}
        <line x1="40" y1="34" x2="68" y2="34" stroke={BOND_COLOR} strokeWidth="2.2" />

        {/* C2 (Methylene Carbon) at (76, 34) */}
        <text x="76" y="38" textAnchor="middle" fontSize="13" fontWeight="900" fill={C_COLOR}>C</text>
        {/* C2 - Top H */}
        <line x1="76" y1="26" x2="76" y2="14" stroke={BOND_COLOR} strokeWidth="1.6" />
        <text x="76" y="11" textAnchor="middle" fontSize="9.5" fontWeight="800" fill={H_COLOR}>H</text>
        {/* C2 - Bottom H */}
        <line x1="76" y1="42" x2="76" y2="54" stroke={BOND_COLOR} strokeWidth="1.6" />
        <text x="76" y="63" textAnchor="middle" fontSize="9.5" fontWeight="800" fill={H_COLOR}>H</text>

        {/* C2 to O bond */}
        <line x1="84" y1="34" x2="116" y2="34" stroke={BOND_COLOR} strokeWidth="2.2" />

        {/* Oxygen atom at (124, 34) */}
        <text x="124" y="38" textAnchor="middle" fontSize="13" fontWeight="900" fill={O_COLOR}>O</text>
        {/* O lone pairs */}
        <circle cx="120" cy="22" r="1.2" fill={O_COLOR} /><circle cx="128" cy="22" r="1.2" fill={O_COLOR} />
        <circle cx="120" cy="46" r="1.2" fill={O_COLOR} /><circle cx="128" cy="46" r="1.2" fill={O_COLOR} />

        {/* O to H bond */}
        <line x1="132" y1="34" x2="152" y2="34" stroke={BOND_COLOR} strokeWidth="1.8" />
        {/* Terminal H */}
        <text x="156" y="38" fontSize="10" fontWeight="900" fill="#1d4ed8">H</text>
      </g>

      {/* Key Properties Box */}
      <rect x="22" y="104" width="216" height="36" rx="4" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1" />
      <text x="130" y="117" textAnchor="middle" fontSize="7.5" fontWeight="800" fill="#0f172a">
        Reaction with Sodium: 2C₂H₅OH + 2Na → 2C₂H₅ONa + H₂↑ (Effervescence)
      </text>
      <text x="130" y="130" textAnchor="middle" fontSize="7" fontWeight="600" fill="#475569">
        Dehydration with conc. H₂SO₄ at 170°C yields Ethene (CH₂=CH₂)
      </text>
    </g>
  );
}

/**
 * 5. Ethanoic Acid / Acetic Acid Structure (CH3-COOH)
 * Functional group -COOH highlighted
 */
export function renderEthanoicAcidStructure() {
  return (
    <g>
      <rect x="12" y="10" width="236" height="140" rx="8" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1" />

      <text x="130" y="24" textAnchor="middle" fontSize="9" fontWeight="900" fill="#0f172a">
        Ethanoic Acid (Acetic Acid) • CH₃COOH
      </text>

      {/* Structural layout:
          H         O
          |       //
      H — C ——— C
          |       \
          H        O — H
      */}
      <g transform="translate(42, 34)">
        {/* Functional group highlight box around -COOH */}
        <rect x="64" y="6" width="102" height="54" rx="6" fill="#fef2f2" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="3,2" />
        <text x="115" y="4" textAnchor="middle" fontSize="7" fontWeight="800" fill="#b91c1c">Carboxyl Group (-COOH)</text>

        {/* Methyl Carbon at (32, 34) */}
        <text x="32" y="38" textAnchor="middle" fontSize="13" fontWeight="900" fill={C_COLOR}>C</text>
        <line x1="32" y1="26" x2="32" y2="14" stroke={BOND_COLOR} strokeWidth="1.6" />
        <text x="32" y="11" textAnchor="middle" fontSize="9.5" fontWeight="800" fill={H_COLOR}>H</text>
        <line x1="32" y1="42" x2="32" y2="54" stroke={BOND_COLOR} strokeWidth="1.6" />
        <text x="32" y="63" textAnchor="middle" fontSize="9.5" fontWeight="800" fill={H_COLOR}>H</text>
        <line x1="24" y1="34" x2="12" y2="34" stroke={BOND_COLOR} strokeWidth="1.6" />
        <text x="8" y="38" textAnchor="end" fontSize="9.5" fontWeight="800" fill={H_COLOR}>H</text>

        {/* C to C bond */}
        <line x1="40" y1="34" x2="72" y2="34" stroke={BOND_COLOR} strokeWidth="2.2" />

        {/* Carboxyl Carbon at (80, 34) */}
        <text x="80" y="38" textAnchor="middle" fontSize="13" fontWeight="900" fill="#b91c1c">C</text>

        {/* Double bond to Carbonyl Oxygen (upward slant) */}
        <line x1="84" y1="28" x2="108" y2="16" stroke="#b91c1c" strokeWidth="2" />
        <line x1="87" y1="33" x2="111" y2="21" stroke="#b91c1c" strokeWidth="2" />
        <text x="118" y="18" fontSize="13" fontWeight="900" fill={O_COLOR}>O</text>

        {/* Single bond to Hydroxyl Oxygen (downward slant) */}
        <line x1="86" y1="40" x2="108" y2="48" stroke="#b91c1c" strokeWidth="2" />
        <text x="114" y="52" fontSize="12" fontWeight="900" fill={O_COLOR}>O</text>
        <line x1="124" y1="48" x2="140" y2="48" stroke={BOND_COLOR} strokeWidth="1.8" />
        <text x="144" y="52" fontSize="10" fontWeight="900" fill="#b91c1c">H</text>
      </g>

      {/* Properties note at bottom */}
      <rect x="22" y="104" width="216" height="36" rx="4" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1" />
      <text x="130" y="117" textAnchor="middle" fontSize="7.5" fontWeight="800" fill="#b91c1c">
        Vinegar is 5–8% solution of acetic acid in water • Turns blue litmus RED
      </text>
      <text x="130" y="130" textAnchor="middle" fontSize="7" fontWeight="600" fill="#475569">
        Pure anhydrous acid freezes into ice-like crystals at 16.6°C (Glacial acetic acid)
      </text>
    </g>
  );
}

/**
 * 6. Ethanal / Acetaldehyde Structure (CH3-CHO)
 * Terminal aldehyde carbonyl group highlighted
 */
export function renderEthanalStructure() {
  return (
    <g>
      <rect x="12" y="10" width="236" height="140" rx="8" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1" />

      <text x="130" y="24" textAnchor="middle" fontSize="9" fontWeight="900" fill="#0f172a">
        Ethanal (Acetaldehyde) • CH₃CHO
      </text>

      <g transform="translate(48, 34)">
        {/* Functional group box */}
        <rect x="60" y="6" width="94" height="54" rx="6" fill="#f0fdf4" stroke="#22c55e" strokeWidth="1.5" strokeDasharray="3,2" />
        <text x="107" y="4" textAnchor="middle" fontSize="7" fontWeight="800" fill="#15803d">Formyl Group (-CHO)</text>

        {/* Methyl Carbon C1 */}
        <text x="32" y="38" textAnchor="middle" fontSize="13" fontWeight="900" fill={C_COLOR}>C</text>
        <line x1="32" y1="26" x2="32" y2="14" stroke={BOND_COLOR} strokeWidth="1.6" />
        <text x="32" y="11" textAnchor="middle" fontSize="9.5" fontWeight="800" fill={H_COLOR}>H</text>
        <line x1="32" y1="42" x2="32" y2="54" stroke={BOND_COLOR} strokeWidth="1.6" />
        <text x="32" y="63" textAnchor="middle" fontSize="9.5" fontWeight="800" fill={H_COLOR}>H</text>
        <line x1="24" y1="34" x2="12" y2="34" stroke={BOND_COLOR} strokeWidth="1.6" />
        <text x="8" y="38" textAnchor="end" fontSize="9.5" fontWeight="800" fill={H_COLOR}>H</text>

        {/* C1 to C2 bond */}
        <line x1="40" y1="34" x2="72" y2="34" stroke={BOND_COLOR} strokeWidth="2.2" />

        {/* Aldehyde Carbon C2 */}
        <text x="80" y="38" textAnchor="middle" fontSize="13" fontWeight="900" fill="#15803d">C</text>

        {/* Double bond to O */}
        <line x1="84" y1="28" x2="108" y2="16" stroke="#15803d" strokeWidth="2" />
        <line x1="87" y1="33" x2="111" y2="21" stroke="#15803d" strokeWidth="2" />
        <text x="118" y="18" fontSize="13" fontWeight="900" fill={O_COLOR}>O</text>

        {/* Single bond to terminal H */}
        <line x1="88" y1="40" x2="112" y2="48" stroke={BOND_COLOR} strokeWidth="1.8" />
        <text x="118" y="52" fontSize="10" fontWeight="900" fill="#15803d">H</text>
      </g>

      <rect x="22" y="104" width="216" height="36" rx="4" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1" />
      <text x="130" y="117" textAnchor="middle" fontSize="7.5" fontWeight="800" fill="#0f172a">
        First member of aldehyde series is Methanal / Formaldehyde (HCHO)
      </text>
      <text x="130" y="130" textAnchor="middle" fontSize="7" fontWeight="600" fill="#475569">
        Reduces Tollens' reagent and Fehling's solution (silver mirror / red Cu₂O ppt)
      </text>
    </g>
  );
}

/**
 * 7. Propanone / Acetone Structure (CH3-CO-CH3)
 * Central keto carbonyl group highlighted
 */
export function renderPropanoneStructure() {
  return (
    <g>
      <rect x="12" y="10" width="236" height="140" rx="8" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1" />

      <text x="130" y="24" textAnchor="middle" fontSize="9" fontWeight="900" fill="#0f172a">
        Propanone (Acetone) • CH₃COCH₃
      </text>

      <g transform="translate(30, 34)">
        {/* Keto group highlight box */}
        <rect x="68" y="6" width="46" height="54" rx="6" fill="#fffbeb" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="3,2" />
        <text x="91" y="4" textAnchor="middle" fontSize="7" fontWeight="800" fill="#b45309">{'Keto (>C=O)'}</text>

        {/* Left Methyl C1 */}
        <text x="32" y="42" textAnchor="middle" fontSize="12" fontWeight="900" fill={C_COLOR}>C</text>
        <line x1="32" y1="30" x2="32" y2="18" stroke={BOND_COLOR} strokeWidth="1.5" />
        <text x="32" y="15" textAnchor="middle" fontSize="9" fontWeight="800" fill={H_COLOR}>H</text>
        <line x1="32" y1="46" x2="32" y2="58" stroke={BOND_COLOR} strokeWidth="1.5" />
        <text x="32" y="67" textAnchor="middle" fontSize="9" fontWeight="800" fill={H_COLOR}>H</text>
        <line x1="24" y1="38" x2="12" y2="38" stroke={BOND_COLOR} strokeWidth="1.5" />
        <text x="8" y="42" textAnchor="end" fontSize="9" fontWeight="800" fill={H_COLOR}>H</text>

        {/* Bond to central C2 */}
        <line x1="40" y1="38" x2="80" y2="38" stroke={BOND_COLOR} strokeWidth="2.2" />

        {/* Central Carbon C2 */}
        <text x="91" y="42" textAnchor="middle" fontSize="13" fontWeight="900" fill="#b45309">C</text>
        {/* Double bond to O (Straight up) */}
        <line x1="88" y1="30" x2="88" y2="16" stroke="#dc2626" strokeWidth="1.8" />
        <line x1="94" y1="30" x2="94" y2="16" stroke="#dc2626" strokeWidth="1.8" />
        <text x="91" y="13" textAnchor="middle" fontSize="12" fontWeight="900" fill={O_COLOR}>O</text>

        {/* Bond to right C3 */}
        <line x1="102" y1="38" x2="142" y2="38" stroke={BOND_COLOR} strokeWidth="2.2" />

        {/* Right Methyl C3 */}
        <text x="150" y="42" textAnchor="middle" fontSize="12" fontWeight="900" fill={C_COLOR}>C</text>
        <line x1="150" y1="30" x2="150" y2="18" stroke={BOND_COLOR} strokeWidth="1.5" />
        <text x="150" y="15" textAnchor="middle" fontSize="9" fontWeight="800" fill={H_COLOR}>H</text>
        <line x1="150" y1="46" x2="150" y2="58" stroke={BOND_COLOR} strokeWidth="1.5" />
        <text x="150" y="67" textAnchor="middle" fontSize="9" fontWeight="800" fill={H_COLOR}>H</text>
        <line x1="158" y1="38" x2="170" y2="38" stroke={BOND_COLOR} strokeWidth="1.5" />
        <text x="174" y="42" fontSize="9" fontWeight="800" fill={H_COLOR}>H</text>
      </g>

      <rect x="22" y="104" width="216" height="36" rx="4" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1" />
      <text x="130" y="117" textAnchor="middle" fontSize="7.5" fontWeight="800" fill="#0f172a">
        Simplest ketone has minimum 3 carbon atoms (Propan-2-one)
      </text>
      <text x="130" y="130" textAnchor="middle" fontSize="7" fontWeight="600" fill="#475569">
        Volatile organic solvent • Key ingredient in nail polish remover
      </text>
    </g>
  );
}

/**
 * 8. Hydrocarbon Unsaturation (Alkane vs Alkene vs Alkyne)
 * C-C single (saturated), C=C double (unsaturated), C≡C triple (unsaturated)
 */
export function renderHydrocarbonTypes() {
  return (
    <g>
      <rect x="12" y="10" width="236" height="140" rx="8" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1" />

      {/* 3 Columns: Ethane, Ethene, Ethyne */}
      {/* 1. Ethane (C-C) */}
      <g transform="translate(18, 16)">
        <rect x="0" y="0" width="68" height="106" rx="5" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1" />
        <text x="34" y="14" textAnchor="middle" fontSize="8" fontWeight="900" fill="#1e293b">1. Alkane</text>
        <text x="34" y="24" textAnchor="middle" fontSize="7" fontWeight="700" fill="#2563eb">Ethane (C₂H₆)</text>

        {/* Structure */}
        <text x="34" y="52" textAnchor="middle" fontSize="9" fontWeight="800" fill="#0f172a">H₃C — CH₃</text>
        <rect x="14" y="62" width="40" height="15" rx="3" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="0.8" />
        <text x="34" y="72" textAnchor="middle" fontSize="7" fontWeight="800" fill="#0f172a">Single Bond</text>

        <text x="34" y="87" textAnchor="middle" fontSize="6.5" fontWeight="700" fill="#047857">Saturated</text>
        <text x="34" y="97" textAnchor="middle" fontSize="6.5" fontWeight="600" fill="#64748b">CₙH₂ₙ₊₂</text>
      </g>

      {/* 2. Ethene (C=C) */}
      <g transform="translate(94, 16)">
        <rect x="0" y="0" width="72" height="106" rx="5" fill="#f0fdf4" stroke="#86efac" strokeWidth="1.2" />
        <text x="36" y="14" textAnchor="middle" fontSize="8" fontWeight="900" fill="#166534">2. Alkene</text>
        <text x="36" y="24" textAnchor="middle" fontSize="7" fontWeight="700" fill="#15803d">Ethene (C₂H₄)</text>

        {/* Structure */}
        <text x="36" y="52" textAnchor="middle" fontSize="9.5" fontWeight="900" fill="#15803d">H₂C = CH₂</text>
        <rect x="14" y="62" width="44" height="15" rx="3" fill="#dcfce7" stroke="#22c55e" strokeWidth="0.8" />
        <text x="36" y="72" textAnchor="middle" fontSize="7" fontWeight="900" fill="#15803d">Double Bond</text>

        <text x="36" y="87" textAnchor="middle" fontSize="6.5" fontWeight="800" fill="#b91c1c">Unsaturated</text>
        <text x="36" y="97" textAnchor="middle" fontSize="6.5" fontWeight="600" fill="#64748b">CₙH₂ₙ</text>
      </g>

      {/* 3. Ethyne (C≡C) */}
      <g transform="translate(174, 16)">
        <rect x="0" y="0" width="68" height="106" rx="5" fill="#fffbeb" stroke="#fde68a" strokeWidth="1.2" />
        <text x="34" y="14" textAnchor="middle" fontSize="8" fontWeight="900" fill="#92400e">3. Alkyne</text>
        <text x="34" y="24" textAnchor="middle" fontSize="7" fontWeight="700" fill="#b45309">Ethyne (C₂H₂)</text>

        {/* Structure */}
        <text x="34" y="52" textAnchor="middle" fontSize="9.5" fontWeight="900" fill="#b45309">HC ≡ CH</text>
        <rect x="12" y="62" width="44" height="15" rx="3" fill="#fef3c7" stroke="#f59e0b" strokeWidth="0.8" />
        <text x="34" y="72" textAnchor="middle" fontSize="7" fontWeight="900" fill="#b45309">Triple Bond</text>

        <text x="34" y="87" textAnchor="middle" fontSize="6.5" fontWeight="800" fill="#b91c1c">Unsaturated</text>
        <text x="34" y="97" textAnchor="middle" fontSize="6.5" fontWeight="600" fill="#64748b">CₙH₂ₙ₋₂</text>
      </g>

      <text x="130" y="140" textAnchor="middle" fontSize="7" fontWeight="700" fill="#475569">
        Unsaturated hydrocarbons undergo Addition reactions • Saturated undergo Substitution
      </text>
    </g>
  );
}

/**
 * 9. Esterification Reaction Scheme
 * CH3COOH + C2H5OH -> CH3COOC2H5 + H2O (sweet fruity smell)
 */
export function renderEsterificationReaction() {
  return (
    <g>
      <rect x="12" y="10" width="236" height="140" rx="8" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1" />

      {/* Title */}
      <text x="130" y="23" textAnchor="middle" fontSize="8.5" fontWeight="900" fill="#0f172a">
        Esterification: Formation of Sweet-Smelling Ester
      </text>

      {/* Reaction visual layout:
          CH3-C(=O)[OH  +  H]O-CH2-CH3  ===> CH3-COO-C2H5 + H2O
      */}
      <g transform="translate(18, 30)">
        {/* Ethanoic acid */}
        <rect x="0" y="0" width="62" height="34" rx="4" fill="#fef2f2" stroke="#fca5a5" strokeWidth="1" />
        <text x="31" y="13" textAnchor="middle" fontSize="7.5" fontWeight="800" fill="#b91c1c">Acetic Acid</text>
        <text x="22" y="27" fontSize="8" fontWeight="800" fill="#0f172a">CH₃CO</text>
        {/* Leaving -OH */}
        <rect x="46" y="16" width="14" height="15" fill="#fee2e2" stroke="#dc2626" strokeWidth="1" strokeDasharray="2,1" />
        <text x="53" y="27" textAnchor="middle" fontSize="7.5" fontWeight="900" fill="#dc2626">OH</text>

        {/* Plus sign */}
        <text x="69" y="22" textAnchor="middle" fontSize="12" fontWeight="700" fill="#64748b">+</text>

        {/* Ethanol */}
        <rect x="76" y="0" width="60" height="34" rx="4" fill="#eff6ff" stroke="#bfdbfe" strokeWidth="1" />
        <text x="106" y="13" textAnchor="middle" fontSize="7.5" fontWeight="800" fill="#1e40af">Ethanol</text>
        {/* Leaving -H */}
        <rect x="80" y="16" width="10" height="15" fill="#dbeafe" stroke="#2563eb" strokeWidth="1" strokeDasharray="2,1" />
        <text x="85" y="27" textAnchor="middle" fontSize="7.5" fontWeight="900" fill="#2563eb">H</text>
        <text x="96" y="27" fontSize="8" fontWeight="800" fill="#0f172a">OC₂H₅</text>

        {/* Catalyst arrow with conc. H2SO4 */}
        <g transform="translate(142, 17)">
          <line x1="0" y1="0" x2="30" y2="0" stroke="#0f172a" strokeWidth="1.6" />
          <polygon points="32,0 26,-3 26,3" fill="#0f172a" />
          <text x="15" y="-5" textAnchor="middle" fontSize="6.5" fontWeight="800" fill="#b45309">conc. H₂SO₄</text>
          <text x="15" y="8" textAnchor="middle" fontSize="6.5" fontWeight="700" fill="#dc2626">Δ (Heat)</text>
        </g>

        {/* Formed H2O bubble floating down */}
        <path d="M 53,31 Q 69,50 85,31" fill="none" stroke="#2563eb" strokeWidth="1.2" strokeDasharray="2,2" />
        <rect x="58" y="44" width="28" height="15" rx="3" fill="#eff6ff" stroke="#60a5fa" strokeWidth="1" />
        <text x="72" y="55" textAnchor="middle" fontSize="7.5" fontWeight="900" fill="#1d4ed8">+ H₂O</text>

        {/* Ethyl Acetate Product (Right Box) */}
        <rect x="178" y="0" width="46" height="34" rx="4" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.5" />
        <text x="201" y="12" textAnchor="middle" fontSize="6.5" fontWeight="900" fill="#92400e">Ethyl Acetate</text>
        <text x="201" y="24" textAnchor="middle" fontSize="7.5" fontWeight="900" fill="#b45309">CH₃COOC₂H₅</text>
      </g>

      {/* Fruity aroma callout */}
      <rect x="22" y="98" width="216" height="38" rx="4" fill="#fffbeb" stroke="#fde68a" strokeWidth="1" />
      <text x="130" y="112" textAnchor="middle" fontSize="7.5" fontWeight="900" fill="#b45309">
        ★ Characteristic pleasant fruity aroma confirms ester formation
      </text>
      <text x="130" y="127" textAnchor="middle" fontSize="7" fontWeight="600" fill="#475569">
        Concentrated H₂SO₄ acts as catalyst and dehydrating agent (absorbs water)
      </text>
    </g>
  );
}

/**
 * 10. Bromine Water Test for Unsaturation
 * Decolourization distinguishes Ethene from Ethane
 */
export function renderBromineTestEthene() {
  return (
    <g>
      <rect x="12" y="10" width="236" height="140" rx="8" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1" />

      {/* Title */}
      <text x="130" y="22" textAnchor="middle" fontSize="8.5" fontWeight="900" fill="#0f172a">
        Bromine Water Test: Detecting Unsaturation (C=C)
      </text>

      {/* Test Tube 1: Ethane (Alkane) -> NO reaction (remains red-brown) */}
      <g transform="translate(30, 30)">
        <text x="36" y="10" textAnchor="middle" fontSize="8" fontWeight="800" fill="#1e293b">1. Ethane (C₂H₆)</text>
        {/* Test tube */}
        <rect x="24" y="16" width="24" height="52" rx="12" fill="#fff" stroke="#94a3b8" strokeWidth="1.4" />
        {/* Red-brown bromine solution */}
        <path d="M 25,40 Q 36,43 47,40 L 47,56 A 11,11 0 0,1 25,56 Z" fill="#b45309" opacity="0.85" />
        <text x="36" y="52" textAnchor="middle" fontSize="6.5" fontWeight="900" fill="#ffffff">Br₂</text>

        {/* Result badge */}
        <rect x="2" y="74" width="68" height="20" rx="3" fill="#fee2e2" stroke="#ef4444" strokeWidth="1" />
        <text x="36" y="84" textAnchor="middle" fontSize="7" fontWeight="900" fill="#b91c1c">NO REACTION</text>
        <text x="36" y="91" textAnchor="middle" fontSize="6" fontWeight="600" fill="#7f1d1d">Remains Red-Brown</text>
      </g>

      {/* Test Tube 2: Ethene (Alkene) -> Decolourizes (Colourless) */}
      <g transform="translate(136, 30)">
        <text x="36" y="10" textAnchor="middle" fontSize="8" fontWeight="800" fill="#15803d">2. Ethene (C₂H₄)</text>
        {/* Test tube */}
        <rect x="24" y="16" width="24" height="52" rx="12" fill="#fff" stroke="#94a3b8" strokeWidth="1.4" />
        {/* Decolourized clear liquid */}
        <path d="M 25,40 Q 36,43 47,40 L 47,56 A 11,11 0 0,1 25,56 Z" fill="#e0f2fe" opacity="0.6" stroke="#38bdf8" strokeWidth="0.8" />
        <text x="36" y="52" textAnchor="middle" fontSize="6.5" fontWeight="800" fill="#0284c7">Clear</text>

        {/* Result badge */}
        <rect x="0" y="74" width="72" height="20" rx="3" fill="#dcfce7" stroke="#22c55e" strokeWidth="1" />
        <text x="36" y="84" textAnchor="middle" fontSize="7" fontWeight="900" fill="#15803d">DECOLOURIZED!</text>
        <text x="36" y="91" textAnchor="middle" fontSize="6" fontWeight="600" fill="#14532d">Forms 1,2-dibromoethane</text>
      </g>

      {/* Reaction Formula Footer */}
      <rect x="22" y="124" width="216" height="20" rx="3" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1" />
      <text x="130" y="138" textAnchor="middle" fontSize="7.5" fontWeight="800" fill="#0f172a">
        CH₂=CH₂ + Br₂ (Red-brown) → CH₂Br–CH₂Br (Colourless)
      </text>
    </g>
  );
}

/**
 * 11. Laboratory Preparation of Methane (CH4)
 * Heating Sodium acetate with Soda lime; Methane collected over water
 */
export function renderLabPrepMethane() {
  return (
    <g>
      <rect x="12" y="10" width="236" height="140" rx="8" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1" />

      {/* Title */}
      <text x="130" y="22" textAnchor="middle" fontSize="8.5" fontWeight="900" fill="#0f172a">
        Laboratory Preparation of Methane (CH₄)
      </text>

      {/* Retort / Hard glass test tube with reactants */}
      <g transform="translate(18, 30)">
        {/* Clamp stand */}
        <line x1="72" y1="10" x2="72" y2="76" stroke="#475569" strokeWidth="2.5" />
        <line x1="58" y1="76" x2="86" y2="76" stroke="#475569" strokeWidth="3" />
        {/* Clamp ring */}
        <rect x="68" y="28" width="8" height="6" fill="#334155" />

        {/* Slanted hard glass test tube */}
        <path d="M 16,36 L 68,26 L 70,36 L 18,46 Z" fill="#ffffff" stroke="#334155" strokeWidth="1.4" />
        {/* Reactants: Sodium Acetate + Soda Lime */}
        <polygon points="20,44 48,39 46,35 18,40" fill="#fde68a" stroke="#d97706" strokeWidth="0.8" />
        <text x="32" y="56" textAnchor="middle" fontSize="6.5" fontWeight="800" fill="#92400e">CH₃COONa + Soda lime</text>

        {/* Bunsen burner heating below */}
        <rect x="30" y="62" width="6" height="14" fill="#64748b" />
        <ellipse cx="33" cy="62" rx="4" ry="7" fill="#fb923c" />
        <ellipse cx="33" cy="62" rx="2" ry="4" fill="#38bdf8" />

        {/* Cork at test tube mouth */}
        <polygon points="68,26 73,25 75,35 70,36" fill="#78350f" />

        {/* Delivery tube going up, right, then down into trough */}
        <path d="M 74,30 L 110,24 L 140,54 L 140,70" fill="none" stroke="#0284c7" strokeWidth="2" strokeLinecap="round" />
      </g>

      {/* Water Trough & Inverted Gas Jar */}
      <g transform="translate(148, 64)">
        {/* Water trough */}
        <rect x="0" y="16" width="84" height="26" rx="4" fill="#e0f2fe" stroke="#0284c7" strokeWidth="1.2" />
        <text x="42" y="38" textAnchor="middle" fontSize="6.5" fontWeight="700" fill="#0369a1">Water Trough</text>

        {/* Inverted Gas Jar */}
        <rect x="22" y="0" width="30" height="38" rx="2" fill="#f8fafc" stroke="#334155" strokeWidth="1.4" />
        {/* Methane Gas pocket at top of inverted jar */}
        <rect x="23" y="1" width="28" height="15" rx="1" fill="#fef08a" />
        <text x="36" y="11" textAnchor="middle" fontSize="7.5" fontWeight="900" fill="#854d0e">CH₄ Gas</text>

        {/* Gas bubbles rising in water */}
        <circle cx="34" cy="22" r="1.5" fill="#38bdf8" />
        <circle cx="38" cy="28" r="2" fill="#38bdf8" />
        <circle cx="32" cy="33" r="1.8" fill="#38bdf8" />
      </g>

      {/* Reaction Formula Banner */}
      <rect x="20" y="118" width="220" height="26" rx="4" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1" />
      <text x="130" y="129" textAnchor="middle" fontSize="7.5" fontWeight="800" fill="#0f172a">
        CH₃COONa + NaOH ⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯→ CH₄↑ + Na₂CO₃
      </text>
      <text x="130" y="139" textAnchor="middle" fontSize="6.5" fontWeight="700" fill="#b45309">
        CaO (quicklime) keeps soda lime dry and prevents glass tube cracking
      </text>
    </g>
  );
}

/**
 * 12. Laboratory Preparation of Acetylene (C2H2)
 * Calcium carbide (CaC2) + Water; Acetylene collected over water
 */
export function renderLabPrepAcetylene() {
  return (
    <g>
      <rect x="12" y="10" width="236" height="140" rx="8" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1" />

      {/* Title */}
      <text x="130" y="22" textAnchor="middle" fontSize="8.5" fontWeight="900" fill="#0f172a">
        Laboratory Preparation of Ethyne / Acetylene (C₂H₂)
      </text>

      {/* Conical Flask with Thistle/Dropping Funnel */}
      <g transform="translate(24, 32)">
        {/* Conical Flask */}
        <path d="M 40,32 L 20,72 L 64,72 L 44,32 Z" fill="#ffffff" stroke="#334155" strokeWidth="1.4" />
        {/* CaC2 lumps at bottom */}
        <circle cx="32" cy="68" r="4" fill="#64748b" /><circle cx="42" cy="67" r="5" fill="#475569" /><circle cx="50" cy="69" r="3.5" fill="#64748b" />
        <text x="42" y="81" textAnchor="middle" fontSize="6.5" fontWeight="800" fill="#1e293b">CaC₂ lumps</text>

        {/* Dropping funnel with water */}
        <line x1="36" y1="6" x2="36" y2="48" stroke="#0284c7" strokeWidth="1.8" />
        <ellipse cx="36" cy="6" rx="8" ry="4" fill="#e0f2fe" stroke="#0284c7" strokeWidth="1" />
        <text x="36" y="2" textAnchor="middle" fontSize="6.5" fontWeight="700" fill="#0284c7">Water</text>

        {/* Delivery tube exiting flask to right */}
        <path d="M 46,32 L 46,20 L 98,20 L 126,52 L 126,68" fill="none" stroke="#ea580c" strokeWidth="2" strokeLinecap="round" />
      </g>

      {/* Water trough & inverted jar */}
      <g transform="translate(148, 64)">
        <rect x="0" y="16" width="84" height="26" rx="4" fill="#e0f2fe" stroke="#0284c7" strokeWidth="1.2" />
        <text x="42" y="38" textAnchor="middle" fontSize="6.5" fontWeight="700" fill="#0369a1">Water Trough</text>

        <rect x="22" y="0" width="30" height="38" rx="2" fill="#f8fafc" stroke="#334155" strokeWidth="1.4" />
        <rect x="23" y="1" width="28" height="15" rx="1" fill="#fef3c7" />
        <text x="36" y="11" textAnchor="middle" fontSize="7.5" fontWeight="900" fill="#b45309">C₂H₂ Gas</text>

        <circle cx="34" cy="22" r="1.5" fill="#38bdf8" />
        <circle cx="38" cy="28" r="2" fill="#38bdf8" />
      </g>

      {/* Chemical equation footer */}
      <rect x="20" y="118" width="220" height="26" rx="4" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1" />
      <text x="130" y="129" textAnchor="middle" fontSize="7.5" fontWeight="800" fill="#0f172a">
        CaC₂ (Calcium Carbide) + 2H₂O ⎯⎯→ C₂H₂↑ + Ca(OH)₂
      </text>
      <text x="130" y="139" textAnchor="middle" fontSize="6.5" fontWeight="700" fill="#475569">
        Collected over water by downward displacement (insoluble in water)
      </text>
    </g>
  );
}

/**
 * 13. Catalytic Hydrogenation of Ethene
 * Addition of H2 across C=C double bond (Nickel catalyst, 200°C)
 */
export function renderEtheneHydrogenation() {
  return (
    <g>
      <rect x="12" y="10" width="236" height="140" rx="8" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1" />

      {/* Title */}
      <text x="130" y="24" textAnchor="middle" fontSize="8.5" fontWeight="900" fill="#0f172a">
        Catalytic Addition: Hydrogenation of Ethene
      </text>

      {/* Reaction Layout:
          Ethene (C2H4) + H2  ⎯⎯(Ni, 200°C)⎯→  Ethane (C2H6)
      */}
      <g transform="translate(18, 38)">
        {/* Ethene (Unsaturated) */}
        <rect x="0" y="0" width="60" height="42" rx="4" fill="#f0fdf4" stroke="#86efac" strokeWidth="1.2" />
        <text x="30" y="13" textAnchor="middle" fontSize="7.5" fontWeight="900" fill="#15803d">Ethene</text>
        <text x="30" y="28" textAnchor="middle" fontSize="10" fontWeight="900" fill="#166534">H₂C = CH₂</text>
        <text x="30" y="38" textAnchor="middle" fontSize="6" fontWeight="700" fill="#b91c1c">Unsaturated</text>

        {/* Plus H2 */}
        <text x="70" y="24" textAnchor="middle" fontSize="11" fontWeight="800" fill="#64748b">+</text>
        <rect x="78" y="6" width="26" height="30" rx="3" fill="#eff6ff" stroke="#bfdbfe" strokeWidth="1" />
        <text x="91" y="24" textAnchor="middle" fontSize="9" fontWeight="900" fill="#1d4ed8">H₂</text>

        {/* Arrow with Ni / 200°C */}
        <g transform="translate(110, 21)">
          <line x1="0" y1="0" x2="36" y2="0" stroke="#0f172a" strokeWidth="1.8" />
          <polygon points="38,0 32,-3.5 32,3.5" fill="#0f172a" />
          <text x="18" y="-6" textAnchor="middle" fontSize="7" fontWeight="900" fill="#b45309">Ni catalyst</text>
          <text x="18" y="9" textAnchor="middle" fontSize="7" fontWeight="800" fill="#dc2626">200°C</text>
        </g>

        {/* Ethane (Saturated Product) */}
        <rect x="156" y="0" width="68" height="42" rx="4" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1.2" />
        <text x="190" y="13" textAnchor="middle" fontSize="7.5" fontWeight="900" fill="#0f172a">Ethane</text>
        <text x="190" y="28" textAnchor="middle" fontSize="10" fontWeight="900" fill="#0f172a">H₃C — CH₃</text>
        <text x="190" y="38" textAnchor="middle" fontSize="6" fontWeight="800" fill="#047857">Saturated</text>
      </g>

      {/* Industrial Relevance Callout */}
      <rect x="22" y="96" width="216" height="38" rx="4" fill="#fffbeb" stroke="#fde68a" strokeWidth="1" />
      <text x="130" y="110" textAnchor="middle" fontSize="7.5" fontWeight="800" fill="#b45309">
        Industrial use: Hydrogenation of vegetable oils into Vanaspati Ghee
      </text>
      <text x="130" y="125" textAnchor="middle" fontSize="7" fontWeight="600" fill="#475569">
        Liquid unsaturated vegetable oils + H₂ (Ni, 200°C) → Solid saturated fat
      </text>
    </g>
  );
}

/**
 * Dispatcher for all organic chemistry diagrams
 */
export function renderOrganicDiagram(variant) {
  switch (variant) {
    case 'carbon_tetrahedron':
    case 'methane_tetrahedral':
    case 'tetrahedral_carbon':
    case 'sp3_carbon':
      return renderCarbonTetrahedron();

    case 'isomerism_butane':
    case 'butane_isomers':
    case 'chain_isomerism':
    case 'butane_isomerism':
      return renderButaneIsomerism();

    case 'functional_groups':
    case 'functional_groups_chart':
    case 'organic_groups':
      return renderFunctionalGroupsChart();

    case 'ethanol_structure':
    case 'ethanol':
    case 'ethyl_alcohol':
      return renderEthanolStructure();

    case 'ethanoic_acid_structure':
    case 'ethanoic_acid':
    case 'acetic_acid':
    case 'acetic_acid_structure':
      return renderEthanoicAcidStructure();

    case 'ethanal_structure':
    case 'ethanal':
    case 'acetaldehyde':
    case 'acetaldehyde_structure':
      return renderEthanalStructure();

    case 'propanone_structure':
    case 'propanone':
    case 'acetone':
    case 'acetone_structure':
      return renderPropanoneStructure();

    case 'hydrocarbon_types':
    case 'alkane_alkene_alkyne':
    case 'ethene_ethyne_structure':
    case 'unsaturation_types':
      return renderHydrocarbonTypes();

    case 'esterification_reaction':
    case 'esterification':
    case 'ethyl_acetate':
      return renderEsterificationReaction();

    case 'bromine_test_ethene':
    case 'bromine_test':
    case 'unsaturation_test':
      return renderBromineTestEthene();

    case 'lab_prep_methane':
    case 'prep_methane':
      return renderLabPrepMethane();

    case 'lab_prep_acetylene':
    case 'prep_acetylene':
    case 'prep_ethyne':
      return renderLabPrepAcetylene();

    case 'ethene_hydrogenation':
    case 'hydrogenation_ethene':
    case 'hydrogenation':
      return renderEtheneHydrogenation();

    default:
      return renderCarbonTetrahedron();
  }
}
