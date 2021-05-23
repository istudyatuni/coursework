const shader_path = '/js/shaders/'

/**
 * Load source of shader file asynchronously
 * @param  {string} name shader path
 * @return {string}      shader source
 */
export async function getShaderSource(name) {
	let response = await fetch(/*shader_path +*/ name)
	if (response.ok) {
		return await response.text()
	}
	// code below not work, it execute without waiting
	// fetch(shader_path + name + '.glsl')
	// .then(response => response.text())
	// .then((data) => {
	// 	return data
	// })
}
