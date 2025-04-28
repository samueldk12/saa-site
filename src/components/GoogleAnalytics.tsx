'use client';

import { useEffect } from 'react';
import Script from 'next/script';

// Adicionar a definição do tipo gtag ao objeto window global
declare global {
  interface Window {
    gtag: (
      command: string,
      id: string,
      config?: {
        page_path?: string;
        [key: string]: any;
      }
    ) => void;
    dataLayer: any[];
  }
}

// Função para enviar pageview ao Google Analytics quando a rota muda
const pageview = (url: string) => {
  if (typeof window.gtag === 'function') {
    window.gtag('config', process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID as string, {
      page_path: url,
    });
  }
};

// ID de medição do Google Analytics
const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

export default function GoogleAnalytics() {
  useEffect(() => {
    // Adicionar evento para capturar mudanças de rota
    const handleRouteChange = (url: string) => {
      pageview(url);
    };

    // Usar pageview na montagem do componente
    pageview(window.location.pathname);

    // Limpar na desmontagem
    return () => {
      // Limpar event listeners se necessário
    };
  }, []);

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
    </>
  );
} 