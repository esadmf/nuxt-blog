export interface Project {
  name: string
  description: string | null
  language: string | null
  stargazerCount: number
  url: string
  updatedAt: string
}

const CACHE_TTL = 60 * 60 * 1000 // 1 hour

let cache: { data: Project[]; username: string; timestamp: number } | null = null

export async function getProjects(username: string): Promise<Project[]> {
  if (!username) return []

  if (cache && cache.username === username && Date.now() - cache.timestamp < CACHE_TTL) {
    return cache.data
  }

  try {
    const projects: Project[] = []
    let page = 1

    while (true) {
      const repos: any[] = await $fetch(
        `https://api.github.com/users/${username}/starred`,
        {
          query: { per_page: 100, page },
          headers: {
            Accept: 'application/vnd.github.v3+json',
            'User-Agent': 'nuxt-blog',
          },
        },
      )

      if (repos.length === 0) break

      for (const repo of repos) {
        if (repo.owner?.login === username) {
          projects.push({
            name: repo.name,
            description: repo.description,
            language: repo.language,
            stargazerCount: repo.stargazers_count,
            url: repo.html_url,
            updatedAt: repo.updated_at,
          })
        }
      }

      page++
    }

    cache = { data: projects, username, timestamp: Date.now() }
    return projects
  } catch (err) {
    console.error('Failed to fetch GitHub projects:', err)
    if (cache && cache.username === username) return cache.data
    return []
  }
}
