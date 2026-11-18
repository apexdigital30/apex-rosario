'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { ENQUIRE_EVENT } from '@/lib/enquire';
import { enquiry, contact } from '@/data/rosario';
import EnquiryForm from './EnquiryForm';
import { Logo } from './Logo';

export default function EnquiryModal() {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const lastFocus = useRef<HTMLElement | null>(null);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    const onOpen = () => {
      lastFocus.current = document.activeElement as HTMLElement;
      setOpen(true);
    };
    window.addEventListener(ENQUIRE_EVENT, onOpen as EventListener);
    return () => window.removeEventListener(ENQUIRE_EVENT, onOpen as EventListener);
  }, []);

  useEffect(() => {
    if (!open) {
      lastFocus.current?.focus?.();
      return;
    }
    document.body.style.overflow = 'hidden';
    const panel = panelRef.current;
    const focusables = () =>
      panel
        ? Array.from(
            panel.querySelectorAll<HTMLElement>(
              'a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])',
            ),
          )
        : [];
    focusables()[0]?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      if (e.key === 'Tab') {
        const f = focusables();
        if (!f.length) return;
        const first = f[0];
        const last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, close]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[110] flex items-stretch justify-end bg-navy/70 backdrop-blur-sm sm:items-center sm:justify-center sm:p-6"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) close();
      }}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="enq-modal-title"
        className="menu-in flex h-full w-full max-w-lg flex-col overflow-y-auto bg-pearl p-6 shadow-2xl sm:h-auto sm:max-h-[92vh] sm:rounded-sm sm:p-8"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <Logo variant="dark" className="h-8" />
            <h2 id="enq-modal-title" className="mt-4 font-display text-3xl font-medium text-navy">
              {enquiry.headline.join(' ')}
            </h2>
          </div>
          <button
            type="button"
            onClick={close}
            aria-label="Close enquiry form"
            className="-mr-1 -mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-navy/15 text-navy transition-colors hover:bg-navy hover:text-pearl"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden>
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        <p className="mt-4 text-[0.95rem] leading-relaxed text-navy/70">{enquiry.intro}</p>

        <div className="mt-6">
          <EnquiryForm tone="light" compact />
        </div>

        <p className="mt-5 border-t border-[color:var(--color-border)] pt-4 text-[0.8rem] text-navy/55">
          Prefer to write in?{' '}
          <a href={`mailto:${contact.email}`} className="font-medium text-gold-deep underline underline-offset-4">
            {contact.email}
          </a>
        </p>
      </div>
    </div>
  );
}
