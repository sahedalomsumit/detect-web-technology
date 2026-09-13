/**
 * Detect Web Technology - Technology Definitions and Signatures Database
 * Comprehensive detection rules for Languages, Frameworks, CMS, Analytics, E-Commerce, CDN, Servers, etc.
 */

const TECHNOLOGIES = [
  // ==========================================
  // PROGRAMMING LANGUAGES & RUNTIMES
  // ==========================================
  {
    id: 'javascript',
    name: 'JavaScript',
    category: 'Programming Languages',
    website: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
    icon: 'javascript',
    description: 'High-level, often just-in-time compiled programming language of the web.',
    detect: {
      scripts: [/\.js(?:[?#]|$)/i],
      html: [/<script/i]
    }
  },
  {
    id: 'typescript',
    name: 'TypeScript',
    category: 'Programming Languages',
    website: 'https://www.typescriptlang.org',
    icon: 'typescript',
    description: 'Strongly typed programming language that builds on JavaScript by Microsoft.',
    detect: {
      scripts: [/\.tsx?(?:[?#]|$)/i, /tsconfig\.json/i, /\/\/# sourceMappingURL=.*\.ts\.map/i],
      html: [/type="text\/typescript"/i],
      js: [{ property: '__ts' }, { property: 'ts' }]
    }
  },
  {
    id: 'php',
    name: 'PHP',
    category: 'Programming Languages',
    website: 'https://www.php.net',
    icon: 'php',
    description: 'Popular general-purpose scripting language suited for web development.',
    detect: {
      headers: [
        { name: 'x-powered-by', regex: /PHP(?:\/([\d.]+))?/i, versionGroup: 1 },
        { name: 'x-httpd-modphp' }
      ],
      cookies: [/PHPSESSID/i],
      html: [/\.php(?:[?#]|$)/i]
    }
  },
  {
    id: 'python',
    name: 'Python',
    category: 'Programming Languages',
    website: 'https://www.python.org',
    icon: 'python',
    description: 'High-level programming language known for versatility and clean syntax.',
    detect: {
      headers: [{ name: 'x-powered-by', regex: /Python|Django|Flask|FastAPI|Tornado|Werkzeug|Gunicorn/i }, { name: 'server', regex: /gunicorn|uvicorn|waitress/i }],
      cookies: [/csrftoken/i, /sessionid/i]
    }
  },
  {
    id: 'ruby',
    name: 'Ruby',
    category: 'Programming Languages',
    website: 'https://www.ruby-lang.org',
    icon: 'ruby',
    description: 'Dynamic, open source programming language with a focus on simplicity.',
    detect: {
      headers: [{ name: 'x-powered-by', regex: /Phusion Passenger|Puma|Unicorn/i }, { name: 'x-runtime' }, { name: 'server', regex: /Puma|Unicorn|Thin/i }],
      cookies: [/_session_id/i]
    }
  },
  {
    id: 'java',
    name: 'Java',
    category: 'Programming Languages',
    website: 'https://www.java.com',
    icon: 'java',
    description: 'Object-oriented programming language designed for portability and enterprise scale.',
    detect: {
      headers: [{ name: 'x-powered-by', regex: /Servlet|JSP|Tomcat|Jetty|WildFly|GlassFish/i }, { name: 'server', regex: /Tomcat|Jetty|WildFly|GlassFish/i }],
      cookies: [/JSESSIONID/i],
      html: [/\.jsp(?:[?#]|$)/i]
    }
  },
  {
    id: 'golang',
    name: 'Go',
    category: 'Programming Languages',
    website: 'https://go.dev',
    icon: 'go',
    description: 'Fast, statically typed, compiled language engineered by Google.',
    detect: {
      headers: [{ name: 'x-powered-by', regex: /Fiber|Gin|Echo|Buffalo/i }]
    }
  },
  {
    id: 'rust',
    name: 'Rust',
    category: 'Programming Languages',
    website: 'https://www.rust-lang.org',
    icon: 'rust',
    description: 'Blazingly fast and memory-efficient systems programming language.',
    detect: {
      headers: [{ name: 'server', regex: /actix|axum|rocket/i }, { name: 'x-powered-by', regex: /Actix|Axum|Rocket/i }],
      scripts: [/wasm_bindgen/i, /__wbindgen/i]
    }
  },
  {
    id: 'csharp',
    name: 'C# / .NET',
    category: 'Programming Languages',
    website: 'https://learn.microsoft.com/dotnet/csharp/',
    icon: 'csharp',
    description: 'Modern, object-oriented language developed by Microsoft for the .NET platform.',
    detect: {
      headers: [
        { name: 'x-powered-by', regex: /ASP\.NET(?:\s*([\d.]+))?/i, versionGroup: 1 },
        { name: 'x-aspnet-version', regex: /([\d.]+)/i, versionGroup: 1 }
      ],
      cookies: [/ASP\.NET_SessionId/i, /__RequestVerificationToken/i, /\.AspNetCore\./i]
    }
  },
  {
    id: 'nodejs',
    name: 'Node.js',
    category: 'Programming Languages',
    website: 'https://nodejs.org',
    icon: 'nodejs',
    description: 'Asynchronous event-driven JavaScript runtime built on Chrome\'s V8 engine.',
    detect: {
      headers: [{ name: 'x-powered-by', regex: /Express|Node\.js|Sails|Koa|Fastify|NestJS|Next\.js|Nuxt/i }]
    }
  },
  {
    id: 'dart',
    name: 'Dart',
    category: 'Programming Languages',
    website: 'https://dart.dev',
    icon: 'dart',
    description: 'Client-optimized language for fast apps on any platform by Google.',
    detect: {
      scripts: [/flutter\.js/i, /flutter_service_worker\.js/i, /main\.dart\.js/i],
      html: [/flt-glass-pane/i, /flutter-view/i],
      js: [{ property: '_flutter' }, { property: 'dartCallback' }]
    }
  },
  {
    id: 'elixir',
    name: 'Elixir',
    category: 'Programming Languages',
    website: 'https://elixir-lang.org',
    icon: 'elixir',
    description: 'Dynamic, functional language designed for building scalable and maintainable applications.',
    detect: {
      headers: [{ name: 'server', regex: /Cowboy/i }],
      cookies: [/_phx/i, /_live_view/i],
      html: [/phx-click/i, /phx-hook/i, /data-phx-main/i]
    }
  },
  {
    id: 'webassembly',
    name: 'WebAssembly (WASM)',
    category: 'Programming Languages',
    website: 'https://webassembly.org',
    icon: 'wasm',
    description: 'Binary instruction format for a stack-based virtual machine.',
    detect: {
      scripts: [/\.wasm(?:[?#]|$)/i],
      js: [{ property: 'WebAssembly' }]
    }
  },

  // ==========================================
  // JAVASCRIPT & FRONTEND FRAMEWORKS
  // ==========================================
  {
    id: 'react',
    name: 'React',
    category: 'JavaScript Frameworks',
    website: 'https://react.dev',
    icon: 'react',
    description: 'The library for web and native user interfaces by Meta.',
    detect: {
      scripts: [/react(?:\.production|\.development)?(?:\.min)?\.js/i, /react-dom/i],
      html: [/data-reactroot/i, /data-reactid/i, /data-react-helmet/i, /<div id="root"/i],
      js: [
        { property: 'React', versionProperty: 'React.version' },
        { property: 'ReactDOM', versionProperty: 'ReactDOM.version' },
        { property: '__REACT_DEVTOOLS_GLOBAL_HOOK__' }
      ],
      implies: ['javascript']
    }
  },
  {
    id: 'nextjs',
    name: 'Next.js',
    category: 'JavaScript Frameworks',
    website: 'https://nextjs.org',
    icon: 'nextjs',
    description: 'The React Framework for the Web by Vercel.',
    detect: {
      scripts: [/_next\/static\//i, /next(?:\.min)?\.js/i],
      html: [/<div id="__next"/i, /__NEXT_DATA__/i, /_next\/static/i],
      js: [
        { property: '__NEXT_DATA__' },
        { property: 'next', versionProperty: 'next.version' }
      ],
      headers: [{ name: 'x-powered-by', regex: /Next\.js/i }],
      implies: ['react', 'nodejs', 'javascript']
    }
  },
  {
    id: 'vue',
    name: 'Vue.js',
    category: 'JavaScript Frameworks',
    website: 'https://vuejs.org',
    icon: 'vue',
    description: 'The Progressive JavaScript Framework for building UI.',
    detect: {
      scripts: [/vue(?:\.runtime)?(?:\.esm-browser|\.global)?(?:\.prod|\.min)?\.js/i],
      html: [/data-v-[a-f0-9]{6,10}/i, /v-cloak/i, /<div id="app"/i],
      js: [
        { property: 'Vue', versionProperty: 'Vue.version' },
        { property: '__VUE__' },
        { property: '__VUE_DEVTOOLS_GLOBAL_HOOK__' }
      ],
      implies: ['javascript']
    }
  },
  {
    id: 'nuxtjs',
    name: 'Nuxt.js',
    category: 'JavaScript Frameworks',
    website: 'https://nuxt.com',
    icon: 'nuxtjs',
    description: 'Intuitive Vue Framework for SSR, SSG and full-stack web.',
    detect: {
      scripts: [/_nuxt\//i],
      html: [/<div id="__nuxt"/i, /__NUXT__/i, /_nuxt\//i],
      js: [
        { property: '__NUXT__' },
        { property: '$nuxt' }
      ],
      headers: [{ name: 'x-powered-by', regex: /Nuxt/i }],
      implies: ['vue', 'nodejs', 'javascript']
    }
  },
  {
    id: 'angular',
    name: 'Angular',
    category: 'JavaScript Frameworks',
    website: 'https://angular.dev',
    icon: 'angular',
    description: 'Enterprise web development platform by Google.',
    detect: {
      scripts: [/angular(?:\.min)?\.js/i, /main\.[a-f0-9]+\.js/i],
      html: [/ng-version="([^"]+)"/i, /ng-app/i, /ng-controller/i, /_nghost/i, /_ngcontent/i],
      js: [
        { property: 'angular', versionProperty: 'angular.version.full' },
        { property: 'ng.probe' }
      ],
      implies: ['typescript', 'javascript']
    }
  },
  {
    id: 'angularjs',
    name: 'AngularJS (1.x)',
    category: 'JavaScript Frameworks',
    website: 'https://angularjs.org',
    icon: 'angular',
    description: 'Superheroic JavaScript MVW Framework (Legacy).',
    detect: {
      scripts: [/angular(?:-[\d.]+)?(?:\.min)?\.js/i],
      html: [/ng-app/i, /ng-model/i, /ng-bind/i, /ng-repeat/i],
      js: [{ property: 'angular', versionProperty: 'angular.version.full' }],
      implies: ['javascript']
    }
  },
  {
    id: 'svelte',
    name: 'Svelte',
    category: 'JavaScript Frameworks',
    website: 'https://svelte.dev',
    icon: 'svelte',
    description: 'Cybernetically enhanced web apps compiled to vanilla JS without virtual DOM.',
    detect: {
      scripts: [/svelte/i],
      html: [/class="[^"]*svelte-[a-z0-9]+[^"]*"/i, /svelte-announcer/i],
      js: [{ property: '__svelte__' }],
      implies: ['javascript']
    }
  },
  {
    id: 'sveltekit',
    name: 'SvelteKit',
    category: 'JavaScript Frameworks',
    website: 'https://kit.svelte.dev',
    icon: 'svelte',
    description: 'Rapid, flexible framework for building Svelte apps.',
    detect: {
      scripts: [/_app\/immutable\//i],
      html: [/__sveltekit/i, /_app\/immutable/i],
      implies: ['svelte', 'nodejs', 'javascript']
    }
  },
  {
    id: 'solidjs',
    name: 'SolidJS',
    category: 'JavaScript Frameworks',
    website: 'https://www.solidjs.com',
    icon: 'solidjs',
    description: 'Simple and performant reactivity for building user interfaces.',
    detect: {
      html: [/data-hk/i, /_\$HY/i],
      js: [{ property: '_$HY' }, { property: 'Solid' }],
      implies: ['javascript']
    }
  },
  {
    id: 'astro',
    name: 'Astro',
    category: 'JavaScript Frameworks',
    website: 'https://astro.build',
    icon: 'astro',
    description: 'Content-driven web framework for fast websites with Islands Architecture.',
    detect: {
      meta: [{ name: 'generator', contentRegex: /Astro\s*v?([\d.]+)?/i, versionGroup: 1 }],
      html: [/class="[^"]*astro-[a-z0-9]+[^"]*"/i, /astro-island/i, /data-astro-/i],
      js: [{ property: 'astro' }],
      implies: ['javascript']
    }
  },
  {
    id: 'qwik',
    name: 'Qwik',
    category: 'JavaScript Frameworks',
    website: 'https://qwik.dev',
    icon: 'qwik',
    description: 'Resumable, instant-loading web framework.',
    detect: {
      html: [/q:container/i, /q:key/i, /q:id/i],
      js: [{ property: '__qwik__' }],
      implies: ['javascript', 'typescript']
    }
  },
  {
    id: 'remix',
    name: 'Remix',
    category: 'JavaScript Frameworks',
    website: 'https://remix.run',
    icon: 'remix',
    description: 'Full stack web framework focused on web standards.',
    detect: {
      html: [/__remixContext/i, /__remixManifest/i],
      js: [{ property: '__remixContext' }, { property: '__remixManifest' }],
      implies: ['react', 'nodejs', 'javascript']
    }
  },
  {
    id: 'gatsby',
    name: 'Gatsby',
    category: 'JavaScript Frameworks',
    website: 'https://www.gatsbyjs.com',
    icon: 'gatsby',
    description: 'Static progressive React-based site generator.',
    detect: {
      meta: [{ name: 'generator', contentRegex: /Gatsby\s*([\d.]+)?/i, versionGroup: 1 }],
      html: [/<div id="___gatsby"/i, /gatsby-browser/i],
      js: [{ property: '___loader' }, { property: '___emitter' }],
      implies: ['react', 'nodejs', 'javascript']
    }
  },
  {
    id: 'react-router',
    name: 'React Router',
    category: 'JavaScript Frameworks',
    website: 'https://reactrouter.com',
    icon: 'react-router',
    description: 'Declarative routing for React web and mobile applications.',
    detect: {
      scripts: [
        /react-router(?:-dom)?(?:@|\/)([\d.]+)/i,
        /react-router(?:-dom)?(?:\.min|\.production)?\.js/i,
        /@remix-run\/router(?:@|\/)([\d.]+)/i,
        /@remix-run\/router/i
      ],
      html: [
        /data-remix-router/i,
        /data-reactrouter/i,
        /<(?:div|main|section)[^>]+id="root"[^>]*>[\s\S]*?<a[^>]+href="[^"]*"[^>]*data-discover="true"/i,
        /aria-current="page"/i
      ],
      js: [
        { property: 'ReactRouter', versionProperty: 'ReactRouter.version' },
        { property: 'ReactRouterDOM', versionProperty: 'ReactRouterDOM.version' },
        { property: '__reactRouterVersion' },
        { property: '__reactRouterContext' }
      ],
      implies: ['react', 'javascript']
    }
  },
  {
    id: 'gsap',
    name: 'GSAP',
    category: 'JavaScript Frameworks',
    website: 'https://gsap.com',
    icon: 'gsap',
    description: 'High-performance JavaScript animation library for the modern web.',
    detect: {
      scripts: [
        /gsap(?:@|\/)([\d.]+)/i,
        /gsap(?:\.min)?\.js(?:[?#]|$)/i,
        /TweenMax(?:\.min)?\.js/i,
        /TweenLite(?:\.min)?\.js/i,
        /TimelineMax(?:\.min)?\.js/i,
        /TimelineLite(?:\.min)?\.js/i,
        /ScrollTrigger(?:\.min)?\.js/i,
        /ScrollSmoother(?:\.min)?\.js/i,
        /SplitText(?:\.min)?\.js/i,
        /Draggable(?:\.min)?\.js/i,
        /Flip(?:\.min)?\.js/i,
        /MotionPathPlugin(?:\.min)?\.js/i,
        /Observer(?:\.min)?\.js/i,
        /greensock/i,
        /npm(?:\.|\/)gsap/i,
        /@gsap/i,
        /(?:assets|chunks|vendor|bundle)[^/]*gsap/i,
        /gsap[^/]*\.js/i
      ],
      html: [
        /data-gsap/i,
        /gsap\.min\.js/i,
        /class="[^"]*(?:gsap-|gs-)[^"]*"/i,
        /gsap-marker/i,
        /_gsap/i
      ],
      js: [
        { property: 'gsap', versionProperty: 'gsap.version' },
        { property: 'TweenMax', versionProperty: 'TweenMax.version' },
        { property: 'TweenLite' },
        { property: 'TimelineMax' },
        { property: 'TimelineLite' },
        { property: 'GreenSockGlobals' },
        { property: 'ScrollTrigger' },
        { property: 'ScrollSmoother' },
        { property: 'SplitText' },
        { property: 'Draggable' },
        { property: 'Flip' },
        { property: 'element._gsap' },
        { property: 'window.gsap' }
      ],
      implies: ['javascript']
    }
  },
  {
    id: 'framer-motion',
    name: 'Framer Motion',
    category: 'JavaScript Frameworks',
    website: 'https://www.framer.com/motion/',
    icon: 'framer',
    description: 'Production-ready motion library for React by Framer.',
    detect: {
      scripts: [/framer-motion(?:@|\/)([\d.]+)/i, /framer-motion/i],
      js: [{ property: '__FramerMetadata__' }],
      implies: ['react', 'javascript']
    }
  },
  {
    id: 'threejs',
    name: 'Three.js',
    category: 'JavaScript Frameworks',
    website: 'https://threejs.org',
    icon: 'threejs',
    description: 'JavaScript 3D library for WebGL rendering in the browser.',
    detect: {
      scripts: [/three(?:@|\/)([\d.]+)/i, /three(?:\.min)?\.js/i],
      js: [{ property: 'THREE', versionProperty: 'THREE.REVISION' }],
      implies: ['javascript']
    }
  },
  {
    id: 'swiper',
    name: 'Swiper',
    category: 'JavaScript Frameworks',
    website: 'https://swiperjs.com',
    icon: 'swiper',
    description: 'Modern mobile touch slider with hardware accelerated transitions.',
    detect: {
      scripts: [/swiper(?:@|\/)([\d.]+)/i, /swiper(?:\.min)?\.js/i, /swiper-bundle/i],
      html: [/class="[^"]*swiper-container[^"]*"/i, /class="[^"]*swiper-wrapper[^"]*"/i, /class="[^"]*swiper-slide[^"]*"/i],
      js: [{ property: 'Swiper' }],
      implies: ['javascript']
    }
  },
  {
    id: 'alpinejs',
    name: 'Alpine.js',
    category: 'JavaScript Frameworks',
    website: 'https://alpinejs.dev',
    icon: 'alpinejs',
    description: 'Minimal tool for composing behavior directly in your HTML.',
    detect: {
      scripts: [/alpine(?:\.min)?\.js/i, /cdn\.jsdelivr\.net\/npm\/alpinejs/i],
      html: [/x-data/i, /x-bind/i, /x-on:/i, /x-show/i],
      js: [{ property: 'Alpine', versionProperty: 'Alpine.version' }],
      implies: ['javascript']
    }
  },
  {
    id: 'htmx',
    name: 'HTMX',
    category: 'JavaScript Frameworks',
    website: 'https://htmx.org',
    icon: 'htmx',
    description: 'High-power tools for HTML - AJAX, WebSockets and Server Sent Events.',
    detect: {
      scripts: [/htmx(?:\.min)?\.js/i, /unpkg\.com\/htmx\.org/i],
      html: [/hx-get/i, /hx-post/i, /hx-target/i, /hx-swap/i, /hx-trigger/i],
      js: [{ property: 'htmx', versionProperty: 'htmx.version' }],
      implies: ['javascript']
    }
  },
  {
    id: 'jquery',
    name: 'jQuery',
    category: 'JavaScript Frameworks',
    website: 'https://jquery.com',
    icon: 'jquery',
    description: 'Fast, small, and feature-rich JavaScript DOM manipulation library.',
    detect: {
      scripts: [/jquery(?:-[\d.]+)?(?:\.min)?\.js/i, /code\.jquery\.com/i],
      js: [
        { property: 'jQuery', versionProperty: 'jQuery.fn.jquery' },
        { property: '$', versionProperty: '$.fn.jquery' }
      ],
      implies: ['javascript']
    }
  },
  {
    id: 'preact',
    name: 'Preact',
    category: 'JavaScript Frameworks',
    website: 'https://preactjs.com',
    icon: 'preact',
    description: 'Fast 3kB alternative to React with the same modern API.',
    detect: {
      scripts: [/preact(?:\.min)?\.js/i],
      js: [{ property: 'preact' }],
      implies: ['javascript']
    }
  },
  {
    id: 'lit',
    name: 'Lit',
    category: 'JavaScript Frameworks',
    website: 'https://lit.dev',
    icon: 'lit',
    description: 'Simple, fast, lightweight Web Components framework.',
    detect: {
      scripts: [/lit-element/i, /lit-html/i],
      js: [{ property: 'litElementVersions' }, { property: 'litHtmlVersions' }],
      implies: ['javascript']
    }
  },
  {
    id: 'ember',
    name: 'Ember.js',
    category: 'JavaScript Frameworks',
    website: 'https://emberjs.com',
    icon: 'ember',
    description: 'Productive JavaScript framework for ambitious web developers.',
    detect: {
      scripts: [/ember(?:\.prod|\.min)?\.js/i],
      html: [/class="[^"]*ember-view[^"]*"/i],
      js: [{ property: 'Ember', versionProperty: 'Ember.VERSION' }],
      implies: ['javascript']
    }
  },
  {
    id: 'backbone',
    name: 'Backbone.js',
    category: 'JavaScript Frameworks',
    website: 'https://backbonejs.org',
    icon: 'backbone',
    description: 'Provides models, views, and collections with a RESTful JSON interface.',
    detect: {
      scripts: [/backbone(?:\.min)?\.js/i],
      js: [{ property: 'Backbone', versionProperty: 'Backbone.VERSION' }],
      implies: ['javascript']
    }
  },
  {
    id: 'stimulus',
    name: 'Stimulus (Hotwire)',
    category: 'JavaScript Frameworks',
    website: 'https://stimulus.hotwired.dev',
    icon: 'stimulus',
    description: 'Modest JavaScript framework for the HTML you already have.',
    detect: {
      scripts: [/stimulus(?:\.umd|\.min)?\.js/i, /@hotwired\/stimulus/i],
      html: [/data-controller/i, /data-action/i, /data-target/i],
      js: [{ property: 'Stimulus' }],
      implies: ['javascript']
    }
  },
  {
    id: 'turbo',
    name: 'Turbo (Hotwire)',
    category: 'JavaScript Frameworks',
    website: 'https://turbo.hotwired.dev',
    icon: 'turbo',
    description: 'Speed of a single-page web application without writing complex JS.',
    detect: {
      scripts: [/turbo(?:\.es2017-umd|\.min)?\.js/i, /@hotwired\/turbo/i],
      html: [/<turbo-frame/i, /<turbo-stream/i],
      js: [{ property: 'Turbo' }],
      implies: ['javascript']
    }
  },
  {
    id: 'flutter-web',
    name: 'Flutter Web',
    category: 'JavaScript Frameworks',
    website: 'https://flutter.dev/multi-platform/web',
    icon: 'flutter',
    description: 'Google UI toolkit compiled to WebAssembly / Canvas / DOM.',
    detect: {
      scripts: [/flutter\.js/i, /flutter_service_worker\.js/i],
      html: [/flt-glass-pane/i, /flt-scene/i],
      js: [{ property: '_flutter' }],
      implies: ['dart']
    }
  },
  {
    id: 'blazor',
    name: 'Blazor',
    category: 'JavaScript Frameworks',
    website: 'https://dotnet.microsoft.com/apps/aspnet/web-apps/blazor',
    icon: 'blazor',
    description: 'Interactive web UI with C# instead of JavaScript.',
    detect: {
      scripts: [/_framework\/blazor\.webassembly\.js/i, /_framework\/blazor\.server\.js/i],
      html: [/_framework\/blazor/i, /<!--Blazor:/i],
      js: [{ property: 'Blazor' }],
      implies: ['csharp', 'webassembly']
    }
  },

  // ==========================================
  // BACKEND FRAMEWORKS
  // ==========================================
  {
    id: 'laravel',
    name: 'Laravel',
    category: 'Backend Frameworks',
    website: 'https://laravel.com',
    icon: 'laravel',
    description: 'The PHP framework for web artisans with expressive, elegant syntax.',
    detect: {
      cookies: [/laravel_session/i, /XSRF-TOKEN/i],
      headers: [{ name: 'set-cookie', regex: /laravel_session/i }],
      implies: ['php']
    }
  },
  {
    id: 'symfony',
    name: 'Symfony',
    category: 'Backend Frameworks',
    website: 'https://symfony.com',
    icon: 'symfony',
    description: 'High-performance PHP framework and set of reusable PHP components.',
    detect: {
      headers: [{ name: 'x-debug-token' }, { name: 'x-powered-by', regex: /Symfony/i }],
      implies: ['php']
    }
  },
  {
    id: 'codeigniter',
    name: 'CodeIgniter',
    category: 'Backend Frameworks',
    website: 'https://codeigniter.com',
    icon: 'codeigniter',
    description: 'Powerful PHP framework with a very small footprint.',
    detect: {
      cookies: [/ci_session/i],
      headers: [{ name: 'set-cookie', regex: /ci_session/i }],
      implies: ['php']
    }
  },
  {
    id: 'django',
    name: 'Django',
    category: 'Backend Frameworks',
    website: 'https://www.djangoproject.com',
    icon: 'django',
    description: 'High-level Python web framework encouraging clean, pragmatic design.',
    detect: {
      cookies: [/csrftoken/i, /django_language/i],
      html: [/<input[^>]+name="csrfmiddlewaretoken"/i],
      implies: ['python']
    }
  },
  {
    id: 'flask',
    name: 'Flask',
    category: 'Backend Frameworks',
    website: 'https://flask.palletsprojects.com',
    icon: 'flask',
    description: 'Lightweight WSGI Python micro web framework.',
    detect: {
      headers: [{ name: 'server', regex: /Werkzeug/i }],
      cookies: [/session=/i],
      implies: ['python']
    }
  },
  {
    id: 'fastapi',
    name: 'FastAPI',
    category: 'Backend Frameworks',
    website: 'https://fastapi.tiangolo.com',
    icon: 'fastapi',
    description: 'Modern, fast web framework for building APIs with Python 3.8+ based on Pydantic.',
    detect: {
      headers: [{ name: 'server', regex: /uvicorn/i }],
      implies: ['python']
    }
  },
  {
    id: 'express',
    name: 'Express.js',
    category: 'Backend Frameworks',
    website: 'https://expressjs.com',
    icon: 'express',
    description: 'Fast, unopinionated, minimalist web framework for Node.js.',
    detect: {
      headers: [{ name: 'x-powered-by', regex: /Express/i }],
      cookies: [/connect\.sid/i],
      implies: ['nodejs', 'javascript']
    }
  },
  {
    id: 'fastify',
    name: 'Fastify',
    category: 'Backend Frameworks',
    website: 'https://fastify.dev',
    icon: 'fastify',
    description: 'Extremely fast and low overhead web framework for Node.js.',
    detect: {
      headers: [{ name: 'x-powered-by', regex: /Fastify/i }],
      implies: ['nodejs', 'javascript']
    }
  },
  {
    id: 'nestjs',
    name: 'NestJS',
    category: 'Backend Frameworks',
    website: 'https://nestjs.com',
    icon: 'nestjs',
    description: 'Progressive Node.js framework for building efficient enterprise server-side apps.',
    detect: {
      headers: [{ name: 'x-powered-by', regex: /Express|Nest/i }],
      implies: ['typescript', 'nodejs', 'javascript']
    }
  },
  {
    id: 'ruby-on-rails',
    name: 'Ruby on Rails',
    category: 'Backend Frameworks',
    website: 'https://rubyonrails.org',
    icon: 'rails',
    description: 'Full-stack framework for building web applications in Ruby.',
    detect: {
      meta: [{ name: 'csrf-param', contentRegex: /authenticity_token/i }],
      headers: [{ name: 'x-powered-by', regex: /Phusion Passenger/i }, { name: 'x-rack-cache' }],
      implies: ['ruby']
    }
  },
  {
    id: 'spring-boot',
    name: 'Spring Boot',
    category: 'Backend Frameworks',
    website: 'https://spring.io/projects/spring-boot',
    icon: 'spring',
    description: 'Production-ready enterprise framework for Java applications.',
    detect: {
      headers: [{ name: 'x-application-context' }, { name: 'server', regex: /Tomcat|Jetty|Undertow/i }],
      cookies: [/JSESSIONID/i],
      implies: ['java']
    }
  },
  {
    id: 'aspnet',
    name: 'ASP.NET Core',
    category: 'Backend Frameworks',
    website: 'https://dotnet.microsoft.com/apps/aspnet',
    icon: 'dotnet',
    description: 'Cross-platform, high-performance web framework for modern cloud web apps.',
    detect: {
      headers: [
        { name: 'x-powered-by', regex: /ASP\.NET(?:\s*([\d.]+))?/i, versionGroup: 1 },
        { name: 'x-aspnet-version', regex: /([\d.]+)/i, versionGroup: 1 }
      ],
      cookies: [/ASP\.NET_SessionId/i, /__RequestVerificationToken/i],
      implies: ['csharp']
    }
  },
  {
    id: 'phoenix',
    name: 'Phoenix Framework',
    category: 'Backend Frameworks',
    website: 'https://www.phoenixframework.org',
    icon: 'phoenix',
    description: 'High-productivity web framework for Elixir that does not compromise speed.',
    detect: {
      cookies: [/_phx/i],
      html: [/data-phx-main/i, /phx-feedback-for/i],
      implies: ['elixir']
    }
  },

  // ==========================================
  // STATIC SITE GENERATORS (SSG)
  // ==========================================
  {
    id: 'hugo',
    name: 'Hugo',
    category: 'Static Site Generators',
    website: 'https://gohugo.io',
    icon: 'hugo',
    description: 'Fast and flexible static site generator written in Go.',
    detect: {
      meta: [{ name: 'generator', contentRegex: /Hugo\s*([\d.]+)?/i, versionGroup: 1 }],
      html: [/<!-- Generated by Hugo/i],
      implies: ['golang']
    }
  },
  {
    id: 'jekyll',
    name: 'Jekyll',
    category: 'Static Site Generators',
    website: 'https://jekyllrb.com',
    icon: 'jekyll',
    description: 'Transform your plain text into static websites and blogs with Ruby.',
    detect: {
      meta: [{ name: 'generator', contentRegex: /Jekyll\s*v?([\d.]+)?/i, versionGroup: 1 }],
      implies: ['ruby']
    }
  },
  {
    id: 'docusaurus',
    name: 'Docusaurus',
    category: 'Static Site Generators',
    website: 'https://docusaurus.io',
    icon: 'docusaurus',
    description: 'Build optimized documentation websites quickly using React.',
    detect: {
      meta: [{ name: 'generator', contentRegex: /Docusaurus\s*v?([\d.]+)?/i, versionGroup: 1 }],
      html: [/<div id="__docusaurus"/i, /class="[^"]*docusaurus-[a-z0-9]+[^"]*"/i],
      implies: ['react', 'javascript']
    }
  },
  {
    id: 'eleventy',
    name: 'Eleventy (11ty)',
    category: 'Static Site Generators',
    website: 'https://www.11ty.dev',
    icon: 'eleventy',
    description: 'Simpler static site generator created to be a JavaScript alternative to Jekyll.',
    detect: {
      meta: [{ name: 'generator', contentRegex: /Eleventy\s*v?([\d.]+)?/i, versionGroup: 1 }],
      implies: ['nodejs', 'javascript']
    }
  },
  {
    id: 'vitepress',
    name: 'VitePress',
    category: 'Static Site Generators',
    website: 'https://vitepress.dev',
    icon: 'vitepress',
    description: 'Vite & Vue powered static site generator.',
    detect: {
      meta: [{ name: 'generator', contentRegex: /VitePress\s*v?([\d.]+)?/i, versionGroup: 1 }],
      html: [/class="[^"]*VPHome[^"]*"/i, /class="[^"]*VPNav[^"]*"/i],
      implies: ['vue', 'javascript']
    }
  },

  // ==========================================
  // CSS & UI FRAMEWORKS
  // ==========================================
  {
    id: 'tailwindcss',
    name: 'Tailwind CSS',
    category: 'CSS Frameworks',
    website: 'https://tailwindcss.com',
    icon: 'tailwind',
    description: 'Utility-first CSS framework for rapid UI development.',
    detect: {
      scripts: [/cdn\.tailwindcss\.com/i],
      styles: [/tailwind/i],
      html: [/class="[^"]*(?:flex|grid|hidden|block|relative|absolute|px-|py-|bg-|text-|rounded-|border-)[^"]*"/i],
      js: [{ property: 'tailwind' }]
    }
  },
  {
    id: 'bootstrap',
    name: 'Bootstrap',
    category: 'CSS Frameworks',
    website: 'https://getbootstrap.com',
    icon: 'bootstrap',
    description: 'Powerful, extensible frontend toolkit.',
    detect: {
      scripts: [/bootstrap(?:\.bundle)?(?:\.min)?\.js/i],
      styles: [/bootstrap(?:\.min)?\.css/i],
      html: [/class="[^"]*(?:container-fluid|navbar-nav|btn-primary|col-md-\d|col-lg-\d)[^"]*"/i],
      js: [{ property: 'bootstrap', versionProperty: 'bootstrap.Tooltip.VERSION' }]
    }
  },
  {
    id: 'material-ui',
    name: 'Material UI (MUI)',
    category: 'CSS Frameworks',
    website: 'https://mui.com',
    icon: 'mui',
    description: 'Comprehensive React UI component library implementing Material Design.',
    detect: {
      styles: [/MuiButton/i, /MuiTypography/i],
      html: [/class="[^"]*Mui[A-Z][a-zA-Z]+-[a-z0-9]+[^"]*"/i],
      implies: ['react']
    }
  },
  {
    id: 'chakra-ui',
    name: 'Chakra UI',
    category: 'CSS Frameworks',
    website: 'https://chakra-ui.com',
    icon: 'chakra',
    description: 'Simple, modular and accessible component library for React.',
    detect: {
      html: [/class="[^"]*chakra-[a-z0-9]+[^"]*"/i],
      implies: ['react']
    }
  },
  {
    id: 'bulma',
    name: 'Bulma',
    category: 'CSS Frameworks',
    website: 'https://bulma.io',
    icon: 'bulma',
    description: 'Free, open source CSS framework based on Flexbox.',
    detect: {
      styles: [/bulma(?:\.min)?\.css/i],
      html: [/class="[^"]*(?:is-primary|is-flex|columns|column|hero-body)[^"]*"/i]
    }
  },
  {
    id: 'ant-design',
    name: 'Ant Design',
    category: 'CSS Frameworks',
    website: 'https://ant.design',
    icon: 'antdesign',
    description: 'Enterprise-class UI design language and React UI library.',
    detect: {
      styles: [/antd(?:\.min)?\.css/i],
      html: [/class="[^"]*ant-[a-z]+[^"]*"/i],
      implies: ['react']
    }
  },
  {
    id: 'styled-components',
    name: 'styled-components',
    category: 'CSS Frameworks',
    website: 'https://styled-components.com',
    icon: 'styledcomponents',
    description: 'Visual primitives for styling React apps using tagged template literals.',
    detect: {
      html: [/data-styled/i, /data-styled-components/i, /class="[^"]*sc-[a-zA-Z0-9]+-[0-9][^"]*"/i],
      implies: ['react']
    }
  },
  {
    id: 'daisyui',
    name: 'daisyUI',
    category: 'CSS Frameworks',
    website: 'https://daisyui.com',
    icon: 'daisyui',
    description: 'The most popular component library for Tailwind CSS.',
    detect: {
      html: [/class="[^"]*(?:btn-primary|btn-secondary|card-body|navbar-start|modal-box)[^"]*"/i],
      implies: ['tailwindcss']
    }
  },
  {
    id: 'vuetify',
    name: 'Vuetify',
    category: 'CSS Frameworks',
    website: 'https://vuetifyjs.com',
    icon: 'vuetify',
    description: 'Material Component Framework for Vue.',
    detect: {
      html: [/class="[^"]*v-application[^"]*"/i, /class="[^"]*v-btn[^"]*"/i],
      implies: ['vue']
    }
  },

  // ==========================================
  // CMS & SITE BUILDERS
  // ==========================================
  {
    id: 'wordpress',
    name: 'WordPress',
    category: 'CMS',
    website: 'https://wordpress.org',
    icon: 'wordpress',
    description: 'Open source content management system powering over 40% of the web.',
    detect: {
      meta: [{ name: 'generator', contentRegex: /WordPress\s*([\d.]+)?/i, versionGroup: 1 }],
      scripts: [/wp-content\/(?:themes|plugins|uploads)/i, /wp-includes\//i, /wp-embed\.min\.js/i],
      styles: [/wp-content\/(?:themes|plugins)/i, /wp-block-library/i],
      html: [/wp-(?:content|includes)/i, /<link[^>]+s\d+\.wp\.com/i],
      js: [
        { property: 'wp', versionProperty: 'wp.version' },
        { property: '_wpemojiSettings' },
        { property: 'wpApiSettings' }
      ],
      headers: [{ name: 'x-powered-by', regex: /WordPress/i }, { name: 'link', regex: /wp-json/i }],
      implies: ['php', 'mysql']
    }
  },
  {
    id: 'woocommerce',
    name: 'WooCommerce',
    category: 'E-Commerce',
    website: 'https://woocommerce.com',
    icon: 'woocommerce',
    description: 'Customizable, open-source eCommerce platform built on WordPress.',
    detect: {
      meta: [{ name: 'generator', contentRegex: /WooCommerce\s*([\d.]+)?/i, versionGroup: 1 }],
      scripts: [/woocommerce(?:\.min)?\.js/i, /plugins\/woocommerce\//i],
      styles: [/woocommerce(?:\.min)?\.css/i, /plugins\/woocommerce\//i],
      html: [/class="[^"]*woocommerce[^"]*"/i, /woocommerce-page/i],
      js: [{ property: 'woocommerce_params' }, { property: 'wc_cart_params' }],
      implies: ['wordpress', 'php', 'mysql']
    }
  },
  {
    id: 'shopify',
    name: 'Shopify',
    category: 'E-Commerce',
    website: 'https://www.shopify.com',
    icon: 'shopify',
    description: 'Leading hosted all-in-one commerce platform.',
    detect: {
      meta: [{ name: 'generator', contentRegex: /Shopify/i }],
      scripts: [/cdn\.shopify\.com/i, /shopify-analytics/i, /trekkie\.storefront/i],
      styles: [/cdn\.shopify\.com/i],
      html: [/cdn\.shopify\.com/i, /Shopify\.theme/i, /Shopify\.currency/i],
      js: [
        { property: 'Shopify' },
        { property: 'ShopifyAnalytics' },
        { property: 'BOOMR.themeName' }
      ],
      headers: [{ name: 'x-shopid' }, { name: 'x-shopify-stage' }]
    }
  },
  {
    id: 'wix',
    name: 'Wix',
    category: 'CMS',
    website: 'https://www.wix.com',
    icon: 'wix',
    description: 'Cloud-based website builder and eCommerce platform.',
    detect: {
      meta: [
        { name: 'generator', contentRegex: /Wix(?:\.com Website Builder)?/i },
        { name: 'wix-renderer-type' }
      ],
      scripts: [
        /static\.parastorage\.com/i,
        /static\.wixstatic\.com/i,
        /wix-code-public/i,
        /wix-thunderball/i,
        /wix-viewer/i,
        /wix-site-custom-elements/i,
        /wix-events/i,
        /wix-animations/i
      ],
      html: [
        /wix-warmup-data/i,
        /static\.parastorage\.com/i,
        /static\.wixstatic\.com/i,
        /id="SITE_CONTAINER"/i,
        /id="PAGES_CONTAINER"/i,
        /<wix-dropdown/i,
        /<wix-image/i,
        /<wix-custom-element/i
      ],
      js: [
        { property: 'wixPerformanceMeasurements' },
        { property: 'wixBiSession' },
        { property: 'Wix' },
        { property: 'wixDeveloperAnalytics' },
        { property: 'wixTagManager' },
        { property: '__WIX_TAG_MANAGER__' },
        { property: 'fedops' }
      ],
      headers: [
        { name: 'x-wix-request-id' },
        { name: 'x-wix-renderer-type' },
        { name: 'x-wix-published-version' }
      ]
    }
  },
  {
    id: 'kajabi',
    name: 'Kajabi',
    category: 'Page Builders',
    website: 'https://kajabi.com',
    icon: 'kajabi',
    description: 'All-in-one platform for courses, coaching, and digital creator websites.',
    detect: {
      meta: [{ name: 'generator', contentRegex: /Kajabi/i }],
      scripts: [
        /kajabi-storefronts/i,
        /kajabi-cdn/i,
        /cdn\.kajabi\.com/i,
        /kajabi-app/i,
        /assets\.kajabi\.com/i
      ],
      styles: [/kajabi-storefronts/i, /cdn\.kajabi\.com/i],
      html: [
        /data-kajabi-/i,
        /class="[^"]*(?:kjb-|kajabi-)[^"]*"/i,
        /kajabi-page/i,
        /kajabi-analytics/i
      ],
      cookies: [/_kjb_session/i, /kjb_/i],
      js: [
        { property: 'Kajabi' },
        { property: 'kjbData' },
        { property: 'kajabiAnalytics' }
      ]
    }
  },

  // ==========================================
  // PAGE BUILDERS & VISUAL EDITORS
  // ==========================================
  {
    id: 'elementor',
    name: 'Elementor',
    category: 'Page Builders',
    website: 'https://elementor.com',
    icon: 'elementor',
    description: 'The leading website builder platform for WordPress professionals.',
    detect: {
      meta: [{ name: 'generator', contentRegex: /Elementor\s*([\d.]+)?/i, versionGroup: 1 }],
      scripts: [
        /wp-content\/plugins\/elementor\/(?:assets\/)?js\/(?:frontend|elementor)(?:-pro)?(?:\.min)?\.js/i,
        /wp-content\/plugins\/elementor(?:-pro)?\//i
      ],
      styles: [
        /wp-content\/plugins\/elementor(?:-pro)?\//i,
        /wp-content\/uploads\/elementor\/css\//i,
        /elementor-icons/i,
        /elementor-frontend/i
      ],
      html: [
        /class="[^"]*(?:elementor\b|elementor-|elementor-page|elementor-widget|elementor-section)[^"]*"/i,
        /data-elementor-type/i,
        /data-elementor-id/i,
        /<!-- Elementor/i
      ],
      js: [
        { property: 'elementorFrontend', versionProperty: 'elementorFrontend.config.version' },
        { property: 'elementorProFrontend', versionProperty: 'elementorProFrontend.config.version' },
        { property: 'elementorModules' }
      ],
      implies: ['wordpress', 'php']
    }
  },
  {
    id: 'oxygen',
    name: 'Oxygen Builder',
    category: 'Page Builders',
    website: 'https://oxygenbuilder.com',
    icon: 'oxygen',
    description: 'Visual website builder for WordPress with complete design control.',
    detect: {
      scripts: [
        /wp-content\/plugins\/oxygen\//i,
        /ct\.trigger(?:\.min)?\.js/i,
        /oxygen(?:\.min)?\.js/i
      ],
      styles: [
        /wp-content\/plugins\/oxygen\//i,
        /wp-content\/uploads\/oxygen\//i,
        /oxygen-styles/i
      ],
      html: [
        /class="[^"]*(?:ct-section|ct-div-block|ct-link-button|oxygen-|ct-text-block)[^"]*"/i,
        /id="_dynamic_css"/i,
        /<!-- Oxygen/i
      ],
      js: [
        { property: 'ct_builder_is_active' },
        { property: 'oxygen' }
      ],
      implies: ['wordpress', 'php']
    }
  },
  {
    id: 'divi',
    name: 'Divi Builder',
    category: 'Page Builders',
    website: 'https://www.elegantthemes.com/gallery/divi/',
    icon: 'divi',
    description: 'Visual drag & drop WordPress theme and page builder by Elegant Themes.',
    detect: {
      scripts: [
        /wp-content\/(?:themes|plugins)\/Divi\//i,
        /et-builder/i,
        /divi(?:\.min)?\.js/i
      ],
      styles: [
        /wp-content\/(?:themes|plugins)\/Divi\//i,
        /et-core/i,
        /divi-style/i,
        /et-builder/i
      ],
      html: [
        /class="[^"]*(?:et_pb_|et-db|et_divi_builder|et_builder)[^"]*"/i,
        /data-et-multi-view/i,
        /id="et-main-area"/i,
        /<!-- Divi/i
      ],
      js: [
        { property: 'ET_Builder' },
        { property: 'et_pb_custom' },
        { property: 'et_animation_data' }
      ],
      implies: ['wordpress', 'php']
    }
  },
  {
    id: 'wpbakery',
    name: 'WPBakery Page Builder',
    category: 'Page Builders',
    website: 'https://wpbakery.com',
    icon: 'wpbakery',
    description: 'Visual Composer / WPBakery drag and drop page builder plugin for WordPress.',
    detect: {
      meta: [{ name: 'generator', contentRegex: /WPBakery\s*Page\s*Builder\s*([\d.]+)?/i, versionGroup: 1 }],
      scripts: [
        /wp-content\/plugins\/js_composer\//i,
        /js_composer_front/i
      ],
      styles: [
        /wp-content\/plugins\/js_composer\//i,
        /js_composer\.min\.css/i
      ],
      html: [
        /class="[^"]*(?:vc_row|vc_column|wpb_wrapper|vc_custom_)[^"]*"/i,
        /data-vc-full-width/i,
        /<!-- Visual Composer/i,
        /<!-- WPBakery/i
      ],
      js: [
        { property: 'vc_js' },
        { property: 'vc' }
      ],
      implies: ['wordpress', 'php']
    }
  },
  {
    id: 'beaver-builder',
    name: 'Beaver Builder',
    category: 'Page Builders',
    website: 'https://www.wpbeaverbuilder.com',
    icon: 'beaver',
    description: 'Flexible drag and drop page builder plugin for WordPress.',
    detect: {
      scripts: [
        /wp-content\/plugins\/bb-plugin\//i,
        /fl-builder/i
      ],
      styles: [
        /wp-content\/plugins\/bb-plugin\//i,
        /fl-builder/i
      ],
      html: [
        /class="[^"]*(?:fl-builder|fl-row|fl-col|fl-module)[^"]*"/i,
        /data-fl-builder/i
      ],
      js: [{ property: 'FLBuilder' }],
      implies: ['wordpress', 'php']
    }
  },
  {
    id: 'bricks-builder',
    name: 'Bricks Builder',
    category: 'Page Builders',
    website: 'https://bricksbuilder.io',
    icon: 'bricks',
    description: 'Visual site builder for WordPress designed for performance and flexibility.',
    detect: {
      scripts: [
        /wp-content\/themes\/bricks\//i,
        /bricks(?:\.min)?\.js/i
      ],
      styles: [
        /wp-content\/themes\/bricks\//i,
        /bricks(?:\.min)?\.css/i
      ],
      html: [
        /class="[^"]*brxe-[^"]*"/i,
        /data-bricks-/i,
        /id="bricks-content"/i
      ],
      js: [{ property: 'bricksData' }],
      implies: ['wordpress', 'php']
    }
  },
  {
    id: 'gutenberg',
    name: 'Gutenberg Blocks',
    category: 'Page Builders',
    website: 'https://wordpress.org/gutenberg/',
    icon: 'gutenberg',
    description: 'The native WordPress block editor system.',
    detect: {
      styles: [/wp-block-library/i, /wp-block-library-theme/i],
      html: [
        /class="[^"]*wp-block-[^"]*"/i,
        /<!-- wp:[a-z0-9\/-]+/i
      ],
      implies: ['wordpress']
    }
  },
  {
    id: 'breakdance',
    name: 'Breakdance',
    category: 'Page Builders',
    website: 'https://breakdance.com',
    icon: 'breakdance',
    description: 'Modern visual website builder for WordPress by Soflyy.',
    detect: {
      scripts: [/wp-content\/plugins\/breakdance\//i],
      styles: [/wp-content\/plugins\/breakdance\//i, /breakdance-style/i],
      html: [
        /class="[^"]*breakdance-[^"]*"/i,
        /data-breakdance/i
      ],
      implies: ['wordpress', 'php']
    }
  },
  {
    id: 'squarespace',
    name: 'Squarespace',
    category: 'CMS',
    website: 'https://www.squarespace.com',
    icon: 'squarespace',
    description: 'All-in-one website building and hosting platform.',
    detect: {
      meta: [{ name: 'generator', contentRegex: /Squarespace/i }],
      scripts: [/static\d*\.squarespace\.com/i, /squarespace-common/i],
      styles: [/static\d*\.squarespace\.com/i],
      html: [/<!-- This is Squarespace\. -->/i, /static\.squarespace\.com/i],
      js: [{ property: 'Squarespace' }, { property: 'Static.SQUARESPACE_CONTEXT' }],
      headers: [{ name: 'x-servedby', regex: /squarespace/i }]
    }
  },
  {
    id: 'webflow',
    name: 'Webflow',
    category: 'CMS',
    website: 'https://webflow.com',
    icon: 'webflow',
    description: 'Visual web development platform for responsive websites.',
    detect: {
      meta: [{ name: 'generator', contentRegex: /Webflow/i }],
      scripts: [/assets\.website-files\.com/i, /assets-global\.website-files\.com/i, /webflow\.js/i],
      html: [/data-wf-page/i, /data-wf-site/i, /w-nav/i, /w-container/i],
      js: [{ property: 'Webflow' }]
    }
  },
  {
    id: 'ghost',
    name: 'Ghost',
    category: 'CMS',
    website: 'https://ghost.org',
    icon: 'ghost',
    description: 'Modern open source headless publishing platform for creators.',
    detect: {
      meta: [{ name: 'generator', contentRegex: /Ghost\s*([\d.]+)?/i, versionGroup: 1 }],
      scripts: [/ghost-sdk/i, /portal\.min\.js/i],
      html: [/ghost-search/i, /class="[^"]*gh-head[^"]*"/i],
      headers: [{ name: 'x-ghost-cache-status' }],
      implies: ['nodejs', 'javascript']
    }
  },
  {
    id: 'framer',
    name: 'Framer',
    category: 'CMS',
    website: 'https://framer.com',
    icon: 'framer',
    description: 'Interactive design and modern website publishing platform.',
    detect: {
      meta: [{ name: 'generator', contentRegex: /Framer/i }],
      scripts: [/framerusercontent\.com/i, /framer\.com\/m\//i],
      html: [/data-framer-name/i, /framer-site/i, /framerusercontent\.com/i],
      js: [{ property: '__framer_importFromPackage' }, { property: '__framer_events' }],
      implies: ['react', 'javascript']
    }
  },
  {
    id: 'drupal',
    name: 'Drupal',
    category: 'CMS',
    website: 'https://www.drupal.org',
    icon: 'drupal',
    description: 'Enterprise open-source CMS platform.',
    detect: {
      meta: [{ name: 'generator', contentRegex: /Drupal\s*([\d.]+)?/i, versionGroup: 1 }],
      scripts: [/drupal\.js/i, /core\/assets\/vendor\/drupal/i],
      styles: [/drupal\.css/i],
      html: [/Drupal\.settings/i, /data-drupal-selector/i],
      js: [{ property: 'Drupal' }, { property: 'drupalSettings' }],
      headers: [{ name: 'x-drupal-cache' }, { name: 'x-generator', regex: /Drupal\s*([\d.]+)?/i, versionGroup: 1 }],
      implies: ['php']
    }
  },
  {
    id: 'joomla',
    name: 'Joomla',
    category: 'CMS',
    website: 'https://www.joomla.org',
    icon: 'joomla',
    description: 'Free open-source CMS and publishing system.',
    detect: {
      meta: [{ name: 'generator', contentRegex: /Joomla!\s*-?\s*([\d.]+)?/i, versionGroup: 1 }],
      scripts: [/media\/jui\/js/i, /media\/system\/js/i],
      html: [/href="[^"]*\/index\.php\?option=com_/i],
      js: [{ property: 'Joomla' }],
      implies: ['php']
    }
  },
  {
    id: 'magento',
    name: 'Magento',
    category: 'E-Commerce',
    website: 'https://business.adobe.com/products/magento/magento-commerce.html',
    icon: 'magento',
    description: 'Enterprise open-source eCommerce platform by Adobe.',
    detect: {
      scripts: [/mage\/cookies\.js/i, /static\/frontend\/Magento/i],
      styles: [/static\/frontend\/Magento/i],
      html: [/data-mage-init/i, /text\/x-magento-init/i],
      js: [{ property: 'mage' }, { property: 'Mage' }],
      headers: [{ name: 'x-magento-tags' }, { name: 'x-magento-cache-debug' }],
      implies: ['php']
    }
  },
  {
    id: 'prestashop',
    name: 'PrestaShop',
    category: 'E-Commerce',
    website: 'https://prestashop.com',
    icon: 'prestashop',
    description: 'Open source eCommerce solution.',
    detect: {
      meta: [{ name: 'generator', contentRegex: /PrestaShop/i }],
      scripts: [/prestashop(?:\.min)?\.js/i],
      html: [/var prestashop =/i],
      js: [{ property: 'prestashop' }],
      implies: ['php']
    }
  },
  {
    id: 'bigcommerce',
    name: 'BigCommerce',
    category: 'E-Commerce',
    website: 'https://www.bigcommerce.com',
    icon: 'bigcommerce',
    description: 'Enterprise ecommerce platform for B2B and B2C.',
    detect: {
      scripts: [/cdn\d+\.bigcommerce\.com/i],
      html: [/cdn\d+\.bigcommerce\.com/i, /bc-sf-filter/i],
      js: [{ property: 'stencilUtils' }, { property: 'BCData' }]
    }
  },
  {
    id: 'contentful',
    name: 'Contentful',
    category: 'CMS',
    website: 'https://www.contentful.com',
    icon: 'contentful',
    description: 'Composable headless content platform for digital experiences.',
    detect: {
      scripts: [/contentful\.com/i, /images\.ctfassets\.net/i],
      html: [/images\.ctfassets\.net/i, /assets\.ctfassets\.net/i]
    }
  },
  {
    id: 'sanity',
    name: 'Sanity',
    category: 'CMS',
    website: 'https://www.sanity.io',
    icon: 'sanity',
    description: 'Headless CMS with real-time collaborative content workspace.',
    detect: {
      scripts: [/cdn\.sanity\.io/i],
      html: [/cdn\.sanity\.io/i]
    }
  },
  {
    id: 'strapi',
    name: 'Strapi',
    category: 'CMS',
    website: 'https://strapi.io',
    icon: 'strapi',
    description: 'Leading open-source headless CMS built with Node.js.',
    detect: {
      html: [/strapi\.io/i, /api\/upload\/files/i],
      implies: ['nodejs', 'javascript']
    }
  },
  {
    id: 'hubspot-cms',
    name: 'HubSpot CMS',
    category: 'CMS',
    website: 'https://www.hubspot.com/products/cms',
    icon: 'hubspot',
    description: 'Content management system tailored for marketing & CRM.',
    detect: {
      meta: [{ name: 'generator', contentRegex: /HubSpot/i }],
      scripts: [
        /js\.hs-scripts\.com/i,
        /js-na1\.hs-scripts\.com/i,
        /js-eu1\.hs-scripts\.com/i,
        /js\.hsforms\.net/i,
        /js\.hubspot\.com/i,
        /js\.hs-analytics\.net/i,
        /js\.hs-banner\.com/i,
        /js\.hscollectedforms\.net/i
      ],
      html: [
        /hs-content-id/i,
        /hs-page-id/i,
        /class="[^"]*hs_cos_wrapper[^"]*"/i,
        /id="hs-banner"/i,
        /<!-- HubSpot/i,
        /class="[^"]*hs-form[^"]*"/i
      ],
      cookies: [/hubspotutk/i, /__hstc/i, /__hssc/i],
      js: [
        { property: '_hsq' },
        { property: '_hsp' },
        { property: 'hbspt' },
        { property: 'hsVars' },
        { property: 'hubspot' }
      ]
    }
  },

  // ==========================================
  // ANALYTICS & TRACKING
  // ==========================================
  {
    id: 'google-analytics',
    name: 'Google Analytics (GA4)',
    category: 'Analytics',
    website: 'https://analytics.google.com',
    icon: 'googleanalytics',
    description: 'Enterprise analytics measurement platform from Google.',
    detect: {
      scripts: [/google-analytics\.com\/(?:analytics|gtag\/js)/i, /googletagmanager\.com\/gtag\/js\?id=G-/i],
      html: [/www\.google-analytics\.com\/analytics\.js/i],
      js: [{ property: 'gtag' }, { property: 'ga' }, { property: 'GoogleAnalyticsObject' }]
    }
  },
  {
    id: 'google-tag-manager',
    name: 'Google Tag Manager',
    category: 'Tag Managers',
    website: 'https://tagmanager.google.com',
    icon: 'gtm',
    description: 'Tag management system for quickly updating tracking codes.',
    detect: {
      scripts: [/googletagmanager\.com\/gtm\.js/i],
      html: [/googletagmanager\.com\/gtm\.js/i, /googletagmanager\.com\/ns\.html/i],
      js: [{ property: 'google_tag_manager' }, { property: 'dataLayer' }]
    }
  },
  {
    id: 'hotjar',
    name: 'Hotjar',
    category: 'Analytics',
    website: 'https://www.hotjar.com',
    icon: 'hotjar',
    description: 'Behavior analytics and user feedback service with heatmaps and recordings.',
    detect: {
      scripts: [/static\.hotjar\.com\/c\/hotjar-/i],
      js: [{ property: 'hj' }, { property: '_hjSettings' }]
    }
  },
  {
    id: 'mixpanel',
    name: 'Mixpanel',
    category: 'Analytics',
    website: 'https://mixpanel.com',
    icon: 'mixpanel',
    description: 'Product analytics tool tracking user interactions.',
    detect: {
      scripts: [/cdn\.mxpnl\.com\/libs\/mixpanel/i],
      js: [{ property: 'mixpanel', versionProperty: 'mixpanel.__VERSION' }]
    }
  },
  {
    id: 'segment',
    name: 'Segment',
    category: 'Analytics',
    website: 'https://segment.com',
    icon: 'segment',
    description: 'Customer Data Platform (CDP) for capturing and routing customer data.',
    detect: {
      scripts: [/cdn\.segment\.com\/analytics\.js/i],
      js: [{ property: 'analytics', versionProperty: 'analytics.VERSION' }]
    }
  },
  {
    id: 'posthog',
    name: 'PostHog',
    category: 'Analytics',
    website: 'https://posthog.com',
    icon: 'posthog',
    description: 'Open source product analytics, session recording, and feature flags.',
    detect: {
      scripts: [/app\.posthog\.com\/static\/array\.js/i, /cdn\.posthog\.com/i],
      js: [{ property: 'posthog', versionProperty: 'posthog.LIB_VERSION' }]
    }
  },
  {
    id: 'plausible',
    name: 'Plausible Analytics',
    category: 'Analytics',
    website: 'https://plausible.io',
    icon: 'plausible',
    description: 'Lightweight, privacy-friendly Google Analytics alternative.',
    detect: {
      scripts: [/plausible\.io\/js\/script/i, /plausible\.io\/js\/plausible/i],
      js: [{ property: 'plausible' }]
    }
  },
  {
    id: 'microsoft-clarity',
    name: 'Microsoft Clarity',
    category: 'Analytics',
    website: 'https://clarity.microsoft.com',
    icon: 'clarity',
    description: 'Free user behavior analytics with session replays and heatmaps.',
    detect: {
      scripts: [/www\.clarity\.ms\/tag/i],
      js: [{ property: 'clarity' }]
    }
  },
  {
    id: 'fathom',
    name: 'Fathom Analytics',
    category: 'Analytics',
    website: 'https://usefathom.com',
    icon: 'fathom',
    description: 'Simple, privacy-first website analytics.',
    detect: {
      scripts: [/cdn\.usefathom\.com/i],
      js: [{ property: 'fathom' }]
    }
  },
  {
    id: 'facebook-pixel',
    name: 'Meta Pixel',
    category: 'Marketing & CRM',
    website: 'https://www.facebook.com/business/tools/meta-pixel',
    icon: 'meta',
    description: 'Analytics tool for measuring the effectiveness of Meta advertising.',
    detect: {
      scripts: [/connect\.facebook\.net\/[a-zA-Z_]+\/fbevents\.js/i],
      html: [/connect\.facebook\.net/i],
      js: [{ property: 'fbq' }, { property: '_fbq' }]
    }
  },

  // ==========================================
  // MARKETING, CRM & LIVE CHAT
  // ==========================================
  {
    id: 'hubspot',
    name: 'HubSpot',
    category: 'Marketing & CRM',
    website: 'https://www.hubspot.com',
    icon: 'hubspot',
    description: 'Inbound marketing, sales, and customer service platform.',
    detect: {
      scripts: [
        /js\.hs-scripts\.com/i,
        /js-na1\.hs-scripts\.com/i,
        /js-eu1\.hs-scripts\.com/i,
        /js\.hs-analytics\.net/i,
        /js\.hubspot\.com/i,
        /js\.hsforms\.net/i,
        /js\.hs-banner\.com/i,
        /js\.hsleadflows\.net/i,
        /js\.hsadspixel\.net/i
      ],
      html: [
        /hs-content-id/i,
        /hs-page-id/i,
        /class="[^"]*hs_cos_wrapper[^"]*"/i,
        /class="[^"]*hs-form[^"]*"/i,
        /id="hs-banner"/i
      ],
      cookies: [/hubspotutk/i, /__hstc/i, /__hssc/i],
      js: [
        { property: '_hsq' },
        { property: '_hsp' },
        { property: 'HubSpotConversations' },
        { property: 'hbspt' },
        { property: 'hsVars' },
        { property: 'hubspot' }
      ]
    }
  },
  {
    id: 'intercom',
    name: 'Intercom',
    category: 'Marketing & CRM',
    website: 'https://www.intercom.com',
    icon: 'intercom',
    description: 'AI-first customer service platform and live messaging.',
    detect: {
      scripts: [/widget\.intercom\.io/i, /js\.intercomcdn\.com/i],
      js: [{ property: 'Intercom' }, { property: 'intercomSettings' }]
    }
  },
  {
    id: 'crisp',
    name: 'Crisp',
    category: 'Marketing & CRM',
    website: 'https://crisp.chat',
    icon: 'crisp',
    description: 'Multichannel customer support chat software.',
    detect: {
      scripts: [/client\.crisp\.chat/i],
      js: [{ property: '$crisp' }, { property: 'CRISP_RUNTIME_CONFIG' }]
    }
  },
  {
    id: 'zendesk',
    name: 'Zendesk',
    category: 'Marketing & CRM',
    website: 'https://www.zendesk.com',
    icon: 'zendesk',
    description: 'Customer service software and support ticket system.',
    detect: {
      scripts: [/static\.zdassets\.com/i, /ekr\.zdassets\.com/i],
      js: [{ property: 'zE' }, { property: 'zEmbed' }]
    }
  },
  {
    id: 'klaviyo',
    name: 'Klaviyo',
    category: 'Marketing & CRM',
    website: 'https://www.klaviyo.com',
    icon: 'klaviyo',
    description: 'Marketing automation and email platform for eCommerce.',
    detect: {
      scripts: [/static\.klaviyo\.com\/onsite\/js\/klaviyo\.js/i],
      js: [{ property: 'klaviyo' }, { property: '_learnq' }]
    }
  },

  // ==========================================
  // PAYMENT PROCESSORS
  // ==========================================
  {
    id: 'stripe',
    name: 'Stripe',
    category: 'Payment Processors',
    website: 'https://stripe.com',
    icon: 'stripe',
    description: 'Online payment processing and financial infrastructure.',
    detect: {
      scripts: [/js\.stripe\.com\/v\d+/i],
      js: [{ property: 'Stripe', versionProperty: 'Stripe.version' }]
    }
  },
  {
    id: 'paypal',
    name: 'PayPal',
    category: 'Payment Processors',
    website: 'https://www.paypal.com',
    icon: 'paypal',
    description: 'Global online payments system.',
    detect: {
      scripts: [/www\.paypal\.com\/sdk\/js/i, /www\.paypalobjects\.com/i],
      js: [{ property: 'paypal', versionProperty: 'paypal.version' }]
    }
  },
  {
    id: 'klarna',
    name: 'Klarna',
    category: 'Payment Processors',
    website: 'https://www.klarna.com',
    icon: 'klarna',
    description: 'Buy now, pay later (BNPL) payment services.',
    detect: {
      scripts: [/x\.klarnacdn\.net/i, /js\.klarna\.com/i],
      js: [{ property: 'Klarna' }]
    }
  },
  {
    id: 'square',
    name: 'Square',
    category: 'Payment Processors',
    website: 'https://squareup.com',
    icon: 'square',
    description: 'Financial services and digital payments platform.',
    detect: {
      scripts: [/web\.squarecdn\.com\/v\d+\/square\.js/i, /js\.squareup\.com/i],
      js: [{ property: 'Square' }]
    }
  },
  {
    id: 'adyen',
    name: 'Adyen',
    category: 'Payment Processors',
    website: 'https://www.adyen.com',
    icon: 'adyen',
    description: 'Global multichannel payment platform.',
    detect: {
      scripts: [/checkoutshopper-live\.adyen\.com/i],
      js: [{ property: 'AdyenCheckout' }]
    }
  },
  {
    id: 'razorpay',
    name: 'Razorpay',
    category: 'Payment Processors',
    website: 'https://razorpay.com',
    icon: 'razorpay',
    description: 'Full-stack payments solution platform.',
    detect: {
      scripts: [/checkout\.razorpay\.com\/v\d+\/checkout\.js/i],
      js: [{ property: 'Razorpay' }]
    }
  },
  {
    id: 'paddle',
    name: 'Paddle',
    category: 'Payment Processors',
    website: 'https://paddle.com',
    icon: 'paddle',
    description: 'Complete payments, tax and subscription solution for SaaS.',
    detect: {
      scripts: [/cdn\.paddle\.com\/paddle\/paddle\.js/i, /cdn\.paddle\.com\/paddle\/v\d+\/paddle\.js/i],
      js: [{ property: 'Paddle' }]
    }
  },
  {
    id: 'lemon-squeezy',
    name: 'Lemon Squeezy',
    category: 'Payment Processors',
    website: 'https://www.lemonsqueezy.com',
    icon: 'lemonsqueezy',
    description: 'Merchant of record platform for SaaS and digital goods.',
    detect: {
      scripts: [/assets\.lemonsqueezy\.com\/lemon\.js/i],
      js: [{ property: 'createLemonSqueezy' }, { property: 'lemonSqueezy' }]
    }
  },

  // ==========================================
  // CDN, CLOUD & HOSTING
  // ==========================================
  {
    id: 'cloudflare',
    name: 'Cloudflare',
    category: 'CDN & Hosting',
    website: 'https://www.cloudflare.com',
    icon: 'cloudflare',
    description: 'Global cloud network providing CDN, DDoS mitigation, and edge security.',
    detect: {
      scripts: [/static\.cloudflareinsights\.com/i, /challenges\.cloudflare\.com/i, /cdnjs\.cloudflare\.com/i],
      headers: [
        { name: 'cf-ray' },
        { name: 'server', regex: /cloudflare/i },
        { name: 'cf-cache-status' }
      ],
      cookies: [/__cf_bm/, /cf_clearance/]
    }
  },
  {
    id: 'aws-cloudfront',
    name: 'Amazon CloudFront',
    category: 'CDN & Hosting',
    website: 'https://aws.amazon.com/cloudfront/',
    icon: 'aws',
    description: 'Global content delivery network (CDN) by AWS.',
    detect: {
      headers: [
        { name: 'x-amz-cf-id' },
        { name: 'x-amz-cf-pop' },
        { name: 'via', regex: /CloudFront/i }
      ]
    }
  },
  {
    id: 'fastly',
    name: 'Fastly',
    category: 'CDN & Hosting',
    website: 'https://www.fastly.com',
    icon: 'fastly',
    description: 'Edge cloud platform and high-performance CDN.',
    detect: {
      headers: [
        { name: 'x-fastly-request-id' },
        { name: 'x-served-by', regex: /cache-/i },
        { name: 'fastly-restarts' }
      ]
    }
  },
  {
    id: 'akamai',
    name: 'Akamai',
    category: 'CDN & Hosting',
    website: 'https://www.akamai.com',
    icon: 'akamai',
    description: 'Global CDN, cybersecurity, and cloud service provider.',
    detect: {
      headers: [
        { name: 'x-akamai-transformed' },
        { name: 'x-akamai-request-id' },
        { name: 'x-check-cacheable' }
      ]
    }
  },
  {
    id: 'vercel',
    name: 'Vercel',
    category: 'CDN & Hosting',
    website: 'https://vercel.com',
    icon: 'vercel',
    description: 'Frontend cloud platform offering serverless and edge hosting.',
    detect: {
      scripts: [/_vercel\/insights/i, /_vercel\/speed-insights/i],
      headers: [
        { name: 'x-vercel-id' },
        { name: 'x-vercel-cache' },
        { name: 'server', regex: /Vercel/i }
      ]
    }
  },
  {
    id: 'netlify',
    name: 'Netlify',
    category: 'CDN & Hosting',
    website: 'https://www.netlify.com',
    icon: 'netlify',
    description: 'Platform for modern web apps and serverless backends.',
    detect: {
      headers: [
        { name: 'x-nf-request-id' },
        { name: 'server', regex: /Netlify/i }
      ]
    }
  },
  {
    id: 'github-pages',
    name: 'GitHub Pages',
    category: 'CDN & Hosting',
    website: 'https://pages.github.com',
    icon: 'github',
    description: 'Websites hosted directly from a GitHub repository.',
    detect: {
      headers: [
        { name: 'x-github-request-id' },
        { name: 'server', regex: /GitHub\.com/i }
      ]
    }
  },
  {
    id: 'firebase-hosting',
    name: 'Firebase Hosting',
    category: 'CDN & Hosting',
    website: 'https://firebase.google.com/docs/hosting',
    icon: 'firebase',
    description: 'Fast and secure web hosting from Google Firebase.',
    detect: {
      headers: [
        { name: 'x-firebase-cache' },
        { name: 'server', regex: /Google Frontend/i }
      ]
    }
  },

  // ==========================================
  // WEB SERVERS
  // ==========================================
  {
    id: 'nginx',
    name: 'Nginx',
    category: 'Web Servers',
    website: 'https://nginx.org',
    icon: 'nginx',
    description: 'High-performance HTTP server and reverse proxy.',
    detect: {
      headers: [{ name: 'server', regex: /nginx(?:\/([\d.]+))?/i, versionGroup: 1 }]
    }
  },
  {
    id: 'apache',
    name: 'Apache HTTP Server',
    category: 'Web Servers',
    website: 'https://httpd.apache.org',
    icon: 'apache',
    description: 'Widely used open-source HTTP web server software.',
    detect: {
      headers: [{ name: 'server', regex: /Apache(?:\/([\d.]+))?/i, versionGroup: 1 }]
    }
  },
  {
    id: 'litespeed',
    name: 'LiteSpeed',
    category: 'Web Servers',
    website: 'https://www.litespeedtech.com',
    icon: 'litespeed',
    description: 'High-performance LiteSpeed Web Server.',
    detect: {
      headers: [{ name: 'server', regex: /LiteSpeed/i }, { name: 'x-litespeed-cache' }]
    }
  },
  {
    id: 'caddy',
    name: 'Caddy',
    category: 'Web Servers',
    website: 'https://caddyserver.com',
    icon: 'caddy',
    description: 'Enterprise open source web server with automatic HTTPS written in Go.',
    detect: {
      headers: [{ name: 'server', regex: /Caddy/i }],
      implies: ['golang']
    }
  },
  {
    id: 'microsoft-iis',
    name: 'Microsoft IIS',
    category: 'Web Servers',
    website: 'https://www.iis.net',
    icon: 'microsoft',
    description: 'Flexible, secure Web server for hosting Windows web apps.',
    detect: {
      headers: [
        { name: 'server', regex: /Microsoft-IIS(?:\/([\d.]+))?/i, versionGroup: 1 },
        { name: 'x-powered-by', regex: /ASP\.NET/i }
      ],
      implies: ['csharp', 'aspnet']
    }
  },

  // ==========================================
  // SECURITY & PRIVACY
  // ==========================================
  {
    id: 'cloudflare-turnstile',
    name: 'Cloudflare Turnstile',
    category: 'Security & Privacy',
    website: 'https://www.cloudflare.com/products/turnstile/',
    icon: 'cloudflare',
    description: 'Smart CAPTCHA alternative providing frictionless bot security.',
    detect: {
      scripts: [/challenges\.cloudflare\.com\/turnstile\/v0\/api\.js/i],
      html: [/class="[^"]*cf-turnstile[^"]*"/i],
      js: [{ property: 'turnstile' }]
    }
  },
  {
    id: 'recaptcha',
    name: 'Google reCAPTCHA',
    category: 'Security & Privacy',
    website: 'https://www.google.com/recaptcha',
    icon: 'google',
    description: 'Fraud and abuse defense service from Google.',
    detect: {
      scripts: [/google\.com\/recaptcha\/api\.js/i, /gstatic\.com\/recaptcha/i],
      html: [/class="[^"]*g-recaptcha[^"]*"/i],
      js: [{ property: 'grecaptcha' }]
    }
  },
  {
    id: 'hcaptcha',
    name: 'hCaptcha',
    category: 'Security & Privacy',
    website: 'https://www.hcaptcha.com',
    icon: 'hcaptcha',
    description: 'Privacy-focused CAPTCHA and anti-bot defense solution.',
    detect: {
      scripts: [/js\.hcaptcha\.com\/1\/api\.js/i],
      html: [/class="[^"]*h-captcha[^"]*"/i],
      js: [{ property: 'hcaptcha' }]
    }
  },
  {
    id: 'onetrust',
    name: 'OneTrust',
    category: 'Security & Privacy',
    website: 'https://www.onetrust.com',
    icon: 'onetrust',
    description: 'Enterprise trust management and cookie consent compliance platform.',
    detect: {
      scripts: [/cdn\.cookielaw\.org\/scripttemplates\/otSDKStub\.js/i],
      js: [{ property: 'OneTrust' }, { property: 'OnetrustActiveGroups' }]
    }
  },
  {
    id: 'cookiebot',
    name: 'Cookiebot',
    category: 'Security & Privacy',
    website: 'https://www.cookiebot.com',
    icon: 'cookiebot',
    description: 'Automated GDPR, ePrivacy, and CCPA cookie consent solution.',
    detect: {
      scripts: [/consent\.cookiebot\.com\/uc\.js/i],
      js: [{ property: 'Cookiebot' }, { property: 'CookieConsent' }]
    }
  },
  {
    id: 'sentry',
    name: 'Sentry',
    category: 'Security & Privacy',
    website: 'https://sentry.io',
    icon: 'sentry',
    description: 'Application performance monitoring and error tracking software.',
    detect: {
      scripts: [/browser\.sentry-cdn\.com/i, /js\.sentry-cdn\.com/i],
      js: [{ property: 'Sentry', versionProperty: 'Sentry.SDK_VERSION' }, { property: '__SENTRY__' }]
    }
  },
  {
    id: 'datadog',
    name: 'Datadog RUM',
    category: 'Security & Privacy',
    website: 'https://www.datadoghq.com',
    icon: 'datadog',
    description: 'Full-stack observability and real user monitoring.',
    detect: {
      scripts: [/www\.datadoghq-browser-agent\.com/i],
      js: [{ property: 'DD_RUM' }, { property: 'DD_LOGS' }]
    }
  },

  // ==========================================
  // DATABASES & BAAS
  // ==========================================
  {
    id: 'supabase',
    name: 'Supabase',
    category: 'Databases & BaaS',
    website: 'https://supabase.com',
    icon: 'supabase',
    description: 'Open source Firebase alternative with Postgres database, Auth, and Edge Functions.',
    detect: {
      scripts: [
        /@supabase\/(?:supabase-js|ssr|auth-helpers|auth-ui)(?:@([0-9.]+))?/i,
        /supabase(?:-js)?(?:\.min)?\.js(?:[?#]|$)/i,
        /cdn\.jsdelivr\.net\/npm\/@supabase/i,
        /esm\.sh\/@supabase/i,
        /unpkg\.com\/@supabase/i,
        /[a-z0-9_-]+\.supabase\.(?:co|in)/i,
        /supabase\.(?:co|com)\/(?:rest|auth|storage|functions|realtime|api)/i
      ],
      js: [
        { property: 'supabase' },
        { property: '_supabase' },
        { property: '__SUPABASE__' },
        { property: 'supabaseClient' },
        { property: '_supabaseClient' }
      ],
      html: [
        /[a-z0-9_-]+\.supabase\.(?:co|in)/i,
        /NEXT_PUBLIC_SUPABASE_URL/i,
        /NEXT_PUBLIC_SUPABASE_ANON_KEY/i,
        /VITE_SUPABASE_URL/i,
        /VITE_SUPABASE_ANON_KEY/i,
        /data-supabase/i,
        /supabase\.co\/(?:rest|auth|storage|functions)/i
      ],
      cookies: [
        /sb-[a-z0-9_-]+-auth-token/i,
        /supabase[-_]auth[-_]token/i,
        /sb:[a-z0-9_-]+:token/i,
        /sb-access-token/i,
        /sb-refresh-token/i
      ],
      storage: [
        /sb-[a-z0-9_-]+-auth-token/i,
        /supabase\.auth\.token/i,
        /sb:[a-z0-9_-]+:token/i,
        /sb-provider-token/i,
        /sb-refresh-token/i,
        /^supabase/i
      ]
    }
  },
  {
    id: 'firebase',
    name: 'Google Firebase',
    category: 'Databases & BaaS',
    website: 'https://firebase.google.com',
    icon: 'firebase',
    description: 'App development platform with Firestore, Authentication, and Cloud Functions.',
    detect: {
      scripts: [/gstatic\.com\/firebasejs\//i],
      js: [{ property: 'firebase', versionProperty: 'firebase.SDK_VERSION' }]
    }
  },
  {
    id: 'mysql',
    name: 'MySQL',
    category: 'Databases & BaaS',
    website: 'https://www.mysql.com',
    icon: 'mysql',
    description: 'Open-source relational database management system powering millions of web applications.',
    detect: {
      html: [/mysql/i]
    }
  },
  {
    id: 'postgresql',
    name: 'PostgreSQL',
    category: 'Databases & BaaS',
    website: 'https://www.postgresql.org',
    icon: 'postgresql',
    description: 'Powerful, open-source object-relational database system.',
    detect: {
      html: [/postgres/i]
    }
  },
  {
    id: 'mongodb',
    name: 'MongoDB',
    category: 'Databases & BaaS',
    website: 'https://www.mongodb.com',
    icon: 'mongodb',
    description: 'Popular document-based distributed database platform.',
    detect: {
      scripts: [/mongodb/i]
    }
  },

  // ==========================================
  // SEO & PERFORMANCE TOOLS
  // ==========================================
  {
    id: 'yoast-seo',
    name: 'Yoast SEO',
    category: 'SEO & Performance',
    website: 'https://yoast.com/wordpress/plugins/seo/',
    icon: 'yoast',
    description: 'The #1 WordPress SEO plugin to optimize rankings.',
    detect: {
      html: [/<!-- This site is optimized with the Yoast SEO plugin/i, /yoast-schema-graph/i],
      implies: ['wordpress']
    }
  },
  {
    id: 'rank-math',
    name: 'Rank Math SEO',
    category: 'SEO & Performance',
    website: 'https://rankmath.com',
    icon: 'rankmath',
    description: 'All-in-one SEO plugin for WordPress with AI SEO capabilities.',
    detect: {
      html: [/<!-- \/ Rank Math WordPress SEO plugin/i, /rank-math-schema/i],
      implies: ['wordpress']
    }
  },
  {
    id: 'cloudflare-rocket-loader',
    name: 'Cloudflare Rocket Loader',
    category: 'SEO & Performance',
    website: 'https://developers.cloudflare.com/speed/optimization/content/rocket-loader/',
    icon: 'cloudflare',
    description: 'Asynchronous JavaScript loading engine by Cloudflare.',
    detect: {
      scripts: [/rocket-loader\.min\.js/i],
      html: [/data-cfasync="false"/i, /type="text\/rocketscript"/i],
      implies: ['cloudflare']
    }
  },

  // ==========================================
  // VIDEO PLAYERS
  // ==========================================
  {
    id: 'youtube',
    name: 'YouTube',
    category: 'Video Players',
    website: 'https://www.youtube.com',
    icon: 'youtube',
    description: 'Embedded video player platform and streaming service by Google.',
    detect: {
      scripts: [
        /youtube\.com\/iframe_api/i,
        /s\.ytimg\.com\/yts\/jsbin/i,
        /youtube\.com\/s\/player\//i,
        /youtube-nocookie\.com/i
      ],
      html: [
        /<iframe[^>]+src=["'][^"']*(?:youtube\.com|youtube-nocookie\.com|youtu\.be)\/(?:embed\/|watch\?v=)/i,
        /<iframe[^>]+src=["'][^"']*youtube/i
      ],
      js: [
        { property: 'YT' },
        { property: 'YTConfig' },
        { property: 'onYouTubeIframeAPIReady' },
        { property: 'ytplayer' }
      ]
    }
  },
  {
    id: 'vimeo',
    name: 'Vimeo',
    category: 'Video Players',
    website: 'https://vimeo.com',
    icon: 'vimeo',
    description: 'High-definition video hosting and embeddable player platform.',
    detect: {
      scripts: [/player\.vimeo\.com\/api\/player\.js/i],
      html: [/<iframe[^>]+src=["'][^"']*player\.vimeo\.com/i],
      js: [{ property: 'Vimeo' }]
    }
  },
  {
    id: 'videojs',
    name: 'Video.js',
    category: 'Video Players',
    website: 'https://videojs.com',
    icon: 'videojs',
    description: 'Open source HTML5 & Flash video player library.',
    detect: {
      scripts: [/video(?:\.min)?\.js/i, /vjs\.zencdn\.net/i],
      html: [/class="[^"]*video-js[^"]*"/i, /data-setup/i],
      js: [{ property: 'videojs', versionProperty: 'videojs.VERSION' }]
    }
  },

  // ==========================================
  // FONT SCRIPTS & TYPOGRAPHY
  // ==========================================
  {
    id: 'google-font-api',
    name: 'Google Font API',
    category: 'Font Scripts',
    website: 'https://fonts.google.com',
    icon: 'google-fonts',
    description: 'Free, open-source typography delivery network by Google.',
    detect: {
      styles: [
        /fonts\.googleapis\.com\/css/i,
        /fonts\.gstatic\.com/i
      ],
      scripts: [
        /ajax\.googleapis\.com\/ajax\/libs\/webfont/i,
        /fonts\.googleapis\.com/i
      ],
      html: [
        /<link[^>]+href=["'][^"']*fonts\.(?:googleapis|gstatic)\.com/i,
        /@import\s+(?:url\(['"]?)?https?:\/\/fonts\.(?:googleapis|gstatic)\.com/i
      ],
      js: [
        { property: 'WebFont' },
        { property: 'WebFontConfig' }
      ]
    }
  },
  {
    id: 'font-awesome',
    name: 'Font Awesome',
    category: 'Font Scripts',
    website: 'https://fontawesome.com',
    icon: 'font-awesome',
    description: 'Icon library and toolkit used by millions of websites.',
    detect: {
      styles: [/font-awesome(?:\.min)?\.css/i, /fontawesome(?:\.min)?\.css/i, /kit\.fontawesome\.com/i],
      scripts: [/kit\.fontawesome\.com/i, /fontawesome(?:\.min)?\.js/i],
      html: [/class="[^"]*(?:fa-[a-z0-9-]+|fas|far|fab|fad|fal)\b[^"]*"/i],
      js: [{ property: 'FontAwesome' }, { property: 'FontAwesomeConfig' }]
    }
  },
  {
    id: 'typekit',
    name: 'Adobe Fonts (Typekit)',
    category: 'Font Scripts',
    website: 'https://fonts.adobe.com',
    icon: 'typekit',
    description: 'Subscription typography service delivering premium Adobe fonts.',
    detect: {
      styles: [/use\.typekit\.net/i, /p\.typekit\.net/i],
      scripts: [/use\.typekit\.net/i],
      js: [{ property: 'Typekit' }]
    }
  },

  // ==========================================
  // MISCELLANEOUS & METADATA
  // ==========================================
  {
    id: 'open-graph',
    name: 'Open Graph',
    category: 'Miscellaneous',
    website: 'https://ogp.me',
    icon: 'open-graph',
    description: 'Protocol that enables web pages to become rich objects in social graphs.',
    detect: {
      meta: [
        { name: 'og:title' },
        { name: 'og:description' },
        { name: 'og:image' },
        { name: 'og:type' },
        { name: 'og:url' },
        { name: 'og:site_name' }
      ],
      html: [
        /<meta[^>]+property=["']og:/i,
        /<meta[^>]+name=["']og:/i,
        /prefix=["'][^"']*og:\s*http:\/\/ogp\.me\/ns#/i
      ]
    }
  },
  {
    id: 'twitter-cards',
    name: 'Twitter Cards',
    category: 'Miscellaneous',
    website: 'https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/abouts-cards',
    icon: 'twitter',
    description: 'Metadata tags attaching rich media to Tweets linking to web content.',
    detect: {
      meta: [
        { name: 'twitter:card' },
        { name: 'twitter:site' },
        { name: 'twitter:creator' },
        { name: 'twitter:title' },
        { name: 'twitter:description' },
        { name: 'twitter:image' }
      ],
      html: [
        /<meta[^>]+name=["']twitter:/i,
        /<meta[^>]+property=["']twitter:/i
      ]
    }
  },
  {
    id: 'schema-org',
    name: 'Schema.org (JSON-LD)',
    category: 'Miscellaneous',
    website: 'https://schema.org',
    icon: 'schema',
    description: 'Structured data markup vocabulary for search engine optimization.',
    detect: {
      html: [
        /type="application\/ld\+json"/i,
        /itemscope/i,
        /itemtype="https?:\/\/schema\.org\//i
      ]
    }
  },

  // ==========================================
  // UI & COMPONENT FRAMEWORKS
  // ==========================================
  {
    id: 'radix-ui',
    name: 'Radix UI',
    category: 'UI Frameworks',
    website: 'https://www.radix-ui.com',
    icon: 'radix-ui',
    description: 'Unstyled, accessible components for building high-quality design systems and web apps in React.',
    detect: {
      scripts: [/@radix-ui/i],
      html: [/data-radix-/i, /data-state=["'](?:open|closed|checked|unchecked)["']/i],
      dom: ['[data-radix-collection-item]', '[data-radix-focus-guard]', '[data-radix-popper-content-wrapper]', '[data-state]'],
      implies: ['react']
    }
  },
  {
    id: 'shadcn-ui',
    name: 'shadcn/ui',
    category: 'UI Frameworks',
    website: 'https://ui.shadcn.com',
    icon: 'shadcn-ui',
    description: 'Beautifully designed components built with Radix UI and Tailwind CSS.',
    detect: {
      html: [/data-slot=/i, /data-sidebar=/i],
      dom: ['[data-slot]', '[data-sidebar]'],
      implies: ['radix-ui', 'tailwindcss', 'react']
    }
  },

  // ==========================================
  // JAVASCRIPT LIBRARIES & UTILITIES
  // ==========================================
  {
    id: 'photoswipe',
    name: 'PhotoSwipe',
    category: 'JavaScript Libraries',
    website: 'https://photoswipe.com',
    icon: 'photoswipe',
    description: 'JavaScript image gallery for mobile and desktop, modular, framework independent.',
    detect: {
      scripts: [/photoswipe(?:\.min)?\.js(?:\?ver=([\d.]+))?/i, /photoswipe-ui-default(?:\.min)?\.js/i],
      styles: [/photoswipe(?:\.min)?\.css/i],
      html: [/class="[^"]*pswp[^"]*"/i, /photoswipe-fullscreen-dialog/i],
      dom: ['.pswp', '#photoswipe-fullscreen-dialog'],
      js: [{ property: 'PhotoSwipe' }]
    }
  },
  {
    id: 'prettyphoto',
    name: 'prettyPhoto',
    category: 'JavaScript Libraries',
    website: 'https://github.com/scaron/prettyphoto',
    icon: 'prettyphoto',
    description: 'jQuery lightbox clone that supports images, videos, Flash, iframes, and ajax.',
    detect: {
      scripts: [/prettyPhoto(?:\.min)?\.js(?:\?ver=([\d.]+))?/i],
      styles: [/prettyPhoto(?:\.min)?\.css/i],
      html: [/woocommerce_prettyPhoto_css/i, /prettyPhoto\.css/i],
      js: [{ property: 'jQuery.fn.prettyPhoto' }],
      implies: ['jquery']
    }
  },
  {
    id: 'select2',
    name: 'Select2',
    category: 'JavaScript Libraries',
    website: 'https://select2.org',
    icon: 'select2',
    description: 'jQuery-based replacement for select boxes supporting searching, remote data sets, and pagination.',
    detect: {
      scripts: [/select2(?:\.full)?(?:\.min)?\.js(?:\?ver=([\d.]+))?/i],
      styles: [/select2(?:\.min)?\.css(?:\?ver=([\d.]+))?/i],
      html: [/class="[^"]*select2(?:-container)?[^"]*"/i, /select2-css/i],
      dom: ['.select2', '.select2-container'],
      js: [{ property: 'jQuery.fn.select2' }],
      implies: ['jquery']
    }
  },
  {
    id: 'jquery-ui',
    name: 'jQuery UI',
    category: 'JavaScript Libraries',
    website: 'https://jqueryui.com',
    icon: 'jquery-ui',
    description: 'Curated set of user interface interactions, effects, widgets, and themes built on top of jQuery.',
    detect: {
      scripts: [/jquery[.-]ui(?:\.min)?\.js(?:\?ver=([\d.]+))?/i, /jquery\/ui\/core(?:\.min)?\.js(?:\?ver=([\d.]+))?/i, /jquery\/ui\//i],
      styles: [/jquery[.-]ui(?:\.min)?\.css(?:\?ver=([\d.]+))?/i],
      html: [/id="jquery-ui-core-js/i, /jquery\/ui\//i],
      js: [{ property: 'jQuery.ui', versionProperty: 'jQuery.ui.version' }],
      implies: ['jquery']
    }
  },
  {
    id: 'jquery-migrate',
    name: 'jQuery Migrate',
    category: 'JavaScript Libraries',
    website: 'https://github.com/jquery/jquery-migrate',
    icon: 'jquery',
    description: 'Migrate older jQuery code to modern jQuery versions.',
    detect: {
      scripts: [/jquery-migrate(?:\.min)?\.js(?:\?ver=([\d.]+))?/i],
      html: [/id="jquery-migrate-js/i],
      js: [{ property: 'jQuery.migrateVersion', versionProperty: 'jQuery.migrateVersion' }],
      implies: ['jquery']
    }
  },
  {
    id: 'core-js',
    name: 'core-js',
    category: 'JavaScript Libraries',
    website: 'https://github.com/zloirock/core-js',
    icon: 'core-js',
    description: 'Modular standard library for JavaScript, including polyfills for ECMAScript up to 2024.',
    detect: {
      scripts: [/core-js(?:\.min)?\.js(?:\?ver=([\d.]+))?/i, /core-js-bundle/i],
      html: [/__core-js_shared__/i],
      js: [{ property: '__core-js_shared__' }]
    }
  },
  {
    id: 'momentjs',
    name: 'Moment.js',
    category: 'JavaScript Libraries',
    website: 'https://momentjs.com',
    icon: 'momentjs',
    description: 'JavaScript date library for parsing, validating, manipulating, and formatting dates.',
    detect: {
      scripts: [/moment(?:\.min)?\.js(?:\?ver=([\d.]+))?/i],
      html: [/id="moment-js/i],
      js: [{ property: 'moment', versionProperty: 'moment.version' }]
    }
  },
  {
    id: 'lodash',
    name: 'Lodash',
    category: 'JavaScript Libraries',
    website: 'https://lodash.com',
    icon: 'lodash',
    description: 'Modern JavaScript utility library delivering modularity, performance & extras.',
    detect: {
      scripts: [/lodash(?:\.min)?\.js(?:\?ver=([\d.]+))?/i],
      html: [/id="lodash-js/i],
      js: [{ property: 'lodash', versionProperty: 'lodash.VERSION' }, { property: '_', versionProperty: '_.VERSION' }]
    }
  },

  // ==========================================
  // WORDPRESS THEMES & PLUGINS
  // ==========================================
  {
    id: 'hello-elementor',
    name: 'Hello Elementor',
    category: 'WordPress Themes',
    website: 'https://elementor.com/hello-theme/',
    icon: 'hello-elementor',
    description: 'Plain, lightweight and blank WordPress theme designed specifically for Elementor.',
    detect: {
      styles: [/themes\/hello-elementor\/.*\.css(?:\?ver=([\d.]+))?/i],
      scripts: [/themes\/hello-elementor\/.*\.js(?:\?ver=([\d.]+))?/i],
      html: [/themes\/hello-elementor/i],
      implies: ['elementor', 'wordpress']
    }
  },
  {
    id: 'crocoblock-jetelements',
    name: 'Crocoblock JetElements',
    category: 'WordPress Plugins',
    website: 'https://crocoblock.com/plugins/jetelements/',
    icon: 'crocoblock-jetelements',
    description: 'Innovative addon for Elementor with dozens of modules and styling options.',
    detect: {
      scripts: [/plugins\/jet-elements\/.*\.js(?:\?ver=([\d.]+))?/i, /plugins\/jet-elements\//i],
      styles: [/plugins\/jet-elements\/.*\.css(?:\?ver=([\d.]+))?/i],
      html: [/plugins\/jet-elements/i, /jet-elements/i],
      implies: ['elementor', 'wordpress']
    }
  },
  {
    id: 'jetpack',
    name: 'Jetpack',
    category: 'WordPress Plugins',
    website: 'https://jetpack.com',
    icon: 'jetpack',
    description: 'Security, performance, marketing, and design tools for WordPress by Automattic.',
    detect: {
      scripts: [/plugins\/jetpack\//i, /stats\.wp\.com\/e-.*\.js/i, /jetpack-stats\.js/i],
      html: [/plugins\/jetpack/i, /jetpack-stats/i, /stats\.wp\.com/i],
      implies: ['wordpress']
    }
  },
  {
    id: 'google-for-woocommerce',
    name: 'Google for WooCommerce',
    category: 'WordPress Plugins',
    website: 'https://woocommerce.com/products/google-listings-and-ads/',
    icon: 'google-for-woocommerce',
    description: 'Sync store with Google Merchant Center and run Google Ads directly from WooCommerce.',
    detect: {
      scripts: [/plugins\/google-listings-and-ads\/.*\.js(?:\?ver=([a-z0-9.]+))?/i, /gla-gtag-events/i],
      html: [/plugins\/google-listings-and-ads/i, /gla-gtag-events/i],
      implies: ['woocommerce', 'wordpress']
    }
  },
  {
    id: 'site-kit',
    name: 'Site Kit by Google',
    category: 'Analytics',
    website: 'https://sitekit.withgoogle.com',
    icon: 'site-kit',
    description: 'The official WordPress plugin from Google for insights about how people find and use your site.',
    detect: {
      meta: [{ name: 'generator', contentRegex: /Site Kit by Google\s*([\d.]+)?/i, versionGroup: 1 }],
      scripts: [/plugins\/google-site-kit\//i, /googlesitekit-[a-z0-9-]+\.js/i],
      html: [/googlesitekit-/i, /_googlesitekitConsentCategoryMap/i, /Site Kit by Google/i],
      js: [{ property: '_googlesitekit' }, { property: '_googlesitekitConsentCategoryMap' }],
      implies: ['wordpress']
    }
  },

  // ==========================================
  // SEARCH, LIVE CHAT & MARKETING
  // ==========================================
  {
    id: 'doofinder',
    name: 'Doofinder',
    category: 'Search Engines',
    website: 'https://www.doofinder.com',
    icon: 'doofinder',
    description: 'Smart search engine and site search technology for e-commerce websites.',
    detect: {
      scripts: [/doofinder(?:\.min)?\.js/i, /config\.doofinder\.com/i, /cdn\.doofinder\.com/i],
      html: [/df_cart/i, /doofinder\.com/i],
      js: [{ property: 'doofinder' }, { property: 'df_cart' }]
    }
  },
  {
    id: 'mailerlite',
    name: 'MailerLite',
    category: 'Marketing & CRM',
    website: 'https://www.mailerlite.com',
    icon: 'mailerlite',
    description: 'Email marketing and marketing automation tool for growing businesses.',
    detect: {
      scripts: [/mailerlite(?:\.min)?\.js/i, /classic-universal\.js/i, /plugins\/(?:woo-)?mailerlite/i],
      html: [/mailerliteData/i, /mailerlite-classic-universal/i],
      js: [{ property: 'mailerliteData' }, { property: 'ml' }]
    }
  },
  {
    id: 'tawkto',
    name: 'Tawk.to',
    category: 'Live Chat',
    website: 'https://www.tawk.to',
    icon: 'tawkto',
    description: 'Free live chat application that lets you monitor and chat with visitors on your website.',
    detect: {
      scripts: [/embed\.tawk\.to/i, /tawk\.to/i],
      html: [/Tawk\.to Script/i, /tawk-script/i, /Tawk_API/i],
      js: [{ property: 'Tawk_API' }]
    }
  },
  {
    id: 'google-ads',
    name: 'Google Ads',
    category: 'Advertising',
    website: 'https://ads.google.com',
    icon: 'google-ads',
    description: 'Online advertising platform developed by Google.',
    detect: {
      scripts: [/googleadservices\.com\/pagead\/conversion/i, /pagead\/js\/adsbygoogle\.js/i, /googletagmanager\.com\/gtag\/js\?id=AW-/i],
      html: [/AW-\d{5,}/i, /adsbygoogle/i, /google_conversion_id/i, /gtag\s*\(\s*["']config["']\s*,\s*["']AW-/i],
      js: [{ property: 'adsbygoogle' }]
    }
  },

  // ==========================================
  // FONTS & CDNS
  // ==========================================
  {
    id: 'twemoji',
    name: 'Twitter Emoji (Twemoji)',
    category: 'Font Scripts',
    website: 'https://github.com/twitter/twemoji',
    icon: 'twemoji',
    description: 'Open source emoji set by Twitter designed for all web and mobile platforms.',
    detect: {
      scripts: [/twemoji(?:\.min)?\.js/i, /s\.w\.org\/images\/core\/emoji/i],
      html: [/_wpemojiSettings/i, /twemoji/i, /wp-emoji-settings/i],
      js: [{ property: 'twemoji' }, { property: '_wpemojiSettings' }]
    }
  },
  {
    id: 'unpkg',
    name: 'Unpkg',
    category: 'CDN & Hosting',
    website: 'https://unpkg.com',
    icon: 'unpkg',
    description: 'Fast, global content delivery network for everything on npm.',
    detect: {
      scripts: [/unpkg\.com/i],
      html: [/unpkg\.com/i]
    }
  },
  {
    id: 'jsdelivr',
    name: 'jsDelivr',
    category: 'CDN & Hosting',
    website: 'https://www.jsdelivr.com',
    icon: 'jsdelivr',
    description: 'Free, fast, and reliable Open Source CDN for npm and GitHub.',
    detect: {
      scripts: [/cdn\.jsdelivr\.net/i],
      html: [/cdn\.jsdelivr\.net/i]
    }
  },
  {
    id: 'cdnjs',
    name: 'cdnjs',
    category: 'CDN & Hosting',
    website: 'https://cdnjs.com',
    icon: 'cdnjs',
    description: 'Free and open-source CDN service trusted by over 12% of websites.',
    detect: {
      scripts: [/cdnjs\.cloudflare\.com/i],
      html: [/cdnjs\.cloudflare\.com/i]
    }
  },

  // ==========================================
  // PERFORMANCE & MISCELLANEOUS
  // ==========================================
  {
    id: 'priority-hints',
    name: 'Priority Hints',
    category: 'SEO & Performance',
    website: 'https://web.dev/articles/priority-hints',
    icon: 'priority-hints',
    description: 'HTML fetchpriority attribute that hints to the browser how to prioritize resource loading.',
    detect: {
      html: [/fetchpriority=["'](?:high|low|auto)["']/i],
      dom: ['[fetchpriority]']
    }
  },
  {
    id: 'rss',
    name: 'RSS',
    category: 'Miscellaneous',
    website: 'https://www.rssboard.org/rss-specification',
    icon: 'rss',
    description: 'Web feed specification that allows users and applications to access updates to websites in a standardized format.',
    detect: {
      html: [/<link[^>]+type=["']application\/rss\+xml["']/i, /type=["']application\/rss\+xml["']/i],
      dom: ['link[type="application/rss+xml"]']
    }
  }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { TECHNOLOGIES };
}
