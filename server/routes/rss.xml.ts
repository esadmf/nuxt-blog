export default defineEventHandler((event) => {
  const { site } = useRuntimeConfig(event).public
  const posts = getAllPosts()
  const baseUrl = site.url

  const items = posts
    .map(
      (post) => `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${baseUrl}/blog/${post.slug}</link>
      <description><![CDATA[${post.description}]]></description>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <guid isPermaLink="true">${baseUrl}/blog/${post.slug}</guid>
    </item>`,
    )
    .join('\n')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${site.name}</title>
    <link>${baseUrl}</link>
    <description>${site.description}</description>
    <language>en-us</language>
    <atom:link href="${baseUrl}/rss.xml" rel="self" type="application/rss+xml"/>
    ${items}
  </channel>
</rss>`

  setHeader(event, 'Content-Type', 'application/rss+xml; charset=utf-8')
  return xml
})
