'use client';

import { motion } from 'framer-motion';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { SectionDivider } from '@/components/ui/SectionDivider';
import { SketchfabViewer } from '@/components/3d/SketchfabViewer';
import { Button } from '@/components/ui/Button';

export default function BastidoresPage() {
  return (
    <div style={{ background: 'var(--color-gotham-black)', minHeight: '100vh', color: 'var(--color-veiled-ivory)' }}>
      <Header />

      <main style={{ paddingTop: '120px', paddingBottom: '100px', maxWidth: '1280px', margin: '0 auto', paddingInline: '1.5rem' }}>
        {/* Cabeçalho */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: '3rem' }}
        >
          <p style={{ fontFamily: 'var(--font-seal)', fontSize: '0.7rem', letterSpacing: '0.22em', color: 'var(--color-brass-gold)', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
            ATO IV · PROCESSO ARTESANAL
          </p>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem, 6vw, 4rem)', fontWeight: 900, textTransform: 'uppercase', color: 'var(--color-veiled-ivory)', marginBottom: '1rem' }}>
            Bastidores do Ateliê
          </h1>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '1.05rem', color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto' }}>
            Cem horas de trabalho artesanal em latão, mogno e safira. Nenhum robô fabrica os nossos autômatos.
          </p>
        </motion.div>

        <SectionDivider />

        {/* Estúdio 3D Interativo WebGL */}
        <div style={{ marginBlock: '4rem' }}>
          <SketchfabViewer />
        </div>

        {/* Grade de Estatísticas e Materiais */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', marginBlock: '4rem' }}>
          <div style={{ background: 'var(--color-deep-wine)', border: '1px solid rgba(201,162,75,0.3)', borderRadius: 'var(--radius-md)', padding: '2rem', textAlign: 'center' }}>
            <h2 style={{ fontFamily: 'var(--font-mono)', fontSize: '2.5rem', color: 'var(--color-brass-gold)', fontWeight: 700, marginBottom: '0.5rem' }}>100h</h2>
            <p style={{ fontFamily: 'var(--font-seal)', fontSize: '0.8rem', letterSpacing: '0.15em', color: 'var(--color-veiled-ivory)' }}>POR PEÇA ARTESANAL</p>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.75rem' }}>Montagem, polimento de dentes de engrenagem e testes de ressonância mecânica.</p>
          </div>

          <div style={{ background: 'var(--color-deep-wine)', border: '1px solid rgba(201,162,75,0.3)', borderRadius: 'var(--radius-md)', padding: '2rem', textAlign: 'center' }}>
            <h2 style={{ fontFamily: 'var(--font-mono)', fontSize: '2.5rem', color: 'var(--color-brass-gold)', fontWeight: 700, marginBottom: '0.5rem' }}>14</h2>
            <p style={{ fontFamily: 'var(--font-seal)', fontSize: '0.8rem', letterSpacing: '0.15em', color: 'var(--color-veiled-ivory)' }}>MESTRES ARTESÃOS</p>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.75rem' }}>Especialistas em micro-mecânica, escultura em madeira nobre e gravura Art Déco.</p>
          </div>

          <div style={{ background: 'var(--color-deep-wine)', border: '1px solid rgba(201,162,75,0.3)', borderRadius: 'var(--radius-md)', padding: '2rem', textAlign: 'center' }}>
            <h2 style={{ fontFamily: 'var(--font-mono)', fontSize: '2.5rem', color: 'var(--color-brass-gold)', fontWeight: 700, marginBottom: '0.5rem' }}>6</h2>
            <p style={{ fontFamily: 'var(--font-seal)', fontSize: '0.8rem', letterSpacing: '0.15em', color: 'var(--color-veiled-ivory)' }}>CATEGORIAS AUTORAIS</p>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.75rem' }}>Autômatos, relógios, caixas musicais, joias e objetos de escrivaninha.</p>
          </div>
        </div>

        {/* Manifesto de Criação */}
        <div style={{ background: 'linear-gradient(135deg, var(--color-deep-wine) 0%, #0A0A0D 100%)', border: '1px solid rgba(201,162,75,0.35)', borderRadius: 'var(--radius-lg)', padding: '3rem 2rem', textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
          <p style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: '1.25rem', color: 'var(--color-veiled-ivory)', lineHeight: 1.8, marginBottom: '2rem' }}>
            &ldquo;Elegância que esconde mecanismo. Por fora, veludo, latão, seda. Por dentro, engrenagem, corda, dobradiça. Não vendemos relógios, vendemos o ritmo do tempo.&rdquo;
          </p>

          <Button variant="gold" size="lg" href="/reserva">
            Agendar Visita ao Ateliê
          </Button>
        </div>
      </main>

      <Footer />
    </div>
  );
}
