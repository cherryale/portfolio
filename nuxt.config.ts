export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxt/image'],
  srcDir: 'app/',
  dir: {
    public: '../public',
  },
  app: {
    head: {
      title: 'CHERRY ALE | Web Developer & UI Designer',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content:
            'Web developer & UI designer based in Amsterdam passionate about creating digital experiences that are more human and accessible.',
        },
        { name: 'author', content: 'Cherry Ale' },
        {
          property: 'og:title',
          content: 'CHERRY ALE',
        },
        {
          property: 'og:description',
          content: 'Web developer & UI designer based out of Amsterdam.',
        },
        { property: 'og:type', content: 'website' },
        { property: 'og:image', content: '/og-image.png' },
        { name: 'twitter:card', content: 'summary_large_image' },
        {
          name: 'twitter:title',
          content: 'CHERRY ALE',
        },
        {
          name: 'twitter:description',
          content: 'Web developer & UI designer.',
        },
        { name: 'twitter:image', content: '/og-image.png' },
      ],
      link: [
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '32x32',
          href: '/favicon.png',
        },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/favicon.png' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Albert+Sans:wght@400;600;700&display=swap',
        },
      ],
    },
  },
  components: [
    {
      path: '~/components',
      pathPrefix: false,
    },
  ],
  css: ['~/assets/css/globals.css'],
  postcss: {
    plugins: {
      '@tailwindcss/postcss': {},
    },
  },
  routeRules: {
    // prerender index route by default
    '/': { prerender: true },
  },
})
