import { Inter } from 'next/font/google';
import type { Metadata } from 'next';
import { ThemeProvider } from '../providers';

const inter = Inter({ subsets: ['latin'] });

export function generateStaticParams() {
  return [
    { locale: 'pt' },
    { locale: 'en' },
    { locale: 'es' }
  ];
}

export const metadata: Metadata = {
  icons: {
    icon: '/favicon.ico',
    apple: '/favicon.ico',
  },
  viewport: 'width=device-width, initial-scale=1, maximum-scale=5',
};

export default function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  return (
    <html lang={params.locale} className="scroll-smooth">
      <head>
        <meta name="theme-color" content="#0f172a" media="(prefers-color-scheme: dark)" />
        <meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: light)" />
      </head>
      <ThemeProvider>
        <body className={`${inter.className} antialiased`}>{children}</body>
      </ThemeProvider>
    </html>
  );
} 