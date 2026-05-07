<script setup lang="ts">
import Header from '~/components/header/header.vue'
</script>

<template>
  <div class="min-h-screen flex flex-col justify-between">
    <Header />
    <slot />
  </div>
</template>
