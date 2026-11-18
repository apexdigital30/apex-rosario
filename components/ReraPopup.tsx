'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { announcement, legal } from '@/data/rosario';
import { openEnquiry } from '@/lib/enquire';
import Image from 'next/image';

/**
 * "Apex Rosario is now RERA Approved" announcement. Opens once per browser
 * session, 5 seconds after load (`announcement.delayMs`); closes on the ×, Escape, the backdrop, or the CTA
 * (which then opens the enquiry form).
 */
export default function ReraPopup() {
  const [open, setOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const key = `rosario:announcement:${announcement.id}`;

  useEffect(() => {
    if (!announcement.show) return;
    try {
      if (sessionStorage.getItem(key)) return;
    } catch {
      /* storage blocked — still show */
    }
    const t = window.setTimeout(() => setOpen(true), announcement.delayMs);
    return () => window.clearTimeout(t);
  }, [key]);

  const close = useCallback(() => {
    setOpen(false);
    try {
      sessionStorage.setItem(key, '1');
    } catch {
      /* ignore */
    }
  }, [key]);

  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, close]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[105] flex items-center justify-center bg-navy/60 p-5 backdrop-blur-sm"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) close();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="rera-popup-title"
        className="menu-in relative w-full max-w-md overflow-hidden rounded-sm border border-gold/40 bg-navy p-8 text-center text-pearl shadow-2xl sm:p-10"
      >
        <button
          ref={closeRef}
          type="button"
          onClick={close}
          aria-label="Close announcement"
          className="absolute right-3 top-3 flex h-11 w-11 items-center justify-center rounded-full text-pearl/70 transition-colors hover:bg-pearl/10 hover:text-pearl"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden>
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </button>

        <Image
          src="/assets/rosario/brand/rosario-logo-by-apex.png"
          alt="Rosario by Apex Group"
          width={1250}
          height={384}
          sizes="240px"
          className="mx-auto h-auto w-[220px] sm:w-[240px]"
        />
        <span aria-hidden className="mx-auto mt-6 block h-px w-16 rule-gold" />
        <h2 id="rera-popup-title" className="mt-6 font-display text-[1.9rem] font-medium leading-tight text-gold">
          {announcement.title}
        </h2>
        <p className="mt-5 text-[0.98rem] leading-relaxed text-pearl/75">{announcement.body}</p>
        {legal.rera && (
          <p className="mt-4 text-xs uppercase tracking-[0.16em] text-pearl/60">
            {legal.reraAuthority} Reg. No. <span className="text-pearl">{legal.rera}</span>
          </p>
        )}
        <button
          type="button"
          onClick={() => {
            close();
            openEnquiry('rera-popup');
          }}
          className="mt-8 flex min-h-[50px] w-full items-center justify-center rounded-full bg-gold px-6 text-xs font-medium uppercase tracking-[0.18em] text-navy transition-colors hover:bg-pearl"
        >
          {announcement.cta}
        </button>
      </div>
    </div>
  );
}
