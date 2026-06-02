<script setup lang="ts">
import Section from '~/components/section/section.vue'
import Project from '~/components/project/project.vue'
import gsap from 'gsap'
import SectionTitle from '~/components/section-title/section-title.vue'

const { tm, rt } = useI18n()
const all = (tm('projects') as []).map((p: any) => ({
  name: rt(p.name),
  description: rt(p.description),
  stack: rt(p.stack),
  image: rt(p.image),
  url: rt(p.url),
}))

const mid = Math.ceil(all.length / 2)
const rtl = [...all.slice(0, mid), ...all.slice(0, mid)]
const ltr = [...all.slice(mid), ...all.slice(mid)]

const track = ref<HTMLElement | null>(null)
const track2 = ref<HTMLElement | null>(null)
let tween: gsap.core.Tween
let tween2: gsap.core.Tween

const { isAnimationComplete } = useLoader()

const section = ref<{ el: HTMLElement | null } | null>(null)
const animate = () => {
  if (section.value?.el) {
    gsap.fromTo(
      section.value.el,
      { opacity: 0, y: '50%' },
      {
        opacity: 1,
        y: '0%',
        duration: 0.5,
        ease: 'power3.out',
      }
    )
  }
}

watch(isAnimationComplete, (done) => {
  if (done) {
    animate()
  }
})

onMounted(() => {
  const el = track.value!
  const halfWidth = el.scrollWidth / 2
  tween = gsap.to(el, {
    x: -halfWidth,
    duration: 80,
    ease: 'none',
    repeat: -1,
  })

  if (track2.value) {
    const el2 = track2.value
    const halfWidth2 = el2.scrollWidth / 2
    tween2 = gsap.fromTo(
      el2,
      { x: -halfWidth2 },
      { x: 0, duration: 80, ease: 'none', repeat: -1 }
    )
  }
})

onUnmounted(() => {
  tween?.kill()
  tween2?.kill()
})
</script>

<template>
  <Section
    ref="section"
    class="bg-white rounded-t-4xl z-1 mt-[-20px] md:mt-[-40px] opacity-0 translate-y-[50%]"
  >
    <div>
      <Container>
        <SectionTitle
          :eyebrow="'Design & Development'"
          :title="'Selected work'"
        />
      </Container>
      <div class="overflow-hidden -mt-4">
        <div class="w-full">
          <div ref="track" class="flex w-max gap-5">
            <Project v-for="p in rtl" v-bind="p" filter-id="project-liquid" />
            <Project v-for="p in rtl" v-bind="p" filter-id="project-liquid" />
          </div>
        </div>
        <div v-if="ltr.length" class="w-full mt-10">
          <div ref="track2" class="flex w-max gap-5">
            <Project v-for="p in ltr" v-bind="p" filter-id="project-liquid" />
            <Project v-for="p in ltr" v-bind="p" filter-id="project-liquid" />
          </div>
        </div>
      </div>
    </div>
  </Section>
</template>
