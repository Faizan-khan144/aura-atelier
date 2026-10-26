import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js'

export default function RingScene() {
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
      container.classList.add('is-fallback')
      return
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x000000, 0)
    renderer.outputColorSpace = THREE.SRGBColorSpace
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.08
    container.appendChild(renderer.domElement)

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 100)
    camera.position.set(0, 0.08, 8.6)
    camera.lookAt(0, 0.16, 0)

    const pmrem = new THREE.PMREMGenerator(renderer)
    const room = new RoomEnvironment()
    const environment = pmrem.fromScene(room, 0.04)
    scene.environment = environment.texture
    scene.environmentIntensity = 1.45

    scene.add(new THREE.AmbientLight(0xffffff, 0.25))

    const key = new THREE.DirectionalLight(0xffffff, 3.4)
    key.position.set(6, 7, 8)
    scene.add(key)

    const warm = new THREE.PointLight(0xc084fc, 32, 18, 2)
    warm.position.set(-4.5, -1.5, 4)
    scene.add(warm)

    const cool = new THREE.PointLight(0x9fb4ff, 24, 18, 2)
    cool.position.set(4.8, 2.8, 3)
    scene.add(cool)

    const ringGroup = new THREE.Group()
    ringGroup.position.y = -0.08
    scene.add(ringGroup)

    const chrome = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      metalness: 1,
      roughness: 0.1,
      envMapIntensity: 2.5,
      clearcoat: 1,
      clearcoatRoughness: 0.06,
    })

    const darkChrome = new THREE.MeshPhysicalMaterial({
      color: 0xbababa,
      metalness: 1,
      roughness: 0.21,
      envMapIntensity: 2.1,
      clearcoat: 0.8,
      clearcoatRoughness: 0.16,
    })

    const band = new THREE.Mesh(new THREE.TorusGeometry(1.34, 0.3, 96, 280), chrome)
    ringGroup.add(band)

    const innerBand = new THREE.Mesh(new THREE.TorusGeometry(1.04, 0.022, 16, 220), darkChrome)
    innerBand.position.z = 0.01
    ringGroup.add(innerBand)

    const setting = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.3, 0.18, 40), chrome)
    setting.position.set(0, 1.64, 0)
    ringGroup.add(setting)

    const gemGeometry = new THREE.OctahedronGeometry(0.4, 0)
    gemGeometry.scale(1, 1.38, 0.92)
    const gemMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xf7f9ff,
      metalness: 0.18,
      roughness: 0.025,
      clearcoat: 1,
      clearcoatRoughness: 0.01,
      envMapIntensity: 3.2,
      flatShading: true,
    })
    const gem = new THREE.Mesh(gemGeometry, gemMaterial)
    gem.position.set(0, 2.14, 0)
    gem.rotation.z = 0.08
    ringGroup.add(gem)

    const prongGeometry = new THREE.SphereGeometry(0.052, 16, 16)
    const prongs = [
      [-0.22, 1.74, 0.09],
      [0.22, 1.74, 0.09],
      [-0.22, 1.74, -0.09],
      [0.22, 1.74, -0.09],
    ]
    prongs.forEach(([x, y, z]) => {
      const prong = new THREE.Mesh(prongGeometry, chrome)
      prong.position.set(x, y, z)
      ringGroup.add(prong)
    })

    const orb = new THREE.Mesh(new THREE.SphereGeometry(0.13, 32, 32), chrome)
    orb.position.set(-1.94, 0.92, 0.18)
    ringGroup.add(orb)

    const smallOrb = new THREE.Mesh(new THREE.SphereGeometry(0.065, 24, 24), darkChrome)
    smallOrb.position.set(1.82, -1.15, 0.3)
    ringGroup.add(smallOrb)

    const orbit = new THREE.Mesh(
      new THREE.TorusGeometry(2.14, 0.006, 8, 220),
      new THREE.MeshBasicMaterial({
        color: 0x8b7cf6,
        transparent: true,
        opacity: 0.84,
      }),
    )
    orbit.rotation.set(1.22, 0.12, -0.18)
    scene.add(orbit)

    const outerOrbit = new THREE.Mesh(
      new THREE.TorusGeometry(2.52, 0.004, 8, 220),
      new THREE.MeshBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.17,
      }),
    )
    outerOrbit.rotation.set(1.06, -0.22, 0.34)
    scene.add(outerOrbit)

    ringGroup.rotation.set(0.12, -0.32, -0.12)
    orbit.rotation.z += -0.1

    const pointer = { x: 0, y: 0, targetX: 0, targetY: 0 }
    const onPointerMove = (event) => {
      const rect = container.getBoundingClientRect()
      const x = (event.clientX - rect.left) / rect.width - 0.5
      const y = (event.clientY - rect.top) / rect.height - 0.5
      pointer.targetX = THREE.MathUtils.clamp(x * 2, -1, 1)
      pointer.targetY = THREE.MathUtils.clamp(y * 2, -1, 1)
    }
    window.addEventListener('pointermove', onPointerMove, { passive: true })

    const resize = () => {
      const width = Math.max(container.clientWidth, 1)
      const height = Math.max(container.clientHeight, 1)
      renderer.setSize(width, height, false)
      camera.aspect = width / height
      camera.updateProjectionMatrix()
    }
    const resizeObserver = new ResizeObserver(resize)
    resizeObserver.observe(container)
    resize()

    let visible = true
    const visibilityObserver = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting
      },
      { threshold: 0.04 },
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
      pointer.x += (pointer.targetX - pointer.x) * 0.055
      pointer.y += (pointer.targetY - pointer.y) * 0.055

      ringGroup.rotation.y = -0.32 + pointer.x * 0.42 + Math.sin(time * 0.34) * 0.07
      ringGroup.rotation.x = 0.12 + pointer.y * 0.18 + Math.sin(time * 0.46) * 0.025
      ringGroup.rotation.z = -0.12 + Math.sin(time * 0.25) * 0.02
      ringGroup.position.y = -0.08 + Math.sin(time * 0.75) * 0.055
      gem.rotation.y = time * 0.34
      gem.rotation.z = 0.08 + Math.sin(time * 0.42) * 0.035
      orbit.rotation.z = -0.28 + time * 0.035
      outerOrbit.rotation.z = 0.34 - time * 0.022

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
        if (!object.isMesh) return
        object.geometry.dispose()
        if (Array.isArray(object.material)) {
          object.material.forEach((material) => material.dispose())
        } else {
          object.material.dispose()
        }
      })
      environment.dispose()
      room.dispose?.()
      pmrem.dispose()
      renderer.dispose()
      renderer.domElement.remove()
    }
  }, [])

  return (
    <div className="ring-scene" ref={containerRef} aria-hidden="true">
      <span className="ring-scene__fallback" />
    </div>
  )
}
