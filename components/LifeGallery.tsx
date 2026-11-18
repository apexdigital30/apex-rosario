'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { lifeGallery } from '@/data/rosario';
import { useScrollSteps } from '@/lib/useScrollSteps';
import { usePrefersReducedMotion } from '@/lib/hooks';
import { AssetPending } from './ui';

/**
 * A pinned, scroll-stepped image sequence — one slide fills the viewport at
 * a time, each with its own numbered caption; scrolling through the section
 * advances the slide and the segmented progress bar at the bottom.
 */
export default function LifeGallery() {
  const reduced = usePrefersReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const { index, progress } = useScrollSteps(sectionRef, lifeGallery.slides.length);
  const active = lifeGallery.slides[reduced ? 0 : index];
  const count = lifeGallery.slides.length;

  return (
    <section
      ref={sectionRef}
      aria-label="Apex Rosario — a walk through the residences"
      className="relative mt-14 w-full bg-navy sm:mt-20"
      style={{ height: reduced ? undefined : `${lifeGallery.scrollVh}vh` }}
    >
      <div className="sticky top-0 h-[100svh] w-full overflow-hidden bg-navy">
        {lifeGallery.slides.map((s, i) => (
          <div
            key={s.label}
            aria-hidden={i !== index}
            className="absolute inset-0 transition-opacity duration-500 ease-out"
            style={{ opacity: reduced ? (i === 0 ? 1 : 0) : i === index ? 1 : 0 }}
          >
            {s.image ? (
              <Image
                src={s.image}
                alt={s.label}
                fill
                sizes="100vw"
                // load every slide up front so none is still arriving when it fades in
                priority={i === 0}
                loading={i === 0 ? undefined : 'eager'}
                className="object-cover"
              />
            ) : (
              <AssetPending tone="light" label={s.label} className="absolute inset-0 border-0 pb-40" />
            )}
          </div>
        ))}

        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy/85 via-navy/10 to-navy/25"
        />

        {/* caption */}
        <div className="absolute inset-x-0 bottom-0 px-6 pb-16 sm:px-12 sm:pb-20 lg:px-16">
          <div className="max-w-xl">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-gold">
              {String((reduced ? 0 : index) + 1).padStart(2, '0')} / {String(count).padStart(2, '0')} ·{' '}
              {active.label}
            </p>
            <p className="mt-4 font-display text-2xl leading-snug text-pearl sm:text-3xl">{active.copy}</p>
          </div>
        </div>

        {/* segmented progress bar */}
        <div className="absolute inset-x-6 bottom-8 flex gap-2 sm:inset-x-12 lg:inset-x-16" aria-hidden>
          {lifeGallery.slides.map((s, i) => (
            <span key={s.label} className="h-px flex-1 bg-pearl/20">
              <span
                className="block h-px bg-gold transition-[width] duration-300 ease-linear"
                style={{
                  width: reduced
                    ? i === 0
                      ? '100%'
                      : '0%'
                    : `${Math.max(0, Math.min(1, progress * count - i)) * 100}%`,
                }}
              />
            </span>
          ))}
        </div>

        <p className="sr-only">
          A scroll-stepped tour of Apex Rosario: {lifeGallery.slides.map((s) => s.label).join(', ')}.
        </p>
      </div>
    </section>
  );
}
