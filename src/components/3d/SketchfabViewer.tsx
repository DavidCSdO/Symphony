'use client';

import { useState, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, PresentationControls, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';
import { Maximize2, Layers, Compass, Clock, Cog } from 'lucide-react';

/* Modelo 1: Relógio de Bolso em Latão */
function PocketWatch3D() {
  const watchRef = useRef<THREE.Group>(null);
  const gearRef = useRef<THREE.Group>(null);
  const handRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (gearRef.current) gearRef.current.rotation.z += delta * 1.5;
    if (handRef.current) handRef.current.rotation.z -= delta * 0.4;
  });

  return (
    <group ref={watchRef} rotation={[0.4, 0.2, 0]}>
      {/* Caixa do relógio em latão */}
      <mesh>
        <cylinderGeometry args={[2.2, 2.2, 0.4, 64]} />
        <meshStandardMaterial color="#C9A24B" metalness={0.9} roughness={0.2} />
      </mesh>
      {/* Moldura frontal gravada */}
      <mesh position={[0, 0, 0.22]}>
        <ringGeometry args={[1.8, 2.2, 64]} />
        <meshStandardMaterial color="#8C6E2D" metalness={0.95} roughness={0.15} />
      </mesh>
      {/* Mostrador de marfim escuro */}
      <mesh position={[0, 0, 0.21]}>
        <circleGeometry args={[1.8, 64]} />
        <meshStandardMaterial color="#1C1814" roughness={0.4} />
      </mesh>
      {/* Engrenagens visíveis no centro */}
      <group ref={gearRef} position={[0, 0, 0.23]}>
        <mesh>
          <ringGeometry args={[0.3, 0.7, 12]} />
          <meshStandardMaterial color="#D4AF37" metalness={0.9} roughness={0.2} />
        </mesh>
      </group>
      {/* Ponteiro principal */}
      <mesh ref={handRef} position={[0, 0, 0.25]} rotation={[0, 0, 0]}>
        <boxGeometry args={[0.08, 1.2, 0.02]} />
        <meshStandardMaterial color="#E7E0D2" metalness={0.8} />
      </mesh>
    </group>
  );
}

/* Modelo 2: Caixa de Engrenagens Cinéticas */
function ClockworkGears3D() {
  const groupRef = useRef<THREE.Group>(null);
  const gear1Ref = useRef<THREE.Group>(null);
  const gear2Ref = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (gear1Ref.current) gear1Ref.current.rotation.z += delta * 1.2;
    if (gear2Ref.current) gear2Ref.current.rotation.z -= delta * 1.8;
  });

  return (
    <group ref={groupRef} rotation={[0.3, -0.4, 0]}>
      {/* Base de madeira ebonizada */}
      <mesh position={[0, -1.8, 0]}>
        <boxGeometry args={[4.5, 0.4, 3.5]} />
        <meshStandardMaterial color="#140E0A" roughness={0.6} />
      </mesh>
      {/* Engrenagem principal */}
      <group ref={gear1Ref} position={[-0.8, 0, 0]}>
        <mesh>
          <cylinderGeometry args={[1.8, 1.8, 0.2, 24]} />
          <meshStandardMaterial color="#C9A24B" metalness={0.9} roughness={0.2} />
        </mesh>
      </group>
      {/* Engrenagem acoplada em aço */}
      <group ref={gear2Ref} position={[1.2, 0.8, 0.3]}>
        <mesh>
          <cylinderGeometry args={[1.1, 1.1, 0.2, 16]} />
          <meshStandardMaterial color="#A0A5AA" metalness={0.95} roughness={0.1} />
        </mesh>
      </group>
    </group>
  );
}

/* Modelo 3: Esfera Armilar & Relógio Astronômico */
function ArmillarySphere3D() {
  const ring1Ref = useRef<THREE.Group>(null);
  const ring2Ref = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (ring1Ref.current) ring1Ref.current.rotation.y += delta * 0.8;
    if (ring2Ref.current) ring2Ref.current.rotation.x += delta * 0.6;
    if (coreRef.current) coreRef.current.rotation.z += delta * 0.3;
  });

  return (
    <group rotation={[0.2, 0.2, 0]}>
      {/* Anel Armilar Exterior */}
      <group ref={ring1Ref}>
        <mesh>
          <torusGeometry args={[2.2, 0.08, 16, 100]} />
          <meshStandardMaterial color="#C9A24B" metalness={0.9} roughness={0.15} />
        </mesh>
      </group>
      {/* Anel Armilar Interior */}
      <group ref={ring2Ref}>
        <mesh rotation={[Math.PI / 3, 0, 0]}>
          <torusGeometry args={[1.7, 0.06, 16, 100]} />
          <meshStandardMaterial color="#B3122A" metalness={0.8} roughness={0.3} />
        </mesh>
      </group>
      {/* Núcleo Astronômico */}
      <mesh ref={coreRef}>
        <sphereGeometry args={[0.7, 32, 32]} />
        <meshStandardMaterial color="#E7E0D2" metalness={0.5} roughness={0.2} />
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

export function SketchfabViewer() {
  const [selectedModel, setSelectedModel] = useState<StudioModel>(STUDIO_MODELS[0]);
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

