"use strict";

function setupListeners(updatePosition, resetPosition, width, height, step = 10) {
	document.addEventListener('keydown', (e) => {
		if(e.code === 'ArrowUp') {
			e.preventDefault(); let a = 1; if(e.ctrlKey) a = 3

			updatePosition(1, -1 * step * a, height)
		} else if(e.code === 'ArrowDown') {
			e.preventDefault(); let a = 1; if(e.ctrlKey) a = 3

			updatePosition(1, step * a, height)
		} else if(e.code === 'ArrowRight') {
			e.preventDefault(); let a = 1; if(e.ctrlKey) a = 3

			updatePosition(0, step * a, width)
		} else if(e.code === 'ArrowLeft') {
			e.preventDefault(); let a = 1; if(e.ctrlKey) a = 3

			updatePosition(0, -1 * step * a, width)
		} else if(e.keyCode === 32) {
			e.preventDefault()
			resetPosition()
		}
	})
}

function drawTranslationValue(translation) {
	let div = document.getElementById('translation')
	div.innerHTML = 'x: ' + translation[0] + '<br>y: ' + translation[1]
}

function main() {
	// Get A WebGL context
	/** @type {HTMLCanvasElement} */
	let canvas = document.querySelector("#canvas");
	let gl = canvas.getContext("webgl");
	if (!gl) {
		let not_supported = document.querySelector('.canvas-bottom')
		not_supported.classList.remove('hide')
		return;
	}

	// setup GLSL program
	let program = webglUtils.createProgramFromScripts(gl, ["vertex-shader-2d", "fragment-shader-2d"]);

	// look up where the vertex data needs to go.
	let positionLocation = gl.getAttribLocation(program, "a_position");

	// lookup uniforms
	let resolutionLocation = gl.getUniformLocation(program, "u_resolution");
	let colorLocation = gl.getUniformLocation(program, "u_color");

	// Create a buffer to put positions in
	let positionBuffer = gl.createBuffer();

	// Bind it to ARRAY_BUFFER (think of it as ARRAY_BUFFER = positionBuffer)
	gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

	let translation = [20, 20];
	let width = 200;
	let height = 300;
	let color = [Math.random(), Math.random(), Math.random(), 1];

	drawScene();

	function updatePosition(index, value, max_value) {
		translation[index] = (translation[index] + value) % max_value;
		if(translation[index] < 0) {
			translation[index] += max_value
		}
		drawTranslationValue(translation)
		drawScene();
	}

	function resetPosition() {
		translation = [20, 20]
		drawTranslationValue(translation)
		drawScene();
	}

	setupListeners(updatePosition, resetPosition, gl.canvas.width, gl.canvas.height)

	// Draw a the scene.
	function drawScene() {
    const clientWidth  = gl.canvas.clientWidth * 1 | 0
    const clientHeight = gl.canvas.clientHeight * 1 | 0
    if (gl.canvas.width !== clientWidth || gl.canvas.height !== clientHeight) {
      gl.canvas.width = clientWidth
      gl.canvas.height = clientHeight
    }

		// Tell WebGL how to convert from clip space to pixels
		gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

		// Clear the canvas.
		gl.clear(gl.COLOR_BUFFER_BIT);

		// Tell it to use our program (pair of shaders)
		gl.useProgram(program);

		// Turn on the attribute
		gl.enableVertexAttribArray(positionLocation);

		// Bind the position buffer.
		gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

		// Setup a rectangle
		setRectangle(gl, translation[0], translation[1], width, height);

		// Tell the attribute how to get data out of positionBuffer (ARRAY_BUFFER)
		let size = 2;          // 2 components per iteration
		let type = gl.FLOAT;   // the data is 32bit floats
		let normalize = false; // don't normalize the data
		let stride = 0;        // 0 = move forward size * sizeof(type) each iteration to get the next position
		let offset = 0;        // start at the beginning of the buffer
		gl.vertexAttribPointer(
				positionLocation, size, type, normalize, stride, offset);

		// set the resolution
		gl.uniform2f(resolutionLocation, gl.canvas.width, gl.canvas.height);

		// set the color
		gl.uniform4fv(colorLocation, color);

		// Draw the rectangle.
		let primitiveType = gl.TRIANGLES;
		offset = 0;
		let count = 6;
		gl.drawArrays(primitiveType, offset, count);
	}
}

// Fill the buffer with the values that define a rectangle.
function setRectangle(gl, x, y, width, height) {
	let x1 = x;
	let x2 = x + width;
	let y1 = y;
	let y2 = y + height;
	gl.bufferData(
		gl.ARRAY_BUFFER,
		new Float32Array([
			x1, y1,
			x2, y1,
			x1, y2,
			x1, y2,
			x2, y1,
			x2, y2,
		]),
		gl.STATIC_DRAW);
}

main();
