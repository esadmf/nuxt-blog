<template>
  <article v-if="post">
    <div class="mb-8">
      <h1 class="text-3xl font-bold mb-2">{{ post.title }}</h1>
      <div class="flex flex-wrap items-center gap-3 text-sm text-zinc-500 dark:text-zinc-400">
        <time>{{ formatDate(post.date) }}</time>
        <div class="flex gap-2">
          <NuxtLink
            v-for="tag in post.tags"
            :key="tag"
            :to="`/tags/${tag}`"
            class="text-blue-600 dark:text-blue-400 hover:underline"
          >#{{ tag }}</NuxtLink>
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
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}
</script>
