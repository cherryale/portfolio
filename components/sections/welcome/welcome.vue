<script setup lang="ts">
const emphasisClass = 'text-accent font-bold'
</script>

<template>
  <Container>
    <div
      class="min-h-screen max-w-2xl mx-auto px-10 xl:px-20 py-20 flex flex-col items-center justify-center relative text-6xl lg:text-7xl font-bold"
    >
      <p>
        I am a <span :class="emphasisClass">senior web developer</span> & casual
        <span :class="emphasisClass">UI designer</span>.
      </p>
      <p class="mb-20 indent-70">
        I work at the intersection of
        <span :class="emphasisClass">technology</span> and
        <span :class="emphasisClass">creativity</span>.
      </p>
      <figure class="absolute">
        <img src="../../../assets/images/cherries.png" alt="" />
      </figure>
      <p class="indent-70 relative z-2">
        I am passionate about
        <span :class="emphasisClass">intuitive products</span>,
      </p>
      <p class="relative z-2 text-right w-full">
        <span :class="emphasisClass">accessibility</span> and<br />
        <span :class="emphasisClass">pixel-perfect interfaces</span>.
      </p>
    </div>
  </Container>
  <AvailableForWork />
</template>
