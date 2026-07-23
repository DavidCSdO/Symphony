'use client';

import React, { useState } from 'react';
import Link from 'next/link';

type Variant = 'primary' | 'ghost' | 'gold';
type Size = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  children: React.ReactNode;
  asChild?: boolean;
  href?: string;
}

const styles: Record<string, React.CSSProperties> = {
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    fontFamily: 'var(--font-body)',
    fontWeight: 600,
    letterSpacing: '0.12em',
    textTransform: 'uppercase',
    cursor: 'pointer',
    border: 'none',
    borderRadius: '2px',
    transition: 'all 250ms cubic-bezier(0.16, 1, 0.3, 1)',
    position: 'relative',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textDecoration: 'none',
  },
};

const variantMap: Record<Variant, React.CSSProperties> = {
  primary: {
    background: 'var(--color-marquise-red)',
    color: 'var(--color-veiled-ivory)',
    boxShadow: '0 0 0 1px rgba(179, 18, 42, 0.4)',
  },
  ghost: {
    background: 'transparent',
    color: 'var(--color-veiled-ivory)',
    border: '1px solid var(--color-brass-gold)',
  },
  gold: {
    background: 'transparent',
    color: 'var(--color-brass-gold)',
    border: '1px solid var(--color-brass-gold)',
  },
};

const sizeMap: Record<Size, React.CSSProperties> = {
  sm: { fontSize: '0.75rem', padding: '0.5rem 1rem' },
  md: { fontSize: '0.8125rem', padding: '0.75rem 1.75rem' },
  lg: { fontSize: '0.875rem', padding: '1rem 2.5rem' },
};

export function Button({
  variant = 'primary',
  size = 'md',
  children,
  style,
  href,
  ...props
}: ButtonProps) {
  const [hovered, setHovered] = React.useState(false);

  const hoverStyles: Partial<Record<Variant, React.CSSProperties>> = {
    primary: { background: '#8a0d1f', boxShadow: '0 0 30px rgba(179, 18, 42, 0.4)' },
    ghost: { background: 'rgba(201, 162, 75, 0.08)', color: 'var(--color-brass-gold)' },
    gold: { background: 'var(--color-brass-gold)', color: 'var(--color-gotham-black)' },
  };

  const buttonElement = (
    <button
      style={{
        ...styles.base,
        ...variantMap[variant],
        ...sizeMap[size],
        ...(hovered ? hoverStyles[variant] : {}),
        ...style,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      {...props}
    >
      {children}
    </button>
  );

  if (href) {
    return (
      <Link href={href} style={{ textDecoration: 'none', display: 'inline-block' }}>
        {buttonElement}
      </Link>
    );
  }

  return buttonElement;
}
