// 太阳系 3D 可视化
// Solar System 3D Visualization

let scene, camera, renderer, controls;
let clock = new THREE.Clock();
let planets = [];
let orbits = [];
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
let soundEnabled = false;
let oscillators = [];
let moon;
let asteroidBelt;
let asteroidBeltCollider;
let showAsteroidBelt = true;
let celestialBodies = [];
let currentLanguage = 'both'; // 'both' | 'zh' | 'en'

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
    lightToEarth: '3-10 minutes',
    discoveredBy: 'Known since antiquity',
    discoveryDate: 'Prehistoric',
    sizeVsEarth: "38% of Earth's diameter"
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
    lightToEarth: '2-14 minutes',
    discoveredBy: 'Known since antiquity',
    discoveryDate: 'Prehistoric',
    sizeVsEarth: "95% of Earth's diameter"
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
    lightToEarth: '0 minutes (home)',
    discoveredBy: 'N/A — our home planet',
    discoveryDate: 'N/A',
    sizeVsEarth: 'Baseline (100%)'
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
    lightToEarth: '3-22 minutes',
    discoveredBy: 'Known since antiquity',
    discoveryDate: 'Prehistoric',
    sizeVsEarth: "53% of Earth's diameter"
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
    lightToEarth: '35-52 minutes',
    discoveredBy: 'Known since antiquity',
    discoveryDate: 'Prehistoric',
    sizeVsEarth: "11.2x Earth's diameter"
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
    lightToEarth: '65-80 minutes',
    discoveredBy: 'Known since antiquity',
    discoveryDate: 'Prehistoric',
    sizeVsEarth: "9.4x Earth's diameter"
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
    lightToEarth: '2.5-2.7 hours',
    discoveredBy: 'William Herschel',
    discoveryDate: '1781',
    sizeVsEarth: "4.0x Earth's diameter"
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
    lightToEarth: '4.0-4.2 hours',
    discoveredBy: 'Urbain Le Verrier & Johann Galle',
    discoveryDate: '1846',
    sizeVsEarth: "3.9x Earth's diameter"
  }
];

function init() {
  // 场景 | Scene
  scene = new THREE.Scene();
  
  // 相机 | Camera
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.set(0, 80, 0);
  
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
  
  // 创建月球 | Create Moon
  createMoon();

  // 创建小行星带 | Create Asteroid Belt
  createAsteroidBelt();

  // 可点击天体注册表 | Unified clickable-body registry (sidebar lookup + raycasting)
  celestialBodies = [sun, ...planets, moon, asteroidBeltCollider];

  // 事件监听 | Event Listeners
  window.addEventListener('resize', onWindowResize);
  renderer.domElement.addEventListener('click', onMouseClick);
  
  // UI 控制器 | UI Controls
  setupControls();
  
  // 开始动画 | Start Animation
  animate();
}

function clampChannel(value) {
  return Math.min(255, Math.max(0, value));
}

function hexToRgba(hex, alpha) {
  const c = new THREE.Color(hex);
  return `rgba(${c.r * 255}, ${c.g * 255}, ${c.b * 255}, ${alpha})`;
}

// 柔和有机噪点 | Soft organic noise blobs (replaces uniform speckle dots)
function drawSurfaceNoise(ctx, color) {
  for (let i = 0; i < 300; i++) {
    const x = Math.random() * 512;
    const y = Math.random() * 256;
    const radius = 15 + Math.random() * 35;
    const variation = (Math.random() - 0.5) * 0.18;
    const r = clampChannel(color.r * 255 + variation * 255);
    const g = clampChannel(color.g * 255 + variation * 255);
    const b = clampChannel(color.b * 255 + variation * 255);
    const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
    gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, 0.25)`);
    gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);
    ctx.fillStyle = gradient;
    ctx.fillRect(x - radius, y - radius, radius * 2, radius * 2);
  }
}

// 陨石坑（岩质行星/月球）| Craters for rocky bodies
function drawCraters(ctx, color, count) {
  for (let i = 0; i < count; i++) {
    const x = Math.random() * 512;
    const y = Math.random() * 256;
    const radius = 4 + Math.random() * 14;

    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
    ctx.fill();

    ctx.beginPath();
    ctx.arc(x - radius * 0.15, y - radius * 0.15, radius * 0.65, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${clampChannel(color.r * 255 + 25)}, ${clampChannel(color.g * 255 + 25)}, ${clampChannel(color.b * 255 + 25)}, 0.3)`;
    ctx.fill();

    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
    ctx.lineWidth = 1;
    ctx.stroke();
  }
}

// 极地冰盖 | Polar ice caps (canvas top/bottom map to the poles)
function drawPolarCaps(ctx, coverage) {
  const capHeight = 256 * coverage * 0.5;

  const top = ctx.createLinearGradient(0, 0, 0, capHeight);
  top.addColorStop(0, 'rgba(255, 255, 255, 0.9)');
  top.addColorStop(1, 'rgba(255, 255, 255, 0)');
  ctx.fillStyle = top;
  ctx.fillRect(0, 0, 512, capHeight);

  const bottom = ctx.createLinearGradient(0, 256 - capHeight, 0, 256);
  bottom.addColorStop(0, 'rgba(255, 255, 255, 0)');
  bottom.addColorStop(1, 'rgba(255, 255, 255, 0.9)');
  ctx.fillStyle = bottom;
  ctx.fillRect(0, 256 - capHeight, 512, capHeight);
}

// 大陆（地球，有机斑点簇而非硬边矩形）| Earth continents as organic blob clusters
function drawContinents(ctx) {
  ctx.fillStyle = '#2e8b3e';
  for (let c = 0; c < 6; c++) {
    const cx = Math.random() * 512;
    const cy = 40 + Math.random() * 176;
    const blobCount = 5 + Math.floor(Math.random() * 4);
    ctx.beginPath();
    for (let b = 0; b < blobCount; b++) {
      const bx = cx + (Math.random() - 0.5) * 90;
      const by = cy + (Math.random() - 0.5) * 60;
      const r = 15 + Math.random() * 25;
      ctx.moveTo(bx + r, by);
      ctx.arc(bx, by, r, 0, Math.PI * 2);
    }
    ctx.fill();
  }
}

// 云层（地球，柔和光晕而非硬边矩形）| Earth clouds as soft glows
function drawClouds(ctx) {
  for (let i = 0; i < 25; i++) {
    const x = Math.random() * 512;
    const y = Math.random() * 256;
    const r = 10 + Math.random() * 20;
    const gradient = ctx.createRadialGradient(x, y, 0, x, y, r);
    gradient.addColorStop(0, 'rgba(255, 255, 255, 0.4)');
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
    ctx.fillStyle = gradient;
    ctx.fillRect(x - r, y - r, r * 2, r * 2);
  }
}

// 金星云层旋涡 | Venus's swirling cloud bands
function drawCloudSwirls(ctx) {
  for (let i = 0; i < 8; i++) {
    const y = Math.random() * 256;
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
    ctx.lineWidth = 8 + Math.random() * 10;
    ctx.beginPath();
    ctx.moveTo(0, y);
    for (let x = 0; x <= 512; x += 32) {
      ctx.lineTo(x, y + Math.sin(x * 0.02 + i) * 20);
    }
    ctx.stroke();
  }
}

// 湍流条带（气态/冰巨星）| Turbulent wavy bands for gas/ice giants
function drawBands(ctx, color, bandCount, waviness) {
  const bandHeight = 256 / bandCount;
  for (let i = 0; i < bandCount; i++) {
    const variation = (Math.random() - 0.5) * 0.25;
    const r = clampChannel(color.r * 255 + variation * 255);
    const g = clampChannel(color.g * 255 + variation * 255);
    const b = clampChannel(color.b * 255 + variation * 255);
    ctx.fillStyle = `rgba(${r}, ${g}, ${b}, 0.45)`;

    const baseY = i * bandHeight;
    ctx.beginPath();
    ctx.moveTo(0, baseY);
    for (let x = 0; x <= 512; x += 16) {
      ctx.lineTo(x, baseY + Math.sin(x * 0.05 + i) * waviness);
    }
    for (let x = 512; x >= 0; x -= 16) {
      ctx.lineTo(x, baseY + bandHeight + Math.sin(x * 0.05 + i) * waviness);
    }
    ctx.closePath();
    ctx.fill();
  }
}

// 风暴（木星大红斑、海王星暗斑）| Storm spot (Jupiter's Great Red Spot, Neptune's dark spot)
function drawStorm(ctx, x, y, radiusX, radiusY, colorHex, opacity) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(radiusX / radiusY, 1);
  const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, radiusY);
  gradient.addColorStop(0, hexToRgba(colorHex, opacity));
  gradient.addColorStop(1, hexToRgba(colorHex, 0));
  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.arc(0, 0, radiusY, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
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

  drawSurfaceNoise(ctx, color);

  const planetType = (planetData.find(p => p.nameCN === planetName) || {}).type;

  if (planetType === 'Gas Giant') {
    drawBands(ctx, color, 14, 6);
  } else if (planetType === 'Ice Giant') {
    drawBands(ctx, color, 6, 2);
  }

  if (planetName === '木星') {
    drawStorm(ctx, 360, 150, 38, 22, '#c1440e', 0.6);
  }

  if (planetName === '海王星') {
    drawStorm(ctx, 150, 90, 16, 12, '#1a2a6c', 0.5);
  }

  if (planetName === '地球') {
    drawContinents(ctx);
    drawClouds(ctx);
    drawPolarCaps(ctx, 0.35);
  }

  if (planetName === '火星') {
    drawCraters(ctx, color, 18);
    drawPolarCaps(ctx, 0.22);
  }

  if (planetName === '金星') {
    drawCloudSwirls(ctx);
  }

  if (planetName === '水星' || planetName === '月球') {
    drawCraters(ctx, color, planetName === '月球' ? 35 : 45);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  return texture;
}

function createSun() {
  // 太阳核心 | Sun Core
  const geometry = new THREE.SphereGeometry(0.8, 64, 64);
  
  // Create custom shader material for 3D sun effect
  const material = new THREE.ShaderMaterial({
    uniforms: {
      time: { value: 0 },
      color1: { value: new THREE.Color(0xffdd44) },
      color2: { value: new THREE.Color(0xff8800) }
    },
    vertexShader: `
      varying vec2 vUv;
      varying vec3 vNormal;
      varying vec3 vPosition;
      
      void main() {
        vUv = uv;
        vNormal = normal;
        vPosition = position;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform float time;
      uniform vec3 color1;
      uniform vec3 color2;
      varying vec2 vUv;
      varying vec3 vNormal;
      varying vec3 vPosition;
      
      void main() {
        // Create noise-like pattern for 3D effect
        float noise = sin(vPosition.x * 10.0 + time) * cos(vPosition.y * 10.0 + time) * 0.5 + 0.5;
        float noise2 = sin(vPosition.z * 8.0 - time * 0.5) * 0.5 + 0.5;
        
        // Mix colors based on noise and normal
        float intensity = dot(vNormal, vec3(0.0, 0.0, 1.0));
        vec3 finalColor = mix(color1, color2, noise * noise2);
        
        // Add rim lighting for 3D effect
        float rim = 1.0 - abs(dot(vNormal, vec3(0.0, 0.0, 1.0)));
        finalColor += rim * 0.3 * color1;
        
        gl_FragColor = vec4(finalColor, 1.0);
      }
    `
  });
  
  sun = new THREE.Mesh(geometry, material);
  sun.castShadow = false;
  sun.receiveShadow = false;
  sun.userData = {
    name: '太阳 | Sun',
    nameCN: '太阳',
    nameEN: 'Sun',
    description: '太阳是太阳系的中心，是一颗G型主序星，占太阳系总质量的99.86%。',
    descriptionEN: 'The Sun is the center of the Solar System, a G-type main-sequence star that comprises 99.86% of the total mass of the Solar System.',
    diameter: '1,392,700 km',
    age: '4.6 billion years',
    surfaceTemp: '5,500°C',
    coreTemp: '15 million °C',
    type: 'G-type Main Sequence Star',
    mass: '1.989 × 10³⁰ kg',
    lightToEarth: '8 minutes 20 seconds',
    discoveredBy: 'N/A — known since antiquity',
    discoveryDate: 'N/A',
    sizeVsEarth: "109x Earth's diameter"
  };
  scene.add(sun);
  
  // 太阳光晕层 | Sun Glow Layers
  const glow1Geometry = new THREE.SphereGeometry(0.95, 64, 64);
  const glow1Material = new THREE.MeshBasicMaterial({
    color: 0xffaa22,
    transparent: true,
    opacity: 0.5
  });
  const glow1 = new THREE.Mesh(glow1Geometry, glow1Material);
  sun.add(glow1);
  
  const glow2Geometry = new THREE.SphereGeometry(1.1, 64, 64);
  const glow2Material = new THREE.MeshBasicMaterial({
    color: 0xff8800,
    transparent: true,
    opacity: 0.3
  });
  const glow2 = new THREE.Mesh(glow2Geometry, glow2Material);
  sun.add(glow2);
  
  const glow3Geometry = new THREE.SphereGeometry(1.3, 64, 64);
  const glow3Material = new THREE.MeshBasicMaterial({
    color: 0xff6600,
    transparent: true,
    opacity: 0.15
  });
  const glow3 = new THREE.Mesh(glow3Geometry, glow3Material);
  sun.add(glow3);
  
  const glow4Geometry = new THREE.SphereGeometry(1.5, 64, 64);
  const glow4Material = new THREE.MeshBasicMaterial({
    color: 0xff4400,
    transparent: true,
    opacity: 0.08
  });
  const glow4 = new THREE.Mesh(glow4Geometry, glow4Material);
  sun.add(glow4);
}

function createPlanets() {
  planetData.forEach((data, index) => {
    // 行星几何体 | Planet Geometry
    const geometry = new THREE.SphereGeometry(data.radius, 32, 32);
    
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
  
  // No background fill - completely transparent
  context.font = 'bold 28px Arial';
  context.fillStyle = 'rgba(255, 255, 255, 0.6)';
  context.textAlign = 'center';
  context.textBaseline = 'middle';
  context.fillText(name, 128, 32);
  
  const texture = new THREE.CanvasTexture(canvas);
  const spriteMaterial = new THREE.SpriteMaterial({ 
    map: texture, 
    transparent: true,
    opacity: 0.6,
    depthTest: false,
    depthWrite: false
  });
  const sprite = new THREE.Sprite(spriteMaterial);
  sprite.scale.set(3, 0.75, 1);
  sprite.position.set(0, planet.userData.radius + 1.5, 0);
  
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
    // Create a curved line for transfer orbit
    const points = [];
    const segments = 100;
    
    for (let i = 0; i <= segments; i++) {
      const t = i / segments;
      const angle = t * Math.PI;
      
      // Elliptical orbit parameters
      const a = (earth.userData.scaledDistance + mars.userData.scaledDistance) / 2;
      const b = (earth.userData.scaledDistance + mars.userData.scaledDistance) / 2 * 0.8;
      
      const x = Math.cos(angle) * a;
      const y = Math.sin(angle) * b * 0.3;
      const z = Math.sin(angle) * a;
      
      points.push(new THREE.Vector3(x, y, z));
    }
    
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const material = new THREE.LineBasicMaterial({ 
      color: 0x00ff00, 
      transparent: true, 
      opacity: 0.5,
      linewidth: 1
    });
    const transferOrbit = new THREE.Line(geometry, material);
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

function createMoon() {
  const moonGeometry = new THREE.SphereGeometry(0.15, 32, 32);
  const moonTexture = createProceduralTexture(0xaaaaaa, '月球');
  const moonMaterial = new THREE.MeshStandardMaterial({
    map: moonTexture,
    roughness: 0.9,
    metalness: 0.1
  });
  moon = new THREE.Mesh(moonGeometry, moonMaterial);
  moon.castShadow = false;
  moon.receiveShadow = false;
  moon.userData = {
    name: '月球 | Moon',
    nameCN: '月球',
    nameEN: 'Moon',
    description: '月球是地球唯一的天然卫星，也是太阳系中第五大卫星。',
    descriptionEN: "The Moon is Earth's only natural satellite and the fifth largest moon in the Solar System.",
    diameter: '3,474 km',
    age: '4.5 billion years',
    surfaceTemp: '-153°C to 107°C',
    coreTemp: '~1,400°C',
    type: 'Natural Satellite',
    mass: '7.342 × 10²² kg',
    lightToEarth: '1.3 seconds',
    discoveredBy: 'Known since prehistory',
    discoveryDate: 'Prehistoric',
    sizeVsEarth: "27% of Earth's diameter",
    angle: 0,
    distance: 1.5,
    orbitalPeriod: 27.3
  };

  // 月球点击检测球体 | Moon click detection sphere (invisible but larger, matches planet pattern)
  const clickGeometry = new THREE.SphereGeometry(0.3, 32, 32);
  const clickMaterial = new THREE.MeshBasicMaterial({
    transparent: true,
    opacity: 0,
    side: THREE.DoubleSide
  });
  const clickSphere = new THREE.Mesh(clickGeometry, clickMaterial);
  clickSphere.userData = moon.userData;
  moon.add(clickSphere);

  scene.add(moon);
}

const ASTEROID_BELT_INNER_RADIUS = 6;
const ASTEROID_BELT_OUTER_RADIUS = 8.5;

function createAsteroidBelt() {
  // 小行星视觉效果 | Visual asteroid particles between Mars and Jupiter
  const beltGeometry = new THREE.BufferGeometry();
  const beltMaterial = new THREE.PointsMaterial({
    color: 0x9c8b7a,
    size: 0.08
  });

  const beltVertices = [];
  for (let i = 0; i < 2000; i++) {
    const angle = Math.random() * Math.PI * 2;
    const radius = ASTEROID_BELT_INNER_RADIUS + Math.random() * (ASTEROID_BELT_OUTER_RADIUS - ASTEROID_BELT_INNER_RADIUS);
    const x = Math.cos(angle) * radius;
    const z = Math.sin(angle) * radius;
    const y = (Math.random() - 0.5) * 0.4;
    beltVertices.push(x, y, z);
  }

  beltGeometry.setAttribute('position', new THREE.Float32BufferAttribute(beltVertices, 3));
  asteroidBelt = new THREE.Points(beltGeometry, beltMaterial);
  asteroidBelt.visible = showAsteroidBelt;
  scene.add(asteroidBelt);

  // 点击检测环（不可见）| Invisible click-detection torus carrying the belt's info
  const colliderGeometry = new THREE.TorusGeometry(
    (ASTEROID_BELT_INNER_RADIUS + ASTEROID_BELT_OUTER_RADIUS) / 2,
    (ASTEROID_BELT_OUTER_RADIUS - ASTEROID_BELT_INNER_RADIUS) / 2,
    8,
    64
  );
  const colliderMaterial = new THREE.MeshBasicMaterial({ transparent: true, opacity: 0 });
  asteroidBeltCollider = new THREE.Mesh(colliderGeometry, colliderMaterial);
  asteroidBeltCollider.rotation.x = Math.PI / 2;
  asteroidBeltCollider.visible = showAsteroidBelt;
  asteroidBeltCollider.userData = {
    name: '小行星带 | Asteroid Belt',
    nameCN: '小行星带',
    nameEN: 'Asteroid Belt',
    description: '小行星带位于火星和木星之间，包含数百万颗岩石小行星，谷神星是其中最大的天体。',
    descriptionEN: 'The asteroid belt lies between Mars and Jupiter and contains millions of rocky asteroids; Ceres is the largest object within it.',
    type: 'Asteroid Belt (rocky bodies)',
    age: '4.6 billion years',
    mass: '~3 × 10²¹ kg (combined, ~4% of the Moon\'s mass)',
    lightToEarth: '10-18 minutes',
    discoveredBy: 'Ceres (largest member) found by Giuseppe Piazzi',
    discoveryDate: '1801',
    sizeVsEarth: 'N/A — diffuse belt, not a single body'
  };
  scene.add(asteroidBeltCollider);
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

  const intersects = raycaster.intersectObjects(celestialBodies, true);

  if (intersects.length > 0) {
    // Find the parent body (might hit a child like label, ring, or click sphere)
    let body = intersects[0].object;
    while (body.parent && !body.userData.nameCN) {
      body = body.parent;
    }

    if (body.userData.nameCN) {
      showPlanetInfo(body.userData);
    }
  } else {
    hidePlanetInfo();
  }
}

function showPlanetInfo(data) {
  const infoPanel = document.getElementById('planet-info');
  // Show the panel before writing new content so screen readers reliably
  // announce the update via aria-live (content changes while hidden are not
  // always announced).
  infoPanel.style.display = 'block';

  const nameEl = document.getElementById('planet-name');
  nameEl.dataset.nameCn = data.nameCN || '';
  if (currentLanguage === 'en') {
    nameEl.textContent = data.nameEN || data.name;
    document.getElementById('planet-description').textContent = data.descriptionEN || data.description;
  } else if (currentLanguage === 'zh') {
    nameEl.textContent = data.nameCN || data.name;
    document.getElementById('planet-description').textContent = data.description;
  } else {
    nameEl.textContent = data.name;
    document.getElementById('planet-description').textContent = data.description;
  }
  document.getElementById('planet-diameter').textContent = data.diameter || '-';
  document.getElementById('planet-age').textContent = data.age || '-';
  document.getElementById('planet-surface-temp').textContent = data.surfaceTemp || '-';
  document.getElementById('planet-core-temp').textContent = data.coreTemp || '-';
  document.getElementById('planet-type').textContent = data.type || '-';
  document.getElementById('planet-mass').textContent = data.mass || '-';
  document.getElementById('planet-light-to-earth').textContent = data.lightToEarth || '-';
  document.getElementById('planet-size-vs-earth').textContent = data.sizeVsEarth || '-';
  document.getElementById('planet-discovered-by').textContent = data.discoveredBy || '-';
  document.getElementById('planet-discovery-date').textContent = data.discoveryDate || '-';
}

function hidePlanetInfo() {
  const planetInfo = document.getElementById('planet-info');
  planetInfo.style.display = 'none';
}

function setupControls() {
  // 速度控制 | Speed Control
  document.getElementById('speed').addEventListener('input', (e) => {
    speed = parseFloat(e.target.value);
  });

  // 语言切换 | Language Toggle
  const languageLabels = { both: '🌐 双语 | Both', zh: '🌐 中文', en: '🌐 English' };
  const languageOrder = ['both', 'zh', 'en'];
  document.getElementById('language-toggle').addEventListener('click', function() {
    currentLanguage = languageOrder[(languageOrder.indexOf(currentLanguage) + 1) % languageOrder.length];
    document.body.dataset.lang = currentLanguage;
    this.textContent = languageLabels[currentLanguage];
    // Re-render the info panel in the new language if it's currently showing a body.
    if (document.getElementById('planet-info').style.display === 'block') {
      const activeName = document.getElementById('planet-name').dataset.nameCn;
      const activeBody = activeName && celestialBodies.find(b => b.userData.nameCN === activeName);
      if (activeBody) showPlanetInfo(activeBody.userData);
    }
  });

  // 太阳系之旅 | Grand Tour
  document.getElementById('grand-tour').addEventListener('click', function() {
    grandTourMode = !grandTourMode;
    this.classList.toggle('active', grandTourMode);
    this.setAttribute('aria-pressed', String(grandTourMode));
    if (grandTourMode) {
      grandTourIndex = 0;
      focusOnPlanet(grandTourIndex);
    } else {
      // Reset camera to default top-down view
      const startPosition = camera.position.clone();
      const endPosition = new THREE.Vector3(0, 80, 0);
      
      let progress = 0;
      function animateCameraReset() {
        progress += 0.05;
        if (progress >= 1) {
          camera.position.copy(endPosition);
          camera.lookAt(0, 0, 0);
          hidePlanetInfo();
          return;
        }
        
        camera.position.lerpVectors(startPosition, endPosition, progress);
        camera.lookAt(0, 0, 0);
        requestAnimationFrame(animateCameraReset);
      }
      
      animateCameraReset();
    }
  });
  
  // 轨道切换 | Toggle Orbits
  document.getElementById('toggle-orbits').addEventListener('click', function() {
    showOrbits = !showOrbits;
    this.classList.toggle('active', showOrbits);
    this.setAttribute('aria-pressed', String(showOrbits));
    orbits.forEach(orbit => {
      orbit.visible = showOrbits;
    });
  });

  // 小行星带切换 | Toggle Asteroid Belt
  document.getElementById('toggle-asteroids').addEventListener('click', function() {
    showAsteroidBelt = !showAsteroidBelt;
    this.classList.toggle('active', showAsteroidBelt);
    this.setAttribute('aria-pressed', String(showAsteroidBelt));
    if (asteroidBelt) asteroidBelt.visible = showAsteroidBelt;
    if (asteroidBeltCollider) asteroidBeltCollider.visible = showAsteroidBelt;
  });

  // 标签切换 | Toggle Labels
  document.getElementById('toggle-labels').addEventListener('click', function() {
    showLabels = !showLabels;
    this.classList.toggle('active', showLabels);
    this.setAttribute('aria-pressed', String(showLabels));
    labelSprites.forEach(sprite => sprite.visible = showLabels);
  });

  // Ensure labels are visible by default
  labelSprites.forEach(sprite => sprite.visible = showLabels);

  // 旅行者号切换 | Toggle Voyagers
  document.getElementById('toggle-voyagers').addEventListener('click', function() {
    showVoyagers = !showVoyagers;
    this.classList.toggle('active', showVoyagers);
    this.setAttribute('aria-pressed', String(showVoyagers));
    if (voyager1) voyager1.visible = showVoyagers;
    if (voyager2) voyager2.visible = showVoyagers;
  });

  // 日食切换 | Toggle Eclipse
  document.getElementById('toggle-eclipse').addEventListener('click', function() {
    showEclipse = !showEclipse;
    this.classList.toggle('active', showEclipse);
    this.setAttribute('aria-pressed', String(showEclipse));
    if (eclipseOverlay) eclipseOverlay.visible = showEclipse;
  });

  // 转移轨道 | Transfer Orbits
  document.getElementById('show-transfer').addEventListener('click', function() {
    showTransfer = !showTransfer;
    this.classList.toggle('active', showTransfer);
    this.setAttribute('aria-pressed', String(showTransfer));
    if (showTransfer) {
      createTransferOrbits();
    } else {
      removeTransferOrbits();
    }
  });

  // 发射 | Launch
  document.getElementById('show-launch').addEventListener('click', function() {
    showLaunch = !showLaunch;
    this.classList.toggle('active', showLaunch);
    this.setAttribute('aria-pressed', String(showLaunch));
    if (showLaunch) {
      showLaunchVisualization();
    }
  });

  // 声音切换 | Toggle Sound
  document.getElementById('toggle-sound').addEventListener('click', function() {
    toggleSound();
    this.classList.toggle('active', soundEnabled);
    this.setAttribute('aria-pressed', String(soundEnabled));
  });

  // 高对比度切换 | Toggle High Contrast
  document.getElementById('toggle-contrast').addEventListener('click', function() {
    const highContrast = document.body.classList.toggle('high-contrast');
    this.classList.toggle('active', highContrast);
    this.setAttribute('aria-pressed', String(highContrast));
  });

  // 行星列表点击 | Planet List Click
  function selectPlanetItem(item) {
    const planetName = item.getAttribute('data-planet');
    focusOnPlanetByName(planetName);

    // Update active state
    document.querySelectorAll('.planet-item').forEach(pi => pi.classList.remove('active'));
    item.classList.add('active');
  }

  document.querySelectorAll('.planet-item').forEach(item => {
    item.addEventListener('click', () => selectPlanetItem(item));
    item.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        selectPlanetItem(item);
      }
    });
  });

  // 搜索切换 | Toggle Search
  const searchInput = document.getElementById('planet-search');
  document.getElementById('toggle-search').addEventListener('click', function() {
    const showing = searchInput.hasAttribute('hidden');
    searchInput.toggleAttribute('hidden', !showing);
    this.classList.toggle('active', showing);
    this.setAttribute('aria-pressed', String(showing));
    if (showing) {
      searchInput.focus();
    } else {
      searchInput.value = '';
      document.querySelectorAll('.planet-item').forEach(pi => pi.removeAttribute('hidden'));
    }
  });

  searchInput.addEventListener('input', () => {
    const query = searchInput.value.trim().toLowerCase();
    document.querySelectorAll('.planet-item').forEach(item => {
      const nameCN = item.getAttribute('data-planet') || '';
      const nameEN = (item.getAttribute('data-name-en') || '').toLowerCase();
      const matches = !query || nameCN.includes(query) || nameEN.includes(query);
      item.toggleAttribute('hidden', !matches);
    });
  });

  searchInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      const firstMatch = document.querySelector('.planet-item:not([hidden])');
      if (firstMatch) selectPlanetItem(firstMatch);
    } else if (event.key === 'Escape') {
      searchInput.value = '';
      document.querySelectorAll('.planet-item').forEach(pi => pi.removeAttribute('hidden'));
    }
  });

  // 控制面板折叠 | Toolbar collapse/close/auto-expand
  setupPanelCollapse('controls', 'controls-reopen', 'toolbar-minimize', 'toolbar-close');

  // 行星列表折叠 | Sidebar collapse/close/auto-expand
  setupPanelCollapse('planet-list', 'sidebar-reopen', 'sidebar-minimize', 'sidebar-close');

  // 比较视图 | Comparison view
  setupComparisonView();

  // 收藏视图 | Bookmarked views
  setupBookmarks();
}

function setupComparisonView() {
  const panel = document.getElementById('comparison-panel');
  const selectA = document.getElementById('compare-select-a');
  const selectB = document.getElementById('compare-select-b');
  const table = document.getElementById('comparison-table');
  let populated = false;

  function populateSelectors() {
    celestialBodies.forEach(body => {
      const data = body.userData;
      [selectA, selectB].forEach(select => {
        const option = document.createElement('option');
        option.value = data.nameCN;
        option.textContent = data.name;
        select.appendChild(option);
      });
    });
    selectA.selectedIndex = 0;
    selectB.selectedIndex = Math.min(3, celestialBodies.length - 1);
    populated = true;
  }

  const rows = [
    ['diameter', '直径 | Diameter'],
    ['mass', '质量 | Mass'],
    ['type', '类型 | Type'],
    ['age', '年龄 | Age'],
    ['surfaceTemp', '表面温度 | Surface Temp'],
    ['sizeVsEarth', '相对地球大小 | Size vs Earth'],
    ['lightToEarth', '光到地球 | Light to Earth']
  ];

  function renderComparison() {
    const dataA = celestialBodies.find(b => b.userData.nameCN === selectA.value);
    const dataB = celestialBodies.find(b => b.userData.nameCN === selectB.value);
    if (!dataA || !dataB) return;

    const headerRow = `<tr><th></th><th>${dataA.userData.name}</th><th>${dataB.userData.name}</th></tr>`;
    const bodyRows = rows.map(([key, label]) => `
      <tr><th>${label}</th><td>${dataA.userData[key] || '-'}</td><td>${dataB.userData[key] || '-'}</td></tr>
    `).join('');
    table.innerHTML = headerRow + bodyRows;
  }

  selectA.addEventListener('change', renderComparison);
  selectB.addEventListener('change', renderComparison);

  document.getElementById('toggle-compare').addEventListener('click', function() {
    const showing = panel.hasAttribute('hidden');
    if (showing) {
      if (!populated) populateSelectors();
      renderComparison();
    }
    panel.toggleAttribute('hidden', !showing);
    this.classList.toggle('active', showing);
    this.setAttribute('aria-pressed', String(showing));
  });

  document.getElementById('comparison-close').addEventListener('click', () => {
    panel.setAttribute('hidden', '');
    document.getElementById('toggle-compare').classList.remove('active');
    document.getElementById('toggle-compare').setAttribute('aria-pressed', 'false');
  });
}

const BOOKMARKS_STORAGE_KEY = 'solarSystemBookmarks';

function loadBookmarks() {
  try {
    return JSON.parse(localStorage.getItem(BOOKMARKS_STORAGE_KEY)) || [];
  } catch (e) {
    return [];
  }
}

function saveBookmarks(bookmarks) {
  localStorage.setItem(BOOKMARKS_STORAGE_KEY, JSON.stringify(bookmarks));
}

function animateCameraTo(targetPosition, targetLookAt) {
  const startPosition = camera.position.clone();
  const startTarget = controls.target.clone();
  let progress = 0;

  function step() {
    progress += 0.05;
    if (progress >= 1) {
      camera.position.copy(targetPosition);
      controls.target.copy(targetLookAt);
      controls.update();
      return;
    }

    camera.position.lerpVectors(startPosition, targetPosition, progress);
    controls.target.lerpVectors(startTarget, targetLookAt, progress);
    controls.update();
    requestAnimationFrame(step);
  }

  step();
}

function setupBookmarks() {
  const panel = document.getElementById('bookmarks-panel');
  const list = document.getElementById('bookmark-list');

  function renderList() {
    const bookmarks = loadBookmarks();
    list.innerHTML = '';
    bookmarks.forEach((bookmark, index) => {
      const li = document.createElement('li');

      const nameSpan = document.createElement('span');
      nameSpan.textContent = bookmark.name;
      li.appendChild(nameSpan);

      const actions = document.createElement('span');

      const goBtn = document.createElement('button');
      goBtn.textContent = '▶ Go';
      goBtn.addEventListener('click', () => {
        animateCameraTo(
          new THREE.Vector3(bookmark.cameraPosition.x, bookmark.cameraPosition.y, bookmark.cameraPosition.z),
          new THREE.Vector3(bookmark.cameraTarget.x, bookmark.cameraTarget.y, bookmark.cameraTarget.z)
        );
      });
      actions.appendChild(goBtn);

      const deleteBtn = document.createElement('button');
      deleteBtn.textContent = '🗑';
      deleteBtn.addEventListener('click', () => {
        const updated = loadBookmarks();
        updated.splice(index, 1);
        saveBookmarks(updated);
        renderList();
      });
      actions.appendChild(deleteBtn);

      li.appendChild(actions);
      list.appendChild(li);
    });
  }

  document.getElementById('bookmark-save').addEventListener('click', () => {
    const name = prompt('Bookmark name | 收藏名称:');
    if (!name) return;
    const bookmarks = loadBookmarks();
    bookmarks.push({
      name,
      cameraPosition: { x: camera.position.x, y: camera.position.y, z: camera.position.z },
      cameraTarget: { x: controls.target.x, y: controls.target.y, z: controls.target.z }
    });
    saveBookmarks(bookmarks);
    renderList();
  });

  document.getElementById('toggle-bookmarks').addEventListener('click', function() {
    const showing = panel.hasAttribute('hidden');
    if (showing) renderList();
    panel.toggleAttribute('hidden', !showing);
    this.classList.toggle('active', showing);
    this.setAttribute('aria-pressed', String(showing));
  });

  document.getElementById('bookmarks-close').addEventListener('click', () => {
    panel.setAttribute('hidden', '');
    document.getElementById('toggle-bookmarks').classList.remove('active');
    document.getElementById('toggle-bookmarks').setAttribute('aria-pressed', 'false');
  });
}

function setupPanelCollapse(panelId, reopenBtnId, minimizeBtnId, closeBtnId) {
  const panel = document.getElementById(panelId);
  const reopenBtn = document.getElementById(reopenBtnId);
  const minimizeBtn = document.getElementById(minimizeBtnId);
  const closeBtn = document.getElementById(closeBtnId);
  const supportsHover = window.matchMedia('(hover: hover)').matches;
  let hoverCollapseTimer = null;
  let hoverExpanded = false;

  function expand() {
    clearTimeout(hoverCollapseTimer);
    panel.classList.remove('minimized', 'closed');
    reopenBtn.hidden = true;
  }

  function minimize() {
    clearTimeout(hoverCollapseTimer);
    hoverExpanded = false;
    panel.classList.add('minimized');
    panel.classList.remove('closed');
    reopenBtn.hidden = true;
  }

  function close() {
    clearTimeout(hoverCollapseTimer);
    hoverExpanded = false;
    panel.classList.add('closed');
    panel.classList.remove('minimized');
    reopenBtn.hidden = false;
  }

  minimizeBtn.addEventListener('click', (event) => {
    event.stopPropagation();
    minimize();
  });

  closeBtn.addEventListener('click', (event) => {
    event.stopPropagation();
    close();
  });

  reopenBtn.addEventListener('click', expand);

  // Tap/click anywhere on a minimized panel (outside the icon buttons) re-expands it,
  // which is the only way to reopen on touch devices that have no hover.
  panel.addEventListener('click', () => {
    if (panel.classList.contains('minimized')) {
      expand();
    }
  });

  if (supportsHover) {
    // Auto-pop: moving the cursor over a minimized panel expands it automatically;
    // moving away re-minimizes it after a short delay. Only panels that were
    // expanded this way auto re-collapse — a panel left in its default/manually
    // expanded state stays open when the mouse moves away.
    panel.addEventListener('mouseenter', () => {
      if (panel.classList.contains('minimized')) {
        hoverExpanded = true;
        expand();
      }
    });
    panel.addEventListener('mouseleave', () => {
      if (hoverExpanded) {
        hoverCollapseTimer = setTimeout(() => {
          minimize();
          hoverExpanded = false;
        }, 800);
      }
    });
  }
}

function initAudio() {
  try {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
  } catch (e) {
    // Web Audio API not supported in this browser
  }
}

function createAmbientSound() {
  if (!audioContext) return;

  // Create multiple oscillators for space ambient sound with smoother frequencies
  const frequencies = [30, 45, 70, 110, 180];
  
  frequencies.forEach((freq, index) => {
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    // Use triangle waves for smoother sound
    oscillator.type = 'triangle';
    oscillator.frequency.setValueAtTime(freq, audioContext.currentTime);
    
    // Add slight frequency drift for more organic sound
    oscillator.frequency.linearRampToValueAtTime(freq + (Math.random() - 0.5) * 2, audioContext.currentTime + 5);
    
    // Lower volume for smoother ambient effect
    gainNode.gain.setValueAtTime(0.03, audioContext.currentTime);
    
    // Add subtle gain modulation
    gainNode.gain.linearRampToValueAtTime(0.04, audioContext.currentTime + 3);
    gainNode.gain.linearRampToValueAtTime(0.03, audioContext.currentTime + 6);
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.start();
    
    oscillators.push({ oscillator, gainNode });
  });
}

function stopAmbientSound() {
  oscillators.forEach(({ oscillator, gainNode }) => {
    try {
      // Fade out immediately
      gainNode.gain.setValueAtTime(gainNode.gain.value, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.1);
      setTimeout(() => {
        try {
          oscillator.stop();
        } catch (e) {
          // Oscillator already stopped
        }
      }, 100);
    } catch (e) {
      // Oscillator already disconnected
    }
  });
  oscillators = [];
}

function toggleSound() {
  if (!audioContext) {
    initAudio();
  }
  if (!audioContext) return;

  if (soundEnabled) {
    soundEnabled = false;
    stopAmbientSound();
    return;
  }

  soundEnabled = true;
  // iOS Safari creates AudioContext in a suspended state even from within a
  // user gesture, and can re-suspend it after the tab loses focus — resume()
  // must be called every time, not just once at construction.
  if (audioContext.state === 'suspended') {
    audioContext.resume().then(createAmbientSound);
  } else {
    createAmbientSound();
  }
}

function focusOnPlanetByName(planetName) {
  const planet = celestialBodies.find(p => p.userData.nameCN === planetName);
  if (planet) {
    const targetPosition = planet.position.clone();
    
    // Calculate a better camera position based on planet position
    // Position camera at a distance from the planet with a good viewing angle
    const distance = 10;
    const cameraOffset = new THREE.Vector3(distance, distance * 0.5, distance);
    const endPosition = targetPosition.clone().add(cameraOffset);
    
    // Animate camera to planet
    const startPosition = camera.position.clone();
    
    let progress = 0;
    function animateCamera() {
      progress += 0.05;
      if (progress >= 1) {
        camera.position.copy(endPosition);
        camera.lookAt(targetPosition);
        controls.target.copy(targetPosition);
        controls.update();
        showPlanetInfo(planet.userData);
        return;
      }
      
      camera.position.lerpVectors(startPosition, endPosition, progress);
      camera.lookAt(targetPosition);
      controls.target.lerp(targetPosition, progress);
      controls.update();
      requestAnimationFrame(animateCamera);
    }
    
    animateCamera();
  }
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

const VOYAGER_MAX_DISTANCE = 120;

function animate() {
  requestAnimationFrame(animate);

  // 归一化帧时间（60fps 为基准 1.0），并限制突增（首帧/标签页恢复）| Normalize frame time (60fps baseline = 1.0), clamped against spikes (first frame / tab resume)
  const dt = Math.min(clock.getDelta() * 60, 3);

  // 太阳自转 | Sun Rotation
  sun.rotation.y += 0.001 * dt;

  // Animate sun shader
  if (sun.material.uniforms && sun.material.uniforms.time) {
    sun.material.uniforms.time.value += 0.01 * dt;
  }

  // 行星运动 | Planet Movement
  planets.forEach(planet => {
    const data = planet.userData;

    // 公转 | Revolution
    const orbitalSpeed = (2 * Math.PI) / (data.orbitalPeriod * 0.01) * (speed * 0.1);
    data.angle += orbitalSpeed * 0.01 * dt;

    planet.position.x = Math.cos(data.angle) * data.scaledDistance;
    planet.position.z = Math.sin(data.angle) * data.scaledDistance;

    // 自转 | Rotation
    const rotationSpeed = (2 * Math.PI) / (data.rotationPeriod * 0.1) * speed;
    planet.rotation.y += rotationSpeed * 0.01 * dt;
  });

  // 旅行者号运动 | Voyager Movement
  if (showVoyagers && voyager1 && voyager2) {
    voyager1.userData.angle += voyager1.userData.speed * speed * dt;
    voyager1.userData.distance += 0.01 * speed * dt;
    if (voyager1.userData.distance > VOYAGER_MAX_DISTANCE) {
      voyager1.userData.distance = 5;
    }
    voyager1.position.x = Math.cos(voyager1.userData.angle) * voyager1.userData.distance;
    voyager1.position.z = Math.sin(voyager1.userData.angle) * voyager1.userData.distance;

    voyager2.userData.angle += voyager2.userData.speed * speed * dt;
    voyager2.userData.distance += 0.01 * speed * dt;
    if (voyager2.userData.distance > VOYAGER_MAX_DISTANCE) {
      voyager2.userData.distance = 7;
    }
    voyager2.position.x = Math.cos(voyager2.userData.angle) * voyager2.userData.distance;
    voyager2.position.z = Math.sin(voyager2.userData.angle) * voyager2.userData.distance;
  }

  // 月球运动 | Moon Movement
  if (moon) {
    const earth = planets.find(p => p.userData.nameCN === '地球');
    if (earth) {
      moon.userData.angle += (2 * Math.PI) / (moon.userData.orbitalPeriod * 0.1) * (speed * 0.1) * dt;
      const moonX = earth.position.x + Math.cos(moon.userData.angle) * moon.userData.distance;
      const moonZ = earth.position.z + Math.sin(moon.userData.angle) * moon.userData.distance;
      moon.position.set(moonX, earth.position.y, moonZ);
    }
  }

  controls.update();
  renderer.render(scene, camera);
}

// 初始化 | Initialize
init();
