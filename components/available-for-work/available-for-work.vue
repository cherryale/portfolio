<script setup lang="ts">
const { t } = useI18n()
</script>
<!-- TODO: add shimmer to border -->
<template>
  <div
    class="hidden md:block absolute left-5 md:left-10 bottom-10 md:bottom-20"
  >
    <div
      class="inline-flex gap-2 items-center rounded-full px-3 py-2 border border-green-dark/40 text-sm text-green-dark font-light relative"
    >
      <span
        class="absolute block z-[-1] h-[calc(100%+2px)] w-[calc(100%+2px)] top-[-1px] left-[-1px] rounded-full"
      />
      <span class="block h-2 w-2 rounded-full bg-green" />
      {{ t('status.value') }}
    </div>
  </div>
</template>
