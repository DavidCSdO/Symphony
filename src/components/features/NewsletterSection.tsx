'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { SectionDivider } from '@/components/ui/SectionDivider';
import { Mail } from 'lucide-react';

export function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
  };

  return (
    <section
      id="clube"
      aria-labelledby="newsletter-heading"
      style={{
        background: 'linear-gradient(135deg, var(--color-deep-wine) 0%, var(--color-midnight-purple) 100%)',
        padding: 'var(--space-24) var(--space-6)',
        borderTop: '1px solid rgba(201,162,75,0.2)',
        borderBottom: '1px solid rgba(201,162,75,0.2)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Padrão de fundo déco */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            radial-gradient(circle at 20% 50%, rgba(201,162,75,0.04) 0%, transparent 50%),
            radial-gradient(circle at 80% 50%, rgba(179,18,42,0.04) 0%, transparent 50%)
          `,
          pointerEvents: 'none',
        }}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 30 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        style={{
          maxWidth: '640px',
          margin: '0 auto',
          position: 'relative',
          zIndex: 1,
          textAlign: 'center',
        }}
      >
        <SectionDivider />

        {/* Selo de Cera Art Déco */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.25rem' }}>
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
            <circle cx="24" cy="24" r="21" stroke="#C9A24B" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.6" />
            <circle cx="24" cy="24" r="16" fill="#B3122A" fillOpacity="0.8" stroke="#C9A24B" strokeWidth="1" />
            <path d="M24 14V34M14 24H34" stroke="#E7E0D2" strokeWidth="1" opacity="0.8" />
            <circle cx="24" cy="24" r="4" fill="#C9A24B" />
          </svg>
        </div>

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
          Ato VII — Clube Privado
        </p>

        <h2
          id="newsletter-heading"
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2rem, 5vw, 2.75rem)',
            fontWeight: 900,
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            color: 'var(--color-veiled-ivory)',
            marginBottom: '1.25rem',
            lineHeight: 1.1,
          }}
        >
          Clube Symphony
        </h2>

        <span
          style={{
            display: 'block',
            width: '48px',
            height: '1px',
            background: 'var(--color-brass-gold)',
            margin: '0 auto 1.5rem',
            opacity: 0.6,
          }}
        />

        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.95rem',
            color: 'var(--text-muted)',
            lineHeight: 1.8,
            marginBottom: '2.5rem',
          }}
        >
          Acesso antecipado a novas sessões, convites para prévias no ateliê
          e uma peça exclusiva de clube por ano.
        </p>

        {!submitted ? (
          <form
            onSubmit={handleSubmit}
            style={{
              display: 'flex',
              gap: '0.75rem',
              flexWrap: 'wrap',
              justifyContent: 'center',
            }}
            aria-label="Formulário de inscrição no Clube Symphony"
          >
            <div
              style={{
                position: 'relative',
                flex: '1 1 260px',
                maxWidth: '340px',
              }}
            >
              <Mail
                size={16}
                style={{
                  position: 'absolute',
                  left: '1rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'var(--color-brass-gold)',
                  opacity: 0.6,
                  pointerEvents: 'none',
                }}
              />
              <input
                id="newsletter-email-input"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu-email@..."
                required
                aria-label="Endereço de e-mail"
                style={{
                  width: '100%',
                  background: 'rgba(10,10,13,0.6)',
                  border: '1px solid rgba(201,162,75,0.4)',
                  borderRadius: '2px',
                  padding: '0.75rem 1rem 0.75rem 2.75rem',
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.875rem',
                  color: 'var(--color-veiled-ivory)',
                  outline: 'none',
                  transition: 'border-color var(--transition-base)',
                }}
                onFocus={(e) => { e.target.style.borderColor = 'var(--color-brass-gold)'; }}
                onBlur={(e) => { e.target.style.borderColor = 'rgba(201,162,75,0.4)'; }}
              />
            </div>

            <Button
              type="submit"
              variant="primary"
              size="md"
              id="newsletter-submit-btn"
              style={{ flexShrink: 0 }}
            >
              Entrar para o clube
            </Button>
          </form>
        ) : (
          <div
            style={{
              background: 'rgba(201,162,75,0.08)',
              border: '1px solid rgba(201,162,75,0.3)',
              borderRadius: 'var(--radius-md)',
              padding: '1.5rem',
              animation: 'fadeInUp 0.6s ease',
            }}
          >
            <p
              style={{
                fontFamily: 'var(--font-display)',
                fontStyle: 'italic',
                fontSize: '1.1rem',
                color: 'var(--color-brass-gold)',
                lineHeight: 1.5,
              }}
            >
              Sua peça entrou em produção.<br />
              <span style={{ fontSize: '0.9rem', opacity: 0.8 }}>Cortina fecha, ateliê abre.</span>
            </p>
          </div>
        )}

        {/* Aviso de privacidade */}
        <p
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.6rem',
            color: 'var(--text-muted)',
            marginTop: '1.25rem',
            letterSpacing: '0.08em',
            opacity: 0.6,
          }}
        >
          SEM SPAM · APENAS SESSÕES QUE IMPORTAM · DESCADASTRAMENTO A QUALQUER MOMENTO
        </p>
      </motion.div>
    </section>
  );
}
