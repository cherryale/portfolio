<script setup lang="ts">
import classNames from 'classnames'

defineProps<{
  items: { value: string; highlighted: boolean }[]
}>()
</script>
<template>
  <ul class="max-w-lg flex flex-wrap gap-2 md:gap-5 -mt-4 relative z-2">
    <li
      v-for="(item, index) in items"
      :key="item.value"
      class="min-w-22 text-cherry text-base flex items-center justify-center bg-white rounded-full relative py-3 px-7 md:py-6 md:px-14"
    >
      <span
        :class="
          classNames(
            'absolute block z-[-1] h-[calc(100%+2px)] w-[calc(100%+2px)] top-[-1px] left-[-1px] rounded-full',
            item.highlighted
              ? index % 2
                ? 'animate-pill-shimmer-reverse'
                : 'animate-pill-shimmer'
              : ''
          )
        "
      />
      {{ item.value }}
    </li>
  </ul>
</template>
