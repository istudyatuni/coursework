const host_path = '/coursework'
const shader_path = '/js/shaders/'

/**
 * Load source of shader file asynchronously
 * @param  {string} name shader path
 * @return {string}      shader source
 */
export async function getShaderSource(name, prefix = host_path) {
	let response = await fetch(prefix + shader_path + name)
	if (response.ok) {
		return await response.text()
	} else {
		return getShaderSource(name, '')
	}
	// code below not work, it execute without waiting
	// fetch(shader_path + name + '.glsl')
	// .then(response => response.text())
	// .then((data) => {
	// 	return data
	// })
}
