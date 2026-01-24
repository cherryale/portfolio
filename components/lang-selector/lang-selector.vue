<script setup lang="ts">
import classNames from 'classnames'
import { AnimatePresence, motion } from 'motion-v'

const isOpen = ref(false)
const { locales, locale, setLocale } = useI18n()

const toggleLanguages = (value: boolean) => {
  isOpen.value = value
}

const selectLocale = (code: 'en' | 'it' | 'es') => {
  setLocale(code)
  isOpen.value = false
}

const container = {
  initial: {
    transition: { staggerChildren: 0.1, staggerDirection: -1 },
  },
  animate: {
    transition: { staggerChildren: 0.1, staggerDirection: -1 },
  },
  exit: {
    transition: { staggerChildren: 0.1, staggerDirection: -1 },
  },
}

const child = {
  initial: { opacity: 0, y: 16, transition: { duration: 0.2 } },
  animate: { opacity: 1, y: 0, transition: { duration: 0.2 } },
  exit: { opacity: 0, y: -16, transition: { duration: 0.2 } },
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
        class="absolute h-full right-[100%] pr-5 flex"
        :variants="container"
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <motion.button
          v-for="l in locales"
          :key="l.code"
          :variants="child"
          @click="selectLocale(l.code)"
          :disabled="l.code === locale"
          :class="
            classNames(
              'transition-colors text-cherry-400 hover:underline px-5',
              'disabled:no-underline disabled:cursor-text disabled:text-cherry-300 disabled:font-medium'
            )
          "
        >
          {{ l.code.toUpperCase() }}
        </motion.button>
      </motion.div>
    </AnimatePresence>

    <button
      @keydown="toggleLanguages(true)"
      @mouseenter="toggleLanguages(true)"
      class="h-10 w-10 flex items-center justify-center rounded-full border border-cherry-300 uppercase text-cherry-500 font-medium transition relative"
    >
      <AnimatePresence>
        <motion.span :key="locale" v-bind="child" class="absolute">
          {{ locale.toUpperCase() }}
        </motion.span>
      </AnimatePresence>
    </button>
  </div>
</template>
