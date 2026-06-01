<script setup lang="ts">
import gsap from 'gsap'

const content = ref<HTMLElement | null>(null)
const loader = ref<HTMLElement | null>(null)

onMounted(() => {
  document.documentElement.style.overflow = 'hidden'

  if (content.value) {
    gsap.fromTo(
      content.value.children,
      { opacity: 0 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power3.out',
        stagger: 0.25,
        delay: 0.5,
      }
    )
  }

  if (loader.value) {
    gsap.to(loader.value.children, {
      duration: 0.5,
      delay: 2.5,
      ease: 'power3.out',
      opacity: 0,
      y: '-50%',
    })

    gsap.to(loader.value, {
      duration: 0.5,
      delay: 3,
      ease: 'power3.out',
      height: 0,
      onComplete: () => {
        document.documentElement.style.overflow = ''
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
    <div ref="content" class="flex items-center justify-center flex-col">
      <figure class="opacity-0 -translate-y-[-50%]">
        <NuxtImg
          src="/assets/images/logo-dark.svg"
          width="60"
          height="55"
          alt="Logo"
        />
      </figure>
      <p
        class="uppercase text-base font-medium mt-5 text-white opacity-0 -translate-y-[-50%]"
      >
        Hello, there
      </p>
    </div>
  </div>
</template>
