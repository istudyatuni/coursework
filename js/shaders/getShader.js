const host_path = '/coursework'
const shader_path = '/js/shaders/'

/**
 * Load source of shader file asynchronously
 * @param  {string} name    shader path
 * @param  {string} _prefix for inner use
 * @return {string}         shader source
 */
export async function getShaderSource(name, _prefix = host_path) {
	let response = await fetch(_prefix + shader_path + name)
	if (response.ok) {
		console.log('Loaded ' + response.url)
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
