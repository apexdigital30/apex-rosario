import Image from 'next/image';
import { nav, contact, legal, project, pricing } from '@/data/rosario';
import { Container } from './ui';
import { Logo } from './Logo';

const resourceLinks = [
  { label: 'Master Plan', href: '#master-plan' },
  { label: 'Amenities', href: '#amenities' },
  { label: 'Residences', href: '#residences' },
  { label: 'Location', href: '#location' },
];

function FooterColumn({
  title,
  ariaLabel,
  children,
}: {
  title: string;
  ariaLabel: string;
  children: React.ReactNode;
}) {
  return (
    <details className="footer-acc border-b border-pearl/10 py-2 sm:border-0 sm:py-0" open>
      <summary className="flex min-h-[44px] items-center justify-between text-xs uppercase tracking-[0.2em] text-gold">
        {title}
        <span aria-hidden className="acc-icon text-lg text-gold">
          +
        </span>
      </summary>
      <nav aria-label={ariaLabel} className="acc-body pb-2 sm:pb-0">
        <ul className="mt-3 space-y-2.5 text-[0.95rem] sm:space-y-2 sm:text-sm">{children}</ul>
      </nav>
    </details>
  );
}

export default function Footer() {
  return (
    <footer className="bg-navy text-pearl">
      {/* CTA band */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/assets/rosario/hero/rosario-texture.jpg?v=1"
            alt=""
            aria-hidden
            fill
            sizes="100vw"
            className="object-cover opacity-60"
          />
        </div>
        <div className="absolute inset-0 bg-navy/55" />
        <Container className="relative py-[4.5rem] sm:py-28">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-8">
              <h2 className="max-w-2xl font-display text-display-lg font-medium">
                {['A royal address,', 'in Siddharth Vihar.'].map((l, i) => (
                  <span key={i} className="block overflow-hidden">
                    <span data-reveal data-reveal-delay={i * 100} className="block">
                      {l}
                    </span>
                  </span>
                ))}
              </h2>
              <div className="mt-9">
                <a
                  href="#contact"
                  className="inline-flex min-h-[50px] items-center justify-center rounded-full bg-pearl px-7 text-xs font-medium uppercase tracking-[0.18em] text-navy transition-colors hover:bg-gold"
                >
                  Enquire Now
                </a>
              </div>
            </div>
            <div className="hidden lg:col-span-4 lg:flex lg:justify-end">
              <Logo variant="light" className="h-12 xl:h-14" />
            </div>
          </div>
        </Container>
      </div>

      {/* main footer */}
      <Container className="grid gap-8 py-14 sm:grid-cols-2 sm:gap-12 sm:py-16 lg:grid-cols-4">
        <div data-reveal className="sm:col-span-2 lg:col-span-1">
          <Logo variant="light" className="h-9 sm:h-10" />
          <p className="mt-5 max-w-xs text-[0.82rem] leading-relaxed text-pearl/55">
            {project.name} — A Royal Living. 3 &amp; 4 BHK residences by the Apex Group at{' '}
            {project.location}.
          </p>
        </div>

        <FooterColumn title="Explore" ariaLabel="Explore">
          {nav.map((n) => (
            <li key={n.id}>
              <a
                href={`#${n.id}`}
                className="flex min-h-[36px] items-center text-pearl/70 transition-colors hover:text-pearl sm:min-h-0"
              >
                {n.label}
              </a>
            </li>
          ))}
        </FooterColumn>

        <FooterColumn title="Resources" ariaLabel="Resources">
          {resourceLinks.map((r) => (
            <li key={r.label}>
              <a href={r.href} className="flex min-h-[36px] items-center text-pearl/70 transition-colors hover:text-pearl sm:min-h-0">
                {r.label}
              </a>
            </li>
          ))}
        </FooterColumn>

        <div data-reveal>
          <h3 className="text-xs uppercase tracking-[0.2em] text-gold">Contact</h3>
          <ul className="mt-4 space-y-3 text-[0.95rem] text-pearl/70 sm:text-sm">
            <li>{contact.siteAddress}</li>
            <li>
              <a href={`mailto:${contact.email}`} className="hover:text-pearl">
                {contact.email}
              </a>
            </li>
            <li>
              <a href={contact.mapsUrl} target="_blank" rel="noopener noreferrer" className="hover:text-pearl">
                Get directions
              </a>
            </li>
          </ul>
        </div>
      </Container>

      {/* legal */}
      <div className="border-t border-pearl/10">
        <Container className="py-8">
          <div className="grid gap-4 text-[0.78rem] text-pearl/50 lg:grid-cols-3">
            {legal.rera ? (
              <p>
                <span className="text-pearl/70">Project RERA:</span> {legal.rera} ·{' '}
                <a href={legal.reraUrl} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-pearl">
                  {legal.reraAuthority}
                </a>
              </p>
            ) : (
              <p>
                <span className="text-pearl/70">{legal.reraAuthority}:</span> {legal.reraStatus} ·
                Possession {legal.possession}
              </p>
            )}
            <p>
              <span className="text-pearl/70">Developer:</span> {legal.developer} · {legal.brand}
            </p>
            <p>
              <span className="text-pearl/70">Office:</span> {legal.registeredAddress}
            </p>
          </div>

          <p className="mt-5 text-[0.78rem] leading-relaxed text-pearl/45">{legal.disclaimer}</p>
          {pricing.show && <p className="mt-2 text-[0.78rem] leading-relaxed text-pearl/45">{pricing.note}</p>}

          <div className="mt-6 flex flex-col gap-3 border-t border-pearl/10 pt-6 text-xs text-pearl/50 sm:flex-row sm:items-center sm:justify-between">
            <p>{legal.copyright}</p>
            <nav aria-label="Legal" className="flex flex-wrap gap-x-5">
              <a href="/privacy-policy" className="flex min-h-[36px] items-center hover:text-pearl">Privacy Policy</a>
              <a href="/terms" className="flex min-h-[36px] items-center hover:text-pearl">Terms &amp; Conditions</a>
              <a href="/disclaimer" className="flex min-h-[36px] items-center hover:text-pearl">Disclaimer</a>
              <a href="/sitemap.xml" className="flex min-h-[36px] items-center hover:text-pearl">Sitemap</a>
            </nav>
          </div>
        </Container>
      </div>
    </footer>
  );
}
