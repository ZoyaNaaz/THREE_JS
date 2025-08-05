## code 1 - responsive
```
import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 65, window.innerWidth / window.innerHeight, 0.1, 100 );
// scene.add(camera)

const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshBasicMaterial( { color: "red" ,  wireframe: true} );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );

camera.position.z = 5;

const canvas = document.querySelector('#draw')
const renderer = new THREE.WebGLRenderer({canvas: canvas, antialias: true});
renderer.setSize( window.innerWidth, window.innerHeight );

window.addEventListener('resize', ()=>{
  renderer.setSize(window.innerWidth, window.innerHeight)
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
})

let clock = new THREE.Clock()
function animate() {
  window.requestAnimationFrame(animate)
  renderer.render(scene, camera)
  cube.rotation.x = clock.getElapsedTime();
  cube.rotation.y = clock.getElapsedTime();
}
animate()
```

## code 2 - orbit controls
```
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
// scene.add(camera)

const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshBasicMaterial( { color: "red" ,  wireframe: true} );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );

camera.position.z = 5;

const canvas = document.querySelector('#draw')
const renderer = new THREE.WebGLRenderer({canvas: canvas, antialias: true});
renderer.setSize( window.innerWidth, window.innerHeight );


const controls = new OrbitControls( camera, renderer.domElement );
controls.enableDamping = true;
controls.autoRotate = true;
// controls.autoRotateSpeed = 12.0
controls.enableZoom = true;
controls.dampingFactor = 0.05

function animate() {
  window.requestAnimationFrame(animate)
  renderer.render(scene, camera)
  controls.update();
  // cube.rotation.x += 0.01
  // cube.rotation.y += 0.01
}
animate()
```
## code 3 - geometry
```
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, .1, 1000);

camera.position.z = 5

/* box geometry
const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshBasicMaterial( { color: "red" ,  wireframe: true} );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );
*/

/* sphere geometry
// let geometry = new THREE.SphereGeometry(1, 5, 5, 2, 1.2)
// let geometry = new THREE.SphereGeometry(1, 10, 10)
// let material = new THREE.MeshBasicMaterial({color: "red", wireframe: true})
// let sphere = new THREE.Mesh(geometry, material)
// scene.add(sphere)
*/

// cylinder geometry
let geometry = new THREE.CylinderGeometry(1, 1, 3, 10, 3, true)
let material = new  THREE.MeshBasicMaterial({color: "yellow", side: THREE.DoubleSide})
let cylinder = new THREE.Mesh(geometry, material)

scene.add(cylinder)

const canvas = document.querySelector('#draw')
let renderer = new THREE.WebGLRenderer({canvas: canvas, antialias: true})

renderer.setSize(window.innerWidth, window.innerHeight)

window.addEventListener('resize', ()=>{
  renderer.setSize(window.innerWidth, window.innerHeight)
  camera.aspect = window.innerWidth/window.innerHeight
  camera.updateProjectionMatrix()
})

let controls = new OrbitControls(camera, renderer.domElement)
// controls.autoRotate = true
controls.enableDamping = true
controls.enableZoom = true

function animate(){
  window.requestAnimationFrame(animate)
  // cylinder.rotation.x += 0.01
  // cylinder.rotation.y += 0.01
  renderer.render(scene, camera)
  controls.update()
  console.log('hello');
}
animate()
```

## code 4 - materials
```
import * as THREE from 'three';
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

let scene = new THREE.Scene()
let camera = new  THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, .1, 1000);

camera.position.z = 5

const geometry = new THREE.BoxGeometry( 2, 2, 2 );
const material = new THREE.MeshStandardMaterial( { color: "red", roughness: 0.3, metalness: 0.3 } );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );
cube.castShadow = true;

const canvas = document.querySelector('#draw')
let renderer = new THREE.WebGLRenderer({canvas:canvas, antialias:true})
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.shadowMap.enabled = true;

//directional light with high intensity
const highIntensityLight = new THREE.DirectionalLight(0xffffff, 2)
highIntensityLight.position.set(10,20,15)
scene.add(highIntensityLight)
//direction light
const directionaLight = new THREE.DirectionalLight(0xffffff, 1)
directionaLight.position.set(5,10,7.5)
scene.add(directionaLight)
//ambidient light
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
scene.add(ambientLight)
//point light
const pointLight = new THREE.PointLight(0xffffff, 1, 100)
pointLight.position.set(0,5,0)
scene.add(pointLight)
highIntensityLight.castShadow = true;
directionaLight.castShadow = true;
// light helpers
const highIntensityLightHelper = new THREE.DirectionalLightHelper(highIntensityLight, 5)
scene.add(highIntensityLightHelper)
const directionaLightHelper = new THREE.DirectionalLightHelper(directionaLight, 5)
scene.add(directionaLightHelper)
// const ambientLightHelper = new THREE.AmbientLightHelper(ambientLight, 5)
// scene.add(ambientLightHelper)
const pointLightHelper = new THREE.PointLightHelper(pointLight, 5)
scene.add(pointLightHelper)

let controls = new OrbitControls(camera, renderer.domElement)
// controls.autoRotate = true
// controls.autoRotateSpeed = 12.0
controls.enableDamping = true
controls.dampingFactor = 0.25
controls.enableZoom = true
function animate() {
  window.requestAnimationFrame(animate)
  renderer.render(scene, camera);
  controls.update()
}
animate()
```
## code 5 - textures
```
import * as THREE from 'three';
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

let scene = new THREE.Scene()
let camera = new  THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, .1, 1000);

camera.position.z = 5
//textures
let loader = new THREE.TextureLoader()
let color = loader.load("./textures/color.jpg")
let roughness = loader.load("./textures/roughness.jpg")
let normal = loader.load("./textures/normal.png")
let height = loader.load("./textures/height.png")

const geometry = new THREE.BoxGeometry( 3, 1.8, 2 );
const material = new THREE.MeshStandardMaterial( { map: color, roughnessMap: roughness, normalMap: normal} );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );
cube.castShadow = true;

const canvas = document.querySelector('#draw')
let renderer = new THREE.WebGLRenderer({canvas:canvas, antialias:true})
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.shadowMap.enabled = true;

//directional light with high intensity
const highIntensityLight = new THREE.DirectionalLight(0xffffff, 2)
highIntensityLight.position.set(10,20,15)
scene.add(highIntensityLight)
//direction light
const directionaLight = new THREE.DirectionalLight(0xffffff, 1)
directionaLight.position.set(5,10,7.5)
scene.add(directionaLight)
//ambidient light
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
scene.add(ambientLight)
//point light
const pointLight = new THREE.PointLight(0xffffff, 1, 100)
pointLight.position.set(0,5,0)
scene.add(pointLight)
highIntensityLight.castShadow = true;
directionaLight.castShadow = true;
// light helpers
const highIntensityLightHelper = new THREE.DirectionalLightHelper(highIntensityLight, 5)
scene.add(highIntensityLightHelper)
const directionaLightHelper = new THREE.DirectionalLightHelper(directionaLight, 5)
scene.add(directionaLightHelper)
// const ambientLightHelper = new THREE.AmbientLightHelper(ambientLight, 5)
// scene.add(ambientLightHelper)
const pointLightHelper = new THREE.PointLightHelper(pointLight, 5)
scene.add(pointLightHelper)

let controls = new OrbitControls(camera, renderer.domElement)
// controls.autoRotate = true
// controls.autoRotateSpeed = 12.0
controls.enableDamping = true
controls.dampingFactor = 0.25
controls.enableZoom = true
function animate() {
  window.requestAnimationFrame(animate)
  renderer.render(scene, camera);
  controls.update()
}
animate()
```

## code 6 - lil gui
```
import * as THREE from 'three'
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import * as lil from 'lil-gui';

let scene = new THREE.Scene()
let camera = new  THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, .1, 1000);

camera.position.z = 5
//textures
let loader = new THREE.TextureLoader()
let color = loader.load("./textures/color.jpg")
let roughness = loader.load("./textures/roughness.jpg")
let normal = loader.load("./textures/normal.png")

const geometry = new THREE.BoxGeometry( 3, 1.8, 2 );
const material = new THREE.MeshStandardMaterial( { map: color, roughnessMap: roughness, normalMap: normal} );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );
cube.castShadow = true;

const canvas = document.querySelector('#draw')
let renderer = new THREE.WebGLRenderer({canvas:canvas, antialias:true})
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.shadowMap.enabled = true;

//directional light with high intensity
const highIntensityLight = new THREE.DirectionalLight(0xffffff, 2)
highIntensityLight.position.set(10,20,15)
scene.add(highIntensityLight)
//direction light
const directionaLight = new THREE.DirectionalLight(0xffffff, 1)
directionaLight.position.set(5,10,7.5)
scene.add(directionaLight)
//ambidient light
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
scene.add(ambientLight)
//point light
const pointLight = new THREE.PointLight(0xffffff, 1, 100)
pointLight.position.set(0,5,0)
scene.add(pointLight)
highIntensityLight.castShadow = true;
directionaLight.castShadow = true;
// light helpers
const highIntensityLightHelper = new THREE.DirectionalLightHelper(highIntensityLight, 5)
scene.add(highIntensityLightHelper)
const directionaLightHelper = new THREE.DirectionalLightHelper(directionaLight, 5)
scene.add(directionaLightHelper)
// const ambientLightHelper = new THREE.AmbientLightHelper(ambientLight, 5)
// scene.add(ambientLightHelper)
const pointLightHelper = new THREE.PointLightHelper(pointLight, 5)
scene.add(pointLightHelper)

//lil-gui
const gui = new lil.GUI()
//material settings
const materialFolder = gui.addFolder('Material')
materialFolder.add(material, 'roughness', 0, 1).name('Roughness')
materialFolder.add(material, 'metalness', 0, 1).name('Metalness')
materialFolder.addColor(material, 'color').name('Color')
materialFolder.open()

//mesh setting
const meshFolder = gui.addFolder('Mesh')
meshFolder.add(cube.scale, 'x',0.1, 5).name('Scale X')
meshFolder.add(cube.scale, 'y',0.1, 5).name('Scale Y')
meshFolder.add(cube.scale, 'z',0.1, 5).name('Scale Z')
meshFolder.add(cube.position, 'x', -10, 10).name('Position X')
meshFolder.add(cube.position, 'y', -10, 10).name('Position Y')
meshFolder.add(cube.position, 'z', -10, 10).name('Position Z')
meshFolder.open()



let controls = new OrbitControls(camera, renderer.domElement)
// controls.autoRotate = true
// controls.autoRotateSpeed = 12.0
controls.enableDamping = true
controls.dampingFactor = 0.25
controls.enableZoom = true
function animate() {
  window.requestAnimationFrame(animate)
  renderer.render(scene, camera);
  controls.update()
}
animate()
```

## code 7 - lights
```
import * as THREE from 'three'
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import * as lil from 'lil-gui';

let scene = new THREE.Scene()
let camera = new  THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, .1, 1000);

camera.position.z = 5
//textures
let loader = new THREE.TextureLoader()
let color = loader.load("./textures/color.jpg")
let roughness = loader.load("./textures/roughness.jpg")
let normal = loader.load("./textures/normal.png")

const geometry = new THREE.BoxGeometry( 3, 1.8, 2 );
const material = new THREE.MeshStandardMaterial( { map: color, roughnessMap: roughness, normalMap: normal} );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );
cube.castShadow = true;

const canvas = document.querySelector('#draw')
let renderer = new THREE.WebGLRenderer({canvas:canvas, antialias:true})
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.shadowMap.enabled = true;

//lights
let ambient = new THREE.AmbientLight(0xffffff, 1)
scene.add(ambient)

let directional = new THREE.DirectionalLight(0xffffff, 3)
directional.position.set(2,2,2)
scene.add(directional)
let dHelper = new THREE.DirectionalLightHelper(directional, .5)
scene.add(dHelper)

let point = new THREE.PointLight(0xffffff, 1, 100)
point.position.set(1,-1,1)
scene.add(point)

let pHelper = new THREE.PointLightHelper(point, .3)
scene.add(pHelper)
//lil-gui
const gui = new lil.GUI()
//panel for lights
const lightFolder = gui.addFolder('Lights')
//ambient
const ambientFolder = lightFolder.addFolder('Ambient Light')
ambientFolder.add(ambient, 'intensity', 0,2).name('Intensity')

const directionalFolder = lightFolder.addFolder('Directional Light')
directionalFolder.add(directional, 'intensity', 0, 5).name('Intensity')
directionalFolder.add(directional.position, 'x', -10,10).name('Position X')
directionalFolder.add(directional.position, 'y', -10,10).name('Position Y')
directionalFolder.add(directional.position, 'z', -10,10).name('Position Z')

const pointFolder = lightFolder.addFolder('Point Light')
pointFolder.add(directional, 'intensity', 0, 5).name('Intensity')
pointFolder.add(directional.position, 'x', -10,10).name('Position X')
pointFolder.add(directional.position, 'y', -10,10).name('Position Y')
pointFolder.add(directional.position, 'z', -10,10).name('Position Z')



let controls = new OrbitControls(camera, renderer.domElement)
// controls.autoRotate = true
// controls.autoRotateSpeed = 12.0
controls.enableDamping = true
controls.dampingFactor = 0.25
controls.enableZoom = true
function animate() {
  window.requestAnimationFrame(animate)
  renderer.render(scene, camera);
  controls.update()
}
animate()
```

## code 8 - 3d models
```
import * as THREE from 'three'
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import {RGBELoader} from 'three/examples/jsm/loaders/RGBELoader.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

let scene = new THREE.Scene()
let camera = new  THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, .1, 1000);
camera.position.set(0,0,6)

const canvas = document.querySelector('#draw')
let renderer = new THREE.WebGLRenderer({canvas:canvas, antialias:true})
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setPixelRatio(window.devicePixelRatio)
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.outputEncoding = THREE.sRGBEncoding;

const rgbeLoader = new RGBELoader()
rgbeLoader.load('https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/zawiszy_czarnego_1k.hdr', function(texture){
  texture.mapping = THREE.EquirectangularReflectionMapping;
  scene.environment = texture;
  // scene.background = texture;
})

const loader = new GLTFLoader();
loader.load('./wooden_box (1).glb', function(gltf){
  gltf.scene.position.y = -1.2
  scene.add(gltf.scene)
})

let controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true
controls.dampingFactor = 0.25
controls.enableZoom = true

function animate() {
  window.requestAnimationFrame(animate)
  renderer.render(scene, camera);
  controls.update()
}
animate()
```