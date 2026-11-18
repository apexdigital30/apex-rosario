import Image from 'next/image';
import type { Interlude } from '@/data/rosario';
import { Container } from './ui';
import { assetVersion } from '@/data/rosario';

/**
 * A slim band between two sections carrying the Roman theme: a background-free
 * statue stands on the band's floor and rises at most ~90px above its top
 * edge — inside the previous section's bottom padding, never over its content — with one line of brochure copy opposite.
 * Purely decorative — hidden from assistive technology.
 */
export default function StatueInterlude({ data }: { data: Interlude }) {
  const { src, w, h, side, tone, eyebrow, line } = data;
  const dark = tone === 'texture';
  const ratio = w / h;
  // Wide (reclining) figures get a shorter frame so they don't swamp the band.
  const height = ratio > 1.5 ? 'h-[155px] sm:h-[230px] lg:h-[275px]' : 'h-[220px] sm:h-[310px] lg:h-[365px]';

  return (
    <div
      aria-hidden
      className={`relative z-10 ${dark ? 'bg-navy text-pearl' : 'bg-[#f3ece7] text-navy'}`}
    >
      {dark && (
        <Image
          src={`/assets/rosario/hero/rosario-texture.jpg?v=${assetVersion}`}
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-70"
        />
      )}
      {!dark && (
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.7),transparent_70%)]" />
      )}

      <Container className="relative">
        <div
          className={`flex min-h-[160px] items-center sm:min-h-[215px] lg:min-h-[260px] ${
            side === 'left' ? 'justify-end text-right' : 'justify-start text-left'
          }`}
        >
          <div data-reveal className="max-w-[58%] py-10 sm:max-w-md sm:py-12">
            <p className={`label-eyebrow ${dark ? 'text-stone' : 'text-gold-deep'}`}>{eyebrow}</p>
            <p className="mt-3 font-display text-[clamp(1.35rem,2.6vw,2.2rem)] italic leading-tight">{line}</p>
          </div>
        </div>

        {/* statue — base on the band floor, rising above the band */}
        <div
          data-reveal
          className={`pointer-events-none absolute bottom-0 ${height} ${
            side === 'left' ? 'left-3 sm:left-8 lg:left-16' : 'right-3 sm:right-8 lg:right-16'
          }`}
          // clip at the band floor so the shadow never spills onto the next section
          style={{ aspectRatio: `${w} / ${h}`, clipPath: 'inset(-200px -200px 0 -200px)' }}
        >
          <Image
            src={src}
            alt=""
            fill
            sizes="(max-width: 640px) 45vw, 420px"
            className="object-contain object-bottom drop-shadow-[0_18px_28px_rgba(40,18,18,0.35)]"
          />
        </div>
      </Container>
    </div>
  );
}
