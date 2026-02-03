<script setup lang="ts">
import LangSelector from '~/components/lang-selector/lang-selector.vue'
import Logo from '~/components/logo/logo.vue'
import ThemeToggle from '~/components/theme-toggle/theme-toggle.vue'

const { t } = useI18n()
</script>

<template>
  <header class="fixed pt-5 px-5 md:px-10 w-full top-0 left-0 z-2">
    <div class="flex justify-center items-center">
      <div class="hidden md:flex items-center gap-2 text-sm absolute left-10">
        <p class="text-cherry font-bold mb-0">
          {{ t('header.welcome') }}
        </p>
        <span class="h-4 w-[2px] rounded-sm block bg-cherry-40" />
        <h1 class="uppercase text-cherry-70 font-light">Cherry Ale</h1>
      </div>
      <Logo />
      <LangSelector />
    </div>
    <div class="flex justify-end mt-5">
      <ThemeToggle />
    </div>
  </header>
</template>
