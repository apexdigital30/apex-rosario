'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { hero, pricing } from '@/data/rosario';
import { useIsMobile, usePrefersReducedMotion } from '@/lib/hooks';
import { openEnquiry } from '@/lib/enquire';
import { Container } from './ui';

/** The hero runs as a scroll-scrubbed film once one is supplied; until then, as a still. */
const hasFilm = Boolean(hero.videoDesktop && hero.videoMobile);

export default function ScrollVideoHero() {
  return hasFilm ? <FilmHero /> : <StillHero />;
}

/**
 * Still hero — the same full-height stage as the film hero, used while no
 * Rosario film exists. The brochure's burgundy foil texture fills the stage;
 * the tower elevation sits in an arched frame at its own proportions (never
 * cropped or stretched), beside the project name, tagline, price and CTA.
 */
function StillHero() {
  return (
    <section id="hero" aria-label="Apex Rosario — A Royal Living" className="relative w-full overflow-hidden bg-navy text-pearl">
      <Image src={hero.texture} alt="" aria-hidden fill priority sizes="100vw" className="object-cover" />
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-r from-navy/70 via-navy/35 to-navy/10" />

      <Container className="relative">
        <div className="grid min-h-[100svh] items-center gap-12 py-16 sm:py-20 lg:grid-cols-12 lg:gap-10 lg:py-12">
          <div className="animate-fade-up lg:col-span-6 xl:col-span-6">
            <p className="label-eyebrow text-stone">{hero.eyebrow}</p>
            <p className="mt-6 font-display text-[clamp(2.6rem,6.2vw,5.4rem)] font-medium leading-[1.02] tracking-[0.04em]">
              {hero.title}
            </p>
            <p className="mt-5 font-display text-[clamp(1.05rem,1.8vw,1.45rem)] uppercase tracking-[0.32em] text-stone">
              {hero.tagline}
            </p>
            <span aria-hidden className="mt-8 block h-px w-28 rule-gold" />
            <p className="mt-7 max-w-md font-display text-xl italic leading-snug text-pearl/85 sm:text-2xl">{hero.line}</p>
            <p className="mt-4 max-w-md text-[1.02rem] leading-relaxed text-pearl/75">{hero.support}</p>

            {pricing.show && (
              <p className="mt-8 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <span className="whitespace-nowrap text-xs uppercase tracking-[0.2em] text-pearl/60">Starting from</span>
                <span className="whitespace-nowrap font-display text-3xl text-pearl sm:text-4xl">{pricing.startingFrom}</span>
                <span className="whitespace-nowrap text-xs text-pearl/60">· approx. {pricing.rate}</span>
              </p>
            )}

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => openEnquiry('hero')}
                className="flex min-h-[52px] items-center justify-center rounded-full bg-gold px-8 text-xs font-medium uppercase tracking-[0.18em] text-navy transition-colors hover:bg-pearl"
              >
                {hero.cta}
              </button>
              <a
                href="#residences"
                className="flex min-h-[52px] items-center justify-center rounded-full border border-pearl/40 px-8 text-xs font-medium uppercase tracking-[0.18em] text-pearl transition-colors hover:border-gold hover:text-gold"
              >
                View Floor Plans
              </a>
            </div>
            <p className="mt-6 text-[0.7rem] leading-relaxed text-pearl/50">
              *Indicative price. UP RERA registered. Artist’s impression.
            </p>
          </div>

          <div className="flex justify-center lg:col-span-6 lg:justify-end">
            <figure className="w-full max-w-[290px] sm:max-w-[340px] lg:w-auto lg:max-w-none">
              <div className="rounded-t-full border border-stone/45 p-2 shadow-[0_40px_90px_-30px_rgba(0,0,0,0.75)]">
                <div
                  className="relative w-full overflow-hidden rounded-t-full lg:h-[min(80svh,760px)] lg:w-auto"
                  style={{ aspectRatio: `${hero.posterW} / ${hero.posterH}` }}
                >
                  <Image
                    src={hero.stillImage}
                    alt={hero.alt}
                    fill
                    priority
                    sizes="(max-width: 1024px) 340px, 460px"
                    className="object-cover"
                  />
                </div>
              </div>
              <figcaption className="mt-3 text-center text-[0.68rem] uppercase tracking-[0.2em] text-pearl/55">
                Four towers · five domes · artist’s impression
              </figcaption>
            </figure>
          </div>
        </div>
      </Container>
    </section>
  );
}

/**
 * Scroll-controlled hero film — the same behaviour as the APEX D'RIO hero.
 *
 *  - A tall scroll container holds a sticky 100svh stage.
 *  - The video NEVER autoplays. Its `currentTime` is driven only by scroll
 *    progress, eased toward a target time each animation frame.
 *  - Scrolling up scrubs the film backward; the sticky stage cannot leave
 *    until the film reaches its final frame (guaranteed by sticky geometry).
 *  - prefers-reduced-motion, or a device that can't seek, gets the poster.
 */
function FilmHero() {
  const isMobile = useIsMobile();
  const reduced = usePrefersReducedMotion();

  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const targetTime = useRef(0);
  const displayedTime = useRef(0);
  const durationRef = useRef(0);
  const rafRef = useRef(0);
  const seekingRef = useRef(false);
  const seekAtRef = useRef(0);
  const lastTickRef = useRef(0);

  const [ready, setReady] = useState(false);
  const [painted, setPainted] = useState(false);
  const [staticMode, setStaticMode] = useState(false);

  // choose source only after mount (keeps SSR + first client render identical)
  const [src, setSrc] = useState<string | null>(null);
  useEffect(() => {
    setSrc(isMobile ? hero.videoMobile : hero.videoDesktop);
  }, [isMobile]);

  const scrollVh = isMobile ? hero.scrollVhMobile : hero.scrollVh;

  /* -------------------------------------------------- metadata + rAF loop */
  useEffect(() => {
    if (reduced) {
      setStaticMode(true);
      setReady(true);
      return;
    }
    const video = videoRef.current;
    if (!video || !src) return;

    let cancelled = false;
    video.muted = true; // the attribute alone isn't always reflected (React), and iOS requires it for play()

    const onMeta = () => {
      durationRef.current = video.duration || 0;
      video.pause();
      try {
        video.currentTime = 0.001;
      } catch {
        /* ignore */
      }
      setReady(true);
    };
    const onError = () => setStaticMode(true);

    video.addEventListener('loadedmetadata', onMeta);
    video.addEventListener('error', onError);
    if (video.readyState >= 1) onMeta();

    const tick = () => {
      if (cancelled) return;
      const d = durationRef.current;
      if (d > 0 && !staticMode) {
        const diff = targetTime.current - displayedTime.current;
        // frame-rate independent easing (~90ms time constant)
        const now = performance.now();
        const dt = Math.min(now - (lastTickRef.current || now), 250);
        lastTickRef.current = now;
        displayedTime.current += diff * (1 - Math.exp(-dt / 90));
        // release the gate if a `seeked` event never arrives (same-frame or superseded seeks)
        if (seekingRef.current && performance.now() - seekAtRef.current > 140) seekingRef.current = false;
        if (Math.abs(diff) > 0.002 && !seekingRef.current) {
          const t = Math.max(0, Math.min(displayedTime.current, d - 0.03));
          seekingRef.current = true;
          seekAtRef.current = performance.now();
          try {
            video.currentTime = t;
          } catch {
            /* ignore */
          }
        }
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    const onSeeked = () => {
      seekingRef.current = false;
      setPainted(true); // a real frame is now on screen — safe to drop the poster
    };
    const onCanPlay = () => setPainted(true);
    video.addEventListener('seeked', onSeeked);
    video.addEventListener('loadeddata', onCanPlay);
    rafRef.current = requestAnimationFrame(tick);

    // iOS Safari won't fetch or paint a video until it has been played once
    // inside a user gesture — play-then-pause on the first touch / scroll.
    let unlocked = false;
    const unlock = () => {
      if (unlocked) return;
      unlocked = true;
      const p = video.play();
      if (p && typeof p.then === 'function') {
        p.then(() => video.pause()).catch(() => { unlocked = false; });
      } else {
        video.pause();
      }
    };
    const gestures = ['touchstart', 'pointerdown', 'scroll', 'keydown'] as const;
    gestures.forEach((g) => window.addEventListener(g, unlock, { passive: true }));
    video.load();

    return () => {
      cancelled = true;
      cancelAnimationFrame(rafRef.current);
      video.removeEventListener('loadedmetadata', onMeta);
      video.removeEventListener('error', onError);
      video.removeEventListener('seeked', onSeeked);
      video.removeEventListener('loadeddata', onCanPlay);
      gestures.forEach((g) => window.removeEventListener(g, unlock));
    };
  }, [src, reduced, staticMode]);

  /* -------------------------------------------------- scroll -> target time */
  useEffect(() => {
    if (reduced) return;
    const section = sectionRef.current;
    if (!section) return;

    let ticking = false;
    const update = () => {
      ticking = false;
      const rect = section.getBoundingClientRect();
      const scrollable = section.offsetHeight - window.innerHeight;
      const p = scrollable > 0 ? Math.min(Math.max(-rect.top / scrollable, 0), 1) : 0;
      const d = durationRef.current;
      if (d > 0) targetTime.current = p * (d - 0.03);
    };
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [reduced]);

  return (
    <section
      ref={sectionRef}
      id="hero-scroll"
      aria-label="Apex Rosario — hero film"
      className="hero-scroll relative w-full bg-navy"
      style={{ height: reduced ? undefined : `${scrollVh}vh` }}
    >
      <div className="hero-sticky sticky top-0 h-[100svh] w-full overflow-hidden bg-navy">
        <div className="absolute inset-0">
          {/* poster / static fallback */}
          <picture>
            {!isMobile && <source srcSet={hero.poster} type="image/webp" />}
            <img
              src={isMobile ? hero.posterMobile : hero.posterFallback}
              alt={hero.alt}
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
                painted && !staticMode ? 'opacity-0' : 'opacity-100'
              }`}
              fetchPriority="high"
            />
          </picture>

          {src && !reduced && !staticMode && (
            <video
              key={src}
              ref={videoRef}
              className="absolute inset-0 h-full w-full object-cover"
              src={src}
              poster={isMobile ? hero.posterMobile : hero.posterFallback}
              muted
              playsInline
              preload="auto"
              // deliberately NOT autoplay / loop / controls
              aria-hidden
            />
          )}
        </div>

        {/* subtle top scrim — no text over the film */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-navy/40 to-transparent"
        />

        {/* loading state — only while nothing is on screen yet */}
        {!ready && !painted && !staticMode && (
          <div className="absolute inset-0 flex items-center justify-center bg-navy/25">
            <span className="h-8 w-8 animate-spin rounded-full border border-pearl/25 border-t-gold" />
          </div>
        )}

        <p className="sr-only">
          A drone film of Apex Rosario. Scroll down to move the film forward and scroll up to move it back; the
          film is replaced by a still image when reduced motion is preferred.
        </p>
      </div>
    </section>
  );
}
