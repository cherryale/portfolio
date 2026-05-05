<script setup lang="ts">
defineProps<{
  items: string[]
}>()
</script>
<template>
  <ul
    class="max-w-lg flex flex-col flex-wrap md:flex-row gap-5 mt-[-20px] relative z-2"
  >
    <li
      v-for="item in items"
      :key="item"
      class="min-w-22 text-base flex items-center justify-center bg-white rounded-full relative py-6 px-14"
    >
      <span
        class="absolute block z-[-1] h-[calc(100%+2px)] w-[calc(100%+2px)] top-[-1px] left-[-1px] bg-accent rounded-full bg-linear-tr"
      />
      {{ item }}
    </li>
  </ul>
</template>
