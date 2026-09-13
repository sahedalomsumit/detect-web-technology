<p align="center">
  <img src="icons/icon-128.png" width="96" height="96" alt="Detect Web Technology Logo" />
</p>

<h1 align="center">Detect Web Technology</h1>

<p align="center">
  <strong>Instantly identify CMS, frameworks, eCommerce, analytics, web servers, and tools powering any website in one click.</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Manifest%20V3-Chrome%20Extension-10b981?style=for-the-badge&logo=googlechrome&logoColor=white" alt="Manifest V3" />
  <img src="https://img.shields.io/badge/Signatures-180%2B%20Technologies-8b5cf6?style=for-the-badge" alt="180+ Technologies" />
  <img src="https://img.shields.io/badge/Privacy-100%25%20Local-3b82f6?style=for-the-badge&logo=shield&logoColor=white" alt="100% Local" />
  <img src="https://img.shields.io/badge/Theme-Dark%20%26%20Light-f59e0b?style=for-the-badge" alt="Dual Theme" />
  <img src="https://img.shields.io/badge/License-MIT-gray?style=for-the-badge" alt="License MIT" />
</p>

---

## ⚡ Overview

**Detect Web Technology** is a developer tool and website profiler engineered for maximum speed, accuracy, and privacy. Built strictly on **Chrome Manifest V3**, it performs client-side inspection across eight independent detection layers without sending any data to external servers.

Whether you are conducting competitive research, performing security audits, optimizing web performance, or simply curious about how a site is architected, Detect Web Technology delivers instant visibility with one click.

---

## ✨ Key Features

- 🎯 **180+ Technology Signatures**: Recognizes frameworks, CMS platforms, UI libraries, analytics suites, CDNs, hosting infrastructure, web servers, and payment processors.
- 🔍 **8-Layer Multi-Vector Engine**:
  - **Main-World Globals**: Direct inspection of JavaScript execution context (`window.React`, `window.Vue`, `window.__NEXT_DATA__`, `window.Shopify`, etc.).
  - **DOM & Meta Headers**: Analyzer for HTML generator tags, OpenGraph, Twitter Cards, and Schema.org metadata.
  - **Script Sources & Bundlers**: Pattern matching on script URLs, dynamic chunks (Vite, Webpack, Rollup, Next.js), and inline signatures.
  - **Stylesheet Signatures**: Detection of CSS frameworks (Tailwind CSS, Bootstrap, Bulma) via link references and embedded styles.
  - **HTTP Response Headers**: Interception of `Server`, `X-Powered-By`, `CF-Ray`, `Via`, and custom server headers.
  - **Cookie Footprints**: Inspection of framework cookies (`PHPSESSID`, `csrftoken`, `JSESSIONID`, `_shopify_s`).
  - **HTML Footprints**: Signature analysis of DOM templates, attributes, and builder wrappers.
  - **Relationship Resolution (Implies)**: Recursive dependency resolution (e.g., detecting _WooCommerce_ automatically implies _WordPress_ and _PHP_).
- 🏷️ **Deep Version Extraction**: Automatically extracts exact semantic version numbers when exposed (e.g., `React v18.3.1`, `WordPress v6.5.2`, `jQuery v3.7.1`).
- 📋 **1-Click Markdown Stack Export**: Copies a formatted Markdown summary directly to your clipboard for GitHub issues, Slack discussions, pull requests, or client audits.
- 🌓 **Dark & Light Mode**: Premium dual-theme UI featuring deep bento card layouts, smooth micro-interactions, and high-contrast accessibility.
- 🚀 **Zero Remote Code & 100% Private**: Runs entirely within your browser. No telemetry, no third-party APIs, no tracking cookies, and no background phone-home requests.
- ⚡ **Optimized Performance**:
  - Main-world probing executed natively through Chrome's Manifest V3 `world: "MAIN"` content script pipeline.
  - Zero redundant script injections or DOM pollution.
  - Lazy evaluation of DOM HTML samples to prevent memory spikes.
  - Resource filtering that excludes heavy media, font, and image requests during analysis.
  - `DocumentFragment` batch rendering for lag-free 60fps UI performance.
  - Removed public `web_accessible_resources` exposure to prevent web pages from fingerprinting the extension.

---

## 🏛️ Architecture & How It Works

```text
┌─────────────────────────────────────────────────────────────────────────────┐
│                             TARGET WEBPAGE                                  │
│                                                                             │
│  ┌─────────────────────────────────┐   ┌─────────────────────────────────┐  │
│  │     MAIN WORLD EXECUTION        │   │    ISOLATED EXTENSION WORLD     │  │
│  │   (content/injected-probe.js)   │   │     (content/detector.js)       │  │
│  │                                 │   │                                 │  │
│  │ • window.* global variables     │   │ • DOM meta tags & generators    │  │
│  │ • Framework versions            │   │ • Script tags & dynamic modules │  │
│  │ • Deep animation probes (GSAP)  │   │ • Stylesheet & link references  │  │
│  │ • Bundler runtime objects       │   │ • Cookie signatures             │  │
│  └────────────────┬────────────────┘   └────────────────┬────────────────┘  │
│                   │ CustomEvent                         │                   │
│                   └─────────────────────────────────────┤                   │
│                                                         ▼                   │
│                                              Multi-Layer Detection          │
│                                             + Dependency Resolution         │
└─────────────────────────────────────────────────────────┬───────────────────┘
                                                          │ chrome.runtime
                       ┌──────────────────────────────────┴─────────────────┐
                       ▼                                                    ▼
┌──────────────────────────────────────────┐    ┌──────────────────────────────────────────┐
│        BACKGROUND SERVICE WORKER         │    │             POPUP CONTROLLER             │
│             (background.js)              │    │            (popup/popup.js)              │
│                                          │    │                                          │
│ • WebRequest main-frame header caching   │    │ • Two-column responsive category grid    │
│ • session.storage tab lifecycle cleanup  │    │ • Real-time instant search & filter      │
│ • Dynamic badge counter & color updates  │    │ • High-contrast SVG brand icons          │
│ • Scanner active / pause synchronization │    │ • 1-Click Markdown stack exporter        │
└──────────────────────────────────────────┘    └──────────────────────────────────────────┘
```

---

## 📊 Supported Categories

Detect Web Technology identifies technologies across **15 distinct categories**:

| Category                              | Typical Signatures Detected                                                                                                                                                    |
| ------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Programming Languages & Runtimes**  | JavaScript, TypeScript, PHP, Python, Ruby, Java, Go, Rust, C# / .NET, Dart, Elixir, WebAssembly                                                                                |
| **JavaScript Frameworks & Libraries** | React, Next.js, Vue.js, Nuxt.js, Angular, Svelte, SvelteKit, Astro, Remix, SolidJS, Qwik, Alpine.js, HTMX, jQuery, Preact, Lit, Ember, Backbone, Stimulus, Flutter Web, Blazor |
| **Backend Frameworks**                | Laravel, Symfony, CodeIgniter, Django, Flask, FastAPI, Express.js, Fastify, NestJS, Ruby on Rails, Spring Boot, ASP.NET Core, Phoenix                                          |
| **CMS & Site Builders**               | WordPress, Shopify, Wix, Squarespace, Webflow, Ghost, Drupal, Joomla, Magento, PrestaShop, Contentful, Sanity, Strapi, Framer, Kajabi                                          |
| **WordPress Ecosystem**               | WooCommerce, Elementor, Divi, WPBakery, Oxygen, Beaver Builder, Bricks Builder, Gutenberg, Jetpack, Site Kit by Google                                                         |
| **E-Commerce & Storefronts**          | Shopify, WooCommerce, Magento, BigCommerce, PrestaShop, Lemon Squeezy                                                                                                          |
| **Payment Processors**                | Stripe, PayPal, Klarna, Square, Adyen, Razorpay, Paddle                                                                                                                        |
| **Analytics & Metrics**               | Google Analytics (GA4/Universal), Google Tag Manager, Mixpanel, Hotjar, Segment, PostHog, Plausible, Microsoft Clarity, Fathom, Meta Pixel                                     |
| **Marketing & Customer Support**      | HubSpot, Intercom, Crisp, Zendesk, Klaviyo, MailerLite, Tawk.to                                                                                                                |
| **CDN & Cloud Hosting**               | Cloudflare, Amazon CloudFront, Fastly, Akamai, Vercel, Netlify, GitHub Pages, Firebase Hosting                                                                                 |
| **Web Servers & Proxies**             | Nginx, Apache HTTP Server, LiteSpeed, Caddy, Microsoft IIS                                                                                                                     |
| **Security, Captcha & Privacy**       | Cloudflare Turnstile, Google reCAPTCHA, hCaptcha, OneTrust, Cookiebot, Sentry, Datadog                                                                                         |
| **UI & CSS Frameworks**               | Tailwind CSS, Bootstrap, Material UI, Chakra UI, Bulma, Ant Design, styled-components, daisyUI, Radix UI, shadcn/ui                                                            |
| **Animation & Utilities**             | GSAP (GreenSock), Three.js, Swiper, Lodash, Moment.js, core-js, PhotoSwipe, Select2                                                                                            |
| **BaaS & Databases**                  | Supabase, Firebase Firestore, MySQL                                                                                                                                            |

---

## 📂 Project Structure

```text
detect-web-technology/
├── manifest.json              # Chrome Extension Manifest V3 configuration
├── background.js              # Background service worker (badge counts & header caching)
├── CHROMEWEBSTORE.md          # Chrome Web Store listing, permissions & publishing docs
├── README.md                  # Comprehensive project documentation
├── generate-icons.ps1         # PowerShell vector rasterization script for icons
├── data/
│   └── technologies.js        # Technology definition database (180+ signature rules)
├── content/
│   ├── detector.js            # Isolated-world content script (DOM, Meta, Scripts & Styles)
│   └── injected-probe.js      # Main-world probe (window globals, library internals & versions)
├── popup/
│   ├── popup.html             # Popup layout (header, tabs, bento grid & creator view)
│   ├── popup.css              # Cyberpunk glassmorphism bento stylesheet (Dark/Light)
│   └── popup.js               # Popup controller (filtering, batch rendering & export)
└── icons/
    ├── icon.svg               # Master vector SVG icon
    ├── logo.svg               # Vector brand logo
    ├── icon-16.png            # 16x16 icon
    ├── icon-32.png            # 32x32 icon
    ├── icon-48.png            # 48x48 icon
    └── icon-128.png           # 128x128 icon
```

---

## 🛠️ Installation (Developer Mode)

To install and run the extension locally in Google Chrome or any Chromium-based browser (Brave, Edge, Arc, Opera):

1. **Clone the repository**:
   ```bash
   git clone https://github.com/sahedalomsumit/detect-web-technology.git
   ```
2. **Open Extensions Management**:
   In Chrome, navigate to:
   ```text
   chrome://extensions/
   ```
3. **Enable Developer Mode**:
   Toggle on the **Developer mode** switch located in the upper right corner.
4. **Load Unpacked Extension**:
   Click **Load unpacked** in the top left corner.
5. **Select the Project Folder**:
   Browse to and select the `detect-web-technology` directory.
6. **Pin the Extension**:
   Click the Extensions puzzle icon in Chrome's toolbar and pin **Detect Web Technology** for instant access.

---

## 💡 How to Use

1. **Navigate to any website** (e.g., `https://github.com`, `https://wordpress.org`, `https://stripe.com`).
2. **View the badge count**: The extension icon in your toolbar will automatically display the number of identified technologies.
3. **Open the popup**: Click the icon to view the full two-column categorization of detected technologies.
4. **Filter on the fly**: Use the search input (`Filter technologies...`) to instantly find specific tools, frameworks, or version numbers.
5. **Copy Markdown summary**: Click the **Copy** button to generate a clean Markdown stack overview:

   ```markdown
   ### Web Technology Stack for example.com

   - **JavaScript Frameworks**: React (18.3.1), Next.js (14.2.3)
   - **CSS Frameworks**: Tailwind CSS
   - **Analytics**: Google Analytics (GA4)
   - **CDN & Hosting**: Cloudflare, Vercel
   ```

6. **Pause or Re-enable**: Toggle the scanner switch in the header to pause background detection at any time.

---

## 🔒 Security & Privacy

Detect Web Technology is engineered with privacy as a foundational principle:

- **100% Local Execution**: All rule evaluations, DOM parsing, and regex executions happen solely inside your browser's local sandbox.
- **Zero External Network Requests**: The extension never makes network calls to remote analytics services, servers, or trackers.
- **No Data Harvesting**: Browsing history, visited URLs, page contents, and cookies are never stored permanently or transmitted off your machine.
- **Fingerprinting Protection**: Extension scripts are completely private; no public web-accessible resources are exposed to foreign web pages.
- **Strict CSP Compliance**: Does not use `eval()`, `new Function()`, or inline scripts.

---

## 👨‍💻 Author

Crafted with care by **Sahed Alom Sumit**  
_UI/UX Designer & Low-Code Web Developer — Helsinki, Finland_

- 🌐 Website: [sahedalomsumit.com](https://sahedalomsumit.com/)
- 🐙 GitHub: [@sahedalomsumit](https://github.com/sahedalomsumit)

---

## 📄 License

This project is licensed under the **MIT License** — see the LICENSE file for details.
