import { Button } from '@/components/ui/Button';
import { SectionDivider } from '@/components/ui/SectionDivider';

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
        {/* Texto */}
        <div>
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

          <Button variant="ghost" size="md" id="backstage-process-btn">
            Conhecer o processo
          </Button>
        </div>

        {/* Painel visual — padrão déco */}
        <div
          style={{
            position: 'relative',
            aspectRatio: '4/5',
            background: 'linear-gradient(145deg, #1C0E14 0%, #0A0A0D 60%, #2E1A3D 100%)',
            border: '1px solid rgba(201,162,75,0.2)',
            borderRadius: 'var(--radius-lg)',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* Padrão geométrico déco */}
          <svg width="260" height="320" viewBox="0 0 260 320" fill="none" opacity="0.35">
            {/* Moldura externa */}
            <rect x="10" y="10" width="240" height="300" stroke="#C9A24B" strokeWidth="0.75" />
            <rect x="20" y="20" width="220" height="280" stroke="#C9A24B" strokeWidth="0.5" />
            {/* Centro */}
            <circle cx="130" cy="160" r="70" stroke="#C9A24B" strokeWidth="0.75" />
            <circle cx="130" cy="160" r="50" stroke="#C9A24B" strokeWidth="0.5" />
            {/* Raios */}
            {Array.from({ length: 12 }).map((_, i) => {
              const a = (i * 30 * Math.PI) / 180;
              return (
                <line key={i}
                  x1={130 + Math.sin(a) * 50} y1={160 - Math.cos(a) * 50}
                  x2={130 + Math.sin(a) * 70} y2={160 - Math.cos(a) * 70}
                  stroke="#C9A24B" strokeWidth={i % 3 === 0 ? 1 : 0.5}
                />
              );
            })}
            {/* Cantos déco */}
            {[
              [10, 10], [250, 10], [10, 310], [250, 310],
            ].map(([cx, cy], i) => (
              <circle key={i} cx={cx} cy={cy} r="4" fill="#C9A24B" fillOpacity="0.6" />
            ))}
            <circle cx="130" cy="160" r="10" fill="#C9A24B" fillOpacity="0.2" />
            <circle cx="130" cy="160" r="3" fill="#C9A24B" />
          </svg>

          {/* Overlay de texto */}
          <div
            style={{
              position: 'absolute',
              bottom: '2rem',
              left: '50%',
              transform: 'translateX(-50%)',
              textAlign: 'center',
            }}
          >
            <p style={{ fontFamily: 'var(--font-seal)', fontSize: '0.6rem', letterSpacing: '0.2em', color: 'var(--color-brass-gold)', opacity: 0.7 }}>
              ATELIÊ SANCHEZ · EST. 2020
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .backstage-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
