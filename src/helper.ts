export const lerp = (p1: number, p2: number, amount: number): number => amount * (p2 - p1) + p1
export const randomRange = (min: number, max: number) => Math.random() * (max - min) + min
