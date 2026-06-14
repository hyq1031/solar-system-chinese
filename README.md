# 太阳系 3D 可视化 | Solar System 3D Visualization

一个使用 Three.js 构建的交互式 3D 太阳系可视化，带有中文界面和实时轨道力学。

An interactive 3D solar system visualization built with Three.js, featuring Chinese interface and real-time orbital mechanics.

## 🌟 Features | 功能

### 3D Visualization | 3D 可视化
- **Realistic Planet Models** - Procedurally generated textures for each planet
  **逼真的行星模型** - 为每个行星生成程序化纹理
- **Keplerian Orbits** - Accurate orbital mechanics based on real planetary data
  **开普勒轨道** - 基于真实行星数据的准确轨道力学
- **Saturn's Rings** - Detailed ring system for Saturn
  **土星环** - 土星的详细环系统
- **Background Stars** - 10,000 procedurally placed stars
  **背景星星** - 10,000 颗程序化放置的星星

### Interactive Controls | 交互控制
- **Orbit Controls** - Drag to rotate, scroll to zoom
  **轨道控制** - 拖动旋转，滚轮缩放
- **Click to Explore** - Click any planet to view detailed information
  **点击探索** - 点击任何行星查看详细信息
- **Planet List Sidebar** - Click planet names to focus camera on specific planets
  **行星列表侧边栏** - 点击行星名称将相机聚焦到特定行星
- **Sun Clickable** - Click the sun to view its detailed information
  **太阳可点击** - 点击太阳查看其详细信息
- **Speed Control** - Adjust simulation speed with slider (0.1 to 10)
  **速度控制** - 使用滑块调整模拟速度（0.1 到 10）
- **Grand Tour Mode** - Automated tour through the solar system (resets camera to top-down view when toggled off)
  **太阳系之旅模式** - 自动游览太阳系（关闭时重置相机为俯视图）
- **Toggle Orbits** - Show/hide orbital paths
  **切换轨道** - 显示/隐藏轨道路径
- **Toggle Labels** - Show/hide planet labels
  **切换标签** - 显示/隐藏行星标签
- **Toggle Voyagers** - Show/hide Voyager spacecraft models
  **切换旅行者号** - 显示/隐藏旅行者号航天器模型
- **Toggle Eclipse** - Show/hide eclipse visualization
  **切换日食** - 显示/隐藏日食可视化
- **Toggle Transfer** - Show/hide Hohmann transfer orbit between Earth and Mars
  **切换转移轨道** - 显示/隐藏地球和火星之间的霍曼转移轨道
- **Toggle Launch** - Show/hide launch trajectory visualization
  **切换发射** - 显示/隐藏发射轨迹可视化
- **Toggle Sound** - Turn ambient space sound on/off
  **切换声音** - 开启/关闭环境太空音效

### Chinese Localization | 中文本地化
- **Bilingual Interface** - All UI elements in Chinese and English
  **双语界面** - 所有 UI 元素均为中英文
- **Chinese Planet Names** - Traditional Chinese names for all planets
  **中文行星名称** - 所有行星的传统中文名称
- **Detailed Descriptions** - Chinese descriptions for each celestial body
  **详细描述** - 每个天体的中文描述

### Audio | 音频
- **Ambient Sound** - Smooth triangle-wave based ambient space sound with frequency drift (click UI to enable)
  **环境音** - 基于三角波的平滑环境太空音效，带有频率漂移（点击 UI 启用）
- **Toggle Control** - Turn sound on/off with button
  **切换控制** - 使用按钮开启/关闭声音

### Planet Information | 行星信息
- **Detailed Planet Data** - Click any planet to view comprehensive information including:
  **详细行星数据** - 点击任何行星查看全面信息，包括：
  - Diameter (直径)
  - Age (年龄)
  - Surface Temperature (表面温度)
  - Core Temperature (核心温度)
  - Type (类型)
  - Mass (质量)
  - Light Travel Time to Earth (光到地球的时间)
- **Sun Information** - Click the sun to view its detailed specifications
  **太阳信息** - 点击太阳查看其详细规格

### Visual Enhancements | 视觉增强
- **Custom Sun Shader** - 3D sun with animated noise patterns and rim lighting
  **自定义太阳着色器** - 带有动画噪点模式和边缘照明的 3D 太阳
- **Elegant UI Panels** - Bordered panels with gold accents for planet information
  **优雅的 UI 面板** - 带有金色边框和装饰的行星信息面板
- **Transparent Labels** - Semi-transparent planet labels without background rectangles
  **透明标签** - 无背景矩形的半透明行星标签
- **Moon System** - Moon orbiting Earth
  **月球系统** - 绕地球运行的月球
- **Improved Planet Click Detection** - Larger invisible click spheres for easier planet selection
  **改进的行星点击检测** - 更大的不可见点击球体，便于选择行星
- **Top-Down Default View** - Camera starts at top-down view for complete solar system visibility
  **俯视默认视图** - 相机从俯视图开始，完整可见太阳系

## 🚀 Getting Started | 开始使用

### Local Development | 本地开发

1. **Clone or download the project**
   **克隆或下载项目**

2. **Start a local server**
   **启动本地服务器**
   ```bash
   python3 -m http.server 8000
   # or
   npx serve
   ```

3. **Open in browser**
   **在浏览器中打开**
   ```
   http://localhost:8000
   ```

### Controls | 控制

- **Mouse Drag** - Rotate camera
  **鼠标拖动** - 旋转相机
- **Mouse Scroll** - Zoom in/out
  **鼠标滚轮** - 放大/缩小
- **Click Planet/Sun** - View detailed information
  **点击行星/太阳** - 查看详细信息
- **Planet List Sidebar** - Click planet names to focus camera
  **行星列表侧边栏** - 点击行星名称聚焦相机
- **Grand Tour Button** - Start automated tour (click again to reset to top-down view)
  **太阳系之旅按钮** - 开始自动游览（再次点击重置为俯视图）
- **Speed Slider** - Adjust simulation speed (0.1 to 10)
  **速度滑块** - 调整模拟速度（0.1 到 10）
- **Toggle Orbits** - Show/hide orbital paths
  **切换轨道** - 显示/隐藏轨道路径
- **Toggle Labels** - Show/hide labels
  **切换标签** - 显示/隐藏标签
- **Toggle Voyagers** - Show/hide Voyager spacecraft
  **切换旅行者号** - 显示/隐藏旅行者号航天器
- **Toggle Eclipse** - Show/hide eclipse visualization
  **切换日食** - 显示/隐藏日食可视化
- **Toggle Transfer** - Show/hide transfer orbit
  **切换转移轨道** - 显示/隐藏转移轨道
- **Toggle Launch** - Show/hide launch trajectory
  **切换发射** - 显示/隐藏发射轨迹
- **Toggle Sound** - Turn ambient sound on/off
  **切换声音** - 开启/关闭环境音效

## 🌍 Planets Included | 包含的行星

| 行星 Planet | 中文名称 Chinese Name | 描述 Description |
|------------|----------------------|------------------|
| 太阳 Sun | 太阳 | 太阳系的中心，一颗G型主序星 |
| 水星 Mercury | 水星 | 太阳系中最小的行星，离太阳最近 |
| 金星 Venus | 金星 | 太阳系中最热的行星 |
| 地球 Earth | 地球 | 太阳系中唯一已知存在生命的行星 |
| 火星 Mars | 火星 | 被称为红色星球 |
| 木星 Jupiter | 木星 | 太阳系中最大的行星 |
| 土星 Saturn | 土星 | 以其壮观的环系统而闻名 |
| 天王星 Uranus | 天王星 | 自转轴几乎与轨道平面平行 |
| 海王星 Neptune | 海王星 | 太阳系中最遥远的行星 |
| 月球 Moon | 月球 | 地球的天然卫星 |

## 🛠️ Tech Stack | 技术栈

- **Three.js** - 3D graphics library
- **HTML5 Canvas** - Procedural texture generation
- **Web Audio API** - Ambient sound generation with oscillators
- **Custom GLSL Shaders** - 3D sun rendering with noise patterns
- **Vanilla JavaScript** - No build tools required

## 📝 Customization | 自定义

### Modify Planet Data | 修改行星数据

Edit the `planetData` array in `script.js`:

```javascript
const planetData = [
  {
    name: '水星 | Mercury',
    nameCN: '水星',
    nameEN: 'Mercury',
    description: '你的描述',
    descriptionEN: 'Your description',
    radius: 0.38,
    distance: 0.39, // AU
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
  // ... more planets
];
```

### Adjust Colors | 调整颜色

Modify planet colors in the `planetData` array:

```javascript
color: 0xff0000  // Red
color: 0x00ff00  // Green
color: 0x0000ff  // Blue
```

### Change Orbital Speed | 改变轨道速度

Modify the speed multiplier in the animation loop:

```javascript
const orbitalSpeed = (2 * Math.PI) / (data.orbitalPeriod * 0.01) * (speed * 0.1);
```

## 🔄 Recent Updates | 最近更新

### Latest Features | 最新功能
- **Planet List Sidebar** - Interactive sidebar for quick planet navigation
  **行星列表侧边栏** - 用于快速导航的交互式侧边栏
- **Enhanced Sun** - Custom shader-based 3D sun with animated surface
  **增强的太阳** - 基于自定义着色器的 3D 太阳，带有动画表面
- **Moon System** - Added moon orbiting Earth
  **月球系统** - 添加了绕地球运行的月球
- **Detailed Planet Information** - Comprehensive data display for all celestial bodies
  **详细行星信息** - 所有天体的全面数据显示
- **Improved Audio** - Smoother ambient sound with triangle waves
  **改进的音频** - 使用三角波的更平滑的环境音
- **Visual Enhancements** - Elegant bordered panels, transparent labels
  **视觉增强** - 优雅的边框面板、透明标签

### Technical Improvements | 技术改进
- **Better Camera Controls** - Improved focus functionality with OrbitControls sync
  **更好的相机控制** - 改进的聚焦功能，与 OrbitControls 同步
- **Enhanced Click Detection** - Larger invisible click spheres for easier selection
  **增强的点击检测** - 更大的不可见点击球体，便于选择
- **Optimized Performance** - Improved rendering and animation efficiency
  **优化性能** - 改进的渲染和动画效率
- **Custom Shaders** - GLSL shaders for realistic sun rendering
  **自定义着色器** - 用于逼真太阳渲染的 GLSL 着色器

## 🌐 Deployment | 部署

### Deploy to Vercel

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin YOUR_REPO_URL
   git push -u origin main
   ```

2. **Deploy to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Deploy

### Deploy to Static Hosting

Deploy to any static hosting service:
- GitHub Pages
- Netlify
- Cloudflare Pages

## 📱 Browser Support | 浏览器支持

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers

## 🐛 Troubleshooting | 故障排除

**Planets not rendering?**
- Check browser console for errors (F12)
- Ensure Three.js is loaded correctly
- Verify local server is running

**Audio not working?**
- Click anywhere on the UI to initialize audio
- Check browser audio permissions
- Some browsers require user interaction to play audio
- Use the 🔊 声音 | Sound button to toggle sound on/off

**Planets not clickable?**
- Check browser console for errors (F12)
- Ensure click detection spheres are properly initialized
- Try clicking directly on the planet, not the label

**Planet focus not working?**
- Ensure OrbitControls are properly synced
- Check camera position and target settings
- Try refreshing the page

**Sun not appearing 3D?**
- Ensure custom shader is properly loaded
- Check browser WebGL support
- Verify shader uniforms are being animated

**Performance issues?**
- Reduce number of background stars in `createStars()`
- Lower texture resolution in `createProceduralTexture()`
- Disable ambient sound

## 📄 License | 许可证

Personal use only. Modify as needed.

## 🤝 Acknowledgments | 致谢

Inspired by [ORRERY](https://orrery-opal.vercel.app/) - A Celestial Atlas

灵感来源于 [ORRERY](https://orrery-opal.vercel.app/) - 天体图集
