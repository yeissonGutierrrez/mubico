const canvas = document.querySelector('#c');
const renderer = new THREE.WebGLRenderer({canvas, antialias:false, alpha: true});
renderer.setSize( window.innerWidth, window.innerHeight );
// document.body.appendChild( renderer.domElement );
// renderer.shadowMap.enabled = true;
// renderer.shadowMap.type = THREE.PCFSoftShadowMap;

export default renderer