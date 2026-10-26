export const SITE_URL = 'https://houseofray.art';
export const SITE_NAME = 'House of Ray';
export const CONTACT_EMAIL = 'houseofray.art@gmail.com';

/**
 * Profile URLs for Nycole Ray that search engines can use to confirm this is the
 * same person. Only add URLs that are hers and publicly live — a wrong entry
 * here tells Google the wrong thing about her identity.
 *
 * TODO(nycole): supply Instagram, LinkedIn, Vimeo, YouTube and any company
 * roster page (Dallas Black Dance Theatre, Bruce Wood Dance, IABD) so these can
 * be added to the Person schema's sameAs list.
 */
export const SOCIAL_PROFILES: string[] = [];

export type SitemapEntry = { path: string; changefreq: string; priority: string };

/** Every indexable page, in the order they should be crawled. */
export const SITEMAP_PAGES: SitemapEntry[] = [
  { path: '/', changefreq: 'monthly', priority: '1.0' },
  { path: '/about/', changefreq: 'monthly', priority: '0.9' },
  { path: '/work/', changefreq: 'monthly', priority: '0.9' },
  { path: '/video/', changefreq: 'monthly', priority: '0.7' },
  { path: '/teaching/', changefreq: 'monthly', priority: '0.8' },
  { path: '/press/', changefreq: 'monthly', priority: '0.7' },
  { path: '/dance-africa/', changefreq: 'yearly', priority: '0.6' },
  { path: '/contact/', changefreq: 'yearly', priority: '0.6' },
];

export function absoluteUrl(pathOrUrl: string): string {
  return new URL(pathOrUrl, SITE_URL).href;
}

/**
 * Normalises a request path to the single canonical form the sitemap uses:
 * apex domain, lowercase, one trailing slash.
 */
export function canonicalUrl(pathname: string): string {
  const trimmed = pathname.replace(/\/+$/, '').toLowerCase();
  return `${SITE_URL}${trimmed === '' ? '/' : `${trimmed}/`}`;
}
