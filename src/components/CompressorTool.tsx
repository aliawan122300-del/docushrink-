import React, { useState, useRef, useEffect } from 'react';
import {
  Upload,
  FileCheck,
  CheckCircle2,
  AlertCircle,
  Download,
  RotateCcw,
  Sparkles,
  Sliders,
  Eye,
  Shield,
  Clock,
  ArrowDown,
  Info,
  Layers,
  Check,
  FileText
} from 'lucide-react';
import type { TargetPresetId, CompressionProgress, CompressionResult } from '../types';
import { TARGET_PRESETS } from '../data/seoLandingPages';
import {
  optimizePDFToTarget,
  inspectPDF,
  formatBytes,
  generateSampleTestPdf
} from '../lib/pdfOptimizer';

interface CompressorToolProps {
  initialTargetPresetId?: TargetPresetId;
  initialTargetKB?: number;
  onTargetChange?: (presetId: TargetPresetId, targetKB: number) => void;
}

export const CompressorTool: React.FC<CompressorToolProps> = ({
  initialTargetPresetId = '500kb',
  initialTargetKB = 500,
  onTargetChange,
}) => {
  // State
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileDetails, setFileDetails] = useState<{ pageCount: number; size: number } | null>(null);
  const [selectedPresetId, setSelectedPresetId] = useState<TargetPresetId>(initialTargetPresetId);
  const [targetKB, setTargetKB] = useState<number>(initialTargetKB);
  const [customKBInput, setCustomKBInput] = useState<number>(initialTargetKB);

  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState<CompressionProgress | null>(null);
  const [result, setResult] = useState<CompressionResult | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [isGeneratingSample, setIsGeneratingSample] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sync when initial target props change (e.g. navigation across landing pages)
  useEffect(() => {
    setSelectedPresetId(initialTargetPresetId);
    setTargetKB(initialTargetKB);
    setCustomKBInput(initialTargetKB);
    // If a file is already loaded and we changed the page target, clear previous result to allow re-compression
    if (result) {
      setResult(null);
    }
  }, [initialTargetPresetId, initialTargetKB]);

  const handleSelectPreset = (presetId: TargetPresetId) => {
    setSelectedPresetId(presetId);
    if (presetId === 'custom') {
      setTargetKB(customKBInput);
      onTargetChange?.('custom', customKBInput);
    } else {
      const preset = TARGET_PRESETS.find((p) => p.id === presetId);
      if (preset) {
        setTargetKB(preset.targetKB);
        setCustomKBInput(preset.targetKB);
        onTargetChange?.(preset.id, preset.targetKB);
      }
    }
    // If already compressed, reset result so user can re-compress for the new target
    if (result) {
      setResult(null);
    }
  };

  const handleCustomKBChange = (value: number) => {
    const sanitized = Math.max(50, Math.min(25000, value || 50));
    setCustomKBInput(sanitized);
    setTargetKB(sanitized);
    setSelectedPresetId('custom');
    onTargetChange?.('custom', sanitized);
    if (result) {
      setResult(null);
    }
  };

  const handleFileSelection = async (file: File) => {
    setErrorMessage(null);
    setResult(null);

    // Basic format check
    if (!file.name.toLowerCase().endsWith('.pdf') && file.type !== 'application/pdf') {
      setErrorMessage('Please select a valid PDF file. Images and documents should be converted to PDF first.');
      return;
    }

    if (file.size === 0) {
      setErrorMessage('The selected PDF file is empty (0 bytes).');
      return;
    }

    const inspection = await inspectPDF(file);
    if (!inspection.isValidPdf) {
      setErrorMessage(inspection.error || 'The file appears corrupted or is not a valid PDF.');
      return;
    }

    setSelectedFile(file);
    setFileDetails({
      pageCount: inspection.pageCount,
      size: inspection.byteSize,
    });
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileSelection(e.dataTransfer.files[0]);
    }
  };

  const handleLoadSamplePdf = async () => {
    try {
      setIsGeneratingSample(true);
      setErrorMessage(null);
      const sampleFile = await generateSampleTestPdf();
      await handleFileSelection(sampleFile);
    } catch (err: any) {
      setErrorMessage('Failed to generate sample PDF: ' + (err?.message || 'Unknown error'));
    } finally {
      setIsGeneratingSample(false);
    }
  };

  const handleStartCompression = async () => {
    if (!selectedFile) return;

    setIsProcessing(true);
    setErrorMessage(null);
    setResult(null);
    setProgress({
      stage: 'analyzing',
      percent: 5,
      message: 'Starting zero-upload optimization pipeline...',
    });

    try {
      const res = await optimizePDFToTarget(selectedFile, targetKB, (p) => {
        setProgress(p);
      });
      setResult(res);
    } catch (err: any) {
      setErrorMessage(err?.message || 'Compression failed. Please try a different target setting.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleReset = () => {
    setSelectedFile(null);
    setFileDetails(null);
    setResult(null);
    setProgress(null);
    setErrorMessage(null);
    setPreviewOpen(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Tool Container */}
      <div className="bg-white rounded-2xl border border-neutral-200 shadow-xl shadow-neutral-900/5 overflow-hidden transition-all">
        {/* Step Header Indicator */}
        <div className="bg-neutral-50/80 px-6 py-3.5 border-b border-neutral-200/80 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-neutral-600 font-medium">
            <span className="w-5 h-5 rounded-full bg-neutral-900 text-white flex items-center justify-center text-[11px] font-bold">
              {!selectedFile ? '1' : !result ? '2' : '3'}
            </span>
            <span>
              {!selectedFile
                ? 'Select or drag your PDF'
                : !result
                ? 'Confirm target size and optimize'
                : 'Verified optimization ready'}
            </span>
          </div>

          <div className="flex items-center gap-4 text-neutral-500">
            <div className="flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-emerald-600" />
              <span className="font-medium text-neutral-700">Client-Side Engine</span>
            </div>
            <span className="hidden sm:inline text-neutral-300">|</span>
            <span className="hidden sm:inline">No file size limits</span>
          </div>
        </div>

        <div className="p-6 sm:p-8 space-y-6">
          {/* STAGE 1: File Upload Dropzone (When no file is selected) */}
          {!selectedFile && (
            <div>
              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsDragOver(true);
                }}
                onDragLeave={() => setIsDragOver(false)}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`relative border-2 border-dashed rounded-xl p-8 sm:p-12 text-center cursor-pointer transition-all ${
                  isDragOver
                    ? 'border-neutral-900 bg-neutral-100/70 scale-[0.99]'
                    : 'border-neutral-300 hover:border-neutral-400 bg-neutral-50/40 hover:bg-neutral-50'
                }`}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,application/pdf"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      handleFileSelection(e.target.files[0]);
                    }
                  }}
                  className="hidden"
                />

                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-neutral-900 text-white flex items-center justify-center shadow-md shadow-neutral-900/10 group-hover:scale-105 transition-transform">
                  <Upload className="w-8 h-8 text-neutral-100" />
                </div>

                <h3 className="text-lg font-bold text-neutral-900 tracking-tight">
                  Choose a PDF or drag it here
                </h3>
                <p className="text-neutral-500 text-sm mt-1 max-w-md mx-auto">
                  Upload resumes, visa proofs, government forms, or scans. 100% private and processed on your device.
                </p>

                <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                  <button
                    type="button"
                    className="px-6 py-2.5 bg-neutral-900 hover:bg-neutral-800 text-white text-sm font-semibold rounded-lg shadow-sm transition-colors"
                  >
                    Select PDF File
                  </button>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleLoadSamplePdf();
                    }}
                    disabled={isGeneratingSample}
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-white hover:bg-neutral-100 text-neutral-700 border border-neutral-300 text-xs font-semibold rounded-lg transition-colors"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                    <span>{isGeneratingSample ? 'Generating sample...' : 'Try with 2.4 MB Sample PDF'}</span>
                  </button>
                </div>
              </div>

              {/* Trust & Guarantee Kicker */}
              <div className="mt-4 flex flex-wrap items-center justify-between text-xs text-neutral-500 gap-2 px-1">
                <span>Supports multi-page documents, scanned forms, photos & vector PDFs</span>
                <span className="text-emerald-700 font-medium">✓ Never stored in the cloud</span>
              </div>
            </div>
          )}

          {/* STAGE 2: Selected File Info & Target Selector */}
          {selectedFile && !result && (
            <div className="space-y-6">
              {/* File Card */}
              <div className="flex items-center justify-between p-4 rounded-xl bg-neutral-50 border border-neutral-200">
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="w-10 h-10 rounded-lg bg-neutral-900 text-white flex items-center justify-center shrink-0">
                    <FileText className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div className="min-w-0">
                    <div className="font-semibold text-neutral-900 text-sm truncate max-w-xs sm:max-w-md">
                      {selectedFile.name}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-neutral-500 mt-0.5 font-mono tabular-nums">
                      <span>{formatBytes(fileDetails?.size || selectedFile.size)}</span>
                      <span>·</span>
                      <span>{fileDetails?.pageCount || 1} {fileDetails?.pageCount === 1 ? 'page' : 'pages'}</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleReset}
                  disabled={isProcessing}
                  className="p-2 text-neutral-400 hover:text-neutral-700 transition-colors disabled:opacity-50"
                  title="Choose a different file"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>

              {/* Target Size Selector */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="text-sm font-semibold text-neutral-900 flex items-center gap-1.5">
                    <Sliders className="w-4 h-4 text-neutral-700" />
                    <span>Select Exact Target File Size</span>
                  </label>
                  <span className="text-xs text-neutral-500">
                    Target: <strong className="text-neutral-950 font-mono tabular-nums">{targetKB >= 1000 ? `${targetKB / 1000} MB` : `${targetKB} KB`}</strong> ({formatBytes(targetKB * 1024)})
                  </span>
                </div>

                {/* Preset Chips / Buttons */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {TARGET_PRESETS.map((preset) => {
                    const isSelected = selectedPresetId === preset.id;
                    return (
                      <button
                        key={preset.id}
                        type="button"
                        onClick={() => handleSelectPreset(preset.id)}
                        disabled={isProcessing}
                        className={`p-3 rounded-xl border text-left transition-all ${
                          isSelected
                            ? 'border-neutral-900 bg-neutral-900 text-white shadow-sm'
                            : 'border-neutral-200 bg-white hover:border-neutral-300 text-neutral-800'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-sm tracking-tight font-mono">
                            {preset.label}
                          </span>
                          {isSelected && <Check className="w-3.5 h-3.5 text-emerald-400" />}
                        </div>
                        <div
                          className={`text-[10px] mt-1 truncate ${
                            isSelected ? 'text-neutral-300' : 'text-neutral-500'
                          }`}
                        >
                          {preset.badge}
                        </div>
                      </button>
                    );
                  })}

                  {/* Custom Target Option */}
                  <button
                    type="button"
                    onClick={() => handleSelectPreset('custom')}
                    disabled={isProcessing}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      selectedPresetId === 'custom'
                        ? 'border-neutral-900 bg-neutral-900 text-white shadow-sm'
                        : 'border-neutral-200 bg-white hover:border-neutral-300 text-neutral-800'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-sm tracking-tight">Custom</span>
                      {selectedPresetId === 'custom' && <Check className="w-3.5 h-3.5 text-emerald-400" />}
                    </div>
                    <div
                      className={`text-[10px] mt-1 truncate ${
                        selectedPresetId === 'custom' ? 'text-neutral-300' : 'text-neutral-500'
                      }`}
                    >
                      Dial exact size
                    </div>
                  </button>
                </div>

                {/* Custom Target Slider & Direct Input (Visible when custom or active) */}
                {selectedPresetId === 'custom' && (
                  <div className="mt-4 p-4 rounded-xl bg-neutral-50 border border-neutral-200 space-y-3">
                    <div className="flex items-center justify-between gap-4">
                      <span className="text-xs text-neutral-600 font-medium">
                        Custom Kilobytes (KB):
                      </span>
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          min="50"
                          max="25000"
                          step="10"
                          value={customKBInput}
                          onChange={(e) => handleCustomKBChange(parseInt(e.target.value, 10))}
                          className="w-28 px-3 py-1.5 text-right font-mono font-semibold text-sm bg-white border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900 tabular-nums"
                        />
                        <span className="text-xs font-mono text-neutral-500">KB</span>
                      </div>
                    </div>

                    <input
                      type="range"
                      min="50"
                      max="10000"
                      step="25"
                      value={customKBInput}
                      onChange={(e) => handleCustomKBChange(parseInt(e.target.value, 10))}
                      className="w-full accent-neutral-900 cursor-pointer"
                    />

                    <div className="flex justify-between text-[11px] font-mono text-neutral-400">
                      <span>50 KB</span>
                      <span>500 KB</span>
                      <span>2 MB</span>
                      <span>5 MB</span>
                      <span>10 MB</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Progress Bar (Visible while compressing) */}
              {isProcessing && progress && (
                <div className="p-5 rounded-xl bg-neutral-50 border border-neutral-200 space-y-3">
                  <div className="flex items-center justify-between text-xs font-semibold text-neutral-800">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                      <span>{progress.message}</span>
                    </div>
                    <span className="font-mono tabular-nums">{progress.percent}%</span>
                  </div>

                  <div className="w-full h-2.5 bg-neutral-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-neutral-900 transition-all duration-300 rounded-full"
                      style={{ width: `${Math.max(5, progress.percent)}%` }}
                    />
                  </div>

                  <div className="text-[11px] text-neutral-500 flex items-center justify-between">
                    <span>Compressing locally in browser thread</span>
                    <span>Target: {targetKB} KB</span>
                  </div>
                </div>
              )}

              {/* Action Button */}
              {!isProcessing && (
                <button
                  type="button"
                  onClick={handleStartCompression}
                  className="w-full py-3.5 px-6 bg-neutral-900 hover:bg-neutral-800 text-white font-semibold rounded-xl transition-all shadow-md shadow-neutral-900/10 flex items-center justify-center gap-2 active:scale-[0.99]"
                >
                  <Sparkles className="w-4 h-4 text-emerald-400" />
                  <span>Compress to {targetKB >= 1000 ? `${targetKB / 1000} MB` : `${targetKB} KB`} Limit</span>
                </button>
              )}
            </div>
          )}

          {/* STAGE 3: Final Output & Download View */}
          {result && (
            <div className="space-y-6">
              {/* Status Banner */}
              <div
                className={`p-4 rounded-xl border flex items-start gap-3.5 ${
                  result.isTargetMet
                    ? 'bg-emerald-50/70 border-emerald-200 text-emerald-950'
                    : 'bg-amber-50/70 border-amber-200 text-amber-950'
                }`}
              >
                {result.isTargetMet ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                ) : (
                  <Info className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                )}
                <div>
                  <div className="font-bold text-sm">
                    {result.isTargetMet
                      ? result.strategyUsed === 'already-optimal'
                        ? `Target Met! File is ${result.compressedFormatted} (Under ${result.targetKB >= 1000 ? `${result.targetKB / 1000} MB` : `${result.targetKB} KB`} limit)`
                        : `Target Met! Compressed to ${result.compressedFormatted} (Under ${result.targetKB >= 1000 ? `${result.targetKB / 1000} MB` : `${result.targetKB} KB`} limit)`
                      : `Maximum Legible Reduction Achieved: ${result.compressedFormatted}`}
                  </div>
                  <div className="text-xs opacity-90 mt-0.5 leading-relaxed">
                    {result.detailsMessage}
                  </div>
                </div>
              </div>

              {/* Comparison Metric Card */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200">
                  <div className="text-xs text-neutral-500 font-medium">Original Size</div>
                  <div className="text-xl font-bold text-neutral-900 font-mono mt-1 tabular-nums">
                    {result.originalFormatted}
                  </div>
                  <div className="text-[11px] text-neutral-400 font-mono mt-0.5">
                    {result.originalBytes.toLocaleString()} bytes
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200">
                  <div className="text-xs text-neutral-500 font-medium">Final Size</div>
                  <div className="text-xl font-bold text-emerald-700 font-mono mt-1 tabular-nums">
                    {result.compressedFormatted}
                  </div>
                  <div className="text-[11px] text-neutral-400 font-mono mt-0.5">
                    {result.compressedBytes.toLocaleString()} bytes
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200">
                  <div className="text-xs text-neutral-500 font-medium">Reduction</div>
                  <div className="text-xl font-bold text-neutral-900 font-mono mt-1 flex items-center gap-1.5 tabular-nums">
                    <span>{result.reductionPercent > 0 ? `-${result.reductionPercent}%` : '0%'}</span>
                    {result.reductionPercent > 0 ? (
                      <ArrowDown className="w-4 h-4 text-emerald-600" />
                    ) : (
                      <Check className="w-4 h-4 text-emerald-600" />
                    )}
                  </div>
                  <div className="text-[11px] text-neutral-400 font-mono mt-0.5">
                    {result.reductionBytes > 0
                      ? `Saved ${formatBytes(result.reductionBytes)} in ${result.processingTimeMs}ms`
                      : `Full original fidelity preserved (${result.processingTimeMs}ms)`}
                  </div>
                </div>
              </div>

              {/* Download & Secondary Actions */}
              <div className="flex flex-col sm:flex-row items-center gap-3">
                <a
                  href={result.downloadUrl}
                  download={result.fileName}
                  className="w-full sm:flex-1 py-3.5 px-6 bg-neutral-900 hover:bg-neutral-800 text-white font-semibold rounded-xl transition-all shadow-md shadow-neutral-900/10 flex items-center justify-center gap-2 text-center"
                >
                  <Download className="w-4 h-4 text-emerald-400" />
                  <span>Download Compressed PDF ({result.compressedFormatted})</span>
                </a>

                <button
                  type="button"
                  onClick={() => setPreviewOpen(!previewOpen)}
                  className="w-full sm:w-auto py-3.5 px-5 bg-white hover:bg-neutral-100 text-neutral-800 border border-neutral-300 font-semibold rounded-xl transition-colors flex items-center justify-center gap-2 text-sm"
                >
                  <Eye className="w-4 h-4 text-neutral-600" />
                  <span>{previewOpen ? 'Hide Preview' : 'Preview Document'}</span>
                </button>

                <button
                  type="button"
                  onClick={handleReset}
                  className="w-full sm:w-auto py-3.5 px-5 bg-white hover:bg-neutral-100 text-neutral-700 border border-neutral-300 font-semibold rounded-xl transition-colors flex items-center justify-center gap-2 text-sm"
                  title="Compress another document"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span className="sm:hidden">Compress Another</span>
                </button>
              </div>

              {/* Inline PDF Preview Frame */}
              {previewOpen && (
                <div className="mt-4 border border-neutral-300 rounded-xl overflow-hidden bg-neutral-100 p-2">
                  <div className="flex items-center justify-between px-2 py-1.5 text-xs text-neutral-600 mb-2">
                    <span className="font-medium">Live In-Browser Document Preview</span>
                    <span className="font-mono text-[11px]">{result.pageCount} pages</span>
                  </div>
                  <iframe
                    src={result.downloadUrl}
                    title="Compressed PDF Preview"
                    className="w-full h-96 rounded-lg border border-neutral-300 bg-white"
                  />
                </div>
              )}

              {/* Verification & Trust Footer */}
              <div className="p-3 rounded-lg bg-neutral-50 border border-neutral-200 text-xs text-neutral-500 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-emerald-600" />
                  <span>Pure client-side export · No watermark · 0 tracking cookies</span>
                </div>
                <button
                  onClick={handleReset}
                  className="text-neutral-900 font-medium hover:underline text-xs"
                >
                  Compress another PDF →
                </button>
              </div>
            </div>
          )}

          {/* Error Message Display */}
          {errorMessage && (
            <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-950 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
              <div className="text-xs leading-relaxed">
                <span className="font-semibold block mb-0.5">Document Processing Notice</span>
                {errorMessage}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
