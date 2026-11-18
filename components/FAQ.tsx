import Image from 'next/image';
import { faqs, cherub } from '@/data/rosario';
import { Container, SectionLabel } from './ui';

export default function FAQ() {
  return (
    <section aria-label="Frequently asked questions" className="bg-pearl py-[4.5rem] sm:py-28">
      <Container>
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <SectionLabel>{faqs.label}</SectionLabel>
            <h2 className="mt-7 font-display text-display-lg font-medium text-navy">
              {faqs.headline.map((l, i) => (
                <span key={i} className="block overflow-hidden">
                  <span data-reveal data-reveal-delay={i * 100} className="block">
                    {l}
                  </span>
                </span>
              ))}
            </h2>
            <p data-reveal className="mt-6 max-w-sm text-[1.03rem] leading-relaxed text-navy/70">
              {faqs.intro}
            </p>
            {/* decorative cherub — large screens only */}
            <div data-reveal aria-hidden className="pointer-events-none relative mt-12 hidden w-[min(100%,330px)] lg:block" style={{ aspectRatio: `${cherub.w} / ${cherub.h}` }}>
              <Image
                src={cherub.src}
                alt=""
                fill
                sizes="330px"
                className="animate-[float_7s_ease-in-out_infinite] object-contain drop-shadow-[0_22px_30px_rgba(40,18,18,0.22)] motion-reduce:animate-none"
              />
            </div>
          </div>

          <div className="lg:col-span-8">
            <div className="divide-y divide-[color:var(--color-border)] border-y border-[color:var(--color-border)]">
              {faqs.items.map((f, i) => (
                <details key={f.q} className="spec-acc group py-1" open={i === 0}>
                  <summary className="flex min-h-[56px] cursor-pointer items-center justify-between gap-4 py-4">
                    <span className="font-display text-xl text-navy sm:text-2xl">{f.q}</span>
                    <span
                      aria-hidden
                      className="spec-icon flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-navy/20 text-sm text-navy"
                    >
                      +
                    </span>
                  </summary>
                  <p className="whitespace-pre-line pb-6 pr-10 text-[0.97rem] leading-relaxed text-navy/70">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
