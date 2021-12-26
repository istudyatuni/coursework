attribute vec4 a_position;
attribute vec4 a_color;

// transform matrix
uniform mat4 u_matrix;

varying vec4 v_color;

void main() {
	// умножаем коородинаты на матрицу
	gl_Position = u_matrix * a_position;
	gl_PointSize = 10.0;

	// передаем во фрагментный шейдер
	v_color = a_color;
}
