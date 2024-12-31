
const BRAILLE = new Array(256)
for (let i = 0; i < BRAILLE.length; i++) {
	BRAILLE[i] = String.fromCharCode(0x2800 + i)
}

const SET_MASKS = [
	[ 0x01, 0x08 ],
	[ 0x02, 0x10 ],
	[ 0x04, 0x20 ],
	[ 0x40, 0x80 ],
]

const UNSET_MASKS = [
	[ 0xFE, 0xF7 ],
	[ 0xFD, 0xEF ],
	[ 0xFB, 0xDF ],
	[ 0xBF, 0x7F ],
]


class BrailleCanvas {
	constructor (width, height) {
		if (width <= 0) { throw new Error("width must be positive") }
		if (height <= 0) { throw new Error("height must be positive") }
		if (width % 2 !== 0) { throw new Error("width must be multiple of 2") }
		if (height % 4 !== 0) { throw new Error("height must be multiple of 4") }

		this._width = width
		this._height = height
		this._canvas = new Array((this._width / 2) * (this._height / 4))
		this.reset()
	}

	get width () { return this._width }
	get height () { return this._height }

	reset () {
		this._canvas.fill(0)
	}

	_getIndex (_x, _y) {
		const x = Math.floor(_x / 2)
		const y = Math.floor(_y / 4)
		const W = this._width / 2
		return y * W + x
	}

	set (x, y) {
		if (x < 0 || this._width < x || y < 0 || this._height < y) { return }
		const index = this._getIndex(x, y)
		this._canvas[index] |= SET_MASKS[y % 4][x % 2]
	}

	unset (x, y) {
		if (x < 0 || this._width < x || y < 0 || this._height < y) { return }
		const index = this._getIndex(x, y)
		this._canvas[index] &= UNSET_MASKS[y % 4][x % 2]
	}

	toggle (x, y) {
		if (x < 0 || this._width < x || y < 0 || this._height < y) { return }
		const index = this._getIndex(x, y)
		this._canvas[index] ^= SET_MASKS[y % 4][x % 2]
	}

	render () {
		const W = this._width / 2
		const H = this._height / 4
		const parts = new Array((W + 1) * H - 1)

		for (let j = 0; j < W; j++) {
			parts[j] = BRAILLE[this._canvas[j]]
		}
		for (let i = 1; i < H; i++) {
			parts[(W + 1) * i - 1] = '\n'
			for (let j = 0; j < W; j++) {
				parts[(W + 1) * i + j] = BRAILLE[this._canvas[W * i + j]]
			}
		}

		return parts.join('')
	}
}

module.exports = { BrailleCanvas }
