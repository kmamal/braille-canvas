const { Turtle } = require('../src/turtle')

const tenDeg = 2 * Math.PI / 36

const t = new Turtle()

for (let i = 0; i < 36; i++) {
	for (let j = 0; j < 36; j++) {
		t.forward(8)
		t.turnRight(tenDeg)
	}
	t.turnRight(tenDeg)
}

const canvas = t.frame()

console.log(canvas.render())
