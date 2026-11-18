import { lifeAt } from '@/data/rosario';
import { Container, SectionLabel } from './ui';
import LifeGallery from './LifeGallery';

export default function LifeAt() {
  return (
    <section aria-label="Life at Rosario" className="bg-navy py-[4.5rem] text-pearl sm:py-32">
      <Container>
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <SectionLabel tone="light">{lifeAt.label}</SectionLabel>
            <h2 className="mt-7 font-display text-display-lg font-medium">
              {lifeAt.headline.map((l, i) => (
                <span key={i} className="block overflow-hidden">
                  <span data-reveal data-reveal-delay={i * 100} className="block">
                    {l}
                  </span>
                </span>
              ))}
            </h2>
          </div>
          <p data-reveal className="text-[1.03rem] leading-relaxed text-pearl/70 lg:col-span-5">
            {lifeAt.intro}
          </p>
        </div>
      </Container>

      <LifeGallery />

      <Container className="mt-12 sm:mt-16">
        <div className="grid gap-x-10 gap-y-3 border-t border-pearl/15 pt-10 sm:grid-cols-2 lg:grid-cols-4">
          {lifeAt.points.map((p) => (
            <div key={p} data-reveal className="flex items-start gap-3 text-[0.95rem] leading-snug text-pearl/80">
              <span aria-hidden className="mt-1.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
              {p}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
