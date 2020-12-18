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
	 * C[i][j] = sum(A[i][k] * B[k][j], k=0..2)
	 * 0 <= i, j < 3
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
			1, 0, 0,
			0, 1, 0,
			0, 0, 1,
		]
	},
	projection: function (width, height, depth) {
		// переворачивает Y, чтобы 0 был наверху
		return [
			2 / width, 0, 0, 0,
			0, -2 / height, 0, 0,
			0, 0, 2 / depth, 0,
			-1, 1, 0, 1,
		]
	},
	translate: function (m, tx, ty, tz) {
		return mat4.multiply(m, mat4.translation(tx, ty, tz))
	},
	xRotate: function (m, rad) {
		return mat4.multiply(m, mat4.xRotation(rad))
	},
	yRotate: function (m, rad) {
		return mat4.multiply(m, mat4.yRotation(rad))
	},
	zRotate: function (m, rad) {
		return mat4.multiply(m, mat4.zRotation(rad))
	},
	scale: function (m, sx, sy, sz) {
		return mat4.multiply(m, mat4.scaling(sx, sy, sz))
	}
}
