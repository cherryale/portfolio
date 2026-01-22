<script setup lang="ts">
import classNames from 'classnames'
import Container from '~/components/container/container.vue'
defineProps<{
  bgColor: string
  titleColor: string
  title: string
}>()
</script>

<template>
  <section :class="classNames('py-20 flex flex-col items-center', bgColor)">
    <Container>
      <h2 :class="classNames('eyebrow mb-10', titleColor)">{{ title }}</h2>
      <div class="pl-10">
        <slot />
      </div>
    </Container>
  </section>
</template>
