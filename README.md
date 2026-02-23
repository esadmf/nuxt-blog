# nuxt-blog

A personal blog and resume site built with Nuxt 3. No CMS — content is read from the filesystem at request time, so you can add posts and update your resume without rebuilding.

## Features

- Blog with Markdown posts, tags, and RSS feed
- Resume page using the [JSON Resume](https://jsonresume.org/schema/) standard with browser-native PDF export
- Projects page pulled from your GitHub starred repos
- Dark mode with system preference detection
- Single config object to personalize the entire site
- Docker-ready with a two-stage build

## Quick Start

```bash
git clone https://github.com/esadmf/nuxt-blog.git
cd nuxt-blog
npm install
npm run dev
```

The dev server starts at `http://localhost:3000`.

## Configuration

All site identity is in one place — the `site` object in `nuxt.config.ts`:

```ts
runtimeConfig: {
  public: {
    site: {
      name: 'Your Name',
      url: 'https://example.com',
      description: 'A personal blog built with Nuxt 3.',
      github: '',       // GitHub username (powers projects page + footer icon)
      linkedin: '',     // LinkedIn slug (the /in/___/ part, powers footer icon)
    },
  },
},
```

Your name, URL, description, and social links propagate to the nav, footer, OG meta tags, and RSS feed automatically. Leave `github` or `linkedin` empty to hide those icons.

## Content

### Blog posts

Create a Markdown file in `content/blog/`:

```markdown
---
title: My First Post
date: 2025-01-15
description: A short summary for listings and meta tags.
tags: [example, hello]
---

Post content here. Full Markdown with syntax highlighting is supported.
```

### About page

Edit `content/about.md` with any Markdown content.

### Resume

Edit `content/resume.json` following the [JSON Resume schema](https://jsonresume.org/schema/). Visit `/resume` and click **Save as PDF** to export via the browser print dialog.

All content changes take effect immediately — no rebuild required.

## Deployment

### Docker (recommended)

```bash
docker compose up --build -d
```

This builds the app and starts it on port 3000. The `content/` directory is mounted as a volume, so you can update content without rebuilding:

```bash
scp my-new-post.md user@your-server:/path/to/content/blog/
```

To rebuild after changing code (Vue/TypeScript files):

```bash
docker compose up --build -d
```

### Node.js

```bash
npm run build
node .output/server/index.mjs
```

The `CONTENT_DIR` environment variable controls where content is read from (default: `./content`).

## Project Structure

```
content/
  blog/           # Markdown blog posts
  about.md        # About page content
  resume.json     # JSON Resume data
pages/            # Nuxt page components
layouts/          # Site layout (nav, footer)
server/
  api/            # API route handlers
  routes/         # Non-API routes (RSS)
  utils/          # Content parser, GitHub API client
composables/      # Vue composables (site config, theme)
assets/css/       # Tailwind + syntax highlighting styles
```

## License

MIT
