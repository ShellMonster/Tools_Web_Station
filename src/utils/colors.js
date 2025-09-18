import convert from 'color-convert'

export function hexToRgb(hex) {
  const [r, g, b] = convert.hex.rgb(hex.replace('#', ''))
  return { r, g, b }
}

export function rgbToHex({ r, g, b }) {
  return `#${convert.rgb.hex([r, g, b])}`
}

export function rgbToHsl({ r, g, b }) {
  const [h, s, l] = convert.rgb.hsl([r, g, b])
  return { h, s, l }
}

export function hslToRgb({ h, s, l }) {
  const [r, g, b] = convert.hsl.rgb([h, s, l])
  return { r, g, b }
}

export function hexToHsl(hex) {
  const [h, s, l] = convert.hex.hsl(hex.replace('#', ''))
  return { h, s, l }
}

export function hslToHex({ h, s, l }) {
  return `#${convert.hsl.hex([h, s, l])}`
}
