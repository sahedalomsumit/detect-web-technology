# Chrome Web Store Listing & Publishing Guide: Detect Web Technology

This document is the single source of truth for publishing **Detect Web Technology** to the Chrome Web Store.

---

## 1. Store Listing Information

### Extension Name

`Detect Web Technology`

### Short Description (max 132 chars)

`Instantly detect website technologies with 1 click: CMS, CDN, frameworks, eCommerce, libraries, plugins, themes, web servers, and more.`

### Category

`Developer Tools`

### Language

`English`

---

## 2. Detailed Store Description

```markdown
🔍 Detect Web Technology — Instantly detect website technologies with 1 click: CMS, CDN, frameworks, eCommerce, libraries, plugins, themes, web servers, and more.

Detect Web Technology is a high-accuracy, lightweight website profiler that reveals what websites are built with in real time.

🚀 Key Features:

• 🏢 CMS & Site Builder Detection: Instantly identify WordPress (and plugins), Shopify, Wix, Squarespace, Webflow, Ghost, Drupal, Joomla, Magento, PrestaShop, Contentful, Sanity, and more.
• ⚡ Modern Frameworks & Libraries: Detect React, Next.js, Vue.js, Nuxt.js, Angular, Svelte, SvelteKit, Astro, Remix, SolidJS, Alpine.js, HTMX, jQuery, Three.js, GSAP, and Tailwind CSS.
• 🛒 E-Commerce & Payments: Identify Shopify, WooCommerce, Stripe, PayPal, Klarna, Square, Adyen, Razorpay, Paddle, and Lemon Squeezy.
• 📊 Analytics & Marketing: Uncover Google Analytics (GA4), Google Tag Manager, Hotjar, Mixpanel, Segment, PostHog, Plausible, Microsoft Clarity, Meta Pixel, HubSpot, Intercom, Crisp, Klaviyo, and Zendesk.
• 🌐 Hosting, CDN & Cloud: Recognize Cloudflare, Amazon CloudFront, Fastly, Akamai, Vercel, Netlify, Firebase Hosting, and GitHub Pages.
• 🖥️ Web Servers & Backend Tech: Detect Nginx, Apache, LiteSpeed, Caddy, Microsoft IIS, PHP, Node.js, Python, Ruby, and ASP.NET.
• 🏷️ Exact Version Detection: View exact version numbers for supported frameworks and CMS engines.
• 📋 1-Click Copy Markdown: Easily copy clean Markdown stack breakdowns directly to your clipboard for reports, sharing, and documentation.
• 🌓 Dark & Light Mode: Seamlessly toggle between dark cyberpunk glassmorphic mode and crisp light mode.
• 🔒 100% Private & Client-Side: All scanning occurs locally in your browser. No data is tracked, stored remotely, or sent to third-party servers.

Whether you are a developer, designer, researcher, SEO specialist, or tech enthusiast, Detect Web Technology provides deep stack visibility in one click.
```

---

## 3. Permissions Justifications

| Permission                                       | Technical Reason & User Benefit                                                                                                           |
| ------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------- |
| `activeTab`                                      | Required to scan the DOM, scripts, stylesheets, and meta tags of the currently active tab when the user opens the extension popup.        |
| `scripting`                                      | Required to inject the lightweight technology detection script into web pages that were opened before the extension was loaded.           |
| `storage`                                        | Used locally to store the user's preferred theme (Dark/Light mode) and session-level header detections.                                   |
| `tabs`                                           | Needed to retrieve the current tab URL and hostname so technologies can be associated with the active website.                            |
| `webRequest`                                     | Used to inspect response headers (`Server`, `X-Powered-By`, `CF-Ray`, `Via`) to identify server technology, CDNs, and backend frameworks. |
| `host_permissions` (`http://*/*`, `https://*/*`) | Allows the detector to inspect and analyze technology stacks on any visited web page upon user request.                                   |

---

## 4. Privacy & Data Handling Disclosure

- **Does this extension collect user data?** No.
- **Does this extension transmit data to external servers?** No. All detection analysis happens strictly inside the user's local browser environment.
- **Does this extension sell or monetize personal information?** No.

### Official Privacy Policy Template

> **Privacy Policy for Detect Web Technology**
> Detect Web Technology ("the Extension") is committed to protecting your privacy. The Extension does not collect, record, track, transmit, or sell any personal information or web browsing history. All technology detection analysis is executed purely client-side on your local device.

---

## 5. Visual Assets Checklist

- [x] **Icon 16×16px**: `icons/icon-16.png`
- [x] **Icon 32×32px**: `icons/icon-32.png`
- [x] **Icon 48×48px**: `icons/icon-48.png`
- [x] **Icon 128×128px**: `icons/icon-128.png`
- [ ] **Store Screenshots**: 1280×800 or 640×400 (Take screenshots of popup in Dark and Light mode on popular websites).

---

## 6. Version History

### Version 1.0.0 (Initial Production Release)

- **180+ Technology Signatures**: Multi-vector engine for Frameworks, CMS, Analytics, E-Commerce, CDN, Web Servers, and Payments.
- **Manifest V3 Compliant**: Native `world: "MAIN"` content script probing for JavaScript globals, service worker background script, and session storage.
- **Performance Optimized**: Sub-40ms execution time, lazy HTML DOM evaluation, resource request filtering, and DocumentFragment batch rendering.
- **Privacy Hardened**: Zero web-accessible resources exposed, preventing website fingerprinting. 100% client-side execution with zero external network tracking.
- **Modern UI**: Two-column category bento grid, dark & light mode, brand SVG icons, and 1-click Markdown stack exporter.
