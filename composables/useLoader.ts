export const useLoader = () => {
  const isAnimationComplete = useState('loader-done', () => false)

  const onAnimationComplete = () => {
    isAnimationComplete.value = true
  }

  return { isAnimationComplete, onAnimationComplete }
}
