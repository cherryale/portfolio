<script setup lang="ts">
import SocialLink from '~/components/social-link/social-link.vue'
import Section from '~/components/section/section.vue'
import { SOCIAL_LINKS } from '~/lib/constants'
import ContactMe from '~/components/contact-me/contact-me.vue'
import Content from '~/components/content/content.vue'
import Project from '~/components/project/project.vue'
import gsap from 'gsap'

const { tm, rt } = useI18n()
const projects = tm('projects').map((p: any) => ({
  name: rt(p.name),
  description: rt(p.description),
  stack: p.stack.map((s: any) => rt(s)),
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
    // modifiers: {
    //   x: gsap.utils.unitize((x) => parseFloat(x) % halfWidth),
    // },
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
  <Section class="bg-white rounded-t-4xl mt-[-40px] z-1">
    <div>
      <Container class="text-4xl lg:text-5xl font-bold pl-20">
        <p class="eyebrow">Design & Development</p>
        <h2>Selected work</h2>
      </Container>
      <div
        class="overflow-hidden mt-[-20px]"
        @mouseenter="pause"
        @mouseleave="resume"
      >
        <div ref="track" class="flex w-max gap-[20px]">
          <Project v-for="p in projects" v-bind="p" class="shrink-0" />
          <Project v-for="p in projects" v-bind="p" class="w-110 shrink-0" />
        </div>
      </div>
    </div>
  </Section>
</template>
