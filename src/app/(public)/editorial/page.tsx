'use client';

import { motion } from 'framer-motion';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { SectionDivider } from '@/components/ui/SectionDivider';
import { ReviewsSection } from '@/components/features/ReviewsSection';

export default function EditorialPage() {
  return (
    <div style={{ background: 'var(--color-gotham-black)', minHeight: '100vh', color: 'var(--color-veiled-ivory)', position: 'relative' }}>
      <Header />

      {/* Atmosphere background */}
      <div aria-hidden="true" style={{
        position: 'absolute', top: '10%', left: '50%', transform: 'translateX(-50%)',
        width: '800px', height: '500px',
        background: 'radial-gradient(circle, rgba(201,162,75,0.04) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <main style={{ paddingTop: '130px', paddingBottom: '100px', maxWidth: '1280px', margin: '0 auto', paddingInline: '1.5rem', position: 'relative' }}>
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
            CRÍTICAS & PUBLICAÇÕES
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
            Editorial de Horologia
          </h1>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: '1.05rem',
            color: 'var(--text-muted)',
            maxWidth: '600px',
            margin: '0 auto',
            lineHeight: 1.7,
          }}>
            O que a imprensa especializada e colecionadores dizem sobre os mecanismos autorais do Ateliê Sanchez.
          </p>
        </motion.div>

        <SectionDivider />

        <div style={{ marginBlock: '4rem' }}>
          <ReviewsSection />
        </div>
      </main>

      <Footer />
    </div>
  );
}
