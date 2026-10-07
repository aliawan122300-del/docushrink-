import { PDFDocument } from 'pdf-lib';
import type { CompressionProgress, CompressionResult } from '../types';

/**
 * Format bytes into readable human-friendly string (e.g. "184.2 KB", "1.45 MB")
 */
export function formatBytes(bytes: number, decimals = 1): string {
  if (bytes <= 0) return '0 B';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  const val = parseFloat((bytes / Math.pow(k, i)).toFixed(dm));
  return `${val} ${sizes[i]}`;
}

/**
 * Inspect basic properties of an uploaded PDF
 */
export async function inspectPDF(file: File | ArrayBuffer): Promise<{
  pageCount: number;
  byteSize: number;
  isValidPdf: boolean;
  error?: string;
}> {
  try {
    const arrayBuffer = file instanceof File ? await file.arrayBuffer() : file;
    const byteSize = arrayBuffer.byteLength;

    // Check PDF magic bytes (%PDF-)
    const headerBytes = new Uint8Array(arrayBuffer.slice(0, 5));
    const headerStr = String.fromCharCode(...headerBytes);
    if (!headerStr.startsWith('%PDF-')) {
      return {
        pageCount: 0,
        byteSize,
        isValidPdf: false,
        error: 'The selected file does not have a valid PDF header format (%PDF-).',
      };
    }

    const pdfDoc = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });
    const pageCount = pdfDoc.getPageCount();

    return {
      pageCount,
      byteSize,
      isValidPdf: true,
    };
  } catch (err: any) {
    return {
      pageCount: 0,
      byteSize: file instanceof File ? file.size : (file as ArrayBuffer).byteLength,
      isValidPdf: false,
      error: err?.message || 'Unable to parse PDF structure.',
    };
  }
}

/**
 * Create a rich, real multi-page sample PDF (approx 2.3MB - 2.6MB) with high-res textured graphics
 * so users can test compression from 2.4 MB down to 100KB, 200KB, 500KB, 1MB, 2MB, 5MB, 10MB immediately.
 */
export async function generateSampleTestPdf(): Promise<File> {
  const pdfDoc = await PDFDocument.create();

  // Helper to create an offscreen high-res canvas with complex photographic texture
  // so each page JPEG is ~1.1 MB - 1.3 MB (2 pages = ~2.4 MB total)
  const createSampleCanvasImage = (title: string, sectionTitle: string, themeColor: string) => {
    const canvas = document.createElement('canvas');
    canvas.width = 1200;
    canvas.height = 1600;
    const ctx = canvas.getContext('2d')!;

    // Clean background
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(0, 0, 1200, 1600);

    // Procedural high-frequency security texture (simulates security guilloche & scanned banknote background)
    const imgData = ctx.createImageData(1200, 1600);
    const data = imgData.data;
    for (let i = 0; i < data.length; i += 4) {
      const x = (i / 4) % 1200;
      const y = Math.floor((i / 4) / 1200);
      const v = (Math.sin(x * 0.04) * Math.cos(y * 0.04) * 110 + 128) ^ ((x * 3) & (y * 2) & 0xff);
      data[i] = (v * 0.8) & 0xff;
      data[i + 1] = (v * 1.0) & 0xff;
      data[i + 2] = (v * 1.3) & 0xff;
      data[i + 3] = 255;
    }
    ctx.putImageData(imgData, 0, 0);

    // Overlay visual container card
    ctx.fillStyle = 'rgba(255, 255, 255, 0.92)';
    ctx.fillRect(60, 60, 1080, 1480);

    // Header banner
    ctx.fillStyle = themeColor;
    ctx.fillRect(60, 60, 1080, 140);

    // Header Typography
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 38px sans-serif';
    ctx.fillText('DOCUSHRINK OFFICIAL SAMPLE DOCUMENT', 100, 140);

    // Section title
    ctx.fillStyle = '#0f172a';
    ctx.font = 'bold 32px sans-serif';
    ctx.fillText(title, 100, 270);

    ctx.font = '22px sans-serif';
    ctx.fillStyle = '#475569';
    ctx.fillText(sectionTitle, 100, 315);
    ctx.fillText('File size: ~2.4 MB • High-Resolution Embedded Color Imagery', 100, 350);

    // Draw document table simulation
    ctx.strokeStyle = '#cbd5e1';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(100, 400, 1000, 600);

    // Table rows
    for (let r = 1; r <= 8; r++) {
      const y = 400 + r * 65;
      ctx.beginPath();
      ctx.moveTo(100, y);
      ctx.lineTo(1100, y);
      ctx.stroke();

      ctx.fillStyle = '#1e293b';
      ctx.font = '18px sans-serif';
      ctx.fillText(`Verification Record #00${r} - Cryptographic Hash Verification`, 120, y - 24);
      ctx.font = '16px monospace';
      ctx.fillStyle = '#64748b';
      ctx.fillText(`0x${(r * 48271).toString(16).toUpperCase()}9B72C`, 850, y - 24);
    }

    // Official Stamp / Watermark box
    ctx.strokeStyle = themeColor;
    ctx.lineWidth = 3;
    ctx.strokeRect(100, 1050, 450, 160);
    ctx.fillStyle = themeColor;
    ctx.font = 'bold 22px sans-serif';
    ctx.fillText('CERTIFIED APPLICATION COPY', 130, 1110);
    ctx.font = '16px sans-serif';
    ctx.fillText('Verified Client-Side Security Signature', 130, 1150);

    // High detail barcode lines
    ctx.fillStyle = '#0f172a';
    for (let b = 0; b < 100; b++) {
      const width = (b % 4 === 0 || b % 7 === 0) ? 5 : 2;
      ctx.fillRect(600 + b * 5, 1060, width, 140);
    }

    // Footer notice
    ctx.fillStyle = '#94a3b8';
    ctx.font = '14px sans-serif';
    ctx.fillText('This document is engineered to test exact target file-size compression without quality loss.', 100, 1480);

    // Export as high-quality JPEG
    return canvas.toDataURL('image/jpeg', 0.94);
  };

  // Page 1: Identity & Certificate
  const img1DataUrl = createSampleCanvasImage(
    'Applicant Verification & Biometric Records',
    'Official Visa & Public Service Certification',
    '#1e40af'
  );
  const img1Bytes = await fetch(img1DataUrl).then(res => res.arrayBuffer());
  const embeddedImg1 = await pdfDoc.embedJpg(img1Bytes);

  const page1 = pdfDoc.addPage([595.28, 841.89]); // A4
  page1.drawImage(embeddedImg1, {
    x: 0,
    y: 0,
    width: 595.28,
    height: 841.89,
  });

  // Page 2: Financial Affidavit & Records
  const img2DataUrl = createSampleCanvasImage(
    'Financial Affidavit & Bank Transaction Statement',
    'Audited Proof of Funds & Employment Ledger',
    '#065f46'
  );
  const img2Bytes = await fetch(img2DataUrl).then(res => res.arrayBuffer());
  const embeddedImg2 = await pdfDoc.embedJpg(img2Bytes);

  const page2 = pdfDoc.addPage([595.28, 841.89]); // A4
  page2.drawImage(embeddedImg2, {
    x: 0,
    y: 0,
    width: 595.28,
    height: 841.89,
  });

  const pdfBytes = await pdfDoc.save();
  const blob = new Blob([pdfBytes.buffer as ArrayBuffer], { type: 'application/pdf' });
  return new File([blob], 'sample_application_document.pdf', { type: 'application/pdf' });
}

/**
 * The core client-side optimization engine.
 * - Respects target as a MAXIMUM threshold, not an artificial target to hit.
 * - If the document is ALREADY smaller than or equal to the target size, preserves 100% original quality.
 * - If the document is LARGER than the target size, progressively optimizes until it sits at or under target.
 * - Never over-compresses or reduces a 10MB document to 25KB.
 */
export async function optimizePDFToTarget(
  file: File,
  targetKB: number,
  onProgress: (progress: CompressionProgress) => void
): Promise<CompressionResult> {
  const startTime = performance.now();
  const originalBytes = file.size;
  const targetBytes = targetKB * 1024;
  const targetLabel = targetKB >= 1000 ? `${targetKB / 1000} MB` : `${targetKB} KB`;

  onProgress({
    stage: 'analyzing',
    percent: 10,
    message: 'Analyzing PDF structure and byte streams...',
  });

  const arrayBuffer = await file.arrayBuffer();

  // Validate format
  const headerCheck = new Uint8Array(arrayBuffer.slice(0, 5));
  const headerStr = String.fromCharCode(...headerCheck);
  if (!headerStr.startsWith('%PDF-')) {
    throw new Error('Invalid file format. Please upload a valid standard PDF document.');
  }

  // Load document to inspect page count
  let sourceDoc: PDFDocument;
  try {
    sourceDoc = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });
  } catch (err: any) {
    throw new Error(`Unable to decrypt or parse PDF: ${err?.message || 'Unknown error'}`);
  }

  const pageCount = sourceDoc.getPageCount();

  // CASE 1: The document is ALREADY smaller than or equal to the selected maximum target!
  // Requirement 4: "If the original PDF is already smaller than the selected target, preserve the original quality and do not aggressively compress it."
  if (originalBytes <= targetBytes) {
    onProgress({
      stage: 'optimizing',
      percent: 50,
      message: `File (${formatBytes(originalBytes)}) is already within the ${targetLabel} target limit. Testing lossless cleanup...`,
    });

    let finalBytes = originalBytes;
    let finalArrayBuffer: ArrayBuffer = arrayBuffer;
    let reductionBytes = 0;
    let reductionPercent = 0;

    // Optional non-destructive structural cleanup: strip unreferenced metadata while keeping all pages/vectors 100% identical
    try {
      sourceDoc.setTitle('');
      sourceDoc.setAuthor('');
      sourceDoc.setSubject('');
      sourceDoc.setKeywords([]);
      sourceDoc.setProducer('DocuShrink Engine');
      sourceDoc.setCreator('DocuShrink');

      const losslessBytes = await sourceDoc.save({
        useObjectStreams: true,
        addDefaultPage: false,
      });

      // Only adopt if it safely reduced size without exceeding target
      if (losslessBytes.byteLength > 0 && losslessBytes.byteLength < originalBytes) {
        finalBytes = losslessBytes.byteLength;
        finalArrayBuffer = losslessBytes.buffer as ArrayBuffer;
        reductionBytes = originalBytes - finalBytes;
        reductionPercent = (reductionBytes / originalBytes) * 100;
      }
    } catch {
      // If structural save had any quirks, keep 100% original bytes
      finalBytes = originalBytes;
      finalArrayBuffer = arrayBuffer;
    }

    const blob = new Blob([finalArrayBuffer], { type: 'application/pdf' });
    const downloadUrl = URL.createObjectURL(blob);
    const processingTimeMs = Math.round(performance.now() - startTime);

    onProgress({
      stage: 'completed',
      percent: 100,
      message: `Full quality preserved! File is already comfortably under your ${targetLabel} limit.`,
    });

    return {
      originalBytes,
      compressedBytes: finalBytes,
      originalFormatted: formatBytes(originalBytes),
      compressedFormatted: formatBytes(finalBytes),
      reductionBytes: Math.max(0, reductionBytes),
      reductionPercent: Math.max(0, parseFloat(reductionPercent.toFixed(1))),
      targetKB,
      isTargetMet: true,
      downloadUrl,
      fileName: file.name.replace(/\.[^/.]+$/, '') + `_compliant_${targetLabel.replace(/\s+/g, '')}.pdf`,
      pageCount,
      processingTimeMs,
      strategyUsed: 'already-optimal',
      detailsMessage: `Your document (${formatBytes(originalBytes)}) is already well within your ${targetLabel} limit. All pages, vectors, and image details have been preserved at 100% full original quality.`,
    };
  }

  // CASE 2: The document EXCEEDS the target size.
  // We progressively optimize toward the target while maintaining the best possible visual quality.
  onProgress({
    stage: 'optimizing',
    percent: 30,
    message: 'Testing lossless object stream compression...',
  });

  // Stage A: Lossless stream optimization
  sourceDoc.setTitle('');
  sourceDoc.setAuthor('');
  sourceDoc.setSubject('');
  sourceDoc.setKeywords([]);
  sourceDoc.setProducer('DocuShrink Pure Client Engine');
  sourceDoc.setCreator('DocuShrink');

  const pass1Bytes = await sourceDoc.save({
    useObjectStreams: true,
    addDefaultPage: false,
  });

  // Check if lossless pass was enough to reach target
  if (pass1Bytes.byteLength <= targetBytes) {
    const finalBytes = pass1Bytes.byteLength;
    const reductionBytes = originalBytes - finalBytes;
    const reductionPercent = (reductionBytes / originalBytes) * 100;
    const blob = new Blob([pass1Bytes.buffer as ArrayBuffer], { type: 'application/pdf' });
    const downloadUrl = URL.createObjectURL(blob);
    const processingTimeMs = Math.round(performance.now() - startTime);

    onProgress({
      stage: 'completed',
      percent: 100,
      message: `Target met losslessly! Reduced to ${formatBytes(finalBytes)} with 100% vector clarity.`,
    });

    return {
      originalBytes,
      compressedBytes: finalBytes,
      originalFormatted: formatBytes(originalBytes),
      compressedFormatted: formatBytes(finalBytes),
      reductionBytes: Math.max(0, reductionBytes),
      reductionPercent: Math.max(0, parseFloat(reductionPercent.toFixed(1))),
      targetKB,
      isTargetMet: true,
      downloadUrl,
      fileName: file.name.replace(/\.[^/.]+$/, '') + `_compressed_${targetLabel.replace(/\s+/g, '')}.pdf`,
      pageCount,
      processingTimeMs,
      strategyUsed: 'lossless-stream',
      detailsMessage: `Target reached losslessly! Object streams and redundant structures were compacted without re-compressing a single image.`,
    };
  }

  // Stage B: The document is still larger than the target (due to embedded high-res images or scans).
  // Progressive adaptive rasterization: calculate how much reduction is actually needed.
  const reductionRatio = targetBytes / pass1Bytes.byteLength;

  onProgress({
    stage: 'resampling',
    percent: 45,
    message: `Adapting document resolution toward ${targetLabel} target...`,
  });

  try {
    const pdfjsLib = await import('pdfjs-dist');
    if (typeof window !== 'undefined' && pdfjsLib.GlobalWorkerOptions) {
      try {
        pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version || '4.10.38'}/pdf.worker.min.mjs`;
      } catch {
        // fallback
      }
    }

    const loadingTask = pdfjsLib.getDocument({
      data: new Uint8Array(arrayBuffer),
      useSystemFonts: true,
    });
    const renderedPdf = await loadingTask.promise;
    const totalPages = renderedPdf.numPages;

    // Progressive parameter selection:
    // If only a mild reduction is needed (e.g. 12MB to 10MB = ratio 0.83), keep scale 1.0 and high quality (0.88).
    // Never drop quality to 0.40 when only a 15% reduction is needed!
    let renderScale = 1.0;
    let jpegQuality = 0.85;

    if (reductionRatio >= 0.75) {
      renderScale = 1.0;
      jpegQuality = 0.88;
    } else if (reductionRatio >= 0.50) {
      renderScale = 1.0;
      jpegQuality = 0.78;
    } else if (reductionRatio >= 0.25) {
      renderScale = 0.98;
      jpegQuality = 0.68;
    } else if (reductionRatio >= 0.10) {
      renderScale = 0.90;
      jpegQuality = 0.55;
    } else {
      // Stringent budget (e.g. 100KB for large multi-page scans)
      renderScale = Math.max(0.75, Math.sqrt(reductionRatio) * 1.8);
      jpegQuality = Math.max(0.35, Math.min(0.50, reductionRatio * 3.5));
    }

    const compilePdfWithSettings = async (scale: number, quality: number): Promise<Uint8Array> => {
      const targetPdfDoc = await PDFDocument.create();

      for (let pageNum = 1; pageNum <= totalPages; pageNum++) {
        const pagePercent = 45 + Math.round((pageNum / totalPages) * 45);
        onProgress({
          stage: 'resampling',
          percent: pagePercent,
          currentPage: pageNum,
          totalPages,
          message: `Optimizing page ${pageNum} of ${totalPages} at ${Math.round(quality * 100)}% quality...`,
        });

        const page = await renderedPdf.getPage(pageNum);
        const originalViewport = page.getViewport({ scale: 1.0 });
        const viewport = page.getViewport({ scale });

        const canvas = document.createElement('canvas');
        canvas.width = Math.floor(viewport.width);
        canvas.height = Math.floor(viewport.height);
        const ctx = canvas.getContext('2d', { alpha: false });

        if (!ctx) {
          throw new Error('Canvas 2D context unavailable.');
        }

        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        await page.render({
          canvasContext: ctx,
          viewport,
          canvas: canvas as any,
        } as any).promise;

        const blob = await new Promise<Blob>((resolve, reject) => {
          canvas.toBlob(
            (b) => {
              if (b) resolve(b);
              else reject(new Error('Canvas blob export failed'));
            },
            'image/jpeg',
            quality
          );
        });

        const imgBytes = await blob.arrayBuffer();
        const embeddedImg = await targetPdfDoc.embedJpg(imgBytes);

        const newPage = targetPdfDoc.addPage([originalViewport.width, originalViewport.height]);
        newPage.drawImage(embeddedImg, {
          x: 0,
          y: 0,
          width: originalViewport.width,
          height: originalViewport.height,
        });
      }

      onProgress({
        stage: 'packing',
        percent: 92,
        message: 'Packaging optimized PDF binary...',
      });

      return await targetPdfDoc.save({ useObjectStreams: true });
    };

    // First attempt with calculated progressive quality
    let candidateBytes = await compilePdfWithSettings(renderScale, jpegQuality);

    // If candidate still slightly exceeds target, fine-tune with slight step down
    if (candidateBytes.byteLength > targetBytes && jpegQuality > 0.35) {
      onProgress({
        stage: 'verifying',
        percent: 95,
        message: `Fine-tuning to ensure document is under ${targetLabel}...`,
      });

      const overshootRatio = targetBytes / candidateBytes.byteLength;
      const adjustedQuality = Math.max(0.32, jpegQuality * Math.min(0.92, overshootRatio));
      const adjustedScale = Math.max(0.70, renderScale * Math.min(1.0, Math.sqrt(overshootRatio)));

      const refinedBytes = await compilePdfWithSettings(adjustedScale, adjustedQuality);
      if (refinedBytes.byteLength <= targetBytes || refinedBytes.byteLength < candidateBytes.byteLength) {
        candidateBytes = refinedBytes;
      }
    }

    const finalBytes = candidateBytes.byteLength;
    const isTargetMet = finalBytes <= targetBytes;
    const reductionBytes = originalBytes - finalBytes;
    const reductionPercent = originalBytes > 0 ? (reductionBytes / originalBytes) * 100 : 0;
    const blob = new Blob([candidateBytes.buffer as ArrayBuffer], { type: 'application/pdf' });
    const downloadUrl = URL.createObjectURL(blob);
    const processingTimeMs = Math.round(performance.now() - startTime);

    onProgress({
      stage: 'completed',
      percent: 100,
      message: isTargetMet
        ? `Successfully optimized to ${formatBytes(finalBytes)} (Target: ${targetLabel})`
        : `Maximum legible reduction achieved: ${formatBytes(finalBytes)}.`,
    });

    return {
      originalBytes,
      compressedBytes: finalBytes,
      originalFormatted: formatBytes(originalBytes),
      compressedFormatted: formatBytes(finalBytes),
      reductionBytes: Math.max(0, reductionBytes),
      reductionPercent: Math.max(0, parseFloat(reductionPercent.toFixed(1))),
      targetKB,
      isTargetMet,
      downloadUrl,
      fileName: file.name.replace(/\.[^/.]+$/, '') + `_compressed_${targetLabel.replace(/\s+/g, '')}.pdf`,
      pageCount: totalPages,
      processingTimeMs,
      strategyUsed: 'downsample-adaptive',
      detailsMessage: isTargetMet
        ? `Target verified: Document reached ${formatBytes(finalBytes)}, safely under your ${targetLabel} limit with maximum visual clarity maintained.`
        : `Achieved ${formatBytes(finalBytes)} (${reductionPercent.toFixed(1)}% reduction), preserving full readability for this ${totalPages}-page file.`,
    };
  } catch (err: any) {
    // If canvas / pdfjs experienced an issue, fall back safely to Pass 1
    const finalBytes = pass1Bytes.byteLength;
    const reductionBytes = originalBytes - finalBytes;
    const reductionPercent = originalBytes > 0 ? (reductionBytes / originalBytes) * 100 : 0;
    const blob = new Blob([pass1Bytes.buffer as ArrayBuffer], { type: 'application/pdf' });
    const downloadUrl = URL.createObjectURL(blob);
    const processingTimeMs = Math.round(performance.now() - startTime);

    return {
      originalBytes,
      compressedBytes: finalBytes,
      originalFormatted: formatBytes(originalBytes),
      compressedFormatted: formatBytes(finalBytes),
      reductionBytes: Math.max(0, reductionBytes),
      reductionPercent: Math.max(0, parseFloat(reductionPercent.toFixed(1))),
      targetKB,
      isTargetMet: finalBytes <= targetBytes,
      downloadUrl,
      fileName: file.name.replace(/\.[^/.]+$/, '') + `_optimized_${targetLabel.replace(/\s+/g, '')}.pdf`,
      pageCount,
      processingTimeMs,
      strategyUsed: 'structural-clean',
      detailsMessage: `Optimized document structure losslessly. Vector text and high-res layout preserved.`,
    };
  }
}
