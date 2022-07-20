const ModalRenderer = new THREE.WebGLRenderer({antialias:false, alpha: true});
ModalRenderer.setSize( window.innerWidth, window.innerHeight );

let modal = document.getElementById('modal3d')

modal.appendChild( ModalRenderer.domElement );
// renderer.shadowMap.enabled = true;
// renderer.shadowMap.type = THREE.PCFSoftShadowMap;

export default ModalRenderer