const geometry = new THREE.PlaneGeometry( 400, 400 );
const material = new THREE.MeshBasicMaterial( {color: 0x172b1c, side: THREE.DoubleSide} );
const plane = new THREE.Mesh( geometry, material );
plane.rotateX(Math.PI / 2)
plane.position.set(0,-5,0)


export default plane