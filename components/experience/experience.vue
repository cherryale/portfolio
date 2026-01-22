<script setup lang="ts">
defineProps<{
  className?: string
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
  <ul :class="className || ''">
    <li v-for="item in items" class="py-10 border-b border-cherry-500/20">
      <p class="font-medium text-cherry-500">{{ item.role }}</p>
      <div class="text-sm pt-2 flex items-center justify-between">
        <div class="text-cherry-400 flex items-center gap-1">
          <span>{{ item.company }}</span>
          //
          <span>{{ item.location }}</span>
        </div>
        <div class="text-cherry-500 flex items-center gap-2">
          <span>{{ item.from }}</span>
          <span class="h-[1px] w-5 bg-cherry-400" />
          <span>{{ item.to }}</span>
        </div>
      </div>
    </li>
  </ul>
</template>
