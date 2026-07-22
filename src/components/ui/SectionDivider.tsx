'use client';

import { useEffect, useRef } from 'react';
import anime from 'animejs';

interface SectionDividerProps {
  className?: string;
}

/* Leque geométrico dourado (sunburst déco) — animado com anime.js ao entrar no viewport */
export function SectionDivider({ className = '' }: SectionDividerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const raysRef = useRef<(SVGLineElement | null)[]>([]);
  const arcRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Reset initial states
    anime.set(raysRef.current, { scaleY: 0 });
    
    if (arcRef.current) {
      anime.set(arcRef.current, { strokeDasharray: '160', strokeDashoffset: '160' });
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          
          anime({
            targets: el,
            opacity: [0, 1],
            duration: 600,
            easing: 'linear'
          });

          // Rays scale up from center outwards
          anime({
            targets: raysRef.current,
            scaleY: [0, 1],
            delay: anime.stagger(70, { from: 'center' }),
            duration: 1000,
            easing: 'easeOutElastic(1, 0.8)'
          });

          // Arc draws itself
          if (arcRef.current) {
            anime({
              targets: arcRef.current,
              strokeDashoffset: [160, 0],
              duration: 1000,
              easing: 'easeInOutSine',
              delay: 200
            });
          }

          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`section-divider ${className}`} aria-hidden="true" style={{ opacity: 0, padding: '2rem 0', display: 'flex', justifyContent: 'center' }}>
      <svg
        width="120"
        height="60"
        viewBox="0 0 120 60"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Raios do leque */}
        {Array.from({ length: 9 }).map((_, i) => {
          const angle = -80 + i * 20;
          const rad = (angle * Math.PI) / 180;
          const x2 = 60 + Math.sin(rad) * 55;
          const y2 = 58 - Math.cos(rad) * 55;
          return (
            <line
              key={i}
              ref={el => { raysRef.current[i] = el; }}
              x1="60"
              y1="58"
              x2={x2}
              y2={y2}
              stroke="#C9A24B"
              strokeWidth={i === 4 ? 1.5 : 0.75}
              strokeOpacity={i === 4 ? 1 : 0.5}
              style={{ transformOrigin: '60px 58px' }}
            />
          );
        })}
        {/* Arco central */}
        <path
          ref={arcRef}
          d="M 10 58 A 50 50 0 0 1 110 58"
          stroke="#C9A24B"
          strokeWidth="0.75"
          strokeOpacity="0.4"
          fill="none"
        />
        {/* Ponto central */}
        <circle cx="60" cy="58" r="2" fill="#C9A24B" />
      </svg>
    </div>
  );
}
