'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

type Transform = { scale: number; x: number; y: number };
const IDENTITY: Transform = { scale: 1, x: 0, y: 0 };
const MIN = 1;
const MAX = 5;

export type ViewerImage = { src: string; alt: string; label?: string };

export function ImageZoomViewer({
  images,
  index,
  onIndexChange,
  className = '',
  heightClass = 'h-[62vh]',
}: {
  images: ViewerImage[];
  index: number;
  onIndexChange?: (i: number) => void;
  className?: string;
  heightClass?: string;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const [t, setT] = useState<Transform>(IDENTITY);
  const [isFs, setIsFs] = useState(false);
  const pointers = useRef<Map<number, { x: number; y: number }>>(new Map());
  const pinchStart = useRef<{ dist: number; scale: number } | null>(null);
  const panStart = useRef<{ x: number; y: number; tx: number; ty: number } | null>(null);

  const img = images[index];
  const many = images.length > 1;

  const clampPan = useCallback((next: Transform): Transform => {
    const el = stageRef.current;
    if (!el) return next;
    const r = el.getBoundingClientRect();
    const maxX = ((next.scale - 1) * r.width) / 2;
    const maxY = ((next.scale - 1) * r.height) / 2;
    return {
      scale: next.scale,
      x: Math.max(-maxX, Math.min(maxX, next.x)),
      y: Math.max(-maxY, Math.min(maxY, next.y)),
    };
  }, []);

  const zoomBy = useCallback(
    (factor: number, originX?: number, originY?: number) => {
      setT((prev) => {
        const scale = Math.max(MIN, Math.min(MAX, prev.scale * factor));
        if (scale === prev.scale) return prev;
        const el = stageRef.current;
        if (!el || originX == null || originY == null) return clampPan({ scale, x: prev.x, y: prev.y });
        const r = el.getBoundingClientRect();
        const cx = originX - r.left - r.width / 2;
        const cy = originY - r.top - r.height / 2;
        const ratio = scale / prev.scale;
        return clampPan({
          scale,
          x: prev.x - (cx - prev.x) * (ratio - 1),
          y: prev.y - (cy - prev.y) * (ratio - 1),
        });
      });
    },
    [clampPan],
  );

  const reset = useCallback(() => setT(IDENTITY), []);
  useEffect(() => setT(IDENTITY), [index]);

  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      if (!e.ctrlKey && Math.abs(e.deltaY) < 2) return;
      e.preventDefault();
      zoomBy(e.deltaY < 0 ? 1.12 : 1 / 1.12, e.clientX, e.clientY);
    };
    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, [zoomBy]);

  const onPointerDown = (e: React.PointerEvent) => {
    (e.target as Element).setPointerCapture?.(e.pointerId);
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (pointers.current.size === 1) panStart.current = { x: e.clientX, y: e.clientY, tx: t.x, ty: t.y };
    else if (pointers.current.size === 2) {
      const [a, b] = [...pointers.current.values()];
      pinchStart.current = { dist: Math.hypot(a.x - b.x, a.y - b.y), scale: t.scale };
    }
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!pointers.current.has(e.pointerId)) return;
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (pointers.current.size === 2 && pinchStart.current) {
      const [a, b] = [...pointers.current.values()];
      const dist = Math.hypot(a.x - b.x, a.y - b.y);
      const scale = Math.max(MIN, Math.min(MAX, (pinchStart.current.scale * dist) / pinchStart.current.dist));
      setT((prev) => clampPan({ ...prev, scale }));
      return;
    }
    if (pointers.current.size === 1 && panStart.current && t.scale > 1) {
      const dx = e.clientX - panStart.current.x;
      const dy = e.clientY - panStart.current.y;
      setT((prev) => clampPan({ ...prev, x: panStart.current!.tx + dx, y: panStart.current!.ty + dy }));
    }
  };
  const onPointerUp = (e: React.PointerEvent) => {
    pointers.current.delete(e.pointerId);
    if (pointers.current.size < 2) pinchStart.current = null;
    if (pointers.current.size === 0) panStart.current = null;
  };

  const toggleFs = useCallback(() => {
    const el = wrapRef.current;
    if (!el) return;
    if (!document.fullscreenElement) el.requestFullscreen?.().catch(() => {});
    else document.exitFullscreen?.();
  }, []);
  useEffect(() => {
    const onFs = () => setIsFs(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', onFs);
    return () => document.removeEventListener('fullscreenchange', onFs);
  }, []);

  const onKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case '+':
      case '=':
        e.preventDefault();
        zoomBy(1.25);
        break;
      case '-':
        e.preventDefault();
        zoomBy(1 / 1.25);
        break;
      case '0':
        reset();
        break;
      case 'f':
      case 'F':
        toggleFs();
        break;
      case 'ArrowRight':
        if (many && onIndexChange) {
          e.preventDefault();
          onIndexChange((index + 1) % images.length);
        }
        break;
      case 'ArrowLeft':
        if (many && onIndexChange) {
          e.preventDefault();
          onIndexChange((index - 1 + images.length) % images.length);
        }
        break;
    }
  };

  const ctrlBtn =
    'flex h-11 min-w-[44px] items-center justify-center rounded-full border border-navy/15 bg-pearl px-3.5 text-sm text-navy shadow-sm transition-colors hover:border-gold hover:text-gold disabled:opacity-40';

  return (
    <div
      ref={wrapRef}
      className={`relative flex flex-col bg-stone/25 ${isFs ? 'h-screen' : ''} ${className}`}
    >
      <div
        ref={stageRef}
        role="group"
        aria-label={`Zoomable image: ${img.label || img.alt}. Use plus and minus to zoom, arrow keys and drag to pan.`}
        tabIndex={0}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onKeyDown={onKeyDown}
        onDoubleClick={(e) => (t.scale > 1 ? reset() : zoomBy(2, e.clientX, e.clientY))}
        style={{ touchAction: t.scale > 1 ? 'none' : 'pan-y' }}
        className={`relative select-none overflow-hidden ${isFs ? 'flex-1' : heightClass} ${
          t.scale > 1 ? 'cursor-grab active:cursor-grabbing' : 'cursor-zoom-in'
        }`}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          key={img.src}
          src={img.src}
          alt={img.alt}
          draggable={false}
          className="absolute left-1/2 top-1/2 max-h-full max-w-full -translate-x-1/2 -translate-y-1/2 animate-fade-in object-contain"
          style={{
            transform: `translate(-50%, -50%) translate(${t.x}px, ${t.y}px) scale(${t.scale})`,
            transition: pointers.current.size ? 'none' : 'transform 0.18s ease-out',
          }}
        />
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 border-t border-navy/10 bg-pearl px-3 py-2">
        <div className="flex items-center gap-1.5">
          <button type="button" className={ctrlBtn} onClick={() => zoomBy(1 / 1.25)} aria-label="Zoom out">
            &minus;
          </button>
          <span className="w-12 text-center text-xs tabular-nums text-navy/60">
            {Math.round(t.scale * 100)}%
          </span>
          <button type="button" className={ctrlBtn} onClick={() => zoomBy(1.25)} aria-label="Zoom in">
            +
          </button>
          <button type="button" className={ctrlBtn} onClick={reset} aria-label="Reset view">
            Reset
          </button>
        </div>
        <div className="flex items-center gap-1.5">
          {many && onIndexChange && (
            <>
              <button
                type="button"
                className={ctrlBtn}
                onClick={() => onIndexChange((index - 1 + images.length) % images.length)}
                aria-label="Previous plan"
              >
                &larr;
              </button>
              <span className="text-xs tabular-nums text-navy/60">
                {index + 1} / {images.length}
              </span>
              <button
                type="button"
                className={ctrlBtn}
                onClick={() => onIndexChange((index + 1) % images.length)}
                aria-label="Next plan"
              >
                &rarr;
              </button>
            </>
          )}
          <button type="button" className={ctrlBtn} onClick={toggleFs} aria-label="Toggle full screen">
            {isFs ? 'Exit' : 'Full screen'}
          </button>
        </div>
      </div>
    </div>
  );
}
