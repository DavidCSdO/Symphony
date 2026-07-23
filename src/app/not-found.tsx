'use client';

import { motion } from 'framer-motion';
import { Settings, ArrowLeft } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/Button';

export default function NotFound() {
  return (
    <div style={{ background: 'var(--color-gotham-black)', minHeight: '100vh', color: 'var(--color-veiled-ivory)', display: 'flex', flexDirection: 'column' }}>
      <Header />
      
      <main style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
        {/* Background glow */}
        <div aria-hidden="true" style={{
          position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
          width: '600px', height: '600px',
          background: 'radial-gradient(circle, rgba(179,18,42,0.05) 0%, transparent 60%)',
          pointerEvents: 'none',
        }} />

        <div style={{ maxWidth: '600px', margin: '0 auto', padding: '2rem', textAlign: 'center', position: 'relative', zIndex: 2 }}>
          <motion.div
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'center' }}
          >
            <div style={{
              width: '100px', height: '100px', borderRadius: '50%',
              background: 'rgba(10,10,13,0.8)', border: '1px solid rgba(179,18,42,0.3)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 0 40px rgba(179,18,42,0.15)'
            }}>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
              >
                <Settings size={48} color="rgba(231,224,210,0.5)" strokeWidth={1} />
              </motion.div>
            </div>
          </motion.div>

          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(3rem, 6vw, 4.5rem)', fontWeight: 900, color: 'var(--color-marquise-red)', marginBottom: '0.5rem', lineHeight: 1 }}
          >
            404
          </motion.h1>

          <motion.h2
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', color: 'var(--color-veiled-ivory)', marginBottom: '1.5rem', letterSpacing: '0.05em' }}
          >
            O Mecanismo Travou
          </motion.h2>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            style={{ fontFamily: 'var(--font-body)', fontSize: '1rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '3rem' }}
          >
            Parece que algumas engrenagens se soltaram e não conseguimos encontrar a peça que você procurava. 
            Nossos mestres relojoeiros já foram notificados.
          </motion.p>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <Button variant="ghost" size="lg" href="/home">
              <ArrowLeft size={16} /> Retornar ao Início
            </Button>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
