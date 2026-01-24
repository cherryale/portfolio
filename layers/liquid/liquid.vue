<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import * as THREE from 'three'
import { EffectComposer, RenderPass, EffectPass } from 'postprocessing'
import { TextRenderer } from '~/layers/liquid/components/text-renderer'
import classNames from 'classnames'
import { getCSSVariables } from '~/layers/liquid/lib/helpers'
import { LiquidTexture } from '~/layers/liquid/components/liquid-texture'
import LiquidDistortion from '~/layers/liquid/components/liquid-distortion'

const containerRef = ref<HTMLDivElement | null>(null)
let texture: LiquidTexture | null = null
let animationFrameId: number | null = null
let renderer: THREE.WebGLRenderer | null = null
let camera: THREE.PerspectiveCamera | null = null
let scene: THREE.Scene | null = null
let composer: EffectComposer | null = null
let clock: THREE.Clock | null = null
let waterEffect: LiquidDistortion | null = null
let canvasTexture: THREE.CanvasTexture | null = null
let textRenderer: TextRenderer | null = null

const onMouseMove = (e: MouseEvent) => {
  if (!texture || !containerRef.value) {
    return
  }

  const rect = containerRef.value.getBoundingClientRect()
  const point = {
    x: (e.clientX - rect.left) / rect.width,
    y: (e.clientY - rect.top) / rect.height,
    age: 0,
    force: 0,
    vx: 0,
    vy: 0,
  }
  texture.addPoint(point)
}

const addBackgroundPlane = () => {
  if (!scene || !camera) return

  const distance = camera.position.z
  const vFov = (camera.fov * Math.PI) / 180
  const height = 2 * Math.tan(vFov / 2) * distance
  const width = height * camera.aspect

  const geometry = new THREE.PlaneGeometry(width, height, 1, 1)
  const material = new THREE.MeshBasicMaterial({
    color: 0xf5eff0,
    transparent: false,
  })
  const mesh = new THREE.Mesh(geometry, material)
  mesh.position.z = 0

  scene.add(mesh)
}

// ✅ CHANGED: make async and use createInlineText
const addTextToScene = async () => {
  if (!scene || !camera) {
    return
  }

  textRenderer = new TextRenderer(scene)

  const z = 1
  const distance = camera.position.z - z
  const vFov = (camera.fov * Math.PI) / 180
  const padding = 3 // world units; tweak until distortion never clips

  const viewHeight = 2 * Math.tan(vFov / 2) * distance
  const viewWidth = viewHeight * camera.aspect
  const usableWidth = viewWidth - padding * 2
  const usableHeight = viewHeight - padding * 2

  const startX = -viewWidth / 2 + padding
  const startY = viewHeight / 2 - padding

  const marginX = 1
  const marginY = 1

  await textRenderer.createInlineText(
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
      // fontSize / lineHeight can be omitted to use defaults from TextRenderer
    }
  )
}

const initComposer = () => {
  if (!renderer || !scene || !camera || !texture || !texture.canvas) return

  composer = new EffectComposer(renderer)
  const renderPass = new RenderPass(scene, camera)

  canvasTexture = new THREE.CanvasTexture(texture.canvas)
  canvasTexture.needsUpdate = true

  waterEffect = new LiquidDistortion(canvasTexture)

  const waterPass = new EffectPass(camera, waterEffect)

  renderPass.renderToScreen = false
  waterPass.renderToScreen = true

  composer.addPass(renderPass)
  composer.addPass(waterPass)
}

const render = () => {
  if (composer && clock) {
    composer.render(clock.getDelta())
  }
}

const tick = () => {
  render()
  if (texture) {
    texture.update()
  }
  if (canvasTexture) {
    canvasTexture.needsUpdate = true
  }
  animationFrameId = requestAnimationFrame(tick)
}

// ✅ CHANGED: onMounted async + await addTextToScene()
onMounted(async () => {
  if (containerRef.value) {
    const rect = containerRef.value.getBoundingClientRect()

    texture = new LiquidTexture({ debug: false })
    scene = new THREE.Scene()

    renderer = new THREE.WebGLRenderer({
      antialias: false,
      alpha: false,
    })
    renderer.setClearColor(0xf5eff0, 1)
    renderer.setSize(rect.width, rect.height)
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.domElement.style.height = '100%'
    renderer.domElement.style.width = '100%'
    renderer.domElement.style.zIndex = '1'
    renderer.domElement.style.pointerEvents = 'none'
    containerRef.value.appendChild(renderer.domElement)

    camera = new THREE.PerspectiveCamera(
      45,
      rect.width / rect.height,
      0.1,
      10000
    )
    camera.position.z = 50

    clock = new THREE.Clock()
    scene.background = new THREE.Color(0xf5eff0)

    // ✅ await so widths are measured before layout continues
    await addTextToScene()

    initComposer()
    containerRef.value.addEventListener('mousemove', onMouseMove)
  }
  tick()
})

onUnmounted(() => {
  if (containerRef.value) {
    containerRef.value.removeEventListener('mousemove', onMouseMove)
  }
  if (animationFrameId !== null) {
    cancelAnimationFrame(animationFrameId)
  }

  textRenderer?.dispose()
  if (composer) {
    composer.dispose()
  }
  if (scene) {
    scene.traverse((object: THREE.Object3D) => {
      if (object instanceof THREE.Mesh) {
        object.geometry?.dispose()
        if (object.material instanceof THREE.Material) {
          object.material.dispose()
        }
      }
    })
  }
  if (renderer) {
    renderer.dispose()
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
