import ModalScene from '../../components/ModalScene.js';
import light from '../../components/Light.js';
import loopMachine from '../../components/LoopMachine.js';
import garden from '../garden/garden.js';
import ModalCamera from '../../components/ModalCamera.js';
import renderer from '../../components/Renderer.js';


const orbitControls = new THREE.OrbitControls(ModalCamera, renderer.domElement);
orbitControls.minDistance = 0
orbitControls.maxDistance = 1
orbitControls.enableDamping = true;
orbitControls.enableZoom = false
orbitControls.enablePan = true
orbitControls.minPolarAngle = Math.PI / 2.1
orbitControls.maxPolarAngle = Math.PI / 1.5 
orbitControls.screenSpacePanning = true
orbitControls.enableRotate = true
orbitControls.autoRotate = false

ModalScene.add(light)

garden.then((gltf) => {
  ModalScene.add(gltf)
  console.log('orchids modal',gltf)
  ModalCamera.lookAt(new THREE.Vector3(200, 200, 200));
  ModalCamera.position.set(0, 0, 0);

})

loopMachine.addCallback(() => {

    // stats.update()
    renderer.render(ModalScene, ModalCamera)
    orbitControls.update();
});



loopMachine.start()

console.log(ModalScene, ModalCamera, renderer);