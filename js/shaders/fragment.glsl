precision mediump float;

// передается из вершинного шейдера
varying vec4 v_color;

void main() {
	gl_FragColor = v_color;
}
