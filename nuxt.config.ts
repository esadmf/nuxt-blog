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
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      ],
      script: [
        {
          innerHTML: `(function(){try{var t=localStorage.getItem('theme');if(t==='light')return;document.documentElement.classList.add('dark')}catch(e){}})()`,
          type: 'text/javascript',
          tagPosition: 'head',
        },
      ],
    },
  },
})
