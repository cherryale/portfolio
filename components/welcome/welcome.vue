<script setup lang="ts">
import Intro from '~/components/svg/intro-text.vue'
</script>

<template>
  <div
    class="px-10 md:px-20 min-h-screen flex flex-col gap-40 items-center justify-center text-center relative"
  >
    <Intro />
    <figure class="absolute pt-20">
      <img src="../../assets/images/cherries.png" alt="" />
    </figure>
    <Tagline />
    <AvailableForWork />
  </div>
</template>
