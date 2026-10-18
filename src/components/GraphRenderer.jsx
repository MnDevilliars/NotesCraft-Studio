import React from 'react';
import { formatInlineText, addThinSpacesToSlash } from '../parser';

export default function GraphRenderer({ graph, index = 0, singleGraph = false }) {
  const { kind = 'origin', title = 'Graph', xLabel = 'X', yLabel = 'Y', caption = '' } = graph;

  const cleanXLabel = addThinSpacesToSlash(xLabel);
  const cleanYLabel = addThinSpacesToSlash(yLabel);

  return (
    <div className={`hand-graph-card ${singleGraph ? 'single-graph-card' : ''}`}>
      {/* Title */}
      <div className="graph-card-header">
        {formatInlineText(title)}
      </div>

      {/* Small white chip placed ABOVE the drawing area so caption/P=constant never crosses plotted lines */}
      {caption && (
        <div className="graph-caption-chip-wrapper">
          <span className="graph-caption-chip">{addThinSpacesToSlash(caption)}</span>
        </div>
      )}

      {/* Graph Drawing Area */}
      <div className="graph-svg-container">
        <svg
          width="100%"
          height="150"
          viewBox="0 0 240 150"
          className="hand-svg"
          preserveAspectRatio="xMidYMid meet"
          style={{ width: '100%', height: '150px', display: 'block' }}
        >
          {/* Coordinate axes */}
          {kind === 'intercept' ? (
            <>
              {/* Charles' law intercept graph */}
              {/* Horizontal axis from negative to positive */}
              <line
                x1="20"
                y1="116"
                x2="185"
                y2="116"
                stroke="#111"
                strokeWidth="3.2"
              />
              {/* Arrow tip at X=185 pointing right */}
              <polygon points="185 111, 194 116, 185 121" fill="#111" />

              {/* Vertical axis at middle/offset */}
              <line
                x1="90"
                y1="118"
                x2="90"
                y2="28"
                stroke="#111"
                strokeWidth="3.2"
              />
              {/* Arrow tip at Y=28 pointing up */}
              <polygon points="85 28, 90 19, 95 28" fill="#111" />
              {/* Intercept: Dashed line from (-273, 0) at x=36 to (0, V₀) at (90, 70) */}
              <line
                x1="36"
                y1="116"
                x2="90"
                y2="70"
                stroke="#333"
                strokeWidth="3"
                strokeDasharray="4,4"
              />
              {/* Solid line above 0°C */}
              <line
                x1="90"
                y1="70"
                x2="180"
                y2="26"
                stroke="#0d3b9c"
                strokeWidth="3.5"
                strokeLinecap="round"
              />
              {/* Point at (0, V₀) */}
              <circle cx="90" cy="70" r="3.5" fill="#0d3b9c" />

              {/* Axis labels: sit beyond arrow heads with padding, NEVER under an arrow */}
              <text x="90" y="14" textAnchor="middle" className="svg-label-bold">{cleanYLabel}</text>
              <text x="196" y="120" textAnchor="start" className="svg-label">{cleanXLabel}</text>

              {/* Temperature tick labels on X axis */}
              <text x="90" y="136" textAnchor="middle" className="svg-num">0°C</text>
              <text x="36" y="136" textAnchor="middle" className="svg-num">-273°C</text>

              {/* V₀ label placed safely away from plotted line (above dashed line, left of vertical axis) */}
              <text x="82" y="66" textAnchor="end" className="svg-sub">V₀</text>
            </>
          ) : (
            <>
              {/* Standard origin axes */}
              <line
                x1="36"
                y1="116"
                x2="185"
                y2="116"
                stroke="#111"
                strokeWidth="3.2"
              />
              {/* Arrow tip at X=185 pointing right */}
              <polygon points="185 111, 194 116, 185 121" fill="#111" />

              <line
                x1="36"
                y1="118"
                x2="36"
                y2="28"
                stroke="#111"
                strokeWidth="3.2"
              />
              {/* Arrow tip at Y=28 pointing up */}
              <polygon points="31 28, 36 19, 41 28" fill="#111" />

              {/* Y Axis Label: sits beyond the arrow head above */}
              <text x="36" y="14" textAnchor="middle" className="svg-label-bold">{cleanYLabel}</text>

              {/* X Axis Label: sits beyond the arrow head to the right with padding */}
              <text x="196" y="120" textAnchor="start" className="svg-label">{cleanXLabel}</text>

              {/* Graph curves depending on kind */}
              {kind === 'hyperbola' && (
                <>
                  {/* Smooth rectangular hyperbola curve */}
                  <path
                    d="M 48,34 Q 65,92 180,108"
                    fill="none"
                    stroke="#0d3b9c"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                  />
                  <text x="22" y="132" textAnchor="end" className="svg-num">0</text>
                </>
              )}

              {kind === 'horizontal' && (
                <>
                  {/* Straight line parallel to X axis */}
                  <line
                    x1="38"
                    y1="64"
                    x2="180"
                    y2="64"
                    stroke="#0d3b9c"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                  />
                  <text x="22" y="132" textAnchor="end" className="svg-num">0</text>
                </>
              )}

              {kind === 'origin' && (
                <>
                  {/* Straight line through the origin */}
                  <line
                    x1="38"
                    y1="114"
                    x2="180"
                    y2="30"
                    stroke="#0d3b9c"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                  />
                  <text x="22" y="132" textAnchor="end" className="svg-num">
                    {xLabel.includes('(K)') || yLabel.includes('(K)') ? '0K' : '0'}
                  </text>
                </>
              )}
            </>
          )}
        </svg>
      </div>
    </div>
  );
}
