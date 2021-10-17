import config from '../config.js'

let host_path = ''
if (!config.localHost) {
	host_path = '/coursework'
}

const shader_path = '/js/shaders/'

/**
 * Load source of shader file asynchronously
 * @param  {string} name    shader path
 * @return {string}         shader source
 */
export async function getShaderSource(name) {
	let response = await fetch(host_path + shader_path + name)
	if (response.ok) {
		console.log('Loaded ' + response.url)
		return await response.text()
	}
}
