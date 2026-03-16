<template>
  <article class="group -mx-4 rounded-lg px-4 py-5 transition-[background-color,transform] duration-150 ease-[cubic-bezier(.2,.8,.2,1)] hover:bg-zinc-50 dark:hover:bg-zinc-800/60 hover:-translate-y-px">
    <NuxtLink :to="`/blog/${post.slug}`" class="block">
      <h2 class="text-lg font-semibold text-zinc-900 dark:text-zinc-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-150">{{ post.title }}</h2>
      <p v-if="post.description" class="mt-1.5 text-[13px] text-zinc-500 dark:text-zinc-400 leading-relaxed">{{ post.description }}</p>
    </NuxtLink>
    <div class="flex flex-wrap items-center gap-2.5 mt-2.5 text-xs text-zinc-400 dark:text-zinc-500">
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
