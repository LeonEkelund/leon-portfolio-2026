"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, Environment, Float, Center, PerspectiveCamera } from "@react-three/drei";
import { Suspense, useState, useEffect } from "react";

function Sandshrew() {
  const { scene } = useGLTF("/models/sandshrew.glb");

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <Center>
        <primitive object={scene} scale={1.2} />
      </Center>
    </Float>
  );
}

function ModelChecker({ children }: { children: React.ReactNode }) {
  const [modelExists, setModelExists] = useState<boolean | null>(null);

  useEffect(() => {
    fetch("/models/sandshrew.glb", { method: "HEAD" })
      .then((res) => setModelExists(res.ok))
      .catch(() => setModelExists(false));
  }, []);

  if (modelExists === null) {
    return <LoadingFallback />;
  }

  if (!modelExists) {
    return (
      <mesh>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#D2B48C" />
      </mesh>
    );
  }

  return <>{children}</>;
}

function LoadingFallback() {
  return (
    <mesh>
      <sphereGeometry args={[0.5, 32, 32]} />
      <meshStandardMaterial color="#D2B48C" wireframe />
    </mesh>
  );
}

export function PokemonViewer() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="w-full h-full cursor-grab active:cursor-grabbing"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={50} />
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <Suspense fallback={<LoadingFallback />}>
          <ModelChecker>
            <Sandshrew />
          </ModelChecker>
          <Environment preset="city" />
        </Suspense>
        <OrbitControls
          makeDefault
          target={[0, 0, 0]}
          enableZoom={false}
          enablePan={false}
          autoRotate={isHovered}
          autoRotateSpeed={3}
          enableDamping
          dampingFactor={0.05}
          rotateSpeed={0.5}
        />
      </Canvas>
    </div>
  );
}

