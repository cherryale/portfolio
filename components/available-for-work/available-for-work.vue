<script setup lang="ts">
const { t } = useI18n()
</script>
<!-- TODO: add shimmer to border -->
<template>
  <div class="hidden md:block">
    <div
      class="inline-flex gap-2 bg-white/10 backdrop-blur-md items-center rounded-full px-3 py-2 border border-green-dark/40 text-sm text-green-dark font-light relative"
    >
      <span
        class="absolute block z-[-1] h-[calc(100%+2px)] w-[calc(100%+2px)] top-[-1px] left-[-1px] rounded-full"
      />
      <span
        class="flex items-center justify-center h-2 w-2 rounded-full bg-green relative"
      >
        <span
          class="absolute -z-1 block h-[9px] w-[9px] rounded-full animate-status-shimmer"
        />
      </span>
      {{ t('status.value') }}
    </div>
  </div>
</template>
