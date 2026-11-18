import { CSSProperties, ReactNode } from 'react';

export function Container({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`mx-auto w-full max-w-content px-5 sm:px-8 lg:px-12 xl:px-16 2xl:px-20 ${className}`}
    >
      {children}
    </div>
  );
}

export function SectionLabel({
  children,
  tone = 'dark',
  className = '',
}: {
  children: ReactNode;
  tone?: 'dark' | 'light';
  className?: string;
}) {
  return (
    <p
      className={`label-eyebrow ${
        tone === 'light' ? 'text-stone' : 'text-gold-deep'
      } ${className}`}
    >
      {children}
    </p>
  );
}

/** Editorial multi-line heading with a per-line masked reveal. */
export function SectionHeading({
  lines,
  as: Tag = 'h2',
  tone = 'dark',
  className = '',
}: {
  lines: string[] | string;
  as?: 'h1' | 'h2' | 'h3';
  tone?: 'dark' | 'light';
  className?: string;
}) {
  const arr = Array.isArray(lines) ? lines : [lines];
  return (
    <Tag
      className={`font-display font-medium text-display-lg ${
        tone === 'light' ? 'text-pearl' : 'text-navy'
      } ${className}`}
    >
      {arr.map((line, i) => (
        <span key={i} className="block overflow-hidden">
          <span data-reveal data-reveal-delay={i * 90} className="block">
            {line}
          </span>
        </span>
      ))}
    </Tag>
  );
}

export function ThinRule({ className = '', tone = 'dark' }: { className?: string; tone?: 'dark' | 'light' }) {
  return (
    <span
      aria-hidden
      data-reveal
      className={`block h-px w-full origin-left bg-gradient-to-r ${
        tone === 'light' ? 'from-stone/80' : 'from-gold/80'
      } to-transparent ${className}`}
    />
  );
}

/**
 * Placeholder for an image slot whose approved Apex Rosario asset has not been
 * supplied yet. It keeps the slot's footprint so the layout matches the
 * other Apex project sites, and never substitutes another project's imagery.
 */
export function AssetPending({
  label,
  tone = 'dark',
  className = '',
  style,
}: {
  label: string;
  tone?: 'dark' | 'light';
  className?: string;
  style?: CSSProperties;
}) {
  const light = tone === 'light';
  return (
    <div
      role="img"
      aria-label={`${label} (image to be added)`}
      style={style}
      className={`flex flex-col items-center justify-center gap-2 border p-6 text-center ${
        light ? 'border-pearl/15 bg-pearl/[0.04] text-pearl/55' : 'border-navy/10 bg-stone/20 text-navy/50'
      } ${className}`}
    >
      <span className={`label-eyebrow ${light ? 'text-stone' : 'text-gold-deep'}`}>Rosario</span>
      <span className="font-display text-lg">{label}</span>
      <span className="text-[0.68rem] uppercase tracking-[0.2em] opacity-70">Image to be added</span>
    </div>
  );
}
