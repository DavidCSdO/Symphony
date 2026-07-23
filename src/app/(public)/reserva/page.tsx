'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { SectionDivider } from '@/components/ui/SectionDivider';
import { Button } from '@/components/ui/Button';
import { CheckCircle2, Lock, ShieldCheck, User, Mail, Phone, Package, MessageSquare } from 'lucide-react';

export default function ReservaPage() {
  const [submitted, setSubmitted] = useState(false);
  const [focusedInput, setFocusedInput] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const getInputStyle = (inputName: string): React.CSSProperties => ({
    width: '100%',
    background: 'rgba(10,10,13,0.6)',
    backdropFilter: 'blur(8px)',
    border: focusedInput === inputName
      ? '1px solid var(--color-brass-gold)'
      : '1px solid rgba(201,162,75,0.3)',
    borderRadius: 'var(--radius-sm)',
    padding: '0.85rem 1rem 0.85rem 2.75rem',
    color: 'var(--color-veiled-ivory)',
    outline: 'none',
    fontFamily: 'var(--font-body)',
    fontSize: '0.9rem',
    transition: 'all 250ms ease',
    boxShadow: focusedInput === inputName ? '0 0 20px rgba(201,162,75,0.1)' : 'none',
  });

  return (
    <div style={{ background: 'var(--color-gotham-black)', minHeight: '100vh', color: 'var(--color-veiled-ivory)', position: 'relative' }}>
      <Header />

      {/* Radial atmosphere */}
      <div aria-hidden="true" style={{
        position: 'absolute', top: '15%', left: '50%', transform: 'translateX(-50%)',
        width: '700px', height: '450px',
        background: 'radial-gradient(circle, rgba(179,18,42,0.08) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <main style={{ paddingTop: '130px', paddingBottom: '100px', maxWidth: '820px', margin: '0 auto', paddingInline: '1.5rem', position: 'relative' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{ textAlign: 'center', marginBottom: '3rem' }}
        >
          <motion.p
            initial={{ opacity: 0, letterSpacing: '0.5em' }}
            animate={{ opacity: 1, letterSpacing: '0.22em' }}
            transition={{ duration: 0.8 }}
            style={{
              fontFamily: 'var(--font-seal)',
              fontSize: '0.7rem',
              color: 'var(--color-brass-gold)',
              textTransform: 'uppercase',
              marginBottom: '0.75rem',
            }}
          >
            CONCIERGE & RESERVA EXCLUSIVA
          </motion.p>
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2.2rem, 5vw, 3.5rem)',
            fontWeight: 900,
            textTransform: 'uppercase',
            color: 'var(--color-veiled-ivory)',
            marginBottom: '1rem',
            letterSpacing: '0.04em',
          }}>
            Reserva de Peça Autoral
          </h1>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: '1rem',
            color: 'var(--text-muted)',
            maxWidth: '520px',
            margin: '0 auto',
            lineHeight: 1.7,
          }}>
            Preencha seus dados para receber um atendimento privado pelo nosso mestre relojoeiro e confirmar a disponibilidade de série da sua peça.
          </p>
        </motion.div>

        <SectionDivider />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          style={{
            background: 'rgba(28,14,20,0.55)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            border: '1px solid rgba(201,162,75,0.3)',
            borderRadius: 'var(--radius-lg)',
            padding: '3rem 2.5rem',
            marginTop: '3rem',
            boxShadow: '0 25px 60px rgba(10,10,13,0.9)',
          }}
        >
          {!submitted ? (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
              <div>
                <label htmlFor="reserva-name" style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--color-brass-gold)', letterSpacing: '0.12em', marginBottom: '0.6rem', textTransform: 'uppercase' }}>
                  Nome Completo *
                </label>
                <div style={{ position: 'relative' }}>
                  <User size={16} color={focusedInput === 'name' ? '#C9A24B' : 'rgba(201,162,75,0.5)'} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', transition: 'color 200ms ease' }} />
                  <input
                    id="reserva-name"
                    type="text"
                    required
                    placeholder="Ex: Gabriel Sanchez"
                    onFocus={() => setFocusedInput('name')}
                    onBlur={() => setFocusedInput(null)}
                    style={getInputStyle('name')}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.75rem' }}>
                <div>
                  <label htmlFor="reserva-email" style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--color-brass-gold)', letterSpacing: '0.12em', marginBottom: '0.6rem', textTransform: 'uppercase' }}>
                    E-mail Privado *
                  </label>
                  <div style={{ position: 'relative' }}>
                    <Mail size={16} color={focusedInput === 'email' ? '#C9A24B' : 'rgba(201,162,75,0.5)'} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', transition: 'color 200ms ease' }} />
                    <input
                      id="reserva-email"
                      type="email"
                      required
                      placeholder="gabriel@..."
                      onFocus={() => setFocusedInput('email')}
                      onBlur={() => setFocusedInput(null)}
                      style={getInputStyle('email')}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="reserva-phone" style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--color-brass-gold)', letterSpacing: '0.12em', marginBottom: '0.6rem', textTransform: 'uppercase' }}>
                    Telefone / WhatsApp *
                  </label>
                  <div style={{ position: 'relative' }}>
                    <Phone size={16} color={focusedInput === 'phone' ? '#C9A24B' : 'rgba(201,162,75,0.5)'} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', transition: 'color 200ms ease' }} />
                    <input
                      id="reserva-phone"
                      type="tel"
                      required
                      placeholder="+55 (11) 99999-9999"
                      onFocus={() => setFocusedInput('phone')}
                      onBlur={() => setFocusedInput(null)}
                      style={getInputStyle('phone')}
                    />
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="reserva-piece" style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--color-brass-gold)', letterSpacing: '0.12em', marginBottom: '0.6rem', textTransform: 'uppercase' }}>
                  Peça de Interesse *
                </label>
                <div style={{ position: 'relative' }}>
                  <Package size={16} color={focusedInput === 'piece' ? '#C9A24B' : 'rgba(201,162,75,0.5)'} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', transition: 'color 200ms ease', zIndex: 2 }} />
                  <select
                    id="reserva-piece"
                    onFocus={() => setFocusedInput('piece')}
                    onBlur={() => setFocusedInput(null)}
                    style={{
                      ...getInputStyle('piece'),
                      appearance: 'none',
                      WebkitAppearance: 'none',
                      cursor: 'pointer',
                    }}
                  >
                    <option value="automato-corvo-001" style={{ background: '#0A0A0D', color: '#E7E0D2' }}>Autômato Corvo-Relojoeiro — R$ 4.800</option>
                    <option value="relogio-sanchez-001" style={{ background: '#0A0A0D', color: '#E7E0D2' }}>Sanchez No. 1 — Vinho Profundo — R$ 7.200</option>
                    <option value="caixa-sinfonia" style={{ background: '#0A0A0D', color: '#E7E0D2' }}>Caixa Sinfonia da Cidade — R$ 1.900</option>
                    <option value="rob-sentinela" style={{ background: '#0A0A0D', color: '#E7E0D2' }}>Robô Sentinela de Latão — R$ 3.400</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="reserva-notes" style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--color-brass-gold)', letterSpacing: '0.12em', marginBottom: '0.6rem', textTransform: 'uppercase' }}>
                  Observações ou Personalização
                </label>
                <div style={{ position: 'relative' }}>
                  <MessageSquare size={16} color={focusedInput === 'notes' ? '#C9A24B' : 'rgba(201,162,75,0.5)'} style={{ position: 'absolute', left: '1rem', top: '1rem', pointerEvents: 'none', transition: 'color 200ms ease' }} />
                  <textarea
                    id="reserva-notes"
                    rows={3}
                    placeholder="Deseja gravação de iniciais ou agendamento de visita presencial?"
                    onFocus={() => setFocusedInput('notes')}
                    onBlur={() => setFocusedInput(null)}
                    style={{
                      ...getInputStyle('notes'),
                      resize: 'vertical',
                    }}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                <Lock size={15} color="#C9A24B" />
                <span>Atendimento confidencial e direto com o Ateliê Sanchez.</span>
              </div>

              <Button variant="gold" size="lg" type="submit" style={{ marginTop: '0.5rem' }}>
                Solicitar Reserva de Peça
              </Button>
            </form>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              style={{ textAlign: 'center', padding: '2rem 1rem' }}
            >
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
                <div style={{
                  width: '72px', height: '72px', borderRadius: '50%',
                  background: 'rgba(201,162,75,0.1)',
                  border: '1.5px solid var(--color-brass-gold)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: '0 0 40px rgba(201,162,75,0.2)',
                }}>
                  <CheckCircle2 size={38} color="#C9A24B" />
                </div>
              </div>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', fontWeight: 700, color: 'var(--color-veiled-ivory)', marginBottom: '1rem' }}>
                Reserva Recebida com Sucesso
              </h2>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: '2.5rem', maxWidth: '480px', marginInline: 'auto' }}>
                O Ateliê Sanchez entrará em contato nas próximas 24 horas via WhatsApp / E-mail para confirmar a numeração de série da sua peça.
              </p>
              <Button variant="ghost" size="md" href="/home">
                Voltar à Página Inicial
              </Button>
            </motion.div>
          )}
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
