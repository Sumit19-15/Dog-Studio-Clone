import { useEffect, useRef } from "react";
import * as THREE from "three";
import { useThree } from "@react-three/fiber";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { useGLTF, useTexture, useAnimations } from "@react-three/drei";

const Dog = () => {
  gsap.registerPlugin(useGSAP());
  gsap.registerPlugin(ScrollTrigger);

  const model = useGLTF("/models/dog.drc.glb");
  useThree(({ camera, gl }) => {
    camera.position.z = 0.34;
    camera.position.y = 0.05;
    gl.toneMapping = THREE.ReinhardToneMapping;
    gl.outputColorSpace = THREE.SRGBColorSpace;
  });

  // now animation
  const { actions } = useAnimations(model.animations, model.scene);
  useEffect(() => {
    actions["Take 001"].play();
  }, [actions]);

  //adding texture to dog components
  const [normalMap, sampleMatCap] = useTexture([
    "/dog_normals.jpg",
    "matcap/mat-2.png",
  ]).map((texture) => {
    texture.flipY = false;
    texture.colorSpace = THREE.SRGBColorSpace;
    return texture;
  });

  // adding texture to branches
  const [branchMap, branchNormalMap] = useTexture([
    "/branches_diffuse.jpg",
    "/branches_normals.jpg",
  ]).map((texture) => {
    texture.colorSpace = THREE.SRGBColorSpace;
    return texture;
  });

  // material for dog components
  const dogMaterial = new THREE.MeshMatcapMaterial({
    normalMap: normalMap,
    matcap: sampleMatCap, // fake lighting effect
  });

  // material for branches
  const branchMaterial = new THREE.MeshMatcapMaterial({
    normalMap: branchNormalMap,
    map: branchMap, // real color effect
  });

  // traverse all the object of the model
  model.scene.traverse((child) => {
    if (child.name.includes("DOG")) {
      child.material = dogMaterial;
    } else {
      child.material = branchMaterial;
    }
  });

  const dogModel = useRef(model);
  // scrolling animation
  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#section-1",
        endTrigger: "#section-3",
        start: "top top",
        end: "bottom bottom",
        scrub: true,
      },
    });

    tl.to(dogModel.current.scene.position, {
      z: "-=0.75",
      y: "+=0.1",
    })
      .to(dogModel.current.scene.rotation, {
        x: `+=${Math.PI / 15}`,
      })
      .to(
        dogModel.current.scene.rotation,
        {
          y: `-=${Math.PI}/1.2`,
        },
        "thrid",
      )
      .to(
        dogModel.current.scene.position,
        {
          x: "-=0.45",
          z: "+=0.25",
          y: "+=0.03",
        },
        "thrid",
      );
  }, []);

  return (
    <>
      <primitive
        object={model.scene}
        position={[0.15, -0.54,0.05]}
        rotation={[-0.2, Math.PI / 5.5, -0.06]}
      ></primitive>
      <directionalLight position={[0, 5, 5]} color={0xffffff} intensity={10} />
    </>
  );
};

export default Dog;

// useThree is the hook for control over the site
// this hook has callback which has camera , scene , gl gl = renderer
// useGLTF hook is used to allow to load the model in scene
// by default 3js shows us fade colors
// useAnimations is the hook for animation of the model
// now for scrolling animation gsap
