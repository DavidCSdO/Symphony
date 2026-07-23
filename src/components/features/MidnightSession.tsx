'use client';

import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { SectionDivider } from '@/components/ui/SectionDivider';
import { KineticWatch3D } from '@/components/3d/KineticWatch3D';
import { ProductCarousel, CarouselProduct } from '@/components/ui/ProductCarousel';

const featuredProducts: CarouselProduct[] = [
  {
    id: 'automato-corvo-001',
    sku: 'AUTÔMATO-001',
    name: 'Autômato Corvo-Relojoeiro',
    description: 'Bate as asas e revela um mostrador de relógio no peito. Corda manual, 72h de autonomia.',
    price: 4800,
    image: '/images/corvo_automato_1784824184130.png',
    badge: 'Bestseller',
    rotation: -3,
  },
  {
    id: 'relogio-sanchez-001',
    sku: 'SANCHEZ-N01',
    name: 'Sanchez No. 1',
    description: 'Mostrador vinho escuro, ponteiros dourados. Mecanismo automático ETA 2824-2.',
    price: 7200,
    image: '/images/relogio_vinho_1784824193613.png',
    badge: 'New',
    rotation: 2,
  },
  {
    id: 'caixa-sinfonia',
    sku: 'CAIXA-S01',
    name: 'Sinfonia da Cidade',
    description: 'Toca uma melodia autoral de 40 segundos. Mecanismo de 18 notas, cilindro em latão.',
    price: 1900,
    image: '/images/caixa_musica_1784824201836.png',
    badge: 'Classic',
    rotation: -1.5,
  },
  {
    id: 'rob-sentinela',
    sku: 'ROBÔ-0/100',
    name: 'Robô Sentinela',
    description: 'Série assinada e numerada à mão. Articulações em latão, olhos em âmbar sintético.',
    price: 3400,
    image: '/images/robo_sentinela_1784824211835.png',
    badge: 'Bestseller',
    rotation: 3,
  },
  {
    id: 'astrolabio-ouro',
    sku: 'ASTRO-090',
    name: 'Astrolábio de Bolso',
    description: 'Réplica funcional em latão e ouro rosé. Calcula constelações no hemisfério sul.',
    price: 5200,
    image: '/images/bento_mecanismo_dois_1784824232087.png',
    badge: 'New',
    rotation: -2.5,
  },
  {
    id: 'lupa-relojoeiro-pro',
    sku: 'LUPA-P01',
    name: 'Lupa Monocular Pro',
    description: 'Lente de safira 10x de magnificação. Aro de titânio esculpido à mão.',
    price: 850,
    image: '/images/media__1784818400374.png',
    badge: 'Essential',
    rotation: 1.5,
  },
  {
    id: 'pindulo-caos',
    sku: 'CAOS-001',
    name: 'Pêndulo do Caos',
    description: 'Objeto cinético de mesa. Movimento perpétuo aparente simulando atratores estranhos.',
    price: 2100,
    image: '/images/bento_mecanismo_um_1784824221141.png',
    badge: 'Bestseller',
    rotation: -3.5,
  },
  {
    id: 'relogio-esqueleto-02',
    sku: 'SKEL-002',
    name: 'Sanchez Esqueleto',
    description: 'Mecanismo inteiramente exposto. Tambor gravado com arabescos góticos.',
    price: 8900,
    image: '/images/media__1784820933384.png',
    badge: 'Archive',
    rotation: 2.5,
  }
];

export function MidnightSession() {
  return (
    <section
      id="sessao-meia-noite"
      aria-labelledby="midnight-heading"
      style={{
        background: 'var(--color-gotham-black)',
        paddingTop: 'var(--space-24)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div style={{ maxWidth: '1280px', margin: '0 auto', position: 'relative', padding: '0 var(--space-6)' }}>
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
            Acesso exclusivo ao catálogo completo da oficina Sanchez.
          </p>
        </motion.div>

        {/* Estúdio 3D Interativo */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <KineticWatch3D scrollProgress={0.5} />
        </motion.div>
      </div>

      {/* The new Coda Press Style Carousel */}
      <ProductCarousel products={featuredProducts} />
      
    </section>
  );
}
