<script setup lang="ts">
import { WaterTexture } from '~/layers/liquid/components/water-texture'

const texture = new WaterTexture()
const onMouseMove = (e: MouseEvent) => {
  const point = {
    x: e.clientX / window.innerWidth,
    y: e.clientY / window.innerHeight,
    age: 0,
  }
  texture.addPoint(point)
}
</script>
<template>
  <div v-on:mousemove="(e) => onMouseMove(e)">
    <slot />
  </div>
</template>
