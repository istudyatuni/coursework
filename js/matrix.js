export const mat4 = {
	translation: function (tx, ty, tz) {
		return [
			1, 0, 0, 0,
			0, 1, 0, 0,
			0, 0, 1, 0,
			tx, ty, tz, 1,
		]
	},
	xRotation: function (rad) {
		let c = Math.cos(rad)
		let s = Math.sin(rad)
		return [
			1, 0, 0, 0,
			0, c, s, 0,
			0, -s, c, 0,
			0, 0, 0, 1
		]
	},
	yRotation: function (rad) {
		let c = Math.cos(rad)
		let s = Math.sin(rad)
		return [
			c, 0, -s, 0,
			0, 1, 0, 0,
			s, 0, c, 0,
			0, 0, 0, 1
		]
	},
	zRotation: function (rad) {
		let c = Math.cos(rad)
		let s = Math.sin(rad)
		return [
			c, s, 0, 0,
			-s, c, 0, 0,
			0, 0, 1, 0,
			0, 0, 0, 1
		]
	},
	scaling: function (sx, sy, sz) {
		return [
			sx, 0, 0, 0,
			0, sy, 0, 0,
			0, 0, sz, 0,
			0, 0, 0, 1,
		]
	},
	/**
	 * Matrix multiplication
	 *
	 * A * B = C
	 * C[i][j] = sum(A[i][k] * B[k][j], k=0..3)
	 * 0 <= i, j < 4
	 */
	multiply: function(a, b) {
		let dimemsion = 4
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
			1, 0, 0, 0,
			0, 1, 0, 0,
			0, 0, 1, 0,
			0, 0, 0, 1
		]
	},
	orthographic: function(left, right, bottom, top, near, far) {
		return [
			2 / (right - left), 0, 0, 0,
			0, 2 / (top - bottom), 0, 0,
			0, 0, 2 / (near - far), 0,

			(left + right) / (left - right),
			(bottom + top) / (bottom - top),
			(near + far) / (near - far),
			1,
		]
	},
	translate: function (m, tx, ty, tz) {
		return mat4.multiply(mat4.translation(tx, ty, tz), m)
	},
	xRotate: function (m, rad) {
		return mat4.multiply(mat4.xRotation(rad), m)
	},
	yRotate: function (m, rad) {
		return mat4.multiply(mat4.yRotation(rad), m)
	},
	zRotate: function (m, rad) {
		return mat4.multiply(mat4.zRotation(rad), m)
	},
	scale: function (m, sx, sy, sz) {
		return mat4.multiply(mat4.scaling(sx, sy, sz), m)
	}
}
