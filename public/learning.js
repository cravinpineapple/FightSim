const canvas = document.querySelector('canvas');
// getting context
const gl = canvas.getContext('webgl');

if (!gl) {
	throw new Error('WebGL not supported :(');
}


// 1. vertexData = [...];
// 2. create buffer
// 3. load vertex Data into buffer
// 4. create vertex shader
// 5. create fragment shader
// 6. create program
// 7. attach shaders to program
// 8. enable vertex attributes we want to use
// 9. draw


// 1. vertexData = [...];
const vertexData = [
	0, 1, 0,
	1, -1, 0,
	-1, -1, 0,
];

const colorData = [
	0, 0, 1,	// V1.color (red)
	0, 1, 1,	// V2.color (green)
	0, 0, 1,	// V3.color (blue)
];

// 2. create buffer
const positionBuffer = gl.createBuffer();
// 3. load vertex Data into buffer
gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexData), gl.STATIC_DRAW);

const colorBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colorData), gl.STATIC_DRAW);

// 4. create vertex shader
const vertexShader = gl.createShader(gl.VERTEX_SHADER);
gl.shaderSource(vertexShader, `
precision mediump float;

attribute vec3 position;
attribute vec3 color;
varying vec3 vColor;

void main() {
	vColor = color;
    gl_Position = vec4(position, 1);
}
`);
gl.compileShader(vertexShader);

// 5. create fragment shader
const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
gl.shaderSource(fragmentShader, `
precision mediump float;
varying vec3 vColor;

void main() {
    gl_FragColor = vec4(vColor, 1);
}
`);
gl.compileShader(fragmentShader);

// 6. create program
const program = gl.createProgram();

// 7. attach shaders to program
gl.attachShader(program, vertexShader);
gl.attachShader(program, fragmentShader);

gl.linkProgram(program);

// 8. enable vertex attributes we want to use
const positionLocation = gl.getAttribLocation(program, `position`);
gl.enableVertexAttribArray(positionLocation);
gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
gl.vertexAttribPointer(positionLocation, 3, gl.FLOAT, false, 0, 0);

const colorLocation = gl.getAttribLocation(program, `color`);
gl.enableVertexAttribArray(colorLocation);
gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
gl.vertexAttribPointer(colorLocation, 3, gl.FLOAT, false, 0, 0);

// 9. draw
gl.useProgram(program);
gl.drawArrays(gl.TRIANGLES, 0, 3);