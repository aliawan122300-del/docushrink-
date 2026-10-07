import React from 'react';
import { X, ShieldCheck, Cpu, HardDrive, Lock, ExternalLink, CheckCircle } from 'lucide-react';

interface PrivacyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrivacyModal: React.FC<PrivacyModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-neutral-950/60 backdrop-blur-xs">
      <div
        className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-neutral-200 shadow-2xl p-6 sm:p-8 space-y-6 animate-in fade-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-neutral-900 tracking-tight">
                Our Zero-Upload Architecture
              </h2>
              <p className="text-xs text-neutral-500 mt-0.5">
                How DocuShrink protects sensitive passports, tax forms, and job applications
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 transition-colors"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4 text-xs sm:text-sm text-neutral-600 leading-relaxed">
          <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200 space-y-2">
            <div className="font-semibold text-neutral-900 flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-emerald-600" />
              <span>Verifiable Browser-Native Execution</span>
            </div>
            <p>
              When you use DocuShrink, your files are never transmitted across the internet to a cloud storage bucket
              or remote processing server. The entire compression process—from parsing PDF streams to downsampling
              canvas pixels and packaging the binary—executes inside your web browser’s local sandbox using
              JavaScript, HTML5 Canvas, and WebAssembly.
            </p>
          </div>

          <h3 className="font-bold text-neutral-900 text-sm pt-2">Why Most PDF Tools Are a Privacy Risk</h3>
          <p>
            Most commercial PDF platforms operate by having your browser upload the raw PDF to their backend cloud
            infrastructure (e.g. AWS S3, Google Cloud Storage). Even if they promise to delete your files after 1 hour,
            your sensitive personal data (Social Security numbers, bank balances, biometric passport photos) travels
            through multiple intermediate proxies and temporary server disks.
          </p>

          <h3 className="font-bold text-neutral-900 text-sm pt-2">How You Can Verify This Yourself</h3>
          <p>
            You can verify our privacy guarantee using standard browser Developer Tools:
          </p>
          <ol className="list-decimal pl-5 space-y-1.5 text-xs text-neutral-700">
            <li>Open your browser’s Developer Tools (<kbd className="bg-neutral-100 border px-1 py-0.5 rounded text-[10px]">F12</kbd> or <kbd className="bg-neutral-100 border px-1 py-0.5 rounded text-[10px]">Cmd+Option+I</kbd>).</li>
            <li>Switch to the <strong>Network</strong> tab.</li>
            <li>Drop any PDF into DocuShrink and click "Compress".</li>
            <li>You will notice <strong>0 outgoing POST/PUT file uploads</strong>. The file is processed purely in client memory.</li>
          </ol>

          <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200 text-amber-950 text-xs space-y-1">
            <span className="font-semibold block">Honest Transparency Notice:</span>
            <span>
              We do not claim "100% impenetrable security" because security also depends on your local device's integrity.
              However, because we never ingest or store your files on our infrastructure, a server-side breach of DocuShrink
              could never expose your private documents.
            </span>
          </div>
        </div>

        <div className="pt-4 border-t border-neutral-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-semibold rounded-lg transition-colors"
          >
            I Understand & Close
          </button>
        </div>
      </div>
    </div>
  );
};
