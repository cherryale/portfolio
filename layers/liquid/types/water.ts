export interface Point {
  x: number
  y: number
}

export interface ExtendedPoint extends Point {
  age: number
  force: number
  vx: number
  vy: number
}

export interface LiquidTextureConfig {
  width?: number
  height?: number
}
