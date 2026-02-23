export default defineEventHandler((event) => {
  const slug = getRouterParam(event, 'slug')!
  const post = getPost(slug)
  if (!post) throw createError({ statusCode: 404, message: 'Post not found' })
  return post
})
