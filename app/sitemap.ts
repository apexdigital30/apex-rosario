import type { MetadataRoute } from 'next';
import { project, nav } from '@/data/rosario';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: project.url, lastModified: now, changeFrequency: 'monthly', priority: 1 },
    ...nav.map((n) => ({
      url: `${project.url}/#${n.id}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
    { url: `${project.url}/privacy-policy`, lastModified: now, priority: 0.2 },
    { url: `${project.url}/terms`, lastModified: now, priority: 0.2 },
    { url: `${project.url}/disclaimer`, lastModified: now, priority: 0.2 },
  ];
}
