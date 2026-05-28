import { Hero } from '@/components/sections/Hero';
import { ProductOverview } from '@/components/sections/ProductOverview';
import { ArchitectureDiagram } from '@/components/sections/ArchitectureDiagram';
import { TrustSection } from '@/components/sections/TrustSection';
import { RequestAccessSection } from '@/components/sections/RequestAccessSection';

export default function HomePage() {
  return (
    <>
      <Hero />
      <ProductOverview />
      <ArchitectureDiagram />
      <TrustSection />
      <RequestAccessSection />
    </>
  );
}
