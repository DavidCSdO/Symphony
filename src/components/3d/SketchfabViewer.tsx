'use client';

import { useState, useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, PresentationControls, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';
import { Maximize2, Layers, Compass, Clock, Cog } from 'lucide-react';

/* ── Helper: Gear tooth shape (procedural) ── */
function useGearShape(radius: number, teeth: number, toothDepth = 0.18) {
  return useMemo(() => {
    const shape = new THREE.Shape();
    const anglePerTooth = (Math.PI * 2) / teeth;
    const innerR = radius * (1 - toothDepth);
    const outerR = radius;
    const toothWidth = anglePerTooth * 0.4;

    for (let i = 0; i < teeth; i++) {
      const a = i * anglePerTooth;
      const startInner = a;
      const startOuter = a + toothWidth * 0.25;
      const endOuter = a + toothWidth * 0.75;
      const endInner = a + toothWidth;
      const nextValley = a + anglePerTooth;

      if (i === 0) {
        shape.moveTo(Math.cos(startInner) * innerR, Math.sin(startInner) * innerR);
      }
      // Ramp up to tooth
      shape.lineTo(Math.cos(startOuter) * outerR, Math.sin(startOuter) * outerR);
      // Tooth top
      shape.lineTo(Math.cos(endOuter) * outerR, Math.sin(endOuter) * outerR);
      // Ramp down
      shape.lineTo(Math.cos(endInner) * innerR, Math.sin(endInner) * innerR);
      // Valley to next tooth
      shape.lineTo(Math.cos(nextValley) * innerR, Math.sin(nextValley) * innerR);
    }
    shape.closePath();

    // Central hole
    const hole = new THREE.Path();
    hole.absarc(0, 0, radius * 0.22, 0, Math.PI * 2, true);
    shape.holes.push(hole);

    return shape;
  }, [radius, teeth, toothDepth]);
}

/* ── Procedural Gear Component ── */
function ProceduralGear({
  radius = 1,
  teeth = 12,
  depth = 0.18,
  color = '#C9A24B',
  speed = 1,
  direction = 1,
  position = [0, 0, 0] as [number, number, number],
}: {
  radius?: number;
  teeth?: number;
  depth?: number;
  color?: string;
  speed?: number;
  direction?: number;
  position?: [number, number, number];
}) {
  const groupRef = useRef<THREE.Group>(null);
  const gearShape = useGearShape(radius, teeth);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.z += delta * 0.8 * speed * direction;
    }
  });

  const extrudeSettings = useMemo(
    () => ({
      depth,
      bevelEnabled: true,
      bevelSegments: 2,
      steps: 1,
      bevelSize: 0.02,
      bevelThickness: 0.02,
    }),
    [depth],
  );

  return (
    <group ref={groupRef} position={position}>
      <mesh castShadow receiveShadow>
        <extrudeGeometry args={[gearShape, extrudeSettings]} />
        <meshStandardMaterial
          color={color}
          metalness={0.92}
          roughness={0.22}
          envMapIntensity={1.4}
        />
      </mesh>
      {/* Axle hub */}
      <mesh position={[0, 0, depth / 2]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[radius * 0.2, radius * 0.2, depth * 1.8, 24]} />
        <meshStandardMaterial color="#1A1A22" metalness={0.95} roughness={0.15} />
      </mesh>
    </group>
  );
}

/* ── Modelo 1: Relógio de Bolso em Latão ── */
function PocketWatch3D() {
  const gearRef = useRef<THREE.Group>(null);
  const handRef1 = useRef<THREE.Mesh>(null);
  const handRef2 = useRef<THREE.Mesh>(null);

  useFrame(({ clock }, delta) => {
    if (gearRef.current) gearRef.current.rotation.z += delta * 1.5;
    if (handRef1.current) handRef1.current.rotation.z -= delta * 0.4;
    if (handRef2.current) handRef2.current.rotation.z -= delta * 2.5;
  });

  return (
    <group rotation={[0.4, 0.2, 0]}>
      {/* Watch case body - rotated so flat face points toward camera */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[2.2, 2.2, 0.5, 64]} />
        <meshStandardMaterial color="#C9A24B" metalness={0.9} roughness={0.2} />
      </mesh>
      {/* Case back bevel */}
      <mesh position={[0, 0, -0.28]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[2.0, 2.2, 0.1, 64]} />
        <meshStandardMaterial color="#8C6E2D" metalness={0.92} roughness={0.18} />
      </mesh>
      {/* Front bezel ring */}
      <mesh position={[0, 0, 0.26]}>
        <ringGeometry args={[1.85, 2.22, 64]} />
        <meshStandardMaterial color="#8C6E2D" metalness={0.95} roughness={0.15} />
      </mesh>
      {/* Dark dial face */}
      <mesh position={[0, 0, 0.26]}>
        <circleGeometry args={[1.85, 64]} />
        <meshStandardMaterial color="#120E0A" roughness={0.35} metalness={0.1} />
      </mesh>
      {/* Hour markers */}
      {Array.from({ length: 12 }).map((_, i) => {
        const angle = (i * Math.PI * 2) / 12;
        const r = 1.55;
        return (
          <mesh
            key={i}
            position={[Math.cos(angle) * r, Math.sin(angle) * r, 0.28]}
          >
            <boxGeometry args={[0.04, 0.15, 0.02]} />
            <meshStandardMaterial color="#D4AF37" metalness={0.9} roughness={0.2} />
          </mesh>
        );
      })}
      {/* Minute tick marks */}
      {Array.from({ length: 60 }).map((_, i) => {
        if (i % 5 === 0) return null;
        const angle = (i * Math.PI * 2) / 60;
        const r = 1.6;
        return (
          <mesh
            key={`tick-${i}`}
            position={[Math.cos(angle) * r, Math.sin(angle) * r, 0.27]}
          >
            <boxGeometry args={[0.015, 0.06, 0.01]} />
            <meshStandardMaterial color="#C9A24B" metalness={0.8} roughness={0.25} />
          </mesh>
        );
      })}
      {/* Visible escapement gear in center */}
      <group ref={gearRef} position={[0, -0.4, 0.28]}>
        <mesh>
          <ringGeometry args={[0.2, 0.55, 16]} />
          <meshStandardMaterial
            color="#D4AF37"
            metalness={0.9}
            roughness={0.2}
            side={THREE.DoubleSide}
          />
        </mesh>
        {/* Spokes */}
        {[0, Math.PI / 3, (2 * Math.PI) / 3].map((a, i) => (
          <mesh key={i} rotation={[0, 0, a]} position={[0, 0, 0.005]}>
            <boxGeometry args={[0.04, 1.0, 0.015]} />
            <meshStandardMaterial color="#D4AF37" metalness={0.85} roughness={0.22} />
          </mesh>
        ))}
      </group>
      {/* Sub-dial aperture ring */}
      <mesh position={[0, 0.7, 0.27]}>
        <ringGeometry args={[0.3, 0.45, 32]} />
        <meshStandardMaterial color="#C9A24B" metalness={0.88} roughness={0.2} side={THREE.DoubleSide} />
      </mesh>
      {/* Hour hand */}
      <mesh ref={handRef1} position={[0, 0, 0.3]}>
        <boxGeometry args={[0.08, 1.3, 0.025]} />
        <meshStandardMaterial color="#E7E0D2" metalness={0.85} roughness={0.15} />
      </mesh>
      {/* Minute hand */}
      <mesh ref={handRef2} position={[0, 0, 0.32]}>
        <boxGeometry args={[0.05, 1.7, 0.02]} />
        <meshStandardMaterial color="#C9A24B" metalness={0.9} roughness={0.15} />
      </mesh>
      {/* Center cap */}
      <mesh position={[0, 0, 0.34]}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshStandardMaterial color="#D4AF37" metalness={0.95} roughness={0.12} />
      </mesh>
      {/* Crown (winding knob) */}
      <mesh position={[0, 2.4, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.18, 0.22, 0.35, 16]} />
        <meshStandardMaterial color="#C9A24B" metalness={0.9} roughness={0.25} />
      </mesh>
      {/* Crown connector */}
      <mesh position={[0, 2.2, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.08, 0.08, 0.15, 12]} />
        <meshStandardMaterial color="#8C6E2D" metalness={0.92} roughness={0.2} />
      </mesh>
    </group>
  );
}

/* ── Modelo 2: Caixa de Engrenagens Cinéticas ── */
function ClockworkGears3D() {
  return (
    <group rotation={[0.3, -0.3, 0]}>
      {/* Ebonized wood base - rotated for correct orientation */}
      <mesh position={[0, -1.8, 0]}>
        <boxGeometry args={[5, 0.35, 3.5]} />
        <meshStandardMaterial color="#140E0A" roughness={0.55} metalness={0.15} />
      </mesh>
      {/* Base rim detail */}
      <mesh position={[0, -1.6, 0]}>
        <boxGeometry args={[5.15, 0.06, 3.65]} />
        <meshStandardMaterial color="#C9A24B" metalness={0.9} roughness={0.2} />
      </mesh>

      {/* Main large gear with teeth */}
      <ProceduralGear
        position={[-0.7, 0, 0]}
        radius={1.6}
        teeth={20}
        depth={0.2}
        speed={0.6}
        direction={1}
        color="#C9A24B"
      />
      {/* Meshed medium gear */}
      <ProceduralGear
        position={[1.4, 0.9, 0.15]}
        radius={1.0}
        teeth={14}
        depth={0.18}
        speed={0.96}
        direction={-1}
        color="#A0A5AA"
      />
      {/* Small fast gear */}
      <ProceduralGear
        position={[2.2, -0.3, 0.08]}
        radius={0.7}
        teeth={10}
        depth={0.15}
        speed={1.37}
        direction={1}
        color="#D4AF37"
      />
      {/* Connecting vertical shaft */}
      <mesh position={[-0.7, -0.9, 0.1]} rotation={[0, 0, 0]}>
        <cylinderGeometry args={[0.06, 0.06, 1.6, 12]} />
        <meshStandardMaterial color="#1A1A22" metalness={0.95} roughness={0.1} />
      </mesh>
      <mesh position={[1.4, -0.5, 0.25]} rotation={[0, 0, 0]}>
        <cylinderGeometry args={[0.05, 0.05, 1.2, 12]} />
        <meshStandardMaterial color="#1A1A22" metalness={0.95} roughness={0.1} />
      </mesh>
      {/* Decorative ruby bearings at axle centers */}
      {[[-0.7, 0, 0.22], [1.4, 0.9, 0.35], [2.2, -0.3, 0.25]].map(([x, y, z], i) => (
        <mesh key={i} position={[x, y, z]}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshStandardMaterial
            color="#B3122A"
            metalness={0.3}
            roughness={0.1}
            transparent
            opacity={0.9}
          />
        </mesh>
      ))}
    </group>
  );
}

/* ── Modelo 3: Esfera Armilar & Relógio Astronômico ── */
function ArmillarySphere3D() {
  const ring1Ref = useRef<THREE.Group>(null);
  const ring2Ref = useRef<THREE.Group>(null);
  const ring3Ref = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (ring1Ref.current) ring1Ref.current.rotation.y += delta * 0.8;
    if (ring2Ref.current) ring2Ref.current.rotation.x += delta * 0.6;
    if (ring3Ref.current) ring3Ref.current.rotation.z += delta * 0.4;
    if (coreRef.current) coreRef.current.rotation.y += delta * 0.3;
  });

  return (
    <group rotation={[0.2, 0.2, 0]}>
      {/* Outer armillary ring - equatorial */}
      <group ref={ring1Ref}>
        <mesh>
          <torusGeometry args={[2.2, 0.08, 16, 100]} />
          <meshStandardMaterial color="#C9A24B" metalness={0.9} roughness={0.15} />
        </mesh>
        {/* Degree markers on outer ring */}
        {Array.from({ length: 24 }).map((_, i) => {
          const angle = (i * Math.PI * 2) / 24;
          return (
            <mesh
              key={i}
              position={[Math.cos(angle) * 2.2, Math.sin(angle) * 2.2, 0]}
              rotation={[0, 0, angle]}
            >
              <boxGeometry args={[0.03, 0.12, 0.03]} />
              <meshStandardMaterial color="#E7E0D2" metalness={0.8} roughness={0.2} />
            </mesh>
          );
        })}
      </group>
      {/* Inner armillary ring - ecliptic (tilted) */}
      <group ref={ring2Ref}>
        <mesh rotation={[Math.PI / 3, 0, 0]}>
          <torusGeometry args={[1.7, 0.06, 16, 100]} />
          <meshStandardMaterial color="#B3122A" metalness={0.8} roughness={0.3} />
        </mesh>
      </group>
      {/* Third ring - meridian */}
      <group ref={ring3Ref}>
        <mesh rotation={[0, Math.PI / 4, Math.PI / 6]}>
          <torusGeometry args={[1.95, 0.05, 16, 100]} />
          <meshStandardMaterial color="#D4AF37" metalness={0.88} roughness={0.2} />
        </mesh>
      </group>
      {/* Core sphere (Earth/celestial body) */}
      <mesh ref={coreRef}>
        <sphereGeometry args={[0.6, 32, 32]} />
        <meshStandardMaterial color="#E7E0D2" metalness={0.5} roughness={0.2} />
      </mesh>
      {/* Axis rod */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.03, 0.03, 4.8, 12]} />
        <meshStandardMaterial color="#C9A24B" metalness={0.9} roughness={0.15} />
      </mesh>
      {/* Stand base */}
      <mesh position={[0, -2.6, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.8, 1.0, 0.2, 32]} />
        <meshStandardMaterial color="#140E0A" roughness={0.5} metalness={0.2} />
      </mesh>
      {/* Stand pillar */}
      <mesh position={[0, -2.2, 0]}>
        <cylinderGeometry args={[0.12, 0.15, 0.8, 16]} />
        <meshStandardMaterial color="#C9A24B" metalness={0.9} roughness={0.2} />
      </mesh>
    </group>
  );
}

interface StudioModel {
  id: string;
  name: string;
  author: string;
  icon: typeof Clock;
  description: string;
}

const STUDIO_MODELS: StudioModel[] = [
  {
    id: 'pocket-watch',
    name: 'Relógio de Bolso Antigo — Mecanismo Exposto',
    author: 'Ateliê Sanchez 3D',
    icon: Clock,
    description: 'Relógio de bolso em latão gravado com engrenagens e escapamento visíveis em 360°.',
  },
  {
    id: 'automaton-gear',
    name: 'Caixa de Engrenagens Cinéticas',
    author: 'Ateliê Sanchez 3D',
    icon: Cog,
    description: 'Escultura cinética de corda manual com rodas dentadas funcionais em movimento.',
  },
  {
    id: 'astronomical-clock',
    name: 'Esfera Armilar & Relógio Astronômico',
    author: 'Ateliê Sanchez 3D',
    icon: Compass,
    description: 'Objeto de escrivaninha que mapeia posições celestes em latão, safira e ruby.',
  },
];

export function SketchfabViewer({ initialModelId }: { initialModelId?: string }) {
  const defaultModel = STUDIO_MODELS.find(m => m.id === initialModelId) || STUDIO_MODELS[0];
  const [selectedModel, setSelectedModel] = useState<StudioModel>(defaultModel);
  const [isFullscreen, setIsFullscreen] = useState(false);

  return (
    <div
      style={{
        position: isFullscreen ? 'fixed' : 'relative',
        width: '100%',
        height: isFullscreen ? '100vh' : '520px',
        inset: isFullscreen ? 0 : undefined,
        zIndex: isFullscreen ? 9999 : 1,
        borderRadius: isFullscreen ? 0 : 'var(--radius-lg)',
        overflow: 'hidden',
        background: 'radial-gradient(circle at 50% 50%, rgba(30,15,25,0.85) 0%, rgba(10,10,13,0.98) 80%)',
        border: isFullscreen ? 'none' : '1px solid rgba(201,162,75,0.35)',
        boxShadow: '0 25px 60px rgba(10,10,13,0.95)',
        transition: 'all 400ms ease',
      }}
    >
      {/* Barra superior de controles e navegação por modelos */}
      <div
        style={{
          position: 'absolute',
          top: 0, left: 0, right: 0,
          zIndex: 10,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0.85rem 1.25rem',
          background: 'linear-gradient(to bottom, rgba(10,10,13,0.95) 0%, rgba(10,10,13,0) 100%)',
          pointerEvents: 'auto',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <span
            style={{
              fontFamily: 'var(--font-seal)',
              fontSize: '0.65rem',
              letterSpacing: '0.2em',
              color: 'var(--color-brass-gold)',
              textTransform: 'uppercase',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
            }}
          >
            <Layers size={14} color="#C9A24B" />
            Estúdio 3D Interativo · {selectedModel.name}
          </span>
        </div>

        {/* Botão de Tela Cheia */}
        <button
          onClick={() => setIsFullscreen(!isFullscreen)}
          style={{
            background: 'rgba(201,162,75,0.15)',
            border: '1px solid rgba(201,162,75,0.4)',
            color: 'var(--color-veiled-ivory)',
            padding: '0.4rem 0.75rem',
            borderRadius: 'var(--radius-sm)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.65rem',
            letterSpacing: '0.1em',
            transition: 'all 200ms ease',
          }}
        >
          <Maximize2 size={13} />
          {isFullscreen ? 'Sair da Tela Cheia' : 'Expandir 3D'}
        </button>
      </div>

      {/* Canvas 3D WebGL Interativo em Tempo Real */}
      <Canvas
        camera={{ position: [0, 0, 6.5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.8} />
        <directionalLight position={[5, 8, 5]} intensity={1.8} color="#FFF5D6" />
        <directionalLight position={[-5, -5, -3]} intensity={0.9} color="#B3122A" />
        <pointLight position={[0, 0, 4]} intensity={1.4} color="#C9A24B" />

        <PresentationControls
          global={false}
          cursor={true}
          snap={false}
          speed={1.6}
          zoom={1.2}
          rotation={[0, 0, 0]}
          polar={[-Math.PI / 3, Math.PI / 3]}
          azimuth={[-Math.PI / 2, Math.PI / 2]}
        >
          <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
            {selectedModel.id === 'pocket-watch' && <PocketWatch3D />}
            {selectedModel.id === 'automaton-gear' && <ClockworkGears3D />}
            {selectedModel.id === 'astronomical-clock' && <ArmillarySphere3D />}
          </Float>
        </PresentationControls>

        <ContactShadows
          position={[0, -2.4, 0]}
          opacity={0.7}
          scale={8}
          blur={2}
          far={4}
          color="#0A0A0D"
        />
      </Canvas>

      {/* Barra inferior de seleção de modelos do ateliê */}
      <div
        style={{
          position: 'absolute',
          bottom: 0, left: 0, right: 0,
          zIndex: 10,
          padding: '1rem 1.25rem',
          background: 'linear-gradient(to top, rgba(10,10,13,0.95) 0%, rgba(10,10,13,0) 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '0.75rem',
        }}
      >
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.8rem',
            color: 'var(--text-muted)',
            maxWidth: '380px',
            margin: 0,
          }}
        >
          {selectedModel.description}
        </p>

        {/* Seletores de modelo 3D */}
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {STUDIO_MODELS.map((model) => {
            const Icon = model.icon;
            const isSelected = selectedModel.id === model.id;
            return (
              <button
                key={model.id}
                onClick={() => setSelectedModel(model)}
                style={{
                  background: isSelected ? 'var(--color-brass-gold)' : 'rgba(10,10,13,0.85)',
                  color: isSelected ? '#0A0A0D' : 'var(--color-veiled-ivory)',
                  border: isSelected ? '1px solid #C9A24B' : '1px solid rgba(201,162,75,0.3)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '0.35rem 0.75rem',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.625rem',
                  fontWeight: isSelected ? 700 : 400,
                  cursor: 'pointer',
                  letterSpacing: '0.08em',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  transition: 'all 250ms ease',
                }}
              >
                <Icon size={12} />
                {model.name.split('—')[0]}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
