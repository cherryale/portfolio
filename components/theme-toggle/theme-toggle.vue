<script setup lang="ts">
import { ref, onMounted } from 'vue'
import DarkMode from '~/components/svg/icons/dark-mode.vue'
import LightMode from '~/components/svg/icons/light-mode.vue'
import { THEME_COLORS } from '~/lib/theme'

const theme = ref<'light' | 'dark'>('light')

const applyTheme = (value: 'light' | 'dark') => {
  const colors = THEME_COLORS[value]
  const html = document.documentElement

  // Set data-theme attribute for compatibility
  html.setAttribute('data-theme', value)

  // Set CSS variables as inline styles for transitions
  Object.entries(colors).forEach(([key, value]) => {
    html.style.setProperty(key, value)
  })
}

const toggleDark = () => {
  const newValue = theme.value === 'light' ? 'dark' : 'light'
  theme.value = newValue
  applyTheme(newValue)
  localStorage.setItem('theme', newValue)
}

onMounted(() => {
  // Check localStorage first, then system preference
  const stored = localStorage.getItem('theme')
  if (typeof stored === 'string' && (stored === 'light' || stored === 'dark')) {
    theme.value = stored
  } else {
    theme.value = window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light'
  }
  applyTheme(theme.value)
})
</script>

<template>
  <div class="flex items-center relative text-xs">
    <button
      @click="toggleDark()"
      class="h-10 w-10 flex items-center justify-center rounded-full border border-(--color-brand-300)"
    >
      <LightMode v-if="theme === 'dark'" />
      <DarkMode v-if="theme === 'light'" />
    </button>
  </div>
</template>
