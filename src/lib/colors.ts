import { color, HSLColor, RGBColor, hsl } from 'd3-color'
import { interpolateHsl } from 'd3-interpolate'

export type ColorType = RGBColor | HSLColor | null
export type ColorsArrayType = Array<HSLColor | RGBColor>
export type PaletteType = Array<{ value: number; color: string; }>

export function isValidColorValue(colorValue: string): boolean {
  return color(colorValue) !== null
}

export function generatePalette(colorValue: string): PaletteType {
  if (!isValidColorValue(colorValue)) {
    return []
  }

  const initial = hsl(colorValue)
  const start = initial.copy({ s: 0.3, l: 0.9 })
  const end = initial?.copy({ s: 0.75, l: 0.1 })
  const interpolate = interpolateHsl(start.formatHsl(), end.formatHsl())
  return [0.9, 0.8, 0.7, 0.6, 0.5, 0.4, 0.3, 0.2, 0.1, 0.05].map(value => ({
    value, color: interpolate(value)
  }))
}
