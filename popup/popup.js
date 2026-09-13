/**
 * Detect Web Technology - Wappalyzer-Style Popup Controller
 * Implements 2-column category grid, top tab switching, brand SVG icons, and Markdown copy.
 */

(function () {
  'use strict';

  // State
  let currentTechnologies = [];
  let currentHeaders = {};
  let currentTabInfo = { url: '', hostname: '', title: '' };
  let currentTheme = 'dark';
  let isScannerActive = true;
  let activeTab = 'technologies';
  let filterText = '';

  // DOM Elements
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const rescanBtn = document.getElementById('rescanBtn');
  const scannerActiveToggle = document.getElementById('scannerActiveToggle');
  const tabTechnologiesBtn = document.getElementById('tabTechnologiesBtn');
  const tabMoreInfoBtn = document.getElementById('tabMoreInfoBtn');
  const technologiesView = document.getElementById('technologiesView');
  const moreInfoView = document.getElementById('moreInfoView');
  const copyBtn = document.getElementById('copyBtn');
  const filterInput = document.getElementById('filterInput');
  const clearFilterBtn = document.getElementById('clearFilterBtn');
  const loadingView = document.getElementById('loadingView');
  const emptyView = document.getElementById('emptyView');
  const emptyTitle = document.getElementById('emptyTitle');
  const emptyDesc = document.getElementById('emptyDesc');
  const disabledView = document.getElementById('disabledView');
  const enableScannerBtn = document.getElementById('enableScannerBtn');
  const techGrid = document.getElementById('techGrid');
  const toastNotification = document.getElementById('toastNotification');

  // More Info Elements
  const appVersion = document.getElementById('appVersion');

  // Brand SVG Icons
  const BRAND_ICONS = {
    'react': `<svg viewBox="0 0 24 24"><ellipse cx="12" cy="12" rx="4" ry="10" transform="rotate(30 12 12)" stroke="#61DAFB" stroke-width="1.5" fill="none"/><ellipse cx="12" cy="12" rx="4" ry="10" transform="rotate(90 12 12)" stroke="#61DAFB" stroke-width="1.5" fill="none"/><ellipse cx="12" cy="12" rx="4" ry="10" transform="rotate(150 12 12)" stroke="#61DAFB" stroke-width="1.5" fill="none"/><circle cx="12" cy="12" r="2" fill="#61DAFB"/></svg>`,
    'vue': `<svg viewBox="0 0 24 24"><path d="M2 3h4.5L12 13 17.5 3H22L12 21 2 3z" fill="#42b883"/><path d="M6.5 3h3.5L12 7 14 3h3.5L12 13 6.5 3z" fill="#35495e"/></svg>`,
    'angular': `<svg viewBox="0 0 24 24"><path d="M12 2L2 5.5l1.5 13L12 22l8.5-3.5L22 5.5 12 2z" fill="#dd0031"/><path d="M12 2v20l8.5-3.5L22 5.5 12 2z" fill="#c3002f"/><path d="M12 5.5L6.5 17.5h2.2l1.1-2.8h4.4l1.1 2.8h2.2L12 5.5zm1.5 7.4h-3L12 8.7l1.5 4.2z" fill="#ffffff"/></svg>`,
    'nextjs': `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#000000"/><path d="M15 8h2v8h-2z" fill="#ffffff"/><path d="M9 8h2.5l5.5 8h-2.5L9 8z" fill="#ffffff"/></svg>`,
    'nuxtjs': `<svg viewBox="0 0 24 24"><path d="M1 18h8L5 10 1 18z" fill="#00DC82"/><path d="M6 18h17L14.5 4 6 18z" fill="#00C58E"/></svg>`,
    'svelte': `<svg viewBox="0 0 24 24"><path d="M18.5 7.5a4.5 4.5 0 0 0-7.2-3.6l-5 3.8a4.5 4.5 0 0 0-.8 6.2l1.3 1.7a4.5 4.5 0 0 0 6.4.7l5-3.8a4.5 4.5 0 0 0 .3-5z" fill="#ff3e00"/></svg>`,
    'wordpress': `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#21759b"/><path d="M3.4 12c0 3.3 1.9 6.2 4.7 7.6L4.3 9.4c-.6.8-.9 1.7-.9 2.6zm12.8 5.7l-2.6-7.5c.5 0 .9-.1.9-.1.4 0 .4-.6 0-.6h-2.5c-.4 0-.4.6 0 .6s.5.1.8.1l2.6 7.2-1.6 4.9c.7.2 1.5.3 2.4.3.4 0 .8 0 1.2-.1l-1.2-4.8z" fill="#ffffff"/></svg>`,
    'shopify': `<svg viewBox="0 0 24 24"><path d="M18.5 4.5l-2-1.5-1.5.5-2.5-1.5-6.5 2L3 19l12 3 6-2-2.5-15.5zm-5 1.5l1.5-.5.5 1.5-2-.5v-.5z" fill="#95BF47"/><path d="M12.5 10c-1.5 0-2 .8-2 1.5 0 1.5 3 2 3 4s-1.5 2.5-3 2.5c-1.5 0-2.5-.8-2.5-.8l.5-1.5s.8.6 1.8.6c1 0 1.5-.5 1.5-1 0-1.5-3-2-3-3.8 0-2 1.5-3 3-3 .8 0 1.5.3 1.5.3l-.3 1.2s-.5 0-.5 0z" fill="#ffffff"/></svg>`,
    'woocommerce': `<svg viewBox="0 0 24 24"><rect width="24" height="24" rx="4" fill="#96588a"/><text x="12" y="16" fill="#ffffff" font-size="12" font-weight="bold" text-anchor="middle">W</text></svg>`,
    'ruby': `<svg viewBox="0 0 24 24"><path d="M4 16l4 5 11-4-2-12L6 4 4 16z" fill="#CC342D"/><path d="M8 21l3-10-3-7-4 12 4 5z" fill="#A81414"/></svg>`,
    'python': `<svg viewBox="0 0 24 24"><path d="M12 2C6.5 2 7 4.5 7 4.5V7h5v1H5s-3-.3-3 5c0 5.5 2.5 5 2.5 5H6v-2.5c0-1.5 1-2.5 2.5-2.5h5c1.5 0 2.5-1 2.5-2.5V4.5S17.5 2 12 2zm-2.5 2a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" fill="#3776AB"/><path d="M12 22c5.5 0 5-2.5 5-2.5V17h-5v-1h7s3 .3 3-5c0-5.5-2.5-5-2.5-5H18v2.5c0 1.5-1 2.5-2.5 2.5h-5c-1.5 0-2.5 1-2.5 2.5v6S6.5 22 12 22zm2.5-2a1 1 0 1 1 0-2 1 1 0 0 1 0 2z" fill="#FFD438"/></svg>`,
    'php': `<svg viewBox="0 0 24 24"><ellipse cx="12" cy="12" rx="10" ry="6" fill="#777BB4"/><text x="12" y="15" fill="#ffffff" font-size="8" font-weight="bold" text-anchor="middle">PHP</text></svg>`,
    'javascript': `<svg viewBox="0 0 24 24"><rect width="24" height="24" rx="3" fill="#F7DF1E"/><text x="16" y="18" fill="#000000" font-size="11" font-weight="900" text-anchor="middle">JS</text></svg>`,
    'typescript': `<svg viewBox="0 0 24 24"><rect width="24" height="24" rx="3" fill="#3178C6"/><text x="16" y="18" fill="#ffffff" font-size="11" font-weight="900" text-anchor="middle">TS</text></svg>`,
    'stripe': `<svg viewBox="0 0 24 24"><rect width="24" height="24" rx="4" fill="#635BFF"/><path d="M10.5 11c0-.8.7-1.2 1.8-1.2 1.3 0 2.5.4 3.5 1v-2.8c-1.1-.4-2.3-.6-3.5-.6-3 0-5 1.5-5 4 0 3.8 5.2 3.2 5.2 4.8 0 .9-.8 1.2-2 1.2-1.6 0-3-.6-4.2-1.4v2.9c1.3.6 2.8.8 4.2.8 3.2 0 5.2-1.5 5.2-4.1 0-4.1-5.2-3.4-5.2-4.6z" fill="#ffffff"/></svg>`,
    'paypal': `<svg viewBox="0 0 24 24"><path d="M7 4h7c3 0 5 1.5 4.5 4.5-.5 3.5-3 5.5-6 5.5h-2l-1.5 7H5L7 4z" fill="#003087"/><path d="M9 7h7c3 0 4.5 1.5 4 4.5-.5 3.5-3 5.5-6 5.5h-2l-1.5 7H7L9 7z" fill="#0079C1"/></svg>`,
    'cloudflare': `<svg viewBox="0 0 24 24"><path d="M19 14.5a3.5 3.5 0 0 0-3-5.2c-.3 0-.6 0-.8.1A5.5 5.5 0 0 0 5 13.5c0 .3 0 .7.1 1a3.5 3.5 0 0 0-.1 7h14a3.5 3.5 0 0 0 0-7z" fill="#F38020"/></svg>`,
    'google-analytics': `<svg viewBox="0 0 24 24"><rect x="3" y="13" width="4" height="8" rx="1" fill="#F9AB00"/><rect x="10" y="8" width="4" height="13" rx="1" fill="#F9AB00"/><rect x="17" y="3" width="4" height="18" rx="1" fill="#E37400"/></svg>`,
    'google-tag-manager': `<svg viewBox="0 0 24 24"><path d="M12 2L3 7v10l9 5 9-5V7l-9-5z" fill="#246FDB"/><path d="M12 6L6 9.5v5L12 18l6-3.5v-5L12 6z" fill="#ffffff"/></svg>`,
    'facebook-pixel': `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#1877F2"/><path d="M14 12.5h2.5l.5-3H14V8c0-.8.3-1.5 1.5-1.5h1.5V4s-1.3-.2-2.5-.2c-2.5 0-4 1.5-4 4.2v1.5H8v3h2.5V21h3.5v-8.5z" fill="#ffffff"/></svg>`,
    'datadog': `<svg viewBox="0 0 24 24"><rect width="24" height="24" rx="4" fill="#632CA6"/><text x="12" y="16" fill="#ffffff" font-size="10" font-weight="bold" text-anchor="middle">DD</text></svg>`,
    'sentry': `<svg viewBox="0 0 24 24"><path d="M12 2L2 20h20L12 2zm0 5l6.5 11.5h-13L12 7z" fill="#362D59"/><circle cx="12" cy="14" r="2" fill="#FF4F64"/></svg>`,
    'hotjar': `<svg viewBox="0 0 24 24"><path d="M12 2a5 5 0 0 0-5 5c0 4 5 7 5 13 0-6 5-9 5-13a5 5 0 0 0-5-5z" fill="#FD3A5C"/></svg>`,
    'tailwindcss': `<svg viewBox="0 0 24 24"><path d="M12 6c-3 0-4.5 1.5-4.5 4.5 1-1.5 2.5-2 4.5-1.5 1.5.5 2.5 1.5 3.5 3 1.5 2 3.5 2.5 6.5 2 3-1 4.5-2.5 4.5-5.5-1 1.5-2.5 2-4.5 1.5-1.5-.5-2.5-1.5-3.5-3-1.5-2-3.5-2.5-6.5-1z" fill="#38BDF8"/><path d="M4 13c-3 0-4.5 1.5-4.5 4.5 1-1.5 2.5-2 4.5-1.5 1.5.5 2.5 1.5 3.5 3 1.5 2 3.5 2.5 6.5 2 3-1 4.5-2.5 4.5-5.5-1 1.5-2.5 2-4.5 1.5-1.5-.5-2.5-1.5-3.5-3-1.5-2-3.5-2.5-6.5-1z" fill="#38BDF8"/></svg>`,
    'bootstrap': `<svg viewBox="0 0 24 24"><rect width="24" height="24" rx="5" fill="#7952B3"/><text x="12" y="17" fill="#ffffff" font-size="14" font-weight="bold" text-anchor="middle">B</text></svg>`,
    'jquery': `<svg viewBox="0 0 24 24"><rect width="24" height="24" rx="4" fill="#0769AD"/><text x="12" y="16" fill="#ffffff" font-size="10" font-weight="bold" text-anchor="middle">jq</text></svg>`,
    'nginx': `<svg viewBox="0 0 24 24"><rect width="24" height="24" rx="4" fill="#009639"/><text x="12" y="16" fill="#ffffff" font-size="10" font-weight="bold" text-anchor="middle">N</text></svg>`,
    'apache': `<svg viewBox="0 0 24 24"><path d="M12 2L6 22l6-4 6 4-6-20z" fill="#D22128"/></svg>`,
    'laravel': `<svg viewBox="0 0 24 24"><path d="M4 8l8-5 8 5v8l-8 5-8-5V8z" fill="#FF2D20"/><path d="M12 3l8 5-8 5-8-5 8-5z" fill="#E51910"/></svg>`,
    'django': `<svg viewBox="0 0 24 24"><rect width="24" height="24" rx="4" fill="#092E20"/><text x="12" y="16" fill="#ffffff" font-size="10" font-weight="bold" text-anchor="middle">dj</text></svg>`,
    'ruby-on-rails': `<svg viewBox="0 0 24 24"><rect width="24" height="24" rx="4" fill="#CC0000"/><text x="12" y="16" fill="#ffffff" font-size="9" font-weight="bold" text-anchor="middle">Rails</text></svg>`,
    'golang': `<svg viewBox="0 0 24 24"><ellipse cx="12" cy="12" rx="10" ry="7" fill="#00ADD8"/><text x="12" y="15" fill="#ffffff" font-size="9" font-weight="bold" text-anchor="middle">GO</text></svg>`,
    'csharp': `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#512BD4"/><text x="12" y="16" fill="#ffffff" font-size="10" font-weight="bold" text-anchor="middle">C#</text></svg>`,
    'supabase': `<svg viewBox="0 0 24 24"><path d="M13 2L3 14h8l-2 8 12-14h-8l2-6z" fill="#3ECF8E"/></svg>`,
    'firebase': `<svg viewBox="0 0 24 24"><path d="M4 18l3-13 4 7-7 6z" fill="#FFA000"/><path d="M14 8l2-4 4 14-6-10z" fill="#F57C00"/><path d="M4 18l8 4 8-4-8-14-8 14z" fill="#FFCA28"/></svg>`,
    'netlify': `<svg viewBox="0 0 24 24"><path d="M6.5 12a5.5 5.5 0 0 1 5.5-5.5v-2a7.5 7.5 0 0 0-7.5 7.5h2zm5.5 5.5A5.5 5.5 0 0 1 6.5 12h-2a7.5 7.5 0 0 0 7.5 7.5v-2zm0-11V2.5a9.5 9.5 0 0 0-9.5 9.5h2a7.5 7.5 0 0 1 7.5-7.5zm5.5 5.5a5.5 5.5 0 0 1-5.5 5.5v2a7.5 7.5 0 0 0 7.5-7.5h-2z" fill="#00C7B7"/></svg>`,
    'react-router': `<svg viewBox="0 0 24 24"><path d="M3 4h18v4H3V4zm0 6h18v4H3v-4zm0 6h18v4H3v-4z" fill="#CA4246"/><circle cx="7" cy="6" r="1.5" fill="#ffffff"/><circle cx="17" cy="12" r="1.5" fill="#ffffff"/><circle cx="7" cy="18" r="1.5" fill="#ffffff"/></svg>`,
    'gsap': `<svg viewBox="0 0 24 24"><rect width="24" height="24" rx="4" fill="#88CE02"/><path d="M6 12c0-3.3 2.7-6 6-6s6 2.7 6 6-2.7 6-6 6-6-2.7-6-6zm4 0a2 2 0 1 0 4 0 2 2 0 0 0-4 0z" fill="#0E100F"/></svg>`,
    'youtube': `<svg viewBox="0 0 24 24"><rect width="24" height="24" rx="5" fill="#FF0000"/><path d="M10 8.5l6 3.5-6 3.5v-7z" fill="#ffffff"/></svg>`,
    'vimeo': `<svg viewBox="0 0 24 24"><path d="M22 6.5c-.1 2.2-1.6 5.1-4.7 8.9-3.2 3.9-5.9 5.8-8.1 5.8-1.4 0-2.5-1.3-3.5-3.8l-1.9-7C3.1 7.8 2.3 6.5 1.5 6.5L0 7.2l.9-1.2C2.1 4.9 3.5 3.7 5.1 3.5c1.9-.2 3.1 1.1 3.6 3.9.5 3.3.9 5.4 1.1 6.3.6 2.8 1.4 4.2 2.3 4.2 1 0 2.2-1.4 3.7-4.1 1.5-2.8 2.2-4.8 2.2-6.1 0-1.8-.9-2.7-2.7-2.7-.9 0-1.7.2-2.5.6 1.8-5.8 5.2-8.5 10.3-8 4.2.4 6 2.7 5.9 6.9z" fill="#1AB7EA"/></svg>`,
    'google-font-api': `<svg viewBox="0 0 24 24"><rect width="24" height="24" rx="4" fill="#4285F4"/><path d="M7 17l5-12 5 12h-2.5l-1.2-3H10.7l-1.2 3H7zm4.5-5.5h2L12 8.5 11.5 11.5z" fill="#ffffff"/></svg>`,
    'font-awesome': `<svg viewBox="0 0 24 24"><path d="M21.5 8.5L12 2 2.5 8.5 12 15l9.5-6.5zm-9.5 8.5L4 11.8v3.7l8 5.5 8-5.5v-3.7L12 17z" fill="#528DD7"/></svg>`,
    'typekit': `<svg viewBox="0 0 24 24"><rect width="24" height="24" rx="4" fill="#87BC40"/><text x="12" y="16" fill="#ffffff" font-size="11" font-weight="bold" text-anchor="middle">Tk</text></svg>`,
    'open-graph': `<svg viewBox="0 0 24 24"><rect width="24" height="24" rx="4" fill="#3B5998"/><circle cx="8" cy="12" r="2.5" fill="#ffffff"/><circle cx="16" cy="7" r="2.5" fill="#ffffff"/><circle cx="16" cy="17" r="2.5" fill="#ffffff"/><line x1="8" y1="12" x2="16" y2="7" stroke="#ffffff" stroke-width="1.5"/><line x1="8" y1="12" x2="16" y2="17" stroke="#ffffff" stroke-width="1.5"/></svg>`,
    'twitter-cards': `<svg viewBox="0 0 24 24"><rect width="24" height="24" rx="4" fill="#1DA1F2"/><path d="M19 7.5a6 6 0 0 1-1.7.5 3 3 0 0 0 1.3-1.6 6 6 0 0 1-1.9.7 3 3 0 0 0-5.1 2.7 8.5 8.5 0 0 1-6.2-3.1 3 3 0 0 0 .9 4 3 3 0 0 1-1.4-.4v.1a3 3 0 0 0 2.4 2.9 3 3 0 0 1-1.3.1 3 3 0 0 0 2.8 2.1 6 6 0 0 1-4.4 1.2 8.5 8.5 0 0 0 4.6 1.3c5.5 0 8.5-4.6 8.5-8.5v-.4A6 6 0 0 0 19 7.5z" fill="#ffffff"/></svg>`,
    'schema-org': `<svg viewBox="0 0 24 24"><rect width="24" height="24" rx="4" fill="#0B5C9C"/><text x="12" y="16" fill="#ffffff" font-size="9" font-weight="bold" text-anchor="middle">{ }</text></svg>`,
    'threejs': `<svg viewBox="0 0 24 24"><rect width="24" height="24" rx="4" fill="#000000"/><path d="M12 4L4 8.5v7L12 20l8-4.5v-7L12 4zm0 2.3l5.7 3.2-5.7 3.2-5.7-3.2L12 6.3zM6 10.2l5 2.8v5.5l-5-2.8v-5.5zm7 8.3v-5.5l5-2.8v5.5l-5 2.8z" fill="#ffffff"/></svg>`,
    'swiper': `<svg viewBox="0 0 24 24"><rect width="24" height="24" rx="4" fill="#6332F6"/><path d="M6 12l5-5v3h7v4h-7v3l-5-5z" fill="#ffffff"/></svg>`,
    'wix': `<svg viewBox="0 0 24 24"><rect width="24" height="24" rx="4" fill="#0C0C0C"/><path d="M3.5 17l2.8-9h2.3l1.8 5.7L12.2 8h2.3l1.8 5.7L18.1 8h2.4l-2.8 9h-2.3l-1.8-5.8L11.8 17H9.5L7.7 11.2 5.9 17H3.5z" fill="#ffffff"/></svg>`,
    'hubspot': `<svg viewBox="0 0 24 24"><path d="M17.5 7.5A3.5 3.5 0 0 0 15 3.3V2h-2v1.5a3.5 3.5 0 0 0-2 3.1c0 1.2.6 2.3 1.5 3v3.1a4.5 4.5 0 0 0-2.3 2.1l-2.6-1.5a2.5 2.5 0 1 0-1 1.7l2.6 1.5a4.5 4.5 0 1 0 7.8-2.9v-3.1c.9-.7 1.5-1.8 1.5-3zm-3.5 13a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5zm0-13a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" fill="#FF7A59"/></svg>`,
    'kajabi': `<svg viewBox="0 0 24 24"><rect width="24" height="24" rx="4" fill="#005DFF"/><path d="M6 6h4v12H6V6zm8 0h4v6h-4V6zm0 8h4v4h-4v-4z" fill="#ffffff"/></svg>`,
    'elementor': `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#92003B"/><path d="M8 7h2v10H8V7zm4 0h4v2h-4V7zm0 4h4v2h-4v-2zm0 4h4v2h-4v-2z" fill="#ffffff"/></svg>`,
    'oxygen': `<svg viewBox="0 0 24 24"><rect width="24" height="24" rx="4" fill="#202A36"/><circle cx="12" cy="12" r="6" fill="none" stroke="#5465FF" stroke-width="3"/><circle cx="12" cy="12" r="2.5" fill="#5465FF"/></svg>`,
    'divi': `<svg viewBox="0 0 24 24"><rect width="24" height="24" rx="4" fill="#7E3BD0"/><text x="12" y="16" fill="#ffffff" font-size="10" font-weight="900" text-anchor="middle">DIVI</text></svg>`,
    'wpbakery': `<svg viewBox="0 0 24 24"><rect width="24" height="24" rx="4" fill="#222222"/><path d="M7 6l5 12 5-12h-3l-2 6-2-6H7z" fill="#0073AA"/></svg>`,
    'beaver-builder': `<svg viewBox="0 0 24 24"><rect width="24" height="24" rx="4" fill="#4B331A"/><text x="12" y="16" fill="#ffffff" font-size="10" font-weight="bold" text-anchor="middle">BB</text></svg>`,
    'bricks-builder': `<svg viewBox="0 0 24 24"><rect width="24" height="24" rx="4" fill="#FDD231"/><rect x="6" y="7" width="5" height="4" fill="#111111"/><rect x="13" y="7" width="5" height="4" fill="#111111"/><rect x="6" y="13" width="12" height="4" fill="#111111"/></svg>`,
    'gutenberg': `<svg viewBox="0 0 24 24"><rect width="24" height="24" rx="4" fill="#0073AA"/><rect x="7" y="7" width="4" height="10" rx="1" fill="#ffffff"/><rect x="13" y="7" width="4" height="10" rx="1" fill="#ffffff"/></svg>`,
    'breakdance': `<svg viewBox="0 0 24 24"><rect width="24" height="24" rx="4" fill="#FF2966"/><path d="M6 18l6-12 6 12h-4l-2-5-2 5H6z" fill="#ffffff"/></svg>`,
    'mysql': `<svg viewBox="0 0 24 24"><path d="M12 3C7 3 3 6.5 3 11c0 2.8 1.6 5.3 4 6.8V21l3.5-2c.5.1 1 .2 1.5.2 5 0 9-3.5 9-8s-4-8-9-8z" fill="#00758F"/><path d="M14 8c-.6 0-1.2.2-1.7.5-.4-.3-1-.5-1.6-.5-1.4 0-2.5 1.1-2.5 2.5 0 1.9 3.5 4.5 4.1 5 .6-.5 4.1-3.1 4.1-5 0-1.4-1.1-2.5-2.4-2.5z" fill="#F29111"/></svg>`,
    'site-kit': `<svg viewBox="0 0 24 24"><rect width="24" height="24" rx="4" fill="#ffffff"/><path d="M12 5c1.8 0 3.3.6 4.5 1.7l3.4-3.4C17.9 1.5 15.1.5 12 .5 7.4.5 3.5 3.1 1.6 6.9l4 3.1C6.6 7.3 9.1 5 12 5z" fill="#EA4335"/><path d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.6h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.9z" fill="#4285F4"/><path d="M5.6 14.3c-.3-.8-.4-1.6-.4-2.3 0-.8.2-1.6.4-2.3l-4-3.1C.6 8.3 0 10.1 0 12s.6 3.7 1.6 5.4l4-3.1z" fill="#FBBC05"/><path d="M12 23.5c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-2.9 0-5.4-2-6.4-4.7l-4 3.1c1.9 3.8 5.8 6.3 10.4 6.3z" fill="#34A853"/></svg>`,
    'google-ads': `<svg viewBox="0 0 24 24"><path d="M3.7 15.3l6.5-11.3c.7-1.2 2.2-1.6 3.4-.9l.9.5c1.2.7 1.6 2.2.9 3.4L8.9 18.3c-.7 1.2-2.2 1.6-3.4.9l-.9-.5c-1.2-.7-1.6-2.2-.9-3.4z" fill="#FBBC04"/><path d="M15.4 12.5l4.8 8.3c.6 1 .2 2.3-.8 2.9l-.8.5c-1 .6-2.3.2-2.9-.8l-4.8-8.3 4.5-2.6z" fill="#4285F4"/><circle cx="5.5" cy="18.5" r="2.5" fill="#34A853"/></svg>`,
    'tawkto': `<svg viewBox="0 0 24 24"><rect width="24" height="24" rx="4" fill="#03A84E"/><circle cx="12" cy="12" r="6" fill="#ffffff"/><circle cx="12" cy="12" r="3" fill="#03A84E"/></svg>`,
    'mailerlite': `<svg viewBox="0 0 24 24"><rect width="24" height="24" rx="4" fill="#00A154"/><path d="M6 16V8l6 5 6-5v8" stroke="#ffffff" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
    'doofinder': `<svg viewBox="0 0 24 24"><rect width="24" height="24" rx="4" fill="#FF5E3A"/><circle cx="11" cy="11" r="5" stroke="#ffffff" stroke-width="2" fill="none"/><line x1="15" y1="15" x2="19" y2="19" stroke="#ffffff" stroke-width="2" stroke-linecap="round"/></svg>`,
    'twemoji': `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#FFCC4D"/><circle cx="8.5" cy="10" r="1.5" fill="#664500"/><circle cx="15.5" cy="10" r="1.5" fill="#664500"/><path d="M12 17.5c-2.5 0-4-1.5-4.5-2.5h9c-.5 1-2 2.5-4.5 2.5z" fill="#664500"/></svg>`,
    'photoswipe': `<svg viewBox="0 0 24 24"><rect width="24" height="24" rx="4" fill="#111111"/><rect x="4" y="4" width="16" height="16" rx="2" stroke="#ffffff" stroke-width="1.5" fill="none"/><circle cx="8.5" cy="8.5" r="1.5" fill="#ffffff"/><path d="M4 16l4-4 3 3 5-5 4 4" stroke="#ffffff" stroke-width="1.5" fill="none"/></svg>`,
    'prettyphoto': `<svg viewBox="0 0 24 24"><rect width="24" height="24" rx="4" fill="#202020"/><text x="12" y="16" fill="#ffffff" font-size="10" font-weight="bold" text-anchor="middle">pP</text></svg>`,
    'select2': `<svg viewBox="0 0 24 24"><rect width="24" height="24" rx="4" fill="#5897FB"/><path d="M7 10l5 5 5-5" stroke="#ffffff" stroke-width="2" fill="none" stroke-linecap="round"/></svg>`,
    'jquery-ui': `<svg viewBox="0 0 24 24"><rect width="24" height="24" rx="4" fill="#0073EA"/><text x="12" y="16" fill="#ffffff" font-size="9" font-weight="bold" text-anchor="middle">UI</text></svg>`,
    'jquery-migrate': `<svg viewBox="0 0 24 24"><rect width="24" height="24" rx="4" fill="#0769AD"/><text x="12" y="16" fill="#ffffff" font-size="8" font-weight="bold" text-anchor="middle">MIG</text></svg>`,
    'lodash': `<svg viewBox="0 0 24 24"><rect width="24" height="24" rx="4" fill="#3492FF"/><path d="M7 16h10" stroke="#ffffff" stroke-width="3" stroke-linecap="round"/></svg>`,
    'momentjs': `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#2D3748"/><circle cx="12" cy="12" r="8" stroke="#319795" stroke-width="2" fill="none"/><polyline points="12 7 12 12 15 14" stroke="#319795" stroke-width="2" stroke-linecap="round"/></svg>`,
    'core-js': `<svg viewBox="0 0 24 24"><rect width="24" height="24" rx="4" fill="#D9534F"/><text x="12" y="16" fill="#ffffff" font-size="8" font-weight="bold" text-anchor="middle">core</text></svg>`,
    'radix-ui': `<svg viewBox="0 0 24 24"><rect width="24" height="24" rx="4" fill="#111111"/><circle cx="8" cy="8" r="3" fill="#ffffff"/><path d="M13 5h6v6h-6z" fill="#ffffff"/><path d="M8 13a3 3 0 0 1 3 3v3H8a3 3 0 0 1-3-3 3 3 0 0 1 3-3z" fill="#ffffff"/></svg>`,
    'shadcn-ui': `<svg viewBox="0 0 24 24"><rect width="24" height="24" rx="4" fill="#000000"/><path d="M18 5L6 19M6 5l6 7" stroke="#ffffff" stroke-width="2" stroke-linecap="round"/></svg>`,
    'rss': `<svg viewBox="0 0 24 24"><rect width="24" height="24" rx="4" fill="#FFA500"/><circle cx="6" cy="18" r="2" fill="#ffffff"/><path d="M4 10a10 10 0 0 1 10 10" stroke="#ffffff" stroke-width="2.5" fill="none" stroke-linecap="round"/><path d="M4 4a16 16 0 0 1 16 16" stroke="#ffffff" stroke-width="2.5" fill="none" stroke-linecap="round"/></svg>`,
    'priority-hints': `<svg viewBox="0 0 24 24"><rect width="24" height="24" rx="4" fill="#6366F1"/><path d="M12 4l-6 8h4v8l6-8h-4V4z" fill="#ffffff"/></svg>`,
    'hello-elementor': `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#92003B"/><text x="12" y="16" fill="#ffffff" font-size="9" font-weight="bold" text-anchor="middle">HE</text></svg>`,
    'crocoblock-jetelements': `<svg viewBox="0 0 24 24"><rect width="24" height="24" rx="4" fill="#088BE3"/><text x="12" y="16" fill="#ffffff" font-size="9" font-weight="bold" text-anchor="middle">JET</text></svg>`,
    'jetpack': `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#00BE28"/><path d="M12 4l4 8h-4l-1 8-3-8h4z" fill="#ffffff"/></svg>`,
    'google-for-woocommerce': `<svg viewBox="0 0 24 24"><rect width="24" height="24" rx="4" fill="#96588a"/><circle cx="12" cy="12" r="6" fill="#4285F4"/></svg>`,
    'unpkg': `<svg viewBox="0 0 24 24"><rect width="24" height="24" rx="4" fill="#202A36"/><path d="M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3z" stroke="#ffffff" stroke-width="1.5" fill="none"/></svg>`,
    'jsdelivr': `<svg viewBox="0 0 24 24"><rect width="24" height="24" rx="4" fill="#E84D3D"/><path d="M12 4l7 4v8l-7 4-7-4V8l7-4z" fill="#ffffff"/></svg>`,
    'cdnjs': `<svg viewBox="0 0 24 24"><rect width="24" height="24" rx="4" fill="#D9643A"/><text x="12" y="16" fill="#ffffff" font-size="8" font-weight="bold" text-anchor="middle">CDN</text></svg>`,
    'astro': `<svg viewBox="0 0 24 24"><path d="M8.5 19.5c.3-1.8 1.5-3.2 3.5-3.5 2 .3 3.2 1.7 3.5 3.5-1.5-.5-2.5-.5-3.5 0-1-.5-2-.5-3.5 0z" fill="#FF5D01"/><path d="M12 2.5L5.5 18h3.3l1.7-4.5h3l1.7 4.5h3.3L12 2.5zm-.5 7.5l.5-1.8.5 1.8h-1z" fill="#BC52EE"/></svg>`,
    'remix': `<svg viewBox="0 0 24 24"><rect width="24" height="24" rx="4" fill="#000000"/><path d="M6 6h6a3 3 0 0 1 3 3c0 1.2-.7 2.2-1.8 2.7L18 18h-3.5l-4-5.5H8.5V18H6V6zm2.5 4.5h3.5a1 1 0 0 0 0-2H8.5v2z" fill="#ffffff"/></svg>`,
    'vite': `<svg viewBox="0 0 24 24"><path d="M21.5 4.5l-9.2 16.3c-.2.4-.8.4-1 0L2.5 4.5c-.3-.5.1-1.1.7-1l7.8 1.5c.2 0 .4 0 .5-.2L14.7 2c.4-.4 1-.2 1.1.3l.9 4.3 4.1.8c.6.1.9.8.7 1.4z" fill="#646CFF"/><path d="M12.8 3.5l-4 7.5h3.5l-2.5 6 6-8h-3.5l2.5-5.5h-2z" fill="#FFD62E"/></svg>`,
    'vercel': `<svg viewBox="0 0 24 24"><rect width="24" height="24" rx="4" fill="#000000"/><polygon points="12,4 21,20 3,20" fill="#ffffff"/></svg>`,
    'fastly': `<svg viewBox="0 0 24 24"><rect width="24" height="24" rx="4" fill="#FF282D"/><text x="12" y="16" fill="#ffffff" font-size="11" font-weight="bold" text-anchor="middle">f</text></svg>`,
    'webflow': `<svg viewBox="0 0 24 24"><rect width="24" height="24" rx="4" fill="#146EF5"/><path d="M19 8.5l-3.5 7.5h-2.5l2-4.5h-3l2-4.5h-2.5l-2.5 5.5h-2.5L9 8.5H6.5L3.5 16h2.5l1.5-3.5h2l-1.5 3.5h5l3.5-7.5H19z" fill="#ffffff"/></svg>`,
    'ghost': `<svg viewBox="0 0 24 24"><rect width="24" height="24" rx="4" fill="#15171A"/><path d="M12 4a6 6 0 0 0-6 6v7.5l2-1.5 2 1.5 2-1.5 2 1.5 2-1.5 2 1.5V10a6 6 0 0 0-6-6zm-2 5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm4 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3z" fill="#ffffff"/></svg>`,
    'drupal': `<svg viewBox="0 0 24 24"><path d="M12 2C8 7 6 10 6 13.5a6 6 0 0 0 12 0C18 10 16 7 12 2zm0 15a3.5 3.5 0 0 1-3.5-3.5c0-1.5 1-3 3.5-5.5 2.5 2.5 3.5 4 3.5 5.5A3.5 3.5 0 0 1 12 17z" fill="#0678BE"/></svg>`,
    'strapi': `<svg viewBox="0 0 24 24"><rect width="24" height="24" rx="4" fill="#4945FF"/><path d="M6 7l6-4 6 4v10l-6 4-6-4V7z" fill="#ffffff"/><path d="M12 5.5l4.5 3v6l-4.5 3-4.5-3v-6l4.5-3z" fill="#4945FF"/></svg>`,
    'contentful': `<svg viewBox="0 0 24 24"><rect width="24" height="24" rx="4" fill="#2478CC"/><circle cx="12" cy="8" r="3" fill="#ffffff"/><circle cx="8" cy="15" r="3" fill="#F44336"/><circle cx="16" cy="15" r="3" fill="#FFC107"/></svg>`
  };

  // Generic Category SVG Fallbacks
  function getTechIcon(tech) {
    if (BRAND_ICONS[tech.id]) {
      return BRAND_ICONS[tech.id];
    }
    // Generic high-contrast colored badge
    const initial = (tech.name || 'T').charAt(0).toUpperCase();
    return `<svg viewBox="0 0 24 24"><rect width="24" height="24" rx="4" fill="#490899"/><text x="12" y="16" fill="#ffffff" font-size="11" font-weight="bold" text-anchor="middle">${initial}</text></svg>`;
  }

  // ==========================================
  // Initialization
  // ==========================================
  document.addEventListener('DOMContentLoaded', async () => {
    initAppVersion();
    await initSettings();
    setupEventListeners();
    if (isScannerActive) {
      await scanActiveTab();
    } else {
      showDisabled();
    }
  });

  function initAppVersion() {
    try {
      if (typeof chrome !== 'undefined' && chrome.runtime && chrome.runtime.getManifest) {
        const manifest = chrome.runtime.getManifest();
        if (manifest && manifest.version && appVersion) {
          appVersion.textContent = `v${manifest.version}`;
        }
      }
    } catch (e) {
      // Fallback to static text in HTML
    }
  }

  // ==========================================
  // Settings & Theme Management
  // ==========================================
  async function initSettings() {
    try {
      const stored = await chrome.storage.local.get(['theme', 'scannerEnabled']);
      if (stored.theme) {
        currentTheme = stored.theme;
      } else {
        currentTheme = 'dark';
      }
      if (stored.scannerEnabled !== undefined) {
        isScannerActive = Boolean(stored.scannerEnabled);
      } else {
        isScannerActive = true;
      }
    } catch {
      currentTheme = 'dark';
      isScannerActive = true;
    }
    document.documentElement.setAttribute('data-theme', currentTheme);
    if (scannerActiveToggle) {
      scannerActiveToggle.checked = isScannerActive;
    }
  }

  async function toggleTheme() {
    currentTheme = currentTheme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);
    try {
      await chrome.storage.local.set({ theme: currentTheme });
    } catch (e) {
      // Ignore
    }
  }

  // ==========================================
  // Event Listeners
  // ==========================================
  function setupEventListeners() {
    themeToggleBtn.addEventListener('click', toggleTheme);

    // Scanner Enable/Disable Toggle
    scannerActiveToggle.addEventListener('change', async () => {
      isScannerActive = scannerActiveToggle.checked;
      try {
        await chrome.storage.local.set({ scannerEnabled: isScannerActive });
      } catch (e) {}

      if (isScannerActive) {
        showToast('Scanner enabled');
        await scanActiveTab(true);
      } else {
        showToast('Scanner disabled');
        showDisabled();
        try {
          const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
          if (tab?.id) {
            chrome.runtime.sendMessage({
              type: 'UPDATE_BADGE_COUNT',
              count: 0,
              tabId: tab.id
            });
          }
        } catch (e) {}
      }
    });

    // Button inside disabled state to re-enable
    enableScannerBtn?.addEventListener('click', () => {
      scannerActiveToggle.checked = true;
      scannerActiveToggle.dispatchEvent(new Event('change'));
    });

    rescanBtn.addEventListener('click', async () => {
      if (!isScannerActive) {
        showToast('Scanner is disabled. Toggle above to enable.');
        return;
      }
      rescanBtn.style.transform = 'rotate(360deg)';
      setTimeout(() => (rescanBtn.style.transform = ''), 400);
      await scanActiveTab(true);
    });

    // Tab Navigation
    tabTechnologiesBtn.addEventListener('click', () => switchTab('technologies'));
    tabMoreInfoBtn.addEventListener('click', () => switchTab('more-info'));

    // Filter Input
    filterInput.addEventListener('input', (e) => {
      filterText = e.target.value.trim().toLowerCase();
      clearFilterBtn.style.display = filterText ? 'block' : 'none';
      renderTechGrid();
    });

    clearFilterBtn.addEventListener('click', () => {
      filterInput.value = '';
      filterText = '';
      clearFilterBtn.style.display = 'none';
      renderTechGrid();
      filterInput.focus();
    });

    copyBtn.addEventListener('click', copyMarkdownSummary);
  }

  function switchTab(tabId) {
    activeTab = tabId;
    if (tabId === 'technologies') {
      tabTechnologiesBtn.classList.add('active');
      tabMoreInfoBtn.classList.remove('active');
      technologiesView.style.display = 'block';
      moreInfoView.style.display = 'none';
    } else {
      tabMoreInfoBtn.classList.add('active');
      tabTechnologiesBtn.classList.remove('active');
      technologiesView.style.display = 'none';
      moreInfoView.style.display = 'block';
      renderMoreInfo();
    }
  }

  // ==========================================
  // Tab Scanning & Detection
  // ==========================================
  async function scanActiveTab(forceRescan = false) {
    if (!isScannerActive) {
      showDisabled();
      return;
    }
    showLoading();

    try {
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

      if (!tab || !tab.id) {
        showEmpty('No Active Tab', 'Unable to find an active browser tab.');
        return;
      }

      if (
        !tab.url ||
        tab.url.startsWith('chrome://') ||
        tab.url.startsWith('chrome-extension://') ||
        tab.url.startsWith('edge://') ||
        tab.url.startsWith('about:') ||
        tab.url.startsWith('view-source:')
      ) {
        currentTabInfo = {
          url: tab.url || 'Internal Page',
          hostname: tab.url ? tab.url.split('/')[2] || 'browser-internal' : 'Browser Internal',
          title: tab.title || 'Internal Page'
        };
        showEmpty('Internal Browser Page', 'Technology detection is disabled on browser system pages.');
        return;
      }

      try {
        const urlObj = new URL(tab.url);
        currentTabInfo.url = tab.url;
        currentTabInfo.hostname = urlObj.hostname;
        currentTabInfo.title = tab.title || urlObj.hostname;
      } catch {
        currentTabInfo.url = tab.url;
        currentTabInfo.hostname = tab.url;
        currentTabInfo.title = tab.title || tab.url;
      }

      // 1. Fetch headers from background
      try {
        const headerRes = await chrome.runtime.sendMessage({
          type: 'GET_TAB_HEADERS',
          tabId: tab.id
        });
        if (headerRes && headerRes.headers) {
          currentHeaders = { ...headerRes.headers };
        }
      } catch (err) {
        currentHeaders = {};
      }

      // 1b. Fallback: If response headers were not captured by webRequest, attempt direct HEAD
      if (tab.url && (tab.url.startsWith('http://') || tab.url.startsWith('https://'))) {
        if (!currentHeaders || Object.keys(currentHeaders).length === 0) {
          try {
            const headRes = await fetch(tab.url, { method: 'HEAD', cache: 'no-cache' });
            for (const [k, v] of headRes.headers.entries()) {
              const key = k.toLowerCase();
              if (!currentHeaders[key]) {
                currentHeaders[key] = v;
              }
            }
          } catch (e) {
            try {
              const controller = new AbortController();
              const timer = setTimeout(() => controller.abort(), 1500);
              const getRes = await fetch(tab.url, {
                method: 'GET',
                headers: { 'Range': 'bytes=0-0' },
                signal: controller.signal,
                cache: 'no-cache'
              });
              clearTimeout(timer);
              for (const [k, v] of getRes.headers.entries()) {
                const key = k.toLowerCase();
                if (!currentHeaders[key]) {
                  currentHeaders[key] = v;
                }
              }
            } catch (err) {}
          }
        }
      }

      // 2. Request detection from content script
      let response;
      try {
        response = await chrome.tabs.sendMessage(tab.id, {
          type: forceRescan ? 'RESCAN_TECHNOLOGIES' : 'GET_DETECTED_TECHNOLOGIES',
          headers: currentHeaders
        });
      } catch (err) {
        try {
          await chrome.scripting.executeScript({
            target: { tabId: tab.id },
            files: ['data/technologies.js', 'content/detector.js']
          });
          await new Promise((r) => setTimeout(r, 150));
          response = await chrome.tabs.sendMessage(tab.id, {
            type: 'GET_DETECTED_TECHNOLOGIES',
            headers: currentHeaders
          });
        } catch (injectErr) {
          showEmpty('Access Restricted', 'Could not scan this page. Try reloading the tab.');
          return;
        }
      }

      let detected = (response && response.technologies) ? [...response.technologies] : [];

      // 3. Process Header signatures in popup
      if (typeof TECHNOLOGIES !== 'undefined' && currentHeaders && Object.keys(currentHeaders).length > 0) {
        for (const tech of TECHNOLOGIES) {
          if (tech.detect && tech.detect.headers) {
            for (const rule of tech.detect.headers) {
              const headerVal = currentHeaders[rule.name.toLowerCase()];
              if (headerVal) {
                let match = true;
                let detectedVer = null;
                if (rule.regex) {
                  const m = headerVal.match(rule.regex);
                  match = !!m;
                  if (m && rule.versionGroup && m[rule.versionGroup]) {
                    detectedVer = m[rule.versionGroup];
                  }
                }

                if (match) {
                  const existing = detected.find((t) => t.id === tech.id);
                  if (existing) {
                    if (detectedVer && !existing.version) existing.version = detectedVer;
                  } else {
                    detected.push({
                      id: tech.id,
                      name: tech.name,
                      category: tech.category,
                      website: tech.website,
                      icon: tech.icon,
                      description: tech.description,
                      version: detectedVer,
                      confidence: 90,
                      detectionMethods: [`HTTP Header (${rule.name})`],
                      implies: tech.detect.implies || []
                    });
                  }
                }
              }
            }
          }
        }
      }

      // 4. Resolve 'implies' relationships recursively
      if (typeof TECHNOLOGIES !== 'undefined') {
        let addedImplied = true;
        let iteration = 0;
        while (addedImplied && iteration < 5) {
          addedImplied = false;
          iteration++;
          const currentList = [...detected];
          for (const item of currentList) {
            if (item.implies && item.implies.length > 0) {
              for (const implId of item.implies) {
                if (!detected.some((t) => t.id === implId)) {
                  const tech = TECHNOLOGIES.find((t) => t.id === implId);
                  if (tech) {
                    detected.push({
                      id: tech.id,
                      name: tech.name,
                      category: tech.category,
                      website: tech.website,
                      icon: tech.icon,
                      description: tech.description,
                      version: null,
                      confidence: 85,
                      detectionMethods: [`Implied by ${item.name}`],
                      implies: tech.detect?.implies || []
                    });
                    addedImplied = true;
                  }
                }
              }
            }
          }
        }
      }

      // Sort alphabetically by category then name
      detected.sort((a, b) => {
        if (a.category === b.category) {
          return a.name.localeCompare(b.name);
        }
        return a.category.localeCompare(b.category);
      });

      currentTechnologies = detected;

      if (currentTechnologies.length === 0) {
        showEmpty('No technologies detected', 'No recognized framework, CMS, or library signatures found.');
      } else {
        renderTechGrid();
        renderMoreInfo();
      }
    } catch (e) {
      showEmpty('Scan Error', 'An unexpected error occurred during detection.');
    }
  }

  // ==========================================
  // Render 2-Column Tech Grid
  // ==========================================
  function renderTechGrid() {
    let filtered = currentTechnologies.filter((t) => {
      if (!filterText) return true;
      return (
        t.name.toLowerCase().includes(filterText) ||
        t.category.toLowerCase().includes(filterText) ||
        (t.version && t.version.toLowerCase().includes(filterText))
      );
    });

    if (filtered.length === 0) {
      if (filterText) {
        showEmpty('No matches', `No technologies matched "${escapeHtml(filterText)}"`);
      } else {
        showEmpty('No technologies detected', 'No recognized signatures found.');
      }
      return;
    }

    // Group technologies by category
    const grouped = {};
    for (const t of filtered) {
      if (!grouped[t.category]) grouped[t.category] = [];
      grouped[t.category].push(t);
    }

    techGrid.innerHTML = '';
    const fragment = document.createDocumentFragment();

    for (const [categoryName, items] of Object.entries(grouped)) {
      const groupDiv = document.createElement('div');
      groupDiv.className = 'category-group';

      // Category Header (Muted title, e.g. "Ecommerce", "JavaScript frameworks")
      const catHeader = document.createElement('div');
      catHeader.className = 'category-header';
      catHeader.textContent = categoryName;
      groupDiv.appendChild(catHeader);

      // Tech Items List
      const itemsList = document.createElement('div');
      itemsList.className = 'tech-items-list';

      for (const item of items) {
        const itemRow = document.createElement('div');
        itemRow.className = 'tech-item-row';

        const iconSvg = getTechIcon(item);

        const versionHtml = item.version
          ? `<span class="tech-version">${escapeHtml(item.version)}</span>`
          : '';

        const confidenceHtml = (item.confidence && item.confidence < 100)
          ? `<span class="tech-confidence">${item.confidence}% sure</span>`
          : '';

        itemRow.innerHTML = `
          <div class="tech-icon-img">${iconSvg}</div>
          <a class="tech-link" href="${escapeHtml(item.website || '#')}" target="_blank" rel="noopener noreferrer" title="${escapeHtml(item.description || item.name)}">${escapeHtml(item.name)}</a>
          ${versionHtml}
          ${confidenceHtml}
        `;

        itemsList.appendChild(itemRow);
      }

      groupDiv.appendChild(itemsList);
      fragment.appendChild(groupDiv);
    }

    techGrid.appendChild(fragment);
    showContent();
  }

  // ==========================================
  // Render More Info View
  // ==========================================
  function renderMoreInfo() {
    // Version and brand details are statically set and dynamic via initAppVersion()
  }

  // ==========================================
  // Copy Markdown Summary
  // ==========================================
  async function copyMarkdownSummary() {
    if (!isScannerActive) {
      showToast('Scanner is disabled');
      return;
    }

    if (!currentTechnologies || currentTechnologies.length === 0) {
      showToast('No technologies detected');
      return;
    }

    const hostname = currentTabInfo.hostname || 'Website';
    let summary = `### Web Technology Stack for ${hostname}\n\n`;

    const grouped = {};
    for (const t of currentTechnologies) {
      if (!grouped[t.category]) grouped[t.category] = [];
      const verText = t.version ? ` (${t.version})` : '';
      grouped[t.category].push(`${t.name}${verText}`);
    }

    for (const [cat, items] of Object.entries(grouped)) {
      summary += `- **${cat}**: ${items.join(', ')}\n`;
    }

    try {
      await navigator.clipboard.writeText(summary);
      showToast('Copied to clipboard!');
    } catch {
      showToast('Failed to copy');
    }
  }

  // ==========================================
  // UI State Helpers
  // ==========================================
  function showLoading() {
    loadingView.style.display = 'flex';
    emptyView.style.display = 'none';
    if (disabledView) disabledView.style.display = 'none';
    techGrid.style.display = 'none';
    filterInput.disabled = false;
  }

  function showEmpty(title, desc) {
    loadingView.style.display = 'none';
    emptyView.style.display = 'flex';
    if (disabledView) disabledView.style.display = 'none';
    techGrid.style.display = 'none';
    emptyTitle.textContent = title;
    emptyDesc.textContent = desc;
    filterInput.disabled = false;
  }

  function showDisabled() {
    loadingView.style.display = 'none';
    emptyView.style.display = 'none';
    if (disabledView) disabledView.style.display = 'flex';
    techGrid.style.display = 'none';
    filterInput.disabled = true;
    filterInput.placeholder = 'Scanner paused...';
  }

  function showContent() {
    loadingView.style.display = 'none';
    emptyView.style.display = 'none';
    if (disabledView) disabledView.style.display = 'none';
    techGrid.style.display = 'grid';
    filterInput.disabled = false;
    filterInput.placeholder = 'Filter technologies...';
  }

  function showToast(msg) {
    toastNotification.textContent = msg;
    toastNotification.classList.add('show');
    setTimeout(() => {
      toastNotification.classList.remove('show');
    }, 2200);
  }

  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }
})();
