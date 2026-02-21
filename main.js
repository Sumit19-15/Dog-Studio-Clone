import * as THREE from "three";

const scene = new THREE.Scene(); // creating virtual world as scene
// now need camers to view that 
const camera = new THREE.PerspectiveCamera(
  75, // field of view
  window.innerWidth / window.innerHeight, // aspect ratio
  0.1, // near point visible
  1000, // far point visible
);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setAnimationLoop(animate);
document.body.appendChild(renderer.domElement);

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material); // mesh ( shape , material)
scene.add(cube);

camera.position.z = 5;

function animate(time) {
  //   cube.rotation.x = time / 2000;
  //   cube.rotation.y = time / 1000;

  renderer.render(scene, camera);

  requestAnimationFrame(animate);
}

animate();
