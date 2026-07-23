'use client';

import { motion, useMotionValue, useTransform } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { SketchfabViewer } from '@/components/3d/SketchfabViewer';

export function BackstageSection() {
  return (
    <section
      id="bastidores"
      aria-labelledby="backstage-heading"
      style={{
        background: 'var(--color-deep-wine)',
        padding: 'var(--space-24) var(--space-6)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background radial accents */}
      <div aria-hidden="true" style={{
        position: 'absolute', inset: 0,
        background: `
          radial-gradient(ellipse 50% 60% at 0% 50%, rgba(201,162,75,0.04) 0%, transparent 100%),
          radial-gradient(ellipse 40% 50% at 100% 30%, rgba(179,18,42,0.03) 0%, transparent 100%)
        `,
        pointerEvents: 'none',
      }} />

      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 'var(--space-16)',
          alignItems: 'center',
          position: 'relative',
        }}
        className="backstage-grid"
      >
        {/* Text content */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.p
            initial={{ opacity: 0, letterSpacing: '0.5em' }}
            whileInView={{ opacity: 1, letterSpacing: '0.22em' }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            style={{
              fontFamily: 'var(--font-seal)',
              fontSize: '0.7rem',
              color: 'var(--color-brass-gold)',
              textTransform: 'uppercase',
              marginBottom: '0.75rem',
            }}
          >
            Ato IV
          </motion.p>

          <h2
            id="backstage-heading"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2rem, 4vw, 2.75rem)',
              fontWeight: 900,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              color: 'var(--color-veiled-ivory)',
              marginBottom: '1.5rem',
              lineHeight: 1.15,
            }}
          >
            Bastidores
          </h2>

          <motion.span
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{
              display: 'block',
              width: '48px',
              height: '1px',
              background: 'var(--color-brass-gold)',
              marginBottom: '2rem',
              transformOrigin: 'left',
            }}
          />

          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '1rem',
              color: 'var(--text-muted)',
              lineHeight: 1.8,
              marginBottom: '1.25rem',
              maxWidth: '480px',
            }}
          >
            Por trás de cada vitrine de veludo há uma bancada de latão, lupas e
            cem horas de trabalho manual. O Ateliê Sanchez monta cada mecanismo
            peça por peça — nenhum robô fabrica os nossos robôs.
          </p>

          <p
            style={{
              fontFamily: 'var(--font-display)',
              fontStyle: 'italic',
              fontSize: '1.1rem',
              color: 'var(--color-brass-gold)',
              lineHeight: 1.6,
              marginBottom: '2rem',
              maxWidth: '420px',
              position: 'relative',
              paddingLeft: '1.25rem',
            }}
          >
            <span style={{
              position: 'absolute',
              left: 0,
              top: 0,
              bottom: 0,
              width: '2px',
              background: 'linear-gradient(to bottom, var(--color-brass-gold), transparent)',
              borderRadius: '1px',
            }} />
            "Elegância que esconde mecanismo. Por fora, veludo, latão, seda.
            Por dentro, engrenagem, corda, dobradiça."
          </p>

          {/* Stats — animated counters */}
          <div
            style={{
              display: 'flex',
              gap: '2rem',
              marginBottom: '2.5rem',
            }}
          >
            {[
              { value: '100h', label: 'por peça' },
              { value: '14', label: 'artesãos' },
              { value: '6', label: 'categorias' },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                style={{
                  padding: '0.75rem 1rem',
                  background: 'rgba(10,10,13,0.3)',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid rgba(201,162,75,0.1)',
                }}
              >
                <p
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '1.5rem',
                    fontWeight: 700,
                    color: 'var(--color-brass-gold)',
                    lineHeight: 1,
                    marginBottom: '0.25rem',
                  }}
                >
                  {stat.value}
                </p>
                <p
                  style={{
                    fontFamily: 'var(--font-seal)',
                    fontSize: '0.6rem',
                    color: 'var(--text-muted)',
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                  }}
                >
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>

          <Button variant="ghost" size="md" id="backstage-process-btn" href="/bastidores">
            Conhecer o processo
          </Button>
        </motion.div>

        {/* 3D Viewer */}
        <motion.div
          initial={{ opacity: 0, x: 40, scale: 0.95 }}
          whileInView={{ opacity: 1, x: 0, scale: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <SketchfabViewer />
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .backstage-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
