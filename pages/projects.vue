<template>
  <div>
    <h1 class="text-3xl font-extrabold tracking-tighter text-zinc-900 dark:text-zinc-50 mb-8">Projects</h1>
    <div v-if="projects?.length" class="grid gap-4 sm:grid-cols-2">
      <a
        v-for="project in projects"
        :key="project.name"
        :href="project.url"
        target="_blank"
        rel="noopener"
        class="block rounded-lg border border-zinc-100 dark:border-zinc-800 p-5
               hover:bg-zinc-50 dark:hover:bg-zinc-800/60 hover:border-zinc-200 dark:hover:border-zinc-700 transition-[background-color,border-color,transform] duration-150 ease-[cubic-bezier(.2,.8,.2,1)] hover:-translate-y-px"
      >
        <h2 class="font-semibold text-zinc-900 dark:text-zinc-100">{{ project.name }}</h2>
        <p v-if="project.description" class="mt-1 text-sm text-zinc-600 dark:text-zinc-400 line-clamp-2">
          {{ project.description }}
        </p>
        <div class="mt-3 flex items-center gap-3 text-xs text-zinc-500 dark:text-zinc-400">
          <span v-if="project.language" class="inline-flex items-center px-2 py-0.5 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400">
            {{ project.language }}
          </span>
          <span v-if="project.stargazerCount" class="flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-3.5 h-3.5">
              <path fill-rule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clip-rule="evenodd" />
            </svg>
            {{ project.stargazerCount }}
          </span>
          <span>Updated {{ timeAgo(project.updatedAt) }}</span>
        </div>
      </a>
    </div>
    <p v-else class="text-zinc-500 dark:text-zinc-400">No projects to show.</p>
  </div>
</template>

<script setup lang="ts">
const site = useSiteConfig()
const { data: projects } = await useFetch('/api/projects')

useHead({
  title: 'Projects',
  meta: [
    { property: 'og:title', content: `Projects – ${site.name}` },
    { property: 'og:description', content: `Open-source projects by ${site.name}.` },
    { property: 'og:url', content: `${site.url}/projects` },
  ],
})

function timeAgo(dateStr: string): string {
  const seconds = Math.floor((Date.now() - new Date(dateStr).getTime()) / 1000)
  const intervals: [number, string][] = [
    [31536000, 'year'],
    [2592000, 'month'],
    [86400, 'day'],
    [3600, 'hour'],
    [60, 'minute'],
  ]
  for (const [secs, label] of intervals) {
    const count = Math.floor(seconds / secs)
    if (count >= 1) return `${count} ${label}${count > 1 ? 's' : ''} ago`
  }
  return 'just now'
}
</script>
