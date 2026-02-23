export default defineEventHandler((event) => {
  const { site } = useRuntimeConfig(event).public
  return getProjects(site.github)
})
