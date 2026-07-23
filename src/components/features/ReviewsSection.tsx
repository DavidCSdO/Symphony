'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { SectionDivider } from '@/components/ui/SectionDivider';
import { Quote } from 'lucide-react';

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
      <path
        d="M7 1L8.2 5.8H13L9.4 8.6L10.6 13L7 10.2L3.4 13L4.6 8.6L1 5.8H5.8L7 1Z"
        fill={filled ? '#C9A24B' : 'none'}
        stroke="#C9A24B"
        strokeWidth="0.75"
      />
    </svg>
  );
}

function ReviewCard({ review, index }: { review: typeof reviews[0]; index: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.article
      id={`review-${review.id}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered
          ? 'rgba(28,14,20,0.7)'
          : 'rgba(28,14,20,0.4)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        border: hovered
          ? '1px solid rgba(201,162,75,0.35)'
          : '1px solid rgba(201,162,75,0.12)',
        borderRadius: 'var(--radius-lg)',
        padding: '2rem',
        position: 'relative',
        overflow: 'hidden',
        transition: 'all 350ms cubic-bezier(0.16, 1, 0.3, 1)',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        boxShadow: hovered
          ? '0 0 25px rgba(201,162,75,0.08), 0 20px 40px rgba(10,10,13,0.5)'
          : '0 4px 20px rgba(10,10,13,0.3)',
      }}
    >
      {/* Corner decorations */}
      <div style={{
        position: 'absolute', top: '0.75rem', left: '0.75rem',
        width: '16px', height: '16px',
        borderTop: '1px solid rgba(201,162,75,0.3)',
        borderLeft: '1px solid rgba(201,162,75,0.3)',
        transition: 'border-color 300ms ease',
        ...(hovered ? { borderColor: 'rgba(201,162,75,0.6)' } : {}),
      }} />
      <div style={{
        position: 'absolute', bottom: '0.75rem', right: '0.75rem',
        width: '16px', height: '16px',
        borderBottom: '1px solid rgba(201,162,75,0.3)',
        borderRight: '1px solid rgba(201,162,75,0.3)',
        transition: 'border-color 300ms ease',
        ...(hovered ? { borderColor: 'rgba(201,162,75,0.6)' } : {}),
      }} />

      {/* Quote icon */}
      <div style={{ marginBottom: '1rem', opacity: 0.3 }}>
        <Quote size={24} color="#C9A24B" />
      </div>

      {/* Stars */}
      <div
        style={{ display: 'flex', gap: '0.25rem', marginBottom: '1rem' }}
        aria-label={`${review.rating} de 5 estrelas`}
      >
        {Array.from({ length: 5 }).map((_, i) => (
          <DecoStar key={i} filled={i < review.rating} />
        ))}
      </div>

      {/* Quote text */}
      <blockquote
        style={{
          fontFamily: 'var(--font-display)',
          fontStyle: 'italic',
          fontSize: '1.05rem',
          color: 'var(--color-veiled-ivory)',
          lineHeight: 1.65,
          marginBottom: '1.5rem',
          position: 'relative',
        }}
      >
        {review.quote}
      </blockquote>

      {/* Source */}
      <footer
        style={{
          borderTop: '1px solid rgba(201,162,75,0.1)',
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
            background: 'linear-gradient(to right, var(--color-brass-gold), transparent)',
            opacity: 0.6,
          }}
        />
        <cite
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.6rem',
            color: 'var(--color-brass-gold)',
            fontStyle: 'normal',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
          }}
        >
          {review.source}, {review.edition}
        </cite>
      </footer>
    </motion.article>
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
        position: 'relative',
      }}
    >
      {/* Subtle glow */}
      <div aria-hidden="true" style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '500px', height: '300px',
        background: 'radial-gradient(circle, rgba(201,162,75,0.03) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '1280px', margin: '0 auto', position: 'relative' }}>
        <SectionDivider />

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: 'var(--space-12)' }}
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
            Ato V
          </motion.p>
          <h2
            id="reviews-heading"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2rem, 5vw, 3rem)',
              fontWeight: 900,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: 'var(--color-veiled-ivory)',
              marginBottom: '0.5rem',
            }}
          >
            Críticas
          </h2>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{ width: '48px', height: '1px', background: 'var(--color-brass-gold)', margin: '0 auto', transformOrigin: 'center' }}
          />
        </motion.div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 'var(--space-6)',
            width: '100%',
          }}
        >
          {reviews.map((review, i) => (
            <ReviewCard key={review.id} review={review} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
