<script setup lang="ts">
import classNames from 'classnames'

defineProps<{
  href: string
  text: string
}>()
</script>
<template>
  <NuxtLink
    :href="href"
    target="_blank"
    class="flex text-base items-center gap-3 no-underline group-hover:no-underline group"
  >
    <div
      :class="
        classNames(
          'flex items-center justify-center h-10 w-10',
          'rounded-full border border-cherry-20 text-cherry-70 transition-colors',
          'md:group-hover:border-accent'
        )
      "
    >
      <slot name="icon" />
    </div>
    <div
      class="text-cherry-70 font-light transition-colors md:group-hover:text-cherry"
    >
      {{ text }}
    </div>
  </NuxtLink>
</template>
