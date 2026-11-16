import { isDatabaseConfigured, query } from './db';

// Analytics proprio (portado do projeto landing-page-mae): visitas, cliques
// no WhatsApp e leads, ligados por sessao para montar a jornada.

export type AnalyticsEventType = 'pageview' | 'whatsapp_click' | 'lead';

export type AnalyticsEvent = {
  type: AnalyticsEventType;
  path: string;
  referrer?: string;
  context?: string;
  visitorId?: string;
  sessionId?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
};

export async function recordEvent(e: AnalyticsEvent): Promise<void> {
  if (!isDatabaseConfigured()) return;
  try {
    await query`
      INSERT INTO analytics_events
        (type, path, referrer, context, visitor_id, session_id, utm_source, utm_medium, utm_campaign)
      VALUES (${e.type}, ${e.path}, ${e.referrer || ''}, ${e.context || ''},
              ${e.visitorId || ''}, ${e.sessionId || ''},
              ${e.utmSource || ''}, ${e.utmMedium || ''}, ${e.utmCampaign || ''})
    `;
  } catch (error) {
    console.error('Erro ao gravar evento de analytics:', error);
  }
}

export type JourneySummary = {
  available: boolean;
  funnel: { sessions: number; viewedOffer: number; offerAndConverted: number; convertedTotal: number };
  origins: { origin: string; sessions: number; conversions: number }[];
  entries: { origin: string; landing: string; sessions: number }[];
  transitions: { from: string; to: string; count: number }[];
  pages: { path: string; sessions: number; conversions: number }[];
  whatsappByContext: { context: string; clicks: number }[];
};

const EMPTY: JourneySummary = {
  available: false,
  funnel: { sessions: 0, viewedOffer: 0, offerAndConverted: 0, convertedTotal: 0 },
  origins: [], entries: [], transitions: [], pages: [], whatsappByContext: [],
};

// "Oferta" = paginas de venda de sites: landings (/lp/...) e o hub /<locale>/sites.
// "Conversao" = clicar no WhatsApp ou enviar um lead na mesma sessao.
export async function readJourneySummary(): Promise<JourneySummary> {
  if (!isDatabaseConfigured()) return EMPTY;
  try {
    const [funnelRows, originRows, entryRows, transitionRows, pageRows, waRows] = await Promise.all([
      query<{ sessions: string; viewed: string; offer_conv: string; conv: string }>`
        WITH s AS (
          SELECT session_id,
            bool_or(type = 'pageview' AND (path LIKE '/lp/%' OR path LIKE '%/sites')) AS offer,
            bool_or(type IN ('whatsapp_click', 'lead')) AS conv
          FROM analytics_events WHERE session_id <> '' GROUP BY session_id
        )
        SELECT count(*)::text AS sessions,
          count(*) FILTER (WHERE offer)::text AS viewed,
          count(*) FILTER (WHERE offer AND conv)::text AS offer_conv,
          count(*) FILTER (WHERE conv)::text AS conv
        FROM s
      `,
      query<{ origin: string; sessions: string; conversions: string }>`
        WITH first AS (
          SELECT DISTINCT ON (session_id) session_id, referrer, utm_source
          FROM analytics_events WHERE type = 'pageview' AND session_id <> ''
          ORDER BY session_id, created_at, id
        ),
        conv AS (
          SELECT DISTINCT session_id FROM analytics_events
          WHERE type IN ('whatsapp_click', 'lead') AND session_id <> ''
        )
        SELECT COALESCE(NULLIF(f.utm_source, ''), NULLIF(f.referrer, ''), 'Direto') AS origin,
          count(*)::text AS sessions, count(conv.session_id)::text AS conversions
        FROM first f LEFT JOIN conv ON conv.session_id = f.session_id
        GROUP BY 1 ORDER BY count(*) DESC LIMIT 10
      `,
      query<{ origin: string; landing: string; sessions: string }>`
        WITH first AS (
          SELECT DISTINCT ON (session_id) session_id, path, referrer, utm_source
          FROM analytics_events WHERE type = 'pageview' AND session_id <> ''
          ORDER BY session_id, created_at, id
        )
        SELECT COALESCE(NULLIF(utm_source, ''), NULLIF(referrer, ''), 'Direto') AS origin,
          path AS landing, count(*)::text AS sessions
        FROM first GROUP BY 1, 2 ORDER BY count(*) DESC LIMIT 10
      `,
      query<{ from_step: string; to_step: string; count: string }>`
        WITH steps AS (
          SELECT session_id, id, created_at,
            CASE WHEN type = 'whatsapp_click' THEN 'WhatsApp'
                 WHEN type = 'lead' THEN 'Lead enviado'
                 ELSE path END AS step
          FROM analytics_events WHERE session_id <> ''
        ),
        ordered AS (
          SELECT step, LAG(step) OVER (PARTITION BY session_id ORDER BY created_at, id) AS prev FROM steps
        )
        SELECT prev AS from_step, step AS to_step, count(*)::text AS count
        FROM ordered WHERE prev IS NOT NULL AND prev <> step
        GROUP BY 1, 2 ORDER BY count(*) DESC LIMIT 12
      `,
      query<{ path: string; sessions: string; conversions: string }>`
        WITH conv AS (
          SELECT DISTINCT session_id FROM analytics_events
          WHERE type IN ('whatsapp_click', 'lead') AND session_id <> ''
        )
        SELECT e.path, count(DISTINCT e.session_id)::text AS sessions,
          count(DISTINCT conv.session_id)::text AS conversions
        FROM analytics_events e LEFT JOIN conv ON conv.session_id = e.session_id
        WHERE e.type = 'pageview' AND e.session_id <> ''
        GROUP BY e.path ORDER BY count(DISTINCT e.session_id) DESC LIMIT 12
      `,
      query<{ context: string; clicks: string }>`
        SELECT CASE WHEN context = '' THEN '(sem contexto)' ELSE context END AS context, count(*)::text AS clicks
        FROM analytics_events WHERE type = 'whatsapp_click'
        GROUP BY 1 ORDER BY count(*) DESC LIMIT 10
      `,
    ]);

    const f = funnelRows[0];
    return {
      available: true,
      funnel: {
        sessions: Number(f?.sessions || 0),
        viewedOffer: Number(f?.viewed || 0),
        offerAndConverted: Number(f?.offer_conv || 0),
        convertedTotal: Number(f?.conv || 0),
      },
      origins: originRows.map((r) => ({ origin: r.origin, sessions: Number(r.sessions), conversions: Number(r.conversions) })),
      entries: entryRows.map((r) => ({ origin: r.origin, landing: r.landing, sessions: Number(r.sessions) })),
      transitions: transitionRows.map((r) => ({ from: r.from_step, to: r.to_step, count: Number(r.count) })),
      pages: pageRows.map((r) => ({ path: r.path, sessions: Number(r.sessions), conversions: Number(r.conversions) })),
      whatsappByContext: waRows.map((r) => ({ context: r.context, clicks: Number(r.clicks) })),
    };
  } catch (error) {
    console.error('Erro ao ler jornada:', error);
    return EMPTY;
  }
}
