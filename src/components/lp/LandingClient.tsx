'use client';

import { useEffect, useState } from 'react';
import { track } from '@/lib/lp/client';

// Dispara a visualizacao uma vez por carregamento.
export function TrackView({ slug }: { slug: string }) {
  useEffect(() => {
    track('view', slug);
  }, [slug]);
  return null;
}

// Link de CTA que rola ate' o formulario e registra o clique.
export function CtaLink({ slug, children, className }: { slug: string; children: React.ReactNode; className?: string }) {
  return (
    <a
      href="#form"
      onClick={() => track('cta_click', slug)}
      className={className}
    >
      {children}
    </a>
  );
}

// Barra fixa no celular: aparece depois do topo e some quando o form esta' visivel.
export function StickyCta({ slug, label }: { slug: string; label: string }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    let formVisible = false;
    let scrolled = false;
    const update = () => setShow(scrolled && !formVisible);
    const onScroll = () => { scrolled = window.scrollY > 500; update(); };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    const form = document.getElementById('form');
    let io: IntersectionObserver | undefined;
    if (form) {
      io = new IntersectionObserver(([entry]) => { formVisible = entry.isIntersecting; update(); }, { threshold: 0.15 });
      io.observe(form);
    }
    return () => { window.removeEventListener('scroll', onScroll); io?.disconnect(); };
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 p-3 md:hidden transition-transform duration-300 ${show ? 'translate-y-0' : 'translate-y-full'}`}
      style={{ background: 'color-mix(in srgb, var(--lp-bg) 92%, transparent)', backdropFilter: 'blur(8px)' }}
    >
      <CtaLink slug={slug} className="block w-full rounded-xl bg-[var(--lp-accent)] py-3.5 text-center font-bold text-[color:var(--lp-accent-ink)] shadow-lg">
        {label}
      </CtaLink>
    </div>
  );
}
