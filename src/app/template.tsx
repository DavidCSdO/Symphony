'use client';

import { motion } from 'framer-motion';

export default function Template({ children }: { children: React.ReactNode }) {
  // Transição de página suave (Fade-in elegante)
  // Substituído o clipPath porque em páginas longas ele recorta o conteúdo e quebra o visual
  
  return (
    <motion.div
      initial={{ opacity: 0, filter: 'blur(10px)' }}
      animate={{ opacity: 1, filter: 'blur(0px)' }}
      transition={{ 
        duration: 0.8, 
        ease: [0.16, 1, 0.3, 1]
      }}
      style={{ width: '100%' }}
    >
      {children}
    </motion.div>
  );
}
