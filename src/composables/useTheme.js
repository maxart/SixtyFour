import { ref, readonly, watchEffect } from 'vue'

const STORAGE_KEY = 'sixtyfour-theme'

function getInitialDark() {
  const stored = localStorage.getItem(STORAGE_KEY)
  if (stored !== null) return stored === 'dark'
  return window.matchMedia('(prefers-color-scheme: dark)').matches
}

const isDark = ref(getInitialDark())

watchEffect(() => {
  document.documentElement.classList.toggle('dark', isDark.value)
  localStorage.setItem(STORAGE_KEY, isDark.value ? 'dark' : 'light')
})

function toggle() {
  isDark.value = !isDark.value
}

export function useTheme() {
  return {
    isDark: readonly(isDark),
    toggle,
  }
}
