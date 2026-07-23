'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { useUIStore } from '@/store/useUIStore';
import { AmbientParticles } from '@/components/3d/AmbientParticles';
import { useGSAPScroll } from '@/hooks/useGSAPScroll';

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const emblemRef = useRef<HTMLDivElement>(null);
  const moonBlockRef = useRef<HTMLDivElement>(null);
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

  /* GSAP ScrollTrigger Scrub suave sem pinning para evitar quebra de layout */
  useGSAPScroll((gsap, ScrollTrigger) => {
    if (!titleRef.current || !emblemRef.current || !sectionRef.current) return;

    const mainTl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 0.8,
      },
    });

    // Encolhimento do título + expansão de letter-spacing + rotação do emblema
    mainTl.to(titleRef.current, {
      scale: 0.85,
      opacity: 0.3,
      y: -50,
      ease: 'power1.out',
    }, 0);

    mainTl.to(emblemRef.current, {
      rotation: 180,
      scale: 1.15,
      opacity: 0.5,
      ease: 'power1.out',
    }, 0);
  }, []);

  /* Parallax scroll na imagem do Hero */
  const { scrollY } = useScroll();
  const heroImageY = useTransform(scrollY, [0, 800], [0, 150]);
  const heroImageScale = useTransform(scrollY, [0, 800], [1, 1.08]);
  const heroContentOpacity = useTransform(scrollY, [0, 500], [1, 0]);
  const heroContentY = useTransform(scrollY, [0, 500], [0, -60]);

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
          height: '100svh',
          overflow: 'hidden',
          background: '#0A0A0D',
        }}
      >
        {/* ── Imagem com Parallax + Zoom Suave no Scroll ── */}
        <motion.div
          style={{
            position: 'absolute',
            inset: 0,
            y: heroImageY,
            scale: heroImageScale,
            transformOrigin: 'center center',
          }}
        >
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
        </motion.div>

        {/* ── Three.js Ambient Particles (poeira dourada flutuante) ── */}
        <AmbientParticles />

        {/* ── Overlay em 3 camadas ── */}
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

        {/* ── Layout: logo no topo, CTA na base com Fade/Translate no Scroll ── */}
        <motion.div
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: 'clamp(2rem,6vh,4rem) 1.5rem clamp(2rem,5vh,3.5rem)',
            opacity: heroContentOpacity,
            y: heroContentY,
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
              ref={titleRef}
              style={{
                fontFamily: 'var(--font-wordmark)',
                fontSize: 'clamp(6.0rem, 19.5vw, 20rem)',
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
              ref={emblemRef}
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
              <Button
                variant="primary"
                size="lg"
                id="hero-cta-btn"
                onClick={() => {
                  const target = document.getElementById('elenco');
                  target?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
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
        </motion.div>
      </section>

      {/* ════════════════════════════════════
          CONTINUAÇÃO DA IMAGEM — segundo
          bloco visual (prédios + lua) com scroll reveal
          ════════════════════════════════════ */}
      <div
        ref={moonBlockRef}
        style={{
          position: 'relative',
          width: '100%',
          minHeight: '65vh',
          backgroundImage: 'url(/Context/backgrounds/fundohero.png)',
          backgroundSize: 'cover',
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

        {/* Bloco Poético de Manifesto sobre a Lua com Scroll Reveal */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1.25rem',
            padding: '4rem 1.5rem',
            zIndex: 2,
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-seal)',
              fontSize: '0.65rem',
              letterSpacing: '0.3em',
              color: 'var(--color-brass-gold)',
              textTransform: 'uppercase',
              opacity: 0.85,
            }}
          >
            Ateliê Sanchez · Est. 2020
          </span>

          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.5rem, 3.5vw, 2.5rem)',
              fontStyle: 'italic',
              color: 'var(--color-veiled-ivory)',
              textAlign: 'center',
              maxWidth: '650px',
              lineHeight: 1.3,
              margin: 0,
              textShadow: '0 2px 30px rgba(10,10,13,0.95)',
            }}
          >
            “O tempo não se mede em horas, mas no ritmo dos mecanismos.”
          </h2>

          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'clamp(0.9rem, 1.8vw, 1.05rem)',
              color: 'rgba(231,224,210,0.75)',
              textAlign: 'center',
              maxWidth: '540px',
              lineHeight: 1.8,
              textShadow: '0 1px 20px rgba(10,10,13,0.9)',
            }}
          >
            Peças autorais em edição limitada — relógios, autômatos e objetos
            cinéticos, feitos à mão com latão, madeira nobre e cristal.
          </p>
        </motion.div>
      </div>

      {/* Faixa de transição — conecta ao restante da página com animação no scroll */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.6 }}
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
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
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
            </motion.div>
          ))}
        </div>
      </motion.div>

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
