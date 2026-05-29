import { ref, onMounted, onUnmounted } from 'vue'

export function useWindowSize() {
  const isClient = typeof window !== 'undefined'

  const width = ref(isClient ? window.innerWidth : 0)
  const height = ref(isClient ? window.innerHeight : 0)

  const update = () => {
    width.value = window.innerWidth
    height.value = window.innerHeight
  }

  onMounted(() => {
    update()
    window.addEventListener('resize', update)
  })

  onUnmounted(() => {
    window.removeEventListener('resize', update)
  })

  return {
    width,
    height,
  }
}
