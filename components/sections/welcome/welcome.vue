<script setup lang="ts">
import Liquid from '~/layers/liquid/liquid.vue'
const { t } = useI18n()
const { isDesktop, isMobile } = useMediaQueries()
const { parse } = useMarkdown()
</script>

<template>
  <div
    class="relative md:min-h-screen bg-no-repeat bg-cover"
    :style="{
      backgroundImage: `url('/assets/images/png/texture.png')`,
    }"
  >
    <div
      class="flex flex-col gap-20 items-center min-h-screen justify-center xl:px-20"
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
