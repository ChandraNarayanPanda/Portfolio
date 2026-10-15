import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";

function Shape({ position, color, scale = 1 }) {
  const ref = useRef();
  useFrame((_, delta) => {
    ref.current.rotation.x += delta * 0.3;
    ref.current.rotation.y += delta * 0.4;
  });
  return (
    <Float speed={2} floatIntensity={1.5}>
      <mesh ref={ref} position={position} scale={scale}>
        <icosahedronGeometry args={[1, 0]} />
        <meshStandardMaterial color={color} wireframe />
      </mesh>
    </Float>
  );
}

export default function Scene3D() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 6], fov: 50 }} dpr={[1, 1.5]}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[3, 3, 3]} intensity={1.5} />
        <Shape position={[-3, 1, 0]} color="#d4ff3a" scale={1.2} />
        <Shape position={[3, -1, -1]} color="#7c5cff" scale={1.6} />
        <Shape position={[0, 2, -3]} color="#ffffff" scale={0.8} />
      </Canvas>
    </div>
  );
}