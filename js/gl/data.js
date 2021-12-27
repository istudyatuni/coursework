import { Points5Arrayto4 } from '../math/coordinates.js'

/**
 * Matrix with 4D cube's vertices
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
 * Cells are the sets of 8 vertices obtained by declaring one coordinate constant
 *
 * Each cell is 3D cube
 *
 * @type {number[]} Array with cells
 */
export const cube4cells = (function () {
	let result = []
	for (let i of [0, 1, 2, 3]) {
		for (let a of [1, -1]) {
			result.push(cube4vertices.filter((e) => e[i] === a))
		}
	}
	return result
})()

const coeff = 100

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
export const cube4glTriangles = cube4cells
	.map((v) => {
		let res = []
		// split 3D cube to triangles
		for (let i of [0, 1, 2]) {
			for (let a of [1, -1]) {
				res.push(v.filter((e) => e[i] === a))
			}
		}
		return res
	})
	.flat()
	.map((v) => v.map((p) => p * coeff))
	.flat()

export const cube4glVertices = cube4vertices
	.map((v) => [...v.map((p) => p * coeff), 1])
	.flat()

const edgesCoeff = 50000

/**
 * Array to dray edges
 * @type {number[]}
 */
export const cube4glEdges = cube4cells
	.map((v) => {
		let res = []
		// find 3D cube edges
		for (let [i, j] of [
			[0, 1],
			[0, 2],
			[1, 2],
		]) {
			for (let [a, b] of [
				[1, 1],
				[1, -1],
				[-1, 1],
				[-1, -1],
			]) {
				res.push(v.filter((e) => e[i] === a && e[j] === b))
			}
		}
		return res
	})
	.flat(2)
	.map((v) => [...v.map((p) => p * edgesCoeff), 1])
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
 * Тессеракт обладает 8 трёхмерными гранями, 24 двумерными, 32 рёбрами и 16 вершинами
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
			cube4cells
				.flat()
				.map((p) => [200, 70, 180, 1])
				.flat()
		),
		gl.STATIC_DRAW
	)
}
