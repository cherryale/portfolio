<script setup lang="ts">
const { t } = useI18n()
</script>
<!-- TODO: add shimmer to border -->
<template>
  <div class="absolute left-5 md:left-10 bottom-10">
    <div
      class="inline-flex gap-2 items-center rounded-full px-3 py-2 border border-green-100 text-sm text-green-300"
    >
      <span class="block h-2 w-2 rounded-full bg-green-200" />
      {{ t('welcome.status') }}
    </div>
  </div>
</template>
