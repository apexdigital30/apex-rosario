'use client';

import { useState } from 'react';
import Image from 'next/image';
import { amenities } from '@/data/rosario';
import { AssetPending, Container, SectionLabel } from './ui';

export default function Amenities() {
  const [hover, setHover] = useState<string | null>(null);

  return (
    <section id="amenities" className="scroll-mt-[var(--header-h)] bg-pearl py-[4.5rem] sm:py-32">
      <Container>
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <SectionLabel>{amenities.label}</SectionLabel>
            <h2 className="mt-7 font-display text-display-lg font-medium text-navy">
              {amenities.headline.map((l, i) => (
                <span key={i} className="block overflow-hidden">
                  <span data-reveal data-reveal-delay={i * 100} className="block">
                    {l}
                  </span>
                </span>
              ))}
            </h2>
          </div>
          <p data-reveal className="text-[1.03rem] leading-relaxed text-navy/75 lg:col-span-5">
            {amenities.intro}
          </p>
        </div>

        {/* featured amenity */}
        <div className="mt-14 grid items-center gap-8 border-y border-[color:var(--color-border)] py-12 lg:grid-cols-12 lg:gap-14">
          <figure data-focus className="relative overflow-hidden lg:col-span-7">
            {amenities.featured.image ? (
              <Image
                src={amenities.featured.image}
                alt={amenities.featured.alt}
                width={amenities.featured.w}
                height={amenities.featured.h}
                sizes="(max-width: 1024px) 100vw, 56vw"
                className="h-auto w-full"
              />
            ) : (
              <AssetPending
                label={amenities.featured.title}
                className="w-full"
                style={{ aspectRatio: `${amenities.featured.w} / ${amenities.featured.h}` }}
              />
            )}
          </figure>
          <div data-reveal className="lg:col-span-5">
            <h3 className="font-display text-display-md font-medium text-navy">{amenities.featured.title}</h3>
            {amenities.featured.subtitle && (
              <p className="mt-3 font-display text-xl italic text-gold-deep">{amenities.featured.subtitle}</p>
            )}
            <p className="mt-4 text-body-lg text-navy/70">{amenities.featured.copy}</p>
          </div>
        </div>

        {/* category index */}
        <div className="mt-14 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {amenities.categories.map((cat) => (
            <div key={cat.id} data-reveal>
              <h3 className="border-b border-gold/40 pb-2 font-display text-xl text-navy">{cat.name}</h3>
              <ul className="mt-3 space-y-1.5">
                {cat.items.map((it) => (
                  <li key={it} className="text-[0.95rem] leading-snug text-navy/70">
                    {it}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Container>

      {/* image-led cards */}
      <Container className="mt-16 sm:mt-20">
        <div className="grid gap-5 sm:grid-cols-2">
          {amenities.gallery.map((g) => (
            <figure
              key={g.id}
              onMouseEnter={() => setHover(g.id)}
              onMouseLeave={() => setHover(null)}
              className="group relative overflow-hidden"
            >
              <div className="relative aspect-[16/10] w-full">
                {g.image ? (
                  <Image
                    src={g.image}
                    alt={g.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, 50vw"
                    loading="lazy"
                    className={`object-cover transition-transform duration-[1.2s] ease-editorial ${
                      hover === g.id ? 'scale-[1.04]' : 'scale-100'
                    }`}
                  />
                ) : (
                  <AssetPending tone="light" label={g.title} className="absolute inset-0 justify-start border-0 bg-navy pt-10" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-navy/85 via-navy/10 to-transparent" />
              </div>
              <figcaption className="absolute inset-x-0 bottom-0 p-6">
                <p className="text-[0.68rem] uppercase tracking-[0.2em] text-gold">{g.category}</p>
                <h4 className="mt-1 font-display text-2xl text-pearl">{g.title}</h4>
                <p
                  className={`mt-1.5 max-w-sm text-[0.9rem] leading-relaxed text-pearl/80 transition-opacity duration-500 sm:opacity-70 ${
                    hover === g.id ? 'sm:opacity-100' : ''
                  }`}
                >
                  {g.copy}
                </p>
              </figcaption>
            </figure>
          ))}
        </div>
      </Container>
    </section>
  );
}
