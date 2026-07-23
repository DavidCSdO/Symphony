'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { SectionDivider } from '@/components/ui/SectionDivider';
import { KineticWatch3D } from '@/components/3d/KineticWatch3D';
import { useGSAPScroll } from '@/hooks/useGSAPScroll';
import { Eye, ShoppingBag } from 'lucide-react';

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
    image: '/images/corvo_automato_1784824184130.png',
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
    image: '/images/relogio_vinho_1784824193613.png',
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
    image: '/images/caixa_musica_1784824201836.png',
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
    image: '/images/robo_sentinela_1784824211835.png',
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
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: 'rgba(28,14,20,0.5)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        border: hovered
          ? '1px solid rgba(201,162,75,0.5)'
          : '1px solid rgba(201,162,75,0.1)',
        borderRadius: 'var(--radius-lg)',
        overflow: 'hidden',
        transition: 'all 350ms cubic-bezier(0.16, 1, 0.3, 1)',
        boxShadow: hovered
          ? '0 0 30px rgba(201,162,75,0.12), 0 25px 50px rgba(10,10,13,0.7)'
          : '0 4px 20px rgba(10,10,13,0.4)',
        display: 'flex',
        flexDirection: 'column',
        transform: hovered ? 'translateY(-6px)' : 'translateY(0)',
      }}
    >
      {/* Visual area */}
      <div
        style={{
          height: '240px',
          position: 'relative',
          background: hovered
            ? 'radial-gradient(circle at 50% 50%, rgba(46,26,61,0.5) 0%, rgba(10,10,13,0.95) 80%)'
            : 'radial-gradient(circle at 50% 50%, rgba(28,14,20,0.3) 0%, rgba(10,10,13,0.95) 80%)',
          transition: 'background 500ms ease',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
        }}
      >
        {/* Product image */}
        <div style={{
          position: 'absolute', inset: 0,
          opacity: hovered ? 0.3 : 0.8,
          transform: hovered ? 'scale(1.05)' : 'scale(1)',
          transition: 'all 600ms cubic-bezier(0.16, 1, 0.3, 1)',
        }}>
          <img 
            src={product.image} 
            alt={product.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,10,13,0.9) 0%, transparent 50%)' }} />
        </div>

        {/* Hover state — magnified view */}
        <div style={{
          position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          opacity: hovered ? 1 : 0,
          transform: hovered ? 'scale(1)' : 'scale(0.9)',
          transition: 'all 500ms cubic-bezier(0.16, 1, 0.3, 1)',
        }}>
          <Eye size={28} color="#C9A24B" style={{ opacity: 0.7, marginBottom: '0.75rem' }} />
          <span style={{
            fontFamily: 'var(--font-seal)', fontSize: '0.5rem', letterSpacing: '0.2em',
            color: 'var(--color-brass-gold)', textTransform: 'uppercase', opacity: 0.8,
          }}>
            Vista Explodida
          </span>
        </div>

        {/* Edition badge */}
        <span
          style={{
            position: 'absolute',
            top: '0.75rem', right: '0.75rem',
            fontFamily: 'var(--font-mono)', fontSize: '0.6rem',
            color: 'var(--color-brass-gold)',
            background: 'rgba(10,10,13,0.85)',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(201,162,75,0.25)',
            borderRadius: 'var(--radius-sm)',
            padding: '0.2rem 0.6rem', zIndex: 5,
            letterSpacing: '0.1em',
          }}
        >
          {product.edition}
        </span>
      </div>

      <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'var(--color-brass-gold)', letterSpacing: '0.15em', opacity: 0.45, marginBottom: '0.4rem' }}>
          {product.sku}
        </p>

        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.15rem', fontWeight: 700, color: 'var(--color-veiled-ivory)', marginBottom: '0.5rem', lineHeight: 1.3 }}>
          {product.name}
        </h3>

        <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.65, marginBottom: '1rem', flex: 1 }}>
          {product.description}
        </p>

        {/* Materials / mechanism info */}
        <div style={{ borderTop: '1px solid rgba(201,162,75,0.1)', paddingTop: '0.75rem', marginBottom: '1rem' }}>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'var(--text-muted)', letterSpacing: '0.08em', lineHeight: 1.9 }}>
            {product.materials}<br />
            {product.mechanism}
          </p>
        </div>

        {/* Price + CTA */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
          <span style={{
            fontFamily: 'var(--font-mono)', fontSize: '1rem', fontWeight: 700,
            color: 'var(--color-veiled-ivory)', letterSpacing: '0.05em',
          }}>
            {formattedPrice}
          </span>
          <Button variant="ghost" size="sm" id={`add-to-cart-${product.id}`} href={`/produto/${product.id}`}>
            <ShoppingBag size={13} style={{ marginRight: '0.25rem' }} />
            Reservar
          </Button>
        </div>
      </div>
    </motion.article>
  );
}

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
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Subtle radial glow */}
      <div aria-hidden="true" style={{
        position: 'absolute',
        top: '20%', left: '50%', transform: 'translateX(-50%)',
        width: '600px', height: '400px',
        background: 'radial-gradient(circle, rgba(179,18,42,0.06) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '1280px', margin: '0 auto', position: 'relative' }}>
        <SectionDivider />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: 'var(--space-12)' }}
        >
          {/* Pulsing red dot */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
            <span style={{
              width: '6px', height: '6px', borderRadius: '50%',
              background: 'var(--color-marquise-red)',
              boxShadow: '0 0 12px var(--color-marquise-red)',
              animation: 'goldPulse 3s ease-in-out infinite',
            }} />
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.2em', color: 'var(--color-marquise-red)', textTransform: 'uppercase', margin: 0 }}>
              00:00 — MEIA-NOITE
            </p>
          </div>

          <h2
            id="midnight-heading"
            style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 900, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--color-veiled-ivory)', marginBottom: '0.5rem' }}
          >
            Sessão da Meia-Noite
          </h2>

          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{ width: '48px', height: '1px', background: 'var(--color-marquise-red)', margin: '0 auto 1rem', transformOrigin: 'center' }}
          />

          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.95rem', color: 'var(--text-muted)', maxWidth: '400px', margin: '0 auto 2rem' }}>
            Seis peças, cem unidades cada, nunca reeditadas.
          </p>
          <Button variant="gold" size="md" id="midnight-session-enter" href="/reserva">
            Entrar na sessão
          </Button>
        </motion.div>

        {/* Estúdio 3D Interativo */}
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
            gridTemplateColumns: 'repeat(auto-fill, minmax(270px, 1fr))',
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
