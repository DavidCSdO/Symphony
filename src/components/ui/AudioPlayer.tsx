'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Volume2, VolumeX } from 'lucide-react';

export function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Play a sophisticated mechanical tick
  const playTick = () => {
    if (!audioCtxRef.current) return;
    const ctx = audioCtxRef.current;
    
    // Create oscillator for the metallic "tick"
    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(800, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.05);

    filter.type = 'highpass';
    filter.frequency.value = 4000;

    gainNode.gain.setValueAtTime(0, ctx.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.1, ctx.currentTime + 0.01);
    gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);

    osc.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.05);
    
    // Subtle low frequency "tock"
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(150, ctx.currentTime);
    osc2.frequency.exponentialRampToValueAtTime(40, ctx.currentTime + 0.1);
    gain2.gain.setValueAtTime(0, ctx.currentTime);
    gain2.gain.linearRampToValueAtTime(0.05, ctx.currentTime + 0.01);
    gain2.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);
    
    osc2.connect(gain2);
    gain2.connect(ctx.destination);
    
    osc2.start();
    osc2.stop(ctx.currentTime + 0.1);
  };

  const toggleAudio = () => {
    if (!isPlaying) {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      if (audioCtxRef.current.state === 'suspended') {
        audioCtxRef.current.resume();
      }
      
      // Start the ticking engine (60 BPM = 1000ms)
      playTick();
      intervalRef.current = setInterval(() => {
        playTick();
      }, 1000);
      setIsPlaying(true);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      setIsPlaying(false);
    }
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (audioCtxRef.current) audioCtxRef.current.close();
    };
  }, []);

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 2, duration: 1 }}
      onClick={toggleAudio}
      style={{
        position: 'fixed',
        bottom: '2rem',
        left: '2rem',
        zIndex: 9999,
        background: 'rgba(10,10,13,0.6)',
        backdropFilter: 'blur(8px)',
        border: '1px solid rgba(201,162,75,0.3)',
        borderRadius: '50%',
        width: '44px',
        height: '44px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        color: 'var(--color-brass-gold)',
        boxShadow: isPlaying ? '0 0 20px rgba(201,162,75,0.2)' : 'none',
      }}
      whileHover={{ scale: 1.1, backgroundColor: 'rgba(201,162,75,0.1)' }}
      whileTap={{ scale: 0.95 }}
      aria-label={isPlaying ? 'Desativar som ambiente' : 'Ativar som ambiente'}
    >
      {isPlaying ? <Volume2 size={18} /> : <VolumeX size={18} />}
    </motion.button>
  );
}
