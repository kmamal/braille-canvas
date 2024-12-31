
const bresenham = (x0, y0, x1, y1, fn) => {
	const dx = x1 - x0
	const dy = y1 - y0
	if (Math.abs(dx) >= Math.abs(dy)) {
		const first = Math.round(x0)
		const last = Math.round(x1)
		const step = Math.sign(dx)
		const slope = dy / dx
		for (let x = first; x !== last; x += step) {
			fn(x, Math.round(slope * (x - x0) + y0))
		}
	} else {
		const first = Math.round(y0)
		const last = Math.round(y1)
		const step = Math.sign(dy)
		const slope = dx / dy
		for (let y = first; y !== last; y += step) {
			fn(Math.round(slope * (y - y0) + x0), y)
		}
	}
}

module.exports = { bresenham }
