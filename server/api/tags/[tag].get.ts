export default defineEventHandler((event) => {
  const tag = getRouterParam(event, 'tag')!
  return getAllPosts().filter((p) => p.tags.includes(tag))
})
