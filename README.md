# Aura

Aura is a concept landing page for an on-device, hand-tracked jewelry atelier. It explores a simple idea: try on rings, watches and nail shades in real time using only a browser camera, with no app and no upload.

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=111)
![Vite](https://img.shields.io/badge/Vite-7-646CFF?logo=vite&logoColor=fff)
![Three.js](https://img.shields.io/badge/Three.js-3D-000?logo=three.js&logoColor=fff)
![License](https://img.shields.io/badge/License-Private-8B5CF6)

## Highlights

- Cinematic light-lavender visual direction
- Floating responsive navigation and large editorial typography
- Real Three.js wireframe ornaments in the hero
- Interactive chrome ring scene with lighting, parallax and fallbacks
- Animated hand-landmark illustration
- Product preview mockup with selectable ring variants
- Scroll reveals, responsive layouts and reduced-motion support

## Stack

- React 19
- Vite 7
- Three.js
- Lucide React
- Plain CSS design system

## Run locally

```bash
npm install
npm run dev
```

The development server runs on `http://localhost:5300`.

## Build

```bash
npm run build
npm run preview
```

## Project structure

```text
src/
  components/
    HandScan.jsx    Hand-landmark SVG illustration
    HeroObjects.jsx Three.js wireframe ornaments
    RingArt.jsx     Procedural ring artwork
    RingScene.jsx   Three.js chrome ring scene
    Reveal.jsx      IntersectionObserver reveal wrapper
  App.jsx           Page sections and interactions
  styles.css        Design tokens, layout and responsive styles
  main.jsx          React entry point
```

## Notes

This repository is a front-end concept. The camera and hand-tracking flow is presented as product UI; it is not connected to a live MediaPipe pipeline in this version. The Three.js scenes are fully rendered and interactive.

## Status

Private concept project for Luveia.
