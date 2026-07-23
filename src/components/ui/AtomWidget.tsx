'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Cpu } from 'lucide-react';

export function AtomWidget() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating Badge */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.5, duration: 0.8 }}
        onClick={() => setIsOpen(true)}
        style={{
          position: 'fixed',
          bottom: '2rem',
          right: '2rem',
          zIndex: 9998,
          background: 'rgba(10,10,13,0.75)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: '30px',
          padding: '0.6rem 1.2rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          cursor: 'pointer',
          color: 'var(--color-veiled-ivory)',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.75rem',
          letterSpacing: '0.05em',
          boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
        }}
        whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.05)' }}
        whileTap={{ scale: 0.98 }}
      >
        <Cpu size={14} color="var(--color-brass-gold)" />
        <span>Powered by <strong style={{ color: '#fff', fontWeight: 600 }}>ATOM</strong></span>
      </motion.button>

      {/* Expanded Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            style={{
              position: 'fixed',
              bottom: '5.5rem',
              right: '2rem',
              zIndex: 9999,
              width: '320px',
              background: 'rgba(20, 15, 25, 0.85)',
              backdropFilter: 'blur(24px)',
              border: '1px solid rgba(201,162,75,0.2)',
              borderRadius: '16px',
              padding: '1.5rem',
              boxShadow: '0 20px 40px rgba(0,0,0,0.8)',
              color: 'var(--color-veiled-ivory)',
            }}
          >
            <button
              onClick={() => setIsOpen(false)}
              style={{
                position: 'absolute',
                top: '1rem',
                right: '1rem',
                background: 'transparent',
                border: 'none',
                color: 'var(--text-muted)',
                cursor: 'pointer',
                padding: '0.2rem',
              }}
            >
              <X size={16} />
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <div style={{
                width: '40px', height: '40px', borderRadius: '8px',
                background: 'linear-gradient(135deg, #1A1A24 0%, #0A0A0D 100%)',
                border: '1px solid rgba(255,255,255,0.1)',
                display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>
                <Cpu size={20} color="var(--color-brass-gold)" />
              </div>
              <div>
                <h3 style={{ margin: 0, fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: 700 }}>
                  ATOM Autocon
                </h3>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--color-brass-gold)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                  Engenharia Digital
                </span>
              </div>
            </div>

            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
              Inovação e Tecnologia em Automação. Desenvolvemos experiências digitais de alto impacto e soluções tecnológicas sob medida para elevar a sua marca.
            </p>

            <a
              href="https://atom-autocon.com.br"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                width: '100%',
                padding: '0.75rem',
                background: 'var(--color-brass-gold)',
                color: '#000',
                textDecoration: 'none',
                borderRadius: '8px',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.8rem',
                fontWeight: 600,
                textTransform: 'uppercase',
                transition: 'all 0.2s ease',
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 4px 15px rgba(201,162,75,0.4)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'none';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              Conheça a ATOM <ExternalLink size={14} />
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
