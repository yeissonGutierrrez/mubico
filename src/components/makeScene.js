function makeScene(elem, camera, fog) {
  const scene = new THREE.Scene();

  if (fog) {
    scene.fog = new THREE.Fog(fog.color, fog.near, fog.far)
  }

  return {scene, camera, elem};
}

export default makeScene