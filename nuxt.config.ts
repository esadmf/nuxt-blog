import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      site: {
        name: 'Your Name',
        url: 'https://example.com',
        description: 'A personal blog built with Nuxt 3.',
        github: '',
        linkedin: '',
      },
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
  css: ['~/assets/css/main.css'],
  routeRules: {
    '/**': {
      headers: {
        'X-Frame-Options': 'DENY',
        'X-Content-Type-Options': 'nosniff',
        'Referrer-Policy': 'strict-origin-when-cross-origin',
        'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
        'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-inline' https://analytics.esadmf.com; connect-src 'self' https://analytics.esadmf.com; img-src 'self' data:; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; frame-ancestors 'none';",
      },
    },
  },
  app: {
    head: {
      link: [
        { rel: 'icon', type: 'image/png', href: '/favicon.png' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap' },
      ],
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      ],
      script: [
        {
          innerHTML: `(function(){try{var t=localStorage.getItem('theme');if(t==='light')return;document.documentElement.classList.add('dark')}catch(e){}})()`,
          type: 'text/javascript',
          tagPosition: 'head',
        },
        {
          src: 'https://analytics.esadmf.com/script.js',
          defer: true,
          'data-website-id': 'f8fe2ce0-0123-4bd8-a289-1193b51a8f0b',
        },
      ],
    },
  },
})
