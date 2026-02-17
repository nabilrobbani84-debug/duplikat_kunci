// Initialize AOS Animation Library
AOS.init({
    duration: 1000,
    once: true,
    offset: 100
});

// Three.js 3D Key Scene
const initThreeJS = () => {
    const container = document.getElementById('canvas-container');
    if (!container) return;

    // Scene
    const scene = new THREE.Scene();
    
    // Camera
    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.z = 5;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xf1c40f, 1);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);
    
    const pointLight2 = new THREE.PointLight(0xffffff, 0.5);
    pointLight2.position.set(-5, -5, 5);
    scene.add(pointLight2);

    // Key Group
    const keyGroup = new THREE.Group();

    // Material - Metallic Gold
    const material = new THREE.MeshStandardMaterial({ 
        color: 0xffd700, 
        roughness: 0.3, 
        metalness: 0.8,
        emissive: 0x222222
    });

    // 1. Key Head (Bow) - A flattened sphere or torus
    const headGeometry = new THREE.TorusGeometry(0.8, 0.2, 16, 100);
    const head = new THREE.Mesh(headGeometry, material);
    head.position.x = -2;
    keyGroup.add(head);

    // 2. Shaft
    const shaftGeometry = new THREE.CylinderGeometry(0.15, 0.15, 3, 32);
    const shaft = new THREE.Mesh(shaftGeometry, material);
    shaft.rotation.z = Math.PI / 2; // Horizontal
    shaft.position.x = 0; // Center it relative to head
    keyGroup.add(shaft);

    // 3. Teeth / Bitting
    const teethGroup = new THREE.Group();
    const toothGeo = new THREE.BoxGeometry(0.4, 0.4, 0.1);
    
    // Create a few teeth
    for(let i=0; i<3; i++) {
        const tooth = new THREE.Mesh(toothGeo, material);
        tooth.position.x = 1.0 + (i * 0.3);
        tooth.position.y = -0.3 + (Math.random() * -0.2); // Random height
        tooth.scale.y = 0.5 + Math.random();
        teethGroup.add(tooth);
    }
    keyGroup.add(teethGroup);

    // Add Key to Scene
    scene.add(keyGroup);

    // Animation Loop
    const animate = () => {
        requestAnimationFrame(animate);

        // Continuous slow rotation
        keyGroup.rotation.y += 0.005;
        keyGroup.rotation.x += 0.002;

        // Interactive rotation based on mouse (optional, kept simple for now)

        renderer.render(scene, camera);
    };

    animate();

    // Handle Resize
    window.addEventListener('resize', () => {
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
    });

    // Scroll Effect - Rotate key faster on scroll
    window.addEventListener('scroll', () => {
        keyGroup.rotation.y += 0.05;
    });
};

// Initialize Three.js when DOM is ready
document.addEventListener('DOMContentLoaded', initThreeJS);

// Navbar Toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

if(menuToggle) {
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
}
