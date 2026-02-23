export function useSiteConfig() {
  const { site } = useRuntimeConfig().public
  return site as {
    name: string
    url: string
    description: string
    github: string
    linkedin: string
  }
}
