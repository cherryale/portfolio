<script setup lang="ts">
defineProps<{
  url: string
  name: string
  description: string
  stack: string
  image: string
}>()
</script>

<template>
  <a
    :href="url"
    target="_blank"
    rel="noreferrer"
    class="w-110 text-base flex flex-col gap-4 no-underline group-hover"
  >
    <figure class="h-110 w-110 rounded-2xl overflow-hidden">
      <img
        width="440"
        height="440"
        :src="image"
        :alt="name"
        class="aspect-square object-cover duration-500 transition hover:scale-[1.05]"
      />
    </figure>
    <div>
      <div class="flex items-center gap-2">
        <h4 class="text-base text-cherry uppercase">{{ name }}</h4>
        <span class="text-cherry-40">//</span>
        <p class="text-cherry-70">{{ description }}</p>
      </div>
      <p class="flex items-center gap-1 text-sm mt-2 text-black">
        {{ stack }}
      </p>
    </div>
  </a>
</template>
