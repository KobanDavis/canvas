import { Position } from './types'

interface Vector {
	position: Position
}

class Vector {
	constructor(vector: Vector)
	constructor(position: Position)
	constructor(v: Position | Vector) {
		if (v instanceof Vector) {
			const {
				position: { x, y },
			} = v
			this.position = { x, y }
		} else {
			const { x, y } = v
			this.position = { x, y }
		}
	}

	public set(position: Position): this {
		this.position = { ...position }
		return this
	}

	public setX(x: number): this {
		this.position.x = x
		return this
	}

	public setY(y: number): this {
		this.position.y = y
		return this
	}

	public normalise(): this {
		const hypotenuse = Vector.getHypotenuse(this.position)
		this.position.x = this.position.x / hypotenuse || 0
		this.position.y = this.position.y / hypotenuse || 0
		return this
	}

	public subtract(vector: Vector): this
	public subtract(position: Position): this
	public subtract(v: Position | Vector): this {
		const position = 'x' in v ? v : v.position
		this.position.x -= position.x
		this.position.y -= position.y
		return this
	}

	public add(vector: Vector): this
	public add(position: Position): this
	public add(v: Position | Vector): this {
		const position = 'x' in v ? v : v.position
		this.position.x += position.x
		this.position.y += position.y
		return this
	}

	public scale(s: number): this {
		this.position.x *= s
		this.position.y *= s
		return this
	}

	public dist(vector: Vector): number
	public dist(position: Position): number
	public dist(v: Position | Vector): number {
		const position = 'x' in v ? v : v.position
		const x = this.position.x - position.x
		const y = this.position.y - position.y
		return Vector.getHypotenuse({ x, y })
	}

	public static getHypotenuse(v: Position): number {
		return Math.sqrt(v.x ** 2 + v.y ** 2)
	}
}

export default Vector
