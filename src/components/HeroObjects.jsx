import { useEffect, useRef } from 'react'
import * as THREE from 'three'

const wireMaterial = (color, opacity) =>
  new THREE.MeshBasicMaterial({
    color,
    wireframe: true,
    transparent: true,
    opacity,
    depthWrite: false,
  })

export default function HeroObjects() {
  const containerRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    let renderer
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
      })
    } catch {
      return
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x000000, 0)
    renderer.outputColorSpace = THREE.SRGBColorSpace
    container.appendChild(renderer.domElement)

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100)
    camera.position.set(0, 0, 14)

    const layer = new THREE.Group()
    scene.add(layer)

    const left = new THREE.Mesh(new THREE.IcosahedronGeometry(1.9, 1), wireMaterial(0x7c6cf0, 0.26))
    left.position.set(-6.6, 1.4, -1)
    left.rotation.set(0.4, 0.2, -0.16)
    layer.add(left)

    const right = new THREE.Mesh(new THREE.TorusGeometry(2.1, 0.62, 10, 30), wireMaterial(0x6d5dfc, 0.2))
    right.position.set(6.8, -0.9, -2)
    right.rotation.set(1.05, 0.2, -0.4)
    layer.add(right)

    const topRight = new THREE.Mesh(new THREE.OctahedronGeometry(1.05, 0), wireMaterial(0x8b5cf6, 0.3))
    topRight.position.set(5.7, 3.2, -1.4)
    topRight.rotation.set(0.2, 0.5, 0.1)
    layer.add(topRight)

    const bottomLeft = new THREE.Mesh(new THREE.TorusGeometry(1.15, 0.3, 8, 22), wireMaterial(0x7c6cf0, 0.18))
    bottomLeft.position.set(-5.4, -3.4, -0.5)
    bottomLeft.rotation.set(0.8, -0.3, 0.4)
    layer.add(bottomLeft)

    const particleCount = 170
    const positions = new Float32Array(particleCount * 3)
    for (let i = 0; i < particleCount; i += 1) {
      positions[i * 3] = (Math.random() - 0.5) * 22
      positions[i * 3 + 1] = (Math.random() - 0.5) * 12
      positions[i * 3 + 2] = (Math.random() - 0.5) * 6
    }
    const particleGeometry = new THREE.BufferGeometry()
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    const particles = new THREE.Points(
      particleGeometry,
      new THREE.PointsMaterial({
        color: 0x8b7cf6,
        size: 0.035,
        transparent: true,
        opacity: 0.55,
        depthWrite: false,
      }),
    )
    scene.add(particles)

    const pointer = { x: 0, y: 0, targetX: 0, targetY: 0 }
    const onPointerMove = (event) => {
      pointer.targetX = (event.clientX / window.innerWidth - 0.5) * 2
      pointer.targetY = (event.clientY / window.innerHeight - 0.5) * 2
    }
    window.addEventListener('pointermove', onPointerMove, { passive: true })

    const resize = () => {
      const width = Math.max(container.clientWidth, 1)
      const height = Math.max(container.clientHeight, 1)
      renderer.setSize(width, height, false)
      camera.aspect = width / height
      camera.updateProjectionMatrix()

      const compact = width < 760
      left.position.x = compact ? -3.4 : -6.6
      right.position.x = compact ? 3.6 : 6.8
      topRight.position.x = compact ? 3.1 : 5.7
      bottomLeft.position.x = compact ? -3.1 : -5.4
      left.scale.setScalar(compact ? 0.66 : 1)
      right.scale.setScalar(compact ? 0.7 : 1)
      topRight.scale.setScalar(compact ? 0.7 : 1)
      bottomLeft.scale.setScalar(compact ? 0.7 : 1)
      layer.position.y = compact ? 1.4 : 0
    }
    const resizeObserver = new ResizeObserver(resize)
    resizeObserver.observe(container)
    resize()

    let visible = true
    const visibilityObserver = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting
      },
      { threshold: 0.02 },
    )
    visibilityObserver.observe(container)

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const clock = new THREE.Clock()
    let frameId = 0
    let ready = false

    const render = () => {
      frameId = requestAnimationFrame(render)
      if (!visible || document.hidden) return

      const time = reducedMotion ? 0 : clock.getElapsedTime()
      pointer.x += (pointer.targetX - pointer.x) * 0.035
      pointer.y += (pointer.targetY - pointer.y) * 0.035

      layer.rotation.y = pointer.x * 0.06
      layer.rotation.x = pointer.y * 0.04

      left.rotation.y = 0.2 + time * 0.08
      left.rotation.x = 0.4 + Math.sin(time * 0.24) * 0.08
      right.rotation.y = 0.2 - time * 0.055
      right.rotation.z = -0.4 + Math.sin(time * 0.2) * 0.04
      topRight.rotation.y = 0.5 + time * 0.12
      bottomLeft.rotation.x = 0.8 + time * 0.06
      particles.rotation.y = time * 0.01

      left.position.y = 1.4 + Math.sin(time * 0.4) * 0.09
      right.position.y = -0.9 + Math.sin(time * 0.34 + 1) * 0.08

      renderer.render(scene, camera)
      if (!ready) {
        ready = true
        container.classList.add('is-ready')
      }
    }
    render()

    return () => {
      cancelAnimationFrame(frameId)
      window.removeEventListener('pointermove', onPointerMove)
      resizeObserver.disconnect()
      visibilityObserver.disconnect()
      scene.traverse((object) => {
        if (object.geometry) object.geometry.dispose()
        if (object.material) object.material.dispose()
      })
      renderer.dispose()
      renderer.domElement.remove()
    }
  }, [])

  return <div className="hero-objects" ref={containerRef} aria-hidden="true" />
}
