export function useTheme() {
  const isDark = useState('theme-dark', () => true)

  function applyTheme(dark: boolean) {
    if (import.meta.client) {
      document.documentElement.classList.toggle('dark', dark)
      localStorage.setItem('theme', dark ? 'dark' : 'light')
    }
  }

  function toggleTheme() {
    isDark.value = !isDark.value
    applyTheme(isDark.value)
  }

  function initTheme() {
    if (import.meta.client) {
      const saved = localStorage.getItem('theme')
      isDark.value = saved ? saved === 'dark' : true
      applyTheme(isDark.value)
    }
  }

  return { isDark, toggleTheme, initTheme }
}
