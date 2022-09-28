import camera from "./components/Camera.js";
import cube from "./components/shapes/Cube.js";
import light from "./components/Light.js";
import renderer from "./components/Renderer.js";
import loopMachine from "./components/LoopMachine.js";
import garden from "./models/garden/garden.js";
import points from "./models/points/points.js";

import Stats from "../js/Stats.js";
import makeScene from "./components/makeScene.js";
import orchidText from "./models/orchidText/orchidText.js";
import Orchids from "./models/orchids/Orchids.js";
import resize from "./components/Resize.js";
import baseOrchids from "./models/baseOrchids/baseOrchids.js";
import metalRails from "./models/metalRails/metalRails.js";
import woodRoad from "./models/woodRoad/woodRoad.js";

const orbitControls = new THREE.OrbitControls(
  camera,
  document.getElementById("box")
);
orbitControls.minDistance = 0;
orbitControls.maxDistance = 1;
orbitControls.enableDamping = true;
orbitControls.enableZoom = false;
orbitControls.enablePan = true;
orbitControls.minPolarAngle = Math.PI / 2.1;
orbitControls.maxPolarAngle = Math.PI / 1.5;
orbitControls.screenSpacePanning = true;
orbitControls.enableRotate = true;
orbitControls.autoRotate = false;

const resetTimeline = new gsap.timeline({
  defaults: {
    duration: 1,
  },
});

resetTimeline.to(orbitControls.target, {
  x: -274,
  y: -1.5,
  z: -60,
}, {
  x: -275,
  y: -1.5,
  z: -40
});


const sceneElements = [];

function addScene(elem, fn) {
  const ctx = document.createElement("canvas").getContext("2d");
  elem.appendChild(ctx.canvas);
  sceneElements.push({ elem, ctx, fn });
}

function putTreePos(treesGeo, treeJumper, sceneInfo) {
  let imgtree1 = document.createElement('img');
  imgtree1.src = '../src/images/trees/Arbol-3.png'
  let sprite1 = new THREE.Texture(imgtree1);
  sprite1.needsUpdate = true;

  let imgtree2 = document.createElement('img');
  imgtree2.src = '../src/images/trees/Arbol-4.png'
  let sprite2 = new THREE.Texture(imgtree2);
  sprite2.needsUpdate = true;

  let imgtree3 = document.createElement('img');
  imgtree3.src = '../src/images/trees/Arbol-5.png'
  let sprite3 = new THREE.Texture(imgtree3);
  sprite3.needsUpdate = true;

  let imgtree4 = document.createElement('img');
  imgtree4.src = '../src/images/trees/Arbol-6.png'
  let sprite4 = new THREE.Texture(imgtree4);
  sprite4.needsUpdate = true;

  let imgtree5 = document.createElement('img');
  imgtree5.src = '../src/images/trees/Arbol-7.png'
  let sprite5 = new THREE.Texture(imgtree5);
  sprite5.needsUpdate = true;

  let imgtree6 = document.createElement('img');
  imgtree6.src = '../src/images/trees/Arbol-8.png'
  let sprite6 = new THREE.Texture(imgtree6);
  sprite6.needsUpdate = true;

  let array = []
  // let numMaxplans = treesGeo1.attributes.position.array.length
  let plans = 0
  let count = 0
  let threeType = 0
  let treeCounter = 0

  for (let index = 0; index < treesGeo.attributes.position.array.length ; index++) {
    if (count <= 3) {
      count++
      array.push(treesGeo.attributes.position.array[index])
      //  console.log('aquii',array)
      } else if(count === 4) {
          count++
          let mat
          switch (threeType) {
            case 0:
              mat = new THREE.SpriteMaterial( {map: sprite1, transparent: true, alphaTest: 0.2, fog: true, opacity: 1} )
              break;
              
              case 1:
              mat = new THREE.SpriteMaterial( {map: sprite2, transparent: true, alphaTest: 0.2, fog: true, opacity: 1} )
              break;
              
              case 2:
              mat = new THREE.SpriteMaterial( {map: sprite3, transparent: true, alphaTest: 0.2, fog: true, opacity: 1} )
              break;
              
              case 3:
              mat = new THREE.SpriteMaterial( {map: sprite4, transparent: true, alphaTest: 0.2, fog: true, opacity: 1} )
              break;
              
              case 4:
              mat = new THREE.SpriteMaterial( {map: sprite5, transparent: true, alphaTest: 0.2, fog: true, opacity: 1} )
              break;
              
              case 5:
                mat = new THREE.SpriteMaterial( {map: sprite6, transparent: true, alphaTest: 0.2, fog: true, opacity: 1} )
              break;
              
              default:
              mat = new THREE.SpriteMaterial( {map: sprite1, transparent: true, alphaTest: 0.2, fog: true, opacity: 1} )
              break;
          } 

          let scale = Math.random() * 10
          let planes = new THREE.Sprite( mat );
          planes.position.set(array[0] - 184, array[1] - 2, array[2] - 28)

          if (scale >= 8) {
            planes.scale.x = 7
            planes.scale.y = 9

            planes.position.setY(array[1] - 2.2)
          } else if (scale >= 5 && scale <= 7) {
            planes.scale.x = 7
            planes.scale.y = 9

            planes.position.setY(array[1] - 1)
          }else if(scale <= 4 && scale >= 2.5){
            planes.scale.x = 4
            planes.scale.y = 6

            planes.position.setY(array[1] - 2.2)
          }else if(scale < 2.5){
            planes.scale.x = 3
            planes.scale.y = 4
            planes.position.setY(array[1] - 3)
          } else {
            planes.scale.x = 2
            planes.scale.y = 2

            planes.position.setY(array[1] - 4)

          }
          // planes.lookAt(camera)
          if (plans <= treesGeo.attributes.position.array.length) {
            plans++
            if (threeType <= 5) {
              threeType++
            } else {
              threeType = 0
            }
            if (treeCounter === treeJumper) {
              treeCounter = 0
              sceneInfo.scene.add( planes );
            } else {
              treeCounter++
              console.log('saltado')
            }
          } else {
            console.log('maxima cantidad de planos')
          }
          
      } else if(count === 5){

        count = 0
        array = []
      }
    
    
  }
}

function addTrees(sceneInfo) {
  //trees section 1
  const treesCamp = sceneInfo.scene.getObjectByName('EARTH_TREES').children.find(e => e.name === 'Object_373')
  const treesCamp2 = sceneInfo.scene.getObjectByName('EARTH_TREES').children.find(e => e.name === 'Object_374')
  const treesCamp3 = sceneInfo.scene.getObjectByName('EARTH_TREES').children.find(e => e.name === 'Object_372')
  const treesCamp4 = sceneInfo.scene.getObjectByName('EARTH_TREES').children.find(e => e.name === 'Object_673')
  const treesCamp5 = sceneInfo.scene.getObjectByName('EARTH_TREES').children.find(e => e.name === 'Object_675')
  const treesCamp6 = sceneInfo.scene.getObjectByName('EARTH_TREES').children.find(e => e.name === 'Object_333')



  //aqui se renderiza los arboles en png

  let treesGeo1 = new THREE.BufferGeometry();
  treesGeo1.copy(treesCamp.geometry)

  let treesGeo2 = new THREE.BufferGeometry();
  treesGeo2.copy(treesCamp2.geometry)

  let treesGeo3 = new THREE.BufferGeometry();
  treesGeo3.copy(treesCamp3.geometry)

  let treesGeo4 = new THREE.BufferGeometry();
  treesGeo4.copy(treesCamp4.geometry)

  let treesGeo5 = new THREE.BufferGeometry();
  treesGeo5.copy(treesCamp5.geometry)

  let treesGeo6 = new THREE.BufferGeometry();
  treesGeo6.copy(treesCamp6.geometry)



  putTreePos(treesGeo1, 10, sceneInfo)
  putTreePos(treesGeo2, 10, sceneInfo)
  putTreePos(treesGeo3, 10, sceneInfo)
  putTreePos(treesGeo4, 3, sceneInfo)
  putTreePos(treesGeo5, 3, sceneInfo)
  putTreePos(treesGeo6, 3, sceneInfo)

}


let stats = new Stats();
stats.showPanel(1); // 0: fps, 1: ms, 2: mb, 3+: custom
document.body.appendChild(stats.dom);

function principalScene(elem) {
  let fog = {
    color: 0x353535,
    near: 10,
    far: 30,
  };

  const sceneInfo = makeScene(elem, camera, fog);
  cube.position.set(-184, -5, -28)
  sceneInfo.scene.add(cube);
  sceneInfo.scene.add(light);
  // camera.lookAt(cube.position);

  const raycaster = new THREE.Raycaster();
  let meshCurrentHover = null;

  let fadeOut = (o) => {
    o.classList.add("fadeOut");

    if (document.querySelector("#myDiv")) {
      setTimeout(d_none, 600);
      // si existe el elemento #myDiv ejecuto la funcion una vez que pasen .6s que es lo que tarda en opacarse
    }
  };

  

  baseOrchids.then((gltf) => {
    sceneInfo.scene.add(gltf);
  })


  metalRails.then((gltf) => {
    sceneInfo.scene.add(gltf);
  })

  woodRoad.then((gltf) => {
    sceneInfo.scene.add(gltf);
  })

  points.then((gltf) => {
    sceneInfo.scene.add(gltf);
  })

  Orchids.then((gltf) => {
    sceneInfo.scene.add(gltf);
    
    // let material = new THREE.MeshPhysicalMaterial({
    //   transmission: 1,
    //   thickness: 0,
    //   roughness: 0,
    //   // envMap: hdrEquirect,
    //   // color: new THREE.Color("rgb(255, 0, 0)"),
    //   //para que se puedan ver los sprites
    //   depthWrite: false
    // });

    // sceneInfo.scene.getObjectByName('ICE_BOX').children.map(e => {
    //   e.geometry.dispose();
    //   e.material = material
    // })
  })

  garden.then((gltf) => {
    sceneInfo.scene.add(gltf);
    console.log(gltf);
    camera.lookAt(new THREE.Vector3(200, 200, 200));
    camera.position.set(-274, -1.5, -6,);

    let imgFamily = document.createElement('img');
    imgFamily.src = '/src/images/family.png'
    let familyTexture = new THREE.Texture(imgFamily);
    familyTexture.needsUpdate = true;
    let familyMat = new THREE.SpriteMaterial( {map: familyTexture, transparent: true, alphaTest: 0.2, fog: true, opacity: 1} )

    let familySprite = new THREE.Sprite( familyMat );
    familySprite.position.set(-274, -2.8, -45,)
    familySprite.scale.x = 4
    familySprite.scale.y = 4
    sceneInfo.scene.add(familySprite)

    let tunnelPointLight = new THREE.PointLight( 0xffffff);
    tunnelPointLight.intensity = 0.7
    tunnelPointLight.distance = 20
    // currentLight.position.setY(currentLight.position.y + 6)
    tunnelPointLight.position.set(-274, 2, -15,);
    const tunnelPointLightHelper = new THREE.PointLightHelper( tunnelPointLight, 1 );

    let tunnelPointLight2 = new THREE.PointLight( 0xffffff);
    tunnelPointLight2.intensity = 0.7
    tunnelPointLight2.distance = 20
    // currentLight.position.setY(currentLight.position.y + 6)
    tunnelPointLight2.position.set(-274, 2, -25,);
    const tunnelPointLightHelper2 = new THREE.PointLightHelper( tunnelPointLight2, 1 );

    let tunnelPointLight3 = new THREE.PointLight( 0xffffff);
    tunnelPointLight3.intensity = 0.7
    tunnelPointLight3.distance = 20
    // currentLight.position.setY(currentLight.position.y + 6)
    tunnelPointLight3.position.set(-274, 2, -35,);
    const tunnelPointLightHelper3 = new THREE.PointLightHelper( tunnelPointLight3, 1 );

    sceneInfo.scene.add(tunnelPointLight)
    // sceneInfo.scene.add(tunnelPointLightHelper)
    sceneInfo.scene.add(tunnelPointLight2)
    // sceneInfo.scene.add(tunnelPointLightHelper2)
    sceneInfo.scene.add(tunnelPointLight3)
    // sceneInfo.scene.add(tunnelPointLightHelper3)
    
    const hdrUrls = [ 'px.png', 'nx.png', 'py.png', 'ny.png', 'pz.png', 'nz.png' ];
    let hdrCubeMap = new THREE.HDRCubeTextureLoader()
      .setPath( '/src/textures/' )
      .load( hdrUrls, () => {

        let hdrCubeRenderTarget = pmremGenerator.fromCubemap( hdrCubeMap );

        hdrCubeMap.magFilter = THREE.LinearFilter;
        hdrCubeMap.needsUpdate = true;

      } );

    let material = new THREE.MeshPhysicalMaterial({
      transmission: 1,
      thickness: 0,
      roughness: 0,
      envMap: hdrCubeMap,
      metalness: 0,
      // color: new THREE.Color("rgb(255, 0, 0)"),
      //para que se puedan ver los sprites
      depthWrite: false,
    });

    sceneInfo.scene.getObjectByName('GLASS_RAIL').children.map(e => {
      e.geometry.dispose();
      e.material = material
    })

    const lights = ['PointLight', 'PointLight_2', 'PointLight_4', 'PointLight_6', 'PointLight_8', 'PointLight_10', 'PointLight_12', 'PointLight_14','PointLight_16', 'PointLight_18', 'PointLight_20','PointLight_22','PointLight_24','PointLight_26','PointLight_28','PointLight_30']
    
    lights.map((l) => {
      let currentLight = sceneInfo.scene.getObjectByName(l)
      let pointLight = new THREE.PointLight( 0xffffff);
      pointLight.intensity = 3
      pointLight.distance = 5
      // currentLight.position.setY(currentLight.position.y + 6)
      pointLight.position.set( currentLight.position.x - 184, currentLight.position.y - 2, currentLight.position.z - 28 );

      const pointLightHelper = new THREE.PointLightHelper( pointLight, 1 );

      sceneInfo.scene.add(pointLight)
      // sceneInfo.scene.add(pointLightHelper)
  })

  addTrees(sceneInfo)

  //textures
  const earthTexture = new THREE.TextureLoader().load('https://i.ibb.co/f95zZL9/Textures-Com-Grass0153-2-seamless-S.jpg')
  const woodTexture = new THREE.TextureLoader().load('https://i.ibb.co/wzVk7Ps/WOOD-01.png')
  const woodTexture2 = new THREE.TextureLoader().load('https://i.ibb.co/TcZgxcg/Walnut-dark-100-DP.jpg')
  const concreteTexture = new THREE.TextureLoader().load('https://i.ibb.co/LknZNmz/Concrete-blocks-675-DB.jpg')
  const concreteTexture2 = new THREE.TextureLoader().load('https://i.ibb.co/LknZNmz/Concrete-blocks-675-DB.jpg')
  const grassyTexture = new THREE.TextureLoader().load('https://i.ibb.co/CVZ6y6Z/Grassy-150-DB.jpg')
  const grassyTexture2 = new THREE.TextureLoader().load('https://i.ibb.co/S73YDqW/Grass-dark-150-DB.jpg')
  const galvanizedTexture = new THREE.TextureLoader().load('https://i.ibb.co/JHB0vfr/Galvanized-steel-100-DB.jpg')
  
  
  woodTexture.wrapS = THREE.RepeatWrapping
  woodTexture.wrapT = THREE.RepeatWrapping

  woodTexture2.wrapS = THREE.RepeatWrapping
  woodTexture2.wrapT = THREE.RepeatWrapping
  
  earthTexture.wrapS = THREE.RepeatWrapping
  earthTexture.wrapT = THREE.RepeatWrapping
  
  concreteTexture.wrapS = THREE.RepeatWrapping
  concreteTexture.wrapT = THREE.RepeatWrapping

  concreteTexture2.wrapS = THREE.RepeatWrapping
  concreteTexture2.wrapT = THREE.RepeatWrapping
  
  grassyTexture.wrapS = THREE.RepeatWrapping
  grassyTexture.wrapT = THREE.RepeatWrapping
  
  grassyTexture2.wrapS = THREE.RepeatWrapping
  grassyTexture2.wrapT = THREE.RepeatWrapping
  
  galvanizedTexture.wrapS = THREE.RepeatWrapping
  galvanizedTexture.wrapT = THREE.RepeatWrapping
  
  woodTexture.repeat.set(20.000, 20.000)
  woodTexture.rotation = 80
  
  woodTexture2.repeat.set(2.000, 2.000)
  woodTexture2.rotation = 90
  
  concreteTexture.repeat.set(100.000, 100.000)
  concreteTexture.rotation = 90
  
  concreteTexture2.repeat.set(10.000, 10.000)
  concreteTexture2.rotation = 90
  
  grassyTexture.repeat.set(70.000, 70.000)

  grassyTexture2.repeat.set(50.000, 50.000)

  galvanizedTexture.repeat.set(10.000, 10.000)

  earthTexture.repeat.set(50, 50)
  
  const maphearth = new THREE.MeshStandardMaterial({
    map: earthTexture
  })
  
  const mapWoodFloor = new THREE.MeshStandardMaterial({
    map: woodTexture,
    shadowSide: true
  })
  
  const mapWoodFloor2 = new THREE.MeshStandardMaterial({
    map: woodTexture2,
    shadowSide: true
  })
  
  const mapConcreteFloor = new THREE.MeshStandardMaterial({
    map: concreteTexture,
    shadowSide: true
  })

  const mapConcreteFloor2 = new THREE.MeshStandardMaterial({
    map: concreteTexture2,
    shadowSide: true
  })
  
  const mapGrassyFloor = new THREE.MeshStandardMaterial({
    map: grassyTexture,
    shadowSide: true
  })
  
  const mapGrassyFloor2 = new THREE.MeshStandardMaterial({
    map: grassyTexture2,
    shadowSide: true
  })
  
  const mapGalvanizedTextureFloor = new THREE.MeshStandardMaterial({
    map: galvanizedTexture,
    shadowSide: true
  })
  

  // gltf.sceneInfo.scene.getObjectByName('EARTH').children.map(e => e.material = maphearth)
  sceneInfo.scene.getObjectByName('WOOD_PATH_01').children.map(e => e.material = mapWoodFloor)
  sceneInfo.scene.getObjectByName('METAL_01').children.map(e => e.material = mapWoodFloor2)
  sceneInfo.scene.getObjectByName('PATH_CONCRETE').children.map(e => e.material = mapConcreteFloor)
  sceneInfo.scene.getObjectByName('EARTH_TREES').children.map(e => e.material = mapGrassyFloor2)
  sceneInfo.scene.getObjectByName('EARTH_SHRUB').children.map(e => e.material = mapGrassyFloor)
  sceneInfo.scene.getObjectByName('Object_1').material = mapConcreteFloor2
  // sceneInfo.scene.getObjectByName('Object_668').material = mapWoodFloor
  // sceneInfo.scene.getObjectByName('Object_660').material = mapWoodFloor
   sceneInfo.scene.getObjectByName('Object_666').material = mapWoodFloor2
   sceneInfo.scene.getObjectByName('Object_665').material = mapWoodFloor2
   sceneInfo.scene.getObjectByName('Object_663').material = mapWoodFloor2
  
  const pointer = new THREE.Vector2(300, 300);

  function onPointerMove(event) {
    pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
    pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;
  }

  window.addEventListener("pointermove", onPointerMove);

  const timeline = new gsap.timeline({
    defaults: {
      duration: 1,
    },
  });

  const gsapAnimations = (mesh) => {
    let point = sceneInfo.scene.getObjectByName(mesh);
    let currentPos = {
      x: point.geometry.attributes.position.array[0] - 184,
      y: point.geometry.attributes.position.array[1] - 3.2,
      z: point.geometry.attributes.position.array[2] - 28,
    }
    console.log('pointer en position', currentPos )
    timeline.to(orbitControls.target, {
      x: point.geometry.attributes.position.array[0] - 184,
      y: point.geometry.attributes.position.array[1] - 3.2,
      z: point.geometry.attributes.position.array[2] - 28,
    });
    // aqui se modifica la camara despues de posicionarse
    //  .to(camera.position, {
    //    x: animationsParams[mesh].camera.x,
    //    y: animationsParams[mesh].camera.y,
    //    z: animationsParams[mesh].camera.z,
    //  }, '-=1.0')  // no agregar dilay a la primera animacion porque puede ocasionar un error
    //  .to(camera, {
    //   //  zoom:animationsParams.cube1.zoom,
    //    onUpdate: () => {
    //      camera.updateProjectionMatrix()
    //    }
    //  }, "-=1.0")

    //  cameraFolder.updateDisplay()
  };


  let pointsNames = []
  let objects = [];

  for (let index = 673; index <= 837 ; index++) {
    let element = `Object_${index}`;
    pointsNames.push(element)
  }

  pointsNames.map((p) => {
    let cube = sceneInfo.scene.getObjectByName('PATH-_DOTS').children.find(e => e.name === p)
    objects.push(cube)
  })

  const objectForCollitions = () => {
    return objects //tambien podemos pasarles grupos mediante three.groups
  }

    //handle mesh click
    let meshCurrentClick = null

    const handleMeshsClick = () => {
      let modal = document.getElementById('modal')
      let modal3d = document.getElementById('modal3d')
      let close = document.getElementById('close')
      let buttonModal3d = document.getElementById('buttonModal3d')

      buttonModal3d.addEventListener('dblclick', () => {
        modal3d.style.display = 'block'
        modal.style.display = 'none'
      })

      close.addEventListener('dblclick', () => {
        modal.style.display = 'none'
      })

      try {
        switch (meshCurrentClick.name) {
          case pointsNames.find(e => e === meshCurrentClick.name):
            gsapAnimations(meshCurrentClick.name)

            console.log('click on a point')
            return meshCurrentClick = null 
  
          default:
            meshCurrentClick = null
            break;
          }
          
        } catch (error) {
        console.log(error)
      }
    }



    window.addEventListener('dblclick', handleMeshsClick)

    var clock = new THREE.Clock()
    console.log('clock', clock.getDelta())
    const animate = () => {
    
      raycaster.setFromCamera(pointer, camera)
    
      const collitions = objectForCollitions()
    
      const intersects = raycaster.intersectObjects(collitions)
      // console.log(intersects)

        //mouse on leave
        if (meshCurrentHover) {
          meshCurrentHover = null
          meshCurrentClick = null
        } 
        
        
        //mouse hover and click
        if (intersects.length) {
          meshCurrentHover = intersects[0].object
          meshCurrentClick = intersects[0].object
        } else if(meshCurrentHover) {
          meshCurrentHover = null
        }
    
        // orbitControls.update();
        // controls.update(clock.getDelta())
      // renderer.render(sceneInfo.scene, camera);
      requestAnimationFrame(animate);
    };

    animate()

  console.log(pointsNames)


  //loader

    document.getElementById("loadText").innerHTML = "Loading complete!";
    document.getElementById("loadingCircle").style.display = "none";

    let playButton = document.getElementById("playButton");
    playButton.style.display = "block";

    const loadertimeline = new gsap.timeline({
      defaults: {
        duration: 10,
      },
    });

    playButton.addEventListener("click", () => {
      fadeOut(document.querySelector("#loader"));
      setTimeout(() => {
        document.getElementById("loader").style.display = "none";
      }, 2000);

      loadertimeline.to(orbitControls.target, {
        x: -274,
        y: -1.5,
        z: -6,
      });

      // orbitControls.update()
    });
    console.log("Loading complete!");
  });

  return () => {
    renderer.render(sceneInfo.scene, sceneInfo.camera);
    orbitControls.update();
  };
}

function secondaryScene(elem) {
  const fov = 45;
  const aspect = 2; // the canvas default
  const near = 0.1;
  const far = 20;
  const camera3 = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera3.position.set(-5, 6, 0);

  const sceneInfo = makeScene(elem, camera3);

  let pointLight = new THREE.PointLight(0xffffff);
  pointLight.intensity = 10;
  pointLight.distance = 10;
  // currentLight.position.setY(currentLight.position.y + 6)
  pointLight.position.set(2, 8, 2);

  sceneInfo.scene.add(pointLight);

  orchidText.then((gltf) => {
    sceneInfo.scene.add(gltf);
  });
  const controls = new THREE.TrackballControls(
    camera3,
    document.getElementById("modal3d")
  );
  controls.rotateSpeed = 0.5;
  controls.noPan = true;

  const radius = 0.8;
  const widthSegments = 4;
  const heightSegments = 2;
  const geometry = new THREE.SphereBufferGeometry(
    radius,
    widthSegments,
    heightSegments
  );
  const material = new THREE.MeshPhongMaterial({
    color: "blue",
    flatShading: false,
  });
  const mesh = new THREE.Mesh(geometry, material);
  // sceneInfo.scene.add(light)
  // sceneInfo.scene.add(mesh);

  let modal = document.getElementById("modal3d");
  let closeBotton = document.getElementById("modal3dClose");

  closeBotton.addEventListener("click", () => {
    // sceneInfo.scene.clear()
    modal.style.display = "none";
  });

  return () => {
    renderer.render(sceneInfo.scene, sceneInfo.camera);
    controls.handleResize();
    controls.update();
  };
}

document.querySelectorAll("[data-diagram]").forEach((elem) => {
  const sceneName = elem.dataset.diagram;
  if (sceneName === "box") {
    const sceneRenderFunction = principalScene();
    addScene(elem, sceneRenderFunction);
  } else if (sceneName === "modal3d") {
    const sceneRenderFunction = secondaryScene();
    addScene(elem, sceneRenderFunction);
  }
});

function render(time) {
  time *= 0.001;

  for (const { elem, fn, ctx } of sceneElements) {
    // get the viewport relative position opf this element
    const rect = elem.getBoundingClientRect();
    const { left, right, top, bottom, width, height } = rect;
    const rendererCanvas = renderer.domElement;

    const isOffscreen =
      bottom < 0 ||
      top > window.innerHeight ||
      right < 0 ||
      left > window.innerWidth;

    if (!isOffscreen) {
      // make sure the renderer's canvas is big enough
      if (rendererCanvas.width < width || rendererCanvas.height < height) {
        renderer.setSize(width, height, false);
      }

      // make sure the canvas for this area is the same size as the area
      if (ctx.canvas.width !== width || ctx.canvas.height !== height) {
        ctx.canvas.width = width;
        ctx.canvas.height = height;
      }

      renderer.setScissor(0, 0, width, height);
      renderer.setViewport(0, 0, width, height);

      fn(time, rect);

      // copy the rendered scene to this element's canvas
      ctx.globalCompositeOperation = "copy";
      ctx.drawImage(
        rendererCanvas,
        0,
        rendererCanvas.height - height,
        width,
        height, // src rect
        0,
        0,
        width,
        height
      ); // dst rect
    }
    resize.start(renderer)
  }
}

loopMachine.addCallback(() => {
  stats.update();
  render();
  // renderer.render(scene, camera)
  // rendenerSceneInfo(myscene2, camera2)
  // rendenerSceneInfo(myscene, camera)
});

loopMachine.start();

// console.log(scene, camera, renderer);
