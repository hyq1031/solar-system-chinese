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
- **Speed Control** - Adjust simulation speed with slider
  **速度控制** - 使用滑块调整模拟速度
- **Grand Tour Mode** - Automated tour through the solar system
  **太阳系之旅模式** - 自动游览太阳系
- **Toggle Orbits** - Show/hide orbital paths
  **切换轨道** - 显示/隐藏轨道路径
- **Toggle Labels** - Show/hide planet labels
  **切换标签** - 显示/隐藏行星标签

### Chinese Localization | 中文本地化
- **Bilingual Interface** - All UI elements in Chinese and English
  **双语界面** - 所有 UI 元素均为中英文
- **Chinese Planet Names** - Traditional Chinese names for all planets
  **中文行星名称** - 所有行星的传统中文名称
- **Detailed Descriptions** - Chinese descriptions for each celestial body
  **详细描述** - 每个天体的中文描述

### Audio | 音频
- **Ambient Sound** - Subtle ambient space sound (click UI to enable)
  **环境音** - 微妙的环境太空音效（点击 UI 启用）

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
- **Click Planet** - View planet information
  **点击行星** - 查看行星信息
- **Grand Tour Button** - Start automated tour
  **太阳系之旅按钮** - 开始自动游览
- **Speed Slider** - Adjust simulation speed
  **速度滑块** - 调整模拟速度
- **Toggle Orbits** - Show/hide orbital paths
  **切换轨道** - 显示/隐藏轨道路径
- **Toggle Labels** - Show/hide labels
  **切换标签** - 显示/隐藏标签

## 🌍 Planets Included | 包含的行星

| 行星 Planet | 中文名称 Chinese Name | 描述 Description |
|------------|----------------------|------------------|
| 水星 Mercury | 水星 | 太阳系中最小的行星，离太阳最近 |
| 金星 Venus | 金星 | 太阳系中最热的行星 |
| 地球 Earth | 地球 | 太阳系中唯一已知存在生命的行星 |
| 火星 Mars | 火星 | 被称为红色星球 |
| 木星 Jupiter | 木星 | 太阳系中最大的行星 |
| 土星 Saturn | 土星 | 以其壮观的环系统而闻名 |
| 天王星 Uranus | 天王星 | 自转轴几乎与轨道平面平行 |
| 海王星 Neptune | 海王星 | 太阳系中最遥远的行星 |

## 🛠️ Tech Stack | 技术栈

- **Three.js** - 3D graphics library
- **HTML5 Canvas** - Procedural texture generation
- **Web Audio API** - Ambient sound generation
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
    distance: 4,
    color: 0x8c8c8c,
    orbitalPeriod: 88,
    rotationPeriod: 59
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
const orbitalSpeed = (2 * Math.PI) / (data.orbitalPeriod * 0.01) * speed;
```

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

**Performance issues?**
- Reduce number of background stars in `createStars()`
- Lower texture resolution in `createProceduralTexture()`
- Disable ambient sound

## 📄 License | 许可证

Personal use only. Modify as needed.

## 🤝 Acknowledgments | 致谢

Inspired by [ORRERY](https://orrery-opal.vercel.app/) - A Celestial Atlas

灵感来源于 [ORRERY](https://orrery-opal.vercel.app/) - 天体图集
