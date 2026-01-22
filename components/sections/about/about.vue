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
  'Design',
  'Figma',
]
</script>

<template>
  <Section :bg-color="'bg-cherry-300'">
    <Content
      :title="'Work Experience & Education'"
      :title-color="'text-cherry-400'"
    >
      <Experience :items="WORK_EXPERIENCE" />
      <Experience :items="EDUCATION" :class-name="'mt-30'" />
    </Content>
    <Content :title="'Tech Stakc & Skills'" :title-color="'text-cherry-400'">
      <Pills :items="SKILLS" />
    </Content>
  </Section>
</template>
