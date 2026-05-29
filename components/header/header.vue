<script setup lang="ts">
import LangSelector from '~/components/lang-selector/lang-selector.vue'
import Logo from '~/components/logo/logo.vue'
import ThemeToggle from '~/components/theme-toggle/theme-toggle.vue'

const { t } = useI18n()
</script>

<template>
  <header
    class="flex justify-center items-center fixed pt-5 px-5 md:px-10 w-full top-0 left-0 z-5"
  >
    <div class="flex items-center gap-2 text-sm absolute left-5 md:left-10">
      <p class="hidden md:block text-cherry font-bold mb-0">
        {{ t('header.welcome') }}
      </p>
      <span class="hidden md:block h-4 w-[2px] rounded-sm bg-accent" />
      <h1 class="uppercase text-cherry-70 font-light">Cherry Ale</h1>
    </div>
    <Logo />
    <div class="flex gap-5 absolute right-5 md:right-10">
      <!-- <LangSelector />
      <ThemeToggle /> -->
    </div>
  </header>
</template>
