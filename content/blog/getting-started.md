---
title: Getting Started
date: 2025-01-01
description: How to customize this blog and make it your own.
tags: [meta]
---

Welcome to your new blog! Here's how to get started.

## Personalize Your Site

Open `nuxt.config.ts` and edit the `site` object inside `runtimeConfig.public`:

```ts
runtimeConfig: {
  public: {
    site: {
      name: 'Your Name',
      url: 'https://yourdomain.com',
      description: 'A short description of your site.',
      github: 'your-github-username',
      linkedin: 'your-linkedin-slug',
    },
  },
},
```

Your name, URL, and social links will appear across the entire site automatically.

## Add a Blog Post

Create a new `.md` file in `content/blog/` with frontmatter like this:

```markdown
---
title: My First Post
date: 2025-01-15
description: A short description for listings and meta tags.
tags: [example, hello]
---

Your post content here. Full Markdown is supported!
```

The post appears immediately — no rebuild needed.

## Update Your Resume

Edit `content/resume.json` following the [JSON Resume](https://jsonresume.org/schema/) format. Visit `/resume` and click "Save as PDF" to export it.

## Update the About Page

Edit `content/about.md` with any Markdown content you like.

## Deploy

Build and run with Docker:

```bash
docker compose up --build -d
```

To update content without rebuilding, just copy files into the mounted `content/` volume on your server.
