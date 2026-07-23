'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { SectionDivider } from '@/components/ui/SectionDivider';
import { Button } from '@/components/ui/Button';
import { SketchfabViewer } from '@/components/3d/SketchfabViewer';
import { ShieldCheck, Clock, Award, CheckCircle, ChevronRight } from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';

const PRODUCTS_CATALOG: Record<string, {
  id: string;
  sku: string;
  name: string;
  edition: string;
  price: number;
  description: string;
  materials: string;
  mechanism: string;
  details: string[];
  image: string;
  modelId: string;
}> = {
  'automato-corvo-001': {
    id: 'automato-corvo-001',
    sku: 'AUTÔMATO-001',
    name: 'Autômato Corvo-Relojoeiro',
    edition: '0/100',
    price: 4800,
    description: 'Um autômato mecânico de corda manual que bate as asas com movimentos anatômicos e abre a caixa torácica em ciclos para revelar o escapamento de relógio a cada 12 segundos.',
    materials: 'Latão maciço usinado, mogno ebonizado, cristal mineral temperado, âmbar sintético.',
    mechanism: 'Movimento de corda manual com 14 rodas dentadas funcionais · Autonomia de 72 horas.',
    image: '/images/corvo_automato_1784824184130.png',
    modelId: 'automaton-gear',
    details: [
      'Garantia vitalícia de manutenção de engrenagens no Ateliê Sanchez',
      'Acompanha estojo selado em madeira com cera de lacre vermelha',
      'Certificado de autenticidade assinado e numerado à mão',
      'Manual de corda e chaveiros em latão gravado',
    ],
  },
  'relogio-sanchez-001': {
    id: 'relogio-sanchez-001',
    sku: 'SANCHEZ-N01',
    name: 'Sanchez No. 1 — Vinho Profundo',
    edition: '0/50',
    price: 7200,
    description: 'Mostrador vinho escuro escovado com ponteiros banhados a ouro 18k. O cristal de safira expõe a oscilação do balancim automático ETA a 28.800 vibrações por hora.',
    materials: 'Aço inox 316L, pulseira em couro de jacaré legítimo, cristal de safira anti-reflexo.',
    mechanism: 'Movimento Automático ETA 2824-2 modificado · 28 jewels · Reserva de marcha de 38h.',
    image: '/images/relogio_vinho_1784824193613.png',
    modelId: 'pocket-watch',
    details: [
      'Resistência à água de 50 metros (5 ATM)',
      'Mostrador vazado Art Déco gravado a laser de precisão',
      'Fivela personalizada em aço e ouro 18k',
      'Acompanha caixa de apresentação e loupe de relojoeiro',
    ],
  },
  'caixa-sinfonia': {
    id: 'caixa-sinfonia',
    sku: 'CAIXA-S01',
    name: 'Caixa Sinfonia da Cidade',
    edition: '0/200',
    price: 1900,
    description: 'Toca uma melodia autoral de 40 segundos. Cilindro em latão exposto com pinos musicais e pente de 18 notas em aço temperado.',
    materials: 'Madeira ebonizada, latão, veludo',
    mechanism: '18 notas · cilindro 60mm',
    image: '/images/caixa_musica_1784824201836.png',
    modelId: 'astronomical-clock',
    details: [
      'Melodia autoral "Symphony of Night" exclusiva',
      'Caixa de ressonância em madeira nobre ebonizada',
      'Cristal chanfrado para visualização do mecanismo musical',
    ],
  },
  'rob-sentinela': {
    id: 'rob-sentinela',
    sku: 'ROBÔ-0/100',
    name: 'Robô Sentinela',
    edition: '0/100',
    price: 3400,
    description: 'Série assinada e numerada à mão. Escultura com 8 articulações magnéticas e olhos iluminados com textura de âmbar sintético.',
    materials: 'Latão, cobre, âmbar sintético',
    mechanism: '8 articulações · base magnética',
    image: '/images/robo_sentinela_1784824211835.png',
    modelId: 'automaton-gear',
    details: [
      'Articulações posicionáveis com imãs de neodímio',
      'Olhos com textura realista de âmbar',
      'Acompanha base de exibição metálica polida',
    ],
  },
};

export default function ProductDetailPage() {
  const params = useParams();
  const productId = (params?.id as string) || 'automato-corvo-001';
  const product = PRODUCTS_CATALOG[productId] || PRODUCTS_CATALOG['automato-corvo-001'];
  
  const { addItem, toggleCart } = useCartStore();

  return (
    <div style={{ background: 'var(--color-gotham-black)', minHeight: '100vh', color: 'var(--color-veiled-ivory)', position: 'relative' }}>
      <Header />

      {/* Background glow */}
      <div aria-hidden="true" style={{
        position: 'absolute', top: '15%', left: '50%', transform: 'translateX(-50%)',
        width: '750px', height: '450px',
        background: 'radial-gradient(circle, rgba(46,26,61,0.25) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <main style={{ paddingTop: '130px', paddingBottom: '100px', maxWidth: '1280px', margin: '0 auto', paddingInline: '1.5rem', position: 'relative' }}>
        {/* Breadcrumb */}
        <div style={{ marginBottom: '2rem', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <Link href="/home" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Início</Link>
          <ChevronRight size={12} color="rgba(201,162,75,0.5)" />
          <Link href="/colecao/automatos" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Coleção</Link>
          <ChevronRight size={12} color="rgba(201,162,75,0.5)" />
          <span style={{ color: 'var(--color-brass-gold)' }}>{product.name}</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '3rem', alignItems: 'start' }}>
          {/* Estúdio 3D Interativo da Peça */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <SketchfabViewer initialModelId={product.modelId} />
          </motion.div>

          {/* Informações da Peça */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            style={{
              background: 'rgba(28,14,20,0.55)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              border: '1px solid rgba(201,162,75,0.3)',
              borderRadius: 'var(--radius-lg)',
              padding: '2.5rem',
              boxShadow: '0 25px 60px rgba(10,10,13,0.85)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--color-brass-gold)', letterSpacing: '0.15em', opacity: 0.7 }}>
                {product.sku}
              </span>
              <span style={{
                fontFamily: 'var(--font-mono)', fontSize: '0.75rem',
                background: 'rgba(10,10,13,0.85)',
                padding: '0.3rem 0.75rem',
                border: '1px solid rgba(201,162,75,0.35)',
                borderRadius: 'var(--radius-sm)',
                color: 'var(--color-brass-gold)',
                letterSpacing: '0.1em',
              }}>
                {product.edition}
              </span>
            </div>

            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '2.2rem', fontWeight: 900, color: 'var(--color-veiled-ivory)', marginBottom: '1rem', lineHeight: 1.2 }}>
              {product.name}
            </h1>

            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: 1.75, marginBottom: '2rem' }}>
              {product.description}
            </p>

            <div style={{ borderTop: '1px solid rgba(201,162,75,0.15)', borderBottom: '1px solid rgba(201,162,75,0.15)', paddingBlock: '1.25rem', marginBottom: '2rem', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                <strong style={{ color: 'var(--color-brass-gold)' }}>Materiais:</strong> {product.materials}
              </p>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                <strong style={{ color: 'var(--color-brass-gold)' }}>Mecanismo:</strong> {product.mechanism}
              </p>
            </div>

            <div style={{ marginBottom: '2rem' }}>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-muted)', letterSpacing: '0.15em', marginBottom: '0.4rem', opacity: 0.7 }}>VALOR DE RESERVA DE COLEÇÃO</p>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '2.2rem', fontWeight: 700, color: 'var(--color-veiled-ivory)' }}>
                {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.price)}
              </p>
            </div>

            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
              <Button 
                variant="gold" 
                size="lg" 
                id={`reserve-product-${product.id}`} 
                style={{ flex: 1 }}
                onClick={() => {
                  addItem({
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    sku: product.sku,
                    image: product.image,
                  });
                  toggleCart();
                }}
              >
                Reservar esta Peça
              </Button>
            </div>

            {/* Selos de autenticidade */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', borderTop: '1px solid rgba(201,162,75,0.15)', paddingTop: '1.5rem' }}>
              {product.details.map((detail, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                  <CheckCircle size={16} color="#C9A24B" style={{ flexShrink: 0 }} />
                  <span style={{ lineHeight: 1.5 }}>{detail}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
