import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getReport, reportSlugs } from '@/data/research';
import { ReportDetailContent } from '@/components/pages/ReportDetailContent';

interface Props {
  params: { slug: string };
}

export function generateStaticParams() {
  return reportSlugs.map((slug) => ({ slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const report = getReport(params.slug);
  if (!report) return {};
  return {
    title: report.title.en,
    description: report.abstract.en,
  };
}

export default function ReportDetailPage({ params }: Props) {
  const report = getReport(params.slug);
  if (!report) notFound();
  return <ReportDetailContent slug={params.slug} />;
}
