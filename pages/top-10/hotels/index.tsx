import { GetStaticProps } from 'next';
import SEOHead from '../../../components/SEOHead';
import Link from 'next/link';
import Breadcrumbs from '../../../components/Breadcrumbs';
import { siteConfig } from '../../../site.config';

const { getAllCities } = require('../../../lib/cities');
const fs = require('fs');
const path = require('path');

interface City { slug: string; name: { en: string }; region: string; image: string; }
interface Top10Guide { city: City; title: string; meta_description: string; last_updated?: string; item_count: number; has_current_data: boolean; }
interface Top10HotelsIndexProps { availableGuides: Top10Guide[]; }

export default function Top10HotelsIndex({ availableGuides }: Top10HotelsIndexProps) {
  const breadcrumbs = [{ name: 'Home', href: '/' }, { name: 'Top 10 Guides', href: '/top-10/' }, { name: 'Hotels', href: '/top-10/hotels/' }];

  return (
    <>
      <SEOHead
        title={`Top 10 Hotel Guides | Best Accommodation in Spain | ${siteConfig.name}`}
        description="Find the best hotels in Spain with our comprehensive Top 10 guides. Current rates, guest reviews, and booking tips for Madrid, Barcelona, Seville, Valencia, and more."
      >
        <meta name="keywords" content="Spain hotels, top 10 hotels, accommodation Spain, Madrid hotels, Barcelona hotels, Seville hotels, paradores Spain" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "CollectionPage", "name": "Top 10 Hotel Guides Spain", "description": "Comprehensive hotel guides for Spain's top destinations", "publisher": { "@type": "Organization", "name": siteConfig.name }, "mainEntity": { "@type": "ItemList", "numberOfItems": availableGuides.length, "itemListElement": availableGuides.map((guide, index) => ({ "@type": "ListItem", "position": index + 1, "url": `${siteConfig.seo.siteUrl}/city/${guide.city.slug}/top-10-hotels/`, "name": guide.title })) } }) }} />
      </SEOHead>

      <div className="bg-surface-cream min-h-screen">
        <section className="bg-surface-dark text-white">
          <div className="container-custom py-16">
            <div className="text-center max-w-4xl mx-auto">
              <span className="font-script text-spain-gold text-lg mb-2 block">Curated Guides</span>
              <h1 className="text-4xl lg:text-6xl font-bold font-heading mb-6">Top 10 Hotel Guides</h1>
              <p className="text-xl lg:text-2xl mb-8 opacity-90">Find your perfect stay in Spain. Current rates, guest reviews, and insider booking tips for every major destination.</p>
              <div className="flex justify-center items-center gap-4 text-sm flex-wrap">
                <span className="bg-white/20 backdrop-blur text-white px-4 py-2 rounded-full font-medium">Current Rates</span>
                <span className="bg-white/20 backdrop-blur text-white px-4 py-2 rounded-full font-medium">Expert Curated</span>
                <span className="bg-white/20 backdrop-blur text-white px-4 py-2 rounded-full font-medium">Best Deals</span>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white border-b"><div className="container-custom py-4"><Breadcrumbs items={breadcrumbs} /></div></section>

        <section className="bg-surface-dark py-12">
          <div className="container-custom">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
              <div><div className="text-3xl lg:text-4xl font-bold font-heading text-white mb-2">{availableGuides.length}</div><div className="text-gray-400">City Guides</div></div>
              <div><div className="text-3xl lg:text-4xl font-bold font-heading text-white mb-2">{availableGuides.reduce((sum, g) => sum + g.item_count, 0)}+</div><div className="text-gray-400">Hotels</div></div>
              <div><div className="text-3xl lg:text-4xl font-bold font-heading text-white mb-2">{availableGuides.filter(g => g.has_current_data).length}</div><div className="text-gray-400">With Current Rates</div></div>
              <div><div className="text-3xl lg:text-4xl font-bold font-heading text-white mb-2">24/7</div><div className="text-gray-400">Updated Info</div></div>
            </div>
          </div>
        </section>

        {/* Booking Tips */}
        <section className="section-padding bg-white">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold font-heading text-gray-900 mb-4">Smart Booking Tips</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">Get the best deals on Spanish accommodation</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-surface-cream rounded-2xl p-6">
                <h3 className="font-semibold font-heading text-gray-900 mb-2">Book Early</h3>
                <p className="text-gray-600 text-sm">Reserve 2-3 months ahead for best rates, especially during summer, Easter (Semana Santa), and major festivals like La Tomatina or Feria de Abril.</p>
              </div>
              <div className="bg-surface-cream rounded-2xl p-6">
                <h3 className="font-semibold font-heading text-gray-900 mb-2">Check Location</h3>
                <p className="text-gray-600 text-sm">In Barcelona, staying near the Gothic Quarter or Eixample is central but pricey. In Madrid, consider Malasana or Lavapies for better value with great character.</p>
              </div>
              <div className="bg-surface-cream rounded-2xl p-6">
                <h3 className="font-semibold font-heading text-gray-900 mb-2">Compare Prices</h3>
                <p className="text-gray-600 text-sm">Check multiple booking platforms and the hotel's direct website. Direct bookings sometimes include breakfast or upgrades.</p>
              </div>
              <div className="bg-surface-cream rounded-2xl p-6">
                <h3 className="font-semibold font-heading text-gray-900 mb-2">Try a Parador</h3>
                <p className="text-gray-600 text-sm">Spain's Paradores are state-run hotels in historic buildings -- castles, monasteries, and palaces. Unique experiences at reasonable prices, especially off-season.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="section-padding bg-surface-cream">
          <div className="container-custom">
            {availableGuides.length > 0 ? (
              <>
                <div className="text-center mb-12">
                  <h2 className="text-3xl lg:text-4xl font-bold font-heading text-gray-900 mb-4">All Hotel Guides</h2>
                  <p className="text-xl text-gray-600 max-w-2xl mx-auto">Complete collection of hotel guides across Spain</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {availableGuides.map((guide) => (
                    <Link key={guide.city.slug} href={`/city/${guide.city.slug}/top-10-hotels/`} className="group">
                      <div className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-lg transition-shadow">
                        <div className="p-6">
                          <div className="flex items-start justify-between mb-3">
                            <h3 className="text-lg font-semibold text-gray-900 group-hover:text-spain-red transition-colors">{guide.city.name.en}</h3>
                            {guide.has_current_data && (<span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium">Current Rates</span>)}
                          </div>
                          <p className="text-gray-600 text-sm mb-3">{guide.city.region}</p>
                          <div className="flex items-center justify-between text-sm text-gray-500">
                            <span>{guide.item_count} hotels</span>
                            {guide.last_updated && <span>{new Date(guide.last_updated).toLocaleDateString()}</span>}
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-16">
                <h2 className="text-3xl font-bold font-heading text-gray-900 mb-4">Hotel Guides Coming Soon</h2>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">We are currently researching and creating Top 10 hotel guides for Spain's most popular destinations. Check back soon for guides covering Madrid, Barcelona, Seville, and more.</p>
                <Link href="/city/" className="btn-primary">Explore Spanish Cities</Link>
              </div>
            )}
          </div>
        </section>

        <section className="py-12 bg-surface-cream">
          <div className="container-custom">
            <div className="text-center max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold font-heading text-gray-900 mb-3">Book Your Hotel in Spain</h3>
              <p className="text-gray-600 mb-6">Compare rates across top booking platforms and find the best deal for your Spanish holiday.</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-4">
                <a href={siteConfig.affiliateLinks.tripcom} target="_blank" rel="noopener noreferrer" className="inline-block bg-spain-gold text-gray-900 px-6 py-3 rounded-xl font-semibold hover:bg-spain-gold-600 transition-colors">Search on Trip.com</a>
                <a href={siteConfig.affiliateLinks.booking} target="_blank" rel="noopener noreferrer" className="inline-block bg-spain-red text-white px-6 py-3 rounded-xl font-semibold hover:bg-spain-red-600 transition-colors">Search on Booking.com</a>
              </div>
              <p className="text-xs text-gray-500">We earn a commission at no extra cost to you</p>
            </div>
          </div>
        </section>

        <section className="section-padding bg-white">
          <div className="container-custom">
            <div className="text-center max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold font-heading text-gray-900 mb-4">Explore More Top 10 Guides</h3>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/top-10/restaurants/" className="bg-spain-gold text-gray-900 px-6 py-3 rounded-xl font-semibold hover:bg-spain-gold-600 transition-colors">Restaurant Guides</Link>
                <Link href="/top-10/attractions/" className="bg-spain-red text-white px-6 py-3 rounded-xl font-semibold hover:bg-spain-red-600 transition-colors">Attraction Guides</Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const cities = getAllCities();
  const availableGuides: Top10Guide[] = [];
  for (const city of cities) {
    try {
      const dataPath = path.join(process.cwd(), 'data', 'top10', `${city.slug}-hotels.json`);
      if (fs.existsSync(dataPath)) {
        const fileContent = fs.readFileSync(dataPath, 'utf8');
        const data = JSON.parse(fileContent);
        availableGuides.push({ city, title: data.title, meta_description: data.meta_description, last_updated: data.last_perplexity_update || data.generated_at, item_count: data.items?.length || 10, has_current_data: !!(data.data_sources && data.data_sources.length > 0) });
      }
    } catch (error) { /* Skip */ }
  }
  return { props: { availableGuides } };
};
