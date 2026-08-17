<script setup lang="ts">
import gsap from 'gsap'
import Liquid from '~/layers/liquid/liquid.vue'

const { t } = useI18n()
const { isDesktop, isMobile } = useMediaQueries()
const { parse } = useMarkdown()

const content = ref<HTMLElement | null>(null)
const elements = ref<HTMLElement | null>(null)

const animate = () => {
  gsap.fromTo(
    content.value,
    { opacity: 0 },
    { opacity: 1, duration: 1, delay: 0.25, ease: 'slow' }
  )

  gsap.fromTo(
    elements.value,
    { opacity: 0, y: '50%' },
    {
      opacity: 1,
      y: '0%',
      duration: 0.5,
      delay: 1.5,
      ease: 'power3.out',
    }
  )
}

onMounted(() => {
  animate()
})
</script>

<template>
  <div class="relative md:min-h-screen bg-no-repeat bg-cover bg-texture">
    <div
      ref="content"
      class="flex flex-col gap-20 items-center min-h-screen justify-center xl:px-20 opacity-0"
    >
      <Liquid v-if="isDesktop" />
      <div v-if="isMobile" class="px-5 hero-text py-40">
        <LiquidFilter id="mobile-text-liquid" :scale="6" :duration="20" />
        <div
          style="filter: url(#mobile-text-liquid)"
          v-html="parse(t('intro.text'))"
        />
      </div>
    </div>
    <div
      ref="elements"
      class="flex justify-end md:justify-between w-full absolute z-2 bottom-20 left-0 opacity-0 translate-y-[50%] px-5 md:px-10"
    >
      <AvailableForWork />
      <ContactMe
        :size="'default'"
        :text="'Say hello'"
        :colors="{
          slash: 'var(--color-cherry-40)',
          arrow: 'var(--color-accent)',
          text: 'text-cherry',
        }"
      />
    </div>
  </div>
</template>
