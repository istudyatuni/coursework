import { badCall } from '../helpers/error.js'

/**
 * Converting a 4D (5D array in homogeneous coordinates) point to a
 * 3D point (zeroing the `w` coordinate)
 *
 * @param {number[]} p Array with point coordinates, length should be 5
 * @return {number[]}
 */
export function Point5to4(p) {
	if (p.length !== 5) {
		badCall('point ' + p + ' should be of size 5')
	}
	return [p[0], p[1], p[2], p[4]]
}

/**
 * Converting an array like gl.ARRAY_BUFFER (1D set of coordinates) with 4D points to 3D points
 *
 * Each point is 5 numbers - vector in homogeneous coordinates
 *
 * @param {number[]} points Array with coordinates, where each 5 coordinate is point
 * @return {number[]}
 */
export function Points5Arrayto4(points) {
	const in_size = 5,
		skip_index = 4

	let i = 0
	let res = []
	for (let c of points) {
		i = (i + 1) % in_size
		if (i === skip_index) continue
		res.push(c)
	}
	if (i !== 0) {
		badCall('incorrect size of array with 4D points: ' + points.length)
	}

	return res
}

/**
 * Multiply point and matrix: point * matrix
 *
 * @param {number[]} p Point, size should be 4 or 5
 * @param {number[]} m Matrix, size should be 4 * 4 or 5 * 5
 * @return {number[]} Resulting vector
 */
export function PointMultMatrix(p, m) {
	let size = p.length
	if (size !== 4 && size !== 5) {
		badCall('point size should be 4 or 5')
	}
	if (m.length !== 16 && m.length !== 25) {
		badCall('matrix size should be 16 or 25')
	}
	if (size * size !== m.length) {
		badCall('sizes of point and matrix does not match')
	}

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
 *
 * @param {number[]} points Array with points
 * @param {number[]} m      Matrix to multiply
 * @return {number[]}
 */
export function PointArrayMultMatrix(points, m) {
	let size = 0
	if (m.length === 16) size = 4
	else if (m.length === 25) size = 5

	if (size === 0) {
		badCall('size of matrix is incorrect: ' + m.length)
	}

	let i = 0
	let arr = [],
		res = []
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
