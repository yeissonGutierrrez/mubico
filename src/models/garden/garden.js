
const manager = new THREE.LoadingManager();
manager.onStart = function ( url, itemsLoaded, itemsTotal ) {
  
  document.getElementById('loadText').innerHTML = 'Started loading file: Garden ' + ' .\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.'
  console.log( 'Started loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.' );
  
};

manager.onLoad = function ( ) {
  
  document.getElementById('loadText').innerHTML = 'Loading complete!'
  console.log( 'Loading complete!');
  
};


manager.onProgress = function ( url, itemsLoaded, itemsTotal ) {
  
  document.getElementById('loadText').innerHTML = 'Loading file: Garden ' + ' .\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.'
  console.log( 'Loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.' );
  
};

manager.onError = function ( url ) {
  
  document.getElementById('loadText').innerHTML =  'There was an error loading '
	console.log( 'There was an error loading ' + url );

};


const dracoLoader = new THREE.DRACOLoader(manager);
dracoLoader.setDecoderPath( 'https://www.gstatic.com/draco/v1/decoders/' );
const loader = new THREE.GLTFLoader();
dracoLoader.setDecoderConfig({ type: 'js' });
loader.setDRACOLoader( dracoLoader );





let garden = new Promise((res, rej) => {
  loader.load("src/models/garden/newSceneWithoutOrchids_draco.gltf",
    function (gltf) {
      gltf.scene.position.set(-184, -5, -28)
      res(gltf.scene);
    });
});

export default garden;
