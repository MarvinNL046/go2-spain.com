import { GetStaticProps, GetStaticPaths } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import SEOHead from '../../components/SEOHead';
import Breadcrumbs from '../../components/Breadcrumbs';
import { siteConfig } from '../../site.config';
import { resolveI18n } from '../../utils/i18n';

const { getIslandBySlug, getIslandSlugs, getAllIslands } = require('../../lib/islands');

interface IslandPageProps {
  island: any;
  relatedIslands: any[];
}

export default function IslandPage({ island, relatedIslands }: IslandPageProps) {
  if (!island) return <div>Island not found</div>;

  const islandName = resolveI18n(island.name);
  const islandDesc = island.enhanced_description || resolveI18n(island.description);

  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: 'Islands', href: '/islands/' },
    { name: islandName, href: `/islands/${island.slug}/` }
  ];

  return (
    <>
      <SEOHead
        title={`${islandName} Travel Guide 2026 - Beaches, Activities & Tips | ${siteConfig.name}`}
        description={islandDesc ? islandDesc.substring(0, 160) : `Complete travel guide for ${islandName}, Spain. Beaches, activities, getting there, and budget tips.`}
        ogImage={island.image?.startsWith('http') ? island.image : `https://go2-spain.com${island.image || ''}`}
      >
        <meta name="keywords" content={`${islandName}, Spain, ${island.archipelago || ''}, beaches, travel guide`} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org", "@type": "TouristDestination",
          "name": islandName, "description": islandDesc,
          "image": island.image?.startsWith('http') ? island.image : `https://go2-spain.com${island.image || ''}`,
          "url": `https://go2-spain.com/islands/${island.slug}/`,
          "containedInPlace": { "@type": "Country", "name": "Spain" }
        }) }} />
      </SEOHead>

      <div className="bg-surface-cream min-h-screen">
        <section className="bg-white shadow-sm">
          <div className="container-custom py-4"><Breadcrumbs items={breadcrumbs} /></div>
        </section>

        <section className="bg-white">
          <div className="container-custom py-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {island.archipelago && (
                    <span className="bg-spain-red/10 text-spain-red px-3 py-1 rounded-full text-sm font-medium">{island.archipelago}</span>
                  )}
                </div>
                <h1 className="text-4xl lg:text-5xl font-heading font-bold text-gray-900 mb-4">{islandName}</h1>
                <p className="text-lg text-gray-700 mb-8 leading-relaxed">{islandDesc || `Welcome to ${islandName}. More content coming soon.`}</p>
                {island.bestFor && island.bestFor.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {island.bestFor.map((tag: string, index: number) => (
                      <span key={index} className="bg-blue-50 text-blue-700 px-3 py-1.5 rounded-full text-sm">{tag}</span>
                    ))}
                  </div>
                )}
              </div>
              <div className="relative">
                {island.image && (
                  <img src={island.image} alt={islandName} className="w-full h-96 object-cover rounded-2xl shadow-md"
                    onError={(e) => { e.currentTarget.src = '/images/placeholder-island.jpg'; }} />
                )}
              </div>
            </div>
          </div>
        </section>

        <section className="section-padding">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2 space-y-8">
                {island.beaches && island.beaches.length > 0 && (
                  <div className="bg-white rounded-2xl shadow-md p-8">
                    <h2 className="text-2xl font-heading font-bold text-gray-900 mb-6">Beaches</h2>
                    <div className="space-y-4">
                      {island.beaches.map((beach: any, index: number) => (
                        <div key={index} className="border-l-4 border-blue-400 pl-4">
                          <h3 className="font-heading font-semibold text-gray-900">{resolveI18n(beach.name || beach)}</h3>
                          {beach.description && <p className="text-gray-600 text-sm">{resolveI18n(beach.description)}</p>}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {island.activities && island.activities.length > 0 && (
                  <div className="bg-white rounded-2xl shadow-md p-8">
                    <h2 className="text-2xl font-heading font-bold text-gray-900 mb-6">Activities</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {island.activities.map((activity: any, index: number) => (
                        <div key={index} className="bg-surface-cream rounded-xl p-4">
                          <h3 className="font-heading font-semibold text-gray-900">{resolveI18n(activity.name || activity)}</h3>
                          {activity.description && <p className="text-gray-600 text-sm">{resolveI18n(activity.description)}</p>}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {island.getting_there && (
                  <div className="bg-white rounded-2xl shadow-md p-8">
                    <h2 className="text-2xl font-heading font-bold text-gray-900 mb-6">Getting There</h2>
                    <p className="text-gray-700">{resolveI18n(island.getting_there)}</p>
                  </div>
                )}

                {island.budget && (
                  <div className="bg-white rounded-2xl shadow-md p-8">
                    <h2 className="text-2xl font-heading font-bold text-gray-900 mb-6">Budget Information</h2>
                    <p className="text-gray-700">{resolveI18n(island.budget)}</p>
                  </div>
                )}

                {island.travel_tips && island.travel_tips.length > 0 && (
                  <div className="bg-white rounded-2xl shadow-md p-8">
                    <h2 className="text-2xl font-heading font-bold text-gray-900 mb-6">Travel Tips</h2>
                    <ul className="list-disc list-inside space-y-2 text-gray-700">
                      {island.travel_tips.map((tip: any, index: number) => (
                        <li key={index}>{resolveI18n(tip)}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <div className="space-y-8">
                <div className="bg-surface-dark text-white rounded-2xl p-6">
                  <h3 className="text-lg font-bold font-heading mb-3">Book Hotels in {islandName}</h3>
                  <p className="text-sm opacity-90 mb-4">Find the best deals on island accommodation.</p>
                  <div className="space-y-3">
                    <a href={siteConfig.affiliateLinks.booking} target="_blank" rel="noopener noreferrer"
                      className="block bg-white text-spain-red text-center px-4 py-2 rounded-xl font-semibold hover:bg-gray-100 transition-colors text-sm">Booking.com</a>
                    <a href={siteConfig.affiliateLinks.tripcom} target="_blank" rel="noopener noreferrer"
                      className="block bg-white text-spain-red text-center px-4 py-2 rounded-xl font-semibold hover:bg-gray-100 transition-colors text-sm">Trip.com</a>
                  </div>
                  <p className="text-xs opacity-70 mt-3 text-center">Affiliate links</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {relatedIslands.length > 0 && (
          <section className="bg-white section-padding">
            <div className="container-custom">
              <h2 className="text-3xl font-heading font-bold text-gray-900 mb-8 text-center">More Islands to Explore</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {relatedIslands.map((ri: any) => (
                  <Link key={ri.slug} href={`/islands/${ri.slug}/`} className="group">
                    <div className="bg-surface-cream rounded-2xl overflow-hidden shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                      {ri.image && <div className="relative h-40"><Image src={ri.image} alt={resolveI18n(ri.name)} fill className="object-cover group-hover:scale-105 transition-transform duration-300" /></div>}
                      <div className="p-4">
                        <h3 className="font-heading font-semibold text-gray-900 group-hover:text-spain-red transition-colors">{resolveI18n(ri.name)}</h3>
                        {ri.archipelago && <p className="text-gray-600 text-sm">{ri.archipelago}</p>}
                      </div>
                    </div>
                  </Link>
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
  const slugs = getIslandSlugs();
  const paths = slugs.map((slug: string) => ({ params: { slug } }));
  return { paths, fallback: 'blocking' };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string;
  const island = getIslandBySlug(slug);
  if (!island) return { notFound: true };

  const allIslands = getAllIslands();
  const relatedIslands = allIslands
    .filter((i: any) => i.slug !== slug && i.archipelago === island.archipelago)
    .slice(0, 3);

  return { props: { island, relatedIslands }, revalidate: 86400 };
};
