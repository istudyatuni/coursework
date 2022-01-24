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

	// find vertice perpendicular to vert (by ind coordinate)
	function findOpposite(ind, vert) {
		// find indexes other than ind
		let others = [0, 1, 2, 3]
		others.splice(ind, 1)
		let a = others[0], b = others[1], c = others[2]

		let res = cube4vertices.find((v) => (
			v[ind] !== vert[ind] &&
			v[a] === vert[a] &&
			v[b] === vert[b] &&
			v[c] === vert[c]
		))
		return res
	}

	let opposite
	// for first half of vertices
	// it's wrong to select vertices from first half
	for (let vertice of cube4vertices/*.slice(0, 8)*/) {
		for (let ind of [0, 1, 2, 3]) {
			// find opposite vertice, where ind changes, and other coordinates are const
			opposite = findOpposite(ind, vertice)

			result.push([[...vertice], [...opposite]])
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
