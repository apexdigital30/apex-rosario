import Link from 'next/link';
import { Logo } from '@/components/Logo';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-navy px-6 text-center text-pearl">
      <Logo variant="light" className="h-10" />
      <p className="mt-10 font-display text-5xl font-medium">Page not found</p>
      <p className="mt-4 max-w-sm text-pearl/70">
        The page you were looking for isn’t here. Let’s take you back to Apex Rosario.
      </p>
      <Link
        href="/"
        className="mt-8 rounded-full bg-pearl px-6 py-3 text-xs font-medium uppercase tracking-[0.18em] text-navy transition-colors hover:bg-gold"
      >
        Return home
      </Link>
    </div>
  );
}
