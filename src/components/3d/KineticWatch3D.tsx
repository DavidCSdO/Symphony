'use client';

import { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, PresentationControls, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';

/* Engrenagem 3D procedural com dentes */
function Gear({
  radius = 1.5,
  teeth = 12,
  depth = 0.2,
  color = '#C9A24B',
  speed = 1,
  direction = 1,
  position = [0, 0, 0] as [number, number, number],
  rotation = [0, 0, 0] as [number, number, number],
}) {
  const meshRef = useRef<THREE.Group>(null);

  // Animação contínua da engrenagem
  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.z += delta * 0.8 * speed * direction;
    }
  });

  // Geometria da engrenagem com dentes projetados
  const gearShape = useRef<THREE.Shape | null>(null);
  if (!gearShape.current) {
    const shape = new THREE.Shape();
    const toothAngle = (Math.PI * 2) / teeth;
    const toothWidth = toothAngle * 0.35;

    for (let i = 0; i < teeth; i++) {
      const angle = i * toothAngle;
      const rInner = radius * 0.82;
      const rOuter = radius;

      // Ponto base
      if (i === 0) shape.moveTo(Math.cos(angle) * rInner, Math.sin(angle) * rInner);

      // Subida do dente
      shape.lineTo(Math.cos(angle + toothWidth * 0.2) * rOuter, Math.sin(angle + toothWidth * 0.2) * rOuter);
      // Topo do dente
      shape.lineTo(Math.cos(angle + toothWidth * 0.8) * rOuter, Math.sin(angle + toothWidth * 0.8) * rOuter);
      // Descida do dente
      shape.lineTo(Math.cos(angle + toothAngle * 0.5) * rInner, Math.sin(angle + toothAngle * 0.5) * rInner);
    }
    shape.closePath();

    // Furo central da engrenagem
    const holePath = new THREE.Path();
    holePath.absarc(0, 0, radius * 0.3, 0, Math.PI * 2, true);
    shape.holes.push(holePath);

    gearShape.current = shape;
  }

  const extrudeSettings = {
    depth,
    bevelEnabled: true,
    bevelSegments: 3,
    steps: 1,
    bevelSize: 0.03,
    bevelThickness: 0.03,
  };

  return (
    <group ref={meshRef} position={position} rotation={rotation}>
      <mesh castShadow receiveShadow>
        <extrudeGeometry args={[gearShape.current, extrudeSettings]} />
        <meshStandardMaterial
          color={color}
          metalness={0.92}
          roughness={0.25}
          envMapIntensity={1.5}
        />
      </mesh>
      {/* Eixo central em aço escuro */}
      <mesh position={[0, 0, depth / 2]}>
        <cylinderGeometry args={[radius * 0.28, radius * 0.28, depth * 1.5, 32]} />
        <meshStandardMaterial color="#1A1A22" metalness={0.95} roughness={0.15} />
      </mesh>
    </group>
  );
}

/* Balancim / Tourbillon em movimento */
function BalanceWheel({ position = [0, 0, 0] as [number, number, number] }) {
  const wheelRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (wheelRef.current) {
      // Oscilação rápida típica de escapamento relojoeiro (4Hz)
      const t = clock.getElapsedTime() * 12;
      wheelRef.current.rotation.z = Math.sin(t) * 0.8;
    }
  });

  return (
    <group ref={wheelRef} position={position}>
      {/* Anel do balancim */}
      <mesh castShadow>
        <torusGeometry args={[0.9, 0.06, 16, 48]} />
        <meshStandardMaterial color="#D4AF37" metalness={0.95} roughness={0.18} />
      </mesh>
      {/* Braços cruzados */}
      <mesh rotation={[0, 0, 0]}>
        <boxGeometry args={[1.7, 0.08, 0.04]} />
        <meshStandardMaterial color="#D4AF37" metalness={0.95} roughness={0.18} />
      </mesh>
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <boxGeometry args={[1.7, 0.08, 0.04]} />
        <meshStandardMaterial color="#D4AF37" metalness={0.95} roughness={0.18} />
      </mesh>
      {/* Parafusos de afinação de peso */}
      {[0, Math.PI / 2, Math.PI, (3 * Math.PI) / 2].map((angle, i) => (
        <mesh
          key={i}
          position={[Math.cos(angle) * 0.9, Math.sin(angle) * 0.9, 0]}
        >
          <sphereGeometry args={[0.06, 12, 12]} />
          <meshStandardMaterial color="#E7E0D2" metalness={0.9} roughness={0.2} />
        </mesh>
      ))}
    </group>
  );
}

/* Mecanismo Completo do Relógio */
function WatchMechanism() {
  return (
    <group position={[0, 0, 0]} rotation={[0.3, -0.2, 0]}>
      {/* Placa base traseira com textura marquinha escura */}
      <mesh position={[0, 0, -0.4]} receiveShadow>
        <cylinderGeometry args={[3.2, 3.2, 0.2, 64]} />
        <meshStandardMaterial color="#120B10" metalness={0.8} roughness={0.4} />
      </mesh>

      {/* Anel externo decorativo em latão escovado */}
      <mesh position={[0, 0, -0.3]}>
        <torusGeometry args={[3.2, 0.15, 24, 64]} />
        <meshStandardMaterial color="#C9A24B" metalness={0.9} roughness={0.25} />
      </mesh>

      {/* Engrenagens em cadeia encadeadas */}
      <Gear position={[0, 0, -0.1]} radius={1.8} teeth={20} speed={0.5} direction={1} color="#C9A24B" />
      <Gear position={[1.8, 1.4, 0]} radius={1.1} teeth={14} speed={0.8} direction={-1} color="#D4AF37" />
      <Gear position={[-1.6, -1.2, 0.1]} radius={1.3} teeth={16} speed={0.7} direction={-1} color="#B38B32" />
      <Gear position={[-1.7, 1.3, 0.05]} radius={0.9} teeth={10} speed={1.1} direction={1} color="#C9A24B" />
      <Gear position={[1.5, -1.5, 0.15]} radius={1.0} teeth={12} speed={0.9} direction={1} color="#E7E0D2" />

      {/* Balancim de escapamento */}
      <BalanceWheel position={[0, 0, 0.3]} />

      {/* Ponteiros de Horas e Minutos */}
      <mesh position={[0, 0.5, 0.45]} rotation={[0, 0, -0.8]}>
        <boxGeometry args={[0.1, 1.6, 0.04]} />
        <meshStandardMaterial color="#C9A24B" metalness={0.95} roughness={0.15} />
      </mesh>
      <mesh position={[0, 0.8, 0.5]} rotation={[0, 0, 0.5]}>
        <boxGeometry args={[0.06, 2.2, 0.04]} />
        <meshStandardMaterial color="#E7E0D2" metalness={0.9} roughness={0.2} />
      </mesh>
      {/* Rubis decorativos nos eixos */}
      {[[0, 0], [1.8, 1.4], [-1.6, -1.2], [-1.7, 1.3], [1.5, -1.5]].map(([x, y], i) => (
        <mesh key={i} position={[x, y, 0.35]}>
          <sphereGeometry args={[0.12, 16, 16]} />
          <meshStandardMaterial color="#B3122A" metalness={0.3} roughness={0.1} transparent opacity={0.9} />
        </mesh>
      ))}
    </group>
  );
}

export function KineticWatch3D({ scrollProgress = 0 }: { scrollProgress?: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '440px',
        borderRadius: 'var(--radius-lg)',
        overflow: 'hidden',
        background: 'radial-gradient(circle at 50% 50%, rgba(46,26,61,0.65) 0%, rgba(10,10,13,0.95) 80%)',
        border: '1px solid rgba(201,162,75,0.3)',
        boxShadow: '0 20px 50px rgba(10,10,13,0.85)',
        cursor: 'grab',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Badge indicativo do estúdio 3D */}
      <div
        style={{
          position: 'absolute',
          top: '1rem',
          left: '1.25rem',
          zIndex: 10,
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          background: 'rgba(10,10,13,0.85)',
          backdropFilter: 'blur(8px)',
          border: '1px solid rgba(201,162,75,0.35)',
          borderRadius: 'var(--radius-sm)',
          padding: '0.35rem 0.75rem',
          pointerEvents: 'none',
        }}
      >
        <span style={{
          width: '6px', height: '6px', borderRadius: '50%',
          backgroundColor: '#C9A24B',
          boxShadow: '0 0 8px #C9A24B',
        }} />
        <span style={{
          fontFamily: 'var(--font-seal)', fontSize: '0.6rem',
          letterSpacing: '0.18em', color: 'var(--color-brass-gold)',
          textTransform: 'uppercase',
        }}>
          Canvas 3D · Mecanismo Sincronizado com GSAP Scroll
        </span>
      </div>

      <div
        style={{
          position: 'absolute',
          bottom: '1rem',
          right: '1.25rem',
          zIndex: 10,
          fontFamily: 'var(--font-mono)',
          fontSize: '0.6rem',
          letterSpacing: '0.12em',
          color: 'rgba(231,224,210,0.5)',
          pointerEvents: 'none',
        }}
      >
        [ Arraste para orbitar 360° · Role a página para girar engrenagens ]
      </div>

      {/* Canvas Three.js */}
      <Canvas
        camera={{ position: [0, 0, 7.5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        {/* Luzes de Estúdio Déco */}
        <ambientLight intensity={0.7} />
        <directionalLight position={[5, 8, 5]} intensity={1.8} color="#FFF5D6" castShadow />
        <directionalLight position={[-5, -5, -3]} intensity={0.8} color="#B3122A" />
        <pointLight position={[0, 0, 4]} intensity={1.2} color="#C9A24B" />

        {/* Controles de apresentação por arrasto suave */}
        <PresentationControls
          global={false}
          cursor={true}
          snap={false}
          speed={1.5}
          zoom={1.2}
          rotation={[0, 0, 0]}
          polar={[-Math.PI / 4, Math.PI / 4]}
          azimuth={[-Math.PI / 3, Math.PI / 3]}
        >
          <Float speed={1.8} rotationIntensity={0.3} floatIntensity={0.4}>
            <group rotation={[0.3, -0.2 + scrollProgress * Math.PI * 0.5, scrollProgress * Math.PI * 2]}>
              <WatchMechanism />
            </group>
          </Float>
        </PresentationControls>

        {/* Sombra de contato realista */}
        <ContactShadows
          position={[0, -2.8, 0]}
          opacity={0.65}
          scale={10}
          blur={2.5}
          far={4}
          color="#0A0A0D"
        />
      </Canvas>
    </div>
  );
}
