<script setup lang="ts">
const el = ref<HTMLElement | null>(null)
defineExpose({ el })
</script>
<template>
  <section ref="el" class="pt-40 pb-20 md:py-40 flex flex-col gap-40 w-full">
    <slot />
  </section>
</template>
