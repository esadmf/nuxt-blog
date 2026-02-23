# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm install       # install dependencies
npm run dev       # dev server at http://localhost:3000
npm run build     # production build (outputs to .output/)
npm run preview   # preview production build locally

# Docker
docker compose up --build -d   # build image and start container
docker compose down             # stop container
docker compose logs -f blog     # tail logs
```

## Site Configuration

All personal values (name, URL, description, social links) live in a single `site` object inside `runtimeConfig.public` in `nuxt.config.ts`. This is the only file you need to edit to personalize the site.

- **Client-side**: access via `useSiteConfig()` composable (wraps `useRuntimeConfig().public.site`)
- **Server-side**: access via `useRuntimeConfig(event).public.site`

## Architecture

This is a **Nuxt 3 SSR blog** that deliberately does **not** use Nuxt Content. Content is read from the filesystem at request time using custom server utilities, so new posts and resume updates take effect immediately without rebuilding the container.

### Content layer

`server/utils/content.ts` is the core of the content system. It exports four functions used by all API routes:
- `getAllPosts()` — reads all `.md` files from `content/blog/`, parses frontmatter with `gray-matter`, returns sorted `PostMeta[]`
- `getPost(slug)` — returns a single post with HTML content rendered by `marked` + `highlight.js`
- `getAbout()` — parses `content/about.md` and returns rendered HTML
- `getResume()` — parses `content/resume.json` and returns the object

The content directory is controlled by the `CONTENT_DIR` env var (default: `process.cwd()/content`). In Docker, this is set to `/app/content` and mounted as a volume.

### API routes → Pages

| API route | Page |
|---|---|
| `GET /api/posts` | `pages/index.vue` |
| `GET /api/posts/:slug` | `pages/blog/[slug].vue` |
| `GET /api/tags/:tag` | `pages/tags/[tag].vue` |
| `GET /api/about` | `pages/about.vue` |
| `GET /api/resume` | `pages/resume.vue` |
| `GET /rss.xml` | `server/routes/rss.xml.ts` |

### Resume format

`content/resume.json` follows the [JSON Resume standard](https://jsonresume.org/schema/). Relevant top-level keys: `basics`, `work`, `education`, `certificates`, `skills`. The `work[].summary` fields are plain text. Edit this file directly to update the resume — no rebuild needed.

The resume page has a "Save as PDF" button that calls `window.print()`. Print-specific styles (in `assets/css/main.css` and inline `print:` Tailwind classes) hide the nav/footer and optimize the layout for paper.

### Adding a blog post

Create `content/blog/your-post-slug.md` with this frontmatter:

```markdown
---
title: Your Post Title
date: YYYY-MM-DD
description: One sentence description shown in listings and meta tags.
tags: [tag1, tag2]
---

Post content here...
```

Drop the file into the mounted volume on the server. It is live immediately.

### Docker / Proxmox deployment

The Dockerfile uses a two-stage build. The runtime image runs `node output/server/index.mjs`. Default content is baked into the image at `/app/content`; the volume mount at `/app/content` overrides it in production.

To update content on the Proxmox host without rebuilding:
```bash
scp my-new-post.md user@proxmox-host:/opt/blog/content/blog/
```

To rebuild the app (required only when changing Vue/TypeScript code):
```bash
docker compose up --build -d
```

### Styling

Tailwind CSS with `@tailwindcss/typography`. Blog post and about page content uses the `prose prose-zinc` classes for rendered markdown. Syntax highlighting uses `highlight.js` with the `github` theme (applied globally via `nuxt.config.ts` css array).

## TODO (future)

- Full-text search (planned for v2.0)
