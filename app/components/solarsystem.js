// components/SolarSystem.js

import { useEffect, useRef } from "react";
import * as THREE from "three";

function SolarSystem() {
  const mountRef = useRef(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    // Sun
    const sunGeometry = new THREE.SphereGeometry(2, 32, 32);
    const sunMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 });
    const sun = new THREE.Mesh(sunGeometry, sunMaterial);
    scene.add(sun);

    // Planet
    const planetGeometry = new THREE.SphereGeometry(0.5, 32, 32);
    const planetMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const planet = new THREE.Mesh(planetGeometry, planetMaterial);
    planet.position.x = 5;
    scene.add(planet);

    // Moon (orbiting the planet)
    const moonGeometry = new THREE.SphereGeometry(0.2, 32, 32);
    const moonMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const moon = new THREE.Mesh(moonGeometry, moonMaterial);
    moon.position.x = 6;
    scene.add(moon);

    camera.position.z = 15;

    const animate = function () {
      requestAnimationFrame(animate);

      // Rotate the sun for a dynamic effect
      sun.rotation.y += 0.005;

      // Planet orbiting the sun
      planet.position.x = 5 * Math.cos(Date.now() * 0.001);
      planet.position.z = 5 * Math.sin(Date.now() * 0.001);

      // Moon orbiting the planet
      moon.position.x =
        5 * Math.cos(Date.now() * 0.001) + 1 * Math.cos(Date.now() * 0.005);
      moon.position.z =
        5 * Math.sin(Date.now() * 0.001) + 1 * Math.sin(Date.now() * 0.005);

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef}></div>;
}

export default SolarSystem;
