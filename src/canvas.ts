import { Position } from './types'

const circle = (ctx: CanvasRenderingContext2D, pos: Position, radius: number): void => {
	ctx.beginPath()
	ctx.arc(pos.x, pos.y, radius, 0, 2 * Math.PI)
	ctx.fill()
	ctx.closePath()
}

export { circle }
