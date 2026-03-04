import { GetStaticProps } from 'next';
import Link from 'next/link';
import SEOHead from '../../components/SEOHead';
import Breadcrumbs from '../../components/Breadcrumbs';
import { siteConfig } from '../../site.config';
import { resolveI18n } from '../../utils/i18n';

const destinations = require('../../data/destinations/index.json');

interface DestinationsPageProps {
  destinations: any[];
}

export default function DestinationsIndex({ destinations }: DestinationsPageProps) {
  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: 'Destinations', href: '/destinations/' }
  ];

  return (
    <>
      <SEOHead
        title={`Top Spain Destinations 2026 - Must-Visit Places | ${siteConfig.name}`}
        description="Discover the best destinations in Spain. From the beaches of Costa Brava to the historic cities of Andalusia, find your perfect Spanish destination."
      >
        <meta name="keywords" content="Spain destinations, best places Spain, top destinations Spain, where to go Spain, Spain travel destinations" />
      </SEOHead>

      <div className="min-h-screen bg-surface-cream">
        <section className="relative bg-surface-dark py-20">
          <div className="relative container-custom text-center text-white">
            <p className="font-script text-spain-gold mb-2">Discover Spain</p>
            <h1 className="text-4xl lg:text-5xl font-heading font-bold mb-4">Top Destinations in Spain</h1>
            <p className="text-xl max-w-3xl mx-auto">
              From sun-kissed Mediterranean beaches to historic cities and mountain villages, Spain offers a world of incredible destinations
            </p>
          </div>
        </section>

        <section className="bg-white py-4">
          <div className="container-custom"><Breadcrumbs items={breadcrumbs} /></div>
        </section>

        <section className="py-12">
          <div className="container-custom">
            {destinations.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-gray-500 text-lg font-medium mb-2">Content coming soon!</p>
                <p className="text-gray-400 text-sm mb-8">We are working on adding detailed destination guides.</p>
                <div className="max-w-4xl mx-auto">
                  <h2 className="text-2xl font-bold font-heading text-gray-900 mb-6">Popular Spanish Destinations</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[
                      { name: 'Barcelona', desc: 'Gaudi architecture, La Rambla, Mediterranean beaches', icon: '🏛️' },
                      { name: 'Madrid', desc: 'Royal Palace, Prado Museum, vibrant nightlife', icon: '👑' },
                      { name: 'Seville', desc: 'Flamenco, Alcazar, charming plazas', icon: '💃' },
                      { name: 'Granada', desc: 'The Alhambra, Sierra Nevada, Moorish heritage', icon: '🕌' },
                      { name: 'San Sebastian', desc: 'Pintxos, beaches, Basque culture', icon: '🍽️' },
                      { name: 'Mallorca', desc: 'Crystal-clear beaches, Serra de Tramuntana', icon: '🏝️' },
                      { name: 'Valencia', desc: 'City of Arts and Sciences, paella birthplace', icon: '🥘' },
                      { name: 'Bilbao', desc: 'Guggenheim Museum, Basque gastronomy', icon: '🎨' },
                      { name: 'Tenerife', desc: 'Mount Teide, year-round sunshine', icon: '🌋' },
                    ].map((dest, i) => (
                      <div key={i} className="bg-white rounded-2xl shadow-md p-6">
                        <span className="text-3xl mb-3 block">{dest.icon}</span>
                        <h3 className="font-heading font-bold text-gray-900 mb-1">{dest.name}</h3>
                        <p className="text-gray-600 text-sm">{dest.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {destinations.map((dest: any) => {
                  const destName = resolveI18n(dest.name);
                  const destDesc = resolveI18n(dest.description);
                  return (
                    <Link key={dest.slug} href={`/destinations/${dest.slug}/`} className="group">
                      <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                        {dest.image && (
                          <div className="relative h-48">
                            <img src={dest.image} alt={destName} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                          </div>
                        )}
                        <div className="p-5">
                          <h3 className="font-heading text-lg font-bold text-gray-900 mb-1 group-hover:text-spain-red transition-colors">
                            {destName}
                          </h3>
                          {destDesc && <p className="text-gray-600 text-sm mb-3 line-clamp-2">{destDesc}</p>}
                          <span className="text-spain-red font-medium text-sm group-hover:text-spain-gold transition-colors">
                            Explore {destName} &rarr;
                          </span>
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
              <h2 className="text-3xl font-heading font-bold mb-4">Explore Spain by Category</h2>
              <p className="text-gray-600 mb-8">
                Whether you are seeking beaches, culture, adventure, or gastronomy, Spain has the perfect destination for you.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link href="/city/" className="bg-spain-red text-white px-6 py-3 rounded-xl font-semibold hover:bg-spain-red/90 transition-colors">
                  Cities
                </Link>
                <Link href="/region/" className="bg-spain-red text-white px-6 py-3 rounded-xl font-semibold hover:bg-spain-red/90 transition-colors">
                  Regions
                </Link>
                <Link href="/islands/" className="bg-spain-red text-white px-6 py-3 rounded-xl font-semibold hover:bg-spain-red/90 transition-colors">
                  Islands
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-surface-dark py-8">
          <div className="container-custom">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-white">
                <h2 className="text-2xl font-bold font-heading mb-1">Plan Your Spain Trip</h2>
                <p className="opacity-90 text-sm">Book hotels, transport, and activities</p>
              </div>
              <div className="flex flex-wrap justify-center gap-3">
                <a href={siteConfig.affiliateLinks.booking} target="_blank" rel="noopener noreferrer" className="bg-white text-spain-red px-5 py-2 rounded-full font-semibold text-sm hover:bg-gray-100 transition-colors">Booking.com</a>
                <a href={siteConfig.affiliateLinks.getYourGuide} target="_blank" rel="noopener noreferrer" className="bg-white text-spain-red px-5 py-2 rounded-full font-semibold text-sm hover:bg-gray-100 transition-colors">Activities</a>
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
  return { props: { destinations } };
};
