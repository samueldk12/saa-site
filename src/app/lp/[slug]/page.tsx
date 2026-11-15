import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import LandingPage from '@/components/lp/LandingPage';
import { LANDING_SLUGS, getLanding } from '@/lib/lp';
import { LP_INDEXABLE } from '@/lib/lp/site';

export function generateStaticParams() {
  return LANDING_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const cfg = getLanding(slug);
  if (!cfg) return {};
  return {
    title: cfg.seo.title,
    description: cfg.seo.description,
    robots: LP_INDEXABLE ? undefined : { index: false, follow: false },
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const cfg = getLanding(slug);
  if (!cfg) notFound();
  return <LandingPage cfg={cfg} />;
}
