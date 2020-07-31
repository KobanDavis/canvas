import { Position } from './types'
import Vector from './vector'

class Mouse {
	private position: Position
	constructor() {
		this.position = { x: innerWidth / 2, y: innerHeight / 2 }
		this.init()
	}

	private init(): void {
		window.addEventListener('mousemove', (e) => {
			this.position = { x: e.pageX, y: e.pageY }
		})
	}

	public getPosition(): Vector {
		return new Vector(this.position)
	}
}

export default Mouse
