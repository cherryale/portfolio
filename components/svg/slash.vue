<script setup lang="ts">
defineProps<{
  color: string
  size: 'default' | 'large'
}>()
</script>
<template>
  <svg
    v-if="size === 'default'"
    width="20"
    height="16"
    viewBox="0 0 20 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M9.16895 16L17.1017 0H19.4011L11.5066 16H9.16895Z" :fill="color" />
    <path d="M0 16L7.93278 0H10.2321L2.33768 16H0Z" :fill="color" />
  </svg>

  <svg
    v-else-if="size === 'large'"
    width="24"
    height="20"
    viewBox="0 0 24 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M7.86798 1.13864C8.08433 0.319299 8.91406 -0.166819 9.72149 0.0527233L22.8779 3.62998C23.6853 3.84952 24.1644 4.69151 23.948 5.51085L20.4228 18.8614C20.2064 19.6807 19.3767 20.1668 18.5693 19.9473C17.7618 19.7277 17.2828 18.8858 17.4991 18.0664L20.0787 8.29734L2.27058 18.7305C1.54666 19.1547 0.620987 18.903 0.203031 18.1684C-0.214926 17.4338 0.0331079 16.4944 0.757029 16.0703L18.5651 5.63712L8.93811 3.0195C8.13068 2.79996 7.65163 1.95798 7.86798 1.13864Z"
      :fill="color"
    />
  </svg>
</template>
