<script setup lang="ts">
import Container from '~/components/container/container.vue'
import SocialLink from '~/components/social-link/social-link.vue'
import Github from '~/components/svg/icons/github.vue'
import LinkedIn from '~/components/svg/icons/linkedin.vue'
import Dribbble from '~/components/svg/icons/dribbble.vue'
import Pills from '~/components/pills/pills.vue'
import Section from '~/components/section/section.vue'

const SOCIAL_LINKS = [
  {
    title: 'GitHub',
    url: 'https://github.com/alecherryy',
    icon: Github,
  },
  {
    title: 'LinkedIn',
    url: 'https://www.linkedin.com/in/alessiapizzoccheri/',
    icon: LinkedIn,
  },
  {
    title: 'Dribbble',
    url: 'https://dribbble.com/alecherryy',
    icon: Dribbble,
  },
]

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
  <Section
    :bg-color="'bg-cherry-300'"
    :title="'Tech Stakc & Skills'"
    :title-color="'text-cherry-400'"
  >
    <Pills :items="SKILLS" />
  </Section>
</template>
