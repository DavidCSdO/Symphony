'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { SectionDivider } from '@/components/ui/SectionDivider';

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
              ? 'linear-gradient(135deg, rgba(46,26,61,0.9) 0%, rgba(28,14,20,0.95) 100%)'
              : 'var(--color-deep-wine)',
            border: hovered
              ? '1px solid rgba(201, 162, 75, 0.6)'
              : '1px solid rgba(201, 162, 75, 0.15)',
            borderRadius: 'var(--radius-md)',
            padding: '2rem 1.5rem',
            transition: 'all var(--transition-base)',
            boxShadow: hovered ? 'var(--shadow-gold)' : 'none',
            cursor: 'pointer',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Linha dourada superior */}
          <span
            style={{
              display: 'block',
              width: hovered ? '100%' : '32px',
              height: '1px',
              background: 'var(--color-brass-gold)',
              marginBottom: '1.5rem',
              transition: 'width 400ms ease',
              opacity: hovered ? 1 : 0.5,
            }}
          />

          {/* SKU */}
          <p
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.65rem',
              color: 'var(--color-brass-gold)',
              letterSpacing: '0.15em',
              opacity: 0.6,
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

          {/* Seta */}
          <span
            style={{
              position: 'absolute',
              bottom: '1.5rem',
              right: '1.5rem',
              color: 'var(--color-brass-gold)',
              fontSize: '1.25rem',
              opacity: hovered ? 1 : 0.3,
              transform: hovered ? 'translateX(4px)' : 'translateX(0)',
              transition: 'all var(--transition-base)',
            }}
          >
            →
          </span>
        </article>
      </Link>
    </motion.div>
  );
}

import { useRef } from 'react';
import { useGSAPScroll } from '@/hooks/useGSAPScroll';

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
        rotationY: -15,
        transformPerspective: 1000,
      },
      {
        opacity: 1,
        y: 0,
        rotationY: 0,
        duration: 0.8,
        stagger: 0.12,
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
        <p
          style={{
            fontFamily: 'var(--font-seal)',
            fontSize: '0.7rem',
            letterSpacing: '0.22em',
            color: 'var(--color-brass-gold)',
            textTransform: 'uppercase',
            marginBottom: '0.75rem',
          }}
        >
          Ato II
        </p>
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

      {/* Cards de categoria com GSAP 3D stagger */}
      <div
        ref={containerRef}
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
          gap: 'var(--space-4)',
          perspective: '1000px',
        }}
      >
        {categories.map((cat, i) => (
          <div key={cat.id} className="category-card-wrapper">
            <CategoryCard cat={cat} index={i} />
          </div>
        ))}
      </div>

      {/* Preview usando o cards.png com efeito de scroll scale/fade */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 30 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        style={{
          marginTop: 'var(--space-12)',
          borderRadius: 'var(--radius-lg)',
          overflow: 'hidden',
          border: '1px solid rgba(201, 162, 75, 0.35)',
          position: 'relative',
          height: '280px',
          background: 'radial-gradient(circle at 50% 50%, #1C0E14 0%, #0A0A0D 100%)',
          boxShadow: '0 20px 50px rgba(10,10,13,0.85)',
        }}
      >
        <Image
          src="/Context/cards/cards.png"
          alt="Curadoria de peças do Ateliê Sanchez"
          fill
          style={{ objectFit: 'cover', objectPosition: 'center', opacity: 0.7 }}
          sizes="(max-width: 1280px) 100vw, 1280px"
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to right, rgba(10,10,13,0.92) 0%, rgba(10,10,13,0.4) 50%, rgba(10,10,13,0.8) 100%)',
            display: 'flex',
            alignItems: 'center',
            padding: '0 3rem',
            zIndex: 2,
          }}
        >
          <div>
            <p
              style={{
                fontFamily: 'var(--font-seal)',
                fontSize: '0.65rem',
                letterSpacing: '0.2em',
                color: 'var(--color-brass-gold)',
                marginBottom: '0.5rem',
              }}
            >
              CURADORIA 2025
            </p>
            <h3
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.75rem',
                color: 'var(--color-veiled-ivory)',
                fontWeight: 700,
                lineHeight: 1.2,
                maxWidth: '380px',
              }}
            >
              Cada peça conta uma história de engrenagem
            </h3>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
