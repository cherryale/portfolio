<script setup lang="ts">
import LangSelector from '~/components/lang-selector/lang-selector.vue'
import ThemeToggle from '~/components/theme-toggle/theme-toggle.vue'

const { t } = useI18n()
</script>

<template>
  <header class="absolute pt-5 px-5 md:px-10 w-full top-0 left-0 z-2">
    <div class="flex justify-between">
      <div class="flex items-center gap-2 text-sm">
        <p class="font-bold text-(--color-brand-500)">
          {{ t('header.welcome') }}
        </p>
        <span class="h-4 w-[2px] rounded-sm block bg-(--color-brand-200)" />
        <p class="uppercase text-(--color-brand-300)">Cherry Ale</p>
      </div>
      <img
        src="../../assets/images/svg/logo.svg"
        width="48"
        height="44"
        alt="Logo"
      />
      <LangSelector />
    </div>
    <div class="flex justify-end mt-5">
      <ThemeToggle />
    </div>
  </header>
</template>
