'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { SectionDivider } from '@/components/ui/SectionDivider';

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

function ProductCard({ product }: { product: typeof featuredProducts[0] }) {
  const [hovered, setHovered] = useState(false);

  const formattedPrice = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(product.price);

  return (
    <article
      id={`product-card-${product.id}`}
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
      {/* Área de imagem — hover revela o mecanismo interno e ativa o cursor de lupa */}
      <div
        className="cursor-loupe" // Ativa o CustomCursor (lupa dourada)
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
          cursor: 'none', // Garante que o cursor nativo não apareça por cima da lupa
        }}
      >
        {/* Imagem Padrão (Exterior) */}
        <div style={{
          position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
          opacity: hovered ? 0 : 0.8,
          transform: hovered ? 'scale(1.05)' : 'scale(1)',
          transition: 'all 600ms cubic-bezier(0.16, 1, 0.3, 1)',
        }}>
          {/* Padrão Deco Exterior */}
          <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
            <rect x="20" y="20" width="40" height="40" stroke="#E7E0D2" strokeWidth="0.5" transform="rotate(45 40 40)" />
            <circle cx="40" cy="40" r="15" stroke="#E7E0D2" strokeWidth="1" />
          </svg>
        </div>

        {/* Imagem Secundária (Mecanismo Revelado) */}
        <div style={{
          position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
          opacity: hovered ? 1 : 0,
          transform: hovered ? 'scale(1)' : 'scale(0.95)',
          transition: 'all 600ms cubic-bezier(0.16, 1, 0.3, 1)',
        }}>
          {/* Padrão Mecânico Interior */}
          <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
            {/* Engrenagem */}
            <circle cx="60" cy="60" r="30" stroke="#C9A24B" strokeWidth="0.5" strokeDasharray="4 2" style={{ animation: 'spin 10s linear infinite' }} />
            <circle cx="60" cy="60" r="20" stroke="#C9A24B" strokeWidth="1" />
            <circle cx="60" cy="60" r="5" fill="#C9A24B" />
            {Array.from({ length: 6 }).map((_, i) => (
              <line key={i} x1="60" y1="40" x2="60" y2="30" stroke="#C9A24B" strokeWidth="1" transform={`rotate(${i * 60} 60 60)`} />
            ))}
          </svg>
          <style>{`@keyframes spin { 100% { transform: rotate(360deg); } }`}</style>
        </div>

        {/* Hover — label "mecanismo revelado" */}
        {hovered && (
          <div
            style={{
              position: 'absolute',
              bottom: '0.75rem',
              left: '50%',
              transform: 'translateX(-50%)',
              background: 'rgba(201,162,75,0.1)',
              border: '1px solid rgba(201,162,75,0.3)',
              borderRadius: '2px',
              padding: '0.25rem 0.75rem',
              pointerEvents: 'none',
              animation: 'fadeInUp 400ms ease forwards',
            }}
          >
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'var(--color-brass-gold)', letterSpacing: '0.15em' }}>
              MECANISMO REVELADO
            </span>
          </div>
        )}

        {/* Badge de edição */}
        <div
          style={{
            position: 'absolute',
            top: '0.75rem',
            right: '0.75rem',
            background: 'rgba(179,18,42,0.9)',
            padding: '0.2rem 0.5rem',
            borderRadius: '2px',
            pointerEvents: 'none',
          }}
        >
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'var(--color-veiled-ivory)', letterSpacing: '0.1em' }}>
            {product.edition}
          </span>
        </div>
      </div>

      {/* Informações */}
      <div style={{ padding: '1.25rem 1.5rem 1.5rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
        {/* SKU */}
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'var(--color-brass-gold)', letterSpacing: '0.15em', opacity: 0.7, marginBottom: '0.5rem' }}>
          {product.sku}
        </p>

        {/* Nome */}
        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: 700, color: 'var(--color-veiled-ivory)', marginBottom: '0.5rem', lineHeight: 1.3 }}>
          {product.name}
        </h3>

        {/* Descrição */}
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '1rem', flex: 1 }}>
          {product.description}
        </p>

        {/* Specs — "Anatomia da peça" simplificada */}
        <div style={{ borderTop: '1px solid rgba(201,162,75,0.15)', paddingTop: '0.75rem', marginBottom: '1rem' }}>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--text-muted)', letterSpacing: '0.08em', lineHeight: 1.8 }}>
            {product.materials}<br />
            {product.mechanism}
          </p>
        </div>

        {/* Preço + CTA */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '1rem', fontWeight: 700, color: 'var(--color-veiled-ivory)', letterSpacing: '0.05em' }}>
            {formattedPrice}
          </span>
          <Button variant="ghost" size="sm" id={`add-to-cart-${product.id}`}>
            Reservar
          </Button>
        </div>
      </div>
    </article>
  );
}

export function MidnightSession() {
  return (
    <section
      id="sessao-meia-noite"
      aria-labelledby="midnight-heading"
      style={{
        background: 'var(--color-gotham-black)',
        padding: 'var(--space-24) var(--space-6)',
      }}
    >
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <SectionDivider />

        {/* Cabeçalho */}
        <div style={{ textAlign: 'center', marginBottom: 'var(--space-12)' }}>
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
          <Button variant="gold" size="md" id="midnight-session-enter">
            Entrar na sessão
          </Button>
        </div>

        {/* Grade de produtos */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
            gap: 'var(--space-6)',
            marginTop: 'var(--space-10)',
          }}
        >
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
