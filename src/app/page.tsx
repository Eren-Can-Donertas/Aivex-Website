import { Suspense } from 'react';
import { Hero } from '@/components/sections/Hero';
import { SystemSnapshot, SystemSnapshotSkeleton } from '@/components/sections/SystemSnapshot';
import { ProductOverview } from '@/components/sections/ProductOverview';
import { ArchitectureDiagram } from '@/components/sections/ArchitectureDiagram';
import { TrustSection } from '@/components/sections/TrustSection';
import { RequestAccessSection } from '@/components/sections/RequestAccessSection';

export default function HomePage() {
  return (
    <>
      <Hero />
      <Suspense fallback={<SystemSnapshotSkeleton />}>
        <SystemSnapshot />
      </Suspense>
      <ProductOverview />
      <ArchitectureDiagram />
      <TrustSection />
      <RequestAccessSection />
    </>
  );
}
