<script setup lang="ts">
import LangSelector from '~/components/lang-selector/lang-selector.vue'

const { t } = useI18n()
</script>

<template>
  <header
    class="absolute flex justify-between pt-5 px-5 md:px-10 w-full top-0 left-0 z-2"
  >
    <div class="flex items-center gap-2 text-sm">
      <p class="font-bold">{{ t('header.welcome') }}</p>
      <span class="h-4 w-[1px] rounded-sm block bg-pink-400" />
      <p class="uppercase text-pink-300">Cherry Ale</p>
    </div>
    <img
      src="../../assets/images/svg/logo.svg"
      width="48"
      height="44"
      alt="Logo"
    />
    <LangSelector />
  </header>
</template>
