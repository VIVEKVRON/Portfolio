"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function OrbitCloud({ color = "#ffffff" }: { color?: string }) {
  const pointsRef = useRef<THREE.Points>(null);
  const groupRef = useRef<THREE.Group>(null);

  const [positions] = useMemo(() => {
    const particleCount = 2000;
    const pos = new Float32Array(particleCount * 3);
    
    // Create 4 intersecting rings
    for (let i = 0; i < particleCount; i++) {
      const ringIndex = i % 4;
      const angle = Math.random() * Math.PI * 2;
      const radius = 2.0;
      
      // Scatter points slightly off the exact mathematical ring
      const noise = (Math.random() - 0.5) * 0.2;
      const r = radius + noise;

      let x = 0, y = 0, z = 0;

      // Distribute points across 4 different orbital planes
      if (ringIndex === 0) {
        x = r * Math.cos(angle);
        y = r * Math.sin(angle);
        z = noise;
      } else if (ringIndex === 1) {
        x = r * Math.cos(angle);
        z = r * Math.sin(angle);
        y = noise;
      } else if (ringIndex === 2) {
        y = r * Math.cos(angle);
        z = r * Math.sin(angle);
        x = noise;
      } else {
        // Diagonal ring
        x = r * Math.cos(angle) * 0.707;
        y = r * Math.cos(angle) * 0.707;
        z = r * Math.sin(angle);
      }

      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;
    }
    return [pos];
  }, []);

  useFrame((state, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.x += delta * 0.1;
      pointsRef.current.rotation.y += delta * 0.2;
      pointsRef.current.rotation.z -= delta * 0.05;
    }
    if (groupRef.current) {
      // Breathing effect
      const scale = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.05;
      groupRef.current.scale.set(scale, scale, scale);

      // Mouse tracking
      const targetX = state.pointer.y * 0.5;
      const targetY = state.pointer.x * 0.5;
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetX, 0.05);
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetY, 0.05);
    }
  });

  return (
    <group ref={groupRef}>
      <points ref={pointsRef}>
        <bufferGeometry>
          {/* @ts-ignore */}
          <bufferAttribute
            attach="attributes-position"
            count={positions.length / 3}
            array={positions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.03}
          color={color}
          sizeAttenuation={true}
          transparent={true}
          opacity={0.8}
        />
      </points>
    </group>
  );
}

export default function OrbitSphere({ 
  color = "#ffffff", 
  className = "",
  cameraZ = 6 
}: { 
  color?: string; 
  className?: string;
  cameraZ?: number;
}) {
  return (
    <div className={`w-full h-full ${className}`}>
      <Canvas camera={{ position: [0, 0, cameraZ], fov: 45 }}>
        <OrbitCloud color={color} />
      </Canvas>
    </div>
  );
}
