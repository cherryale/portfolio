export const getCSSVariables = (variableName: string): string => {
  if (typeof window === 'undefined') {
    return ''
  }

  return getComputedStyle(document.documentElement)
    .getPropertyValue(variableName)
    .trim()
}
