import { isLocalhost } from '../helpers/host.js'

let host_path = ''
if (!isLocalhost()) {
	host_path = '/coursework'
}

const shader_path = '/js/shaders/'

/**
 * Load source of shader file asynchronously
 *
 * @param  {string} name Shader path
 * @return {Promise<string>}      Shader source
 */
export async function getShaderSource(name) {
	let response = await fetch(host_path + shader_path + name)
	if (response.ok) {
		console.log('Loaded ' + response.url)
		return await response.text()
	}
}
