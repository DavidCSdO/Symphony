'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { SectionDivider } from '@/components/ui/SectionDivider';
import { KineticWatch3D } from '@/components/3d/KineticWatch3D';

const featuredProducts = [
  {
    id: 'automato-corvo-001',
    sku: 'AUTÔMATO-001',
    name: 'Autômato Corvo-Relojoeiro',
    description: 'Bate as asas e revela um mostrador de relógio no peito. Corda manual, 72h de autonomia.',
    edition: '0/100',
    price: 4800,
    materials: 'Latão, mogno, cristal mineral',
    mechanism: '14 peças móveis',
  },
  {
    id: 'relogio-sanchez-001',
    sku: 'SANCHEZ-N01',
    name: 'Sanchez No. 1 — Vinho Profundo',
    description: 'Mostrador vinho escuro, ponteiros dourados. Mecanismo automático ETA 2824-2.',
    edition: '0/50',
    price: 7200,
    materials: 'Aço inox, couro, safira',
    mechanism: '28 jewels · 28.800 vph',
  },
  {
    id: 'caixa-sinfonia',
    sku: 'CAIXA-S01',
    name: 'Caixa Sinfonia da Cidade',
    description: 'Toca uma melodia autoral de 40 segundos. Mecanismo de 18 notas, cilindro em latão.',
    edition: '0/200',
    price: 1900,
    materials: 'Madeira ebonizada, latão, veludo',
    mechanism: '18 notas · cilindro 60mm',
  },
  {
    id: 'rob-sentinela',
    sku: 'ROBÔ-0/100',
    name: 'Robô Sentinela',
    description: 'Série assinada e numerada à mão. Articulações em latão, olhos em âmbar sintético.',
    edition: '0/100',
    price: 3400,
    materials: 'Latão, cobre, âmbar sintético',
    mechanism: '8 articulações · base magnética',
  },
];

function ProductCard({ product, index }: { product: typeof featuredProducts[0]; index: number }) {
  const [hovered, setHovered] = useState(false);

  const formattedPrice = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(product.price);

  return (
    <motion.article
      id={`product-card-${product.id}`}
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: 'var(--color-deep-wine)',
        border: hovered
          ? '1px solid rgba(201,162,75,0.7)'
          : '1px solid rgba(201,162,75,0.15)',
        borderRadius: 'var(--radius-md)',
        overflow: 'hidden',
        transition: 'all var(--transition-base)',
        boxShadow: hovered ? 'var(--shadow-gold)' : 'var(--shadow-card)',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div
        className="cursor-loupe"
        style={{
          height: '240px',
          position: 'relative',
          background: hovered
            ? 'linear-gradient(135deg, #1C0E14 0%, #0A0A0D 100%)'
            : 'linear-gradient(135deg, #0A0A0D 0%, #1C0E14 100%)',
          transition: 'background var(--transition-base)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          cursor: 'none',
        }}
      >
        <div style={{
          position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
          opacity: hovered ? 0 : 0.8,
          transform: hovered ? 'scale(1.05)' : 'scale(1)',
          transition: 'all 600ms cubic-bezier(0.16, 1, 0.3, 1)',
        }}>
          <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
            <circle cx="32" cy="32" r="28" stroke="#C9A24B" strokeWidth="1" strokeOpacity="0.4" />
            <circle cx="32" cy="32" r="22" stroke="#C9A24B" strokeWidth="0.75" strokeDasharray="2 4" strokeOpacity="0.6" />
            <path d="M32 14V32L42 42" stroke="#C9A24B" strokeWidth="1.5" strokeLinecap="round" opacity="0.8" />
          </svg>
        </div>

        <div style={{
          position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          opacity: hovered ? 1 : 0,
          transform: hovered ? 'scale(1)' : 'scale(0.92)',
          transition: 'all 600ms cubic-bezier(0.16, 1, 0.3, 1)',
        }}>
          <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
            <circle cx="40" cy="40" r="36" stroke="#C9A24B" strokeWidth="1" strokeOpacity="0.3" />
            <circle cx="40" cy="40" r="24" stroke="#E7E0D2" strokeWidth="1" strokeDasharray="3 3" opacity="0.5" />
            <circle cx="30" cy="30" r="12" stroke="#C9A24B" strokeWidth="1" opacity="0.7" />
            <circle cx="50" cy="48" r="14" stroke="#C9A24B" strokeWidth="1" opacity="0.7" />
          </svg>
          <span style={{
            fontFamily: 'var(--font-seal)', fontSize: '0.55rem', letterSpacing: '0.15em',
            color: 'var(--color-brass-gold)', marginTop: '0.5rem', textTransform: 'uppercase'
          }}>
            [ Lupa · Vista Explodida ]
          </span>
        </div>

        <span
          style={{
            position: 'absolute',
            top: '0.75rem', right: '0.75rem',
            fontFamily: 'var(--font-mono)', fontSize: '0.65rem',
            color: 'var(--color-brass-gold)', background: 'rgba(10,10,13,0.85)',
            border: '1px solid rgba(201,162,75,0.3)', borderRadius: 'var(--radius-sm)',
            padding: '0.2rem 0.5rem', zIndex: 5,
          }}
        >
          {product.edition}
        </span>
      </div>

      <div style={{ padding: '1.25rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--color-brass-gold)', letterSpacing: '0.12em', opacity: 0.6, marginBottom: '0.4rem' }}>
          {product.sku}
        </p>

        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.15rem', fontWeight: 700, color: 'var(--color-veiled-ivory)', marginBottom: '0.5rem', lineHeight: 1.3 }}>
          {product.name}
        </h3>

        <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '1rem', flex: 1 }}>
          {product.description}
        </p>

        <div style={{ borderTop: '1px solid rgba(201,162,75,0.15)', paddingTop: '0.75rem', marginBottom: '1rem' }}>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--text-muted)', letterSpacing: '0.08em', lineHeight: 1.8 }}>
            {product.materials}<br />
            {product.mechanism}
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '1rem', fontWeight: 700, color: 'var(--color-veiled-ivory)', letterSpacing: '0.05em' }}>
            {formattedPrice}
          </span>
          <Button variant="ghost" size="sm" id={`add-to-cart-${product.id}`} href={`/produto/${product.id}`}>
            Reservar
          </Button>
        </div>
      </div>
    </motion.article>
  );
}

import { useGSAPScroll } from '@/hooks/useGSAPScroll';

export function MidnightSession() {
  const sectionRef = useRef<HTMLElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useGSAPScroll((gsap, ScrollTrigger) => {
    if (!sectionRef.current) return;

    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top bottom',
      end: 'bottom top',
      scrub: 0.5,
      onUpdate: (self) => {
        setScrollProgress(self.progress);
      },
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      id="sessao-meia-noite"
      aria-labelledby="midnight-heading"
      style={{
        background: 'var(--color-gotham-black)',
        padding: 'var(--space-24) var(--space-6)',
      }}
    >
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <SectionDivider />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: 'var(--space-12)' }}
        >
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.2em', color: 'var(--color-marquise-red)', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
            00:00 — MEIA-NOITE
          </p>
          <h2
            id="midnight-heading"
            style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 900, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--color-veiled-ivory)', marginBottom: '0.75rem' }}
          >
            Sessão da Meia-Noite
          </h2>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.95rem', color: 'var(--text-muted)', maxWidth: '400px', margin: '0 auto 2rem' }}>
            Seis peças, cem unidades cada, nunca reeditadas.
          </p>
          <Button variant="gold" size="md" id="midnight-session-enter" href="/reserva">
            Entrar na sessão
          </Button>
        </motion.div>

        {/* Estúdio 3D Interativo — Mecanismo Cinético Three.js sincronizado com GSAP Scroll */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{ marginBottom: 'var(--space-12)' }}
        >
          <KineticWatch3D scrollProgress={scrollProgress} />
        </motion.div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
            gap: 'var(--space-6)',
            marginTop: 'var(--space-10)',
          }}
        >
          {featuredProducts.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
