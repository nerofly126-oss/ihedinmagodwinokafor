import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Edges, Float, MeshDistortMaterial, MeshWobbleMaterial } from "@react-three/drei";
import type { Group, Mesh } from "three";

const ACCENT = "#22d3ee"; // electric cyan — the "alien tech" glow
const ACCENT_DIM = "#0e7490";

type FloaterProps = {
  position: [number, number, number];
  scale: number;
  speed?: number;
  geometry: "ico" | "torus" | "octa" | "dodeca";
  variant: "distort" | "wobble" | "grid";
};

function Floater({ position, scale, speed = 1, geometry, variant, detail }: FloaterProps & { detail: number }) {
  const ref = useRef<Mesh>(null);

  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.x += delta * 0.18 * speed;
    ref.current.rotation.y += delta * 0.12 * speed;
  });

  const Geo = () => (
    <>
      {geometry === "ico" && <icosahedronGeometry args={[1, variant === "grid" ? 1 : detail]} />}
      {geometry === "torus" && <torusKnotGeometry args={[0.7, 0.22, detail >= 4 ? 160 : 100, detail >= 4 ? 24 : 16]} />}
      {geometry === "octa" && <octahedronGeometry args={[1, variant === "grid" ? 0 : detail - 1]} />}
      {geometry === "dodeca" && <dodecahedronGeometry args={[1, 0]} />}
    </>
  );

  return (
    <Float speed={1.5 * speed} rotationIntensity={0.7} floatIntensity={1.1}>
      <mesh ref={ref} position={position} scale={scale}>
        <Geo />

        {variant === "distort" && (
          // morphing low-poly skin — reads as a living alien organism
          <MeshDistortMaterial
            color="#0b1220"
            emissive={ACCENT_DIM}
            emissiveIntensity={0.6}
            metalness={0.9}
            roughness={0.25}
            distort={0.45}
            speed={2.2}
            flatShading
          />
        )}

        {variant === "wobble" && (
          <MeshWobbleMaterial
            color="#0a0f1a"
            emissive={ACCENT_DIM}
            emissiveIntensity={0.5}
            metalness={0.85}
            roughness={0.3}
            factor={0.6}
            speed={1.4}
          />
        )}

        {variant === "grid" && (
          // dark faceted core, almost invisible — the glowing edges do the talking
          <meshStandardMaterial
            color="#05070d"
            metalness={0.7}
            roughness={0.4}
            emissive="#02040a"
            emissiveIntensity={0.3}
          />
        )}

        {/* glowing wireframe shell — the "tech / HUD" layer */}
        <Edges threshold={variant === "grid" ? 1 : 15} scale={1.04} color={ACCENT} />
      </mesh>
    </Float>
  );
}

function ParallaxGroup({ children }: { children: React.ReactNode }) {
  const group = useRef<Group>(null);
  const { pointer, viewport } = useThree();

  // Scale the whole field so its spread always fits the viewport width.
  // The layout is designed around ~11 world units wide; below that we shrink in.
  const fit = Math.min(1, viewport.width / 11);

  useFrame(() => {
    if (!group.current) return;
    // ease the whole field toward the pointer for a gentle parallax tilt
    group.current.rotation.y += (pointer.x * 0.4 - group.current.rotation.y) * 0.04;
    group.current.rotation.x += (-pointer.y * 0.28 - group.current.rotation.x) * 0.04;
  });

  return (
    <group ref={group} scale={fit}>
      {children}
    </group>
  );
}

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return isMobile;
}

export default function Scene3D() {
  const isMobile = useIsMobile();

  // On phones: fewer shapes, pulled inward so none clip off a narrow screen.
  const floaters = useMemo<FloaterProps[]>(() => {
    const full: FloaterProps[] = [
      { position: [-3.4, 1.6, -2], scale: 1.2, geometry: "ico", variant: "distort", speed: 0.8 },
      { position: [3.6, 0.4, -3], scale: 1.3, geometry: "torus", variant: "wobble", speed: 0.6 },
      { position: [-2.2, -1.8, -1], scale: 0.7, geometry: "octa", variant: "grid", speed: 1.2 },
      { position: [2.4, 2.2, -4], scale: 1.0, geometry: "dodeca", variant: "grid", speed: 0.9 },
      { position: [0.2, -2.4, -2.5], scale: 0.65, geometry: "ico", variant: "distort", speed: 1.1 },
      { position: [4.6, -1.6, -5], scale: 1.0, geometry: "octa", variant: "grid", speed: 0.7 },
    ];

    if (!isMobile) return full;

    // Tighter, lighter set for mobile.
    return [
      { position: [-1.8, 2.0, -2], scale: 1.0, geometry: "ico", variant: "distort", speed: 0.8 },
      { position: [1.9, 0.2, -3], scale: 1.0, geometry: "torus", variant: "wobble", speed: 0.6 },
      { position: [-1.4, -2.2, -1.5], scale: 0.6, geometry: "octa", variant: "grid", speed: 1.1 },
      { position: [1.6, -2.6, -2.5], scale: 0.6, geometry: "dodeca", variant: "grid", speed: 0.9 },
    ];
  }, [isMobile]);

  const detail = isMobile ? 2 : 4; // geometry subdivisions — lighter on phones
  const dpr: [number, number] = isMobile ? [1, 1.25] : [1, 1.75];

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 bg-black">
      <Canvas camera={{ position: [0, 0, 8], fov: 50 }} dpr={dpr} gl={{ antialias: !isMobile, alpha: true }}>
        <fog attach="fog" args={["#02040a", 7, 17]} />
        <ambientLight intensity={0.35} />
        <directionalLight position={[5, 6, 4]} intensity={1.0} />
        {/* rim light in the accent color makes the metal read as alien tech */}
        <pointLight position={[-6, -4, 2]} intensity={1.4} color={ACCENT} />
        <pointLight position={[6, 4, -6]} intensity={0.8} color="#3b82f6" />
        <Suspense fallback={null}>
          <ParallaxGroup>
            {floaters.map((f, i) => (
              <Floater key={i} {...f} detail={detail} />
            ))}
          </ParallaxGroup>
        </Suspense>
      </Canvas>
    </div>
  );
}
