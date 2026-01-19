<script setup lang="ts">
defineProps<{
  href: string
  text: string
}>()
</script>
<template>
  <NuxtLink
    :href="href"
    target="_blank"
    class="flex text-base items-center gap-2 no-underline group text-brand-400"
  >
    <div
      class="h-10 w-10 flex items-center justify-center rounded-full border border-brand-300 group-hover:text-brand-300 group-hover:border-brand-400 transition"
    >
      <slot name="icon" />
    </div>
    <div class="font-bold hover:text-brand-300 transition">
      {{ text }}
    </div>
  </NuxtLink>
</template>
