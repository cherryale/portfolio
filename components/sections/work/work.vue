<script setup lang="ts">
import SocialLink from '~/components/social-link/social-link.vue'
import Section from '~/components/section/section.vue'
import { PROJECTS, SOCIAL_LINKS } from '~/lib/constants'
</script>

<template>
  <Section
    :title="'My career so far'"
    :bg-color="'bg-cherry-200'"
    :title-color="'text-cherry-400 pt-20'"
  >
    <div class="max-w-xs">
      <p class="mb-4">
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
  </Section>
  <Section
    :title="'Selected work'"
    :bg-color="'bg-cherry-200'"
    :title-color="'text-cherry-400'"
  >
    <div class="pt-10">
      <ul class="grid grid-cols-2 gap-2">
        <li v-for="item in PROJECTS" :key="item.title">
          <NuxtLink :href="item.url" target="_blank">
            <img :src="item.image" :alt="item.title" />
          </NuxtLink>
        </li>
      </ul>
    </div>
  </Section>
  <Section
    :title="'Do you want to collaborate?'"
    :bg-color="'bg-cherry-200'"
    :title-color="'text-cherry-400'"
  >
    <p class="max-w-xs">
      Lorem ipsum dolor sit amet, an possit molestie pri, nec everti alterum
      necessitatibus ad. Id quas magna vis.
    </p>
  </Section>
</template>
