export function createShader(gl, type, source) {
	let shader = gl.createShader(type);   // создание шейдера
	gl.shaderSource(shader, source);      // устанавливаем шейдеру его программный код
	gl.compileShader(shader);             // компилируем шейдер
	let success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
	if (success) {                        // если компиляция прошла успешно - возвращаем шейдер
		return shader;
	}

	console.log(gl.getShaderInfoLog(shader));
	gl.deleteShader(shader);
}

export function createProgram(gl, vertexShaderID, fragmentShaderID) {
	// Get the strings for our GLSL shaders
	let vertexShaderSource = document.querySelector(vertexShaderID).text;
	let fragmentShaderSource = document.querySelector(fragmentShaderID).text;

	// create GLSL shaders, upload the GLSL source, compile the shaders
	let vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
	let fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);

	let program = gl.createProgram();
	gl.attachShader(program, vertexShader);
	gl.attachShader(program, fragmentShader);
	gl.linkProgram(program);
	let success = gl.getProgramParameter(program, gl.LINK_STATUS);
	if (success) {
		return program;
	}

	console.log(gl.getProgramInfoLog(program));
	gl.deleteProgram(program);
}
