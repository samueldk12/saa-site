import sqlite3 from 'sqlite3';
import { open, Database } from 'sqlite';
import path from 'path';
import { isDatabaseConfigured, query } from './db';

// Leads e eventos do funil das landings.
// - Com DATABASE_URL: Postgres (Neon), duravel em producao.
// - Sem: SQLite local (leads.db) — so' persiste em dev/host proprio; na
//   Vercel o filesystem e' efemero, entao la' o lead depende do e-mail/webhook.

export type StorageMode = 'postgres' | 'sqlite';
export const storageMode = (): StorageMode => (isDatabaseConfigured() ? 'postgres' : 'sqlite');

let db: Database | null = null;
let failed = false;

export async function getLeadsDb(): Promise<Database | null> {
  if (db) return db;
  if (failed) return null;
  try {
    const d = await open({
      filename: path.join(process.cwd(), 'leads.db'),
      driver: sqlite3.Database,
    });
    await d.exec(`
      CREATE TABLE IF NOT EXISTS leads (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        createdAt TEXT DEFAULT CURRENT_TIMESTAMP,
        source TEXT NOT NULL,
        variantGroup TEXT,
        name TEXT NOT NULL,
        whatsapp TEXT,
        email TEXT,
        company TEXT,
        interest TEXT,
        message TEXT,
        utm TEXT,
        referrer TEXT
      );
      CREATE TABLE IF NOT EXISTS events (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        createdAt TEXT DEFAULT CURRENT_TIMESTAMP,
        type TEXT NOT NULL,
        slug TEXT NOT NULL,
        variantGroup TEXT,
        sid TEXT
      );
      CREATE INDEX IF NOT EXISTS idx_events_slug_type ON events(slug, type);
      CREATE INDEX IF NOT EXISTS idx_leads_source ON leads(source);
    `);
    db = d;
    return db;
  } catch (err) {
    failed = true;
    console.error('[leads] SQLite indisponivel neste ambiente:', (err as Error).message);
    return null;
  }
}

export interface LeadInput {
  source: string;
  variantGroup?: string | null;
  name: string;
  whatsapp?: string | null;
  email?: string | null;
  company?: string | null;
  interest?: string | null;
  message?: string | null;
  utm?: Record<string, string> | null;
  referrer?: string | null;
}

export async function saveLead(lead: LeadInput): Promise<boolean> {
  const utm = lead.utm ? JSON.stringify(lead.utm) : null;
  if (isDatabaseConfigured()) {
    await query`
      INSERT INTO leads (source, variant_group, name, whatsapp, email, company, interest, message, utm, referrer)
      VALUES (${lead.source}, ${lead.variantGroup ?? null}, ${lead.name}, ${lead.whatsapp ?? null}, ${lead.email ?? null},
              ${lead.company ?? null}, ${lead.interest ?? null}, ${lead.message ?? null}, ${utm}, ${lead.referrer ?? null})
    `;
    return true;
  }
  const d = await getLeadsDb();
  if (!d) return false;
  await d.run(
    `INSERT INTO leads (source, variantGroup, name, whatsapp, email, company, interest, message, utm, referrer)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [lead.source, lead.variantGroup ?? null, lead.name, lead.whatsapp ?? null, lead.email ?? null,
     lead.company ?? null, lead.interest ?? null, lead.message ?? null, utm, lead.referrer ?? null]
  );
  return true;
}

export async function saveEvent(type: string, slug: string, variantGroup: string | null, sid: string | null) {
  if (isDatabaseConfigured()) {
    await query`INSERT INTO lp_events (type, slug, variant_group, sid) VALUES (${type}, ${slug}, ${variantGroup}, ${sid})`;
    return true;
  }
  const d = await getLeadsDb();
  if (!d) return false;
  await d.run('INSERT INTO events (type, slug, variantGroup, sid) VALUES (?, ?, ?, ?)', [type, slug, variantGroup, sid]);
  return true;
}

export interface LpStat { slug: string; views: number; ctaClicks: number; formStarts: number; leads: number }

// Visitantes unicos (por sid) de cada evento + leads por landing.
export async function readLpStats(slugs: string[]): Promise<LpStat[] | null> {
  type Ev = { slug: string; type: string; uniques: number | string };
  type Ld = { source: string; total: number | string };
  let events: Ev[];
  let leadCounts: Ld[];

  if (isDatabaseConfigured()) {
    events = await query<Ev>`
      SELECT slug, type, count(DISTINCT COALESCE(sid, id::text)) AS uniques FROM lp_events GROUP BY slug, type`;
    leadCounts = await query<Ld>`SELECT source, count(*) AS total FROM leads GROUP BY source`;
  } else {
    const d = await getLeadsDb();
    if (!d) return null;
    events = await d.all('SELECT slug, type, COUNT(DISTINCT COALESCE(sid, id)) AS uniques FROM events GROUP BY slug, type');
    leadCounts = await d.all('SELECT source, COUNT(*) AS total FROM leads GROUP BY source');
  }

  const n = (v: unknown) => Number(v ?? 0);
  return slugs.map((slug) => {
    const ev = (t: string) => n(events.find((e) => e.slug === slug && e.type === t)?.uniques);
    return {
      slug,
      views: ev('view'),
      ctaClicks: ev('cta_click'),
      formStarts: ev('form_start'),
      leads: n(leadCounts.find((l) => l.source === slug)?.total),
    };
  });
}

export interface LeadRow {
  id: number; createdAt: string; source: string; variantGroup: string | null; name: string;
  whatsapp: string | null; email: string | null; company: string | null; interest: string | null;
  message: string | null; utm: string | null; referrer?: string | null;
}

export async function readLeads(limit: number | null): Promise<LeadRow[] | null> {
  if (isDatabaseConfigured()) {
    const rows = await query<Record<string, unknown>>`
      SELECT id, to_char(created_at AT TIME ZONE 'America/Sao_Paulo', 'YYYY-MM-DD HH24:MI:SS') AS created_at,
             source, variant_group, name, whatsapp, email, company, interest, message, utm, referrer
      FROM leads ORDER BY id DESC LIMIT ${limit ?? 100000}`;
    return rows.map((r) => ({
      id: Number(r.id), createdAt: String(r.created_at), source: String(r.source),
      variantGroup: (r.variant_group as string) ?? null, name: String(r.name),
      whatsapp: (r.whatsapp as string) ?? null, email: (r.email as string) ?? null,
      company: (r.company as string) ?? null, interest: (r.interest as string) ?? null,
      message: (r.message as string) ?? null, utm: (r.utm as string) ?? null, referrer: (r.referrer as string) ?? null,
    }));
  }
  const d = await getLeadsDb();
  if (!d) return null;
  return d.all(
    `SELECT id, createdAt, source, variantGroup, name, whatsapp, email, company, interest, message, utm, referrer
     FROM leads ORDER BY id DESC ${limit ? `LIMIT ${Number(limit)}` : ''}`
  );
}
