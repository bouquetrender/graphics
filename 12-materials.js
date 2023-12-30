import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import GUI from 'lil-gui'

const gui = new GUI()

// texture
const textureManage = new THREE.LoadingManager()

const textureLoader = new THREE.TextureLoader(textureManage)
const cubeTextureLoader = new THREE.CubeTextureLoader()

const doorColorTexture = textureLoader.load('/textures/door/color.jpg')
const doorAlphaTexture = textureLoader.load('/textures/door/alpha.jpg')
const doorHeightTexture = textureLoader.load('/textures/door/height.jpg')
const doorNormalTexture = textureLoader.load('/textures/door/normal.jpg')
const doorAmbientOcclusionTexture = textureLoader.load('/textures/door/ambientOcclusion.jpg')
const doorMetalnessTexture = textureLoader.load('/textures/door/metalness.jpg')
const doorRoughnessTexture = textureLoader.load('/textures/door/roughness.jpg')

const matcapTexture = textureLoader.load('/textures/matcaps/8.png')
const graotentTexture = textureLoader.load('/textures/gradients/5.jpg')
graotentTexture.minFilter = THREE.NearestFilter
graotentTexture.magFilter = THREE.NearestFilter
graotentTexture.generateMipmaps = false

const environmentMapTexture = cubeTextureLoader.load([
    '/textures/environmentMaps/3/px.jpg',
    '/textures/environmentMaps/3/nx.jpg',
    '/textures/environmentMaps/3/py.jpg',
    '/textures/environmentMaps/3/ny.jpg',
    '/textures/environmentMaps/3/pz.jpg',
    '/textures/environmentMaps/3/nz.jpg',
])

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')


// Scene
const scene = new THREE.Scene()

/**
 * Objects
 */
// const material = new THREE.MeshBasicMaterial()
// material.wireframe = true
// material.map = doorColorTexture
// material.color = new THREE.Color('#6f92ba')
// material.opacity = 0.5
// material.transparent = true
// material.alphaMap = doorAlphaTexture
// material.side = THREE.FrontSide

// const material = new THREE.MeshMatcapMaterial()
// material.matcap = matcapTexture

// const material = new THREE.MeshDepthMaterial()

// const material = new THREE.MeshLambertMaterial()

// const material = new THREE.MeshPhongMaterial()
// material.shininess = 100
// material.specular = new THREE.Color('#6f92ba')

// const material = new THREE.MeshToonMaterial()
// material.gradientMap = graotentTexture

const doorMaterial = new THREE.MeshStandardMaterial()
doorMaterial.map = doorColorTexture
doorMaterial.aoMap = doorAmbientOcclusionTexture
doorMaterial.aoMapIntensity = 1
doorMaterial.metalnessMap = doorMetalnessTexture
doorMaterial.roughnessMap = doorRoughnessTexture
doorMaterial.displacementMap = doorHeightTexture
doorMaterial.displacementScale = 0.05
doorMaterial.normalMap = doorNormalTexture
doorMaterial.normalScale = { x: 1, y: 1 };
doorMaterial.alphaMap = doorAlphaTexture
doorMaterial.transparent = true

// ------
const material = new THREE.MeshStandardMaterial()
material.metalness = 0.7
material.roughness = 0.005
material.envMap = environmentMapTexture

gui.add(material, 'metalness').min(0).max(1).step(0.001)
gui.add(material, 'roughness').min(0).max(1).step(0.001)
gui.add(material, 'aoMapIntensity').min(0).max(10).step(0.5)
const normalMaterialFolder = gui.addFolder('normalScale');
normalMaterialFolder.add(material.normalScale, 'x').min(0).max(2).step(0.5)
normalMaterialFolder.add(material.normalScale, 'y').min(0).max(2).step(0.5)

const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 64, 64),
    material
)
// ------

const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(1, 1, 100, 100),
    doorMaterial
)
plane.geometry.setAttribute(
    'uv2',
    new THREE.BufferAttribute(plane.geometry.attributes.uv.array, 2)
)
plane.position.x = -1.5

// const torus = new THREE.Mesh(
//     new THREE.TorusGeometry(0.3, 0.2, 64, 128),
//     material
// )
// torus.position.x = 1.5

scene.add(sphere, plane)

/**
 * Light
 */

// Light for THREE.MeshLambertMaterial()
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
scene.add(ambientLight)

const pointLight = new THREE.PointLight(0xffffff, 0.5)
pointLight.position.x = 2
pointLight.position.y = 3
pointLight.position.z = 4
scene.add(pointLight)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () => {
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 1
camera.position.y = 1
camera.position.z = 2
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () => {
    const elapsedTime = clock.getElapsedTime()

    // sphere.rotation.y = 0.3 * elapsedTime
    // plane.rotation.y = 0.3 * elapsedTime
    // torus.rotation.y = 0.3 * elapsedTime

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()
