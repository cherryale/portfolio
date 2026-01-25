<script setup lang="ts">
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/Addons.js'
import { onMounted, onUnmounted, ref } from 'vue'

const containerRef = ref<HTMLDivElement>()
let renderer: THREE.WebGLRenderer | null = null
let animationId = 0

let scene: THREE.Scene | null = null
let camera: THREE.PerspectiveCamera | null = null
let model: THREE.Object3D | null = null

let baseRotation: THREE.Euler | null = null
let basePosition: THREE.Vector3 | null = null

let pmremGenerator: THREE.PMREMGenerator | null = null
let envMap: THREE.Texture | null = null

// ✅ mouse state (normalized -1..1)
const mouse = { x: 0, y: 0 }
const onMouseMove = (e: MouseEvent) => {
  const el = containerRef.value
  if (!el) return
  const r = el.getBoundingClientRect()
  const nx = (e.clientX - r.left) / r.width
  const ny = (e.clientY - r.top) / r.height
  mouse.x = nx * 2 - 1
  mouse.y = -(ny * 2 - 1)
}

// ✅ pastel env map (procedural)
const createPastelEnvEquirect = () => {
  const canvas = document.createElement('canvas')
  canvas.width = 1024
  canvas.height = 512
  const ctx = canvas.getContext('2d')!

  // background soft pink
  ctx.fillStyle = '#0f0b12'
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  // big pastel blobs (these become the “studio lights” in reflections)
  const blob = (x: number, y: number, r: number, c1: string, c2: string) => {
    const g = ctx.createRadialGradient(x, y, 0, x, y, r)
    g.addColorStop(0, c1)
    g.addColorStop(1, c2)
    ctx.fillStyle = g
    ctx.beginPath()
    ctx.arc(x, y, r, 0, Math.PI * 2)
    ctx.fill()
  }

  blob(
    canvas.width * 0.28,
    canvas.height * 0.35,
    260,
    'rgba(255, 149, 207, 0.95)',
    'rgba(255, 149, 207, 0.0)'
  )
  blob(
    canvas.width * 0.72,
    canvas.height * 0.38,
    320,
    'rgba(255, 252, 216, 0.95)',
    'rgba(255, 252, 216, 0.0)'
  )
  blob(
    canvas.width * 0.55,
    canvas.height * 0.62,
    240,
    'rgba(182, 153, 254, 0.8)',
    'rgba(182, 153, 254, 0.0)'
  )
  blob(
    canvas.width * 0.52,
    canvas.height * 0.18,
    220,
    'rgba(214, 41, 100, 0.95)',
    'rgba(214, 41, 100, 0.0)'
  )

  // subtle vignette
  const v = ctx.createRadialGradient(
    canvas.width * 0.5,
    canvas.height * 0.5,
    120,
    canvas.width * 0.5,
    canvas.height * 0.5,
    520
  )
  v.addColorStop(0, 'rgba(0,0,0,0)')
  v.addColorStop(1, 'rgba(0,0,0,0.12)')
  ctx.fillStyle = v
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  const tex = new THREE.CanvasTexture(canvas)
  tex.colorSpace = THREE.SRGBColorSpace
  tex.mapping = THREE.EquirectangularReflectionMapping
  tex.needsUpdate = true
  return tex
}

// ✅ iridescent “candy metal”
const applyCandyMaterial = (root: THREE.Object3D) => {
  root.traverse((obj) => {
    if (!(obj as THREE.Mesh).isMesh) return
    const mesh = obj as THREE.Mesh

    const mat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#f5eff0'), // slightly off-white so it catches color from env
      metalness: 1.0,
      roughness: 0.06, // ✅ sharper reflections

      clearcoat: 0.8,
      clearcoatRoughness: 0.04,

      // ✅ subtle, not pastel-y
      iridescence: 0.35,
      iridescenceIOR: 1.3,
      iridescenceThicknessRange: [120, 260],

      envMapIntensity: 3.0, // ✅ stronger reflections
    })

    mesh.material = mat
  })
}

onMounted(() => {
  if (!containerRef.value) return

  scene = new THREE.Scene()

  camera = new THREE.PerspectiveCamera(
    45,
    containerRef.value.clientWidth / containerRef.value.clientHeight,
    0.1,
    1000
  )
  camera.position.set(0, 0, 5)

  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
  renderer.setSize(
    containerRef.value.clientWidth,
    containerRef.value.clientHeight
  )
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setClearColor(0x000000, 0)

  // ✅ helps the glossy look
  renderer.outputColorSpace = THREE.SRGBColorSpace
  renderer.toneMapping = THREE.ACESFilmicToneMapping
  renderer.toneMappingExposure = 1.1

  containerRef.value.appendChild(renderer.domElement)

  // lights (keep them gentle; env map is doing the “chrome” work)
  scene.add(new THREE.AmbientLight(0xffffff, 0.25))
  const key = new THREE.DirectionalLight(0xffffff, 0.9)
  key.position.set(5, 6, 5)
  scene.add(key)

  window.addEventListener('mousemove', onMouseMove, { passive: true })

  // ✅ set pastel environment reflections
  pmremGenerator = new THREE.PMREMGenerator(renderer)
  pmremGenerator.compileEquirectangularShader()

  const pastelEquirect = createPastelEnvEquirect()
  envMap = pmremGenerator.fromEquirectangular(pastelEquirect).texture
  pastelEquirect.dispose()

  scene.environment = envMap
  // keep canvas transparent (don’t set scene.background)

  // model
  const loader = new GLTFLoader()
  loader.load('/assets/renders/cherries.glb', (gltf) => {
    if (!scene || !camera) return

    model = gltf.scene
    scene.add(model)

    // center
    {
      const box = new THREE.Box3().setFromObject(model)
      const center = box.getCenter(new THREE.Vector3())
      model.position.sub(center)
    }

    model.scale.setScalar(1)

    // pose
    model.rotation.y = Math.PI * -0.4
    model.rotation.x = -Math.PI * -0.02

    // re-center after rotation
    {
      const box = new THREE.Box3().setFromObject(model)
      const center = box.getCenter(new THREE.Vector3())
      model.position.sub(center)
    }

    // ✅ apply candy material
    applyCandyMaterial(model)

    // fit camera
    const box = new THREE.Box3().setFromObject(model)
    const size = box.getSize(new THREE.Vector3())
    const maxDim = Math.max(size.x, size.y, size.z)

    const fov = camera.fov * (Math.PI / 180)
    let cameraZ = Math.abs(maxDim / 2 / Math.tan(fov / 2))
    cameraZ *= 1.4

    camera.position.set(cameraZ * 0.35, cameraZ * 0.15, cameraZ)
    camera.near = cameraZ / 100
    camera.far = cameraZ * 100
    camera.updateProjectionMatrix()
    camera.lookAt(0, 0, 0)

    baseRotation = model.rotation.clone()
    basePosition = model.position.clone()
  })

  const animate = () => {
    animationId = requestAnimationFrame(animate)

    if (model) {
      const maxRot = 0.15
      const maxMove = 0.15
      const ease = 0.06

      const baseRotY = baseRotation?.y ?? 0
      const baseRotX = baseRotation?.x ?? 0
      const basePosX = basePosition?.x ?? 0
      const basePosY = basePosition?.y ?? 0

      const targetRotY = baseRotY + mouse.x * maxRot
      const targetRotX = baseRotX + mouse.y * maxRot
      const targetPosX = basePosX + mouse.x * maxMove
      const targetPosY = basePosY + mouse.y * maxMove

      model.rotation.y += (targetRotY - model.rotation.y) * ease
      model.rotation.x += (targetRotX - model.rotation.x) * ease
      model.position.x += (targetPosX - model.position.x) * ease
      model.position.y += (targetPosY - model.position.y) * ease
    }

    if (renderer && scene && camera) {
      renderer.render(scene, camera)
    }
  }

  animate()
})

onUnmounted(() => {
  window.removeEventListener('mousemove', onMouseMove)
  if (animationId) cancelAnimationFrame(animationId)

  if (model) {
    model.traverse((obj) => {
      if (!(obj as THREE.Mesh).isMesh) return
      const mesh = obj as THREE.Mesh
      const mat = mesh.material as THREE.Material | THREE.Material[]
      if (Array.isArray(mat)) mat.forEach((m) => m.dispose())
      else mat.dispose()
      mesh.geometry?.dispose?.()
    })
  }

  envMap?.dispose()
  envMap = null
  pmremGenerator?.dispose()
  pmremGenerator = null

  if (renderer) {
    renderer.dispose()
    if (
      containerRef.value &&
      renderer.domElement.parentNode === containerRef.value
    ) {
      containerRef.value.removeChild(renderer.domElement)
    }
    renderer = null
  }

  baseRotation = null
  basePosition = null
  model = null
  scene = null
  camera = null
})
</script>

<template>
  <div ref="containerRef" class="absolute w-120 h-120 z-10"></div>
</template>
