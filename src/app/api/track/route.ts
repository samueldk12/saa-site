import { NextRequest, NextResponse } from 'next/server';
import { saveEvent } from '@/lib/leadsDb';
import { LANDING_SLUGS } from '@/lib/lp';

export const runtime = 'nodejs';

const TYPES = ['view', 'form_start', 'cta_click'];

// Eventos do funil (visualizacao, inicio do formulario, clique no CTA).
// Melhor esforco: nunca quebra a pagina se o banco estiver indisponivel.
export async function POST(request: NextRequest) {
  try {
    const raw = await request.text(); // sendBeacon envia text/plain
    const b = JSON.parse(raw) as Record<string, unknown>;
    const type = String(b.type || '');
    const slug = String(b.slug || '');
    if (!TYPES.includes(type) || !LANDING_SLUGS.includes(slug)) {
      return new NextResponse(null, { status: 204 });
    }
    const vg = typeof b.variantGroup === 'string' ? b.variantGroup.slice(0, 10) : null;
    const sid = typeof b.sid === 'string' ? b.sid.slice(0, 40) : null;
    await saveEvent(type, slug, vg, sid);
  } catch {
    // ignora
  }
  return new NextResponse(null, { status: 204 });
}
