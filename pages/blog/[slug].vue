<template>
  <article v-if="post">
    <header class="mb-12">
      <h1 class="text-3xl font-extrabold tracking-tighter text-zinc-900 dark:text-zinc-50 mb-4">{{ post.title }}</h1>
      <div class="flex flex-wrap items-center gap-2.5 text-xs text-zinc-400 dark:text-zinc-500">
        <time>{{ formatDate(post.date) }}</time>
        <span>&middot;</span>
        <span>{{ post.readingTime }} min read</span>
        <div class="flex flex-wrap gap-1.5">
          <NuxtLink
            v-for="tag in post.tags"
            :key="tag"
            :to="`/tags/${tag}`"
            class="rounded-full bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 text-zinc-500 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-150"
          >{{ tag }}</NuxtLink>
        </div>
      </div>
      <div class="mt-6 h-px bg-zinc-100 dark:bg-zinc-800"></div>
    </header>
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
