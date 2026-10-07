import type { LandingPageSEO, TargetPreset } from '../types';

export const TARGET_PRESETS: TargetPreset[] = [
  {
    id: '100kb',
    label: '100 KB',
    targetKB: 100,
    badge: 'Govt & Exams',
    description: 'Compress under 100 KB for strict government forms and civil service exam portals.',
    bestFor: 'UPSC, SSC, State PSC, Voter ID, Aadhaar, Passport photo/signature bundles.',
  },
  {
    id: '200kb',
    label: '200 KB',
    targetKB: 200,
    badge: 'Visa & Consular',
    description: 'Compress under 200 KB for international visa, immigration, and consular upload systems.',
    bestFor: 'Schengen Visa, Canada IRCC, UKVI, Australian Home Affairs, US DS-160 proof docs.',
  },
  {
    id: '500kb',
    label: '500 KB',
    targetKB: 500,
    badge: 'Resumes & HR',
    description: 'Compress under 500 KB for corporate applicant tracking systems and university admissions.',
    bestFor: 'Workday, Taleo, Greenhouse, Common App, UCAS, college transcript uploads.',
  },
  {
    id: '1mb',
    label: '1 MB',
    targetKB: 1000,
    badge: 'Email & Court',
    description: 'Compress under 1 MB for seamless email attachments and court e-filing repositories.',
    bestFor: 'Outlook/Gmail mobile attachments, federal court CM/ECF e-filing, bank loan applications.',
  },
  {
    id: '2mb',
    label: '2 MB',
    targetKB: 2000,
    badge: 'Academic & Thesis',
    description: 'Compress under 2 MB for academic publications, research grants, and university dissertations.',
    bestFor: 'ProQuest, IEEE, PubMed submissions, NSF/NIH grant applications, conference papers.',
  },
  {
    id: '5mb',
    label: '5 MB',
    targetKB: 5000,
    badge: 'Real Estate & Legal',
    description: 'Compress under 5 MB for multi-page real estate disclosures, escrow packages, and audits.',
    bestFor: 'DocuSign, Dotloop, IRS e-file supporting schedules, commercial lease agreements.',
  },
  {
    id: '10mb',
    label: '10 MB',
    targetKB: 10000,
    badge: 'Portfolios & Scans',
    description: 'Compress under 10 MB for large architectural drawings, slide decks, and high-res booklets.',
    bestFor: 'Design portfolios, pitch decks, building blueprints, scanned books and manuals.',
  },
];

export const SEO_LANDING_PAGES: Record<string, LandingPageSEO> = {
  '/': {
    path: '/',
    targetPresetId: 'custom',
    targetKB: 500,
    metaTitle: 'DocuShrink – Exact-Size PDF Compressor & Zero-Upload PDF Tools',
    metaDescription: 'Compress PDF to exact target file sizes (100KB, 200KB, 500KB, 1MB, 2MB) for government, visa, and portal limits. 100% private, free, and processed locally in your browser.',
    h1: 'Exact-Size PDF Compressor',
    subtitle: 'Dial in the exact file size you need for government portals, visa applications, and job boards. Zero cloud uploads—processed entirely on your device.',
    badgeText: 'Zero-Upload Document Engine',
    primaryUseCase: 'General multipurpose compression with granular target control from 50KB to 20MB.',
    portalExamples: [
      {
        name: 'Government & Public Service Portals',
        category: 'Public Sector',
        requirement: 'Strictly 100 KB to 200 KB per certificate',
        notes: 'Files exceeding the limit trigger instant rejection without human review.',
      },
      {
        name: 'Corporate Career & ATS Portals (Workday, Taleo)',
        category: 'Employment',
        requirement: 'Under 500 KB to 2 MB for resumes and portfolios',
        notes: 'Large PDFs cause timeout errors during automatic parser indexing.',
      },
      {
        name: 'Immigration & Consular Portals (IRCC, UKVI, Schengen)',
        category: 'Immigration',
        requirement: '200 KB to 1 MB per document proof',
        notes: 'Scanned bank statements and leases must retain legible text and stamps.',
      },
    ],
    technicalTips: [
      'Choose a specific target preset or use the Custom Slider for custom byte limits.',
      'Our engine tests lossless object stream compression first before attempting visual downsampling.',
      'Scanned documents benefit most from 150 DPI adaptive resampling, shrinking size by up to 90% while maintaining legibility.',
      'All processing runs inside your browser using WebAssembly. Your files never touch our servers.',
    ],
    faqs: [
      {
        question: 'How is this different from generic PDF compressors like iLovePDF or Smallpdf?',
        answer: 'Generic tools only offer vague options like "Low", "Medium", or "High" compression, giving you an unpredictable output size. If your portal requires under 200KB and their "High" produces 240KB, you get rejected. DocuShrink optimizes specifically toward your exact target size in kilobytes.',
      },
      {
        question: 'Are my uploaded documents safe and private?',
        answer: 'Yes, 100%. DocuShrink operates entirely on your device using client-side WebAssembly and modern browser Canvas APIs. Your PDF is never transmitted across the network, stored on a remote server, or viewed by anyone.',
      },
      {
        question: 'Will text in my document remain crisp and readable?',
        answer: 'Yes. If your document is composed of vector text, our engine compresses internal object streams without touching fonts or lines. If it contains scanned photos, our adaptive sampler calculates the optimal JPEG quality curve to preserve legibility of small print and numbers.',
      },
      {
        question: 'Can I use this tool on my mobile phone?',
        answer: 'Yes. DocuShrink is engineered with a mobile-first responsive architecture. You can upload files directly from iPhone Files/Photos or Android Storage and download the compressed PDF in seconds.',
      },
    ],
    relatedPages: [
      { title: 'Compress PDF to 100KB', path: '/compress-pdf-to-100kb/', sizeTag: '100 KB' },
      { title: 'Compress PDF to 200KB', path: '/compress-pdf-to-200kb/', sizeTag: '200 KB' },
      { title: 'Compress PDF to 500KB', path: '/compress-pdf-to-500kb/', sizeTag: '500 KB' },
      { title: 'Compress PDF to 1MB', path: '/compress-pdf-to-1mb/', sizeTag: '1 MB' },
    ],
  },
  '/compress-pdf/': {
    path: '/compress-pdf/',
    targetPresetId: 'custom',
    targetKB: 500,
    metaTitle: 'Exact-Size PDF Compressor – Compress to 100KB, 200KB, 500KB, 1MB Online Free',
    metaDescription: 'Target exact PDF file size limits (100KB, 200KB, 500KB, 1MB, 2MB). Free, private, and 100% processed locally in your browser. No registration, no watermarks.',
    h1: 'Exact-Size PDF Compressor',
    subtitle: 'Dial in the exact file size you need for government portals, visa applications, and job boards. Zero cloud uploads—processed entirely on your device.',
    badgeText: 'Zero-Upload Document Engine',
    primaryUseCase: 'General multipurpose compression with granular target control from 50KB to 20MB.',
    portalExamples: [
      {
        name: 'Government & Public Service Portals',
        category: 'Public Sector',
        requirement: 'Strictly 100 KB to 200 KB per certificate',
        notes: 'Files exceeding the limit trigger instant rejection without human review.',
      },
      {
        name: 'Corporate Career & ATS Portals (Workday, Taleo)',
        category: 'Employment',
        requirement: 'Under 500 KB to 2 MB for resumes and portfolios',
        notes: 'Large PDFs cause timeout errors during automatic parser indexing.',
      },
      {
        name: 'Immigration & Consular Portals (IRCC, UKVI, Schengen)',
        category: 'Immigration',
        requirement: '200 KB to 1 MB per document proof',
        notes: 'Scanned bank statements and leases must retain legible text and stamps.',
      },
    ],
    technicalTips: [
      'Choose a specific target preset or use the Custom Slider for custom byte limits.',
      'Our engine tests lossless object stream compression first before attempting visual downsampling.',
      'Scanned documents benefit most from 150 DPI adaptive resampling, shrinking size by up to 90% while maintaining legibility.',
      'All processing runs inside your browser using WebAssembly. Your files never touch our servers.',
    ],
    faqs: [
      {
        question: 'How is this different from generic PDF compressors like iLovePDF or Smallpdf?',
        answer: 'Generic tools only offer vague options like "Low", "Medium", or "High" compression, giving you an unpredictable output size. If your portal requires under 200KB and their "High" produces 240KB, you get rejected. DocuShrink optimizes specifically toward your exact target size in kilobytes.',
      },
      {
        question: 'Are my uploaded documents safe and private?',
        answer: 'Yes, 100%. DocuShrink operates entirely on your device using client-side WebAssembly and modern browser Canvas APIs. Your PDF is never transmitted across the network, stored on a remote server, or viewed by anyone.',
      },
      {
        question: 'Will text in my document remain crisp and readable?',
        answer: 'Yes. If your document is composed of vector text, our engine compresses internal object streams without touching fonts or lines. If it contains scanned photos, our adaptive sampler calculates the optimal JPEG quality curve to preserve legibility of small print and numbers.',
      },
      {
        question: 'Can I use this tool on my mobile phone?',
        answer: 'Yes. DocuShrink is engineered with a mobile-first responsive architecture. You can upload files directly from iPhone Files/Photos or Android Storage and download the compressed PDF in seconds.',
      },
    ],
    relatedPages: [
      { title: 'Compress PDF to 100KB', path: '/compress-pdf-to-100kb/', sizeTag: '100 KB' },
      { title: 'Compress PDF to 200KB', path: '/compress-pdf-to-200kb/', sizeTag: '200 KB' },
      { title: 'Compress PDF to 500KB', path: '/compress-pdf-to-500kb/', sizeTag: '500 KB' },
      { title: 'Compress PDF to 1MB', path: '/compress-pdf-to-1mb/', sizeTag: '1 MB' },
    ],
  },

  '/compress-pdf-to-100kb/': {
    path: '/compress-pdf-to-100kb/',
    targetPresetId: '100kb',
    targetKB: 100,
    metaTitle: 'Compress PDF to 100KB Online Free – Exact Government & Exam Portal Target',
    metaDescription: 'Reduce PDF file size under 100KB online for free. Engineered for UPSC, SSC, state recruitment, and passport portals. 100% private, browser-processed, no watermark.',
    h1: 'Compress PDF to 100KB or Less Online',
    subtitle: 'Meet strict government and public service recruitment file limits. Fast, free, and processed 100% locally in your browser with zero data uploads.',
    badgeText: 'Exam & Government Specialist',
    primaryUseCase: 'Civil service examination forms, state employment portals, voter ID scans, and biometric proof submissions.',
    portalExamples: [
      {
        name: 'UPSC (Union Public Service Commission)',
        category: 'Government Exams',
        requirement: 'Max 100 KB per certificate/marksheet',
        notes: 'Files larger than 100 KB are blocked by client-side JavaScript validators.',
      },
      {
        name: 'SSC (Staff Selection Commission)',
        category: 'Government Exams',
        requirement: '50 KB to 100 KB range for proof docs',
        notes: 'Document must remain readable when viewed at 100% zoom.',
      },
      {
        name: 'State PSC & Police Recruitment Portals',
        category: 'State Service',
        requirement: 'Strictly under 100 KB (often capped at 102,400 bytes)',
        notes: 'Requires aggressive metadata stripping to maximize image pixel budget.',
      },
      {
        name: 'National Identity / Passport Photo & Signature Slips',
        category: 'Identity',
        requirement: '100 KB maximum',
        notes: 'Signatures and stamps must remain high-contrast black on white.',
      },
    ],
    technicalTips: [
      'To reach 100KB on multi-page files, the engine applies ~150 DPI resolution scaling.',
      'Black and white scans or high-contrast document modes compress far more efficiently than full-color photos.',
      'All invisible XML metadata, thumbnail caches, and revision history are automatically pruned.',
      'Check preview zoom to verify that your roll number and signature are crisp.',
    ],
    faqs: [
      {
        question: 'Why do government portals enforce a 100KB limit?',
        answer: 'Government portals handle millions of applicants simultaneously. Strict 100KB limits conserve server bandwidth, prevent database storage bloat, and allow instant loading for evaluation officers on slow government connections.',
      },
      {
        question: 'What if my 10-page document cannot mathematically fit into 100KB?',
        answer: 'A standard PDF container has structural overhead (~5KB per page). For documents longer than 5 pages, reaching 100KB requires aggressive downsampling. If your file contains 10+ high-res color pages, consider splitting the document into required pages or selecting 200KB.',
      },
      {
        question: 'Is my government ID or certificate safe here?',
        answer: 'Completely safe. Unlike other converters that upload your confidential certificates to third-party cloud storage, DocuShrink operates 100% inside your web browser. Zero bytes leave your device.',
      },
    ],
    relatedPages: [
      { title: 'Compress PDF to 200KB', path: '/compress-pdf-to-200kb/', sizeTag: '200 KB' },
      { title: 'Compress PDF to 500KB', path: '/compress-pdf-to-500kb/', sizeTag: '500 KB' },
      { title: 'All PDF Compression Tools', path: '/compress-pdf/', sizeTag: 'Universal' },
    ],
  },

  '/compress-pdf-to-200kb/': {
    path: '/compress-pdf-to-200kb/',
    targetPresetId: '200kb',
    targetKB: 200,
    metaTitle: 'Compress PDF to 200KB Online Free – Visa & Immigration Portals (Zero Upload)',
    metaDescription: 'Compress your PDF under 200KB for Schengen visa, Canada IRCC, UKVI, and passport applications. Instant client-side processing with zero server uploads.',
    h1: 'Compress PDF to 200KB Online Free',
    subtitle: 'Engineered specifically for international visa systems, immigration uploads, and official consular documentation. 100% private and instant.',
    badgeText: 'Visa & Immigration Standard',
    primaryUseCase: 'Schengen visa proof of funds, Canada IRCC travel history, UKVI sponsorship slips, and consular appointment files.',
    portalExamples: [
      {
        name: 'VFS Global / TLScontact (Schengen Visa Portals)',
        category: 'Visa Portals',
        requirement: 'Max 200 KB to 500 KB per supporting slip',
        notes: 'Exceeding limits causes upload session expiration and lost appointment slots.',
      },
      {
        name: 'Canada IRCC (Immigration, Refugees and Citizenship Canada)',
        category: 'Immigration',
        requirement: '200 KB per single document category slot',
        notes: 'Passport biopage and bank statements must show clear account numbers.',
      },
      {
        name: 'UKVI (UK Visas and Immigration e-Upload)',
        category: 'Immigration',
        requirement: 'Max 200 KB to 1 MB for financial appendices',
        notes: 'Document scanner often produces 2-4MB files that must be compressed.',
      },
    ],
    technicalTips: [
      '200KB provides the sweet spot for 2-3 page bank statements: high-contrast text and stamps remain easily verifiable.',
      'Our engine balances JPEG chrominance and spatial downsampling to retain bank letterhead logos.',
      'If your scan contains color margins from the scanner bed, trim them first to gain an extra 40KB of image clarity.',
    ],
    faqs: [
      {
        question: 'Will visa consular officers be able to read my bank statement at 200KB?',
        answer: 'Yes. Our adaptive sampler prioritizes high-frequency details (numbers, dates, stamps, and small text), ensuring that bank account numbers, currency totals, and signatures are legible when zoomed to 100%.',
      },
      {
        question: 'Can I compress multiple bank statement pages to under 200KB?',
        answer: 'Yes, up to 3-5 pages typically fit under 200KB cleanly. For longer statements (10+ pages), we recommend compressing only the most recent summary pages or downloading as black-and-white.',
      },
      {
        question: 'Why do VFS and TLScontact reject files over 200KB?',
        answer: 'Consular upload gateways enforce strict per-slot file size quotas to prevent denial-of-service and reduce legacy database storage load. Submitting a file even 1 KB over the threshold results in an instant upload error.',
      },
      {
        question: 'Is it safe to upload confidential visa documents to DocuShrink?',
        answer: 'DocuShrink does not upload your files anywhere. All PDF compression executes 100% locally within your browser sandbox via WebAssembly and Canvas. Your passport scans and bank statements never leave your device.',
      },
    ],
    relatedPages: [
      { title: 'Compress PDF to 100KB', path: '/compress-pdf-to-100kb/', sizeTag: '100 KB' },
      { title: 'Compress PDF to 500KB', path: '/compress-pdf-to-500kb/', sizeTag: '500 KB' },
      { title: 'Compress PDF to 1MB', path: '/compress-pdf-to-1mb/', sizeTag: '1 MB' },
    ],
  },

  '/compress-pdf-to-500kb/': {
    path: '/compress-pdf-to-500kb/',
    targetPresetId: '500kb',
    targetKB: 500,
    metaTitle: 'Compress PDF to 500KB Online – Free Resume & Job Application Optimizer',
    metaDescription: 'Reduce PDF under 500KB for Workday, Taleo, Greenhouse, and university admission portals. Fast, private, no signup, no watermark.',
    h1: 'Compress PDF to 500KB Online',
    subtitle: 'Optimize resumes, CVs, portfolio summaries, and university transcripts to glide through corporate Applicant Tracking Systems (ATS).',
    badgeText: 'ATS & Career Standard',
    primaryUseCase: 'Corporate job applications, HR recruitment portals, college admissions, and scholarship applications.',
    portalExamples: [
      {
        name: 'Workday Career Portal',
        category: 'Job Applications',
        requirement: 'Max 500 KB to 2 MB limit',
        notes: 'Portals frequently freeze or throw gateway timeouts on files over 500 KB.',
      },
      {
        name: 'Oracle Taleo Enterprise',
        category: 'Job Applications',
        requirement: '500 KB recommended for instant resume parsing',
        notes: 'Fast ATS parsing ensures your skills and experience are accurately indexed.',
      },
      {
        name: 'Common Application (College Admissions)',
        category: 'Education',
        requirement: 'Under 500 KB per uploaded PDF addendum',
        notes: 'High volume submission weeks crash slow uploads; under 500KB uploads reliably.',
      },
    ],
    technicalTips: [
      '500KB is plenty of room for 2-4 page resumes with profile photos and graphic accents.',
      'Our engine preserves embedded vector typography whenever possible so ATS text extractors never fail.',
      'Embedded fonts and unused font subsets are automatically purged to save up to 250KB without visual loss.',
    ],
    faqs: [
      {
        question: 'Will compression break the ATS parser scanning my resume?',
        answer: 'No. When compressing resumes, DocuShrink preserves structural text streams and font glyph encodings. The automated ATS software reads the exact same character strings while the file size is reduced.',
      },
      {
        question: 'Is 500KB safe for sending via LinkedIn messaging and email?',
        answer: 'Yes. 500KB delivers almost instantly on cellular mobile connections and avoids all inbox attachment limits.',
      },
      {
        question: 'How do I know if my resume is already under 500KB?',
        answer: 'When you select your PDF in DocuShrink, our tool immediately displays the exact byte size. If your file is already under 500KB, it preserves 100% of your original document without unnecessary downsampling.',
      },
      {
        question: 'Does DocuShrink add a watermark to my resume or transcript?',
        answer: 'Never. DocuShrink is completely free and never adds watermarks, stamps, or promotional text to any output document.',
      },
    ],
    relatedPages: [
      { title: 'Compress PDF to 200KB', path: '/compress-pdf-to-200kb/', sizeTag: '200 KB' },
      { title: 'Compress PDF to 1MB', path: '/compress-pdf-to-1mb/', sizeTag: '1 MB' },
      { title: 'Compress PDF to 2MB', path: '/compress-pdf-to-2mb/', sizeTag: '2 MB' },
    ],
  },

  '/compress-pdf-to-1mb/': {
    path: '/compress-pdf-to-1mb/',
    targetPresetId: '1mb',
    targetKB: 1000,
    metaTitle: 'Compress PDF to 1MB Online Free – Fast Email & Court E-Filing Friendly',
    metaDescription: 'Compress large PDF files under 1MB online for free. Perfect for email attachments, legal briefs, and federal court CM/ECF uploads. Zero uploads, 100% private.',
    h1: 'Compress PDF to 1MB Online Free',
    subtitle: 'Shrink multi-page legal filings, business reports, and contracts to under 1 Megabyte for seamless email delivery and regulatory compliance.',
    badgeText: 'Email & Legal Standard',
    primaryUseCase: 'Legal court filings, corporate email attachments, bank loan packages, and contract disclosures.',
    portalExamples: [
      {
        name: 'Federal Court CM/ECF E-Filing System',
        category: 'Legal Filing',
        requirement: 'Under 1 MB to 5 MB per exhibit',
        notes: 'Clerk offices reject oversized filings; 1MB guarantees instantaneous acceptance.',
      },
      {
        name: 'Corporate Outlook & Exchange Gateways',
        category: 'Email',
        requirement: '1 MB safe threshold for mobile inboxes',
        notes: 'Avoids bounce-backs when recipients have strict mailbox quotas.',
      },
      {
        name: 'Mortgage & Escrow Lending Portals',
        category: 'Banking',
        requirement: 'Max 1 MB per document batch slot',
        notes: 'Tax returns and W-2 packages upload smoothly.',
      },
    ],
    technicalTips: [
      '1MB allows documents up to 20-30 pages to look sharp with high vector fidelity.',
      'Our engine compresses high-resolution scanned graphics while maintaining 100% legibility of fine footnotes.',
      'Lossless stream compression alone often trims 1.5MB files down to 900KB with zero pixel degradation.',
    ],
    faqs: [
      {
        question: 'Will 1MB compression reduce the quality of embedded graphs or charts?',
        answer: 'Not at 1MB. Because 1MB allows a generous byte budget, vector charts and text remain 100% losslessly intact, and embedded raster images retain crisp ~200 DPI resolution.',
      },
      {
        question: 'How fast is 1MB compression in DocuShrink?',
        answer: 'Because all processing happens on your computer or phone using WebAssembly, a typical 10-page document compresses in less than 2 seconds without waiting for cloud queues.',
      },
      {
        question: 'What happens if my file is already smaller than 1MB?',
        answer: 'If your file is already under 1MB, DocuShrink recognizes this immediately and preserves your original file fidelity 100% without aggressive downsampling.',
      },
      {
        question: 'Can I compress password-protected PDF files to 1MB?',
        answer: 'For security reasons, please remove password encryption before compressing. Once optimized to 1MB, you can re-apply password protection in your local PDF reader.',
      },
    ],
    relatedPages: [
      { title: 'Compress PDF to 500KB', path: '/compress-pdf-to-500kb/', sizeTag: '500 KB' },
      { title: 'Compress PDF to 2MB', path: '/compress-pdf-to-2mb/', sizeTag: '2 MB' },
      { title: 'Compress PDF to 5MB', path: '/compress-pdf-to-5mb/', sizeTag: '5 MB' },
    ],
  },

  '/compress-pdf-to-2mb/': {
    path: '/compress-pdf-to-2mb/',
    targetPresetId: '2mb',
    targetKB: 2000,
    metaTitle: 'Compress PDF to 2MB Online Free – Academic, Thesis & Publication Limit',
    metaDescription: 'Compress your PDF to 2MB or less. Engineered for university dissertations, IEEE/PubMed papers, and grant submission portals. Free, private, and fast.',
    h1: 'Compress PDF to 2MB Online',
    subtitle: 'Optimize academic manuscripts, dissertations, and research papers with high-resolution scientific figures and citations under 2 Megabytes.',
    badgeText: 'Academic & Research',
    primaryUseCase: 'Journal submissions, ProQuest dissertation archives, NIH/NSF grant uploads, and academic conference binders.',
    portalExamples: [
      {
        name: 'ProQuest Dissertations & Theses',
        category: 'Academic',
        requirement: 'Under 2 MB to 5 MB per chapter supplement',
        notes: 'Ensures global institutional indexing without server timeouts.',
      },
      {
        name: 'IEEE & Elsevier Manuscript Central',
        category: 'Publishing',
        requirement: 'Max 2 MB for preliminary review drafts',
        notes: 'Preserves scientific diagram readability and mathematical typography.',
      },
    ],
    technicalTips: [
      '2MB is ideal for scientific manuscripts with color plots and equations.',
      'Our engine strips non-essential embedded CMYK color profiles, saving hundreds of kilobytes.',
    ],
    faqs: [
      {
        question: 'Will mathematical symbols and equations stay clear at 2MB?',
        answer: 'Yes. Mathematical formulas and LaTeX vector typography are preserved losslessly without blurriness.',
      },
      {
        question: 'Does 2MB compression alter the page numbering or table of contents?',
        answer: 'No. All PDF page coordinates, margins, structural bookmarks, and internal link annotations remain completely intact.',
      },
      {
        question: 'Can I compress a 50-page dissertation under 2MB?',
        answer: 'Yes. Standard text documents with 50+ pages easily fit well under 2MB. If your document has dozens of raw microscope photos, our engine optimizes image streams while preserving clarity.',
      },
    ],
    relatedPages: [
      { title: 'Compress PDF to 1MB', path: '/compress-pdf-to-1mb/', sizeTag: '1 MB' },
      { title: 'Compress PDF to 5MB', path: '/compress-pdf-to-5mb/', sizeTag: '5 MB' },
    ],
  },

  '/compress-pdf-to-5mb/': {
    path: '/compress-pdf-to-5mb/',
    targetPresetId: '5mb',
    targetKB: 5000,
    metaTitle: 'Compress PDF to 5MB Online Free – Real Estate, Legal & Audit Bundles',
    metaDescription: 'Compress large PDF files under 5MB for real estate disclosures, escrow contracts, and tax schedules. 100% private, instant client-side execution.',
    h1: 'Compress PDF to 5MB Online Free',
    subtitle: 'Tame massive 20MB to 50MB scanned closing packages and legal agreements down to a neat, manageable 5 Megabyte file.',
    badgeText: 'Real Estate & Audit',
    primaryUseCase: 'Real estate closing binders, escrow disclosures, IRS tax schedules, and commercial lease contracts.',
    portalExamples: [
      {
        name: 'DocuSign & Dotloop Transaction Rooms',
        category: 'Real Estate',
        requirement: 'Under 5 MB recommended for mobile signing stability',
        notes: 'Large 30MB files crash mobile browsers during signature verification.',
      },
      {
        name: 'IRS Electronic Filing Gateways',
        category: 'Taxation',
        requirement: 'Max 5 MB per binary PDF attachment',
        notes: 'Schedules and audit workpapers must comply with gateway limits.',
      },
    ],
    technicalTips: [
      'Scanners frequently save multi-page documents as uncompressed 300 DPI TIFFs inside PDFs, bloating a 20-page file to 40MB.',
      'DocuShrink re-encodes scanned pages into optimized JPEG streams, shrinking 40MB down to 3.8MB in seconds.',
    ],
    faqs: [
      {
        question: 'Can DocuShrink handle a 50-page scanned closing packet?',
        answer: 'Yes. Because our engine operates directly in your local browser sandbox, it can process large multi-page bundles without cloud file size limits or network timeout errors.',
      },
      {
        question: 'Will notary stamps and handwritten signatures remain legible?',
        answer: 'Yes. The 5MB byte budget allows high DPI rasterization, keeping notary seals, county stamps, and signatures sharp and legally verifiable.',
      },
      {
        question: 'Is my financial data safe when compressing closing documents?',
        answer: 'Completely safe. Your documents are never uploaded to our servers or stored in any database. All processing takes place within your own browser session.',
      },
    ],
    relatedPages: [
      { title: 'Compress PDF to 2MB', path: '/compress-pdf-to-2mb/', sizeTag: '2 MB' },
      { title: 'Compress PDF to 10MB', path: '/compress-pdf-to-10mb/', sizeTag: '10 MB' },
    ],
  },

  '/compress-pdf-to-10mb/': {
    path: '/compress-pdf-to-10mb/',
    targetPresetId: '10mb',
    targetKB: 10000,
    metaTitle: 'Compress PDF to 10MB Online Free – Portfolios, Blueprints & Large Decks',
    metaDescription: 'Compress oversized PDFs under 10MB online for free. Ideal for architectural drawings, graphic design portfolios, and multi-slide pitch decks.',
    h1: 'Compress PDF to 10MB Online Free',
    subtitle: 'Reduce heavy 100MB+ design presentations, CAD exports, and scanned books down to a fast-loading 10 Megabyte document.',
    badgeText: 'Design & Engineering',
    primaryUseCase: 'Architecture portfolios, construction blueprints, investor pitch decks, and digital book scans.',
    portalExamples: [
      {
        name: 'Venture Capital & Investor Submissions',
        category: 'Startups',
        requirement: 'Under 10 MB for investor deck attachments',
        notes: 'Investors read pitch decks on mobile; oversized files get deleted or ignored.',
      },
      {
        name: 'Municipal Building Permit Portals',
        category: 'Civil & Architecture',
        requirement: 'Max 10 MB per architectural drawing sheet set',
        notes: 'Maintains crisp vector line-weights for CAD and Revit exports.',
      },
    ],
    technicalTips: [
      'For design portfolios, our engine preserves CMYK/sRGB color balance and suppresses JPEG ringing around text.',
      'High-resolution photos are balanced to 220 DPI, ensuring razor-sharp rendering on Retina displays.',
    ],
    faqs: [
      {
        question: 'Will image colors look faded after 10MB compression?',
        answer: 'No. At 10MB, the byte budget allows rich 24-bit color depth with minimal quantization noise.',
      },
      {
        question: 'Can CAD blueprints and vector schematics retain sharp lines at 10MB?',
        answer: 'Yes. CAD line weights, title blocks, and dimension callouts are preserved losslessly whenever possible.',
      },
      {
        question: 'What happens if my document is already smaller than 10MB?',
        answer: 'DocuShrink treats 10MB as an upper ceiling. If your document is already smaller (for example, 2.5MB), it preserves 100% of your original quality without any downsampling.',
      },
    ],
    relatedPages: [
      { title: 'Compress PDF to 5MB', path: '/compress-pdf-to-5mb/', sizeTag: '5 MB' },
      { title: 'All PDF Compression Tools', path: '/compress-pdf/', sizeTag: 'Universal' },
    ],
  },
};
