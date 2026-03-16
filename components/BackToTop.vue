<template>
  <transition name="fade">
    <button
      v-if="show"
      @click="scrollToTop"
      class="fixed bottom-6 right-6 p-2.5 rounded-full bg-zinc-200 dark:bg-zinc-700 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-300 dark:hover:bg-zinc-600 shadow-md transition-colors print:hidden"
      aria-label="Back to top"
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
        <path fill-rule="evenodd" d="M9.47 6.47a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 1 1-1.06 1.06L10 8.06l-3.72 3.72a.75.75 0 0 1-1.06-1.06l4.25-4.25Z" clip-rule="evenodd" />
      </svg>
    </button>
  </transition>
</template>

<script setup lang="ts">
const show = ref(false)

function onScroll() {
  show.value = window.scrollY > 400
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => window.addEventListener('scroll', onScroll, { passive: true }))
onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>
