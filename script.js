const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  60, window.innerWidth/window.innerHeight, 0.1, 100
);
camera.position.set(2,2,2);

const renderer = new THREE.WebGLRenderer({antialias:true});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

new THREE.OrbitControls(camera, renderer.domElement);

// Unit cell cube
const cube = new THREE.BoxGeometry(1,1,1);
const cubeMat = new THREE.MeshBasicMaterial({
  color: 0x000000,
  wireframe: true
});
scene.add(new THREE.Mesh(cube, cubeMat));

// Atom material
const atomMat = new THREE.MeshPhongMaterial({color:0x0077ff});
const atomGeo = new THREE.SphereGeometry(0.12, 32, 32);

// FCC atom positions
const positions = [
  [0.5,0.5,0.5], // body
  [0.5,0.5,0], [0.5,0.5,1],
  [0.5,0,0.5], [0.5,1,0.5],
  [0,0.5,0.5], [1,0.5,0.5]
];

positions.forEach(p=>{
  const atom = new THREE.Mesh(atomGeo, atomMat);
  atom.position.set(p[0]-0.5, p[1]-0.5, p[2]-0.5);
  scene.add(atom);
});

// Light
scene.add(new THREE.AmbientLight(0xffffff,0.6));
const light = new THREE.DirectionalLight(0xffffff,0.6);
light.position.set(2,2,2);
scene.add(light);

function animate(){
  requestAnimationFrame(animate);
  renderer.render(scene,camera);
}
animate();
