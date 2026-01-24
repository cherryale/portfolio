import * as THREE from 'three'
import { Text } from 'troika-three-text'

export interface TextConfig {
  text: string
  color: string
  position?: { x: number; y: number; z: number }
  textAlign?: 'left' | 'center' | 'right'
  anchorX?: 'left' | 'center' | 'right'
  anchorY?: 'top' | 'middle' | 'bottom'
  // Optional per-text overrides:
  fontSize?: number
  fontUrl?: string
  lineHeight?: number
}

export type InlineRun = {
  text: string
  color?: string
  textAlign?: 'left' | 'center' | 'right'
  indent?: number // ✅ world units; applied only at start of a line
}

export interface InlineLayoutConfig {
  position: { x: number; y: number; z: number } // top-left start
  maxWidth: number // available width in world units
  fontSize?: number
  fontUrl?: string
  lineHeight?: number // multiplier, e.g. 1.05–1.25
  letterSpacing?: number // optional
}

const defaults = {
  fontSize: 3.5,
  fontWeight: 700,
  lineHeight: 1.05,
  color: '#831c2e',
  // Nuxt: MUST be in /public/fonts
  fontUrl: '/assets/fonts/LexendDeca-Bold.ttf',
}

function syncText(mesh: Text): Promise<void> {
  return new Promise((resolve) => mesh.sync(resolve))
}

function getTextWidth(mesh: Text): number {
  // Troika's computed bounds (best)
  const info: any = (mesh as any).textRenderInfo
  if (info?.blockBounds) {
    const [minX, , maxX] = info.blockBounds
    return maxX - minX
  }

  // Fallback: geometry bounds
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

  /**
   * Single text mesh (your existing API).
   * Note: sync is async internally; for layout measurement prefer createTextAsync().
   */
  createText(config: TextConfig): Text {
    const textMesh = new Text()

    textMesh.text = config.text
    textMesh.font = config.fontUrl ?? defaults.fontUrl
    textMesh.fontSize = config.fontSize ?? defaults.fontSize
    textMesh.color = config.color || defaults.color
    textMesh.textAlign = config.textAlign || 'left'
    textMesh.anchorX = config.anchorX || 'left'
    textMesh.anchorY = config.anchorY || 'middle'

    // Typings may not include these props, but Troika supports them:
    // ;(textMesh as any).lineHeight = config.lineHeight ?? defaults.lineHeight

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

  /**
   * Async version for when you need accurate bounds after sync.
   */
  async createTextAsync(config: TextConfig): Promise<Text> {
    const mesh = this.createText(config)
    await syncText(mesh)
    return mesh
  }

  /**
   * Inline text layout: multiple runs that flow left-to-right and wrap.
   * Uses multiple Text meshes so each run can have its own color.
   *
   * `position` is treated as TOP-LEFT of the text block.
   */
  async createInlineText(
    runs: InlineRun[],
    layout: InlineLayoutConfig
  ): Promise<Text[]> {
    const fontUrl = layout.fontUrl ?? defaults.fontUrl
    const fontSize = layout.fontSize ?? defaults.fontSize
    const lineHeight = layout.lineHeight ?? defaults.lineHeight

    const startX = layout.position.x
    const startY = layout.position.y
    const z = layout.position.z

    let xCursor = 0
    let yCursor = 0

    // Current line bookkeeping
    let lineMeshes: Text[] = []
    let lineAlign: 'left' | 'center' | 'right' = 'left'
    let lineIndent = 0 // ✅ world units

    const created: Text[] = []

    const finalizeLine = () => {
      if (!lineMeshes.length) return

      // Total width of the laid out line content (indent + run widths)
      const lineWidth = lineIndent + xCursor

      let shiftX = 0
      if (lineAlign === 'right') {
        shiftX = layout.maxWidth - lineWidth
      } else if (lineAlign === 'center') {
        shiftX = (layout.maxWidth - lineWidth) / 2
      }

      if (shiftX !== 0) {
        for (const m of lineMeshes) {
          m.position.x += shiftX
        }
      }

      // Reset for next line
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

        // If we're at the start of a line, capture that line's indent + alignment
        if (lineMeshes.length === 0) {
          lineAlign = run.textAlign ?? 'left'
          lineIndent = run.indent ?? 0
        }

        if (chunk.length > 0) {
          const mesh = new Text()
          mesh.text = chunk
          mesh.font = fontUrl
          mesh.fontSize = fontSize
          mesh.color = run.color ?? defaults.color

          // We always lay out left-to-right; we right/center align by shifting the whole line.
          mesh.textAlign = 'left'
          mesh.anchorX = 'left'
          mesh.anchorY = 'top'
          ;(mesh as any).lineHeight = lineHeight
          if (layout.letterSpacing != null) {
            ;(mesh as any).letterSpacing = layout.letterSpacing
          }

          // Place at start + indent + cursor
          mesh.position.set(startX + lineIndent + xCursor, startY - yCursor, z)

          this.scene.add(mesh)
          this.textMeshes.push(mesh)
          created.push(mesh)
          lineMeshes.push(mesh)

          await syncText(mesh)

          const w = getTextWidth(mesh)

          // Wrap based on available width for this line (maxWidth minus indent)
          const available = layout.maxWidth - lineIndent
          if (xCursor > 0 && xCursor + w > available) {
            // move this chunk to next line
            newLine()

            // new line may have different align/indent (based on THIS run)
            lineAlign = run.textAlign ?? 'left'
            lineIndent = run.indent ?? 0

            mesh.position.set(startX + lineIndent + 0, startY - yCursor, z)
            await syncText(mesh)
            xCursor = getTextWidth(mesh)
            lineMeshes.push(mesh)
          } else {
            xCursor += w
          }
        }

        // If there was a newline, force a new line
        if (i < parts.length - 1) {
          newLine()
        }
      }
    }

    // finalize last line
    finalizeLine()

    return created
  }

  dispose() {
    this.textMeshes.forEach((mesh) => {
      this.scene.remove(mesh)
      mesh.dispose()
    })
    this.textMeshes = []
  }
}
