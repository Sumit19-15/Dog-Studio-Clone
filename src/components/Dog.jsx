import React from "react";
import * as THREE from "three";
// this is the thing which renderer return as dom element i.e what three js camera is seeing
import { useThree } from "@react-three/fiber";
import { OrbitControls, useGLTF, useTexture } from "@react-three/drei";
import { texture } from "three/tsl";

function Dog() {
  const model = useGLTF("/models/dog.drc.glb");
  useThree(({ scene, camera, gl }) => {
    camera.position.z = 0.5;
    gl.toneMapping = THREE.ReinhardToneMapping;
    gl.outputColorSpace = THREE.SRGBColorSpace;
  });

  // basically we added the texture of the model instead of that huge code by simple jpg image
  // const textures = useTexture({
  //   normalMap: "/dog_normals.jpg",
  //   sampleMatCap: "matcap/mat-2.png",
  // });

  // read that how fliping images help
  // textures.normalMap.flipY = false;
  // textures.sampleMatCap.colorSpace = THREE.SRGBColorSpace; // to load  in hd format not define old style

  // another way to prevent repeating coding

  const [normalMap, sampleMatCap] = useTexture([
    "/dog_normals.jpg",
    "matcap/mat-2.png",
  ]).map((texture) => {
    texture.flipY = false;
    texture.colorSpace = THREE.SRGBColorSpace;
    return texture;
  });

  // traverse all the object of the model
  model.scene.traverse((child) => {
    if (child.name.includes("DOG")) {
      child.material = new THREE.MeshMatcapMaterial({
        normalMap: normalMap,
        matcap: sampleMatCap,
      });
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
