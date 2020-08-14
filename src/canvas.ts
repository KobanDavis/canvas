import { Position } from './types'
import Rectangle from './rectangle'

type DrawFunction = (ctx: CanvasRenderingContext2D) => void

interface Canvas {
	ctx: CanvasRenderingContext2D
	boundary: Rectangle
	drawFunction: DrawFunction
	canvas: HTMLCanvasElement
}

/**
 * A helper class used to make interactions with the canvas easier
 */
class Canvas {
	constructor(private _width: number, private _height: number, drawFunction: DrawFunction = null) {
		this.ctx = this.init()
		this.boundary = new Rectangle(0, 0, _width, _height)
		this.drawFunction = drawFunction
	}

	/**
	 * A utility function used to generate a colorful HSL string.
	 *
	 * The format of the string is as follows: "hsl(0, 100%, 50%)"
	 * @param distribution The amount of colors the generated color can be picked from
	 */
	public static randomHSLColor(distribution: number = 120): string {
		const hue = Math.trunc((360 / distribution) * (Math.random() * distribution))
		return `hsl(${hue}, 100%, 50%)`
	}

	/**
	 * Sets the draw function of the canvas, which will be called every frame when
	 * Canvas.startDrawLoop() is called.
	 * @param func The function to be called
	 */
	public setDrawFunction(func: DrawFunction): void {
		this.drawFunction = func
	}

	/**
	 * A utility function used to get the pixel data of every pixel on the canvas.
	 * @param greyscale If true, it will return the red channel of each pixel
	 */
	public getPixelData(greyscale?: boolean): Uint8ClampedArray {
		const { data } = this.ctx.getImageData(0, 0, this._width, this._height)
		if (greyscale) {
			const length = data.length / 4
			const arr = new Uint8ClampedArray(length)
			for (let i = 0; i < length; i++) {
				arr[i] = data[i * 4]
			}
			return arr
		}
		return data
	}

	/**
	 * A utility function used to resize the canvas with new values.
	 * @param width The new width of the canvas
	 * @param height The new height of the canvas
	 */
	public resizeCanvas(width: number, height: number): void {
		this.canvas.setAttribute('width', `${width}px`)
		this.canvas.setAttribute('height', `${height}px`)
	}

	/**
	 * Creates the canvas element and sets the size of the window and returns the context
	 */
	private init(): CanvasRenderingContext2D {
		this.canvas = document.createElement('canvas')
		this.resizeCanvas(this._width, this._height)
		document.body.appendChild(this.canvas)
		return this.canvas.getContext('2d')
	}

	/**
	 * A utility function used to clear the contents of the canvas and reset any transform
	 * functions applied
	 */
	public resetDraw(): void {
		this.ctx.setTransform(1, 0, 0, 1, 0, 0)
		this.ctx.clearRect(0, 0, this._width, this._height)
	}

	/**
	 * Starts the draw loop of the canvas, executing the callback provided in the constructor
	 * or the callback set using setDrawFucntion
	 */
	public startDrawLoop(): void {
		const drawLoop = (): void => {
			this.drawFunction(this.ctx)
			requestAnimationFrame(drawLoop)
		}
		drawLoop()
	}

	/**
	 * A utility function used to draw a circle
	 * @param ctx The canvas' context
	 * @param pos The position where the circle should be drawn
	 * @param radius The radius of the circle
	 */
	public static circle(ctx: CanvasRenderingContext2D, pos: Position, radius: number): void {
		ctx.beginPath()
		ctx.arc(pos.x, pos.y, radius, 0, 2 * Math.PI)
		ctx.fill()
		ctx.closePath()
	}
}

export default Canvas
