import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
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
      <div className="relative">
        <Header />
        <Hero />
      </div>
      <main>
        <Lore />
        <Heist />
        <Tokenomics />
        <HowToBuy />
        <Links />
      </main>
      <Footer />
    </>
  );
}
