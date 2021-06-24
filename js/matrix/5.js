import { badCall, notImplemented } from '../helpers/error.js'

/**
 * Set of functions for work with 5x5 4D homogeneous matrices
 */
export const mat5 = {
	size: 5,
	translation: function (tx, ty, tz, tw) {
		return [
			1,  0,  0,  0,  0,
			0,  1,  0,  0,  0,
			0,  0,  1,  0,  0,
			0,  0,  0,  1,  0,
			tx, ty, tz, tw, 1,
		]
	},
	/**
	 * Return homogenius matrix for 4D rotation
	 * @param  {"x" | "y" | "z"}   a   describe 1st axis
	 * @param  {"y" | "z" | "w"}   b   describe 2nd axis
	 * @param  {number}            rad rotation angle in radian
	 * @return {number[]}              rotation matrix
	 */
	rotation: function (a, b, rad) {
		let c = Math.cos(rad)
		let s = Math.sin(rad)

		const getCoord = function (str) {
			switch (str) {
				case 'x': return 0
				case 'y': return 1
				case 'z': return 2
				case 'w': return 3
				default: return -1
			}
		}

		const i = getCoord(a), j = getCoord(b)
		if (i === -1 || j === -1) {
			badCall('incorrect type: ' + a + ' or ' + b)
		} else if (i >= j) {
			badCall(a + ' must come after ' + b)
		}

		/**
		 * when Rxy or Ryz we have:
		 * cos  sin
		 * -sin cos
		 *
		 * otherwise:
		 * cos -sin
		 * sin  cos
		 */
		if (i === 0 && j === 1 || i === 1 && j === 2) {
			s *= -1
		}

		let matrix = this.identity
		matrix[i * this.size + i] = c
		matrix[j * this.size + j] = c
		matrix[i * this.size + j] = -1 * s
		matrix[j * this.size + i] = s
		return matrix
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
		let c = Array(this.size * this.size).fill(0)
		for (var i = 0; i < this.size; i++) {
			for (var j = 0; j < this.size; j++) {
				for (var k = 0; k < this.size; k++) {
					c[i * this.size + j] += a[i * this.size + k] * b[k * this.size + j]
				}
			}
		}
		return c
	},
	identity: [
		1, 0, 0, 0, 0,
		0, 1, 0, 0, 0,
		0, 0, 1, 0, 0,
		0, 0, 0, 1, 0,
		0, 0, 0, 0, 1,
	],
	orthographic: function(left, right, bottom, top, near, far, a, b) {
		return [
			2 / (right - left), 0, 0, 0, 0,
			0, 2 / (top - bottom), 0, 0, 0,
			0, 0, 2 / (near - far), 0, 0,
			0, 0, 0, 2 / (a - b), 0,

			(left + right) / (left - right),
			(bottom + top) / (bottom - top),
			(near + far) / (near - far),
			(a + b) / (a - b),
			1,
		]
	},
	translate: function (tx, ty, tz, tw, m) {
		// notImplemented()
		return this.multiply(this.translation(tx, ty, tz, tw), m)
	},
	rotate: function (m, a, b, rad) {
		return this.multiply(m, this.rotation(a, b, rad))
	},
	scale: function (m, sx, sy, sz) {
		notImplemented()
		// return mat4.multiply(mat4.scaling(sx, sy, sz), m)
	}
}
