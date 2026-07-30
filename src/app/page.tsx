import { Hero } from "@/components/sections/hero";
import { Collections } from "@/components/sections/collections";
import { Benefits } from "@/components/sections/benefits";
import { NuestrosPasosBanner } from "@/components/sections/nuestros-pasos-banner";

export default function Home() {
  return (
    <>
      <Hero />
      <Collections />
      <Benefits />
      <NuestrosPasosBanner />
    </>
  );
}
