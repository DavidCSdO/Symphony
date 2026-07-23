'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useUIStore } from '@/store/useUIStore';
import { AmbientParticles } from '@/components/3d/AmbientParticles';
import { useGSAPScroll } from '@/hooks/useGSAPScroll';
import { Settings } from 'lucide-react';

/* ── Floating Background Gear ── */
function FloatingGear({ size, top, left, right, scrollY, speed }: any) {
  const rotation = useTransform(scrollY, [0, 1000], [0, 360 * speed]);
  const yOffset = useTransform(scrollY, [0, 1000], [0, -150 * speed]);

  return (
    <motion.div
      style={{
        position: 'absolute',
        top,
        left,
        right,
        rotate: rotation,
        y: yOffset,
        opacity: 0.15,
        color: 'var(--color-brass-gold)',
        zIndex: 1,
        pointerEvents: 'none',
      }}
    >
      <Settings size={size} strokeWidth={1} />
    </motion.div>
  );
}

/* ── Hero Grand Mechanical Clock Emblem ── */
function HeroClockEmblem() {
  const { scrollYProgress } = useScroll();
  const minuteRotation = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const hourRotation = useTransform(scrollYProgress, [0, 1], [0, 30]);

  return (
    <div
      style={{
        position: 'relative',
        width: '110px',
        height: '110px',
        borderRadius: '50%',
        border: '2px solid rgba(201,162,75,0.6)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'radial-gradient(circle at 50% 50%, rgba(46,26,61,0.85) 0%, rgba(10,10,13,0.95) 100%)',
        boxShadow: `
          0 0 35px rgba(201,162,75,0.4),
          0 0 70px rgba(201,162,75,0.15),
          inset 0 0 20px rgba(201,162,75,0.2)
        `,
      }}
    >
      {/* Outer gear teeth rim */}
      <div style={{ position: 'absolute', inset: '-6px', border: '1px dashed rgba(201,162,75,0.35)', borderRadius: '50%' }} />

      {/* Inner dashed ring */}
      <div style={{ position: 'absolute', inset: '8px', border: '1px dashed rgba(201,162,75,0.3)', borderRadius: '50%' }} />

      {/* Hour markers */}
      {Array.from({ length: 12 }).map((_, i) => {
        const deg = i * 30;
        const isMajor = i % 3 === 0;
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              width: isMajor ? '2px' : '1px',
              height: isMajor ? '8px' : '5px',
              background: isMajor ? 'var(--color-brass-gold)' : 'rgba(201,162,75,0.45)',
              transform: `rotate(${deg}deg) translateY(-44px)`,
            }}
          />
        );
      })}

      {/* Center jewel hub */}
      <div style={{
        width: '10px',
        height: '10px',
        background: 'radial-gradient(circle, #D4AF37 0%, #8C6E2D 100%)',
        borderRadius: '50%',
        zIndex: 10,
        boxShadow: '0 0 8px rgba(201,162,75,0.8)',
      }} />

      {/* Hour hand */}
      <motion.div
        style={{
          position: 'absolute',
          width: '3px',
          height: '28px',
          background: 'linear-gradient(to top, var(--color-brass-gold), #FFF5D6)',
          transformOrigin: 'bottom center',
          bottom: '50%',
          rotate: hourRotation,
          borderRadius: '3px',
          zIndex: 8,
        }}
      />

      {/* Minute hand */}
      <motion.div
        style={{
          position: 'absolute',
          width: '2px',
          height: '38px',
          background: 'var(--color-veiled-ivory)',
          transformOrigin: 'bottom center',
          bottom: '50%',
          rotate: minuteRotation,
          opacity: 0.95,
          zIndex: 9,
        }}
      />
    </div>
  );
}

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const emblemRef = useRef<HTMLDivElement>(null);
  const moonBlockRef = useRef<HTMLDivElement>(null);
  const { setHeroInView } = useUIStore();

  // Easter Egg: Blood Moon
  const [isMidnight, setIsMidnight] = useState(false);

  useEffect(() => {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    // Midnight window: 23:50 to 00:10
    if ((hours === 23 && minutes >= 50) || (hours === 0 && minutes <= 10)) {
      setIsMidnight(true);
    }
  }, []);

  /* Garante que o reload sempre volte para a hero (topo da página) */
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
      }
      window.scrollTo(0, 0);
    }
  }, []);

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

  /* GSAP ScrollTrigger Scrub suave */
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

    mainTl.to(titleRef.current, {
      scale: 0.88,
      opacity: 0.2,
      y: -60,
      ease: 'power1.out',
    }, 0);

    mainTl.to(emblemRef.current, {
      rotation: 180,
      scale: 1.2,
      opacity: 0.3,
      ease: 'power1.out',
    }, 0);
  }, []);

  /* Parallax scroll na imagem do Hero */
  const { scrollY } = useScroll();
  const heroImageY = useTransform(scrollY, [0, 800], [0, 180]);
  const heroImageScale = useTransform(scrollY, [0, 800], [1, 1.12]);
  const heroContentOpacity = useTransform(scrollY, [0, 500], [1, 0]);
  const heroContentY = useTransform(scrollY, [0, 500], [0, -80]);
  const router = useRouter();

  const STATS = [
    { label: 'Edições Limitadas', value: '100 unidades', action: () => document.getElementById('elenco')?.scrollIntoView({ behavior: 'smooth' }) },
    { label: 'Feitas à Mão', value: 'Visitar Ateliê', action: () => router.push('/bastidores') },
    { label: 'Materiais', value: 'Latão · Madeira', action: () => document.getElementById('elenco')?.scrollIntoView({ behavior: 'smooth' }) },
    { label: 'Envio', value: 'Embalagem exclusiva', action: () => router.push('/clube') },
  ];

  return (
    <>
      {/* ════════════════════════════════════════════
          HERO — fullscreen cinematic opening
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
        {/* ── Background image w/ parallax ── */}
        <motion.div
          style={{
            position: 'absolute',
            inset: '-5% -2%',
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
              filter: isMidnight ? 'sepia(1) hue-rotate(320deg) saturate(2) brightness(0.8)' : 'none',
              transition: 'filter 2s ease'
            }}
          />
        </motion.div>

        {/* ── Scroll-reactive Floating Gears ── */}
        <FloatingGear size={200} top="20%" left="-5%" scrollY={scrollY} speed={0.5} />
        <FloatingGear size={300} top="50%" right="-10%" scrollY={scrollY} speed={-0.3} />
        <FloatingGear size={120} top="70%" left="15%" scrollY={scrollY} speed={0.8} />

        {/* ── Three.js ambient particles ── */}
        <AmbientParticles />

        {/* ── Multi-layer gradient overlay ── */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            background: `
              radial-gradient(ellipse 85% 65% at 50% 50%, transparent 0%, rgba(10,10,13,0.65) 100%),
              linear-gradient(
                to bottom,
                rgba(10,10,13,0.5) 0%,
                rgba(10,10,13,0.00) 20%,
                rgba(10,10,13,0.00) 65%,
                rgba(10,10,13,0.75) 88%,
                rgba(10,10,13,1.00) 100%
              )
            `,
            pointerEvents: 'none',
            zIndex: 1,
          }}
        />

        {/* ── Cinematic side vignettes ── */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to right, rgba(10,10,13,0.45) 0%, transparent 15%, transparent 85%, rgba(10,10,13,0.45) 100%)',
            pointerEvents: 'none',
            zIndex: 1,
          }}
        />

        {/* ── Decorative top border accent ── */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: 'absolute',
            top: 0,
            left: '10%',
            right: '10%',
            height: '1px',
            background: 'linear-gradient(to right, transparent, rgba(201,162,75,0.5), transparent)',
            zIndex: 3,
            transformOrigin: 'center',
          }}
        />

        {/* ── Noise grain overlay ── */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 1,
            opacity: 0.035,
            pointerEvents: 'none',
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat',
            mixBlendMode: 'overlay',
          }}
        />

        {/* ── Main content ── */}
        <motion.div
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '0 1.5rem',
            opacity: heroContentOpacity,
            y: heroContentY,
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              maxWidth: '1100px',
              width: '100%',
            }}
          >
            {/* ── Floating Hero Grand Mechanical Clock Emblem ── */}
            <motion.div
              ref={emblemRef}
              initial={{ opacity: 0, scale: 0.75, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1.0, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              style={{
                position: 'relative',
                marginBottom: '1rem',
                zIndex: 1,
              }}
            >
              <HeroClockEmblem />
            </motion.div>

            {/* ── Main title — Pure SymphonyPro calligraphic wordmark ── */}
            <motion.h1
              ref={titleRef}
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontFamily: 'var(--font-wordmark)',
                fontSize: 'clamp(3.8rem, 18vw, 18rem)',
                fontWeight: 'normal',
                color: 'var(--color-veiled-ivory)',
                lineHeight: 1.05,
                letterSpacing: '-0.01em',
                textAlign: 'center',
                margin: 0,
                position: 'relative',
                zIndex: 2,
                whiteSpace: 'nowrap',
                textShadow: `
                  0 4px 50px rgba(10,10,13,0.95),
                  0 0 100px rgba(201,162,75,0.12)
                `,
              }}
            >
              Symphony of Night
            </motion.h1>

            {/* ── Decorative gold line ── */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
              style={{
                width: '80px',
                height: '1px',
                background: 'linear-gradient(to right, transparent, var(--color-brass-gold), transparent)',
                margin: '1.75rem 0 1.25rem',
                transformOrigin: 'center',
              }}
            />

            {/* ── Tagline ── */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.95, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontFamily: 'var(--font-display)',
                fontStyle: 'italic',
                fontSize: 'clamp(0.95rem, 2vw, 1.2rem)',
                color: isMidnight ? 'var(--color-marquise-red)' : 'rgba(231,224,210,0.88)',
                textAlign: 'center',
                maxWidth: '460px',
                lineHeight: 1.55,
                margin: 0,
                textShadow: '0 2px 30px rgba(10,10,13,0.9)',
                transition: 'color 2s ease'
              }}
            >
              {isMidnight
                ? "A verdadeira sinfonia começa agora."
                : "Mecanismos raros para quem coleciona silêncio e precisão."}
            </motion.p>

            {/* ── CTA buttons ── */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1.1, ease: [0.16, 1, 0.3, 1] }}
              style={{
                display: 'flex',
                gap: '0.85rem',
                marginTop: '2.25rem',
                flexWrap: 'wrap',
                justifyContent: 'center',
              }}
            >
              <Button
                variant="primary"
                size="lg"
                id="hero-cta-btn"
                onClick={() => {
                  const target = document.getElementById('elenco');
                  target?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Entrar na sessão
              </Button>
              <Button
                variant="ghost"
                size="lg"
                id="hero-explore-btn"
                onClick={() => {
                  const target = document.getElementById('bastidores');
                  target?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Explorar ateliê
              </Button>
            </motion.div>
          </div>
        </motion.div>

        {/* ── Bottom scroll indicator ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.6 }}
          style={{
            position: 'absolute',
            bottom: 'clamp(1.5rem, 4vh, 2.5rem)',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 3,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.5rem',
          }}
        >
          <span style={{
            fontFamily: 'var(--font-seal)',
            fontSize: '0.5rem',
            letterSpacing: '0.28em',
            color: 'rgba(201,162,75,0.45)',
            textTransform: 'uppercase',
          }}>
            Rolar
          </span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              width: '1px',
              height: '28px',
              background: 'linear-gradient(to bottom, rgba(201,162,75,0.5), transparent)',
            }}
          />
        </motion.div>
      </section>

      {/* ════════════════════════════════════════════
          CONTINUATION — Moon block with manifesto
          ════════════════════════════════════════════ */}
      <div
        ref={moonBlockRef}
        style={{
          position: 'relative',
          width: '100%',
          minHeight: '70vh',
          backgroundImage: 'url(/Context/backgrounds/fundohero.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center 75%',
          backgroundRepeat: 'no-repeat',
          overflow: 'hidden',
        }}
      >
        {/* Fade top */}
        <div aria-hidden="true" style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '180px', background: 'linear-gradient(to bottom, #0A0A0D 0%, transparent 100%)', pointerEvents: 'none', zIndex: 1 }} />
        {/* Fade bottom */}
        <div aria-hidden="true" style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '250px', background: 'linear-gradient(to top, #0A0A0D 0%, transparent 100%)', pointerEvents: 'none', zIndex: 1 }} />
        {/* Film grain */}
        <div aria-hidden="true" style={{ position: 'absolute', inset: 0, zIndex: 1, opacity: 0.03, pointerEvents: 'none', backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`, backgroundRepeat: 'repeat', mixBlendMode: 'overlay' }} />

        {/* Manifesto content */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
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
          <motion.span
            initial={{ opacity: 0, letterSpacing: '0.6em' }}
            whileInView={{ opacity: 0.85, letterSpacing: '0.3em' }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            style={{
              fontFamily: 'var(--font-seal)',
              fontSize: '0.65rem',
              color: 'var(--color-brass-gold)',
              textTransform: 'uppercase',
            }}
          >
            Ateliê Sanchez · Est. 2020
          </motion.span>

          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{ width: '48px', height: '1px', background: 'var(--color-brass-gold)', transformOrigin: 'center' }}
          />

          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.6rem, 3.5vw, 2.6rem)',
            fontStyle: 'italic',
            color: 'var(--color-veiled-ivory)',
            textAlign: 'center',
            maxWidth: '680px',
            lineHeight: 1.3,
            margin: 0,
            textShadow: '0 2px 40px rgba(10,10,13,0.98)',
          }}>
            "O tempo não se mede em horas, mas no ritmo dos mecanismos."
          </h2>

          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'clamp(0.9rem, 1.8vw, 1.05rem)',
            color: 'rgba(231,224,210,0.7)',
            textAlign: 'center',
            maxWidth: '520px',
            lineHeight: 1.85,
            textShadow: '0 1px 20px rgba(10,10,13,0.9)',
          }}>
            Peças autorais em edição limitada — relógios, autômatos e objetos
            cinéticos, feitos à mão com latão, madeira nobre e cristal.
          </p>
        </motion.div>
      </div>

      {/* ════════════════════════════════════════════
          TRANSITION BAR — glassmorphic stat strip
          ════════════════════════════════════════════ */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        style={{
          position: 'relative',
          background: 'rgba(20, 10, 15, 0.45)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          borderTop: '1px solid rgba(201,162,75,0.3)',
          borderBottom: '1px solid rgba(201,162,75,0.1)',
          padding: '1.5rem 1.5rem',
          marginTop: '-5rem',
          zIndex: 10,
          boxShadow: '0 -20px 40px rgba(10,10,13,0.5)',
          overflow: 'hidden',
        }}
      >
        {/* Shimmer */}
        <div aria-hidden="true" style={{ position: 'absolute', inset: 0, background: 'linear-gradient(115deg, transparent 20%, rgba(201,162,75,0.04) 40%, rgba(201,162,75,0.08) 50%, rgba(201,162,75,0.04) 60%, transparent 80%)', animation: 'shimmerGold 8s linear infinite', pointerEvents: 'none' }} />

        <div style={{
          maxWidth: '1100px',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-around',
          flexWrap: 'wrap',
          gap: '0.5rem',
          position: 'relative',
        }}>
          {STATS.map((item, i) => (
            <div key={item.label} style={{ display: 'flex', alignItems: 'center', flex: '1 1 180px' }}>
              {i > 0 && (
                <div className="stat-separator" style={{ width: '1px', height: '32px', background: 'linear-gradient(to bottom, transparent, rgba(201,162,75,0.35), transparent)', flexShrink: 0 }} />
              )}
              <motion.button
                onClick={item.action}
                whileHover={{ y: -3, scale: 1.02, backgroundColor: 'rgba(201,162,75,0.06)' }}
                whileTap={{ scale: 0.98 }}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.4rem',
                  alignItems: 'center',
                  textAlign: 'center',
                  flex: '1 1 140px',
                  padding: '1rem',
                  border: '1px solid transparent',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  background: 'transparent',
                  transition: 'border-color 0.3s ease',
                }}
                onMouseOver={(e) => e.currentTarget.style.borderColor = 'rgba(201,162,75,0.15)'}
                onMouseOut={(e) => e.currentTarget.style.borderColor = 'transparent'}
              >
                <span style={{ fontFamily: 'var(--font-seal)', fontSize: '0.6rem', letterSpacing: '0.25em', color: 'var(--color-brass-gold)', textTransform: 'uppercase', opacity: 0.8 }}>
                  {item.label}
                </span>
                <span style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.9rem',
                  color: 'rgba(231,224,210,0.95)',
                  fontWeight: 500,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.3rem'
                }}>
                  {item.value}
                  <ChevronRight size={14} color="rgba(201,162,75,0.7)" />
                </span>
              </motion.button>
            </div>
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
        @media (max-width: 768px) {
          .stat-separator {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
}
