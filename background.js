/**
 * Detect Web Technology - Background Service Worker (Manifest V3)
 * Manages badge counters, tab event handling, and header detection caching.
 */

// Store response headers per tab in storage.session
chrome.webRequest?.onHeadersReceived?.addListener(
  (details) => {
    if (details.tabId < 0 || details.type !== 'main_frame') return;

    const headers = {};
    if (details.responseHeaders) {
      for (const h of details.responseHeaders) {
        headers[h.name.toLowerCase()] = h.value;
      }
    }

    (async () => {
      try {
        const key = `headers_${details.tabId}`;
        await chrome.storage.session.set({ [key]: headers });
      } catch (err) {
        // storage.session may not be available in some contexts
      }
    })();
  },
  { urls: ['http://*/*', 'https://*/*'] },
  ['responseHeaders', 'extraHeaders']
);

// Clean up stored headers when a tab is closed
chrome.tabs.onRemoved.addListener(async (tabId) => {
  try {
    const key = `headers_${tabId}`;
    await chrome.storage.session.remove(key);
  } catch (err) {
    // Ignore cleanup errors
  }
});

// Update badge count or retrieve headers
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'UPDATE_BADGE_COUNT') {
    const tabId = sender.tab?.id || message.tabId;
    if (tabId) {
      (async () => {
        try {
          const data = await chrome.storage.local.get('scannerEnabled');
          if (data && data.scannerEnabled === false) {
            await chrome.action.setBadgeText({ tabId, text: '' });
          } else {
            const text = message.count > 0 ? String(message.count) : '';
            await chrome.action.setBadgeText({ tabId, text });
            await chrome.action.setBadgeBackgroundColor({ tabId, color: '#8b5cf6' });
          }
        } catch (err) {
          // Tab or extension context may be closed
        }
      })();
    }
    sendResponse({ ok: true });
    return false;
  }

  if (message.type === 'GET_TAB_HEADERS') {
    (async () => {
      try {
        const key = `headers_${message.tabId}`;
        const data = await chrome.storage.session.get(key);
        sendResponse({ headers: data[key] || {} });
      } catch (err) {
        sendResponse({ headers: {} });
      }
    })();
    return true; // Keep channel open for async response
  }
});

// Clear badges if scanner is disabled
chrome.storage.onChanged.addListener(async (changes, area) => {
  if (area === 'local' && changes.scannerEnabled !== undefined) {
    if (changes.scannerEnabled.newValue === false) {
      try {
        const tabs = await chrome.tabs.query({});
        for (const t of tabs) {
          if (t.id) {
            await chrome.action.setBadgeText({ tabId: t.id, text: '' });
          }
        }
      } catch (err) {
        // Ignore
      }
    }
  }
});

// Set default badge styling on installed
chrome.runtime.onInstalled.addListener(() => {
  chrome.action.setBadgeBackgroundColor({ color: '#8b5cf6' });
});
