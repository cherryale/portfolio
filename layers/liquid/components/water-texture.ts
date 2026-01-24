interface Point {
  x: number
  y: number
  age: number
}
export class WaterTexture {
  readonly size: number = 64
  readonly points: Point[] = []
  readonly maxAge: number = 64
  radius: number
  width: number
  height: number
  canvas?: HTMLCanvasElement

  constructor() {
    this.radius = this.size * 0.1
    this.width = this.height = this.size
    // if (options.debug) {
    //   this.width = window.innerWidth
    //   this.height = window.innerHeight
    //   this.radius = this.width * 0.05
    // }

    this.init()
    // if (options.debug) document.body.append(this.canvas)
  }

  // Initialize our canvas
  init(): void {
    this.canvas = document.createElement('canvas')
    this.canvas.id = 'WaterTexture'
    this.canvas.width = this.width
    this.canvas.height = this.height
    this.ctx = this.canvas.getContext('2d')
    this.clear()
  }

  addPoint(point: Point): void {
    this.points.push({ x: point.x, y: point.y, age: 0 })
  }

  drawPoint(point: Point) {
    // Convert normalized position into canvas coordinates
    const pos = {
      x: point.x * this.width,
      y: point.y * this.height,
    }
    const radius = this.radius

    const ctx = this.ctx
    // Lower the opacity as it gets older
    let intensity = 1
    intensity = 1 - point.age / this.maxAge

    let color = '255,255,255'

    let offset = this.width * 5
    // 1. Give the shadow a high offset.
    ctx.shadowOffsetX = offset
    ctx.shadowOffsetY = offset
    ctx.shadowBlur = radius * 1
    ctx.shadowColor = `rgba(${color},${0.2 * intensity})`

    this.ctx.beginPath()
    this.ctx.fillStyle = 'rgba(255,0,0,1)'
    // 2. Move the circle to the other direction of the offset
    this.ctx.arc(pos.x - offset, pos.y - offset, radius, 0, Math.PI * 2)
    this.ctx.fill()
    // this.ctx.beginPath()
    // this.ctx.arc(coordinates.x, coordinates.y, radius, 0, Math.PI * 2)
    // this.ctx.fill()
  }

  clear(): void {
    this.clear()
    this.points.forEach((point, index) => {
      point.age += 1

      if (point.age > this.maxAge) {
        this.points.splice(index, 1)
      }
    })
    this.points.forEach((point) => {
      this.drawPoint(point)
    })
    // this.ctx.fillStyle = 'black'
    // if (this?.canvas) {
    //   this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
    // }
  }

  update() {}
}
