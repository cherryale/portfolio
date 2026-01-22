<script setup lang="ts">
import { AnimatePresence, motion } from 'motion-v'

const isOpen = ref(false)
const { locales, locale, setLocale } = useI18n()

const otherLocales = computed(() =>
  locales.value.filter((l) => l.code !== locale.value)
)

const toggleLanguages = (value: boolean) => {
  isOpen.value = value
}

const selectLocale = (code: 'en' | 'it' | 'es') => {
  setLocale(code)
  isOpen.value = false
}

const container = {
  open: {
    transition: { staggerChildren: 0.1, staggerDirection: -1 },
  },
  closed: {
    transition: { staggerChildren: 0.1, staggerDirection: -1 },
  },
}

const child = {
  open: { opacity: 1, y: 0, transition: { duration: 0.2 } },
  closed: { opacity: 0, y: 20, transition: { duration: 0.2 } },
}
</script>

<template>
  <div
    class="flex items-center relative text-xs"
    @mouseleave="toggleLanguages(false)"
  >
    <AnimatePresence mode="wait">
      <motion.div
        v-if="isOpen"
        key="lang-selector"
        class="absolute h-full right-[100%] pr-10 flex gap-10"
        :variants="container"
        initial="closed"
        animate="open"
        exit="closed"
      >
        <motion.button
          v-for="l in otherLocales"
          :key="l.code"
          :variants="child"
          @click="selectLocale(l.code)"
          class="transition-colors text-cherry-300 hover:underline"
        >
          {{ l.code.toUpperCase() }}
        </motion.button>
      </motion.div>
    </AnimatePresence>

    <button
      @keydown="toggleLanguages(true)"
      @mouseenter="toggleLanguages(true)"
      class="h-10 w-10 flex items-center justify-center rounded-full border border-cherry-300 uppercase text-cherry-500 font-medium transition"
    >
      {{ locale.toUpperCase() }}
    </button>
  </div>
</template>
