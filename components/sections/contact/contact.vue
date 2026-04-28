<script setup lang="ts">
import Container from '~/components/container/container.vue'
import ContactMe from '~/components/contact-me/contact-me.vue'
import { SOCIAL_LINKS } from '~/lib/constants'
</script>

<template>
  <div class="bg-accent pb-6">
    <div class="bg-white rounded-b-4xl h-10 mb-10" />
    <Container>
      <div class="flex items-end justify-between gap-5">
        <div>
          <h3 class="text-base mb-3">Want to collaborate?</h3>
          <p class="max-w-2xs text-sm mb-5">
            Whether you're looking to start on a new project, need ongoing
            support or simply want to say hi, you can reach out.
          </p>
          <ContactMe
            :size="'default'"
            :text="'Say hello'"
            :colors="{
              slash: 'var(--color-cherry-40)',
              arrow: 'var(--color-cherry)',
              text: 'text-white',
            }"
          />
        </div>
        <ul class="flex flex-col md:flex-row gap-5">
          <li v-for="item in SOCIAL_LINKS" :key="item.title">
            <NuxtLink
              :href="item.url"
              target="_blank"
              :title="item.title"
              class="text-white"
            >
              <component :is="item.icon" />
            </NuxtLink>
          </li>
        </ul>
      </div>
    </Container>
  </div>
</template>
