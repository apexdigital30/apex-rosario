'use client';

import { enquiry } from '@/data/rosario';

/** Global open/close plumbing for the "Enquire Now" modal. */
export const ENQUIRE_EVENT = 'rosario:enquire';

export function openEnquiry(source = 'button') {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new CustomEvent(ENQUIRE_EVENT, { detail: { source } }));
}

const TRACKING_KEYS = [
  'utm_source',
  'utm_campaign',
  'utm_medium',
  'utm_term',
  'utm_content',
  'keyword',
  'gclid',
] as const;

export type Tracking = Record<string, string> & {
  project: string;
  page_url: string;
};

/** Reads UTM / GCLID params from the URL and returns the hidden-field payload. */
export function readTracking(): Tracking {
  const out: Tracking = { project: enquiry.projectId, page_url: '' };
  if (typeof window === 'undefined') return out;
  out.page_url = window.location.href;
  try {
    const params = new URLSearchParams(window.location.search);
    for (const k of TRACKING_KEYS) {
      const v = params.get(k);
      if (v) out[k] = v;
    }
    if (!out.keyword && params.get('utm_term')) out.keyword = params.get('utm_term')!;
  } catch {
    /* ignore */
  }
  return out;
}
