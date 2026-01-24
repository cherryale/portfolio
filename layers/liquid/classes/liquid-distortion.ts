import * as Three from 'three'
import { Effect } from 'postprocessing'

export class LiquidDistortion extends Effect {
  constructor(texture: Three.Texture) {
    super('LiquidDistortion', fragment, {
      uniforms: new Map([['uTexture', new Three.Uniform(texture)]]),
    })
  }
}
export default LiquidDistortion

const fragment = `
  uniform sampler2D uTexture;

  void mainUv(inout vec2 uv) {
    vec4 tex = texture2D(uTexture, uv);
    // Convert normalized values into regular unit vector
    float vx = -(tex.r *2. - 1.);
    float vy = -(tex.g *2. - 1.);
    // Normalized intensity works just fine for intensity
    float intensity = tex.b;
    float maxAmplitude = 0.1;
    uv.x += vx * intensity * maxAmplitude;
    uv.y += vy * intensity * maxAmplitude;
  }
`
