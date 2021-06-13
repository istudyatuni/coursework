import { RAD } from './math.js'

function drawPressedKey(key) {
	document.getElementById('pressed-key').innerHTML = key
}

/**
 * Wrapper for document keydown listener
 * code parameter:
 *   https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/code/code_values
 *   Examples:
 *     digits: 'Digit5' or 'Digit9', etc
 *     keys: 'KeyM' or 'KeyQ', etc
 *     numpad digits: 'Numpad7'
 *
 * Examples:
 *   // move faster when ctrl key pressed
 *   onKeydown('KeyM', (coeff) => {
 *     move(5 * coeff)
 *   }, 5)
 *
 *   // move slower when ctrl key pressed
 *   onKeydown('KeyM', (coeff) => {
 *     move(5 * coeff)
 *   }, 1, 5)
 *
 *   // move only when ctrl key pressed
 *   onKeydown('KeyM', (coeff) => {
 *     move(5 * coeff)
 *   }, 1, null)
 *
 *   // without multiplier
 *   onKeydown('KeyM', () => {
 *     move(5)
 *   })
 *
 * @param  {string}                  code       code of trigger key
 * @param  {(coeff: number) => void} action     function for action
 * @param  {number}                  ctrl_coeff multiplier when ctrl pressed with key
 * @param  {number}                  coeff      multiplier when pressed only key without ctrl
 * @return {void}
 */
function onKeydown(code, action, ctrl_coeff = 1, coeff = 1) {
	document.addEventListener('keydown', (e) => {
		if (e.altKey) {
			return;
		}
		if(e.code === code) {
			drawPressedKey(e.code)

			e.preventDefault()
			action(e.ctrlKey ? ctrl_coeff : coeff)
		}
	})
}

export function setupListeners(
	updatePosition, updateRotation, updateScale,
	resetAll,
	width, height,
	step = 5 )
{
	// move
	onKeydown('Numpad6', (coeff) => {
		updatePosition(0, step * coeff, width)
	}, 4)
	onKeydown('Numpad4', (coeff) => {
		updatePosition(0, -1 * step * coeff, width)
	}, 4)
	onKeydown('Numpad8', (coeff) => {
		updatePosition(1, -1 * step * coeff, height)
	}, 4)
	onKeydown('Numpad2', (coeff) => {
		updatePosition(1, step * coeff, height)
	}, 4)
	onKeydown('Numpad5', (coeff) => {
		updatePosition(2, step * coeff, 400)
	}, -4, 4)

	// rotate
	onKeydown('KeyX', (coeff) => {
		updateRotation(0, 2 * coeff * RAD)
	}, -10, 10)
	onKeydown('KeyY', (coeff) => {
		updateRotation(1, 2 * coeff * RAD)
	}, -10, 10)
	onKeydown('KeyZ', (coeff) => {
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
	onKeydown('Space', resetAll)
}

export function drawTranslationValue(translation) {
	let translationBox = document.getElementById('translation')
	translationBox.innerHTML =
		'x: ' + translation[0] + '<br>' +
		'y: ' + translation[1] + '<br>' +
		'z: ' + translation[2]
}

export function setTheme() {
	let currentTime = new Date().getHours();
	if (document.body) {
		if (currentTime <= 7 || 16 <= currentTime) {
			document.body.className = 'dark'
		}
	}
}
