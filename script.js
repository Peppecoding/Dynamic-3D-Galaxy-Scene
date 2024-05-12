import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.126.1/build/three.module.js';
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.126.1/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.minDistance = 100;
controls.maxDistance = 500;

const particleCount = 20000, particles = new THREE.BufferGeometry();
let positions = [];
let colors = [];
const color = new THREE.Color();
const pMaterial = new THREE.PointsMaterial({
    vertexColors: true,
    size: 1,
    blending: THREE.AdditiveBlending,
    transparent: true,
    opacity: 0.75
});

// Populate particle positions and colors
for (let p = 0; p < particleCount; p++) {
    const x = Math.random() * 1000 - 500;
    const y = Math.random() * 1000 - 500;
    const z = Math.random() * 1000 - 500;

    positions.push(x, y, z);

    const vx = (x / 1000) + 0.5;
    const vy = (y / 1000) + 0.5;
    const vz = (z / 1000) + 0.5;

    color.setRGB(vx, vy, vz);
    colors.push(color.r, color.g, color.b);
}

particles.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
particles.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

const particleSystem = new THREE.Points(particles, pMaterial);
scene.add(particleSystem);

camera.position.z = 400;

function animate() {
    requestAnimationFrame(animate);
    particleSystem.rotation.y += 0.002;
    renderer.render(scene, camera);
    controls.update();
}
animate();
