'use client';

import { useCallback, useState } from 'react';
import Image from 'next/image';
import { construction, type GalleryImage } from '@/data/rosario';
import { AssetPending, Container, SectionLabel } from './ui';
import { Lightbox } from './Gallery';

/**
 * Dated site-progress updates, newest first, each with its own photo set
 * (one large lead photo + thumbnails, opening in the gallery lightbox).
 * Driven entirely by `construction.updates` in data/rosario.ts — real site
 * photographs only. While the list is empty, framed photo slots are shown.
 */
export default function ConstructionUpdates() {
  const [box, setBox] = useState<{ images: GalleryImage[]; index: number } | null>(null);

  const open = (images: GalleryImage[], index: number) => setBox({ images, index });
  const close = useCallback(() => setBox(null), []);
  const next = useCallback(
    () => setBox((b) => (b ? { ...b, index: (b.index + 1) % b.images.length } : b)),
    [],
  );
  const prev = useCallback(
    () => setBox((b) => (b ? { ...b, index: (b.index - 1 + b.images.length) % b.images.length } : b)),
    [],
  );

  return (
    <section id="construction" className="scroll-mt-[var(--header-h)] bg-stone/15 py-[4.5rem] sm:py-28">
      <Container>
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <SectionLabel>{construction.label}</SectionLabel>
            <h2 className="mt-7 font-display text-display-lg font-medium text-navy">
              {construction.headline.map((l, i) => (
                <span key={i} className="block overflow-hidden">
                  <span data-reveal data-reveal-delay={i * 100} className="block">
                    {l}
                  </span>
                </span>
              ))}
            </h2>
          </div>
          <p data-reveal className="text-[1.03rem] leading-relaxed text-navy/75 lg:col-span-5">
            {construction.intro}
          </p>
        </div>

        {construction.updates.length === 0 ? (
          <div className="mt-12 border-y border-[color:var(--color-border)] py-10">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {construction.photoSlots.map((label) => (
                <AssetPending key={label} label={label} className="aspect-[4/3] w-full" />
              ))}
            </div>
            <div className="mt-8 flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-4">
                <span aria-hidden className="inline-block h-2 w-2 shrink-0 rotate-45 bg-gold" />
                <p className="font-display text-2xl text-navy">{construction.emptyNote}</p>
              </div>
              <a
                href="#contact"
                className="inline-flex min-h-[48px] items-center justify-center rounded-full border border-navy/25 px-6 text-xs font-medium uppercase tracking-[0.16em] text-navy transition-colors hover:border-gold hover:bg-gold"
              >
                Get updates
              </a>
            </div>
          </div>
        ) : (
          <div className="mt-12 divide-y divide-[color:var(--color-border)] border-y border-[color:var(--color-border)]">
            {construction.updates.map((u, ui) => {
              const images: GalleryImage[] = u.images.map((im) => ({
                ...im,
                caption: im.caption ?? u.title,
                category: u.date,
              }));
              const [lead, ...rest] = images;
              return (
                <article key={`${u.date}-${u.title}`} className="grid gap-8 py-10 lg:grid-cols-12 lg:gap-14">
                  <div data-reveal className="lg:col-span-4">
                    <p className="label-eyebrow text-gold-deep">
                      {ui === 0 ? 'Latest · ' : ''}
                      {u.date}
                    </p>
                    <h3 className="mt-3 font-display text-display-md font-medium text-navy">{u.title}</h3>
                    <p className="mt-4 text-[1.03rem] leading-relaxed text-navy/70">{u.note}</p>
                    {images.length > 1 && (
                      <p className="mt-5 text-xs uppercase tracking-[0.16em] text-navy/50">{images.length} photos</p>
                    )}
                  </div>

                  {lead && (
                    <div className="lg:col-span-8">
                      <button
                        type="button"
                        onClick={() => open(images, 0)}
                        className="group relative block aspect-[16/10] w-full overflow-hidden"
                        aria-label={`View photo: ${lead.caption}`}
                      >
                        <Image
                          src={lead.src}
                          alt={lead.alt}
                          fill
                          sizes="(max-width: 1024px) 100vw, 60vw"
                          className="object-cover transition-transform duration-700 ease-editorial group-hover:scale-[1.03]"
                        />
                      </button>
                      {rest.length > 0 && (
                        <div className="mt-3 grid grid-cols-3 gap-3 sm:grid-cols-4">
                          {rest.map((im, i) => (
                            <button
                              key={im.src}
                              type="button"
                              onClick={() => open(images, i + 1)}
                              className="group relative block aspect-[4/3] w-full overflow-hidden"
                              aria-label={`View photo: ${im.caption}`}
                            >
                              <Image
                                src={im.src}
                                alt={im.alt}
                                fill
                                sizes="(max-width: 640px) 33vw, 15vw"
                                loading="lazy"
                                className="object-cover transition-transform duration-700 ease-editorial group-hover:scale-[1.05]"
                              />
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        )}
      </Container>

      {box && (
        <Lightbox
          images={box.images}
          index={box.index}
          onClose={close}
          onNext={next}
          onPrev={prev}
          setIndex={(i) => setBox((b) => (b ? { ...b, index: i } : b))}
        />
      )}
    </section>
  );
}
