import type { LeadInput } from './leadsDb';

// Avisa o dono do site de um novo lead. Canais opcionais, por env:
//  - RESEND_API_KEY + LEAD_NOTIFY_EMAIL (+ LEAD_FROM_EMAIL): e-mail via Resend
//  - LEADS_WEBHOOK_URL: POST JSON (Zapier, Make, Slack/Discord, Apps Script...)
// Retorna quantos canais confirmaram o envio.

const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

export async function notifyLead(lead: LeadInput): Promise<number> {
  let delivered = 0;
  const tasks: Promise<void>[] = [];

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.LEAD_NOTIFY_EMAIL;
  if (apiKey && to) {
    tasks.push(
      (async () => {
        const rows: [string, string | null | undefined][] = [
          ['Origem', lead.source],
          ['Nome', lead.name],
          ['WhatsApp', lead.whatsapp],
          ['E-mail', lead.email],
          ['Empresa', lead.company],
          ['Interesse', lead.interest],
          ['Mensagem', lead.message],
          ['UTM', lead.utm ? JSON.stringify(lead.utm) : null],
          ['Referrer', lead.referrer],
        ];
        const html = `<h2>Novo lead — ${esc(lead.source)}</h2><table cellpadding="6">` +
          rows.filter(([, v]) => v).map(([k, v]) => `<tr><td><b>${k}</b></td><td>${esc(String(v))}</td></tr>`).join('') +
          '</table>';
        const res = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
          body: JSON.stringify({
            from: process.env.LEAD_FROM_EMAIL || 'SAA Leads <onboarding@resend.dev>',
            to: [to],
            subject: `Novo lead (${lead.source}): ${lead.name}`,
            html,
          }),
        });
        if (res.ok) delivered++;
        else console.error('[leads] Resend falhou:', res.status, await res.text().catch(() => ''));
      })().catch((e) => console.error('[leads] Resend erro:', e))
    );
  }

  const hook = process.env.LEADS_WEBHOOK_URL;
  if (hook) {
    tasks.push(
      (async () => {
        const res = await fetch(hook, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...lead, createdAt: new Date().toISOString() }),
        });
        if (res.ok) delivered++;
        else console.error('[leads] Webhook falhou:', res.status);
      })().catch((e) => console.error('[leads] Webhook erro:', e))
    );
  }

  await Promise.all(tasks);
  return delivered;
}
