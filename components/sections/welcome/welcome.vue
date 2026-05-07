<script setup lang="ts">
import Liquid from '~/layers/liquid/liquid.vue'
const { t } = useI18n()
const { isDesktop } = useMediaQueries()
const { parse } = useMarkdown()
</script>

<template>
  <div
    class="relative min-h-screen py-40 md:py-0 md:h-screen bg-no-repeat bg-cover"
    :style="{
      backgroundImage: `url('/assets/images/png/texture.png')`,
    }"
  >
    <div
      class="flex flex-col gap-20 items-center min-h-full justify-center xl:px-20"
    >
      <AvailableForWork />
      <Liquid v-if="isDesktop" />
      <p
        v-if="!isDesktop"
        class="px-5 block md:hidden hero-text"
        v-html="parse(t('hero.text_1'))"
      />
      <!-- <figure class="absolute max-w-50 lg:max-w-80 z-2 animate-float">
        <img src="/assets/images/png/hero.png" alt="" />
      </figure> -->
      <!-- <Model /> -->
      <p
        v-if="!isDesktop"
        class="px-5 block md:hidden hero-text relative z-2"
        v-html="parse(t('hero.text_2'))"
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
