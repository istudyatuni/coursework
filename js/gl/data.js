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
	// now here generated edges, not cells

	let result = []

	// get two cells
	// const cells = []
	for (let x of [1, -1]) {
		const cell = cube4vertices.filter((v) => v[0] === x)
		// cells.push(cell)

		// get two faces for each cell
		const faces = []
		for (let y of [1, -1]) {
			const face = cell.filter((v) => v[1] === y)
			faces.push(face)

			// get two edges for each face
			for (let z of [1, -1]) {
				const edge = face.filter((v) => v[2] === z)

				result.push(edge)
			}
		}

		// connect opposite points
		for (let z of [1, -1]) {
			faces.forEach((f) => {
				result.push(f.filter((v) => v[2] === z))
			})
		}
		for (let w of [1, -1]) {
			faces.forEach((f) => {
				result.push(f.filter((v) => v[3] === w))
			})
		}

	}
	return result
})()

const coeff = 30000

/**
 * Array to dray edges
 * @type {number[]}
 */
export const cube4glEdges = cube4cells
	.flat()
	.map((v) => [...v.map((p) => p * coeff), 1])
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
