'use client';

import { useEffect, useState } from 'react';

/** Tracks a media query. SSR-safe (returns `false` until mounted). */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    const mql = window.matchMedia(query);
    const onChange = () => setMatches(mql.matches);
    onChange();
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, [query]);
  return matches;
}

export function usePrefersReducedMotion(): boolean {
  return useMediaQuery('(prefers-reduced-motion: reduce)');
}

export function useIsMobile(): boolean {
  return useMediaQuery('(max-width: 768px)');
}

/**
 * Scroll-spy: returns the id of the section currently in view.
 * Uses IntersectionObserver against a header-height-aware root margin.
 */
export function useScrollSpy(ids: string[], headerOffset = 90): string {
  const [active, setActive] = useState(ids[0] ?? '');

  useEffect(() => {
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => !!el);
    if (!sections.length) return;

    const visible = new Map<string, number>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.set(entry.target.id, entry.intersectionRatio);
          else visible.delete(entry.target.id);
        }
        if (visible.size) {
          const top = [...visible.entries()].sort((a, b) => b[1] - a[1])[0][0];
          setActive(top);
        } else {
          // nothing intersecting — pick the last section above the fold
          const scrollY = window.scrollY + headerOffset + 4;
          let current = ids[0];
          for (const s of sections) if (s.offsetTop <= scrollY) current = s.id;
          setActive(current);
        }
      },
      {
        rootMargin: `-${headerOffset}px 0px -55% 0px`,
        threshold: [0, 0.15, 0.3, 0.6, 1],
      },
    );

    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, [ids, headerOffset]);

  return active;
}

/**
 * In-view reveal for elements marked [data-reveal] / [data-focus].
 * Robust against jump-scrolls and slow layout: an IntersectionObserver drives
 * the staggered reveal, a scroll/resize sweep is the fallback, and a safety
 * timer guarantees nothing stays hidden.
 */
export function useReveal() {
  useEffect(() => {
    const html = document.documentElement;
    html.classList.add('reveal-ready');

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const show = (el: HTMLElement, stagger = true) => {
      if (el.classList.contains('is-visible')) return;
      const delay = stagger && !reduce ? Number(el.dataset.revealDelay ?? 0) : 0;
      if (delay) window.setTimeout(() => el.classList.add('is-visible'), delay);
      else el.classList.add('is-visible');
    };

    const all = () =>
      Array.from(
        document.querySelectorAll<HTMLElement>('[data-reveal], [data-focus]'),
      );

    if (reduce) {
      all().forEach((el) => el.classList.add('is-visible'));
      return;
    }

    // 1) primary: IntersectionObserver
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            show(e.target as HTMLElement);
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.12 },
    );
    all().forEach((el) => io.observe(el));

    // 2) fallback sweep on scroll / resize — catches fast jumps IO can miss
    const sweep = () => {
      const vh = window.innerHeight;
      for (const el of all()) {
        if (el.classList.contains('is-visible')) continue;
        const r = el.getBoundingClientRect();
        if (r.top < vh * 0.92 && r.bottom > 0) show(el);
      }
    };
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        sweep();
        ticking = false;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    window.addEventListener('load', sweep);

    // initial pass after first paint
    const raf = requestAnimationFrame(sweep);

    // 3) safety net: never leave content hidden
    const safety = window.setTimeout(() => all().forEach((el) => show(el, false)), 4000);

    return () => {
      io.disconnect();
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      window.removeEventListener('load', sweep);
      cancelAnimationFrame(raf);
      clearTimeout(safety);
    };
  }, []);
}

/** Count-up that runs once when the element enters view. */
export function useCountUp(target: number, decimals = 0, durationMs = 1400) {
  const [value, setValue] = useState(0);
  const [ref, setRef] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (!ref) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setValue(target);
      return;
    }
    let raf = 0;
    let start = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const step = (t: number) => {
          if (!start) start = t;
          const p = Math.min((t - start) / durationMs, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          setValue(Number((target * eased).toFixed(decimals)));
          if (p < 1) raf = requestAnimationFrame(step);
        };
        raf = requestAnimationFrame(step);
      },
      { threshold: 0.4 },
    );
    io.observe(ref);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [ref, target, decimals, durationMs]);

  return { value, setRef } as const;
}
