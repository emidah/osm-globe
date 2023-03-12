import React from 'react';
import logo from './logo.svg';
import './App.css';
import * as THREE from 'three';

class App extends React.Component {
  componentDidMount() {
    const canvas = document.querySelector('#c')!;
    const renderer = new THREE.WebGLRenderer({antialias: true, canvas});
    const camera = new THREE.PerspectiveCamera(75, 2, 0.1);
    camera.position.z = 2;
    const scene = new THREE.Scene();
    const geometry = new THREE.SphereGeometry(1, 40, 20);
    const material = new THREE.MeshBasicMaterial({color: 0x44aa88});
    const ball = new THREE.Mesh(geometry, material);
    scene.add(ball);
    renderer.render(scene, camera);
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <canvas id="c"></canvas>
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;
