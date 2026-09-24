import settings from '../data/settings.json';
import { servicePageUrl } from './serviceUrls';

export const SITE = 'https://kisselremodeling.com';
export const BUSINESS_ID = `${SITE}/#business`;

export { settings };

type BreadcrumbItem = { name: string; path: string };

export function breadcrumbList(items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: `${SITE}${item.path}`,
    })),
  };
}

type ReviewInput = { name: string; text: string; rating: number };

export function reviewSchema(review: ReviewInput) {
  return {
    '@type': 'Review',
    author: { '@type': 'Person', name: review.name },
    reviewRating: { '@type': 'Rating', ratingValue: review.rating, bestRating: 5 },
    reviewBody: review.text,
  };
}

export function businessJsonLd(opts: { reviews?: ReviewInput[]; extra?: Record<string, unknown> } = {}) {
  const areaServed = [...settings.serviceAreas, ...settings.extendedServiceAreas].map((city) => ({
    '@type': 'City',
    name: city,
  }));
  return {
    '@context': 'https://schema.org',
    '@type': 'HomeAndConstructionBusiness',
    '@id': BUSINESS_ID,
    name: "Kissel's Bath and Kitchen",
    image: `${SITE}/images/og-image.jpg`,
    url: SITE,
    telephone: '+1-720-705-1461',
    email: settings.email,
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '16797 E 2nd Ave',
      addressLocality: 'Aurora',
      addressRegion: 'CO',
      postalCode: '80011',
      addressCountry: 'US',
    },
    geo: { '@type': 'GeoCoordinates', latitude: 39.7196944, longitude: -104.7925253 },
    areaServed,
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '08:00',
        closes: '18:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Saturday',
        opens: '09:00',
        closes: '14:00',
      },
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: settings.rating,
      reviewCount: settings.reviewCount,
    },
    // Verified business profiles (Google Maps place URL confirmed against the live GBP card)
    sameAs: [
      "https://www.google.com/maps/place/Kissel's+Bath+for+US/@39.7196944,-104.7925253,17z/data=!4m6!3m5!1s0x876c7dca5fdaf431:0xc0d4d25ad129929e!8m2!3d39.7196944!4d-104.7925253!16s%2Fg%2F11h94tpl17",
      'https://www.houzz.com/professionals/kitchen-and-bath-remodelers/kissel-s-bath-for-us-pfvwus-pf~221904293',
      'https://www.facebook.com/bath4us',
    ],
    ...(opts.reviews ? { review: opts.reviews.map(reviewSchema) } : {}),
    ...(opts.extra ?? {}),
  };
}

type ServiceEntry = {
  data: {
    title: string;
    shortDescription: string;
    priceFrom?: number;
    priceLabel: string;
    duration: string;
    category: string;
  };
  slug: string;
};

export function serviceOffers(services: ServiceEntry[]) {
  return services.map((s) => ({
    '@type': 'Offer',
    url: `${SITE}${servicePageUrl(s.slug)}`,
    ...(s.data.priceFrom
      ? {
          price: s.data.priceFrom,
          priceCurrency: 'USD',
          priceValidUntil: '2026-12-31',
        }
      : {}),
    itemOffered: {
      '@type': 'Service',
      name: s.data.title,
      description: s.data.shortDescription,
      serviceType: s.data.category === 'bathroom' ? 'Bathroom Remodeling' : 'Kitchen Remodeling',
      provider: { '@id': BUSINESS_ID },
      areaServed: settings.serviceAreas.map((city) => ({ '@type': 'City', name: city })),
    },
  }));
}

export function offerCatalogJsonLd(services: ServiceEntry[], name: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'OfferCatalog',
    name,
    provider: { '@id': BUSINESS_ID },
    itemListElement: serviceOffers(services),
  };
}

export function servicesPageJsonLd(services: ServiceEntry[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Bathroom & Kitchen Remodeling Services',
    provider: { '@id': BUSINESS_ID },
    areaServed: settings.serviceAreas.map((city) => ({ '@type': 'City', name: city })),
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Bathroom & Kitchen Remodeling Packages',
      itemListElement: serviceOffers(services),
    },
  };
}

export function faqPageJsonLd(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  };
}
