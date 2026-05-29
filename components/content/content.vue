<script setup lang="ts">
import type { VueElement } from 'vue'
import Container from '~/components/container/container.vue'

const props = defineProps<{
  title: string
  description?: VueElement
}>()
</script>

<template>
  <Container>
    <h2 class="eyebrow mb-10">
      {{ title }}
    </h2>
    <div class="lg:pl-10">
      <div class="mb-10">
        <slot name="description" />
      </div>
      <slot />
    </div>
  </Container>
</template>
