import React, { useRef, useEffect } from 'react';
import EditorToolbar from './EditorToolbar';

export default function Editor({ rawText, onChange, totalPages }) {
  const textareaRef = useRef(null);
  const lineNumbersRef = useRef(null);

  const handleInsert = (snippet) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const before = rawText.substring(0, start);
    const after = rawText.substring(end);

    const newText = before + snippet + after;
    onChange(newText);

    // Reposition cursor
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + snippet.length, start + snippet.length);
    }, 50);
  };

  const handleKeyDown = (e) => {
    // Tab key support
    if (e.key === 'Tab') {
      e.preventDefault();
      handleInsert('  ');
    }
  };

  const handleScroll = (e) => {
    if (lineNumbersRef.current) {
      lineNumbersRef.current.scrollTop = e.target.scrollTop;
    }
  };

  // Ensure textarea scrollLeft is never accidentally scrolled
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.scrollLeft = 0;
    }
  }, [rawText]);

  const lineCount = (rawText.match(/\n/g) || []).length + 1;
  const wordCount = rawText.trim() ? rawText.trim().split(/\s+/).length : 0;

  return (
    <div className="editor-pane">
      <div className="editor-header">
        <div className="editor-title-row">
          <span className="editor-badge">Markup Editor</span>
          <span className="editor-hint">WBBSE Board Schema • Live Soft-Wrap Parser</span>
        </div>
        <EditorToolbar onInsertText={handleInsert} />
      </div>

      <div className="editor-body">
        {/* Line Numbers */}
        <div className="line-numbers-col" ref={lineNumbersRef} aria-hidden="true">
          {Array.from({ length: Math.max(lineCount, 40) }).map((_, i) => (
            <div key={i} className="line-number">
              {i + 1}
            </div>
          ))}
        </div>

        {/* Textarea */}
        <textarea
          ref={textareaRef}
          className="editor-textarea"
          value={rawText}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          onScroll={handleScroll}
          wrap="soft"
          placeholder="Type notes in DSL format (@chapter, === PAGE ===, @left, @right, etc.)..."
          spellCheck="false"
        />
      </div>

      {/* Editor Stats Footer */}
      <div className="editor-footer">
        <div className="footer-stat">Pages: <strong>{totalPages}</strong></div>
        <div className="footer-stat">Lines: <strong>{lineCount}</strong></div>
        <div className="footer-stat">Words: <strong>{wordCount}</strong></div>
        <div className="footer-tip">
          Tip: Use <code>=== PAGE ===</code> to add a new notebook page.
        </div>
      </div>
    </div>
  );
}
