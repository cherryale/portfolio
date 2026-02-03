<script setup lang="ts">
import SocialLink from '~/components/social-link/social-link.vue'
import Section from '~/components/section/section.vue'
import { PROJECTS, SOCIAL_LINKS } from '~/lib/constants'
import ContactMe from '~/components/contact-me/contact-me.vue'
import Content from '~/components/content/content.vue'
</script>

<template>
  <Section class="bg-hero-background">
    <Container class="text-4xl lg:text-5xl font-bold">
      <div class="lg:pl-10">
        <p>
          Hello, I am <span class="text-accent">Ale</span>. I am a senior
          developer with over 7 years of experience building
          <span class="text-accent">web applications & digital products</span>.
        </p>
        <p class="indent-20 lg:indent-40">
          I have worked on a variety of projects for small and large brands and
          organizations. I strive to create
          <span class="text-accent">modern & intuitive products</span> tailored
          to each client's need.
        </p>
        <ul class="flex flex-col md:flex-row gap-5 mt-10">
          <li v-for="item in SOCIAL_LINKS" :key="item.title">
            <SocialLink :text="item.title" :href="item.url">
              <template #icon>
                <component :is="item.icon" />
              </template>
            </SocialLink>
          </li>
        </ul>
      </div>
    </Container>
  </Section>
  <Section class="bg-hero-background">
    <Content :title="'Selected work'">
      <ul class="grid grid-cols-2 gap-2 pt-10">
        <li v-for="item in PROJECTS" :key="item.title">
          <NuxtLink :href="item.url" target="_blank">
            <img :src="item.image" :alt="item.title" />
          </NuxtLink>
        </li>
      </ul>
    </Content>
    <Content :title="'Do you want to collaborate?'">
      <template #description>
        <p class="max-w-xs">
          I am available for new opportunity // Whether you're looking to build
          a new website, give your brand a new look or need on-going support, I
          am here to help! Let's chat.
        </p>
      </template>
      <ContactMe
        :size="'default'"
        :text="'Get in touch'"
        :colors="{
          slash: 'var(--color-cherry-20)',
          text: 'text-accent-dark',
          arrow: 'var(--color-cherry-70)',
        }"
      />
    </Content>
  </Section>
</template>
