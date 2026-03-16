<template>
  <div>
    <div class="mb-12">
      <h1 class="text-4xl font-bold tracking-tight mb-2">{{ site.name }}</h1>
      <p class="text-lg text-zinc-600 dark:text-zinc-400">{{ site.description }}</p>
    </div>
    <div v-if="posts?.length">
      <div v-for="[year, yearPosts] in postsByYear" :key="year" class="mb-10">
        <h2 class="text-sm font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider mb-4">{{ year }}</h2>
        <div class="space-y-5">
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
