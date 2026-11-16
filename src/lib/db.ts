import { neon } from '@neondatabase/serverless';

// Postgres (Neon). Com a integracao Vercel + Neon, DATABASE_URL (ou
// POSTGRES_URL) e' preenchida sozinha. Sem ela, leads/eventos das landings
// caem no SQLite local (so' dev) e o analytics do site todo fica desligado.

function resolveConnectionString(): string | undefined {
  return process.env.DATABASE_URL || process.env.POSTGRES_URL;
}

export function isDatabaseConfigured(): boolean {
  return Boolean(resolveConnectionString());
}

let sqlClient: ReturnType<typeof neon> | null = null;

function getSql() {
  const url = resolveConnectionString();
  if (!url) throw new Error('DATABASE_URL (ou POSTGRES_URL) nao configurada.');
  if (!sqlClient) sqlClient = neon(url);
  return sqlClient;
}

let schemaReady: Promise<void> | null = null;

export function ensureSchema(): Promise<void> {
  if (!schemaReady) {
    const sql = getSql();
    schemaReady = (async () => {
      await sql`
        CREATE TABLE IF NOT EXISTS leads (
          id BIGSERIAL PRIMARY KEY,
          created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
          source TEXT NOT NULL,
          variant_group TEXT,
          name TEXT NOT NULL,
          whatsapp TEXT,
          email TEXT,
          company TEXT,
          interest TEXT,
          message TEXT,
          utm TEXT,
          referrer TEXT
        )
      `;
      await sql`CREATE INDEX IF NOT EXISTS leads_source_idx ON leads (source)`;
      await sql`
        CREATE TABLE IF NOT EXISTS lp_events (
          id BIGSERIAL PRIMARY KEY,
          created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
          type TEXT NOT NULL,
          slug TEXT NOT NULL,
          variant_group TEXT,
          sid TEXT
        )
      `;
      await sql`CREATE INDEX IF NOT EXISTS lp_events_slug_type_idx ON lp_events (slug, type)`;
      // Analytics do site inteiro: visitas, cliques no WhatsApp e leads por sessao.
      await sql`
        CREATE TABLE IF NOT EXISTS analytics_events (
          id BIGSERIAL PRIMARY KEY,
          type TEXT NOT NULL,
          path TEXT NOT NULL,
          referrer TEXT NOT NULL DEFAULT '',
          context TEXT NOT NULL DEFAULT '',
          visitor_id TEXT NOT NULL DEFAULT '',
          session_id TEXT NOT NULL DEFAULT '',
          utm_source TEXT NOT NULL DEFAULT '',
          utm_medium TEXT NOT NULL DEFAULT '',
          utm_campaign TEXT NOT NULL DEFAULT '',
          created_at TIMESTAMPTZ NOT NULL DEFAULT now()
        )
      `;
      await sql`CREATE INDEX IF NOT EXISTS analytics_events_session_idx ON analytics_events (session_id, created_at)`;
    })().catch((e) => {
      schemaReady = null; // tenta de novo na proxima requisicao
      throw e;
    });
  }
  return schemaReady;
}

export async function query<T = Record<string, unknown>>(
  strings: TemplateStringsArray,
  ...values: unknown[]
): Promise<T[]> {
  await ensureSchema();
  const sql = getSql();
  return sql(strings, ...values) as unknown as Promise<T[]>;
}
