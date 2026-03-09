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
  app: {
    head: {
      link: [
        { rel: 'icon', type: 'image/png', href: '/favicon.png' },
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
