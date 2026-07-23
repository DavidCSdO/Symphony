'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { SectionDivider } from '@/components/ui/SectionDivider';
import { useGSAPScroll } from '@/hooks/useGSAPScroll';
import { ArrowRight } from 'lucide-react';

const categories = [
  {
    id: 'automatos',
    sku: 'CAT-001',
    name: 'Autômatos',
    subtitle: 'Esculturas cinéticas de corda manual',
    href: '/colecao/automatos',
  },
  {
    id: 'relogios',
    sku: 'CAT-002',
    name: 'Relógios',
    subtitle: 'Linha Sanchez — mecanismo à vista',
    href: '/colecao/relogios',
  },
  {
    id: 'caixas',
    sku: 'CAT-003',
    name: 'Caixas de Música',
    subtitle: 'Melodias autorais em latão',
    href: '/colecao/caixas-de-musica',
  },
  {
    id: 'joias',
    sku: 'CAT-004',
    name: 'Joias Cinéticas',
    subtitle: 'Engrenagens que vivem no corpo',
    href: '/colecao/joias',
  },
  {
    id: 'escrivaninha',
    sku: 'CAT-005',
    name: 'Objetos de Escrivaninha',
    subtitle: 'Precisão sobre latão e madeira',
    href: '/colecao/escrivaninha',
  },
];

function CategoryCard({ cat, index }: { cat: typeof categories[0]; index: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
    >
      <Link
        href={cat.href}
        id={`category-card-${cat.id}`}
        aria-label={`Ver categoria: ${cat.name}`}
        style={{ textDecoration: 'none', display: 'block' }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <article
          style={{
            background: hovered
              ? 'linear-gradient(145deg, rgba(46,26,61,0.7) 0%, rgba(28,14,20,0.85) 100%)'
              : 'rgba(28,14,20,0.5)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            border: hovered
              ? '1px solid rgba(201, 162, 75, 0.6)'
              : '1px solid rgba(201, 162, 75, 0.12)',
            borderRadius: 'var(--radius-lg)',
            padding: '2rem 1.5rem',
            transition: 'all 350ms cubic-bezier(0.16, 1, 0.3, 1)',
            boxShadow: hovered
              ? '0 0 30px rgba(201, 162, 75, 0.15), 0 20px 40px rgba(10,10,13,0.6)'
              : '0 4px 20px rgba(10,10,13,0.3)',
            cursor: 'pointer',
            position: 'relative',
            overflow: 'hidden',
            transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
          }}
        >
          {/* Shimmer on hover */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(115deg, transparent 30%, rgba(201,162,75,0.06) 50%, transparent 70%)',
              opacity: hovered ? 1 : 0,
              transition: 'opacity 400ms ease',
              pointerEvents: 'none',
            }}
          />

          {/* Linha dourada superior */}
          <span
            style={{
              display: 'block',
              width: hovered ? '100%' : '32px',
              height: '1px',
              background: 'linear-gradient(to right, var(--color-brass-gold), transparent)',
              marginBottom: '1.5rem',
              transition: 'width 500ms cubic-bezier(0.16, 1, 0.3, 1)',
              opacity: hovered ? 1 : 0.4,
            }}
          />

          {/* SKU */}
          <p
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.6rem',
              color: 'var(--color-brass-gold)',
              letterSpacing: '0.18em',
              opacity: 0.5,
              marginBottom: '0.75rem',
            }}
          >
            {cat.sku}
          </p>

          {/* Nome */}
          <h3
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.375rem',
              fontWeight: 700,
              color: 'var(--color-veiled-ivory)',
              letterSpacing: '0.03em',
              marginBottom: '0.5rem',
              lineHeight: 1.2,
              transition: 'color 250ms ease',
            }}
          >
            {cat.name}
          </h3>

          {/* Subtítulo */}
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.8rem',
              color: 'var(--text-muted)',
              lineHeight: 1.5,
            }}
          >
            {cat.subtitle}
          </p>

          {/* Arrow icon */}
          <div
            style={{
              position: 'absolute',
              bottom: '1.25rem',
              right: '1.25rem',
              color: 'var(--color-brass-gold)',
              opacity: hovered ? 1 : 0.2,
              transform: hovered ? 'translateX(4px)' : 'translateX(0)',
              transition: 'all 350ms cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            <ArrowRight size={18} />
          </div>
        </article>
      </Link>
    </motion.div>
  );
}

export function CastSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAPScroll((gsap, ScrollTrigger) => {
    if (!containerRef.current) return;

    const cards = containerRef.current.querySelectorAll('.category-card-wrapper');
    if (cards.length === 0) return;

    gsap.fromTo(
      cards,
      {
        opacity: 0,
        y: 60,
        rotationY: -8,
        transformPerspective: 1200,
      },
      {
        opacity: 1,
        y: 0,
        rotationY: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      }
    );
  }, []);

  return (
    <section
      id="elenco"
      aria-labelledby="cast-heading"
      style={{
        padding: 'var(--space-24) var(--space-6)',
        maxWidth: '1280px',
        margin: '0 auto',
      }}
    >
      <SectionDivider />

      {/* Cabeçalho */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6 }}
        style={{ textAlign: 'center', marginBottom: 'var(--space-12)' }}
      >
        <motion.p
          initial={{ opacity: 0, letterSpacing: '0.5em' }}
          whileInView={{ opacity: 1, letterSpacing: '0.22em' }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{
            fontFamily: 'var(--font-seal)',
            fontSize: '0.7rem',
            color: 'var(--color-brass-gold)',
            textTransform: 'uppercase',
            marginBottom: '0.75rem',
          }}
        >
          Ato II
        </motion.p>
        <h2
          id="cast-heading"
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2rem, 5vw, 3rem)',
            fontWeight: 900,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: 'var(--color-veiled-ivory)',
            marginBottom: '0.75rem',
          }}
        >
          O Elenco
        </h2>
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{
            width: '48px',
            height: '1px',
            background: 'var(--color-brass-gold)',
            margin: '0 auto 1rem',
            transformOrigin: 'center',
          }}
        />
        <p
          style={{
            fontFamily: 'var(--font-display)',
            fontStyle: 'italic',
            fontSize: '1rem',
            color: 'var(--text-muted)',
          }}
        >
          Cada categoria, um personagem em cena.
        </p>
      </motion.div>

      {/* Cards de categoria */}
      <div
        ref={containerRef}
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
          gap: 'var(--space-4)',
          perspective: '1200px',
        }}
      >
        {categories.map((cat, i) => (
          <div key={cat.id} className="category-card-wrapper">
            <CategoryCard cat={cat} index={i} />
          </div>
        ))}
      </div>

      {/* Preview banner Bento Box */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 30 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="preview-banner-bento"
        style={{
          marginTop: 'var(--space-12)',
          borderRadius: 'var(--radius-lg)',
          overflow: 'hidden',
          border: '1px solid rgba(201, 162, 75, 0.25)',
          background: 'var(--color-gotham-black)',
          boxShadow: '0 20px 60px rgba(10,10,13,0.9)',
          display: 'grid',
          gap: '1px',
        }}
      >
        {/* Celula 1: Texto */}
        <div style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(28,14,20,0.8) 0%, rgba(10,10,13,0.95) 100%)',
          padding: '3rem',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          position: 'relative',
        }}>
          {/* Film grain local */}
          <div aria-hidden="true" style={{ position: 'absolute', inset: 0, zIndex: 1, opacity: 0.04, pointerEvents: 'none', backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`, backgroundRepeat: 'repeat', mixBlendMode: 'overlay' }} />
          
          <div style={{ position: 'relative', zIndex: 2 }}>
            <p style={{
              fontFamily: 'var(--font-seal)', fontSize: '0.65rem', letterSpacing: '0.25em',
              color: 'var(--color-brass-gold)', marginBottom: '0.75rem', opacity: 0.8,
            }}>
              CURADORIA 2025
            </p>
            <h3 style={{
              fontFamily: 'var(--font-display)', fontSize: '2rem', color: 'var(--color-veiled-ivory)',
              fontWeight: 700, lineHeight: 1.2, maxWidth: '100%',
            }}>
              Cada peça conta uma história de engrenagem
            </h3>
            <div style={{ marginTop: '1.5rem', width: '40px', height: '1px', background: 'var(--color-brass-gold)' }} />
          </div>
        </div>

        {/* Celula 2: Detalhe mecânico */}
        <div className="bento-image-cell" style={{ position: 'relative', background: '#0a0a0d', minHeight: '280px' }}>
          <img 
            src="/images/bento_mecanismo_um_1784824221141.png" 
            alt="Mecanismo macro"
            style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.7 }}
          />
          <div style={{ position: 'absolute', inset: 0, boxShadow: 'inset 0 0 40px rgba(10,10,13,0.8)' }} />
        </div>

        {/* Celula 3: Latão */}
        <div className="bento-image-cell" style={{ position: 'relative', background: '#0a0a0d', minHeight: '280px' }}>
          <img 
            src="/images/bento_mecanismo_dois_1784824232087.png" 
            alt="Engrenagens de latão"
            style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.6 }}
          />
          <div style={{ position: 'absolute', inset: 0, boxShadow: 'inset 0 0 40px rgba(10,10,13,0.8)' }} />
        </div>
      </motion.div>

      <style>{`
        .preview-banner-bento {
          grid-template-columns: 1.5fr 1fr 1fr;
          background: rgba(201, 162, 75, 0.1) !important; /* as 1px borders */
        }
        @media (max-width: 900px) {
          .preview-banner-bento {
            grid-template-columns: 1fr;
          }
          .bento-image-cell {
            min-height: 200px !important;
          }
        }
      `}</style>
    </section>
  );
}
