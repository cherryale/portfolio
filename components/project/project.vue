<script setup lang="ts">
import classNames from 'classnames'
import Arrow from '~/components/svg/arrow.vue'
import Slash from '~/components/svg/slash.vue'

defineProps<{
  url: string
  name: string
  description: string
  stack: string[]
  image: string
}>()
</script>

<template>
  <a
    :href="url"
    target="_blank"
    rel="noreferrer"
    class="mx-auto max-w-8xl px-10 w-full"
  >
    <figure class="h-110 w-110 rounded-2xl overflow-hidden">
      <img class="aspect-square object-cover" alt="`Cover image for ${name}`" />
    </figure>
    <div>
      <div class="flex items-center gap-2 text-m">
        <h4 class="text-m text-cherry uppercase">{{ name }}</h4>
        <span class="text-cherry-40">//</span>
        <p class="text-cherry-70">{{ description }}</p>
      </div>
      <ul class="flex items-center gap-1">
        <li v-for="item in stack" class="text-black">
          {{ item }}
        </li>
      </ul>
    </div>
  </a>
</template>
