'use client';

import { useState } from 'react';
import { LANDINGS } from '@/lib/lp';

interface Stat { slug: string; views: number; ctaClicks: number; formStarts: number; leads: number }
interface Lead { id: number; createdAt: string; source: string; variantGroup: string | null; name: string; whatsapp: string | null; email: string | null; company: string | null; interest: string | null; message: string | null }

// Intervalo de confianca de Wilson (95%) para a taxa de conversao.
function wilson(success: number, n: number): [number, number] {
  if (n === 0) return [0, 0];
  const z = 1.96, p = success / n;
  const d = 1 + (z * z) / n;
  const c = p + (z * z) / (2 * n);
  const m = z * Math.sqrt((p * (1 - p)) / n + (z * z) / (4 * n * n));
  return [(c - m) / d, (c + m) / d];
}
const pct = (v: number) => `${(v * 100).toFixed(1)}%`;

export default function LeadsAdmin() {
  const [token, setToken] = useState('');
  const [stats, setStats] = useState<Stat[] | null>(null);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function load() {
    setLoading(true); setError('');
    try {
      const res = await fetch('/api/admin/leads', { headers: { Authorization: `Bearer ${token}` } });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Erro');
      setStats(data.stats); setLeads(data.recent);
    } catch (e) { setError((e as Error).message); setStats(null); }
    setLoading(false);
  }

  async function downloadCsv() {
    const res = await fetch('/api/admin/leads?format=csv', { headers: { Authorization: `Bearer ${token}` } });
    if (!res.ok) return;
    const url = URL.createObjectURL(await res.blob());
    const a = document.createElement('a'); a.href = url; a.download = 'leads.csv'; a.click(); URL.revokeObjectURL(url);
  }

  const rows = (stats || []).map((s) => {
    const cfg = LANDINGS.find((l) => l.slug === s.slug)!;
    const [lo, hi] = wilson(s.leads, s.views);
    return { ...s, cfg, rate: s.views ? s.leads / s.views : 0, lo, hi };
  });

  const best = (group: 'pf' | 'pj') => {
    const g = rows.filter((r) => r.cfg.audience === group && r.views > 0).sort((a, b) => b.rate - a.rate);
    if (g.length < 2) return null;
    const [first, second] = g;
    // So' declara lider se o intervalo dele nao encosta no do segundo colocado.
    return first.lo > second.hi ? first.slug : null;
  };
  const leaders = [best('pf'), best('pj')];

  const th = 'px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide text-gray-500';
  const td = 'px-3 py-2 text-sm';

  return (
    <main className="mx-auto max-w-6xl p-4 sm:p-8 text-gray-900 bg-white min-h-screen">
      <h1 className="text-2xl font-bold">Leads e teste A/B</h1>
      <p className="mt-1 text-sm text-gray-600">Conversão = leads ÷ visitantes únicos de cada landing.</p>

      <form className="mt-6 flex gap-2" onSubmit={(e) => { e.preventDefault(); load(); }}>
        <input type="password" value={token} onChange={(e) => setToken(e.target.value)} placeholder="LEADS_ADMIN_TOKEN" className="w-full max-w-sm rounded border px-3 py-2" />
        <button className="rounded bg-gray-900 px-4 py-2 text-white disabled:opacity-50" disabled={!token || loading}>{loading ? 'Carregando…' : 'Entrar'}</button>
      </form>
      {error && <p className="mt-3 text-sm text-red-600">{error}</p>}

      {stats && (
        <>
          <div className="mt-8 overflow-x-auto rounded border">
            <table className="min-w-full divide-y">
              <thead className="bg-gray-50">
                <tr>
                  {['Landing', 'Público', 'Nicho', 'Visitas', 'Cliques CTA', 'Iniciaram form', 'Leads', 'Conversão', 'IC 95%'].map((h) => <th key={h} className={th}>{h}</th>)}
                </tr>
              </thead>
              <tbody className="divide-y">
                {rows.map((r) => (
                  <tr key={r.slug} className={leaders.includes(r.slug) ? 'bg-green-50' : ''}>
                    <td className={`${td} font-mono`}><a className="underline" href={`/lp/${r.slug}`} target="_blank" rel="noreferrer">{r.slug}</a>{leaders.includes(r.slug) && ' 🏆'}</td>
                    <td className={td}>{r.cfg.audience.toUpperCase()}</td>
                    <td className={td}>{r.cfg.niche}</td>
                    <td className={td}>{r.views}</td>
                    <td className={td}>{r.ctaClicks}</td>
                    <td className={td}>{r.formStarts}</td>
                    <td className={td}>{r.leads}</td>
                    <td className={`${td} font-semibold`}>{r.views ? pct(r.rate) : '—'}</td>
                    <td className={`${td} text-gray-500`}>{r.views ? `${pct(r.lo)}–${pct(r.hi)}` : '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-2 text-xs text-gray-500">
            🏆 só aparece quando o intervalo de confiança do primeiro colocado não se sobrepõe ao do segundo — com poucas visitas, os números ainda são ruído.
          </p>

          <div className="mt-10 flex items-center justify-between">
            <h2 className="text-lg font-bold">Leads recentes</h2>
            <button onClick={downloadCsv} className="rounded border px-3 py-1.5 text-sm">Baixar CSV</button>
          </div>
          <div className="mt-3 overflow-x-auto rounded border">
            <table className="min-w-full divide-y">
              <thead className="bg-gray-50"><tr>{['Data', 'Origem', 'Nome', 'WhatsApp', 'E-mail', 'Empresa', 'Interesse'].map((h) => <th key={h} className={th}>{h}</th>)}</tr></thead>
              <tbody className="divide-y">
                {leads.length === 0 && <tr><td className={td} colSpan={7}>Nenhum lead ainda.</td></tr>}
                {leads.map((l) => (
                  <tr key={l.id}>
                    <td className={td}>{l.createdAt}</td><td className={`${td} font-mono`}>{l.source}</td><td className={td}>{l.name}</td>
                    <td className={td}>{l.whatsapp}</td><td className={td}>{l.email}</td><td className={td}>{l.company}</td><td className={td}>{l.interest}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </main>
  );
}
