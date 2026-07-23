'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { SectionDivider } from '@/components/ui/SectionDivider';
import { Mail, Check, Sparkles } from 'lucide-react';

export function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [focused, setFocused] = useState(false);

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
        borderTop: '1px solid rgba(201,162,75,0.15)',
        borderBottom: '1px solid rgba(201,162,75,0.15)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Animated background patterns */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            radial-gradient(circle at 20% 50%, rgba(201,162,75,0.05) 0%, transparent 50%),
            radial-gradient(circle at 80% 50%, rgba(179,18,42,0.04) 0%, transparent 50%)
          `,
          pointerEvents: 'none',
        }}
      />

      {/* Film grain */}
      <div aria-hidden="true" style={{
        position: 'absolute', inset: 0, zIndex: 0, opacity: 0.025, pointerEvents: 'none',
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        backgroundRepeat: 'repeat', mixBlendMode: 'overlay',
      }} />

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

        {/* Seal icon */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5, rotate: -30 }}
          whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.25rem' }}
        >
          <div style={{
            width: '56px', height: '56px',
            borderRadius: '50%',
            background: 'rgba(179,18,42,0.7)',
            border: '1.5px solid var(--color-brass-gold)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 0 30px rgba(179,18,42,0.3), 0 0 60px rgba(201,162,75,0.1)',
          }}>
            <Sparkles size={22} color="#C9A24B" />
          </div>
        </motion.div>

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
          Ato VII — Clube Privado
        </motion.p>

        <h2
          id="newsletter-heading"
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2rem, 5vw, 2.75rem)',
            fontWeight: 900,
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            color: 'var(--color-veiled-ivory)',
            marginBottom: '1rem',
            lineHeight: 1.1,
          }}
        >
          Clube Symphony
        </h2>

        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{
            width: '48px',
            height: '1px',
            background: 'var(--color-brass-gold)',
            margin: '0 auto 1.5rem',
            transformOrigin: 'center',
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
                  color: focused ? 'var(--color-brass-gold)' : 'rgba(201,162,75,0.5)',
                  transition: 'color 200ms ease',
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
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                style={{
                  width: '100%',
                  background: 'rgba(10,10,13,0.5)',
                  backdropFilter: 'blur(8px)',
                  border: focused
                    ? '1px solid var(--color-brass-gold)'
                    : '1px solid rgba(201,162,75,0.3)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '0.85rem 1rem 0.85rem 2.75rem',
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.875rem',
                  color: 'var(--color-veiled-ivory)',
                  outline: 'none',
                  transition: 'all 250ms ease',
                  boxShadow: focused
                    ? '0 0 20px rgba(201,162,75,0.1)'
                    : 'none',
                }}
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
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            style={{
              background: 'rgba(201,162,75,0.06)',
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(201,162,75,0.25)',
              borderRadius: 'var(--radius-lg)',
              padding: '2rem',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.75rem',
            }}
          >
            <div style={{
              width: '40px', height: '40px', borderRadius: '50%',
              background: 'rgba(201,162,75,0.15)',
              border: '1px solid rgba(201,162,75,0.3)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Check size={20} color="#C9A24B" />
            </div>
            <p
              style={{
                fontFamily: 'var(--font-display)',
                fontStyle: 'italic',
                fontSize: '1.1rem',
                color: 'var(--color-brass-gold)',
                lineHeight: 1.5,
              }}
            >
              Sua peça entrou em produção.
            </p>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              Cortina fecha, ateliê abre.
            </p>
          </motion.div>
        )}

        {/* Privacy notice */}
        <p
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.55rem',
            color: 'var(--text-muted)',
            marginTop: '1.25rem',
            letterSpacing: '0.1em',
            opacity: 0.5,
          }}
        >
          SEM SPAM · APENAS SESSÕES QUE IMPORTAM · DESCADASTRAMENTO A QUALQUER MOMENTO
        </p>
      </motion.div>
    </section>
  );
}
