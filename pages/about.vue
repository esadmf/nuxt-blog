<template>
  <article>
    <h1 class="text-3xl font-extrabold tracking-tighter text-zinc-900 dark:text-zinc-50 mb-8">About</h1>
    <div class="prose prose-zinc dark:prose-invert max-w-none" v-html="about?.content" />
  </article>
</template>

<script setup lang="ts">
const site = useSiteConfig()
const { data: about } = await useFetch('/api/about')
useHead({
  title: 'About',
  meta: [
    { property: 'og:title', content: `About – ${site.name}` },
    { property: 'og:description', content: `About ${site.name}.` },
    { property: 'og:url', content: `${site.url}/about` },
  ],
})
</script>
