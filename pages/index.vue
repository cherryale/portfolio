<script setup lang="ts">
import About from '~/components/sections/about/about.vue'
import Contact from '~/components/sections/contact/contact.vue'
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
  <Contact />
</template>
