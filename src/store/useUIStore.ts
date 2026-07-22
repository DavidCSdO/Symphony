import { create } from 'zustand';

interface UIState {
  isMobileMenuOpen: boolean;
  isSoundtrackActive: boolean;
  isLoaderVisible: boolean;
  isHeaderSolid: boolean;
  isHeroInView: boolean;           // true = usuário ainda está no hero → header oculto
  toggleMobileMenu: () => void;
  closeMobileMenu: () => void;
  toggleSoundtrack: () => void;
  setLoaderVisible: (visible: boolean) => void;
  setHeaderSolid: (solid: boolean) => void;
  setHeroInView: (inView: boolean) => void;
}

export const useUIStore = create<UIState>((set) => ({
  isMobileMenuOpen: false,
  isSoundtrackActive: false,
  isLoaderVisible: true,
  isHeaderSolid: false,
  isHeroInView: true,              // começa no hero

  toggleMobileMenu: () =>
    set((state) => ({ isMobileMenuOpen: !state.isMobileMenuOpen })),

  closeMobileMenu: () => set({ isMobileMenuOpen: false }),

  toggleSoundtrack: () =>
    set((state) => ({ isSoundtrackActive: !state.isSoundtrackActive })),

  setLoaderVisible: (visible) => set({ isLoaderVisible: visible }),

  setHeaderSolid: (solid) => set({ isHeaderSolid: solid }),

  setHeroInView: (inView) => set({ isHeroInView: inView }),
}));
