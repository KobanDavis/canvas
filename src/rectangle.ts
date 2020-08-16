import { Position } from './types'
import Vector from './vector'

type MouseEvent = 'mousemove' | 'mousedown' | 'mouseup' | 'mouseenter' | 'mouseleave' | 'mouseover' | 'click'
type ListenerFunction = (e: globalThis.MouseEvent) => void
interface Rectangle extends Position {
	width: number
	height: number
	counter: number
	listeners: {
		[key: number]: ListenerFunction
	}
}

class Rectangle {
	constructor(x: number, y: number, width: number, height: number) {
		this.x = x
		this.y = y
		this.width = width
		this.height = height
		this.counter = 0
		this.listeners = {}
	}

	public contains(position: Position): boolean
	public contains(vector: Vector): boolean
	public contains(v: Vector | Position): boolean {
		let position: Position
		if (v instanceof Vector) {
			position = v.position
		} else {
			position = v
		}
		const { x, y } = position
		return (
			// point >= left side
			x >= this.x &&
			// point >= right side
			x <= this.x + this.width &&
			// point >= top side
			y >= this.y &&
			// point >= bottom side
			y <= this.y + this.height
		)
	}

	public intersects(r: Rectangle): boolean {
		const { x, y, width, height } = r
		const cases =
			// right side of r1 < left side of r2
			this.x + this.width < x ||
			// bottom side of r1 < top side of r2
			this.y + this.height < y ||
			// left side of r1 > right side of r2
			this.x > x + width ||
			// top side of r1 > bottom side of r2
			this.y > y + height

		return !cases
	}

	private newListenerFunction(cb: ListenerFunction): { fn: ListenerFunction; id: number } {
		const fn = (e: globalThis.MouseEvent): any => {
			if (this.contains({ x: e.pageX, y: e.pageY })) {
				cb(e)
			}
		}
		const id = ++this.counter
		this.listeners[id] = fn
		return { fn, id }
	}

	public addEventListener(event: MouseEvent, listener: ListenerFunction): number {
		const { fn, id } = this.newListenerFunction(listener)
		window.addEventListener(event, fn)
		return id
	}

	public removeEventListener(event: MouseEvent, id: number): void {
		window.removeEventListener(event, this.listeners[id])
		delete this.listeners[id]
	}
}

export default Rectangle
