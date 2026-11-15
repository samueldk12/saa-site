import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Leads e teste A/B',
  robots: { index: false, follow: false },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
