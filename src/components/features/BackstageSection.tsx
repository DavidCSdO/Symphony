'use client';

import { motion } from 'framer-motion';
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
      }}
    >
      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 'var(--space-16)',
          alignItems: 'center',
        }}
        className="backstage-grid"
      >
        {/* Texto com Scroll Reveal */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <p
            style={{
              fontFamily: 'var(--font-seal)',
              fontSize: '0.7rem',
              letterSpacing: '0.22em',
              color: 'var(--color-brass-gold)',
              textTransform: 'uppercase',
              marginBottom: '0.75rem',
            }}
          >
            Ato IV
          </p>
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
          <span
            style={{
              display: 'block',
              width: '48px',
              height: '1px',
              background: 'var(--color-brass-gold)',
              marginBottom: '2rem',
              opacity: 0.6,
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
            }}
          >
            "Elegância que esconde mecanismo. Por fora, veludo, latão, seda.
            Por dentro, engrenagem, corda, dobradiça."
          </p>

          {/* Stats */}
          <div
            style={{
              display: 'flex',
              gap: '2.5rem',
              marginBottom: '2.5rem',
              borderLeft: '2px solid rgba(201,162,75,0.3)',
              paddingLeft: '1.5rem',
            }}
          >
            {[
              { value: '100h', label: 'por peça' },
              { value: '14', label: 'artesãos' },
              { value: '6', label: 'categorias' },
            ].map((stat) => (
              <div key={stat.label}>
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
                    fontSize: '0.65rem',
                    color: 'var(--text-muted)',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                  }}
                >
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

          <Button variant="ghost" size="md" id="backstage-process-btn" href="/bastidores">
            Conhecer o processo
          </Button>
        </motion.div>

        {/* Visualizador 3D Sketchfab Interativo */}
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
