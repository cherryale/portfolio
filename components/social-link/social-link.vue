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
    class="flex items-center gap-3 no-underline group-hover:no-underline group"
  >
    <div
      class="h-10 w-10 flex items-center justify-center rounded-full border border-cherry-500/20 text-cherry-400 transition-colors md:group-hover:text-cherry-500 md:group-hover:border-accent"
    >
      <slot name="icon" />
    </div>
    <div
      class="text-cherry-400 transition-colors md:group-hover:text-cherry-500"
    >
      {{ text }}
    </div>
  </NuxtLink>
</template>
