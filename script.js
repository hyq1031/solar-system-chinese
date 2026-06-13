// 太阳系 3D 可视化
// Solar System 3D Visualization

let scene, camera, renderer, controls;
let planets = [];
let orbits = [];
let labels = [];
let sun;
let speed = 1;
let grandTourMode = false;
let grandTourIndex = 0;
let showOrbits = true;
let showLabels = true;
let audioContext;
let ambientSound;

// 行星数据 | Planet Data
const planetData = [
  {
    name: '水星 | Mercury',
    nameCN: '水星',
    nameEN: 'Mercury',
    description: '水星是太阳系中最小的行星，也是离太阳最近的行星。',
    descriptionEN: 'Mercury is the smallest planet in the Solar System and the closest to the Sun.',
    radius: 0.38,
    distance: 4,
    color: 0x8c8c8c,
    orbitalPeriod: 88,
    rotationPeriod: 59
  },
  {
    name: '金星 | Venus',
    nameCN: '金星',
    nameEN: 'Venus',
    description: '金星是太阳系中最热的行星，表面温度可达465°C。',
    descriptionEN: 'Venus is the hottest planet in the Solar System, with surface temperatures reaching 465°C.',
    radius: 0.95,
    distance: 7,
    color: 0xe6c87a,
    orbitalPeriod: 225,
    rotationPeriod: 243
  },
  {
    name: '地球 | Earth',
    nameCN: '地球',
    nameEN: 'Earth',
    description: '地球是太阳系中唯一已知存在生命的行星。',
    descriptionEN: 'Earth is the only known planet in the Solar System to harbor life.',
    radius: 1,
    distance: 10,
    color: 0x6b93d6,
    orbitalPeriod: 365,
    rotationPeriod: 1
  },
  {
    name: '火星 | Mars',
    nameCN: '火星',
    nameEN: 'Mars',
    description: '火星被称为红色星球，是太阳系中第二小的行星。',
    descriptionEN: 'Mars is known as the Red Planet and is the second smallest planet in the Solar System.',
    radius: 0.53,
    distance: 15,
    color: 0xc1440e,
    orbitalPeriod: 687,
    rotationPeriod: 1.03
  },
  {
    name: '木星 | Jupiter',
    nameCN: '木星',
    nameEN: 'Jupiter',
    description: '木星是太阳系中最大的行星，其质量是其他所有行星总和的2.5倍。',
    descriptionEN: 'Jupiter is the largest planet in the Solar System, with a mass 2.5 times that of all other planets combined.',
    radius: 3.5,
    distance: 25,
    color: 0xd8ca9d,
    orbitalPeriod: 4333,
    rotationPeriod: 0.41
  },
  {
    name: '土星 | Saturn',
    nameCN: '土星',
    nameEN: 'Saturn',
    description: '土星以其壮观的环系统而闻名，是太阳系中第二大行星。',
    descriptionEN: 'Saturn is famous for its spectacular ring system and is the second largest planet in the Solar System.',
    radius: 3,
    distance: 35,
    color: 0xead6b8,
    orbitalPeriod: 10759,
    rotationPeriod: 0.45
  },
  {
    name: '天王星 | Uranus',
    nameCN: '天王星',
    nameEN: 'Uranus',
    description: '天王星是太阳系中第三大行星，其自转轴几乎与轨道平面平行。',
    descriptionEN: 'Uranus is the third largest planet in the Solar System, with its rotation axis almost parallel to its orbital plane.',
    radius: 2,
    distance: 45,
    color: 0xd1e7e7,
    orbitalPeriod: 30687,
    rotationPeriod: 0.72
  },
  {
    name: '海王星 | Neptune',
    nameCN: '海王星',
    nameEN: 'Neptune',
    description: '海王星是太阳系中最遥远的行星，以强烈的风暴而闻名。',
    descriptionEN: 'Neptune is the most distant planet in the Solar System, known for its strong storms.',
    radius: 1.9,
    distance: 55,
    color: 0x5b5ddf,
    orbitalPeriod: 60190,
    rotationPeriod: 0.67
  }
];

function init() {
  // 场景 | Scene
  scene = new THREE.Scene();
  
  // 相机 | Camera
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.set(0, 50, 100);
  
  // 渲染器 | Renderer
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  document.getElementById('canvas-container').appendChild(renderer.domElement);
  
  // 控制器 | Controls
  controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;
  controls.minDistance = 10;
  controls.maxDistance = 200;
  
  // 光照 | Lighting
  const ambientLight = new THREE.AmbientLight(0x333333);
  scene.add(ambientLight);
  
  const pointLight = new THREE.PointLight(0xffffff, 2, 200);
  pointLight.position.set(0, 0, 0);
  scene.add(pointLight);
  
  // 创建太阳 | Create Sun
  createSun();
  
  // 创建行星 | Create Planets
  createPlanets();
  
  // 创建轨道 | Create Orbits
  createOrbits();
  
  // 创建背景星星 | Create Background Stars
  createStars();
  
  // 事件监听 | Event Listeners
  window.addEventListener('resize', onWindowResize);
  renderer.domElement.addEventListener('click', onMouseClick);
  
  // UI 控制器 | UI Controls
  setupControls();
  
  // 开始动画 | Start Animation
  animate();
}

function createProceduralTexture(baseColor, planetName) {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');
  
  // 基础颜色 | Base Color
  const color = new THREE.Color(baseColor);
  ctx.fillStyle = `rgb(${color.r * 255}, ${color.g * 255}, ${color.b * 255})`;
  ctx.fillRect(0, 0, 512, 256);
  
  // 添加纹理细节 | Add Texture Details
  for (let i = 0; i < 1000; i++) {
    const x = Math.random() * 512;
    const y = Math.random() * 256;
    const radius = Math.random() * 3;
    
    const variation = (Math.random() - 0.5) * 0.3;
    const r = Math.min(255, Math.max(0, color.r * 255 + variation * 255));
    const g = Math.min(255, Math.max(0, color.g * 255 + variation * 255));
    const b = Math.min(255, Math.max(0, color.b * 255 + variation * 255));
    
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${r}, ${g}, ${b}, 0.5)`;
    ctx.fill();
  }
  
  // 地球特殊处理 | Earth Special Treatment
  if (planetName === '地球') {
    // 添加大陆 | Add Continents
    ctx.fillStyle = '#228B22';
    for (let i = 0; i < 5; i++) {
      const x = Math.random() * 512;
      const y = Math.random() * 256;
      const w = Math.random() * 100 + 50;
      const h = Math.random() * 50 + 30;
      ctx.fillRect(x, y, w, h);
    }
    
    // 添加云层 | Add Clouds
    ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
    for (let i = 0; i < 20; i++) {
      const x = Math.random() * 512;
      const y = Math.random() * 256;
      const w = Math.random() * 80 + 40;
      const h = Math.random() * 20 + 10;
      ctx.fillRect(x, y, w, h);
    }
  }
  
  // 木星条纹 | Jupiter Stripes
  if (planetName === '木星') {
    for (let i = 0; i < 10; i++) {
      const y = i * 26;
      const variation = (Math.random() - 0.5) * 0.2;
      const r = Math.min(255, Math.max(0, color.r * 255 + variation * 255));
      const g = Math.min(255, Math.max(0, color.g * 255 + variation * 255));
      const b = Math.min(255, Math.max(0, color.b * 255 + variation * 255));
      ctx.fillStyle = `rgba(${r}, ${g}, ${b}, 0.5)`;
      ctx.fillRect(0, y, 512, 26);
    }
  }
  
  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  return texture;
}

function createSun() {
  const geometry = new THREE.SphereGeometry(3, 32, 32);
  const material = new THREE.MeshBasicMaterial({ 
    color: 0xffdd00,
    emissive: 0xffdd00
  });
  sun = new THREE.Mesh(geometry, material);
  scene.add(sun);
  
  // 太阳光晕 | Sun Glow
  const glowGeometry = new THREE.SphereGeometry(3.5, 32, 32);
  const glowMaterial = new THREE.MeshBasicMaterial({
    color: 0xffaa00,
    transparent: true,
    opacity: 0.3
  });
  const glow = new THREE.Mesh(glowGeometry, glowMaterial);
  sun.add(glow);
}

function createPlanets() {
  planetData.forEach((data, index) => {
    // 行星几何体 | Planet Geometry
    const geometry = new THREE.SphereGeometry(data.radius, 64, 64);
    
    // 程序化纹理 | Procedural Texture
    const texture = createProceduralTexture(data.color, data.nameCN);
    const material = new THREE.MeshStandardMaterial({ 
      map: texture,
      roughness: 0.8,
      metalness: 0.2
    });
    const planet = new THREE.Mesh(geometry, material);
    
    // 初始位置 | Initial Position
    planet.position.x = data.distance;
    
    // 存储行星数据 | Store Planet Data
    planet.userData = {
      ...data,
      angle: Math.random() * Math.PI * 2,
      index: index
    };
    
    scene.add(planet);
    planets.push(planet);
    
    // 土星环 | Saturn Rings
    if (data.nameCN === '土星') {
      createSaturnRings(planet);
    }
  });
}

function createSaturnRings(planet) {
  const ringGeometry = new THREE.RingGeometry(3.5, 5, 64);
  const ringMaterial = new THREE.MeshBasicMaterial({
    color: 0xc9b896,
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 0.8
  });
  const ring = new THREE.Mesh(ringGeometry, ringMaterial);
  ring.rotation.x = Math.PI / 2;
  planet.add(ring);
}

function createOrbits() {
  planetData.forEach(data => {
    const orbitGeometry = new THREE.RingGeometry(data.distance - 0.05, data.distance + 0.05, 64);
    const orbitMaterial = new THREE.MeshBasicMaterial({
      color: 0x444444,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.3
    });
    const orbit = new THREE.Mesh(orbitGeometry, orbitMaterial);
    orbit.rotation.x = Math.PI / 2;
    scene.add(orbit);
    orbits.push(orbit);
  });
}

function createStars() {
  const starsGeometry = new THREE.BufferGeometry();
  const starsMaterial = new THREE.PointsMaterial({
    color: 0xffffff,
    size: 0.5
  });
  
  const starsVertices = [];
  for (let i = 0; i < 10000; i++) {
    const x = (Math.random() - 0.5) * 2000;
    const y = (Math.random() - 0.5) * 2000;
    const z = (Math.random() - 0.5) * 2000;
    starsVertices.push(x, y, z);
  }
  
  starsGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starsVertices, 3));
  const stars = new THREE.Points(starsGeometry, starsMaterial);
  scene.add(stars);
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function onMouseClick(event) {
  const mouse = new THREE.Vector2();
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  
  const raycaster = new THREE.Raycaster();
  raycaster.setFromCamera(mouse, camera);
  
  const intersects = raycaster.intersectObjects(planets);
  
  if (intersects.length > 0) {
    const planet = intersects[0].object;
    showPlanetInfo(planet.userData);
  } else {
    hidePlanetInfo();
  }
}

function showPlanetInfo(data) {
  const infoPanel = document.getElementById('planet-info');
  document.getElementById('planet-name').textContent = data.name;
  document.getElementById('planet-description').textContent = data.description;
  infoPanel.style.display = 'block';
}

function hidePlanetInfo() {
  document.getElementById('planet-info').style.display = 'none';
}

function setupControls() {
  // 速度控制 | Speed Control
  document.getElementById('speed').addEventListener('input', (e) => {
    speed = parseFloat(e.target.value);
  });
  
  // 太阳系之旅 | Grand Tour
  document.getElementById('grand-tour').addEventListener('click', () => {
    grandTourMode = !grandTourMode;
    if (grandTourMode) {
      grandTourIndex = 0;
      focusOnPlanet(grandTourIndex);
    }
  });
  
  // 轨道切换 | Toggle Orbits
  document.getElementById('toggle-orbits').addEventListener('click', () => {
    showOrbits = !showOrbits;
    orbits.forEach(orbit => {
      orbit.visible = showOrbits;
    });
  });
  
  // 标签切换 | Toggle Labels
  document.getElementById('toggle-labels').addEventListener('click', () => {
    showLabels = !showLabels;
  });
  
  // 环境音 | Ambient Sound
  document.getElementById('ui').addEventListener('click', initAudio, { once: true });
}

function initAudio() {
  try {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
    createAmbientSound();
  } catch (e) {
    console.log('Audio not supported');
  }
}

function createAmbientSound() {
  if (!audioContext) return;
  
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();
  
  oscillator.type = 'sine';
  oscillator.frequency.setValueAtTime(100, audioContext.currentTime);
  
  gainNode.gain.setValueAtTime(0.05, audioContext.currentTime);
  
  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);
  
  oscillator.start();
  ambientSound = { oscillator, gainNode };
}

function focusOnPlanet(index) {
  if (index >= planets.length) {
    grandTourMode = false;
    return;
  }
  
  const planet = planets[index];
  const targetPosition = planet.position.clone();
  targetPosition.y += 10;
  targetPosition.z += 20;
  
  // 平滑移动相机 | Smooth Camera Movement
  const startPosition = camera.position.clone();
  const endPosition = targetPosition;
  let progress = 0;
  
  function animateCamera() {
    progress += 0.02;
    if (progress >= 1) {
      grandTourIndex++;
      setTimeout(() => focusOnPlanet(grandTourIndex), 3000);
      return;
    }
    
    camera.position.lerpVectors(startPosition, endPosition, progress);
    controls.target.copy(planet.position);
    controls.update();
    requestAnimationFrame(animateCamera);
  }
  
  animateCamera();
}

function animate() {
  requestAnimationFrame(animate);
  
  // 太阳自转 | Sun Rotation
  sun.rotation.y += 0.001;
  
  // 行星运动 | Planet Movement
  planets.forEach(planet => {
    const data = planet.userData;
    
    // 公转 | Revolution
    const orbitalSpeed = (2 * Math.PI) / (data.orbitalPeriod * 0.01) * speed;
    data.angle += orbitalSpeed * 0.01;
    
    planet.position.x = Math.cos(data.angle) * data.distance;
    planet.position.z = Math.sin(data.angle) * data.distance;
    
    // 自转 | Rotation
    const rotationSpeed = (2 * Math.PI) / (data.rotationPeriod * 0.1) * speed;
    planet.rotation.y += rotationSpeed * 0.01;
  });
  
  controls.update();
  renderer.render(scene, camera);
}

// 初始化 | Initialize
init();
