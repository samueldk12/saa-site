import { NextRequest, NextResponse } from 'next/server';
import { saveLead, type LeadInput } from '@/lib/leadsDb';
import { notifyLead } from '@/lib/notifyLead';
import { isKnownSource } from '@/lib/lp';

export const runtime = 'nodejs';

// Rate limit simples em memoria (por instancia) — barra spam basico.
const hits = new Map<string, number[]>();
function limited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < 10 * 60_000);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > 8;
}

const clean = (v: unknown, max: number) =>
  typeof v === 'string' ? v.replace(/[\u0000-\u001f\u007f]/g, ' ').trim().slice(0, max) : '';

export async function POST(request: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Requisição inválida' }, { status: 400 });
  }

  // Honeypot: bots preenchem; humanos nao veem. Finge sucesso.
  if (clean(body.website, 200)) return NextResponse.json({ ok: true });

  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
  if (limited(ip)) return NextResponse.json({ error: 'Muitas tentativas. Tente novamente em alguns minutos.' }, { status: 429 });

  const source = clean(body.source, 40);
  if (!isKnownSource(source)) return NextResponse.json({ error: 'Origem inválida' }, { status: 400 });

  const name = clean(body.name, 120);
  const email = clean(body.email, 160).toLowerCase();
  let whatsapp = clean(body.whatsapp, 30).replace(/[^\d+]/g, '');
  const digits = whatsapp.replace(/\D/g, '');
  const local = digits.startsWith('55') && digits.length > 11 ? digits.slice(2) : digits;

  if (name.length < 2) return NextResponse.json({ error: 'Informe seu nome.' }, { status: 400 });
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
  const phoneOk = local.length === 10 || local.length === 11;
  if (!phoneOk && !emailOk) {
    return NextResponse.json({ error: 'Informe um WhatsApp ou e-mail válido.' }, { status: 400 });
  }
  whatsapp = phoneOk ? local : '';

  const utmRaw = body.utm && typeof body.utm === 'object' ? (body.utm as Record<string, unknown>) : {};
  const utm: Record<string, string> = {};
  for (const k of ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content']) {
    const v = clean(utmRaw[k], 100);
    if (v) utm[k] = v;
  }

  const lead: LeadInput = {
    source,
    variantGroup: clean(body.variantGroup, 10) || null,
    name,
    whatsapp: whatsapp || null,
    email: emailOk ? email : null,
    company: clean(body.company, 120) || null,
    interest: clean(body.interest, 120) || null,
    message: clean(body.message, 1500) || null,
    utm: Object.keys(utm).length ? utm : null,
    referrer: clean(body.referrer, 300) || null,
  };

  let stored = false;
  try {
    stored = await saveLead(lead);
  } catch (e) {
    console.error('[leads] erro ao salvar:', e);
  }
  const notified = await notifyLead(lead);

  // Nenhum canal duravel funcionou: falha em vez de perder o lead em silencio.
  if (!stored && notified === 0) {
    console.error('[leads] LEAD NAO ENTREGUE (configure RESEND_API_KEY/LEAD_NOTIFY_EMAIL ou LEADS_WEBHOOK_URL):', JSON.stringify(lead));
    return NextResponse.json({ error: 'Não foi possível registrar agora.' }, { status: 503 });
  }
  return NextResponse.json({ ok: true });
}
