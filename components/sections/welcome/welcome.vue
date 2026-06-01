<script setup lang="ts">
import gsap from 'gsap'
import Liquid from '~/layers/liquid/liquid.vue'

const { t } = useI18n()
const { isDesktop, isMobile } = useMediaQueries()
const { parse } = useMarkdown()
const { isAnimationComplete } = useLoader()

const wrapper = ref<HTMLElement | null>(null)
let revealed = false

const runReveal = () => {
  if (revealed || !wrapper.value) return
  revealed = true
  gsap.fromTo(
    wrapper.value,
    { opacity: 0 },
    { opacity: 1, duration: 2, ease: 'power2.out' }
  )
}

watch(isAnimationComplete, (done) => {
  if (done) runReveal()
})

onMounted(() => {
  if (isAnimationComplete.value) runReveal()
})
</script>

<template>
  <div
    class="relative md:min-h-screen bg-no-repeat bg-cover"
    :style="{
      backgroundImage: `url('/assets/images/png/texture.png')`,
    }"
  >
    <div
      ref="wrapper"
      class="flex flex-col gap-20 items-center min-h-screen justify-center xl:px-20 opacity-0"
    >
      <AvailableForWork />
      <Liquid v-if="isDesktop" />
      <div
        v-if="isMobile"
        class="px-5 hero-text py-40"
        v-html="parse(t('intro.text'))"
      />
      <ContactMe
        :class-name="'absolute z-2 bottom-10 md:bottom-20 right-5 md:right-10'"
        :size="'default'"
        :text="'Say hello'"
        :colors="{
          slash: 'var(--color-accent-dark)',
          arrow: 'var(--color-accent)',
          text: 'text-cherry',
        }"
      />
    </div>
  </div>
</template>
