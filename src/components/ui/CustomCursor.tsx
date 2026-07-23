'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [cursorState, setCursorState] = useState<'default' | 'loupe' | 'hidden' | 'hover'>('default');
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    
    // Esconder o cursor nativo no body
    document.body.style.cursor = 'none';

    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });

      const target = e.target as HTMLElement;
      
      // Se estamos passando sobre um elemento interativo padrão, mantemos um cursor pequeno ou mudamos sutilmente
      const isInteractive = target.closest('a, button, input, [role="button"]');
      
      // Se estamos passando sobre uma imagem de produto que requer a lupa
      const isLoupe = target.closest('.cursor-loupe');

      if (isLoupe) {
        setCursorState('loupe');
      } else if (isInteractive) {
        setCursorState('hover');
        document.body.style.cursor = 'none'; // Keep native cursor hidden
      } else {
        setCursorState('default');
        document.body.style.cursor = 'none';
      }
    };

    const handleMouseLeave = () => setCursorState('hidden');

    window.addEventListener('mousemove', updateMousePosition);
    document.documentElement.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      document.documentElement.removeEventListener('mouseleave', handleMouseLeave);
      document.body.style.cursor = 'auto';
    };
  }, []);

  if (!isClient) return null;

  const variants = {
    default: {
      width: 12,
      height: 12,
      x: mousePosition.x - 6,
      y: mousePosition.y - 6,
      opacity: 1,
      border: '1px solid rgba(201,162,75,0.8)',
      backgroundColor: 'transparent',
    },
    loupe: {
      width: 64,
      height: 64,
      x: mousePosition.x - 32,
      y: mousePosition.y - 32,
      opacity: 1,
      border: '1px solid var(--color-brass-gold)',
      backgroundColor: 'rgba(10,10,13,0.1)',
      backdropFilter: 'blur(2px)',
    },
    hover: {
      width: 48,
      height: 48,
      x: mousePosition.x - 24,
      y: mousePosition.y - 24,
      opacity: 1,
      border: '1px solid rgba(201,162,75,0.4)',
      backgroundColor: 'rgba(201,162,75,0.05)',
    },
    hidden: {
      opacity: 0,
      width: 12,
      height: 12,
      x: mousePosition.x - 6,
      y: mousePosition.y - 6,
    }
  };

  return (
    <>
      <motion.div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 999999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        variants={variants}
        animate={cursorState}
        transition={{ 
          type: 'tween', 
          ease: 'circOut', 
          duration: 0.15 
        }}
      >
        {/* Ponto central (foco da lupa) */}
        <AnimatePresence>
          {cursorState === 'loupe' && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              style={{
                width: 4,
                height: 4,
                backgroundColor: 'var(--color-brass-gold)',
                borderRadius: '50%',
              }}
            />
          )}
        </AnimatePresence>
      </motion.div>
      
      {/* Esconde cursor nativo globalmente quando não for pointer */}
      <style>{`
        @media (pointer: fine) {
          body, a, button, [role="button"], input { cursor: none !important; }
        }
      `}</style>
    </>
  );
}
