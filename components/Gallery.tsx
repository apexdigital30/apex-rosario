'use client';

import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import { gallery, type GalleryImage } from '@/data/rosario';
import { AssetPending, Container, SectionLabel } from './ui';

function useGalleryColumns() {
  const [cols, setCols] = useState(1);
  useLayoutEffect(() => {
    const update = () => setCols(window.innerWidth >= 1024 ? 3 : window.innerWidth >= 600 ? 2 : 1);
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);
  return cols;
}

export default function Gallery() {
  const [cat, setCat] = useState('All');
  const [open, setOpen] = useState(false);
  const [idx, setIdx] = useState(0);
  const cols = useGalleryColumns();

  const images = useMemo<GalleryImage[]>(
    () => (cat === 'All' ? gallery.images : gallery.images.filter((i) => i.category === cat)),
    [cat],
  );

  // Round-robin column assignment: deterministic left-to-right fill order,
  // instead of CSS multi-column's height-balanced (unpredictable) placement.
  const columns = useMemo(() => {
    const cells: { img: GalleryImage; i: number }[][] = Array.from({ length: cols }, () => []);
    images.forEach((img, i) => cells[i % cols].push({ img, i }));
    return cells;
  }, [images, cols]);

  const openAt = (i: number) => {
    setIdx(i);
    setOpen(true);
  };
  const close = useCallback(() => setOpen(false), []);
  const next = useCallback(() => setIdx((i) => (i + 1) % images.length), [images.length]);
  const prev = useCallback(() => setIdx((i) => (i - 1 + images.length) % images.length), [images.length]);

  return (
    <section id="gallery" className="scroll-mt-[var(--header-h)] bg-navy pb-[4.5rem] pt-14 text-pearl sm:pb-32 sm:pt-20">
      <Container>
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <SectionLabel tone="light">{gallery.label}</SectionLabel>
            <h2 className="mt-7 font-display text-display-lg font-medium">
              {gallery.headline.map((l, i) => (
                <span key={i} className="block overflow-hidden">
                  <span data-reveal data-reveal-delay={i * 100} className="block">
                    {l}
                  </span>
                </span>
              ))}
            </h2>
          </div>
          <div className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 sm:mx-0 sm:flex-wrap sm:px-0">
            {gallery.categories.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setCat(c)}
                className={`flex min-h-[44px] shrink-0 items-center rounded-full border px-3.5 text-xs font-medium uppercase tracking-[0.12em] transition-colors ${
                  cat === c
                    ? 'border-gold bg-gold text-navy'
                    : 'border-pearl/25 text-pearl/70 hover:border-gold hover:text-pearl'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* asset-pending frames until approved Rosario imagery is supplied */}
        {gallery.images.length === 0 && (
          <div className="mt-10 grid gap-4 sm:mt-12 sm:grid-cols-2 lg:grid-cols-3">
            {gallery.pending
              .filter((p) => cat === 'All' || p.category === cat)
              .map((p) => (
                <AssetPending key={p.caption} tone="light" label={p.caption} className="aspect-[16/10] w-full" />
              ))}
          </div>
        )}

        {/* masonry — round-robin columns keep each tile's real aspect ratio and fill left-to-right */}
        <div className="mt-10 flex gap-4 sm:mt-12">
          {columns.map((col, ci) => (
            <div key={ci} className="flex flex-1 flex-col gap-4">
              {col.map(({ img, i }) => (
                <button
                  key={`${img.category}-${img.src}`}
                  type="button"
                  onClick={() => openAt(i)}
                  className="group block w-full overflow-hidden"
                  aria-label={`View image: ${img.caption}`}
                >
                  <span className="relative block">
                    <Image
                      src={img.src}
                      alt={img.alt}
                      width={img.w}
                      height={img.h}
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      loading="lazy"
                      className="h-auto w-full transition-transform duration-700 ease-editorial group-hover:scale-[1.03]"
                    />
                    <span className="pointer-events-none absolute inset-0 flex items-end bg-gradient-to-t from-navy/80 via-transparent to-transparent p-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100 sm:p-4">
                      <span className="text-xs uppercase tracking-[0.14em] text-pearl">{img.caption}</span>
                    </span>
                  </span>
                </button>
              ))}
            </div>
          ))}
        </div>
      </Container>

      {open && (
        <Lightbox images={images} index={idx} onClose={close} onNext={next} onPrev={prev} setIndex={setIdx} />
      )}
    </section>
  );
}

export function Lightbox({
  images,
  index,
  onClose,
  onNext,
  onPrev,
  setIndex,
}: {
  images: GalleryImage[];
  index: number;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
  setIndex: (i: number) => void;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const touch = useRef<{ x: number; y: number } | null>(null);
  const img = images[index];

  useEffect(() => {
    closeRef.current?.focus();
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowRight') onNext();
      else if (e.key === 'ArrowLeft') onPrev();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose, onNext, onPrev]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Gallery image ${index + 1} of ${images.length}: ${img.caption}`}
      className="fixed inset-0 z-[105] flex flex-col bg-navy/97 backdrop-blur-sm"
      onPointerDown={(e) => (touch.current = { x: e.clientX, y: e.clientY })}
      onPointerUp={(e) => {
        if (!touch.current) return;
        const dx = e.clientX - touch.current.x;
        const dy = e.clientY - touch.current.y;
        if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy)) (dx < 0 ? onNext : onPrev)();
        touch.current = null;
      }}
    >
      <div className="flex items-center justify-between px-4 py-3 text-pearl sm:px-5 sm:py-4">
        <span className="text-xs tabular-nums tracking-[0.16em] text-pearl/70">
          {String(index + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}
        </span>
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close gallery"
          className="flex h-11 min-w-[44px] items-center justify-center rounded-full border border-pearl/30 px-4 text-xs font-medium uppercase tracking-[0.14em] transition-colors hover:bg-pearl hover:text-navy"
        >
          Close
        </button>
      </div>

      <div
        className="relative flex flex-1 items-center justify-center overflow-hidden px-3 pb-3 sm:px-4 sm:pb-4"
        style={{ touchAction: 'pan-y' }}
      >
        <button
          type="button"
          onClick={onPrev}
          aria-label="Previous image"
          className="absolute left-2 z-10 flex h-12 w-12 items-center justify-center rounded-full border border-pearl/25 bg-navy/40 text-pearl transition-colors hover:bg-pearl hover:text-navy sm:left-6"
        >
          &larr;
        </button>
        <div key={img.src} className="animate-fade-up max-h-full">
          <Image
            src={img.src}
            alt={img.alt}
            width={img.w}
            height={img.h}
            sizes="92vw"
            className="max-h-[74vh] w-auto object-contain sm:max-h-[78vh]"
            priority
          />
        </div>
        <button
          type="button"
          onClick={onNext}
          aria-label="Next image"
          className="absolute right-2 z-10 flex h-12 w-12 items-center justify-center rounded-full border border-pearl/25 bg-navy/40 text-pearl transition-colors hover:bg-pearl hover:text-navy sm:right-6"
        >
          &rarr;
        </button>
      </div>

      <div className="px-5 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-1 text-center">
        <p className="text-[0.95rem] text-pearl/85">{img.caption}</p>
        <p className="mt-1 text-xs uppercase tracking-[0.16em] text-gold">{img.category}</p>
        <div className="mx-auto mt-3 flex max-w-md flex-wrap justify-center">
          {images.map((t, i) => (
            <button
              key={`${t.category}-${t.src}`}
              type="button"
              aria-label={`Go to image ${i + 1}`}
              onClick={() => setIndex(i)}
              className="flex h-8 w-8 items-center justify-center"
            >
              <span className={`block h-1 w-5 rounded-full transition-colors ${i === index ? 'bg-gold' : 'bg-pearl/25'}`} />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
