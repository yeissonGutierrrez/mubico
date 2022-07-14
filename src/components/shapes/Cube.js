const cube = new THREE.Mesh(
  new THREE.BoxBufferGeometry(800, 400, 800),
  new THREE.MeshBasicMaterial({
      //para darle color tipo hexadecimal le damos 0x y despues el codigo del color
      color: 0xffffff,
      side: THREE.DoubleSide,
      transparent: false,
      opacity: 1,
      

      //aqui solo veriamos la geometria de el material
      wireframe: false
  })
)

export default cube