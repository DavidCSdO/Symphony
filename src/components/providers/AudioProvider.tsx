'use client';

import { useEffect, useRef } from 'react';
import { Howl } from 'howler';
import { useUIStore } from '@/store/useUIStore';

export function AudioProvider() {
  const isSoundtrackActive = useUIStore((state) => state.isSoundtrackActive);
  const soundRef = useRef<Howl | null>(null);

  useEffect(() => {
    // Inicializa o Howler (placeholder para a trilha real de jazz/tique-taque)
    // Se o arquivo não existir (404), o Howler lida com isso silenciosamente na maioria dos casos,
    // mas vamos adicionar um onplayerror para segurança.
    soundRef.current = new Howl({
      src: ['/audio/symphony-soundtrack.mp3'], // Usuário pode colocar o arquivo aqui depois
      loop: true,
      volume: 0.2, // Trilha ambiente baixíssima
      onloaderror: () => {
        console.warn('Symphony of Night: Arquivo de áudio não encontrado. Coloque soundtrack.mp3 na pasta /public/audio/');
      }
    });

    return () => {
      if (soundRef.current) {
        soundRef.current.unload();
      }
    };
  }, []);

  useEffect(() => {
    if (!soundRef.current) return;

    if (isSoundtrackActive) {
      if (!soundRef.current.playing()) {
        soundRef.current.play();
        soundRef.current.fade(0, 0.2, 1000);
      }
    } else {
      if (soundRef.current.playing()) {
        soundRef.current.fade(0.2, 0, 1000);
        setTimeout(() => {
          soundRef.current?.pause();
        }, 1000);
      }
    }
  }, [isSoundtrackActive]);

  return null; // Componente invisível, apenas gerencia estado de áudio global
}
