import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import { marked } from 'marked'
import { markedHighlight } from 'marked-highlight'
import hljs from 'highlight.js'
import DOMPurify from 'isomorphic-dompurify'

marked.use(
  markedHighlight({
    langPrefix: 'hljs language-',
    highlight(code, lang) {
      const language = hljs.getLanguage(lang) ? lang : 'plaintext'
      return hljs.highlight(code, { language }).value
    },
  }),
)

function contentDir(): string {
  return process.env.CONTENT_DIR ?? path.join(process.cwd(), 'content')
}

export interface PostMeta {
  slug: string
  title: string
  date: string
  description: string
  tags: string[]
  readingTime: number
}

export interface Post extends PostMeta {
  content: string
}

export function getAllPosts(): PostMeta[] {
  const blogDir = path.join(contentDir(), 'blog')
  if (!fs.existsSync(blogDir)) return []

  return fs
    .readdirSync(blogDir)
    .filter((f) => f.endsWith('.md'))
    .map((file) => {
      const slug = file.replace(/\.md$/, '')
      const { data, content } = matter(fs.readFileSync(path.join(blogDir, file), 'utf-8'))
      const words = content.trim().split(/\s+/).length
      return {
        slug,
        title: data.title ?? slug,
        date: data.date instanceof Date ? data.date.toISOString().slice(0, 10) : String(data.date ?? ''),
        description: data.description ?? '',
        tags: Array.isArray(data.tags) ? data.tags : [],
        readingTime: Math.max(1, Math.ceil(words / 200)),
      }
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getPost(slug: string): Post | null {
  const base = path.resolve(contentDir(), 'blog')
  const file = path.resolve(base, `${slug}.md`)
  if (!file.startsWith(base + path.sep)) return null
  if (!fs.existsSync(file)) return null

  const { data, content } = matter(fs.readFileSync(file, 'utf-8'))
  const words = content.trim().split(/\s+/).length
  return {
    slug,
    title: data.title ?? slug,
    date: data.date instanceof Date ? data.date.toISOString().slice(0, 10) : String(data.date ?? ''),
    description: data.description ?? '',
    tags: Array.isArray(data.tags) ? data.tags : [],
    readingTime: Math.max(1, Math.ceil(words / 200)),
    content: DOMPurify.sanitize(marked.parse(content) as string),
  }
}

export function getAbout(): string {
  const file = path.join(contentDir(), 'about.md')
  if (!fs.existsSync(file)) return '<p>About page coming soon.</p>'
  const { content } = matter(fs.readFileSync(file, 'utf-8'))
  return DOMPurify.sanitize(marked.parse(content) as string)
}

export function getResume() {
  const file = path.join(contentDir(), 'resume.json')
  if (!fs.existsSync(file)) return null
  return JSON.parse(fs.readFileSync(file, 'utf-8'))
}
