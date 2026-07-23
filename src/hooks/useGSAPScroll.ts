'use client';

import { useEffect, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Garante que o ScrollTrigger é registrado apenas no lado do cliente
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect;

export function useGSAPScroll(
  effect: (gsapInstance: typeof gsap, scrollTriggerInstance: typeof ScrollTrigger) => void | (() => void),
  deps: React.DependencyList = []
) {
  useIsomorphicLayoutEffect(() => {
    if (typeof window === 'undefined') return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      effect(gsap, ScrollTrigger);
    });

    return () => {
      ctx.revert(); // Limpeza completa do contexto GSAP e ScrollTrigger
    };
  }, deps);
}

export { gsap, ScrollTrigger };
