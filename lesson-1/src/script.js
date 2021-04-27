import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'

// Loading
    // Load Textures
const textureLoader = new THREE.TextureLoader();

const normalTexture = textureLoader.load('/textures/golf-normal.png');


// Debug
const gui = new dat.GUI();

// Canvas
const canvas = document.querySelector('canvas.webgl');

// Scene
const scene = new THREE.Scene();

// Objects
// basically geometry/shape of something
const geometry = new THREE.SphereBufferGeometry(0.5, 64, 64);
// geometry.position(0, 0, 0);

// Materials
// "clothing" if you will
const material = new THREE.MeshStandardMaterial();
material.metalness = 0.7;
material.roughness = 0.2;
material.normalMap = normalTexture;
material.transparent = true;
material.opacity = 0.5;
material.color = new THREE.Color(0xc7079);

// Mesh
// ties body and skin together (geometry and material)
const sphere = new THREE.Mesh(geometry,material)
scene.add(sphere);

// Objs is body, materials are skin, mesh brings the two together

// Lights

const pointLight = new THREE.PointLight(0xffffff, 0.1);
pointLight.position.x = 2;
pointLight.position.y = 3;
pointLight.position.z = 4;
scene.add(pointLight);

// LIGHT 2
 
// adding second light with color
const pointLight2 = new THREE.PointLight(0xFF00FF, 2);
pointLight2.position.set(-0.04, -0.93, 0.69); // x, y, z
pointLight2.intensity = 2;
scene.add(pointLight2);

// const light1 = gui.addFolder('Light 1');

// light1.add(pointLight2.position, 'x').min(-6).max(6).step(0.01);
// light1.add(pointLight2.position, 'y').min(-3).max(3).step(0.01);
// light1.add(pointLight2.position, 'z').min(-3).max(3).step(0.01);
// light1.add(pointLight2, 'intensity').min(0).max(10).step(0.01);

// const pointLightHelper = new THREE.PointLightHelper(pointLight2, 0.3);
// scene.add(pointLightHelper);

// LIGHT 3
const pointLight3 = new THREE.PointLight(0x7cc8ed, 2);
pointLight3.position.set(-1.45, 0.66, 0.4); // x, y, z
pointLight3.intensity = 3;
scene.add(pointLight3);

// const light2 = gui.addFolder('Light 2');

// light2.add(pointLight3.position, 'x').min(-6).max(6).step(0.01);
// light2.add(pointLight3.position, 'y').min(-3).max(3).step(0.01);
// light2.add(pointLight3.position, 'z').min(-3).max(3).step(0.01);
// light2.add(pointLight3, 'intensity').min(0).max(10).step(0.01);

// // edit color on gui
// const light2Color = {
//     color: 0x7cc8ed,
// }

// light2.addColor(light2Color, 'color').onChange(() => {
//     pointLight3.color.set(light2Color.color);
// });

// const pointLightHelper2 = new THREE.PointLightHelper(pointLight3, 0.3);
// scene.add(pointLightHelper2);






/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 0
camera.position.y = 0
camera.position.z = 2
scene.add(camera)

// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

/**
 * Renderer
 */
// alpha: true makes threejs background transparent and 
//      shows just website contents
const renderer = new THREE.WebGLRenderer({
    canvas: canvas, alpha: true,
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
// add event listeners

// changes the movement of the object when moving it
document.addEventListener('mousemove', onDocumentMouseMove);
document.addEventListener('keydown', onDocumentKeyDown);

let mouseX = 0;
let mouseY = 0;
let targetX = 0;
let targetY = 0;
let keyX = 0;
let keyY = 0;
let targetKeyX = sphere.position.x;
let targetKeyY = sphere.position.y;


const windowHalfX = window.innerWidth / 2;
const windowHalfY = window.innerHeight / 2;

function onDocumentMouseMove(event) {
    mouseX = (event.clientX - windowHalfX);
    mouseY = (event.clientY - windowHalfY);
}

function onDocumentKeyDown(event) {
    if (event.key == 'w')
        keyY += 1;
    if (event.key == 's')
        keyY += -1;
    if (event.key == 'a')
        keyX -= 1;
    if (event.key == 'd')
        keyX += 1;
}

function updateSphere(event) {
    sphere.position.y = window.scrollY * 0.002;
}

window.addEventListener('scroll', updateSphere);


const clock = new THREE.Clock()

const tick = () =>
{
    targetX = mouseX * 0.0025;
    targetY = mouseY * 0.0025;
    targetKeyX = keyX * 0.025;
    targetKeyY = keyY * 0.025;

    const elapsedTime = clock.getElapsedTime()

    // Update objects
    sphere.rotation.y = 0.6 * elapsedTime

    
    sphere.rotation.y += 0.5 * (targetX - sphere.rotation.y);
    sphere.rotation.x += 0.05 * (targetY - sphere.rotation.x);
    sphere.position.z += 0.05 * (targetY);
    sphere.position.x += targetKeyX;
    sphere.position.y += targetKeyY;
    sphere.material.opacity = 1.5 * (Math.abs(targetX));

    // Update Orbital Controls
    // controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()