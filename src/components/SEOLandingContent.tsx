import React, { useState, useEffect } from 'react';
import {
  HelpCircle,
  ChevronDown,
  Building2,
  FileCheck,
  Zap,
  Lock,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  SlidersHorizontal,
  Info
} from 'lucide-react';
import type { LandingPageSEO } from '../types';

interface SEOLandingContentProps {
  seoData: LandingPageSEO;
  onNavigate: (path: string) => void;
}

export const SEOLandingContent: React.FC<SEOLandingContentProps> = ({ seoData, onNavigate }) => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Inject dynamic JSON-LD Structured Data based on current landing page
  useEffect(() => {
    // Clean up previous script if any
    const existingScript = document.getElementById('jsonld-seo-schema');
    if (existingScript) {
      existingScript.remove();
    }

    const script = document.createElement('script');
    script.id = 'jsonld-seo-schema';
    script.type = 'application/ld+json';

    const structuredData = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'SoftwareApplication',
          name: `DocuShrink ${seoData.h1}`,
          applicationCategory: 'UtilitiesApplication',
          operatingSystem: 'All',
          browserRequirements: 'Requires JavaScript and HTML5 Canvas support.',
          offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'USD',
          },
          description: seoData.metaDescription,
        },
        {
          '@type': 'HowTo',
          name: `How to ${seoData.h1}`,
          description: `Step-by-step instructions to compress a PDF document under ${seoData.targetKB || 500}KB using DocuShrink.`,
          step: [
            {
              '@type': 'HowToStep',
              name: 'Upload PDF',
              text: 'Drag and drop your PDF into the zero-upload compressor or select it from your device.',
            },
            {
              '@type': 'HowToStep',
              name: 'Select Target Size',
              text: `Select ${seoData.targetKB || 500} KB as your target maximum file size.`,
            },
            {
              '@type': 'HowToStep',
              name: 'Download Compressed File',
              text: 'Preview the optimized document and download the verified file under the required limit.',
            },
          ],
        },
        {
          '@type': 'FAQPage',
          mainEntity: seoData.faqs.map((faq) => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: {
              '@type': 'Answer',
              text: faq.answer,
            },
          })),
        },
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              name: 'Home',
              item: 'https://docushrink.app/',
            },
            {
              '@type': 'ListItem',
              position: 2,
              name: 'Compress PDF',
              item: 'https://docushrink.app/compress-pdf/',
            },
            {
              '@type': 'ListItem',
              position: 3,
              name: seoData.h1,
              item: `https://docushrink.app${seoData.path}`,
            },
          ],
        },
      ],
    };

    try {
      script.textContent = JSON.stringify(structuredData);
      if (document.head) {
        document.head.appendChild(script);
      }
    } catch {
      // safe fallback if DOM script injection is restricted
    }

    return () => {
      try {
        const el = document.getElementById('jsonld-seo-schema');
        if (el) el.remove();
      } catch {}
    };
  }, [seoData]);

  return (
    <div className="mt-20 space-y-16 max-w-4xl mx-auto px-4 sm:px-6">
      {/* SECTION 1: Why This Exact Size Limit Exists */}
      <section className="space-y-6">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-700">
          <Building2 className="w-4 h-4" />
          <span>Real-World Submission Requirements</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900 text-balance">
          Why Government, Visa & Job Portals Enforce {seoData.targetKB ? `${seoData.targetKB} KB` : 'Strict'} File Limits
        </h2>
        <p className="text-neutral-600 leading-relaxed text-sm sm:text-base">
          Unlike ordinary websites, enterprise applicant tracking systems, immigration portals, and civil examination
          gateways process hundreds of thousands of documents concurrently. To avoid bandwidth bottlenecks, database
          exhaustion, and mobile rendering crashes, these portals enforce non-negotiable upload caps. If your file is
          even 1 kilobyte over the limit, their automated validator rejects your upload instantly.
        </p>

        {/* Portal Requirements Table */}
        <div className="border border-neutral-200 rounded-xl overflow-hidden bg-white shadow-xs">
          <div className="px-5 py-3.5 bg-neutral-50/80 border-b border-neutral-200 font-semibold text-xs text-neutral-700 uppercase tracking-wider">
            Common Portals & Upload Caps
          </div>
          <div className="divide-y divide-neutral-200">
            {seoData.portalExamples.map((portal, idx) => (
              <div key={idx} className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs sm:text-sm">
                <div className="space-y-1">
                  <div className="font-semibold text-neutral-900">{portal.name}</div>
                  <div className="text-neutral-500 text-xs">{portal.notes}</div>
                </div>
                <div className="shrink-0 font-mono font-medium text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200 self-start sm:self-center">
                  {portal.requirement}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 2: Technical Breakdown – How DocuShrink Optimizes Without Destroying Quality */}
      <section className="space-y-6">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-neutral-600">
          <Zap className="w-4 h-4 text-amber-500" />
          <span>Engine Architecture</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900 text-balance">
          How Our Browser Engine Shrinks PDFs to Exact Byte Budgets
        </h2>
        <p className="text-neutral-600 leading-relaxed text-sm sm:text-base">
          Generic compression tools use one-size-fits-all presets that frequently fail target thresholds. DocuShrink uses a
          two-phase adaptive pipeline tailored to document structure:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
          <div className="p-5 rounded-xl bg-white border border-neutral-200 space-y-2.5">
            <div className="w-8 h-8 rounded-lg bg-neutral-900 text-white flex items-center justify-center font-bold text-xs">
              01
            </div>
            <h3 className="font-bold text-neutral-900 text-sm">Object Stream Cleanup</h3>
            <p className="text-neutral-600 text-xs leading-relaxed">
              Strips invisible metadata, redundant cross-reference tables, creation histories, and XML tags without altering
              a single character of text.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-white border border-neutral-200 space-y-2.5">
            <div className="w-8 h-8 rounded-lg bg-neutral-900 text-white flex items-center justify-center font-bold text-xs">
              02
            </div>
            <h3 className="font-bold text-neutral-900 text-sm">Adaptive Quality Curves</h3>
            <p className="text-neutral-600 text-xs leading-relaxed">
              Calculates the exact byte budget per page and applies non-linear JPEG quantization curves, preserving high-contrast
              edges on text and signatures.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-white border border-neutral-200 space-y-2.5">
            <div className="w-8 h-8 rounded-lg bg-neutral-900 text-white flex items-center justify-center font-bold text-xs">
              03
            </div>
            <h3 className="font-bold text-neutral-900 text-sm">Binary Verification</h3>
            <p className="text-neutral-600 text-xs leading-relaxed">
              Verifies the compiled byte payload before offering the download, ensuring your document passes automated gatekeeper
              tests on the first attempt.
            </p>
          </div>
        </div>

        {/* Actionable Tips */}
        <div className="p-5 rounded-xl bg-neutral-100/70 border border-neutral-200 space-y-3">
          <h3 className="text-xs font-bold text-neutral-900 uppercase tracking-wider flex items-center gap-1.5">
            <Info className="w-4 h-4 text-neutral-700" />
            <span>Best Practices for Reaching {seoData.targetKB ? `${seoData.targetKB} KB` : 'Target Size'}</span>
          </h3>
          <ul className="space-y-2 text-xs sm:text-sm text-neutral-600">
            {seoData.technicalTips.map((tip, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* SECTION 3: Step-by-Step Instructions */}
      <section className="space-y-6">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900">
          How to Compress Your PDF in 3 Simple Steps
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex gap-4">
            <div className="w-8 h-8 rounded-full bg-neutral-900 text-white flex items-center justify-center shrink-0 font-bold text-xs">
              1
            </div>
            <div className="space-y-1">
              <h3 className="font-semibold text-neutral-900 text-sm">Upload Your Document</h3>
              <p className="text-neutral-500 text-xs leading-relaxed">
                Drag and drop your file into the box above or tap to browse from your iPhone, Android, Mac, or PC.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-8 h-8 rounded-full bg-neutral-900 text-white flex items-center justify-center shrink-0 font-bold text-xs">
              2
            </div>
            <div className="space-y-1">
              <h3 className="font-semibold text-neutral-900 text-sm">Select Target Size</h3>
              <p className="text-neutral-500 text-xs leading-relaxed">
                Choose {seoData.targetKB ? `${seoData.targetKB} KB` : 'your required limit'} or dial a custom number in the slider.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-8 h-8 rounded-full bg-neutral-900 text-white flex items-center justify-center shrink-0 font-bold text-xs">
              3
            </div>
            <div className="space-y-1">
              <h3 className="font-semibold text-neutral-900 text-sm">Download Instantly</h3>
              <p className="text-neutral-500 text-xs leading-relaxed">
                Click download to get your verified file. No waiting, no watermarks, and no email registration.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: Comprehensive FAQ Accordion */}
      <section className="space-y-6">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-neutral-600">
          <HelpCircle className="w-4 h-4 text-emerald-600" />
          <span>Frequently Asked Questions</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900">
          Frequently Asked Questions
        </h2>

        <div className="border border-neutral-200 rounded-xl divide-y divide-neutral-200 bg-white">
          {seoData.faqs.map((faq, index) => {
            const isOpen = openFaqIndex === index;
            return (
              <div key={index} className="transition-colors">
                <button
                  type="button"
                  onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                  className="w-full py-4 px-5 text-left flex items-center justify-between gap-4 focus:outline-none"
                >
                  <span className="font-semibold text-neutral-900 text-sm sm:text-base">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-neutral-500 transition-transform duration-200 shrink-0 ${
                      isOpen ? 'rotate-180 text-neutral-900' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-neutral-600 leading-relaxed">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* SECTION 5: Internal Linking Hub to other Targets */}
      <section className="border-t border-neutral-200 pt-10 space-y-4">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-neutral-400">
          Related Target Size Tools
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {seoData.relatedPages.map((page, idx) => (
            <button
              key={idx}
              onClick={() => onNavigate(page.path)}
              className="p-3.5 rounded-xl border border-neutral-200 bg-white hover:border-neutral-900 text-left transition-all group flex items-center justify-between"
            >
              <div>
                <div className="font-semibold text-neutral-900 text-xs group-hover:text-emerald-700 transition-colors">
                  {page.title}
                </div>
                <div className="text-[11px] text-neutral-500 font-mono mt-0.5">
                  Target: {page.sizeTag}
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-neutral-400 group-hover:text-neutral-900 group-hover:translate-x-0.5 transition-all shrink-0" />
            </button>
          ))}
        </div>
      </section>
    </div>
  );
};
