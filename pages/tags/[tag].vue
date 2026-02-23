<template>
  <div>
    <h1 class="text-2xl font-bold mb-1">
      Posts tagged <span class="text-blue-600 dark:text-blue-400">#{{ route.params.tag }}</span>
    </h1>
    <NuxtLink to="/" class="text-sm text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-300 mb-8 inline-block">&larr; All posts</NuxtLink>
    <div v-if="posts?.length" class="space-y-8 mt-6">
      <PostCard v-for="post in posts" :key="post.slug" :post="post" />
    </div>
    <p v-else class="text-zinc-500 dark:text-zinc-400 mt-6">No posts with this tag.</p>
  </div>
</template>

<script setup lang="ts">
const site = useSiteConfig()
const route = useRoute()
const { data: posts } = await useFetch(`/api/tags/${route.params.tag}`)
useHead({
  title: `#${route.params.tag}`,
  meta: [
    { property: 'og:title', content: `Posts tagged #${route.params.tag} – ${site.name}` },
    { property: 'og:description', content: `Blog posts tagged with #${route.params.tag}.` },
    { property: 'og:url', content: `${site.url}/tags/${route.params.tag}` },
  ],
})
</script>
