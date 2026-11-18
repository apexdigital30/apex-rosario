'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { masterPlan } from '@/data/rosario';
import { gsap } from '@/lib/gsap';
import { Container, SectionLabel } from './ui';

const MIN = 1;
const MAX = 4.5;

/**
 * The Apex Quebec master-plan explorer (pill markers, info panel, zoom / pan /
 * full screen / download, full legend below), in the Rosario colours.
 */
const KIND_STYLE: Record<string, string> = {
  tower: 'bg-navy text-pearl',
  amenity: 'bg-gold text-navy',
  landscape: 'bg-[#3f6a3a] text-pearl',
  other: 'bg-[#242321] text-pearl',
};

export default function MasterPlan() {
  const stageRef = useRef<HTMLDivElement>(null);
  const layerRef = useRef<HTMLDivElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const markersRef = useRef<HTMLButtonElement[]>([]);
  const [t, setT] = useState({ scale: 1, x: 0, y: 0 });
  const [selected, setSelected] = useState<string | null>(null);
  const [isFs, setIsFs] = useState(false);
  const pointers = useRef<Map<number, { x: number; y: number }>>(new Map());
  const panStart = useRef<{ x: number; y: number; tx: number; ty: number } | null>(null);
  const pinchStart = useRef<{ dist: number; scale: number } | null>(null);

  const sel = masterPlan.markers.find((m) => m.id === selected) || null;

  const clamp = useCallback((next: { scale: number; x: number; y: number }) => {
    const el = stageRef.current;
    if (!el) return next;
    const r = el.getBoundingClientRect();
    const maxX = ((next.scale - 1) * r.width) / 2;
    const maxY = ((next.scale - 1) * r.height) / 2;
    return {
      scale: next.scale,
      x: Math.max(-maxX, Math.min(maxX, next.x)),
      y: Math.max(-maxY, Math.min(maxY, next.y)),
    };
  }, []);

  const zoomBy = useCallback(
    (f: number) => setT((p) => clamp({ ...p, scale: Math.max(MIN, Math.min(MAX, p.scale * f)) })),
    [clamp],
  );
  const reset = useCallback(() => setT({ scale: 1, x: 0, y: 0 }), []);

  /* intro animation — desktop only (avoid large scale animations on mobile) */
  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
      const ctx = gsap.context(() => {
        if (layerRef.current) {
          gsap.from(layerRef.current, {
            scale: 1.28,
            transformOrigin: '50% 42%',
            duration: 1.4,
            ease: 'power2.out',
            scrollTrigger: { trigger: wrapRef.current, start: 'top 72%' },
          });
        }
        gsap.from(markersRef.current, {
          autoAlpha: 0,
          y: 8,
          scale: 0.7,
          duration: 0.5,
          stagger: 0.06,
          ease: 'back.out(1.6)',
          scrollTrigger: { trigger: wrapRef.current, start: 'top 55%' },
        });
      }, wrapRef);
      return () => ctx.revert();
    });
    return () => mm.revert();
  }, []);

  /* wheel zoom */
  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      if (!e.ctrlKey && Math.abs(e.deltaY) < 2) return;
      e.preventDefault();
      zoomBy(e.deltaY < 0 ? 1.12 : 1 / 1.12);
    };
    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, [zoomBy]);

  const onPointerDown = (e: React.PointerEvent) => {
    (e.target as Element).setPointerCapture?.(e.pointerId);
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (pointers.current.size === 1)
      panStart.current = { x: e.clientX, y: e.clientY, tx: t.x, ty: t.y };
    if (pointers.current.size === 2) {
      const [a, b] = [...pointers.current.values()];
      pinchStart.current = { dist: Math.hypot(a.x - b.x, a.y - b.y), scale: t.scale };
    }
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!pointers.current.has(e.pointerId)) return;
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (pointers.current.size === 2 && pinchStart.current) {
      const [a, b] = [...pointers.current.values()];
      const dist = Math.hypot(a.x - b.x, a.y - b.y);
      setT((p) =>
        clamp({
          ...p,
          scale: Math.max(MIN, Math.min(MAX, (pinchStart.current!.scale * dist) / pinchStart.current!.dist)),
        }),
      );
    } else if (pointers.current.size === 1 && panStart.current && t.scale > 1) {
      setT((p) =>
        clamp({
          ...p,
          x: panStart.current!.tx + (e.clientX - panStart.current!.x),
          y: panStart.current!.ty + (e.clientY - panStart.current!.y),
        }),
      );
    }
  };
  const onPointerUp = (e: React.PointerEvent) => {
    pointers.current.delete(e.pointerId);
    if (pointers.current.size < 2) pinchStart.current = null;
    if (pointers.current.size === 0) panStart.current = null;
  };

  const toggleFs = () => {
    const el = wrapRef.current;
    if (!el) return;
    if (!document.fullscreenElement) el.requestFullscreen?.().catch(() => {});
    else document.exitFullscreen?.();
  };
  useEffect(() => {
    const onFs = () => setIsFs(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', onFs);
    return () => document.removeEventListener('fullscreenchange', onFs);
  }, []);

  const ctrlBtn =
    'flex h-11 min-w-[44px] items-center justify-center rounded-full border border-navy/15 bg-pearl/90 px-3.5 text-sm text-navy shadow-sm transition-colors hover:border-gold hover:text-gold-deep';

  return (
    <section id="master-plan" className="scroll-mt-[var(--header-h)] bg-stone/15 py-[4.5rem] sm:py-32">
      <Container>
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <SectionLabel>{masterPlan.label}</SectionLabel>
            <h2 className="mt-6 font-display text-display-lg font-medium text-navy">
              {masterPlan.headline.map((l, i) => (
                <span key={i} className="block overflow-hidden">
                  <span data-reveal data-reveal-delay={i * 100} className="block">
                    {l}
                  </span>
                </span>
              ))}
            </h2>
          </div>
          <p data-reveal className="text-[1.03rem] leading-relaxed text-navy/75 lg:col-span-5">
            {masterPlan.intro}
          </p>
        </div>

        {/* viewer + info panel */}
        <div ref={wrapRef} className="mt-12 grid gap-6 lg:grid-cols-10">
          <div className={`lg:col-span-7 ${isFs ? 'flex flex-col bg-pearl' : ''}`}>
            <div
              ref={stageRef}
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={onPointerUp}
              onPointerCancel={onPointerUp}
              style={{ touchAction: t.scale > 1 ? 'none' : 'pan-y' }}
              className={`relative select-none overflow-hidden rounded-sm border border-[color:var(--color-border)] bg-pearl ${
                isFs ? 'flex-1' : 'h-[62svh] max-h-[540px] sm:h-auto sm:max-h-none sm:aspect-[2400/1497]'
              } ${t.scale > 1 ? 'cursor-grab active:cursor-grabbing' : ''}`}
            >
              <div
                ref={layerRef}
                className="absolute inset-0 origin-center"
                style={{
                  transform: `translate(${t.x}px, ${t.y}px) scale(${t.scale})`,
                  transition: pointers.current.size ? 'none' : 'transform 0.2s ease-out',
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={masterPlan.image}
                  alt={masterPlan.imageAlt}
                  className="h-full w-full object-contain"
                  draggable={false}
                />
                {masterPlan.markers.map((m, i) => (
                  <button
                    key={m.id}
                    ref={(el) => {
                      if (el) markersRef.current[i] = el;
                    }}
                    type="button"
                    onClick={() => setSelected(m.id)}
                    aria-pressed={selected === m.id}
                    aria-label={`${m.label}. ${m.blurb}`}
                    style={{ left: `${m.x}%`, top: `${m.y}%`, transform: `scale(${1 / t.scale})` }}
                    className={`absolute flex min-h-[36px] -translate-x-1/2 -translate-y-1/2 items-center whitespace-nowrap rounded-full px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider shadow-md ring-1 ring-black/10 transition-transform ${
                      KIND_STYLE[m.kind]
                    } ${selected === m.id ? 'ring-2 ring-gold' : ''}`}
                  >
                    {m.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-2 flex flex-wrap items-center gap-1.5">
              <button type="button" className={ctrlBtn} onClick={() => zoomBy(1 / 1.25)} aria-label="Zoom out">
                &minus;
              </button>
              <span className="w-12 text-center text-xs tabular-nums text-navy/55">
                {Math.round(t.scale * 100)}%
              </span>
              <button type="button" className={ctrlBtn} onClick={() => zoomBy(1.25)} aria-label="Zoom in">
                +
              </button>
              <button type="button" className={ctrlBtn} onClick={reset} aria-label="Reset view">
                Reset
              </button>
              <button type="button" className={ctrlBtn} onClick={toggleFs} aria-label="Toggle full screen">
                {isFs ? 'Exit full screen' : 'Full screen'}
              </button>
              <a className={ctrlBtn} href={masterPlan.image} download="apex-rosario-master-plan.jpg">
                Download
              </a>
            </div>
          </div>

          {/* info panel */}
          <aside className="lg:col-span-3">
            <div className="h-full rounded-sm border border-[color:var(--color-border)] bg-pearl p-5">
              <p className="label-eyebrow text-gold-deep">
                {sel ? sel.kind : 'Master plan'}
              </p>
              <h3 className="mt-2 font-display text-2xl text-navy">
                {sel ? sel.label : 'Explore the plan'}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-navy/75">
                {sel ? sel.blurb : 'Tap a marker on the plan to read about it. Pinch or use the controls to zoom into any part of the layout.'}
              </p>
              {sel && (
                <button
                  type="button"
                  onClick={() => setSelected(null)}
                  className="mt-4 inline-flex min-h-[36px] items-center text-xs uppercase tracking-[0.14em] text-gold-deep underline underline-offset-4"
                >
                  Clear selection
                </button>
              )}
              <div className="mt-6 border-t border-[color:var(--color-border)] pt-3">
                {masterPlan.markers.map((m) => (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setSelected(m.id)}
                    className={`flex min-h-[44px] w-full items-center gap-2.5 rounded px-2 py-1.5 text-left text-[0.95rem] transition-colors ${
                      selected === m.id ? 'bg-gold/20 text-navy' : 'text-navy/70 hover:bg-stone/25'
                    }`}
                  >
                    <span
                      aria-hidden
                      className={`inline-block h-2 w-2 shrink-0 rounded-full ${KIND_STYLE[m.kind]}`}
                    />
                    {m.label}
                  </button>
                ))}
              </div>
            </div>
          </aside>
        </div>

        {/* full legend */}
        <div className="mt-14">
          <h3 data-reveal className="font-display text-2xl text-navy">
            Master-plan legend
          </h3>
          <ul className="mt-6 grid grid-cols-1 gap-x-8 gap-y-2.5 sm:grid-cols-2 lg:grid-cols-3">
            {masterPlan.legend.map((item, i) => (
              <li key={item} className="flex items-baseline gap-3 text-[0.95rem] text-navy/75">
                <span className="text-xs tabular-nums text-gold-deep">
                  {String(i + 1).padStart(2, '0')}
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
