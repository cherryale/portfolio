import type { EffectComposer } from 'postprocessing'
import * as Three from 'three'
import type { TextRenderer } from '~/layers/liquid/components/text-renderer'
import type LiquidDistortion from '~/layers/liquid/components/liquid-distortion'
import type { LiquidTexture } from '~/layers/liquid/components/liquid-texture'

export interface State {
  texture: LiquidTexture | null
  animationFrameId: number | null
  renderer: Three.WebGLRenderer | null
  camera: Three.PerspectiveCamera | null
  scene: Three.Scene | null
  composer: EffectComposer | null
  clock: Three.Clock | null
  distortion: LiquidDistortion | null
  canvasTexture: Three.CanvasTexture | null
  textRenderer: TextRenderer | null
}
