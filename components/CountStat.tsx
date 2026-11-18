'use client';

import { useCountUp } from '@/lib/hooks';

/**
 * Large editorial statistic that counts up once when it enters view.
 * Non-numeric values (e.g. "11'6\"") are shown as-is.
 */
export function CountStat({
  value,
  unit,
  label,
  note,
  tone = 'dark',
}: {
  value: string;
  unit?: string;
  label: string;
  note?: string;
  tone?: 'dark' | 'light';
}) {
  const numericMatch = value.match(/^([\d,]+(?:\.\d+)?)$/);
  const numeric = !!numericMatch;
  const raw = numeric ? parseFloat(value.replace(/,/g, '')) : 0;
  const decimals = numeric && value.includes('.') ? value.split('.')[1].length : 0;
  const { value: n, setRef } = useCountUp(raw, decimals);
  const shown = numeric
    ? n.toLocaleString('en-IN', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })
    : value;

  return (
    <div ref={setRef} data-reveal className="flex flex-col">
      <span
        className={`font-display text-[2.6rem] font-medium leading-none sm:text-5xl ${
          tone === 'light' ? 'text-pearl' : 'text-navy'
        }`}
      >
        {shown}
        {unit ? (
          <span className={`ml-1 text-xl sm:text-2xl ${tone === 'light' ? 'text-gold' : 'text-gold-deep'}`}>{unit}</span>
        ) : null}
      </span>
      <span
        className={`mt-3 text-sm leading-snug ${
          tone === 'light' ? 'text-pearl/65' : 'text-navy/65'
        }`}
      >
        {label}
      </span>
      {note ? (
        <span className={`mt-1 text-[0.68rem] uppercase tracking-[0.14em] ${tone === 'light' ? 'text-stone/70' : 'text-gold-deep/80'}`}>
          {note}
        </span>
      ) : null}
    </div>
  );
}
