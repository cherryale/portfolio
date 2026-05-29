<script setup lang="ts">
import Section from '~/components/section/section.vue'
import Project from '~/components/project/project.vue'
import gsap from 'gsap'

const { tm, rt } = useI18n()
const all = (tm('projects') as []).map((p: any) => ({
  name: rt(p.name),
  description: rt(p.description),
  stack: rt(p.stack),
  image: rt(p.image),
  url: rt(p.url),
}))

const mid = Math.ceil(all.length / 2)
const firstHalf = all.slice(0, mid)
const secondHalf = all.slice(mid)

const track = ref<HTMLElement | null>(null)
const track2 = ref<HTMLElement | null>(null)
let tween: gsap.core.Tween
let tween2: gsap.core.Tween

onMounted(() => {
  const el = track.value!
  const halfWidth = el.scrollWidth / 2
  tween = gsap.to(el, {
    x: -halfWidth,
    duration: 40,
    ease: 'none',
    repeat: -1,
  })

  if (track2.value) {
    const el2 = track2.value
    const halfWidth2 = el2.scrollWidth / 2
    tween2 = gsap.fromTo(
      el2,
      { x: -halfWidth2 },
      { x: 0, duration: 40, ease: 'none', repeat: -1 }
    )
  }
})

onUnmounted(() => {
  tween?.kill()
  tween2?.kill()
})

function pause1() {
  tween?.pause()
}
function resume1() {
  tween?.resume()
}
function pause2() {
  tween2?.pause()
}
function resume2() {
  tween2?.resume()
}
</script>

<template>
  <Section class="bg-white rounded-t-4xl z-1 mt-[-20px] md:mt-[-40px]">
    <div>
      <Container class="text-4xl lg:text-5xl font-bold lg:pl-20">
        <p class="eyebrow">Design & Development</p>
        <h2 class="text-accent-dark">Selected work</h2>
      </Container>
      <div class="overflow-hidden -mt-4">
        <div
          class="w-full overflow-hidden"
          @mouseenter="pause1"
          @mouseleave="resume1"
        >
          <div ref="track" class="flex w-max gap-5">
            <Project v-for="p in firstHalf" v-bind="p" />
            <Project v-for="p in firstHalf" v-bind="p" />
            <Project v-for="p in firstHalf" v-bind="p" />
          </div>
        </div>
        <div
          v-if="secondHalf.length"
          class="w-full overflow-hidden mt-10"
          @mouseenter="pause2"
          @mouseleave="resume2"
        >
          <div ref="track2" class="flex w-max gap-5">
            <Project v-for="p in secondHalf" v-bind="p" />
            <Project v-for="p in secondHalf" v-bind="p" />
            <Project v-for="p in secondHalf" v-bind="p" />
          </div>
        </div>
      </div>
    </div>
  </Section>
</template>
