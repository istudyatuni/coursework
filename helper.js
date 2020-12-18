export function setupListeners(updatePosition, updateRotation, updateScale, resetAll, width, height, step = 5) {
	document.addEventListener('keydown', (e) => {
		if (e.altKey) {
			return;
		}
		let a = 1;
		function defaultAction() {
			e.preventDefault(); if(e.ctrlKey) a = 4;
		}
		if(e.code === 'ArrowUp') {
			defaultAction()
			updatePosition(1, -1 * step * a, height)
		} else if(e.code === 'ArrowDown') {
			defaultAction()
			updatePosition(1, step * a, height)
		} else if(e.code === 'ArrowRight') {
			defaultAction()
			updatePosition(0, step * a, width)
		} else if(e.code === 'ArrowLeft') {
			defaultAction()
			updatePosition(0, -1 * step * a, width)
		} else if(e.key === 'a') {
			defaultAction()
			updateRotation(2 * a)
		} else if(e.key === 'd') {
			defaultAction()
			updateRotation(-2 * a)
		}

		else if(e.key === '8') {
			defaultAction()
			updateScale(1, -0.03 * a)
		} else if(e.key === '4') {
			defaultAction()
			updateScale(0, -0.03 * a)
		} else if(e.key === '6') {
			defaultAction()
			updateScale(0, 0.03 * a)
		} else if(e.key === '2') {
			defaultAction()
			updateScale(1, 0.03 * a)
		}

		else if(e.keyCode === 32) {
			defaultAction()
			resetAll()
		} else if(e.code === 'Escape') {
			alert('What are you want?')
		}
	})
}

export function drawTranslationValue(translation, center) {
	let translationBox = document.getElementById('translation')
	translationBox.innerHTML = 'x: ' + (translation[0] + center[0]) + '<br>y: ' + (translation[1] + center[1])
}

export function setTheme() {
	let currentTime = new Date().getHours();
	if (document.body) {
		if (currentTime <= 7 || 16 <= currentTime) {
			document.body.className = 'dark'
		}
	}
}

let coeff = 1

export function increaseColor(color) {
	let ind = Math.floor(Math.random() * 3)
	color[ind] += (coeff / 10)
	if(color[ind] > 1) {
		coeff = -1
	} else if(color[ind] < 0) {
		coeff = 1
	}
	return color
}
// Fill the buffer with the values that define a letter 'F'.
export function setGeometry(gl) {
	gl.bufferData(
		gl.ARRAY_BUFFER,
		new Float32Array([
			// вертикальный столб
			0, 0, 0,
			30, 0, 0,
			0, 150, 0,
			0, 150, 0,
			30, 0, 0,
			30, 150, 0,

			// верхняя перекладина
			30, 0, 0,
			100, 0, 0,
			30, 30, 0,
			30, 30, 0,
			100, 0, 0,
			100, 30, 0,

			// перекладина посередине
			30, 60, 0,
			67, 60, 0,
			30, 90, 0,
			30, 90, 0,
			67, 60, 0,
			67, 90, 0
		]),
		gl.STATIC_DRAW);
}
