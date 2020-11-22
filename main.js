let canvas = document.querySelector('#c')
let gl = canvas.getContext("webgl")
if (!gl) {
	console.log('WebGL not worked')
} else {
	console.log('WebGL worked')
}

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

let vertexShaderSource = document.querySelector("#vertex-shader-2d").text;
let fragmentShaderSource = document.querySelector("#fragment-shader-2d").text;

let vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
let fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);

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

let program = createProgram(gl, vertexShader, fragmentShader);
let positionAttributeLocation = gl.getAttribLocation(program, "a_position");
let positionBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

// три двумерных точки
var positions = [
  0, 0,
  0, 0.5,
  0.7, 0,
];
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

/*webglUtils.*/resizeCanvasToDisplaySize(gl.canvas);
gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

// очищаем canvas
gl.clearColor(0, 0, 0, 0);
gl.clear(gl.COLOR_BUFFER_BIT);

// говорим использовать нашу программу (пару шейдеров)
gl.useProgram(program);

// Привязываем буфер положений
gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

// Указываем атрибуту, как получать данные от positionBuffer (ARRAY_BUFFER)
var size = 2;          // 2 компоненты на итерацию
var type = gl.FLOAT;   // наши данные - 32-битные числа с плавающей точкой
var normalize = false; // не нормализовать данные
var stride = 0;        // 0 = перемещаться на size * sizeof(type) каждую итерацию для получения следующего положения
var offset = 0;        // начинать с начала буфера
gl.vertexAttribPointer(
    positionAttributeLocation, size, type, normalize, stride, offset)

var primitiveType = gl.TRIANGLES;
var offset = 0;
var count = 3;
gl.drawArrays(primitiveType, offset, count);
