<script setup lang="ts">
const { t } = useI18n()
</script>
<!-- TODO: add shimmer to border -->
<template>
  <div class="absolute left-5 md:left-10 bottom-20">
    <div
      class="inline-flex gap-2 items-center rounded-full px-3 py-2 border border-green-200/20 text-xs text-green-200 font-light"
    >
      <span class="block h-2 w-2 rounded-full bg-green-100" />
      {{ t('welcome.status') }}
    </div>
  </div>
</template>
