// import './style.css'


import * as THREE from 'three'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import WebGL from 'three/addons/capabilities/WebGL.js';

if ( WebGL.isWebGL2Available() ) {
//create scene
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45,window.innerWidth/window.innerHeight,0.1,5000);
camera.position.set(0, 0, 20);

let modelContainer = document.getElementById("model");
const renderer = new THREE.WebGLRenderer({
    antialias: true
});
renderer.setSize(modelContainer.clientWidth,modelContainer.clientHeight);
renderer.setClearColor(0x000000);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setClearColor(0xffffff)
modelContainer.appendChild(renderer.domElement);


modelContainer.addEventListener("mouseenter", function() {
    console.log("Mouse entered");
    renderer.setClearColor(new THREE.Color("rgb(0,0,0)"));
    camera.position.set(5, -100, 50);
    controls.update();
});

modelContainer.addEventListener("mouseleave", function() {
    console.log("Mouse left");
    renderer.setClearColor(0xffffff);
    camera.position.set(5, -200, 20);
    controls.update();
});

//add light
const ambinetLight = new THREE.AmbientLight(0xffffff,0.5)
scene.add(ambinetLight)

//orbit controls
const controls =new OrbitControls(camera, renderer.domElement)

//loader
let loader = new GLTFLoader();
let model;
loader.load("phoenix_bird.glb",(gltf)=>{
    model = gltf.scene;
    model.scale.set(0.2,0.2,0.2)
    model.position.set(0,0,0);
    camera.position.set(5,-200,20)
    const box = new THREE.Box3().setFromObject(model);
    const center = box.getCenter(new THREE.Vector3());
    model.position.sub(center);
    scene.add(model);
},undefined,(error)=>{
    alert("model not laoded.")
})

window.addEventListener("resize",()=>{
    renderer.setSize(modelContainer.clientWidth,modelContainer.clientHeight);
    camera.aspect = window.innerWidth/window.innerHeight;
    camera.updateProjectionMatrix();
  })

function animate(){
    window.requestAnimationFrame(animate);
    camera.aspect = window.innerWidth/window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.render(scene,camera);
    controls.update();
}

animate();
// renderer.render(scene,camera);
} else {

	const warning = WebGL.getWebGL2ErrorMessage();
	alert(warning);

}