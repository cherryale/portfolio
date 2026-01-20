<script setup lang="ts">
const { t, locale } = useI18n()

useHead({
  htmlAttrs: {
    lang: locale.value,
  },
  title: () => 'CHERRY ALE | ' + t('meta.title'),
  meta: [
    {
      name: 'description',
      content: () => t('meta.description'),
    },
    {
      property: 'og:title',
      content: () => t('meta.ogTitle'),
    },
    {
      property: 'og:description',
      content: () => t('meta.ogDescription'),
    },
    {
      property: 'og:locale',
      content: () =>
        locale.value === 'en'
          ? 'en_US'
          : locale.value === 'it'
            ? 'it_IT'
            : 'es_ES',
    },
  ],
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
