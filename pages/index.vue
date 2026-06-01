<script setup lang="ts">
import Loader from '~/components/loader/loader.vue'
import About from '~/components/sections/about/about.vue'
import Contact from '~/components/sections/contact/contact.vue'
import Welcome from '~/components/sections/welcome/welcome.vue'
import Work from '~/components/sections/work/work.vue'

definePageMeta({
  layout: 'default',
})
</script>
<template>
  <Loader />
  <Welcome />
  <Work />
  <About />
  <Contact />
</template>
