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
let labelSprites = [];
let voyager1, voyager2;
let showVoyagers = true;
let eclipseOverlay;
let showEclipse = false;
let transferOrbits = [];
let showTransfer = false;
let launchPath;
let showLaunch = false;

// 行星数据 | Planet Data
// 真实距离比例（天文单位 AU）| True scale distances (AU)
const planetData = [
  {
    name: '水星 | Mercury',
    nameCN: '水星',
    nameEN: 'Mercury',
    description: '水星是太阳系中最小的行星，也是离太阳最近的行星。',
    descriptionEN: 'Mercury is the smallest planet in the Solar System and the closest to the Sun.',
    radius: 0.38,
    distance: 0.39, // 0.39 AU
    color: 0x8c8c8c,
    orbitalPeriod: 88,
    rotationPeriod: 59,
    diameter: '4,879 km',
    age: '4.5 billion years',
    surfaceTemp: '-173°C to 427°C',
    coreTemp: '1,700°C',
    type: 'Terrestrial',
    mass: '3.285 × 10²³ kg',
    lightToEarth: '3-10 minutes'
  },
  {
    name: '金星 | Venus',
    nameCN: '金星',
    nameEN: 'Venus',
    description: '金星是太阳系中最热的行星，表面温度可达465°C。',
    descriptionEN: 'Venus is the hottest planet in the Solar System, with surface temperatures reaching 465°C.',
    radius: 0.95,
    distance: 0.72, // 0.72 AU
    color: 0xe6c87a,
    orbitalPeriod: 225,
    rotationPeriod: 243,
    diameter: '12,104 km',
    age: '4.5 billion years',
    surfaceTemp: '462°C',
    coreTemp: '5,000°C',
    type: 'Terrestrial',
    mass: '4.867 × 10²⁴ kg',
    lightToEarth: '2-14 minutes'
  },
  {
    name: '地球 | Earth',
    nameCN: '地球',
    nameEN: 'Earth',
    description: '地球是太阳系中唯一已知存在生命的行星。',
    descriptionEN: 'Earth is the only known planet in the Solar System to harbor life.',
    radius: 1,
    distance: 1.0, // 1.0 AU
    color: 0x6b93d6,
    orbitalPeriod: 365,
    rotationPeriod: 1,
    diameter: '12,742 km',
    age: '4.5 billion years',
    surfaceTemp: '-89°C to 57°C',
    coreTemp: '5,400°C',
    type: 'Terrestrial',
    mass: '5.972 × 10²⁴ kg',
    lightToEarth: '0 minutes (home)'
  },
  {
    name: '火星 | Mars',
    nameCN: '火星',
    nameEN: 'Mars',
    description: '火星被称为红色星球，是太阳系中第二小的行星。',
    descriptionEN: 'Mars is known as the Red Planet and is the second smallest planet in the Solar System.',
    radius: 0.53,
    distance: 1.52, // 1.52 AU
    color: 0xc1440e,
    orbitalPeriod: 687,
    rotationPeriod: 1.03,
    diameter: '6,779 km',
    age: '4.5 billion years',
    surfaceTemp: '-87°C to -5°C',
    coreTemp: '1,500°C',
    type: 'Terrestrial',
    mass: '6.39 × 10²³ kg',
    lightToEarth: '3-22 minutes'
  },
  {
    name: '木星 | Jupiter',
    nameCN: '木星',
    nameEN: 'Jupiter',
    description: '木星是太阳系中最大的行星，其质量是其他所有行星总和的2.5倍。',
    descriptionEN: 'Jupiter is the largest planet in the Solar System, with a mass 2.5 times that of all other planets combined.',
    radius: 3.5,
    distance: 5.2, // 5.2 AU
    color: 0xd8ca9d,
    orbitalPeriod: 4333,
    rotationPeriod: 0.41,
    diameter: '139,820 km',
    age: '4.5 billion years',
    surfaceTemp: '-108°C',
    coreTemp: '24,000°C',
    type: 'Gas Giant',
    mass: '1.898 × 10²⁷ kg',
    lightToEarth: '35-52 minutes'
  },
  {
    name: '土星 | Saturn',
    nameCN: '土星',
    nameEN: 'Saturn',
    description: '土星以其壮观的环系统而闻名，是太阳系中第二大行星。',
    descriptionEN: 'Saturn is famous for its spectacular ring system and is the second largest planet in the Solar System.',
    radius: 3,
    distance: 9.5, // 9.5 AU
    color: 0xead6b8,
    orbitalPeriod: 10759,
    rotationPeriod: 0.45,
    diameter: '116,460 km',
    age: '4.5 billion years',
    surfaceTemp: '-139°C',
    coreTemp: '11,700°C',
    type: 'Gas Giant',
    mass: '5.683 × 10²⁶ kg',
    lightToEarth: '65-80 minutes'
  },
  {
    name: '天王星 | Uranus',
    nameCN: '天王星',
    nameEN: 'Uranus',
    description: '天王星是太阳系中第三大行星，其自转轴几乎与轨道平面平行。',
    descriptionEN: 'Uranus is the third largest planet in the Solar System, with its rotation axis almost parallel to its orbital plane.',
    radius: 2,
    distance: 19.2, // 19.2 AU
    color: 0xd1e7e7,
    orbitalPeriod: 30687,
    rotationPeriod: 0.72,
    diameter: '50,724 km',
    age: '4.5 billion years',
    surfaceTemp: '-197°C',
    coreTemp: '5,000°C',
    type: 'Ice Giant',
    mass: '8.681 × 10²⁵ kg',
    lightToEarth: '2.5-2.7 hours'
  },
  {
    name: '海王星 | Neptune',
    nameCN: '海王星',
    nameEN: 'Neptune',
    description: '海王星是太阳系中最遥远的行星，以强烈的风暴而闻名。',
    descriptionEN: 'Neptune is the most distant planet in the Solar System, known for its strong storms.',
    radius: 1.9,
    distance: 30.1, // 30.1 AU
    color: 0x5b5ddf,
    orbitalPeriod: 60190,
    rotationPeriod: 0.67,
    diameter: '49,244 km',
    age: '4.5 billion years',
    surfaceTemp: '-201°C',
    coreTemp: '5,400°C',
    type: 'Ice Giant',
    mass: '1.024 × 10²⁶ kg',
    lightToEarth: '4.0-4.2 hours'
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
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  document.getElementById('canvas-container').appendChild(renderer.domElement);
  
  // 控制器 | Controls
  controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;
  controls.minDistance = 10;
  controls.maxDistance = 200;
  
  // 光照 | Lighting
  const ambientLight = new THREE.AmbientLight(0x222222);
  scene.add(ambientLight);
  
  const sunLight = new THREE.PointLight(0xffffff, 2, 200);
  sunLight.position.set(0, 0, 0);
  sunLight.castShadow = true;
  sunLight.shadow.mapSize.width = 2048;
  sunLight.shadow.mapSize.height = 2048;
  scene.add(sunLight);
  
  // 创建太阳 | Create Sun
  createSun();
  
  // 创建行星 | Create Planets
  createPlanets();
  
  // 创建轨道 | Create Orbits
  createOrbits();
  
  // 创建旅行者号 | Create Voyagers
  createVoyagers();
  
  // 创建日食覆盖层 | Create Eclipse Overlay
  createEclipseOverlay();
  
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
  // 太阳核心 | Sun Core
  const geometry = new THREE.SphereGeometry(2, 64, 64);
  const material = new THREE.MeshBasicMaterial({ 
    color: 0xffaa00,
    emissive: 0xffaa00
  });
  sun = new THREE.Mesh(geometry, material);
  scene.add(sun);
  
  // 太阳光晕层 | Sun Glow Layers
  const glow1Geometry = new THREE.SphereGeometry(2.3, 64, 64);
  const glow1Material = new THREE.MeshBasicMaterial({
    color: 0xff8800,
    transparent: true,
    opacity: 0.4
  });
  const glow1 = new THREE.Mesh(glow1Geometry, glow1Material);
  sun.add(glow1);
  
  const glow2Geometry = new THREE.SphereGeometry(2.6, 64, 64);
  const glow2Material = new THREE.MeshBasicMaterial({
    color: 0xff6600,
    transparent: true,
    opacity: 0.2
  });
  const glow2 = new THREE.Mesh(glow2Geometry, glow2Material);
  sun.add(glow2);
  
  const glow3Geometry = new THREE.SphereGeometry(3.0, 64, 64);
  const glow3Material = new THREE.MeshBasicMaterial({
    color: 0xff4400,
    transparent: true,
    opacity: 0.1
  });
  const glow3 = new THREE.Mesh(glow3Geometry, glow3Material);
  sun.add(glow3);
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
    planet.castShadow = false;
    planet.receiveShadow = false;
    
    // 缩放距离用于可视化 | Scale distance for visualization
    const scaledDistance = data.distance * 1.5 + 3;
    
    // 初始位置 | Initial Position
    planet.position.x = scaledDistance;
    
    // 存储行星数据 | Store Planet Data
    planet.userData = {
      ...data,
      scaledDistance: scaledDistance,
      angle: Math.random() * Math.PI * 2,
      index: index
    };
    
    // 添加点击检测球体 | Add click detection sphere (invisible but larger)
    const clickGeometry = new THREE.SphereGeometry(data.radius * 2, 32, 32);
    const clickMaterial = new THREE.MeshBasicMaterial({ 
      transparent: true, 
      opacity: 0,
      side: THREE.DoubleSide
    });
    const clickSphere = new THREE.Mesh(clickGeometry, clickMaterial);
    clickSphere.userData = planet.userData;
    planet.add(clickSphere);
    
    scene.add(planet);
    planets.push(planet);
    
    // 创建浮动标签 | Create Floating Label
    createPlanetLabel(planet, data.nameCN);
    
    // 土星环 | Saturn Rings
    if (data.nameCN === '土星') {
      createSaturnRings(planet);
    }
  });
}

function createPlanetLabel(planet, name) {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  canvas.width = 256;
  canvas.height = 64;
  
  context.fillStyle = 'rgba(0, 0, 0, 0.2)';
  context.fillRect(0, 0, 256, 64);
  
  context.font = 'bold 28px Arial';
  context.fillStyle = 'rgba(255, 255, 255, 0.7)';
  context.textAlign = 'center';
  context.textBaseline = 'middle';
  context.fillText(name, 128, 32);
  
  const texture = new THREE.CanvasTexture(canvas);
  const spriteMaterial = new THREE.SpriteMaterial({ 
    map: texture, 
    transparent: true,
    opacity: 0.7,
    depthTest: false,
    depthWrite: false
  });
  const sprite = new THREE.Sprite(spriteMaterial);
  sprite.scale.set(4, 1, 1);
  sprite.position.set(0, planet.userData.radius + 2, 0);
  
  planet.add(sprite);
  labelSprites.push(sprite);
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
    const scaledDistance = data.distance * 1.5 + 3;
    const orbitGeometry = new THREE.RingGeometry(scaledDistance - 0.05, scaledDistance + 0.05, 64);
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

function createVoyagers() {
  // Voyager 1
  const voyager1Geometry = new THREE.ConeGeometry(0.1, 0.3, 8);
  const voyager1Material = new THREE.MeshBasicMaterial({ color: 0xff6600 });
  voyager1 = new THREE.Mesh(voyager1Geometry, voyager1Material);
  voyager1.position.set(5, 0, 0);
  voyager1.rotation.z = Math.PI / 2;
  voyager1.userData = {
    angle: 0,
    distance: 5,
    speed: 0.005
  };
  scene.add(voyager1);
  
  // Voyager 2
  const voyager2Geometry = new THREE.ConeGeometry(0.1, 0.3, 8);
  const voyager2Material = new THREE.MeshBasicMaterial({ color: 0xff6600 });
  voyager2 = new THREE.Mesh(voyager2Geometry, voyager2Material);
  voyager2.position.set(7, 0, 0);
  voyager2.rotation.z = Math.PI / 2;
  voyager2.userData = {
    angle: Math.PI,
    distance: 7,
    speed: 0.005
  };
  scene.add(voyager2);
}

function createEclipseOverlay() {
  const eclipseGeometry = new THREE.SphereGeometry(100, 32, 32);
  const eclipseMaterial = new THREE.MeshBasicMaterial({
    color: 0x000000,
    transparent: true,
    opacity: 0.8,
    side: THREE.BackSide
  });
  eclipseOverlay = new THREE.Mesh(eclipseGeometry, eclipseMaterial);
  eclipseOverlay.visible = false;
  scene.add(eclipseOverlay);
}

function createTransferOrbits() {
  // Create Hohmann transfer orbits between Earth and Mars
  const earth = planets.find(p => p.userData.nameCN === '地球');
  const mars = planets.find(p => p.userData.nameCN === '火星');
  
  if (earth && mars) {
    const transferCurve = new THREE.EllipseCurve(
      0, 0,
      earth.userData.scaledDistance + (mars.userData.scaledDistance - earth.userData.scaledDistance) / 2,
      (earth.userData.scaledDistance + mars.userData.scaledDistance) / 2,
      0, 2 * Math.PI,
      false,
      0
    );
    
    const points = transferCurve.getPoints(100);
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const material = new THREE.LineBasicMaterial({ color: 0x00ff00, transparent: true, opacity: 0.5 });
    const transferOrbit = new THREE.Line(geometry, material);
    transferOrbit.rotation.x = Math.PI / 2;
    scene.add(transferOrbit);
    transferOrbits.push(transferOrbit);
  }
}

function removeTransferOrbits() {
  transferOrbits.forEach(orbit => scene.remove(orbit));
  transferOrbits = [];
}

function showLaunchVisualization() {
  // Create a launch trajectory from Earth
  const earth = planets.find(p => p.userData.nameCN === '地球');
  if (earth) {
    const launchGeometry = new THREE.BufferGeometry();
    const launchPoints = [];
    
    for (let i = 0; i < 50; i++) {
      const t = i / 50;
      const x = earth.position.x + t * 20;
      const y = earth.position.y + t * 5;
      const z = earth.position.z + t * 10;
      launchPoints.push(new THREE.Vector3(x, y, z));
    }
    
    launchGeometry.setFromPoints(launchPoints);
    const launchMaterial = new THREE.LineBasicMaterial({ color: 0xffff00, transparent: true, opacity: 0.8 });
    launchPath = new THREE.Line(launchGeometry, launchMaterial);
    scene.add(launchPath);
    
    // Animate launch
    animateLaunch(launchPath);
  }
}

function animateLaunch(path) {
  let progress = 0;
  function animate() {
    if (!showLaunch) {
      if (path) scene.remove(path);
      return;
    }
    
    progress += 0.01;
    if (progress >= 1) {
      progress = 0;
    }
    
    // Move a small spacecraft along the path
    const position = new THREE.Vector3();
    path.geometry.attributes.position.fromBufferAttribute(path.geometry.attributes.position);
    const points = [];
    for (let i = 0; i < path.geometry.attributes.position.count; i++) {
      points.push(new THREE.Vector3(
        path.geometry.attributes.position.getX(i),
        path.geometry.attributes.position.getY(i),
        path.geometry.attributes.position.getZ(i)
      ));
    }
    
    const index = Math.floor(progress * points.length);
    if (points[index]) {
      // Could add a spacecraft marker here
    }
    
    requestAnimationFrame(animate);
  }
  animate();
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
  
  const intersects = raycaster.intersectObjects(planets, true);
  
  console.log('Click detected, intersects:', intersects.length);
  
  if (intersects.length > 0) {
    // Find the parent planet (might hit a child like label or ring)
    let planet = intersects[0].object;
    while (planet.parent && !planet.userData.nameCN) {
      planet = planet.parent;
    }
    
    if (planet.userData.nameCN) {
      console.log('Planet clicked:', planet.userData.nameCN);
      showPlanetInfo(planet.userData);
    }
  } else {
    hidePlanetInfo();
  }
}

function showPlanetInfo(data) {
  const infoPanel = document.getElementById('planet-info');
  document.getElementById('planet-name').textContent = data.name;
  document.getElementById('planet-description').textContent = data.description;
  document.getElementById('planet-diameter').textContent = data.diameter || '-';
  document.getElementById('planet-age').textContent = data.age || '-';
  document.getElementById('planet-surface-temp').textContent = data.surfaceTemp || '-';
  document.getElementById('planet-core-temp').textContent = data.coreTemp || '-';
  document.getElementById('planet-type').textContent = data.type || '-';
  document.getElementById('planet-mass').textContent = data.mass || '-';
  document.getElementById('planet-light-to-earth').textContent = data.lightToEarth || '-';
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
    labelSprites.forEach(sprite => sprite.visible = showLabels);
  });
  
  // Ensure labels are visible by default
  labelSprites.forEach(sprite => sprite.visible = showLabels);
  
  // 旅行者号切换 | Toggle Voyagers
  document.getElementById('toggle-voyagers').addEventListener('click', () => {
    showVoyagers = !showVoyagers;
    if (voyager1) voyager1.visible = showVoyagers;
    if (voyager2) voyager2.visible = showVoyagers;
  });
  
  // 日食切换 | Toggle Eclipse
  document.getElementById('toggle-eclipse').addEventListener('click', () => {
    showEclipse = !showEclipse;
    if (eclipseOverlay) eclipseOverlay.visible = showEclipse;
  });
  
  // 转移轨道 | Transfer Orbits
  document.getElementById('show-transfer').addEventListener('click', () => {
    showTransfer = !showTransfer;
    if (showTransfer) {
      createTransferOrbits();
    } else {
      removeTransferOrbits();
    }
  });
  
  // 发射 | Launch
  document.getElementById('show-launch').addEventListener('click', () => {
    showLaunch = !showLaunch;
    if (showLaunch) {
      showLaunchVisualization();
    }
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
    
    planet.position.x = Math.cos(data.angle) * data.scaledDistance;
    planet.position.z = Math.sin(data.angle) * data.scaledDistance;
    
    // 自转 | Rotation
    const rotationSpeed = (2 * Math.PI) / (data.rotationPeriod * 0.1) * speed;
    planet.rotation.y += rotationSpeed * 0.01;
  });
  
  // 旅行者号运动 | Voyager Movement
  if (showVoyagers && voyager1 && voyager2) {
    voyager1.userData.angle += voyager1.userData.speed * speed;
    voyager1.userData.distance += 0.01 * speed;
    voyager1.position.x = Math.cos(voyager1.userData.angle) * voyager1.userData.distance;
    voyager1.position.z = Math.sin(voyager1.userData.angle) * voyager1.userData.distance;
    
    voyager2.userData.angle += voyager2.userData.speed * speed;
    voyager2.userData.distance += 0.01 * speed;
    voyager2.position.x = Math.cos(voyager2.userData.angle) * voyager2.userData.distance;
    voyager2.position.z = Math.sin(voyager2.userData.angle) * voyager2.userData.distance;
  }
  
  controls.update();
  renderer.render(scene, camera);
}

// 初始化 | Initialize
init();
