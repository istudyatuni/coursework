import { getShaderSource } from '../shaders/getShader.js'

/**
 * Get a WebGL context from canvas HTML element by its id
 * @param  {string} elementQuery canvas id
 */
export function getContext(elementQuery) {
	/** @type {HTMLCanvasElement} */
	const canvas = document.querySelector(elementQuery)
	return canvas.getContext('webgl')
}

/**
 * Create shader from context, shader type and source of shader
 * @param  {WebGLRenderingContext} gl
 * @param  {number}                type
 * @param  {string}                source
 */
export function createShader(gl, type, source) {
	let shader = gl.createShader(type) // создание шейдера
	gl.shaderSource(shader, source) // устанавливаем шейдеру его программный код
	gl.compileShader(shader) // компилируем шейдер
	let success = gl.getShaderParameter(shader, gl.COMPILE_STATUS)
	if (success) {
		// если компиляция прошла успешно - возвращаем шейдер
		return shader
	}

	console.log(gl.getShaderInfoLog(shader))
	gl.deleteShader(shader)
}

/**
 * Load shaders and create WebGLProgram (pair of shaders) from this
 * @param  {WebGLRenderingContext} gl
 * @param  {string}                vertexShaderName
 * @param  {string}                fragmentShaderName
 * @return {WebGLProgram}
 */
export async function createProgram(gl, vertexShaderName, fragmentShaderName) {
	let vertexShaderSource = await getShaderSource(vertexShaderName)
	let fragmentShaderSource = await getShaderSource(fragmentShaderName)

	// create GLSL shaders, upload the GLSL source, compile the shaders
	let vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource)
	let fragmentShader = createShader(
		gl,
		gl.FRAGMENT_SHADER,
		fragmentShaderSource
	)

	let program = gl.createProgram()
	gl.attachShader(program, vertexShader)
	gl.attachShader(program, fragmentShader)
	gl.linkProgram(program)
	let success = gl.getProgramParameter(program, gl.LINK_STATUS)
	if (success) {
		return program
	}

	console.log(gl.getProgramInfoLog(program))
	gl.deleteProgram(program)
}

/**
 * Make default (for this program) actions to GL, like set viewport, enable depth buffer, etc
 * @param  {WebGLRenderingContext} gl
 * @return {void}
 */
export function defaultGLSetup(gl) {
	const clientWidth = gl.canvas.clientWidth
	const clientHeight = gl.canvas.clientHeight
	if (gl.canvas.width !== clientWidth || gl.canvas.height !== clientHeight) {
		gl.canvas.width = clientWidth
		gl.canvas.height = clientHeight
	}
	// Tell WebGL how to convert from clip space to pixels
	gl.viewport(0, 0, gl.canvas.width, gl.canvas.height)

	// Clear the canvas and depth buffer.
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)

	// Turn on culling. By default backfacing triangles
	// will be culled.
	gl.enable(gl.CULL_FACE)

	// Enable the depth buffer
	gl.enable(gl.DEPTH_TEST)
}
