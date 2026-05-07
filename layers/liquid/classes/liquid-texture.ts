import * as Three from 'three'

const easeOutSine = (t: number, b: number, c: number, d: number) => {
  return c * Math.sin((t / d) * (Math.PI / 2)) + b
}

const easeOutQuad = (t: number, b: number, c: number, d: number) => {
  t /= d
  return -c * t * (t - 2) + b
}

interface Point {
  x: number
  y: number
  age: number
  force: number
  vx: number
  vy: number
}

interface LiquidTextureOptions {
  debug?: boolean
  width?: number
  height?: number
}

export class LiquidTexture {
  size: number = 64
  points: Point[] = []
  maxAge: number = 64
  radius: number
  width: number
  height: number
  texture: Three.Texture<HTMLCanvasElement>
  last: Omit<Point, 'age' | 'vx' | 'vy' | 'force'> | null
  canvas?: HTMLCanvasElement
  ctx!: CanvasRenderingContext2D

  constructor(options: LiquidTextureOptions = {}) {
    this.radius = this.size * 0.1
    this.width = this.height = this.size
    this.last = null
    this.texture = new Three.Texture(this.canvas)

    if (options.debug) {
      this.width = window.innerWidth
      this.height = window.innerHeight
      this.radius = this.width * 0.1
    } else if (options.width && options.height) {
      this.width = options.width
      this.height = options.height
      this.radius = this.width * 0.05
    }

    this.initTexture()
    if (options.debug && this.canvas) {
      document.body.append(this.canvas)
    }
  }

  // Initialize our canvas
  initTexture(): void {
    if (typeof document === 'undefined') {
      return
    }

    this.canvas = document.createElement('canvas')
    this.canvas.id = 'LiquidTexture'
    this.canvas.width = this.width
    this.canvas.height = this.height
    this.ctx = this.canvas.getContext('2d')!
    this.clear()
  }

  addNoisePoint(x: number, y: number, force: number, vx?: number, vy?: number): void {
    const angle = Math.random() * Math.PI * 2
    this.points.push({
      x,
      y,
      age: 0,
      force,
      vx: vx ?? Math.cos(angle),
      vy: vy ?? Math.sin(angle),
    })
  }

  addPoint(point: Point): void {
    // this.points.push({ x: point.x, y: point.y, age: 0 })
    let force = 0
    let vx = 0
    let vy = 0
    const last = this.last
    if (last) {
      const relativeX = point.x - last.x
      const relativeY = point.y - last.y
      // Distance formula
      const distanceSquared = relativeX * relativeX + relativeY * relativeY
      const distance = Math.sqrt(distanceSquared)
      // Calculate Unit Vector
      vx = relativeX / distance
      vy = relativeY / distance

      force = Math.min(distanceSquared * 5000, 1)
    }

    this.last = {
      x: point.x,
      y: point.y,
    }

    this.points.push({ x: point.x, y: point.y, age: 0, force, vx, vy })
  }

  drawPoint(point: Point) {
    if (!this.ctx) {
      return
    }

    // Convert normalized position into canvas coordinates
    let pos = {
      x: point.x * this.width,
      y: point.y * this.height,
    }
    const radius = this.radius
    const ctx = this.ctx

    let intensity = 1
    if (point.age < this.maxAge * 0.3) {
      intensity = easeOutSine(point.age / (this.maxAge * 0.3), 0, 1, 1)
    } else {
      intensity = easeOutQuad(
        1 - (point.age - this.maxAge * 0.3) / (this.maxAge * 0.7),
        0,
        1,
        1
      )
    }
    intensity *= point.force

    let red = ((point.vx + 1) / 2) * 255
    let green = ((point.vy + 1) / 2) * 255
    // B = Unit vector
    let blue = intensity * 255
    let color = `${red}, ${green}, ${blue}`

    let offset = this.width * 5
    // 1. Give the shadow a high offset.
    ctx.shadowOffsetX = offset
    ctx.shadowOffsetY = offset
    ctx.shadowBlur = radius * 1
    ctx.shadowColor = `rgba(${color},${0.2 * intensity})`

    this.ctx.beginPath()
    this.ctx.fillStyle = 'rgba(255,255,255,1)'
    // 2. Move the circle to the other direction of the offset
    this.ctx.arc(pos.x - offset, pos.y - offset, radius, 0, Math.PI * 2)
    this.ctx.fill()
  }

  clear(): void {
    if (!this.ctx || !this.canvas) return

    this.ctx.fillStyle = 'black'
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
  }

  update(): void {
    if (!this.ctx) {
      return
    }

    this.clear()

    let agePart = 1 / this.maxAge
    this.points.forEach((point, i) => {
      let slowAsOlder = 1 - point.age / this.maxAge
      let force = point?.force * agePart * slowAsOlder

      const damping = 0.35
      point.x += point.vx * force * damping
      point.y += point.vy * force * damping

      point.age += 1
      if (point.age > this.maxAge) {
        this.points.splice(i, 1)
      }
    })
    this.points.forEach((point) => {
      this.drawPoint(point)
    })

    this.texture.needsUpdate = true
  }
}
