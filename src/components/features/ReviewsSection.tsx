import { SectionDivider } from '@/components/ui/SectionDivider';

const reviews = [
  {
    id: 'rec-01',
    quote: 'Um relógio que soa como uma orquestra em miniatura.',
    source: 'Recorte',
    edition: 'ed. 04',
    rating: 5,
  },
  {
    id: 'rec-02',
    quote: 'Não é decoração. É engenharia disfarçada de joia.',
    source: 'Recorte',
    edition: 'ed. 09',
    rating: 5,
  },
  {
    id: 'rec-03',
    quote:
      'O Autômato Corvo chegou numa caixa de madeira selada com cera vermelha. A experiência começa antes de abrir.',
    source: 'Recorte',
    edition: 'ed. 12',
    rating: 5,
  },
];

function DecoStar({ filled = true }: { filled?: boolean }) {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      {/* Estrela de 4 pontas — estilo art déco */}
      <path
        d="M7 1L8.2 5.8H13L9.4 8.6L10.6 13L7 10.2L3.4 13L4.6 8.6L1 5.8H5.8L7 1Z"
        fill={filled ? '#C9A24B' : 'none'}
        stroke="#C9A24B"
        strokeWidth="0.75"
      />
    </svg>
  );
}

function ReviewCard({ review }: { review: typeof reviews[0] }) {
  return (
    <article
      id={`review-${review.id}`}
      style={{
        background: 'var(--color-deep-wine)',
        border: '1px solid rgba(201,162,75,0.2)',
        borderRadius: 'var(--radius-md)',
        padding: '2rem',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Cantos déco */}
      <div
        style={{
          position: 'absolute',
          top: '0.75rem',
          left: '0.75rem',
          width: '16px',
          height: '16px',
          borderTop: '1px solid rgba(201,162,75,0.4)',
          borderLeft: '1px solid rgba(201,162,75,0.4)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '0.75rem',
          right: '0.75rem',
          width: '16px',
          height: '16px',
          borderBottom: '1px solid rgba(201,162,75,0.4)',
          borderRight: '1px solid rgba(201,162,75,0.4)',
        }}
      />

      {/* Estrelas */}
      <div
        style={{
          display: 'flex',
          gap: '0.25rem',
          marginBottom: '1rem',
        }}
        aria-label={`${review.rating} de 5 estrelas`}
      >
        {Array.from({ length: 5 }).map((_, i) => (
          <DecoStar key={i} filled={i < review.rating} />
        ))}
      </div>

      {/* Citação */}
      <blockquote
        style={{
          fontFamily: 'var(--font-display)',
          fontStyle: 'italic',
          fontSize: '1rem',
          color: 'var(--color-veiled-ivory)',
          lineHeight: 1.6,
          marginBottom: '1.5rem',
          position: 'relative',
        }}
      >
        <span
          style={{
            fontFamily: 'Georgia, serif',
            fontSize: '3rem',
            color: 'var(--color-brass-gold)',
            opacity: 0.3,
            lineHeight: 0,
            verticalAlign: '-0.5em',
            marginRight: '0.25rem',
          }}
        >
          "
        </span>
        {review.quote}
      </blockquote>

      {/* Fonte */}
      <footer
        style={{
          borderTop: '1px solid rgba(201,162,75,0.15)',
          paddingTop: '0.75rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
        }}
      >
        <span
          style={{
            display: 'block',
            width: '24px',
            height: '1px',
            background: 'var(--color-brass-gold)',
            opacity: 0.5,
          }}
        />
        <cite
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.65rem',
            color: 'var(--color-brass-gold)',
            fontStyle: 'normal',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
          }}
        >
          {review.source}, {review.edition}
        </cite>
      </footer>
    </article>
  );
}

export function ReviewsSection() {
  return (
    <section
      id="criticas"
      aria-labelledby="reviews-heading"
      style={{
        padding: 'var(--space-24) var(--space-6)',
        background: 'var(--color-gotham-black)',
      }}
    >
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <SectionDivider />

        <div style={{ textAlign: 'center', marginBottom: 'var(--space-12)' }}>
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
            Ato V
          </p>
          <h2
            id="reviews-heading"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2rem, 5vw, 3rem)',
              fontWeight: 900,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: 'var(--color-veiled-ivory)',
            }}
          >
            Críticas
          </h2>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: 'var(--space-6)',
          }}
        >
          {reviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      </div>
    </section>
  );
}
