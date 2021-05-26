import './style.css'
import * as THREE from 'three';
//import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// common in three js to create a 3-d scene with moves when scrolled
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg'),

});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
camera.position.setX(-3);

// call the render method and pass it the screen and camera
renderer.render(scene, camera)

const geometry = new THREE.TorusGeometry( 7, 1, 10, 80);
const material = new THREE.MeshStandardMaterial( { color: 0x7AC1D8 });
const torus = new THREE.Mesh(geometry, material);

// add the torus to the sceen
scene.add(torus)

// add lighting to our torus
// positon it away from the center + add to scene
const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5,5,5);

// instanciate ambientLight for the entire scene
const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

// helpers in here for now
/*const lightHelper = new THREE.PointLightHelper(pointLight);
const gridHelper = new THREE.GridHelper(200, 50);
scene.add(lightHelper, gridHelper);*/

// orbit controls
// const controls = new OrbitControls( camera, renderer.domElement );

// function to generate random stars in space
function addStar() {
    const geometry = new THREE.SphereGeometry(0.25, 24, 24);
    const material = new THREE.MeshStandardMaterial( { color:0xffffff});
    const star = new THREE.Mesh( geometry, material );

    const[x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));

    // positon the random spheres + add to scene
    star.position.set(x, y, z);
    scene.add(star);
}

// create an array for the stars
Array(200).fill().forEach(addStar);

// add an image to the star texture
const spaceTexture = new THREE.TextureLoader().load('space.jpeg');
scene.background = spaceTexture;

const meTexture = new THREE.TextureLoader().load('me.png');

const me = new THREE.Mesh(
    new THREE.BoxGeometry(3, 3, 3),
    new THREE.MeshBasicMaterial( { map: meTexture } )
);

scene.add(me);

// earth shape
const earthTexture = new THREE.TextureLoader().load('mars.jpeg');
const normalTexture = new THREE.TextureLoader().load('mars_normal1.png');

const earth = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
    new THREE.MeshStandardMaterial( {
        map: earthTexture,
        normalMap: normalTexture,

    })
);




scene.add(earth);

// positon the planet down
earth.position.z = 30;
earth.position.setX(-10);

me.position.z = -5;
me.position.x = 2;

// move the camera with the scroll
function moveCamera() {
    // calculate where the user is currently
    const t = document.body.getBoundingClientRect().top;

    me.rotation.y += 0.01;
    me.rotation.x =+ 0.01;

    camera.position.z = t * -0.01;
    camera.position.x = t * -0.0002;
    camera.rotation.y = t * -0.0002;
    
}

document.body.onscroll = moveCamera;

// loop needed to animate the ui
// game loop
function animate() {
    requestAnimationFrame(animate);

    torus.rotation.x += 0.01;
    earth.rotation.y += 0.001;
    torus.rotation.y += 0.005;
    torus.rotation.z += 0.01;

    // listens to dom events and updates the camera
    // controls.update();



    renderer.render(scene, camera);
}

animate();
