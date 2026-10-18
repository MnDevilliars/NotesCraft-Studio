import React from 'react';
import { X, RotateCcw, Sliders, Type, Grid, Check, Sparkles, BookOpen, FileDown } from 'lucide-react';

export const FONT_OPTIONS = [
  { id: 'Kalam', name: 'Kalam (Recommended)', family: "'Kalam', cursive" },
  { id: 'Patrick Hand', name: 'Patrick Hand', family: "'Patrick Hand', cursive" },
  { id: 'Caveat', name: 'Caveat', family: "'Caveat', cursive" },
  { id: 'Indie Flower', name: 'Indie Flower', family: "'Indie Flower', cursive" },
  { id: 'Handlee', name: 'Handlee', family: "'Handlee', cursive" },
  { id: 'Comic Neue', name: 'Comic Neue', family: "'Comic Neue', cursive" },
];

export const DEFAULT_STYLES = {
  headingFont: 'Kalam',
  bodyFont: 'Kalam',
  titleSize: 36,
  headingSize: 26,
  contentSize: 20,
  lineSpacing: 1.45,
  autoFit: false,
  autoPaginate: true, // Default ON for clean mobile pagination
  clearDigits: true,
  showLines: false, // Default OFF, plain white background
  graphsPerRow: 2,
  leftColWidth: 55, // for A4 mode (45% - 65%)
  pagePadding: 26,
  pdfQuality: 'compact', // 'compact' (~500KB) | 'balanced' (~1.2MB) | 'hd' (~7MB)
};

export default function StylePanel({ isOpen, onClose, styles, setStyles, isMobilePreset }) {
  if (!isOpen) return null;

  const updateStyle = (key, val) => {
    setStyles((prev) => ({ ...prev, [key]: val }));
  };

  const handleReset = () => {
    setStyles(DEFAULT_STYLES);
  };

  return (
    <div className="style-panel-backdrop no-print" onClick={onClose}>
      <div className="style-panel-modal" onClick={(e) => e.stopPropagation()}>
        <div className="style-panel-header">
          <div className="flex items-center gap-2">
            <Sliders size={18} className="text-blue-400" />
            <h3 className="style-panel-title">Typography & Layout Style</h3>
          </div>
          <button className="btn-icon" onClick={onClose} title="Close Style Panel">
            <X size={18} />
          </button>
        </div>

        <div className="style-panel-body">
          {/* Requirement 4: Clear Digits Switch & Live Test Line */}
          <div className="style-section highlight-box-slate">
            <div className="form-row items-center justify-between">
              <div>
                <div className="setting-label flex items-center gap-2">
                  <Sparkles size={14} className="text-amber-400" />
                  <span>Clear Digits (0–9)</span>
                </div>
                <div className="setting-subtext">
                  Draws distinct digits 0–9 so "1" never looks like "I" and "1/V" never looks like "IN".
                </div>
              </div>
              <label className="switch-toggle">
                <input
                  type="checkbox"
                  checked={styles.clearDigits !== false}
                  onChange={(e) => updateStyle('clearDigits', e.target.checked)}
                />
                <span className="switch-slider"></span>
              </label>
            </div>

            {/* Test Line */}
            <div className="digit-test-line-box">
              <div className="digit-test-label">Live Digit & Slash Test Line:</div>
              <div className={`digit-test-display ${styles.clearDigits !== false ? 'clear-digits-active' : ''}`}>
                1/V &nbsp; P vs 1/V &nbsp; V₀/273 &nbsp; 1/273 &nbsp; Page 1 of 8
              </div>
            </div>
          </div>

          {/* Font Family Dropdowns */}
          <div className="style-section">
            <div className="style-section-title">
              <Type size={15} />
              <span>Font Families</span>
            </div>
            <div className="form-row">
              <div className="form-group flex-1">
                <label className="form-label">Heading Font</label>
                <select
                  className="form-select"
                  value={styles.headingFont}
                  onChange={(e) => updateStyle('headingFont', e.target.value)}
                >
                  {FONT_OPTIONS.map((f) => (
                    <option key={f.id} value={f.id}>
                      {f.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group flex-1">
                <label className="form-label">Body Font</label>
                <select
                  className="form-select"
                  value={styles.bodyFont}
                  onChange={(e) => updateStyle('bodyFont', e.target.value)}
                >
                  {FONT_OPTIONS.map((f) => (
                    <option key={f.id} value={f.id}>
                      {f.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Font Sizes & Spacing Sliders */}
          <div className="style-section">
            <div className="style-section-title">
              <Sliders size={15} />
              <span>Font Sizes & Spacing</span>
            </div>

            {/* Title Size */}
            <div className="slider-control-group">
              <div className="slider-label-row">
                <span className="slider-name">Title Size</span>
                <span className="slider-value-badge">{styles.titleSize} px</span>
              </div>
              <input
                type="range"
                min="24"
                max="48"
                step="1"
                className="style-slider"
                value={styles.titleSize}
                onChange={(e) => updateStyle('titleSize', Number(e.target.value))}
              />
            </div>

            {/* Sub-heading Size */}
            <div className="slider-control-group">
              <div className="slider-label-row">
                <span className="slider-name">Sub-heading Size</span>
                <span className="slider-value-badge">{styles.headingSize} px</span>
              </div>
              <input
                type="range"
                min="18"
                max="36"
                step="1"
                className="style-slider"
                value={styles.headingSize}
                onChange={(e) => updateStyle('headingSize', Number(e.target.value))}
              />
            </div>

            {/* Content Size */}
            <div className="slider-control-group">
              <div className="slider-label-row">
                <span className="slider-name">Content Size (Bullets, Cards, PYQ, Remember)</span>
                <span className="slider-value-badge">{styles.contentSize} px</span>
              </div>
              <input
                type="range"
                min="15"
                max="28"
                step="1"
                className="style-slider"
                value={styles.contentSize}
                onChange={(e) => updateStyle('contentSize', Number(e.target.value))}
              />
            </div>

            {/* Line Spacing */}
            <div className="slider-control-group">
              <div className="slider-label-row">
                <span className="slider-name">Line Spacing</span>
                <span className="slider-value-badge">{Number(styles.lineSpacing).toFixed(2)}</span>
              </div>
              <input
                type="range"
                min="1.20"
                max="1.80"
                step="0.05"
                className="style-slider"
                value={styles.lineSpacing}
                onChange={(e) => updateStyle('lineSpacing', Number(e.target.value))}
              />
            </div>

            {/* A4 Column Width Slider (Visible in A4 mode) */}
            {!isMobilePreset && (
              <div className="slider-control-group a4-col-slider">
                <div className="slider-label-row">
                  <span className="slider-name">Left Column Width (A4 Mode)</span>
                  <span className="slider-value-badge">{styles.leftColWidth}%</span>
                </div>
                <input
                  type="range"
                  min="45"
                  max="65"
                  step="1"
                  className="style-slider"
                  value={styles.leftColWidth}
                  onChange={(e) => updateStyle('leftColWidth', Number(e.target.value))}
                />
              </div>
            )}
          </div>

          {/* Graph Grid & Flow Switches */}
          <div className="style-section">
            <div className="style-section-title">
              <Grid size={15} />
              <span>Layout & Flow Behaviors</span>
            </div>

            <div className="form-row items-center justify-between py-2">
              <div>
                <div className="setting-label">Graphs per Row</div>
                <div className="setting-subtext">Display graphs side-by-side (2) or stacked full width (1)</div>
              </div>
              <div className="btn-toggle-group">
                <button
                  type="button"
                  className={`toggle-option ${styles.graphsPerRow === 1 ? 'active' : ''}`}
                  onClick={() => updateStyle('graphsPerRow', 1)}
                >
                  1 (Full Width)
                </button>
                <button
                  type="button"
                  className={`toggle-option ${styles.graphsPerRow === 2 ? 'active' : ''}`}
                  onClick={() => updateStyle('graphsPerRow', 2)}
                >
                  2 (Side-by-side)
                </button>
              </div>
            </div>

            {/* Requirement 6: Auto Paginate Switch */}
            <div className="form-row items-center justify-between py-2 border-top-slate">
              <div>
                <div className="setting-label flex items-center gap-1.5">
                  <BookOpen size={14} className="text-emerald-400" />
                  <span>Auto Paginate</span>
                </div>
                <div className="setting-subtext">
                  When ON and a page overflows, move overflow blocks to a continuation page titled "(contd.)" without cutting blocks.
                </div>
              </div>
              <label className="switch-toggle">
                <input
                  type="checkbox"
                  checked={!!styles.autoPaginate}
                  onChange={(e) => updateStyle('autoPaginate', e.target.checked)}
                />
                <span className="switch-slider"></span>
              </label>
            </div>

            {/* Requirement 5: Notebook Lines Switch (Default OFF, plain white) */}
            <div className="form-row items-center justify-between py-2 border-top-slate">
              <div>
                <div className="setting-label">Notebook Lines (Default OFF)</div>
                <div className="setting-subtext">
                  Draws very light 10% opacity ruled lines behind text without margin lines.
                </div>
              </div>
              <label className="switch-toggle">
                <input
                  type="checkbox"
                  checked={!!styles.showLines}
                  onChange={(e) => updateStyle('showLines', e.target.checked)}
                />
                <span className="switch-slider"></span>
              </label>
            </div>

            {/* Auto Fit Switch (Default OFF) */}
            <div className="form-row items-center justify-between py-2 border-top-slate">
              <div>
                <div className="setting-label">Auto Fit Page Height (Default OFF)</div>
                <div className="setting-subtext">
                  Automatically scale content to fit within page. When OFF, shows a red Overflow alert in preview only.
                </div>
              </div>
              <label className="switch-toggle">
                <input
                  type="checkbox"
                  checked={!!styles.autoFit}
                  onChange={(e) => updateStyle('autoFit', e.target.checked)}
                />
                <span className="switch-slider"></span>
              </label>
            </div>

            {/* Requirement: PDF Size Compression (KB range vs MB) */}
            <div className="form-row flex-col items-start gap-2 py-3 border-top-slate">
              <div className="flex items-center gap-2">
                <FileDown size={14} className="text-emerald-400" />
                <div className="setting-label">PDF File Size / Compression</div>
              </div>
              <div className="setting-subtext">
                Compressed mode shrinks the PDF from 7–10 MB to 400–800 KB while retaining crisp text & sharp diagrams.
              </div>
              <div className="flex items-center gap-2 w-full mt-1">
                <button
                  type="button"
                  className={`btn btn-sm flex-1 ${styles.pdfQuality === 'compact' || !styles.pdfQuality ? 'btn-primary' : 'btn-secondary'}`}
                  onClick={() => updateStyle('pdfQuality', 'compact')}
                  style={{ flexDirection: 'column', gap: 2, padding: '6px 8px' }}
                >
                  <span className="text-xs font-semibold">Compressed</span>
                  <span className="text-[10px] opacity-80">~400–800 KB</span>
                </button>
                <button
                  type="button"
                  className={`btn btn-sm flex-1 ${styles.pdfQuality === 'balanced' ? 'btn-primary' : 'btn-secondary'}`}
                  onClick={() => updateStyle('pdfQuality', 'balanced')}
                  style={{ flexDirection: 'column', gap: 2, padding: '6px 8px' }}
                >
                  <span className="text-xs font-semibold">Balanced</span>
                  <span className="text-[10px] opacity-80">~1.2 MB</span>
                </button>
                <button
                  type="button"
                  className={`btn btn-sm flex-1 ${styles.pdfQuality === 'hd' ? 'btn-primary' : 'btn-secondary'}`}
                  onClick={() => updateStyle('pdfQuality', 'hd')}
                  style={{ flexDirection: 'column', gap: 2, padding: '6px 8px' }}
                >
                  <span className="text-xs font-semibold">Ultra HD</span>
                  <span className="text-[10px] opacity-80">~7 MB</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="style-panel-footer">
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={handleReset}
          >
            <RotateCcw size={13} />
            <span>Reset Mobile Defaults</span>
          </button>
          <button
            type="button"
            className="btn btn-primary btn-sm"
            onClick={onClose}
          >
            <Check size={14} />
            <span>Apply & Close</span>
          </button>
        </div>
      </div>
    </div>
  );
}
