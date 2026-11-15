import sqlite3 from 'sqlite3';
import { open, Database } from 'sqlite';
import path from 'path';

// Armazenamento de leads e eventos do funil.
// ATENCAO: na Vercel o filesystem e' efemero/somente-leitura, entao o
// SQLite so' persiste em dev ou em host proprio. Em producao os leads
// tambem sao enviados por e-mail (Resend) e/ou webhook — ver notifyLead.

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
  const d = await getLeadsDb();
  if (!d) return false;
  await d.run(
    `INSERT INTO leads (source, variantGroup, name, whatsapp, email, company, interest, message, utm, referrer)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      lead.source, lead.variantGroup ?? null, lead.name, lead.whatsapp ?? null, lead.email ?? null,
      lead.company ?? null, lead.interest ?? null, lead.message ?? null,
      lead.utm ? JSON.stringify(lead.utm) : null, lead.referrer ?? null,
    ]
  );
  return true;
}

export async function saveEvent(type: string, slug: string, variantGroup: string | null, sid: string | null) {
  const d = await getLeadsDb();
  if (!d) return false;
  await d.run('INSERT INTO events (type, slug, variantGroup, sid) VALUES (?, ?, ?, ?)', [type, slug, variantGroup, sid]);
  return true;
}
