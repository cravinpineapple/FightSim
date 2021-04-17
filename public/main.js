const canvas = document.querySelector('canvas');
// getting context
const gl = canvas.getContext('webgl');

if (!gl) {
	throw new Error('WebGL not supported :(');
}

alert(`Everything peachy here :)`);