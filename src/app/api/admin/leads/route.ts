import { NextRequest, NextResponse } from 'next/server';
import { timingSafeEqual } from 'crypto';
import { getLeadsDb } from '@/lib/leadsDb';
import { LANDING_SLUGS } from '@/lib/lp';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

function authorized(request: NextRequest) {
  const token = process.env.LEADS_ADMIN_TOKEN;
  if (!token) return 'disabled' as const;
  const given = (request.headers.get('authorization') || '').replace(/^Bearer\s+/i, '');
  const a = Buffer.from(given);
  const b = Buffer.from(token);
  return a.length === b.length && timingSafeEqual(a, b) ? ('ok' as const) : ('denied' as const);
}

// Estatisticas do teste A/B + leads recentes. Protegido por LEADS_ADMIN_TOKEN.
export async function GET(request: NextRequest) {
  const auth = authorized(request);
  if (auth === 'disabled') return NextResponse.json({ error: 'Defina LEADS_ADMIN_TOKEN no ambiente.' }, { status: 503 });
  if (auth === 'denied') return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });

  const db = await getLeadsDb();
  if (!db) return NextResponse.json({ error: 'Banco indisponível neste ambiente.' }, { status: 503 });

  const events = await db.all(
    `SELECT slug, type, COUNT(*) AS total, COUNT(DISTINCT COALESCE(sid, id)) AS uniques
     FROM events GROUP BY slug, type`
  );
  const leadCounts = await db.all('SELECT source, COUNT(*) AS total FROM leads GROUP BY source');

  const stats = LANDING_SLUGS.map((slug) => {
    const ev = (t: string) => events.find((e) => e.slug === slug && e.type === t);
    return {
      slug,
      views: ev('view')?.uniques ?? 0,
      ctaClicks: ev('cta_click')?.uniques ?? 0,
      formStarts: ev('form_start')?.uniques ?? 0,
      leads: leadCounts.find((l) => l.source === slug)?.total ?? 0,
    };
  });

  const recent = await db.all(
    'SELECT id, createdAt, source, variantGroup, name, whatsapp, email, company, interest, message, utm FROM leads ORDER BY id DESC LIMIT 100'
  );

  if (request.nextUrl.searchParams.get('format') === 'csv') {
    const all = await db.all('SELECT * FROM leads ORDER BY id DESC');
    const cols = ['id', 'createdAt', 'source', 'variantGroup', 'name', 'whatsapp', 'email', 'company', 'interest', 'message', 'utm', 'referrer'];
    const cell = (v: unknown) => `"${String(v ?? '').replace(/"/g, '""')}"`;
    const csv = [cols.join(','), ...all.map((r) => cols.map((c) => cell(r[c])).join(','))].join('\n');
    return new NextResponse(csv, { headers: { 'Content-Type': 'text/csv; charset=utf-8', 'Content-Disposition': 'attachment; filename="leads.csv"' } });
  }

  return NextResponse.json({ stats, recent });
}
