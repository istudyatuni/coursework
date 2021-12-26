import { Points5Arrayto4 } from '../math/coordinates.js'

/**
 * Matrix with 4D cube's points
 *
 * @type {number[][]}
 */
// prettier-ignore
const cube4vertices = [
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
 *
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
			[1, 1],
			[1, -1],
			[-1, 1],
			[-1, -1],
		]) {
			result.push(cube4vertices.filter((e) => e[i] === a && e[j] === b))
		}
	}
	return result
})()

const coeff = 50000

/**
 * 4D cube, each 2 triples of points (each point is 4 numbers) is triangles of one face
 *
 * e.g.
 * ```
 * [
 *   1, 1, 1, 1,
 *   1, 1, -1, 1,
 *   1, 1, 1, -1,
 * ]
 * ```
 * is one triangle
 *
 * @type {number[]}
 */
export const cube4glTriangles = cube4faces
	.map((v) => [v[0], v[1], v[2], v[1], v[2], v[3]])
	.flat()
	.map((v) => v.map((p) => p * coeff))
	.flat()

export const cube4glVertices = cube4vertices
	.map((v) => [...v.map((p) => p * coeff), 1])
	.flat()

/**
 * Array to dray edges
 * @type {number[]}
 */
export const cube4glEdges = cube4faces
	.map((v) => [v[0], v[1], v[1], v[2], v[2], v[3], v[0], v[3]])
	.flat()
	.map((v) => v.map((p) => p * coeff))
	.flat()

/**
 * Put 4D cube to gl.ARRAY_BUFFER
 *
 * Its vertices are the 16 points (±1,±1,±1,±1) in R4;
 *
 * its edges are the line segments between pairs of points having exactly one coordinate differing;
 *
 * its faces are the quadruples of points obtained by declaring two coordinates constant;
 *
 * its cells are the collections of points where one coordinate is declared constant.
 *
 * There are 8 cells, 24 faces, 32 edges and 16 vertices.
 *
 * Got from quora: https://qr.ae/pGyiFk
 *
 * @param  {WebGLRenderingContext} gl Context from canvas for WebGL
 * @return {void}
 */
export function setGeometry(gl, data = cube4glTriangles) {
	gl.bufferData(
		gl.ARRAY_BUFFER,
		new Float32Array(Points5Arrayto4(data)),
		gl.STATIC_DRAW
	)
}

/**
 * Fill the buffer with colors for the 'F'.
 *
 * @param {WebGLRenderingContext} gl
 */
export function setColors(gl) {
	gl.bufferData(
		gl.ARRAY_BUFFER,
		new Uint8Array(
			cube4faces
				.flat()
				.map((p) => [...p.map(() => Math.random() * 256), 1])
				.flat()
		),
		gl.STATIC_DRAW
	)
}
