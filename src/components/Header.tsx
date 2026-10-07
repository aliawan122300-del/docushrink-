import React, { useState } from 'react';
import { ShieldCheck, Menu, X, ArrowRight, FileCheck, Layers, FileDown } from 'lucide-react';

interface HeaderProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  onOpenPrivacy: () => void;
}

export const Header: React.FC<HeaderProps> = ({ currentPath, onNavigate, onOpenPrivacy }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Exact Compressor', path: '/' },
    { label: 'How to Compress', path: '/how-to-compress-pdf/' },
    { label: 'FAQ', path: '/faq/' },
    { label: 'About', path: '/about/' },
    { label: 'Contact', path: '/contact/' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-neutral-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Zone 1: Single element brand wordmark */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate('/')}
              className="group flex items-center gap-2 text-left focus:outline-none"
            >
              <div className="w-9 h-9 rounded-lg bg-neutral-900 text-white flex items-center justify-center font-bold text-lg tracking-tight group-hover:bg-neutral-800 transition-colors">
                <FileCheck className="w-5 h-5 text-emerald-400" />
              </div>
              <span className="text-xl font-bold tracking-tight text-neutral-950">
                Docu<span className="text-emerald-600">Shrink</span>
              </span>
            </button>
          </div>

          {/* Zone 2: 4-6 clean text navigation links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-neutral-600">
            {navLinks.map((link) => {
              const isActive = currentPath === link.path;
              return (
                <button
                  key={link.path}
                  onClick={() => onNavigate(link.path)}
                  className={`transition-colors whitespace-nowrap py-1 relative ${
                    isActive
                      ? 'text-neutral-950 font-semibold'
                      : 'hover:text-neutral-950'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-neutral-950 rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: 1-2 primary actions */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={onOpenPrivacy}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-neutral-600 hover:text-neutral-950 transition-colors bg-neutral-100/70 hover:bg-neutral-100 rounded-md border border-neutral-200"
              title="Learn how DocuShrink processes files locally without uploading"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span className="whitespace-nowrap">Zero-Upload Guarantee</span>
            </button>

            <button
              onClick={() => onNavigate('/compress-pdf/')}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-neutral-950 hover:bg-neutral-800 rounded-lg transition-colors whitespace-nowrap shadow-xs active:scale-[0.98]"
            >
              <span>Compress PDF</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile menu trigger */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={onOpenPrivacy}
              className="p-2 text-neutral-600 hover:text-neutral-900"
              aria-label="Security guarantee"
            >
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-neutral-600 hover:text-neutral-900 rounded-lg hover:bg-neutral-100"
              aria-label="Open navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile navigation drawer */}
      {mobileMenuOpen && (
        <div className="sm:hidden border-b border-neutral-200 bg-white px-4 pt-3 pb-5 space-y-2">
          <div className="text-xs font-semibold uppercase tracking-wider text-neutral-400 px-2 py-1">
            Navigation
          </div>
          {navLinks.map((link) => (
            <button
              key={link.path}
              onClick={() => {
                onNavigate(link.path);
                setMobileMenuOpen(false);
              }}
              className={`w-full text-left px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                currentPath === link.path
                  ? 'bg-neutral-900 text-white font-semibold'
                  : 'text-neutral-700 hover:bg-neutral-100'
              }`}
            >
              {link.label}
            </button>
          ))}
          <div className="pt-2 border-t border-neutral-100 space-y-1">
            <button
              onClick={() => {
                onNavigate('/privacy/');
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2 text-sm text-neutral-600 hover:bg-neutral-100 rounded-md"
            >
              Privacy Policy
            </button>
            <button
              onClick={() => {
                onNavigate('/terms/');
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2 text-sm text-neutral-600 hover:bg-neutral-100 rounded-md"
            >
              Terms of Service
            </button>
            <button
              onClick={() => {
                onOpenPrivacy();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center gap-2 px-3 py-2 text-sm text-emerald-700 hover:bg-emerald-50 rounded-md"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Zero-Upload Guarantee Details</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
