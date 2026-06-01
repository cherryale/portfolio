<script setup lang="ts">
import Container from '~/components/container/container.vue'

const props = defineProps<{
  eyebrow?: string
  title: string
}>()
</script>

<template>
  <div class="lg:pl-20 relative -z-1">
    <p class="eyebrow" v-if="eyebrow">{{ eyebrow }}</p>
    <h2 class="text-accent-dark">{{ title }}</h2>
  </div>
</template>
