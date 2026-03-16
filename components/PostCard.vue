<template>
  <article class="group rounded-xl border border-zinc-150 dark:border-zinc-800 bg-white dark:bg-zinc-800/50 p-6 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:shadow-zinc-200/50 dark:hover:shadow-zinc-900/50 hover:border-zinc-300 dark:hover:border-zinc-700">
    <NuxtLink :to="`/blog/${post.slug}`">
      <h2 class="text-xl font-semibold group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{{ post.title }}</h2>
    </NuxtLink>
    <div class="flex flex-wrap items-center gap-3 text-sm text-zinc-500 dark:text-zinc-400 mt-2 mb-3">
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
    <p v-if="post.description" class="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">{{ post.description }}</p>
  </article>
</template>

<script setup lang="ts">
defineProps<{
  post: {
    slug: string
    title: string
    date: string
    description: string
    tags: string[]
    readingTime: number
  }
}>()

function formatDate(date: string): string {
  return new Date(date + 'T00:00:00').toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}
</script>
