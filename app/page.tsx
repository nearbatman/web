import { Hero } from "@/components/sections/Hero";
import { Heist } from "@/components/sections/Heist";
import { Tokenomics } from "@/components/sections/Tokenomics";
import { HowToBuy } from "@/components/sections/HowToBuy";
import { Links } from "@/components/sections/Links";
import { Lore } from "@/components/sections/Lore";

export default function Home() {
  return (
    <main>
      <Hero />
      <Lore />
      <Heist />
      <Tokenomics />
      <HowToBuy />
      <Links />
    </main>
  );
}
