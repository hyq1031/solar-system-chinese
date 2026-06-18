# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A single-page, no-build-tools 3D solar system visualization with a bilingual (Chinese/English) UI, built on Three.js (r128, loaded via CDN script tags in [index.html](index.html)). There is no package.json, bundler, or test suite — this is plain HTML/CSS/JS served as static files.

## Common Commands

There are no npm scripts. Serve the directory with any static file server and open it in a browser:

```bash
python3 -m http.server 8000
# or
npx serve
```

Then visit `http://localhost:8000`. There is no build, lint, or test step — verify changes by reloading the page and checking the browser console (F12) for errors.

### Deployment

[pushGit.ps1](pushGit.ps1) pushes to the `origin` remote (`https://github.com/hyq1031/solar.git`) on `main`. The site is otherwise deployed as static files (e.g. Vercel/Netlify/GitHub Pages) with no build step.

## Architecture

Everything lives in two files:

- [index.html](index.html) — DOM shell and all CSS. Contains the fixed-position UI overlays (`#planet-list` sidebar, `#controls` button grid, `#planet-info` detail panel, `#speed-control` slider) that `script.js` wires up and mutates directly via `getElementById`/`querySelector`. Three.js and `OrbitControls` are loaded from CDN here before `script.js`.
- [script.js](script.js) — all application logic, structured as top-level globals + functions (no modules, no classes, no build step):
  - **`planetData`** (script.js:31) is the single source of truth for every celestial body (Chinese/English name, description, radius, AU distance, color, orbital/rotation period, and display facts like diameter/mass/temperature). Adding or tweaking a planet means editing this array — everything else (mesh, orbit ring, label, sidebar entry, info panel) derives from it.
  - **`init()`** (script.js:186) bootstraps the scene/camera/renderer/`OrbitControls`, then calls the `create*` functions and `setupControls()`, and kicks off `animate()`.
  - **Procedural generation, no asset files**: `createProceduralTexture()` (script.js:252) draws planet surface textures onto a `<canvas>` at runtime; `createSun()` (script.js:322) builds the sun from a custom GLSL `ShaderMaterial` (noise + rim lighting) instead of a texture; `createStars()` (script.js:685) procedurally places 10,000 background stars. There are no external image/texture assets in the repo.
  - **Scene construction** happens once at startup via `createPlanets()`, `createSaturnRings()`, `createOrbits()`, `createVoyagers()`, `createEclipseOverlay()`, `createMoon()` — each pushes meshes into the module-level arrays (`planets`, `orbits`, `labelSprites`, etc.) that `animate()` and the toggle handlers iterate over later.
  - **`animate()`** (script.js:1054) is the single `requestAnimationFrame` loop: it advances each planet's orbital angle and rotation from its `planetData`-derived `userData`, animates the sun shader's `time` uniform, and moves the two Voyager probes. The global `speed` (driven by the speed slider) scales all motion.
  - **UI wiring** is centralized in `setupControls()` (script.js:784), which attaches click handlers for the sidebar planet list, the toggle buttons (orbits/labels/voyagers/eclipse/transfer/launch/sound), and the speed slider. Toggles flip a `show*`/`*Enabled` boolean and set/clear `.active` classes; visibility is enforced by setting `.visible` on the corresponding Three.js objects, not by removing them from the scene.
  - **Camera focus**: `focusOnPlanet(index)` / `focusOnPlanetByName(name)` (script.js:984, script.js:1021) animate the camera and sync `OrbitControls.target` to whichever body was clicked (sidebar item, in-scene click via raycasting in `onMouseClick`, or the sun).
  - **Audio** is generated, not loaded: `initAudio()`/`createAmbientSound()` (script.js:897, script.js:906) build a Web Audio oscillator graph for ambient drone sound, gated behind a user gesture per browser autoplay policy.
  - **Transfer/launch visualizations** (`createTransferOrbits()`, `showLaunchVisualization()`, `animateLaunch()`) are independent, toggleable overlays — Hohmann transfer ellipses and a launch trajectory — not coupled to the main planet animation loop.

## Conventions

- Bilingual content is pervasive: Chinese strings are primary, English is appended inline (e.g. `'水星 | Mercury'`) or stored in parallel `nameCN`/`nameEN`/`description`/`descriptionEN` fields in `planetData`. Keep new UI text and planet data bilingual in this same pattern.
- All units in `planetData` are stylized for visualization (e.g. `distance` in AU, scaled in-scene), not physically accurate scale — don't "fix" these to real proportions without checking intent.
