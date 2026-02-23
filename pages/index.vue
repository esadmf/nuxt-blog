<template>
  <div>
    <h1 class="text-2xl font-bold mb-8">Blog</h1>
    <div v-if="posts?.length" class="space-y-8">
      <PostCard v-for="post in posts" :key="post.slug" :post="post" />
    </div>
    <p v-else class="text-zinc-500 dark:text-zinc-400">No posts yet.</p>
  </div>
</template>

<script setup lang="ts">
const site = useSiteConfig()
const { data: posts } = await useFetch('/api/posts')
useHead({
  title: 'Blog',
  meta: [
    { property: 'og:title', content: `Blog – ${site.name}` },
    { property: 'og:description', content: site.description },
    { property: 'og:url', content: site.url },
  ],
})
</script>
