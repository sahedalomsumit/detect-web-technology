/**
 * Detect Web Technology - Content Script Detector
 * Analyzes DOM, Meta, Scripts, Styles, Cookies, and handles communication with Popup & Background.
 */

(function () {
  'use strict';

  // Prevent multiple injections
  if (window.__DETECT_WEB_TECH_LOADED__) return;
  window.__DETECT_WEB_TECH_LOADED__ = true;

  let jsProbeResults = [];
  let cachedDetection = null;
  let isScannerEnabled = true;

  // Retrieve initial scanner status
  try {
    chrome.storage.local.get('scannerEnabled', (data) => {
      if (data && data.scannerEnabled === false) {
        isScannerEnabled = false;
      }
    });
  } catch (e) {}

  // Listen for scanner status toggles
  try {
    chrome.storage.onChanged.addListener((changes, area) => {
      if (area === 'local' && changes.scannerEnabled !== undefined) {
        isScannerEnabled = changes.scannerEnabled.newValue !== false;
        if (isScannerEnabled) {
          runDetection();
        } else {
          try {
            chrome.runtime.sendMessage({
              type: 'UPDATE_BADGE_COUNT',
              count: 0
            });
          } catch (e) {}
        }
      }
    });
  } catch (e) {}

  // Listen to probe results from injected-probe.js (MAIN world)
  window.addEventListener('__DETECT_WEB_TECH_PROBE_RESULT__', (e) => {
    if (!isScannerEnabled) return;
    if (e.detail && Array.isArray(e.detail.detected)) {
      jsProbeResults = e.detail.detected;
      runDetection();
    }
  });

  // Inject probe into MAIN world
  function injectMainWorldProbe() {
    try {
      const script = document.createElement('script');
      script.src = chrome.runtime.getURL('content/injected-probe.js');
      script.onload = () => script.remove();
      (document.head || document.documentElement).appendChild(script);
    } catch (err) {
      // If CSP blocks inline script tag injection, fallback to standard probing
    }
  }

  function getMetaTags() {
    const metaList = [];
    const elements = document.querySelectorAll('meta');
    for (const el of elements) {
      const name = el.getAttribute('name') || el.getAttribute('property') || el.getAttribute('http-equiv') || el.getAttribute('itemprop');
      const content = el.getAttribute('content');
      if (name) {
        metaList.push({ name: name.toLowerCase(), content: content || '' });
      }
    }
    return metaList;
  }

  function getScripts() {
    const scriptList = [];
    const elements = document.querySelectorAll('script');
    for (const el of elements) {
      const src = el.getAttribute('src');
      if (src) {
        scriptList.push(src);
      } else if (el.textContent && el.textContent.length < 5000) {
        scriptList.push(el.textContent);
      }
    }
    return scriptList;
  }

  function getStylesheets() {
    const styles = [];
    const links = document.querySelectorAll('link[href]');
    for (const link of links) {
      const href = link.getAttribute('href');
      if (href) styles.push(href);
      const rel = link.getAttribute('rel');
      const type = link.getAttribute('type');
      if (type) styles.push(`type="${type}"`);
      if (rel) styles.push(`rel="${rel}"`);
    }
    const styleTags = document.querySelectorAll('style');
    for (const tag of styleTags) {
      if (tag.textContent && tag.textContent.length < 5000) {
        styles.push(tag.textContent);
      }
    }
    return styles;
  }

  function getIframes() {
    const iframes = [];
    const elements = document.querySelectorAll('iframe');
    for (const el of elements) {
      const src = el.getAttribute('src') || el.getAttribute('data-src');
      if (src) iframes.push(src);
    }
    return iframes;
  }

  function getLoadedResources() {
    const resources = [];
    try {
      if (window.performance && typeof window.performance.getEntriesByType === 'function') {
        const entries = window.performance.getEntriesByType('resource');
        for (const entry of entries) {
          if (entry.name) {
            resources.push(entry.name);
          }
        }
      }
    } catch (e) {
      // Ignore
    }
    // Also modulepreload and preload links (Vite, Next, Webpack)
    const preloads = document.querySelectorAll('link[rel="modulepreload"], link[rel="preload"][as="script"], link[rel="prefetch"]');
    for (const p of preloads) {
      const href = p.getAttribute('href');
      if (href) resources.push(href);
    }
    return resources;
  }

  function getHtmlSample() {
    try {
      // First 350k chars of HTML captures wrappers, builder classes, and scripts
      return (document.documentElement ? document.documentElement.outerHTML.slice(0, 350000) : '');
    } catch {
      return '';
    }
  }

  function runDetection(passedHeaders = null) {
    if (!isScannerEnabled) {
      const disabledResult = {
        technologies: [],
        total: 0,
        url: window.location.href,
        hostname: window.location.hostname,
        disabled: true,
        timestamp: new Date().toISOString()
      };
      cachedDetection = disabledResult;
      return disabledResult;
    }

    if (typeof TECHNOLOGIES === 'undefined') {
      return { technologies: [], total: 0, url: window.location.href };
    }

    const metaTags = getMetaTags();
    const scripts = getScripts();
    const styles = getStylesheets();
    const iframes = getIframes();
    const resources = getLoadedResources();
    const htmlSample = getHtmlSample();
    const cookies = document.cookie || '';

    const detectedMap = new Map();

    for (const tech of TECHNOLOGIES) {
      const detectionMatches = [];
      let detectedVersion = null;

      // 1. Check JS Global Probes
      if (jsProbeResults.length > 0) {
        const jsMatch = jsProbeResults.find((p) => p.id === tech.id);
        if (jsMatch) {
          detectionMatches.push(`Global JS (${jsMatch.property})`);
          if (jsMatch.version && !detectedVersion) {
            detectedVersion = jsMatch.version;
          }
        }
      }

      // 2. Check Meta Tags
      if (tech.detect.meta) {
        for (const metaRule of tech.detect.meta) {
          for (const meta of metaTags) {
            if (metaRule.name && meta.name === metaRule.name.toLowerCase()) {
              if (metaRule.contentRegex) {
                const match = meta.content.match(metaRule.contentRegex);
                if (match) {
                  detectionMatches.push(`Meta Tag (${metaRule.name})`);
                  if (metaRule.versionGroup && match[metaRule.versionGroup] && !detectedVersion) {
                    detectedVersion = match[metaRule.versionGroup];
                  }
                }
              } else {
                detectionMatches.push(`Meta Tag (${metaRule.name})`);
              }
            }
          }
        }
      }

      // 3. Check Script Sources, Iframes & Loaded Bundled Resources
      if (tech.detect.scripts) {
        for (const scriptRule of tech.detect.scripts) {
          for (const s of scripts) {
            const match = s.match(scriptRule);
            if (match) {
              detectionMatches.push('Script Tag');
              if (match[1] && !detectedVersion && /^v?[\d.]+/.test(match[1])) {
                detectedVersion = match[1].replace(/^v/, '');
              }
              break;
            }
          }
          for (const ifr of iframes) {
            if (scriptRule.test(ifr)) {
              detectionMatches.push('Iframe Embed');
              break;
            }
          }
          for (const res of resources) {
            const match = res.match(scriptRule);
            if (match) {
              detectionMatches.push('Bundled Module/Resource');
              if (match[1] && !detectedVersion && /^v?[\d.]+/.test(match[1])) {
                detectedVersion = match[1].replace(/^v/, '');
              }
              break;
            }
          }
        }
      }

      // 4. Check Stylesheets
      if (tech.detect.styles) {
        for (const styleRule of tech.detect.styles) {
          for (const st of styles) {
            if (styleRule.test(st)) {
              detectionMatches.push('Stylesheet');
              break;
            }
          }
        }
      }

      // 5. Check HTML structure
      if (tech.detect.html) {
        for (const htmlRule of tech.detect.html) {
          const match = htmlSample.match(htmlRule);
          if (match) {
            detectionMatches.push('HTML Footprint');
            if (match[1] && !detectedVersion && /^v?[\d.]+/.test(match[1])) {
              detectedVersion = match[1].replace(/^v/, '');
            }
            break;
          }
        }
      }

      // 6. Check Cookies
      if (tech.detect.cookies) {
        for (const cookieRule of tech.detect.cookies) {
          if (cookieRule.test(cookies)) {
            detectionMatches.push('Cookie');
            break;
          }
        }
      }

      // 7. Check Headers (if available)
      if (tech.detect.headers && passedHeaders && Object.keys(passedHeaders).length > 0) {
        for (const rule of tech.detect.headers) {
          const headerVal = passedHeaders[rule.name.toLowerCase()];
          if (headerVal) {
            let match = true;
            let hVer = null;
            if (rule.regex) {
              const m = headerVal.match(rule.regex);
              match = !!m;
              if (m && rule.versionGroup && m[rule.versionGroup]) {
                hVer = m[rule.versionGroup];
              }
            }
            if (match) {
              detectionMatches.push(`HTTP Header (${rule.name})`);
              if (hVer && !detectedVersion) detectedVersion = hVer;
              break;
            }
          }
        }
      }

      // 8. Check DOM Elements
      if (tech.detect.dom) {
        for (const selector of tech.detect.dom) {
          try {
            const el = document.querySelector(selector);
            if (el) {
              detectionMatches.push(`DOM Element (${selector})`);
              break;
            }
          } catch (e) {}
        }
      }

      // If matched, record it
      if (detectionMatches.length > 0) {
        detectedMap.set(tech.id, {
          id: tech.id,
          name: tech.name,
          category: tech.category,
          website: tech.website,
          icon: tech.icon,
          description: tech.description,
          version: detectedVersion,
          confidence: Math.min(100, 70 + detectionMatches.length * 15),
          detectionMethods: Array.from(new Set(detectionMatches)),
          implies: tech.detect.implies || []
        });
      }
    }

    // Resolve 'implies' relationships recursively
    let addedImplied = true;
    let iteration = 0;
    while (addedImplied && iteration < 5) {
      addedImplied = false;
      iteration++;
      const currentList = Array.from(detectedMap.values());
      for (const item of currentList) {
        if (item.implies && item.implies.length > 0) {
          for (const implId of item.implies) {
            if (!detectedMap.has(implId)) {
              const tech = TECHNOLOGIES.find((t) => t.id === implId);
              if (tech) {
                detectedMap.set(tech.id, {
                  id: tech.id,
                  name: tech.name,
                  category: tech.category,
                  website: tech.website,
                  icon: tech.icon,
                  description: tech.description,
                  version: null,
                  confidence: 85,
                  detectionMethods: [`Implied by ${item.name}`],
                  implies: tech.detect.implies || []
                });
                addedImplied = true;
              }
            }
          }
        }
      }
    }

    const techArray = Array.from(detectedMap.values()).sort((a, b) => {
      if (a.category === b.category) {
        return a.name.localeCompare(b.name);
      }
      return a.category.localeCompare(b.category);
    });

    const result = {
      technologies: techArray,
      total: techArray.length,
      url: window.location.href,
      hostname: window.location.hostname,
      timestamp: new Date().toISOString()
    };

    cachedDetection = result;

    // Send summary to background for badge update
    try {
      chrome.runtime.sendMessage({
        type: 'UPDATE_BADGE_COUNT',
        count: result.total,
        url: result.url
      });
    } catch {
      // Extension context invalidated or not yet ready
    }

    return result;
  }

  // Inject probe
  injectMainWorldProbe();

  // Initial detection
  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    setTimeout(runDetection, 100);
  } else {
    document.addEventListener('DOMContentLoaded', () => setTimeout(runDetection, 100));
  }

  // Message listener from popup / background
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'GET_DETECTED_TECHNOLOGIES') {
      if (!isScannerEnabled) {
        sendResponse({
          technologies: [],
          total: 0,
          url: window.location.href,
          hostname: window.location.hostname,
          disabled: true,
          timestamp: new Date().toISOString()
        });
        return false;
      }
      window.dispatchEvent(new CustomEvent('__DETECT_WEB_TECH_REQUEST_PROBE__'));
      setTimeout(() => {
        const data = runDetection(message.headers || null);
        sendResponse(data);
      }, 50);
      return true; // Keep channel open for async response
    }

    if (message.type === 'RESCAN_TECHNOLOGIES') {
      if (!isScannerEnabled) {
        sendResponse({
          technologies: [],
          total: 0,
          url: window.location.href,
          hostname: window.location.hostname,
          disabled: true,
          timestamp: new Date().toISOString()
        });
        return false;
      }
      window.dispatchEvent(new CustomEvent('__DETECT_WEB_TECH_REQUEST_PROBE__'));
      setTimeout(() => {
        const data = runDetection(message.headers || null);
        sendResponse(data);
      }, 100);
      return true;
    }
  });
})();
