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
let hadPoints = false
let resizeObserver: ResizeObserver | null = null
let resizeTimer: ReturnType<typeof setTimeout> | null = null

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
  const bg = getCSSVariables('--color-background')
  const text = getCSSVariables('--color-cherry')
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

    // Scale font size proportionally to the usable width.
    // 100 world-units is the reference width where the default size (5) was designed.
    const BASE_FONT_SIZE = 5
    const REFERENCE_WIDTH = 100
    const maxWidth = usableWidth - marginX * 2
    const fontSize = Math.max(
      2.5,
      BASE_FONT_SIZE * Math.min(1, maxWidth / REFERENCE_WIDTH)
    )

    await state.textRenderer.createInlineText(
      [
        { text: 'I am a' },
        {
          text: ' senior web developer',
          color: getCSSVariables('--color-accent'),
        },
        { text: ' &\n', color: getCSSVariables('--color-cherry') },
        {
          text: 'casual UI designer',
          color: getCSSVariables('--color-accent'),
        },
        { text: '.\n', color: getCSSVariables('--color-cherry') },
        {
          text: 'With over seven years of\n',
          textAlign: 'right',
        },
        {
          text: 'experience, I work at the intersection\n',
        },
        {
          text: 'of',
        },
        {
          text: ' technology',
          color: getCSSVariables('--color-accent'),
        },
        {
          text: ' &',
        },
        {
          text: ' creativity',
          color: getCSSVariables('--color-accent'),
        },
        {
          text: '.\n',
        },
        {
          text: 'I am passionate about',
          textAlign: 'right',
        },
        {
          text: ' intuitive\n',
          color: getCSSVariables('--color-accent'),
        },
        {
          text: 'interfaces',
          color: getCSSVariables('--color-accent'),
        },
        {
          text: ',',
        },
        {
          text: ' accessibility\n',
          color: getCSSVariables('--color-accent'),
        },
        {
          text: 'and crafting digital experiences\n',
          textAlign: 'right',
        },
        {
          text: 'that feel more',
          textAlign: 'right',
        },
        {
          text: ' human',
          color: getCSSVariables('--color-accent'),
        },
        {
          text: '.',
        },
      ],
      {
        position: {
          x: -usableWidth / 2 + marginX,
          y: usableHeight / 2 - marginY,
          z,
        },
        maxWidth,
        fontSize,
        centerX: 0,
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

const handleResize = () => {
  if (resizeTimer !== null) clearTimeout(resizeTimer)
  resizeTimer = setTimeout(async () => {
    resizeTimer = null
    if (!containerRef.value || !state.renderer || !state.camera) return
    const rect = containerRef.value.getBoundingClientRect()
    state.renderer.setSize(rect.width, rect.height)
    state.composer?.setSize(rect.width, rect.height)
    state.camera.aspect = rect.width / rect.height
    state.camera.updateProjectionMatrix()
    await addTextToScene()
    if (state.composer && state.clock) {
      state.composer.render(state.clock.getDelta())
    }
  }, 300)
}

const tick = () => {
  if (state.texture) {
    const hasPoints = state.texture.points.length > 0
    if (hasPoints || hadPoints) {
      state.texture.update()
      render()
      if (state.canvasTexture) {
        state.canvasTexture.needsUpdate = true
      }
    }
    hadPoints = hasPoints
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
      65,
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
    // Force an initial render without rebuilding text (already built above)
    state.renderer.setClearColor(0x000000, 0)
    if (state.composer && state.clock) {
      state.composer.render(state.clock.getDelta())
    }

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

    resizeObserver = new ResizeObserver(handleResize)
    resizeObserver.observe(containerRef.value)
  }
  tick()
})

onUnmounted(() => {
  theme.observer?.disconnect()
  theme.observer = null

  resizeObserver?.disconnect()
  resizeObserver = null

  if (resizeTimer !== null) {
    clearTimeout(resizeTimer)
    resizeTimer = null
  }

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
        'max-w-8xl w-full mx-auto',
        'relative min-h-[calc(100vh-10rem)]'
      )
    "
  />
</template>
