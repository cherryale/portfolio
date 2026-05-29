import * as THREE from 'three'
import { Text } from 'troika-three-text'
import { getCSSVariables } from '~/layers/liquid/lib/helpers'
import type {
  BaseTextConfig,
  InlineLayoutConfig,
  InlineRun,
  TextConfig,
} from '~/layers/liquid/types/text'

const defaults: BaseTextConfig = {
  fontSize: 5,
  fontWeight: 700,
  lineHeight: 1.05,
  font: '/assets/fonts/LexendDeca-Bold.ttf',
  anchorX: 'left',
  anchorY: 'middle',
}

// ✅ theme-aware default color resolver
const resolveDefaultColor = (): string => {
  const value = getCSSVariables('--color-cherry')
  return value || '#831c2e'
}

function syncText(mesh: Text): Promise<void> {
  return new Promise((resolve) => mesh.sync(resolve))
}

function getTextWidth(mesh: Text): number {
  const info: any = (mesh as any).textRenderInfo
  if (info?.blockBounds) {
    const [minX, , maxX] = info.blockBounds
    return maxX - minX
  }

  mesh.geometry?.computeBoundingBox?.()
  const bb = mesh.geometry?.boundingBox
  return bb ? bb.max.x - bb.min.x : 0
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
    textMesh.font = defaults.font
    textMesh.fontSize = defaults.fontSize
    textMesh.color = config.color ?? resolveDefaultColor()
    textMesh.textAlign = config.textAlign ?? 'left'
    textMesh.anchorX = defaults.anchorX ?? 'left'
    textMesh.anchorY = defaults.anchorY ?? 'middle'

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

  async createTextAsync(config: TextConfig): Promise<Text> {
    const mesh = this.createText(config)
    await syncText(mesh)
    return mesh
  }

  async createInlineText(
    runs: InlineRun[],
    layout: InlineLayoutConfig
  ): Promise<Text[]> {
    const fontUrl = defaults.font
    const fontSize = layout.fontSize ?? defaults.fontSize
    const lineHeight = layout.lineHeight ?? defaults.lineHeight

    const { x: startX, y: startY, z } = layout.position

    let xCursor = 0
    let yCursor = 0

    let lineMeshes: Text[] = []
    let lineAlign: 'left' | 'center' | 'right' = 'left'
    let lineIndent = 0

    const created: Text[] = []

    const finalizeLine = () => {
      if (!lineMeshes.length) return

      const lineWidth = lineIndent + xCursor

      let shiftX = 0
      if (lineAlign === 'right') {
        shiftX = layout.maxWidth - lineWidth
      } else if (lineAlign === 'center') {
        shiftX = (layout.maxWidth - lineWidth) / 2
      }

      if (shiftX !== 0) {
        for (const mesh of lineMeshes) {
          mesh.position.x += shiftX
        }
      }

      lineMeshes = []
      xCursor = 0
      lineAlign = 'left'
      lineIndent = 0
    }

    const newLine = () => {
      finalizeLine()
      yCursor += fontSize * lineHeight
    }

    for (const run of runs) {
      const parts = run.text.split('\n')

      for (let i = 0; i < parts.length; i++) {
        const chunk = parts[i]

        if (chunk.length > 0) {
          // Split into word tokens; leading space is kept with the following word
          // so inter-run spacing (e.g. ' senior') is preserved.
          const tokens = chunk.match(/\s*\S+/g) ?? [chunk]

          for (const token of tokens) {
            if (lineMeshes.length === 0) {
              lineAlign = run.textAlign ?? 'left'
              lineIndent = run.indent ?? 0
            }

            // Strip leading whitespace when placing at the start of a line
            const displayText = xCursor === 0 ? token.trimStart() : token
            if (!displayText) continue

            const mesh = new Text()
            mesh.text = displayText
            mesh.font = fontUrl
            mesh.fontSize = fontSize
            mesh.color = run.color ?? resolveDefaultColor()
            mesh.textAlign = 'left'
            mesh.anchorX = 'left'
            mesh.anchorY = 'top'
            ;(mesh as any).lineHeight = lineHeight

            if (layout.letterSpacing != null) {
              ;(mesh as any).letterSpacing = layout.letterSpacing
            }

            mesh.position.set(startX + lineIndent + xCursor, startY - yCursor, z)

            this.scene.add(mesh)
            this.textMeshes.push(mesh)
            created.push(mesh)
            lineMeshes.push(mesh)

            await syncText(mesh)

            const w = getTextWidth(mesh)
            const available = layout.maxWidth - lineIndent

            if (xCursor > 0 && xCursor + w > available) {
              newLine()

              lineAlign = run.textAlign ?? 'left'
              lineIndent = run.indent ?? 0

              // Strip leading space on the wrapped word
              const wrappedText = token.trimStart()
              if (wrappedText !== displayText) mesh.text = wrappedText

              mesh.position.set(startX + lineIndent, startY - yCursor, z)
              await syncText(mesh)

              xCursor = getTextWidth(mesh)
              lineMeshes.push(mesh)
            } else {
              xCursor += w
            }
          }
        }

        if (i < parts.length - 1) {
          newLine()
        }
      }
    }

    finalizeLine()

    // Shift the whole block so its visual center lands at layout.centerX
    if (layout.centerX !== undefined && created.length > 0) {
      let minX = Infinity
      let maxX = -Infinity
      for (const mesh of created) {
        minX = Math.min(minX, mesh.position.x)
        maxX = Math.max(maxX, mesh.position.x + getTextWidth(mesh))
      }
      const shift = layout.centerX - (minX + maxX) / 2
      if (Math.abs(shift) > 0.01) {
        for (const mesh of created) {
          mesh.position.x += shift
        }
      }
    }

    return created
  }

  dispose() {
    this.clear()
  }

  clear() {
    // remove & dispose only the text meshes this renderer created
    this.textMeshes.forEach((mesh) => {
      this.scene.remove(mesh)
      mesh.dispose()
    })
    this.textMeshes = []
  }
}
