import Rectangle from './rectangle'
import { Position } from './types'

interface PositionRef<T = any> {
	position: Position
	ref: T
}

interface QuadTree<T = any> {
	isLeaf: boolean
	points: PositionRef<T>[]
	nw: QuadTree
	ne: QuadTree
	sw: QuadTree
	se: QuadTree
}

class QuadTree<T = any> {
	constructor(private _boundary: Rectangle, private _capacity: number) {
		this.isLeaf = true
		this.points = []
		this.nw = null
		this.ne = null
		this.sw = null
		this.se = null
	}

	public query(r: Rectangle): PositionRef<T>[] {
		if (!this._boundary.intersects(r)) return []
		if (this.isLeaf) return this.points
		return this.getLeaves().flatMap((leaf) => leaf.query(r))
	}

	public insert(position: Position, ref: T): boolean {
		if (this._boundary.contains(position)) {
			if (this.isLeaf) {
				if (this.points.length === this._capacity) {
					this.divide()
					return this.pushPointToLeaves(position, ref)
				} else {
					this.points.push({ position, ref })
					return true
				}
			} else {
				return this.pushPointToLeaves(position, ref)
			}
		}
	}

	private pushPointToLeaves(position: Position, ref: T): true {
		const leaves = this.getLeaves()
		for (let i = 0; i < leaves.length; i++) {
			const leaf = leaves[i]
			if (leaf.insert(position, ref)) return true
		}
	}

	private divide(): void {
		this.createLeaves()
		for (let i = 0; i < this.points.length; i++) {
			const { position, ref } = this.points[i]
			this.pushPointToLeaves(position, ref)
		}
		this.points = null
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

	private getLeaves(): QuadTree<T>[] {
		return [this.nw, this.ne, this.sw, this.se]
	}
}

export default QuadTree
