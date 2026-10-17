import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Faq } from "@/components/sections/Faq";
import { Heist } from "@/components/sections/Heist";
import { Hero } from "@/components/sections/Hero";
import { HowToBuy } from "@/components/sections/HowToBuy";
import { Links } from "@/components/sections/Links";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { PageBackground } from "@/components/ui/PageBackground";
import { Lore } from "@/components/sections/Lore";
import { Tokenomics } from "@/components/sections/Tokenomics";

export default function Home() {
  return (
    <>
      <ScrollReveal />
      <PageBackground />
      <Header />
      <Hero />
      <main>
        <Lore />
        <Heist />
        <Tokenomics />
        <HowToBuy />
        <Faq />
        <Links />
      </main>
      <Footer />
    </>
  );
}
