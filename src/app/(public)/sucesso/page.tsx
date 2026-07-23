'use client';

import { motion } from 'framer-motion';
import { CheckCircle, ArrowRight } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/Button';

export default function SuccessPage() {
  return (
    <div style={{ background: 'var(--color-gotham-black)', minHeight: '100vh', color: 'var(--color-veiled-ivory)', display: 'flex', flexDirection: 'column' }}>
      <Header />
      
      <main style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
        {/* Background glow */}
        <div aria-hidden="true" style={{
          position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
          width: '600px', height: '600px',
          background: 'radial-gradient(circle, rgba(201,162,75,0.08) 0%, transparent 60%)',
          pointerEvents: 'none',
        }} />

        <div style={{ maxWidth: '600px', margin: '0 auto', padding: '2rem', textAlign: 'center', position: 'relative', zIndex: 2 }}>
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'center' }}
          >
            <div style={{
              width: '80px', height: '80px', borderRadius: '50%',
              background: 'rgba(201,162,75,0.1)', border: '1px solid rgba(201,162,75,0.3)',
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
              <CheckCircle size={40} color="var(--color-brass-gold)" />
            </div>
          </motion.div>

          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 900, color: 'var(--color-veiled-ivory)', marginBottom: '1rem' }}
          >
            Reserva Confirmada
          </motion.h1>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            style={{ fontFamily: 'var(--font-body)', fontSize: '1.1rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '3rem' }}
          >
            Seu pedido foi recebido pelo Ateliê Sanchez. 
            Em breve, nosso mestre relojoeiro entrará em contato para alinhar os detalhes da entrega da sua peça de coleção.
          </motion.p>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Button variant="gold" size="lg" href="/home">
              Retornar ao Salão Principal <ArrowRight size={16} />
            </Button>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
