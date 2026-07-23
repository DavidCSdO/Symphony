'use client';

import { useEffect, useRef } from 'react';
import { useUIStore } from '@/store/useUIStore';

/* ClockLoader — relógio SVG em traço dourado
   Desenha o círculo, move ponteiros até meia-noite, revela o site */
export function ClockLoader() {
  const { isLoaderVisible, setLoaderVisible } = useUIStore();
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Garante que o loader seja ativado ao carregar/recarregar a página
    setLoaderVisible(true);

    const timer = setTimeout(() => {
      if (containerRef.current) {
        containerRef.current.style.opacity = '0';
        containerRef.current.style.pointerEvents = 'none';
        setTimeout(() => setLoaderVisible(false), 700);
      }
    }, 2200);

    return () => clearTimeout(timer);
  }, [setLoaderVisible]);

  if (!isLoaderVisible) return null;

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 'var(--z-loader)' as 'auto',
        background: 'var(--color-gotham-black)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '2rem',
        transition: 'opacity 700ms ease',
      }}
    >
      <svg
        ref={svgRef}
        width="120"
        height="120"
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Carregando Symphony of Night"
      >
        {/* Círculo do relógio */}
        <circle
          cx="60"
          cy="60"
          r="52"
          stroke="#C9A24B"
          strokeWidth="1"
          strokeOpacity="0.3"
        />
        <circle
          cx="60"
          cy="60"
          r="52"
          stroke="#C9A24B"
          strokeWidth="1.5"
          strokeDasharray="326.7"
          strokeDashoffset="326.7"
          strokeLinecap="round"
          style={{
            animation: 'drawCircle 1.2s ease forwards',
            transformOrigin: '60px 60px',
            transform: 'rotate(-90deg)',
          }}
        />

        {/* Marcações de hora */}
        {Array.from({ length: 12 }).map((_, i) => {
          const angle = (i * 30 * Math.PI) / 180;
          const outerR = 50;
          const innerR = i % 3 === 0 ? 44 : 47;
          const x1 = +(60 + Math.sin(angle) * innerR).toFixed(4);
          const y1 = +(60 - Math.cos(angle) * innerR).toFixed(4);
          const x2 = +(60 + Math.sin(angle) * outerR).toFixed(4);
          const y2 = +(60 - Math.cos(angle) * outerR).toFixed(4);
          const delay = (0.8 + i * 0.05).toFixed(2);
          return (
            <line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="#C9A24B"
              strokeWidth={i % 3 === 0 ? 1.5 : 0.75}
              strokeOpacity="0.6"
              style={{ animation: `fadeIn 0.3s ${delay}s ease both` }}
            />
          );
        })}

        {/* Ponteiro de hora — apontando para 12 */}
        <line
          x1="60" y1="60"
          x2="60" y2="26"
          stroke="#C9A24B"
          strokeWidth="2"
          strokeLinecap="round"
          style={{ animation: 'sweepHour 1.5s 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) both' }}
        />
        {/* Ponteiro de minuto — apontando para 12 */}
        <line
          x1="60" y1="60"
          x2="60" y2="16"
          stroke="#C9A24B"
          strokeWidth="1.5"
          strokeLinecap="round"
          style={{ animation: 'sweepMinute 1.5s 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) both' }}
        />
        {/* Centro */}
        <circle cx="60" cy="60" r="3" fill="#C9A24B" />
        <circle cx="60" cy="60" r="1.5" fill="#0A0A0D" />
      </svg>

      <p
        style={{
          fontFamily: 'var(--font-seal)',
          fontSize: '0.75rem',
          letterSpacing: '0.25em',
          color: 'var(--color-brass-gold)',
          opacity: 0.7,
          textTransform: 'uppercase',
          animation: 'fadeIn 1s 0.5s ease both',
        }}
      >
        Symphony of Night
      </p>

      <style>{`
        @keyframes drawCircle {
          to { stroke-dashoffset: 0; }
        }
        @keyframes sweepHour {
          from { transform: rotate(-360deg); transform-origin: 60px 60px; }
          to   { transform: rotate(0deg); transform-origin: 60px 60px; }
        }
        @keyframes sweepMinute {
          from { transform: rotate(-720deg); transform-origin: 60px 60px; }
          to   { transform: rotate(0deg); transform-origin: 60px 60px; }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
      `}</style>
    </div>
  );
}
