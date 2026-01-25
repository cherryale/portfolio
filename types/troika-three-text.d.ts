declare module 'troika-three-text' {
  import * as THREE from 'three'

  export class Text extends THREE.Mesh {
    text: string
    fontSize: number
    color: string | number
    maxWidth: number
    textAlign: 'left' | 'center' | 'right' | 'justify'
    anchorX: 'left' | 'center' | 'right' | number | string
    anchorY: 'top' | 'top-baseline' | 'middle' | 'bottom-baseline' | 'bottom' | number | string
    font: string | null
    fontWeight: number | string
    sync(callback?: () => void): void
    dispose(): void
  }
}
