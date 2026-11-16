import { NextRequest, NextResponse } from 'next/server';
import { saveEvent } from '@/lib/leadsDb';
import { recordEvent } from '@/lib/analytics';
import { LANDING_SLUGS } from '@/lib/lp';

export const runtime = 'nodejs';

const LP_TYPES = ['view', 'form_start', 'cta_click'];
const SITE_TYPES = ['pageview', 'whatsapp_click', 'lead'] as const;

const clip = (v: unknown, max: number) => String(v ?? '').slice(0, max);

// Recebe dois tipos de evento (sempre melhor esforco, nunca quebra a pagina):
//  - funil das landings (view/form_start/cta_click + slug) -> teste A/B
//  - analytics do site todo (pageview/whatsapp_click/lead + path + sessao) -> jornada
export async function POST(request: NextRequest) {
  try {
    const raw = await request.text(); // sendBeacon envia text/plain ou json
    const b = JSON.parse(raw) as Record<string, unknown>;
    const type = String(b.type || '');

    if (LP_TYPES.includes(type)) {
      const slug = String(b.slug || '');
      if (!LANDING_SLUGS.includes(slug)) return new NextResponse(null, { status: 204 });
      const vg = typeof b.variantGroup === 'string' ? b.variantGroup.slice(0, 10) : null;
      const sid = typeof b.sid === 'string' ? b.sid.slice(0, 40) : null;
      await saveEvent(type, slug, vg, sid);
    } else if ((SITE_TYPES as readonly string[]).includes(type)) {
      const path = clip(b.path, 200);
      if (!path || path.startsWith('/admin')) return new NextResponse(null, { status: 204 });
      await recordEvent({
        type: type as (typeof SITE_TYPES)[number],
        path,
        referrer: clip(b.referrer, 300),
        context: clip(b.context, 200),
        visitorId: clip(b.visitorId, 64),
        sessionId: clip(b.sessionId, 64),
        utmSource: clip(b.utmSource, 100),
        utmMedium: clip(b.utmMedium, 100),
        utmCampaign: clip(b.utmCampaign, 100),
      });
    }
  } catch {
    // ignora
  }
  return new NextResponse(null, { status: 204 });
}
