import * as THREE from 'three'
import { Text } from 'troika-three-text'

export interface TextConfig {
  text: string
  color: string
  position?: { x: number; y: number; z: number }
  // maxWidth?: number
  textAlign?: 'left' | 'center' | 'right'
  anchorX?: 'left' | 'center' | 'right'
  anchorY?: 'top' | 'middle' | 'bottom'
}

const test = {
  fontSize: 3,
  fontWeight: 700,
  lineHeight: 1,
  font: '/assets/fonts/LexendDeca-Bold.ttf',
}
export class TextRenderer {
  scene: THREE.Scene
  textMeshes: Text[] = []

  constructor(scene: THREE.Scene) {
    this.scene = scene
  }

  createText(config: TextConfig): Text {
    const textMesh = new Text()
    textMesh.text = config.text
    textMesh.font = test.font
    // textMesh.lineHeight = test.lineHeight
    textMesh.fontSize = test.fontSize
    textMesh.color = config.color || '#ffffff'
    // textMesh.maxWidth = config.maxWidth || 20
    textMesh.textAlign = config.textAlign || 'left'
    textMesh.anchorX = config.anchorX || 'left'
    textMesh.anchorY = config.anchorY || 'middle'

    if (config.position) {
      textMesh.position.set(
        config.position.x,
        config.position.y,
        config.position.z
      )
    }

    textMesh.sync()
    this.scene.add(textMesh)
    this.textMeshes.push(textMesh)

    return textMesh
  }

  dispose() {
    this.textMeshes.forEach((mesh) => {
      this.scene.remove(mesh)
      mesh.dispose()
    })
    this.textMeshes = []
  }
}
