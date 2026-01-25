<script setup lang="ts">
import Model from '~/components/model/model.vue'
import Liquid from '~/layers/liquid/liquid.vue'
const { t } = useI18n()
const { isDesktop } = useMediaQueries()
const { parse } = useMarkdown()
</script>

<template>
  <div
    class="flex flex-col gap-20 items-center justify-center min-h-screen relative px-5 xl:px-20 py-40 lg:py-20"
  >
    <AvailableForWork />
    <Liquid v-if="isDesktop" />
    <p v-if="!isDesktop" class="hero-text" v-html="parse(t('hero.text_1'))" />
    <figure class="absolute max-w-100 lg:max-w-140 z-2">
      <img src="../../../assets/images/cherries.png" alt="" />
    </figure>
    <!-- <Model /> -->
    <p
      v-if="!isDesktop"
      class="hero-text relative z-2"
      v-html="parse(t('hero.text_2'))"
    />
    <AvailableForWork />
    <ContactMe
      :class-name="'absolute z-2 bottom-10 right-10'"
      :size="'default'"
      :text="'Hire me'"
      :colors="{
        slash: 'var(--color-cherry-300)',
        arrow: 'var(--color-cherry-400)',
        text: 'text-accent',
      }"
    />
  </div>
</template>
