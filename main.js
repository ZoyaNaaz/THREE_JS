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