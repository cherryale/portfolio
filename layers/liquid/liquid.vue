<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import * as Three from 'three'
import { EffectComposer, RenderPass, EffectPass } from 'postprocessing'
import { TextRenderer } from '~/layers/liquid/classes/text-renderer'
import classNames from 'classnames'
import { getCSSVariables } from '~/layers/liquid/lib/helpers'
import { LiquidTexture } from '~/layers/liquid/classes/liquid-texture'
import LiquidDistortion from '~/layers/liquid/classes/liquid-distortion'

interface LiquidState {
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

interface ThemeState {
  observer: MutationObserver | null
  signature: string
}

const containerRef = ref<HTMLDivElement | null>(null)
const state: LiquidState = {
  texture: null,
  animationFrameId: null,
  renderer: null,
  camera: null,
  scene: null,
  composer: null,
  clock: null,
  distortion: null,
  canvasTexture: null,
  textRenderer: null,
}

// --- Theme observer state ---
const theme: ThemeState = {
  observer: null,
  signature: '',
}

// ✅ Track all CSS vars that affect your canvas/text colors
const getThemeSignature = () => {
  const bg = getCSSVariables('--color-cherry-100')
  const text = getCSSVariables('--color-cherry-500')
  return `${bg}|${text}`
}

const onMouseMove = (e: MouseEvent) => {
  if (state.texture && containerRef.value) {
    const rect = containerRef.value.getBoundingClientRect()
    const point = {
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
      age: 0,
      force: 0,
      vx: 0,
      vy: 0,
    }
    state.texture.addPoint(point)
  }
}

// ✅ Text layout
const addTextToScene = async () => {
  if (state.scene && state.camera) {
    const { scene, camera } = state

    // IMPORTANT when re-rendering on theme change:
    state.textRenderer?.dispose()
    state.textRenderer = new TextRenderer(scene)

    const z = 1
    const distance = camera.position.z - z
    const vFov = (camera.fov * Math.PI) / 180
    const padding = 3 // world units

    const viewHeight = 2 * Math.tan(vFov / 2) * distance
    const viewWidth = viewHeight * camera.aspect
    const usableWidth = viewWidth - padding * 2
    const usableHeight = viewHeight - padding * 2

    const marginX = 1
    const marginY = 1

    await state.textRenderer.createInlineText(
      [
        { text: 'I am a' },
        {
          text: ' something professional',
          color: getCSSVariables('--color-accent'),
        },
        { text: ' &\n' },
        { text: 'a casual ' },
        { text: ' something else', color: getCSSVariables('--color-accent') },
        { text: '.\n' },
        { text: 'I do interesting things that are\n', indent: 11 },
        { text: 'interesting', color: getCSSVariables('--color-accent') },
        { text: ' and' },
        { text: ' funny', color: getCSSVariables('--color-accent') },
        { text: '.\n\n' },
        { text: 'I am passionate about\n', indent: 11 },
        { text: 'amazing things', color: getCSSVariables('--color-accent') },
        { text: ',\n' },
        {
          text: 'accessibility',
          color: getCSSVariables('--color-accent'),
          textAlign: 'right',
        },
        { text: ' and\n', textAlign: 'right' },
        {
          text: 'some other tech stuff',
          color: getCSSVariables('--color-accent'),
          textAlign: 'right',
        },
        { text: '.' },
      ],
      {
        position: {
          x: -usableWidth / 2 + marginX,
          y: usableHeight / 2 - marginY,
          z,
        },
        maxWidth: usableWidth - marginX * 2,
      }
    )
  }
}

const initComposer = () => {
  const { renderer, scene, camera, texture } = state
  if (renderer && scene && camera && texture && texture.canvas) {
    state.composer = new EffectComposer(renderer)
    const renderPass = new RenderPass(scene, camera)

    state.canvasTexture = new Three.CanvasTexture(texture.canvas)
    state.canvasTexture.needsUpdate = true

    state.distortion = new LiquidDistortion(state.canvasTexture)

    const waterPass = new EffectPass(camera, state.distortion)

    renderPass.renderToScreen = false
    waterPass.renderToScreen = true

    state.composer.addPass(renderPass)
    state.composer.addPass(waterPass)
  }
}

const render = () => {
  if (state.composer && state.clock) {
    state.composer.render(state.clock.getDelta())
  }
}

// --- Theme re-render (MutationObserver solution) ---
const rerenderTheme = async () => {
  if (!state.scene || !state.renderer) {
    return
  }

  // keep canvas transparent
  state.renderer.setClearColor(0x000000, 0)

  // Rebuild text so colors update
  await addTextToScene()

  // Force a frame
  if (state.composer && state.clock) {
    state.composer.render(state.clock.getDelta())
  } else if (state.camera) {
    state.renderer.render(state.scene, state.camera)
  }
}

const tick = () => {
  render()
  if (state.texture) {
    state.texture.update()
  }
  if (state.canvasTexture) {
    state.canvasTexture.needsUpdate = true
  }
  state.animationFrameId = requestAnimationFrame(tick)
}

onMounted(async () => {
  if (containerRef.value) {
    const rect = containerRef.value.getBoundingClientRect()

    state.texture = new LiquidTexture({ debug: false })
    state.scene = new Three.Scene()

    state.renderer = new Three.WebGLRenderer({
      antialias: false,
      alpha: true,
    })
    state.renderer.setClearColor(0x000000, 0)
    state.renderer.setSize(rect.width, rect.height)
    state.renderer.setPixelRatio(window.devicePixelRatio)
    state.renderer.domElement.style.height = '100%'
    state.renderer.domElement.style.width = '100%'
    state.renderer.domElement.style.zIndex = '1'
    state.renderer.domElement.style.pointerEvents = 'none'
    containerRef.value.appendChild(state.renderer.domElement)

    state.camera = new Three.PerspectiveCamera(
      45,
      rect.width / rect.height,
      0.1,
      10000
    )
    state.camera.position.z = 50

    state.clock = new Three.Clock()

    await addTextToScene()
    initComposer()

    // --- Theme observer setup ---
    theme.signature = getThemeSignature()
    await rerenderTheme()

    theme.observer = new MutationObserver(() =>
      requestAnimationFrame(() => {
        const nextSig = getThemeSignature()
        if (nextSig !== theme.signature) {
          theme.signature = nextSig
          rerenderTheme()
        }
      })
    )

    // Observe both <html> and <body> (covers most theme implementations)
    theme.observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class', 'style', 'data-theme'],
    })

    if (document.body) {
      theme.observer.observe(document.body, {
        attributes: true,
        attributeFilter: ['class', 'style', 'data-theme'],
      })
    }

    containerRef.value.addEventListener('mousemove', onMouseMove)
  }
  tick()
})

onUnmounted(() => {
  theme.observer?.disconnect()
  theme.observer = null

  if (containerRef.value) {
    containerRef.value.removeEventListener('mousemove', onMouseMove)
  }
  if (state.animationFrameId !== null) {
    cancelAnimationFrame(state.animationFrameId)
  }

  state.textRenderer?.dispose()
  if (state.composer) {
    state.composer.dispose()
  }
  if (state.scene) {
    state.scene.traverse((object: Three.Object3D) => {
      if (object instanceof Three.Mesh) {
        object.geometry?.dispose()
        if (object.material instanceof Three.Material) {
          object.material.dispose()
        }
      }
    })
  }
  if (state.renderer) {
    state.renderer.dispose()
  }
})
</script>

<template>
  <div
    ref="containerRef"
    :class="
      classNames(
        'flex items-center justify-center',
        'max-w-2xl w-full mx-auto',
        'relative min-h-[calc(100vh-10rem)]'
      )
    "
  />
</template>
