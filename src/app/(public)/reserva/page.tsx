'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { SectionDivider } from '@/components/ui/SectionDivider';
import { Button } from '@/components/ui/Button';
import { CheckCircle2, Lock } from 'lucide-react';

export default function ReservaPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div style={{ background: 'var(--color-gotham-black)', minHeight: '100vh', color: 'var(--color-veiled-ivory)' }}>
      <Header />

      <main style={{ paddingTop: '120px', paddingBottom: '100px', maxWidth: '800px', margin: '0 auto', paddingInline: '1.5rem' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: '3rem' }}
        >
          <p style={{ fontFamily: 'var(--font-seal)', fontSize: '0.7rem', letterSpacing: '0.22em', color: 'var(--color-brass-gold)', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
            CONCIERGE & RESERVA EXCLUSIVA
          </p>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', fontWeight: 900, textTransform: 'uppercase', color: 'var(--color-veiled-ivory)', marginBottom: '1rem' }}>
            Reserva de Peça Autoral
          </h1>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '1rem', color: 'var(--text-muted)', maxWidth: '520px', margin: '0 auto' }}>
            Preencha seus dados para receber um atendimento privado pelo nosso mestre relojoeiro e confirmar a disponibilidade de série da sua peça.
          </p>
        </motion.div>

        <SectionDivider />

        <div style={{ background: 'var(--color-deep-wine)', border: '1px solid rgba(201,162,75,0.3)', borderRadius: 'var(--radius-lg)', padding: '2.5rem', marginTop: '3rem', boxShadow: '0 25px 60px rgba(10,10,13,0.9)' }}>
          {!submitted ? (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div>
                <label htmlFor="reserva-name" style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--color-brass-gold)', letterSpacing: '0.1em', marginBottom: '0.5rem', textTransform: 'uppercase' }}>
                  Nome Completo *
                </label>
                <input
                  id="reserva-name"
                  type="text"
                  required
                  placeholder="Ex: Gabriel Sanchez"
                  style={{ width: '100%', background: 'rgba(10,10,13,0.7)', border: '1px solid rgba(201,162,75,0.35)', borderRadius: 'var(--radius-sm)', padding: '0.85rem 1rem', color: 'var(--color-veiled-ivory)', outline: 'none', fontFamily: 'var(--font-body)' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem' }}>
                <div>
                  <label htmlFor="reserva-email" style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--color-brass-gold)', letterSpacing: '0.1em', marginBottom: '0.5rem', textTransform: 'uppercase' }}>
                    E-mail Privado *
                  </label>
                  <input
                    id="reserva-email"
                    type="email"
                    required
                    placeholder="gabriel@..."
                    style={{ width: '100%', background: 'rgba(10,10,13,0.7)', border: '1px solid rgba(201,162,75,0.35)', borderRadius: 'var(--radius-sm)', padding: '0.85rem 1rem', color: 'var(--color-veiled-ivory)', outline: 'none', fontFamily: 'var(--font-body)' }}
                  />
                </div>

                <div>
                  <label htmlFor="reserva-phone" style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--color-brass-gold)', letterSpacing: '0.1em', marginBottom: '0.5rem', textTransform: 'uppercase' }}>
                    Telefone / WhatsApp *
                  </label>
                  <input
                    id="reserva-phone"
                    type="tel"
                    required
                    placeholder="+55 (11) 99999-9999"
                    style={{ width: '100%', background: 'rgba(10,10,13,0.7)', border: '1px solid rgba(201,162,75,0.35)', borderRadius: 'var(--radius-sm)', padding: '0.85rem 1rem', color: 'var(--color-veiled-ivory)', outline: 'none', fontFamily: 'var(--font-body)' }}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="reserva-piece" style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--color-brass-gold)', letterSpacing: '0.1em', marginBottom: '0.5rem', textTransform: 'uppercase' }}>
                  Peça de Interesse *
                </label>
                <select
                  id="reserva-piece"
                  style={{ width: '100%', background: 'rgba(10,10,13,0.9)', border: '1px solid rgba(201,162,75,0.35)', borderRadius: 'var(--radius-sm)', padding: '0.85rem 1rem', color: 'var(--color-veiled-ivory)', outline: 'none', fontFamily: 'var(--font-body)' }}
                >
                  <option value="automato-corvo-001">Autômato Corvo-Relojoeiro — R$ 4.800</option>
                  <option value="relogio-sanchez-001">Sanchez No. 1 — Vinho Profundo — R$ 7.200</option>
                  <option value="caixa-sinfonia">Caixa Sinfonia da Cidade — R$ 1.900</option>
                  <option value="rob-sentinela">Robô Sentinela de Latão — R$ 3.400</option>
                </select>
              </div>

              <div>
                <label htmlFor="reserva-notes" style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--color-brass-gold)', letterSpacing: '0.1em', marginBottom: '0.5rem', textTransform: 'uppercase' }}>
                  Observações ou Personalização
                </label>
                <textarea
                  id="reserva-notes"
                  rows={3}
                  placeholder="Deseja gravação de iniciais ou agendamento de visita presencial?"
                  style={{ width: '100%', background: 'rgba(10,10,13,0.7)', border: '1px solid rgba(201,162,75,0.35)', borderRadius: 'var(--radius-sm)', padding: '0.85rem 1rem', color: 'var(--color-veiled-ivory)', outline: 'none', fontFamily: 'var(--font-body)' }}
                />
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                <Lock size={14} color="#C9A24B" />
                <span>Atendimento confidencial e direto com o Ateliê Sanchez.</span>
              </div>

              <Button variant="gold" size="lg" type="submit" style={{ marginTop: '1rem' }}>
                Solicitar Reserva de Peça
              </Button>
            </form>
          ) : (
            <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
                <CheckCircle2 size={56} color="#C9A24B" />
              </div>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', fontWeight: 700, color: 'var(--color-veiled-ivory)', marginBottom: '1rem' }}>
                Reserva Recebida com Sucesso
              </h2>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: '2rem', maxWidth: '480px', marginInline: 'auto' }}>
                O Ateliê Sanchez entrará em contato nas próximas 24 horas via WhatsApp / E-mail para confirmar a numeração de série da sua peça.
              </p>
              <Button variant="ghost" size="md" href="/home">
                Voltar à Página Inicial
              </Button>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
