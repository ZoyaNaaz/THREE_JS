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