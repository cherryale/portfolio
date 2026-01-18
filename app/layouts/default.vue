<script setup lang="ts">
import AvailableForWork from '~/components/available-for-work/available-for-work.vue'
import Header from '~/components/header/header.vue'
</script>

<template>
  <Header />
  <slot />
  <AvailableForWork />
</template>
