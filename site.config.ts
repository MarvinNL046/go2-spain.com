// =============================================================================
// site.config.ts - Central configuration for Go2Spain
// =============================================================================

export interface SiteConfig {
  name: string;
  domain: string;
  destination: string;
  destinationFull: string;
  tagline: string;
  colors: {
    primary: Record<string, string>;
    secondary: Record<string, string>;
    accent: Record<string, string>;
  };
  locales: string[];
  defaultLocale: string;
  affiliateLinks: {
    booking: string;
    tripcom: string;
    transport: string;
    esim: string;
    getYourGuide: string;
    klook: string;
    viator: string;
  };
  seo: {
    siteUrl: string;
    ogImage: string;
    twitterHandle: string;
    googleAnalyticsId: string;
    indexNowKey: string;
  };
  contentTypes: {
    cities: boolean;
    islands: boolean;
    food: boolean;
    drinks: boolean;
    transport: boolean;
    visa: boolean;
    regions: boolean;
    weather: boolean;
    blog: boolean;
    comparisons: boolean;
    top10: boolean;
    practicalInfo: boolean;
  };
  navigation: {
    mainLinks: Array<{ key: string; href: string }>;
    dropdowns: Array<{
      key: string;
      items: Array<{ key: string; href: string }>;
    }>;
  };
  sisterSites: Array<{
    name: string;
    domain: string;
    destination: string;
  }>;
}

const ALL_SISTER_SITES: SiteConfig['sisterSites'] = [
  { name: 'Go2Thailand', domain: 'go2-thailand.com', destination: 'Thailand' },
  { name: 'Go2Bali', domain: 'go2-bali.com', destination: 'Bali' },
  { name: 'Go2China', domain: 'go2-china.com', destination: 'China' },
  { name: 'Go2France', domain: 'go2-france.com', destination: 'France' },
  { name: 'Go2India', domain: 'go2-india.com', destination: 'India' },
  { name: 'Go2Japan', domain: 'go2-japan.com', destination: 'Japan' },
  { name: 'Go2Mexico', domain: 'go2-mexico.com', destination: 'Mexico' },
  { name: 'Go2Morocco', domain: 'go2-morocco.com', destination: 'Morocco' },
  { name: 'Go2Spain', domain: 'go2-spain.com', destination: 'Spain' },
  { name: 'Go2USA', domain: 'go2-usa.com', destination: 'USA' },
  { name: 'Go2Vietnam', domain: 'go2-vietnam.com', destination: 'Vietnam' },
];

export const siteConfig: SiteConfig = {
  name: 'Go2Spain',
  domain: 'go2-spain.com',
  destination: 'Spain',
  destinationFull: 'Spain',
  tagline: 'Your Ultimate Spain Travel Guide',

  // Spanish flag: rojo y gualda (red + yellow-gold)
  colors: {
    primary: {
      DEFAULT: '#C60B1E',
      '50': '#FEF2F2',
      '100': '#FEE2E3',
      '200': '#FECACC',
      '300': '#FCA5A9',
      '400': '#F87177',
      '500': '#C60B1E',
      '600': '#A80919',
      '700': '#8A0715',
      '800': '#6C0610',
      '900': '#4E040C',
    },
    secondary: {
      DEFAULT: '#1A1A2E',
      '50': '#F8F8FA',
      '100': '#F0F0F4',
      '200': '#E0E0E8',
      '300': '#CCCCDA',
      '400': '#9999B0',
      '500': '#1A1A2E',
      '600': '#151526',
      '700': '#10101E',
      '800': '#0B0B17',
      '900': '#070710',
    },
    accent: {
      DEFAULT: '#FFC400',
      '50': '#FFFBEB',
      '100': '#FEF3C7',
      '200': '#FDE68A',
      '300': '#FCD34D',
      '400': '#FBBF24',
      '500': '#FFC400',
      '600': '#D9A600',
      '700': '#B38800',
      '800': '#8C6B00',
      '900': '#664E00',
    },
  },

  locales: ['en', 'es', 'nl', 'de', 'fr', 'it', 'zh', 'ja'],
  defaultLocale: 'en',

  affiliateLinks: {
    booking: 'https://booking.tpo.lv/2PT1kR82',
    tripcom: 'https://trip.tpo.lv/TmObooZ5',
    transport: 'https://12go.tpo.lv/tNA80urD',
    esim: 'https://saily.tpo.lv/rf9lidnE',
    getYourGuide: 'https://getyourguide.tpo.lv/6HngJ5FC',
    klook: 'https://klook.tpo.lv/7Dt6WApj',
    viator: 'https://viator.tpo.lv/TUcQTS5u',
  },

  seo: {
    siteUrl: 'https://go2-spain.com',
    ogImage: '/images/og-default.jpg',
    twitterHandle: 'go2spain',
    googleAnalyticsId: 'G-H0NJG4SRE7',
    indexNowKey: '',
  },

  contentTypes: {
    cities: true,
    islands: true,  // Canary Islands, Balearic Islands
    food: true,
    drinks: true,
    transport: true,
    visa: true,
    regions: true,
    weather: true,
    blog: true,
    comparisons: true,
    top10: true,
    practicalInfo: true,
  },

  navigation: {
    mainLinks: [
      { key: 'nav.home', href: '/' },
      { key: 'nav.cities', href: '/city/' },
      { key: 'nav.islands', href: '/islands/' },
      { key: 'nav.transport', href: '/transport/' },
      { key: 'nav.visa', href: '/visa/' },
      { key: 'nav.blog', href: '/blog/' },
    ],
    dropdowns: [
      {
        key: 'nav.foodDrinks',
        items: [
          { key: 'nav.food', href: '/food/' },
          { key: 'nav.drinks', href: '/drinks/' },
        ],
      },
      {
        key: 'nav.explore',
        items: [
          { key: 'nav.regions', href: '/region/' },
          { key: 'nav.weather', href: '/weather/' },
          { key: 'nav.top10', href: '/top-10/' },
          { key: 'nav.practicalInfo', href: '/practical-info/' },
        ],
      },
    ],
  },

  sisterSites: ALL_SISTER_SITES,
};

export function getSisterSiteUrl(destination: string): string | undefined {
  const site = ALL_SISTER_SITES.find(
    (s) => s.destination.toLowerCase() === destination.toLowerCase()
  );
  return site ? `https://${site.domain}` : undefined;
}

export function getOtherSisterSites(): SiteConfig['sisterSites'] {
  return ALL_SISTER_SITES.filter(
    (s) => s.domain !== siteConfig.domain
  );
}

export function getTailwindColors() {
  return {
    primary: siteConfig.colors.primary,
    secondary: siteConfig.colors.secondary,
    accent: siteConfig.colors.accent,
  };
}

export function isContentTypeEnabled(
  type: keyof SiteConfig['contentTypes']
): boolean {
  return siteConfig.contentTypes[type];
}

export function getActiveNavigation() {
  const contentTypeRouteMap: Record<string, keyof SiteConfig['contentTypes']> = {
    '/city/': 'cities',
    '/islands/': 'islands',
    '/food/': 'food',
    '/drinks/': 'drinks',
    '/transport/': 'transport',
    '/visa/': 'visa',
    '/region/': 'regions',
    '/weather/': 'weather',
    '/blog/': 'blog',
    '/top-10/': 'top10',
    '/practical-info/': 'practicalInfo',
    '/compare/': 'comparisons',
  };

  const isRouteActive = (href: string): boolean => {
    const contentType = contentTypeRouteMap[href];
    if (!contentType) return true;
    return siteConfig.contentTypes[contentType];
  };

  return {
    mainLinks: siteConfig.navigation.mainLinks.filter((link) =>
      isRouteActive(link.href)
    ),
    dropdowns: siteConfig.navigation.dropdowns
      .map((dropdown) => ({
        ...dropdown,
        items: dropdown.items.filter((item) => isRouteActive(item.href)),
      }))
      .filter((dropdown) => dropdown.items.length > 0),
  };
}

export default siteConfig;
