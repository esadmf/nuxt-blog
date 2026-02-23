export default defineEventHandler(() => {
  const resume = getResume()
  if (!resume) throw createError({ statusCode: 404, message: 'Resume not found' })
  return resume
})
