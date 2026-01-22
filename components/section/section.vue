<script setup lang="ts">
import classNames from 'classnames'

const props = defineProps<{
  bgColor: string
}>()
</script>

<template>
  <section :class="classNames('py-40 flex flex-col gap-40 w-full', bgColor)">
    <slot />
  </section>
</template>
