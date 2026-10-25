import React, { useRef, useState, useEffect } from 'react';
import GraphRenderer from './GraphRenderer';
import DiagramRenderer from './DiagramRenderer';
import { formatInlineText } from '../parser';
import { FONT_OPTIONS } from './StylePanel';
import { fitTitleToTwoLines } from '../utils/titleUtils';

// Subheading color palette for variety
const HEADING_COLORS = [
  { bg: '#c9e7ff', border: '#7fb3e8', text: '#000000' },
  { bg: '#ffd6f2', border: '#e78bc7', text: '#000000' },
  { bg: '#d6f5d6', border: '#7bc47b', text: '#000000' },
  { bg: '#fff0be', border: '#d9b236', text: '#000000' },
  { bg: '#e6d5ff', border: '#b28af0', text: '#000000' },
];

/**
 * Real WhatsApp Logo: green rounded bubble with white phone handset
 */
function WhatsAppIcon() {
  return (
    <span className="wa-icon-wrapper" title="WhatsApp">
      <svg
        viewBox="0 0 24 24"
        width="19"
        height="19"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ display: 'inline-block', verticalAlign: 'middle', flexShrink: 0 }}
      >
        <path
          fill="#25D366"
          d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.63C8.75 21.41 10.38 21.82 12.04 21.82C17.5 21.82 21.96 17.37 21.96 11.91C21.96 6.45 17.5 2 12.04 2Z"
        />
        <path
          fill="#FFFFFF"
          d="M17.5 14.33C17.2 14.18 15.73 13.45 15.45 13.35C15.18 13.25 14.98 13.2 14.78 13.5C14.58 13.8 14.01 14.48 13.84 14.68C13.66 14.88 13.49 14.9 13.19 14.75C12.89 14.6 11.92 14.28 10.78 13.26C9.89 12.47 9.29 11.49 9.11 11.19C8.94 10.89 9.09 10.73 9.24 10.58C9.38 10.45 9.54 10.23 9.69 10.06C9.84 9.88 9.89 9.76 9.99 9.56C10.09 9.36 10.04 9.18 9.97 9.03C9.89 8.88 9.29 7.41 9.04 6.81C8.8 6.23 8.55 6.31 8.37 6.3C8.2 6.29 8 6.29 7.8 6.29C7.6 6.29 7.28 6.36 7.01 6.66C6.73 6.96 5.96 7.68 5.96 9.16C5.96 10.63 7.03 12.06 7.18 12.26C7.33 12.46 9.29 15.48 12.3 16.78C13.01 17.09 13.58 17.28 14.01 17.41C14.73 17.64 15.38 17.61 15.9 17.53C16.48 17.44 17.68 16.8 17.93 16.1C18.18 15.4 18.18 14.8 18.1 14.68C18.03 14.55 17.8 14.48 17.5 14.33Z"
        />
      </svg>
    </span>
  );
}

export default function NotebookPage({
  page,
  chapter,
  pageIndex,
  totalPages,
  branding,
  preset,
  styles,
}) {
  const { title, left = [], right = {} } = page;
  const { graphs = [], diagrams = [], tables = [], questions = [], remember, customItems = [] } = right;

  // PART 1: 2-line title fitting logic
  const titleFit = fitTitleToTwoLines(title, preset, styles);

  const pageRef = useRef(null);
  const contentWrapperRef = useRef(null);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const [autoFitScale, setAutoFitScale] = useState(1);

  // Measure content overflow vs preset.height
  useEffect(() => {
    const el = pageRef.current;
    if (!el) return;

    const checkOverflow = () => {
      const targetHeight = preset.height;
      const actualHeight = el.scrollHeight;

      if (actualHeight > targetHeight + 8) {
        setIsOverflowing(true);
        // Automatic protective scaling: shrink smoothly so pinned footer and all content stay 100% visible
        const ratio = Math.max(0.65, (targetHeight - 8) / actualHeight);
        setAutoFitScale(ratio);
      } else {
        setIsOverflowing(false);
        setAutoFitScale(1);
      }
    };

    const timeout = setTimeout(checkOverflow, 120);
    return () => clearTimeout(timeout);
  }, [page, styles, preset]);

  let headingCounter = 0;

  // Resolve font families
  const headingFontObj = FONT_OPTIONS.find((f) => f.id === styles.headingFont) || FONT_OPTIONS[0];
  const bodyFontObj = FONT_OPTIONS.find((f) => f.id === styles.bodyFont) || FONT_OPTIONS[0];

  // Clean chapter prefix (e.g. "Chapter 2" without colon)
  const cleanChapterPrefix = (chapter.prefix || 'Chapter').replace(/:$/, '').trim();

  // Helper to render table
  const renderTableBlock = (tbl, key) => (
    <div key={key} className="hand-table-card">
      {tbl.title && (
        <div className="table-card-header">{formatInlineText(tbl.title)}</div>
      )}
      <div className="table-wrapper">
        <table className="hand-table">
          {tbl.headers && tbl.headers.length > 0 && (
            <thead>
              <tr>
                {tbl.headers.map((h, hIdx) => (
                  <th key={hIdx}>{formatInlineText(h)}</th>
                ))}
              </tr>
            </thead>
          )}
          <tbody>
            {tbl.rows && tbl.rows.map((row, rIdx) => (
              <tr key={rIdx}>
                {row.map((cell, cIdx) => (
                  <td key={cIdx}>{formatInlineText(cell)}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  // Helper to render @must block
  const renderMustBlock = (item, key) => (
    <div key={key} className="must-know-box">
      <div className="must-know-title">★ Must Know</div>
      <div className="must-know-list">
        {item.items && item.items.map((lineText, mIdx) => (
          <div key={mIdx} className="must-know-item">
            <span className="must-dot" aria-hidden="true"></span>
            <span className="must-text">{formatInlineText(lineText)}</span>
          </div>
        ))}
      </div>
    </div>
  );

  // Helper to render @board block
  const renderBoardBlock = (item, key) => (
    <div key={key} className="board-exam-box">
      <div className="board-exam-title">★ Came In Board Exams</div>
      <div className="board-exam-list">
        {item.items && item.items.map((bItem, bIdx) => (
          <div key={bIdx} className="board-exam-item">
            <span className="board-star">★</span>
            <div className="board-qa-row">
              <strong className="board-q">{formatInlineText(bItem.question)}</strong>
              {bItem.answer && (
                <>
                  <span className="board-arrow"> → </span>
                  <span className="board-a">{formatInlineText(bItem.answer)}</span>
                </>
              )}
              {bItem.years && (
                <span className="board-year-tag">{bItem.years}</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Helper to render any standard content item
  const renderContentItem = (item, idx) => {
    if (item.type === 'heading') {
      const color = HEADING_COLORS[headingCounter % HEADING_COLORS.length];
      headingCounter++;
      return (
        <div key={idx} className="section-block">
          <div
            className="section-heading-pill"
            style={{
              backgroundColor: color.bg,
              borderColor: color.border,
              color: color.text,
            }}
          >
            {item.text}
          </div>
        </div>
      );
    }

    if (item.type === 'law') {
      return (
        <div key={idx} className="law-box">
          {formatInlineText(item.text)}
        </div>
      );
    }

    if (item.type === 'formula') {
      return (
        <div key={idx} className="formula-chip-row">
          <div className="formula-chip">
            {formatInlineText(item.text, true)}
          </div>
        </div>
      );
    }

    if (item.type === 'note') {
      return (
        <div key={idx} className="note-box">
          {formatInlineText(item.text)}
        </div>
      );
    }

    if (item.type === 'bullet') {
      return (
        <div key={idx} className="bullet-item">
          <span className="bullet-dot" aria-hidden="true"></span>
          <span className="bullet-content">
            {formatInlineText(item.text)}
          </span>
        </div>
      );
    }

    if (item.type === 'must') {
      return renderMustBlock(item, idx);
    }

    if (item.type === 'board') {
      return renderBoardBlock(item, idx);
    }

    if (item.type === 'table') {
      return renderTableBlock(item, idx);
    }

    if (item.type === 'diagram') {
      return (
        <DiagramRenderer
          key={idx}
          diagram={item}
          index={idx}
          singleDiagram={true}
        />
      );
    }

    return (
      <div key={idx} className="plain-text-item">
        {formatInlineText(item.text)}
      </div>
    );
  };

  // Render Left Column Items
  const renderLeftItems = () => (
    <div className="left-items-flow">
      {left.map((item, idx) => renderContentItem(item, idx))}
    </div>
  );

  // Render Right Column Items (graphs, diagrams, tables, customItems, questions, remember)
  const renderRightItems = () => (
    <div className="right-items-flow">
      {/* 1. Graphs */}
      {graphs.length > 0 && (
        <div className={`graphs-grid graphs-cols-${styles.graphsPerRow || 2}`}>
          {graphs.map((g, gIdx) => (
            <GraphRenderer
              key={gIdx}
              graph={g}
              index={gIdx}
              singleGraph={graphs.length === 1 || styles.graphsPerRow === 1}
            />
          ))}
        </div>
      )}

      {/* 1b. Ray Diagrams */}
      {diagrams.length > 0 && (
        <div className={`graphs-grid graphs-cols-${styles.graphsPerRow || 2}`}>
          {diagrams.map((d, dIdx) => (
            <DiagramRenderer
              key={dIdx}
              diagram={d}
              index={dIdx}
              singleDiagram={diagrams.length === 1 || styles.graphsPerRow === 1}
            />
          ))}
        </div>
      )}

      {/* 2. Tables */}
      {tables.map((tbl, tIdx) => renderTableBlock(tbl, tIdx))}

      {/* 3. Custom right items */}
      {customItems.map((cItem, cIdx) => renderContentItem(cItem, cIdx))}

      {/* 4. Madhyamik Important Box */}
      {questions.length > 0 && (
        <div className="madhyamik-important-box">
          <div className="madhyamik-title">★ Madhyamik Important ★</div>
          <ul className="madhyamik-list">
            {questions.map((q, qIdx) => (
              <li key={qIdx} className="madhyamik-item">
                <span className="star-icon">★</span>
                <span className="qa-text">
                  <strong className="q-part">{formatInlineText(q.question)}</strong>
                  {q.answer && (
                    <>
                      {' → '}
                      <span className="a-part">{formatInlineText(q.answer)}</span>
                    </>
                  )}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* 5. Remember Box */}
      {remember && (
        <div className="remember-box">
          <div className="remember-title">Remember:</div>
          <div className="remember-content">
            {formatInlineText(remember)}
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="notebook-page-wrapper">
      {/* Overflow label in PREVIEW ONLY (has no-print, stripped in export) */}
      {isOverflowing && !styles.autoFit && (
        <div
          className="page-overflow-badge no-print"
          title={`Text exceeds the preset page height (${preset.height}px). Auto paginate will break blocks into continuation pages.`}
        >
          ⚠️ Overflow
        </div>
      )}

      <div
        ref={pageRef}
        className={`notebook-page ${styles.showLines ? 'paper-lines' : 'paper-plain'} ${preset.isMobile ? 'mode-mobile' : 'mode-a4'
          } ${styles.clearDigits !== false ? 'clear-digits-active' : ''}`}
        data-page-index={pageIndex}
        style={{
          width: `${preset.width}px`,
          height: `${preset.height}px`,
          maxHeight: `${preset.height}px`,
          boxSizing: 'border-box',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: `${preset.isMobile ? (styles.pagePadding || 26) : 20}px`,
          fontFamily: bodyFontObj.family,
          lineHeight: styles.lineSpacing || 1.45,
          color: '#000000',
          '--font-heading-current': headingFontObj.family,
          '--font-body-current': bodyFontObj.family,
          '--title-size': `${styles.titleSize || 36}px`,
          '--heading-size': `${styles.headingSize || 26}px`,
          '--content-size': `${styles.contentSize || 20}px`,
        }}
      >
        <div
          ref={contentWrapperRef}
          className="page-scale-wrapper"
          style={{
            transform: autoFitScale < 1 ? `scale(${autoFitScale})` : 'none',
            transformOrigin: 'top left',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            flex: 1,
            height: autoFitScale < 1 ? `${100 / autoFitScale}%` : '100%',
            width: autoFitScale < 1 ? `${100 / autoFitScale}%` : '100%',
          }}
        >
          {/* Top Header on EVERY SHEET */}
          <header className="page-header">
            <div className="header-left">
              <div className="chapter-badge-row">
                <span className="chapter-pill">
                  {cleanChapterPrefix}
                </span>
                <span className="chapter-name">{chapter.name}</span>
              </div>
              <h1
                className="page-title"
                style={{
                  fontSize: `${titleFit.fontSize}px`,
                  lineHeight: 1.1,
                }}
              >
                {titleFit.fittedTitle}
                {titleFit.isTooLong && (
                  <span
                    className="title-too-long-badge no-print"
                    title="Title too long (needs more than 2 lines at minimum size)"
                  >
                    Title too long
                  </span>
                )}
              </h1>
            </div>

            {/* Top Right Logo on EVERY SHEET - 56px, no shield shape or border */}
            <div className="header-right">
              <img
                src={branding.logoUrl || '/playstore.png'}
                alt={branding.channelName}
                className="page-brand-logo"
                style={{
                  width: '56px',
                  height: '56px',
                  objectFit: 'contain',
                  border: 'none',
                  boxShadow: 'none',
                  clipPath: 'none',
                  background: 'transparent',
                }}
              />
            </div>
          </header>

          {/* Page Body: Single Column in Mobile modes, Two Columns in A4 mode */}
          <div className="page-content-area">
            {preset.isMobile ? (
              /* Mobile Single Column: @left blocks then @right blocks */
              <div className="mobile-single-column">
                {left.length > 0 && (
                  <section className="mobile-column-left">
                    {renderLeftItems()}
                  </section>
                )}
                {(graphs.length > 0 || diagrams.length > 0 || tables.length > 0 || customItems.length > 0 || questions.length > 0 || remember) && (
                  <section className="mobile-column-right">
                    {renderRightItems()}
                  </section>
                )}
              </div>
            ) : (
              /* A4 Two Columns with slider width control */
              <div className="page-columns">
                <section
                  className="column column-left"
                  style={{ width: `${styles.leftColWidth || 55}%` }}
                >
                  {renderLeftItems()}
                </section>
                <section
                  className="column column-right"
                  style={{ width: `${100 - (styles.leftColWidth || 55)}%` }}
                >
                  {renderRightItems()}
                </section>
              </div>
            )}
          </div>

          {/* Page Footer on EVERY SHEET: Pinned to bottom, "Chapter 2 • Page 3 of 8" with "of" */}
          <footer className={`page-footer ${preset.isMobile ? 'mobile-page-footer' : ''}`}>
            {preset.isMobile ? (
              /* Mobile footer: uniform font >= 16px, real WhatsApp icon */
              <div className="mobile-footer-container">
                <div className="mobile-footer-row-top">
                  <div className="footer-left">
                    <span className="yt-icon" title="YouTube">▶</span>
                    <span className="footer-brand-name">{branding.channelName}</span>
                  </div>
                  <div className="footer-right">
                    <WhatsAppIcon />
                    <span className="footer-contact">{branding.contactNumber}</span>
                  </div>
                </div>
                <div className="mobile-footer-row-bottom">
                  <span className="footer-center">
                    {cleanChapterPrefix} • Page {pageIndex + 1} of {totalPages}
                  </span>
                </div>
              </div>
            ) : (
              /* A4 horizontal footer */
              <div className="a4-footer-container">
                <div className="footer-left">
                  <span className="yt-icon" title="YouTube">▶</span>
                  <span className="footer-brand-name">{branding.channelName}</span>
                </div>
                <div className="footer-center">
                  {cleanChapterPrefix} • Page {pageIndex + 1} of {totalPages}
                </div>
                <div className="footer-right">
                  <WhatsAppIcon />
                  <span className="footer-contact">{branding.contactNumber}</span>
                </div>
              </div>
            )}
          </footer>
        </div>
      </div>
    </div>
  );
}
