import type { Metadata } from "next";
import { Bodoni_Moda, Manrope, Space_Mono, Marcellus_SC } from "next/font/google";
import "./globals.css";
import { ScrollClock } from "@/components/ui/ScrollClock";

import { AudioProvider } from "@/components/providers/AudioProvider";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { CartDrawer } from "@/components/ui/CartDrawer";
import { Preloader } from "@/components/ui/Preloader";
import { AudioPlayer } from "@/components/ui/AudioPlayer";

const bodoniModa = Bodoni_Moda({
  variable: "--font-bodoni",
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  style: ["normal", "italic"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

const marcellusSC = Marcellus_SC({
  variable: "--font-marcellus",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Symphony of Night — Mecanismos Raros",
  description:
    "Peças autorais em edição limitada — relógios, autômatos e objetos cinéticos, feitos à mão no Ateliê Sanchez.",
  keywords: ["autômatos", "relógios", "colecionáveis", "art déco", "peças cinéticas"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${bodoniModa.variable} ${manrope.variable} ${spaceMono.variable} ${marcellusSC.variable}`}
    >
      <body>
        <SmoothScrollProvider>
          <AudioProvider />
          <Preloader />
          <CustomCursor />
          <CartDrawer />
          <AudioPlayer />
          {children}
          <ScrollClock />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}


