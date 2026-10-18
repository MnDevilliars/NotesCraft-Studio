import React, { useRef } from 'react';
import {
  Printer,
  Sparkles,
  Settings,
  Download,
  Upload,
  BookOpen,
  Eye,
  Columns,
  Code2,
  ZoomIn,
  ZoomOut,
  PlusCircle,
  Smartphone,
  Sliders,
  FileDown,
  Image as ImageIcon,
  Archive,
} from 'lucide-react';
import { SUBJECT_TEMPLATES } from '../templates';

export const PAGE_SIZE_PRESETS = {
  'mobile-9-16': {
    id: 'mobile-9-16',
    label: 'Mobile 9:16 (600×1067)',
    shortLabel: 'Mobile 9:16',
    width: 600,
    height: 1067,
    isMobile: true,
  },
  'mobile-3-4': {
    id: 'mobile-3-4',
    label: 'Mobile 3:4 (600×800)',
    shortLabel: 'Mobile 3:4',
    width: 600,
    height: 800,
    isMobile: true,
  },
  'a4': {
    id: 'a4',
    label: 'A4 Sheet (794×1123)',
    shortLabel: 'A4',
    width: 794,
    height: 1123,
    isMobile: false,
  },
};

export default function Navbar({
  selectedTemplateKey,
  onSelectTemplate,
  onOpenNewNote,
  viewMode,
  setViewMode,
  selectedPageIndex,
  setSelectedPageIndex,
  totalPages,
  zoom,
  setZoom,
  onOpenBranding,
  onOpenAIPrompt,
  onOpenStylePanel,
  onExportNotes,
  onImportNotes,
  onPrint,
  pageSizeKey,
  onSelectPageSize,
  isPhonePreview,
  onTogglePhonePreview,
  styles,
  onToggleAutoPaginate,
  onDownloadPDF,
  onDownloadZIP,
  onDownloadPNG,
  isExporting,
  branding,
}) {
  const fileInputRef = useRef(null);

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const text = event.target?.result;
        if (text) {
          onImportNotes(text);
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <header className="app-navbar no-print">
      {/* Navbar Left: Logo, Name & Template Selector */}
      <div className="navbar-left">
        <div className="app-brand">
          <img
            src={branding.logoUrl || '/playstore.png'}
            alt="GK Logo"
            className="brand-logo-img"
          />
          <div className="brand-text">
            <div className="brand-title">WBBSE Madhyamik Notes Studio</div>
            <div className="brand-subtitle">Class 10 Revision Notes & Mobile PDF Generator</div>
          </div>
        </div>

        {/* Template / Subject Selector */}
        <div className="template-selector-wrapper">
          <BookOpen size={15} className="selector-icon" />
          <select
            className="subject-dropdown"
            value={selectedTemplateKey}
            onChange={(e) => onSelectTemplate(e.target.value)}
            title="Switch Subject / Chapter Notes"
          >
            <option value="physical-science-ch2">Physical Science: Ch 2 Behaviour of Gases</option>
            <option value="life-science-ch1">Life Science: Ch 1 Control & Coordination</option>
            <option value="history-ch2">History: Ch 2 Reform - Observations</option>
            <option value="geography-ch1">Geography: Ch 1 Exogenetic Landforms</option>
            <option value="mathematics-mensuration">Mathematics: Mensuration (Cylinder & Cone)</option>
            <option value="custom">-- Custom / User Notes --</option>
          </select>
        </div>

        {/* Create New Note Button */}
        <button
          className="nav-btn nav-btn-primary"
          onClick={onOpenNewNote}
          title="Create a new note for any chapter or subject"
        >
          <PlusCircle size={15} />
          <span>New Note</span>
        </button>
      </div>

      {/* Navbar Center: Preset Size, Views, Style, and Phone Preview */}
      <div className="navbar-center">
        {/* Page Size Preset Selector (Requirement 1) */}
        <div className="preset-selector-wrapper">
          <span className="preset-label">Page:</span>
          <select
            className="preset-dropdown"
            value={pageSizeKey}
            onChange={(e) => onSelectPageSize(e.target.value)}
            title="Select Page Size Preset (Mobile 9:16 default)"
          >
            {Object.entries(PAGE_SIZE_PRESETS).map(([key, item]) => (
              <option key={key} value={key}>
                {item.label}
              </option>
            ))}
          </select>
        </div>

        {/* Style Panel Trigger (Requirement 4 & 5) */}
        <button
          className="nav-btn nav-btn-highlight"
          onClick={onOpenStylePanel}
          title="Configure Typography, Sizes, Kalam font, Sliders & Auto Fit"
        >
          <Sliders size={15} />
          <span>Style</span>
        </button>

        {/* Phone Preview Toggle (Requirement 6) */}
        <button
          className={`nav-btn ${isPhonePreview ? 'nav-btn-phone-active' : 'nav-btn-secondary'}`}
          onClick={onTogglePhonePreview}
          title="Toggle 390px Mobile Phone Screen Frame View"
        >
          <Smartphone size={15} />
          <span>Phone View</span>
        </button>

        {/* Auto Paginate Toggle (Requirement 6) */}
        <button
          className={`nav-btn ${styles?.autoPaginate !== false ? 'nav-btn-paginate-active' : 'nav-btn-secondary'}`}
          onClick={onToggleAutoPaginate}
          title="Toggle Auto Pagination (breaks long content into clean mobile pages so nothing is cut off)"
        >
          <BookOpen size={14} />
          <span>Paginate: {styles?.autoPaginate !== false ? 'ON' : 'OFF'}</span>
        </button>

        {/* View Mode Switcher */}
        <div className="view-mode-tabs">
          <button
            className={`view-tab-btn ${viewMode === 'split' ? 'active' : ''}`}
            onClick={() => setViewMode('split')}
            title="Split Editor & Live Preview"
          >
            <Columns size={14} />
            <span>Split</span>
          </button>
          <button
            className={`view-tab-btn ${viewMode === 'preview' ? 'active' : ''}`}
            onClick={() => setViewMode('preview')}
            title="Preview Notebook Sheets Only"
          >
            <Eye size={14} />
            <span>Preview</span>
          </button>
          <button
            className={`view-tab-btn ${viewMode === 'editor' ? 'active' : ''}`}
            onClick={() => setViewMode('editor')}
            title="Editor Code Only"
          >
            <Code2 size={14} />
            <span>Editor</span>
          </button>
        </div>

        {/* Page Filter Navigation */}
        <div className="page-nav-pills">
          <button
            className={`page-pill-btn ${selectedPageIndex === -1 ? 'active' : ''}`}
            onClick={() => setSelectedPageIndex(-1)}
          >
            All ({totalPages})
          </button>
          {Array.from({ length: totalPages }).map((_, pIdx) => (
            <button
              key={pIdx}
              className={`page-pill-btn ${selectedPageIndex === pIdx ? 'active' : ''}`}
              onClick={() => setSelectedPageIndex(pIdx)}
            >
              Pg {pIdx + 1}
            </button>
          ))}
        </div>
      </div>

      {/* Navbar Right: Downloads, Print, Branding, AI Prompt, Zoom */}
      <div className="navbar-right">
        {/* Zoom Controls */}
        <div className="zoom-controls">
          <button
            className="zoom-btn"
            onClick={() => setZoom(Math.max(0.5, Number((zoom - 0.05).toFixed(2))))}
            title="Zoom Out Preview"
          >
            <ZoomOut size={13} />
          </button>
          <span className="zoom-value" onClick={() => setZoom(1.0)} title="Reset Zoom">
            {Math.round(zoom * 100)}%
          </span>
          <button
            className="zoom-btn"
            onClick={() => setZoom(Math.min(1.4, Number((zoom + 0.05).toFixed(2))))}
            title="Zoom In Preview"
          >
            <ZoomIn size={13} />
          </button>
        </div>

        {/* Download PDF Button (Requirement 11) */}
        <button
          className="nav-btn nav-btn-download-pdf"
          onClick={onDownloadPDF}
          disabled={isExporting}
          title="Download all pages in one PDF matching selected preset (Scale 2x)"
        >
          <FileDown size={15} />
          <span>{isExporting ? 'Exporting...' : 'PDF'}</span>
        </button>

        {/* Download ZIP Button (Requirement 3) */}
        <button
          className="nav-btn nav-btn-secondary"
          onClick={onDownloadZIP}
          disabled={isExporting}
          title="Download ZIP with 1200px wide PNG per page (Chapter-2_Page-01.png...)"
        >
          <Archive size={14} />
          <span>ZIP</span>
        </button>

        {/* Download PNG Button (Requirement 11) */}
        <button
          className="nav-btn nav-btn-secondary"
          onClick={onDownloadPNG}
          disabled={isExporting}
          title="Download each page as high-res PNG image"
        >
          <ImageIcon size={14} />
          <span>PNG</span>
        </button>

        {/* Print Button (Requirement 11) */}
        <button
          className="nav-btn nav-btn-secondary"
          onClick={onPrint}
          title="Print pages (Print color adjust exact)"
        >
          <Printer size={15} />
          <span>Print</span>
        </button>

        {/* AI Prompt Modal Trigger */}
        <button
          className="nav-btn nav-btn-ai"
          onClick={onOpenAIPrompt}
          title="Generate AI prompt for any subject"
        >
          <Sparkles size={15} />
          <span>AI</span>
        </button>

        {/* Branding Settings Trigger */}
        <button
          className="nav-btn nav-btn-secondary"
          onClick={onOpenBranding}
          title="Customize Teacher Name, Channel Logo & Contact Info"
        >
          <Settings size={15} />
          <span>Branding</span>
        </button>

        {/* Save / Export Raw Notes Text File */}
        <button
          className="nav-btn nav-btn-icon-only"
          onClick={onExportNotes}
          title="Save raw notes text (.txt)"
        >
          <Download size={14} />
        </button>

        {/* Open Raw Notes File */}
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: 'none' }}
          accept=".txt,.notes,.md"
          onChange={handleFileUpload}
        />
        <button
          className="nav-btn nav-btn-icon-only"
          onClick={() => fileInputRef.current?.click()}
          title="Load raw notes file"
        >
          <Upload size={14} />
        </button>
      </div>
    </header>
  );
}
