const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
camera.position.z = 4

const renderer = new THREE.WebGLRenderer({ antialias: true })

renderer.setClearColor("#000")
renderer.setSize( window.innerWidth, window.innerHeight )

document.body.appendChild( renderer.domElement )

const geometry = new THREE.BoxGeometry( 1, 1, 1 )
const material = new THREE.MeshBasicMaterial({ color: "#433F81" })
const cube = new THREE.Mesh( geometry, material)

scene.add( cube )

const render = () => {
    requestAnimationFrame( render )
    
    renderer.render(scene, camera)

    cube.rotation.x += 0.01
    cube.rotation.y += 0.01

}

render()