import React from 'react';
import { formatInlineText, addThinSpacesToSlash } from '../parser';
import {
  renderIonicBond,
  renderCovalentDot,
  renderCovalentDash,
  renderElectrolysis,
} from './ChemistryDiagrams';

/**
 * Normalizes user-specified diagram type strings into canonical diagram types and variants.
 * Handles forms like:
 * - concave_mirror_beyond_c
 * - ionic_NaCl
 * - covalent_h2o_dot
 * - covalent_ch4_dash
 * - electrolysis_water
 * - plating_silver
 */
export function normalizeDiagramType(rawType = '') {
  const rawLower = String(rawType || '').toLowerCase().trim();

  // A) Ionic bond types (case-insensitive)
  if (rawLower.startsWith('ionic_') || rawLower.startsWith('ionic ')) {
    const v = rawLower.replace(/^ionic[_\s]+/, '').replace(/[^a-z0-9]/g, '');
    return { category: 'ionic_bond', variant: v };
  }

  // B) Covalent bond types: covalent_<name>_dot and covalent_<name>_dash
  if (rawLower.startsWith('covalent_') || rawLower.startsWith('covalent ')) {
    const isDash = rawLower.endsWith('_dash') || rawLower.endsWith(' dash') || rawLower.endsWith('-dash');
    const v = rawLower
      .replace(/^covalent[_\s]+/, '')
      .replace(/[_\s\-]+(dot|dash)$/, '')
      .replace(/[^a-z0-9]/g, '');
    return { category: isDash ? 'covalent_dash' : 'covalent_dot', variant: v };
  }

  // C) Electrolysis types
  if (
    rawLower === 'electrolysis_water' ||
    rawLower === 'electrolysis_cuso4_cu' ||
    rawLower === 'plating_silver' ||
    rawLower === 'plating_gold' ||
    rawLower === 'plating_nickel' ||
    rawLower === 'copper_refining' ||
    rawLower.startsWith('electrolysis') ||
    rawLower.startsWith('plating') ||
    rawLower.startsWith('copper_refining')
  ) {
    if (rawLower.includes('water')) return { category: 'electrolysis', variant: 'water' };
    if (rawLower.includes('cuso4')) return { category: 'electrolysis', variant: 'cuso4_cu' };
    if (rawLower.includes('silver')) return { category: 'electrolysis', variant: 'plating_silver' };
    if (rawLower.includes('gold')) return { category: 'electrolysis', variant: 'plating_gold' };
    if (rawLower.includes('nickel')) return { category: 'electrolysis', variant: 'plating_nickel' };
    if (rawLower.includes('refining')) return { category: 'electrolysis', variant: 'copper_refining' };
    return { category: 'electrolysis', variant: 'water' };
  }

  const clean = rawLower
    .replace(/[:|]/g, ' ')
    .replace(/[-_]/g, ' ')
    .replace(/\s+/g, ' ');

  // 1. Concave Mirror
  if (clean.includes('concave') && clean.includes('mirror')) {
    if (clean.includes('beyond c') || clean.includes('beyond 2f')) return { category: 'concave_mirror', variant: 'beyond_c' };
    if (clean.includes('at c') || clean.includes('at 2f')) return { category: 'concave_mirror', variant: 'at_c' };
    if (clean.includes('between c') || clean.includes('c and f') || clean.includes('c f')) return { category: 'concave_mirror', variant: 'between_c_f' };
    if (clean.includes('at f') || clean.includes('at focus')) return { category: 'concave_mirror', variant: 'at_f' };
    if (clean.includes('between f') || clean.includes('f and p') || clean.includes('f p')) return { category: 'concave_mirror', variant: 'between_f_p' };
    return { category: 'concave_mirror', variant: 'beyond_c' };
  }

  // 2. Convex Mirror
  if (clean.includes('convex') && clean.includes('mirror')) {
    return { category: 'convex_mirror', variant: 'in_front' };
  }

  // 3. Concave Lens
  if (clean.includes('concave') && clean.includes('lens')) {
    return { category: 'concave_lens', variant: 'in_front' };
  }

  // 4. Convex Lens
  if (clean.includes('convex') && clean.includes('lens')) {
    if (clean.includes('beyond 2f')) return { category: 'convex_lens', variant: 'beyond_2f' };
    if (clean.includes('at 2f')) return { category: 'convex_lens', variant: 'at_2f' };
    if (clean.includes('between f') && clean.includes('2f')) return { category: 'convex_lens', variant: 'between_f_2f' };
    if (clean.includes('at f') || clean.includes('at focus')) return { category: 'convex_lens', variant: 'at_f' };
    if (clean.includes('between f') || clean.includes('f and o') || clean.includes('magnifying')) return { category: 'convex_lens', variant: 'between_f_o' };
    return { category: 'convex_lens', variant: 'between_f_2f' };
  }

  // 5. Glass Slab
  if (clean.includes('slab') || clean.includes('glass')) {
    return { category: 'glass_slab', variant: 'lateral_shift' };
  }

  // 6. Prism Dispersion (VIBGYOR)
  if (clean.includes('dispersion') || clean.includes('vibgyor') || clean.includes('spectrum')) {
    return { category: 'prism_dispersion', variant: 'vibgyor' };
  }

  // 7. Prism (Deviation)
  if (clean.includes('prism')) {
    return { category: 'prism', variant: 'deviation' };
  }

  // Fallback default
  return { category: 'concave_mirror', variant: 'beyond_c' };
}

/**
 * Helper to render an arrow on a ray line at a fraction `t` along the segment.
 */
function renderMidArrow(x1, y1, x2, y2, t = 0.5, color = '#0d3b9c', size = 4) {
  const angle = Math.atan2(y2 - y1, x2 - x1);
  const mx = x1 + (x2 - x1) * t;
  const my = y1 + (y2 - y1) * t;

  const cos = Math.cos(angle);
  const sin = Math.sin(angle);

  // Triangle vertices pointing forward along the ray
  const tipX = mx + cos * size;
  const tipY = my + sin * size;
  const backLeftX = mx - cos * size - sin * (size * 0.7);
  const backLeftY = my - sin * size + cos * (size * 0.7);
  const backRightX = mx - cos * size + sin * (size * 0.7);
  const backRightY = my - sin * size - cos * (size * 0.7);

  return (
    <polygon
      key={`arrow-${mx}-${my}`}
      points={`${tipX},${tipY} ${backLeftX},${backLeftY} ${backRightX},${backRightY}`}
      fill={color}
    />
  );
}

/**
 * Helper to draw a single ray with line and midpoint arrow.
 */
function Ray({ x1, y1, x2, y2, isVirtual = false, color = '#0d3b9c', strokeWidth = 2, showArrow = true, arrowT = 0.5 }) {
  return (
    <g>
      <line
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke={color}
        strokeWidth={strokeWidth}
        strokeDasharray={isVirtual ? '3,3' : 'none'}
        strokeLinecap="round"
      />
      {showArrow && renderMidArrow(x1, y1, x2, y2, arrowT, color)}
    </g>
  );
}

/**
 * Arrow representation for an Object or an Image.
 */
function OpticalArrow({ x, yBase, yTip, label = '', labelPos = 'tip', isVirtual = false, color = '#c62828', labelColor = '#111' }) {
  const isUpright = yTip < yBase;
  const arrowSize = 4.5;
  const tipArrowY = isUpright ? yTip + arrowSize : yTip - arrowSize;

  return (
    <g>
      {/* Shaft */}
      <line
        x1={x}
        y1={yBase}
        x2={x}
        y2={tipArrowY}
        stroke={color}
        strokeWidth="2.4"
        strokeDasharray={isVirtual ? '3.5,2.5' : 'none'}
        strokeLinecap="round"
      />
      {/* Arrowhead */}
      <polygon
        points={
          isUpright
            ? `${x},${yTip} ${x - 3.5},${yTip + arrowSize} ${x + 3.5},${yTip + arrowSize}`
            : `${x},${yTip} ${x - 3.5},${yTip - arrowSize} ${x + 3.5},${yTip - arrowSize}`
        }
        fill={color}
      />
      {/* Label */}
      {label && (
        <text
          x={x}
          y={isUpright ? yTip - 5 : yTip + 12}
          textAnchor="middle"
          fontSize="11"
          fontWeight="700"
          fill={labelColor}
          fontFamily="inherit"
        >
          {label}
        </text>
      )}
    </g>
  );
}

export default function DiagramRenderer({ diagram, index = 0, singleDiagram = false }) {
  const { diagramType = 'concave_mirror', title = '', caption = '' } = diagram;
  const { category, variant } = normalizeDiagramType(diagramType);

  // Default titles and captions if not provided
  let displayTitle = title;
  let displayCaption = caption;

  const covalentFormulas = {
    h2: 'H₂',
    cl2: 'Cl₂',
    f2: 'F₂',
    o2: 'O₂',
    n2: 'N₂',
    hcl: 'HCl',
    h2o: 'H₂O',
    nh3: 'NH₃',
    ch4: 'CH₄',
    co2: 'CO₂',
    ccl4: 'CCl₄',
    c2h6: 'C₂H₆',
    c2h4: 'C₂H₄',
    c2h2: 'C₂H₂',
  };

  const ionicTitles = {
    nacl: 'NaCl (Ionic Bond)',
    naf: 'NaF (Ionic Bond)',
    kcl: 'KCl (Ionic Bond)',
    lih: 'LiH (Ionic Bond)',
    cao: 'CaO (Ionic Bond)',
    mgo: 'MgO (Ionic Bond)',
    mgcl2: 'MgCl₂ (Ionic Bond)',
    cacl2: 'CaCl₂ (Ionic Bond)',
    na2o: 'Na₂O (Ionic Bond)',
  };

  const electrolysisTitles = {
    water: 'Electrolysis of Water',
    cuso4_cu: 'Electrolysis of CuSO₄ Solution',
    plating_silver: 'Electroplating with Silver',
    plating_gold: 'Electroplating with Gold',
    plating_nickel: 'Electroplating with Nickel',
    copper_refining: 'Electro-refining of Copper',
  };

  if (!displayTitle) {
    if (category === 'ionic_bond') {
      displayTitle = ionicTitles[variant] || 'Ionic Bond Formation';
    } else if (category === 'covalent_dot') {
      const formula = covalentFormulas[variant] || variant.toUpperCase();
      displayTitle = `${formula} (electron-dot structure)`;
    } else if (category === 'covalent_dash') {
      const formula = covalentFormulas[variant] || variant.toUpperCase();
      displayTitle = `${formula} (structural formula)`;
    } else if (category === 'electrolysis') {
      displayTitle = electrolysisTitles[variant] || 'Electrolysis Diagram';
    } else if (category === 'concave_mirror') {
      const titles = {
        beyond_c: 'Concave Mirror: Beyond C',
        at_c: 'Concave Mirror: At C',
        between_c_f: 'Concave Mirror: Between C and F',
        at_f: 'Concave Mirror: At Focus (F)',
        between_f_p: 'Concave Mirror: Between F and P',
      };
      displayTitle = titles[variant] || 'Concave Mirror';
    } else if (category === 'convex_mirror') {
      displayTitle = 'Convex Mirror: Object in Front';
    } else if (category === 'convex_lens') {
      const titles = {
        beyond_2f: 'Convex Lens: Beyond 2F',
        at_2f: 'Convex Lens: At 2F',
        between_f_2f: 'Convex Lens: Between F and 2F',
        at_f: 'Convex Lens: At Focus (F)',
        between_f_o: 'Convex Lens: Between F and O',
      };
      displayTitle = titles[variant] || 'Convex Lens';
    } else if (category === 'concave_lens') {
      displayTitle = 'Concave Lens: Object in Front';
    } else if (category === 'glass_slab') {
      displayTitle = 'Refraction through Glass Slab';
    } else if (category === 'prism') {
      displayTitle = 'Refraction through Prism';
    } else if (category === 'prism_dispersion') {
      displayTitle = 'Dispersion of White Light (VIBGYOR)';
    }
  }

  if (!displayCaption) {
    if (category === 'ionic_bond') {
      displayCaption = 'Electron-transfer diagram';
    } else if (category === 'covalent_dot') {
      displayCaption = 'Shared pairs & full octet completion';
    } else if (category === 'covalent_dash') {
      displayCaption = 'Structural formula with bond lines';
    } else if (category === 'electrolysis') {
      if (variant === 'water') displayCaption = 'Pt electrodes • H₂ : O₂ = 2 : 1';
      else if (variant === 'cuso4_cu') displayCaption = 'Cu electrodes • [CuSO₄] unchanged';
      else if (variant === 'plating_silver') displayCaption = 'Cathode: Spoon • Anode: Pure Ag';
      else if (variant === 'plating_gold') displayCaption = 'Cathode: Article • Anode: Pure Au';
      else if (variant === 'plating_nickel') displayCaption = 'Cathode: Spoon • Anode: Pure Ni';
      else if (variant === 'copper_refining') displayCaption = 'Anode: Impure Cu • Cathode: Pure Cu';
      else displayCaption = 'Electrolysis diagram';
    } else if (category === 'concave_mirror') {
      const captions = {
        beyond_c: 'Image: Real, inverted, diminished (between C & F)',
        at_c: 'Image: Real, inverted, same size (at C)',
        between_c_f: 'Image: Real, inverted, magnified (beyond C)',
        at_f: 'Image: Formed at infinity (parallel reflected rays)',
        between_f_p: 'Image: Virtual, erect, magnified (behind mirror)',
      };
      displayCaption = captions[variant] || '';
    } else if (category === 'convex_mirror') {
      displayCaption = 'Image: Virtual, erect, diminished (behind mirror between P & F)';
    } else if (category === 'convex_lens') {
      const captions = {
        beyond_2f: 'Image: Real, inverted, diminished (between F₂ & 2F₂)',
        at_2f: 'Image: Real, inverted, same size (at 2F₂)',
        between_f_2f: 'Image: Real, inverted, magnified (beyond 2F₂)',
        at_f: 'Image: Formed at infinity (parallel refracted rays)',
        between_f_o: 'Image: Virtual, erect, magnified on same side (Magnifier)',
      };
      displayCaption = captions[variant] || '';
    } else if (category === 'concave_lens') {
      displayCaption = 'Image: Virtual, erect, diminished (between F₁ & O)';
    } else if (category === 'glass_slab') {
      displayCaption = 'Emergent ray || Incident ray (Lateral displacement = d)';
    } else if (category === 'prism') {
      displayCaption = 'Deviation δ = i + e - A (At min deviation: ray || base)';
    } else if (category === 'prism_dispersion') {
      displayCaption = 'Spectrum: VIBGYOR (Red deviates least, Violet most)';
    }
  }

  const isChemistryDiagram =
    category === 'ionic_bond' ||
    category === 'covalent_dot' ||
    category === 'covalent_dash' ||
    category === 'electrolysis';

  return (
    <div className={`hand-graph-card hand-diagram-card ${singleDiagram ? 'single-graph-card' : ''}`}>
      {/* Title Header */}
      <div className="graph-card-header">
        {formatInlineText(displayTitle)}
      </div>

      {/* Caption Chip */}
      {displayCaption && (
        <div className="graph-caption-chip-wrapper">
          <span className="graph-caption-chip">{addThinSpacesToSlash(displayCaption)}</span>
        </div>
      )}

      {/* SVG Canvas Area */}
      <div className="graph-svg-container">
        <svg
          width="100%"
          height="160"
          viewBox={isChemistryDiagram ? "0 0 260 160" : "0 0 250 160"}
          className="hand-svg"
          preserveAspectRatio="xMidYMid meet"
          style={{ width: '100%', height: '160px', display: 'block' }}
        >
          {/* 1. CONCAVE MIRROR */}
          {category === 'concave_mirror' && renderConcaveMirror(variant)}

          {/* 2. CONVEX MIRROR */}
          {category === 'convex_mirror' && renderConvexMirror()}

          {/* 3. CONVEX LENS */}
          {category === 'convex_lens' && renderConvexLens(variant)}

          {/* 4. CONCAVE LENS */}
          {category === 'concave_lens' && renderConcaveLens()}

          {/* 5. GLASS SLAB */}
          {category === 'glass_slab' && renderGlassSlab()}

          {/* 6. PRISM (DEVIATION) */}
          {category === 'prism' && renderPrism()}

          {/* 7. PRISM DISPERSION (VIBGYOR) */}
          {category === 'prism_dispersion' && renderPrismDispersion()}

          {/* 8. IONIC BOND */}
          {category === 'ionic_bond' && renderIonicBond(variant)}

          {/* 9. COVALENT BOND (DOT) */}
          {category === 'covalent_dot' && renderCovalentDot(variant)}

          {/* 10. COVALENT BOND (DASH) */}
          {category === 'covalent_dash' && renderCovalentDash(variant)}

          {/* 11. ELECTROLYSIS */}
          {category === 'electrolysis' && renderElectrolysis(variant, diagram.overrides)}
        </svg>
      </div>
    </div>
  );
}

/* ========================================================================= */
/* DIAGRAM RENDERING IMPLEMENTATIONS                                         */
/* ========================================================================= */

/**
 * 1. Concave Mirror variants
 */
function renderConcaveMirror(variant) {
  // Variant 'between_f_p' requires space behind the mirror for the virtual image
  if (variant === 'between_f_p') {
    const pX = 168;
    const fX = 114;
    const cX = 60;
    const yAxis = 85;

    return (
      <g>
        {/* Principal Axis */}
        <line x1="20" y1={yAxis} x2="242" y2={yAxis} stroke="#111" strokeWidth="1.8" />

        {/* Mirror Arc & Shading on Right */}
        <path d="M 158 24 Q 170 85 158 146" fill="none" stroke="#111" strokeWidth="3" />
        {[30, 42, 54, 66, 78, 90, 102, 114, 126, 138].map((y) => (
          <line key={y} x1="168" y1={y} x2="175" y2={y - 5} stroke="#666" strokeWidth="1.4" />
        ))}

        {/* Reference Points */}
        <circle cx={pX} cy={yAxis} r="2.5" fill="#111" />
        <text x={pX + 6} y={yAxis + 14} fontSize="11" fontWeight="700" fill="#111">P</text>

        <circle cx={fX} cy={yAxis} r="2.5" fill="#111" />
        <text x={fX} y={yAxis + 14} textAnchor="middle" fontSize="11" fontWeight="700" fill="#111">F</text>

        <circle cx={cX} cy={yAxis} r="2.5" fill="#111" />
        <text x={cX} y={yAxis + 14} textAnchor="middle" fontSize="11" fontWeight="700" fill="#111">C</text>

        {/* Object AB between F and P */}
        <OpticalArrow x={138} yBase={yAxis} yTip={57} label="AB" color="#c62828" />

        {/* Ray 1: Parallel to axis to mirror at (170, 57) */}
        <Ray x1={138} y1={57} x2={170} y2={57} arrowT={0.5} />
        {/* Reflected through Focus F(114, 85) to (40, 122) (slope -0.5, completely straight) */}
        <Ray x1={170} y1={57} x2={40} y2={122} arrowT={0.4} />
        {/* Virtual backward extension: strictly collinear with reflected ray (slope -0.5) to (230, 27) */}
        <Ray x1={170} y1={57} x2={230} y2={27} isVirtual={true} color="#455a64" showArrow={false} />

        {/* Ray 2: Directed to Pole P(168, 85) */}
        <Ray x1={138} y1={57} x2={pX} y2={yAxis} arrowT={0.5} />
        {/* Reflected symmetrically at pole: angle r = i to (100, 148) */}
        <Ray x1={pX} y1={yAxis} x2={100} y2={148} arrowT={0.4} />
        {/* Virtual backward extension: strictly collinear through Pole P to (230, 27) */}
        <Ray x1={pX} y1={yAxis} x2={230} y2={27} isVirtual={true} color="#455a64" showArrow={false} />

        {/* Virtual Image A'B' behind mirror */}
        <OpticalArrow x={230} yBase={yAxis} yTip={27} label="A'B'" isVirtual={true} color="#0d3b9c" />
      </g>
    );
  }

  // Standard concave mirror layout (beyond_c, at_c, between_c_f, at_f)
  const pX = 196;
  const fX = 142;
  const cX = 88;
  const yAxis = 85;

  return (
    <g>
      {/* Principal Axis */}
      <line x1="15" y1={yAxis} x2="242" y2={yAxis} stroke="#111" strokeWidth="1.8" />
      <polygon points="242 82, 248 85, 242 88" fill="#111" />

      {/* Mirror Arc & Hatching on Back (right) */}
      <path d="M 186 24 Q 198 85 186 146" fill="none" stroke="#111" strokeWidth="3" />
      {[30, 42, 54, 66, 78, 90, 102, 114, 126, 138].map((y) => (
        <line key={y} x1="196" y1={y} x2="203" y2={y - 5} stroke="#666" strokeWidth="1.4" />
      ))}

      {/* Axis Points */}
      <circle cx={pX} cy={yAxis} r="2.5" fill="#111" />
      <text x={pX + 8} y={yAxis + 14} fontSize="11" fontWeight="700" fill="#111">P</text>

      <circle cx={fX} cy={yAxis} r="2.5" fill="#111" />
      <text x={fX} y={yAxis + 14} textAnchor="middle" fontSize="11" fontWeight="700" fill="#111">F</text>

      <circle cx={cX} cy={yAxis} r="2.5" fill="#111" />
      <text x={cX} y={yAxis + 14} textAnchor="middle" fontSize="11" fontWeight="700" fill="#111">C</text>

      {/* Variant: beyond_c */}
      {variant === 'beyond_c' && (
        <g>
          {/* Object beyond C */}
          <OpticalArrow x={42} yBase={yAxis} yTip={50} label="AB" color="#c62828" />

          {/* Ray 1: Parallel to mirror at (194, 50) -> reflects through Focus F(142, 85) */}
          <Ray x1={42} y1={50} x2={194} y2={50} arrowT={0.5} />
          <Ray x1={194} y1={50} x2={35} y2={157} arrowT={0.4} />

          {/* Ray 2: Standard textbook ray through Focus F(142, 85) to mirror at (194, 103) */}
          <Ray x1={42} y1={50} x2={194} y2={103} arrowT={0.5} />
          {/* Reflected horizontally from mirror to the left */}
          <Ray x1={194} y1={103} x2={35} y2={103} arrowT={0.45} />

          {/* Real, inverted diminished image between C and F at (115, 103) */}
          <OpticalArrow x={115} yBase={yAxis} yTip={103} label="A'B'" color="#0d3b9c" />
        </g>
      )}

      {/* Variant: at_c */}
      {variant === 'at_c' && (
        <g>
          {/* Object at C */}
          <OpticalArrow x={cX} yBase={yAxis} yTip={51} label="AB" color="#c62828" />

          {/* Ray 1: Parallel to mirror -> reflects through Focus F(142, 85) */}
          <Ray x1={cX} y1={51} x2={194} y2={51} arrowT={0.5} />
          <Ray x1={194} y1={51} x2={35} y2={155} arrowT={0.35} />

          {/* Ray 2: Through Focus F(142, 85) to mirror at (196, 119) */}
          <Ray x1={cX} y1={51} x2={196} y2={119} arrowT={0.45} />
          {/* Reflected parallel to axis horizontally */}
          <Ray x1={196} y1={119} x2={35} y2={119} arrowT={0.5} />

          {/* Real inverted image at C, exact same size */}
          <OpticalArrow x={cX} yBase={yAxis} yTip={119} label="A'B'" color="#0d3b9c" />
        </g>
      )}

      {/* Variant: between_c_f */}
      {variant === 'between_c_f' && (
        <g>
          {/* Object between C and F */}
          <OpticalArrow x={118} yBase={yAxis} yTip={59} label="AB" color="#c62828" />

          {/* Ray 1: Parallel to mirror -> reflects through Focus F(142, 85) */}
          <Ray x1={118} y1={59} x2={195} y2={59} arrowT={0.5} />
          <Ray x1={195} y1={59} x2={25} y2={142} arrowT={0.35} />

          {/* Ray 2: Through Focus F(142, 85) to mirror at (188, 135) */}
          <Ray x1={118} y1={59} x2={188} y2={135} arrowT={0.5} />
          {/* Reflected horizontally parallel to axis */}
          <Ray x1={188} y1={135} x2={25} y2={135} arrowT={0.5} />

          {/* Real inverted magnified image beyond C at x = 40 */}
          <OpticalArrow x={40} yBase={yAxis} yTip={135} label="A'B'" color="#0d3b9c" />
        </g>
      )}

      {/* Variant: at_f */}
      {variant === 'at_f' && (
        <g>
          {/* Object at F */}
          <OpticalArrow x={fX} yBase={yAxis} yTip={55} label="AB" color="#c62828" />

          {/* Ray 1: Parallel to mirror -> reflects through Focus F */}
          <Ray x1={fX} y1={55} x2={195} y2={55} arrowT={0.5} />
          <Ray x1={195} y1={55} x2={30} y2={148} arrowT={0.4} />

          {/* Ray 2: Hits Pole P(196, 85) -> reflects at equal angle below axis */}
          <Ray x1={fX} y1={55} x2={pX} y2={yAxis} arrowT={0.5} />
          <Ray x1={pX} y1={yAxis} x2={60} y2={160} arrowT={0.4} />

          {/* Label parallel rays */}
          <text x="35" y="148" fontSize="10" fontStyle="italic" fill="#0d3b9c">Reflected rays || (Image at ∞)</text>
        </g>
      )}
    </g>
  );
}

/**
 * 2. Convex Mirror (Object in front of mirror)
 */
function renderConvexMirror() {
  const pX = 108;
  const fX = 162;
  const cX = 216;
  const yAxis = 85;

  return (
    <g>
      {/* Principal Axis */}
      <line x1="15" y1={yAxis} x2="242" y2={yAxis} stroke="#111" strokeWidth="1.8" />

      {/* Convex Mirror Arc (Curves outward to left) */}
      <path d="M 116 24 Q 106 85 116 146" fill="none" stroke="#111" strokeWidth="3" />
      {/* Shading on concave right side */}
      {[30, 42, 54, 66, 78, 90, 102, 114, 126, 138].map((y) => (
        <line key={y} x1="110" y1={y} x2="117" y2={y - 5} stroke="#666" strokeWidth="1.4" />
      ))}

      {/* Axis Points */}
      <circle cx={pX} cy={yAxis} r="2.5" fill="#111" />
      <text x={pX - 12} y={yAxis + 14} fontSize="11" fontWeight="700" fill="#111">P</text>

      <circle cx={fX} cy={yAxis} r="2.5" fill="#111" />
      <text x={fX} y={yAxis + 14} textAnchor="middle" fontSize="11" fontWeight="700" fill="#111">F</text>

      <circle cx={cX} cy={yAxis} r="2.5" fill="#111" />
      <text x={cX} y={yAxis + 14} textAnchor="middle" fontSize="11" fontWeight="700" fill="#111">C</text>

      {/* Object in front of mirror */}
      <OpticalArrow x={36} yBase={yAxis} yTip={45} label="AB" color="#c62828" />

      {/* Ray 1: Parallel to axis to mirror at (108, 45) */}
      <Ray x1={36} y1={45} x2={108} y2={45} arrowT={0.5} />
      {/* Reflects diverging along the exact line from Focus F(162, 85) to (54, 5) (slope 0.7407, zero bend) */}
      <Ray x1={108} y1={45} x2={54} y2={5} arrowT={0.5} />
      {/* Virtual backward extension to F */}
      <Ray x1={108} y1={45} x2={fX} y2={yAxis} isVirtual={true} color="#455a64" showArrow={false} />

      {/* Ray 2: Directed towards C(216, 85), strikes mirror at (108, 61) */}
      <Ray x1={36} y1={45} x2={108} y2={61} arrowT={0.5} />
      {/* Reflects straight back along the exact same path */}
      <Ray x1={108} y1={61} x2={36} y2={45} arrowT={0.3} />
      {/* Virtual extension towards C: strictly collinear from (108, 61) to C(216, 85) (slope 0.2222, zero bend) */}
      <Ray x1={108} y1={61} x2={cX} y2={yAxis} isVirtual={true} color="#455a64" showArrow={false} />

      {/* Virtual Image A'B' between P and F at (139, 68) */}
      <OpticalArrow x={139} yBase={yAxis} yTip={68} label="A'B'" isVirtual={true} color="#0d3b9c" />
    </g>
  );
}

/**
 * 3. Convex Lens variants
 */
function renderConvexLens(variant) {
  const oX = 125;
  const f1X = 85;
  const f2X = 165;
  const tf1X = 45;
  const tf2X = 205;
  const yAxis = 85;

  return (
    <g>
      {/* Principal Axis */}
      <line x1="15" y1={yAxis} x2="242" y2={yAxis} stroke="#111" strokeWidth="1.8" />
      <polygon points="242 82, 248 85, 242 88" fill="#111" />

      {/* Biconvex Lens */}
      <path
        d="M 125 24 Q 138 85 125 146 Q 112 85 125 24 Z"
        fill="#e6f4fc"
        stroke="#1976d2"
        strokeWidth="2.4"
      />
      <line x1={oX} y1="24" x2={oX} y2="146" stroke="#90caf9" strokeWidth="1.2" strokeDasharray="3,3" />

      {/* Reference Points */}
      <circle cx={oX} cy={yAxis} r="2.5" fill="#111" />
      <text x={oX - 10} y={yAxis + 14} fontSize="11" fontWeight="700" fill="#111">O</text>

      <circle cx={f1X} cy={yAxis} r="2.5" fill="#111" />
      <text x={f1X} y={yAxis + 14} textAnchor="middle" fontSize="10" fontWeight="700" fill="#111">F₁</text>

      <circle cx={tf1X} cy={yAxis} r="2.5" fill="#111" />
      <text x={tf1X} y={yAxis + 14} textAnchor="middle" fontSize="10" fontWeight="700" fill="#111">2F₁</text>

      <circle cx={f2X} cy={yAxis} r="2.5" fill="#111" />
      <text x={f2X} y={yAxis + 14} textAnchor="middle" fontSize="10" fontWeight="700" fill="#111">F₂</text>

      <circle cx={tf2X} cy={yAxis} r="2.5" fill="#111" />
      <text x={tf2X} y={yAxis + 14} textAnchor="middle" fontSize="10" fontWeight="700" fill="#111">2F₂</text>

      {/* Variant: beyond_2f */}
      {variant === 'beyond_2f' && (
        <g>
          {/* Object beyond 2F1 */}
          <OpticalArrow x={25} yBase={yAxis} yTip={49} label="AB" color="#c62828" />

          {/* Ray 1: Parallel to lens -> refracts through F2 */}
          <Ray x1={25} y1={49} x2={oX} y2={49} arrowT={0.5} />
          <Ray x1={oX} y1={49} x2={225} y2={139} arrowT={0.4} />

          {/* Ray 2: Through Optical Center O straight without deviation */}
          <Ray x1={25} y1={49} x2={225} y2={121} arrowT={0.65} />

          {/* Real diminished image between F2 and 2F2 at (192, 109) */}
          <OpticalArrow x={192} yBase={yAxis} yTip={109} label="A'B'" color="#0d3b9c" />
        </g>
      )}

      {/* Variant: at_2f */}
      {variant === 'at_2f' && (
        <g>
          {/* Object at 2F1 */}
          <OpticalArrow x={tf1X} yBase={yAxis} yTip={51} label="AB" color="#c62828" />

          {/* Ray 1: Parallel -> refracts through F2 */}
          <Ray x1={tf1X} y1={51} x2={oX} y2={51} arrowT={0.5} />
          <Ray x1={oX} y1={51} x2={225} y2={136} arrowT={0.4} />

          {/* Ray 2: Through O straight to 2F2 */}
          <Ray x1={tf1X} y1={51} x2={225} y2={128} arrowT={0.65} />

          {/* Real same size image at 2F2 at (205, 119) */}
          <OpticalArrow x={tf2X} yBase={yAxis} yTip={119} label="A'B'" color="#0d3b9c" />
        </g>
      )}

      {/* Variant: between_f_2f */}
      {variant === 'between_f_2f' && (
        <g>
          {/* Object between F1 and 2F1 */}
          <OpticalArrow x={55} yBase={yAxis} yTip={61} label="AB" color="#c62828" />

          {/* Ray 1: Parallel -> refracts through F2 */}
          <Ray x1={55} y1={61} x2={oX} y2={61} arrowT={0.5} />
          <Ray x1={oX} y1={61} x2={232} y2={125} arrowT={0.4} />

          {/* Ray 2: Through O straight beyond 2F2 */}
          <Ray x1={55} y1={61} x2={232} y2={122} arrowT={0.65} />

          {/* Real magnified image beyond 2F2 at (218, 117) */}
          <OpticalArrow x={218} yBase={yAxis} yTip={117} label="A'B'" color="#0d3b9c" />
        </g>
      )}

      {/* Variant: at_f */}
      {variant === 'at_f' && (
        <g>
          {/* Object at F1 */}
          <OpticalArrow x={f1X} yBase={yAxis} yTip={57} label="AB" color="#c62828" />

          {/* Ray 1: Parallel -> refracts through F2 */}
          <Ray x1={f1X} y1={57} x2={oX} y2={57} arrowT={0.5} />
          <Ray x1={oX} y1={57} x2={215} y2={120} arrowT={0.4} />

          {/* Ray 2: Through O straight (strictly parallel slope 0.7) */}
          <Ray x1={f1X} y1={57} x2={215} y2={148} arrowT={0.65} />

          {/* Note */}
          <text x="140" y="148" fontSize="10" fontStyle="italic" fill="#0d3b9c">Refracted rays || (Image at ∞)</text>
        </g>
      )}

      {/* Variant: between_f_o (Magnifier) */}
      {variant === 'between_f_o' && (
        <g>
          {/* Object between F1 and O */}
          <OpticalArrow x={105} yBase={yAxis} yTip={65} label="AB" color="#c62828" />

          {/* Ray 1: Parallel to lens -> refracts through F2 */}
          <Ray x1={105} y1={65} x2={oX} y2={65} arrowT={0.5} />
          <Ray x1={oX} y1={65} x2={210} y2={108} arrowT={0.4} />
          {/* Virtual backward extension: strictly collinear with refracted ray (slope 0.5) to (85, 45) */}
          <Ray x1={oX} y1={65} x2={85} y2={45} isVirtual={true} color="#455a64" showArrow={false} />

          {/* Ray 2: Through Optical Center O straight */}
          <Ray x1={105} y1={65} x2={185} y2={145} arrowT={0.65} />
          {/* Virtual backward extension: strictly collinear through O to (85, 45) (slope 1.0) */}
          <Ray x1={105} y1={65} x2={85} y2={45} isVirtual={true} color="#455a64" showArrow={false} />

          {/* Virtual magnified upright image on same side at (85, 45) */}
          <OpticalArrow x={85} yBase={yAxis} yTip={45} label="A'B'" isVirtual={true} color="#0d3b9c" />
        </g>
      )}
    </g>
  );
}

/**
 * 4. Concave Lens (Object in front of lens)
 */
function renderConcaveLens() {
  const oX = 125;
  const f1X = 85;
  const tf1X = 45;
  const f2X = 165;
  const yAxis = 85;

  return (
    <g>
      {/* Principal Axis */}
      <line x1="15" y1={yAxis} x2="242" y2={yAxis} stroke="#111" strokeWidth="1.8" />
      <polygon points="242 82, 248 85, 242 88" fill="#111" />

      {/* Biconcave Lens */}
      <path
        d="M 118 24 Q 128 85 118 146 L 132 146 Q 122 85 132 24 Z"
        fill="#e6f4fc"
        stroke="#1976d2"
        strokeWidth="2.4"
      />
      <line x1={oX} y1="24" x2={oX} y2="146" stroke="#90caf9" strokeWidth="1.2" strokeDasharray="3,3" />

      {/* Reference Points */}
      <circle cx={oX} cy={yAxis} r="2.5" fill="#111" />
      <text x={oX - 10} y={yAxis + 14} fontSize="11" fontWeight="700" fill="#111">O</text>

      <circle cx={f1X} cy={yAxis} r="2.5" fill="#111" />
      <text x={f1X} y={yAxis + 14} textAnchor="middle" fontSize="10" fontWeight="700" fill="#111">F₁</text>

      <circle cx={tf1X} cy={yAxis} r="2.5" fill="#111" />
      <text x={tf1X} y={yAxis + 14} textAnchor="middle" fontSize="10" fontWeight="700" fill="#111">2F₁</text>

      <circle cx={f2X} cy={yAxis} r="2.5" fill="#111" />
      <text x={f2X} y={yAxis + 14} textAnchor="middle" fontSize="10" fontWeight="700" fill="#111">F₂</text>

      {/* Object in front of concave lens */}
      <OpticalArrow x={45} yBase={yAxis} yTip={45} label="AB" color="#c62828" />

      {/* Ray 1: Parallel to axis to lens at (125, 45) */}
      <Ray x1={45} y1={45} x2={oX} y2={45} arrowT={0.5} />
      {/* Diverging forward along the exact line from Focus F1(85, 85) to (160, 10) (slope -1.0, zero bend) */}
      <Ray x1={oX} y1={45} x2={160} y2={10} arrowT={0.4} />
      {/* Virtual backward extension to F1: strictly collinear with diverging ray */}
      <Ray x1={oX} y1={45} x2={f1X} y2={yAxis} isVirtual={true} color="#455a64" showArrow={false} />

      {/* Ray 2: Through Optical Center O straight without deviation */}
      <Ray x1={45} y1={45} x2={205} y2={125} arrowT={0.65} />

      {/* Virtual erect diminished image between F1 and O at (98, 72) */}
      <OpticalArrow x={98} yBase={yAxis} yTip={72} label="A'B'" isVirtual={true} color="#0d3b9c" />
    </g>
  );
}

/**
 * 5. Refraction through Glass Slab (Parallel emergent ray & lateral displacement)
 */
function renderGlassSlab() {
  return (
    <g>
      {/* Rectangular Glass Slab */}
      <rect
        x="35"
        y="44"
        width="180"
        height="68"
        rx="2"
        fill="#e6f4fc"
        stroke="#3b82f6"
        strokeWidth="2.2"
      />

      {/* Medium labels */}
      <text x="44" y="36" fontSize="10" fontWeight="700" fill="#555">Air (n₁)</text>
      <text x="125" y="80" textAnchor="middle" fontSize="11" fontWeight="700" fill="#1565c0">Glass Slab (n₂ &gt; n₁)</text>
      <text x="44" y="132" fontSize="10" fontWeight="700" fill="#555">Air (n₁)</text>

      {/* Normal line at top boundary N1 */}
      <circle cx="90" cy="44" r="2" fill="#111" />
      <line x1="90" y1="18" x2="90" y2="70" stroke="#455a64" strokeWidth="1.4" strokeDasharray="3,3" />
      <text x="94" y="28" fontSize="10" fill="#455a64">N₁</text>

      {/* Incident Ray: strikes (90, 44) with slope 0.625 */}
      <Ray x1="42" y1="14" x2="90" y2="44" arrowT={0.5} />
      {/* Angle of incidence arc */}
      <path d="M 81,38 A 14 14 0 0 1 90,32" fill="none" stroke="#e65100" strokeWidth="1.4" />
      <text x="78" y="32" fontSize="10" fontWeight="700" fill="#e65100">i</text>

      {/* Refracted Ray inside slab: from (90, 44) to (136, 112) */}
      <Ray x1="90" y1="44" x2="136" y2="112" arrowT={0.5} />
      {/* Angle of refraction arc */}
      <path d="M 95,52 A 12 12 0 0 1 90,56" fill="none" stroke="#2e7d32" strokeWidth="1.4" />
      <text x="96" y="64" fontSize="10" fontWeight="700" fill="#2e7d32">r</text>

      {/* Normal line at bottom boundary N2 */}
      <circle cx="136" cy="112" r="2" fill="#111" />
      <line x1="136" y1="86" x2="136" y2="138" stroke="#455a64" strokeWidth="1.4" strokeDasharray="3,3" />
      <text x="140" y="134" fontSize="10" fill="#455a64">N₂</text>

      {/* Emergent Ray: parallel to incident ray (exact slope 0.625) */}
      <Ray x1="136" y1="112" x2="200" y2="152" arrowT={0.5} />
      {/* Angle of emergence arc */}
      <path d="M 145,118 A 14 14 0 0 1 136,124" fill="none" stroke="#e65100" strokeWidth="1.4" />
      <text x="146" y="130" fontSize="10" fontWeight="700" fill="#e65100">e=i</text>

      {/* Undeviated Incident Ray path: straight continuation from (90, 44) with slope 0.625 */}
      <line
        x1="90"
        y1="44"
        x2="234"
        y2="134"
        stroke="#78909c"
        strokeWidth="1.6"
        strokeDasharray="4,3"
      />

      {/* Lateral Shift (d) perpendicular dimension line completely outside slab (y > 112) */}
      <line x1="184" y1="142" x2="198" y2="120" stroke="#d32f2f" strokeWidth="1.6" />
      <polygon points="184 142, 187 146, 181 145" fill="#d32f2f" />
      <polygon points="198 120, 195 116, 201 117" fill="#d32f2f" />
      <text x="194" y="146" fontSize="10" fontWeight="700" fill="#d32f2f">d (Lateral Shift)</text>
    </g>
  );
}

/**
 * 6. Refraction through Prism (Angle of deviation & minimum deviation)
 */
function renderPrism() {
  // Prism vertices
  const aX = 125, aY = 24;
  const bX = 50, bY = 136;
  const cX = 200, cY = 136;

  // Incident point on AB: (81, 90)
  // Emergent point on AC: (169, 90)
  return (
    <g>
      {/* Triangular Prism */}
      <polygon
        points={`${aX},${aY} ${bX},${bY} ${cX},${cY}`}
        fill="#e6f4fc"
        stroke="#3b82f6"
        strokeWidth="2.4"
      />

      {/* Vertex Labels */}
      <text x={aX} y={aY - 6} textAnchor="middle" fontSize="12" fontWeight="700" fill="#1565c0">A</text>
      <text x={bX - 8} y={bY + 12} fontSize="11" fontWeight="700" fill="#111">B</text>
      <text x={cX + 4} y={cY + 12} fontSize="11" fontWeight="700" fill="#111">C</text>

      {/* Angle of Prism arc at A */}
      <path d="M 120,36 A 14 14 0 0 1 130,36" fill="none" stroke="#1565c0" strokeWidth="1.4" />
      <text x="125" y="46" textAnchor="middle" fontSize="10" fontWeight="700" fill="#1565c0">A</text>

      {/* Incident Ray to (81, 90) */}
      <Ray x1="23" y1="116" x2="81" y2="90" arrowT={0.5} />
      {/* Normal at left face AB: strictly perpendicular (slope 0.67) */}
      <line x1="54" y1="72" x2="108" y2="108" stroke="#455a64" strokeWidth="1.4" strokeDasharray="3,3" />
      {/* Angle of incidence arc */}
      <path d="M 67,96 A 14 14 0 0 1 73,86" fill="none" stroke="#e65100" strokeWidth="1.4" />
      <text x="63" y="92" fontSize="10" fontWeight="700" fill="#e65100">i</text>

      {/* Refracted Ray inside prism: strictly parallel to horizontal base BC */}
      <Ray x1="81" y1="90" x2="169" y2="90" arrowT={0.5} />
      <text x="125" y="103" textAnchor="middle" fontSize="9" fontWeight="600" fill="#1565c0">Ray || Base</text>

      {/* Normal at right face AC: strictly perpendicular (slope -0.67) */}
      <line x1="196" y1="72" x2="142" y2="108" stroke="#455a64" strokeWidth="1.4" strokeDasharray="3,3" />

      {/* Emergent Ray bending towards base: from (169, 90) to (227, 116) */}
      <Ray x1="169" y1="90" x2="227" y2="116" arrowT={0.5} />
      {/* Angle of emergence arc */}
      <path d="M 177,86 A 14 14 0 0 1 183,96" fill="none" stroke="#e65100" strokeWidth="1.4" />
      <text x="185" y="92" fontSize="10" fontWeight="700" fill="#e65100">e</text>

      {/* Undeviated Incident Ray path (forward dashed) */}
      <line x1="81" y1="90" x2="155" y2="57" stroke="#78909c" strokeWidth="1.5" strokeDasharray="3,3" />

      {/* Emergent Ray backward extension (backward dashed) */}
      <line x1="169" y1="90" x2="95" y2="57" stroke="#78909c" strokeWidth="1.5" strokeDasharray="3,3" />

      {/* Angle of Deviation δ arc centered precisely at intersection (125, 70) */}
      <path d="M 132,67 A 10 10 0 0 1 136,75" fill="none" stroke="#d32f2f" strokeWidth="1.8" />
      <text x="144" y="70" fontSize="12" fontWeight="700" fill="#d32f2f">δ</text>
      <text x="125" y="152" textAnchor="middle" fontSize="10" fontWeight="700" fill="#d32f2f">δ = i + e − A</text>
    </g>
  );
}

/**
 * 7. Prism Dispersion (White light splitting into VIBGYOR)
 */
function renderPrismDispersion() {
  const aX = 85, aY = 26;
  const bX = 35, bY = 136;
  const cX = 135, cY = 136;

  // Spectrum colors and labels
  const spectrum = [
    { name: 'R', color: '#d32f2f', exitY: 81, screenY: 48 },
    { name: 'O', color: '#f57c00', exitY: 84, screenY: 60 },
    { name: 'Y', color: '#fbc02d', exitY: 87, screenY: 72 },
    { name: 'G', color: '#388e3c', exitY: 90, screenY: 84 },
    { name: 'B', color: '#1976d2', exitY: 93, screenY: 96 },
    { name: 'I', color: '#303f9f', exitY: 96, screenY: 108 },
    { name: 'V', color: '#7b1fa2', exitY: 99, screenY: 120 },
  ];

  return (
    <g>
      {/* Triangular Prism */}
      <polygon
        points={`${aX},${aY} ${bX},${bY} ${cX},${cY}`}
        fill="#e6f4fc"
        stroke="#3b82f6"
        strokeWidth="2.2"
      />
      <text x={aX} y={aY - 6} textAnchor="middle" fontSize="11" fontWeight="700" fill="#1565c0">Prism</text>

      {/* Incident White Light Beam */}
      <line x1="8" y1="85" x2="57" y2="85" stroke="#222" strokeWidth="3" strokeLinecap="round" />
      {renderMidArrow(8, 85, 57, 85, 0.55, '#222', 4.5)}
      <text x="32" y="77" textAnchor="middle" fontSize="10" fontWeight="700" fill="#111">White Light</text>

      {/* Internal Dispersion Rays inside the prism */}
      {spectrum.map((item) => (
        <line
          key={`in-${item.name}`}
          x1="57"
          y1="85"
          x2={110 + (item.exitY - 81) * 0.4}
          y2={item.exitY}
          stroke={item.color}
          strokeWidth="1.6"
          opacity="0.85"
        />
      ))}

      {/* Emergent Dispersed Rays to Screen */}
      {spectrum.map((item) => {
        const exitX = 110 + (item.exitY - 81) * 0.4;
        return (
          <g key={`emerge-${item.name}`}>
            <line
              x1={exitX}
              y1={item.exitY}
              x2="226"
              y2={item.screenY}
              stroke={item.color}
              strokeWidth="2.2"
              strokeLinecap="round"
            />
            {/* Color label */}
            <text
              x="233"
              y={item.screenY + 3.5}
              fontSize="10"
              fontWeight="800"
              fill={item.color}
            >
              {item.name}
            </text>
          </g>
        );
      })}

      {/* Screen on right */}
      <rect x="226" y="38" width="4" height="92" rx="1.5" fill="#263238" />
      <text x="228" y="32" textAnchor="middle" fontSize="10" fontWeight="700" fill="#263238">Screen</text>

      {/* Annotations */}
      <text x="180" y="44" fontSize="9" fontWeight="600" fill="#d32f2f">Least Dev.</text>
      <text x="180" y="128" fontSize="9" fontWeight="600" fill="#7b1fa2">Most Dev.</text>
    </g>
  );
}
