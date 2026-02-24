import React, { useEffect } from "react";
import * as THREE from "three";
// this is the thing which renderer return as dom element i.e what three js camera is seeing
import { useThree } from "@react-three/fiber";
import {
  OrbitControls,
  useGLTF,
  useTexture,
  useAnimations,
} from "@react-three/drei";
import { texture } from "three/tsl";

function Dog() {
  const model = useGLTF("/models/dog.drc.glb");
  useThree(({ scene, camera, gl }) => {
    camera.position.z = 0.5;
    gl.toneMapping = THREE.ReinhardToneMapping;
    gl.outputColorSpace = THREE.SRGBColorSpace;
  });

  // now animation 4or5 part
  const { actions } = useAnimations(model.animations, model.scene);
  useEffect(() => {
    actions["Take 001"].play(); // take 001 is the animation store in the model
  }, [actions]);

  // basically we added the texture of the model instead of that huge code by simple jpg image
  // const textures = useTexture({
  //   normalMap: "/dog_normals.jpg",
  //   sampleMatCap: "matcap/mat-2.png",
  // });

  // read that how fliping images help
  // textures.normalMap.flipY = false;
  // textures.sampleMatCap.colorSpace = THREE.SRGBColorSpace; // to load  in hd format not define old style

  // another way to prevent repeating coding
  // adding texture to model and branches
  const [normalMap, sampleMatCap, branchMap, branchNormalMap] = useTexture([
    "/dog_normals.jpg",
    "matcap/mat-2.png",
    "/branches_diffuse.jpg",
    "/branches_normals.jpg",
  ]).map((texture) => {
    texture.flipY = false;
    texture.colorSpace = THREE.SRGBColorSpace;
    return texture;
  });

  // if u travers for all child just below it provide calculatio to every child so stroe that in variable
  const dogMaterial = new THREE.MeshMatcapMaterial({
    normalMap: normalMap,
    matcap: sampleMatCap, // fake lighting effect hai
  });

  // material for branches
  const branchMaterial = new THREE.MeshMatcapMaterial({
    normalMap: branchNormalMap,
    map: branchMap, // ye real color effect
  });

  // traverse all the object of the model
  model.scene.traverse((child) => {
    if (child.name.includes("DOG")) {
      child.material = dogMaterial;
    } else {
      child.material = branchMaterial;
    }
  });

  return (
    <>
      <primitive
        object={model.scene}
        position={[0.15, -0.6, 0]}
        rotation={[0, Math.PI / 4, 0]}
      ></primitive>
      <directionalLight position={[0, 5, 5]} color={0xffffff} intensity={10} />
      <OrbitControls />
    </>
  );
}

export default Dog;

// useThree is the hook for control over the site
// this hook has callback which has camera , scene , gl gl = renderer
// useGLTF hook is used to allow to load the model in scene
// by default 3js shows us fade colors
// useAnimations is the hook for animation of the model
