import React from 'react';
import { ShieldCheck, Lock, Cpu, Sparkles, CheckCircle2 } from 'lucide-react';
import { TARGET_PRESETS } from '../data/seoLandingPages';

interface FooterProps {
  onNavigate: (path: string) => void;
  onOpenPrivacy: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenPrivacy }) => {
  return (
    <footer className="bg-neutral-900 text-neutral-300 mt-24 border-t border-neutral-800">
      {/* Privacy & Zero-Upload Trust Banner */}
      <div className="border-b border-neutral-800 bg-neutral-950/60 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-emerald-950/80 border border-emerald-500/30 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-white font-semibold text-base tracking-tight flex items-center gap-2">
                100% Client-Side Sandbox Guarantee
                <span className="text-xs bg-emerald-900/60 text-emerald-300 px-2 py-0.5 rounded border border-emerald-700/50 font-mono">
                  0 Bytes Uploaded
                </span>
              </h3>
              <p className="text-neutral-400 text-sm mt-1 max-w-2xl leading-relaxed">
                Your documents never leave your browser. Unlike traditional converters that upload confidential
                resumes, visas, and tax records to external cloud buckets, DocuShrink processes every byte locally
                using browser-native WebAssembly.
              </p>
            </div>
          </div>
          <button
            onClick={onOpenPrivacy}
            className="px-4 py-2 text-xs font-semibold text-neutral-200 bg-neutral-800 hover:bg-neutral-700 rounded-lg transition-colors border border-neutral-700 whitespace-nowrap self-start md:self-center"
          >
            Read Technical Architecture
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Column 1: Brand & Mission */}
          <div className="space-y-4">
            <div className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
              <div className="w-7 h-7 rounded bg-emerald-500 text-neutral-950 font-bold flex items-center justify-center text-sm">
                DS
              </div>
              DocuShrink
            </div>
            <p className="text-neutral-400 text-xs leading-relaxed">
              The high-precision, zero-upload PDF utility platform. Designed specifically for job seekers, visa applicants,
              and students facing strict portal file size limits.
            </p>
            <div className="pt-2 text-xs text-neutral-500">
              Free forever · No sign-up required · No watermarks
            </div>
          </div>

          {/* Column 2: Specific Target Presets (SEO Cluster Links) */}
          <div>
            <h4 className="text-white font-semibold text-xs uppercase tracking-wider mb-4">
              Target Size Tools
            </h4>
            <ul className="space-y-2 text-xs">
              {TARGET_PRESETS.map((preset) => (
                <li key={preset.id}>
                  <button
                    onClick={() => onNavigate(`/compress-pdf-to-${preset.id}/`)}
                    className="text-neutral-400 hover:text-white transition-colors flex items-center justify-between w-full group py-0.5"
                  >
                    <span>Compress PDF to {preset.label}</span>
                    <span className="text-neutral-600 group-hover:text-emerald-400 transition-colors font-mono">
                      {preset.badge}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Guides & Help */}
          <div>
            <h4 className="text-white font-semibold text-xs uppercase tracking-wider mb-4">
              Guides & Resources
            </h4>
            <ul className="space-y-2 text-xs text-neutral-400">
              <li>
                <button
                  onClick={() => onNavigate('/how-to-compress-pdf/')}
                  className="hover:text-white transition-colors text-left flex items-center justify-between w-full"
                >
                  <span>How to Compress a PDF</span>
                  <span className="text-emerald-400 text-[10px] font-mono">Guide</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/faq/')}
                  className="hover:text-white transition-colors text-left flex items-center justify-between w-full"
                >
                  <span>Frequently Asked Questions</span>
                  <span className="text-emerald-400 text-[10px] font-mono">FAQ</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/')}
                  className="hover:text-white transition-colors text-left"
                >
                  Exact-Size PDF Tool
                </button>
              </li>
              <li className="pt-2 text-[11px] text-neutral-500 font-semibold uppercase tracking-wider">
                Roadmap Utilities
              </li>
              <li className="flex items-center justify-between py-0.5 text-neutral-500">
                <span>Merge & Combine PDF</span>
                <span className="text-[10px] font-mono">Phase 1</span>
              </li>
              <li className="flex items-center justify-between py-0.5 text-neutral-500">
                <span>Images to PDF</span>
                <span className="text-[10px] font-mono">Phase 2</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Company & Legal */}
          <div>
            <h4 className="text-white font-semibold text-xs uppercase tracking-wider mb-4">
              Company & Legal
            </h4>
            <ul className="space-y-2 text-xs text-neutral-400">
              <li>
                <button
                  onClick={() => onNavigate('/about/')}
                  className="hover:text-white transition-colors"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/contact/')}
                  className="hover:text-white transition-colors"
                >
                  Contact Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/privacy/')}
                  className="hover:text-white transition-colors"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/terms/')}
                  className="hover:text-white transition-colors"
                >
                  Terms of Service
                </button>
              </li>
              <li>
                <a
                  href="/sitemap.xml"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  XML Sitemap
                </a>
              </li>
            </ul>
            <div className="mt-6 p-3 rounded-lg bg-neutral-950/80 border border-neutral-800 text-[11px] text-neutral-400 leading-normal">
              <span className="text-neutral-200 font-medium block mb-1">AdSense & Privacy Notice:</span>
              DocuShrink displays non-intrusive advertisements to keep these tools free for everyone. Ad providers
              never have access to your local document contents.
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <div>
            © {new Date().getFullYear()} DocuShrink. All rights reserved. Zero-Upload browser engine.
          </div>
          <div className="flex items-center gap-6">
            <span>Client-Side WebAssembly</span>
            <span>·</span>
            <span>W3C WCAG 2.1 AA Compliant</span>
            <span>·</span>
            <span>Zero Watermarks</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
