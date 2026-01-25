import { computed } from 'vue'
import { useWindowSize } from './use-get-window-size'

export const useMediaQueries = () => {
  const { width } = useWindowSize()

  const isMobile = computed(() => width.value < 1150)
  const isDesktop = computed(() => width.value >= 1150)

  return {
    isMobile,
    isDesktop,
  }
}
