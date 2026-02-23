<template>
  <div v-if="resume">
    <!-- Header -->
    <div class="mb-8 pb-6 border-b border-zinc-200 dark:border-zinc-700 print:pb-4 print:mb-4">
      <div class="flex items-start gap-6">
        <img
          v-if="resume.basics?.image"
          :src="resume.basics.image"
          :alt="resume.basics.name"
          class="w-20 h-20 rounded-full flex-shrink-0 print:w-16 print:h-16"
        />
        <div class="flex-1">
          <div class="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h1 class="text-3xl font-bold print:text-2xl">{{ resume.basics?.name }}</h1>
              <p class="text-amber-600 dark:text-amber-400 font-medium mt-1 print:text-zinc-600">{{ resume.basics?.label }}</p>
            </div>
            <button
              @click="printResume"
              class="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg
                     bg-amber-400/10 text-amber-700 dark:text-amber-400
                     hover:bg-amber-400/20 transition-colors print:hidden"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clip-rule="evenodd" />
              </svg>
              Save as PDF
            </button>
          </div>
          <p v-if="resume.basics?.summary" class="mt-3 text-zinc-700 dark:text-zinc-300 leading-relaxed max-w-3xl print:text-sm print:text-zinc-700">
            {{ resume.basics.summary }}
          </p>
          <div class="flex flex-wrap gap-x-4 gap-y-1 text-sm text-zinc-500 dark:text-zinc-400 mt-3 print:text-zinc-600">
            <a v-if="resume.basics?.email" :href="`mailto:${resume.basics.email}`" class="hover:text-amber-600 dark:hover:text-amber-400">{{ resume.basics.email }}</a>
            <a v-if="resume.basics?.url" :href="resume.basics.url" target="_blank" rel="noopener" class="hover:text-amber-600 dark:hover:text-amber-400">{{ resume.basics.url }}</a>
            <a v-if="site.github" :href="`https://github.com/${site.github}`" target="_blank" rel="noopener" class="inline-flex items-center gap-1 hover:text-amber-600 dark:hover:text-amber-400">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-4 h-4">
                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
              GitHub
            </a>
            <a v-if="site.linkedin" :href="`https://www.linkedin.com/in/${site.linkedin}/`" target="_blank" rel="noopener" class="inline-flex items-center gap-1 hover:text-amber-600 dark:hover:text-amber-400">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-4 h-4">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </div>

    <!-- Two-column grid -->
    <div class="grid grid-cols-1 md:grid-cols-5 gap-8 print:grid-cols-5 print:gap-4">
      <!-- Left column: Experience -->
      <div class="md:col-span-3 space-y-8 print:col-span-3 print:space-y-4">
        <!-- Experience -->
        <section v-if="resume.work?.length">
          <h2 class="text-lg font-bold text-amber-600 dark:text-amber-400 border-l-2 border-amber-400 pl-3 mb-4 print:text-zinc-800 print:border-zinc-400 print:mb-2">Experience</h2>
          <div class="space-y-6 print:space-y-3">
            <div v-for="job in resume.work" :key="`${job.name}-${job.startDate}`">
              <div class="flex justify-between items-start gap-4">
                <div>
                  <h3 class="font-semibold text-zinc-900 dark:text-zinc-100">{{ job.position }}</h3>
                  <p class="text-zinc-500 dark:text-zinc-400 text-sm">
                    {{ job.name }}<span v-if="job.location"> &middot; {{ job.location }}</span>
                  </p>
                </div>
                <span class="text-sm text-zinc-400 dark:text-zinc-500 whitespace-nowrap">
                  {{ formatDateRange(job.startDate, job.endDate) }}
                </span>
              </div>
              <p v-if="job.summary" class="mt-2 text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed print:text-xs print:mt-1">{{ job.summary }}</p>
            </div>
          </div>
        </section>
      </div>

      <!-- Right column: Skills + Certifications + Education -->
      <div class="md:col-span-2 space-y-8 print:col-span-2 print:space-y-4">
        <!-- Skills -->
        <section v-if="resume.skills?.length">
          <h2 class="text-lg font-bold text-amber-600 dark:text-amber-400 border-l-2 border-amber-400 pl-3 mb-4 print:text-zinc-800 print:border-zinc-400 print:mb-2">Skills</h2>
          <div class="space-y-4 print:space-y-2">
            <div v-for="skill in resume.skills" :key="skill.name">
              <h3 class="font-medium text-sm text-zinc-900 dark:text-zinc-100 mb-1">{{ skill.name }}</h3>
              <div class="flex flex-wrap gap-1.5 print:gap-1">
                <span
                  v-for="kw in skill.keywords"
                  :key="kw"
                  class="text-xs px-2 py-0.5 rounded-full
                         bg-amber-400/10 text-amber-700 dark:text-amber-400
                         print:bg-zinc-100 print:text-zinc-700"
                >{{ kw }}</span>
              </div>
            </div>
          </div>
        </section>

        <!-- Certifications -->
        <section v-if="resume.certificates?.length">
          <h2 class="text-lg font-bold text-amber-600 dark:text-amber-400 border-l-2 border-amber-400 pl-3 mb-4 print:text-zinc-800 print:border-zinc-400 print:mb-2">Certifications</h2>
          <div class="space-y-3 print:space-y-1">
            <div v-for="cert in resume.certificates" :key="cert.name">
              <p class="font-medium text-sm text-zinc-900 dark:text-zinc-100">{{ cert.name }}</p>
              <p class="text-xs text-zinc-500 dark:text-zinc-400">
                {{ cert.issuer }}<span v-if="cert.date"> &middot; {{ formatMonthYear(cert.date) }}</span>
              </p>
            </div>
          </div>
        </section>

        <!-- Education -->
        <section v-if="resume.education?.length">
          <h2 class="text-lg font-bold text-amber-600 dark:text-amber-400 border-l-2 border-amber-400 pl-3 mb-4 print:text-zinc-800 print:border-zinc-400 print:mb-2">Education</h2>
          <div class="space-y-3 print:space-y-1">
            <div v-for="edu in resume.education" :key="`${edu.institution}-${edu.area}`">
              <h3 class="font-semibold text-zinc-900 dark:text-zinc-100">{{ edu.studyType }}, {{ edu.area }}</h3>
              <p class="text-zinc-500 dark:text-zinc-400 text-sm">
                {{ edu.institution }}<span v-if="edu.endDate"> &middot; {{ formatMonthYear(edu.endDate) }}</span>
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const site = useSiteConfig()
const { data: resume } = await useFetch('/api/resume')
useHead({
  title: 'Resume',
  meta: [
    { property: 'og:title', content: `Resume – ${site.name}` },
    { property: 'og:description', content: `Resume of ${site.name}.` },
    { property: 'og:url', content: `${site.url}/resume` },
  ],
})

function printResume() {
  window.print()
}

function formatMonthYear(dateStr?: string): string {
  if (!dateStr) return ''
  const [year, month] = dateStr.split('-')
  if (!month) return year
  const date = new Date(Number(year), Number(month) - 1)
  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
}

function formatDateRange(start: string, end?: string): string {
  return `${formatMonthYear(start)} – ${end ? formatMonthYear(end) : 'Present'}`
}
</script>
