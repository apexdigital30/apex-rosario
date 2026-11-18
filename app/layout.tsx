import type { Metadata, Viewport } from 'next';
import { Bodoni_Moda, Jost, Marcellus } from 'next/font/google';
import './globals.css';
import { project, siteMeta, legal, compliance } from '@/data/rosario';

const display = Bodoni_Moda({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-display',
  display: 'swap',
});

const sans = Jost({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-sans',
  display: 'swap',
});

const deco = Marcellus({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-deco',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(project.url),
  title: {
    default: siteMeta.title,
    template: '%s | Apex Rosario',
  },
  description: siteMeta.description,
  applicationName: 'Apex Rosario',
  keywords: [
    'Apex Rosario',
    'Rosario Ghaziabad',
    'Apex Group',
    'Siddharth Vihar Ghaziabad',
    '3 BHK Siddharth Vihar',
    '4 BHK Siddharth Vihar',
    'luxury apartments Ghaziabad',
  ],
  authors: [{ name: 'Apex Group' }],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    title: siteMeta.title,
    description: siteMeta.description,
    url: project.url,
    siteName: 'Apex Rosario',
    locale: 'en_IN',
    images: siteMeta.ogImage
      ? [{ url: siteMeta.ogImage, width: 941, height: 1672, alt: 'Apex Rosario by The Apex Group — four towers, five domes (artist’s impression)' }]
      : undefined,
  },
  twitter: {
    card: 'summary_large_image',
    title: siteMeta.title,
    description: siteMeta.description,
    images: siteMeta.ogImage ? [siteMeta.ogImage] : undefined,
  },
  // Kept out of search engines until RERA + branding are signed off.
  robots: compliance.approvedForPublic ? { index: true, follow: true } : { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: '#623736',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${project.url}#apex-group`,
      name: 'Apex Group',
      url: 'https://www.theapexgroup.in',
      address: {
        '@type': 'PostalAddress',
        streetAddress: legal.registeredAddress,
        addressLocality: 'Delhi',
        addressRegion: 'Delhi',
        addressCountry: 'IN',
      },
    },
    {
      '@type': 'ApartmentComplex',
      '@id': `${project.url}#apex-rosario`,
      name: 'Apex Rosario',
      description: siteMeta.description,
      url: project.url,
      containedInPlace: project.location,
      address: {
        '@type': 'PostalAddress',
        streetAddress: legal.siteAddress,
        addressLocality: 'Ghaziabad',
        addressRegion: 'Uttar Pradesh',
        addressCountry: 'IN',
      },
      developer: { '@id': `${project.url}#apex-group` },
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Apex Group', item: 'https://www.theapexgroup.in' },
        { '@type': 'ListItem', position: 2, name: 'Apex Rosario', item: project.url },
      ],
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable} ${deco.variable}`}>
      <body suppressHydrationWarning>
        <a
          href="#overview"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[120] focus:rounded focus:bg-navy focus:px-4 focus:py-2 focus:text-pearl"
        >
          Skip to content
        </a>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
