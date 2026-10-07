/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { CompressorTool } from './components/CompressorTool';
import { SEOLandingContent } from './components/SEOLandingContent';
import { PrivacyModal } from './components/PrivacyModal';
import { StaticPages, type StaticPageType } from './components/StaticPages';
import { SEO_LANDING_PAGES, TARGET_PRESETS } from './data/seoLandingPages';
import type { TargetPresetId } from './types';
import { ShieldCheck, Sparkles, ArrowRight, Layers, FileSpreadsheet, Lock, CheckCircle2 } from 'lucide-react';

const STATIC_ROUTES: Record<string, StaticPageType> = {
  '/about/': 'about',
  '/contact/': 'contact',
  '/privacy/': 'privacy',
  '/terms/': 'terms',
  '/faq/': 'faq',
  '/how-to-compress-pdf/': 'how-to-compress',
};

export default function App() {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname;
      if (SEO_LANDING_PAGES[path] || path === '/' || STATIC_ROUTES[path]) {
        return path;
      }
    }
    return '/';
  });
  const [privacyModalOpen, setPrivacyModalOpen] = useState(false);

  // Sync with browser URL on mount and history navigation
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      if (SEO_LANDING_PAGES[path] || path === '/' || STATIC_ROUTES[path]) {
        setCurrentPath(path);
      }
    };

    const initialPath = window.location.pathname;
    if (SEO_LANDING_PAGES[initialPath] || initialPath === '/' || STATIC_ROUTES[initialPath]) {
      setCurrentPath(initialPath);
    } else {
      setCurrentPath('/');
    }

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateTo = (path: string) => {
    setCurrentPath(path);
    try {
      if (typeof window !== 'undefined' && window.history && window.history.pushState) {
        window.history.pushState({}, '', path);
      }
    } catch {
      // In sandboxed/cross-origin preview iframes, pushState may be restricted
    }
    try {
      if (typeof window !== 'undefined') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } catch {}
  };

  // Determine active SEO data
  const activeSEO = SEO_LANDING_PAGES[currentPath] || SEO_LANDING_PAGES['/'] || SEO_LANDING_PAGES['/compress-pdf/'];

  // Update dynamic page title, meta description, and canonical link safely
  useEffect(() => {
    if (typeof document === 'undefined') return;
    try {
      const origin = typeof window !== 'undefined' && window.location?.origin && window.location.origin !== 'null'
        ? window.location.origin
        : 'https://docushrink.ai.studio';

      let canonical = document.querySelector('link[rel="canonical"]');
      if (!canonical && document.head) {
        canonical = document.createElement('link');
        canonical.setAttribute('rel', 'canonical');
        document.head.appendChild(canonical);
      }

      let ogUrl = document.querySelector('meta[property="og:url"]');
      if (!ogUrl && document.head) {
        ogUrl = document.createElement('meta');
        ogUrl.setAttribute('property', 'og:url');
        document.head.appendChild(ogUrl);
      }

      const updateCanonical = (href: string) => {
        if (canonical) canonical.setAttribute('href', href);
        if (ogUrl) ogUrl.setAttribute('content', href);
      };

      if (currentPath === '/') {
        document.title = 'DocuShrink – Exact-Size PDF Compressor & Zero-Upload PDF Tools';
        let metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc) {
          metaDesc.setAttribute('content', 'Compress PDF to exact target file sizes (100KB, 200KB, 500KB, 1MB, 2MB) for government, visa, and portal limits. 100% private, free, and processed locally in your browser.');
        }
        updateCanonical(`${origin}/`);
        return;
      }

      if (currentPath === '/how-to-compress-pdf/') {
        document.title = 'How to Compress a PDF – Step-by-Step Guide | DocuShrink';
        let metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc) {
          metaDesc.setAttribute('content', 'Learn how to compress your PDF files to exact target file sizes (100KB, 200KB, 500KB, 1MB) for government, visa, and job portals. 100% private and free.');
        }
        updateCanonical(`${origin}/how-to-compress-pdf/`);
        return;
      }

      if (currentPath === '/faq/') {
        document.title = 'Frequently Asked Questions (FAQ) – DocuShrink PDF Tools';
        let metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc) {
          metaDesc.setAttribute('content', 'Find answers to common questions about DocuShrink exact-size PDF compression, privacy guarantees, browser-native WebAssembly, and portal requirements.');
        }
        updateCanonical(`${origin}/faq/`);
        return;
      }

      if (currentPath === '/about/') {
        document.title = 'About Us – DocuShrink Zero-Upload PDF Engine';
        let metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc) {
          metaDesc.setAttribute('content', 'Learn about DocuShrink and our mission to provide private, zero-upload, exact-size PDF compression without cloud risks or paywalls.');
        }
        updateCanonical(`${origin}/about/`);
        return;
      }

      if (currentPath === '/contact/') {
        document.title = 'Contact Us – DocuShrink Support';
        let metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc) {
          metaDesc.setAttribute('content', 'Contact the DocuShrink team for inquiries, feedback, and support regarding our private, zero-upload PDF tools.');
        }
        updateCanonical(`${origin}/contact/`);
        return;
      }

      if (currentPath === '/privacy/') {
        document.title = 'Privacy Policy – Zero-Upload Guarantee | DocuShrink';
        let metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc) {
          metaDesc.setAttribute('content', 'Read DocuShrink’s Privacy Policy. 100% client-side execution—your PDF documents never leave your browser or touch remote servers.');
        }
        updateCanonical(`${origin}/privacy/`);
        return;
      }

      if (currentPath === '/terms/') {
        document.title = 'Terms of Service – DocuShrink';
        let metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc) {
          metaDesc.setAttribute('content', 'Review the terms and conditions for using DocuShrink free browser-based PDF compression and document utility tools.');
        }
        updateCanonical(`${origin}/terms/`);
        return;
      }

      if (activeSEO) {
        document.title = activeSEO.metaTitle;

        let metaDesc = document.querySelector('meta[name="description"]');
        if (!metaDesc && document.head) {
          metaDesc = document.createElement('meta');
          metaDesc.setAttribute('name', 'description');
          document.head.appendChild(metaDesc);
        }
        if (metaDesc) {
          metaDesc.setAttribute('content', activeSEO.metaDescription);
        }

        updateCanonical(`${origin}${activeSEO.path}`);
      }
    } catch {
      // Suppress any DOM metadata update errors in restricted environments
    }
  }, [activeSEO, currentPath]);

  // Handle preset selection from tool
  const handleTargetChange = (presetId: TargetPresetId) => {
    if (presetId !== 'custom') {
      const matchingPath = `/compress-pdf-to-${presetId}/`;
      if (SEO_LANDING_PAGES[matchingPath] && currentPath !== matchingPath) {
        navigateTo(matchingPath);
      }
    }
  };

  // If viewing static pages
  const staticPageType = STATIC_ROUTES[currentPath];
  if (staticPageType) {
    return (
      <div className="min-h-screen flex flex-col bg-neutral-50 text-neutral-900">
        <Header
          currentPath={currentPath}
          onNavigate={navigateTo}
          onOpenPrivacy={() => setPrivacyModalOpen(true)}
        />
        <main className="flex-1">
          <StaticPages
            type={staticPageType}
            onBack={() => navigateTo('/')}
            onNavigate={navigateTo}
          />
        </main>
        <Footer
          onNavigate={navigateTo}
          onOpenPrivacy={() => setPrivacyModalOpen(true)}
        />
        <PrivacyModal
          isOpen={privacyModalOpen}
          onClose={() => setPrivacyModalOpen(false)}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-neutral-50 text-neutral-900 selection:bg-neutral-900 selection:text-white">
      {/* Top Bar Header */}
      <Header
        currentPath={currentPath}
        onNavigate={navigateTo}
        onOpenPrivacy={() => setPrivacyModalOpen(true)}
      />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="pt-10 sm:pt-14 pb-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          {/* Hero Header */}
          <div className="text-center max-w-3xl mx-auto mb-10 space-y-3.5">
            {/* Unboxed Metadata Tag adhering to Zero-Pill Discipline */}
            <div className="flex items-center justify-center gap-2 text-xs font-semibold text-neutral-600">
              <span className="text-emerald-700">{activeSEO.badgeText}</span>
              <span aria-hidden="true" className="text-neutral-300">·</span>
              <span>100% In-Browser Execution</span>
              <span aria-hidden="true" className="text-neutral-300">·</span>
              <span>No Watermarks</span>
            </div>

            {/* Clear, Single H1 per page */}
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-neutral-950 text-balance leading-[1.15]">
              {activeSEO.h1}
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-base text-neutral-600 max-w-2xl mx-auto leading-relaxed text-balance">
              {activeSEO.subtitle}
            </p>

            {/* Target Size Quick Filter Bar (Segmented Controls) */}
            <div className="pt-2 flex flex-wrap items-center justify-center gap-1.5 max-w-2xl mx-auto">
              <span className="text-xs text-neutral-500 font-medium mr-1 hidden sm:inline">
                Quick Jump:
              </span>
              {TARGET_PRESETS.map((preset) => {
                const isActive = activeSEO.targetPresetId === preset.id;
                return (
                  <button
                    key={preset.id}
                    onClick={() => navigateTo(`/compress-pdf-to-${preset.id}/`)}
                    className={`px-2.5 py-1 text-xs font-medium rounded-lg transition-colors font-mono ${
                      isActive
                        ? 'bg-neutral-900 text-white shadow-xs'
                        : 'bg-white hover:bg-neutral-100 text-neutral-600 border border-neutral-200'
                    }`}
                  >
                    {preset.label}
                  </button>
                );
              })}
              <button
                onClick={() => navigateTo('/compress-pdf/')}
                className={`px-2.5 py-1 text-xs font-medium rounded-lg transition-colors ${
                  activeSEO.targetPresetId === 'custom'
                    ? 'bg-neutral-900 text-white shadow-xs'
                    : 'bg-white hover:bg-neutral-100 text-neutral-600 border border-neutral-200'
                }`}
              >
                Custom Slider
              </button>
            </div>
          </div>

          {/* THE TOOL: Front & Center, Above the Fold */}
          <div className="relative">
            <CompressorTool
              initialTargetPresetId={activeSEO.targetPresetId || '500kb'}
              initialTargetKB={activeSEO.targetKB || 500}
              onTargetChange={handleTargetChange}
            />
          </div>
        </section>

        {/* Feature Badges Grid (Quiet, unboxed, WCAG compliant) */}
        <section className="border-y border-neutral-200/80 bg-white py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs sm:text-sm">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-neutral-100 text-neutral-900 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
              </div>
              <div>
                <strong className="block text-neutral-900 font-semibold mb-0.5">
                  Zero Cloud Uploads
                </strong>
                <p className="text-neutral-500 text-xs leading-normal">
                  Passports, pay stubs, and tax files remain safe in your local browser sandbox.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-neutral-100 text-neutral-900 flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              </div>
              <div>
                <strong className="block text-neutral-900 font-semibold mb-0.5">
                  Exact Kilobyte Targeting
                </strong>
                <p className="text-neutral-500 text-xs leading-normal">
                  Stop guessing between &quot;Low&quot; and &quot;High&quot;. We optimize specifically for portal thresholds.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-neutral-100 text-neutral-900 flex items-center justify-center shrink-0">
                <Sparkles className="w-4 h-4 text-amber-600" />
              </div>
              <div>
                <strong className="block text-neutral-900 font-semibold mb-0.5">
                  No Registration or Limits
                </strong>
                <p className="text-neutral-500 text-xs leading-normal">
                  No daily caps, no watermark stamps, and no hidden 7-day trial traps.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Rich SEO & Contextual Landing Page Content */}
        <SEOLandingContent
          seoData={activeSEO}
          onNavigate={navigateTo}
        />
      </main>

      {/* Global Footer */}
      <Footer
        onNavigate={navigateTo}
        onOpenPrivacy={() => setPrivacyModalOpen(true)}
      />

      {/* Zero-Upload Architecture Modal */}
      <PrivacyModal
        isOpen={privacyModalOpen}
        onClose={() => setPrivacyModalOpen(false)}
      />
    </div>
  );
}
