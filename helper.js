import { RAD } from './math.js'

function drawPressedKey(key) {
	if(key === ' ') {
		key = 'Spacebar'
	}
	document.getElementById('pressed-key').innerHTML = key
}

function onKeydown(key, action, ctrl_coeff = 1, coeff = 1) {
	document.addEventListener('keydown', (e) => {
		if (e.altKey) {
			return;
		}
		if(e.key === key) {
			drawPressedKey(key)

			e.preventDefault()
			let a = coeff
			if(e.ctrlKey) {
				a = ctrl_coeff
			}
			action(a)
		}
	})
}

export function setupListeners(updatePosition, updateRotation, updateScale, resetAll, width, height, step = 5) {
	// move
	onKeydown('6', (coeff) => {
		updatePosition(0, step * coeff, width)
	}, 4)
	onKeydown('4', (coeff) => {
		updatePosition(0, -1 * step * coeff, width)
	}, 4)
	onKeydown('8', (coeff) => {
		updatePosition(1, -1 * step * coeff, height)
	}, 4)
	onKeydown('2', (coeff) => {
		updatePosition(1, step * coeff, height)
	}, 4)
	onKeydown('5', (coeff) => {
		updatePosition(2, step * coeff, 400)
	}, -4, 4)

	// rotate
	onKeydown('x', (coeff) => {
		updateRotation(0, 2 * coeff * RAD)
	}, -10, 10)
	onKeydown('y', (coeff) => {
		updateRotation(1, 2 * coeff * RAD)
	}, -10, 10)
	onKeydown('z', (coeff) => {
		updateRotation(2, 2 * coeff * RAD)
	}, -10, 10)

	// scale
	onKeydown('ArrowLeft', (coeff) => {
		updateScale(0, -0.03 * coeff)
	}, 3)
	onKeydown('ArrowRight', (coeff) => {
		updateScale(0, 0.03 * coeff)
	}, 3)
	onKeydown('ArrowUp', (coeff) => {
		updateScale(1, -0.03 * coeff)
	}, 3)
	onKeydown('ArrowDown', (coeff) => {
		updateScale(1, 0.03 * coeff)
	}, 3)

	// reset
	onKeydown(' ', (coeff) => {
		resetAll()
	})
}

export function drawTranslationValue(translation) {
	let translationBox = document.getElementById('translation')
	translationBox.innerHTML = 'x: ' + translation[0] + '<br>y: ' + translation[1] + '<br>z: ' + translation[2]
}

export function setTheme() {
	let currentTime = new Date().getHours();
	if (document.body) {
		if (currentTime <= 7 || 16 <= currentTime) {
			document.body.className = 'dark'
		}
	}
}

// Fill the buffer with the values that define a letter 'F'.
export function setGeometry(gl) {
	gl.bufferData(
		gl.ARRAY_BUFFER,
		new Float32Array([
			// left column front
			0,   0,  0,
			30,   0,  0,
			0, 150,  0,
			0, 150,  0,
			30,   0,  0,
			30, 150,  0,

			// top rung front
			30,   0,  0,
			100,   0,  0,
			30,  30,  0,
			30,  30,  0,
			100,   0,  0,
			100,  30,  0,

			// middle rung front
			30,  60,  0,
			67,  60,  0,
			30,  90,  0,
			30,  90,  0,
			67,  60,  0,
			67,  90,  0,

			// left column back
			0,   0,  30,
			30,   0,  30,
			0, 150,  30,
			0, 150,  30,
			30,   0,  30,
			30, 150,  30,

			// top rung back
			30,   0,  30,
			100,   0,  30,
			30,  30,  30,
			30,  30,  30,
			100,   0,  30,
			100,  30,  30,

			// middle rung back
			30,  60,  30,
			67,  60,  30,
			30,  90,  30,
			30,  90,  30,
			67,  60,  30,
			67,  90,  30,

			// top
			0,   0,  0,
			100, 0,  0,
			100, 0, 30,
			0,   0,  0,
			100, 0, 30,
			0,   0, 30,

			// top rung right
			100,   0,   0,
			100,  30,   0,
			100,  30,  30,
			100,   0,   0,
			100,  30,  30,
			100,   0,  30,

			// under top rung
			30,   30,   0,
			30,   30,  30,
			100,  30,  30,
			30,   30,   0,
			100,  30,  30,
			100,  30,   0,

			// between top rung and middle
			30,   30,   0,
			30,   30,  30,
			30,   60,  30,
			30,   30,   0,
			30,   60,  30,
			30,   60,   0,

			// top of middle rung
			30,   60,   0,
			30,   60,  30,
			67,   60,  30,
			30,   60,   0,
			67,   60,  30,
			67,   60,   0,

			// right of middle rung
			67,   60,   0,
			67,   60,  30,
			67,   90,  30,
			67,   60,   0,
			67,   90,  30,
			67,   90,   0,

			// bottom of middle rung.
			30,   90,   0,
			30,   90,  30,
			67,   90,  30,
			30,   90,   0,
			67,   90,  30,
			67,   90,   0,

			// right of bottom
			30,   90,   0,
			30,   90,  30,
			30,  150,  30,
			30,   90,   0,
			30,  150,  30,
			30,  150,   0,

			// bottom
			0,   150,   0,
			0,   150,  30,
			30,  150,  30,
			0,   150,   0,
			30,  150,  30,
			30,  150,   0,

			// left side
			0,   0,   0,
			0,   0,  30,
			0, 150,  30,
			0,   0,   0,
			0, 150,  30,
			0, 150,   0]),
		gl.STATIC_DRAW);
}

// Fill the buffer with colors for the 'F'.
export function setColors(gl) {
	gl.bufferData(
		gl.ARRAY_BUFFER,
		new Uint8Array([
				// left column front
			200,  70, 120,
			200,  70, 120,
			200,  70, 120,
			200,  70, 120,
			200,  70, 120,
			200,  70, 120,

				// top rung front
			200,  70, 120,
			200,  70, 120,
			200,  70, 120,
			200,  70, 120,
			200,  70, 120,
			200,  70, 120,

				// middle rung front
			200,  70, 120,
			200,  70, 120,
			200,  70, 120,
			200,  70, 120,
			200,  70, 120,
			200,  70, 120,

				// left column back
			80, 70, 200,
			80, 70, 200,
			80, 70, 200,
			80, 70, 200,
			80, 70, 200,
			80, 70, 200,

				// top rung back
			80, 70, 200,
			80, 70, 200,
			80, 70, 200,
			80, 70, 200,
			80, 70, 200,
			80, 70, 200,

				// middle rung back
			80, 70, 200,
			80, 70, 200,
			80, 70, 200,
			80, 70, 200,
			80, 70, 200,
			80, 70, 200,

				// top
			70, 200, 210,
			70, 200, 210,
			70, 200, 210,
			70, 200, 210,
			70, 200, 210,
			70, 200, 210,

				// top rung right
			200, 200, 70,
			200, 200, 70,
			200, 200, 70,
			200, 200, 70,
			200, 200, 70,
			200, 200, 70,

				// under top rung
			210, 100, 70,
			210, 100, 70,
			210, 100, 70,
			210, 100, 70,
			210, 100, 70,
			210, 100, 70,

				// between top rung and middle
			210, 160, 70,
			210, 160, 70,
			210, 160, 70,
			210, 160, 70,
			210, 160, 70,
			210, 160, 70,

				// top of middle rung
			70, 180, 210,
			70, 180, 210,
			70, 180, 210,
			70, 180, 210,
			70, 180, 210,
			70, 180, 210,

				// right of middle rung
			100, 70, 210,
			100, 70, 210,
			100, 70, 210,
			100, 70, 210,
			100, 70, 210,
			100, 70, 210,

				// bottom of middle rung.
			76, 210, 100,
			76, 210, 100,
			76, 210, 100,
			76, 210, 100,
			76, 210, 100,
			76, 210, 100,

				// right of bottom
			140, 210, 80,
			140, 210, 80,
			140, 210, 80,
			140, 210, 80,
			140, 210, 80,
			140, 210, 80,

				// bottom
			90, 130, 110,
			90, 130, 110,
			90, 130, 110,
			90, 130, 110,
			90, 130, 110,
			90, 130, 110,

				// left side
			160, 160, 220,
			160, 160, 220,
			160, 160, 220,
			160, 160, 220,
			160, 160, 220,
			160, 160, 220
		]),
		gl.STATIC_DRAW);
}
