import { Points5Arrayto4 } from '../math/coordinates.js'

/**
 * matrix with 4D cube's points
 * @type {Array}
 * Only points:
 * 1, 1, 1, 1,
 * 1, 1, 1, -1,
 * 1, 1, -1, 1,
 * 1, 1, -1, -1,
 * 1, -1, 1, 1,
 * 1, -1, 1, -1,
 * 1, -1, -1, 1,
 * 1, -1, -1, -1,
 * -1, 1, 1, 1,
 * -1, 1, 1, -1,
 * -1, 1, -1, 1,
 * -1, 1, -1, -1,
 * -1, -1, 1, 1,
 * -1, -1, 1, -1,
 * -1, -1, -1, 1,
 * -1, -1, -1, -1,
 */
const coeff = 100

// prettier-ignore
export const cube4 = [
	// faces
	// each 3 lines is triangle

	// c c x x (c is const)

	// 1 1 x x
	1 * coeff, 1 * coeff, 1 * coeff, 1 * coeff, 1,
	1 * coeff, 1 * coeff, 1 * coeff, -1 * coeff, 1,
	1 * coeff, 1 * coeff, -1 * coeff, 1 * coeff, 1,

	1 * coeff, 1 * coeff, 1 * coeff, -1 * coeff, 1,
	1 * coeff, 1 * coeff, -1 * coeff, 1 * coeff, 1,
	1 * coeff, 1 * coeff, -1 * coeff, -1 * coeff, 1,

	// 1 -1 x x
	1 * coeff, -1 * coeff, 1 * coeff, 1 * coeff, 1,
	1 * coeff, -1 * coeff, 1 * coeff, -1 * coeff, 1,
	1 * coeff, -1 * coeff, -1 * coeff, 1 * coeff, 1,

	1 * coeff, -1 * coeff, 1 * coeff, -1 * coeff, 1,
	1 * coeff, -1 * coeff, -1 * coeff, 1 * coeff, 1,
	1 * coeff, -1 * coeff, -1 * coeff, -1 * coeff, 1,

	// -1 1 x x
	-1 * coeff, 1 * coeff, 1 * coeff, 1 * coeff, 1,
	-1 * coeff, 1 * coeff, 1 * coeff, -1 * coeff, 1,
	-1 * coeff, 1 * coeff, -1 * coeff, 1 * coeff, 1,

	-1 * coeff, 1 * coeff, 1 * coeff, -1 * coeff, 1,
	-1 * coeff, 1 * coeff, -1 * coeff, 1 * coeff, 1,
	-1 * coeff, 1 * coeff, -1 * coeff, -1 * coeff, 1,

	// -1 -1 x x
	-1 * coeff, -1 * coeff, 1 * coeff, 1 * coeff, 1,
	-1 * coeff, -1 * coeff, 1 * coeff, -1 * coeff, 1,
	-1 * coeff, -1 * coeff, -1 * coeff, 1 * coeff, 1,

	-1 * coeff, -1 * coeff, 1 * coeff, -1 * coeff, 1,
	-1 * coeff, -1 * coeff, -1 * coeff, 1 * coeff, 1,
	-1 * coeff, -1 * coeff, -1 * coeff, -1 * coeff, 1,

	// x c c x

	// x 1 1 x
	1 * coeff, 1 * coeff, 1 * coeff, 1 * coeff, 1,
	1 * coeff, 1 * coeff, 1 * coeff, -1 * coeff, 1,
	-1 * coeff, 1 * coeff, 1 * coeff, 1 * coeff, 1,

	1 * coeff, 1 * coeff, 1 * coeff, -1 * coeff, 1,
	-1 * coeff, 1 * coeff, 1 * coeff, 1 * coeff, 1,
	-1 * coeff, 1 * coeff, 1 * coeff, -1 * coeff, 1,

	// x 1 -1 x
	1 * coeff, 1 * coeff, -1 * coeff, 1 * coeff, 1,
	1 * coeff, 1 * coeff, -1 * coeff, -1 * coeff, 1,
	1 * coeff, 1 * coeff, -1 * coeff, -1 * coeff, 1,

	-1 * coeff, 1 * coeff, -1 * coeff, 1 * coeff, 1,
	-1 * coeff, 1 * coeff, -1 * coeff, 1 * coeff, 1,
	-1 * coeff, 1 * coeff, -1 * coeff, -1 * coeff, 1,

	// x -1 1 x
	1 * coeff, -1 * coeff, 1 * coeff, 1 * coeff, 1,
	1 * coeff, -1 * coeff, 1 * coeff, -1 * coeff, 1,
	-1 * coeff, -1 * coeff, 1 * coeff, 1 * coeff, 1,

	1 * coeff, -1 * coeff, 1 * coeff, -1 * coeff, 1,
	-1 * coeff, -1 * coeff, 1 * coeff, 1 * coeff, 1,
	-1 * coeff, -1 * coeff, 1 * coeff, -1 * coeff, 1,

	// x -1 -1 x
	1 * coeff, -1 * coeff, -1 * coeff, 1 * coeff, 1,
	1 * coeff, -1 * coeff, -1 * coeff, -1 * coeff, 1,
	-1 * coeff, -1 * coeff, -1 * coeff, 1 * coeff, 1,

	1 * coeff, -1 * coeff, -1 * coeff, -1 * coeff, 1,
	-1 * coeff, -1 * coeff, -1 * coeff, 1 * coeff, 1,
	-1 * coeff, -1 * coeff, -1 * coeff, -1 * coeff, 1,

	// x x c c

	// x x 1 1
	1 * coeff, 1 * coeff, 1 * coeff, 1 * coeff, 1,
	1 * coeff, -1 * coeff, 1 * coeff, 1 * coeff, 1,
	-1 * coeff, 1 * coeff, 1 * coeff, 1 * coeff, 1,

	1 * coeff, -1 * coeff, 1 * coeff, 1 * coeff, 1,
	-1 * coeff, 1 * coeff, 1 * coeff, 1 * coeff, 1,
	-1 * coeff, -1 * coeff, 1 * coeff, 1 * coeff, 1,

	// x x 1 -1
	1 * coeff, 1 * coeff, 1 * coeff, -1 * coeff, 1,
	1 * coeff, -1 * coeff, 1 * coeff, -1 * coeff, 1,
	-1 * coeff, 1 * coeff, 1 * coeff, -1 * coeff, 1,

	1 * coeff, -1 * coeff, 1 * coeff, -1 * coeff, 1,
	-1 * coeff, 1 * coeff, 1 * coeff, -1 * coeff, 1,
	-1 * coeff, -1 * coeff, 1 * coeff, -1 * coeff, 1,

	// x x -1 1
	1 * coeff, 1 * coeff, -1 * coeff, 1 * coeff, 1,
	1 * coeff, -1 * coeff, -1 * coeff, 1 * coeff, 1,
	-1 * coeff, 1 * coeff, -1 * coeff, 1 * coeff, 1,

	1 * coeff, -1 * coeff, -1 * coeff, 1 * coeff, 1,
	-1 * coeff, 1 * coeff, -1 * coeff, 1 * coeff, 1,
	-1 * coeff, -1 * coeff, -1 * coeff, 1 * coeff, 1,

	// x x -1 -1
	1 * coeff, 1 * coeff, -1 * coeff, -1 * coeff, 1,
	1 * coeff, -1 * coeff, -1 * coeff, -1 * coeff, 1,
	-1 * coeff, 1 * coeff, -1 * coeff, -1 * coeff, 1,

	1 * coeff, -1 * coeff, -1 * coeff, -1 * coeff, 1,
	-1 * coeff, 1 * coeff, -1 * coeff, -1 * coeff, 1,
	-1 * coeff, -1 * coeff, -1 * coeff, -1 * coeff, 1,
]

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

// Fill the buffer with colors for the 'F'.
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
