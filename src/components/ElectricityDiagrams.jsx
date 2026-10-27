import React from 'react';

/**
 * Shared primitives and constants for Electricity SVGs
 */
const STROKE_DARK = '#0f172a';
const WIRE_COLOR = '#1e293b';
const CURRENT_COLOR = '#dc2626';
const VOLT_COLOR = '#2563eb';
const RESISTOR_COLOR = '#d97706';
const GROUND_COLOR = '#059669';

/**
 * Helper to render an arrow on a wire at given position with angle
 */
function CircuitArrow({ x, y, angle = 0, color = CURRENT_COLOR, size = 4.5 }) {
  const rad = (angle * Math.PI) / 180;
  const cos = Math.cos(rad);
  const sin = Math.sin(rad);

  const tipX = x + cos * size;
  const tipY = y + sin * size;
  const leftX = x - cos * size - sin * (size * 0.7);
  const leftY = y - sin * size + cos * (size * 0.7);
  const rightX = x - cos * size + sin * (size * 0.7);
  const rightY = y - sin * size - cos * (size * 0.7);

  return (
    <polygon
      points={`${tipX},${tipY} ${leftX},${leftY} ${rightX},${rightY}`}
      fill={color}
    />
  );
}

/**
 * Helper to render standard zig-zag resistor symbol
 */
function ZigZagResistor({ x, y, width = 44, height = 12, stroke = WIRE_COLOR, strokeWidth = 1.8 }) {
  const n = 5; // peaks
  const step = width / (n * 2);
  let d = `M ${x},${y}`;
  for (let i = 0; i < n; i++) {
    const px1 = x + (i * 2 + 1) * step;
    const py1 = i % 2 === 0 ? y - height / 2 : y + height / 2;
    const px2 = x + (i * 2 + 2) * step;
    const py2 = y;
    d += ` L ${px1},${py1} L ${px2},${py2}`;
  }

  return <path d={d} fill="none" stroke={stroke} strokeWidth={strokeWidth} strokeLinejoin="round" />;
}

/**
 * 1. Ohm's Law Circuit Diagram
 * Verified circuit: Battery, Plug Key, Rheostat, Ammeter (series), Resistor, Voltmeter (parallel)
 */
export function renderOhmsLawCircuit() {
  return (
    <g>
      {/* Circuit background card tint */}
      <rect x="12" y="10" width="236" height="140" rx="8" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1" />

      {/* Main circuit loop wires */}
      {/* Top wire: from (26, 42) through Ammeter to Resistor to Rheostat to (234, 42) */}
      <line x1="26" y1="42" x2="52" y2="42" stroke={WIRE_COLOR} strokeWidth="2" />
      
      {/* Ammeter symbol at x=64, y=42 */}
      <circle cx="64" cy="42" r="12" fill="#eff6ff" stroke={VOLT_COLOR} strokeWidth="1.8" />
      <text x="64" y="46" textAnchor="middle" fontSize="11" fontWeight="800" fill={VOLT_COLOR}>A</text>
      <text x="49" y="38" fontSize="8" fontWeight="800" fill={CURRENT_COLOR}>+</text>
      <text x="76" y="38" fontSize="8" fontWeight="800" fill={WIRE_COLOR}>−</text>
      <text x="64" y="24" textAnchor="middle" fontSize="7.5" fontWeight="700" fill="#475569">Ammeter (series)</text>

      {/* Wire from Ammeter to Resistor */}
      <line x1="76" y1="42" x2="108" y2="42" stroke={WIRE_COLOR} strokeWidth="2" />
      {/* Current arrow */}
      <CircuitArrow x={92} y={42} angle={0} />
      <text x={92} y={35} textAnchor="middle" fontSize="8" fontWeight="800" fill={CURRENT_COLOR}>I →</text>

      {/* Resistor R at x=108, y=42 */}
      <ZigZagResistor x={108} y={42} width={40} height={14} stroke="#b45309" strokeWidth="2" />
      <text x="128" y="35" textAnchor="middle" fontSize="10" fontWeight="800" fill="#9a3412">R</text>

      {/* Voltmeter in parallel across R */}
      {/* Vertical leads dropping down */}
      <line x1="106" y1="42" x2="106" y2="82" stroke={VOLT_COLOR} strokeWidth="1.5" strokeDasharray="3,2" />
      <line x1="150" y1="42" x2="150" y2="82" stroke={VOLT_COLOR} strokeWidth="1.5" strokeDasharray="3,2" />
      <line x1="106" y1="82" x2="116" y2="82" stroke={VOLT_COLOR} strokeWidth="1.5" />
      <line x1="140" y1="82" x2="150" y2="82" stroke={VOLT_COLOR} strokeWidth="1.5" />
      {/* Voltmeter symbol */}
      <circle cx="128" cy="82" r="12" fill="#eff6ff" stroke={VOLT_COLOR} strokeWidth="1.8" />
      <text x="128" y="86" textAnchor="middle" fontSize="11" fontWeight="800" fill={VOLT_COLOR}>V</text>
      <text x="100" y="80" fontSize="8" fontWeight="800" fill={CURRENT_COLOR}>+</text>
      <text x="153" y="80" fontSize="8" fontWeight="800" fill={WIRE_COLOR}>−</text>
      <text x="128" y="103" textAnchor="middle" fontSize="7.5" fontWeight="700" fill="#475569">Voltmeter (parallel)</text>

      {/* Wire from Resistor to Rheostat */}
      <line x1="148" y1="42" x2="182" y2="42" stroke={WIRE_COLOR} strokeWidth="2" />
      
      {/* Rheostat (variable resistor) at x=182, y=42 */}
      <ZigZagResistor x={182} y={42} width={34} height={12} stroke="#475569" strokeWidth="1.6" />
      {/* Arrow slider on Rheostat */}
      <line x1="184" y1="52" x2="214" y2="32" stroke="#dc2626" strokeWidth="1.4" />
      <polygon points="216,30 210,30 214,35" fill="#dc2626" />
      <text x="199" y="24" textAnchor="middle" fontSize="8" fontWeight="700" fill="#475569">Rheostat (Rh)</text>

      {/* Right side wire down */}
      <line x1="216" y1="42" x2="234" y2="42" stroke={WIRE_COLOR} strokeWidth="2" />
      <line x1="234" y1="42" x2="234" y2="128" stroke={WIRE_COLOR} strokeWidth="2" />
      {/* Left side wire down */}
      <line x1="26" y1="42" x2="26" y2="128" stroke={WIRE_COLOR} strokeWidth="2" />

      {/* Bottom rail: Battery & Plug Key */}
      <line x1="26" y1="128" x2="80" y2="128" stroke={WIRE_COLOR} strokeWidth="2" />
      {/* Current arrow returning */}
      <CircuitArrow x={50} y={128} angle={180} />

      {/* Battery: 2 cells */}
      {/* Cell 1: Long positive, short negative */}
      <line x1="80" y1="117" x2="80" y2="139" stroke={WIRE_COLOR} strokeWidth="2" />
      <line x1="86" y1="122" x2="86" y2="134" stroke={WIRE_COLOR} strokeWidth="3.5" />
      <line x1="86" y1="128" x2="94" y2="128" stroke={WIRE_COLOR} strokeWidth="1.5" />
      {/* Cell 2 */}
      <line x1="94" y1="117" x2="94" y2="139" stroke={WIRE_COLOR} strokeWidth="2" />
      <line x1="100" y1="122" x2="100" y2="134" stroke={WIRE_COLOR} strokeWidth="3.5" />
      <text x="75" y="117" fontSize="8" fontWeight="800" fill={CURRENT_COLOR}>+</text>
      <text x="104" y="117" fontSize="8" fontWeight="800" fill={WIRE_COLOR}>−</text>
      <text x="90" y="148" textAnchor="middle" fontSize="7.5" fontWeight="700" fill="#475569">Battery</text>

      {/* Wire to Key */}
      <line x1="100" y1="128" x2="160" y2="128" stroke={WIRE_COLOR} strokeWidth="2" />

      {/* Plug Key (closed) at x=175 */}
      <path d="M 160,128 C 165,123 175,123 180,128" fill="none" stroke={WIRE_COLOR} strokeWidth="1.8" />
      <path d="M 160,128 C 165,133 175,133 180,128" fill="none" stroke={WIRE_COLOR} strokeWidth="1.8" />
      <circle cx="170" cy="128" r="2.2" fill={WIRE_COLOR} />
      <text x="170" y="144" textAnchor="middle" fontSize="8" fontWeight="700" fill="#475569">Key (•)</text>

      {/* Wire from Key to right corner */}
      <line x1="180" y1="128" x2="234" y2="128" stroke={WIRE_COLOR} strokeWidth="2" />

      {/* Ohm's Law Formula badge */}
      <rect x="88" y="110" width="80" height="0" fill="none" />
    </g>
  );
}

/**
 * 2. Resistors in Series
 * Three resistors connected end-to-end: R_s = R_1 + R_2 + R_3
 */
export function renderResistorsSeries() {
  return (
    <g>
      <rect x="12" y="10" width="236" height="140" rx="8" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1" />

      {/* Top rail containing R1, R2, R3 */}
      <line x1="22" y1="48" x2="38" y2="48" stroke={WIRE_COLOR} strokeWidth="2" />
      <CircuitArrow x={30} y={48} angle={0} />
      <text x="30" y="40" textAnchor="middle" fontSize="8" fontWeight="800" fill={CURRENT_COLOR}>I →</text>

      {/* Resistor R1 */}
      <ZigZagResistor x={38} y={48} width={42} height={12} stroke="#b45309" strokeWidth="2" />
      <text x="59" y="38" textAnchor="middle" fontSize="9.5" fontWeight="800" fill="#9a3412">R₁</text>

      {/* Connect R1 to R2 */}
      <line x1="80" y1="48" x2="104" y2="48" stroke={WIRE_COLOR} strokeWidth="2" />
      <circle cx="92" cy="48" r="2" fill={WIRE_COLOR} />

      {/* Resistor R2 */}
      <ZigZagResistor x={104} y={48} width={42} height={12} stroke="#b45309" strokeWidth="2" />
      <text x="125" y="38" textAnchor="middle" fontSize="9.5" fontWeight="800" fill="#9a3412">R₂</text>

      {/* Connect R2 to R3 */}
      <line x1="146" y1="48" x2="170" y2="48" stroke={WIRE_COLOR} strokeWidth="2" />
      <circle cx="158" cy="48" r="2" fill={WIRE_COLOR} />

      {/* Resistor R3 */}
      <ZigZagResistor x={170} y={48} width={42} height={12} stroke="#b45309" strokeWidth="2" />
      <text x="191" y="38" textAnchor="middle" fontSize="9.5" fontWeight="800" fill="#9a3412">R₃</text>

      <line x1="212" y1="48" x2="236" y2="48" stroke={WIRE_COLOR} strokeWidth="2" />
      <CircuitArrow x={224} y={48} angle={0} />

      {/* Individual Voltage drops V1, V2, V3 */}
      {/* V1 bracket */}
      <path d="M 38,62 L 59,67 L 80,62" fill="none" stroke={VOLT_COLOR} strokeWidth="1.2" />
      <text x="59" y="78" textAnchor="middle" fontSize="8" fontWeight="800" fill={VOLT_COLOR}>V₁ = I·R₁</text>

      {/* V2 bracket */}
      <path d="M 104,62 L 125,67 L 146,62" fill="none" stroke={VOLT_COLOR} strokeWidth="1.2" />
      <text x="125" y="78" textAnchor="middle" fontSize="8" fontWeight="800" fill={VOLT_COLOR}>V₂ = I·R₂</text>

      {/* V3 bracket */}
      <path d="M 170,62 L 191,67 L 212,62" fill="none" stroke={VOLT_COLOR} strokeWidth="1.2" />
      <text x="191" y="78" textAnchor="middle" fontSize="8" fontWeight="800" fill={VOLT_COLOR}>V₃ = I·R₃</text>

      {/* Total Voltage V spanning bracket */}
      <path d="M 38,86 L 125,93 L 212,86" fill="none" stroke="#047857" strokeWidth="1.4" />
      <text x="125" y="104" textAnchor="middle" fontSize="8.5" fontWeight="800" fill="#047857">Total V = V₁ + V₂ + V₃</text>

      {/* Circuit loop down to battery */}
      <line x1="22" y1="48" x2="22" y2="128" stroke={WIRE_COLOR} strokeWidth="1.8" />
      <line x1="236" y1="48" x2="236" y2="128" stroke={WIRE_COLOR} strokeWidth="1.8" />

      {/* Bottom battery and key */}
      <line x1="22" y1="128" x2="96" y2="128" stroke={WIRE_COLOR} strokeWidth="1.8" />
      {/* Battery */}
      <line x1="96" y1="118" x2="96" y2="138" stroke={WIRE_COLOR} strokeWidth="2" />
      <line x1="102" y1="123" x2="102" y2="133" stroke={WIRE_COLOR} strokeWidth="3" />
      <text x="91" y="119" fontSize="8" fontWeight="800" fill={CURRENT_COLOR}>+</text>
      <text x="105" y="119" fontSize="8" fontWeight="800" fill={WIRE_COLOR}>−</text>
      <text x="99" y="147" textAnchor="middle" fontSize="7.5" fontWeight="700" fill="#475569">V (Battery)</text>

      <line x1="102" y1="128" x2="148" y2="128" stroke={WIRE_COLOR} strokeWidth="1.8" />

      {/* Key */}
      <circle cx="160" cy="128" r="2" fill={WIRE_COLOR} />
      <path d="M 152,128 C 156,124 164,124 168,128" fill="none" stroke={WIRE_COLOR} strokeWidth="1.6" />
      <text x="160" y="144" textAnchor="middle" fontSize="7.5" fontWeight="700" fill="#475569">Key K</text>
      <line x1="168" y1="128" x2="236" y2="128" stroke={WIRE_COLOR} strokeWidth="1.8" />
    </g>
  );
}

/**
 * 3. Resistors in Parallel
 * Parallel combination across two nodes A and B: 1/R_p = 1/R_1 + 1/R_2 + 1/R_3
 */
export function renderResistorsParallel() {
  return (
    <g>
      <rect x="12" y="10" width="236" height="140" rx="8" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1" />

      {/* Node A (x=66, y=60) & Node B (x=194, y=60) */}
      {/* Left wire to Node A */}
      <line x1="22" y1="60" x2="66" y2="60" stroke={WIRE_COLOR} strokeWidth="2" />
      <CircuitArrow x={42} y={60} angle={0} />
      <text x="42" y="52" textAnchor="middle" fontSize="8.5" fontWeight="800" fill={CURRENT_COLOR}>Total I →</text>

      {/* Node A */}
      <circle cx="66" cy="60" r="3" fill="#1e293b" />
      <text x="60" y="56" fontSize="9" fontWeight="800" fill="#0f172a">A</text>

      {/* Node B */}
      <circle cx="194" cy="60" r="3" fill="#1e293b" />
      <text x="200" y="56" fontSize="9" fontWeight="800" fill="#0f172a">B</text>

      {/* Right wire from Node B */}
      <line x1="194" y1="60" x2="236" y2="60" stroke={WIRE_COLOR} strokeWidth="2" />
      <CircuitArrow x={216} y={60} angle={0} />
      <text x="216" y="52" textAnchor="middle" fontSize="8.5" fontWeight="800" fill={CURRENT_COLOR}>I →</text>

      {/* Branch 1: Top (y=28) */}
      <path d="M 66,60 L 66,28 L 96,28" fill="none" stroke={WIRE_COLOR} strokeWidth="1.6" />
      <CircuitArrow x={78} y={28} angle={0} size={3.5} />
      <text x="78" y="23" textAnchor="middle" fontSize="7" fontWeight="700" fill={CURRENT_COLOR}>I₁</text>
      <ZigZagResistor x={96} y={28} width={46} height={10} stroke="#b45309" strokeWidth="1.8" />
      <text x="119" y="21" textAnchor="middle" fontSize="8.5" fontWeight="800" fill="#9a3412">R₁</text>
      <path d="M 142,28 L 194,28 L 194,60" fill="none" stroke={WIRE_COLOR} strokeWidth="1.6" />

      {/* Branch 2: Middle (y=60) */}
      <line x1="66" y1="60" x2="96" y2="60" stroke={WIRE_COLOR} strokeWidth="1.6" />
      <CircuitArrow x={80} y={60} angle={0} size={3.5} />
      <text x="80" y="54" textAnchor="middle" fontSize="7" fontWeight="700" fill={CURRENT_COLOR}>I₂</text>
      <ZigZagResistor x={96} y={60} width={46} height={10} stroke="#b45309" strokeWidth="1.8" />
      <text x="119" y="53" textAnchor="middle" fontSize="8.5" fontWeight="800" fill="#9a3412">R₂</text>
      <line x1="142" y1="60" x2="194" y2="60" stroke={WIRE_COLOR} strokeWidth="1.6" />

      {/* Branch 3: Bottom (y=92) */}
      <path d="M 66,60 L 66,92 L 96,92" fill="none" stroke={WIRE_COLOR} strokeWidth="1.6" />
      <CircuitArrow x={78} y={92} angle={0} size={3.5} />
      <text x="78" y="87" textAnchor="middle" fontSize="7" fontWeight="700" fill={CURRENT_COLOR}>I₃</text>
      <ZigZagResistor x={96} y={92} width={46} height={10} stroke="#b45309" strokeWidth="1.8" />
      <text x="119" y="85" textAnchor="middle" fontSize="8.5" fontWeight="800" fill="#9a3412">R₃</text>
      <path d="M 142,92 L 194,92 L 194,60" fill="none" stroke={WIRE_COLOR} strokeWidth="1.6" />

      {/* Common Voltage indicator */}
      <text x="130" y="106" textAnchor="middle" fontSize="7.5" fontWeight="700" fill={VOLT_COLOR}>Same potential V across A & B</text>

      {/* Bottom loop: Battery and Key */}
      <line x1="22" y1="60" x2="22" y2="132" stroke={WIRE_COLOR} strokeWidth="1.8" />
      <line x1="236" y1="60" x2="236" y2="132" stroke={WIRE_COLOR} strokeWidth="1.8" />
      <line x1="22" y1="132" x2="100" y2="132" stroke={WIRE_COLOR} strokeWidth="1.8" />

      {/* Battery */}
      <line x1="100" y1="123" x2="100" y2="141" stroke={WIRE_COLOR} strokeWidth="2" />
      <line x1="106" y1="127" x2="106" y2="137" stroke={WIRE_COLOR} strokeWidth="3" />
      <text x="95" y="123" fontSize="8" fontWeight="800" fill={CURRENT_COLOR}>+</text>
      <text x="109" y="123" fontSize="8" fontWeight="800" fill={WIRE_COLOR}>−</text>
      <text x="103" y="148" textAnchor="middle" fontSize="7" fontWeight="700" fill="#475569">V</text>

      <line x1="106" y1="132" x2="148" y2="132" stroke={WIRE_COLOR} strokeWidth="1.8" />

      {/* Key */}
      <circle cx="160" cy="132" r="2" fill={WIRE_COLOR} />
      <path d="M 152,132 C 156,128 164,128 168,132" fill="none" stroke={WIRE_COLOR} strokeWidth="1.6" />
      <text x="160" y="146" textAnchor="middle" fontSize="7" fontWeight="700" fill="#475569">Key K</text>
      <line x1="168" y1="132" x2="236" y2="132" stroke={WIRE_COLOR} strokeWidth="1.8" />
    </g>
  );
}

/**
 * 4. Right-Hand Thumb Rule / Straight Conductor Field
 * Maxwell's corkscrew / Right-hand grip rule showing concentric circular field lines
 */
export function renderRightHandThumbRule() {
  return (
    <g>
      <rect x="12" y="10" width="236" height="140" rx="8" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1" />

      {/* Cardboard plane (isometric parallelogram) */}
      <polygon points="40,82 170,82 220,114 90,114" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="1.3" opacity="0.8" />
      <text x="195" y="110" fontSize="7" fontWeight="700" fill="#64748b">Cardboard</text>

      {/* Concentric circular magnetic field lines on cardboard (ellipses) */}
      {/* Outer loop */}
      <ellipse cx="130" cy="98" rx="55" ry="14" fill="none" stroke={VOLT_COLOR} strokeWidth="1.4" strokeDasharray="3,2" />
      {/* Mid loop */}
      <ellipse cx="130" cy="98" rx="38" ry="10" fill="none" stroke={VOLT_COLOR} strokeWidth="1.6" />
      {/* Inner loop */}
      <ellipse cx="130" cy="98" rx="22" ry="6" fill="none" stroke={VOLT_COLOR} strokeWidth="1.6" />

      {/* Field Direction Arrows (Anticlockwise from above) */}
      <polygon points="168,98 163,94 165,100" fill={VOLT_COLOR} />
      <polygon points="92,98 97,102 95,96" fill={VOLT_COLOR} />
      <polygon points="152,98 148,95 150,100" fill={VOLT_COLOR} />
      <text x="178" y="96" fontSize="8" fontWeight="800" fill={VOLT_COLOR}>Field B</text>

      {/* Straight copper wire passing vertically through centre (x=130) */}
      {/* Lower wire section below cardboard */}
      <line x1="130" y1="98" x2="130" y2="144" stroke="#ea580c" strokeWidth="4" strokeLinecap="round" />
      {/* Upper wire section above cardboard */}
      <line x1="130" y1="20" x2="130" y2="98" stroke="#ea580c" strokeWidth="4" strokeLinecap="round" />

      {/* Current arrow pointing upwards */}
      <polygon points="130,16 125,26 135,26" fill={CURRENT_COLOR} />
      <text x="142" y="24" fontSize="9.5" fontWeight="800" fill={CURRENT_COLOR}>I (Current)</text>

      {/* Stylized Right Hand Grip illustration on left side */}
      <g transform="translate(18, 30)">
        <rect x="0" y="0" width="76" height="88" rx="6" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1" />
        <text x="38" y="14" textAnchor="middle" fontSize="7.5" fontWeight="800" fill="#0f172a">Right Hand Rule</text>
        
        {/* Thumb pointing up */}
        <line x1="38" y1="52" x2="38" y2="24" stroke={CURRENT_COLOR} strokeWidth="3" strokeLinecap="round" />
        <polygon points="38,20 34,28 42,28" fill={CURRENT_COLOR} />
        <text x="44" y="32" fontSize="7" fontWeight="700" fill={CURRENT_COLOR}>Thumb: I</text>

        {/* Curled fingers arc */}
        <path d="M 24,52 C 24,40 52,40 52,52 C 52,62 28,62 28,52" fill="none" stroke={VOLT_COLOR} strokeWidth="2.2" />
        <polygon points="26,50 30,55 24,56" fill={VOLT_COLOR} />
        <text x="38" y="74" textAnchor="middle" fontSize="7" fontWeight="700" fill={VOLT_COLOR}>Fingers: B</text>
        <text x="38" y="83" textAnchor="middle" fontSize="6.5" fontWeight="600" fill="#64748b">(Magnetic field)</text>
      </g>
    </g>
  );
}

/**
 * 5. Magnetic Field of a Circular Coil
 * Concentric circles near wire turns and straight parallel lines at the center
 */
export function renderCircularLoopField() {
  return (
    <g>
      <rect x="12" y="10" width="236" height="140" rx="8" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1" />

      {/* Central straight axis line */}
      <line x1="24" y1="75" x2="236" y2="75" stroke={VOLT_COLOR} strokeWidth="2" strokeDasharray="4,2" />
      <polygon points="238,75 230,71 230,79" fill={VOLT_COLOR} />
      <polygon points="135,75 127,71 127,79" fill={VOLT_COLOR} />
      <text x="130" y="68" textAnchor="middle" fontSize="8" fontWeight="800" fill={VOLT_COLOR}>Straight field line at centre</text>

      {/* Circular coil shown edge-on / perspective ellipse at x=130 */}
      {/* Back half of loop */}
      <path d="M 130,22 A 16,53 0 0,1 130,128" fill="none" stroke="#ea580c" strokeWidth="4" strokeLinecap="round" strokeDasharray="3,3" />

      {/* Magnetic field loops around left wire edge (x=130, y=22) */}
      <ellipse cx="130" cy="22" rx="14" ry="12" fill="none" stroke={VOLT_COLOR} strokeWidth="1.3" />
      <ellipse cx="130" cy="22" rx="28" ry="20" fill="none" stroke={VOLT_COLOR} strokeWidth="1.3" />
      <polygon points="116,22 116,28 110,24" fill={VOLT_COLOR} />

      {/* Magnetic field loops around right/bottom wire edge (x=130, y=128) */}
      <ellipse cx="130" cy="128" rx="14" ry="12" fill="none" stroke={VOLT_COLOR} strokeWidth="1.3" />
      <ellipse cx="130" cy="128" rx="28" ry="20" fill="none" stroke={VOLT_COLOR} strokeWidth="1.3" />
      <polygon points="144,128 144,122 150,126" fill={VOLT_COLOR} />

      {/* Front half of loop */}
      <path d="M 130,22 A 16,53 0 0,0 130,128" fill="none" stroke="#c2410c" strokeWidth="4.5" strokeLinecap="round" />

      {/* Current arrows on loop */}
      <polygon points="114,70 114,80 110,75" fill={CURRENT_COLOR} />
      <text x="102" y="77" textAnchor="end" fontSize="8" fontWeight="800" fill={CURRENT_COLOR}>I ↑</text>

      {/* Polarity labels at ends */}
      <rect x="24" y="24" width="46" height="20" rx="4" fill="#eff6ff" stroke="#93c5fd" strokeWidth="1" />
      <text x="47" y="38" textAnchor="middle" fontSize="8" fontWeight="800" fill="#1e3a8a">North (N)</text>

      <rect x="190" y="24" width="46" height="20" rx="4" fill="#fef2f2" stroke="#fca5a5" strokeWidth="1" />
      <text x="213" y="38" textAnchor="middle" fontSize="8" fontWeight="800" fill="#991b1b">South (S)</text>

      {/* Clock rule note at bottom */}
      <text x="130" y="144" textAnchor="middle" fontSize="7" fontWeight="700" fill="#475569">
        Clockwise current = South pole • Anticlockwise = North pole
      </text>
    </g>
  );
}

/**
 * 6. Magnetic Field of a Solenoid
 * Uniform parallel straight lines inside core; bar magnet field outside
 */
export function renderSolenoidField() {
  return (
    <g>
      <rect x="12" y="10" width="236" height="140" rx="8" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1" />

      {/* External magnetic field lines (curving loops from N to S) */}
      {/* Top loop 1 */}
      <path d="M 50,60 C 50,12 210,12 210,60" fill="none" stroke={VOLT_COLOR} strokeWidth="1.3" />
      <polygon points="135,17 127,13 127,21" fill={VOLT_COLOR} />

      {/* Top loop 2 */}
      <path d="M 60,60 C 60,28 200,28 200,60" fill="none" stroke={VOLT_COLOR} strokeWidth="1.3" />
      <polygon points="135,33 127,29 127,37" fill={VOLT_COLOR} />

      {/* Bottom loop 1 */}
      <path d="M 50,86 C 50,134 210,134 210,86" fill="none" stroke={VOLT_COLOR} strokeWidth="1.3" />
      <polygon points="135,129 127,125 127,133" fill={VOLT_COLOR} />

      {/* Uniform internal field lines (straight parallel) */}
      <line x1="42" y1="67" x2="218" y2="67" stroke={VOLT_COLOR} strokeWidth="1.6" />
      <polygon points="46,67 52,64 52,70" fill={VOLT_COLOR} />
      <line x1="42" y1="73" x2="218" y2="73" stroke={VOLT_COLOR} strokeWidth="2" />
      <polygon points="46,73 52,70 52,76" fill={VOLT_COLOR} />
      <line x1="42" y1="79" x2="218" y2="79" stroke={VOLT_COLOR} strokeWidth="1.6" />
      <polygon points="46,79 52,76 52,82" fill={VOLT_COLOR} />

      {/* Solenoid coil turns (copper helical loops) */}
      {[64, 84, 104, 124, 144, 164, 184].map((cx, i) => (
        <g key={i}>
          {/* Back turn */}
          <path d={`M ${cx - 7},60 A 7,14 0 0,1 ${cx + 7},60`} fill="none" stroke="#ea580c" strokeWidth="2.8" strokeLinecap="round" />
          {/* Front turn */}
          <path d={`M ${cx - 7},86 A 7,14 0 0,1 ${cx + 7},86`} fill="none" stroke="#c2410c" strokeWidth="3" strokeLinecap="round" />
          {/* Diagonal connecting slant */}
          <line x1={cx + 7} y1="60" x2={cx + 13} y2="86" stroke="#ea580c" strokeWidth="3" strokeLinecap="round" />
          {/* Current arrow */}
          {i === 3 && <polygon points={`${cx},70 ${cx + 5},65 ${cx + 5},75`} fill={CURRENT_COLOR} />}
        </g>
      ))}

      {/* Poles indicator badges */}
      <rect x="22" y="61" width="26" height="24" rx="4" fill="#fee2e2" stroke="#ef4444" strokeWidth="1.5" />
      <text x="35" y="77" textAnchor="middle" fontSize="12" fontWeight="900" fill="#b91c1c">N</text>

      <rect x="212" y="61" width="26" height="24" rx="4" fill="#dbeafe" stroke="#3b82f6" strokeWidth="1.5" />
      <text x="225" y="77" textAnchor="middle" fontSize="12" fontWeight="900" fill="#1d4ed8">S</text>

      {/* Caption note */}
      <text x="130" y="103" textAnchor="middle" fontSize="7.5" fontWeight="800" fill="#0f172a">
        Uniform parallel field inside • Magnetic poles N & S at ends
      </text>
    </g>
  );
}

/**
 * 7. Fleming's Left-Hand Rule (Motor Rule)
 * Mutually perpendicular axes: Thumb (Force), Forefinger (Field B), Middle finger (Current I)
 */
export function renderFlemingsLeftHandRule() {
  return (
    <g>
      <rect x="12" y="10" width="236" height="140" rx="8" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1" />

      {/* Rule Origin Node (x=90, y=95) */}
      <circle cx="90" cy="95" r="5" fill="#0f172a" />

      {/* Right angle markers */}
      {/* between Force and Field */}
      <polyline points="90,75 106,75 106,95" fill="none" stroke="#94a3b8" strokeWidth="1.2" />
      {/* between Force and Current */}
      <polyline points="90,75 76,82 76,102" fill="none" stroke="#94a3b8" strokeWidth="1.2" />

      {/* 1. THUMB (Force F) - Points vertically upwards */}
      <line x1="90" y1="95" x2="90" y2="28" stroke="#dc2626" strokeWidth="4" strokeLinecap="round" />
      <polygon points="90,20 84,32 96,32" fill="#dc2626" />
      <rect x="44" y="20" width="40" height="22" rx="4" fill="#fef2f2" stroke="#fca5a5" strokeWidth="1" />
      <text x="64" y="31" textAnchor="middle" fontSize="8" fontWeight="800" fill="#b91c1c">THUMB</text>
      <text x="64" y="40" textAnchor="middle" fontSize="7" fontWeight="700" fill="#dc2626">Force (F)</text>

      {/* 2. FOREFINGER (Magnetic Field B) - Points to the right */}
      <line x1="90" y1="95" x2="182" y2="95" stroke="#2563eb" strokeWidth="4" strokeLinecap="round" />
      <polygon points="190,95 178,89 178,101" fill="#2563eb" />
      <rect x="178" y="104" width="60" height="22" rx="4" fill="#eff6ff" stroke="#bfdbfe" strokeWidth="1" />
      <text x="208" y="115" textAnchor="middle" fontSize="8" fontWeight="800" fill="#1e40af">FOREFINGER</text>
      <text x="208" y="124" textAnchor="middle" fontSize="7" fontWeight="700" fill="#2563eb">Field (B)</text>

      {/* 3. MIDDLE FINGER (Current I) - Points obliquely forward/left */}
      <line x1="90" y1="95" x2="38" y2="128" stroke="#d97706" strokeWidth="4" strokeLinecap="round" />
      <polygon points="32,132 40,122 46,132" fill="#d97706" />
      <rect x="18" y="80" width="60" height="22" rx="4" fill="#fffbeb" stroke="#fde68a" strokeWidth="1" />
      <text x="48" y="91" textAnchor="middle" fontSize="8" fontWeight="800" fill="#92400e">MIDDLE FINGER</text>
      <text x="48" y="100" textAnchor="middle" fontSize="7" fontWeight="700" fill="#d97706">Current (I)</text>

      {/* Mnemonic Banner FBI */}
      <rect x="122" y="24" width="116" height="52" rx="6" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1.2" />
      <text x="180" y="38" textAnchor="middle" fontSize="8.5" fontWeight="900" fill="#0f172a">F - B - I (Motor Rule)</text>
      <text x="130" y="52" fontSize="7" fontWeight="700" fill="#dc2626">• F = Force (Motion)</text>
      <text x="130" y="62" fontSize="7" fontWeight="700" fill="#2563eb">• B = Magnetic Field</text>
      <text x="130" y="72" fontSize="7" fontWeight="700" fill="#d97706">• I = Current in Wire</text>

      <text x="130" y="144" textAnchor="middle" fontSize="7" fontWeight="700" fill="#64748b">
        Mutually perpendicular fingers (90° to each other)
      </text>
    </g>
  );
}

/**
 * 8. Electric Motor (DC Motor Principle)
 * Armature coil ABCD, North/South poles, Split-ring commutator, Brushes, Battery
 */
export function renderElectricMotor() {
  return (
    <g>
      <rect x="12" y="10" width="236" height="140" rx="8" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1" />

      {/* North Magnetic Pole (Left) */}
      <path d="M 22,26 L 50,26 L 50,96 L 22,96 Z" fill="#fee2e2" stroke="#ef4444" strokeWidth="1.5" />
      <text x="36" y="66" textAnchor="middle" fontSize="16" fontWeight="900" fill="#b91c1c">N</text>

      {/* South Magnetic Pole (Right) */}
      <path d="M 210,26 L 238,26 L 238,96 L 210,96 Z" fill="#dbeafe" stroke="#3b82f6" strokeWidth="1.5" />
      <text x="224" y="66" textAnchor="middle" fontSize="16" fontWeight="900" fill="#1d4ed8">S</text>

      {/* Magnetic field lines B (N to S) */}
      <line x1="50" y1="42" x2="210" y2="42" stroke="#93c5fd" strokeWidth="1" strokeDasharray="3,2" />
      <line x1="50" y1="62" x2="210" y2="62" stroke="#93c5fd" strokeWidth="1" strokeDasharray="3,2" />
      <line x1="50" y1="82" x2="210" y2="82" stroke="#93c5fd" strokeWidth="1" strokeDasharray="3,2" />
      <text x="130" y="32" textAnchor="middle" fontSize="7.5" fontWeight="700" fill="#2563eb">Field B →</text>

      {/* Armature rectangular coil ABCD */}
      {/* AB arm */}
      <line x1="85" y1="42" x2="85" y2="84" stroke="#ea580c" strokeWidth="3" />
      <text x="76" y="44" fontSize="8.5" fontWeight="800" fill="#7c2d12">A</text>
      <text x="76" y="86" fontSize="8.5" fontWeight="800" fill="#7c2d12">B</text>
      {/* Force on AB (Downwards) */}
      <polygon points="85,96 81,87 89,87" fill="#dc2626" />
      <text x="85" y="105" textAnchor="middle" fontSize="7" fontWeight="800" fill="#dc2626">F ↓</text>

      {/* BC arm */}
      <line x1="85" y1="42" x2="175" y2="42" stroke="#ea580c" strokeWidth="3" />
      {/* Current arrow on BC */}
      <polygon points="135,42 127,38 127,46" fill={CURRENT_COLOR} />

      {/* CD arm */}
      <line x1="175" y1="42" x2="175" y2="84" stroke="#ea580c" strokeWidth="3" />
      <text x="181" y="44" fontSize="8.5" fontWeight="800" fill="#7c2d12">C</text>
      <text x="181" y="86" fontSize="8.5" fontWeight="800" fill="#7c2d12">D</text>
      {/* Force on CD (Upwards) */}
      <polygon points="175,28 171,37 179,37" fill="#dc2626" />
      <text x="175" y="24" textAnchor="middle" fontSize="7" fontWeight="800" fill="#dc2626">F ↑</text>

      {/* Leads to Split Ring Commutator */}
      <line x1="85" y1="84" x2="120" y2="92" stroke="#ea580c" strokeWidth="2" />
      <line x1="175" y1="84" x2="140" y2="92" stroke="#ea580c" strokeWidth="2" />

      {/* Split-ring commutator S1 & S2 at center */}
      {/* S1 half ring */}
      <path d="M 120,95 A 10,10 0 0,0 120,113" fill="none" stroke="#d97706" strokeWidth="3.5" />
      <text x="111" y="106" fontSize="7" fontWeight="800" fill="#92400e">S₁</text>
      {/* S2 half ring */}
      <path d="M 140,95 A 10,10 0 0,1 140,113" fill="none" stroke="#d97706" strokeWidth="3.5" />
      <text x="144" y="106" fontSize="7" fontWeight="800" fill="#92400e">S₂</text>

      {/* Carbon Brushes B1 & B2 */}
      <rect x="112" y="100" width="5" height="8" fill="#334155" />
      <rect x="143" y="100" width="5" height="8" fill="#334155" />

      {/* Rotation arrow indicator */}
      <path d="M 124,56 C 124,50 136,50 136,56" fill="none" stroke="#059669" strokeWidth="1.8" />
      <polygon points="124,56 122,50 128,52" fill="#059669" />
      <text x="130" y="66" textAnchor="middle" fontSize="7" fontWeight="800" fill="#059669">Rotation</text>

      {/* Bottom circuit: Battery and Switch */}
      <path d="M 112,104 L 95,104 L 95,130 L 120,130" fill="none" stroke={WIRE_COLOR} strokeWidth="1.6" />
      <path d="M 148,104 L 165,104 L 165,130 L 140,130" fill="none" stroke={WIRE_COLOR} strokeWidth="1.6" />
      {/* Battery */}
      <line x1="120" y1="124" x2="120" y2="136" stroke={WIRE_COLOR} strokeWidth="1.8" />
      <line x1="126" y1="127" x2="126" y2="133" stroke={WIRE_COLOR} strokeWidth="3" />
      <line x1="134" y1="124" x2="134" y2="136" stroke={WIRE_COLOR} strokeWidth="1.8" />
      <line x1="140" y1="127" x2="140" y2="133" stroke={WIRE_COLOR} strokeWidth="3" />

      <text x="130" y="144" textAnchor="middle" fontSize="7" fontWeight="700" fill="#475569">
        Split-ring reverses current every half-turn (continuous torque)
      </text>
    </g>
  );
}

/**
 * 9. Electromagnetic Induction (Faraday's Experiment)
 * Bar magnet moving towards coil connected to Galvanometer
 */
export function renderElectromagneticInduction() {
  return (
    <g>
      <rect x="12" y="10" width="236" height="140" rx="8" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1" />

      {/* Bar Magnet on Left */}
      <g transform="translate(24, 48)">
        {/* North Pole */}
        <rect x="0" y="0" width="30" height="24" rx="2" fill="#fee2e2" stroke="#ef4444" strokeWidth="1.4" />
        <text x="15" y="16" textAnchor="middle" fontSize="12" fontWeight="900" fill="#b91c1c">N</text>
        {/* South Pole */}
        <rect x="30" y="0" width="30" height="24" rx="2" fill="#dbeafe" stroke="#3b82f6" strokeWidth="1.4" />
        <text x="45" y="16" textAnchor="middle" fontSize="12" fontWeight="900" fill="#1d4ed8">S</text>

        {/* Motion arrow towards coil */}
        <line x1="12" y1="-12" x2="52" y2="-12" stroke="#dc2626" strokeWidth="2.2" />
        <polygon points="56,-12 48,-16 48,-8" fill="#dc2626" />
        <text x="32" y="-18" textAnchor="middle" fontSize="7.5" fontWeight="800" fill="#dc2626">Motion v →</text>
      </g>

      {/* Helical Coil on Right */}
      <g transform="translate(110, 42)">
        {/* Core cylinder */}
        <rect x="10" y="6" width="90" height="24" rx="3" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1" />
        <text x="55" y="22" textAnchor="middle" fontSize="7" fontWeight="600" fill="#94a3b8">Hollow tube</text>

        {/* Coil turns */}
        {[18, 34, 50, 66, 82].map((x, i) => (
          <ellipse key={i} cx={x} cy="18" rx="5" ry="16" fill="none" stroke="#ea580c" strokeWidth="2.4" />
        ))}

        {/* Induced current arrow */}
        <polygon points="50,0 56,5 50,10" fill={CURRENT_COLOR} />
        <text x="50" y="-4" textAnchor="middle" fontSize="7" fontWeight="800" fill={CURRENT_COLOR}>i_ind</text>

        {/* Connection wires from coil down to Galvanometer */}
        <line x1="18" y1="34" x2="18" y2="68" stroke={WIRE_COLOR} strokeWidth="1.6" />
        <line x1="82" y1="34" x2="82" y2="68" stroke={WIRE_COLOR} strokeWidth="1.6" />
        <line x1="18" y1="68" x2="40" y2="68" stroke={WIRE_COLOR} strokeWidth="1.6" />
        <line x1="82" y1="68" x2="60" y2="68" stroke={WIRE_COLOR} strokeWidth="1.6" />

        {/* Sensitive Galvanometer (G) */}
        <circle cx="50" cy="68" r="14" fill="#ffffff" stroke="#047857" strokeWidth="1.8" />
        <text x="50" y="61" textAnchor="middle" fontSize="8" fontWeight="800" fill="#047857">G</text>
        {/* Zero mark */}
        <line x1="50" y1="56" x2="50" y2="59" stroke="#047857" strokeWidth="1.2" />
        {/* Deflected needle (deflecting right to indicate induced current) */}
        <line x1="50" y1="74" x2="59" y2="60" stroke="#dc2626" strokeWidth="1.8" strokeLinecap="round" />
        <polygon points="61,57 56,60 59,64" fill="#dc2626" />
      </g>

      {/* Explanatory notes */}
      <rect x="24" y="96" width="86" height="38" rx="4" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1" />
      <text x="67" y="108" textAnchor="middle" fontSize="7" fontWeight="800" fill="#0f172a">Faraday's Law</text>
      <text x="28" y="119" fontSize="6.5" fontWeight="600" fill="#475569">• Motion creates dΦ/dt</text>
      <text x="28" y="129" fontSize="6.5" fontWeight="600" fill="#475569">• Deflection in G</text>

      <text x="130" y="144" textAnchor="middle" fontSize="7" fontWeight="700" fill="#475569">
        Induced EMF e = −N (dΦ/dt) • Lenz's law opposes the motion
      </text>
    </g>
  );
}

/**
 * 10. Domestic Electric Circuit (Household Wiring)
 * Live, Neutral, Earth wires with Fuse, Meter, Main Switch & Distribution Box
 */
export function renderDomesticCircuit() {
  return (
    <g>
      <rect x="12" y="10" width="236" height="140" rx="8" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1" />

      {/* Earth Wire (Green, Top) */}
      <line x1="20" y1="28" x2="238" y2="28" stroke={GROUND_COLOR} strokeWidth="1.8" strokeDasharray="4,2" />
      <text x="22" y="24" fontSize="7.5" fontWeight="800" fill={GROUND_COLOR}>Earth Wire (E) [Green/Yellow]</text>

      {/* Live Wire (Red, Middle, 220V) */}
      <line x1="20" y1="52" x2="238" y2="52" stroke="#dc2626" strokeWidth="2" />
      <text x="22" y="48" fontSize="7.5" fontWeight="800" fill="#dc2626">Live Wire (L) 220V [Brown/Red]</text>

      {/* Neutral Wire (Blue/Black, Bottom, 0V) */}
      <line x1="20" y1="76" x2="238" y2="76" stroke="#2563eb" strokeWidth="2" />
      <text x="22" y="72" fontSize="7.5" fontWeight="800" fill="#2563eb">Neutral Wire (N) 0V [Light Blue/Black]</text>

      {/* 1. Electricity Board Fuse */}
      <rect x="52" y="44" width="20" height="16" rx="2" fill="#ffffff" stroke="#dc2626" strokeWidth="1.3" />
      <line x1="56" y1="52" x2="68" y2="52" stroke="#d97706" strokeWidth="1.4" strokeDasharray="2,1" />
      <text x="62" y="70" textAnchor="middle" fontSize="6" fontWeight="700" fill="#475569">Board Fuse</text>

      {/* 2. Electric Meter (kWh) */}
      <rect x="88" y="40" width="30" height="46" rx="3" fill="#ffffff" stroke="#334155" strokeWidth="1.5" />
      <rect x="93" y="45" width="20" height="12" fill="#f1f5f9" stroke="#94a3b8" strokeWidth="0.8" />
      <text x="103" y="54" textAnchor="middle" fontSize="7" fontWeight="800" fill="#0f172a">kWh</text>
      <text x="103" y="76" textAnchor="middle" fontSize="6.5" fontWeight="700" fill="#475569">Meter</text>

      {/* 3. Main Switch */}
      <rect x="134" y="42" width="26" height="42" rx="3" fill="#ffffff" stroke="#475569" strokeWidth="1.3" />
      <line x1="138" y1="52" x2="148" y2="48" stroke="#dc2626" strokeWidth="1.5" />
      <line x1="138" y1="76" x2="148" y2="72" stroke="#2563eb" strokeWidth="1.5" />
      <text x="147" y="72" textAnchor="middle" fontSize="6" fontWeight="700" fill="#475569">Main Sw</text>

      {/* 4. Consumer Distribution Board (MCB) */}
      <rect x="175" y="38" width="26" height="50" rx="3" fill="#f8fafc" stroke="#64748b" strokeWidth="1.2" />
      <text x="188" y="50" textAnchor="middle" fontSize="6" fontWeight="800" fill="#0f172a">MCB</text>
      <rect x="181" y="55" width="5" height="10" fill="#22c55e" />
      <rect x="190" y="55" width="5" height="10" fill="#22c55e" />
      <text x="188" y="76" textAnchor="middle" fontSize="6" fontWeight="700" fill="#475569">Distrib.</text>

      {/* 5. Appliance branch (e.g. bulb/load) with switch on LIVE wire */}
      <g transform="translate(210, 36)">
        {/* Switch on Live */}
        <circle cx="6" cy="16" r="1.5" fill="#dc2626" />
        <line x1="6" y1="16" x2="14" y2="10" stroke="#dc2626" strokeWidth="1.3" />
        <circle cx="16" cy="16" r="1.5" fill="#dc2626" />
        <text x="11" y="6" textAnchor="middle" fontSize="5.5" fontWeight="700" fill="#dc2626">Switch</text>
        {/* Bulb symbol */}
        <circle cx="11" cy="28" r="6" fill="#fef08a" stroke="#ca8a04" strokeWidth="1" />
        <text x="11" y="31" textAnchor="middle" fontSize="6" fontWeight="800" fill="#ca8a04">💡</text>
      </g>

      {/* Golden rule banner at bottom */}
      <rect x="20" y="98" width="220" height="36" rx="4" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1" />
      <text x="130" y="112" textAnchor="middle" fontSize="7.5" fontWeight="800" fill="#b91c1c">
        ★ Switch & Fuse are ALWAYS installed in the LIVE wire!
      </text>
      <text x="130" y="125" textAnchor="middle" fontSize="7" fontWeight="600" fill="#475569">
        All domestic appliances are connected in PARALLEL (220V across each)
      </text>
    </g>
  );
}

/**
 * 11. Three-Pin Plug and Socket Wiring
 * Large earth pin at top, neutral pin left, live pin right
 */
export function renderThreePinPlug() {
  return (
    <g>
      <rect x="12" y="10" width="236" height="140" rx="8" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1" />

      {/* Socket Outer Plate */}
      <rect x="68" y="24" width="124" height="106" rx="12" fill="#ffffff" stroke="#cbd5e1" strokeWidth="2" />
      <circle cx="78" cy="34" r="2" fill="#94a3b8" />
      <circle cx="182" cy="34" r="2" fill="#94a3b8" />
      <circle cx="78" cy="120" r="2" fill="#94a3b8" />
      <circle cx="182" cy="120" r="2" fill="#94a3b8" />

      {/* 1. TOP PIN: EARTH (E) - Thicker & Longer */}
      <circle cx="130" cy="46" r="10" fill="#f0fdf4" stroke={GROUND_COLOR} strokeWidth="2.5" />
      <circle cx="130" cy="46" r="6" fill="#15803d" />
      <text x="130" y="30" textAnchor="middle" fontSize="8.5" fontWeight="900" fill={GROUND_COLOR}>EARTH (E)</text>

      {/* 2. BOTTOM LEFT PIN: NEUTRAL (N) */}
      <circle cx="98" cy="86" r="8" fill="#eff6ff" stroke="#2563eb" strokeWidth="2" />
      <circle cx="98" cy="86" r="4.5" fill="#1d4ed8" />
      <text x="98" y="104" textAnchor="middle" fontSize="8" fontWeight="800" fill="#1d4ed8">NEUTRAL (N)</text>
      <text x="98" y="112" textAnchor="middle" fontSize="6.5" fontWeight="600" fill="#64748b">Light Blue/Black</text>

      {/* 3. BOTTOM RIGHT PIN: LIVE (L) */}
      <circle cx="162" cy="86" r="8" fill="#fef2f2" stroke="#dc2626" strokeWidth="2" />
      <circle cx="162" cy="86" r="4.5" fill="#b91c1c" />
      <text x="162" y="104" textAnchor="middle" fontSize="8" fontWeight="800" fill="#b91c1c">LIVE (L)</text>
      <text x="162" y="112" textAnchor="middle" fontSize="6.5" fontWeight="600" fill="#64748b">Brown/Red</text>

      {/* Why Earth Pin is Thicker & Longer Callout */}
      <rect x="20" y="132" width="220" height="0" fill="none" />
      <text x="130" y="142" textAnchor="middle" fontSize="7" fontWeight="700" fill="#1e293b">
        Earth pin is thicker & longer: Connects first for grounding safety, prevents wrong insertion
      </text>
    </g>
  );
}

/**
 * Dispatcher for all electricity diagrams
 */
export function renderElectricityDiagram(variant) {
  switch (variant) {
    case 'circuit_ohms_law':
    case 'ohms_law':
    case 'ohms_circuit':
      return renderOhmsLawCircuit();

    case 'resistors_series':
    case 'series_combination':
    case 'resistor_series':
      return renderResistorsSeries();

    case 'resistors_parallel':
    case 'parallel_combination':
    case 'resistor_parallel':
      return renderResistorsParallel();

    case 'right_hand_thumb_rule':
    case 'thumb_rule':
    case 'magnetic_field_straight_wire':
    case 'straight_conductor':
      return renderRightHandThumbRule();

    case 'circular_loop_field':
    case 'circular_loop':
    case 'magnetic_field_loop':
      return renderCircularLoopField();

    case 'solenoid_field':
    case 'solenoid':
    case 'magnetic_field_solenoid':
      return renderSolenoidField();

    case 'flemings_left_hand_rule':
    case 'left_hand_rule':
    case 'motor_rule':
      return renderFlemingsLeftHandRule();

    case 'electric_motor':
    case 'dc_motor':
    case 'motor':
      return renderElectricMotor();

    case 'electromagnetic_induction':
    case 'faraday_induction':
    case 'faraday_experiment':
    case 'induction':
      return renderElectromagneticInduction();

    case 'domestic_circuit':
    case 'household_circuit':
    case 'household_wiring':
      return renderDomesticCircuit();

    case 'three_pin_plug':
    case 'plug_socket':
    case 'plug_wiring':
      return renderThreePinPlug();

    default:
      return renderOhmsLawCircuit();
  }
}
