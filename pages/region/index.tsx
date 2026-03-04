import { GetStaticProps } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import SEOHead from '../../components/SEOHead';
import Breadcrumbs from '../../components/Breadcrumbs';
import { siteConfig } from '../../site.config';
import { resolveI18n } from '../../utils/i18n';

const { getAllRegions } = require('../../lib/regions');

interface RegionsIndexProps {
  regions: any[];
}

export default function RegionsIndex({ regions }: RegionsIndexProps) {
  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: 'Regions', href: '/region/' }
  ];

  return (
    <>
      <SEOHead
        title={`Spanish Regions Travel Guide - Explore All Regions | ${siteConfig.name}`}
        description="Discover the diverse regions of Spain. From the flamenco heartland of Andalusia to the beaches of Catalonia, explore each region's unique character, cities and attractions."
      >
        <meta name="keywords" content="Spanish regions, Spain travel guide, Andalusia, Catalonia, Basque Country, Castile, Galicia, Spanish regions guide" />
      </SEOHead>

      <div className="min-h-screen bg-surface-cream">
        <section className="relative bg-surface-dark py-20">
          <div className="relative container-custom text-center text-white">
            <p className="font-script text-spain-gold mb-2">Explore Spain</p>
            <h1 className="text-4xl lg:text-5xl font-heading font-bold mb-4">Regions of Spain</h1>
            <p className="text-xl max-w-3xl mx-auto">
              Spain is a mosaic of diverse regions, each with its own culture, cuisine, landscapes and traditions. Discover your perfect Spanish destination.
            </p>
          </div>
        </section>

        <section className="bg-white py-4">
          <div className="container-custom"><Breadcrumbs items={breadcrumbs} /></div>
        </section>

        <section className="py-12">
          <div className="container-custom">
            {regions.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-gray-500 text-lg font-medium mb-2">Content coming soon!</p>
                <p className="text-gray-400 text-sm">We are working on adding detailed region guides.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {regions.map((region: any) => {
                  const regionName = resolveI18n(region.name) || region.slug;
                  const regionDesc = resolveI18n(region.description);
                  return (
                    <Link key={region.slug} href={`/region/${region.slug}/`} className="group">
                      <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                        <div className="relative h-56">
                          {region.image ? (
                            <Image src={region.image} alt={regionName} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
                          ) : (
                            <div className="w-full h-full bg-gradient-to-br from-spain-red to-spain-gold flex items-center justify-center">
                              <span className="text-white text-4xl font-heading font-bold">{regionName.charAt(0)}</span>
                            </div>
                          )}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                          <div className="absolute bottom-4 left-4 right-4">
                            <h2 className="text-2xl font-heading font-bold text-white">{regionName}</h2>
                          </div>
                        </div>
                        <div className="p-6">
                          {regionDesc && <p className="text-gray-600 mb-4 line-clamp-2">{regionDesc}</p>}
                          {region.highlights && region.highlights.length > 0 && (
                            <div className="flex flex-wrap gap-2 mb-4">
                              {region.highlights.slice(0, 3).map((highlight: any, index: number) => (
                                <span key={index} className="bg-spain-red/10 text-spain-red px-2 py-1 rounded-full text-xs font-medium">
                                  {resolveI18n(highlight)}
                                </span>
                              ))}
                            </div>
                          )}
                          {region.cities && region.cities.length > 0 && (
                            <p className="text-sm text-gray-500">{region.cities.length} {region.cities.length === 1 ? 'city' : 'cities'} to explore</p>
                          )}
                          <div className="mt-4">
                            <span className="text-spain-red font-medium group-hover:text-spain-gold transition-colors">Explore {regionName} &rarr;</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        </section>

        <section className="bg-white py-12">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto text-center">
              <p className="section-label font-script text-spain-gold">About</p>
              <h2 className="text-3xl font-heading font-bold mb-4">About Spanish Regions</h2>
              <p className="text-gray-600 mb-8">
                Spain is divided into 17 autonomous communities, each with a distinct identity shaped by geography,
                history and culture. From the sun-drenched south to the green Atlantic coast and the mountainous interior,
                every region offers unique experiences for travelers.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-surface-cream p-6 rounded-2xl">
                  <h3 className="font-heading font-semibold mb-2">Diverse Landscapes</h3>
                  <p className="text-sm text-gray-600">Mountains, coastlines, vineyards, olive groves and arid plains</p>
                </div>
                <div className="bg-surface-cream p-6 rounded-2xl">
                  <h3 className="font-heading font-semibold mb-2">Regional Cuisine</h3>
                  <p className="text-sm text-gray-600">Each region has its own distinctive culinary traditions and specialties</p>
                </div>
                <div className="bg-surface-cream p-6 rounded-2xl">
                  <h3 className="font-heading font-semibold mb-2">Rich Heritage</h3>
                  <p className="text-sm text-gray-600">Moorish palaces, Gothic cathedrals, Roman ruins and medieval towns</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-surface-dark py-8">
          <div className="container-custom">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-white">
                <h2 className="text-2xl font-bold font-heading mb-1">Plan Your Spain Trip</h2>
                <p className="opacity-90 text-sm">Book hotels, transport, activities, and get connected with an eSIM</p>
              </div>
              <div className="flex flex-wrap justify-center gap-3">
                <a href={siteConfig.affiliateLinks.booking} target="_blank" rel="noopener noreferrer" className="bg-white text-spain-red px-5 py-2 rounded-full font-semibold text-sm hover:bg-gray-100 transition-colors">Booking.com</a>
                <a href={siteConfig.affiliateLinks.getYourGuide} target="_blank" rel="noopener noreferrer" className="bg-white text-spain-red px-5 py-2 rounded-full font-semibold text-sm hover:bg-gray-100 transition-colors">Activities</a>
                <a href={siteConfig.affiliateLinks.transport} target="_blank" rel="noopener noreferrer" className="bg-white text-spain-red px-5 py-2 rounded-full font-semibold text-sm hover:bg-gray-100 transition-colors">Transport</a>
              </div>
            </div>
            <p className="text-white/70 text-xs text-center mt-4">Some links are affiliate links. We may earn a commission at no extra cost to you.</p>
          </div>
        </section>
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const regions = getAllRegions();
  return { props: { regions } };
};
