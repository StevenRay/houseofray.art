import { CONTACT_EMAIL, SITE_NAME, SITE_URL, SOCIAL_PROFILES, absoluteUrl } from '../data/site';

/**
 * Stable @id values so every page can reference the same Person, Organization
 * and WebSite nodes instead of redescribing them.
 */
export const PERSON_ID = `${SITE_URL}/#nycole-ray`;
export const ORGANIZATION_ID = `${SITE_URL}/#house-of-ray`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

type JsonLdNode = Record<string, unknown>;

/**
 * The companies Nycole's work is tied to, each with the organisation's own
 * homepage so search engines resolve them to the right entity rather than
 * guessing from a name string.
 *
 * TODO(nycole): confirm these are the current official homepages before merge.
 */
const DALLAS_BLACK_DANCE_THEATRE: JsonLdNode = {
  '@type': 'PerformingGroup',
  name: 'Dallas Black Dance Theatre',
  alternateName: 'DBDT',
  sameAs: 'https://dbdt.com/',
  address: dallas(),
};

const DBDT_ENCORE: JsonLdNode = {
  '@type': 'PerformingGroup',
  name: 'DBDT: Encore!',
  description: "The second company of Dallas Black Dance Theatre.",
  parentOrganization: { '@type': 'PerformingGroup', name: 'Dallas Black Dance Theatre', sameAs: 'https://dbdt.com/' },
  address: dallas(),
};

const BRUCE_WOOD_DANCE: JsonLdNode = {
  '@type': 'PerformingGroup',
  name: 'Bruce Wood Dance Dallas',
  alternateName: 'Bruce Wood Dance',
  sameAs: 'https://brucewooddance.org/',
  address: dallas(),
};

const IABD: JsonLdNode = {
  '@type': 'Organization',
  name: 'International Association of Blacks in Dance',
  alternateName: 'IABD',
  sameAs: 'https://www.iabdassociation.org/',
};

const TEXAS_BALLET_THEATER: JsonLdNode = {
  '@type': 'PerformingGroup',
  name: 'Texas Ballet Theater',
};

function dallas(): JsonLdNode {
  return {
    '@type': 'PostalAddress',
    addressLocality: 'Dallas',
    addressRegion: 'TX',
    addressCountry: 'US',
  };
}

function withoutEmpty(node: JsonLdNode): JsonLdNode {
  return Object.fromEntries(
    Object.entries(node).filter(([, value]) => {
      if (value === undefined || value === null || value === '') return false;
      if (Array.isArray(value) && value.length === 0) return false;
      return true;
    }),
  );
}

export function personNode(): JsonLdNode {
  return withoutEmpty({
    '@type': 'Person',
    '@id': PERSON_ID,
    name: 'Nycole Ray',
    givenName: 'Nycole',
    familyName: 'Ray',
    url: `${SITE_URL}/about/`,
    mainEntityOfPage: { '@id': `${SITE_URL}/about/#webpage` },
    image: {
      '@type': 'ImageObject',
      url: absoluteUrl('/assets/nycole-purple-gele-lip-refinement.webp'),
      width: 1111,
      height: 1416,
      caption: 'Nycole Ray in purple and ivory couture, a concept portrait for House of Ray.',
    },
    jobTitle: ['Dancer', 'Choreographer', 'Educator'],
    description:
      'Nycole Ray is a dancer, choreographer, and educator based in Dallas, Texas. She performed with Dallas Black Dance Theatre and Bruce Wood Dance Dallas, led DBDT: Encore! as Artistic Director from 2010 to 2025, and serves on the board of the International Association of Blacks in Dance.',
    homeLocation: { '@type': 'Place', name: 'Dallas, Texas', address: dallas() },
    workLocation: { '@type': 'Place', name: 'Dallas, Texas', address: dallas() },
    birthPlace: {
      '@type': 'Place',
      name: 'Detroit, Michigan',
      address: { '@type': 'PostalAddress', addressLocality: 'Detroit', addressRegion: 'MI', addressCountry: 'US' },
    },
    nationality: { '@type': 'Country', name: 'United States' },
    email: `mailto:${CONTACT_EMAIL}`,
    worksFor: { '@id': ORGANIZATION_ID },
    affiliation: [DALLAS_BLACK_DANCE_THEATRE, DBDT_ENCORE, BRUCE_WOOD_DANCE, IABD],
    memberOf: [
      {
        '@type': 'OrganizationRole',
        roleName: 'Board Member',
        memberOf: IABD,
      },
    ],
    alumniOf: [
      { '@type': 'CollegeOrUniversity', name: 'California Institute of the Arts', alternateName: 'CalArts' },
      { '@type': 'EducationalOrganization', name: 'London Contemporary Dance School' },
      { '@type': 'CollegeOrUniversity', name: 'Wayne State University' },
      { '@type': 'EducationalOrganization', name: 'California State Summer School of the Arts' },
    ],
    hasCredential: [
      {
        '@type': 'EducationalOccupationalCredential',
        credentialCategory: 'certification',
        name: 'Certified Dunham Technique Instructor',
      },
      {
        '@type': 'EducationalOccupationalCredential',
        credentialCategory: 'degree',
        name: 'BFA in Dance',
        recognizedBy: { '@type': 'CollegeOrUniversity', name: 'California Institute of the Arts' },
      },
    ],
    award: [
      'Natalie Skelton Award for Artistic Excellence, Dance Council of North Texas, 2013',
      'D Magazine, Women Who Make Dallas Great, 2021',
    ],
    knowsAbout: [
      'Choreography',
      'Modern dance',
      'Dunham Technique',
      'African diaspora dance',
      'Dance education',
      'Artistic direction',
    ],
    knowsLanguage: 'en-US',
    sameAs: SOCIAL_PROFILES,
  });
}

export function organizationNode(): JsonLdNode {
  return withoutEmpty({
    '@type': 'Organization',
    '@id': ORGANIZATION_ID,
    name: SITE_NAME,
    url: `${SITE_URL}/`,
    description:
      'House of Ray is the creative practice of Dallas dancer, choreographer, and educator Nycole Ray, covering choreography commissions, guest artist residencies, master classes, and speaking engagements.',
    founder: { '@id': PERSON_ID },
    employee: { '@id': PERSON_ID },
    email: `mailto:${CONTACT_EMAIL}`,
    address: dallas(),
    areaServed: { '@type': 'Country', name: 'United States' },
    image: absoluteUrl('/social/house-of-ray-v1.png'),
    sameAs: SOCIAL_PROFILES,
    knowsAbout: ['Choreography', 'Dance education', 'Guest artist residencies', 'Master classes'],
  });
}

export function webSiteNode(): JsonLdNode {
  return {
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    url: `${SITE_URL}/`,
    name: SITE_NAME,
    alternateName: 'House of Ray — Nycole Ray',
    description:
      'The official site of Nycole Ray, dancer, choreographer, and educator in Dallas, Texas.',
    inLanguage: 'en-US',
    publisher: { '@id': ORGANIZATION_ID },
    about: { '@id': PERSON_ID },
    copyrightHolder: { '@id': PERSON_ID },
  };
}

export function breadcrumbNode(canonical: string, label: string): JsonLdNode {
  return {
    '@type': 'BreadcrumbList',
    '@id': `${canonical}#breadcrumb`,
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
      { '@type': 'ListItem', position: 2, name: label, item: canonical },
    ],
  };
}

export { BRUCE_WOOD_DANCE, DALLAS_BLACK_DANCE_THEATRE, DBDT_ENCORE, IABD, TEXAS_BALLET_THEATER, dallas };
