"use strict";
import { createShader, createProgram } from './gl-utils.js'
import { setupListeners, drawTranslationValue, setTheme } from './helper.js'
import { setGeometry, setColors } from './gl-data.js'
import { mat4 } from './matrix.js'
import { RAD } from './math.js'

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
	let program = createProgram(gl, '#vertex-shader-3d', '#fragment-shader-3d');

	// look up where the vertex data needs to go.
	let positionLocation = gl.getAttribLocation(program, "a_position");

	// lookup uniforms
	let colorLocation = gl.getAttribLocation(program, "a_color");
	let matrixLocation = gl.getUniformLocation(program, "u_matrix")

	// Create a buffer to put positions in
	let positionBuffer = gl.createBuffer();

	// Bind it to ARRAY_BUFFER (think of it as ARRAY_BUFFER = positionBuffer)
	gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

	// Put geometry data into buffer
	setGeometry(gl)

	// Создаём буфер для цветов
	let colorBuffer = gl.createBuffer()
	gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer)
	// Заполняем буфер цветами
	setColors(gl)

	let translation = [start_position, start_position, 0];
	let rotation = [40 * RAD, 25 * RAD, 325 * RAD]

	let scale = [1, 1, 1]

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

	function updateRotation(index, value) {
		rotation[index] += value * 0.1
		drawScene();
	}

	function updateScale(index, value) {
		scale[index] += value
		drawScene()
	}

	function resetAll() {
		translation = [start_position, start_position, 0]

		rotation = [40 * RAD, 25 * RAD, 325 * RAD]

		scale = [1, 1, 1]

		drawTranslationValue(translation)
		drawScene();
	}

	setupListeners(updatePosition, updateRotation, updateScale, resetAll, gl.canvas.width, gl.canvas.height)

	// Draw the scene.
	function drawScene() {
		const clientWidth  = gl.canvas.clientWidth * 1 | 0
		const clientHeight = gl.canvas.clientHeight * 1 | 0
		if (gl.canvas.width !== clientWidth || gl.canvas.height !== clientHeight) {
			gl.canvas.width = clientWidth
			gl.canvas.height = clientHeight
		}

		// Tell WebGL how to convert from clip space to pixels
		gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

		// Clear the canvas and depth buffer.
		gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

		// Turn on culling. By default backfacing triangles
		// will be culled.
		gl.enable(gl.CULL_FACE);

		// Enable the depth buffer
		gl.enable(gl.DEPTH_TEST);

		// Tell it to use our program (pair of shaders)
		gl.useProgram(program);

		// Turn on the attribute
		gl.enableVertexAttribArray(positionLocation);

		// Bind the position buffer.
		gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

		// Tell the attribute how to get data out of positionBuffer (ARRAY_BUFFER)
		let size = 3;          // 3 components per iteration
		let type = gl.FLOAT;   // the data is 32bit floats
		let normalize = false; // don't normalize the data
		let stride = 0;        // 0 = move forward size * sizeof(type) each iteration to get the next position
		let offset = 0;        // start at the beginning of the buffer
		gl.vertexAttribPointer(positionLocation, size, type, normalize, stride, offset);

		// set the color

		// Включаем атрибут цвета
		gl.enableVertexAttribArray(colorLocation)

		// привязываем буфер цветов
		gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer)

		// Указываем атрибуту, как получать данные от colorBuffer (ARRAY_BUFFER)
		size = 3;                 // 3 компоненты на итерацию
		type = gl.UNSIGNED_BYTE;  // данные - 8-битные беззнаковые целые
		normalize = true;         // нормализовать данные (конвертировать из 0-255 в 0-1)
		stride = 0;               // 0 = перемещаться на size * sizeof(type) каждую итерацию для получения следующего положения
		offset = 0;               // начинать с начала буфера
		gl.vertexAttribPointer(colorLocation, size, type, normalize, stride, offset)

		// Создаём матрицы
		let matrix = mat4.projection(gl.canvas.clientWidth, gl.canvas.clientHeight, 400)
		matrix = mat4.translate(matrix, translation[0], translation[1], translation[2])
		matrix = mat4.xRotate(matrix, rotation[0])
		matrix = mat4.yRotate(matrix, rotation[1])
		matrix = mat4.zRotate(matrix, rotation[2])
		matrix = mat4.scale(matrix, scale[0], scale[1], scale[2])

		// Set the matrix.
		gl.uniformMatrix4fv(matrixLocation, false, matrix)

		// Draw the geometry.
		let primitiveType = gl.TRIANGLES;
		offset = 0;
		let count = 16 * 6;
		gl.drawArrays(primitiveType, offset, count);
	}
}

main();
