'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { SectionDivider } from '@/components/ui/SectionDivider';
import { Button } from '@/components/ui/Button';

const CATEGORIES_DATA: Record<string, {
  name: string;
  subtitle: string;
  description: string;
  items: Array<{
    id: string;
    sku: string;
    name: string;
    edition: string;
    price: number;
    description: string;
    materials: string;
    mechanism: string;
  }>;
}> = {
  automatos: {
    name: 'Autômatos Cinéticos',
    subtitle: 'Esculturas de corda manual e movimento poético',
    description: 'Cada autômato é montado à mão com mais de 100 horas de ajustamento fino. Mecanismos expostos em latão e madeira nobre.',
    items: [
      {
        id: 'automato-corvo-001',
        sku: 'AUTÔMATO-001',
        name: 'Autômato Corvo-Relojoeiro',
        edition: 'Edição 0/100',
        price: 4800,
        description: 'Bate as asas e revela um mostrador de relógio no peito a cada ciclo de 12 segundos. Corda manual de 72h.',
        materials: 'Latão maciço, mogno ebonizado, cristal mineral',
        mechanism: '14 engrenagens móveis · escape de âncora',
      },
      {
        id: 'rob-sentinela',
        sku: 'ROBÔ-002',
        name: 'Robô Sentinela de Latão',
        edition: 'Edição 0/100',
        price: 3400,
        description: 'Articulações em latão usinado à mão, olhos em âmbar sintético. Série assinada e numerada pelo mestre relojoeiro.',
        materials: 'Latão, cobre patinado, âmbar sintético',
        mechanism: '8 articulações cinéticas · base magnética',
      },
    ],
  },
  relogios: {
    name: 'Relógios de Alta Horologia',
    subtitle: 'Linha Sanchez — Mecanismo automático exposto',
    description: 'Relógios autorais construídos com caixa em aço inoxidável 316L, mostrador vazado e movimento ETA modificado.',
    items: [
      {
        id: 'relogio-sanchez-001',
        sku: 'SANCHEZ-N01',
        name: 'Sanchez No. 1 — Vinho Profundo',
        edition: 'Edição 0/50',
        price: 7200,
        description: 'Mostrador vinho escuro escovado com ponteiros banhados a ouro 18k. Cristal de safira duplo anti-reflexo.',
        materials: 'Aço inox 316L, couro jacaré, safira',
        mechanism: 'ETA 2824-2 Automático · 28.800 vph',
      },
    ],
  },
  'caixas-de-musica': {
    name: 'Caixas de Música Autorais',
    subtitle: 'Melodias exclusivas em latão e ressonadores de madeira',
    description: 'Cilindros de latão cravados com notas autorais de 40 segundos, abrigados em caixas de ressonância acústica.',
    items: [
      {
        id: 'caixa-sinfonia',
        sku: 'CAIXA-S01',
        name: 'Caixa Sinfonia da Cidade',
        edition: 'Edição 0/200',
        price: 1900,
        description: 'Toca uma melodia autoral de 40 segundos. Mecanismo de 18 notas em aço temperado com cilindro de latão gravado.',
        materials: 'Madeira ebonizada, latão polido, veludo',
        mechanism: 'Pente de 18 notas · cilindro 60mm',
      },
    ],
  },
  joias: {
    name: 'Joias Cinéticas',
    subtitle: 'Engrenagens funcionais desenhadas para o corpo',
    description: 'Anéis e pingentes em ouro e prata com engrenagens internas de micromecânica acionadas por toque.',
    items: [
      {
        id: 'pingente-orbita',
        sku: 'JOIA-J01',
        name: 'Pingente Órbita do Tempo',
        edition: 'Edição 0/75',
        price: 2600,
        description: 'Engrenagens concêntricas em ouro 18k que giram suavemente com o movimento do corpo.',
        materials: 'Ouro 18k, prata 925, rubi sintético',
        mechanism: 'Micro-rolamento cerâmico · 3 engrenagens',
      },
    ],
  },
  escrivaninha: {
    name: 'Objetos de Escrivaninha',
    subtitle: 'Instrumentos de precisão em latão maciço',
    description: 'Pesos de papel, pêndulos de ampulheta e bússolas astronômicas criadas para gabinetes de raridades.',
    items: [
      {
        id: 'pendulo-galileu',
        sku: 'OBJETO-E01',
        name: 'Pêndulo de Precisão Galileu',
        edition: 'Edição 0/150',
        price: 2100,
        description: 'Pêndulo caótico de rotação dupla sobre base magnética de mogno.',
        materials: 'Latão usinado, mogno, ímã de neodímio',
        mechanism: 'Eixo em safira · oscilação estendida',
      },
    ],
  },
};

export default function CategoryCollectionPage() {
  const params = useParams();
  const slug = (params?.slug as string) || 'automatos';
  const category = CATEGORIES_DATA[slug] || CATEGORIES_DATA['automatos'];

  const categoryKeys = Object.keys(CATEGORIES_DATA);

  return (
    <div style={{ background: 'var(--color-gotham-black)', minHeight: '100vh', color: 'var(--color-veiled-ivory)' }}>
      <Header />

      <main style={{ paddingTop: '120px', paddingBottom: '100px', maxWidth: '1280px', margin: '0 auto', paddingInline: '1.5rem' }}>
        {/* Cabeçalho da Coleção */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: '3rem' }}
        >
          <p style={{ fontFamily: 'var(--font-seal)', fontSize: '0.7rem', letterSpacing: '0.22em', color: 'var(--color-brass-gold)', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
            COLEÇÃO AUTORAL · ATELIÊ SANCHEZ
          </p>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem, 6vw, 4rem)', fontWeight: 900, textTransform: 'uppercase', color: 'var(--color-veiled-ivory)', marginBottom: '1rem' }}>
            {category.name}
          </h1>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '1.05rem', color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto' }}>
            {category.subtitle}
          </p>
        </motion.div>

        {/* Abas de Navegação por Categorias */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '4rem' }}>
          {categoryKeys.map((catKey) => {
            const isSelected = catKey === slug;
            const catInfo = CATEGORIES_DATA[catKey];
            return (
              <Link
                key={catKey}
                href={`/colecao/${catKey}`}
                style={{
                  padding: '0.5rem 1.25rem',
                  borderRadius: 'var(--radius-sm)',
                  background: isSelected ? 'var(--color-brass-gold)' : 'rgba(28,14,20,0.6)',
                  color: isSelected ? '#0A0A0D' : 'var(--color-veiled-ivory)',
                  border: isSelected ? '1px solid #C9A24B' : '1px solid rgba(201,162,75,0.2)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.75rem',
                  fontWeight: isSelected ? 700 : 400,
                  textDecoration: 'none',
                  transition: 'all 250ms ease',
                }}
              >
                {catInfo.name.split(' ')[0]}
              </Link>
            );
          })}
        </div>

        <SectionDivider />

        {/* Grid de Produtos da Categoria */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2rem', marginTop: '3rem' }}>
          {category.items.map((item, index) => (
            <motion.article
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              style={{
                background: 'var(--color-deep-wine)',
                border: '1px solid rgba(201,162,75,0.25)',
                borderRadius: 'var(--radius-md)',
                padding: '2rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                boxShadow: '0 20px 40px rgba(10,10,13,0.8)',
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--color-brass-gold)' }}>
                    {item.sku}
                  </span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', background: 'rgba(10,10,13,0.8)', padding: '0.2rem 0.5rem', border: '1px solid rgba(201,162,75,0.3)', borderRadius: 'var(--radius-sm)', color: 'var(--color-brass-gold)' }}>
                    {item.edition}
                  </span>
                </div>

                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: 700, color: 'var(--color-veiled-ivory)', marginBottom: '0.75rem' }}>
                  {item.name}
                </h2>

                <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                  {item.description}
                </p>

                <div style={{ borderTop: '1px solid rgba(201,162,75,0.15)', paddingTop: '1rem', marginBottom: '1.5rem' }}>
                  <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-muted)', lineHeight: 1.8 }}>
                    <strong>Materiais:</strong> {item.materials}<br />
                    <strong>Mecanismo:</strong> {item.mechanism}
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid rgba(201,162,75,0.2)', paddingTop: '1rem' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '1.2rem', fontWeight: 700, color: 'var(--color-veiled-ivory)' }}>
                  {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.price)}
                </span>

                <Link href={`/produto/${item.id}`}>
                  <Button variant="gold" size="sm">
                    Ver Detalhes
                  </Button>
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
