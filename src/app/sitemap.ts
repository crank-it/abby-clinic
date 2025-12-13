import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://abby.clinic';

  // Public pages to include in sitemap
  const routes = [
    '',
    '/about',
    '/how-it-works',
    '/pricing',
    '/faq',
    '/thank-you-cliniko',
    '/legal/privacy',
    '/legal/terms',
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'weekly' : 'monthly',
    priority: route === '' ? 1 : route === '/pricing' ? 0.9 : 0.7,
  }));
}
