<script setup lang="ts">
import SocialLink from '~/components/social-link/social-link.vue'
import Section from '~/components/section/section.vue'
import { PROJECTS, SOCIAL_LINKS } from '~/lib/constants'
import ContactMe from '~/components/contact-me/contact-me.vue'
import Content from '~/components/content/content.vue'
</script>

<template>
  <Section :bg-color="'bg-cherry-200'">
    <Content :title="'My career so far'" :title-color="'text-cherry-400'">
      <template #description>
        <p>
          Lorem ipsum dolor sit amet, an possit molestie pri, nec everti alterum
          necessitatibus ad. Id quas magna vis, zril vocibus liberavisse vix ut,
          in mundi commodo dolorem duo. Qui ne fugit definiebas. Nec cu alia
          iuvaret feugait. Ferri deseruisse eu his, vim an virtute instructior.
        </p>
        <p>
          Copiosae eleifend splendide an mea. Pri errem iudico at, nihil
          abhorreant dissentiunt at vix. Per nulla lucilius cu, cu justo labitur
          per.
        </p>
      </template>
      <ul class="flex flex-col md:flex-row gap-5 mt-10">
        <li v-for="item in SOCIAL_LINKS" :key="item.title">
          <SocialLink :text="item.title" :href="item.url">
            <template #icon>
              <component :is="item.icon" />
            </template>
          </SocialLink>
        </li>
      </ul>
    </Content>
    <Content :title="'Selected work'" :title-color="'text-cherry-400'">
      <ul class="grid grid-cols-2 gap-2 pt-10">
        <li v-for="item in PROJECTS" :key="item.title">
          <NuxtLink :href="item.url" target="_blank">
            <img :src="item.image" :alt="item.title" />
          </NuxtLink>
        </li>
      </ul>
    </Content>
    <Content
      :title="'Do you want to collaborate?'"
      :title-color="'text-cherry-400'"
    >
      <template #description>
        <p>
          Lorem ipsum dolor sit amet, an possit molestie pri, nec everti alterum
          necessitatibus ad. Id quas magna vis.
        </p>
      </template>
      <ContactMe
        :size="'default'"
        :text="'Get in touch'"
        :colors="{
          slash: 'var(--color-cherry-300)',
          text: 'text-accent',
          arrow: 'var(--color-cherry-500)',
        }"
      />
    </Content>
  </Section>
</template>
