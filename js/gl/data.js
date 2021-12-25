import { Points5Arrayto4 } from '../math/coordinates.js'

/**
 * matrix with 4D cube's points
 * @type {number[][]}
 */
// prettier-ignore
const cube4points = [
	[ 1,  1,  1,  1],
	[ 1,  1,  1, -1],
	[ 1,  1, -1,  1],
	[ 1,  1, -1, -1],
	[ 1, -1,  1,  1],
	[ 1, -1,  1, -1],
	[ 1, -1, -1,  1],
	[ 1, -1, -1, -1],
	[-1,  1,  1,  1],
	[-1,  1,  1, -1],
	[-1,  1, -1,  1],
	[-1,  1, -1, -1],
	[-1, -1,  1,  1],
	[-1, -1,  1, -1],
	[-1, -1, -1,  1],
	[-1, -1, -1, -1],
]

/**
 * Faces are the quadruples of points obtained by declaring two coordinates constant
 * @type {number[]} Array with faces
 */
const cube4faces = (function () {
	let result = []
	for (let [i, j] of [
		[0, 1],
		[0, 2],
		[0, 3],
		[1, 2],
		[1, 3],
		[2, 3],
	]) {
		for (let [a, b] of [
			[ 1,  1],
			[ 1, -1],
			[-1,  1],
			[-1, -1],
		]) {
			result.push(cube4points.filter((e) => e[i] === a && e[j] === b))
		}
	}
	return result
})()

/**
 * 4D cube, each 2 triples of points (each point is 4 numbers) is triangles of one face
 *
 * e.g.
 * ```
 * [
 *   1 1 1 1
 *   1 1 -1 1
 *   1 1 1 -1
 * ]
 * ```
 * is one triangle
 * @type {number[]}
 */
export const cube4gl = cube4faces
	.map((e) => [e[0], e[1], e[2], e[1], e[2], e[3]])
	.flat(2)

/**
 * Put 4D cube to gl.ARRAY_BUFFER
 * Its vertices are the 16 points (±1,±1,±1,±1) in R4;
 * its edges are the line segments between pairs of points having exactly one coordinate differing;
 * its faces are the quadruples of points obtained by declaring two coordinates constant;
 * its cells are the collections of points where one coordinate is declared constant.
 * There are 8 cells, 24 faces, 32 edges and 16 vertices.
 * Got from quora: https://qr.ae/pGyiFk
 * @param  {WebGLRenderingContext} gl Context from canvas for WebGL
 * @return {void}
 */
export function setGeometry(gl, data = cube4) {
	gl.bufferData(
		gl.ARRAY_BUFFER,
		new Float32Array(Points5Arrayto4(data)),
		gl.STATIC_DRAW
	)
}

/**
 * Fill the buffer with colors for the 'F'.
 * @param {WebGLRenderingContext} gl
 */
export function setColors(gl) {
	gl.bufferData(
		gl.ARRAY_BUFFER,
		// prettier-ignore
		new Uint8Array([
			// left column front
			200,  70, 120,
			200,  70, 120,
			200,  70, 120,
			200,  70, 120,
			200,  70, 120,
			200,  70, 120,

			// top rung front
			200,  70, 120,
			200,  70, 120,
			200,  70, 120,
			200,  70, 120,
			200,  70, 120,
			200,  70, 120,

			// middle rung front
			200,  70, 120,
			200,  70, 120,
			200,  70, 120,
			200,  70, 120,
			200,  70, 120,
			200,  70, 120,

			// left column back
			80, 70, 200,
			80, 70, 200,
			80, 70, 200,
			80, 70, 200,
			80, 70, 200,
			80, 70, 200,

			// top rung back
			80, 70, 200,
			80, 70, 200,
			80, 70, 200,
			80, 70, 200,
			80, 70, 200,
			80, 70, 200,

			// middle rung back
			80, 70, 200,
			80, 70, 200,
			80, 70, 200,
			80, 70, 200,
			80, 70, 200,
			80, 70, 200,

			// top
			70, 200, 210,
			70, 200, 210,
			70, 200, 210,
			70, 200, 210,
			70, 200, 210,
			70, 200, 210,

			// top rung right
			200, 200, 70,
			200, 200, 70,
			200, 200, 70,
			200, 200, 70,
			200, 200, 70,
			200, 200, 70,

			// under top rung
			210, 100, 70,
			210, 100, 70,
			210, 100, 70,
			210, 100, 70,
			210, 100, 70,
			210, 100, 70,

			// between top rung and middle
			210, 160, 70,
			210, 160, 70,
			210, 160, 70,
			210, 160, 70,
			210, 160, 70,
			210, 160, 70,

			// top of middle rung
			70, 180, 210,
			70, 180, 210,
			70, 180, 210,
			70, 180, 210,
			70, 180, 210,
			70, 180, 210,

			// right of middle rung
			100, 70, 210,
			100, 70, 210,
			100, 70, 210,
			100, 70, 210,
			100, 70, 210,
			100, 70, 210,

			/*// bottom of middle rung.
			76, 210, 100,
			76, 210, 100,
			76, 210, 100,
			76, 210, 100,
			76, 210, 100,
			76, 210, 100,

			// right of bottom
			140, 210, 80,
			140, 210, 80,
			140, 210, 80,
			140, 210, 80,
			140, 210, 80,
			140, 210, 80,

			// bottom
			90, 130, 110,
			90, 130, 110,
			90, 130, 110,
			90, 130, 110,
			90, 130, 110,
			90, 130, 110,

			// left side
			160, 160, 220,
			160, 160, 220,
			160, 160, 220,
			160, 160, 220,
			160, 160, 220,
			160, 160, 220*/
		]),
		gl.STATIC_DRAW
	)
}
