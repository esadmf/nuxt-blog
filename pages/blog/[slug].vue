<template>
  <article v-if="post">
    <div class="mb-8">
      <h1 class="text-3xl font-bold mb-2">{{ post.title }}</h1>
      <div class="flex flex-wrap items-center gap-3 text-sm text-zinc-500 dark:text-zinc-400">
        <time>{{ formatDate(post.date) }}</time>
        <span class="text-zinc-300 dark:text-zinc-600">&middot;</span>
        <span>{{ post.readingTime }} min read</span>
        <div class="flex flex-wrap gap-2">
          <NuxtLink
            v-for="tag in post.tags"
            :key="tag"
            :to="`/tags/${tag}`"
            class="inline-flex items-center rounded-full bg-zinc-100 dark:bg-zinc-700/50 px-2.5 py-0.5 text-xs font-medium text-zinc-600 dark:text-zinc-300 hover:bg-blue-100 dark:hover:bg-blue-900/30 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
          >{{ tag }}</NuxtLink>
        </div>
      </div>
    </div>
    <div class="prose prose-zinc dark:prose-invert max-w-none" v-html="post.content" />
  </article>
</template>

<script setup lang="ts">
const site = useSiteConfig()
const route = useRoute()
const slug = route.params.slug as string

const { data: post, error } = await useFetch(`/api/posts/${slug}`)
if (error.value) throw createError({ statusCode: 404, message: 'Post not found' })

useHead({
  title: post.value?.title,
  meta: [
    { name: 'description', content: post.value?.description },
    { property: 'og:title', content: `${post.value?.title} – ${site.name}` },
    { property: 'og:description', content: post.value?.description },
    { property: 'og:url', content: `${site.url}/blog/${slug}` },
    { property: 'og:type', content: 'article' },
  ],
})

function formatDate(date: string): string {
  return new Date(date + 'T00:00:00').toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}
</script>
