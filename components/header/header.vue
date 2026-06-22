<script setup lang="ts">
import gsap from 'gsap'
import LangSelector from '~/components/lang-selector/lang-selector.vue'
import Logo from '~/components/logo/logo.vue'
import ThemeToggle from '~/components/theme-toggle/theme-toggle.vue'

const { t } = useI18n()

const { isAnimationComplete } = useLoader()
const header = ref<HTMLElement | null>(null)

const animate = (done?: boolean) => {
  if (!done || !header.value) {
    return
  }

  gsap.fromTo(
    header.value,
    { opacity: 0, y: '-50%' },
    {
      opacity: 1,
      y: '0%',
      duration: 0.5,
      ease: 'power3.out',
    }
  )
}
watch(isAnimationComplete, (done) => animate(done))
</script>

<template>
  <header
    ref="header"
    class="flex justify-center items-center fixed pt-5 px-5 md:px-10 w-full top-0 left-0 z-5 opacity-0"
  >
    <div class="flex items-center gap-2 text-sm absolute left-5 md:left-10">
      <p class="hidden md:block text-cherry font-bold mb-0">
        {{ t('header.welcome') }}
      </p>
      <span class="hidden md:block h-4 w-[2px] rounded-sm bg-accent" />
      <h1 class="uppercase text-cherry md:text-cherry-70 md:font-light">
        Cherry Ale
      </h1>
    </div>
    <Logo />
    <div class="flex gap-5 absolute right-5 md:right-10">
      <!-- <LangSelector />  -->
      <ThemeToggle />
    </div>
  </header>
</template>
