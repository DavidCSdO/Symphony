'use client';

import { motion } from 'framer-motion';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { SectionDivider } from '@/components/ui/SectionDivider';
import { SketchfabViewer } from '@/components/3d/SketchfabViewer';
import { Button } from '@/components/ui/Button';
import { Clock, Hammer, Shield, Compass, Sparkles } from 'lucide-react';

export default function BastidoresPage() {
  return (
    <div style={{ background: 'var(--color-gotham-black)', minHeight: '100vh', color: 'var(--color-veiled-ivory)', position: 'relative' }}>
      <Header />

      {/* Background atmosphere radial glow */}
      <div aria-hidden="true" style={{
        position: 'absolute', top: '10%', left: '50%', transform: 'translateX(-50%)',
        width: '800px', height: '500px',
        background: 'radial-gradient(circle, rgba(46,26,61,0.25) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <main style={{ paddingTop: '130px', paddingBottom: '100px', maxWidth: '1280px', margin: '0 auto', paddingInline: '1.5rem', position: 'relative' }}>
        {/* Cabeçalho */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{ textAlign: 'center', marginBottom: '3rem' }}
        >
          <motion.p
            initial={{ opacity: 0, letterSpacing: '0.5em' }}
            animate={{ opacity: 1, letterSpacing: '0.22em' }}
            transition={{ duration: 0.8 }}
            style={{
              fontFamily: 'var(--font-seal)',
              fontSize: '0.7rem',
              color: 'var(--color-brass-gold)',
              textTransform: 'uppercase',
              marginBottom: '0.75rem',
            }}
          >
            ATO IV · PROCESSO ARTESANAL
          </motion.p>
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2.5rem, 6vw, 4rem)',
            fontWeight: 900,
            textTransform: 'uppercase',
            color: 'var(--color-veiled-ivory)',
            marginBottom: '1rem',
            letterSpacing: '0.04em',
          }}>
            Bastidores do Ateliê
          </h1>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: '1.05rem',
            color: 'var(--text-muted)',
            maxWidth: '600px',
            margin: '0 auto',
            lineHeight: 1.7,
          }}>
            Cem horas de trabalho artesanal em latão, mogno e safira. Nenhum robô fabrica os nossos autômatos.
          </p>
        </motion.div>

        <SectionDivider />

        {/* Estúdio 3D Interativo WebGL */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          style={{ marginBlock: '4rem' }}
        >
          <SketchfabViewer />
        </motion.div>

        {/* Grade de Estatísticas e Materiais */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', marginBlock: '4rem' }}>
          {[
            {
              icon: Clock,
              stat: '100h',
              title: 'POR PEÇA ARTESANAL',
              description: 'Montagem, polimento de dentes de engrenagem e testes de ressonância mecânica.',
            },
            {
              icon: Hammer,
              stat: '14',
              title: 'MESTRES ARTESÃOS',
              description: 'Especialistas em micro-mecânica, escultura em madeira nobre e gravura Art Déco.',
            },
            {
              icon: Compass,
              stat: '6',
              title: 'CATEGORIAS AUTORAIS',
              description: 'Autômatos, relógios, caixas musicais, joias e objetos de escrivaninha.',
            },
          ].map((card, i) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  background: 'rgba(28,14,20,0.5)',
                  backdropFilter: 'blur(12px)',
                  WebkitBackdropFilter: 'blur(12px)',
                  border: '1px solid rgba(201,162,75,0.2)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '2.5rem 2rem',
                  textAlign: 'center',
                  transition: 'all 300ms ease',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem', opacity: 0.6 }}>
                  <Icon size={24} color="#C9A24B" />
                </div>
                <h2 style={{ fontFamily: 'var(--font-mono)', fontSize: '2.8rem', color: 'var(--color-brass-gold)', fontWeight: 700, marginBottom: '0.5rem', lineHeight: 1 }}>
                  {card.stat}
                </h2>
                <p style={{ fontFamily: 'var(--font-seal)', fontSize: '0.75rem', letterSpacing: '0.18em', color: 'var(--color-veiled-ivory)', marginBottom: '0.75rem' }}>
                  {card.title}
                </p>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.65 }}>
                  {card.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Manifesto de Criação */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          style={{
            background: 'linear-gradient(145deg, rgba(28,14,20,0.7) 0%, rgba(10,10,13,0.95) 100%)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            border: '1px solid rgba(201,162,75,0.3)',
            borderRadius: 'var(--radius-lg)',
            padding: '3.5rem 2.5rem',
            textAlign: 'center',
            maxWidth: '800px',
            margin: '0 auto',
            boxShadow: '0 20px 60px rgba(10,10,13,0.8)',
            position: 'relative',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem', opacity: 0.8 }}>
            <Sparkles size={28} color="#C9A24B" />
          </div>

          <p style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: '1.25rem', color: 'var(--color-veiled-ivory)', lineHeight: 1.8, marginBottom: '2.5rem' }}>
            &ldquo;Elegância que esconde mecanismo. Por fora, veludo, latão, seda. Por dentro, engrenagem, corda, dobradiça. Não vendemos relógios, vendemos o ritmo do tempo.&rdquo;
          </p>

          <Button variant="gold" size="lg" href="/reserva">
            Agendar Visita ao Ateliê
          </Button>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
