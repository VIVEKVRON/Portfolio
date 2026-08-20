"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function DoubleSphereCloud({ color = "#ffffff" }: { color?: string }) {
  const pointsRef = useRef<THREE.Points>(null);
  const groupRef = useRef<THREE.Group>(null);

  const [positions] = useMemo(() => {
    const particleCount = 3000;
    const pos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = 2 * Math.PI * u;
      const phi = Math.acos(2 * v - 1);
      
      // 30% points in inner core, 70% in outer shell
      const isInner = Math.random() > 0.7;
      let r = isInner ? 1.0 : 2.0;

      // Create holes in the outer shell
      if (!isInner) {
         if (Math.sin(theta * 3) * Math.cos(phi * 3) > 0.5) {
             r = 0; // skip point
         }
      }

      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);

      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;
    }
    return [pos];
  }, []);

  useFrame((state, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y -= delta * 0.15;
      pointsRef.current.rotation.z += delta * 0.05;
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
          <bufferAttribute
            attach="attributes-position"
            count={positions.length / 3}
            array={positions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.02}
          color={color}
          sizeAttenuation={true}
          transparent={true}
          opacity={0.8}
        />
      </points>
    </group>
  );
}

export default function ComplexSphere({ 
  color = "#ffffff", 
  className = "",
  cameraZ = 5 
}: { 
  color?: string; 
  className?: string;
  cameraZ?: number;
}) {
  return (
    <div className={`w-full h-full ${className}`}>
      <Canvas camera={{ position: [0, 0, cameraZ], fov: 45 }}>
        <DoubleSphereCloud color={color} />
      </Canvas>
    </div>
  );
}
