import Image from 'next/image';
import { location } from '@/data/rosario';
import { AssetPending, Container, SectionLabel } from './ui';

export default function Location() {
  return (
    <section id="location" className="scroll-mt-[var(--header-h)] bg-pearl py-[4.5rem] sm:py-32">
      <Container>
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <SectionLabel>{location.label}</SectionLabel>
            <h2 className="mt-7 font-display text-display-lg font-medium text-navy">
              {location.headline.map((l, i) => (
                <span key={i} className="block overflow-hidden">
                  <span data-reveal data-reveal-delay={i * 100} className="block">
                    {l}
                  </span>
                </span>
              ))}
            </h2>
          </div>
          <p data-reveal className="text-[1.03rem] leading-relaxed text-navy/75 lg:col-span-5">
            {location.intro}
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-12 lg:items-stretch">
          <div className="overflow-hidden border border-[color:var(--color-border)] bg-pearl lg:col-span-7">
            <iframe
              title="Apex Rosario on Google Maps — Siddharth Vihar, Ghaziabad"
              src={location.mapEmbed}
              className="block h-[46vh] min-h-[340px] w-full sm:h-[52vh]"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
            />
          </div>
          <div className="flex flex-col justify-between gap-6 bg-navy p-7 text-pearl lg:col-span-5">
            <div>
              <p className="label-eyebrow text-gold">Site address</p>
              <p className="mt-3 text-[1.02rem] leading-relaxed text-pearl/90">{location.address}</p>
            </div>
            {location.mapImage ? (
            <a
              href={location.mapImage}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative block aspect-[4/3] w-full overflow-hidden rounded-sm border border-pearl/15 bg-pearl"
              aria-label="Open the location map at full size"
            >
              <Image
                src={location.mapImage}
                alt={location.mapImageAlt}
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-contain transition-transform duration-700 ease-editorial group-hover:scale-[1.04]"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/0 to-navy/0" />
              <span className="pointer-events-none absolute inset-x-0 bottom-0 flex items-center justify-between gap-2 p-3.5 text-[0.68rem] uppercase tracking-[0.16em] text-pearl/90">
                Brochure site map
                <span className="text-pearl/70 transition-colors group-hover:text-gold">View full size ↗</span>
              </span>
            </a>
            ) : (
              <AssetPending tone="light" label="Location map" className="aspect-[4/3] w-full rounded-sm" />
            )}
            <a
              href={location.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-h-[48px] w-full items-center justify-center rounded-full bg-pearl px-5 text-xs font-medium uppercase tracking-[0.16em] text-navy transition-colors hover:bg-gold"
            >
              Open in Google Maps
            </a>
          </div>
        </div>

        {location.connectivity.items.length > 0 && (
          <div className="mt-14">
            <div className="grid gap-4 lg:grid-cols-12 lg:items-end">
              <h3 className="font-display text-2xl text-navy lg:col-span-6">{location.connectivity.heading}</h3>
              <p className="text-[0.97rem] leading-relaxed text-navy/70 lg:col-span-6">{location.connectivity.intro}</p>
            </div>
            <ul className="mt-8 grid gap-x-10 border-t border-[color:var(--color-border)] sm:grid-cols-2 lg:grid-cols-3">
              {location.connectivity.items.map((c) => (
                <li key={c.name} className="flex items-start gap-3 border-b border-[color:var(--color-border)] py-4">
                  <span aria-hidden className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                  <span>
                    <span className="block font-display text-lg leading-snug text-navy">{c.name}</span>
                    <span className="mt-0.5 block text-[0.9rem] text-navy/65">{c.detail}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </Container>
    </section>
  );
}
