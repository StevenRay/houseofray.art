import { SITE_URL, absoluteUrl } from '../data/site';
import {
  BRUCE_WOOD_DANCE,
  DALLAS_BLACK_DANCE_THEATRE,
  DBDT_ENCORE,
  PERSON_ID,
  TEXAS_BALLET_THEATER,
  WEBSITE_ID,
  dallas,
} from './schema';

type JsonLdNode = Record<string, unknown>;

type PageOptions = {
  path: string;
  type?: string | string[];
  name: string;
  description: string;
  image?: string;
  extra?: JsonLdNode;
};

function pageNode({ path, type = 'WebPage', name, description, image, extra = {} }: PageOptions): JsonLdNode {
  const url = `${SITE_URL}${path}`;
  return {
    '@type': type,
    '@id': `${url}#webpage`,
    url,
    name,
    description,
    isPartOf: { '@id': WEBSITE_ID },
    inLanguage: 'en-US',
    about: { '@id': PERSON_ID },
    ...(image ? { primaryImageOfPage: { '@type': 'ImageObject', url: absoluteUrl(image) } } : {}),
    ...extra,
  };
}

export function homePageSchema(): JsonLdNode[] {
  return [
    pageNode({
      path: '/',
      name: 'Nycole Ray — Dallas Dancer & Choreographer | House of Ray',
      description:
        'Nycole Ray is a dancer, choreographer, and educator in Dallas, Texas, and the artist behind House of Ray.',
      image: '/assets/nycole-purple-foreground.webp',
      extra: { mainEntity: { '@id': PERSON_ID } },
    }),
  ];
}

export function aboutPageSchema(): JsonLdNode[] {
  return [
    pageNode({
      path: '/about/',
      type: 'ProfilePage',
      name: 'About Nycole Ray — Dallas Dancer, Choreographer & Educator',
      description:
        'The biography of Nycole Ray: performances with Dallas Black Dance Theatre and Bruce Wood Dance Dallas, fifteen years directing DBDT: Encore!, and a board seat with the International Association of Blacks in Dance.',
      image: '/assets/nycole-purple-gele-lip-refinement.webp',
      extra: { mainEntity: { '@id': PERSON_ID } },
    }),
  ];
}

/**
 * Each work carries the organisation that commissioned or premiered it, which is
 * how the repertory connects Nycole to Dallas Black Dance Theatre, Bruce Wood
 * Dance Dallas and Texas Ballet Theater in a machine-readable way.
 *
 * Only credits already published on /work/ appear here.
 */
const REPERTORY: { name: string; year?: string; commissionedBy?: JsonLdNode; description?: string }[] = [
  { name: 'International Woman', year: '2025', commissionedBy: TEXAS_BALLET_THEATER },
  { name: 'Diaspora', year: '2022', commissionedBy: DALLAS_BLACK_DANCE_THEATRE },
  { name: 'Rising' },
  { name: 'Nineteenth', year: '2021', description: 'Created for the centennial of the 19th Amendment.' },
  { name: 'Love Songs' },
  { name: 'The Breath Within' },
  { name: 'Opaque' },
  { name: 'Above & Below', description: 'Created in tribute to Bruce Wood.', commissionedBy: BRUCE_WOOD_DANCE },
  { name: 'Reminisce', year: '2020', commissionedBy: DALLAS_BLACK_DANCE_THEATRE },
  {
    name: 'Samson and Delilah',
    description: 'Opera choreography.',
    commissionedBy: { '@type': 'PerformingGroup', name: 'The Dallas Opera' },
  },
  { name: 'Frida, Frida and Frida', commissionedBy: { '@type': 'Organization', name: 'Dallas Museum of Art' } },
];

export function workPageSchema(): JsonLdNode[] {
  return [
    pageNode({
      path: '/work/',
      type: 'CollectionPage',
      name: 'Choreography by Nycole Ray — Repertory | House of Ray',
      description:
        'Selected choreography by Nycole Ray, commissioned by Texas Ballet Theater, Dallas Black Dance Theatre, The Dallas Opera, and Dallas Museum of Art.',
      extra: {
        mainEntity: {
          '@type': 'ItemList',
          name: 'Choreographic works by Nycole Ray',
          numberOfItems: REPERTORY.length,
          itemListElement: REPERTORY.map((work, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            item: {
              '@type': 'CreativeWork',
              name: work.name,
              creator: { '@id': PERSON_ID },
              genre: 'Dance',
              ...(work.year ? { dateCreated: work.year } : {}),
              ...(work.description ? { description: work.description } : {}),
              ...(work.commissionedBy ? { sourceOrganization: work.commissionedBy } : {}),
            },
          })),
        },
      },
    }),
  ];
}

export function videoPageSchema(): JsonLdNode[] {
  // TODO(nycole): add VideoObject markup once each Vimeo clip has a thumbnail URL,
  // upload date and duration — Google requires all three for video rich results.
  return [
    pageNode({
      path: '/video/',
      type: 'CollectionPage',
      name: 'Nycole Ray Choreography on Film | House of Ray',
      description: 'Performance documentation of choreography by Nycole Ray.',
    }),
  ];
}

export function teachingPageSchema(): JsonLdNode[] {
  return [
    pageNode({
      path: '/teaching/',
      name: 'Master Classes & Residencies with Nycole Ray | House of Ray',
      description:
        'Nycole Ray teaches master classes, guest artist residencies, and speaking engagements as a certified Dunham Technique Instructor.',
      extra: {
        mainEntity: {
          '@type': 'Service',
          name: 'Dance teaching and residencies with Nycole Ray',
          serviceType: ['Master class', 'Guest artist residency', 'Speaking engagement'],
          provider: { '@id': PERSON_ID },
          areaServed: { '@type': 'Country', name: 'United States' },
        },
      },
    }),
  ];
}

export function pressPageSchema(): JsonLdNode[] {
  return [
    pageNode({
      path: '/press/',
      type: 'CollectionPage',
      name: 'Nycole Ray in the Press | House of Ray',
      description:
        'Coverage of Nycole Ray in Pointe Magazine, KERA News, The Dallas Morning News, D Magazine, and more.',
    }),
  ];
}

export function contactPageSchema(): JsonLdNode[] {
  return [
    pageNode({
      path: '/contact/',
      type: 'ContactPage',
      name: 'Contact Nycole Ray — Commissions & Bookings | House of Ray',
      description:
        'Enquire about choreography commissions, guest artist residencies, master classes, and speaking engagements with Nycole Ray in Dallas, Texas.',
    }),
  ];
}

export function danceAfricaPageSchema(): JsonLdNode[] {
  return [
    pageNode({
      path: '/dance-africa/',
      name: 'DanceAfrica 2026 — Nycole Ray, Mistress of Ceremonies | House of Ray',
      description:
        'Photographs from DanceAfrica 2026, presented by Dallas Black Dance Theatre at Moody Performance Hall, where Nycole Ray served as Mistress of Ceremonies.',
      image: '/assets/dance-africa/img_9853.webp',
      extra: { mainEntity: { '@id': `${SITE_URL}/dance-africa/#event` } },
    }),
    {
      '@type': 'DanceEvent',
      '@id': `${SITE_URL}/dance-africa/#event`,
      name: 'DanceAfrica 2026',
      startDate: '2026-10-09',
      endDate: '2026-10-10',
      eventStatus: 'https://schema.org/EventScheduled',
      eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
      description:
        'A celebration of traditional and contemporary African dance with live drumming, featuring Dallas Black Dance Theatre, DBDT: Encore, Dallas Black Dance Academy’s performing ensembles, and guest artists including Bandan Koro.',
      url: `${SITE_URL}/dance-africa/`,
      sameAs: 'https://attpac.org/event/danceafrica-2026',
      image: absoluteUrl('/assets/dance-africa/img_9853.webp'),
      location: {
        '@type': 'PerformingArtsTheater',
        name: 'Moody Performance Hall',
        address: dallas(),
      },
      organizer: DALLAS_BLACK_DANCE_THEATRE,
      performer: [
        DALLAS_BLACK_DANCE_THEATRE,
        DBDT_ENCORE,
        { '@type': 'PerformingGroup', name: 'Dallas Black Dance Academy' },
        { '@type': 'PerformingGroup', name: 'Bandan Koro' },
      ],
      subjectOf: { '@id': `${SITE_URL}/dance-africa/#webpage` },
      contributor: {
        '@type': 'Role',
        roleName: 'Mistress of Ceremonies',
        contributor: { '@id': PERSON_ID },
      },
    },
  ];
}
