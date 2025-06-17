import React, { useState } from 'react';
import axios from 'axios';
import * as THREE from 'three';
import './App.css';

const App = () => {
  const [image, setImage] = useState(null);
  const [caption, setCaption] = useState('');
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleGenerateCaption = async () => {
    if (!image) return;

    setLoading(true);

    // Create FormData to send image file to the server
    const formData = new FormData();
    formData.append('image', image);

    try {
      // Make API request to Flask backend
      const response = await axios.post('http://127.0.0.1:5000/generate_caption', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Set the generated caption
      setCaption(response.data.caption);
    } catch (error) {
      console.error("Error generating caption:", error);
    }

    setLoading(false);
  };

  // Three.js Animation
  const create3DEffect = () => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    camera.position.z = 5;

    const animate = () => {
      requestAnimationFrame(animate);
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
      renderer.render(scene, camera);
    };

    animate();
  };

  React.useEffect(() => {
    create3DEffect();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Image Caption Generator</h1>
        <input type="file" onChange={handleImageChange} />
        <button onClick={handleGenerateCaption} disabled={loading}>
          {loading ? 'Generating...' : 'Generate Caption'}
        </button>

        {caption && (
          <div>
            <h2>Generated Caption:</h2>
            <p>{caption}</p>
            <button onClick={() => navigator.clipboard.writeText(caption)}>
              Copy Caption
            </button>
          </div>
        )}
      </header>
    </div>
  );
};

export default App;
