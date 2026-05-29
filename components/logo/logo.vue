<script setup lang="ts">
const localePath = useLocalePath()
</script>
<template>
  <NuxtLink :to="localePath('/')">
    <NuxtImg src="assets/images/logo.svg" width="48" height="44" alt="Logo" />
  </NuxtLink>
</template>
