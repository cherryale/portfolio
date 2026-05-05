<script setup lang="ts">
import Pills from '~/components/pills/pills.vue'
import Section from '~/components/section/section.vue'
import Content from '~/components/content/content.vue'
import Experience from '~/components/experience/experience.vue'
import { EDUCATION, WORK_EXPERIENCE } from '~/lib/constants'

const SKILLS = [
  'React/Vue',
  'Typescript',
  'Javascript',
  'HTML/CSS',
  'GraphQL',
  'RestAPI',
  'Next.js',
  'Sanity CMS',
  'Wordpress',
  'Shopify',
  'Web Design',
  'Figma',
]
</script>

<template>
  <Section class="bg-white">
    <Container>
      <div class="text-4xl lg:text-5xl font-bold pl-20 relative z-1">
        <p class="eyebrow text-accent">About me</p>
        <h2>Tech stack & Skills</h2>
      </div>
      <Pills :items="SKILLS" />
    </Container>
    <Container>
      <h2 class="text-4xl lg:text-5xl font-bold pl-20 relative z-1">
        Work Experience & Education
      </h2>
      <div class="mt-[-10px] relative z-2">
        <Experience highlighted :items="WORK_EXPERIENCE" />
        <Experience :items="EDUCATION" :class-name="'mt-30'" />
      </div>
    </Container>
  </Section>
</template>
