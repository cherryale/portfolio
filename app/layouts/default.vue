<script setup lang="ts">
import AvailableForWork from '~/components/available-for-work/available-for-work.vue'
import Header from '~/components/header/header.vue'
</script>

<template>
  <div class="min-h-screen flex flex-col justify-between">
    <Header />
    <slot />
    <AvailableForWork />
  </div>
</template>
