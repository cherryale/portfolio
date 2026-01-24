<script setup lang="ts">
import Container from '~/components/container/container.vue'
import ContactMe from '~/components/contact-me/contact-me.vue'
import { SOCIAL_LINKS } from '~/lib/constants'
</script>

<template>
  <div class="bg-cherry-400 py-6">
    <Container>
      <div class="flex items-center justify-between gap-5">
        <ContactMe
          :size="'default'"
          :text="'Get in touch'"
          :colors="{
            slash: 'var(--color-cherry-300)',
            arrow: 'var(--color-cherry-500)',
            text: 'text-cherry-100',
          }"
        />
        <ul class="flex flex-col md:flex-row gap-5">
          <li v-for="item in SOCIAL_LINKS" :key="item.title">
            <NuxtLink
              :href="item.url"
              target="_blank"
              :title="item.title"
              class="text-cherry-300"
            >
              <component :is="item.icon" />
            </NuxtLink>
          </li>
        </ul>
      </div>
    </Container>
  </div>
</template>
