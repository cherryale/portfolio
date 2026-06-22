<script setup lang="ts">
import classNames from 'classnames'

defineProps<{
  className?: string
  highlighted?: boolean
  items: {
    role: string
    company: string
    location: string
    from: string
    to: string
  }[]
}>()
</script>
<template>
  <ul :class="classNames('flex flex-col gap-5', className)">
    <li
      v-for="(item, index) in items"
      :class="
        classNames(
          'bg-light rounded-4xl sm:rounded-full py-5 sm:py-10 px-5 sm:px-14 relative',
          highlighted ? 'bg-light' : 'bg-light/70'
        )
      "
    >
      <span
        :class="
          classNames(
            'absolute block z-[-1] h-[calc(100%+2px)] w-[calc(100%+2px)] top-[-1px] left-[-1px] rounded-4xl sm:rounded-full',
            highlighted && index === 0 ? 'animate-experience-shimmer' : ''
          )
        "
      />
      <div
        class="flex gap-5 flex-col sm:flex-row md:items-center justify-between"
      >
        <div class="flex items-center gap-1 text-foreground">
          <div class="text-sm md:text-base">
            <p
              :class="
                classNames(
                  'font-medium text-lg',
                  highlighted && index === 0
                    ? 'text-accent-dark'
                    : 'text-cherry'
                )
              "
            >
              {{ item.role }}
            </p>
            <span>{{ item.company }}</span>
            //
            <span>{{ item.location }}</span>
          </div>
        </div>
        <div class="text-cherry flex items-center gap-2">
          <span>{{ item.from }}</span>
          <span class="h-[1px] w-5 bg-cherry-40" />
          <span>{{ item.to }}</span>
        </div>
      </div>
    </li>
  </ul>
</template>
