<script setup lang="ts">
import About from '~/components/sections/about/about.vue'
import Footer from '~/components/footer/footer.vue'
import Welcome from '~/components/sections/welcome/welcome.vue'
import Work from '~/components/sections/work/work.vue'

definePageMeta({
  layout: 'default',
})
</script>
<template>
  <Welcome />
  <Work />
  <About />
  <Footer />
</template>
