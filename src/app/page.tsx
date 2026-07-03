import { Hero } from '@/components/sections/Hero';
import {
  WhyModular,
  ProductEcosystem,
  HomeMethodology,
  LatestResearch,
  RoadmapPreview,
  FoundersStrip,
  HomeCTA,
} from '@/components/sections/HomeSections';

export default function HomePage() {
  return (
    <>
      <Hero />
      <WhyModular />
      <ProductEcosystem />
      <HomeMethodology />
      <LatestResearch />
      <RoadmapPreview />
      <FoundersStrip />
      <HomeCTA />
    </>
  );
}
