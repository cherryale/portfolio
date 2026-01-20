<script setup lang="ts">
import Container from '~/components/container/container.vue'
import Intro from '~/components/svg/intro-text.vue'
</script>

<template>
  <Container>
    <div
      class="px-10 md:px-20 min-h-screen flex flex-col gap-40 items-center justify-center relative"
    >
      <Intro />
      <figure class="absolute pt-20">
        <img src="../../assets/images/cherries.png" alt="" />
      </figure>
      <Tagline />
    </div>
  </Container>
  <AvailableForWork />
</template>
