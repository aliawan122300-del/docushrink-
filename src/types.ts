export type TargetPresetId = '100kb' | '200kb' | '500kb' | '1mb' | '2mb' | '5mb' | '10mb' | 'custom';

export interface TargetPreset {
  id: TargetPresetId;
  label: string;
  targetKB: number;
  badge?: string;
  description: string;
  bestFor: string;
}

export interface CompressionProgress {
  stage: 'analyzing' | 'optimizing' | 'resampling' | 'packing' | 'verifying' | 'completed' | 'error';
  percent: number;
  currentPage?: number;
  totalPages?: number;
  message: string;
}

export interface CompressionResult {
  originalBytes: number;
  compressedBytes: number;
  originalFormatted: string;
  compressedFormatted: string;
  reductionBytes: number;
  reductionPercent: number;
  targetKB: number;
  isTargetMet: boolean;
  downloadUrl: string;
  fileName: string;
  pageCount: number;
  processingTimeMs: number;
  strategyUsed: 'structural-clean' | 'downsample-adaptive' | 'lossless-stream' | 'already-optimal';
  detailsMessage: string;
}

export interface PortalExample {
  name: string;
  category: string;
  requirement: string;
  notes: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface LandingPageSEO {
  path: string;
  targetPresetId?: TargetPresetId;
  targetKB?: number;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  subtitle: string;
  badgeText: string;
  primaryUseCase: string;
  portalExamples: PortalExample[];
  technicalTips: string[];
  faqs: FAQItem[];
  relatedPages: { title: string; path: string; sizeTag: string }[];
}
