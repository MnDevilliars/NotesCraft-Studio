import React from 'react';

/**
 * Shared primitives for chemistry SVGs
 */
export const Dot = ({ x, y, color = '#1d4ed8' }) => (
  <circle cx={x} cy={y} r="2.6" fill={color} />
);

export const Cross = ({ x, y, color = '#dc2626' }) => (
  <g>
    <line x1={x - 2.5} y1={y - 2.5} x2={x + 2.5} y2={y + 2.5} stroke={color} strokeWidth="1.6" strokeLinecap="round" />
    <line x1={x - 2.5} y1={y + 2.5} x2={x + 2.5} y2={y - 2.5} stroke={color} strokeWidth="1.6" strokeLinecap="round" />
  </g>
);

export const TransferArrow = ({ x1, y1, x2, y2, color = '#d97706', curveOffset = -22 }) => {
  const mx = (x1 + x2) / 2;
  const my = Math.min(y1, y2) + curveOffset;
  const angle = Math.atan2(y2 - my, x2 - mx);
  const headLen = 5.5;
  const arrowTipX = x2;
  const arrowTipY = y2;
  const leftX = arrowTipX - headLen * Math.cos(angle - Math.PI / 6);
  const leftY = arrowTipY - headLen * Math.sin(angle - Math.PI / 6);
  const rightX = arrowTipX - headLen * Math.cos(angle + Math.PI / 6);
  const rightY = arrowTipY - headLen * Math.sin(angle + Math.PI / 6);

  return (
    <g>
      <path
        d={`M ${x1},${y1} Q ${mx},${my} ${x2},${y2}`}
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <polygon
        points={`${arrowTipX},${arrowTipY} ${leftX},${leftY} ${rightX},${rightY}`}
        fill={color}
      />
    </g>
  );
};

export const IonBracket = ({
  symbol,
  charge,
  config,
  x,
  y,
  width = 30,
  height = 34,
  electrons = null,
  chargeOffsetX = 3
}) => {
  const xLeft = x - width / 2;
  const xRight = x + width / 2;
  const yTop = y - height / 2;
  const yBottom = y + height / 2;
  const bracketArm = 5;

  return (
    <g>
      {/* Left bracket */}
      <path
        d={`M ${xLeft + bracketArm},${yTop} L ${xLeft},${yTop} L ${xLeft},${yBottom} L ${xLeft + bracketArm},${yBottom}`}
        fill="none"
        stroke="#1e293b"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      {/* Right bracket */}
      <path
        d={`M ${xRight - bracketArm},${yTop} L ${xRight},${yTop} L ${xRight},${yBottom} L ${xRight - bracketArm},${yBottom}`}
        fill="none"
        stroke="#1e293b"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      {/* Symbol */}
      <text
        x={x}
        y={y + 4.5}
        textAnchor="middle"
        fontSize="14"
        fontWeight="700"
        fill="#0f172a"
        fontFamily="inherit"
      >
        {symbol}
      </text>
      {/* Charge superscript */}
      <text
        x={xRight + chargeOffsetX}
        y={yTop + 6}
        fontSize="12"
        fontWeight="800"
        fill={charge.includes('⁺') || charge.includes('+') ? '#1d4ed8' : '#dc2626'}
        fontFamily="inherit"
      >
        {charge}
      </text>
      {/* Valence electrons inside brackets if specified */}
      {electrons}
      {/* Electronic config below */}
      {config && (
        <text
          x={x}
          y={yBottom + 14}
          textAnchor="middle"
          fontSize="9.5"
          fontWeight="700"
          fill="#334155"
          fontFamily="inherit"
        >
          {config}
        </text>
      )}
    </g>
  );
};

// =========================================================================
// PART 2 (A): IONIC BONDS (Electron-transfer diagrams)
// =========================================================================

export function renderIonicBond(rawVariant = 'nacl') {
  const v = rawVariant.toLowerCase().replace(/^ionic_/, '');

  const bottomText = (
    <text
      x="130"
      y="151"
      textAnchor="middle"
      fontSize="8.5"
      fontWeight="700"
      fill="#1e3a8a"
      fontFamily="inherit"
    >
      Electrostatic attraction between the ions = ionic bond
    </text>
  );

  const transitionArrow = (x = 138, y = 58) => (
    <g>
      <line x1={x - 12} y1={y} x2={x + 10} y2={y} stroke="#64748b" strokeWidth="1.8" strokeLinecap="round" />
      <polygon points={`${x + 14},${y} ${x + 8},${y - 4} ${x + 8},${y + 4}`} fill="#64748b" />
    </g>
  );

  // 1. NaCl: Na (2,8,1) -> Cl (2,8,7)
  if (v === 'nacl') {
    return (
      <g>
        {/* Metal atom: Na (1 dot) */}
        <text x="36" y="63" textAnchor="middle" fontSize="14" fontWeight="700" fill="#0f172a">Na</text>
        <Dot x={49} y={58} />
        <text x="36" y="82" textAnchor="middle" fontSize="9.5" fontWeight="700" fill="#475569">2,8,1</text>

        {/* Plus sign */}
        <text x="68" y="63" textAnchor="middle" fontSize="14" fontWeight="600" fill="#94a3b8">+</text>

        {/* Non-metal atom: Cl (7 crosses) */}
        <text x="98" y="63" textAnchor="middle" fontSize="14" fontWeight="700" fill="#0f172a">Cl</text>
        <Cross x={94} y={46} /><Cross x={102} y={46} />
        <Cross x={112} y={55} /><Cross x={112} y={63} />
        <Cross x={94} y={72} /><Cross x={102} y={72} />
        <Cross x={84} y={55} />
        <text x="98" y="82" textAnchor="middle" fontSize="9.5" fontWeight="700" fill="#475569">2,8,7</text>

        {/* Transfer arrow from Na dot to Cl vacancy */}
        <TransferArrow x1={51} y1={56} x2={82} y2={61} curveOffset={-24} />

        {/* Transition arrow */}
        {transitionArrow(135, 59)}

        {/* Resulting ions: [Na]⁺ and [Cl]⁻ */}
        <IonBracket symbol="Na" charge="⁺" config="2,8" x={166} y={58} width={28} height={32} />
        <IonBracket
          symbol="Cl"
          charge="⁻"
          config="2,8,8"
          x={218}
          y={58}
          width={36}
          height={34}
          electrons={
            <g>
              <Cross x={214} y={45} /><Cross x={222} y={45} />
              <Cross x={232} y={54} /><Cross x={232} y={62} />
              <Cross x={214} y={71} /><Cross x={222} y={71} />
              <Cross x={204} y={54} />
              <Dot x={204} y={62} />
            </g>
          }
        />
        {bottomText}
      </g>
    );
  }

  // 2. NaF: Na (2,8,1) -> F (2,7)
  if (v === 'naf') {
    return (
      <g>
        <text x="36" y="63" textAnchor="middle" fontSize="14" fontWeight="700" fill="#0f172a">Na</text>
        <Dot x={49} y={58} />
        <text x="36" y="82" textAnchor="middle" fontSize="9.5" fontWeight="700" fill="#475569">2,8,1</text>

        <text x="68" y="63" textAnchor="middle" fontSize="14" fontWeight="600" fill="#94a3b8">+</text>

        <text x="98" y="63" textAnchor="middle" fontSize="14" fontWeight="700" fill="#0f172a">F</text>
        <Cross x={94} y={46} /><Cross x={102} y={46} />
        <Cross x={110} y={55} /><Cross x={110} y={63} />
        <Cross x={94} y={72} /><Cross x={102} y={72} />
        <Cross x={86} y={55} />
        <text x="98" y="82" textAnchor="middle" fontSize="9.5" fontWeight="700" fill="#475569">2,7</text>

        <TransferArrow x1={51} y1={56} x2={84} y2={61} curveOffset={-24} />
        {transitionArrow(135, 59)}

        <IonBracket symbol="Na" charge="⁺" config="2,8" x={166} y={58} width={28} height={32} />
        <IonBracket
          symbol="F"
          charge="⁻"
          config="2,8"
          x={218}
          y={58}
          width={34}
          height={34}
          electrons={
            <g>
              <Cross x={214} y={45} /><Cross x={222} y={45} />
              <Cross x={231} y={54} /><Cross x={231} y={62} />
              <Cross x={214} y={71} /><Cross x={222} y={71} />
              <Cross x={205} y={54} />
              <Dot x={205} y={62} />
            </g>
          }
        />
        {bottomText}
      </g>
    );
  }

  // 3. KCl: K (2,8,8,1) -> Cl (2,8,7)
  if (v === 'kcl') {
    return (
      <g>
        <text x="36" y="63" textAnchor="middle" fontSize="14" fontWeight="700" fill="#0f172a">K</text>
        <Dot x={46} y={58} />
        <text x="36" y="82" textAnchor="middle" fontSize="9" fontWeight="700" fill="#475569">2,8,8,1</text>

        <text x="68" y="63" textAnchor="middle" fontSize="14" fontWeight="600" fill="#94a3b8">+</text>

        <text x="98" y="63" textAnchor="middle" fontSize="14" fontWeight="700" fill="#0f172a">Cl</text>
        <Cross x={94} y={46} /><Cross x={102} y={46} />
        <Cross x={112} y={55} /><Cross x={112} y={63} />
        <Cross x={94} y={72} /><Cross x={102} y={72} />
        <Cross x={84} y={55} />
        <text x="98" y="82" textAnchor="middle" fontSize="9.5" fontWeight="700" fill="#475569">2,8,7</text>

        <TransferArrow x1={48} y1={56} x2={82} y2={61} curveOffset={-24} />
        {transitionArrow(135, 59)}

        <IonBracket symbol="K" charge="⁺" config="2,8,8" x={166} y={58} width={28} height={32} />
        <IonBracket
          symbol="Cl"
          charge="⁻"
          config="2,8,8"
          x={218}
          y={58}
          width={36}
          height={34}
          electrons={
            <g>
              <Cross x={214} y={45} /><Cross x={222} y={45} />
              <Cross x={232} y={54} /><Cross x={232} y={62} />
              <Cross x={214} y={71} /><Cross x={222} y={71} />
              <Cross x={204} y={54} />
              <Dot x={204} y={62} />
            </g>
          }
        />
        {bottomText}
      </g>
    );
  }

  // 4. LiH: Li (2,1) -> H (1 cross) => [Li]⁺ (2) + [H]⁻ (2)
  if (v === 'lih') {
    return (
      <g>
        <text x="36" y="63" textAnchor="middle" fontSize="14" fontWeight="700" fill="#0f172a">Li</text>
        <Dot x={46} y={58} />
        <text x="36" y="82" textAnchor="middle" fontSize="9.5" fontWeight="700" fill="#475569">2,1</text>

        <text x="68" y="63" textAnchor="middle" fontSize="14" fontWeight="600" fill="#94a3b8">+</text>

        <text x="98" y="63" textAnchor="middle" fontSize="14" fontWeight="700" fill="#0f172a">H</text>
        <Cross x={108} y={58} />
        <text x="98" y="82" textAnchor="middle" fontSize="9.5" fontWeight="700" fill="#475569">1</text>

        <TransferArrow x1={48} y1={56} x2={88} y2={58} curveOffset={-24} />
        {transitionArrow(135, 59)}

        <IonBracket symbol="Li" charge="⁺" config="2" x={166} y={58} width={28} height={32} />
        <IonBracket
          symbol="H"
          charge="⁻"
          config="2"
          x={218}
          y={58}
          width={30}
          height={32}
          electrons={
            <g>
              <Cross x={227} y={58} />
              <Dot x={209} y={58} />
            </g>
          }
        />
        {bottomText}
      </g>
    );
  }

  // 5. CaO: Ca (2,8,8,2) gives 2 electrons to O (2,6) => [Ca]²⁺ (2,8,8) + [O]²⁻ (2,8)
  if (v === 'cao') {
    return (
      <g>
        <text x="36" y="63" textAnchor="middle" fontSize="14" fontWeight="700" fill="#0f172a">Ca</text>
        <Dot x={49} y={53} /><Dot x={49} y={67} />
        <text x="36" y="83" textAnchor="middle" fontSize="9" fontWeight="700" fill="#475569">2,8,8,2</text>

        <text x="68" y="63" textAnchor="middle" fontSize="14" fontWeight="600" fill="#94a3b8">+</text>

        <text x="98" y="63" textAnchor="middle" fontSize="14" fontWeight="700" fill="#0f172a">O</text>
        <Cross x={94} y={46} /><Cross x={102} y={46} />
        <Cross x={111} y={54} /><Cross x={111} y={64} />
        <Cross x={94} y={72} /><Cross x={102} y={72} />
        <text x="98" y="83" textAnchor="middle" fontSize="9.5" fontWeight="700" fill="#475569">2,6</text>

        <TransferArrow x1={51} y1={52} x2={85} y2={52} curveOffset={-22} />
        <TransferArrow x1={51} y1={68} x2={85} y2={67} curveOffset={-14} />

        {transitionArrow(135, 59)}

        <IonBracket symbol="Ca" charge="²⁺" config="2,8,8" x={166} y={58} width={30} height={34} chargeOffsetX={1} />
        <IonBracket
          symbol="O"
          charge="²⁻"
          config="2,8"
          x={218}
          y={58}
          width={34}
          height={34}
          chargeOffsetX={1}
          electrons={
            <g>
              <Cross x={214} y={45} /><Cross x={222} y={45} />
              <Cross x={231} y={54} /><Cross x={231} y={62} />
              <Cross x={214} y={71} /><Cross x={222} y={71} />
              <Dot x={205} y={54} /><Dot x={205} y={62} />
            </g>
          }
        />
        {bottomText}
      </g>
    );
  }

  // 6. MgO: Mg (2,8,2) gives 2 electrons to O (2,6) => [Mg]²⁺ (2,8) + [O]²⁻ (2,8)
  if (v === 'mgo') {
    return (
      <g>
        <text x="36" y="63" textAnchor="middle" fontSize="14" fontWeight="700" fill="#0f172a">Mg</text>
        <Dot x={50} y={53} /><Dot x={50} y={67} />
        <text x="36" y="83" textAnchor="middle" fontSize="9.5" fontWeight="700" fill="#475569">2,8,2</text>

        <text x="68" y="63" textAnchor="middle" fontSize="14" fontWeight="600" fill="#94a3b8">+</text>

        <text x="98" y="63" textAnchor="middle" fontSize="14" fontWeight="700" fill="#0f172a">O</text>
        <Cross x={94} y={46} /><Cross x={102} y={46} />
        <Cross x={111} y={54} /><Cross x={111} y={64} />
        <Cross x={94} y={72} /><Cross x={102} y={72} />
        <text x="98" y="83" textAnchor="middle" fontSize="9.5" fontWeight="700" fill="#475569">2,6</text>

        <TransferArrow x1={52} y1={52} x2={85} y2={52} curveOffset={-22} />
        <TransferArrow x1={52} y1={68} x2={85} y2={67} curveOffset={-14} />

        {transitionArrow(135, 59)}

        <IonBracket symbol="Mg" charge="²⁺" config="2,8" x={166} y={58} width={30} height={34} chargeOffsetX={1} />
        <IonBracket
          symbol="O"
          charge="²⁻"
          config="2,8"
          x={218}
          y={58}
          width={34}
          height={34}
          chargeOffsetX={1}
          electrons={
            <g>
              <Cross x={214} y={45} /><Cross x={222} y={45} />
              <Cross x={231} y={54} /><Cross x={231} y={62} />
              <Cross x={214} y={71} /><Cross x={222} y={71} />
              <Dot x={205} y={54} /><Dot x={205} y={62} />
            </g>
          }
        />
        {bottomText}
      </g>
    );
  }

  // 7. MgCl2: Mg (2,8,2) gives 1 electron to each of 2 Cl atoms (2,8,7)
  if (v === 'mgcl2') {
    return (
      <g>
        {/* Metal in center-left */}
        <text x="34" y="63" textAnchor="middle" fontSize="14" fontWeight="700" fill="#0f172a">Mg</text>
        <Dot x={49} y={46} /><Dot x={49} y={72} />
        <text x="34" y="84" textAnchor="middle" fontSize="9.5" fontWeight="700" fill="#475569">2,8,2</text>

        {/* Plus sign */}
        <text x="66" y="63" textAnchor="middle" fontSize="13" fontWeight="600" fill="#94a3b8">+</text>

        {/* 2 Cl atoms stacked */}
        {/* Upper Cl */}
        <text x="96" y="42" textAnchor="middle" fontSize="12" fontWeight="700" fill="#0f172a">Cl</text>
        <Cross x={93} y={28} /><Cross x={99} y={28} />
        <Cross x={108} y={36} /><Cross x={108} y={44} />
        <Cross x={93} y={50} /><Cross x={99} y={50} />
        <Cross x={84} y={36} />
        <text x="120" y="42" fontSize="8" fontWeight="700" fill="#475569">2,8,7</text>

        {/* Lower Cl */}
        <text x="96" y="84" textAnchor="middle" fontSize="12" fontWeight="700" fill="#0f172a">Cl</text>
        <Cross x={93} y={70} /><Cross x={99} y={70} />
        <Cross x={108} y={78} /><Cross x={108} y={86} />
        <Cross x={93} y={92} /><Cross x={99} y={92} />
        <Cross x={84} y={78} />
        <text x="120" y="84" fontSize="8" fontWeight="700" fill="#475569">2,8,7</text>

        {/* Transfer arrows */}
        <TransferArrow x1={51} y1={44} x2={82} y2={42} curveOffset={-16} />
        <TransferArrow x1={51} y1={74} x2={82} y2={84} curveOffset={16} />

        {/* Transition arrow */}
        {transitionArrow(146, 61)}

        {/* Resulting ions: [Mg]²⁺ and 2 [Cl]⁻ */}
        <IonBracket symbol="Mg" charge="²⁺" config="2,8" x={175} y={60} width={28} height={34} chargeOffsetX={1} />
        <text x="199" y="64" fontSize="13" fontWeight="700" fill="#0f172a">+</text>
        <text x="210" y="65" fontSize="13" fontWeight="800" fill="#0f172a">2</text>
        <IonBracket
          symbol="Cl"
          charge="⁻"
          config="2,8,8"
          x={232}
          y={60}
          width={32}
          height={34}
          electrons={
            <g>
              <Cross x={229} y={48} /><Cross x={235} y={48} />
              <Cross x={243} y={56} /><Cross x={243} y={63} />
              <Cross x={229} y={71} /><Cross x={235} y={71} />
              <Cross x={221} y={56} />
              <Dot x={221} y={63} />
            </g>
          }
        />
        {bottomText}
      </g>
    );
  }

  // 8. CaCl2: Ca (2,8,8,2) gives 1 electron to each of 2 Cl atoms (2,8,7)
  if (v === 'cacl2') {
    return (
      <g>
        <text x="34" y="63" textAnchor="middle" fontSize="14" fontWeight="700" fill="#0f172a">Ca</text>
        <Dot x={49} y={46} /><Dot x={49} y={72} />
        <text x="34" y="84" textAnchor="middle" fontSize="8.5" fontWeight="700" fill="#475569">2,8,8,2</text>

        <text x="66" y="63" textAnchor="middle" fontSize="13" fontWeight="600" fill="#94a3b8">+</text>

        {/* Upper Cl */}
        <text x="96" y="42" textAnchor="middle" fontSize="12" fontWeight="700" fill="#0f172a">Cl</text>
        <Cross x={93} y={28} /><Cross x={99} y={28} />
        <Cross x={108} y={36} /><Cross x={108} y={44} />
        <Cross x={93} y={50} /><Cross x={99} y={50} />
        <Cross x={84} y={36} />
        <text x="120" y="42" fontSize="8" fontWeight="700" fill="#475569">2,8,7</text>

        {/* Lower Cl */}
        <text x="96" y="84" textAnchor="middle" fontSize="12" fontWeight="700" fill="#0f172a">Cl</text>
        <Cross x={93} y={70} /><Cross x={99} y={70} />
        <Cross x={108} y={78} /><Cross x={108} y={86} />
        <Cross x={93} y={92} /><Cross x={99} y={92} />
        <Cross x={84} y={78} />
        <text x="120" y="84" fontSize="8" fontWeight="700" fill="#475569">2,8,7</text>

        <TransferArrow x1={51} y1={44} x2={82} y2={42} curveOffset={-16} />
        <TransferArrow x1={51} y1={74} x2={82} y2={84} curveOffset={16} />

        {transitionArrow(146, 61)}

        <IonBracket symbol="Ca" charge="²⁺" config="2,8,8" x={175} y={60} width={28} height={34} chargeOffsetX={1} />
        <text x="199" y="64" fontSize="13" fontWeight="700" fill="#0f172a">+</text>
        <text x="210" y="65" fontSize="13" fontWeight="800" fill="#0f172a">2</text>
        <IonBracket
          symbol="Cl"
          charge="⁻"
          config="2,8,8"
          x={232}
          y={60}
          width={32}
          height={34}
          electrons={
            <g>
              <Cross x={229} y={48} /><Cross x={235} y={48} />
              <Cross x={243} y={56} /><Cross x={243} y={63} />
              <Cross x={229} y={71} /><Cross x={235} y={71} />
              <Cross x={221} y={56} />
              <Dot x={221} y={63} />
            </g>
          }
        />
        {bottomText}
      </g>
    );
  }

  // 9. Na2O: Two Na atoms give 1 electron each to one O atom
  if (v === 'na2o') {
    return (
      <g>
        {/* Upper Na */}
        <text x="36" y="42" textAnchor="middle" fontSize="12" fontWeight="700" fill="#0f172a">Na</text>
        <Dot x={48} y={40} />
        <text x="36" y="55" textAnchor="middle" fontSize="8" fontWeight="700" fill="#475569">2,8,1</text>

        {/* Lower Na */}
        <text x="36" y="82" textAnchor="middle" fontSize="12" fontWeight="700" fill="#0f172a">Na</text>
        <Dot x={48} y={80} />
        <text x="36" y="95" textAnchor="middle" fontSize="8" fontWeight="700" fill="#475569">2,8,1</text>

        <text x="65" y="63" textAnchor="middle" fontSize="13" fontWeight="600" fill="#94a3b8">+</text>

        {/* O atom in middle */}
        <text x="96" y="64" textAnchor="middle" fontSize="14" fontWeight="700" fill="#0f172a">O</text>
        <Cross x={92} y={48} /><Cross x={100} y={48} />
        <Cross x={108} y={57} /><Cross x={108} y={67} />
        <Cross x={92} y={74} /><Cross x={100} y={74} />
        <text x="96" y="86" textAnchor="middle" fontSize="9.5" fontWeight="700" fill="#475569">2,6</text>

        {/* Transfer arrows */}
        <TransferArrow x1={51} y1={40} x2={84} y2={55} curveOffset={-14} />
        <TransferArrow x1={51} y1={80} x2={84} y2={68} curveOffset={14} />

        {transitionArrow(138, 61)}

        {/* Resulting ions: 2 [Na]⁺ and [O]²⁻ */}
        <text x="162" y="65" fontSize="13" fontWeight="800" fill="#0f172a">2</text>
        <IonBracket symbol="Na" charge="⁺" config="2,8" x={180} y={60} width={26} height={32} />
        <text x="200" y="64" fontSize="13" fontWeight="700" fill="#0f172a">+</text>
        <IonBracket
          symbol="O"
          charge="²⁻"
          config="2,8"
          x={226}
          y={60}
          width={32}
          height={34}
          chargeOffsetX={1}
          electrons={
            <g>
              <Cross x={222} y={47} /><Cross x={230} y={47} />
              <Cross x={238} y={55} /><Cross x={238} y={63} />
              <Cross x={222} y={72} /><Cross x={230} y={72} />
              <Dot x={213} y={55} /><Dot x={213} y={63} />
            </g>
          }
        />
        {bottomText}
      </g>
    );
  }

  return null;
}

// =========================================================================
// PART 2 (B): COVALENT BONDS - Electron-Dot & Dash
// =========================================================================

export function renderCovalentDot(name = 'h2') {
  const n = name.toLowerCase().replace(/^covalent_/, '').replace(/_dot$/, '');

  const labelOctet = (text = 'Full octet complete (H shows duplet)') => (
    <text x="130" y="150" textAnchor="middle" fontSize="8.5" fontWeight="600" fill="#2563eb">
      {text}
    </text>
  );

  // 1. H2: 1 shared pair
  if (n === 'h2') {
    return (
      <g>
        {/* Soft duplet circles */}
        <circle cx="106" cy="70" r="28" fill="#dbeafe" fillOpacity="0.45" stroke="#93c5fd" strokeWidth="1.2" strokeDasharray="3 2" />
        <circle cx="144" cy="70" r="28" fill="#dbeafe" fillOpacity="0.45" stroke="#93c5fd" strokeWidth="1.2" strokeDasharray="3 2" />

        <text x="96" y="75" textAnchor="middle" fontSize="16" fontWeight="700" fill="#0f172a">H</text>
        {/* Shared pair */}
        <Dot x={121} y={70} />
        <Cross x={129} y={70} />
        <text x="154" y="75" textAnchor="middle" fontSize="16" fontWeight="700" fill="#0f172a">H</text>

        <text x="125" y="112" textAnchor="middle" fontSize="9" fontWeight="700" fill="#475569">
          1 shared electron pair (Single covalent bond)
        </text>
        {labelOctet('Each H atom attains Helium (2) duplet')}
      </g>
    );
  }

  // 2. Cl2: 1 shared pair, 3 lone pairs on each Cl
  if (n === 'cl2') {
    return (
      <g>
        <circle cx="98" cy="70" r="34" fill="#dbeafe" fillOpacity="0.35" stroke="#93c5fd" strokeWidth="1.2" strokeDasharray="3 2" />
        <circle cx="152" cy="70" r="34" fill="#dbeafe" fillOpacity="0.35" stroke="#93c5fd" strokeWidth="1.2" strokeDasharray="3 2" />

        <text x="88" y="75" textAnchor="middle" fontSize="16" fontWeight="700" fill="#0f172a">Cl</text>
        {/* Left Cl lone pairs (6 dots) */}
        <Dot x={82} y={50} /><Dot x={94} y={50} />
        <Dot x={68} y={65} /><Dot x={68} y={75} />
        <Dot x={82} y={90} /><Dot x={94} y={90} />

        {/* Shared pair in center */}
        <Dot x={120} y={70} />
        <Cross x={128} y={70} />

        <text x="162" y="75" textAnchor="middle" fontSize="16" fontWeight="700" fill="#0f172a">Cl</text>
        {/* Right Cl lone pairs (6 crosses) */}
        <Cross x={156} y={50} /><Cross x={168} y={50} />
        <Cross x={182} y={65} /><Cross x={182} y={75} />
        <Cross x={156} y={90} /><Cross x={168} y={90} />

        <text x="125" y="118" textAnchor="middle" fontSize="9" fontWeight="700" fill="#475569">
          1 shared pair • 3 lone pairs on each Cl atom
        </text>
        {labelOctet('Each Cl atom completes stable octet (2,8,8)')}
      </g>
    );
  }

  // 3. F2: 1 shared pair, 3 lone pairs on each F
  if (n === 'f2') {
    return (
      <g>
        <circle cx="98" cy="70" r="34" fill="#dbeafe" fillOpacity="0.35" stroke="#93c5fd" strokeWidth="1.2" strokeDasharray="3 2" />
        <circle cx="152" cy="70" r="34" fill="#dbeafe" fillOpacity="0.35" stroke="#93c5fd" strokeWidth="1.2" strokeDasharray="3 2" />

        <text x="88" y="75" textAnchor="middle" fontSize="16" fontWeight="700" fill="#0f172a">F</text>
        <Dot x={82} y={50} /><Dot x={94} y={50} />
        <Dot x={68} y={65} /><Dot x={68} y={75} />
        <Dot x={82} y={90} /><Dot x={94} y={90} />

        <Dot x={120} y={70} />
        <Cross x={128} y={70} />

        <text x="162" y="75" textAnchor="middle" fontSize="16" fontWeight="700" fill="#0f172a">F</text>
        <Cross x={156} y={50} /><Cross x={168} y={50} />
        <Cross x={182} y={65} /><Cross x={182} y={75} />
        <Cross x={156} y={90} /><Cross x={168} y={90} />

        <text x="125" y="118" textAnchor="middle" fontSize="9" fontWeight="700" fill="#475569">
          1 shared pair • 3 lone pairs on each F atom
        </text>
        {labelOctet('Each F atom completes stable octet (2,8)')}
      </g>
    );
  }

  // 4. O2: 2 shared pairs, 2 lone pairs on each O
  if (n === 'o2') {
    return (
      <g>
        <circle cx="98" cy="70" r="34" fill="#dbeafe" fillOpacity="0.35" stroke="#93c5fd" strokeWidth="1.2" strokeDasharray="3 2" />
        <circle cx="152" cy="70" r="34" fill="#dbeafe" fillOpacity="0.35" stroke="#93c5fd" strokeWidth="1.2" strokeDasharray="3 2" />

        <text x="88" y="75" textAnchor="middle" fontSize="16" fontWeight="700" fill="#0f172a">O</text>
        {/* Left O lone pairs (4 dots) */}
        <Dot x={80} y={50} /><Dot x={92} y={50} />
        <Dot x={80} y={90} /><Dot x={92} y={90} />

        {/* 2 shared pairs in middle */}
        <Dot x={119} y={65} /><Cross x={129} y={65} />
        <Dot x={119} y={75} /><Cross x={129} y={75} />

        <text x="162" y="75" textAnchor="middle" fontSize="16" fontWeight="700" fill="#0f172a">O</text>
        {/* Right O lone pairs (4 crosses) */}
        <Cross x={158} y={50} /><Cross x={170} y={50} />
        <Cross x={158} y={90} /><Cross x={170} y={90} />

        <text x="125" y="118" textAnchor="middle" fontSize="9" fontWeight="700" fill="#475569">
          2 shared electron pairs (Double covalent bond: O = O)
        </text>
        {labelOctet('Each Oxygen atom completes stable octet (2,8)')}
      </g>
    );
  }

  // 5. N2: 3 shared pairs, 1 lone pair on each N
  if (n === 'n2') {
    return (
      <g>
        <circle cx="98" cy="70" r="34" fill="#dbeafe" fillOpacity="0.35" stroke="#93c5fd" strokeWidth="1.2" strokeDasharray="3 2" />
        <circle cx="152" cy="70" r="34" fill="#dbeafe" fillOpacity="0.35" stroke="#93c5fd" strokeWidth="1.2" strokeDasharray="3 2" />

        <text x="88" y="75" textAnchor="middle" fontSize="16" fontWeight="700" fill="#0f172a">N</text>
        {/* Left N lone pair (2 dots) */}
        <Dot x={68} y={65} /><Dot x={68} y={75} />

        {/* 3 shared pairs in middle */}
        <Dot x={118} y={60} /><Cross x={129} y={60} />
        <Dot x={118} y={70} /><Cross x={129} y={70} />
        <Dot x={118} y={80} /><Cross x={129} y={80} />

        <text x="162" y="75" textAnchor="middle" fontSize="16" fontWeight="700" fill="#0f172a">N</text>
        {/* Right N lone pair (2 crosses) */}
        <Cross x={182} y={65} /><Cross x={182} y={75} />

        <text x="125" y="118" textAnchor="middle" fontSize="9" fontWeight="700" fill="#475569">
          3 shared electron pairs (Triple covalent bond: N ≡ N)
        </text>
        {labelOctet('Each Nitrogen atom completes stable octet (2,8)')}
      </g>
    );
  }

  // 6. HCl: 1 shared pair, 3 lone pairs on Cl
  if (n === 'hcl') {
    return (
      <g>
        <circle cx="98" cy="70" r="28" fill="#dbeafe" fillOpacity="0.35" stroke="#93c5fd" strokeWidth="1.2" strokeDasharray="3 2" />
        <circle cx="150" cy="70" r="34" fill="#dbeafe" fillOpacity="0.35" stroke="#93c5fd" strokeWidth="1.2" strokeDasharray="3 2" />

        <text x="90" y="75" textAnchor="middle" fontSize="16" fontWeight="700" fill="#0f172a">H</text>

        {/* Shared pair */}
        <Dot x={118} y={70} />
        <Cross x={126} y={70} />

        <text x="160" y="75" textAnchor="middle" fontSize="16" fontWeight="700" fill="#0f172a">Cl</text>
        <Cross x={154} y={50} /><Cross x={166} y={50} />
        <Cross x={180} y={65} /><Cross x={180} y={75} />
        <Cross x={154} y={90} /><Cross x={166} y={90} />

        <text x="125" y="118" textAnchor="middle" fontSize="9" fontWeight="700" fill="#475569">
          1 shared pair (H–Cl) • 3 lone pairs on Cl
        </text>
        {labelOctet('H attains duplet (2) • Cl attains octet (2,8,8)')}
      </g>
    );
  }

  // 7. H2O: 2 shared pairs, 2 lone pairs on O
  if (n === 'h2o') {
    return (
      <g>
        <circle cx="130" cy="62" r="32" fill="#dbeafe" fillOpacity="0.35" stroke="#93c5fd" strokeWidth="1.2" strokeDasharray="3 2" />
        <circle cx="85" cy="94" r="24" fill="#dbeafe" fillOpacity="0.35" stroke="#93c5fd" strokeWidth="1.2" strokeDasharray="3 2" />
        <circle cx="175" cy="94" r="24" fill="#dbeafe" fillOpacity="0.35" stroke="#93c5fd" strokeWidth="1.2" strokeDasharray="3 2" />

        {/* Central Oxygen */}
        <text x="130" y="66" textAnchor="middle" fontSize="16" fontWeight="700" fill="#0f172a">O</text>
        {/* 2 lone pairs on O (top and right) */}
        <Dot x={124} y={42} /><Dot x={136} y={42} />
        <Dot x={148} y={58} /><Dot x={148} y={68} />

        {/* Left H and shared pair */}
        <text x="76" y="99" textAnchor="middle" fontSize="15" fontWeight="700" fill="#0f172a">H</text>
        <Cross x={96} y={87} />
        <Dot x={108} y={79} />

        {/* Right H and shared pair */}
        <text x="184" y="99" textAnchor="middle" fontSize="15" fontWeight="700" fill="#0f172a">H</text>
        <Cross x={164} y={87} />
        <Dot x={152} y={79} />

        <text x="130" y="124" textAnchor="middle" fontSize="9" fontWeight="700" fill="#475569">
          2 shared pairs (2 Covalent bonds) • 2 lone pairs on O
        </text>
        {labelOctet('O completes octet (2,8) • Each H attains duplet (2)')}
      </g>
    );
  }

  // 8. NH3: 3 shared pairs, 1 lone pair on N
  if (n === 'nh3') {
    return (
      <g>
        <circle cx="130" cy="62" r="32" fill="#dbeafe" fillOpacity="0.35" stroke="#93c5fd" strokeWidth="1.2" strokeDasharray="3 2" />
        <circle cx="82" cy="62" r="22" fill="#dbeafe" fillOpacity="0.35" stroke="#93c5fd" strokeWidth="1.2" strokeDasharray="3 2" />
        <circle cx="178" cy="62" r="22" fill="#dbeafe" fillOpacity="0.35" stroke="#93c5fd" strokeWidth="1.2" strokeDasharray="3 2" />
        <circle cx="130" cy="106" r="22" fill="#dbeafe" fillOpacity="0.35" stroke="#93c5fd" strokeWidth="1.2" strokeDasharray="3 2" />

        <text x="130" y="67" textAnchor="middle" fontSize="16" fontWeight="700" fill="#0f172a">N</text>
        {/* Lone pair on top of N */}
        <Dot x={125} y={44} /><Dot x={135} y={44} />

        {/* Left H */}
        <text x="74" y="67" textAnchor="middle" fontSize="15" fontWeight="700" fill="#0f172a">H</text>
        <Cross x={94} y={63} /><Dot x={104} y={63} />

        {/* Right H */}
        <text x="186" y="67" textAnchor="middle" fontSize="15" fontWeight="700" fill="#0f172a">H</text>
        <Dot x={156} y={63} /><Cross x={166} y={63} />

        {/* Bottom H */}
        <text x="130" y="116" textAnchor="middle" fontSize="15" fontWeight="700" fill="#0f172a">H</text>
        <Dot x={130} y={84} /><Cross x={130} y={94} />

        <text x="130" y="132" textAnchor="middle" fontSize="9" fontWeight="700" fill="#475569">
          3 shared pairs (3 Covalent bonds) • 1 lone pair on N
        </text>
        {labelOctet('N completes octet (2,8) • Each H attains duplet (2)')}
      </g>
    );
  }

  // 9. CH4: 4 shared pairs
  if (n === 'ch4') {
    return (
      <g>
        <circle cx="130" cy="68" r="34" fill="#dbeafe" fillOpacity="0.35" stroke="#93c5fd" strokeWidth="1.2" strokeDasharray="3 2" />

        <text x="130" y="73" textAnchor="middle" fontSize="16" fontWeight="700" fill="#0f172a">C</text>

        {/* Top H */}
        <text x="130" y="28" textAnchor="middle" fontSize="14" fontWeight="700" fill="#0f172a">H</text>
        <Cross x={130} y={39} /><Dot x={130} y={49} />

        {/* Bottom H */}
        <Dot x={130} y={87} /><Cross x={130} y={97} />
        <text x="130" y="113" textAnchor="middle" fontSize="14" fontWeight="700" fill="#0f172a">H</text>

        {/* Left H */}
        <text x="82" y="73" textAnchor="middle" fontSize="14" fontWeight="700" fill="#0f172a">H</text>
        <Cross x={97} y={68} /><Dot x={107} y={68} />

        {/* Right H */}
        <Dot x={153} y={68} /><Cross x={163} y={68} />
        <text x="178" y="73" textAnchor="middle" fontSize="14" fontWeight="700" fill="#0f172a">H</text>

        <text x="130" y="128" textAnchor="middle" fontSize="9" fontWeight="700" fill="#475569">
          4 shared electron pairs (4 single C–H bonds)
        </text>
        {labelOctet('Carbon completes octet (2,8) • All 4 H attain duplet (2)')}
      </g>
    );
  }

  // 10. CO2: 2 double bonds, 2 lone pairs on each O
  if (n === 'co2') {
    return (
      <g>
        <circle cx="70" cy="70" r="30" fill="#dbeafe" fillOpacity="0.35" stroke="#93c5fd" strokeWidth="1.2" strokeDasharray="3 2" />
        <circle cx="130" cy="70" r="30" fill="#dbeafe" fillOpacity="0.35" stroke="#93c5fd" strokeWidth="1.2" strokeDasharray="3 2" />
        <circle cx="190" cy="70" r="30" fill="#dbeafe" fillOpacity="0.35" stroke="#93c5fd" strokeWidth="1.2" strokeDasharray="3 2" />

        {/* Left O */}
        <text x="60" y="75" textAnchor="middle" fontSize="16" fontWeight="700" fill="#0f172a">O</text>
        <Cross x={46} y={65} /><Cross x={46} y={75} />
        <Cross x={56} y={50} /><Cross x={64} y={50} />

        {/* Left double bond (2 shared pairs) */}
        <Cross x={90} y={65} /><Dot x={102} y={65} />
        <Cross x={90} y={75} /><Dot x={102} y={75} />

        {/* Central C */}
        <text x="130" y="75" textAnchor="middle" fontSize="16" fontWeight="700" fill="#0f172a">C</text>

        {/* Right double bond (2 shared pairs) */}
        <Dot x={158} y={65} /><Cross x={170} y={65} />
        <Dot x={158} y={75} /><Cross x={170} y={75} />

        {/* Right O */}
        <text x="200" y="75" textAnchor="middle" fontSize="16" fontWeight="700" fill="#0f172a">O</text>
        <Cross x={214} y={65} /><Cross x={214} y={75} />
        <Cross x={196} y={50} /><Cross x={204} y={50} />

        <text x="130" y="118" textAnchor="middle" fontSize="9" fontWeight="700" fill="#475569">
          2 double covalent bonds: O = C = O • 2 lone pairs on each O
        </text>
        {labelOctet('All atoms (C, both O) achieve complete octet (2,8)')}
      </g>
    );
  }

  // 11. CCl4: 4 single bonds, 3 lone pairs on each Cl
  if (n === 'ccl4') {
    return (
      <g>
        <text x="130" y="73" textAnchor="middle" fontSize="16" fontWeight="700" fill="#0f172a">C</text>

        {/* Top Cl */}
        <text x="130" y="28" textAnchor="middle" fontSize="13" fontWeight="700" fill="#0f172a">Cl</text>
        <Cross x={124} y={15} /><Cross x={136} y={15} />
        <Cross x={114} y={24} /><Cross x={146} y={24} />
        <Cross x={130} y={39} /><Dot x={130} y={49} />

        {/* Bottom Cl */}
        <Dot x={130} y={87} /><Cross x={130} y={97} />
        <text x="130" y="113" textAnchor="middle" fontSize="13" fontWeight="700" fill="#0f172a">Cl</text>
        <Cross x={114} y={110} /><Cross x={146} y={110} />
        <Cross x={124} y={122} /><Cross x={136} y={122} />

        {/* Left Cl */}
        <Cross x={66} y={63} /><Cross x={66} y={73} />
        <Cross x={76} y={53} /><Cross x={76} y={83} />
        <text x="80" y="73" textAnchor="middle" fontSize="13" fontWeight="700" fill="#0f172a">Cl</text>
        <Cross x={97} y={68} /><Dot x={107} y={68} />

        {/* Right Cl */}
        <Dot x={153} y={68} /><Cross x={163} y={68} />
        <text x="180" y="73" textAnchor="middle" fontSize="13" fontWeight="700" fill="#0f172a">Cl</text>
        <Cross x={184} y={53} /><Cross x={184} y={83} />
        <Cross x={194} y={63} /><Cross x={194} y={73} />

        <text x="130" y="136" textAnchor="middle" fontSize="8.5" fontWeight="700" fill="#475569">
          4 shared pairs (4 C–Cl bonds) • 3 lone pairs on each Cl
        </text>
        {labelOctet('C and all 4 Cl atoms complete full octet')}
      </g>
    );
  }

  // 12. C2H6: 7 single bonds
  if (n === 'c2h6') {
    return (
      <g>
        {/* Left C */}
        <text x="108" y="73" textAnchor="middle" fontSize="15" fontWeight="700" fill="#0f172a">C</text>
        {/* Right C */}
        <text x="152" y="73" textAnchor="middle" fontSize="15" fontWeight="700" fill="#0f172a">C</text>

        {/* C-C shared pair in center */}
        <Dot x={126} y={69} /><Dot x={134} y={69} />

        {/* Left C hydrogens */}
        <text x="70" y="73" textAnchor="middle" fontSize="13" fontWeight="700" fill="#0f172a">H</text>
        <Cross x={84} y={69} /><Dot x={94} y={69} />

        <text x="108" y="32" textAnchor="middle" fontSize="13" fontWeight="700" fill="#0f172a">H</text>
        <Cross x={108} y={43} /><Dot x={108} y={53} />

        <text x="108" y="112" textAnchor="middle" fontSize="13" fontWeight="700" fill="#0f172a">H</text>
        <Dot x={108} y={85} /><Cross x={108} y={95} />

        {/* Right C hydrogens */}
        <text x="190" y="73" textAnchor="middle" fontSize="13" fontWeight="700" fill="#0f172a">H</text>
        <Dot x={166} y={69} /><Cross x={176} y={69} />

        <text x="152" y="32" textAnchor="middle" fontSize="13" fontWeight="700" fill="#0f172a">H</text>
        <Cross x={152} y={43} /><Dot x={152} y={53} />

        <text x="152" y="112" textAnchor="middle" fontSize="13" fontWeight="700" fill="#0f172a">H</text>
        <Dot x={152} y={85} /><Cross x={152} y={95} />

        <text x="130" y="128" textAnchor="middle" fontSize="8.5" fontWeight="700" fill="#475569">
          7 shared pairs (1 C–C bond + 6 C–H bonds)
        </text>
        {labelOctet('Both Carbons complete octet • All 6 Hydrogens attain duplet')}
      </g>
    );
  }

  // 13. C2H4: C=C double bond + 4 C-H single bonds
  if (n === 'c2h4') {
    return (
      <g>
        <text x="108" y="73" textAnchor="middle" fontSize="16" fontWeight="700" fill="#0f172a">C</text>
        <text x="152" y="73" textAnchor="middle" fontSize="16" fontWeight="700" fill="#0f172a">C</text>

        {/* C=C 2 shared pairs */}
        <Dot x={126} y={64} /><Dot x={134} y={64} />
        <Dot x={126} y={74} /><Dot x={134} y={74} />

        {/* Top-left H */}
        <text x="68" y="38" textAnchor="middle" fontSize="14" fontWeight="700" fill="#0f172a">H</text>
        <Cross x={82} y={48} /><Dot x={92} y={56} />

        {/* Bottom-left H */}
        <text x="68" y="104" textAnchor="middle" fontSize="14" fontWeight="700" fill="#0f172a">H</text>
        <Cross x={82} y={94} /><Dot x={92} y={86} />

        {/* Top-right H */}
        <text x="192" y="38" textAnchor="middle" fontSize="14" fontWeight="700" fill="#0f172a">H</text>
        <Cross x={178} y={48} /><Dot x={168} y={56} />

        {/* Bottom-right H */}
        <text x="192" y="104" textAnchor="middle" fontSize="14" fontWeight="700" fill="#0f172a">H</text>
        <Cross x={178} y={94} /><Dot x={168} y={86} />

        <text x="130" y="128" textAnchor="middle" fontSize="8.5" fontWeight="700" fill="#475569">
          One C=C double bond (4 shared e⁻) + 4 C–H bonds
        </text>
        {labelOctet('Both Carbon atoms complete octet • Hydrogens attain duplet')}
      </g>
    );
  }

  // 14. C2H2: C≡C triple bond + 2 C-H single bonds
  if (n === 'c2h2') {
    return (
      <g>
        {/* Left H */}
        <text x="50" y="74" textAnchor="middle" fontSize="16" fontWeight="700" fill="#0f172a">H</text>
        <Cross x={68} y={70} /><Dot x={78} y={70} />

        {/* Left C */}
        <text x="96" y="74" textAnchor="middle" fontSize="16" fontWeight="700" fill="#0f172a">C</text>

        {/* C≡C 3 shared pairs (6 electrons) */}
        <Dot x={118} y={60} /><Dot x={128} y={60} />
        <Dot x={118} y={70} /><Dot x={128} y={70} />
        <Dot x={118} y={80} /><Dot x={128} y={80} />

        {/* Right C */}
        <text x="150" y="74" textAnchor="middle" fontSize="16" fontWeight="700" fill="#0f172a">C</text>

        <Dot x={168} y={70} /><Cross x={178} y={70} />
        {/* Right H */}
        <text x="196" y="74" textAnchor="middle" fontSize="16" fontWeight="700" fill="#0f172a">H</text>

        <text x="125" y="118" textAnchor="middle" fontSize="9" fontWeight="700" fill="#475569">
          One C≡C triple bond (6 shared e⁻) + 2 C–H single bonds
        </text>
        {labelOctet('Both Carbons complete octet (2,8) • Hydrogens attain duplet')}
      </g>
    );
  }

  return null;
}

export function renderCovalentDash(name = 'h2') {
  const n = name.toLowerCase().replace(/^covalent_/, '').replace(/_dash$/, '');

  const strokeColor = '#0f172a';
  const strokeW = '2.2';

  // 1. H2: H – H
  if (n === 'h2') {
    return (
      <g>
        <text x="90" y="76" textAnchor="middle" fontSize="18" fontWeight="700" fill="#0f172a">H</text>
        <line x1="106" y1="70" x2="144" y2="70" stroke={strokeColor} strokeWidth={strokeW} strokeLinecap="round" />
        <text x="160" y="76" textAnchor="middle" fontSize="18" fontWeight="700" fill="#0f172a">H</text>
        <text x="125" y="115" textAnchor="middle" fontSize="10" fontWeight="700" fill="#475569">Single covalent bond (H – H)</text>
      </g>
    );
  }

  // 2. Cl2: Cl – Cl
  if (n === 'cl2') {
    return (
      <g>
        <text x="86" y="76" textAnchor="middle" fontSize="18" fontWeight="700" fill="#0f172a">Cl</text>
        <line x1="104" y1="70" x2="142" y2="70" stroke={strokeColor} strokeWidth={strokeW} strokeLinecap="round" />
        <text x="162" y="76" textAnchor="middle" fontSize="18" fontWeight="700" fill="#0f172a">Cl</text>
        <text x="125" y="115" textAnchor="middle" fontSize="10" fontWeight="700" fill="#475569">Single covalent bond (Cl – Cl)</text>
      </g>
    );
  }

  // 3. F2: F – F
  if (n === 'f2') {
    return (
      <g>
        <text x="88" y="76" textAnchor="middle" fontSize="18" fontWeight="700" fill="#0f172a">F</text>
        <line x1="104" y1="70" x2="142" y2="70" stroke={strokeColor} strokeWidth={strokeW} strokeLinecap="round" />
        <text x="160" y="76" textAnchor="middle" fontSize="18" fontWeight="700" fill="#0f172a">F</text>
        <text x="125" y="115" textAnchor="middle" fontSize="10" fontWeight="700" fill="#475569">Single covalent bond (F – F)</text>
      </g>
    );
  }

  // 4. O2: O = O
  if (n === 'o2') {
    return (
      <g>
        <text x="88" y="76" textAnchor="middle" fontSize="18" fontWeight="700" fill="#0f172a">O</text>
        <line x1="106" y1="66" x2="142" y2="66" stroke={strokeColor} strokeWidth={strokeW} strokeLinecap="round" />
        <line x1="106" y1="74" x2="142" y2="74" stroke={strokeColor} strokeWidth={strokeW} strokeLinecap="round" />
        <text x="160" y="76" textAnchor="middle" fontSize="18" fontWeight="700" fill="#0f172a">O</text>
        <text x="125" y="115" textAnchor="middle" fontSize="10" fontWeight="700" fill="#475569">Double covalent bond (O = O)</text>
      </g>
    );
  }

  // 5. N2: N ≡ N
  if (n === 'n2') {
    return (
      <g>
        <text x="88" y="76" textAnchor="middle" fontSize="18" fontWeight="700" fill="#0f172a">N</text>
        <line x1="106" y1="63" x2="142" y2="63" stroke={strokeColor} strokeWidth={strokeW} strokeLinecap="round" />
        <line x1="106" y1="70" x2="142" y2="70" stroke={strokeColor} strokeWidth={strokeW} strokeLinecap="round" />
        <line x1="106" y1="77" x2="142" y2="77" stroke={strokeColor} strokeWidth={strokeW} strokeLinecap="round" />
        <text x="160" y="76" textAnchor="middle" fontSize="18" fontWeight="700" fill="#0f172a">N</text>
        <text x="125" y="115" textAnchor="middle" fontSize="10" fontWeight="700" fill="#475569">Triple covalent bond (N ≡ N)</text>
      </g>
    );
  }

  // 6. HCl: H – Cl
  if (n === 'hcl') {
    return (
      <g>
        <text x="88" y="76" textAnchor="middle" fontSize="18" fontWeight="700" fill="#0f172a">H</text>
        <line x1="104" y1="70" x2="142" y2="70" stroke={strokeColor} strokeWidth={strokeW} strokeLinecap="round" />
        <text x="162" y="76" textAnchor="middle" fontSize="18" fontWeight="700" fill="#0f172a">Cl</text>
        <text x="125" y="115" textAnchor="middle" fontSize="10" fontWeight="700" fill="#475569">Single covalent bond (H – Cl)</text>
      </g>
    );
  }

  // 7. H2O: Bent shape (H – O – H)
  if (n === 'h2o') {
    return (
      <g>
        <text x="130" y="52" textAnchor="middle" fontSize="18" fontWeight="700" fill="#0f172a">O</text>
        {/* Left bent bond to H */}
        <line x1="118" y1="58" x2="94" y2="82" stroke={strokeColor} strokeWidth={strokeW} strokeLinecap="round" />
        <text x="82" y="98" textAnchor="middle" fontSize="18" fontWeight="700" fill="#0f172a">H</text>

        {/* Right bent bond to H */}
        <line x1="142" y1="58" x2="166" y2="82" stroke={strokeColor} strokeWidth={strokeW} strokeLinecap="round" />
        <text x="178" y="98" textAnchor="middle" fontSize="18" fontWeight="700" fill="#0f172a">H</text>

        <text x="130" y="126" textAnchor="middle" fontSize="10" fontWeight="700" fill="#475569">
          Bent arrangement • Angle ~104.5°
        </text>
      </g>
    );
  }

  // 8. NH3: N in the centre, 3 bonds
  if (n === 'nh3') {
    return (
      <g>
        <text x="130" y="65" textAnchor="middle" fontSize="18" fontWeight="700" fill="#0f172a">N</text>
        {/* Left bond */}
        <line x1="116" y1="60" x2="88" y2="60" stroke={strokeColor} strokeWidth={strokeW} strokeLinecap="round" />
        <text x="74" y="66" textAnchor="middle" fontSize="17" fontWeight="700" fill="#0f172a">H</text>

        {/* Right bond */}
        <line x1="144" y1="60" x2="172" y2="60" stroke={strokeColor} strokeWidth={strokeW} strokeLinecap="round" />
        <text x="186" y="66" textAnchor="middle" fontSize="17" fontWeight="700" fill="#0f172a">H</text>

        {/* Bottom bond */}
        <line x1="130" y1="73" x2="130" y2="98" stroke={strokeColor} strokeWidth={strokeW} strokeLinecap="round" />
        <text x="130" y="116" textAnchor="middle" fontSize="17" fontWeight="700" fill="#0f172a">H</text>

        <text x="130" y="136" textAnchor="middle" fontSize="9.5" fontWeight="700" fill="#475569">
          Pyramidal arrangement (N in the centre)
        </text>
      </g>
    );
  }

  // 9. CH4: C in the centre, 4 bonds (up, down, left, right)
  if (n === 'ch4') {
    return (
      <g>
        <text x="130" y="74" textAnchor="middle" fontSize="18" fontWeight="700" fill="#0f172a">C</text>

        {/* Top */}
        <line x1="130" y1="54" x2="130" y2="34" stroke={strokeColor} strokeWidth={strokeW} strokeLinecap="round" />
        <text x="130" y="26" textAnchor="middle" fontSize="16" fontWeight="700" fill="#0f172a">H</text>

        {/* Bottom */}
        <line x1="130" y1="82" x2="130" y2="102" stroke={strokeColor} strokeWidth={strokeW} strokeLinecap="round" />
        <text x="130" y="120" textAnchor="middle" fontSize="16" fontWeight="700" fill="#0f172a">H</text>

        {/* Left */}
        <line x1="116" y1="68" x2="94" y2="68" stroke={strokeColor} strokeWidth={strokeW} strokeLinecap="round" />
        <text x="80" y="74" textAnchor="middle" fontSize="16" fontWeight="700" fill="#0f172a">H</text>

        {/* Right */}
        <line x1="144" y1="68" x2="166" y2="68" stroke={strokeColor} strokeWidth={strokeW} strokeLinecap="round" />
        <text x="180" y="74" textAnchor="middle" fontSize="16" fontWeight="700" fill="#0f172a">H</text>

        <text x="130" y="142" textAnchor="middle" fontSize="9.5" fontWeight="700" fill="#475569">
          Tetrahedral arrangement (C in the centre)
        </text>
      </g>
    );
  }

  // 10. CO2: Linear O = C = O
  if (n === 'co2') {
    return (
      <g>
        <text x="70" y="76" textAnchor="middle" fontSize="18" fontWeight="700" fill="#0f172a">O</text>

        {/* Double bond left */}
        <line x1="88" y1="66" x2="114" y2="66" stroke={strokeColor} strokeWidth={strokeW} strokeLinecap="round" />
        <line x1="88" y1="74" x2="114" y2="74" stroke={strokeColor} strokeWidth={strokeW} strokeLinecap="round" />

        <text x="130" y="76" textAnchor="middle" fontSize="18" fontWeight="700" fill="#0f172a">C</text>

        {/* Double bond right */}
        <line x1="146" y1="66" x2="172" y2="66" stroke={strokeColor} strokeWidth={strokeW} strokeLinecap="round" />
        <line x1="146" y1="74" x2="172" y2="74" stroke={strokeColor} strokeWidth={strokeW} strokeLinecap="round" />

        <text x="190" y="76" textAnchor="middle" fontSize="18" fontWeight="700" fill="#0f172a">O</text>

        <text x="130" y="118" textAnchor="middle" fontSize="10" fontWeight="700" fill="#475569">
          Linear arrangement (180° bond angle)
        </text>
      </g>
    );
  }

  // 11. CCl4: C in the centre, 4 bonds to Cl
  if (n === 'ccl4') {
    return (
      <g>
        <text x="130" y="74" textAnchor="middle" fontSize="18" fontWeight="700" fill="#0f172a">C</text>

        {/* Top */}
        <line x1="130" y1="54" x2="130" y2="34" stroke={strokeColor} strokeWidth={strokeW} strokeLinecap="round" />
        <text x="130" y="26" textAnchor="middle" fontSize="15" fontWeight="700" fill="#0f172a">Cl</text>

        {/* Bottom */}
        <line x1="130" y1="82" x2="130" y2="102" stroke={strokeColor} strokeWidth={strokeW} strokeLinecap="round" />
        <text x="130" y="120" textAnchor="middle" fontSize="15" fontWeight="700" fill="#0f172a">Cl</text>

        {/* Left */}
        <line x1="116" y1="68" x2="94" y2="68" stroke={strokeColor} strokeWidth={strokeW} strokeLinecap="round" />
        <text x="78" y="74" textAnchor="middle" fontSize="15" fontWeight="700" fill="#0f172a">Cl</text>

        {/* Right */}
        <line x1="144" y1="68" x2="166" y2="68" stroke={strokeColor} strokeWidth={strokeW} strokeLinecap="round" />
        <text x="182" y="74" textAnchor="middle" fontSize="15" fontWeight="700" fill="#0f172a">Cl</text>

        <text x="130" y="142" textAnchor="middle" fontSize="9.5" fontWeight="700" fill="#475569">
          Tetrahedral shape (C in the centre)
        </text>
      </g>
    );
  }

  // 12. C2H6: Ethane H3C – CH3
  if (n === 'c2h6') {
    return (
      <g>
        {/* Carbons */}
        <text x="108" y="74" textAnchor="middle" fontSize="17" fontWeight="700" fill="#0f172a">C</text>
        <line x1="120" y1="68" x2="140" y2="68" stroke={strokeColor} strokeWidth={strokeW} strokeLinecap="round" />
        <text x="152" y="74" textAnchor="middle" fontSize="17" fontWeight="700" fill="#0f172a">C</text>

        {/* Left C Hydrogens */}
        <line x1="94" y1="68" x2="74" y2="68" stroke={strokeColor} strokeWidth={strokeW} strokeLinecap="round" />
        <text x="62" y="74" textAnchor="middle" fontSize="15" fontWeight="700" fill="#0f172a">H</text>

        <line x1="108" y1="54" x2="108" y2="34" stroke={strokeColor} strokeWidth={strokeW} strokeLinecap="round" />
        <text x="108" y="26" textAnchor="middle" fontSize="15" fontWeight="700" fill="#0f172a">H</text>

        <line x1="108" y1="82" x2="108" y2="102" stroke={strokeColor} strokeWidth={strokeW} strokeLinecap="round" />
        <text x="108" y="118" textAnchor="middle" fontSize="15" fontWeight="700" fill="#0f172a">H</text>

        {/* Right C Hydrogens */}
        <line x1="166" y1="68" x2="186" y2="68" stroke={strokeColor} strokeWidth={strokeW} strokeLinecap="round" />
        <text x="198" y="74" textAnchor="middle" fontSize="15" fontWeight="700" fill="#0f172a">H</text>

        <line x1="152" y1="54" x2="152" y2="34" stroke={strokeColor} strokeWidth={strokeW} strokeLinecap="round" />
        <text x="152" y="26" textAnchor="middle" fontSize="15" fontWeight="700" fill="#0f172a">H</text>

        <line x1="152" y1="82" x2="152" y2="102" stroke={strokeColor} strokeWidth={strokeW} strokeLinecap="round" />
        <text x="152" y="118" textAnchor="middle" fontSize="15" fontWeight="700" fill="#0f172a">H</text>

        <text x="130" y="142" textAnchor="middle" fontSize="9.5" fontWeight="700" fill="#475569">
          Ethane (7 single covalent bonds)
        </text>
      </g>
    );
  }

  // 13. C2H4: Ethene C = C with 4 C-H
  if (n === 'c2h4') {
    return (
      <g>
        <text x="110" y="74" textAnchor="middle" fontSize="18" fontWeight="700" fill="#0f172a">C</text>
        <line x1="124" y1="65" x2="142" y2="65" stroke={strokeColor} strokeWidth={strokeW} strokeLinecap="round" />
        <line x1="124" y1="73" x2="142" y2="73" stroke={strokeColor} strokeWidth={strokeW} strokeLinecap="round" />
        <text x="156" y="74" textAnchor="middle" fontSize="18" fontWeight="700" fill="#0f172a">C</text>

        {/* Left H bonds */}
        <line x1="98" y1="62" x2="76" y2="44" stroke={strokeColor} strokeWidth={strokeW} strokeLinecap="round" />
        <text x="66" y="40" textAnchor="middle" fontSize="16" fontWeight="700" fill="#0f172a">H</text>

        <line x1="98" y1="76" x2="76" y2="94" stroke={strokeColor} strokeWidth={strokeW} strokeLinecap="round" />
        <text x="66" y="106" textAnchor="middle" fontSize="16" fontWeight="700" fill="#0f172a">H</text>

        {/* Right H bonds */}
        <line x1="168" y1="62" x2="190" y2="44" stroke={strokeColor} strokeWidth={strokeW} strokeLinecap="round" />
        <text x="200" y="40" textAnchor="middle" fontSize="16" fontWeight="700" fill="#0f172a">H</text>

        <line x1="168" y1="76" x2="190" y2="94" stroke={strokeColor} strokeWidth={strokeW} strokeLinecap="round" />
        <text x="200" y="106" textAnchor="middle" fontSize="16" fontWeight="700" fill="#0f172a">H</text>

        <text x="130" y="132" textAnchor="middle" fontSize="9.5" fontWeight="700" fill="#475569">
          Ethene (One C=C double bond + 4 C–H bonds)
        </text>
      </g>
    );
  }

  // 14. C2H2: Ethyne H – C ≡ C – H
  if (n === 'c2h2') {
    return (
      <g>
        <text x="56" y="75" textAnchor="middle" fontSize="17" fontWeight="700" fill="#0f172a">H</text>
        <line x1="68" y1="70" x2="92" y2="70" stroke={strokeColor} strokeWidth={strokeW} strokeLinecap="round" />

        <text x="104" y="75" textAnchor="middle" fontSize="17" fontWeight="700" fill="#0f172a">C</text>

        {/* Triple bond */}
        <line x1="116" y1="63" x2="144" y2="63" stroke={strokeColor} strokeWidth={strokeW} strokeLinecap="round" />
        <line x1="116" y1="70" x2="144" y2="70" stroke={strokeColor} strokeWidth={strokeW} strokeLinecap="round" />
        <line x1="116" y1="77" x2="144" y2="77" stroke={strokeColor} strokeWidth={strokeW} strokeLinecap="round" />

        <text x="156" y="75" textAnchor="middle" fontSize="17" fontWeight="700" fill="#0f172a">C</text>
        <line x1="168" y1="70" x2="192" y2="70" stroke={strokeColor} strokeWidth={strokeW} strokeLinecap="round" />
        <text x="204" y="75" textAnchor="middle" fontSize="17" fontWeight="700" fill="#0f172a">H</text>

        <text x="130" y="118" textAnchor="middle" fontSize="10" fontWeight="700" fill="#475569">
          Ethyne (Linear H – C ≡ C – H)
        </text>
      </g>
    );
  }

  return null;
}

// =========================================================================
// PART 3: ELECTROLYSIS DIAGRAMS
// =========================================================================

export function renderElectrolysis(variant = 'water', overrides = {}) {
  const v = variant.toLowerCase();

  // Baseline data per type
  let config = {
    cathode: 'Cathode (−)',
    anode: 'Anode (+)',
    cathode_mat: 'Platinum',
    anode_mat: 'Platinum',
    electrolyte: 'Acidulated water',
    cathode_rxn: '2H⁺ + 2e⁻ → H₂↑',
    anode_rxn: '4OH⁻ − 4e⁻ → 2H₂O + O₂↑',
    cation_ion: 'H⁺',
    anion_ion: 'OH⁻',
    note: 'H₂ : O₂ = 2 : 1',
    isWater: false,
    isSpoon: false,
    isRefining: false,
  };

  if (v === 'water' || v === 'electrolysis_water') {
    config = {
      cathode_mat: 'Pt electrode',
      anode_mat: 'Pt electrode',
      electrolyte: 'Acidulated water (water + dil. H₂SO₄)',
      cathode_rxn: '2H⁺ + 2e⁻ → H₂↑',
      anode_rxn: '4OH⁻ − 4e⁻ → 2H₂O + O₂↑',
      cation_ion: 'H⁺',
      anion_ion: 'OH⁻',
      note: 'Volume collected: H₂ : O₂ = 2 : 1',
      isWater: true,
      isSpoon: false,
      isRefining: false,
    };
  } else if (v === 'cuso4_cu' || v === 'electrolysis_cuso4_cu') {
    config = {
      cathode_mat: 'Copper plate (Cu)',
      anode_mat: 'Copper plate (Cu)',
      electrolyte: 'CuSO₄ solution',
      cathode_rxn: 'Cu²⁺ + 2e⁻ → Cu (mass ↑)',
      anode_rxn: 'Cu − 2e⁻ → Cu²⁺ (mass ↓)',
      cation_ion: 'Cu²⁺',
      anion_ion: 'SO₄²⁻',
      note: 'Concentration of CuSO₄ remains unchanged',
      isWater: false,
      isSpoon: false,
      isRefining: false,
    };
  } else if (v === 'plating_silver') {
    config = {
      cathode_mat: 'Copper/brass spoon',
      anode_mat: 'Pure silver plate (Ag)',
      electrolyte: 'Sodium argentocyanide Na[Ag(CN)₂]',
      cathode_rxn: 'Ag⁺ + e⁻ → Ag',
      anode_rxn: 'Ag − e⁻ → Ag⁺',
      cation_ion: 'Ag⁺',
      anion_ion: 'CN⁻',
      note: 'Electroplating: Silver deposits on spoon',
      isWater: false,
      isSpoon: true,
      isRefining: false,
    };
  } else if (v === 'plating_gold') {
    config = {
      cathode_mat: 'Article (brass/silver)',
      anode_mat: 'Pure gold plate (Au)',
      electrolyte: 'Potassium aurocyanide K[Au(CN)₂]',
      cathode_rxn: 'Au⁺ + e⁻ → Au',
      anode_rxn: 'Au − e⁻ → Au⁺',
      cation_ion: 'Au⁺',
      anion_ion: 'CN⁻',
      note: 'Electroplating: Gold coats cathode',
      isWater: false,
      isSpoon: true,
      isRefining: false,
    };
  } else if (v === 'plating_nickel') {
    config = {
      cathode_mat: 'Brass spoon',
      anode_mat: 'Pure nickel plate (Ni)',
      electrolyte: 'Nickel sulphate (NiSO₄) solution',
      cathode_rxn: 'Ni²⁺ + 2e⁻ → Ni',
      anode_rxn: 'Ni − 2e⁻ → Ni²⁺',
      cation_ion: 'Ni²⁺',
      anion_ion: 'SO₄²⁻',
      note: 'Electroplating: Nickel deposits on spoon',
      isWater: false,
      isSpoon: true,
      isRefining: false,
    };
  } else if (v === 'copper_refining') {
    config = {
      cathode_mat: 'Thin pure Cu plate',
      anode_mat: 'Impure copper rod',
      electrolyte: 'Acidified CuSO₄ solution',
      cathode_rxn: 'Cu²⁺ + 2e⁻ → Cu',
      anode_rxn: 'Cu − 2e⁻ → Cu²⁺',
      cation_ion: 'Cu²⁺',
      anion_ion: 'SO₄²⁻',
      note: 'Impurities settle below the anode (anode mud)',
      isWater: false,
      isSpoon: false,
      isRefining: true,
    };
  }

  // Apply user-specified overrides
  const cathodeLabel = overrides.cathode || config.cathode_mat;
  const anodeLabel = overrides.anode || config.anode_mat;
  const electrolyteLabel = overrides.electrolyte || config.electrolyte;
  const cathodeRxn = overrides.cathode_rxn || config.cathode_rxn;
  const anodeRxn = overrides.anode_rxn || config.anode_rxn;

  // Geometry:
  // Battery centered at top: Anode (+) on Left, Cathode (-) on Right
  // Battery terminal: + is Left, - is Right
  const batteryCenterX = 130;
  const batteryY = 15;
  const anodeWireX = 80;
  const cathodeWireX = 180;
  const beakerX = 52;
  const beakerY = 46;
  const beakerW = 156;
  const beakerH = 74;

  return (
    <g>
      {/* 1. DC Battery at Top */}
      <g>
        {/* Battery symbol: + long line, - short thick line */}
        <line x1={batteryCenterX - 8} y1={batteryY - 8} x2={batteryCenterX - 8} y2={batteryY + 8} stroke="#ef4444" strokeWidth="2.4" />
        <line x1={batteryCenterX - 1} y1={batteryY - 5} x2={batteryCenterX - 1} y2={batteryY + 5} stroke="#0f172a" strokeWidth="3.4" />
        <line x1={batteryCenterX + 5} y1={batteryY - 8} x2={batteryCenterX + 5} y2={batteryY + 8} stroke="#ef4444" strokeWidth="2.4" />
        <line x1={batteryCenterX + 12} y1={batteryY - 5} x2={batteryCenterX + 12} y2={batteryY + 5} stroke="#0f172a" strokeWidth="3.4" />

        {/* Battery Labels */}
        <text x={batteryCenterX - 18} y={batteryY + 4} fontSize="11" fontWeight="800" fill="#ef4444">+</text>
        <text x={batteryCenterX + 20} y={batteryY + 4} fontSize="12" fontWeight="800" fill="#0f172a">−</text>
        <text x={batteryCenterX} y={batteryY - 10} textAnchor="middle" fontSize="7.5" fontWeight="700" fill="#64748b">DC Source</text>
      </g>

      {/* 2. Wires from Battery to Electrodes */}
      {/* Wire + to Anode (+) */}
      <path
        d={`M ${batteryCenterX - 8},${batteryY} L ${anodeWireX},${batteryY} L ${anodeWireX},${beakerY + 4}`}
        fill="none"
        stroke="#ef4444"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      {/* Wire - to Cathode (-) */}
      <path
        d={`M ${batteryCenterX + 12},${batteryY} L ${cathodeWireX},${batteryY} L ${cathodeWireX},${beakerY + 4}`}
        fill="none"
        stroke="#1e3a8a"
        strokeWidth="1.8"
        strokeLinecap="round"
      />

      {/* 3. Beaker Container */}
      <rect
        x={beakerX}
        y={beakerY}
        width={beakerW}
        height={beakerH}
        rx="6"
        fill="#f8fafc"
        stroke="#64748b"
        strokeWidth="1.8"
      />
      {/* Electrolyte Liquid Fill */}
      <rect
        x={beakerX + 2}
        y={beakerY + 12}
        width={beakerW - 4}
        height={beakerH - 14}
        rx="4"
        fill="#bae6fd"
        fillOpacity="0.45"
      />
      {/* Liquid surface wave/line */}
      <line
        x1={beakerX + 2}
        y1={beakerY + 12}
        x2={beakerX + beakerW - 2}
        y2={beakerY + 12}
        stroke="#38bdf8"
        strokeWidth="1.5"
      />

      {/* 4. Electrodes Rendering */}

      {/* A) WATER ELECTROLYSIS: Inverted test tubes over electrodes */}
      {config.isWater && (
        <g>
          {/* Anode Tube (Left) collecting O2 (1 vol) */}
          <rect x={anodeWireX - 8} y={beakerY - 14} width="16" height="66" rx="8" fill="#f0f9ff" stroke="#3b82f6" strokeWidth="1.3" opacity="0.85" />
          {/* O2 gas pocket at top (1 volume) */}
          <rect x={anodeWireX - 7} y={beakerY - 13} width="14" height="12" rx="6" fill="#e0f2fe" />
          <text x={anodeWireX} y={beakerY - 3} textAnchor="middle" fontSize="7.5" fontWeight="800" fill="#0369a1">O₂ (1v)</text>
          {/* Pt electrode rod */}
          <rect x={anodeWireX - 2.5} y={beakerY + 6} width="5" height="42" fill="#475569" stroke="#1e293b" strokeWidth="0.8" />

          {/* Cathode Tube (Right) collecting H2 (2 vol) */}
          <rect x={cathodeWireX - 8} y={beakerY - 14} width="16" height="66" rx="8" fill="#f0f9ff" stroke="#3b82f6" strokeWidth="1.3" opacity="0.85" />
          {/* H2 gas pocket at top (2 volumes = double height) */}
          <rect x={cathodeWireX - 7} y={beakerY - 13} width="14" height="24" rx="6" fill="#bfdbfe" />
          <text x={cathodeWireX} y={beakerY + 3} textAnchor="middle" fontSize="7.5" fontWeight="800" fill="#1d4ed8">H₂ (2v)</text>
          {/* Pt electrode rod */}
          <rect x={cathodeWireX - 2.5} y={beakerY + 14} width="5" height="34" fill="#475569" stroke="#1e293b" strokeWidth="0.8" />
        </g>
      )}

      {/* B) SPOON CATHODE for Electroplating */}
      {config.isSpoon && (
        <g>
          {/* Anode Plate (Pure Ag/Au/Ni) */}
          <rect x={anodeWireX - 5} y={beakerY + 4} width="10" height="48" fill="#94a3b8" stroke="#334155" strokeWidth="1.2" rx="1" />
          {/* Spoon Cathode at cathodeWireX */}
          <g>
            {/* Spoon handle */}
            <rect x={cathodeWireX - 2} y={beakerY + 4} width="4" height="30" fill="#d97706" rx="1" />
            {/* Spoon bowl */}
            <path
              d={`M ${cathodeWireX - 7},${beakerY + 30} Q ${cathodeWireX - 8},${beakerY + 52} ${cathodeWireX},${beakerY + 52} Q ${cathodeWireX + 8},${beakerY + 52} ${cathodeWireX + 7},${beakerY + 30} Z`}
              fill="#fbbf24"
              stroke="#b45309"
              strokeWidth="1.2"
            />
          </g>
        </g>
      )}

      {/* C) COPPER REFINING: Thick Impure Anode & Thin Pure Cathode + Anode Mud */}
      {config.isRefining && (
        <g>
          {/* Impure thick copper rod */}
          <rect x={anodeWireX - 7} y={beakerY + 4} width="14" height="48" fill="#b45309" stroke="#78350f" strokeWidth="1.2" rx="1.5" />
          {/* Dots/texture indicating impure anode */}
          <circle cx={anodeWireX - 2} cy={beakerY + 20} r="1" fill="#451a03" />
          <circle cx={anodeWireX + 3} cy={beakerY + 32} r="1" fill="#451a03" />
          <circle cx={anodeWireX - 3} cy={beakerY + 40} r="1" fill="#451a03" />

          {/* Anode mud below anode */}
          <ellipse cx={anodeWireX} cy={beakerY + beakerH - 4} rx="10" ry="3" fill="#78350f" />
          <text x={anodeWireX} y={beakerY + beakerH - 7} textAnchor="middle" fontSize="6.5" fontWeight="700" fill="#78350f">Anode mud</text>

          {/* Thin pure copper plate cathode */}
          <rect x={cathodeWireX - 2} y={beakerY + 4} width="4" height="48" fill="#ea580c" stroke="#9a3412" strokeWidth="1" rx="0.5" />
        </g>
      )}

      {/* D) STANDARD COPPER ELECTRODES (electrolysis_cuso4_cu) */}
      {!config.isWater && !config.isSpoon && !config.isRefining && (
        <g>
          <rect x={anodeWireX - 5} y={beakerY + 4} width="10" height="48" fill="#ea580c" stroke="#9a3412" strokeWidth="1.2" rx="1" />
          <rect x={cathodeWireX - 5} y={beakerY + 4} width="10" height="48" fill="#ea580c" stroke="#9a3412" strokeWidth="1.2" rx="1" />
        </g>
      )}

      {/* 5. Ion Migration Arrows in Middle of Electrolyte */}
      <g>
        {/* Cations migrating to Cathode (-) */}
        <g>
          <text x={batteryCenterX + 5} y={beakerY + 30} textAnchor="middle" fontSize="8" fontWeight="800" fill="#1e3a8a">{config.cation_ion}</text>
          <line x1={batteryCenterX + 16} y1={beakerY + 28} x2={batteryCenterX + 32} y2={beakerY + 28} stroke="#1e3a8a" strokeWidth="1.4" strokeLinecap="round" />
          <polygon points={`${batteryCenterX + 35},${beakerY + 28} ${batteryCenterX + 30},${beakerY + 25} ${batteryCenterX + 30},${beakerY + 31}`} fill="#1e3a8a" />
        </g>

        {/* Anions migrating to Anode (+) */}
        <g>
          <text x={batteryCenterX - 5} y={beakerY + 48} textAnchor="middle" fontSize="8" fontWeight="800" fill="#ef4444">{config.anion_ion}</text>
          <line x1={batteryCenterX - 18} y1={beakerY + 46} x2={batteryCenterX - 34} y2={beakerY + 46} stroke="#ef4444" strokeWidth="1.4" strokeLinecap="round" />
          <polygon points={`${batteryCenterX - 37},${beakerY + 46} ${batteryCenterX - 32},${beakerY + 43} ${batteryCenterX - 32},${beakerY + 49}`} fill="#ef4444" />
        </g>
      </g>

      {/* 6. Electrode Labels (Anode (+) and Cathode (-)) */}
      {/* Anode Label on Left */}
      <g>
        <text x="5" y={beakerY + 16} fontSize="8.5" fontWeight="800" fill="#ef4444">Anode (+)</text>
        <text x="5" y={beakerY + 27} fontSize="7.5" fontWeight="700" fill="#334155">{anodeLabel}</text>
        <text x="5" y={beakerY + 40} fontSize="7.5" fontWeight="700" fill="#b91c1c">{anodeRxn}</text>
      </g>

      {/* Cathode Label on Right */}
      <g>
        <text x="255" y={beakerY + 16} textAnchor="end" fontSize="8.5" fontWeight="800" fill="#1e3a8a">Cathode (−)</text>
        <text x="255" y={beakerY + 27} textAnchor="end" fontSize="7.5" fontWeight="700" fill="#334155">{cathodeLabel}</text>
        <text x="255" y={beakerY + 40} textAnchor="end" fontSize="7.5" fontWeight="700" fill="#1e3a8a">{cathodeRxn}</text>
      </g>

      {/* 7. Electrolyte Name & Bottom Note */}
      <g>
        {/* Electrolyte label centered */}
        <rect x={beakerX + 10} y={beakerY + beakerH - 18} width={beakerW - 20} height="14" rx="3" fill="#ffffff" fillOpacity="0.9" stroke="#94a3b8" strokeWidth="0.8" />
        <text
          x={batteryCenterX}
          y={beakerY + beakerH - 8}
          textAnchor="middle"
          fontSize="7.5"
          fontWeight="800"
          fill="#0369a1"
        >
          Electrolyte: {electrolyteLabel}
        </text>

        {/* Bottom Note */}
        {config.note && (
          <text
            x={batteryCenterX}
            y="151"
            textAnchor="middle"
            fontSize="8"
            fontWeight="700"
            fill="#1e293b"
          >
            ★ {config.note}
          </text>
        )}
      </g>
    </g>
  );
}
