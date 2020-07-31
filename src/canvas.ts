import { Position } from './types'

class Canvas {
	public static create(): CanvasRenderingContext2D {
		const canvas = document.createElement('canvas')
		const resizeCanvas = (): void => {
			canvas.setAttribute('width', `${innerWidth}px`)
			canvas.setAttribute('height', `${innerHeight}px`)
		}
		window.addEventListener('resize', resizeCanvas)
		resizeCanvas()
		document.body.appendChild(canvas)
		return canvas.getContext('2d')
	}

	public static circle(ctx: CanvasRenderingContext2D, pos: Position, radius: number): void {
		ctx.beginPath()
		ctx.arc(pos.x, pos.y, radius, 0, 2 * Math.PI)
		ctx.fill()
		ctx.closePath()
	}
}

export { Canvas }
