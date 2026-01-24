<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import * as THREE from 'three'
import { EffectComposer, RenderPass, EffectPass } from 'postprocessing'
import { WaterTexture } from '~/layers/liquid/components/water-texture'
import { WaterEffect } from '~/layers/liquid/components/water-effect'

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

const addPlane = () => {
  if (!scene) return

  const geometry = new THREE.PlaneGeometry(5, 5, 1, 1)
  const material = new THREE.MeshNormalMaterial()
  const mesh = new THREE.Mesh(geometry, material)

  scene.add(mesh)
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
    })
    renderer.setSize(rect.width, rect.height)
    renderer.setPixelRatio(window.devicePixelRatio)
    containerRef.value.appendChild(renderer.domElement)

    camera = new THREE.PerspectiveCamera(
      45,
      rect.width / rect.height,
      0.1,
      10000
    )
    camera.position.z = 50

    // Initialize clock
    clock = new THREE.Clock()

    // Add plane to scene
    addPlane()

    // Initialize composer
    initComposer()

    // Add event listener
    containerRef.value.addEventListener('mousemove', onMouseMove)

    // Append the water texture canvas to the container
    if (texture.canvas) {
      texture.canvas.style.position = 'absolute'
      texture.canvas.style.top = '0'
      texture.canvas.style.left = '0'
      texture.canvas.style.width = '100%'
      texture.canvas.style.height = '100%'
      texture.canvas.style.pointerEvents = 'none'
      containerRef.value.appendChild(texture.canvas)
    }
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
  if (composer) {
    composer.dispose()
  }
  if (scene) {
    scene.traverse((object) => {
      if (object instanceof THREE.Mesh) {
        object.geometry.dispose()
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
  <div ref="containerRef" style="position: relative">
    <slot />
  </div>
</template>
