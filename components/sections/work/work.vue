<script setup lang="ts">
import Section from '~/components/section/section.vue'
import Project from '~/components/project/project.vue'
import gsap from 'gsap'

const { tm, rt } = useI18n()
const projects = (tm('projects') as []).map((p: any) => ({
  name: rt(p.name),
  description: rt(p.description),
  stack: rt(p.stack),
  image: rt(p.image),
  url: rt(p.url),
}))

const track = ref<HTMLElement | null>(null)
let tween: gsap.core.Tween

onMounted(() => {
  const el = track.value!
  const halfWidth = el.scrollWidth / 2

  tween = gsap.to(el, {
    x: -halfWidth,
    duration: 40,
    ease: 'none',
    repeat: -1,
  })
})

onUnmounted(() => tween?.kill())

function pause() {
  tween?.pause()
}
function resume() {
  tween?.resume()
}
</script>

<template>
  <Section class="bg-white rounded-t-4xl z-1 mt-[-20px] md:mt-[-40px]">
    <div>
      <Container class="text-4xl lg:text-5xl font-bold lg:pl-20">
        <p class="eyebrow">Design & Development</p>
        <h2 class="text-accent-dark">Selected work</h2>
      </Container>
      <div
        class="overflow-hidden mt-[-16px] lg:mt-[-20px]"
        @mouseenter="pause"
        @mouseleave="resume"
      >
        <div ref="track" class="flex w-max gap-5">
          <Project v-for="p in projects" v-bind="p" />
          <Project v-for="p in projects" v-bind="p" />
        </div>
      </div>
    </div>
  </Section>
</template>
