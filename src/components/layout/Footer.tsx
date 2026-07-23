import Link from 'next/link';

const columns = [
  {
    title: 'Coleção',
    links: [
      { href: '/colecao/automatos', label: 'Autômatos' },
      { href: '/colecao/relogios', label: 'Relógios' },
      { href: '/colecao/caixas-de-musica', label: 'Caixas de Música' },
      { href: '/colecao/joias', label: 'Joias Cinéticas' },
      { href: '/colecao/escrivaninha', label: 'Objetos de Escrivaninha' },
    ],
  },
  {
    title: 'Ateliê',
    links: [
      { href: '/bastidores', label: 'Sobre o Sanchez' },
      { href: '/bastidores', label: 'Materiais & Processo' },
      { href: '/reserva', label: 'Agendamento Privado' },
    ],
  },
  {
    title: 'Atendimento',
    links: [
      { href: '/reserva', label: 'Reserva de Peça' },
      { href: '/clube', label: 'Clube Symphony' },
      { href: '/reserva', label: 'Fale com o Ateliê' },
    ],
  },
  {
    title: 'Clube',
    links: [
      { href: '/clube', label: 'Clube Symphony' },
      { href: '/editorial', label: 'Editorial de Horologia' },
      { href: '/reserva', label: 'Benefícios VIP' },
    ],
  },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      style={{
        background: 'var(--color-deep-wine)',
        borderTop: '1px solid rgba(201, 162, 75, 0.2)',
        paddingTop: 'var(--space-16)',
        paddingBottom: 'var(--space-8)',
      }}
    >
      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '0 var(--space-6)',
        }}
      >
        {/* Grade de colunas */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
            gap: 'var(--space-10)',
            marginBottom: 'var(--space-16)',
          }}
        >
          {columns.map((col) => (
            <div key={col.title}>
              <h4
                style={{
                  fontFamily: 'var(--font-seal)',
                  fontSize: 'var(--text-xs)',
                  letterSpacing: '0.18em',
                  color: 'var(--color-brass-gold)',
                  textTransform: 'uppercase',
                  marginBottom: 'var(--space-4)',
                }}
              >
                {col.title}
              </h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: 'var(--text-sm)',
                        color: 'var(--text-muted)',
                        textDecoration: 'none',
                        transition: 'color var(--transition-fast)',
                      }}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Centro — Relógio / assinatura */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 'var(--space-4)',
            borderTop: '1px solid rgba(201, 162, 75, 0.15)',
            paddingTop: 'var(--space-10)',
            marginBottom: 'var(--space-6)',
          }}
        >
          {/* Relógio em SVG */}
          <svg
            width="48"
            height="48"
            viewBox="0 0 48 48"
            fill="none"
            aria-hidden="true"
          >
            <circle cx="24" cy="24" r="21" stroke="#C9A24B" strokeWidth="1" strokeOpacity="0.5" />
            <circle cx="24" cy="24" r="17" stroke="#C9A24B" strokeWidth="0.5" strokeOpacity="0.2" />
            {/* Marcações */}
            {Array.from({ length: 12 }).map((_, i) => {
              const angle = (i * 30 * Math.PI) / 180;
              const r1 = i % 3 === 0 ? 16 : 18;
              const r2 = 20;
              return (
                <line
                  key={i}
                  x1={24 + Math.sin(angle) * r1}
                  y1={24 - Math.cos(angle) * r1}
                  x2={24 + Math.sin(angle) * r2}
                  y2={24 - Math.cos(angle) * r2}
                  stroke="#C9A24B"
                  strokeWidth={i % 3 === 0 ? 1.2 : 0.6}
                  strokeOpacity="0.7"
                />
              );
            })}
            {/* Ponteiros — meia-noite */}
            <line x1="24" y1="24" x2="24" y2="8" stroke="#C9A24B" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="24" y1="24" x2="24" y2="5" stroke="#C9A24B" strokeWidth="1" strokeLinecap="round" />
            <circle cx="24" cy="24" r="1.5" fill="#C9A24B" />
          </svg>

          <span
            style={{
              fontFamily: 'var(--font-wordmark)',
              fontSize: '1.5rem',
              color: 'var(--color-veiled-ivory)',
              opacity: 0.7,
            }}
          >
            Symphony of Night
          </span>

          <span
            style={{
              fontFamily: 'var(--font-seal)',
              fontSize: 'var(--text-xs)',
              letterSpacing: '0.2em',
              color: 'var(--color-brass-gold)',
              opacity: 0.5,
              textTransform: 'uppercase',
            }}
          >
            Ateliê Sanchez
          </span>
        </div>

        {/* Rodapé legal */}
        <p
          style={{
            textAlign: 'center',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.625rem',
            color: 'var(--text-muted)',
            letterSpacing: '0.1em',
            opacity: 0.5,
          }}
        >
          © {year} SYMPHONY OF NIGHT — TODOS OS DIREITOS RESERVADOS
        </p>
      </div>
    </footer>
  );
}
