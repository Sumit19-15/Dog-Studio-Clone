import React from "react";
// this is the thing which renderer return as dom element i.e what three js camera is seeing
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
function Dog() {
  const model = useGLTF("/models/dog.drc.glb");
  return (
    <>
      <primitive object={model.scene} position={[0, 0, 0]}></primitive>
      <directionalLight position={[0, 5, 5]} color={0 * fffff} intensity={10} />
      <OrbitControls/>
    </>
  );
}

export default Dog;

// useThree is the hook for control over the site
// this hook has callback which has camera , scene , gl gl = renderer
// useGLTF hook is used to allow to load the model in scene
