'use client';

import { motion, useScroll, useTransform } from 'framer-motion';

export function ScrollClock() {
  const { scrollYProgress } = useScroll();
  
  // O relógio vai girar 1 hora inteira (360 graus para o ponteiro dos minutos, 30 para horas)
  const minuteRotation = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const hourRotation = useTransform(scrollYProgress, [0, 1], [0, 30]);

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '2rem',
        right: '2.5rem',
        zIndex: 50,
        pointerEvents: 'none',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0.5rem',
        filter: 'drop-shadow(0 0 10px rgba(10,10,13,0.8))',
      }}
    >
      <div
        style={{
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          border: '1px solid rgba(201,162,75,0.4)',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'rgba(10,10,13,0.6)',
          backdropFilter: 'blur(4px)',
        }}
      >
        {/* Mostrador interno */}
        <div style={{ position: 'absolute', inset: '4px', border: '1px dashed rgba(201,162,75,0.15)', borderRadius: '50%' }} />
        
        {/* Marcações de hora */}
        {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
          <div
            key={deg}
            style={{
              position: 'absolute',
              width: '1px',
              height: '4px',
              background: deg % 90 === 0 ? 'rgba(201,162,75,0.6)' : 'rgba(201,162,75,0.2)',
              transform: `rotate(${deg}deg) translateY(-14px)`,
            }}
          />
        ))}

        {/* Eixo central */}
        <div style={{ width: '4px', height: '4px', background: 'var(--color-brass-gold)', borderRadius: '50%', zIndex: 10 }} />

        {/* Ponteiro das Horas */}
        <motion.div
          style={{
            position: 'absolute',
            width: '2px',
            height: '10px',
            background: 'var(--color-brass-gold)',
            transformOrigin: 'bottom center',
            bottom: '50%',
            rotate: hourRotation,
            borderRadius: '2px',
          }}
        />

        {/* Ponteiro dos Minutos */}
        <motion.div
          style={{
            position: 'absolute',
            width: '1px',
            height: '14px',
            background: 'var(--color-veiled-ivory)',
            transformOrigin: 'bottom center',
            bottom: '50%',
            rotate: minuteRotation,
            opacity: 0.8,
          }}
        />
      </div>
    </div>
  );
}
