import { specifications } from '@/data/rosario';
import { Container, SectionLabel } from './ui';

export default function Specifications() {
  return (
    <section id="specifications" aria-label="Specifications" className="scroll-mt-[var(--header-h)] bg-stone/15 py-[4.5rem] sm:py-28">
      <Container>
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <SectionLabel>{specifications.label}</SectionLabel>
            <h2 className="mt-7 font-display text-display-lg font-medium text-navy">
              {specifications.headline.map((l, i) => (
                <span key={i} className="block overflow-hidden">
                  <span data-reveal data-reveal-delay={i * 100} className="block">
                    {l}
                  </span>
                </span>
              ))}
            </h2>
          </div>
          <p data-reveal className="text-[1.03rem] leading-relaxed text-navy/75 lg:col-span-5">
            {specifications.intro}
          </p>
        </div>

        <div className="mt-10 divide-y divide-[color:var(--color-border)] border-y border-[color:var(--color-border)]">
          {specifications.categories.map((cat, i) => (
            <details key={cat.id} className="spec-acc group py-1" open={i === 0}>
              <summary className="flex min-h-[56px] cursor-pointer items-center justify-between gap-4 py-4">
                <span className="font-display text-xl text-navy">{cat.name}</span>
                <span aria-hidden className="spec-icon flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-navy/20 text-sm text-navy">
                  +
                </span>
              </summary>
              <div className="grid gap-x-10 gap-y-4 pb-6 sm:grid-cols-2">
                {cat.rows.map((r) => (
                  <div key={r.k}>
                    <p className="text-xs font-medium uppercase tracking-[0.12em] text-gold-deep">{r.k}</p>
                    <p className="mt-1 text-[0.95rem] leading-relaxed text-navy/75">{r.v}</p>
                  </div>
                ))}
              </div>
            </details>
          ))}
        </div>
      </Container>
    </section>
  );
}
