<script setup lang="ts">
import gsap from 'gsap'

const content = ref<HTMLElement | null>(null)
const loader = ref<HTMLElement | null>(null)
const { onAnimationComplete } = useLoader()

onMounted(() => {
  document.documentElement.style.overflow = 'hidden'

  if (content.value) {
    gsap.fromTo(
      content.value.children,
      { opacity: 0 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
        stagger: 0.25,
        delay: 0.5,
      }
    )
  }

  if (loader.value && content.value) {
    gsap.to(content.value.children, {
      duration: 1,
      delay: 3,
      ease: 'power3.out',
      opacity: 0,
      y: '-100%',
    })

    gsap.to(loader.value, {
      duration: 1,
      delay: 3.5,
      ease: 'power3.out',
      height: 0,
      onComplete: () => {
        document.documentElement.style.overflow = ''
        onAnimationComplete()
      },
    })
  }
})
</script>

<template>
  <div
    ref="loader"
    class="fixed top-0 right-0 z-5 h-screen w-screen bg-accent flex items-center justify-center overflow-hidden"
  >
    <LiquidFilter id="loader-liquid" :scale="12" :duration="5" />
    <div
      ref="content"
      class="flex items-center justify-center flex-col"
      style="filter: url(#loader-liquid)"
    >
      <figure class="opacity-0 translate-y-[50%]">
        <NuxtImg
          src="/assets/images/logo-dark.svg"
          width="60"
          height="55"
          alt="Logo"
        />
      </figure>
      <div
        class="inline-flex items-center gap-2 text-base mt-5 opacity-0 translate-y-[50%]"
      >
        <p class="eyebrow !text-base !text-white font-medium">Cherry Ale</p>
        <span class="h-4 w-[2px] rounded-sm bg-accent-dark" />
        <p class="text-white/80">Hello, there</p>
      </div>
    </div>
  </div>
</template>
