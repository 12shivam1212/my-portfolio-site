// Three.js Animated Background
(function() {
    const canvas = document.getElementById('bg-canvas');
    if (!canvas) return;
    
    // Create scene, camera, and renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    
    // Camera position
    camera.position.z = 5;
    
    // Create particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 5000;
    const posArray = new Float32Array(particlesCount * 3);
    
    for (let i = 0; i < particlesCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 10;
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    
    // Create material with gradient colors
    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.005,
        color: 0x6366f1,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending
    });
    
    // Create particle system
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);
    
    // Create geometric shapes
    const geometries = [];
    const materials = [];
    
    // Torus
    const torusGeometry = new THREE.TorusGeometry(0.7, 0.2, 16, 100);
    const torusMaterial = new THREE.MeshBasicMaterial({ 
        color: 0x8b5cf6, 
        wireframe: true,
        transparent: true,
        opacity: 0.3
    });
    const torus = new THREE.Mesh(torusGeometry, torusMaterial);
    torus.position.set(-3, 1, 0);
    scene.add(torus);
    geometries.push(torus);
    
    // Icosahedron
    const icoGeometry = new THREE.IcosahedronGeometry(0.5, 0);
    const icoMaterial = new THREE.MeshBasicMaterial({ 
        color: 0x06b6d4, 
        wireframe: true,
        transparent: true,
        opacity: 0.3
    });
    const icosahedron = new THREE.Mesh(icoGeometry, icoMaterial);
    icosahedron.position.set(3, -1, 0);
    scene.add(icosahedron);
    geometries.push(icosahedron);
    
    // Octahedron
    const octaGeometry = new THREE.OctahedronGeometry(0.6, 0);
    const octaMaterial = new THREE.MeshBasicMaterial({ 
        color: 0x6366f1, 
        wireframe: true,
        transparent: true,
        opacity: 0.3
    });
    const octahedron = new THREE.Mesh(octaGeometry, octaMaterial);
    octahedron.position.set(0, 2, -2);
    scene.add(octahedron);
    geometries.push(octahedron);
    
    // Mouse interaction
    let mouseX = 0;
    let mouseY = 0;
    
    document.addEventListener('mousemove', (event) => {
        mouseX = (event.clientX / window.innerWidth) * 2 - 1;
        mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    });
    
    // Animation loop
    let frameId;
    function animate() {
        frameId = requestAnimationFrame(animate);
        
        // Rotate particles
        particlesMesh.rotation.y += 0.0005;
        particlesMesh.rotation.x += 0.0003;
        
        // Animate geometric shapes
        geometries.forEach((geo, index) => {
            geo.rotation.x += 0.01 * (index + 1);
            geo.rotation.y += 0.01 * (index + 1);
            
            // React to mouse
            geo.position.x += (mouseX * 0.5 - geo.position.x) * 0.02;
            geo.position.y += (mouseY * 0.5 - geo.position.y) * 0.02;
        });
        
        // Camera subtle movement based on mouse
        camera.position.x = mouseX * 0.5;
        camera.position.y = mouseY * 0.5;
        camera.lookAt(scene.position);
        
        renderer.render(scene, camera);
    }
    
    animate();
    
    // Handle window resize
    function handleResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }
    
    window.addEventListener('resize', handleResize);
    
    // Cleanup on page unload
    window.addEventListener('beforeunload', () => {
        cancelAnimationFrame(frameId);
        renderer.dispose();
        particlesGeometry.dispose();
        particlesMaterial.dispose();
    });
})();
