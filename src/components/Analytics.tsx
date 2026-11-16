'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { sendSiteEvent } from '@/lib/visitor';

// Analytics proprio do site todo: uma visita por troca de pagina e um
// evento a cada clique em link de WhatsApp (de qualquer pagina/landing),
// com a secao ([data-section]) de onde o clique saiu.
export default function Analytics() {
  const pathname = usePathname();

  useEffect(() => {
    if (!pathname || pathname.startsWith('/admin')) return;
    sendSiteEvent('pageview', pathname);
  }, [pathname]);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement | null)?.closest?.('a[href*="wa.me"], a[href*="api.whatsapp.com"]');
      if (!a) return;
      const path = window.location.pathname;
      if (path.startsWith('/admin')) return;
      const section = (a.closest('[data-section]') as HTMLElement | null)?.dataset.section;
      sendSiteEvent('whatsapp_click', path, section ? `${path} · ${section}` : path);
    };
    document.addEventListener('click', onClick, true);
    return () => document.removeEventListener('click', onClick, true);
  }, []);

  return null;
}
