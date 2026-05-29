<script setup lang="ts">
import Pills from '~/components/pills/pills.vue'
import Section from '~/components/section/section.vue'
import Content from '~/components/content/content.vue'
import Experience from '~/components/experience/experience.vue'
import { EDUCATION, WORK_EXPERIENCE } from '~/lib/constants'

const SKILLS: { value: string; highlighted: boolean }[] = [
  { value: 'React', highlighted: true },
  { value: 'Typescript', highlighted: true },
  { value: 'Javascript', highlighted: true },
  { value: 'Vue', highlighted: false },
  { value: 'HTML/CSS', highlighted: true },
  { value: 'GraphQL/RestAPI', highlighted: true },
  { value: 'Next.js', highlighted: true },
  { value: 'Sanity CMS', highlighted: true },
  { value: 'Wordpress', highlighted: false },
  { value: 'Shopify', highlighted: false },
  { value: 'Web Design', highlighted: false },
  { value: 'Figma', highlighted: true },
]
</script>

<template>
  <Section class="bg-white">
    <Container>
      <div class="text-4xl lg:text-5xl lg:pl-20 relative z-1">
        <p class="eyebrow text-accent">About me</p>
        <h2 class="text-accent-dark">Tech stack & Skills</h2>
      </div>
      <Pills :items="SKILLS" />
    </Container>
    <Container>
      <h2
        class="text-4xl lg:text-5xl font-bold lg:pl-20 relative z-1 text-accent-dark"
      >
        Work Experience & Education
      </h2>
      <div class="-mt-2 relative z-2">
        <Experience highlighted :items="WORK_EXPERIENCE" />
        <Experience :items="EDUCATION" :class-name="'mt-30'" />
      </div>
    </Container>
  </Section>
</template>
