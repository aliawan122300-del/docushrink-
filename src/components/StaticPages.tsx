import React, { useState } from 'react';
import {
  ArrowLeft,
  Shield,
  CheckCircle2,
  Zap,
  FileText,
  Mail,
  Copy,
  Check,
  Clock,
  HelpCircle,
  BookOpen,
  Layers,
  Lock,
  Sliders,
  Download,
  Upload,
  FileCheck,
  ChevronDown,
  ChevronUp,
  ShieldCheck,
  ArrowRight,
  ExternalLink,
} from 'lucide-react';

export type StaticPageType = 'about' | 'terms' | 'contact' | 'privacy' | 'faq' | 'how-to-compress';

interface StaticPageProps {
  type: StaticPageType;
  onBack: () => void;
  onNavigate?: (path: string) => void;
}

export const StaticPages: React.FC<StaticPageProps> = ({ type, onBack, onNavigate }) => {
  const [copied, setCopied] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);

  const handleCopyEmail = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText('aliawan122300@gmail.com').then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }).catch(() => {});
    }
  };

  const toggleFaq = (index: number) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  const faqs = [
    {
      q: 'How does DocuShrink compress PDFs to an exact target file size?',
      a: 'Unlike traditional tools that offer vague "Low/Medium/High" presets, DocuShrink uses a multi-pass adaptive engine. It first applies lossless object-stream compression. If further reduction is required to meet your specific threshold (such as 100 KB or 200 KB), it intelligently resamples image assets using Canvas pipelines while preserving text vector crispness and readability.',
    },
    {
      q: 'Is my document uploaded to a remote server during compression?',
      a: 'No. Zero bytes leave your device. The entire PDF parsing, compression, rasterization, and assembly workflow executes client-side inside your browser sandbox via WebAssembly and HTML5 Canvas. You can verify this anytime by inspecting your browser Network tab—there are zero file upload requests.',
    },
    {
      q: 'Is DocuShrink completely free to use?',
      a: 'Yes, 100% free forever. There are no subscriptions, paywalls, hidden credit limits, watermarks, or account registration requirements. You can compress as many files as you need.',
    },
    {
      q: 'Why do government and visa portals have strict file size limits?',
      a: 'Government platforms (such as UPSC, SSC, US Visa DS-160, Schengen Visa, and Canada IRCC) manage millions of applications simultaneously. To save database bandwidth and storage costs, their automated intake bots strictly reject any file exceeding 100 KB, 200 KB, or 500 KB. DocuShrink was created specifically to hit those exact limits on the first try.',
    },
    {
      q: 'Will text in my compressed PDF still be readable and sharp?',
      a: 'Yes. Vector typography (digital text, tables, fonts) is preserved losslessly. For scanned documents or photographic ID attachments, our compression algorithm adjusts the JPEG quality matrix dynamically to maintain maximum legibility of small numbers, signatures, and stamps.',
    },
    {
      q: 'Can I use DocuShrink on my mobile phone (iPhone or Android)?',
      a: 'Yes! DocuShrink is fully responsive and mobile-optimized. You can select PDFs directly from your iPhone Files app, Android storage, or Google Drive, compress them locally on your phone, and download the optimized PDF instantly.',
    },
    {
      q: 'What is the maximum file size I can upload for compression?',
      a: 'Because processing happens entirely within your browser RAM and client resources, DocuShrink easily handles documents up to 50 MB–100 MB without lag. There are no server bandwidth timeouts.',
    },
    {
      q: 'Can I compress password-protected or encrypted PDFs?',
      a: 'If a PDF is password-protected, you will need to unlock or enter the password in your PDF reader before compressing, as encrypted documents prevent local rendering engines from parsing internal content streams.',
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
      {/* Back Button */}
      <div className="flex items-center justify-between mb-8">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-600 hover:text-neutral-950 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Exact Compressor</span>
        </button>

        {onNavigate && (
          <div className="hidden sm:flex items-center gap-3 text-xs text-neutral-500">
            <button
              onClick={() => onNavigate('/how-to-compress-pdf/')}
              className={`hover:text-neutral-900 transition-colors ${type === 'how-to-compress' ? 'font-bold text-neutral-900' : ''}`}
            >
              How-To Guide
            </button>
            <span>·</span>
            <button
              onClick={() => onNavigate('/faq/')}
              className={`hover:text-neutral-900 transition-colors ${type === 'faq' ? 'font-bold text-neutral-900' : ''}`}
            >
              FAQ
            </button>
            <span>·</span>
            <button
              onClick={() => onNavigate('/about/')}
              className={`hover:text-neutral-900 transition-colors ${type === 'about' ? 'font-bold text-neutral-900' : ''}`}
            >
              About
            </button>
            <span>·</span>
            <button
              onClick={() => onNavigate('/contact/')}
              className={`hover:text-neutral-900 transition-colors ${type === 'contact' ? 'font-bold text-neutral-900' : ''}`}
            >
              Contact
            </button>
          </div>
        )}
      </div>

      {/* 1. ABOUT US PAGE */}
      {type === 'about' && (
        <article className="space-y-8 bg-white p-6 sm:p-12 rounded-2xl border border-neutral-200 shadow-xs">
          <div className="space-y-2 border-b border-neutral-100 pb-6">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-emerald-50 border border-emerald-200/60 rounded-full text-xs font-medium text-emerald-800">
              <Zap className="w-3.5 h-3.5 text-emerald-600" />
              <span>About DocuShrink</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-900">
              About Us
            </h1>
            <p className="text-neutral-500 text-sm sm:text-base leading-relaxed">
              Engineering the next-generation, zero-upload private document compression suite.
            </p>
          </div>

          <div className="prose prose-neutral max-w-none space-y-6 text-sm text-neutral-600 leading-relaxed">
            <p>
              DocuShrink was founded to solve a frustrating and pervasive problem: <strong>almost every online PDF compression tool forces users into an unfair compromise</strong>.
            </p>
            <p>
              When students, visa applicants, job seekers, and legal professionals urgently need to compress a bank statement, passport scan, or resume, commercial sites demand that they upload confidential documents to remote cloud servers. Once uploaded, users encounter paywalls, arbitrary file-size results, intrusive watermarks, or deceptive subscription trials.
            </p>

            <h2 className="text-lg font-bold text-neutral-900 pt-4 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              Our Core Mission
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 not-prose pt-2">
              <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200 space-y-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-sm">
                  1
                </div>
                <h3 className="font-semibold text-neutral-900 text-sm">Exact Constraints</h3>
                <p className="text-xs text-neutral-600 leading-relaxed">
                  Instead of vague "High/Medium/Low" toggles, users dial in the exact limit (100KB, 200KB, 500KB, 1MB) their destination portal demands.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200 space-y-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-sm">
                  2
                </div>
                <h3 className="font-semibold text-neutral-900 text-sm">Zero-Upload Privacy</h3>
                <p className="text-xs text-neutral-600 leading-relaxed">
                  We process documents locally in your browser memory via WebAssembly. Your files never touch external servers or third-party buckets.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200 space-y-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-sm">
                  3
                </div>
                <h3 className="font-semibold text-neutral-900 text-sm">Free & Transparent</h3>
                <p className="text-xs text-neutral-600 leading-relaxed">
                  No subscriptions, no watermarks, no registration, and no artificial waiting queues. Open access for everyone worldwide.
                </p>
              </div>
            </div>

            <h2 className="text-lg font-bold text-neutral-900 pt-4">Browser-Native Technology Stack</h2>
            <p>
              DocuShrink leverages modern client-side document processing pipelines built with TypeScript, WebAssembly, and HTML5 Canvas rasterization. By utilizing your device's native processing power, compression operations execute in fractions of a second without consuming your cellular data or risking cloud storage breaches.
            </p>

            <div className="p-5 rounded-xl bg-emerald-50/70 border border-emerald-200 text-emerald-950 text-xs sm:text-sm space-y-1 not-prose">
              <span className="font-semibold block">Commitment to High-Stakes Submissions</span>
              <span>
                Whether you are submitting an urgent visa application to IRCC or UKVI, applying for government civil service exams, or uploading a resume to an ATS portal, DocuShrink is built to guarantee your file meets strict upload parameters with total privacy.
              </span>
            </div>
          </div>
        </article>
      )}

      {/* 2. CONTACT US PAGE */}
      {type === 'contact' && (
        <article className="space-y-8 bg-white p-6 sm:p-12 rounded-2xl border border-neutral-200 shadow-xs">
          <div className="space-y-2 border-b border-neutral-100 pb-6">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-emerald-50 border border-emerald-200/60 rounded-full text-xs font-medium text-emerald-800">
              <Mail className="w-3.5 h-3.5 text-emerald-600" />
              <span>Official Contact</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-900">
              Contact Us
            </h1>
            <p className="text-neutral-500 text-sm sm:text-base leading-relaxed">
              Have questions, feedback, or need technical assistance with DocuShrink? We're here to help.
            </p>
          </div>

          <div className="space-y-6">
            {/* Primary Contact Section */}
            <div className="p-6 sm:p-8 rounded-xl bg-neutral-50 border border-neutral-200/80 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
                    Official Email
                  </span>
                  <div className="text-lg sm:text-xl font-mono font-semibold text-neutral-900 break-all">
                    <a
                      href="mailto:aliawan122300@gmail.com"
                      className="text-emerald-700 hover:text-emerald-800 hover:underline inline-flex items-center gap-2"
                    >
                      <Mail className="w-5 h-5 text-emerald-600 shrink-0" />
                      <span>aliawan122300@gmail.com</span>
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <a
                    href="mailto:aliawan122300@gmail.com"
                    className="inline-flex items-center gap-2 px-4 py-2.5 bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-semibold rounded-lg transition-colors shadow-xs"
                  >
                    <Mail className="w-4 h-4" />
                    <span>Send Email</span>
                  </a>
                  <button
                    onClick={handleCopyEmail}
                    className="inline-flex items-center gap-1.5 px-3 py-2.5 bg-white hover:bg-neutral-100 text-neutral-700 text-xs font-semibold rounded-lg border border-neutral-200 transition-colors"
                    title="Copy email address"
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-600" />
                        <span className="text-emerald-700 font-medium">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 text-neutral-500" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              <p className="text-xs text-neutral-500 leading-relaxed pt-2 border-t border-neutral-200/60">
                Reach out directly for bug reports, browser compatibility questions, feature requests, business queries, or general support regarding our PDF processing utilities.
              </p>
            </div>

            {/* Additional Guidance Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-5 rounded-xl border border-neutral-200 bg-white space-y-2">
                <div className="flex items-center gap-2 text-neutral-900 font-semibold text-sm">
                  <Clock className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Response Time</span>
                </div>
                <p className="text-xs text-neutral-600 leading-relaxed">
                  We monitor all inquiries regularly and aim to reply within 24 to 48 business hours.
                </p>
              </div>

              <div className="p-5 rounded-xl border border-neutral-200 bg-white space-y-2">
                <div className="flex items-center gap-2 text-neutral-900 font-semibold text-sm">
                  <Shield className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Privacy Notice</span>
                </div>
                <p className="text-xs text-neutral-600 leading-relaxed">
                  Because DocuShrink operates 100% locally in your browser, please do not attach sensitive personal documents in support emails.
                </p>
              </div>
            </div>
          </div>
        </article>
      )}

      {/* 3. PRIVACY POLICY PAGE */}
      {type === 'privacy' && (
        <article className="space-y-8 bg-white p-6 sm:p-12 rounded-2xl border border-neutral-200 shadow-xs">
          <div className="space-y-2 border-b border-neutral-100 pb-6">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-emerald-50 border border-emerald-200/60 rounded-full text-xs font-medium text-emerald-800">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Data Protection</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-900">
              Privacy Policy
            </h1>
            <p className="text-neutral-500 text-xs sm:text-sm">
              Last updated: October 2026 · Effective Immediately
            </p>
          </div>

          <div className="prose prose-neutral max-w-none space-y-6 text-sm text-neutral-600 leading-relaxed">
            <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200 text-emerald-950 text-xs sm:text-sm space-y-1.5 not-prose">
              <span className="font-bold flex items-center gap-1.5 text-emerald-900">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                The Zero-Upload Guarantee:
              </span>
              <p>
                When you drag, drop, or select a PDF on DocuShrink, <strong>your file is NEVER uploaded to any remote server or cloud bucket</strong>. All parsing, compression, rasterization, and assembly take place exclusively within your device's browser memory.
              </p>
            </div>

            <h2 className="text-lg font-bold text-neutral-900 pt-2">1. Information We Do Not Collect</h2>
            <p>
              Unlike traditional cloud-based document platforms, DocuShrink does not:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm text-neutral-700">
              <li>Upload, copy, retain, or index the contents of your PDF files.</li>
              <li>Extract metadata, personal names, financial details, or text strings from your documents.</li>
              <li>Store your documents on servers, databases, or cloud storage buckets (e.g. AWS S3, Google Cloud).</li>
              <li>Require user registration, email sign-ups, or login credentials to access compression tools.</li>
            </ul>

            <h2 className="text-lg font-bold text-neutral-900 pt-2">2. How Local Processing Works</h2>
            <p>
              DocuShrink uses WebAssembly (Wasm) and HTML5 Canvas APIs provided natively by modern browsers. When a file is loaded, it is held temporarily in your browser's private memory heap (<code className="text-xs bg-neutral-100 px-1 py-0.5 rounded">ArrayBuffer</code>) and released as soon as the tab is refreshed or closed.
            </p>

            <h2 className="text-lg font-bold text-neutral-900 pt-2">3. Cookies, Analytics & Advertising</h2>
            <p>
              To maintain free access to our utilities without charging subscription fees, DocuShrink may display non-intrusive advertisements served by trusted third-party networks (such as Google AdSense):
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm text-neutral-700">
              <li><strong>Cookies:</strong> Third-party ad partners may use standard web cookies to serve ads based on prior visits to our or other websites.</li>
              <li><strong>Zero Document Access:</strong> Third-party ad networks or analytics services <em>never</em> have access to your local document files or their contents.</li>
              <li><strong>Opt-Out:</strong> Users may opt out of personalized advertising by visiting Google's <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-emerald-700 underline">Ads Settings</a>.</li>
            </ul>

            <h2 className="text-lg font-bold text-neutral-900 pt-2">4. User Rights (GDPR & CCPA Compliance)</h2>
            <p>
              Under global data privacy regulations (including the EU General Data Protection Regulation and California Consumer Privacy Act), users have rights regarding data access, deletion, and portability. Because DocuShrink does not collect, store, or sell personal document data, there is no personal document record on our servers to delete or expose.
            </p>

            <h2 className="text-lg font-bold text-neutral-900 pt-2">5. Contact Information</h2>
            <p>
              For privacy-related questions or security inquiries, please contact our team at:
              <br />
              <a href="mailto:aliawan122300@gmail.com" className="text-emerald-700 font-semibold hover:underline">
                aliawan122300@gmail.com
              </a>
            </p>
          </div>
        </article>
      )}

      {/* 4. TERMS OF SERVICE PAGE */}
      {type === 'terms' && (
        <article className="space-y-8 bg-white p-6 sm:p-12 rounded-2xl border border-neutral-200 shadow-xs">
          <div className="space-y-2 border-b border-neutral-100 pb-6">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-emerald-50 border border-emerald-200/60 rounded-full text-xs font-medium text-emerald-800">
              <FileText className="w-3.5 h-3.5 text-emerald-600" />
              <span>Legal Agreement</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-900">
              Terms of Service
            </h1>
            <p className="text-neutral-500 text-xs sm:text-sm">
              Last updated: October 2026 · Effective Immediately
            </p>
          </div>

          <div className="prose prose-neutral max-w-none space-y-6 text-sm text-neutral-600 leading-relaxed">
            <h2 className="text-lg font-bold text-neutral-900">1. Acceptance of Terms</h2>
            <p>
              By accessing and using DocuShrink (<code className="text-xs bg-neutral-100 px-1 py-0.5 rounded">https://docushrink.ai.studio</code>), you agree to be bound by these Terms of Service. If you do not agree to these terms, please discontinue use of the website immediately.
            </p>

            <h2 className="text-lg font-bold text-neutral-900">2. Description of Service & Zero-Upload Model</h2>
            <p>
              DocuShrink provides free, browser-based PDF utilities including document compression, file-size optimization, and formatting tools. Processing occurs locally on your client device. DocuShrink operates as an in-browser processing tool, not a cloud storage or document hosting service.
            </p>

            <h2 className="text-lg font-bold text-neutral-900">3. User Responsibility & File Ownership</h2>
            <p>
              You retain all intellectual property rights, ownership, and full legal responsibility for any documents you process with DocuShrink. You agree not to use the tool in violation of any applicable local, national, or international laws.
            </p>

            <h2 className="text-lg font-bold text-neutral-900">4. Disclaimer of Warranties</h2>
            <p>
              DocuShrink is provided on an <strong>"AS IS"</strong> and <strong>"AS AVAILABLE"</strong> basis without warranties of any kind, whether express or implied. While our algorithms are engineered to optimize files accurately toward target sizes without compromising legibility, users must inspect and verify compressed documents before official submission to government portals, visa authorities, or academic institutions.
            </p>

            <h2 className="text-lg font-bold text-neutral-900">5. Limitation of Liability</h2>
            <p>
              To the fullest extent permitted by applicable law, DocuShrink and its operators shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use the service, including application submission deadlines or portal upload rejections.
            </p>

            <h2 className="text-lg font-bold text-neutral-900">6. Advertisements & Third-Party Services</h2>
            <p>
              To keep the platform 100% free, DocuShrink displays non-intrusive advertisements. Third-party ad providers operate independently and never receive access to your local document files.
            </p>

            <h2 className="text-lg font-bold text-neutral-900">7. Changes to Terms</h2>
            <p>
              We reserve the right to modify these terms at any time. Continued use of the website following changes constitutes acceptance of the revised terms.
            </p>
          </div>
        </article>
      )}

      {/* 5. FAQ PAGE */}
      {type === 'faq' && (
        <article className="space-y-8 bg-white p-6 sm:p-12 rounded-2xl border border-neutral-200 shadow-xs">
          <div className="space-y-2 border-b border-neutral-100 pb-6">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-emerald-50 border border-emerald-200/60 rounded-full text-xs font-medium text-emerald-800">
              <HelpCircle className="w-3.5 h-3.5 text-emerald-600" />
              <span>Questions & Answers</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-900">
              Frequently Asked Questions (FAQ)
            </h1>
            <p className="text-neutral-500 text-sm sm:text-base leading-relaxed">
              Everything you need to know about exact-size PDF compression, privacy guarantees, and portal limits.
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, index) => {
              const isOpen = expandedFaq === index;
              return (
                <div
                  key={index}
                  className="rounded-xl border border-neutral-200 transition-all overflow-hidden bg-neutral-50/50"
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 font-semibold text-neutral-900 hover:text-emerald-700 transition-colors text-sm sm:text-base"
                    aria-expanded={isOpen}
                  >
                    <span>{faq.q}</span>
                    <span className="shrink-0 text-neutral-400">
                      {isOpen ? (
                        <ChevronUp className="w-5 h-5 text-emerald-600" />
                      ) : (
                        <ChevronDown className="w-5 h-5" />
                      )}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-neutral-600 leading-relaxed border-t border-neutral-200/60 bg-white">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="pt-6 border-t border-neutral-100 flex flex-col sm:flex-row items-center justify-between gap-4 bg-neutral-50 p-6 rounded-xl">
            <div className="space-y-1 text-center sm:text-left">
              <h3 className="font-semibold text-neutral-900 text-sm">Have a question not listed here?</h3>
              <p className="text-xs text-neutral-500">Contact our team directly and we'll be glad to help.</p>
            </div>
            <button
              onClick={() => onNavigate && onNavigate('/contact/')}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-semibold rounded-lg transition-colors shadow-xs whitespace-nowrap"
            >
              <span>Contact Support</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </article>
      )}

      {/* 6. HOW TO COMPRESS A PDF PAGE */}
      {type === 'how-to-compress' && (
        <article className="space-y-8 bg-white p-6 sm:p-12 rounded-2xl border border-neutral-200 shadow-xs">
          <div className="space-y-2 border-b border-neutral-100 pb-6">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-emerald-50 border border-emerald-200/60 rounded-full text-xs font-medium text-emerald-800">
              <BookOpen className="w-3.5 h-3.5 text-emerald-600" />
              <span>Step-by-Step Tutorial</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-900">
              How to Compress a PDF
            </h1>
            <p className="text-neutral-500 text-sm sm:text-base leading-relaxed">
              A comprehensive guide to shrinking your PDF files to exact kilobyte limits on desktop and mobile.
            </p>
          </div>

          {/* Steps Grid */}
          <div className="space-y-6">
            {/* Step 1 */}
            <div className="flex flex-col sm:flex-row gap-5 p-6 rounded-xl bg-neutral-50 border border-neutral-200">
              <div className="w-10 h-10 rounded-xl bg-neutral-900 text-white font-bold flex items-center justify-center shrink-0 text-base">
                1
              </div>
              <div className="space-y-2 flex-1">
                <div className="flex items-center gap-2">
                  <Upload className="w-4 h-4 text-emerald-600" />
                  <h2 className="text-base font-bold text-neutral-900">Select or Drag Your PDF Document</h2>
                </div>
                <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                  Open the <strong className="text-neutral-900">DocuShrink Compressor</strong> and click the drop zone or drag your PDF directly into the browser window. You can also select documents from mobile storage, iCloud Files, or Android Downloads.
                </p>
                <div className="text-xs text-emerald-800 bg-emerald-50 p-2.5 rounded-lg border border-emerald-200/60 font-medium">
                  Privacy Note: Your file is parsed locally in your browser memory. Nothing is uploaded to any cloud server.
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col sm:flex-row gap-5 p-6 rounded-xl bg-neutral-50 border border-neutral-200">
              <div className="w-10 h-10 rounded-xl bg-neutral-900 text-white font-bold flex items-center justify-center shrink-0 text-base">
                2
              </div>
              <div className="space-y-2 flex-1">
                <div className="flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-emerald-600" />
                  <h2 className="text-base font-bold text-neutral-900">Choose Your Target Size Preset</h2>
                </div>
                <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                  Click on the exact preset required by your portal:
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 text-xs">
                  <div className="p-2.5 bg-white border border-neutral-200 rounded-lg text-center font-mono">
                    <span className="font-bold text-neutral-900 block">100 KB</span>
                    <span className="text-[10px] text-neutral-500">Govt / UPSC</span>
                  </div>
                  <div className="p-2.5 bg-white border border-neutral-200 rounded-lg text-center font-mono">
                    <span className="font-bold text-neutral-900 block">200 KB</span>
                    <span className="text-[10px] text-neutral-500">Visa / IRCC</span>
                  </div>
                  <div className="p-2.5 bg-white border border-neutral-200 rounded-lg text-center font-mono">
                    <span className="font-bold text-neutral-900 block">500 KB</span>
                    <span className="text-[10px] text-neutral-500">Resumes / HR</span>
                  </div>
                  <div className="p-2.5 bg-white border border-neutral-200 rounded-lg text-center font-mono">
                    <span className="font-bold text-neutral-900 block">1 MB – 2 MB</span>
                    <span className="text-[10px] text-neutral-500">Legal / Grants</span>
                  </div>
                </div>
                <p className="text-xs text-neutral-500 pt-1">
                  Or switch to the <strong>Custom Slider</strong> to define any custom threshold from 50 KB to 20 MB.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col sm:flex-row gap-5 p-6 rounded-xl bg-neutral-50 border border-neutral-200">
              <div className="w-10 h-10 rounded-xl bg-neutral-900 text-white font-bold flex items-center justify-center shrink-0 text-base">
                3
              </div>
              <div className="space-y-2 flex-1">
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-emerald-600" />
                  <h2 className="text-base font-bold text-neutral-900">Click "Compress PDF" & Watch Live Processing</h2>
                </div>
                <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                  Hit the primary compression button. The WebAssembly engine immediately evaluates stream compression and raster matrices, displaying live progress and final file size calculations in real time.
                </p>
              </div>
            </div>

            {/* Step 4 */}
            <div className="flex flex-col sm:flex-row gap-5 p-6 rounded-xl bg-neutral-50 border border-neutral-200">
              <div className="w-10 h-10 rounded-xl bg-neutral-900 text-white font-bold flex items-center justify-center shrink-0 text-base">
                4
              </div>
              <div className="space-y-2 flex-1">
                <div className="flex items-center gap-2">
                  <Download className="w-4 h-4 text-emerald-600" />
                  <h2 className="text-base font-bold text-neutral-900">Preview Quality & Download</h2>
                </div>
                <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                  Inspect the page preview to confirm text clarity and image sharpness. Click <strong className="text-neutral-900">"Download Compressed PDF"</strong> to save your optimized document instantly without watermarks.
                </p>
              </div>
            </div>
          </div>

          {/* Pro Tips Section */}
          <div className="space-y-4 pt-4 border-t border-neutral-100">
            <h2 className="text-lg font-bold text-neutral-900">Best Practices for Portal Acceptance</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm text-neutral-600">
              <div className="p-4 rounded-xl border border-neutral-200 bg-white space-y-1">
                <span className="font-semibold text-neutral-900 block">Check Margin of Safety</span>
                <span>If a portal limits uploads to 200 KB, set your target to 190 KB to safely account for portal metadata calculation differences.</span>
              </div>
              <div className="p-4 rounded-xl border border-neutral-200 bg-white space-y-1">
                <span className="font-semibold text-neutral-900 block">Scanned Documents</span>
                <span>Multi-page scanned passports and transcripts compress best with adaptive DPI downsampling, maintaining stamp legibility.</span>
              </div>
            </div>
          </div>

          {/* Call to action */}
          <div className="pt-6 border-t border-neutral-100 flex flex-col sm:flex-row items-center justify-between gap-4 bg-emerald-500/10 p-6 rounded-xl border border-emerald-500/20">
            <div className="space-y-1 text-center sm:text-left">
              <h3 className="font-bold text-neutral-900 text-base">Ready to compress your document?</h3>
              <p className="text-xs text-neutral-600">No account required. Fast, free, and processed 100% locally on your device.</p>
            </div>
            <button
              onClick={onBack}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-semibold rounded-lg transition-colors shadow-xs whitespace-nowrap"
            >
              <span>Open Compressor Now</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </article>
      )}
    </div>
  );
};
