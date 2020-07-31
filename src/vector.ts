import { Position } from './types'

interface Vector {
	position: Position
}

class Vector {
	constructor(position: Position | Vector) {
		if ('x' in position) {
			const { x, y } = position
			this.position = { x, y }
		} else {
			const {
				position: { x, y },
			} = position
			this.position = { x, y }
		}
	}

	public normalise(): this {
		const hypotenuse = Vector.getHypotenuse(this.position)
		this.position.x = this.position.x / hypotenuse || 0
		this.position.y = this.position.y / hypotenuse || 0
		return this
	}

	public subtract(v: Position | Vector): this {
		const position = 'x' in v ? v : v.position
		this.position.x -= position.x
		this.position.y -= position.y
		return this
	}

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
