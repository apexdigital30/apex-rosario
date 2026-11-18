'use client';

import { useMemo, useState } from 'react';
import { residences } from '@/data/rosario';
import { ImageZoomViewer, type ViewerImage } from './ImageZoomViewer';
import { AssetPending, Container, SectionLabel } from './ui';
import { openEnquiry } from '@/lib/enquire';

const GROUPS = ['All', ...residences.groups] as const;

function AreaRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4 border-b border-[color:var(--color-border)] py-2 text-sm">
      <span className="text-navy/55">{label}</span>
      <span className="text-right tabular-nums text-navy">{value}</span>
    </div>
  );
}

function chipLabel(h: { totalSqft: number; unit: string }) {
  return `${h.totalSqft.toLocaleString('en-IN')} sq. ft. · ${h.unit}`;
}

export default function Residences() {
  const [group, setGroup] = useState<(typeof GROUPS)[number]>('All');
  const pool = useMemo(
    () => residences.homes.filter((h) => group === 'All' || h.group === group),
    [group],
  );
  const [activeId, setActiveId] = useState(residences.homes[0].id);
  const active = pool.find((h) => h.id === activeId) ?? pool[0];

  const viewerImages: ViewerImage[] = pool.map((h) => ({
    src: h.plan,
    alt: h.planAlt,
    label: `${h.tower} · ${h.group} · ${h.totalSqft.toLocaleString('en-IN')} sq. ft.`,
  }));
  const viewerIndex = Math.max(0, pool.findIndex((h) => h.id === active.id));

  const chip = (on: boolean) =>
    `shrink-0 rounded-full border px-4 min-h-[44px] flex items-center text-xs font-medium uppercase tracking-[0.14em] transition-colors ${
      on ? 'border-navy bg-navy text-pearl' : 'border-navy/25 text-navy/65 hover:border-gold hover:text-navy'
    }`;

  return (
    <section id="residences" className="scroll-mt-[var(--header-h)] bg-stone/15 py-[4.5rem] sm:py-32">
      <Container>
        <div>
          <SectionLabel>{residences.label}</SectionLabel>
          <h2 className="mt-7 font-display text-display-lg font-medium text-navy">
            {residences.headline.map((l, i) => (
              <span key={i} className="block overflow-hidden">
                <span data-reveal data-reveal-delay={i * 100} className="block">
                  {l}
                </span>
              </span>
            ))}
          </h2>
        </div>

        {/* config selector */}
        <div className="mt-10 flex flex-col gap-4">
          <div className="no-scrollbar -mx-5 flex items-center gap-2 overflow-x-auto px-5 sm:mx-0 sm:px-0">
            {GROUPS.map((g) => (
              <button
                key={g}
                type="button"
                className={chip(group === g)}
                onClick={() => {
                  setGroup(g);
                  const first = residences.homes.find((h) => g === 'All' || h.group === g);
                  if (first) setActiveId(first.id);
                }}
              >
                {g}
              </button>
            ))}
          </div>
          <div className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 sm:mx-0 sm:flex-wrap sm:justify-start sm:px-0">
            {pool.map((h) => (
              <button
                key={h.id}
                type="button"
                onClick={() => setActiveId(h.id)}
                className={`flex min-h-[44px] shrink-0 items-center rounded-full border px-3.5 text-xs font-medium tracking-[0.05em] transition-colors ${
                  active.id === h.id
                    ? 'border-gold bg-pearl text-navy'
                    : 'border-navy/20 text-navy/60 hover:border-gold'
                }`}
              >
                {chipLabel(h)}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-8">
            {/* preload every plan so switching units is instant */}
            <div aria-hidden className="hidden">
              {residences.homes.map((h) =>
                h.plan ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img key={h.id} src={h.plan} alt="" loading="eager" />
                ) : null,
              )}
            </div>
            {active.plan ? (
              <ImageZoomViewer
                images={viewerImages}
                index={viewerIndex}
                onIndexChange={(i) => setActiveId(pool[i].id)}
                heightClass="h-[42svh] min-h-[280px] sm:h-[54vh]"
              />
            ) : (
              <AssetPending
                label={`${active.group} · ${active.totalSqft.toLocaleString('en-IN')} sq. ft. floor plan`}
                className="h-[42svh] min-h-[280px] sm:h-[54vh]"
              />
            )}
          </div>
          <aside className="lg:col-span-4">
            <div className="border border-[color:var(--color-border)] bg-pearl p-6">
              <p className="label-eyebrow text-gold-deep">{active.tower}</p>
              <h3 className="mt-2 font-display text-3xl text-navy">{active.group}</h3>
              <p className="mt-1 text-sm text-navy/60">{active.config}</p>
              <div className="mt-5">
                <AreaRow label="Super area" value={`${active.totalSqft.toLocaleString('en-IN')} sq. ft.`} />
                {(
                  [
                    ['Covered area', active.coveredSqft],
                    ['Carpet area', active.carpetSqft],
                    ['Balcony area', active.balconySqft],
                    ['External wall area', active.externalWallSqft],
                    ['Common area', active.commonSqft],
                    ['Open terrace', active.terraceSqft],
                  ] as const
                ).map(([label, v]) =>
                  v ? <AreaRow key={label} label={label} value={`${v.toLocaleString('en-IN')} sq. ft.`} /> : null,
                )}
              </div>
              <button
                type="button"
                onClick={() => openEnquiry('residences')}
                className="mt-6 flex min-h-[48px] w-full items-center justify-center rounded-full bg-navy px-5 text-xs font-medium uppercase tracking-[0.16em] text-pearl transition-colors hover:bg-gold hover:text-navy"
              >
                View Floor Plan &amp; Enquire
              </button>
            </div>
            <p className="mt-4 text-[0.75rem] leading-relaxed text-navy/50">{residences.note}</p>
          </aside>
        </div>
      </Container>
    </section>
  );
}
