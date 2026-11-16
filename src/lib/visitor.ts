// Identificacao anonima do visitante para o analytics proprio: um id por
// navegador (localStorage), um id por visita/aba (sessionStorage) e a origem
// da visita (referrer ou UTM), guardada na primeira pagina da sessao.
// Portado do projeto landing-page-mae.

export type VisitorInfo = {
  visitorId: string;
  sessionId: string;
  referrer: string;
  utmSource: string;
  utmMedium: string;
  utmCampaign: string;
};

type Attribution = Pick<VisitorInfo, 'referrer' | 'utmSource' | 'utmMedium' | 'utmCampaign'>;

function randomId(): string {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) return crypto.randomUUID();
  return `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 10)}`;
}

function getStorage(kind: 'local' | 'session'): Storage | null {
  try {
    return kind === 'local' ? window.localStorage : window.sessionStorage;
  } catch {
    return null;
  }
}

function readOrCreate(storage: Storage | null, key: string): string {
  try {
    if (!storage) return '';
    let value = storage.getItem(key);
    if (!value) {
      value = randomId();
      storage.setItem(key, value);
    }
    return value;
  } catch {
    return '';
  }
}

function referrerHost(): string {
  try {
    if (!document.referrer) return '';
    const host = new URL(document.referrer).hostname.replace(/^www\./, '');
    // Navegacao interna nao conta como origem.
    return host === window.location.hostname.replace(/^www\./, '') ? '' : host;
  } catch {
    return '';
  }
}

export function isOptedOut(): boolean {
  try {
    return window.localStorage.getItem('saa_notrack') === '1';
  } catch {
    return false;
  }
}

export function getVisitorInfo(): VisitorInfo {
  const session = getStorage('session');
  const visitorId = readOrCreate(getStorage('local'), 'saa_vid');
  const sessionId = readOrCreate(session, 'saa_sess');

  let attribution: Attribution | null = null;
  try {
    const saved = session?.getItem('saa_attr');
    if (saved) attribution = JSON.parse(saved) as Attribution;
  } catch {
    attribution = null;
  }

  if (!attribution) {
    const params = new URLSearchParams(window.location.search);
    attribution = {
      referrer: referrerHost(),
      utmSource: params.get('utm_source') || '',
      utmMedium: params.get('utm_medium') || '',
      utmCampaign: params.get('utm_campaign') || '',
    };
    try {
      session?.setItem('saa_attr', JSON.stringify(attribution));
    } catch {
      // sem sessionStorage: segue sem guardar a origem
    }
  }

  return { visitorId, sessionId, ...attribution };
}

// Envia um evento do analytics proprio (nunca quebra a navegacao).
export function sendSiteEvent(type: 'pageview' | 'whatsapp_click' | 'lead', path: string, context = '') {
  if (isOptedOut()) return;
  const info = getVisitorInfo();
  const body = JSON.stringify({ type, path, context, ...info });
  try {
    if (navigator.sendBeacon) navigator.sendBeacon('/api/track', new Blob([body], { type: 'application/json' }));
    else fetch('/api/track', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body, keepalive: true });
  } catch {
    // ignora
  }
}
