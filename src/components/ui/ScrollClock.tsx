'use client';

import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { usePathname, useRouter } from 'next/navigation';
import { useUIStore } from '@/store/useUIStore';
import OptionWheel from './OptionWheel';

const ACTS = [
  { id: 'hero', number: 'I', label: 'Entrada', targetId: 'hero', href: '/#hero' },
  { id: 'elenco', number: 'II', label: 'O Elenco', targetId: 'elenco', href: '/#elenco' },
  { id: 'sessao-meia-noite', number: 'III', label: 'Meia-Noite', targetId: 'sessao-meia-noite', href: '/#sessao-meia-noite' },
  { id: 'bastidores', number: 'IV', label: 'Ateliê Sanchez', targetId: 'bastidores', href: '/#bastidores' },
  { id: 'criticas', number: 'V', label: 'Críticas', targetId: 'criticas', href: '/#criticas' },
  { id: 'clube', number: 'VII', label: 'Clube', targetId: 'clube', href: '/#clube' },
  { id: 'reserva', number: '★', label: 'Reserva', targetId: '', href: '/reserva' },
];

export function ScrollClock() {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  const pathname = usePathname();
  const router = useRouter();
  const { isHeroInView } = useUIStore();

  const { scrollYProgress } = useScroll();
  const minuteRotation = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const hourRotation = useTransform(scrollYProgress, [0, 1], [0, 30]);

  const isHomePage = pathname === '/' || pathname === '/home';
  // Always show on secondary pages, or on scroll for home page
  const shouldShow = isHomePage ? (!isHeroInView && isScrolled) : true;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 250);

      if (isHomePage) {
        const scrollPosition = window.scrollY + window.innerHeight / 3;
        for (let i = ACTS.length - 1; i >= 0; i--) {
          const act = ACTS[i];
          if (!act.targetId) continue;
          const el = document.getElementById(act.targetId);
          if (el && el.offsetTop <= scrollPosition) {
            setActiveIndex(i);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHomePage]);

  const handleNavigate = (index: number) => {
    const act = ACTS[index];
    if (act.targetId && isHomePage) {
      const element = document.getElementById(act.targetId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        setActiveIndex(index);
        setIsOpen(false);
        return;
      }
    }
    router.push(act.href);
    setActiveIndex(index);
    setIsOpen(false);
  };

  return (
    <AnimatePresence>
      {shouldShow && (
        <motion.nav
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          aria-label="Navegação lateral"
          className="scroll-clock-container"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            bottom: 0,
            width: '340px',
            zIndex: 90,
            pointerEvents: 'none',
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                style={{ position: 'absolute', inset: 0, zIndex: 1 }}
              >
                {/* Gradient shadow for text legibility */}
                <motion.div
                   initial={{ opacity: 0 }}
                   animate={{ opacity: isHovered ? 1 : 0.6 }}
                   transition={{ duration: 0.5 }}
                   style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(to right, rgba(10,10,13,0.95) 0%, rgba(10,10,13,0.5) 45%, transparent 100%)',
                      pointerEvents: 'none'
                   }}
                />

                {/* A Agulha da Jukebox (Aponta para o item selecionado) */}
                <motion.div
                  className="needle-indicator"
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '95px', // Logo após o relógio
                    y: '-50%',
                    zIndex: 2,
                    width: '45px',
                    height: '2px',
                    background: 'linear-gradient(90deg, var(--color-brass-gold) 0%, transparent 100%)',
                    boxShadow: '0 0 10px rgba(201,162,75,0.6)',
                    opacity: isHovered ? 1 : 0.4,
                    transition: 'opacity 0.4s ease',
                    pointerEvents: 'none',
                  }}
                />

                <div style={{ position: 'absolute', inset: 0, pointerEvents: 'auto', zIndex: 2 }}>
                  <OptionWheel
                    items={ACTS.map((a, i) => (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                        <span style={{ 
                          fontFamily: 'var(--font-seal)', 
                          fontSize: '0.65em', 
                          color: activeIndex === i ? 'var(--color-brass-gold)' : 'inherit',
                          opacity: activeIndex === i ? 1 : 0.6,
                          letterSpacing: '0.1em'
                        }}>
                          {a.number}
                        </span>
                        <span style={{
                          fontFamily: 'var(--font-body)',
                          textTransform: 'uppercase',
                          letterSpacing: '0.15em',
                          color: a.id === 'reserva' && activeIndex !== i ? 'rgba(179,18,42,0.8)' : 'inherit',
                        }}>
                          {a.label}
                        </span>
                      </div>
                    ))}
                    defaultSelected={0}
                    selected={activeIndex}
                    onChange={(idx) => setActiveIndex(idx)}
                    onConfirm={(idx) => handleNavigate(idx)}
                    textColor="rgba(231,224,210,0.35)"
                    activeColor="#C9A24B"
                    side="left"
                    fontSize={1.15}
                    spacing={2.8}
                    curve={1.25}
                    tilt={15}
                    blur={1.5}
                    fade={0.35}
                    inset={145}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* O Relógio Lateral Maior */}
          <motion.div
            className="clock-trigger"
            onClick={() => setIsOpen(!isOpen)}
            style={{
              position: 'absolute',
              top: '50%',
              left: '2rem',
              y: '-50%',
              zIndex: 3,
              width: '90px',
              height: '90px',
              borderRadius: '50%',
              border: '1.5px solid rgba(201, 162, 75, 0.5)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'radial-gradient(circle at 50% 50%, rgba(46,26,61,0.95) 0%, rgba(10,10,13,1) 100%)',
              boxShadow: '0 0 50px rgba(0,0,0,0.8), inset 0 0 20px rgba(201,162,75,0.15)',
              pointerEvents: 'auto',
              cursor: 'pointer'
            }}
          >
              <div style={{ position: 'absolute', inset: '6px', border: '1px dashed rgba(201,162,75,0.3)', borderRadius: '50%' }} />

              {[0, 90, 180, 270].map((deg) => (
                <div
                  key={deg}
                  style={{
                    position: 'absolute',
                    width: '1.5px',
                    height: '8px',
                    background: 'var(--color-brass-gold)',
                    transform: `rotate(${deg}deg) translateY(-34px)`,
                  }}
                />
              ))}

              <div style={{ width: '6px', height: '6px', background: 'var(--color-brass-gold)', borderRadius: '50%', zIndex: 10 }} />

              <motion.div
                style={{
                  position: 'absolute',
                  width: '3px',
                  height: '24px',
                  background: 'var(--color-brass-gold)',
                  transformOrigin: 'bottom center',
                  bottom: '50%',
                  rotate: hourRotation,
                  borderRadius: '2px',
                }}
              />

              <motion.div
                style={{
                  position: 'absolute',
                  width: '1.5px',
                  height: '34px',
                  background: 'var(--color-veiled-ivory)',
                  transformOrigin: 'bottom center',
                  bottom: '50%',
                  rotate: minuteRotation,
                  opacity: 0.95,
                }}
              />
          </motion.div>

          <style>{`
            @media (max-width: 768px) {
              .scroll-clock-container {
                width: 260px !important;
              }
              .clock-trigger {
                width: 60px !important;
                height: 60px !important;
                left: 1rem !important;
              }
              .needle-indicator {
                left: 70px !important;
                width: 30px !important;
              }
            }
          `}</style>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
