import type { MetadataRoute } from 'next';
import { project, compliance } from '@/data/rosario';

export default function robots(): MetadataRoute.Robots {
  // Kept out of search engines until RERA + branding are signed off.
  if (!compliance.approvedForPublic) return { rules: { userAgent: '*', disallow: '/' } };
  return {
    rules: { userAgent: '*', allow: '/', disallow: ['/thank-you', '/api/'] },
    sitemap: `${project.url}/sitemap.xml`,
  };
}
