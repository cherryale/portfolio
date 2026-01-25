<script setup lang="ts">
import classNames from 'classnames'
import Arrow from '~/components/svg/arrow.vue'
import Slash from '~/components/svg/slash.vue'

defineProps<{
  text: string
  colors: {
    slash: string
    text: string
    arrow: string
  }
  size: 'default' | 'large'
  className?: string
}>()
</script>
<template>
  <NuxtLink
    href="mailto:apizzoccheri@protonmail.com"
    :class="
      classNames(
        'flex items-center text-lg font-medium uppercase no-underline',
        colors.text,
        className
      )
    "
  >
    <Slash :size="size" :color="colors.slash" />
    <span class="pl-1 pr-3">{{ text }}</span>
    <Arrow :size="size" :color="colors.arrow" />
  </NuxtLink>
</template>
