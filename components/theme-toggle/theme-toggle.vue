<script setup lang="ts">
import { AnimatePresence, motion } from 'motion-v'
import { ref, onMounted } from 'vue'
import DarkMode from '~/components/svg/icons/dark-mode.vue'
import LightMode from '~/components/svg/icons/light-mode.vue'

defineOptions({
  inheritAttrs: false,
})

const theme = ref<'light' | 'dark'>('light')

const applyTheme = (value: 'light' | 'dark') => {
  const html = document.documentElement

  // Set data-theme attribute for compatibility
  html.setAttribute('data-theme', value)
}

const toggleDark = () => {
  const newValue = theme.value === 'light' ? 'dark' : 'light'
  theme.value = newValue
  applyTheme(newValue)
  localStorage.setItem('theme', newValue)
}

onMounted(() => {
  // check localStorage first, then system preference
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

const iconAnimationProps = {
  initial: { opacity: 0, y: 16, transition: { duration: 0.2 } },
  animate: { opacity: 1, y: 0, transition: { duration: 0.2 } },
  exit: { opacity: 0, y: -16, transition: { duration: 0.2 } },
}
</script>

<template>
  <div class="flex items-center relative text-xs text-cherry">
    <button
      @click="toggleDark()"
      class="h-10 w-10 flex items-center justify-center rounded-full border border-accent relative bg-white/10 backdrop-blur-sm"
    >
      <AnimatePresence>
        <motion.i
          v-if="theme === 'dark'"
          key="dark-mode"
          v-bind="iconAnimationProps"
          class="absolute"
        >
          <LightMode />
        </motion.i>
        <motion.i
          v-if="theme === 'light'"
          key="light-mode"
          v-bind="iconAnimationProps"
          class="absolute"
        >
          <DarkMode />
        </motion.i>
      </AnimatePresence>
    </button>
  </div>
</template>
