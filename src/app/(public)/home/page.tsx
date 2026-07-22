import { ClockLoader } from '@/components/ui/ClockLoader';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { HeroSection } from '@/components/features/HeroSection';
import { CastSection } from '@/components/features/CastSection';
import { MidnightSession } from '@/components/features/MidnightSession';
import { BackstageSection } from '@/components/features/BackstageSection';
import { ReviewsSection } from '@/components/features/ReviewsSection';
import { NewsletterSection } from '@/components/features/NewsletterSection';

export default function HomePage() {
  return (
    <>
      <ClockLoader />
      <Header />

      <main id="main-content">
        {/* Ato I — Bilheteria */}
        <HeroSection />

        {/* Ato II — O Elenco */}
        <CastSection />

        {/* Ato III — Sessão da Meia-Noite */}
        <MidnightSession />

        {/* Ato IV — Bastidores */}
        <BackstageSection />

        {/* Ato V — Críticas */}
        <ReviewsSection />

        {/* Ato VII — Clube Symphony */}
        <NewsletterSection />
      </main>

      <Footer />
    </>
  );
}
