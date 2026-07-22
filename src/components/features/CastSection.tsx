'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
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

function CategoryCard({ cat }: { cat: typeof categories[0] }) {
  const [hovered, setHovered] = useState(false);

  return (
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
  );
}

export function CastSection() {
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
      <div style={{ textAlign: 'center', marginBottom: 'var(--space-12)' }}>
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
      </div>

      {/* Cards de categoria */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
          gap: 'var(--space-4)',
        }}
      >
        {categories.map((cat) => (
          <CategoryCard key={cat.id} cat={cat} />
        ))}
      </div>

      {/* Preview usando o cards.png */}
      <div
        style={{
          marginTop: 'var(--space-12)',
          borderRadius: 'var(--radius-lg)',
          overflow: 'hidden',
          border: '1px solid rgba(201, 162, 75, 0.2)',
          position: 'relative',
          height: '320px',
        }}
      >
        <Image
          src="/Context/cards/cards.png"
          alt="Curadoria de peças do Ateliê Sanchez"
          fill
          style={{ objectFit: 'cover', objectPosition: 'center' }}
          sizes="(max-width: 1280px) 100vw, 1280px"
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to right, rgba(10,10,13,0.8) 0%, transparent 50%, rgba(10,10,13,0.6) 100%)',
            display: 'flex',
            alignItems: 'center',
            padding: '0 3rem',
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
                maxWidth: '300px',
              }}
            >
              Cada peça conta uma história de engrenagem
            </h3>
          </div>
        </div>
      </div>
    </section>
  );
}
