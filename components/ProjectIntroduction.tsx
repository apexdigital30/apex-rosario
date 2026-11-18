import Image from 'next/image';
import { intro } from '@/data/rosario';
import { AssetPending, Container, SectionLabel } from './ui';
import { CountStat } from './CountStat';

export default function ProjectIntroduction() {
  return (
    <section id="overview" className="scroll-mt-[var(--header-h)] bg-pearl py-[4.5rem] sm:py-32">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <SectionLabel>{intro.label}</SectionLabel>
            <h2 className="mt-7 whitespace-normal font-display text-[clamp(1.9rem,3.4vw,3rem)] font-medium leading-[1.12] text-navy">
              {intro.headline.map((l, i) => (
                <span key={i} className="block overflow-hidden">
                  <span data-reveal data-reveal-delay={i * 110} className="block">
                    {l}
                  </span>
                </span>
              ))}
            </h2>
            <p data-reveal className="mt-9 max-w-prose text-body-lg text-navy/80">
              {intro.lead}
            </p>
            {intro.body.map((p, i) => (
              <p key={i} data-reveal className="mt-5 max-w-prose text-[1.03rem] leading-relaxed text-navy/65">
                {p}
              </p>
            ))}
            <span data-reveal className="mt-10 block h-px w-full max-w-prose rule-gold" />
            <div className="mt-10 grid grid-cols-2 gap-x-8 gap-y-9 sm:max-w-prose">
              {intro.stats.map((s) => (
                <CountStat key={s.label} value={s.value} unit={s.unit} label={s.label} />
              ))}
            </div>
          </div>

          <div className="lg:col-span-6">
            <figure className="relative overflow-hidden">
              <div data-focus>
                {intro.image ? (
                  <Image
                    src={intro.image}
                    alt={intro.imageAlt}
                    width={intro.imageW}
                    height={intro.imageH}
                    sizes="(max-width: 1024px) 100vw, 46vw"
                    className="h-auto w-full"
                    priority
                  />
                ) : (
                  <AssetPending
                    label="Exterior architecture"
                    className="w-full"
                    style={{ aspectRatio: `${intro.imageW} / ${intro.imageH}` }}
                  />
                )}
              </div>
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy/85 to-transparent p-5 text-xs uppercase tracking-[0.18em] text-pearl/90">
                {intro.caption}
              </figcaption>
            </figure>

            <ul data-reveal className="mt-6 grid gap-x-6 gap-y-2.5 border-t border-[color:var(--color-border)] pt-6 sm:grid-cols-2">
              {intro.keyPoints.map((it) => (
                <li key={it} className="flex items-start gap-3 text-[0.92rem] leading-snug text-navy/70">
                  <span aria-hidden className="mt-1.5 inline-block h-1.5 w-1.5 shrink-0 rotate-45 bg-gold" />
                  {it}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
