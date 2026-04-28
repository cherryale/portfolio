type Alignment = 'left' | 'justify' | 'center' | 'right'

export interface BaseTextConfig {
  fontSize: number
  fontWeight: number
  lineHeight: number
  // color: string
  font: string
  anchorX: 'left' | 'center' | 'right'
  anchorY: 'top' | 'middle' | 'bottom'
}

export type TextConfig = BaseTextConfig & {
  color?: string
  text: string
  textAlign?: Alignment
  position?: { x: number; y: number; z: number }
}

export interface InlineRun {
  text: string
  color?: string
  indent?: number
  textAlign?: Alignment
}

export interface InlineLayoutConfig {
  position: { x: number; y: number; z: number } // top-left start
  maxWidth: number
  fontSize?: number
  lineHeight?: number // multiplier, e.g. 1.05–1.25
  letterSpacing?: number // optional
}
