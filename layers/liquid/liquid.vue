<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import * as THREE from 'three'
import { EffectComposer, RenderPass, EffectPass } from 'postprocessing'
import { WaterTexture } from '~/layers/liquid/components/water-texture'
import { WaterEffect } from '~/layers/liquid/components/water-effect'
import { TextRenderer } from '~/layers/liquid/components/text-renderer'
import classNames from 'classnames'

const containerRef = ref<HTMLDivElement | null>(null)
let texture: WaterTexture | null = null
let animationFrameId: number | null = null
let renderer: THREE.WebGLRenderer | null = null
let camera: THREE.PerspectiveCamera | null = null
let scene: THREE.Scene | null = null
let composer: EffectComposer | null = null
let clock: THREE.Clock | null = null
let waterEffect: WaterEffect | null = null
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
  // console.log('Mouse move:', point, 'Points:', texture.points.length)
}

const addBackgroundPlane = () => {
  if (!scene || !camera) return

  // Calculate the view size at z=0
  const distance = camera.position.z
  const vFov = (camera.fov * Math.PI) / 180
  const height = 2 * Math.tan(vFov / 2) * distance
  const width = height * camera.aspect

  // Create a plane that fills the entire view
  const geometry = new THREE.PlaneGeometry(width, height, 1, 1)
  const material = new THREE.MeshBasicMaterial({
    color: 0xf5eff0,
    transparent: false,
  })
  const mesh = new THREE.Mesh(geometry, material)
  mesh.position.z = 0

  scene.add(mesh)
}

const addTextToScene = () => {
  if (!scene || !camera) {
    return
  }

  textRenderer = new TextRenderer(scene)

  const z = 1 // put text in front of background plane at z=0

  // Visible size at this z (relative to camera)
  const distance = camera.position.z - z
  const vFov = (camera.fov * Math.PI) / 180
  const viewHeight = 2 * Math.tan(vFov / 2) * distance
  const viewWidth = viewHeight * camera.aspect

  const marginX = 1
  const marginY = 1

  textRenderer.createText({
    text: 'I am a ',
    color: '#831c2e',
    position: {
      x: -viewWidth / 2 + marginX, // left edge + margin
      y: viewHeight / 2 - marginY, // top edge - margin
      z,
    },
    textAlign: 'left',
    anchorX: 'left',
    anchorY: 'top',
    // maxWidth: viewWidth - marginX * 2, // optional: wrap within view
  })
  textRenderer.createText({
    text: 'senior web developer',
    color: '#831c2e',
    position: {
      x: -viewWidth / 2 + marginX, // left edge + margin
      y: viewHeight / 2 - marginY, // top edge - margin
      z,
    },
    textAlign: 'left',
    anchorX: 'left',
    anchorY: 'top',
    // maxWidth: viewWidth - marginX * 2, // optional: wrap within view
  })
  textRenderer.createText({
    text: '&',
    color: '#831c2e',
    position: {
      x: -viewWidth / 2 + marginX, // left edge + margin
      y: viewHeight / 2 - marginY, // top edge - margin
      z,
    },
    textAlign: 'left',
    anchorX: 'left',
    anchorY: 'top',
    // maxWidth: viewWidth - marginX * 2, // optional: wrap within view
  })
  textRenderer.createText({
    text: ' casual',
    color: '#831c2e',
    position: {
      x: -viewWidth / 2 + marginX, // left edge + margin
      y: viewHeight / 2 - marginY, // top edge - margin
      z,
    },
    textAlign: 'left',
    anchorX: 'left',
    anchorY: 'top',
    // maxWidth: viewWidth - marginX * 2, // optional: wrap within view
  })
  textRenderer.createText({
    text: 'UI designer',
    color: '#831c2e',
    position: {
      x: -viewWidth / 2 + marginX, // left edge + margin
      y: viewHeight / 2 - marginY, // top edge - margin
      z,
    },
    textAlign: 'left',
    anchorX: 'left',
    anchorY: 'top',
    // maxWidth: viewWidth - marginX * 2, // optional: wrap within view
  })
}

const initComposer = () => {
  if (!renderer || !scene || !camera || !texture || !texture.canvas) return

  composer = new EffectComposer(renderer)
  const renderPass = new RenderPass(scene, camera)

  // Create THREE.Texture from the canvas
  canvasTexture = new THREE.CanvasTexture(texture.canvas)
  canvasTexture.needsUpdate = true

  // Create WaterEffect with the texture
  waterEffect = new WaterEffect(canvasTexture)

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

onMounted(() => {
  if (containerRef.value) {
    const rect = containerRef.value.getBoundingClientRect()

    // Initialize WaterTexture
    texture = new WaterTexture({ debug: false })

    // Initialize Three.js
    scene = new THREE.Scene()

    renderer = new THREE.WebGLRenderer({
      antialias: false,
      alpha: false,
    })
    renderer.setClearColor(0xf5eff0, 1)
    renderer.setSize(rect.width, rect.height)
    renderer.setPixelRatio(window.devicePixelRatio)
    // renderer.domElement.style.position = 'absolute'
    // renderer.domElement.style.top = '0'
    // renderer.domElement.style.left = '0'
    // renderer.domElement.style.width = '100%'
    // renderer.domElement.style.height = '100%'
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

    // console.log('Camera position:', camera.position)
    // console.log('Scene:', scene)

    // Initialize clock
    clock = new THREE.Clock()

    // Set scene background to cherry-100 color (#f5eff0)
    scene.background = new THREE.Color(0xf5eff0)

    // Add text to scene
    addTextToScene()

    // Initialize composer
    initComposer()

    // Add event listener
    containerRef.value.addEventListener('mousemove', onMouseMove)

    // Append the water texture canvas for debugging (top-right corner)
    // if (texture.canvas) {
    //   texture.canvas.style.position = 'absolute'
    //   texture.canvas.style.top = '10px'
    //   texture.canvas.style.right = '10px'
    //   texture.canvas.style.width = '150px'
    //   texture.canvas.style.height = '150px'
    //   texture.canvas.style.border = '2px solid red'
    //   texture.canvas.style.zIndex = '9999'
    //   texture.canvas.style.pointerEvents = 'none'
    //   containerRef.value.appendChild(texture.canvas)
    // }
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

  // Clean up Three.js resources
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
        'min-h-screen max-w-2xl mx-auto px-10 xl:px-20 py-20',
        'flex items-center justify-center',
        'relative text-6xl lg:text-7xl font-bold'
      )
    "
  />
  <!-- HTML content hidden, rendered in Three.js instead -->
  <!-- <div style="opacity: 0; pointer-events: none"> -->
  <!-- <slot /> -->
  <!-- </div> -->
  <!-- </div> -->
</template>
