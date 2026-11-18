import type { Metadata } from 'next';
import Link from 'next/link';
import { Logo } from '@/components/Logo';
import { contact } from '@/data/rosario';

export const metadata: Metadata = {
  title: 'Thank you',
  robots: { index: false, follow: false },
};

export default function ThankYouPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-navy px-6 text-center text-pearl">
      <Logo variant="light" className="h-10" />
      <p className="mt-10 font-display text-4xl font-medium sm:text-5xl">Thank you.</p>
      <p className="mt-4 max-w-md text-pearl/70">
        Your enquiry for Apex Rosario has been received. The Apex Group team will get back to you
        shortly with availability and next steps.
      </p>
      <p className="mt-6 text-sm text-pearl/60">
        Prefer to write in?{' '}
        <a href={`mailto:${contact.email}`} className="text-gold underline underline-offset-4">
          {contact.email}
        </a>
      </p>
      <Link
        href="/"
        className="mt-9 rounded-full bg-pearl px-6 py-3 text-xs font-medium uppercase tracking-[0.18em] text-navy transition-colors hover:bg-gold"
      >
        Back to Apex Rosario
      </Link>

      {/*
        GA4 / GTM conversion tracking:
        This dedicated URL (/thank-you) is only reached after a confirmed
        successful submission. Fire the conversion event here — e.g. add the
        GTM container in app/layout.tsx and configure a trigger on Page View /
        History Change for the path "/thank-you", or push a dataLayer event
        from a small client component mounted on this page.
      */}
    </div>
  );
}
