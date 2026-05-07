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
      class="rounded-full py-5 sm:py-10 px-14 relative bg-white"
    >
      <span
        :class="
          classNames(
            'absolute block z-[-1] h-[calc(100%+2px)] w-[calc(100%+2px)] top-[-1px] left-[-1px] bg-accent rounded-full',
            highlighted && index === 0 ? 'bg-linear-25deg' : 'bg-black/15'
          )
        "
      />
      <div
        class="text-sm pt-2 flex gap-5 flex-col sm:flex-row md:items-center justify-between"
      >
        <div
          :class="
            classNames(
              'flex items-center gap-1',
              highlighted && index === 0 ? 'text-cherry-70' : 'text-black'
            )
          "
        >
          <div>
            <p
              :class="
                classNames(
                  'font-medium text-lg text-cherry',
                  highlighted && index === 0 ? 'text-cherry' : 'text-cherry'
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
        <div class="text-cherry-500 flex items-center gap-2">
          <span>{{ item.from }}</span>
          <span class="h-[1px] w-5 bg-cherry-40" />
          <span>{{ item.to }}</span>
        </div>
      </div>
    </li>
  </ul>
</template>
