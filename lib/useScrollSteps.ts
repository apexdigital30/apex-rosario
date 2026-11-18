'use client';

import { useEffect, useState, type RefObject } from 'react';

/**
 * Buckets scroll progress through `sectionRef` into `count` discrete steps —
 * for a pinned image sequence where one slide is on screen at a time, rather
 * than a continuously-scrubbed video. Returns the active slide index and the
 * raw 0–1 progress through the whole section (useful for a segmented bar).
 */
export function useScrollSteps(sectionRef: RefObject<HTMLElement>, count: number) {
  const [index, setIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || count <= 0) return;

    let ticking = false;
    const update = () => {
      ticking = false;
      const rect = section.getBoundingClientRect();
      const scrollable = section.offsetHeight - window.innerHeight;
      const p = scrollable > 0 ? Math.min(Math.max(-rect.top / scrollable, 0), 1) : 0;
      setProgress(p);
      setIndex(Math.min(count - 1, Math.floor(p * count)));
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
  }, [sectionRef, count]);

  return { index, progress } as const;
}
