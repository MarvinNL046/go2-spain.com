import { GetStaticProps } from 'next';
import Link from 'next/link';
import SEOHead from '../../components/SEOHead';
import Breadcrumbs from '../../components/Breadcrumbs';
import { siteConfig } from '../../site.config';
import { resolveI18n } from '../../utils/i18n';

const experiences = require('../../data/experiences/index.json');

interface ExperiencesPageProps {
  experiences: any[];
}

export default function ExperiencesIndex({ experiences }: ExperiencesPageProps) {
  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: 'Experiences', href: '/experiences/' }
  ];

  return (
    <>
      <SEOHead
        title={`Best Spain Experiences 2026 - Things to Do & See | ${siteConfig.name}`}
        description="Discover the best experiences in Spain. From flamenco shows and tapas tours to hiking the Camino de Santiago and surfing the Basque coast."
      >
        <meta name="keywords" content="Spain experiences, things to do Spain, Spain activities, best experiences Spain, Spain travel experiences" />
      </SEOHead>

      <div className="min-h-screen bg-surface-cream">
        <section className="relative bg-surface-dark py-20">
          <div className="relative container-custom text-center text-white">
            <p className="font-script text-spain-gold mb-2">Unforgettable Moments</p>
            <h1 className="text-4xl lg:text-5xl font-heading font-bold mb-4">Best Experiences in Spain</h1>
            <p className="text-xl max-w-3xl mx-auto">
              From flamenco performances to tapas crawls, wine tastings to coastal hikes -- immerse yourself in the best that Spain has to offer
            </p>
          </div>
        </section>

        <section className="bg-white py-4">
          <div className="container-custom"><Breadcrumbs items={breadcrumbs} /></div>
        </section>

        <section className="py-12">
          <div className="container-custom">
            {experiences.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg font-medium mb-2">Content coming soon!</p>
                <p className="text-gray-400 text-sm mb-8">We are working on adding detailed experience guides.</p>
                <div className="max-w-5xl mx-auto">
                  <h2 className="text-2xl font-bold font-heading text-gray-900 mb-6">Must-Do Experiences in Spain</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[
                      { name: 'Watch a Flamenco Show', desc: 'Experience the raw passion of flamenco in Seville, Madrid, or Granada. Best in intimate tablaos.', icon: '💃', category: 'Culture' },
                      { name: 'Tapas Crawl', desc: 'Go bar-hopping for tapas in San Sebastian, Granada, or Madrid. A quintessential Spanish evening.', icon: '🍢', category: 'Food' },
                      { name: 'Walk the Camino de Santiago', desc: 'Follow the ancient pilgrimage route across northern Spain to Santiago de Compostela.', icon: '🥾', category: 'Adventure' },
                      { name: 'Visit the Alhambra', desc: 'Explore the stunning Moorish palace complex in Granada, a UNESCO World Heritage Site.', icon: '🏰', category: 'Culture' },
                      { name: 'La Tomatina Festival', desc: 'Join the world\'s biggest tomato fight in Bunol, near Valencia, held the last Wednesday of August.', icon: '🍅', category: 'Festival' },
                      { name: 'Wine Tasting in La Rioja', desc: 'Tour bodegas and sample world-class Tempranillo wines in Spain\'s premier wine region.', icon: '🍷', category: 'Food' },
                      { name: 'Beach Hopping in the Balearics', desc: 'Discover hidden coves and turquoise waters in Mallorca, Menorca, Ibiza, and Formentera.', icon: '🏖️', category: 'Beach' },
                      { name: 'Explore Gaudi\'s Barcelona', desc: 'Visit the Sagrada Familia, Park Guell, and Casa Batllo to see Gaudi\'s architectural genius.', icon: '⛪', category: 'Culture' },
                      { name: 'Surf the Basque Coast', desc: 'Catch waves in Zarautz, Mundaka, or San Sebastian -- some of Europe\'s best surf spots.', icon: '🏄', category: 'Adventure' },
                    ].map((exp, i) => (
                      <div key={i} className="bg-white rounded-2xl shadow-md p-6">
                        <div className="flex items-start justify-between mb-3">
                          <span className="text-3xl">{exp.icon}</span>
                          <span className="bg-spain-red/10 text-spain-red px-2 py-1 rounded-full text-xs font-medium">{exp.category}</span>
                        </div>
                        <h3 className="font-heading font-bold text-gray-900 mb-1">{exp.name}</h3>
                        <p className="text-gray-600 text-sm">{exp.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {experiences.map((exp: any) => {
                  const expName = resolveI18n(exp.name);
                  const expDesc = resolveI18n(exp.description);
                  return (
                    <Link key={exp.slug} href={`/experiences/${exp.slug}/`} className="group">
                      <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                        {exp.image && (
                          <div className="relative h-48">
                            <img src={exp.image} alt={expName} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                          </div>
                        )}
                        <div className="p-5">
                          <div className="flex items-start justify-between mb-2">
                            <h3 className="font-heading text-lg font-bold text-gray-900 group-hover:text-spain-red transition-colors">
                              {expName}
                            </h3>
                            {exp.category && (
                              <span className="bg-spain-red/10 text-spain-red px-2 py-1 rounded-full text-xs font-medium ml-2 flex-shrink-0">
                                {exp.category}
                              </span>
                            )}
                          </div>
                          {expDesc && <p className="text-gray-600 text-sm mb-3 line-clamp-2">{expDesc}</p>}
                          <span className="text-spain-red font-medium text-sm group-hover:text-spain-gold transition-colors">
                            Learn more &rarr;
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
              <h2 className="text-3xl font-heading font-bold mb-4">Book Activities & Tours</h2>
              <p className="text-gray-600 mb-8">
                From guided tours to cooking classes, find and book the best activities in Spain.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <a href={siteConfig.affiliateLinks.getYourGuide} target="_blank" rel="noopener noreferrer" className="bg-spain-red text-white px-6 py-3 rounded-xl font-semibold hover:bg-spain-red/90 transition-colors">
                  GetYourGuide
                </a>
                <a href={siteConfig.affiliateLinks.klook} target="_blank" rel="noopener noreferrer" className="bg-white text-spain-red border-2 border-spain-red px-6 py-3 rounded-xl font-semibold hover:bg-spain-red hover:text-white transition-colors">
                  Klook Activities
                </a>
              </div>
              <p className="text-xs text-gray-500 mt-3">Affiliate links. We may earn a commission at no extra cost to you.</p>
            </div>
          </div>
        </section>

        <section className="bg-surface-dark text-white py-12">
          <div className="container-custom text-center">
            <span className="font-script text-spain-gold text-lg">Keep exploring</span>
            <h2 className="text-3xl lg:text-4xl font-bold font-heading mb-6 mt-2">Discover More of Spain</h2>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/city/" className="bg-spain-red text-white px-8 py-3 rounded-xl font-semibold hover:bg-spain-red/90 transition-colors">
                Explore Cities
              </Link>
              <Link href="/food/" className="bg-white bg-opacity-20 text-white border-2 border-white px-8 py-3 rounded-xl font-semibold hover:bg-white hover:text-spain-red transition-colors">
                Spanish Food Guide
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  return { props: { experiences } };
};
