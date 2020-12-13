"use strict";
import { createShader, createProgram } from './gl-utils.js'
import { setupListeners, drawTranslationValue, setTheme, increaseColor, setGeometry } from './helper.js'
import { mat3 } from './matrix.js'

const start_position = 300;
const center = [-50, -75]

function main() {
	// Get A WebGL context
	/** @type {HTMLCanvasElement} */
	let canvas = document.getElementById('canvas');
	let gl = canvas.getContext("webgl");
	if (!gl) {
		document.querySelector('.canvas-bottom').classList.remove('hide')
		return;
	}

	setTheme()

	// Link the two shaders into a program
	let program = createProgram(gl, '#vertex-shader-2d', '#fragment-shader-2d');

	// look up where the vertex data needs to go.
	let positionLocation = gl.getAttribLocation(program, "a_position");

	// lookup uniforms
	let colorLocation = gl.getUniformLocation(program, "u_color");
	let matrixLocation = gl.getUniformLocation(program, "u_matrix")

	// Create a buffer to put positions in
	let positionBuffer = gl.createBuffer();

	// Bind it to ARRAY_BUFFER (think of it as ARRAY_BUFFER = positionBuffer)
	gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

	setGeometry(gl)

	let translation = [start_position, start_position];

	let rad = 0
	let rotation = [Math.sin(rad), Math.cos(rad)]

	let scale = [1, 1]

	let width = 200;
	let height = 300;
	let color = [Math.random(), Math.random(), Math.random(), 1];

	drawScene();
	drawTranslationValue(translation, center);

	function updatePosition(index, value, max_value) {
		translation[index] = (translation[index] + value) % max_value;
		if(translation[index] < 0) {
			translation[index] += max_value
		}
		drawTranslationValue(translation, center)
		drawScene();
	}

	function rotatePosition(value) {
		rad += value * 0.1
		rotation = [Math.sin(rad), Math.cos(rad)]
		drawScene();
	}

	function scalePosition(index, value) {
		scale[index] += value
		drawScene()
	}

	function resetPosition() {
		translation = [start_position, start_position]

		rad = 0
		rotation = [Math.sin(rad), Math.cos(rad)]

		scale = [1, 1]

		drawTranslationValue(translation)
		drawScene();
	}

	setupListeners(updatePosition, rotatePosition, scalePosition, resetPosition, gl.canvas.width, gl.canvas.height)

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

		// set the color
		color = increaseColor(color)
		gl.uniform4fv(colorLocation, color);

		// Создаём матрицы
		let projectionMatrix = mat3.projection(gl.canvas.clientWidth, gl.canvas.clientHeight)

		let matrix = mat3.translate(mat3.identity(), translation[0], translation[1])
		matrix = mat3.rotate(matrix, rad)
		matrix = mat3.scale(matrix, scale[0], scale[1])

		// move origin to center
		matrix = mat3.translate(matrix, center[0], center[1])

		matrix = mat3.multiply(matrix, projectionMatrix)

		gl.uniformMatrix3fv(matrixLocation, false, matrix)

		// Draw the geometry.
		let primitiveType = gl.TRIANGLES;
		offset = 0;
		let count = 18;  // 6 triangles in the 'F', 3 points per triangle
		gl.drawArrays(primitiveType, offset, count);
	}
}

main();
