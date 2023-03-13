import React, { useRef, useMemo, useState, useEffect } from 'react';
import logo from './logo.svg';
import marble from './osm-test.png'
import './App.css';
import * as THREE from 'three';
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber'
import { MeshBasicMaterial, ShaderMaterial, SphereGeometry, TextureLoader, Vector3, PerspectiveCamera as PovCamera } from 'three';
import { PerspectiveCamera, OrbitControls } from '@react-three/drei'
import { fragmentSource, vertexSource } from './mercator'
import { OpenSeaDragonViewer, globalViewer } from './openSeaDragon';
import { Rect } from 'openseadragon';
import { text } from 'stream/consumers';

interface IProps {
}

interface IState {
  count: number;
}

function Globe(props: any) {
  const canvasParent = document.getElementsByClassName("openseadragon-canvas")[0];
  const canvas = canvasParent?.childNodes[0];
  const mesh = useRef<THREE.Mesh>();
  //const texture = useLoader(TextureLoader, marble);
  const texture = new THREE.CanvasTexture(canvas as HTMLCanvasElement, THREE.UVMapping, THREE.ClampToEdgeWrapping, THREE.ClampToEdgeWrapping)
  const material = useRef<any>() as React.MutableRefObject<ShaderMaterial>;
  useFrame((state, delta) => {
    const zoom = globalViewer?.viewport.getZoom()!;
    const b = globalViewer?.viewport.getBounds()!;
    material.current.uniforms.zoom = { value: zoom };
    material.current.uniforms.left = { value: Math.max(b.x, 0) };
    const bottom = 1 - (b.y + b.height);
    //console.log(bottom);
    material.current.uniforms.bottom = { value: Math.max(bottom, 0) };
    texture.needsUpdate = true;
  });

  const data = useMemo(
    () => ({
      uniforms: { ourTexture: { value: texture }, zoom: { value: 1 } },
      fragmentShader: fragmentSource,
      vertexShader: vertexSource,
      glslVersion: THREE.GLSL3
    }),
    []
  )
  return (
    <mesh
      {...props}
      ref={mesh}>
      <sphereGeometry args={[1, 40, 40]} />
      <shaderMaterial ref={material} {...data} />
    </mesh>
  )
}

function Camera() {
  useFrame(() => {
    const w = 0.2;
    let h = 0.2;
    let y = Math.acos(camera.current?.position.y! / 2) - Math.PI/2;
    y = Math.log(Math.tan(Math.PI/4 + (y / 2.0))); 
    y = (y + Math.PI) / (2*Math.PI);
    console.log(y);
    h = h+ h*(y-0.5)
   
    //console.log(times);
    //console.log(camera.current?.position.z);
    const x = 0.5-(Math.atan2(camera.current?.position.z! / 2, camera.current?.position.x! / 2) / Math.PI)/2;
    h= Math.min(h, 1-x)
    globalViewer?.viewport.fitBounds(new Rect(Math.max(x-(w/2), 0), Math.max(y-(h/2),0), w, h),false)
  });
  const camera = useRef<PovCamera>();
  return (<PerspectiveCamera
    ref={camera}
    makeDefault={true}
    fov={40}
    position={[0, 0, 2]}
  />)
}

function App() {
  const deg2rad = (degrees: number) => degrees * (Math.PI / 180);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true)
  });
  let canvas = null;
  if (loaded) {
    canvas = (<div className='canvas-container'>
      <Canvas>
        <Globe position={[0, 0, 0]} />
        <Camera />
        <OrbitControls enableZoom={false} />
      </Canvas>
    </div>);
  }
  return (
    <div className="App">
      <header className="App-header">
        {canvas}
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
        </a>
        <OpenSeaDragonViewer />
      </header>
    </div>
  );
}


export default App;
