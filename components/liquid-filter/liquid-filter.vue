<script setup lang="ts">
import gsap from 'gsap'

const props = withDefaults(
  defineProps<{
    id: string
    scale?: number
    duration?: number
  }>(),
  {
    scale: 12,
    duration: 10,
  }
)

const turbulence = ref<SVGFETurbulenceElement | null>(null)
let flowTween: gsap.core.Tween | null = null

onMounted(() => {
  if (!turbulence.value) return
  flowTween = gsap.fromTo(
    turbulence.value,
    { attr: { baseFrequency: '0 0' } },
    {
      attr: { baseFrequency: '0.012 0.008' },
      duration: props.duration,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true,
    }
  )
})

onUnmounted(() => {
  flowTween?.kill()
})
</script>

<template>
  <svg
    aria-hidden="true"
    style="position: absolute; width: 0; height: 0; overflow: hidden"
  >
    <defs>
      <filter
        :id="id"
        x="-20%"
        y="-20%"
        width="140%"
        height="140%"
        color-interpolation-filters="linearRGB"
      >
        <feTurbulence
          ref="turbulence"
          type="fractalNoise"
          baseFrequency="0 0"
          numOctaves="8"
          seed="5"
          result="turbulence"
        />
        <feGaussianBlur in="turbulence" stdDeviation="20" result="smoothed" />
        <feGaussianBlur
          in="SourceGraphic"
          stdDeviation="2"
          result="preblurred"
        />
        <feDisplacementMap
          in="SourceGraphic"
          in2="smoothed"
          :scale="scale"
          xChannelSelector="R"
          yChannelSelector="G"
        />
      </filter>
    </defs>
  </svg>
</template>
