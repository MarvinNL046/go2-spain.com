import { GetStaticProps, GetStaticPaths } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Breadcrumbs from '../../components/Breadcrumbs';
import CityCard from '../../components/CityCard';
import SEOHead from '../../components/SEOHead';
import { siteConfig } from '../../site.config';
import { resolveI18n } from '../../utils/i18n';

const { getCityBySlug, getCitySlugs, getAllCities } = require('../../lib/cities');

interface CityPageProps {
  city: any;
  relatedCities: any[];
}

export default function CityPage({ city, relatedCities }: CityPageProps) {
  if (!city) return <div>City not found</div>;

  const cityName = resolveI18n(city.name);
  const cityDesc = city.enhanced_description || resolveI18n(city.description);

  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: 'Cities', href: '/city/' },
    { name: cityName, href: `/city/${city.slug}/` }
  ];

  return (
    <>
      <SEOHead
        title={`${cityName} Travel Guide 2026 - Best Things to Do | ${siteConfig.name}`}
        description={cityDesc ? cityDesc.substring(0, 160) : `Complete travel guide for ${cityName}, Spain. Attractions, restaurants, neighborhoods, and travel tips.`}
        ogImage={city.image?.startsWith('http') ? city.image : `https://go2-spain.com${city.image || ''}`}
      >
        <meta name="keywords" content={`${cityName}, Spain, travel guide, attractions, restaurants, hotels, ${city.region || ''}`} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "TouristDestination",
              "name": cityName,
              "description": cityDesc,
              "image": city.image?.startsWith('http') ? city.image : `https://go2-spain.com${city.image || ''}`,
              "url": `https://go2-spain.com/city/${city.slug}/`,
              "geo": city.location ? {
                "@type": "GeoCoordinates",
                "latitude": city.location.lat,
                "longitude": city.location.lng
              } : undefined,
              "containedInPlace": {
                "@type": "Country",
                "name": "Spain"
              }
            })
          }}
        />
      </SEOHead>

      <div className="bg-surface-cream min-h-screen">
        {/* Breadcrumbs */}
        <section className="bg-white shadow-sm">
          <div className="container-custom py-4">
            <Breadcrumbs items={breadcrumbs} />
          </div>
        </section>

        {/* Hero Section */}
        <section className="bg-white">
          <div className="container-custom py-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-4xl lg:text-5xl font-heading font-bold text-gray-900 mb-4">
                  {cityName}
                </h1>
                <div className="flex flex-wrap gap-2 mb-6">
                  {city.region && (
                    <span className="bg-spain-red/10 text-spain-red px-3 py-1 rounded-full text-sm font-medium">
                      {city.region}
                    </span>
                  )}
                  {city.province && (
                    <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                      {city.province}
                    </span>
                  )}
                </div>
                <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                  {cityDesc || `Welcome to ${cityName}. More content coming soon.`}
                </p>
                {city.highlights && city.highlights.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {city.highlights.map((highlight: any, index: number) => (
                      <span key={index} className="bg-surface-cream text-gray-700 px-3 py-1.5 rounded-full text-sm">
                        {resolveI18n(highlight)}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              <div className="relative">
                {city.image && (
                  <img
                    src={city.image}
                    alt={cityName}
                    className="w-full h-96 object-cover rounded-2xl shadow-md"
                    onError={(e) => { e.currentTarget.src = '/images/placeholder-city.jpg'; }}
                  />
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Content Sections */}
        <section className="section-padding">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2 space-y-8">
                {/* Top Attractions */}
                {city.top_attractions && city.top_attractions.length > 0 && (
                  <div className="bg-white rounded-2xl shadow-md p-8">
                    <h2 className="text-2xl font-heading font-bold text-gray-900 mb-6">Top Attractions</h2>
                    <div className="space-y-4">
                      {city.top_attractions.map((attraction: any, index: number) => (
                        <div key={index} className="border-l-4 border-spain-red pl-4">
                          <h3 className="font-heading font-semibold text-gray-900">{resolveI18n(attraction.name)}</h3>
                          <p className="text-gray-600 text-sm">{resolveI18n(attraction.description)}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Neighborhoods */}
                {city.neighborhoods && city.neighborhoods.length > 0 && (
                  <div className="bg-white rounded-2xl shadow-md p-8">
                    <h2 className="text-2xl font-heading font-bold text-gray-900 mb-6">Neighborhoods</h2>
                    <div className="space-y-4">
                      {city.neighborhoods.map((neighborhood: any, index: number) => (
                        <div key={index} className="border-l-4 border-spain-gold pl-4">
                          <h3 className="font-heading font-semibold text-gray-900">{resolveI18n(neighborhood.name)}</h3>
                          <p className="text-gray-600 text-sm">{resolveI18n(neighborhood.description)}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Top Restaurants */}
                {city.top_restaurants && city.top_restaurants.length > 0 && (
                  <div className="bg-white rounded-2xl shadow-md p-8">
                    <h2 className="text-2xl font-heading font-bold text-gray-900 mb-6">Top Restaurants</h2>
                    <div className="space-y-4">
                      {city.top_restaurants.map((restaurant: any, index: number) => (
                        <div key={index} className="border-l-4 border-spain-red pl-4">
                          <h3 className="font-heading font-semibold text-gray-900">{resolveI18n(restaurant.name)}</h3>
                          {restaurant.cuisine && <span className="text-xs text-spain-red font-medium">{resolveI18n(restaurant.cuisine)}</span>}
                          <p className="text-gray-600 text-sm">{resolveI18n(restaurant.description)}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Local Food */}
                {city.local_food && city.local_food.length > 0 && (
                  <div className="bg-white rounded-2xl shadow-md p-8">
                    <h2 className="text-2xl font-heading font-bold text-gray-900 mb-6">Local Food</h2>
                    <div className="flex flex-wrap gap-2">
                      {city.local_food.map((food: any, index: number) => (
                        <span key={index} className="bg-surface-cream text-gray-700 px-3 py-1.5 rounded-full text-sm">
                          {resolveI18n(food)}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Day Trips */}
                {city.day_trips && city.day_trips.length > 0 && (
                  <div className="bg-white rounded-2xl shadow-md p-8">
                    <h2 className="text-2xl font-heading font-bold text-gray-900 mb-6">Day Trips</h2>
                    <div className="space-y-4">
                      {city.day_trips.map((trip: any, index: number) => (
                        <div key={index} className="border-l-4 border-spain-gold pl-4">
                          <h3 className="font-heading font-semibold text-gray-900">{resolveI18n(trip.name || trip)}</h3>
                          {trip.description && <p className="text-gray-600 text-sm">{resolveI18n(trip.description)}</p>}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Budget Info */}
                {city.budget_info && (
                  <div className="bg-white rounded-2xl shadow-md p-8">
                    <h2 className="text-2xl font-heading font-bold text-gray-900 mb-6">Budget Information</h2>
                    <p className="text-gray-700">{resolveI18n(city.budget_info)}</p>
                  </div>
                )}

                {/* Travel Tips */}
                {city.travel_tips && city.travel_tips.length > 0 && (
                  <div className="bg-white rounded-2xl shadow-md p-8">
                    <h2 className="text-2xl font-heading font-bold text-gray-900 mb-6">Travel Tips</h2>
                    <ul className="list-disc list-inside space-y-2 text-gray-700">
                      {city.travel_tips.map((tip: any, index: number) => (
                        <li key={index}>{resolveI18n(tip)}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Sidebar */}
              <div className="space-y-8">
                <div className="bg-surface-dark text-white rounded-2xl p-6">
                  <h3 className="text-lg font-bold font-heading mb-3">Book Hotels in {cityName}</h3>
                  <p className="text-sm opacity-90 mb-4">Find the best deals on accommodation in {cityName}.</p>
                  <div className="space-y-3">
                    <a href={siteConfig.affiliateLinks.booking} target="_blank" rel="noopener noreferrer"
                      className="block bg-white text-spain-red text-center px-4 py-2 rounded-xl font-semibold hover:bg-gray-100 transition-colors text-sm">
                      Booking.com
                    </a>
                    <a href={siteConfig.affiliateLinks.tripcom} target="_blank" rel="noopener noreferrer"
                      className="block bg-white text-spain-red text-center px-4 py-2 rounded-xl font-semibold hover:bg-gray-100 transition-colors text-sm">
                      Trip.com
                    </a>
                  </div>
                  <p className="text-xs opacity-70 mt-3 text-center">Affiliate links</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Related Cities */}
        {relatedCities.length > 0 && (
          <section className="bg-white section-padding">
            <div className="container-custom">
              <h2 className="text-3xl font-heading font-bold text-gray-900 mb-8 text-center">Related Cities</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {relatedCities.map((relatedCity: any) => (
                  <CityCard
                    key={relatedCity.slug}
                    city={relatedCity}
                  />
                ))}
              </div>
            </div>
          </section>
        )}
      </div>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const slugs = getCitySlugs();
  const paths = slugs.map((slug: string) => ({ params: { slug } }));
  return { paths, fallback: 'blocking' };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string;
  const city = getCityBySlug(slug);
  if (!city) return { notFound: true };

  const allCities = getAllCities();
  const relatedCities = allCities
    .filter((c: any) => c.slug !== slug && c.region === city.region)
    .slice(0, 3);

  return {
    props: { city, relatedCities },
    revalidate: 86400
  };
};
