import { Hero } from '@/components/sections/Hero';
import { ProductsSection } from '@/components/sections/ProductsSection';
import { TrustSection } from '@/components/sections/TrustSection';
import { RequestAccessSection } from '@/components/sections/RequestAccessSection';

export default function HomePage() {
  return (
    <>
      <Hero />
      <ProductsSection />
      <TrustSection />
      <RequestAccessSection />
    </>
  );
}
