// app/case-studies/[slug]/page.tsx
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { caseStudies } from '@/lib/case-studies-data';
import CaseStudyClientContent from './CaseStudyClientContent';

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const study = caseStudies[slug];
  if (!study) {
    return {
      title: 'Case Study Not Found — Minhaj',
      description: 'The requested case study could not be found.',
    };
  }
  return {
    title: `${study.title} — Technical Case Study | Minhaj`,
    description: study.subtitle,
    openGraph: {
      title: `${study.title} — Technical Case Study`,
      description: study.subtitle,
      type: 'article',
    },
  };
}

export async function generateStaticParams() {
  return Object.keys(caseStudies).map((slug) => ({
    slug,
  }));
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const study = caseStudies[slug];

  if (!study) {
    notFound();
  }

  return <CaseStudyClientContent study={study} />;
}
