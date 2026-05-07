<script setup lang="ts">
const { t } = useI18n()
</script>
<!-- TODO: add shimmer to border -->
<template>
  <div class="absolute left-5 md:left-10 bottom-10 md:bottom-20">
    <div
      class="inline-flex gap-2 items-center rounded-full px-3 py-2 border border-green-dark/20 text-xs text-green-dark font-light relative"
    >
      <span
        class="absolute block z-[-1] h-[calc(100%+2px)] w-[calc(100%+2px)] top-[-1px] left-[-1px] bg-accent rounded-full"
      />
      <span class="block h-2 w-2 rounded-full bg-green" />
      {{ t('welcome.status') }}
    </div>
  </div>
</template>
