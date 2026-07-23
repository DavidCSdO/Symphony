'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings } from 'lucide-react';

export function Preloader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Wait for cinematic load
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2800);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="preloader"
          initial={{ y: 0 }}
          exit={{ y: '-100vh', opacity: 0 }}
          transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }} // Cinematic curtain up
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999999,
            background: '#0A0A0D',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--color-brass-gold)'
          }}
        >
          {/* Rotating main gear */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 8, ease: "linear", repeat: Infinity }}
            style={{ marginBottom: '2rem', filter: 'drop-shadow(0 0 20px rgba(201,162,75,0.3))' }}
          >
            <Settings size={64} strokeWidth={1} />
          </motion.div>

          {/* Logo reveal */}
          <motion.div
            initial={{ opacity: 0, y: 10, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 1, delay: 0.5 }}
            style={{
              fontFamily: 'var(--font-wordmark)',
              fontSize: '2.5rem',
              letterSpacing: '0.05em',
              textShadow: '0 0 30px rgba(201,162,75,0.5)',
              marginBottom: '3rem'
            }}
          >
            Symphony of Night
          </motion.div>

          {/* Progress bar */}
          <div style={{ width: '200px', height: '1px', background: 'rgba(255,255,255,0.1)', position: 'relative', overflow: 'hidden' }}>
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: '0%' }}
              transition={{ duration: 2.2, ease: 'easeInOut' }}
              style={{
                position: 'absolute',
                top: 0, left: 0, bottom: 0, right: 0,
                background: 'var(--color-brass-gold)',
                boxShadow: '0 0 10px var(--color-brass-gold)'
              }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
