import { color, HSLColor, RGBColor, hsl } from 'd3-color';
import { scaleLinear } from 'd3-scale'

export type ColorType = RGBColor | HSLColor | null;
export type ColorsArrayType = Array<HSLColor | RGBColor>

export function isValidColorValue(colorValue: string): boolean {
    return color(colorValue) !== null;
}

export function generatePalette(colorValue: string) {
    
    if (!isValidColorValue(colorValue)) {
        return [];
    }

    const initial = hsl(colorValue);
    const shades = [0.05, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.85];
    const max = Math.max(...shades);
    const min = Math.min(...shades);
    const scaleLum = scaleLinear().domain([min, max]).range([0.05, 0.9]);

    if (initial) {
        const colors = shades.map(value => {
            const c = initial.copy({ l: scaleLum(value) });
            return c;
        })
        return colors;
    }
    
    return [];
}