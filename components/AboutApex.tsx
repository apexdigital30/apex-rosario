import Image from 'next/image';
import { about } from '@/data/rosario';
import { Container, SectionLabel } from './ui';
import ApexProjectsSlider from './ApexProjectsSlider';

/**
 * About the developer — the exact layout of the Apex Quebec "Legacy" section
 * (same grid, frame sizes, aspect ratios and caption treatment), in the
 * Apex Rosario colours.
 */
export default function AboutApex() {
  const { chairman, infographic } = about;

  return (
    <section aria-label="About the developer" className="bg-navy py-[4.5rem] text-pearl sm:py-32">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionLabel tone="light">{about.label}</SectionLabel>
            <h2 className="mt-6 font-display text-[clamp(2.25rem,4.6vw,3.5rem)] font-medium leading-[1.08] tracking-[-0.005em]">
              {about.headline.map((l, i) => (
                <span key={i} className="block overflow-hidden">
                  <span data-reveal data-reveal-delay={i * 100} className="block">
                    {l}
                  </span>
                </span>
              ))}
            </h2>
            <p data-reveal className="mt-6 font-display text-2xl tracking-wide text-gold">
              {about.tagline}
            </p>

            <figure data-reveal className="mt-10 max-w-md">
              <div className="relative overflow-hidden rounded-sm border border-gold/25 bg-gradient-to-b from-green/60 to-navy p-2 shadow-[0_30px_70px_-25px_rgba(0,0,0,0.7)]">
                <div className="relative aspect-[4/3] overflow-hidden rounded-[2px]">
                  <Image
                    src={chairman.image}
                    alt={`${chairman.name}, ${chairman.title}, seated at his office desk.`}
                    fill
                    sizes="(max-width: 1024px) 90vw, 420px"
                    className="object-cover"
                  />
                  <div aria-hidden className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-pearl/15" />
                </div>
              </div>
              <figcaption className="mt-5 flex items-center gap-4">
                <span aria-hidden className="h-px w-8 shrink-0 bg-gradient-to-r from-gold to-gold/20" />
                <span>
                  <span className="block font-display text-lg tracking-wide text-pearl">{chairman.name}</span>
                  <span className="block text-[0.7rem] uppercase tracking-[0.22em] text-gold/85">{chairman.title}</span>
                </span>
              </figcaption>
            </figure>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            {about.profile.map((p, i) => (
              <p key={i} data-reveal className="mt-4 text-body-lg text-pearl/75 first:mt-0">
                {p}
              </p>
            ))}

            <figure data-reveal className="mt-10">
              <a
                href={about.corporateUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Apex Group — projects delivered with excellence (opens theapexgroup.in)"
                className="relative block aspect-[16/10] overflow-hidden rounded-sm border border-gold/25 shadow-[0_30px_70px_-20px_rgba(0,0,0,0.75)] ring-1 ring-inset ring-pearl/10"
              >
                <Image
                  src={infographic.image}
                  alt={infographic.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition-opacity hover:opacity-90"
                />
              </a>
              <figcaption className="mt-2 text-xs uppercase tracking-[0.16em] text-pearl/50">
                {infographic.caption}
              </figcaption>
            </figure>
          </div>
        </div>

        {/* full-width projects slider (same as the Apex Quebec site) */}
        <div className="mt-16 border-t border-pearl/15 pt-12 sm:mt-20">
          <ApexProjectsSlider />
        </div>
      </Container>
    </section>
  );
}
