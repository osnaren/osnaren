'use client';

import { Environment, Float, Stars } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';

function generateParticles(count: number) {
  const temp = [];
  for (let i = 0; i < count; i++) {
    const time = Math.random() * 100;
    const speed = Math.random() * 0.01 + 0.001;
    const x = Math.random() * 100 - 50;
    const y = Math.random() * 100 - 50;
    const z = Math.random() * 100 - 50;

    temp.push({ time, speed, x, y, z });
  }
  return temp;
}

function Particles({ count = 100 }) {
  const mesh = useRef<THREE.InstancedMesh>(null);

  const particles = useMemo(() => generateParticles(count), [count]);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame((state) => {
    if (!mesh.current) return;

    particles.forEach((particle, i) => {
      const { time, x, y, z } = particle;

      // Update time
      // particle.time += speed; // Mutating derived data directly isn't persistent in this scope usually,
      // but for simplicity in this frame loop we calculate dynamic position based on state.clock

      const t = state.clock.getElapsedTime() * 0.2 + time;

      // Floating motion
      dummy.position.set(
        x + Math.cos((t * particle.speed * 10) / 10) * 2 + Math.sin(t * 1) * 2,
        y + Math.sin((t * particle.speed * 10) / 10) * 2 + Math.cos(t * 2) * 2,
        z + Math.cos((t * particle.speed * 10) / 10) * 2 + Math.sin(t * 3) * 2
      );

      // Rotate particles slightly
      dummy.rotation.set(Math.sin(t), Math.cos(t), Math.sin(t));

      const scale = (Math.sin(t * 2) + 2) * 0.2;
      dummy.scale.set(scale, scale, scale);

      dummy.updateMatrix();
      mesh.current!.setMatrixAt(i, dummy.matrix);
    });
    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <>
      <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
        <dodecahedronGeometry args={[1, 0]} />
        <meshPhysicalMaterial color="#888888" roughness={0.5} metalness={0.8} />
      </instancedMesh>
    </>
  );
}

export default function ThreeBackground() {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 30], fov: 45 }}>
        <fog attach="fog" args={['#000', 20, 50]} />
        <color attach="background" args={['#0a0a0a']} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#fff" />
        <Particles count={200} />
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        <Environment preset="city" />
        <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
          <mesh position={[0, 0, -5]}>
            <torusKnotGeometry args={[5, 1.5, 200, 32]} />
            <meshStandardMaterial color="#333" wireframe transparent opacity={0.05} />
          </mesh>
        </Float>
      </Canvas>
    </div>
  );
}
