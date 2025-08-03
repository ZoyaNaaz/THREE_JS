import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, .1, 1000);

camera.position.z = 5

// let geometry = new THREE.SphereGeometry(1, 5, 5, 2, 1.2)
let geometry = new THREE.SphereGeometry(1, 10, 10)
let material = new THREE.MeshBasicMaterial({color: "red", wireframe: true})
let sphere = new THREE.Mesh(geometry, material)
scene.add(sphere)

const canvas = document.querySelector('#draw')
let renderer = new THREE.WebGLRenderer({canvas: canvas, antialias: true})

renderer.setSize(window.innerWidth, window.innerHeight)

window.addEventListener('resize', ()=>{
  renderer.setSize(window.innerWidth, window.innerHeight)
  camera.aspect = window.innerWidth/window.innerHeight
  camera.updateProjectionMatrix()
})

let controls = new OrbitControls(camera, renderer.domElement)
controls.autoRotate = true
controls.enableDamping = true
controls.enableZoom = true

function animate(){
  window.requestAnimationFrame(animate)
  sphere.rotation.x += 0.01
  sphere.rotation.y += 0.01
  renderer.render(scene, camera)
  controls.update()
}
animate()