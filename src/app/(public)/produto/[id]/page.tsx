'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { SectionDivider } from '@/components/ui/SectionDivider';
import { Button } from '@/components/ui/Button';
import { KineticWatch3D } from '@/components/3d/KineticWatch3D';
import { ShieldCheck, Clock, Award, CheckCircle } from 'lucide-react';

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
}> = {
  'automato-corvo-001': {
    id: 'automato-corvo-001',
    sku: 'AUTÔMATO-001',
    name: 'Autômato Corvo-Relojoeiro',
    edition: 'Série Limitada 0/100',
    price: 4800,
    description: 'Um autômato mecânico de corda manual que bate as asas com movimentos anatômicos e abre a caixa torácica em ciclos para revelar o escapamento de relógio a cada 12 segundos.',
    materials: 'Latão maciço usinado, mogno ebonizado, cristal mineral temperado, âmbar sintético.',
    mechanism: 'Movimento de corda manual com 14 rodas dentadas funcionais · Autonomia de 72 horas.',
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
    edition: 'Série Limitada 0/50',
    price: 7200,
    description: 'Mostrador vinho escuro escovado com ponteiros banhados a ouro 18k. O cristal de safira expõe a oscilação do balancim automático ETA a 28.800 vibrações por hora.',
    materials: 'Aço inox 316L, pulseira em couro de jacaré legítimo, cristal de safira anti-reflexo.',
    mechanism: 'Movimento Automático ETA 2824-2 modificado · 28 jewels · Reserva de marcha de 38h.',
    details: [
      'Resistência à água de 50 metros (5 ATM)',
      'Mostrador vazado Art Déco gravado a laser de precisão',
      'Fivela personalizada em aço e ouro 18k',
      'Acompanha caixa de apresentação e loupe de relojoeiro',
    ],
  },
};

export default function ProductDetailPage() {
  const params = useParams();
  const productId = (params?.id as string) || 'automato-corvo-001';
  const product = PRODUCTS_CATALOG[productId] || PRODUCTS_CATALOG['automato-corvo-001'];

  return (
    <div style={{ background: 'var(--color-gotham-black)', minHeight: '100vh', color: 'var(--color-veiled-ivory)' }}>
      <Header />

      <main style={{ paddingTop: '120px', paddingBottom: '100px', maxWidth: '1280px', margin: '0 auto', paddingInline: '1.5rem' }}>
        {/* Breadcrumb */}
        <div style={{ marginBottom: '2rem', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
          <Link href="/home" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Início</Link> &gt;{' '}
          <Link href="/colecao/automatos" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Coleção</Link> &gt;{' '}
          <span style={{ color: 'var(--color-brass-gold)' }}>{product.name}</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '3rem', alignItems: 'start' }}>
          {/* Estúdio 3D Interativo da Peça */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <KineticWatch3D />
          </motion.div>

          {/* Informações da Peça */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            style={{ background: 'var(--color-deep-wine)', border: '1px solid rgba(201,162,75,0.3)', borderRadius: 'var(--radius-lg)', padding: '2.5rem' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--color-brass-gold)', letterSpacing: '0.15em' }}>
                {product.sku}
              </span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', background: 'rgba(10,10,13,0.85)', padding: '0.3rem 0.6rem', border: '1px solid rgba(201,162,75,0.4)', borderRadius: 'var(--radius-sm)', color: 'var(--color-brass-gold)' }}>
                {product.edition}
              </span>
            </div>

            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '2.2rem', fontWeight: 900, color: 'var(--color-veiled-ivory)', marginBottom: '1rem', lineHeight: 1.2 }}>
              {product.name}
            </h1>

            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: '2rem' }}>
              {product.description}
            </p>

            <div style={{ borderTop: '1px solid rgba(201,162,75,0.2)', borderBottom: '1px solid rgba(201,162,75,0.2)', paddingBlock: '1.25rem', marginBottom: '2rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                <strong style={{ color: 'var(--color-brass-gold)' }}>Materiais:</strong> {product.materials}
              </p>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                <strong style={{ color: 'var(--color-brass-gold)' }}>Mecanismo:</strong> {product.mechanism}
              </p>
            </div>

            <div style={{ marginBottom: '2rem' }}>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-muted)', letterSpacing: '0.1em', marginBottom: '0.4rem' }}>VALOR DE RESERVA DE COLEÇÃO</p>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '2.2rem', fontWeight: 700, color: 'var(--color-veiled-ivory)' }}>
                {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.price)}
              </p>
            </div>

            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
              <Button variant="gold" size="lg" href="/reserva" id={`reserve-product-${product.id}`} style={{ flex: 1 }}>
                Reservar esta Peça
              </Button>
            </div>

            {/* Selos de autenticidade */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', borderTop: '1px solid rgba(201,162,75,0.15)', paddingTop: '1.5rem' }}>
              {product.details.map((detail, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  <CheckCircle size={15} color="#C9A24B" />
                  <span>{detail}</span>
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
