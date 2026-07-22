'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Search, User, ShoppingBag, Menu, X, Music } from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';
import { useUIStore } from '@/store/useUIStore';

const navLinks = [
  { href: '/colecao', label: 'Coleção' },
  { href: '/atelie', label: 'Ateliê Sanchez' },
  { href: '/editorial', label: 'Editorial' },
  { href: '/clube', label: 'Clube' },
];

export function Header() {
  const {
    isHeaderSolid,
    setHeaderSolid,
    toggleMobileMenu,
    isMobileMenuOpen,
    closeMobileMenu,
    toggleSoundtrack,
    isSoundtrackActive,
    isHeroInView,
  } = useUIStore();

  const totalItems = useCartStore((state) => state.totalItems);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    setCartCount(totalItems());
  }, [totalItems]);

  // Solidifica fundo ao rolar (só relevante depois que o header apareceu)
  useEffect(() => {
    const handleScroll = () => setHeaderSolid(window.scrollY > 80);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [setHeaderSolid]);

  // Bloqueia scroll do body quando menu mobile aberto
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMobileMenuOpen]);

  // Quando hero está em view → header invisível e fora do fluxo de interação
  const headerVisible = !isHeroInView;

  return (
    <>
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          /* Slide de entrada vindo do topo */
          transform: headerVisible ? 'translateY(0)' : 'translateY(-100%)',
          opacity: headerVisible ? 1 : 0,
          pointerEvents: headerVisible ? 'auto' : 'none',
          transition: 'transform 500ms cubic-bezier(0.16,1,0.3,1), opacity 400ms ease, background 350ms ease, border-color 350ms ease',
          background: isHeaderSolid
            ? 'rgba(10, 10, 13, 0.97)'
            : 'rgba(10, 10, 13, 0.5)',
          backdropFilter: 'blur(12px)',
          borderBottom: isHeaderSolid
            ? '1px solid rgba(201, 162, 75, 0.3)'
            : '1px solid rgba(201, 162, 75, 0.1)',
        }}
        aria-hidden={!headerVisible}
      >
        <div
          style={{
            maxWidth: '1280px',
            margin: '0 auto',
            padding: '0 1.5rem',
            height: '68px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '2rem',
          }}
        >
          {/* Nav esquerda */}
          <nav
            style={{ display: 'flex', gap: '2rem', flex: 1 }}
            aria-label="Navegação principal"
          >
            {navLinks.slice(0, 2).map((link) => (
              <Link key={link.href} href={link.href} style={navLinkStyle}>
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Logo central */}
          <Link
            href="/"
            style={{
              fontFamily: 'var(--font-wordmark)',
              fontSize: '1.75rem',
              color: 'var(--color-veiled-ivory)',
              lineHeight: 1,
              flexShrink: 0,
              textDecoration: 'none',
              textShadow: '0 0 30px rgba(201,162,75,0.2)',
              whiteSpace: 'nowrap',
            }}
            aria-label="Symphony of Night — Início"
          >
            Symphony of Night
          </Link>

          {/* Nav direita + ícones */}
          <nav
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '2rem',
              flex: 1,
              justifyContent: 'flex-end',
            }}
          >
            {navLinks.slice(2).map((link) => (
              <Link key={link.href} href={link.href} style={navLinkStyle}>
                {link.label}
              </Link>
            ))}

            <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', marginLeft: '0.5rem' }}>
              <Link href="/busca" aria-label="Buscar" id="header-search-btn" style={iconBtnStyle as React.CSSProperties}>
                <Search size={18} />
              </Link>
              <Link href="/conta" aria-label="Minha conta" id="header-account-btn" style={iconBtnStyle as React.CSSProperties}>
                <User size={18} />
              </Link>

              {/* Sacola */}
              <button id="header-cart-btn" aria-label={`Sacola — ${cartCount} itens`} style={{ ...iconBtnStyle, position: 'relative' } as React.CSSProperties}>
                <ShoppingBag size={18} />
                {cartCount > 0 && (
                  <span style={{
                    position: 'absolute', top: '-6px', right: '-6px',
                    background: 'var(--color-marquise-red)',
                    color: 'var(--color-veiled-ivory)',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.6rem', fontWeight: 700,
                    width: '17px', height: '17px', borderRadius: '50%',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    {cartCount}
                  </span>
                )}
              </button>

              {/* Som */}
              <button
                id="header-sound-btn"
                aria-label={isSoundtrackActive ? 'Pausar trilha' : 'Ativar trilha ambiente'}
                onClick={toggleSoundtrack}
                style={{ ...iconBtnStyle, color: isSoundtrackActive ? 'var(--color-brass-gold)' : 'rgba(231,224,210,0.4)' } as React.CSSProperties}
              >
                <Music size={16} />
              </button>

              {/* Menu mobile */}
              <button
                id="header-menu-btn"
                onClick={toggleMobileMenu}
                aria-label={isMobileMenuOpen ? 'Fechar menu' : 'Abrir menu'}
                style={{ ...iconBtnStyle, display: 'none' } as React.CSSProperties}
                className="mobile-trigger"
              >
                {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </nav>
        </div>

        <style>{`
          @media (max-width: 768px) {
            nav:first-of-type { display: none !important; }
            nav:last-of-type > a { display: none !important; }
            .mobile-trigger { display: flex !important; }
          }
        `}</style>
      </header>

      {/* Overlay mobile menu */}
      {isMobileMenuOpen && (
        <div
          style={{
            position: 'fixed', inset: 0, zIndex: 99,
            background: 'rgba(10,10,13,0.98)',
            backdropFilter: 'blur(20px)',
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            gap: '2.5rem', padding: '5rem 2rem 2rem',
          }}
          role="dialog" aria-label="Menu de navegação"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href} href={link.href} onClick={closeMobileMenu}
              style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', color: 'var(--color-veiled-ivory)', textDecoration: 'none' }}
            >
              {link.label}
            </Link>
          ))}
          <span style={{ width: '48px', height: '1px', background: 'var(--color-brass-gold)', opacity: 0.4 }} />
          <p style={{ fontFamily: 'var(--font-seal)', fontSize: '0.7rem', letterSpacing: '0.2em', color: 'var(--color-brass-gold)', opacity: 0.6 }}>
            ATELIÊ SANCHEZ
          </p>
        </div>
      )}
    </>
  );
}

const navLinkStyle: React.CSSProperties = {
  fontFamily: 'var(--font-body)',
  fontSize: '0.78rem',
  fontWeight: 500,
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
  color: 'rgba(231,224,210,0.75)',
  textDecoration: 'none',
  transition: 'color 150ms ease',
};

const iconBtnStyle = {
  background: 'none',
  border: 'none',
  color: 'rgba(231,224,210,0.75)',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '0.25rem',
  transition: 'color 150ms ease',
};
