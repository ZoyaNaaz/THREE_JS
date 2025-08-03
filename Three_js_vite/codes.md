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