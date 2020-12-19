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
