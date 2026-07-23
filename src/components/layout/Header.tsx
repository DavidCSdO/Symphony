'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search, User, ShoppingBag, Menu, X, Music } from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';
import { useUIStore } from '@/store/useUIStore';

const navLinks = [
  { href: '/colecao/automatos', label: 'Coleção' },
  { href: '/bastidores', label: 'Ateliê Sanchez' },
  { href: '/editorial', label: 'Editorial' },
  { href: '/clube', label: 'Clube' },
];

export function Header() {
  const pathname = usePathname();
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
  const toggleCart = useCartStore((state) => state.toggleCart);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    setCartCount(totalItems());
  }, [totalItems]);

  useEffect(() => {
    const handleScroll = () => setHeaderSolid(window.scrollY > 80);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [setHeaderSolid]);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMobileMenuOpen]);

  const isHomePage = pathname === '/home' || pathname === '/';
  const headerVisible = isHomePage ? !isHeroInView : true;

  return (
    <>
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          transform: headerVisible ? 'translateY(0)' : 'translateY(-100%)',
          opacity: headerVisible ? 1 : 0,
          pointerEvents: headerVisible ? 'auto' : 'none',
          transition: 'transform 500ms cubic-bezier(0.16,1,0.3,1), opacity 400ms ease, background 350ms ease, border-color 350ms ease',
          background: isHeaderSolid
            ? 'rgba(10, 10, 13, 0.95)'
            : 'rgba(10, 10, 13, 0.65)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderBottom: isHeaderSolid
            ? '1px solid rgba(201, 162, 75, 0.25)'
            : '1px solid rgba(201, 162, 75, 0.1)',
          boxShadow: isHeaderSolid ? '0 10px 30px rgba(0,0,0,0.5)' : 'none',
        }}
        aria-hidden={!headerVisible}
      >
        <div
          style={{
            maxWidth: '1280px',
            margin: '0 auto',
            padding: '0 1.5rem',
            height: '72px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '2rem',
          }}
        >
          {/* Nav esquerda */}
          <nav
            className="main-nav-left"
            style={{ display: 'flex', gap: '2rem', flex: 1, alignItems: 'center' }}
            aria-label="Navegação principal"
          >
            {navLinks.slice(0, 2).map((link) => {
              const isActive = pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="nav-link-item"
                  style={{
                    ...navLinkStyle,
                    color: isActive ? 'var(--color-brass-gold)' : 'rgba(231,224,210,0.75)',
                  }}
                >
                  {link.label}
                  {isActive && (
                    <span
                      style={{
                        position: 'absolute',
                        bottom: '-4px',
                        left: 0,
                        right: 0,
                        height: '1px',
                        background: 'var(--color-brass-gold)',
                        borderRadius: '1px',
                      }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Logo central */}
          <Link
            href="/"
            style={{
              fontFamily: 'var(--font-wordmark)',
              fontSize: '1.85rem',
              color: 'var(--color-veiled-ivory)',
              lineHeight: 1,
              flexShrink: 0,
              textDecoration: 'none',
              textShadow: '0 0 25px rgba(201,162,75,0.25)',
              whiteSpace: 'nowrap',
              letterSpacing: '-0.01em',
              transition: 'all 300ms ease',
            }}
            aria-label="Symphony of Night — Início"
          >
            Symphony of Night
          </Link>

          {/* Nav direita + ícones */}
          <nav
            className="main-nav-right"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '2rem',
              flex: 1,
              justifyContent: 'flex-end',
            }}
          >
            {navLinks.slice(2).map((link) => {
              const isActive = pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="nav-link-item"
                  style={{
                    ...navLinkStyle,
                    color: isActive ? 'var(--color-brass-gold)' : 'rgba(231,224,210,0.75)',
                  }}
                >
                  {link.label}
                  {isActive && (
                    <span
                      style={{
                        position: 'absolute',
                        bottom: '-4px',
                        left: 0,
                        right: 0,
                        height: '1px',
                        background: 'var(--color-brass-gold)',
                        borderRadius: '1px',
                      }}
                    />
                  )}
                </Link>
              );
            })}

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', marginLeft: '0.5rem' }}>
              <Link
                href="/busca"
                aria-label="Buscar"
                id="header-search-btn"
                style={iconBtnStyle}
              >
                <Search size={18} />
              </Link>
              <Link
                href="/conta"
                aria-label="Minha conta"
                id="header-account-btn"
                style={iconBtnStyle}
              >
                <User size={18} />
              </Link>

              {/* Sacola */}
              <button
                id="header-cart-btn"
                aria-label={`Sacola — ${cartCount} itens`}
                onClick={toggleCart}
                style={{ ...iconBtnStyle, position: 'relative' }}
              >
                <ShoppingBag size={18} />
                {cartCount > 0 && (
                  <span
                    style={{
                      position: 'absolute',
                      top: '-4px',
                      right: '-4px',
                      background: 'var(--color-marquise-red)',
                      color: 'var(--color-veiled-ivory)',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.6rem',
                      fontWeight: 700,
                      width: '16px',
                      height: '16px',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 0 10px rgba(179,18,42,0.5)',
                    }}
                  >
                    {cartCount}
                  </span>
                )}
              </button>

              {/* Som */}
              <button
                id="header-sound-btn"
                aria-label={isSoundtrackActive ? 'Pausar trilha' : 'Ativar trilha ambiente'}
                onClick={toggleSoundtrack}
                style={{
                  ...iconBtnStyle,
                  color: isSoundtrackActive ? 'var(--color-brass-gold)' : 'rgba(231,224,210,0.4)',
                  borderColor: isSoundtrackActive ? 'rgba(201,162,75,0.4)' : 'rgba(201,162,75,0.15)',
                  background: isSoundtrackActive ? 'rgba(201,162,75,0.08)' : 'transparent',
                }}
              >
                <Music size={16} />
              </button>

              {/* Menu mobile */}
              <button
                id="header-menu-btn"
                onClick={toggleMobileMenu}
                aria-label={isMobileMenuOpen ? 'Fechar menu' : 'Abrir menu'}
                style={iconBtnStyle}
                className="mobile-trigger"
              >
                {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </nav>
        </div>

        <style>{`
          .mobile-trigger { display: none !important; }
          .mobile-nav-scroller { display: none; }
          @media (max-width: 768px) {
            .main-nav-left { display: none !important; }
            .main-nav-right > .nav-link-item { display: none !important; }
            .mobile-trigger { display: flex !important; }
            
            /* Add horizontal scrolling text nav for mobile underneath */
            .mobile-nav-scroller {
              display: flex;
              width: 100vw;
              overflow-x: auto;
              gap: 1.5rem;
              padding: 0.75rem 1.5rem;
              background: rgba(10, 10, 13, 0.95);
              border-bottom: 1px solid rgba(201, 162, 75, 0.15);
              position: fixed;
              top: 72px;
              left: 0;
              z-index: 99;
              scrollbar-width: none; /* Firefox */
              -ms-overflow-style: none; /* IE/Edge */
            }
            .mobile-nav-scroller::-webkit-scrollbar {
              display: none; /* Chrome/Safari */
            }
          }
        `}</style>
      </header>

      {/* Mobile Horizontal Nav Container */}
      <nav className="mobile-nav-scroller" style={{ 
        transform: headerVisible ? 'translateY(0)' : 'translateY(-100%)',
        opacity: headerVisible ? 1 : 0,
        transition: 'transform 500ms cubic-bezier(0.16,1,0.3,1), opacity 400ms ease',
      }}>
        {navLinks.map((link) => {
          const isActive = pathname.startsWith(link.href);
          return (
            <Link
              key={`mobile-nav-${link.href}`}
              href={link.href}
              style={{
                ...navLinkStyle,
                color: isActive ? 'var(--color-brass-gold)' : 'rgba(231,224,210,0.75)',
                whiteSpace: 'nowrap',
              }}
            >
              {link.label}
              {isActive && (
                <span style={{ position: 'absolute', bottom: '-4px', left: 0, right: 0, height: '1px', background: 'var(--color-brass-gold)' }} />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Overlay mobile menu */}
      {isMobileMenuOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 99,
            background: 'rgba(10,10,13,0.98)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '2.5rem',
            padding: '5rem 2rem 2rem',
          }}
          role="dialog"
          aria-label="Menu de navegação"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={closeMobileMenu}
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '2rem',
                color: 'var(--color-veiled-ivory)',
                textDecoration: 'none',
                transition: 'color 200ms ease',
              }}
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
  position: 'relative',
  paddingBlock: '0.25rem',
  transition: 'color 200ms ease',
};

const iconBtnStyle: React.CSSProperties = {
  background: 'rgba(201,162,75,0.05)',
  border: '1px solid rgba(201,162,75,0.15)',
  borderRadius: 'var(--radius-sm)',
  color: 'rgba(231,224,210,0.85)',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '36px',
  height: '36px',
  transition: 'all 200ms ease',
};
