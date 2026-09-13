/**
 * Detect Web Technology - Injected Main World Probe
 * Runs in the page's MAIN execution context to inspect window global variables & libraries.
 */

(function () {
  'use strict';

  function resolvePath(obj, path) {
    if (!obj || !path) return undefined;
    try {
      return path.split('.').reduce((acc, part) => (acc && acc[part] !== undefined ? acc[part] : undefined), obj);
    } catch {
      return undefined;
    }
  }

  function probeWindowContext() {
    const results = [];

    // Probe rules
    const JS_PROBES = [
      // Languages
      { id: 'typescript', prop: '__ts' },
      { id: 'typescript', prop: 'ts' },
      { id: 'dart', prop: '_flutter' },
      { id: 'webassembly', prop: 'WebAssembly' },

      // JS & Frontend Frameworks
      { id: 'react', prop: 'React', verProp: 'React.version' },
      { id: 'react', prop: 'ReactDOM', verProp: 'ReactDOM.version' },
      { id: 'react', prop: '__REACT_DEVTOOLS_GLOBAL_HOOK__' },
      { id: 'react-router', prop: 'ReactRouter', verProp: 'ReactRouter.version' },
      { id: 'react-router', prop: 'ReactRouterDOM', verProp: 'ReactRouterDOM.version' },
      { id: 'react-router', prop: '__reactRouterVersion' },
      { id: 'react-router', prop: '__reactRouterContext' },
      { id: 'gsap', prop: 'gsap', verProp: 'gsap.version' },
      { id: 'gsap', prop: 'TweenMax', verProp: 'TweenMax.version' },
      { id: 'gsap', prop: 'TweenLite' },
      { id: 'gsap', prop: 'TimelineMax' },
      { id: 'gsap', prop: 'TimelineLite' },
      { id: 'gsap', prop: 'GreenSockGlobals' },
      { id: 'gsap', prop: 'ScrollTrigger' },
      { id: 'framer-motion', prop: '__FramerMetadata__' },
      { id: 'threejs', prop: 'THREE', verProp: 'THREE.REVISION' },
      { id: 'swiper', prop: 'Swiper' },
      { id: 'nextjs', prop: '__NEXT_DATA__' },
      { id: 'nextjs', prop: 'next', verProp: 'next.version' },
      { id: 'vue', prop: 'Vue', verProp: 'Vue.version' },
      { id: 'vue', prop: '__VUE__' },
      { id: 'vue', prop: '__VUE_DEVTOOLS_GLOBAL_HOOK__' },
      { id: 'nuxtjs', prop: '__NUXT__' },
      { id: 'nuxtjs', prop: '$nuxt' },
      { id: 'angular', prop: 'angular', verProp: 'angular.version.full' },
      { id: 'angular', prop: 'ng.probe' },
      { id: 'svelte', prop: '__svelte__' },
      { id: 'astro', prop: 'astro' },
      { id: 'qwik', prop: '__qwik__' },
      { id: 'remix', prop: '__remixContext' },
      { id: 'remix', prop: '__remixManifest' },
      { id: 'gatsby', prop: '___loader' },
      { id: 'gatsby', prop: '___emitter' },
      { id: 'solidjs', prop: '_$HY' },
      { id: 'solidjs', prop: 'Solid' },
      { id: 'alpinejs', prop: 'Alpine', verProp: 'Alpine.version' },
      { id: 'htmx', prop: 'htmx', verProp: 'htmx.version' },
      { id: 'jquery', prop: 'jQuery', verProp: 'jQuery.fn.jquery' },
      { id: 'jquery', prop: '$', verProp: '$.fn.jquery' },
      { id: 'preact', prop: 'preact' },
      { id: 'lit', prop: 'litElementVersions' },
      { id: 'lit', prop: 'litHtmlVersions' },
      { id: 'ember', prop: 'Ember', verProp: 'Ember.VERSION' },
      { id: 'backbone', prop: 'Backbone', verProp: 'Backbone.VERSION' },
      { id: 'stimulus', prop: 'Stimulus' },
      { id: 'turbo', prop: 'Turbo' },
      { id: 'flutter-web', prop: '_flutter' },
      { id: 'blazor', prop: 'Blazor' },

      // Video Players
      { id: 'youtube', prop: 'YT' },
      { id: 'youtube', prop: 'YTConfig' },
      { id: 'youtube', prop: 'onYouTubeIframeAPIReady' },
      { id: 'youtube', prop: 'ytplayer' },
      { id: 'vimeo', prop: 'Vimeo' },
      { id: 'videojs', prop: 'videojs', verProp: 'videojs.VERSION' },

      // Font Scripts
      { id: 'google-font-api', prop: 'WebFont' },
      { id: 'google-font-api', prop: 'WebFontConfig' },
      { id: 'font-awesome', prop: 'FontAwesome' },
      { id: 'font-awesome', prop: 'FontAwesomeConfig' },
      { id: 'typekit', prop: 'Typekit' },

      // CSS / UI Frameworks
      { id: 'tailwindcss', prop: 'tailwind' },
      { id: 'bootstrap', prop: 'bootstrap', verProp: 'bootstrap.Tooltip.VERSION' },

      // Analytics & Tracking
      { id: 'google-analytics', prop: 'gtag' },
      { id: 'google-analytics', prop: 'ga' },
      { id: 'google-analytics', prop: 'GoogleAnalyticsObject' },
      { id: 'google-tag-manager', prop: 'google_tag_manager' },
      { id: 'google-tag-manager', prop: 'dataLayer' },
      { id: 'hotjar', prop: 'hj' },
      { id: 'hotjar', prop: '_hjSettings' },
      { id: 'mixpanel', prop: 'mixpanel', verProp: 'mixpanel.__VERSION' },
      { id: 'segment', prop: 'analytics', verProp: 'analytics.VERSION' },
      { id: 'posthog', prop: 'posthog', verProp: 'posthog.LIB_VERSION' },
      { id: 'plausible', prop: 'plausible' },
      { id: 'microsoft-clarity', prop: 'clarity' },
      { id: 'fathom', prop: 'fathom' },
      { id: 'facebook-pixel', prop: 'fbq' },
      { id: 'facebook-pixel', prop: '_fbq' },

      // Marketing & CRM
      { id: 'hubspot', prop: '_hsq' },
      { id: 'hubspot', prop: '_hsp' },
      { id: 'hubspot', prop: 'HubSpotConversations' },
      { id: 'hubspot', prop: 'hbspt' },
      { id: 'hubspot', prop: 'hsVars' },
      { id: 'hubspot', prop: 'hubspot' },
      { id: 'intercom', prop: 'Intercom' },
      { id: 'intercom', prop: 'intercomSettings' },
      { id: 'crisp', prop: '$crisp' },
      { id: 'crisp', prop: 'CRISP_RUNTIME_CONFIG' },
      { id: 'zendesk', prop: 'zE' },
      { id: 'zendesk', prop: 'zEmbed' },
      { id: 'klaviyo', prop: 'klaviyo' },
      { id: 'klaviyo', prop: '_learnq' },

      // Payment Processors
      { id: 'stripe', prop: 'Stripe', verProp: 'Stripe.version' },
      { id: 'paypal', prop: 'paypal', verProp: 'paypal.version' },
      { id: 'klarna', prop: 'Klarna' },
      { id: 'square', prop: 'Square' },
      { id: 'adyen', prop: 'AdyenCheckout' },
      { id: 'razorpay', prop: 'Razorpay' },
      { id: 'paddle', prop: 'Paddle' },
      { id: 'lemon-squeezy', prop: 'createLemonSqueezy' },
      { id: 'lemon-squeezy', prop: 'lemonSqueezy' },

      // CMS & Site / Page Builders
      { id: 'wordpress', prop: 'wp', verProp: 'wp.version' },
      { id: 'wordpress', prop: '_wpemojiSettings' },
      { id: 'wordpress', prop: 'wpApiSettings' },
      { id: 'elementor', prop: 'elementorFrontend', verProp: 'elementorFrontend.config.version' },
      { id: 'elementor', prop: 'elementorProFrontend', verProp: 'elementorProFrontend.config.version' },
      { id: 'elementor', prop: 'elementorModules' },
      { id: 'oxygen', prop: 'ct_builder_is_active' },
      { id: 'oxygen', prop: 'oxygen' },
      { id: 'divi', prop: 'ET_Builder' },
      { id: 'divi', prop: 'et_pb_custom' },
      { id: 'wpbakery', prop: 'vc_js' },
      { id: 'wpbakery', prop: 'vc' },
      { id: 'beaver-builder', prop: 'FLBuilder' },
      { id: 'bricks-builder', prop: 'bricksData' },
      { id: 'kajabi', prop: 'Kajabi' },
      { id: 'kajabi', prop: 'kjbData' },
      { id: 'kajabi', prop: 'kajabiAnalytics' },
      { id: 'woocommerce', prop: 'woocommerce_params' },
      { id: 'woocommerce', prop: 'wc_cart_params' },
      { id: 'shopify', prop: 'Shopify' },
      { id: 'shopify', prop: 'ShopifyAnalytics' },
      { id: 'wix', prop: 'Wix' },
      { id: 'wix', prop: 'wixPerformanceMeasurements' },
      { id: 'wix', prop: 'wixBiSession' },
      { id: 'wix', prop: 'wixDeveloperAnalytics' },
      { id: 'wix', prop: 'wixTagManager' },
      { id: 'wix', prop: '__WIX_TAG_MANAGER__' },
      { id: 'wix', prop: 'fedops' },
      { id: 'squarespace', prop: 'Squarespace' },
      { id: 'squarespace', prop: 'Static.SQUARESPACE_CONTEXT' },
      { id: 'webflow', prop: 'Webflow' },
      { id: 'framer', prop: '__framer_importFromPackage' },
      { id: 'drupal', prop: 'Drupal' },
      { id: 'drupal', prop: 'drupalSettings' },
      { id: 'joomla', prop: 'Joomla' },
      { id: 'magento', prop: 'Mage' },
      { id: 'bigcommerce', prop: 'stencilUtils' },

      // Security & Monitoring
      { id: 'cloudflare-turnstile', prop: 'turnstile' },
      { id: 'recaptcha', prop: 'grecaptcha' },
      { id: 'hcaptcha', prop: 'hcaptcha' },
      { id: 'onetrust', prop: 'OneTrust' },
      { id: 'cookiebot', prop: 'Cookiebot' },
      { id: 'sentry', prop: 'Sentry', verProp: 'Sentry.SDK_VERSION' },
      { id: 'sentry', prop: '__SENTRY__' },
      { id: 'datadog', prop: 'DD_RUM' },
      { id: 'datadog', prop: 'DD_LOGS' },

      // BaaS
      { id: 'supabase', prop: 'supabase', verProp: 'supabase.supabaseVersion' },
      { id: 'supabase', prop: '_supabase' },
      { id: 'supabase', prop: '__SUPABASE__' },
      { id: 'supabase', prop: 'supabaseClient' },
      { id: 'supabase', prop: '_supabaseClient' },
      { id: 'firebase', prop: 'firebase', verProp: 'firebase.SDK_VERSION' },

      // JavaScript Libraries & Utilities
      { id: 'jquery-ui', prop: 'jQuery.ui', verProp: 'jQuery.ui.version' },
      { id: 'jquery-migrate', prop: 'jQuery.migrateVersion', verProp: 'jQuery.migrateVersion' },
      { id: 'select2', prop: 'jQuery.fn.select2' },
      { id: 'prettyphoto', prop: 'jQuery.fn.prettyPhoto' },
      { id: 'photoswipe', prop: 'PhotoSwipe' },
      { id: 'momentjs', prop: 'moment', verProp: 'moment.version' },
      { id: 'lodash', prop: 'lodash', verProp: 'lodash.VERSION' },
      { id: 'lodash', prop: '_', verProp: '_.VERSION' },

      // Analytics, Ads & Marketing Plugins
      { id: 'site-kit', prop: '_googlesitekit' },
      { id: 'site-kit', prop: '_googlesitekitConsentCategoryMap' },
      { id: 'google-ads', prop: 'adsbygoogle' },
      { id: 'mailerlite', prop: 'mailerliteData' },
      { id: 'mailerlite', prop: 'ml' },
      { id: 'tawkto', prop: 'Tawk_API' },
      { id: 'doofinder', prop: 'doofinder' },
      { id: 'doofinder', prop: 'df_cart' },
      { id: 'twemoji', prop: 'twemoji' },
      { id: 'twemoji', prop: '_wpemojiSettings' },
      { id: 'radix-ui', prop: '__radix' }
    ];

    for (const probe of JS_PROBES) {
      try {
        const val = resolvePath(window, probe.prop);
        if (val !== undefined && val !== null) {
          let version = null;
          if (probe.verProp) {
            const rawVer = resolvePath(window, probe.verProp);
            if (rawVer && typeof rawVer === 'string') {
              version = rawVer.trim();
            } else if (typeof rawVer === 'number') {
              version = String(rawVer);
            }
          }
          results.push({
            id: probe.id,
            property: probe.prop,
            version: version
          });
        }
      } catch (e) {
        // Ignore cross-origin / accessor errors
      }
    }

    // Probe core-js via __core-js_shared__ (Babel / Webpack / Polyfills)
    try {
      if (window['__core-js_shared__']) {
        let coreVer = null;
        const shared = window['__core-js_shared__'];
        if (shared.versions && Array.isArray(shared.versions) && shared.versions.length > 0) {
          coreVer = shared.versions[0].version;
        }
        results.push({
          id: 'core-js',
          property: '__core-js_shared__',
          version: coreVer ? String(coreVer) : null
        });
      }
    } catch (e) {}

    // Deep GSAP DOM inspection (handles bundled ES modules where window.gsap is not global)
    try {
      if (!results.some(r => r.id === 'gsap')) {
        // Check window for any GSAP properties
        for (const key of Object.getOwnPropertyNames(window)) {
          if (/^(gsap|TweenMax|TweenLite|TimelineMax|TimelineLite|ScrollTrigger|ScrollSmoother)$/i.test(key)) {
            const val = window[key];
            const ver = val && val.version ? String(val.version) : null;
            results.push({ id: 'gsap', property: `window.${key}`, version: ver });
            break;
          }
        }
      }

      if (!results.some(r => r.id === 'gsap')) {
        // Targeted check for DOM elements animated by GSAP (_gsap cache object or _gsTransform)
        const candidates = document.querySelectorAll('[data-gsap], [data-scroll], [style*="transform"], [style*="translate"]');
        const limit = Math.min(candidates.length, 25);
        for (let i = 0; i < limit; i++) {
          const el = candidates[i];
          if (el && (el._gsap || el._gsTransform)) {
            const ver = el._gsap && el._gsap.version ? String(el._gsap.version) : null;
            results.push({ id: 'gsap', property: 'element._gsap', version: ver });
            break;
          }
        }
      }
    } catch (e) {
      // Quiet fail
    }

    // Deep Supabase inspection (handles bundled ES modules, Next.js hydration, auth storage)
    try {
      if (!results.some(r => r.id === 'supabase')) {
        for (const key of Object.getOwnPropertyNames(window)) {
          if (/^supabase/i.test(key) && window[key]) {
            const val = window[key];
            const ver = val && (val.supabaseVersion || val.version) ? String(val.supabaseVersion || val.version) : null;
            results.push({ id: 'supabase', property: `window.${key}`, version: ver });
            break;
          }
        }
      }

      if (!results.some(r => r.id === 'supabase')) {
        try {
          if (window.localStorage) {
            for (let i = 0; i < window.localStorage.length; i++) {
              const k = window.localStorage.key(i);
              if (k && (/^sb-[a-z0-9_-]+-auth-token/i.test(k) || /^supabase/i.test(k))) {
                results.push({ id: 'supabase', property: `localStorage(${k})` });
                break;
              }
            }
          }
        } catch (e) {}
      }

      if (!results.some(r => r.id === 'supabase')) {
        if (window.__NEXT_DATA__) {
          const str = JSON.stringify(window.__NEXT_DATA__);
          if (str.includes('.supabase.co') || str.includes('NEXT_PUBLIC_SUPABASE')) {
            results.push({ id: 'supabase', property: '__NEXT_DATA__(supabase)' });
          }
        } else if (window.__NUXT__) {
          const str = JSON.stringify(window.__NUXT__);
          if (str.includes('.supabase.co') || str.includes('supabase')) {
            results.push({ id: 'supabase', property: '__NUXT__(supabase)' });
          }
        }
      }
    } catch (e) {
      // Quiet fail
    }

    return results;
  }

  // Execute and dispatch event to content script
  function runAndNotify() {
    try {
      const detected = probeWindowContext();
      window.dispatchEvent(
        new CustomEvent('__DETECT_WEB_TECH_PROBE_RESULT__', {
          detail: { detected }
        })
      );
    } catch (err) {
      // Quiet fail
    }
  }

  // Run immediately and listen for re-scan triggers
  runAndNotify();
  window.addEventListener('__DETECT_WEB_TECH_REQUEST_PROBE__', runAndNotify);
})();
