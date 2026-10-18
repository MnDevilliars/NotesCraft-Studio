import { toPng } from 'html-to-image';
import { jsPDF } from 'jspdf';
import JSZip from 'jszip';

/**
 * Creates an off-screen container, clones each notebook page at 100% size
 * matching the exact preset dimensions (e.g. 600 x 1067 px for Mobile 9:16),
 * and captures each page as exactly ONE high-resolution image without slicing.
 */
async function captureFullPageSlices(pageElements, preset, onProgress) {
  await document.fonts.ready;

  // Create clean offscreen mount container attached to body
  const offscreenContainer = document.createElement('div');
  offscreenContainer.id = 'offscreen-export-container';
  offscreenContainer.style.position = 'fixed';
  offscreenContainer.style.left = '-9999px';
  offscreenContainer.style.top = '0';
  offscreenContainer.style.width = `${preset.width}px`;
  offscreenContainer.style.height = `${preset.height}px`;
  offscreenContainer.style.overflow = 'hidden';
  offscreenContainer.style.zIndex = '-9999';
  offscreenContainer.style.opacity = '1';
  offscreenContainer.style.pointerEvents = 'none';
  document.body.appendChild(offscreenContainer);

  const pageSlices = [];

  try {
    for (let i = 0; i < pageElements.length; i++) {
      if (onProgress) {
        onProgress(i + 1, pageElements.length, `Capturing Sheet ${i + 1} of ${pageElements.length}...`);
      }

      const origEl = pageElements[i];
      const clone = origEl.cloneNode(true);

      // Remove overflow warning badges and any UI controls from export
      clone.querySelectorAll('.page-overflow-badge, .no-print').forEach((el) => el.remove());

      // Guarantee exact preset dimensions: 1 page = 1 sheet, no extra margin, no scaling
      clone.style.transform = 'none';
      clone.style.zoom = '1';
      clone.style.margin = '0';
      // Reset inner scale wrapper inside clone initially to measure true natural height
      const innerWrapper = clone.querySelector('.page-scale-wrapper');
      if (innerWrapper) {
        innerWrapper.style.transform = 'none';
        innerWrapper.style.height = '100%';
        innerWrapper.style.display = 'flex';
        innerWrapper.style.flexDirection = 'column';
        innerWrapper.style.justifyContent = 'space-between';
      }

      // First mount with natural height to measure true content height
      clone.style.width = `${preset.width}px`;
      clone.style.height = 'auto';
      clone.style.maxHeight = 'none';
      clone.style.overflow = 'visible';

      offscreenContainer.innerHTML = '';
      offscreenContainer.appendChild(clone);

      // Brief delay to ensure fonts and layout settle in DOM
      await new Promise((resolve) => setTimeout(resolve, 80));

      const naturalHeight = clone.scrollHeight || clone.offsetHeight;
      const targetHeight = preset.height;

      // Fail-Safe Protection: If content is taller than target page height,
      // auto-scale down smoothly so 100% of content, graphs, and the pinned footer fit without cutting off!
      if (naturalHeight > targetHeight + 2) {
        const fitScale = Math.max(0.55, (targetHeight - 6) / naturalHeight);
        if (innerWrapper) {
          innerWrapper.style.transform = `scale(${fitScale})`;
          innerWrapper.style.transformOrigin = 'top center';
          innerWrapper.style.width = '100%';
        }
      }

      // Lock to exact preset dimensions for pixel-perfect PDF export (zero margin, exact bounds)
      clone.style.width = `${preset.width}px`;
      clone.style.height = `${preset.height}px`;
      clone.style.maxHeight = `${preset.height}px`;
      clone.style.overflow = 'hidden';

      // Capture exact page at pixelRatio 2 (e.g. 1200 x 2134 px for Mobile 9:16)
      const dataUrl = await toPng(clone, {
        width: preset.width,
        height: preset.height,
        pixelRatio: 2,
        cacheBust: true,
        style: {
          transform: 'none',
          zoom: '1',
          fontKerning: 'none',
          letterSpacing: 'normal',
          textRendering: 'geometricPrecision',
          width: `${preset.width}px`,
          height: `${preset.height}px`,
          maxHeight: `${preset.height}px`,
          overflow: 'hidden',
        },
      });

      // Exactly ONE image per notebook page
      pageSlices.push({
        dataUrl,
        width: preset.width,
        height: preset.height,
      });
    }
  } finally {
    if (offscreenContainer.parentNode) {
      document.body.removeChild(offscreenContainer);
    }
  }

  return pageSlices;
}

/**
 * Extracts a clean chapter prefix like "Chapter-2"
 */
function getChapterCode(chapterPrefix, chapterName) {
  const match = (chapterPrefix || chapterName || '').match(/chapter\s*(\d+)/i);
  if (match) {
    return `Chapter-${match[1]}`;
  }
  return (
    (chapterPrefix || chapterName || 'Chapter')
      .replace(/[^a-zA-Z0-9]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '') || 'Chapter'
  );
}

/**
 * Helper to obtain all notebook pages for export.
 * Prefers the dedicated #export-mount-container where all pages are always mounted,
 * falling back to .notebook-page in the DOM.
 */
function getAllExportPageElements() {
  const mountPages = Array.from(document.querySelectorAll('#export-mount-container .notebook-page'));
  if (mountPages.length > 0) {
    return mountPages;
  }
  return Array.from(document.querySelectorAll('.notebook-page'));
}

/**
 * Requirement 1: High-Fidelity PDF Export
 * - Exactly one image per notebook page
 * - Exact page bounds with zero margins
 * - html-to-image with geometricPrecision
 * - No canvas slicing
 */
export async function exportToPDF({
  chapterPrefix,
  chapterName,
  preset,
  onProgress,
}) {
  try {
    const pageElements = getAllExportPageElements();
    if (!pageElements.length) {
      alert('No notebook pages found to export.');
      return false;
    }

    const slices = await captureFullPageSlices(pageElements, preset, onProgress);
    if (!slices.length) return false;

    if (onProgress) {
      onProgress(slices.length, slices.length, 'Assembling PDF document...');
    }

    const { width, height } = preset;
    const orientation = width > height ? 'landscape' : 'portrait';

    const pdf = new jsPDF({
      orientation,
      unit: 'px',
      format: [width, height],
      hotfixes: ['px_scaling'],
    });

    for (let i = 0; i < slices.length; i++) {
      if (i > 0) {
        pdf.addPage([width, height], orientation);
      }
      pdf.addImage(slices[i].dataUrl, 'PNG', 0, 0, width, height, undefined, 'FAST');
    }

    const chapterCode = getChapterCode(chapterPrefix, chapterName);
    pdf.save(`${chapterCode}_Notes.pdf`);
    return true;
  } catch (error) {
    console.error('PDF export failed:', error);
    alert('Failed to generate PDF: ' + error.message);
    return false;
  }
}

/**
 * Requirement 1 & 3: Download ZIP of Images
 * - Exactly one image per notebook page
 * - 1200 px wide per page for Mobile 9:16
 * - Named Chapter-2_Page-01.png, Chapter-2_Page-02.png, etc.
 * - No slicing
 */
export async function exportToZIP({
  chapterPrefix,
  chapterName,
  preset,
  onProgress,
}) {
  try {
    const pageElements = getAllExportPageElements();
    if (!pageElements.length) {
      alert('No notebook pages found to export.');
      return false;
    }

    const slices = await captureFullPageSlices(pageElements, preset, onProgress);
    if (!slices.length) return false;

    if (onProgress) {
      onProgress(slices.length, slices.length, 'Packaging ZIP archive...');
    }

    const zip = new JSZip();
    const chapterCode = getChapterCode(chapterPrefix, chapterName);

    slices.forEach((slice, index) => {
      const pageNumStr = String(index + 1).padStart(2, '0');
      const filename = `${chapterCode}_Page-${pageNumStr}.png`;
      const base64Data = slice.dataUrl.replace(/^data:image\/png;base64,/, '');
      zip.file(filename, base64Data, { base64: true });
    });

    const zipBlob = await zip.generateAsync({ type: 'blob' });
    const url = URL.createObjectURL(zipBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${chapterCode}_Notes_Images.zip`;
    link.click();
    URL.revokeObjectURL(url);
    return true;
  } catch (error) {
    console.error('ZIP export failed:', error);
    alert('Failed to generate ZIP: ' + error.message);
    return false;
  }
}

/**
 * Download individual PNG files (one image per notebook page)
 */
export async function exportToPNG({
  chapterPrefix,
  chapterName,
  preset,
  onProgress,
}) {
  try {
    const pageElements = getAllExportPageElements();
    if (!pageElements.length) {
      alert('No notebook pages found to export.');
      return false;
    }

    const slices = await captureFullPageSlices(pageElements, preset, onProgress);
    if (!slices.length) return false;

    const chapterCode = getChapterCode(chapterPrefix, chapterName);

    for (let i = 0; i < slices.length; i++) {
      const pageNumStr = String(i + 1).padStart(2, '0');
      const filename = `${chapterCode}_Page-${pageNumStr}.png`;
      const link = document.createElement('a');
      link.href = slices[i].dataUrl;
      link.download = filename;
      link.click();
      await new Promise((r) => setTimeout(r, 200));
    }

    return true;
  } catch (error) {
    console.error('PNG export failed:', error);
    alert('Failed to export PNG: ' + error.message);
    return false;
  }
}
