import fs from 'node:fs'
import path from 'node:path'

const MIME_TYPES: Record<string, string> = {
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
}

export default defineEventHandler((event) => {
  const filePath = getRouterParam(event, 'path') ?? ''
  const contentDir = process.env.CONTENT_DIR ?? path.join(process.cwd(), 'content')

  const base = path.resolve(contentDir)
  const resolved = path.resolve(base, filePath)

  // Prevent path traversal
  if (!resolved.startsWith(base + path.sep)) {
    throw createError({ statusCode: 403, message: 'Forbidden' })
  }

  const ext = path.extname(resolved).toLowerCase()
  if (!MIME_TYPES[ext]) {
    throw createError({ statusCode: 403, message: 'File type not allowed' })
  }

  if (!fs.existsSync(resolved)) {
    throw createError({ statusCode: 404, message: 'File not found' })
  }

  setHeader(event, 'Content-Type', MIME_TYPES[ext])
  setHeader(event, 'Cache-Control', 'public, max-age=86400')
  return fs.createReadStream(resolved)
})
