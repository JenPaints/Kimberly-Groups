import { useTexture } from "@react-three/drei";
import { useRef } from "react";
import { Mesh } from "three";

interface StaticLogoProps {
  src: string;
}

export default function StaticLogo({ src }: StaticLogoProps) {
  const meshRef = useRef<Mesh>(null);
  const texture = useTexture(src);

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      {/* Plane geometry to display the image */}
      <planeGeometry args={[2, 2]} />
      <meshBasicMaterial map={texture} transparent />
    </mesh>
  );
}