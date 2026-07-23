'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';
import { Button } from './Button';

export function CartDrawer() {
  const { items, isOpen, toggleCart, removeItem, updateQuantity, totalPrice, totalItems } = useCartStore();

  const formattedTotal = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(totalPrice());

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            onClick={toggleCart}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(10, 10, 13, 0.85)',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
              zIndex: 9998,
            }}
          />

          {/* Drawer Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', ease: [0.16, 1, 0.3, 1], duration: 0.6 }}
            style={{
              position: 'fixed',
              top: 0,
              right: 0,
              bottom: 0,
              width: '100%',
              maxWidth: '440px',
              background: 'var(--color-gotham-black)',
              borderLeft: '1px solid rgba(201,162,75,0.2)',
              boxShadow: '-20px 0 60px rgba(10,10,13,0.9)',
              zIndex: 9999,
              display: 'flex',
              flexDirection: 'column',
            }}
            role="dialog"
            aria-modal="true"
            aria-label="Carrinho de Compras"
          >
            {/* Header */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '1.5rem',
              borderBottom: '1px solid rgba(201,162,75,0.15)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <ShoppingBag size={20} color="var(--color-brass-gold)" />
                <h2 style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.25rem',
                  fontWeight: 700,
                  color: 'var(--color-veiled-ivory)',
                  margin: 0,
                  letterSpacing: '0.05em'
                }}>
                  Aquisições <span style={{ color: 'var(--text-muted)', fontSize: '1rem', fontWeight: 400 }}>({totalItems()})</span>
                </h2>
              </div>
              <button
                onClick={toggleCart}
                aria-label="Fechar carrinho"
                style={{
                  background: 'rgba(201,162,75,0.05)',
                  border: '1px solid rgba(201,162,75,0.2)',
                  borderRadius: 'var(--radius-sm)',
                  color: 'var(--color-brass-gold)',
                  width: '36px',
                  height: '36px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'all 200ms ease'
                }}
              >
                <X size={18} />
              </button>
            </div>

            {/* Cart Items */}
            <div style={{
              flex: 1,
              overflowY: 'auto',
              padding: '1.5rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.5rem'
            }}>
              {items.length === 0 ? (
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '100%',
                  opacity: 0.6,
                  gap: '1rem'
                }}>
                  <ShoppingBag size={48} color="var(--color-brass-gold)" />
                  <p style={{
                    fontFamily: 'var(--font-body)',
                    color: 'var(--color-veiled-ivory)',
                    textAlign: 'center'
                  }}>
                    Sua sacola de coleção está vazia.
                  </p>
                </div>
              ) : (
                items.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    style={{
                      display: 'flex',
                      gap: '1rem',
                      background: 'rgba(28,14,20,0.4)',
                      padding: '1rem',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid rgba(201,162,75,0.1)'
                    }}
                  >
                    {/* Item Image */}
                    <div style={{
                      width: '80px',
                      height: '80px',
                      borderRadius: '4px',
                      overflow: 'hidden',
                      background: '#0a0a0d',
                      flexShrink: 0
                    }}>
                      <img
                        src={item.image}
                        alt={item.name}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    </div>

                    {/* Item Details */}
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                      <div>
                        <h3 style={{
                          fontFamily: 'var(--font-display)',
                          fontSize: '1rem',
                          color: 'var(--color-veiled-ivory)',
                          margin: '0 0 0.25rem 0',
                          lineHeight: 1.2
                        }}>
                          {item.name}
                        </h3>
                        <p style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.65rem',
                          color: 'var(--color-brass-gold)',
                          letterSpacing: '0.1em'
                        }}>
                          {item.sku}
                        </p>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '0.75rem' }}>
                        {/* Quantity Selector */}
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                          background: 'rgba(10,10,13,0.8)',
                          border: '1px solid rgba(201,162,75,0.2)',
                          borderRadius: 'var(--radius-sm)',
                          padding: '0.2rem'
                        }}>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: '0.2rem' }}
                          >
                            <Minus size={12} />
                          </button>
                          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--color-veiled-ivory)', minWidth: '1rem', textAlign: 'center' }}>
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: '0.2rem' }}
                          >
                            <Plus size={12} />
                          </button>
                        </div>

                        {/* Price */}
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-veiled-ivory)' }}>
                          {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.price * item.quantity)}
                        </span>
                      </div>
                    </div>

                    {/* Remove button */}
                    <button
                      onClick={() => removeItem(item.id)}
                      style={{
                        background: 'transparent',
                        border: 'none',
                        color: 'rgba(231,224,210,0.3)',
                        cursor: 'pointer',
                        padding: '0.25rem',
                        height: 'fit-content'
                      }}
                      aria-label="Remover item"
                    >
                      <Trash2 size={16} />
                    </button>
                  </motion.div>
                ))
              )}
            </div>

            {/* Footer / Checkout */}
            {items.length > 0 && (
              <div style={{
                padding: '1.5rem',
                borderTop: '1px solid rgba(201,162,75,0.15)',
                background: 'rgba(10,10,13,0.6)',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-muted)', letterSpacing: '0.1em' }}>
                    TOTAL DA RESERVA
                  </span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-brass-gold)' }}>
                    {formattedTotal}
                  </span>
                </div>
                
                <Button 
                  variant="gold" 
                  size="lg" 
                  href="/sucesso"
                  style={{ width: '100%' }}
                  onClick={() => {
                    toggleCart();
                    useCartStore.getState().clearCart();
                  }}
                >
                  Finalizar Aquisição
                </Button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
