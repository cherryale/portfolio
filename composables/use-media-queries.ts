import { computed, onMounted, ref } from 'vue'

export const useMediaQueries = () => {
  const width = ref(0)

  const updateWidth = () => {
    width.value = window.innerWidth
  }

  onMounted(() => {
    updateWidth() // initial check
    window.addEventListener('resize', updateWidth)
  })

  onUnmounted(() => {
    window.removeEventListener('resize', updateWidth)
  })

  const isMobile = computed(() => width.value < 1150)
  const isDesktop = computed(() => width.value >= 1150)

  return {
    isMobile,
    isDesktop,
  }
}
