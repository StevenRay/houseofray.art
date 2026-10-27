import type { APIRoute } from 'astro';
import { SITE_URL } from '../data/site';

export const prerender = true;

/**
 * The site has a single small sitemap, so this index exists only so that
 * /sitemap-index.xml — the default name Astro's sitemap integration uses, and a
 * URL already referenced externally — resolves instead of returning 404.
 */
export const GET: APIRoute = () => {
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${SITE_URL}/sitemap.xml</loc>
  </sitemap>
</sitemapindex>
`;

  return new Response(body, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};
