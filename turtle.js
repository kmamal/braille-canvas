const { BrailleCanvas } = require('./canvas')
const { bresenham } = require('./bresenham')
const { ceilTo } = require('@kmamal/util/number/rounding')


class Turtle {
	constructor () {
		this._steps = []
		this._x = 0
		this._y = 0
		this._angle = 0
		this._xMin = 0
		this._xMax = 0
		this._yMin = 0
		this._yMax = 0
	}

	forward (n) {
		this._x -= Math.sin(this._angle) * n
		this._y -= Math.cos(this._angle) * n
		this._steps.push([ this._x, this._y ])
		this._xMin = Math.min(this._xMin, this._x)
		this._yMin = Math.min(this._yMin, this._y)
		this._xMax = Math.max(this._xMax, this._x)
		this._yMax = Math.max(this._yMax, this._y)
		return this
	}

	backward (n) { return this.forward(-n) }

	turnLeft (a) { this._angle += a; return this }
	turnRight (a) { return this.turnLeft(-a) }

	frame () {
		const xMin = Math.floor(this._xMin)
		const yMin = Math.floor(this._yMin)
		const xMax = Math.ceil(this._xMax)
		const yMax = Math.ceil(this._yMax)
		const width = ceilTo(xMax - xMin + 1, 2)
		const height = ceilTo(yMax - yMin + 1, 4)
		const canvas = new BrailleCanvas(width, height)
		let x0 = -this._xMin
		let y0 = -this._yMin
		for (let i = 0; i < this._steps.length; i++) {
			const [ _x1, _y1 ] = this._steps[i]
			const x1 = _x1 - this._xMin
			const y1 = _y1 - this._yMin
			bresenham(x0, y0, x1, y1, (x, y) => {
				canvas.set(x, y)
			})
			x0 = x1
			y0 = y1
		}
		return canvas
	}
}


// const t = new Turtle()
// const tenDeg = 2 * Math.PI / 36
// for (let i = 0; i < 36; i++) {
// 	for (let j = 0; j < 36; j++) {
// 		t.forward(8)
// 		t.turnRight(tenDeg)
// 	}
// 	t.turnRight(tenDeg)
// }
// const canvas = t.frame()
// console.log(canvas.render())


module.exports = { Turtle }
