"use strict";

const start_position = 300;

function createShader(gl, type, source) {
	let shader = gl.createShader(type);   // создание шейдера
	gl.shaderSource(shader, source);      // устанавливаем шейдеру его программный код
	gl.compileShader(shader);             // компилируем шейдер
	let success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
	if (success) {                        // если компиляция прошла успешно - возвращаем шейдер
		return shader;
	}

	console.log(gl.getShaderInfoLog(shader));
	gl.deleteShader(shader);
}

function createProgram(gl, vertexShaderID, fragmentShaderID) {
	// Get the strings for our GLSL shaders
	let vertexShaderSource = document.querySelector(vertexShaderID).text;
	let fragmentShaderSource = document.querySelector(fragmentShaderID).text;

	// create GLSL shaders, upload the GLSL source, compile the shaders
	let vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
	let fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);

	let program = gl.createProgram();
	gl.attachShader(program, vertexShader);
	gl.attachShader(program, fragmentShader);
	gl.linkProgram(program);
	let success = gl.getProgramParameter(program, gl.LINK_STATUS);
	if (success) {
		return program;
	}

	console.log(gl.getProgramInfoLog(program));
	gl.deleteProgram(program);
}

function setupListeners(updatePosition, resetPosition, width, height, step = 10) {
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
		} else if(e.keyCode === 32) {
			e.preventDefault()
			resetPosition()
		} else if(e.code === 'Escape') {
			alert('What are you want?')
		}
	})
}

function drawTranslationValue(translation) {
	let div = document.getElementById('translation')
	div.innerHTML = 'x: ' + translation[0] + '<br>y: ' + translation[1]
}

function setTheme() {
	let currentTime = new Date().getHours();
	if (document.body) {
		if (7 >= currentTime || currentTime >= 16) {
			document.body.className = 'dark'
		}
	}
}

function main() {
	// Get A WebGL context
	/** @type {HTMLCanvasElement} */
	let canvas = document.getElementById('canvas');
	let gl = canvas.getContext("webgl");
	if (!gl) {
		let not_supported = document.querySelector('.canvas-bottom')
		not_supported.classList.remove('hide')
		return;
	}

	setTheme()

	// Link the two shaders into a program
	let program = createProgram(gl, '#vertex-shader-2d', '#fragment-shader-2d');

	// look up where the vertex data needs to go.
	let positionLocation = gl.getAttribLocation(program, "a_position");

	// lookup uniforms
	let resolutionLocation = gl.getUniformLocation(program, "u_resolution");
	let colorLocation = gl.getUniformLocation(program, "u_color");
	let translationLocation = gl.getUniformLocation(program, 'u_translation')

	// Create a buffer to put positions in
	let positionBuffer = gl.createBuffer();

	// Bind it to ARRAY_BUFFER (think of it as ARRAY_BUFFER = positionBuffer)
	gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
	setGeometry(gl)

	let translation = [start_position, start_position];
	let width = 200;
	let height = 300;
	let color = [Math.random(), Math.random(), Math.random(), 1];

	drawScene();
	drawTranslationValue(translation);

	function updatePosition(index, value, max_value) {
		translation[index] = (translation[index] + value) % max_value;
		if(translation[index] < 0) {
			translation[index] += max_value
		}
		drawTranslationValue(translation)
		drawScene();
	}

	function resetPosition() {
		translation = [start_position, start_position]
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

		// Tell the attribute how to get data out of positionBuffer (ARRAY_BUFFER)
		let size = 2;          // 2 components per iteration
		let type = gl.FLOAT;   // the data is 32bit floats
		let normalize = false; // don't normalize the data
		let stride = 0;        // 0 = move forward size * sizeof(type) each iteration to get the next position
		let offset = 0;        // start at the beginning of the buffer
		gl.vertexAttribPointer(positionLocation, size, type, normalize, stride, offset);

		// set the resolution
		gl.uniform2f(resolutionLocation, gl.canvas.width, gl.canvas.height);

		// set the color
		gl.uniform4fv(colorLocation, color);

		// Set the translation.
		gl.uniform2fv(translationLocation, translation);

		// Draw the geometry.
		let primitiveType = gl.TRIANGLES;
		offset = 0;
		let count = 18;  // 6 triangles in the 'F', 3 points per triangle
		gl.drawArrays(primitiveType, offset, count);
	}
}

function setGeometry(gl) {
	gl.bufferData(
			gl.ARRAY_BUFFER,
			new Float32Array([
					// вертикальный столб
					0, 0,
					30, 0,
					0, 150,
					0, 150,
					30, 0,
					30, 150,

					// верхняя перекладина
					30, 0,
					100, 0,
					30, 30,
					30, 30,
					100, 0,
					100, 30,

					// перекладина посередине
					30, 60,
					67, 60,
					30, 90,
					30, 90,
					67, 60,
					67, 90,
			]),
			gl.STATIC_DRAW);
}

main();
