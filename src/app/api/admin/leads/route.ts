import { NextRequest, NextResponse } from 'next/server';
import { timingSafeEqual } from 'crypto';
import { readLeads, readLpStats, storageMode } from '@/lib/leadsDb';
import { readJourneySummary } from '@/lib/analytics';
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

// Teste A/B + leads + jornada. Protegido por LEADS_ADMIN_TOKEN.
export async function GET(request: NextRequest) {
  const auth = authorized(request);
  if (auth === 'disabled') return NextResponse.json({ error: 'Defina LEADS_ADMIN_TOKEN no ambiente.' }, { status: 503 });
  if (auth === 'denied') return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });

  try {
    if (request.nextUrl.searchParams.get('format') === 'csv') {
      const all = (await readLeads(null)) ?? [];
      const cols = ['id', 'createdAt', 'source', 'variantGroup', 'name', 'whatsapp', 'email', 'company', 'interest', 'message', 'utm', 'referrer'] as const;
      const cell = (v: unknown) => `"${String(v ?? '').replace(/"/g, '""')}"`;
      const csv = [cols.join(','), ...all.map((r) => cols.map((c) => cell(r[c])).join(','))].join('\n');
      return new NextResponse(csv, { headers: { 'Content-Type': 'text/csv; charset=utf-8', 'Content-Disposition': 'attachment; filename="leads.csv"' } });
    }

    const [stats, recent, journey] = await Promise.all([
      readLpStats(LANDING_SLUGS),
      readLeads(100),
      readJourneySummary(),
    ]);
    if (!stats || !recent) return NextResponse.json({ error: 'Banco indisponível neste ambiente. Configure DATABASE_URL.' }, { status: 503 });
    return NextResponse.json({ stats, recent, journey, storage: storageMode() });
  } catch (e) {
    console.error('[admin/leads]', e);
    return NextResponse.json({ error: 'Erro ao consultar o banco.' }, { status: 500 });
  }
}
