'use client';

import { motion } from 'framer-motion';

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <>
      <motion.div
        initial={{ y: 0 }}
        animate={{ y: '-100vh' }}
        transition={{ 
          duration: 1.2, 
          ease: [0.76, 0, 0.24, 1], // Cinematic ease-in-out
          delay: 0.1 
        }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          background: 'var(--color-gotham-black)',
          zIndex: 99999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          pointerEvents: 'none',
        }}
      >
        <span style={{ 
          fontFamily: 'var(--font-wordmark)', 
          color: 'var(--color-brass-gold)', 
          fontSize: '2rem',
          textShadow: '0 0 20px rgba(201,162,75,0.4)',
          letterSpacing: '0.05em'
        }}>
          Symphony of Night
        </span>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, filter: 'blur(10px)', y: 20 }}
        animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
        transition={{ 
          duration: 0.8, 
          ease: [0.16, 1, 0.3, 1],
          delay: 0.3
        }}
        style={{ width: '100%' }}
      >
        {children}
      </motion.div>
    </>
  );
}
