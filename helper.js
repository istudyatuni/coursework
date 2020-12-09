export function setupListeners(updatePosition, rotatePosition, resetPosition, width, height, step = 10) {
	document.addEventListener('keydown', (e) => {
		if(e.code === 'ArrowUp') {
			e.preventDefault(); let a = 1; if(e.ctrlKey) a = 3;

			updatePosition(1, -1 * step * a, height)
		} else if(e.code === 'ArrowDown') {
			e.preventDefault(); let a = 1; if(e.ctrlKey) a = 3;

			updatePosition(1, step * a, height)
		} else if(e.code === 'ArrowRight') {
			e.preventDefault(); let a = 1; if(e.ctrlKey) a = 3;

			updatePosition(0, step * a, width)
		} else if(e.code === 'ArrowLeft') {
			e.preventDefault(); let a = 1; if(e.ctrlKey) a = 3;

			updatePosition(0, -1 * step * a, width)
		} else if(e.key === 'a') {
			e.preventDefault(); let a = 1; if(e.ctrlKey) a = 3;

			rotatePosition(2 * a)
		} else if(e.key === 'd') {
			e.preventDefault(); let a = 1; if(e.ctrlKey) a = 3;

			rotatePosition(-2 * a)
		} else if(e.keyCode === 32) {
			e.preventDefault()

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
