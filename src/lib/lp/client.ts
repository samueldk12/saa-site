'use client';

// Helpers do navegador: sessao anonima, UTM, eventos e envio de lead.

// window.gtag e' declarado em components/GoogleAnalytics.tsx.
function ga(name: string, params: Record<string, unknown>) {
  if (typeof window.gtag === 'function') window.gtag('event', name, params);
}

const SID_KEY = 'saa_sid';

export function getSid(): string {
  try {
    let sid = localStorage.getItem(SID_KEY);
    if (!sid) {
      sid = Math.random().toString(36).slice(2) + Date.now().toString(36);
      localStorage.setItem(SID_KEY, sid);
    }
    return sid;
  } catch {
    return '';
  }
}

// 'pf' / 'pj' quando o visitante chegou pela URL do sorteio (/lp/pf), senao null.
export function getVariantGroup(): string | null {
  const m = window.location.pathname.match(/^\/lp\/(pf|pj)\/?$/);
  if (m) return m[1];
  try { return sessionStorage.getItem('saa_vg'); } catch { return null; }
}

export function getUtm(): Record<string, string> {
  const out: Record<string, string> = {};
  try {
    const p = new URLSearchParams(window.location.search);
    for (const k of ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content']) {
      const v = p.get(k);
      if (v) out[k] = v;
    }
    if (Object.keys(out).length) sessionStorage.setItem('saa_utm', JSON.stringify(out));
    else {
      const saved = sessionStorage.getItem('saa_utm');
      if (saved) return JSON.parse(saved);
    }
  } catch { /* ignora */ }
  return out;
}

export function track(type: 'view' | 'form_start' | 'cta_click', slug: string) {
  const vg = getVariantGroup();
  const payload = JSON.stringify({ type, slug, variantGroup: vg, sid: getSid() });
  try {
    if (navigator.sendBeacon) navigator.sendBeacon('/api/track', payload);
    else fetch('/api/track', { method: 'POST', body: payload, keepalive: true });
  } catch { /* ignora */ }
  const gaName = type === 'view' ? 'lp_view' : type === 'form_start' ? 'lp_form_start' : 'lp_cta_click';
  ga(gaName, { lp_slug: slug, ab_group: vg || 'direct' });
}

export interface LeadPayload {
  source: string;
  name: string;
  whatsapp?: string;
  email?: string;
  company?: string;
  interest?: string;
  message?: string;
  website?: string; // honeypot
}

export async function submitLead(payload: LeadPayload): Promise<{ ok: boolean; error?: string }> {
  try {
    const res = await fetch('/api/leads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...payload,
        variantGroup: getVariantGroup(),
        utm: getUtm(),
        referrer: document.referrer || '',
      }),
    });
    const data = await res.json().catch(() => ({}));
    if (res.ok) {
      ga('generate_lead', { lp_slug: payload.source, ab_group: getVariantGroup() || 'direct' });
      return { ok: true };
    }
    return { ok: false, error: data.error || 'Erro ao enviar.' };
  } catch {
    return { ok: false, error: 'Sem conexão. Tente novamente.' };
  }
}

// (31) 99999-9999
export function maskPhone(v: string) {
  const d = v.replace(/\D/g, '').slice(0, 11);
  if (d.length <= 2) return d ? `(${d}` : '';
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}
