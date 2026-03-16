<template>
  <div>
    <div class="mb-16 pt-2">
      <h1 class="text-4xl font-extrabold tracking-tighter text-zinc-900 dark:text-zinc-50">{{ site.name }}</h1>
      <p class="mt-2 text-zinc-500 dark:text-zinc-400 max-w-lg">{{ site.description }}</p>
    </div>
    <div v-if="posts?.length">
      <div v-for="[year, yearPosts] in postsByYear" :key="year" class="mb-16">
        <h2 class="text-xs font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest mb-5">{{ year }}</h2>
        <div class="space-y-3">
          <PostCard v-for="post in yearPosts" :key="post.slug" :post="post" />
        </div>
      </div>
    </div>
    <p v-else class="text-zinc-500 dark:text-zinc-400">No posts yet.</p>
  </div>
</template>

<script setup lang="ts">
const site = useSiteConfig()
const { data: posts } = await useFetch('/api/posts')

const postsByYear = computed(() => {
  if (!posts.value) return []
  const grouped = new Map<string, typeof posts.value>()
  for (const post of posts.value) {
    const year = post.date.slice(0, 4)
    if (!grouped.has(year)) grouped.set(year, [])
    grouped.get(year)!.push(post)
  }
  return [...grouped.entries()]
})

useHead({
  title: 'Blog',
  meta: [
    { property: 'og:title', content: `Blog – ${site.name}` },
    { property: 'og:description', content: site.description },
    { property: 'og:url', content: site.url },
  ],
})
</script>
