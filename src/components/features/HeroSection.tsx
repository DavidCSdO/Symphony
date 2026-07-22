'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { useUIStore } from '@/store/useUIStore';
import { AmbientParticles } from '@/components/3d/AmbientParticles';

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { setHeroInView } = useUIStore();

  /* IntersectionObserver → avisa o Header quando o hero sai da tela */
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => setHeroInView(entry.isIntersecting),
      { threshold: 0, rootMargin: '0px 0px 0px 0px' }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, [setHeroInView]);

  return (
    <>
      {/* ════════════════════════════════════════════
          HERO — imagem completa do topo ao fim
          Sem navbar, apenas logo + emblema + CTA
          ════════════════════════════════════════════ */}
      <section
        ref={sectionRef}
        id="hero"
        aria-label="Entrada — Symphony of Night"
        style={{
          position: 'relative',
          width: '100%',
          /* A seção ocupa 100vh — a imagem fica como cover dentro dela */
          height: '100svh',
          overflow: 'hidden',
          background: '#0A0A0D',
        }}
      >
        {/* ── Imagem com objectFit: cover, posicionada no centro da composição ── */}
        <Image
          src="/Context/backgrounds/fundohero.png"
          alt="Skyline de Gotham à meia-noite — Symphony of Night"
          fill
          priority
          sizes="100vw"
          style={{
            objectFit: 'cover',
            objectPosition: 'center 40%',
          }}
        />

        {/* ── Three.js Ambient Particles (poeira dourada flutuante) ── */}
        <AmbientParticles />

        {/* ── Overlay em 3 camadas: topo escuro, centro limpo, base escura ── */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            background: `
              linear-gradient(
                to bottom,
                rgba(10,10,13,0.65) 0%,
                rgba(10,10,13,0.00) 25%,
                rgba(10,10,13,0.00) 70%,
                rgba(10,10,13,0.80) 90%,
                rgba(10,10,13,1.00) 100%
              )
            `,
            pointerEvents: 'none',
            zIndex: 1,
          }}
        />

        {/* ── Layout: logo no topo, CTA na base ── */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: 'clamp(2rem,6vh,4rem) 1.5rem clamp(2rem,5vh,3.5rem)',
          }}
        >
          {/* — TOPO: Wordmark + Emblema — */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.75rem',
            }}
          >
            <h1
              style={{
                fontFamily: 'var(--font-wordmark)',
                fontSize: 'clamp(2.8rem, 9vw, 7.5rem)',
                fontWeight: 'normal',
                color: 'var(--color-veiled-ivory)',
                lineHeight: 0.9,
                letterSpacing: '-0.01em',
                textAlign: 'center',
                margin: 0,
                textShadow: `
                  0 2px 40px rgba(10,10,13,0.95),
                  0 0 80px rgba(201,162,75,0.1)
                `,
                animation: 'fadeInDown 0.9s 0.2s cubic-bezier(0.16,1,0.3,1) both',
              }}
            >
              Symphony of Night
            </h1>

            <div
              style={{
                filter: 'drop-shadow(0 0 28px rgba(201,162,75,0.65))',
                animation: 'fadeInDown 0.9s 0.4s cubic-bezier(0.16,1,0.3,1) both',
              }}
            >
              <Image
                src="/Context/3D/icon.png"
                alt="Emblema Symphony of Night"
                width={90}
                height={90}
                style={{ display: 'block' }}
              />
            </div>
          </div>

          {/* — BASE: tagline + CTA + scroll indicator — */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '1rem',
            }}
          >
            <p
              style={{
                fontFamily: 'var(--font-display)',
                fontStyle: 'italic',
                fontSize: 'clamp(0.9rem, 2vw, 1.15rem)',
                color: 'rgba(231,224,210,0.9)',
                textAlign: 'center',
                maxWidth: '420px',
                lineHeight: 1.5,
                textShadow: '0 1px 20px rgba(10,10,13,0.9)',
                animation: 'fadeInUp 0.9s 0.7s cubic-bezier(0.16,1,0.3,1) both',
              }}
            >
              Mecanismos raros para quem coleciona silêncio e precisão.
            </p>

            <div style={{ animation: 'fadeInUp 0.9s 0.9s cubic-bezier(0.16,1,0.3,1) both' }}>
              <Button variant="primary" size="lg" id="hero-cta-btn">
                Ver a sessão de hoje
              </Button>
            </div>

            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '0.3rem',
                animation: 'fadeIn 1s 2s ease both',
              }}
            >
              <span style={{
                fontFamily: 'var(--font-seal)',
                fontSize: '0.5rem',
                letterSpacing: '0.22em',
                color: 'rgba(201,162,75,0.45)',
                textTransform: 'uppercase',
              }}>
                Rolar
              </span>
              <svg width="1" height="22" viewBox="0 0 1 22">
                <line
                  x1="0.5" y1="0" x2="0.5" y2="22"
                  stroke="#C9A24B" strokeWidth="1" strokeOpacity="0.35" strokeDasharray="3 3"
                  style={{ animation: 'scrollDash 2s linear infinite' }}
                />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════
          CONTINUAÇÃO DA IMAGEM — segundo
          bloco visual com a parte inferior
          do skyline (prédios + rua + lua)
          ════════════════════════════════════ */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          /* Altura generosa para mostrar a parte inferior da imagem */
          minHeight: '70vh',
          backgroundImage: 'url(/Context/backgrounds/fundohero.png)',
          backgroundSize: 'cover',
          /* Mostra a parte de baixo da imagem (onde estão os prédios e a rua) */
          backgroundPosition: 'center 75%',
          backgroundRepeat: 'no-repeat',
          overflow: 'hidden',
        }}
      >
        {/* Fade topo — junção suave com o hero */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: 0, left: 0, right: 0,
            height: '160px',
            background: 'linear-gradient(to bottom, #0A0A0D 0%, transparent 100%)',
            pointerEvents: 'none',
            zIndex: 1,
          }}
        />

        {/* Fade base — dissolve para o próximo bloco */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            bottom: 0, left: 0, right: 0,
            height: '220px',
            background: 'linear-gradient(to top, #0A0A0D 0%, transparent 100%)',
            pointerEvents: 'none',
            zIndex: 1,
          }}
        />

        {/* Texto centralizado sobre a continuação da imagem */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1.5rem',
            padding: '4rem 1.5rem',
            zIndex: 2,
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-seal)',
              fontSize: '0.65rem',
              letterSpacing: '0.25em',
              color: 'var(--color-brass-gold)',
              textTransform: 'uppercase',
              opacity: 0.8,
            }}
          >
            Ateliê Sanchez · Est. 2020
          </span>

          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'clamp(0.9rem, 1.8vw, 1.05rem)',
              color: 'rgba(231,224,210,0.7)',
              textAlign: 'center',
              maxWidth: '500px',
              lineHeight: 1.8,
              textShadow: '0 1px 20px rgba(10,10,13,0.8)',
            }}
          >
            Peças autorais em edição limitada — relógios, autômatos e objetos
            cinéticos, feitos à mão no Ateliê Sanchez.
          </p>

          {/* Quatro diferenciais */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexWrap: 'wrap',
              gap: '0 3rem',
              marginTop: '0.5rem',
            }}
          >
            {[
              { label: '100 unidades', sub: 'por peça' },
              { label: 'Feito à mão', sub: 'artesanato puro' },
              { label: 'Latão & Cristal', sub: 'materiais nobres' },
              { label: 'Numerado', sub: 'certificado de origem' },
            ].map((item) => (
              <div
                key={item.label}
                style={{ textAlign: 'center', minWidth: '120px' }}
              >
                <p style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  color: 'var(--color-brass-gold)',
                  letterSpacing: '0.05em',
                  marginBottom: '0.15rem',
                }}>
                  {item.label}
                </p>
                <p style={{
                  fontFamily: 'var(--font-seal)',
                  fontSize: '0.55rem',
                  letterSpacing: '0.15em',
                  color: 'rgba(231,224,210,0.45)',
                  textTransform: 'uppercase',
                }}>
                  {item.sub}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Faixa de transição — conecta ao restante da página */}
      <div
        style={{
          background: 'var(--color-gotham-black)',
          borderTop: '1px solid rgba(201,162,75,0.15)',
          borderBottom: '1px solid rgba(201,162,75,0.08)',
          padding: '1.75rem 1.5rem',
        }}
      >
        <div
          style={{
            maxWidth: '1100px',
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-around',
            flexWrap: 'wrap',
            gap: '1.5rem',
          }}
        >
          {[
            { label: 'Edições Limitadas', value: '100 unidades por peça' },
            { label: 'Feitas à Mão', value: 'Ateliê Sanchez' },
            { label: 'Materiais', value: 'Latão · Madeira · Cristal' },
            { label: 'Envio', value: 'Embalagem exclusiva lacrada' },
          ].map((item, i) => (
            <div
              key={item.label}
              style={{
                display: 'flex', flexDirection: 'column',
                gap: '0.3rem', alignItems: 'center', textAlign: 'center',
                flex: '1 1 180px', position: 'relative',
              }}
            >
              {i > 0 && (
                <span style={{
                  position: 'absolute', left: 0, top: '50%',
                  transform: 'translateY(-50%)',
                  width: '1px', height: '28px',
                  background: 'rgba(201,162,75,0.2)',
                }} />
              )}
              <span style={{
                fontFamily: 'var(--font-seal)', fontSize: '0.58rem',
                letterSpacing: '0.18em', color: 'var(--color-brass-gold)',
                textTransform: 'uppercase', opacity: 0.65,
              }}>
                {item.label}
              </span>
              <span style={{
                fontFamily: 'var(--font-body)', fontSize: '0.82rem',
                color: 'rgba(231,224,210,0.75)',
              }}>
                {item.value}
              </span>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes scrollDash {
          from { stroke-dashoffset: 0; }
          to   { stroke-dashoffset: -12; }
        }
      `}</style>
    </>
  );
}
