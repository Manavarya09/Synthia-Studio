import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";

const NUM_LINES = 400;
const SPEED = 2.5;
const Z_START = -200;
const Z_END = 40;

function WarpSpeedLines() {
  const lines = useMemo(() => {
    return Array.from({ length: NUM_LINES }, () => ({
      x: (Math.random() - 0.5) * 120,
      y: (Math.random() - 0.5) * 80,
      z: Math.random() * (Z_END - Z_START) + Z_START,
      length: Math.random() * 8 + 8,
      speed: Math.random() * SPEED + SPEED,
      color: `hsl(${Math.random() * 360}, 100%, 80%)`,
    }));
  }, []);

  const group = useRef();

  useFrame(() => {
    if (!group.current) return;
    for (let i = 0; i < NUM_LINES; i++) {
      const line = group.current.children[i];
      line.position.z += lines[i].speed;
      if (line.position.z > Z_END) {
        line.position.z = Z_START;
      }
    }
  });

  return (
    <group ref={group}>
      {lines.map((l, i) => (
        <mesh key={i} position={[l.x, l.y, l.z]}>
          <cylinderGeometry args={[0.05, 0.05, l.length, 6]} />
          <meshBasicMaterial color={l.color} transparent opacity={0.5} />
        </mesh>
      ))}
    </group>
  );
}

export default function StarLoading() {
  return (
    <div style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
      <Canvas camera={{ position: [0, 0, 30], fov: 80 }} style={{ width: "100%", height: "100%" }}>
        <WarpSpeedLines />
      </Canvas>
    </div>
  );
}
