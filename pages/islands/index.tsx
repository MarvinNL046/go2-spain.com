import { GetStaticProps } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import SEOHead from '../../components/SEOHead';
import Breadcrumbs from '../../components/Breadcrumbs';
import { siteConfig } from '../../site.config';
import { resolveI18n } from '../../utils/i18n';

const { getAllIslands } = require('../../lib/islands');

interface IslandsPageProps {
  islands: any[];
  balearicIslands: any[];
  canaryIslands: any[];
}

export default function IslandsIndex({ islands, balearicIslands, canaryIslands }: IslandsPageProps) {
  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: 'Islands', href: '/islands/' }
  ];

  const renderIslandGroup = (groupIslands: any[], groupName: string) => (
    <div className="mb-12">
      <h2 className="text-2xl font-heading font-bold text-gray-900 mb-6">{groupName}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {groupIslands.map((island: any) => {
          const islandName = resolveI18n(island.name);
          const islandDesc = resolveI18n(island.description);
          return (
            <Link key={island.slug} href={`/islands/${island.slug}/`} className="group">
              <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className="relative h-48">
                  {island.image ? (
                    <Image src={island.image} alt={islandName} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                      <span className="text-white text-4xl font-heading font-bold">{islandName.charAt(0)}</span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3">
                    <span className="bg-spain-red text-white px-2 py-1 rounded-full text-xs font-medium">
                      {island.archipelago || groupName}
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-heading text-lg font-bold text-gray-900 mb-1 group-hover:text-spain-red transition-colors">
                    {islandName}
                  </h3>
                  {islandDesc && <p className="text-gray-600 text-sm mb-3 line-clamp-2">{islandDesc}</p>}
                  {island.bestFor && island.bestFor.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {island.bestFor.slice(0, 3).map((tag: string, i: number) => (
                        <span key={i} className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-full">{tag}</span>
                      ))}
                    </div>
                  )}
                  <div className="mt-3">
                    <span className="text-spain-red font-medium text-sm group-hover:text-spain-gold transition-colors">
                      Explore {islandName} &rarr;
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );

  return (
    <>
      <SEOHead
        title={`Spanish Islands Guide 2026 - Balearic & Canary Islands | ${siteConfig.name}`}
        description="Explore Spain's stunning islands. From the Balearic Islands (Mallorca, Ibiza, Menorca) to the Canary Islands (Tenerife, Gran Canaria, Lanzarote). Beaches, activities, and travel tips."
      >
        <meta name="keywords" content="Spanish islands, Balearic Islands, Canary Islands, Mallorca, Ibiza, Tenerife, Gran Canaria, Menorca, Lanzarote" />
      </SEOHead>

      <div className="min-h-screen bg-surface-cream">
        <section className="relative bg-surface-dark py-20">
          <div className="relative container-custom text-center text-white">
            <p className="font-script text-spain-gold mb-2">Island Paradise</p>
            <h1 className="text-4xl lg:text-5xl font-heading font-bold mb-4">Spanish Islands</h1>
            <p className="text-xl max-w-3xl mx-auto">
              From the turquoise waters of the Balearics to the volcanic landscapes of the Canaries, discover Spain's incredible island destinations
            </p>
          </div>
        </section>

        <section className="bg-white py-4">
          <div className="container-custom"><Breadcrumbs items={breadcrumbs} /></div>
        </section>

        <section className="py-12">
          <div className="container-custom">
            {islands.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-gray-500 text-lg font-medium mb-2">Content coming soon!</p>
                <p className="text-gray-400 text-sm">We are working on adding detailed island guides.</p>
              </div>
            ) : (
              <>
                {balearicIslands.length > 0 && renderIslandGroup(balearicIslands, 'Balearic Islands')}
                {canaryIslands.length > 0 && renderIslandGroup(canaryIslands, 'Canary Islands')}
                {/* Render any remaining islands not in these two groups */}
                {islands.filter((i: any) => !['Balearic Islands', 'Canary Islands'].includes(i.archipelago)).length > 0 && (
                  renderIslandGroup(
                    islands.filter((i: any) => !['Balearic Islands', 'Canary Islands'].includes(i.archipelago)),
                    'Other Islands'
                  )
                )}
              </>
            )}
          </div>
        </section>

        <section className="bg-white py-12">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto text-center">
              <p className="section-label font-script text-spain-gold">About</p>
              <h2 className="text-3xl font-heading font-bold mb-4">About Spain's Islands</h2>
              <p className="text-gray-600 mb-8">
                Spain boasts two major archipelagos: the Balearic Islands in the Mediterranean and the Canary Islands in the Atlantic Ocean off the coast of Africa. Together they offer an incredible variety of landscapes, from pristine beaches and party hotspots to volcanic national parks and serene nature retreats.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-surface-cream p-6 rounded-2xl">
                  <h3 className="font-heading font-semibold mb-2">Balearic Islands</h3>
                  <p className="text-sm text-gray-600">Mallorca, Menorca, Ibiza, and Formentera -- Mediterranean beaches, nightlife, and culture</p>
                </div>
                <div className="bg-surface-cream p-6 rounded-2xl">
                  <h3 className="font-heading font-semibold mb-2">Canary Islands</h3>
                  <p className="text-sm text-gray-600">Tenerife, Gran Canaria, Lanzarote, Fuerteventura -- year-round sunshine, volcanoes, and nature</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-surface-dark py-8">
          <div className="container-custom">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-white">
                <h2 className="text-2xl font-bold font-heading mb-1">Book Your Island Getaway</h2>
                <p className="opacity-90 text-sm">Find the best deals on island hotels, flights, and activities</p>
              </div>
              <div className="flex flex-wrap justify-center gap-3">
                <a href={siteConfig.affiliateLinks.booking} target="_blank" rel="noopener noreferrer" className="bg-white text-spain-red px-5 py-2 rounded-full font-semibold text-sm hover:bg-gray-100 transition-colors">Booking.com</a>
                <a href={siteConfig.affiliateLinks.klook} target="_blank" rel="noopener noreferrer" className="bg-white text-spain-red px-5 py-2 rounded-full font-semibold text-sm hover:bg-gray-100 transition-colors">Activities</a>
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
  const islands = getAllIslands();
  const balearicIslands = islands.filter((i: any) => i.archipelago === 'Balearic Islands');
  const canaryIslands = islands.filter((i: any) => i.archipelago === 'Canary Islands');
  return { props: { islands, balearicIslands, canaryIslands } };
};
