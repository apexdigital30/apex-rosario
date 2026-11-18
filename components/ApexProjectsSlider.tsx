'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { about } from '@/data/rosario';

/**
 * "Apex Group Projects" — a 1:1 port of the Apex Quebec slider (same rail,
 * card size, 4:5 frame, arrows and snap), in the Rosario colours.
 */
const PROJECTS = about.groupProjects;

export default function ApexProjectsSlider() {
  const railRef = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const update = useCallback(() => {
    const el = railRef.current;
    if (!el) return;
    setAtStart(el.scrollLeft <= 4);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 4);
  }, []);

  useEffect(() => {
    update();
    const el = railRef.current;
    if (!el) return;
    el.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      el.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [update]);

  const scrollByCards = (dir: 1 | -1) => {
    const el = railRef.current;
    if (!el) return;
    const card = el.querySelector('article');
    const step = card ? card.getBoundingClientRect().width + 20 : Math.max(el.clientWidth * 0.8, 300);
    el.scrollBy({ left: dir * step, behavior: 'smooth' });
  };

  const arrowCls =
    'flex h-11 w-11 items-center justify-center rounded-full border border-gold/40 text-gold transition-colors hover:bg-gold hover:text-navy disabled:cursor-not-allowed disabled:opacity-25 disabled:hover:bg-transparent disabled:hover:text-gold';

  return (
    <div data-reveal>
      <div className="flex items-center justify-between gap-4 border-b border-pearl/15 pb-3">
        <h3 className="text-xs uppercase tracking-[0.18em] text-gold">Apex Group Projects</h3>
        <div className="flex gap-2">
          <button type="button" aria-label="Previous projects" className={arrowCls} onClick={() => scrollByCards(-1)} disabled={atStart}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <button type="button" aria-label="Next projects" className={arrowCls} onClick={() => scrollByCards(1)} disabled={atEnd}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>
      </div>

      <div ref={railRef} className="no-scrollbar -mx-1 mt-6 flex snap-x snap-mandatory gap-5 overflow-x-auto px-1 pb-2">
        {PROJECTS.map((p) => (
          <article
            key={p.name}
            className="group relative w-[260px] shrink-0 snap-start overflow-hidden rounded-sm border border-pearl/10 bg-green sm:w-[300px]"
          >
            <div className="relative aspect-[4/5] w-full">
              {p.image ? (
                <Image
                  src={p.image}
                  alt={p.name}
                  fill
                  sizes="(max-width: 640px) 260px, 300px"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                />
              ) : (
                <div
                  aria-hidden
                  className="absolute inset-0 flex items-center justify-center bg-gradient-to-b from-navy/70 to-green px-6 text-center font-display text-lg uppercase tracking-[0.06em] text-stone/80 transition-transform duration-700 group-hover:scale-[1.04]"
                >
                  {p.name}
                </div>
              )}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-green via-green/25 to-transparent" />
            </div>
            <div className="absolute inset-x-0 bottom-0 p-5">
              <p className="font-display text-2xl leading-tight text-pearl">{p.name}</p>
              <p className="mt-1 flex items-center gap-2 text-[0.8rem] text-pearl/65">
                <span aria-hidden className="h-px w-4 bg-gold" />
                {p.place}
              </p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
