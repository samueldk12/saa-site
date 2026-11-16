import posthog from 'posthog-js';

// PostHog: heatmaps, gravacao de sessao, funis, caminhos e origem dos
// visitantes. So' liga se NEXT_PUBLIC_POSTHOG_KEY estiver definida.
// O trafego passa por /ingest (rewrite em next.config.js) para nao ser
// barrado por bloqueadores de anuncio.
const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;

if (typeof window !== 'undefined' && key) {
  // ?notrack=1 desliga o rastreio neste navegador (use nos seus acessos);
  // ?notrack=0 volta a ligar.
  let optedOut = false;
  try {
    const q = new URLSearchParams(window.location.search).get('notrack');
    if (q === '1') localStorage.setItem('saa_notrack', '1');
    if (q === '0') localStorage.removeItem('saa_notrack');
    optedOut = localStorage.getItem('saa_notrack') === '1';
  } catch { /* ignora */ }

  const eu = process.env.NEXT_PUBLIC_POSTHOG_REGION === 'eu';

  posthog.init(key, {
    api_host: '/ingest',
    ui_host: eu ? 'https://eu.posthog.com' : 'https://us.posthog.com',
    defaults: '2025-05-24', // pageview automatico em navegacao client-side
    person_profiles: 'identified_only',
    capture_pageleave: true,
    capture_heatmaps: true,
    session_recording: {
      maskAllInputs: true, // nome/telefone/e-mail dos formularios nunca sao gravados
      maskTextSelector: '[data-ph-mask]',
    },
    opt_out_capturing_by_default: optedOut,
    // O painel administrativo nao entra nas metricas.
    before_send: (event) => {
      const url = String(event?.properties?.$current_url ?? '');
      return url.includes('/admin') ? null : event;
    },
  });
}
