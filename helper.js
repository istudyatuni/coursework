export function setupListeners(updatePosition, rotatePosition, scalePosition, resetPosition, width, height, step = 10) {
	document.addEventListener('keydown', (e) => {
		if (e.altKey) {
			return;
		}
		let a = 1;
		function defaultAction() {
			e.preventDefault(); if(e.ctrlKey) a = 3;
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
			rotatePosition(2 * a)
		} else if(e.key === 'd') {
			defaultAction()
			rotatePosition(-2 * a)
		}

		else if(e.key === '8') {
			defaultAction()
			scalePosition(1, -0.03 * a)
		} else if(e.key === '4') {
			defaultAction()
			scalePosition(0, -0.03 * a)
		} else if(e.key === '6') {
			defaultAction()
			scalePosition(0, 0.03 * a)
		} else if(e.key === '2') {
			defaultAction()
			scalePosition(1, 0.03 * a)
		}

		else if(e.keyCode === 32) {
			defaultAction()
			resetPosition()
		} else if(e.code === 'Escape') {
			alert('What are you want?')
		}
	})
}

export function drawTranslationValue(translation) {
	let div = document.getElementById('translation')
	div.innerHTML = 'x: ' + translation[0] + '<br>y: ' + translation[1]
}

export function setTheme() {
	let currentTime = new Date().getHours();
	if (document.body) {
		if (currentTime <= 7 || 16 <= currentTime) {
			document.body.className = 'dark'
		}
	}
}
