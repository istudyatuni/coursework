export const mat3 = {
	translation: function (tx, ty) {
		return [
			1, 0, 0,
			0, 1, 0,
			tx, ty, 1,
		]
	},
	rotation: function (rad) {
		let c = Math.cos(rad)
		let s = Math.sin(rad)
		return [
			c, -s, 0,
			s, c, 0,
			0, 0, 1,
		]
	},
	scaling: function (sx, sy) {
		return [
			sx, 0, 0,
			0, sy, 0,
			0, 0, 1,
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
		let c = [0, 0, 0, 0, 0, 0, 0, 0, 0]
		for (var i = 0; i < 3; i++) {
			for (var j = 0; j < 3; j++) {
				for (var k = 0; k < 3; k++) {
					c[i * 3 + j] += a[i * 3 + k] * b[k * 3 + j]
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
	projection: function (width, height) {
		// переворачивает Y, чтобы 0 был наверху
		return [
			2 / width, 0, 0,
			0, -2 / height, 0,
			-1, 1, 1,
		]
	}
}
