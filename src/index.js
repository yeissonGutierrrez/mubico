import camera from './components/Camera.js';
import camera2 from './components/Camera2.js';
import cube from './components/shapes/Cube.js';
import light from './components/Light.js';
import plane from './components/shapes/Plane.js';
import renderer from './components/Renderer.js';
// import scene from './components/Scene.js'
import loopMachine from './components/LoopMachine.js';
import garden from './models/garden/garden.js'
import raylAndWood from './models/raylAndWood/raylAndWood.js'
import points from './models/points/points.js'


import orchids1 from './models/orchids1/Orchids1.js'
import orchids2 from './models/orchids2/orchids2.js'
import Stats from '../js/Stats.js';
import pasillo from './models/pasillo/pasillo.js';
import makeScene from './components/makeScene.js';
import orchidText from './models/orchidText/orchidText.js';




const orbitControls = new THREE.OrbitControls(camera, document.getElementById('box'));
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


const sceneElements = [];
  
function addScene(elem, fn) {
  const ctx = document.createElement('canvas').getContext('2d');
  elem.appendChild(ctx.canvas);
  sceneElements.push({elem, ctx, fn});
}


let stats = new Stats();
stats.showPanel( 1 ); // 0: fps, 1: ms, 2: mb, 3+: custom
document.body.appendChild( stats.dom );


function principalScene (elem) {
    let fog = {
      color: 0x353535,
      near: 10, 
      far: 30
    }

    const sceneInfo = makeScene(elem, camera, fog );

    sceneInfo.scene.add( cube );
    sceneInfo.scene.add( light );
    sceneInfo.scene.add( plane );
    
    
    camera.lookAt(cube.position)
    
    const raycaster = new THREE.Raycaster()
    let meshCurrentHover = null
    
    let fadeOut = (o) => {  
        o.classList.add("fadeOut");
            
        if (document.querySelector('#myDiv')) {
          setTimeout(d_none,600); 
          // si existe el elemento #myDiv ejecuto la funcion una vez que pasen .6s que es lo que tarda en opacarse
        }
    }
    
    
    raylAndWood.then((gltf) => {
      sceneInfo.scene.add(gltf)
    })
    
    garden.then((gltf) => {
        sceneInfo.scene.add(gltf)
        console.log(gltf)
        camera.lookAt(new THREE.Vector3(200, 200, 200));
        camera.position.set(0, 0, 0);
    
        const lights = ['PointLight_10', 'PointLight_8', 'PointLight_28', 'PointLight_30', 'PointLight_26', 'PointLight_24', 'PointLight_2', 'PointLight', 'PointLight_16', 'PointLight_18', 'PointLight_22', 'PointLight_20', 'PointLight_14', 'PointLight_12', 'PointLight_6', 'PointLight_4']
    
        
    
        let material = new THREE.MeshPhysicalMaterial({
          transmission: 1,
          thickness: 0,
          roughness: 0,
          // envMap: hdrEquirect,
          // color: new THREE.Color("rgb(255, 0, 0)"),
          //para que se puedan ver los sprites
          depthWrite: false
        });
    
        sceneInfo.scene.getObjectByName('ICE_BOX').children.map(e => {
          e.geometry.dispose();
          e.material = material
        })
        
    
        
        lights.map((l) => {
            let currentLight = sceneInfo.scene.getObjectByName(l)
            let pointLight = new THREE.PointLight( 0xffffff);
            pointLight.intensity = 5
            pointLight.distance = 5
            // currentLight.position.setY(currentLight.position.y + 6)
            pointLight.position.set( currentLight.position.x - 184, currentLight.position.y - 2, currentLight.position.z - 28 );
    
            const pointLightHelper = new THREE.PointLightHelper( pointLight, 1 );
    
            sceneInfo.scene.add(pointLight)
            sceneInfo.scene.add(pointLightHelper)
        })
    
              //trees section 1
              const treesCamp = sceneInfo.scene.getObjectByName('EARTH_TREES').children.find(e => e.name === 'Object_215')
              const treesCamp2 = sceneInfo.scene.getObjectByName('EARTH_TREES').children.find(e => e.name === 'Object_216')
              const treesCamp3 = sceneInfo.scene.getObjectByName('EARTH_TREES').children.find(e => e.name === 'Object_214')
        
        
            
              //aqui se renderiza los arboles en png
        
              let treesGeo1 = new THREE.BufferGeometry();
              treesGeo1.copy(treesCamp.geometry)
        
              let treesGeo2 = new THREE.BufferGeometry();
              treesGeo2.copy(treesCamp2.geometry)
        
              let treesGeo3 = new THREE.BufferGeometry();
              treesGeo3.copy(treesCamp3.geometry)
        
        
        
              let array = []
              // let numMaxplans = treesGeo1.attributes.position.array.length
              let plans = 0
              let count = 0
              let threeType = 0
        
              let imgtree1 = document.createElement('img');
              imgtree1.src = '/src/images/trees/Arbol-3.png'
              let sprite1 = new THREE.Texture(imgtree1);
              sprite1.needsUpdate = true;
        
              let imgtree2 = document.createElement('img');
              imgtree2.src = '/src/images/trees/Arbol-4.png'
              let sprite2 = new THREE.Texture(imgtree2);
              sprite2.needsUpdate = true;
        
              let imgtree3 = document.createElement('img');
              imgtree3.src = '/src/images/trees/Arbol-5.png'
              let sprite3 = new THREE.Texture(imgtree3);
              sprite3.needsUpdate = true;
        
              let imgtree4 = document.createElement('img');
              imgtree4.src = '/src/images/trees/Arbol-6.png'
              let sprite4 = new THREE.Texture(imgtree4);
              sprite4.needsUpdate = true;
        
              let imgtree5 = document.createElement('img');
              imgtree5.src = '/src/images/trees/Arbol-7.png'
              let sprite5 = new THREE.Texture(imgtree5);
              sprite5.needsUpdate = true;
        
              let imgtree6 = document.createElement('img');
              imgtree6.src = '/src/images/trees/Arbol-8.png'
              let sprite6 = new THREE.Texture(imgtree6);
              sprite6.needsUpdate = true;
        
              
              for (let index = 0; index < treesGeo1.attributes.position.array.length / 2; index++) {
                if (count <= 3) {
                  count++
                  array.push(treesGeo1.attributes.position.array[index])
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
                      if (plans <= treesGeo1.attributes.position.array.length) {
                        plans++
                        if (threeType <= 5) {
                          threeType++
                        } else {
                          threeType = 0
                        }
                        sceneInfo.scene.add( planes );
                      } else {
                        console.log('maxima cantidad de planos')
                      }
                      
                  } else if(count === 5){
                    count = 0
                    array = []
                  }
                
                
              }
        
        
                //trees section 2
                let treesArray3 = []
                let trees3 = 0
                let treescount3 = 0
                let treeType3 = 0
                
              for (let index = 0; index < treesGeo2.attributes.position.array.length; index++) {
                if (treescount3 <= 3) {
                  treescount3++
                  treesArray3.push(treesGeo2.attributes.position.array[index])
                  //  console.log('aquii',array)
                } else if(treescount3 === 4) {
                    treescount3++
        
                      //se agrega este random para poblar el forest sin tanto sobre renderizado
                      let randomtrees = Math.random() * 10
                      if (randomtrees < 0.7) { 
                        let mat
                        switch (treeType3) {
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
                        planes.position.set(treesArray3[0] - 184, treesArray3[1] - 2, treesArray3[2] - 28)
          
                        if (scale >= 8) {
                          planes.scale.x = 10
                          planes.scale.y = 12
          
                          planes.position.setY(treesArray3[1] + 0.5)
                        } else if (scale >= 5 && scale <= 7) {
                          planes.scale.x = 7
                          planes.scale.y = 9
          
                          planes.position.setY(treesArray3[1] - 1)
                        }else if(scale <= 4 && scale >= 2.5){
                          planes.scale.x = 4
                          planes.scale.y = 6
          
                          planes.position.setY(treesArray3[1] - 2.2)
                        }else if(scale < 2.5){
                          planes.scale.x = 3
                          planes.scale.y = 4
                          planes.position.setY(treesArray3[1] - 3)
                        } else {
                          planes.scale.x = 2
                          planes.scale.y = 2
          
                          planes.position.setY(treesArray3[1] - 4)
          
                        }
                        // planes.lookAt(camera)
                        if (trees3 <= treesGeo2.attributes.position.array.length) {
                          trees3++
                          if (treeType3 <= 5) {
                            treeType3++
                          } else {
                            treeType3 = 0
                          }
          
                            sceneInfo.scene.add( planes );
                        
                        } else {
                          console.log('maxima cantidad de planos')
                        }
                      } else {
                        // console.log(randomtrees)
                      }
                      
                  } else if(treescount3 === 5){
                    treescount3 = 0
                    treesArray3 = []
                  }
                
              }
        
                //trees section 3
                let treesArray = []
                let trees = 0
                let treescount = 0
                let treeType = 0
        
              for (let index = 0; index < treesGeo3.attributes.position.array.length; index++) {
                if (treescount <= 3) {
                  treescount++
                  treesArray.push(treesGeo3.attributes.position.array[index])
                  //  console.log('aquii',array)
                } else if(treescount === 4) {
                    treescount++
        
                      //se agrega este random para poblar el forest sin tanto sobre renderizado
                      let randomtrees = Math.random() * 10
                      if (randomtrees < 7) { 
                        let mat
                        switch (treeType) {
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
                        planes.position.set(treesArray[0] - 184, treesArray[1] - 2, treesArray[2] - 28)
          
                        if (scale >= 8) {
                          planes.scale.x = 7
                          planes.scale.y = 9
          
                          planes.position.setY(treesArray[1] - 2.2)
                        } else if (scale >= 5 && scale <= 7) {
                          planes.scale.x = 7
                          planes.scale.y = 9
          
                          planes.position.setY(treesArray[1] - 1)
                        }else if(scale <= 4 && scale >= 2.5){
                          planes.scale.x = 4
                          planes.scale.y = 6
          
                          planes.position.setY(treesArray[1] - 2.2)
                        }else if(scale < 2.5){
                          planes.scale.x = 3
                          planes.scale.y = 4
                          planes.position.setY(treesArray[1] - 3)
                        } else {
                          planes.scale.x = 2
                          planes.scale.y = 2
                          planes.position.setY(treesArray[1] - 4)
                        }
                        // planes.lookAt(camera)
                        if (trees <= treesGeo3.attributes.position.array.length) {
                          trees++
                          if (treeType <= 5) {
                            treeType++
                          } else {
                            treeType = 0
                          }
          
                            sceneInfo.scene.add( planes );
                        
                        } else {
                          console.log('maxima cantidad de planos')
                        }
                      } else {
                        // console.log(randomtrees)
                      }
                      
                  } else if(treescount === 5){
                    treescount = 0
                    treesArray = []
                  }
                
              }
        
              
        
                //palms section 1
        
                const palmsCamp = sceneInfo.scene.getObjectByName('EARTH_SHRUB').children.find(e => e.name === 'Object_217')
                const palmsCamp2 = sceneInfo.scene.getObjectByName('EARTH_SHRUB').children.find(e => e.name === 'Object_218')
                const palmsCamp3 = sceneInfo.scene.getObjectByName('EARTH_SHRUB').children.find(e => e.name === 'Object_219')
        
                let palmsGeo = new THREE.BufferGeometry();
                palmsGeo.copy(palmsCamp.geometry)
        
                let palmsGeo2 = new THREE.BufferGeometry();
                palmsGeo2.copy(palmsCamp2.geometry)
        
                let palmsGeo3 = new THREE.BufferGeometry();
                palmsGeo3.copy(palmsCamp3.geometry)
        
        
                let imgPalm1 = document.createElement('img');
                imgPalm1.src = '/src/images/palms/Palma-1.png'
                let palmSprite1 = new THREE.Texture(imgPalm1);
                palmSprite1.needsUpdate = true;
        
                let imgPalm2 = document.createElement('img');
                imgPalm2.src = '/src/images/palms/Palma-2.png'
                let palmSprite2 = new THREE.Texture(imgPalm2);
                palmSprite2.needsUpdate = true;
        
                let imgPalm3 = document.createElement('img');
                imgPalm3.src = '/src/images/palms/Palma-3.png'
                let palmSprite3 = new THREE.Texture(imgPalm3);
                palmSprite3.needsUpdate = true;
        
                let imgPalm4 = document.createElement('img');
                imgPalm1.src = '/src/images/palms/Palma-4.png'
                let palmSprite4 = new THREE.Texture(imgPalm4);
                palmSprite4.needsUpdate = true;
        
                
                //palms section 1
        
                let palmsArray = []
                let palms = 0
                let palmsCount = 0
                let palmsType = 0
        
              for (let index = 0; index < palmsGeo.attributes.position.array.length; index++) {
                if (palmsCount <= 3) {
                  palmsCount++
                  palmsArray.push(palmsGeo.attributes.position.array[index])
                  //  console.log('aquii',array)
                  } else if(palmsCount === 4) {
                      palmsCount++
                      let randomtrees = Math.random() * 10
                      if (randomtrees < 5) {
                        let mat
                        switch (palmsType) {
                          case 0:
                            mat = new THREE.SpriteMaterial( {map: palmSprite1, transparent: true, alphaTest: 0.2, fog: true, opacity: 1} )
                            break;
                            
                          case 1:
                            mat = new THREE.SpriteMaterial( {map: palmSprite2, transparent: true, alphaTest: 0.2, fog: true, opacity: 1} )
                            break;
          
                          case 2:
                            mat = new THREE.SpriteMaterial( {map: palmSprite3, transparent: true, alphaTest: 0.2, fog: true, opacity: 1} )
                            break;
          
                          // case 3:
                          //   mat = new THREE.SpriteMaterial( {map: palmSprite4, transparent: true, alphaTest: 0.2, fog: true, opacity: 1} )
                          //   break;
                            
                            default:
                            mat = new THREE.SpriteMaterial( {map: palmSprite1, transparent: true, alphaTest: 0.2, fog: true, opacity: 1} )
                            break;
                        } 
                        
                        let scale = Math.random() * 10
                        let planes2 = new THREE.Sprite( mat );
                        if (scale >= 8) {
                          planes2.scale.x = 2
                          planes2.scale.y = 2
          
                          // planes2.position.setY(treesArray[1] + 0.5)
                        } else if (scale >= 5 && scale <= 7) {
                          planes2.scale.x = 1.8
                          planes2.scale.y = 1.8
          
                          // planes2.position.setY(treesArray[1] - 1)
                        }else if(scale <= 4 && scale >= 2.5){
                          planes2.scale.x = 1.5
                          planes2.scale.y = 1.5
          
                          // planes2.position.setY(treesArray[1] - 2.2)
                        }else if(scale < 2.5){
                          planes2.scale.x = 1.3
                          planes2.scale.y = 1.3
                          // planes2.position.setY(treesArray[1] - 3)
                        } else {
                          planes2.scale.x = 2.3
                          planes2.scale.y = 2.3
                          // planes2.position.setY(treesArray[1] - 4)
                        }
                        // planes2.scale.x = 1
                        // planes2.scale.y = 1
                        // planes2.lookAt(camera)
                        planes2.position.set(palmsArray[0] - 184, palmsArray[1] -4, palmsArray[2] - 28)
                        if (palms <= palmsGeo.attributes.position.array.length) {
                          palms++
                          if (palmsType <= 5) {
                            palmsType++
                          } else {
                            palmsType = 0
                          }
                          sceneInfo.scene.add( planes2 );
                        } else {
                          console.log('maxima cantidad de planos')
                        }
                      }
                      
                  } else if(palmsCount === 5){
                    palmsCount = 0
                    palmsArray = []
                  }
                
              }
        
              //palms section 2
        
        
              let palmsArray2 = []
              let palms2 = 0
              let palmsCount2 = 0
              let palmsType2 = 0
        
              for (let index = 0; index < palmsGeo2.attributes.position.array.length; index++) {
                if (palmsCount2 <= 3) {
                  palmsCount2++
                  palmsArray2.push(palmsGeo2.attributes.position.array[index])
                  //  console.log('aquii',array)
                  } else if(palmsCount2 === 4) {
                      palmsCount2++
        
                      let randomtrees = Math.random() * 10
                      if (randomtrees < 0.7) {
                        let mat
                        switch (palmsType2) {
                          case 0:
                            mat = new THREE.SpriteMaterial( {map: palmSprite1, transparent: true, alphaTest: 0.2, fog: true, opacity: 1} )
                            break;
                            
                          case 1:
                            mat = new THREE.SpriteMaterial( {map: palmSprite2, transparent: true, alphaTest: 0.2, fog: true, opacity: 1} )
                            break;
          
                          case 2:
                            mat = new THREE.SpriteMaterial( {map: palmSprite3, transparent: true, alphaTest: 0.2, fog: true, opacity: 1} )
                            break;
          
                          // case 3:
                          //   mat = new THREE.SpriteMaterial( {map: palmSprite4, transparent: true, alphaTest: 0.2, fog: true, opacity: 1} )
                          //   break;
                            
                            default:
                            mat = new THREE.SpriteMaterial( {map: palmSprite1, transparent: true, alphaTest: 0.2, fog: true, opacity: 1} )
                            break;
                        } 
        
          
                        let scale = Math.random() * 10
                        let planes2 = new THREE.Sprite( mat );
                        if (scale >= 8) {
                          planes2.scale.x = 2
                          planes2.scale.y = 2
          
                          // planes2.position.setY(treesArray[1] + 0.5)
                        } else if (scale >= 5 && scale <= 7) {
                          planes2.scale.x = 1.8
                          planes2.scale.y = 1.8
          
                          // planes2.position.setY(treesArray[1] - 1)
                        }else if(scale <= 4 && scale >= 2.5){
                          planes2.scale.x = 1.5
                          planes2.scale.y = 1.5
          
                          // planes2.position.setY(treesArray[1] - 2.2)
                        }else if(scale < 2.5){
                          planes2.scale.x = 1.3
                          planes2.scale.y = 1.3
                          // planes2.position.setY(treesArray[1] - 3)
                        } else {
                          planes2.scale.x = 2.3
                          planes2.scale.y = 2.3
                          // planes2.position.setY(treesArray[1] - 4)
                        }
                        // planes2.lookAt(camera)
                        planes2.position.set(palmsArray2[0] - 184, palmsArray2[1] - 4, palmsArray2[2] - 28)
                        if (palms2 <= palmsGeo2.attributes.position.array.length) {
                          palms2++
                          if (palmsType2 <= 5) {
                            palmsType2++
                          } else {
                            palmsType2 = 0
                          }
                          sceneInfo.scene.add( planes2 );
                        } else {
                          console.log('maxima cantidad de planos')
                        }
                      }
                      
                  } else if(palmsCount2 === 5){
                    palmsCount2 = 0
                    palmsArray2 = []
                  }
                
              }
        
              //palms section 3
        
        
              let palmsArray3 = []
              let palms3 = 0
              let palmsCount3 = 0
              let palmsType3 = 0
        
              for (let index = 0; index < palmsGeo3.attributes.position.array.length; index++) {
                if (palmsCount3 <= 3) {
                  palmsCount3++
                  palmsArray3.push(palmsGeo3.attributes.position.array[index])
                  //  console.log('aquii',array)
                  } else if(palmsCount3 === 4) {
                      palmsCount3++
                      let randomtrees = Math.random() * 10
                      if (randomtrees < 5) {
                        let mat
                        switch (palmsType3) {
                          case 0:
                            mat = new THREE.SpriteMaterial( {map: palmSprite1, transparent: true, alphaTest: 0.2, fog: true, opacity: 1} )
                            break;
                            
                          case 1:
                            mat = new THREE.SpriteMaterial( {map: palmSprite2, transparent: true, alphaTest: 0.2, fog: true, opacity: 1} )
                            break;
          
                          case 2:
                            mat = new THREE.SpriteMaterial( {map: palmSprite3, transparent: true, alphaTest: 0.2, fog: true, opacity: 1} )
                            break;
          
                          // case 3:
                          //   mat = new THREE.SpriteMaterial( {map: palmSprite4, transparent: true, alphaTest: 0.2, fog: true, opacity: 1} )
                          //   break;
                            
                            default:
                            mat = new THREE.SpriteMaterial( {map: palmSprite1, transparent: true, alphaTest: 0.2, fog: true, opacity: 1} )
                            break;
                        } 
          
                        let planes2 = new THREE.Sprite( mat );
                        planes2.scale.x = 1.4
                        planes2.scale.y = 1.4
                        // planes2.lookAt(camera)
                        planes2.position.set(palmsArray3[0] - 184, palmsArray3[1] -4, palmsArray3[2] - 28)
                        if (palms3 <= palmsGeo2.attributes.position.array.length) {
                          palms3++
                          if (palmsType3 <= 5) {
                            palmsType3++
                          } else {
                            palmsType3 = 0
                          }
                          sceneInfo.scene.add( planes2 );
                        } else {
                          console.log('maxima cantidad de planos')
                        }
                      }
                      
                  } else if(palmsCount3 === 5){
                    palmsCount3 = 0
                    palmsArray3 = []
                  }
                
              }
    
    
    })
    
    
    points.then((gltf) => {
        sceneInfo.scene.add(gltf)
      })
      
    pasillo.then((gltf) => {
        sceneInfo.scene.add(gltf)
    })
    
    orchids1.then((gltf) => {
        sceneInfo.scene.add(gltf)
    })
    orchids2.then((gltf) => {
        sceneInfo.scene.add(gltf)
    
        //textures settings
          
        const earthTexture = new THREE.TextureLoader().load('https://i.ibb.co/f95zZL9/Textures-Com-Grass0153-2-seamless-S.jpg')
        const woodTexture = new THREE.TextureLoader().load('https://i.ibb.co/wzVk7Ps/WOOD-01.png')
        const woodTexture2 = new THREE.TextureLoader().load('https://i.ibb.co/TcZgxcg/Walnut-dark-100-DP.jpg')
        const concreteTexture = new THREE.TextureLoader().load('https://i.ibb.co/LknZNmz/Concrete-blocks-675-DB.jpg')
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
        sceneInfo.scene.getObjectByName('WOOD_PATH_2').children.map(e => e.material = mapWoodFloor2)
        sceneInfo.scene.getObjectByName('WOOD_PATH_2').children.map(e => e.material = mapWoodFloor2)
        sceneInfo.scene.getObjectByName('PATH_CONCRETE').children.map(e => e.material = mapConcreteFloor)
        sceneInfo.scene.getObjectByName('EARTH_SHRUB').children.map(e => e.material = mapGrassyFloor)
        sceneInfo.scene.getObjectByName('EARTH_TREES').children.map(e => e.material = mapGrassyFloor2)
        sceneInfo.scene.getObjectByName('METAL_01').children.map(e => e.material = mapGalvanizedTextureFloor)
    
        const pointer = new THREE.Vector2(300, 300)
    
        function onPointerMove( event ) {
          
          pointer.x = ( event.clientX / window.innerWidth ) * 2 - 1;
          pointer.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
        }
        
        window.addEventListener( 'pointermove',  onPointerMove );
        
        
        const timeline = new gsap.timeline({
          defaults: {
            duration: 1
          }
        })
        
        
        const gsapAnimations = (mesh) => {
          
          let point = sceneInfo.scene.getObjectByName(mesh)
        
        
            timeline.to(orbitControls.target,{
                x: point.geometry.attributes.position.array[0] - 184,
                y: point.geometry.attributes.position.array[1] - 3.2,
                z: point.geometry.attributes.position.array[2] - 28,
            })
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
            }
        
            let pointsNames = ['Object_245', 'Object_244', 'Object_246', 'Object_229', 'Object_273', 'Object_228', 'Object_239', 'Object_270', 'Object_261', 'Object_269', 'Object_252', 'Object_253', 'Object_254', 'Object_236', 'Object_268', 'Object_227', 'Object_241', 'Object_243', 'Object_242', 'Object_237', 'Object_255', 'Object_238', 'Object_258', 'Object_240', 'Object_257', 'Object_225', 'Object_256', 'Object_224', 'Object_264', 'Object_221', 'Object_265', 'Object_235', 'Object_271', 'Object_272', 'Object_234', 'Object_262', 'Object_226', 'Object_233', 'Object_267', 'Object_263', 'Object_266', 'Object_232', 'Object_260', 'Object_249', 'Object_251', 'Object_250', 'Object_231', 'Object_259', 'Object_230', 'Object_247', 'Object_248', 'Object_222']
            let orchidsNames = ['Box001_3', 'Box001_8', 'Box001_6', 'Box001_2', 'Box001_7', 'Box001_4', 'Box001_5', 'Box001']
        
            let objects = []
            
        
            pointsNames.map((p) => {
              let cube = sceneInfo.scene.getObjectByName('PATH_POINT').children.find(e => e.name === p)
              objects.push(cube)
            })
        
            orchidsNames.map((p) => {
              let orchid = sceneInfo.scene.getObjectByName(p)
              if (orchid) {
                objects.push(orchid)
              }
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
    
                    case 'Box001_3':
                      
                      modal.style.display = 'flex'
                      
                      console.log('click on a orchids')
    
                      return meshCurrentClick = null 
    
                    case 'Box001_8':
    
                      modal.style.display = 'flex'
    
    
                      return meshCurrentClick = null 
    
                    case 'Box001_6':
    
                      modal.style.display = 'flex'
    
    
                      return meshCurrentClick = null 
    
                    case 'Box001_2':
    
                      modal.style.display = 'flex'
    
    
                      return meshCurrentClick = null 
    
                    case 'Box001_7':
    
                      modal.style.display = 'flex'
    
    
                      return meshCurrentClick = null 
    
                    case 'Box001_4':
    
                      modal.style.display = 'flex'
    
    
                      return meshCurrentClick = null 
    
                    case 'Box001_5':
    
                      modal.style.display = 'flex'
    
    
                      return meshCurrentClick = null 
    
                    case 'Box001':
    
                      modal.style.display = 'flex'
    
    
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
    }).then(() => {
      document.getElementById('loadText').innerHTML = 'Loading complete!'
      document.getElementById('loadingCircle').style.display = 'none'
      
      let playButton = document.getElementById('playButton')
      playButton.style.display = 'block'
    
      const timeline = new gsap.timeline({
        defaults: {
          duration: 10
        }
      })
      
      playButton.addEventListener('click', () => {
        
        fadeOut(document.querySelector('#loader'))
        setTimeout(() => {
          document.getElementById('loader').style.display = 'none'
        }, 2000);
    
        timeline.to(orbitControls.target,{
          x: -214,
          y: 0,
          z: 0,
        })
    
        // orbitControls.update()
      })
      console.log( 'Loading complete!');
    })

    return () => {
      renderer.render(sceneInfo.scene, sceneInfo.camera)
      orbitControls.update();
    }
    
}

function secondaryScene(elem) {


  const fov = 45;
  const aspect = 2;  // the canvas default
  const near = 0.1;
  const far = 20;
  const camera3 = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera3.position.set(-5, 6, 0);

  const sceneInfo = makeScene(elem, camera3);

  let pointLight = new THREE.PointLight( 0xffffff);
  pointLight.intensity = 10
  pointLight.distance = 10
  // currentLight.position.setY(currentLight.position.y + 6)
  pointLight.position.set(2,8,2);

  const pointLightHelper = new THREE.PointLightHelper( pointLight, 1 );
  
  sceneInfo.scene.add(pointLight)
  // sceneInfo.scene.add(pointLightHelper)
  
  orchidText.then((gltf) => {
    sceneInfo.scene.add(gltf)

  })
      const controls = new THREE.TrackballControls(camera3, document.getElementById('modal3d'));
      controls.rotateSpeed = 0.5;
      controls.noPan = true;
      

      const radius = .8;
      const widthSegments = 4;
      const heightSegments = 2;
      const geometry = new THREE.SphereBufferGeometry(radius, widthSegments, heightSegments);
      const material = new THREE.MeshPhongMaterial({
        color: 'blue',
        flatShading: false,
      });
      const mesh = new THREE.Mesh(geometry, material);
      // sceneInfo.scene.add(light)
      // sceneInfo.scene.add(mesh);

      let modal = document.getElementById('modal3d')
      let closeBotton = document.getElementById('modal3dClose')

      closeBotton.addEventListener('click', () => {
          // sceneInfo.scene.clear()
          modal.style.display = 'none'
      })

      return () => {
        renderer.render(sceneInfo.scene, sceneInfo.camera)
        controls.handleResize();
        controls.update();
      };


}

document.querySelectorAll('[data-diagram]').forEach((elem) => {
  const sceneName = elem.dataset.diagram;
  if (sceneName === 'box') {
    const sceneRenderFunction = principalScene();
    addScene(elem, sceneRenderFunction);
  } else if (sceneName === 'modal3d') {
    const sceneRenderFunction = secondaryScene();
    addScene(elem, sceneRenderFunction);
  }
});

function render(time) {
  time *= 0.001;

  for (const {elem, fn, ctx} of sceneElements) {
    // get the viewport relative position opf this element
    const rect = elem.getBoundingClientRect();
    const {left, right, top, bottom, width, height} = rect;
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
      ctx.globalCompositeOperation = 'copy';
      ctx.drawImage(
          rendererCanvas,
          0, rendererCanvas.height - height, width, height,  // src rect
          0, 0, width, height);                              // dst rect
    }
  }
}


loopMachine.addCallback(() => {

    stats.update()
    render()
    // renderer.render(scene, camera)
    // rendenerSceneInfo(myscene2, camera2)
    // rendenerSceneInfo(myscene, camera)
});



loopMachine.start()

// console.log(scene, camera, renderer);