import { Position } from './types'
import Rectangle from './rectangle'

type DrawFunction = (ctx: CanvasRenderingContext2D) => void

interface Canvas {
	ctx: CanvasRenderingContext2D
	boundary: Rectangle
	drawFunction: DrawFunction
}

class Canvas {
	constructor(private _width: number, private _height: number, drawFunction: DrawFunction = null) {
		this.ctx = this.init()
		this.boundary = new Rectangle(0, 0, _width, _height)
		this.drawFunction = drawFunction
	}

	public static randomHSLColor(distribution: number = 120): string {
		const hue = Math.trunc((360 / distribution) * (Math.random() * distribution))
		return `hsl(${hue}, 100%, 50%)`
	}

	public setDrawFunction(func: DrawFunction): void {
		this.drawFunction = func
	}

	private init(): CanvasRenderingContext2D {
		const canvas = document.createElement('canvas')
		const resizeCanvas = (): void => {
			canvas.setAttribute('width', `${this._width}px`)
			canvas.setAttribute('height', `${this._height}px`)
		}
		window.addEventListener('resize', resizeCanvas)
		resizeCanvas()
		document.body.appendChild(canvas)
		return canvas.getContext('2d')
	}

	public resetDraw(): void {
		this.ctx.setTransform(1, 0, 0, 1, 0, 0)
		this.ctx.clearRect(0, 0, this._width, this._height)
	}

	public startDrawLoop(): void {
		const drawLoop = (): void => {
			this.drawFunction(this.ctx)
			requestAnimationFrame(drawLoop)
		}
		drawLoop()
	}

	public static circle(ctx: CanvasRenderingContext2D, pos: Position, radius: number): void {
		ctx.beginPath()
		ctx.arc(pos.x, pos.y, radius, 0, 2 * Math.PI)
		ctx.fill()
		ctx.closePath()
	}
}

export default Canvas
