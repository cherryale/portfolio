<script setup lang="ts">
import classNames from 'classnames'
import type { VueElement } from 'vue'
import Container from '~/components/container/container.vue'

const props = defineProps<{
  title: string
  titleColor: string
  description?: VueElement
}>()
</script>

<template>
  <Container>
    <h2 :class="classNames('eyebrow mb-10', titleColor)">
      {{ title }}
    </h2>
    <div class="pl-10">
      <div class="max-w-xs mb-10">
        <slot name="description" />
      </div>
      <slot />
    </div>
  </Container>
</template>
