'use client';

import { motion } from 'framer-motion';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { SectionDivider } from '@/components/ui/SectionDivider';
import { NewsletterSection } from '@/components/features/NewsletterSection';

export default function ClubePage() {
  return (
    <div style={{ background: 'var(--color-gotham-black)', minHeight: '100vh', color: 'var(--color-veiled-ivory)' }}>
      <Header />

      <main style={{ paddingTop: '120px', paddingBottom: '100px', maxWidth: '1280px', margin: '0 auto', paddingInline: '1.5rem' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: '3rem' }}
        >
          <p style={{ fontFamily: 'var(--font-seal)', fontSize: '0.7rem', letterSpacing: '0.22em', color: 'var(--color-brass-gold)', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
            SOCIEDADE DE COLECIONADORES
          </p>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem, 6vw, 4rem)', fontWeight: 900, textTransform: 'uppercase', color: 'var(--color-veiled-ivory)', marginBottom: '1rem' }}>
            Clube Symphony
          </h1>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '1.05rem', color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto' }}>
            Privilégios para quem aprecia o silêncio, a mecânica e a exclusividade de edições numeradas.
          </p>
        </motion.div>

        <SectionDivider />

        <div style={{ marginBlock: '4rem' }}>
          <NewsletterSection />
        </div>
      </main>

      <Footer />
    </div>
  );
}
