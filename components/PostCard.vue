<template>
  <article class="border-b border-zinc-100 dark:border-zinc-800 pb-8">
    <NuxtLink :to="`/blog/${post.slug}`">
      <h2 class="text-xl font-semibold hover:text-blue-600 dark:hover:text-blue-400 transition-colors">{{ post.title }}</h2>
    </NuxtLink>
    <div class="flex flex-wrap items-center gap-3 text-sm text-zinc-500 dark:text-zinc-400 mt-1 mb-2">
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
    <p v-if="post.description" class="text-zinc-600 dark:text-zinc-400 text-sm">{{ post.description }}</p>
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
  }
}>()

function formatDate(date: string): string {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}
</script>
