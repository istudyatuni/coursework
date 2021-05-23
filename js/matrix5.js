import { notImplemented } from './error.js'

/**
 * Set of functions for work with 5x5 matrices
 */
export const mat5 = {
	translation: function (tx, ty, tz, tw) {
		return [
			1,  0,  0,  0,  0,
			0,  1,  0,  0,  0,
			0,  0,  1,  0,  0,
			0,  0,  0,  1,  0,
			tx, ty, tz, tw, 1,
		]
	},
	xRotation: function (rad) {
		notImplemented()
		// let c = Math.cos(rad)
		// let s = Math.sin(rad)
		// return [
		// 	1, 0, 0, 0,
		// 	0, c, s, 0,
		// 	0, -s, c, 0,
		// 	0, 0, 0, 1
		// ]
	},
	yRotation: function (rad) {
		notImplemented()
		// let c = Math.cos(rad)
		// let s = Math.sin(rad)
		// return [
		// 	c, 0, -s, 0,
		// 	0, 1, 0, 0,
		// 	s, 0, c, 0,
		// 	0, 0, 0, 1
		// ]
	},
	zRotation: function (rad) {
		notImplemented()
		// let c = Math.cos(rad)
		// let s = Math.sin(rad)
		// return [
		// 	c, s, 0, 0,
		// 	-s, c, 0, 0,
		// 	0, 0, 1, 0,
		// 	0, 0, 0, 1
		// ]
	},
	scaling: function (sx, sy, sz, sw) {
		return [
			sx, 0, 0, 0, 0,
			0, sy, 0, 0, 0,
			0, 0, sz, 0, 0,
			0, 0, 0, sw, 0,
			0, 0, 0, 0, 1,
		]
	},
	/**
	 * Matrix multiplication
	 *
	 * A * B = C
	 * C[i][j] = sum(A[i][k] * B[k][j], k=0..4)
	 * 0 <= i, j < 5
	 */
	multiply: function(a, b) {
		let dimemsion = 5
		let c = Array(dimemsion * dimemsion).fill(0)
		for (var i = 0; i < dimemsion; i++) {
			for (var j = 0; j < dimemsion; j++) {
				for (var k = 0; k < dimemsion; k++) {
					c[i * dimemsion + j] += a[i * dimemsion + k] * b[k * dimemsion + j]
				}
			}
		}
		return c
	},
	identity: function () {
		return [
			1, 0, 0, 0, 0,
			0, 1, 0, 0, 0,
			0, 0, 1, 0, 0,
			0, 0, 0, 1, 0,
			0, 0, 0, 0, 1,
		]
	},
	orthographic: function(left, right, bottom, top, near, far) {
		notImplemented()
		// return [
		// 	2 / (right - left), 0, 0, 0,
		// 	0, 2 / (top - bottom), 0, 0,
		// 	0, 0, 2 / (near - far), 0,

		// 	(left + right) / (left - right),
		// 	(bottom + top) / (bottom - top),
		// 	(near + far) / (near - far),
		// 	1,
		// ]
	},
	translate: function (m, tx, ty, tz) {
		notImplemented()
		// return mat4.multiply(mat4.translation(tx, ty, tz), m)
	},
	xRotate: function (m, rad) {
		notImplemented()
		// return mat4.multiply(mat4.xRotation(rad), m)
	},
	yRotate: function (m, rad) {
		notImplemented()
		// return mat4.multiply(mat4.yRotation(rad), m)
	},
	zRotate: function (m, rad) {
		notImplemented()
		// return mat4.multiply(mat4.zRotation(rad), m)
	},
	scale: function (m, sx, sy, sz) {
		notImplemented()
		// return mat4.multiply(mat4.scaling(sx, sy, sz), m)
	}
}
