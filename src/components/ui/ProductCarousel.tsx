'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';

export type CarouselProduct = {
  id: string;
  sku: string;
  name: string;
  description: string;
  price: number;
  image: string;
  badge?: string;
  rotation?: number;
};

export function ProductCarousel({ products }: { products: CarouselProduct[] }) {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  // Calculate dynamic rotations or use predefined ones
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-100%"]);

  return (
    <div ref={targetRef} style={{ height: "300vh", position: "relative" }}>
      <div style={{
        position: "sticky",
        top: 0,
        height: "100vh",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
        background: "var(--color-gotham-black)",
      }}>
        <motion.div style={{ x, display: "flex", gap: "4rem", padding: "0 10vw" }}>
          {products.map((product, index) => {
            // Give each card a slight random-looking rotation if not provided
            const rotate = product.rotation || (index % 2 === 0 ? -3 : 2);
            
            return (
              <motion.div 
                key={product.id}
                style={{ 
                  width: "min(400px, 80vw)",
                  display: "flex",
                  flexDirection: "column",
                  flexShrink: 0,
                }}
              >
                {/* Top Labels */}
                <div style={{ display: 'flex', gap: '1rem', marginBottom: '0.5rem', paddingLeft: '0.5rem' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: '#fff', fontWeight: 600 }}>
                    {product.badge || 'Exclusivo'}
                  </span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: '#aaa' }}>
                    {product.sku}
                  </span>
                </div>

                {/* Tilted Card Image */}
                <motion.div
                  whileHover={{ scale: 1.02, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  style={{
                    rotate,
                    width: '100%',
                    aspectRatio: '3/4',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    border: '1px solid rgba(255,255,255,0.1)',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
                    position: 'relative',
                    background: 'radial-gradient(circle at 50% 50%, rgba(46,26,61,0.5) 0%, rgba(10,10,13,0.95) 100%)',
                  }}
                >
                  <img 
                    src={product.image} 
                    alt={product.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.8 }}
                  />
                  {/* Subtle glass overlay like Coda Press "C" logo */}
                  <div style={{
                    position: 'absolute',
                    bottom: '1rem',
                    right: '1rem',
                    width: '24px',
                    height: '24px',
                    background: 'rgba(255,255,255,0.9)',
                    color: '#000',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: 'var(--font-display)',
                    fontWeight: 900,
                    fontSize: '14px',
                    borderRadius: '4px',
                  }}>
                    S
                  </div>
                </motion.div>

                {/* Bottom Text content */}
                <div style={{ marginTop: '1.5rem', paddingLeft: '0.5rem' }}>
                  <h3 style={{ 
                    fontFamily: 'var(--font-display)', 
                    fontSize: '1.25rem', 
                    fontWeight: 700, 
                    color: '#fff',
                    marginBottom: '0.5rem'
                  }}>
                    {product.name}
                  </h3>
                  <p style={{ 
                    fontFamily: 'var(--font-mono)', 
                    fontSize: '0.8rem', 
                    color: '#aaa', 
                    lineHeight: 1.6,
                    marginBottom: '1rem',
                    maxWidth: '90%'
                  }}>
                    {product.description}
                  </p>
                  
                  <Link 
                    href={`/produto/${product.id}`}
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.85rem',
                      color: '#fff',
                      textDecoration: 'underline',
                      textUnderlineOffset: '4px',
                      fontWeight: 600,
                    }}
                  >
                    View detail
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}
