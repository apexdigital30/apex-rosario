import Image from 'next/image';

/**
 * The official Rosario wordmark (gold gradient, transparent background) — the
 * same file the Rosario EOI portal uses. Reads on burgundy and on white.
 */
export function Logo({
  className = '',
  priority = false,
}: {
  variant?: 'light' | 'dark';
  className?: string;
  priority?: boolean;
}) {
  return (
    <Image
      src="/assets/rosario/brand/rosario-logo-gold.png"
      alt="Apex Rosario"
      width={1250}
      height={241}
      priority={priority}
      className={`w-auto ${className}`}
      sizes="(max-width: 640px) 280px, 420px"
    />
  );
}

/** The Apex Group corporate mark. */
export function ApexLogo({
  className = '',
  priority = false,
}: {
  className?: string;
  priority?: boolean;
}) {
  return (
    <Image
      src="/assets/rosario/brand/apex-group-logo-gold.png"
      alt="The Apex Group"
      width={1080}
      height={1080}
      priority={priority}
      className={`w-auto ${className}`}
      sizes="140px"
    />
  );
}
