import Rectangle from './rectangle'
import Vector from './vector'

interface QuadTree {
	isLeaf: boolean
	points: Vector[]
	nw: QuadTree
	ne: QuadTree
	sw: QuadTree
	se: QuadTree
}

class QuadTree {
	constructor(private _boundary: Rectangle, private _capacity: number) {
		this.isLeaf = true
		this.points = []
		this.nw = null
		this.ne = null
		this.sw = null
		this.se = null
	}

	private getPointsByBoundary(r: Rectangle): Vector[] {
		if (!this._boundary.intersects(r)) return []
		if (this.isLeaf) return this.points
		return this.getLeaves().flatMap((leaf) => leaf.getPointsByBoundary(r))
	}

	private addPoint(v: Vector): boolean {
		if (this._boundary.contains(v)) {
			this.points.push(v)
			if (this.points.length > this._capacity) {
				this.divide()
			}
			return true
		}
		return false
	}

	private divide(): void {
		this.createLeaves()
		for (let i = 0; i < this.points.length; i++) {
			const point = this.points[i]
			this.pushPointToLeaves(point)
		}
		this.isLeaf = false
	}

	private createLeaves(): void {
		const { x, y, width, height } = this._boundary
		const nwRect = new Rectangle(x, y, width / 2, height / 2)
		this.nw = new QuadTree(nwRect, this._capacity)
		const neRect = new Rectangle(x + width / 2, y, width / 2, height / 2)
		this.ne = new QuadTree(neRect, this._capacity)
		const swRect = new Rectangle(x, y + height / 2, width / 2, height / 2)
		this.sw = new QuadTree(swRect, this._capacity)
		const seRect = new Rectangle(x + width / 2, y + height / 2, width / 2, height / 2)
		this.se = new QuadTree(seRect, this._capacity)
	}

	private pushPointToLeaves(v: Vector): void {
		const leaves = this.getLeaves()
		for (let i = 0; i < leaves.length; i++) {
			if (leaves[i].insert(v)) return
		}
		throw new Error("This shouldn't happen")
	}

	public insert(v: Vector): boolean {
		if (this.isLeaf) {
			return this.addPoint(v)
		}
		this.pushPointToLeaves(v)
		return true
	}

	private getLeaves(): QuadTree[] {
		return [this.nw, this.ne, this.sw, this.se]
	}
}

export default QuadTree
