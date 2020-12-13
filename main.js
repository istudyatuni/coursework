"use strict";
import { createShader, createProgram } from './gl-utils.js'
import { setupListeners, drawTranslationValue, setTheme } from './helper.js'
const start_position = 300;
const center = [-50, -75]

let mat3 = {
	translation: function (tx, ty) {
		return [
			1, 0, 0,
			0, 1, 0,
			tx, ty, 1,
		]
	},
	rotation: function (rad) {
		let c = Math.cos(rad)
		let s = Math.sin(rad)
		return [
			c, -s, 0,
			s, c, 0,
			0, 0, 1,
		]
	},
	scaling: function (sx, sy) {
		return [
			sx, 0, 0,
			0, sy, 0,
			0, 0, 1,
		]
	},
	/**
	 * Matrix multiplication
	 *
	 * A * B = C
	 * C[i][j] = sum(A[i][k] * B[k][j], k=0..2)
	 * 0 <= i, j < 3
	 */
	multiply: function(a, b) {
		let c = [0, 0, 0, 0, 0, 0, 0, 0, 0]
		for (var i = 0; i < 3; i++) {
			for (var j = 0; j < 3; j++) {
				for (var k = 0; k < 3; k++) {
					c[i * 3 + j] += a[i * 3 + k] * b[k * 3 + j]
				}
			}
		}
		return c
	},
	identity: function () {
		return [
			1, 0, 0,
			0, 1, 0,
			0, 0, 1,
		]
	},
}

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
	let resolutionLocation = gl.getUniformLocation(program, "u_resolution");
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

		// set the resolution
		gl.uniform2f(resolutionLocation, gl.canvas.width, gl.canvas.height);

		// set the color
		gl.uniform4fv(colorLocation, color);

		// Создаём матрицы
		let translationMatrix = mat3.translation(translation[0], translation[1]);
		let rotationMatrix = mat3.rotation(rad);
		let scaleMatrix = mat3.scaling(scale[0], scale[1]);
		let moveOriginMatrix = mat3.translation(center[0], center[1])

		let matrix = mat3.identity()

		// умножаем матрицы
		// сначала смещаем центр преобразования
		matrix = mat3.multiply(matrix, moveOriginMatrix)
		matrix = mat3.multiply(matrix, scaleMatrix)
		matrix = mat3.multiply(matrix, rotationMatrix)
		matrix = mat3.multiply(matrix, translationMatrix)

		gl.uniformMatrix3fv(matrixLocation, false, matrix)

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
