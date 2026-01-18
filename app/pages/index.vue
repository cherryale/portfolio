<script setup lang="ts">
import SocialLink from '~/components/social-link/social-link.vue'
import Dribbble from '~/components/svg/dribbble.vue'
import Github from '~/components/svg/github.vue'
import Linkedin from '~/components/svg/linkedin.vue'

definePageMeta({
  layout: 'default',
})
</script>
<template>
  <div class="flex flex-col gap-10 min-h-screen items-center justify-center">
    <div class="max-w-xs text-center text-2xl">
      <img
        src="../assets/images/svg/logo.svg"
        width="94"
        height="86"
        alt="Logo"
        class="mx-auto"
      />
      <p class="mt-10">Hello, there 👋</p>
      <br />
      <p>
        I am Ale, a web developer & UI designer based out of Amsterdam. I strive
        to create digital experiences that more human and accessible.
      </p>
      <br />
      <p>
        I am currently re-designing my portfolio, but if you'd like to
        collaborate or simply want to say hello, shoot me an
        <NuxtLink href="mailto:apizzoccheri@protonmail.com">email</NuxtLink>.
      </p>
      <div class="flex gap-5 mt-10 justify-center">
        <SocialLink href="https://github.com/alecherryy" text="Github">
          <template #icon>
            <Github />
          </template>
        </SocialLink>
        <SocialLink
          href="https://www.linkedin.com/in/alessiapizzoccheri"
          text="LinkedIn"
        >
          <template #icon>
            <Linkedin />
          </template>
        </SocialLink>
        <SocialLink href="https://dribbble.com/alecherryy" text="Dribbble">
          <template #icon>
            <Dribbble />
          </template>
        </SocialLink>
      </div>
    </div>
  </div>
</template>
