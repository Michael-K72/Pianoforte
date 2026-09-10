"use client";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Lightformer, useGLTF } from "@react-three/drei";
import { Suspense, useEffect, useMemo, useRef } from "react";
import { Box3, Color, Group, MathUtils, Mesh, MeshPhysicalMaterial, MeshStandardMaterial, Vector3 } from "three";
const shots = [
  {p:[5.0,3.25,6.25],t:[0,1.0,0]},
  {p:[.5,2.5,4.6],t:[0,1.14,.8]},
  {p:[-1.9,4.7,2.0],t:[0,1.15,-.15]},
  {p:[2.15,1.0,4.0],t:[0,.5,.75]}
];
function Piano({ onReady }: { onReady: () => void }) {
  const gltf=useGLTF("/models/grand-piano.glb","/draco/");
  const prepared=useMemo(()=>{
    const scene=gltf.scene.clone(true);
    const owned:MeshStandardMaterial[]=[];
    scene.traverse(obj=>{
      if(!(obj instanceof Mesh))return;
      obj.castShadow=false;obj.receiveShadow=false;
      const source=obj.material as MeshStandardMaterial;
      if(source.name==="piano_cor"){
        const lacquer=new MeshPhysicalMaterial({name:source.name,color:new Color("#111214"),metalness:.12,roughness:.19,clearcoat:1,clearcoatRoughness:.12});
        obj.material=lacquer;owned.push(lacquer);
      } else {const material=source.clone(); material.envMapIntensity=.85;obj.material=material;owned.push(material);}
    });
    const bounds=new Box3().setFromObject(scene);
    const center=bounds.getCenter(new Vector3());scene.position.set(-center.x,-bounds.min.y,-center.z);
    return {scene,owned};
  },[gltf.scene]);
  useEffect(()=>{onReady();return()=>prepared.owned.forEach(m=>m.dispose());},[onReady,prepared]);
  return <primitive object={prepared.scene}/>;
}
function CameraJourney({progress,active,reduced}:{progress:number;active:boolean;reduced:boolean}){
  const {invalidate}=useThree();
  const look=useRef(new Vector3(0,1,0));
  const destination=useRef(new Vector3());
  const target=useRef(new Vector3());
  const group=useRef<Group>(null);
  useEffect(()=>{if(active)invalidate();},[progress,active,reduced,invalidate]);
  useFrame(({camera,size},delta)=>{
    if(!active)return;
    const p=MathUtils.clamp(progress,0,1)*3;
    const index=Math.min(2,Math.floor(p));const blend=p-index;
    const smooth=blend*blend*(3-2*blend);
    destination.current.fromArray(shots[index].p).lerp(new Vector3().fromArray(shots[index+1].p),smooth);
    target.current.fromArray(shots[index].t).lerp(new Vector3().fromArray(shots[index+1].t),smooth);
    if(size.width<650){destination.current.sub(target.current).multiplyScalar(1.14).add(target.current);}
    const ease=reduced?1:1-Math.exp(-Math.min(delta,.05)*5);
    camera.position.lerp(destination.current,ease);look.current.lerp(target.current,ease);camera.lookAt(look.current);
    if(camera.position.distanceTo(destination.current)>.002||look.current.distanceTo(target.current)>.002)invalidate();
  });
  return <group ref={group}/>;
}
export function GrandPianoScene({progress,active,reduced,onReady}:{progress:number;active:boolean;reduced:boolean;onReady:()=>void}){
  return <Canvas className="grand-piano-webgl" frameloop={active?"demand":"never"} dpr={[1,1.5]} camera={{position:[5,3.25,6.25],fov:36,near:.1,far:40}} gl={{alpha:true,antialias:true,powerPreference:"low-power"}} aria-hidden="true">
    <ambientLight intensity={.28} color="#eadfd0"/>
    <directionalLight position={[2,5,4]} intensity={2.6} color="#ffecd5"/>
    <directionalLight position={[-4,3,-2]} intensity={1.6} color="#c5cfdb"/>
    <spotLight position={[3,6,-3]} intensity={38} angle={.7} penumbra={1} color="#dfb66c"/>
    <Suspense fallback={null}>
      <Environment resolution={128} frames={1}>
        <Lightformer form="rect" intensity={3} color="#fff5df" position={[0,6,0]} rotation={[Math.PI/2,0,0]} scale={[6,3,1]}/>
        <Lightformer form="rect" intensity={2} color="#f4e6d0" position={[-4,2,1]} rotation={[0,Math.PI/2,0]} scale={[2,5,1]}/>
        <Lightformer form="rect" intensity={1.2} color="#c7d5ed" position={[3,2,-3]} rotation={[0,-Math.PI/4,0]} scale={[2,4,1]}/>
      </Environment>
      <Piano onReady={onReady}/>
    </Suspense>
    <CameraJourney progress={progress} active={active} reduced={reduced}/>
  </Canvas>;
}
