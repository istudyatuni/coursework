import { badCall } from '../helpers/error.js'

/**
 * Converting a 4D point to a 3D point (zeroing the 'w' coordinate)
 * @param {number[]} p array with point coordinates, length should be 4
 * @return {number[]}
 */
export function Point4to3(p) {
	if (p.length !== 4) {
		badCall('point ' + p.toString() + ' should be of size 4')
	}
	return [p[0], p[1], p[2]]
}

/**
 * Converting an array like gl.ARRAY_BUFFER (1D set of coordinates) with 4D points to 3D points
 * @param {number[]} points array with coordinates, where each 4 coordinate is point
 * @return {number[]}
 */
export function Points4Arrayto3(points) {
	let i = 0
	let res = []
	for (let c of points) {
		i = (i + 1) % 4
		if (i === 3) continue
		res.push(c)
	}
	if (i !== 0)
		badCall('incorrect size of array with 4D points')

	return res
}

/**
 * Multiply point and matrix: point * matrix
 * @param {number[]} p point, size should be 3 or 4
 * @param {number[]} m matrix, size should be 3 * 3 or 4 * 4
 * @return {number[]} resulting vector
 */
export function PointMultMatrix(p, m) {
	let size = p.length
	if (size !== 3 && size !== 4)
		badCall('point size should be 3 or 4')
	if (m.length !== 9 && m.length !== 16)
		badCall('matrix size should be 9 or 16')
	if (size * size !== m.length)
		badCall('sizes of point and matrix does not match')

	let c = Array(size).fill(0)
	for (var i = 0; i < size; i++) {
		for (var j = 0; j < size; j++) {
			c[i] += p[j] * m[j * size + i]
		}
	}
	return c
}

/**
 * Multiply an array like gl.ARRAY_BUFFER to matrix
 * @param {number[]} points array with points
 * @param {number[]} m      matrix to multiply
 * @return {number[]}
 */
export function PointArrayMultMatrix(points, m) {
	let size = 0
	if (m.length === 9) size = 3
	else if (m.length === 16) size = 4

	if (size === 0) {
		badCall('size of matrix is incorrect')
	}

	let i = 0
	let arr = [], res = []
	for (let c of points) {
		i = (i + 1) % size
		arr.push(c)
		if (i === 0) {
			res.push(...PointMultMatrix(arr, m))
			arr = []
		}
	}
	return res
}
