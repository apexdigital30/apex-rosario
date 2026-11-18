import { NextResponse } from 'next/server';
import { enquiry } from '@/data/rosario';
import { appendFile } from 'node:fs/promises';
import path from 'node:path';

/**
 * Enquiry intake endpoint — deliberately modular.
 *
 * Configure any / all of these environment variables to forward leads:
 *   ENQUIRY_WEBHOOK_URL        generic JSON webhook (e.g. internal DB API)
 *   GOOGLE_SHEETS_WEBHOOK_URL  Google Apps Script "doPost" web-app URL
 *   CRM_4QT_ENDPOINT           4QT CRM lead endpoint
 *   CRM_4QT_TOKEN              optional bearer token for the 4QT endpoint
 *
 * Behaviour:
 *   - No targets configured  -> the lead is appended to ./.enquiries.log and
 *     the request succeeds (nothing is lost; wire a target when ready).
 *   - Targets configured, at least one succeeds -> success.
 *   - Targets configured, all fail -> HTTP 502 so the form shows an error and
 *     never reports a false success.
 */

export const runtime = 'nodejs';

type Payload = Record<string, string | boolean | undefined>;

function isValid(p: Payload) {
  const name = String(p.name ?? '').trim();
  const phone = String(p.phone ?? '').replace(/\D/g, '');
  const email = String(p.email ?? '').trim();
  const consent = p.consent === true || p.consent === 'true';
  const phoneOk = /^[6-9]\d{9}$/.test(phone);
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  return name.length >= 2 && phoneOk && emailOk && consent;
}

async function post(url: string, body: unknown, headers: Record<string, string> = {}) {
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'content-type': 'application/json', ...headers },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`${url} -> ${res.status}`);
  return true;
}

export async function POST(req: Request) {
  let data: Payload;
  try {
    data = (await req.json()) as Payload;
  } catch {
    return NextResponse.json({ ok: false, error: 'bad_request' }, { status: 400 });
  }

  if (!isValid(data)) {
    return NextResponse.json({ ok: false, error: 'validation' }, { status: 422 });
  }

  const lead: Record<string, unknown> = {
    ...data,
    project: enquiry.projectId,
    received_at: new Date().toISOString(),
    ip: req.headers.get('x-forwarded-for') ?? '',
    user_agent: req.headers.get('user-agent') ?? '',
  };

  const targets: Promise<boolean>[] = [];
  if (process.env.ENQUIRY_WEBHOOK_URL) targets.push(post(process.env.ENQUIRY_WEBHOOK_URL, lead));
  if (process.env.GOOGLE_SHEETS_WEBHOOK_URL) targets.push(post(process.env.GOOGLE_SHEETS_WEBHOOK_URL, lead));
  if (process.env.CRM_4QT_ENDPOINT) {
    targets.push(
      post(
        process.env.CRM_4QT_ENDPOINT,
        lead,
        process.env.CRM_4QT_TOKEN ? { authorization: `Bearer ${process.env.CRM_4QT_TOKEN}` } : {},
      ),
    );
  }

  // Local safety net (best-effort; ignored on read-only filesystems).
  try {
    await appendFile(path.join(process.cwd(), '.enquiries.log'), JSON.stringify(lead) + '\n');
  } catch {
    /* ignore */
  }

  if (targets.length === 0) {
    console.info('[enquiry] captured (no delivery target configured):', lead.name, lead.phone);
    return NextResponse.json({ ok: true, delivered: 'local' });
  }

  const results = await Promise.allSettled(targets);
  const anyOk = results.some((r) => r.status === 'fulfilled');
  if (!anyOk) {
    console.error('[enquiry] all delivery targets failed', results);
    return NextResponse.json({ ok: false, error: 'delivery' }, { status: 502 });
  }
  return NextResponse.json({ ok: true, delivered: 'forwarded' });
}
