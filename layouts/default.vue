<template>
  <div class="min-h-screen flex flex-col bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 transition-colors">
    <header class="border-b border-zinc-200 dark:border-zinc-800 print:hidden">
      <nav class="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
        <NuxtLink to="/" class="font-semibold text-lg tracking-tight">{{ site.name }}</NuxtLink>
        <div class="flex items-center gap-6 text-sm">
          <NuxtLink to="/" class="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Blog</NuxtLink>
          <NuxtLink to="/about" class="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">About</NuxtLink>
          <NuxtLink to="/resume" class="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Resume</NuxtLink>
          <NuxtLink to="/projects" class="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Projects</NuxtLink>
          <a href="/rss.xml" class="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">RSS</a>
          <button
            @click="toggleTheme"
            class="p-1.5 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
          >
            <svg v-if="isDark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-4 h-4">
              <path d="M10 2a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 0110 2zM10 15a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 0110 15zM10 7a3 3 0 100 6 3 3 0 000-6zM15.657 5.404a.75.75 0 10-1.06-1.06l-1.061 1.06a.75.75 0 001.06 1.06l1.06-1.06zM6.464 14.596a.75.75 0 10-1.06-1.06l-1.06 1.06a.75.75 0 001.06 1.06l1.06-1.06zM18 10a.75.75 0 01-.75.75h-1.5a.75.75 0 010-1.5h1.5A.75.75 0 0118 10zM5 10a.75.75 0 01-.75.75h-1.5a.75.75 0 010-1.5h1.5A.75.75 0 015 10zM14.596 15.657a.75.75 0 001.06-1.06l-1.06-1.061a.75.75 0 10-1.06 1.06l1.06 1.06zM5.404 6.464a.75.75 0 001.06-1.06l-1.06-1.06a.75.75 0 10-1.06 1.06l1.06 1.06z" />
            </svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-4 h-4">
              <path fill-rule="evenodd" d="M7.455 2.004a.75.75 0 01.26.77 7 7 0 009.958 7.967.75.75 0 011.067.853A8.5 8.5 0 116.647 1.921a.75.75 0 01.808.083z" clip-rule="evenodd" />
            </svg>
          </button>
        </div>
      </nav>
    </header>

    <main class="flex-1 max-w-3xl mx-auto px-4 py-10 w-full print:py-0 print:px-0 print:max-w-none">
      <slot />
    </main>

    <footer class="border-t border-zinc-200 dark:border-zinc-800 print:hidden">
      <div class="max-w-3xl mx-auto px-4 py-4 text-sm text-zinc-400 dark:text-zinc-500 flex items-center justify-between">
        <span>&copy; {{ new Date().getFullYear() }} {{ site.name }}</span>
        <div class="flex items-center gap-4">
          <a v-if="site.github" :href="`https://github.com/${site.github}`" target="_blank" rel="noopener" aria-label="GitHub" class="hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5">
              <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
            </svg>
          </a>
          <a v-if="site.linkedin" :href="`https://www.linkedin.com/in/${site.linkedin}/`" target="_blank" rel="noopener" aria-label="LinkedIn" class="hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
const site = useSiteConfig()
const { isDark, toggleTheme } = useTheme()

useHead({
  titleTemplate: (title) => title ? `${title} – ${site.name}` : site.name,
  meta: [
    { name: 'description', content: site.description },
    { property: 'og:site_name', content: site.name },
    { property: 'og:type', content: 'website' },
  ],
})
</script>
