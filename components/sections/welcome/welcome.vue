<script setup lang="ts">
import classNames from 'classnames'
import Liquid from '~/layers/liquid/liquid.vue'

const emphasisClass = 'text-accent font-bold'
</script>

<template>
  <Container>
    <!-- <div
      :class="
        classNames(
          'min-h-screen max-w-2xl mx-auto px-10 xl:px-20 py-20',
          'flex items-center justify-center',
          'relative text-6xl lg:text-7xl font-bold'
        )
      "
    > -->
    <Liquid />
    <!-- <p>
          I am a <span :class="emphasisClass">senior web developer</span> &
          casual <span :class="emphasisClass">UI designer</span>.
        </p>
        <p class="mb-20 indent-70">
          I work at the intersection of
          <span :class="emphasisClass">technology</span> and
          <span :class="emphasisClass">creativity</span>.
        </p>
        <p class="indent-70 relative">
          I am passionate about
          <span :class="emphasisClass">intuitive products</span>,
        </p>
        <p class="relative text-right w-full">
          <span :class="emphasisClass">accessibility</span> and<br />
          <span :class="emphasisClass">pixel-perfect interfaces</span>.
        </p> -->
    <!-- </Liquid> -->
    <!-- </div> -->
  </Container>
  <AvailableForWork />
  <div class="absolute z-2 bottom-10 right-10">
    <ContactMe
      :size="'default'"
      :text="'Hire me'"
      :colors="{
        slash: 'var(--color-cherry-300)',
        arrow: 'var(--color-cherry-400)',
        text: 'text-accent',
      }"
    />
  </div>
</template>
