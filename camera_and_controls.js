/**
 * camera
 * array camera 在渲染特定区域上用多个camera渲染场景（例如分屏不同视角）
 * stereo camera 通过两个camera模拟眼睛（vr, red&blue glasses, cardboard）
 * cube camera 做六次渲染，上下左右前后（环境地图，阴影折射 反射）
 * orthographic camera 渲染一个不带透视 perspective 场景，物体不会在远处变小，也不会在近处变大
 * perspective camera 渲染一个不带透视的场景
 */

/**
 * controls
 * device orientation controls 设备方位控制器，根据设备的方向和姿态来控制场景中的camera或对象
 * fly controls 飞行控制器，用户以类似飞行模拟器或游戏中的方式自由移动摄像
 * first person controls 第一人称控制器，模拟第一人称视角的交互式控制，但无法做upside down
 * pointer lock controls 指针锁定控制器，锁定鼠标指针，以便在虚拟环境中进行自由移动和旋转，而无需担心鼠标移动超出浏览器窗口的限制（可以用 Pointer Lock API替代）
 * orbit controls 轨道控制器，允许用户在 3D 空间中旋转、平移和缩放对象或场景，以便更好地查看和理解三维模型
 * trackball controls 轨迹球控制器，和轨道控制器很像但没有垂直角度的限制
 * transform controls 变换控制器，与 camera 无关，用于创建编辑器
 * drag controls 拖拽控制器，与 camera 无关，用于拖拽控制物体
 */

import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

const canvas = document.querySelector('canvas.webgl')
const sizes = {
    width: 800,
    height: 600
}

const cursor = {
    x: 0,
    y: 0
}
window.addEventListener('mousemove', (event) => {
    cursor.x = event.clientX / sizes.width - 0.5 // 中心点0 左右移动范围值-0.5 ~ 0.5

    // y坐标值取负数，在event中y越往下坐标点越大，而three.js中y越往下坐标点越小，需要将这个值应用在camera中所以取负数
    cursor.y = - (event.clientY / sizes.height - 0.5) // 中心点0 上下移动范围值-0.5 ~ 0.5
})

// Scene
const scene = new THREE.Scene()

// Object
const mesh = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1, 5, 5, 5),
    new THREE.MeshBasicMaterial({ color: 0xff0000 })
)
scene.add(mesh)

/**
 * THREE.PerspectiveCamera
 * fov（视场角，Field of View）：这是camera的垂直视场角度，以度（degrees）为单位来表示。它决定了可见区域的大小，通常在 45 到 90 度之间选择合适的值，具体取决于你的需求和场景。
 * aspect（画幅比，Aspect Ratio）：这是渲染目标的宽度与高度之比。通常使用渲染区域的宽度除以高度来计算。例如，如果你的渲染区域是 800 像素宽和 600 像素高，那么 aspect 就是 800 / 600，或者简化为 4 / 3。
 * near（近裁剪面，Near Clipping Plane）：这是camera能够渲染的最近距离，以单位距离（例如，以米为单位）表示。任何距离camera小于 near 的物体都不会被渲染出来。
 * far（远裁剪面，Far Clipping Plane）：这是camera能够渲染的最远距离，以单位距离表示。任何距离camera大于 far 的物体也不会被渲染出来。
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)

/**
 * THREE.OrthographicCamera
 * left（左边界）：场景的左边界位置。
 * top（顶部边界）：场景的顶部边界位置。
 * bottom（底部边界）：场景的底部边界位置。
 * near（近裁剪面，Near Clipping Plane）：camera能够渲染的最近距离。任何距离camera小于 near 的物体都不会被渲染出来。
 * far（远裁剪面，Far Clipping Plane）：camera能够渲染的最远距离。任何距离camera大于 far 的物体也不会被渲染出来。
 */
const aspectRatio = sizes.width / sizes.height
const camera2 = new THREE.OrthographicCamera(
    -1 * aspectRatio,
    1 * aspectRatio,
    1,
    -1,
    0.1,
    100
)

// camera.position.x = 2
// camera.position.y = 2
camera.position.z = 3

scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
// controls.target.y = 1
// controls.update()

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)

// Animate
// const clock = new THREE.Clock()

const tick = () => {
    // const elapsedTime = clock.getElapsedTime()

    // Update objects
    // mesh.rotation.y = elapsedTime;
    // 通过正弦和余弦函数，以及 cursor.x 的变化来控制camera在 X 和 Z 轴上的位置，从而实现camera绕某个中心点旋转一圈的效果
    // camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 3
    // camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 3
    // camera.lookAt(mesh.position)

    // Update Controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()
