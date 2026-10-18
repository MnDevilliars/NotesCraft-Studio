import React, { useState, useMemo, useEffect } from 'react';
import Navbar, { PAGE_SIZE_PRESETS } from './components/Navbar';
import Editor from './components/Editor';
import NotebookPage from './components/NotebookPage';
import BrandingModal from './components/BrandingModal';
import AIPromptModal from './components/AIPromptModal';
import NewNoteModal from './components/NewNoteModal';
import StylePanel, { DEFAULT_STYLES } from './components/StylePanel';
import { parseNotesDSL } from './parser';
import { SUBJECT_TEMPLATES } from './templates';
import { exportToPDF, exportToZIP, exportToPNG } from './utils/exportUtils';
import { autoPaginatePages } from './utils/pagination';

export default function App() {
  const [selectedTemplateKey, setSelectedTemplateKey] = useState(() => {
    return localStorage.getItem('madhyamik_notes_key') || 'physical-science-ch2';
  });

  const [rawText, setRawText] = useState(() => {
    const saved = localStorage.getItem('madhyamik_notes_content');
    if (saved) return saved;
    return SUBJECT_TEMPLATES['physical-science-ch2'].content;
  });

  const [viewMode, setViewMode] = useState('split'); // 'split' | 'preview' | 'editor'
  const [selectedPageIndex, setSelectedPageIndex] = useState(-1); // -1 for all
  const [zoom, setZoom] = useState(1.0);

  // Requirement 1: Page Size Presets (Default Mobile 9:16 = 600 x 1067)
  const [pageSizeKey, setPageSizeKey] = useState(() => {
    return localStorage.getItem('madhyamik_pagesize_key') || 'mobile-9-16';
  });

  // Requirement 4 & 5: Style & Typography settings
  const [styles, setStyles] = useState(() => {
    const saved = localStorage.getItem('madhyamik_styles');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return {
          ...DEFAULT_STYLES,
          ...parsed,
          autoPaginate: parsed.autoPaginate !== undefined ? parsed.autoPaginate : true,
          showLines: parsed.showLines !== undefined ? parsed.showLines : false,
        };
      } catch (e) { }
    }
    return DEFAULT_STYLES;
  });

  // Requirement 6: Phone Preview toggle (390px frame)
  const [isPhonePreview, setIsPhonePreview] = useState(false);

  // Requirement 7: Teacher branding with playstore.png logo
  const [branding, setBranding] = useState(() => {
    const savedBranding = localStorage.getItem('madhyamik_branding');
    if (savedBranding) {
      try {
        const parsed = JSON.parse(savedBranding);
        return {
          channelName: parsed.channelName || 'Ganit Kaksha - Md Noorain',
          logoUrl: parsed.logoUrl || '/playstore.png',
          contactNumber: parsed.contactNumber || 'Offline Classes: 82760 13329',
        };
      } catch (e) { }
    }
    return {
      channelName: 'Ganit Kaksha - Md Noorain',
      logoUrl: '/playstore.png',
      contactNumber: 'Offline Classes: 82760 13329',
    };
  });

  const [isBrandingOpen, setIsBrandingOpen] = useState(false);
  const [isAIPromptOpen, setIsAIPromptOpen] = useState(false);
  const [isNewNoteOpen, setIsNewNoteOpen] = useState(false);
  const [isStylePanelOpen, setIsStylePanelOpen] = useState(false);
  const [exportProgress, setExportProgress] = useState(null);
  const [isExporting, setIsExporting] = useState(false);

  // Auto-save to localStorage
  useEffect(() => {
    localStorage.setItem('madhyamik_notes_content', rawText);
    localStorage.setItem('madhyamik_notes_key', selectedTemplateKey);
  }, [rawText, selectedTemplateKey]);

  useEffect(() => {
    localStorage.setItem('madhyamik_pagesize_key', pageSizeKey);
  }, [pageSizeKey]);

  useEffect(() => {
    localStorage.setItem('madhyamik_styles', JSON.stringify(styles));
  }, [styles]);

  useEffect(() => {
    localStorage.setItem('madhyamik_branding', JSON.stringify(branding));
  }, [branding]);

  // Current preset details
  const currentPreset = PAGE_SIZE_PRESETS[pageSizeKey] || PAGE_SIZE_PRESETS['mobile-9-16'];

  // Requirement 2: Dynamically inject exact print page dimensions into CSS
  useEffect(() => {
    let styleEl = document.getElementById('dynamic-print-page-style');
    if (!styleEl) {
      styleEl = document.createElement('style');
      styleEl.id = 'dynamic-print-page-style';
      document.head.appendChild(styleEl);
    }
    styleEl.innerHTML = `@media print { @page { size: ${currentPreset.width}px ${currentPreset.height}px; margin: 0; } }`;
  }, [currentPreset]);

  // Parse raw text into structured data
  const rawData = useMemo(() => {
    return parseNotesDSL(rawText);
  }, [rawText]);

  const { chapter } = rawData;

  // Requirement 6: Auto Paginate support
  const pages = useMemo(() => {
    if (styles.autoPaginate !== false) {
      return autoPaginatePages(rawData.pages, currentPreset, styles);
    }
    return rawData.pages;
  }, [rawData.pages, styles.autoPaginate, styles.graphsPerRow, currentPreset]);

  // Dedicated export pages: always paginated so exported mobile PDFs never cut off content or footers
  const exportPages = useMemo(() => {
    return autoPaginatePages(rawData.pages, currentPreset, { ...styles, autoPaginate: true });
  }, [rawData.pages, currentPreset, styles]);

  // Handle template selection
  const handleSelectTemplate = (key) => {
    setSelectedTemplateKey(key);
    if (key !== 'custom' && SUBJECT_TEMPLATES[key]) {
      setRawText(SUBJECT_TEMPLATES[key].content);
      setSelectedPageIndex(-1);
    }
  };

  // Export raw text as .notes file
  const handleExportNotes = () => {
    const filename = `${chapter.name.toLowerCase().replace(/[^a-z0-9]/g, '_')}_notes.txt`;
    const blob = new Blob([rawText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
  };

  // Import raw text from file
  const handleImportNotes = (importedText) => {
    setRawText(importedText);
    setSelectedTemplateKey('custom');
    setSelectedPageIndex(-1);
  };

  // Requirement 1: Export to PDF (Compressed in KB range, crisp quality)
  const handleDownloadPDF = async () => {
    setIsExporting(true);
    setExportProgress('Starting PDF export...');
    try {
      await exportToPDF({
        chapterPrefix: chapter.prefix,
        chapterName: chapter.name,
        preset: currentPreset,
        pdfQuality: styles.pdfQuality || 'compact',
        onProgress: (current, total, msg) => {
          setExportProgress(`${msg} (${current}/${total})`);
        },
      });
    } finally {
      setTimeout(() => {
        setIsExporting(false);
        setExportProgress(null);
      }, 1500);
    }
  };

  // Requirement 3: Export ZIP of Images (1200px wide, Chapter-2_Page-01.png...)
  const handleDownloadZIP = async () => {
    setIsExporting(true);
    setExportProgress('Generating 1200px PNGs for ZIP...');
    try {
      await exportToZIP({
        chapterPrefix: chapter.prefix,
        chapterName: chapter.name,
        preset: currentPreset,
        onProgress: (current, total, msg) => {
          setExportProgress(`${msg} (${current}/${total})`);
        },
      });
    } finally {
      setTimeout(() => {
        setIsExporting(false);
        setExportProgress(null);
      }, 600);
    }
  };

  // Export individual PNGs
  const handleDownloadPNG = async () => {
    setIsExporting(true);
    setExportProgress('Preparing PNG images...');
    try {
      await exportToPNG({
        chapterPrefix: chapter.prefix,
        chapterName: chapter.name,
        preset: currentPreset,
        onProgress: (current, total, msg) => {
          setExportProgress(`${msg} (${current}/${total})`);
        },
      });
    } finally {
      setTimeout(() => {
        setIsExporting(false);
        setExportProgress(null);
      }, 600);
    }
  };

  // Filter pages for view
  const visiblePages = selectedPageIndex === -1
    ? pages
    : pages.filter((_, idx) => idx === selectedPageIndex);

  return (
    <div className="app-container">
      {/* Top Navigation */}
      <Navbar
        selectedTemplateKey={selectedTemplateKey}
        onSelectTemplate={handleSelectTemplate}
        onOpenNewNote={() => setIsNewNoteOpen(true)}
        viewMode={viewMode}
        setViewMode={setViewMode}
        selectedPageIndex={selectedPageIndex}
        setSelectedPageIndex={setSelectedPageIndex}
        totalPages={pages.length}
        zoom={zoom}
        setZoom={setZoom}
        onOpenBranding={() => setIsBrandingOpen(true)}
        onOpenAIPrompt={() => setIsAIPromptOpen(true)}
        onOpenStylePanel={() => setIsStylePanelOpen(true)}
        onExportNotes={handleExportNotes}
        onImportNotes={handleImportNotes}
        onPrint={() => window.print()}
        pageSizeKey={pageSizeKey}
        onSelectPageSize={setPageSizeKey}
        isPhonePreview={isPhonePreview}
        onTogglePhonePreview={() => setIsPhonePreview(!isPhonePreview)}
        styles={styles}
        onToggleAutoPaginate={() =>
          setStyles((prev) => ({ ...prev, autoPaginate: !prev.autoPaginate }))
        }
        onDownloadPDF={handleDownloadPDF}
        onDownloadZIP={handleDownloadZIP}
        onDownloadPNG={handleDownloadPNG}
        isExporting={isExporting}
        branding={branding}
      />

      {/* Export Progress Notification Toast */}
      {exportProgress && (
        <div className="export-toast-banner no-print">
          <div className="export-toast-spinner"></div>
          <span>{exportProgress}</span>
        </div>
      )}

      {/* Main Workspace Split Area */}
      <main className="app-workspace">
        {/* Editor Pane */}
        {viewMode !== 'preview' && (
          <Editor
            rawText={rawText}
            onChange={(val) => {
              setRawText(val);
              setSelectedTemplateKey('custom');
            }}
            totalPages={pages.length}
          />
        )}

        {/* Preview Pane */}
        {viewMode !== 'editor' && (
          <div className={`preview-pane ${viewMode === 'preview' ? 'full-width' : ''}`}>
            {isPhonePreview ? (
              /* Requirement 6: Phone Preview inside 390px frame */
              <div className="phone-mockup-wrapper">
                <div className="phone-mockup-shell">
                  {/* Phone Notch Bar */}
                  <div className="phone-notch-bar">
                    <span className="phone-notch-time">9:41</span>
                    <div className="phone-dynamic-island"></div>
                    <div className="phone-notch-icons">
                      <span className="phone-icon-net">●●●●</span>
                      <span className="phone-icon-wifi">📶</span>
                      <span className="phone-icon-bat">100%</span>
                    </div>
                  </div>

                  {/* 390px Screen Viewport */}
                  <div className="phone-screen-viewport">
                    <div
                      className="phone-scaled-scrollable"
                      style={{
                        width: '390px',
                      }}
                    >
                      <div
                        className="phone-scaled-content"
                        style={{
                          transform: `scale(${390 / currentPreset.width})`,
                          transformOrigin: 'top left',
                          width: `${currentPreset.width}px`,
                        }}
                      >
                        {visiblePages.map((page, idx) => {
                          const actualIndex = selectedPageIndex === -1 ? idx : selectedPageIndex;
                          return (
                            <NotebookPage
                              key={actualIndex}
                              page={page}
                              chapter={chapter}
                              pageIndex={actualIndex}
                              totalPages={pages.length}
                              branding={branding}
                              preset={currentPreset}
                              styles={styles}
                            />
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Phone Bottom Home Bar */}
                  <div className="phone-home-indicator"></div>
                </div>
              </div>
            ) : (
              /* Standard Preview Container */
              <div
                className="preview-zoom-container"
                style={{
                  transform: `scale(${zoom})`,
                  width: `${100 / zoom}%`,
                }}
              >
                {visiblePages.map((page, idx) => {
                  const actualIndex = selectedPageIndex === -1 ? idx : selectedPageIndex;
                  return (
                    <NotebookPage
                      key={actualIndex}
                      page={page}
                      chapter={chapter}
                      pageIndex={actualIndex}
                      totalPages={pages.length}
                      branding={branding}
                      preset={currentPreset}
                      styles={styles}
                    />
                  );
                })}
              </div>
            )}
          </div>
        )}
      </main>

      {/* Create New Note Modal */}
      <NewNoteModal
        isOpen={isNewNoteOpen}
        onClose={() => setIsNewNoteOpen(false)}
        onCreateNew={(content) => {
          setRawText(content);
          setSelectedTemplateKey('custom');
          setSelectedPageIndex(-1);
        }}
        onOpenAIPrompt={() => setIsAIPromptOpen(true)}
      />

      {/* Teacher Branding Customization Modal */}
      <BrandingModal
        isOpen={isBrandingOpen}
        onClose={() => setIsBrandingOpen(false)}
        branding={branding}
        setBranding={setBranding}
      />

      {/* AI Prompt Generator for any subject Modal */}
      <AIPromptModal
        isOpen={isAIPromptOpen}
        onClose={() => setIsAIPromptOpen(false)}
      />

      {/* Style & Typography Panel (Requirement 4 & 5) */}
      <StylePanel
        isOpen={isStylePanelOpen}
        onClose={() => setIsStylePanelOpen(false)}
        styles={styles}
        setStyles={setStyles}
        isMobilePreset={currentPreset.isMobile}
      />

      {/* Hidden container mounting ALL pages for 100% complete export (never clipped by page tabs or editor view) */}
      <div
        id="export-mount-container"
        aria-hidden="true"
        style={{
          position: 'fixed',
          left: '-99999px',
          top: 0,
          width: `${currentPreset.width}px`,
          opacity: 0,
          pointerEvents: 'none',
          zIndex: -99999,
        }}
      >
        {exportPages.map((page, idx) => (
          <NotebookPage
            key={`export-sheet-${idx}`}
            page={page}
            chapter={chapter}
            pageIndex={idx}
            totalPages={exportPages.length}
            branding={branding}
            preset={currentPreset}
            styles={styles}
          />
        ))}
      </div>
    </div>
  );
}
