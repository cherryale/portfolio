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
    class="w-80 lg:w-110 text-base flex flex-col gap-4 no-underline group-hover shrink-0"
  >
    <figure class="h-80 lg:h-110 w-80 lg:w-110 rounded-2xl overflow-hidden">
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
        <h4 class="text-sm md:text-base text-cherry uppercase">{{ name }}</h4>
        <span class="hidden lg:block text-cherry-40">//</span>
        <p class="hidden lg:block text-cherry-70">{{ description }}</p>
      </div>
      <p class="flex items-center gap-1 text-xs md:text-sm mt-2 text-black">
        {{ stack }}
      </p>
    </div>
  </a>
</template>
