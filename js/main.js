'use strict'
import {
	createShader,
	createProgram,
	getContext,
	defaultGLSetup,
} from './gl/utils.js'
import {
	setupListeners,
	drawTranslationValue,
	setTheme,
} from './helpers/document.js'
import { cube4gl, setGeometry, setColors } from './gl/data.js'
import { mat4 } from './matrix/4.js'
import { mat5 } from './matrix/5.js'

import { RAD } from './math/constants.js'
import { PointArrayMultMatrix, Points5Arrayto4 } from './math/coordinates.js'

const start_position = 300
const center = [-50, -75]

async function main() {
	let gl = getContext('#canvas')
	if (!gl) {
		document.querySelector('.canvas-bottom').classList.remove('hide')
		return
	}

	setTheme()

	// Link the two shaders into a program
	let program = await createProgram(gl, 'vertex.glsl', 'fragment.glsl')

	// look up where the vertex data needs to go.
	let positionLocation = gl.getAttribLocation(program, 'a_position')

	// lookup uniforms
	let colorLocation = gl.getAttribLocation(program, 'a_color')
	let matrixLocation = gl.getUniformLocation(program, 'u_matrix')

	// Create a buffer to put positions in
	let positionBuffer = gl.createBuffer()

	// Создаём буфер для цветов
	let colorBuffer = gl.createBuffer()
	gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer)
	// Заполняем буфер цветами
	setColors(gl)

	let translation = [start_position, start_position, 0, 500]
	let rotation = [40 * RAD, 25 * RAD, 325 * RAD, 60 * RAD]
	let scale = [1, 1, 1, 1]

	defaultGLSetup(gl)

	drawScene()
	drawTranslationValue(translation, center)

	function updatePosition(index, value, max_value) {
		translation[index] = (translation[index] + value) % max_value
		if (translation[index] < 0) {
			translation[index] += max_value
		}
		drawTranslationValue(translation, center)
		drawScene()
	}

	// todo
	function updateRotation(index, value) {
		rotation[index] += value * 0.1
		drawScene()
	}

	// todo
	function updateScale(index, value) {
		scale[index] += value
		drawScene()
	}

	// todo
	function resetAll() {
		translation = [start_position, start_position, 0, 500]
		rotation = [40 * RAD, 25 * RAD, 325 * RAD]
		scale = [1, 1, 1]

		drawTranslationValue(translation)
		drawScene()
	}

	setupListeners(
		updatePosition,
		updateRotation,
		updateScale,
		resetAll,
		gl.canvas.width,
		gl.canvas.height
	)

	// Draw the scene.
	function drawScene() {
		gl.useProgram(program)
		let log = gl.getProgramInfoLog(program)
		if (log !== '') console.log(log)

		//////////////
		// Position //
		//////////////
		gl.enableVertexAttribArray(positionLocation)
		gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)

		let matrix = mat5.orthographic(
			0,
			gl.canvas.width,
			gl.canvas.height,
			0,
			400,
			-400,
			0,
			0
		)
		// matrix = mat5.translate(...translation, matrix)
		setGeometry(gl, PointArrayMultMatrix(cube4gl, matrix))

		// Tell the attribute how to get data out of positionBuffer (ARRAY_BUFFER)
		gl.vertexAttribPointer(positionLocation, 3, gl.FLOAT, false, 0, 0)

		///////////
		// Color //
		///////////
		gl.enableVertexAttribArray(colorLocation)
		gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer)
		// Указываем атрибуту, как получать данные от colorBuffer (ARRAY_BUFFER)
		gl.vertexAttribPointer(
			colorLocation,
			3, // 3 компоненты на итерацию
			gl.UNSIGNED_BYTE, // данные - 8-битные беззнаковые целые
			true, // normalized - нормализовать данные (конвертировать из 0-255 в 0-1)
			0, // stride 0 = перемещаться на size * sizeof(type) каждую итерацию для получения следующего положения
			0 // offset - начинать с начала буфера
		)

		let proj_matrix = mat4.orthographic(
			0,
			gl.canvas.width,
			gl.canvas.height,
			0,
			400,
			-400
		)
		// proj_matrix = mat4.translate(proj_matrix, translation[0], translation[1], translation[2])
		// proj_matrix = mat4.xRotate(proj_matrix, rotation[0])
		// proj_matrix = mat4.yRotate(proj_matrix, rotation[1])
		// proj_matrix = mat4.zRotate(proj_matrix, rotation[2])
		// proj_matrix = mat4.scale(proj_matrix, scale[0], scale[1], scale[2])

		// Set the matrix.
		gl.uniformMatrix4fv(
			matrixLocation,
			false,
			proj_matrix
			// create matrix to normalize projection
			// mat4.orthographic(0, gl.canvas.width, gl.canvas.height, 0, 400, -400)
		)

		// Draw the geometry.
		gl.drawArrays(
			gl.TRIANGLES, // primitive type
			0, // first
			16 * 6 // count
		)
	}
}

main()
