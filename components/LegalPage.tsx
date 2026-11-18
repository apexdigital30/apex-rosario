import Link from 'next/link';
import { Container } from './ui';
import { Logo } from './Logo';
import { legal } from '@/data/rosario';

export function LegalPage({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-pearl">
      <div className="bg-navy">
        <Container className="flex h-16 items-center justify-between">
          <Link href="/" aria-label="Apex Rosario — home">
            <Logo variant="light" className="h-7 sm:h-8" />
          </Link>
          <Link href="/" className="text-xs font-medium uppercase tracking-[0.14em] text-gold hover:text-pearl">
            &larr; Back to site
          </Link>
        </Container>
      </div>

      <Container className="py-16 sm:py-24">
        <article className="mx-auto max-w-prose">
          <h1 className="font-display text-display-md font-medium text-navy">{title}</h1>
          <div className="mt-8 space-y-4 text-[0.95rem] leading-relaxed text-navy/80 [&_h2]:mt-8 [&_h2]:font-display [&_h2]:text-xl [&_h2]:text-navy [&_a]:text-gold [&_a]:underline [&_a]:underline-offset-4">
            {children}
          </div>
          <p className="mt-12 border-t border-[color:var(--color-border)] pt-6 text-xs text-navy/45">
            {legal.developer} · {legal.brand}. {legal.copyright}
          </p>
        </article>
      </Container>
    </div>
  );
}
