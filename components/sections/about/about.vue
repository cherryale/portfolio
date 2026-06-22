<script setup lang="ts">
import Pills from '~/components/pills/pills.vue'
import Section from '~/components/section/section.vue'
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
  <Section class="bg-background z-1">
    <Container>
      <SectionTitle :eyebrow="'About me'" :title="'Tech stack & skills'" />
      <Pills :items="SKILLS" />
    </Container>
    <Container>
      <SectionTitle :title="'Work Experience & Education'" />
      <div class="-mt-4 relative z-2">
        <Experience highlighted :items="WORK_EXPERIENCE" />
        <Experience :items="EDUCATION" :class-name="'mt-30'" />
      </div>
    </Container>
  </Section>
</template>
