import React from 'react';
import { GetStaticProps } from 'next';
import SEOHead from '../../components/SEOHead';
import Link from 'next/link';
import Breadcrumbs from '../../components/Breadcrumbs';
import { siteConfig } from '../../site.config';

const { getAllCities } = require('../../lib/cities');

interface WeatherIndexProps {
  cities: Array<{
    slug: string;
    name: string | { en: string };
    region: string;
  }>;
}

const seasonalInfo = [
  {
    season: 'Spring (March - May)',
    emoji: '🌸',
    temp: '12-24 C',
    description: 'Mild and pleasant across most of Spain with blooming landscapes. An excellent time to visit before the summer heat and crowds. Orange blossoms in Seville, wildflowers in the countryside. Easter (Semana Santa) processions are spectacular in Andalusia. Occasional rain showers, especially in the north.',
    bestFor: 'Andalusia, Barcelona, Madrid, Basque Country'
  },
  {
    season: 'Summer (June - August)',
    emoji: '☀️',
    temp: '25-40+ C',
    description: 'Peak tourist season with long, hot days. Central and southern Spain can be scorching (40 C+), while coastal areas are more comfortable with sea breezes. The Mediterranean coast, Balearic Islands, and Canary Islands are perfect for beach holidays. Northern Spain (Galicia, Asturias, Basque Country) offers cooler temperatures. Festivals like San Fermin (Pamplona) and La Tomatina draw huge crowds.',
    bestFor: 'Balearic Islands, Costa Brava, Northern Spain, Canary Islands'
  },
  {
    season: 'Autumn (September - November)',
    emoji: '🍂',
    temp: '10-25 C',
    description: 'A wonderful time to visit Spain with warm weather, fewer tourists, and lower prices. September and October are still warm enough for beaches in the south and on the islands. Wine harvest season (vendimia) in La Rioja, Ribera del Duero, and Priorat. Excellent food season with mushrooms, chestnuts, and new wine. The Canary Islands remain warm year-round.',
    bestFor: 'La Rioja, Catalonia, Andalusia, Canary Islands, Valencia'
  },
  {
    season: 'Winter (December - February)',
    emoji: '❄️',
    temp: '0-15 C',
    description: 'Mild winters in the south and on the coast, cold in the interior and mountains. The Canary Islands enjoy 20-25 C even in winter -- perfect for escaping the cold. Ski season in the Sierra Nevada (near Granada) and the Pyrenees. Madrid can be cold (2-10 C) but sunny. Christmas and Three Kings Day (January 6) celebrations are special across the country.',
    bestFor: 'Canary Islands (beach), Sierra Nevada (skiing), Andalusia (mild), Madrid (culture)'
  }
];

const weatherFaqs = [
  {
    question: 'What is the best time to visit Spain?',
    answer: 'The best months to visit Spain are April-June and September-October. These shoulder seasons offer pleasant temperatures (18-28 C), fewer crowds, and lower prices. However, Spain is a year-round destination -- the Canary Islands are warm in winter, and ski resorts operate from December to April.'
  },
  {
    question: 'Is it too hot in southern Spain in summer?',
    answer: 'July and August can be extremely hot in Andalusia and central Spain, with temperatures regularly reaching 40 C (104 F) in Seville, Cordoba, and Madrid. Coastal areas are more bearable with sea breezes. Consider visiting the south in spring (April-May) or autumn (September-October) instead, when temperatures are a comfortable 20-28 C.'
  },
  {
    question: 'Does it rain much in Spain?',
    answer: 'It depends on the region. The saying "the rain in Spain stays mainly in the plain" is misleading. Northern Spain (Galicia, Asturias, Cantabria, Basque Country) is known as "Green Spain" and receives significant rainfall year-round. Central and southern Spain are dry, especially in summer. The Mediterranean coast has a dry climate with occasional heavy autumn rains.'
  },
  {
    question: 'When is the best time for the Canary Islands?',
    answer: 'The Canary Islands enjoy a subtropical climate with warm weather year-round (18-28 C). They are especially popular from November to March when mainland Europe is cold. The islands rarely drop below 18 C even in winter. Summer is warm but not excessively hot due to cooling trade winds. The Canary Islands are truly a year-round destination.'
  },
  {
    question: 'What should I pack for Spain?',
    answer: 'Pack layers for spring and autumn, as mornings can be cool and afternoons warm. In summer, bring lightweight clothing, strong sun protection (SPF 50+), a hat, and comfortable walking shoes. In winter, pack warm layers for Madrid and the interior, but lighter clothing for the Canary Islands and southern coast. Comfortable shoes are essential for cobblestone streets.'
  },
  {
    question: 'When is ski season in Spain?',
    answer: 'Spain\'s ski season runs from late November to April. The main ski areas are Sierra Nevada (near Granada, the southernmost ski resort in Europe), the Pyrenees (Baqueira-Beret, Formigal, Cerler), and the Cantabrian mountains. Sierra Nevada often has the best conditions in January-March and has the unique appeal of skiing with views of the Mediterranean.'
  }
];

const WeatherIndex: React.FC<WeatherIndexProps> = ({ cities }) => {
  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: 'Weather Guide', href: '/weather' }
  ];

  const resolveName = (name: string | { en: string }): string => {
    if (typeof name === 'string') return name;
    return name?.en || '';
  };

  const citiesByRegion = cities.reduce((acc, city) => {
    if (!acc[city.region]) {
      acc[city.region] = [];
    }
    acc[city.region].push(city);
    return acc;
  }, {} as Record<string, typeof cities>);

  return (
    <div className="min-h-screen bg-surface-cream">
      <SEOHead
        title={`Spain Weather Guide 2026 | Best Time to Visit by Region | ${siteConfig.name}`}
        description="Complete Spain weather guide. Seasonal information, best times to visit Madrid, Barcelona, Andalusia, the Canary Islands and more. Monthly climate data and packing tips for your Spain trip."
      >
        <meta name="keywords" content="Spain weather, best time visit Spain, Madrid weather, Barcelona climate, Canary Islands weather, Spain seasons, Spain temperature, when to visit Spain" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": weatherFaqs.map(faq => ({
                "@type": "Question",
                "name": faq.question,
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": faq.answer
                }
              }))
            })
          }}
        />
      </SEOHead>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumbs items={breadcrumbs} />

        <p className="font-script text-spain-gold mb-2">Climate Guide</p>
        <h1 className="text-4xl font-bold font-heading text-gray-900 mb-8">
          Spain Weather Guide
        </h1>

        {/* Introduction */}
        <section className="bg-white rounded-2xl shadow-md p-6 mb-8">
          <p className="text-gray-700 leading-relaxed">
            Spain spans a diverse range of climates -- from the wet Atlantic north to the scorching Mediterranean south, the continental interior plateau, and the subtropical Canary Islands. Understanding regional weather patterns is essential for planning the perfect trip. Generally, the south and east are hot and dry, the north is cooler and wetter, the central plateau has extreme temperatures, and the islands enjoy year-round warmth.
          </p>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {/* Seasonal Overview */}
            <section className="bg-white rounded-2xl shadow-md p-6 mb-8">
              <h2 className="text-2xl font-bold font-heading mb-6">Spain Weather by Season</h2>
              <div className="space-y-6">
                {seasonalInfo.map((season) => (
                  <div key={season.season} className="border-0 bg-surface-cream rounded-2xl p-5">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-3xl">{season.emoji}</span>
                      <div>
                        <h3 className="font-semibold font-heading text-lg">{season.season}</h3>
                        <p className="text-sm text-spain-red font-medium">{season.temp}</p>
                      </div>
                    </div>
                    <p className="text-gray-700 text-sm mb-2">{season.description}</p>
                    <p className="text-sm"><strong className="text-gray-800">Best destinations:</strong> <span className="text-gray-600">{season.bestFor}</span></p>
                  </div>
                ))}
              </div>
            </section>

            {/* Cities by Region */}
            {Object.keys(citiesByRegion).length > 0 && (
              <section className="bg-white rounded-2xl shadow-md p-6">
                <h2 className="text-2xl font-bold font-heading mb-6">City Weather Guides</h2>
                {Object.entries(citiesByRegion).map(([region, regionCities]) => (
                  <div key={region} className="mb-8 last:mb-0">
                    <h3 className="text-xl font-semibold font-heading text-gray-800 mb-4">
                      {region}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {regionCities.map((city) => (
                        <Link
                          key={city.slug}
                          href={`/city/${city.slug}/`}
                          className="flex items-center justify-between p-3 bg-surface-cream rounded-xl hover:bg-spain-red/5 transition-colors group"
                        >
                          <span className="font-medium text-gray-700 group-hover:text-spain-red">
                            {resolveName(city.name)}
                          </span>
                          <span className="text-spain-red group-hover:translate-x-1 transition-transform">
                            &rarr;
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </section>
            )}

            {/* FAQ Section */}
            <section className="bg-white rounded-2xl shadow-md p-6 mt-8">
              <h2 className="text-2xl font-bold font-heading text-gray-900 mb-6">Frequently Asked Questions</h2>
              <div className="space-y-6">
                {weatherFaqs.map((faq, index) => (
                  <div key={index} className="border-b border-gray-100 pb-4 last:border-0">
                    <h3 className="text-lg font-semibold font-heading text-gray-900 mb-2">{faq.question}</h3>
                    <p className="text-gray-700">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <aside>
            <div className="lg:sticky lg:top-4 space-y-6">
              {/* Quick Tips */}
              <div className="bg-white rounded-2xl shadow-md p-6">
                <h3 className="text-lg font-semibold font-heading mb-4">Quick Weather Tips</h3>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">🌸</span>
                    <div><strong>Spring (Mar-May):</strong> Mild, festive, perfect for sightseeing</div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-500 mr-2">☀️</span>
                    <div><strong>Summer (Jun-Aug):</strong> Very hot south, beach weather, peak prices</div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-amber-600 mr-2">🍂</span>
                    <div><strong>Autumn (Sep-Nov):</strong> Wine harvest, warm coast, fewer crowds</div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-300 mr-2">❄️</span>
                    <div><strong>Winter (Dec-Feb):</strong> Skiing, warm Canaries, mild Andalusia</div>
                  </li>
                </ul>
              </div>

              {/* Best Times */}
              <div className="bg-white rounded-2xl shadow-md p-6">
                <h3 className="text-lg font-semibold font-heading mb-4">Best Times to Visit</h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <h4 className="font-medium text-gray-800">For Perfect Weather:</h4>
                    <p className="text-gray-600">April - June, September - October</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800">For Fewer Crowds:</h4>
                    <p className="text-gray-600">October - November, March - April</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800">For Beaches:</h4>
                    <p className="text-gray-600">June - September (Mediterranean & Islands)</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800">For Skiing:</h4>
                    <p className="text-gray-600">December - April (Sierra Nevada, Pyrenees)</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800">For Wine Harvest:</h4>
                    <p className="text-gray-600">September - October (La Rioja, Ribera del Duero)</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800">For Winter Sun:</h4>
                    <p className="text-gray-600">November - March (Canary Islands, 20-25 C)</p>
                  </div>
                </div>
              </div>

              {/* Regional Climate */}
              <div className="bg-white rounded-2xl shadow-md p-6">
                <h3 className="text-lg font-semibold font-heading mb-4">Regional Climates</h3>
                <ul className="space-y-2 text-sm">
                  <li><strong className="text-gray-800">Mediterranean Coast:</strong> <span className="text-gray-600">Hot summers, mild winters, dry</span></li>
                  <li><strong className="text-gray-800">Central Plateau:</strong> <span className="text-gray-600">Extreme: scorching summers, cold winters</span></li>
                  <li><strong className="text-gray-800">Atlantic North:</strong> <span className="text-gray-600">Mild, rainy year-round ("Green Spain")</span></li>
                  <li><strong className="text-gray-800">Andalusia:</strong> <span className="text-gray-600">Hot summers (40 C+), mild winters</span></li>
                  <li><strong className="text-gray-800">Canary Islands:</strong> <span className="text-gray-600">Subtropical, warm year-round (18-28 C)</span></li>
                  <li><strong className="text-gray-800">Balearic Islands:</strong> <span className="text-gray-600">Mediterranean, warm summers, mild winters</span></li>
                </ul>
              </div>
            </div>
          </aside>
        </div>

        {/* Ready to Book Section */}
        <section className="bg-surface-dark rounded-2xl p-8 text-white mt-12">
          <p className="font-script text-spain-gold text-center mb-2">Plan Ahead</p>
          <h2 className="text-2xl font-bold font-heading text-center mb-4">Ready to Book Your Spain Trip?</h2>
          <p className="text-center mb-8 opacity-90 max-w-2xl mx-auto">
            Now that you know the best time to visit, start planning your perfect Spanish getaway.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <a href={siteConfig.affiliateLinks.tripcom} target="_blank" rel="noopener noreferrer" className="bg-white text-spain-red rounded-2xl p-6 text-center hover:shadow-xl hover:-translate-y-1 transition-all block">
              <div className="text-3xl mb-3">🏨</div>
              <h3 className="font-semibold font-heading text-lg mb-1">Find Hotels</h3>
              <p className="text-sm text-gray-600">Compare deals on Trip.com</p>
            </a>
            <Link href="/esim/" className="bg-white text-spain-red rounded-2xl p-6 text-center hover:shadow-xl hover:-translate-y-1 transition-all block">
              <div className="text-3xl mb-3">📱</div>
              <h3 className="font-semibold font-heading text-lg mb-1">Stay Connected</h3>
              <p className="text-sm text-gray-600">Get an eSIM for Spain</p>
            </Link>
            <Link href="/travel-insurance/" className="bg-white text-spain-red rounded-2xl p-6 text-center hover:shadow-xl hover:-translate-y-1 transition-all block">
              <div className="text-3xl mb-3">🛡️</div>
              <h3 className="font-semibold font-heading text-lg mb-1">Travel Insurance</h3>
              <p className="text-sm text-gray-600">Protect your trip</p>
            </Link>
          </div>
          <p className="text-xs text-center opacity-75">
            External links are affiliate links. We may earn a small commission at no extra cost to you.
          </p>
        </section>
      </main>
    </div>
  );
};

export const getStaticProps: GetStaticProps<WeatherIndexProps> = async () => {
  const allCities = getAllCities();
  const cities = allCities.map((city: any) => ({
    slug: city.slug,
    name: city.name,
    region: city.region || 'Other',
  }));
  return {
    props: {
      cities
    }
  };
};

export default WeatherIndex;
