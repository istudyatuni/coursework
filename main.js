/* eslint no-console:0 consistent-return:0 */
"use strict";

function createShader(gl, type, source) {
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

function createProgram(gl, vertexShader, fragmentShader) {
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

function main() {
	// Get A WebGL context
	let canvas = document.querySelector("#c");
	let gl = canvas.getContext("webgl");
	if (!gl) {
		return;
	}

	// Get the strings for our GLSL shaders
	let vertexShaderSource = document.querySelector("#vertex-shader-2d").text;
	let fragmentShaderSource = document.querySelector("#fragment-shader-2d").text;

	// create GLSL shaders, upload the GLSL source, compile the shaders
	let vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
	let fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);

	// Link the two shaders into a program
	let program = createProgram(gl, vertexShader, fragmentShader);

	// look up where the vertex data needs to go.
	let positionAttributeLocation = gl.getAttribLocation(program, "a_position");

	// Create a buffer and put three 2d clip space points in it
	let positionBuffer = gl.createBuffer();

	// Bind it to ARRAY_BUFFER (think of it as ARRAY_BUFFER = positionBuffer)
	gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

	// три двумерных точки
	let positions = [
		0, 0,
		0, 0.5,
		0.7, 0,
	];
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

	// code above this line is initialization code.
	// code below this line is rendering code.

	webglUtils.resizeCanvasToDisplaySize(gl.canvas);

	// Tell WebGL how to convert from clip space to pixels
	gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

	// очищаем canvas
	gl.clearColor(0, 0, 0, 0);
	gl.clear(gl.COLOR_BUFFER_BIT);

	// говорим использовать нашу программу (пару шейдеров)
	gl.useProgram(program);

	// Turn on the attribute
	gl.enableVertexAttribArray(positionAttributeLocation);

	// Привязываем буфер положений
	gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

	// Указываем атрибуту, как получать данные от positionBuffer (ARRAY_BUFFER)
	let size = 2;          // 2 компоненты на итерацию
	let type = gl.FLOAT;   // наши данные - 32-битные числа с плавающей точкой
	let normalize = false; // не нормализовать данные
	let stride = 0;        // 0 = перемещаться на size * sizeof(type) каждую итерацию для получения следующего положения
	let offset = 0;        // начинать с начала буфера
	gl.vertexAttribPointer(
			positionAttributeLocation, size, type, normalize, stride, offset);

	// draw
	let primitiveType = gl.TRIANGLES;
	offset = 0;
	let count = 3;
	gl.drawArrays(primitiveType, offset, count);
}

main();
