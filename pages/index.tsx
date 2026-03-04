import { GetStaticProps } from 'next';
import SEOHead from '../components/SEOHead';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import CityCard from '../components/CityCard';
import { useTranslation } from '../hooks/useTranslation';
import { siteConfig } from '../site.config';
import { resolveI18n } from '../utils/i18n';

const { getAllCities } = require('../lib/cities');
const { getAllDishes } = require('../lib/food');
const { getAllIslands } = require('../lib/islands');

interface HomeProps {
  cities: any[];
  featuredCities: any[];
  popularDishes: any[];
  islands: any[];
}

export default function Home({ cities, featuredCities, popularDishes, islands }: HomeProps) {
  const { t } = useTranslation('common');

  const heroImages = [
    '/images/homepageHero/sagrada-familia-barcelona.webp',
    '/images/homepageHero/alhambra-granada.webp',
    '/images/homepageHero/plaza-espana-seville.webp',
    '/images/homepageHero/mallorca-coast.webp'
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === heroImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 5500);
    return () => clearInterval(interval);
  }, [heroImages.length]);

  return (
    <>
      <SEOHead
        title={`${siteConfig.name} - ${siteConfig.tagline}`}
        description="Your complete Spain travel guide with city guides, food, transport, and booking. Discover Barcelona, Madrid, Seville, and more."
      >
        <meta name="keywords" content="Spain travel guide, visit Spain, Barcelona, Madrid, Seville, Spanish food, Spain tourism 2026" />
        <meta property="og:type" content="website" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "Go2Spain",
              "url": "https://go2-spain.com",
              "description": "Your complete Spain travel guide with city guides, food, transport, and booking.",
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://go2-spain.com/search?q={search_term_string}",
                "query-input": "required name=search_term_string"
              }
            })
          }}
        />
      </SEOHead>

      {/* Hero Section */}
      <section className="relative bg-surface-cream overflow-hidden">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-[85vh] sm:min-h-[70vh] lg:min-h-[600px] py-12 lg:py-0">
            {/* Left -- Text */}
            <div className="order-2 lg:order-1 text-center lg:text-left">
              <span className="section-label">Viva Espana</span>
              <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 mb-6 leading-tight">
                {t('hero.title') || 'Discover Spain'}
              </h1>
              <p className="text-lg lg:text-xl text-gray-600 mb-4 max-w-xl mx-auto lg:mx-0">
                {t('hero.subtitle') || 'From vibrant cities to sun-drenched coasts, explore the best of Spain with our comprehensive travel guides.'}
              </p>
              <p className="text-base text-gray-500 mb-8 max-w-lg mx-auto lg:mx-0">
                Plan your perfect Spanish adventure with expert city guides, local food recommendations, transport tips, and island getaways.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link href="/city/" className="btn-primary">
                  {t('buttons.exploreCities') || 'Explore Cities'}
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
                <Link href="#featured" className="btn-secondary">
                  {t('hero.featuredDestinations') || 'Featured Destinations'}
                </Link>
              </div>
            </div>

            {/* Right -- Image slider */}
            <div className="order-1 lg:order-2 relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/3]">
                {heroImages.map((image, index) => (
                  <div
                    key={index}
                    className={`absolute inset-0 transition-opacity duration-1500 ease-in-out ${
                      index === currentImageIndex ? 'opacity-100' : 'opacity-0'
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`Beautiful Spain scenery ${index + 1}`}
                      fill
                      className="object-cover"
                      priority={index === 0}
                      loading={index === 0 ? "eager" : "lazy"}
                      quality={75}
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                ))}
              </div>
              {/* Indicator dots */}
              <div className="flex justify-center gap-2 mt-4">
                {heroImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                      index === currentImageIndex
                        ? 'bg-spain-red w-6'
                        : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                    aria-label={`Show image ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Counter Bar */}
      <section className="bg-surface-dark py-12 lg:py-16">
        <div className="container-custom">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl lg:text-5xl font-heading font-bold text-white mb-2">
                {cities.length}+
              </div>
              <div className="text-gray-400 text-sm">{t('stats.citiesCovered') || 'Cities Covered'}</div>
            </div>
            <div>
              <div className="text-3xl lg:text-5xl font-heading font-bold text-white mb-2">
                5
              </div>
              <div className="text-gray-400 text-sm">{t('stats.regions') || 'Regions'}</div>
            </div>
            <div>
              <div className="text-3xl lg:text-5xl font-heading font-bold text-white mb-2">
                100+
              </div>
              <div className="text-gray-400 text-sm">{t('stats.attractions') || 'Attractions'}</div>
            </div>
            <div>
              <div className="text-3xl lg:text-5xl font-heading font-bold text-spain-red mb-2">
                24/7
              </div>
              <div className="text-gray-400 text-sm">{t('stats.travelTips') || 'Travel Tips'}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Destinations */}
      <section id="featured" className="section-padding bg-surface-cream">
        <div className="container-custom">
          <div className="text-center mb-14">
            <span className="section-label">{t('hero.featuredDestinations') || 'Featured Destinations'}</span>
            <h2 className="section-title mb-4">
              {t('sections.featuredDestinations') || 'Top Destinations in Spain'}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {t('sections.featuredDescription') || 'From the artistic streets of Barcelona to the historic heart of Madrid, discover the best Spain has to offer.'}
            </p>
          </div>

          {featuredCities.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                {featuredCities.slice(0, 6).map((city: any) => (
                  <CityCard
                    key={city.slug}
                    city={city}
                  />
                ))}
              </div>
              <div className="text-center">
                <Link href="/city/" className="btn-primary">
                  {t('buttons.viewAllCities') || 'View All Cities'}
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">City guides coming soon! We are working on adding Spanish destinations.</p>
            </div>
          )}
        </div>
      </section>

      {/* Spanish Cuisine */}
      {popularDishes.length > 0 && (
        <section className="section-padding bg-white">
          <div className="container-custom">
            <div className="text-center mb-14">
              <span className="section-label">Authentic Spanish Cuisine</span>
              <h2 className="section-title mb-4">Authentic Spanish Cuisine</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                {t('sections.cuisineDescription') || 'Discover the rich flavors of Spain -- from tapas and paella to churros and gazpacho.'}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {popularDishes.slice(0, 6).map((dish: any) => (
                <Link key={dish.id || dish.slug} href={`/food/${dish.slug}/`} className="group">
                  <div className="bg-white rounded-2xl shadow-md overflow-hidden transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-1">
                    <div className="relative h-52 overflow-hidden">
                      <Image
                        src={dish.image || '/images/placeholder.webp'}
                        alt={resolveI18n(dish.name)}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      {dish.preparation_time && (
                        <div className="absolute top-4 right-4">
                          <span className="bg-white/90 backdrop-blur-sm text-gray-700 px-3 py-1 text-xs font-medium rounded-full">
                            {dish.preparation_time}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="p-5">
                      <h3 className="font-heading text-lg font-bold text-gray-900 mb-0.5 group-hover:text-spain-red transition-colors">
                        {resolveI18n(dish.name)}
                      </h3>
                      {dish.name?.es && <p className="text-sm text-gray-400 mb-3">{dish.name.es}</p>}
                      <div className="flex items-center justify-between mb-3">
                        {dish.category && (
                          <span className="text-xs text-spain-red font-medium capitalize bg-spain-red/5 px-2.5 py-1 rounded-full">
                            {dish.category.replace('-', ' ')}
                          </span>
                        )}
                        {dish.region && (
                          <span className="text-xs text-gray-500 capitalize">{dish.region} Spain</span>
                        )}
                      </div>
                      {dish.ingredients && (
                        <div className="flex flex-wrap gap-1.5 mb-4">
                          {dish.ingredients.slice(0, 3).map((ingredient: string, index: number) => (
                            <span key={index} className="text-xs bg-surface-cream text-gray-600 px-2.5 py-1 rounded-full">
                              {ingredient}
                            </span>
                          ))}
                          {dish.ingredients.length > 3 && (
                            <span className="text-xs text-spain-red font-medium">
                              +{dish.ingredients.length - 3}
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            <div className="text-center">
              <Link href="/food/" className="btn-primary">
                Explore All Spanish Dishes
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Explore by Region */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-14">
            <span className="section-label">{t('sections.exploreByRegion') || 'Explore by Region'}</span>
            <h2 className="section-title mb-4">
              {t('sections.exploreByRegion') || 'Explore by Region'}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {t('sections.regionDescription') || 'Spain is a mosaic of diverse regions, each with its own culture, cuisine, and character.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { slug: 'andalusia', image: '/images/regions/andalusia.webp', name: 'Andalusia', desc: 'Flamenco, Moorish palaces, and sun-drenched coastlines in southern Spain.', cta: 'Explore Andalusia' },
              { slug: 'catalonia', image: '/images/regions/catalonia.webp', name: 'Catalonia', desc: 'Barcelona, Gaudi, Costa Brava beaches, and a unique cultural identity.', cta: 'Explore Catalonia' },
              { slug: 'basque-country', image: '/images/regions/basque-country.webp', name: 'Basque Country', desc: 'World-class gastronomy, pintxos bars, and the Guggenheim in Bilbao.', cta: 'Explore Basque Country' },
              { slug: 'castile', image: '/images/regions/castile.webp', name: 'Castile', desc: 'Madrid, Toledo, Segovia -- the historic heartland of Spain.', cta: 'Explore Castile' },
            ].map((region) => (
              <Link key={region.slug} href={`/region/${region.slug}/`} className="group">
                <div className="relative rounded-2xl overflow-hidden h-80">
                  <Image
                    src={region.image}
                    alt={region.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="font-heading text-xl font-bold text-white mb-1">{region.name}</h3>
                    <p className="text-white/80 text-sm mb-3 line-clamp-2">{region.desc}</p>
                    <span className="inline-flex items-center gap-1 text-white text-sm font-medium group-hover:text-spain-gold transition-colors">
                      {region.cta}
                      <svg className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Islands Section */}
      <section className="section-padding bg-surface-cream">
        <div className="container-custom">
          <div className="text-center mb-14">
            <span className="section-label">Spanish Islands</span>
            <h2 className="section-title mb-4">Discover Spain's Islands</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              From the party beaches of Ibiza to the volcanic landscapes of Tenerife, Spain's islands offer unforgettable experiences.
            </p>
          </div>

          {islands.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {islands.slice(0, 6).map((island: any) => (
                <Link key={island.slug} href={`/islands/${island.slug}/`} className="group">
                  <div className="bg-white rounded-2xl shadow-md overflow-hidden transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-1">
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={island.image || '/images/placeholder.webp'}
                        alt={resolveI18n(island.name)}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-5">
                      <h3 className="font-heading text-lg font-bold text-gray-900 mb-1 group-hover:text-spain-red transition-colors">
                        {resolveI18n(island.name)}
                      </h3>
                      {island.archipelago && (
                        <span className="text-xs text-spain-red font-medium bg-spain-red/5 px-2.5 py-1 rounded-full">
                          {island.archipelago}
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500 mb-4">Detailed island guides coming soon!</p>
            </div>
          )}
          <div className="text-center">
            <Link href="/islands/" className="btn-primary">
              Explore All Islands
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Plan Your Trip -- Affiliate cards */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-14">
            <span className="section-label">Plan Your Trip</span>
            <h2 className="section-title mb-4">Plan Your Complete Spain Trip</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Everything you need to book, from hotels and tours to transport and connectivity.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 bg-spain-red/10 rounded-xl flex items-center justify-center mb-4">
                <span className="text-2xl">🏨</span>
              </div>
              <h3 className="font-heading text-lg font-bold text-gray-900 mb-2">Hotels &amp; Accommodation</h3>
              <p className="text-gray-600 text-sm mb-5">
                Compare prices on thousands of hotels, paradores, and boutique stays across Spain.
              </p>
              <div className="flex flex-col gap-2.5">
                <a href={siteConfig.affiliateLinks.tripcom} target="_blank" rel="noopener noreferrer"
                  className="block text-center bg-spain-red text-white px-4 py-2.5 rounded-xl font-medium hover:bg-spain-red/90 transition-colors text-sm">
                  Search on Trip.com
                </a>
                <a href={siteConfig.affiliateLinks.booking} target="_blank" rel="noopener noreferrer"
                  className="block text-center bg-blue-700 text-white px-4 py-2.5 rounded-xl font-medium hover:bg-blue-800 transition-colors text-sm">
                  Search on Booking.com
                </a>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center mb-4">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="font-heading text-lg font-bold text-gray-900 mb-2">Activities &amp; Tours</h3>
              <p className="text-gray-600 text-sm mb-5">
                Book flamenco shows, wine tours, tapas walks, and unforgettable experiences.
              </p>
              <div className="flex flex-col gap-2.5">
                <a href={siteConfig.affiliateLinks.klook} target="_blank" rel="noopener noreferrer"
                  className="block text-center bg-orange-500 text-white px-4 py-2.5 rounded-xl font-medium hover:bg-orange-600 transition-colors text-sm">
                  Browse on Klook
                </a>
                <a href={siteConfig.affiliateLinks.getYourGuide} target="_blank" rel="noopener noreferrer"
                  className="block text-center bg-blue-600 text-white px-4 py-2.5 rounded-xl font-medium hover:bg-blue-700 transition-colors text-sm">
                  Browse on GetYourGuide
                </a>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center mb-4">
                <span className="text-2xl">🚄</span>
              </div>
              <h3 className="font-heading text-lg font-bold text-gray-900 mb-2">Transport</h3>
              <p className="text-gray-600 text-sm mb-5">
                Renfe AVE high-speed trains, buses, and flights between cities -- book your routes in advance.
              </p>
              <div className="flex flex-col gap-2.5">
                <a href={siteConfig.affiliateLinks.transport} target="_blank" rel="noopener noreferrer"
                  className="block text-center bg-purple-600 text-white px-4 py-2.5 rounded-xl font-medium hover:bg-purple-700 transition-colors text-sm">
                  Book on 12Go
                </a>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 bg-cyan-500/10 rounded-xl flex items-center justify-center mb-4">
                <span className="text-2xl">📱</span>
              </div>
              <h3 className="font-heading text-lg font-bold text-gray-900 mb-2">eSIM &amp; Data</h3>
              <p className="text-gray-600 text-sm mb-5">
                Stay connected with affordable eSIM plans -- no physical SIM swap needed.
              </p>
              <div className="flex flex-col gap-2.5">
                <Link href="/esim/" className="block text-center bg-cyan-600 text-white px-4 py-2.5 rounded-xl font-medium hover:bg-cyan-700 transition-colors text-sm">
                  Compare eSIM Plans
                </Link>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 bg-spain-red/10 rounded-xl flex items-center justify-center mb-4">
                <span className="text-2xl">🛡️</span>
              </div>
              <h3 className="font-heading text-lg font-bold text-gray-900 mb-2">Travel Insurance</h3>
              <p className="text-gray-600 text-sm mb-5">
                Protect yourself while traveling. Compare the best travel insurance options.
              </p>
              <div className="flex flex-col gap-2.5">
                <Link href="/travel-insurance/" className="block text-center bg-spain-red text-white px-4 py-2.5 rounded-xl font-medium hover:bg-spain-red/90 transition-colors text-sm">
                  Compare Insurance
                </Link>
              </div>
            </div>
          </div>

          <p className="text-xs text-gray-400 text-center max-w-2xl mx-auto">
            Some of the links above are affiliate links. If you make a booking through these links, we may earn a small commission at no extra cost to you. This helps us keep Go2Spain free and up-to-date.
          </p>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-surface-dark py-16 lg:py-20">
        <div className="container-custom text-center">
          <span className="font-script text-spain-gold text-lg mb-3 block">Start Your Adventure</span>
          <h2 className="font-heading text-3xl lg:text-5xl font-bold text-white mb-4">
            Plan Your Perfect Trip
          </h2>
          <p className="text-gray-400 text-lg max-w-xl mx-auto mb-8">
            Discover the best of Spain with our comprehensive travel guides.
          </p>
          <Link href="/city/" className="btn-primary text-lg px-8 py-4">
            Start Exploring Spain
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>
      </section>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const cities = getAllCities();
  const popularDishes = getAllDishes().slice(0, 6);
  const islands = getAllIslands();
  const featuredCities = cities.slice(0, 6);

  return {
    props: {
      cities,
      featuredCities,
      popularDishes,
      islands,
    },
  };
};
