'use client';

import { useState } from 'react';
import { LANDINGS } from '@/lib/lp';
import type { JourneySummary } from '@/lib/analytics';

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
const share = (part: number, total: number) => (total ? `${Math.round((part / total) * 100)}%` : '0%');

function List({ title, hint, empty, children }: { title: string; hint?: string; empty: boolean; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="text-xs font-semibold uppercase tracking-wide text-gray-500">{title}</h3>
      {hint && <p className="mt-1 text-xs text-gray-500">{hint}</p>}
      <ul className="mt-3 flex flex-col gap-1.5 text-sm text-gray-700">
        {empty ? <li className="text-gray-400">Sem dados ainda.</li> : children}
      </ul>
    </div>
  );
}

function Row({ left, right }: { left: string; right: string }) {
  return (
    <li className="flex justify-between gap-2">
      <span className="truncate">{left}</span>
      <span className="flex-none font-medium">{right}</span>
    </li>
  );
}

function Journey({ j }: { j: JourneySummary }) {
  if (!j.available) {
    return (
      <p className="mt-3 rounded border border-amber-300 bg-amber-50 p-3 text-sm text-amber-900">
        Jornada dos visitantes desligada: defina <code>DATABASE_URL</code> (Postgres/Neon) no ambiente para registrar visitas, origem, caminhos e cliques no WhatsApp.
      </p>
    );
  }
  const { funnel } = j;
  const steps = [
    { label: 'Visitas', value: funnel.sessions },
    { label: 'Viram a oferta de sites (landing ou /sites)', value: funnel.viewedOffer },
    { label: 'Viram a oferta e converteram (WhatsApp ou lead)', value: funnel.offerAndConverted },
  ];
  return (
    <>
      <div className="mt-4 flex flex-col gap-2">
        {steps.map((st) => (
          <div key={st.label} className="flex items-center gap-3 text-sm text-gray-700">
            <span className="w-56 flex-none sm:w-80">{st.label}</span>
            <div className="h-3 flex-1 rounded-full bg-gray-100">
              <div className="h-3 rounded-full bg-gray-900" style={{ width: `${funnel.sessions ? (st.value / funnel.sessions) * 100 : 0}%` }} />
            </div>
            <span className="w-24 flex-none text-right font-medium">{st.value} ({share(st.value, funnel.sessions)})</span>
          </div>
        ))}
      </div>
      <p className="mt-2 text-xs text-gray-500">Total de visitas que converteram: {funnel.convertedTotal} ({share(funnel.convertedTotal, funnel.sessions)}).</p>

      <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2">
        <List title="De onde vêm (origem)" empty={!j.origins.length}>
          {j.origins.map((o) => <Row key={o.origin} left={o.origin} right={`${o.sessions} visitas · ${o.conversions} conv.`} />)}
        </List>
        <List title="Onde entram (origem → página)" empty={!j.entries.length}>
          {j.entries.map((e) => <Row key={`${e.origin}-${e.landing}`} left={`${e.origin} → ${e.landing}`} right={String(e.sessions)} />)}
        </List>
        <List title="Para onde vão (caminhos)" empty={!j.transitions.length}>
          {j.transitions.map((t) => <Row key={`${t.from}-${t.to}`} left={`${t.from} → ${t.to}`} right={String(t.count)} />)}
        </List>
        <List title="Conversão por página" hint="Visitas que passaram pela página e converteram na mesma sessão." empty={!j.pages.length}>
          {j.pages.map((p) => <Row key={p.path} left={p.path} right={`${p.sessions} visitas · ${p.conversions} conv. (${share(p.conversions, p.sessions)})`} />)}
        </List>
        <List title="Cliques no WhatsApp por página e seção" empty={!j.whatsappByContext.length}>
          {j.whatsappByContext.map((w) => <Row key={w.context} left={w.context} right={String(w.clicks)} />)}
        </List>
      </div>
    </>
  );
}

export default function LeadsAdmin() {
  const [token, setToken] = useState('');
  const [stats, setStats] = useState<Stat[] | null>(null);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [journey, setJourney] = useState<JourneySummary | null>(null);
  const [storage, setStorage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function load() {
    setLoading(true); setError('');
    try {
      const res = await fetch('/api/admin/leads', { headers: { Authorization: `Bearer ${token}` } });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Erro');
      setStats(data.stats); setLeads(data.recent); setJourney(data.journey); setStorage(data.storage);
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

          {storage === 'sqlite' && (
            <p className="mt-4 rounded border border-amber-300 bg-amber-50 p-3 text-sm text-amber-900">
              Armazenamento local (SQLite): só persiste em desenvolvimento. Em produção, defina <code>DATABASE_URL</code> (Postgres/Neon).
            </p>
          )}

          <h2 className="mt-10 text-lg font-bold">Jornada dos visitantes</h2>
          <p className="mt-1 text-sm text-gray-600">De onde as pessoas vêm, por onde andam no site e quando chamam no WhatsApp ou enviam o formulário.</p>
          {journey && <Journey j={journey} />}

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
