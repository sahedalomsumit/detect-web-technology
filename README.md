<p align="center">
  <img src="icons/icon-128.png" width="96" height="96" alt="Detect Web Technology Logo" />
</p>

<h1 align="center">Detect Web Technology</h1>

<p align="center">
  <strong>Lightweight, high-accuracy Chrome Extension (Manifest V3) that uncovers what websites are built with — CMS, JavaScript frameworks, e-commerce, analytics, hosting/CDN, web servers, payment gateways, and more.</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Theme-Dark%20%26%20Light%20Mode-8b5cf6?style=for-the-badge" alt="Theme" />
  <img src="https://img.shields.io/badge/Chrome%20Extension-Manifest%20V3-10b981?style=for-the-badge" alt="Manifest V3" />
  <img src="https://img.shields.io/badge/Privacy-100%25%20Local-blue?style=for-the-badge" alt="Privacy First" />
</p>

---

## ✨ Features

- 🚀 **180+ Technology Signatures**: Detects CMS, WordPress plugins & themes, frameworks, libraries, analytics, payment processors, CDNs, web servers, databases, SEO plugins, live chat, advertising, and more.
- 🎯 **Multi-Layer Detection Engine**:
  - DOM metadata & generator tags
  - Script URLs & inline script signatures
  - Stylesheet signatures
  - Main-world window global variables (`window.React`, `window.Vue`, `window.next`, `window.Shopify`, `window.wp`, etc.)
  - HTTP response headers (`Server`, `X-Powered-By`, `CF-Ray`, `Via`)
  - Cookie signatures
- 🏷️ **Version Detection**: Displays exact version numbers when exposed by the application (e.g., `React v18.3.1`, `WordPress v6.4.2`, `jQuery v3.7.1`).
- 📋 **Copy Stack Summary**: One-click copy of a formatted Markdown stack breakdown to clipboard for reports, sharing, and developer notes.
- 🌓 **Dark & Light Mode**: Designed with Sahed Design System — featuring deep black (`#050505`), neon violet (`#8b5cf6`), and emerald (`#10b981`) glassmorphic bento cards.
- ⚡ **Lightweight & Fast**: Zero heavy dependencies, purely client-side execution, fast scanning with minimal memory footprint.
- 🔒 **100% Private**: No analytics tracking, no external API calls, no third-party data collection.

---

## 📂 Project Structure

```
detect-web-technology/
├── manifest.json              # Chrome Extension Manifest V3 configuration
├── background.js              # Background service worker (badge counts, header caching)
├── CHROMEWEBSTORE.md          # Chrome Web Store listing & privacy documentation
├── README.md                  # Project overview and installation guide
├── generate-icons.ps1         # PowerShell icon generator script
├── data/
│   └── technologies.js        # Technology signature rules & metadata database
├── content/
│   ├── detector.js            # Content script DOM/Meta/Script analyzer
│   └── injected-probe.js      # Main-world window probe for global objects & versions
├── popup/
│   ├── popup.html             # Extension popup UI layout
│   ├── popup.css              # Cyberpunk glassmorphism bento stylesheet
│   └── popup.js               # Popup controller (filters, search, copy, theme)
└── icons/
    ├── icon.svg               # Vector SVG master logo
    ├── logo.svg               # Vector SVG brand logo
    ├── icon-16.png            # 16x16 icon
    ├── icon-32.png            # 32x32 icon
    ├── icon-48.png            # 48x48 icon
    └── icon-128.png           # 128x128 icon
```

---

## 🛠️ Installation (Developer Mode)

1. Clone or download this repository:
   ```bash
   git clone https://github.com/sahedalomsumit/detect-web-technology.git
   ```
2. Open Google Chrome and navigate to:
   ```text
   chrome://extensions
   ```
3. Enable **Developer mode** toggle in the top right corner.
4. Click **Load unpacked**.
5. Select the `detect-web-technology` folder.
6. The **Detect Web Technology** icon will appear in your Chrome extensions bar! Pin it for quick access.

---

## 📊 Supported Technology Categories

| Category | Example Technologies |
|---|---|
| **Programming Languages** | TypeScript, JavaScript, PHP, Python, Ruby, Java, Go, Rust, C# / .NET, Dart, Elixir, WebAssembly |
| **JavaScript Frameworks** | React, Next.js, Vue.js, Nuxt.js, Angular, Svelte, SvelteKit, Astro, Remix, SolidJS, Qwik, Alpine.js, HTMX, jQuery, Preact, Lit, Ember, Backbone, Stimulus, Flutter Web, Blazor |
| **Backend Frameworks** | Laravel, Symfony, CodeIgniter, Django, Flask, FastAPI, Express.js, Fastify, NestJS, Ruby on Rails, Spring Boot, ASP.NET Core, Phoenix |
| **Static Site Generators** | Hugo, Jekyll, Docusaurus, Eleventy (11ty), VitePress |
| **CSS Frameworks** | Tailwind CSS, Bootstrap, Material UI, Chakra UI, Bulma, Ant Design, styled-components, daisyUI, Vuetify |
| **CMS** | WordPress, Shopify, Wix, Squarespace, Webflow, Ghost, Drupal, Joomla, Contentful, Sanity, Strapi, Framer |
| **Analytics** | Google Analytics (GA4), Mixpanel, Hotjar, Segment, PostHog, Plausible, Microsoft Clarity, Fathom |
| **E-Commerce** | Shopify, WooCommerce, Magento, BigCommerce, PrestaShop, Lemon Squeezy |
| **Payment Processors** | Stripe, PayPal, Klarna, Square, Adyen, Razorpay, Paddle |
| **CDN & Hosting** | Cloudflare, AWS CloudFront, Fastly, Akamai, Vercel, Netlify, GitHub Pages, Firebase Hosting |
| **Web Servers** | Nginx, Apache HTTP Server, LiteSpeed, Caddy, Microsoft IIS |
| **Security & Privacy** | Cloudflare Turnstile, reCAPTCHA, hCaptcha, OneTrust, Cookiebot, Sentry, Datadog |
| **Databases & BaaS** | Supabase, Firebase Firestore |
| **Tag Managers** | Google Tag Manager |

---

## 📝 License

MIT License © [Sahed Alom Sumit](https://github.com/sahedalomsumit)