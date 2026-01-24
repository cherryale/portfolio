<script setup lang="ts">
defineProps<{
  items: string[]
}>()
</script>
<template>
  <ul class="max-w-xs lg:ml-10 mt-10 flex flex-col flex-wrap md:flex-row gap-3">
    <li
      v-for="item in items"
      :key="item"
      class="min-w-22 text-sm flex items-center justify-center text-cherry-200 bg-cherry-400 rounded-full py-1 px-4"
    >
      {{ item }}
    </li>
  </ul>
</template>
