import { GetStaticProps } from 'next';
import Link from 'next/link';
import SEOHead from '../../components/SEOHead';
import Breadcrumbs from '../../components/Breadcrumbs';
import { siteConfig } from '../../site.config';
import { resolveI18n } from '../../utils/i18n';

const itineraries = require('../../data/itineraries/index.json');

interface ItinerariesPageProps {
  itineraries: any[];
}

export default function ItinerariesIndex({ itineraries }: ItinerariesPageProps) {
  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: 'Itineraries', href: '/itineraries/' }
  ];

  return (
    <>
      <SEOHead
        title={`Spain Travel Itineraries 2026 - Trip Plans & Routes | ${siteConfig.name}`}
        description="Ready-made Spain travel itineraries. From 3-day city breaks to 2-week road trips. Detailed day-by-day plans for Barcelona, Madrid, Andalusia, and more."
      >
        <meta name="keywords" content="Spain itinerary, Spain trip plan, Spain travel route, Spain road trip, Spain 1 week itinerary, Spain 2 week itinerary" />
      </SEOHead>

      <div className="min-h-screen bg-surface-cream">
        <section className="relative bg-surface-dark py-20">
          <div className="relative container-custom text-center text-white">
            <p className="font-script text-spain-gold mb-2">Plan Your Trip</p>
            <h1 className="text-4xl lg:text-5xl font-heading font-bold mb-4">Spain Travel Itineraries</h1>
            <p className="text-xl max-w-3xl mx-auto">
              Ready-made trip plans from weekend getaways to multi-week adventures. Day-by-day routes, accommodation tips, and budget estimates.
            </p>
          </div>
        </section>

        <section className="bg-white py-4">
          <div className="container-custom"><Breadcrumbs items={breadcrumbs} /></div>
        </section>

        <section className="py-12">
          <div className="container-custom">
            {itineraries.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg font-medium mb-2">Content coming soon!</p>
                <p className="text-gray-400 text-sm mb-8">We are working on adding detailed trip itineraries.</p>
                <div className="max-w-5xl mx-auto">
                  <h2 className="text-2xl font-bold font-heading text-gray-900 mb-6">Suggested Spain Itineraries</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[
                      { name: '3 Days in Barcelona', duration: '3 days', desc: 'Gaudi masterpieces, Gothic Quarter, beaches, and tapas. The perfect city break.', icon: '🏛️', difficulty: 'Easy' },
                      { name: '3 Days in Madrid', duration: '3 days', desc: 'Prado Museum, Royal Palace, Retiro Park, and the best nightlife in Spain.', icon: '👑', difficulty: 'Easy' },
                      { name: 'Andalusia Road Trip', duration: '7-10 days', desc: 'Seville, Cordoba, Granada, Ronda, and the white villages. The essence of southern Spain.', icon: '🚗', difficulty: 'Moderate' },
                      { name: 'Northern Spain', duration: '10-14 days', desc: 'Basque Country, Cantabria, Asturias, and Galicia. Green landscapes, incredible food.', icon: '🌿', difficulty: 'Moderate' },
                      { name: 'Barcelona to Valencia Coast', duration: '5-7 days', desc: 'Costa Brava, Costa Dorada, and the Mediterranean coast down to Valencia.', icon: '🏖️', difficulty: 'Easy' },
                      { name: 'Balearic Islands Hopping', duration: '7-10 days', desc: 'Mallorca, Menorca, Ibiza, and Formentera. Beaches, nightlife, and tranquility.', icon: '🏝️', difficulty: 'Moderate' },
                      { name: 'Camino de Santiago', duration: '30-35 days', desc: 'The full Camino Frances from Saint-Jean-Pied-de-Port to Santiago de Compostela.', icon: '🥾', difficulty: 'Challenging' },
                      { name: 'Madrid & Surroundings', duration: '5 days', desc: 'Madrid plus day trips to Toledo, Segovia, and the El Escorial monastery.', icon: '🏰', difficulty: 'Easy' },
                      { name: 'Canary Islands Explorer', duration: '10-14 days', desc: 'Tenerife, Gran Canaria, Lanzarote, and Fuerteventura. Volcanoes, beaches, and nature.', icon: '🌋', difficulty: 'Moderate' },
                    ].map((itin, i) => (
                      <div key={i} className="bg-white rounded-2xl shadow-md p-6">
                        <div className="flex items-start justify-between mb-3">
                          <span className="text-3xl">{itin.icon}</span>
                          <div className="text-right">
                            <span className="bg-spain-red/10 text-spain-red px-2 py-1 rounded-full text-xs font-medium block mb-1">{itin.duration}</span>
                            <span className="text-xs text-gray-500">{itin.difficulty}</span>
                          </div>
                        </div>
                        <h3 className="font-heading font-bold text-gray-900 mb-1">{itin.name}</h3>
                        <p className="text-gray-600 text-sm">{itin.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {itineraries.map((itin: any) => {
                  const itinName = resolveI18n(itin.name);
                  const itinDesc = resolveI18n(itin.description);
                  return (
                    <Link key={itin.slug} href={`/itineraries/${itin.slug}/`} className="group">
                      <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                        {itin.image && (
                          <div className="relative h-48">
                            <img src={itin.image} alt={itinName} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                          </div>
                        )}
                        <div className="p-5">
                          <div className="flex items-start justify-between mb-2">
                            <h3 className="font-heading text-lg font-bold text-gray-900 group-hover:text-spain-red transition-colors">
                              {itinName}
                            </h3>
                            {itin.duration && (
                              <span className="bg-spain-red/10 text-spain-red px-2 py-1 rounded-full text-xs font-medium ml-2 flex-shrink-0">
                                {itin.duration}
                              </span>
                            )}
                          </div>
                          {itinDesc && <p className="text-gray-600 text-sm mb-3 line-clamp-2">{itinDesc}</p>}
                          <span className="text-spain-red font-medium text-sm group-hover:text-spain-gold transition-colors">
                            View itinerary &rarr;
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
              <h2 className="text-3xl font-heading font-bold mb-4">Plan Your Perfect Trip</h2>
              <p className="text-gray-600 mb-8">
                Need help planning? Browse our city guides, region overviews, and transport information to build your ideal Spain itinerary.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link href="/city/" className="bg-spain-red text-white px-6 py-3 rounded-xl font-semibold hover:bg-spain-red/90 transition-colors">
                  City Guides
                </Link>
                <Link href="/region/" className="bg-white text-spain-red border-2 border-spain-red px-6 py-3 rounded-xl font-semibold hover:bg-spain-red hover:text-white transition-colors">
                  Region Guides
                </Link>
                <Link href="/transport/" className="bg-white text-spain-red border-2 border-spain-red px-6 py-3 rounded-xl font-semibold hover:bg-spain-red hover:text-white transition-colors">
                  Transport Guide
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-surface-dark py-8">
          <div className="container-custom">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-white">
                <h2 className="text-2xl font-bold font-heading mb-1">Book Your Spain Trip</h2>
                <p className="opacity-90 text-sm">Hotels, transport, activities, and more</p>
              </div>
              <div className="flex flex-wrap justify-center gap-3">
                <a href={siteConfig.affiliateLinks.booking} target="_blank" rel="noopener noreferrer" className="bg-white text-spain-red px-5 py-2 rounded-full font-semibold text-sm hover:bg-gray-100 transition-colors">Booking.com</a>
                <a href={siteConfig.affiliateLinks.transport} target="_blank" rel="noopener noreferrer" className="bg-white text-spain-red px-5 py-2 rounded-full font-semibold text-sm hover:bg-gray-100 transition-colors">Transport</a>
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
  return { props: { itineraries } };
};
