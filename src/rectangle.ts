import Vector from './vector'

interface Rectangle {
	x: number
	y: number
	width: number
	height: number
}

class Rectangle {
	constructor(x: number, y: number, width: number, height: number) {
		this.x = x
		this.y = y
		this.width = width
		this.height = height
	}

	public contains(v: Vector): boolean {
		const { x, y } = v.position
		return x >= this.x && x <= this.x + this.width && y >= this.y && y <= this.y + this.height
	}

	public intersects(r: Rectangle): boolean {
		const { x, y, width, height } = r

		return !(
			// right side of r1 < left side of r2
			(
				this.x + this.width < x ||
				// bottom side of r1 < top side of r2
				this.y + this.height < y ||
				// left side of r1 > right side of r2
				this.x > x + width ||
				// top side of r1 > bottom side of r2
				this.y > y + height
			)
		)
	}
}

export default Rectangle
