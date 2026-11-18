'use client';

import { useEffect } from 'react';
import { useReveal } from '@/lib/hooks';
import { ScrollTrigger } from '@/lib/gsap';

export default function RevealProvider() {
  useReveal();
  useEffect(() => {
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
    if (!window.location.hash) window.scrollTo(0, 0);

    const t1 = window.setTimeout(() => ScrollTrigger.refresh(), 400);
    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener('load', onLoad);
    return () => {
      clearTimeout(t1);
      window.removeEventListener('load', onLoad);
    };
  }, []);
  return null;
}
