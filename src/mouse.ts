import Vector from './vector'

class Mouse {
	private position: Vector
	constructor() {
		this.position = new Vector({ x: innerWidth / 2, y: innerHeight / 2 })
		this.init()
	}

	private init(): void {
		window.addEventListener('mousemove', (e) => {
			this.position.set({ x: e.pageX, y: e.pageY })
		})
	}

	public getPosition(): Vector {
		return this.position
	}
}

export default Mouse
