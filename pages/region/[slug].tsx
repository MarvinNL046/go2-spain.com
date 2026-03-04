import { GetStaticProps, GetStaticPaths } from 'next';
import SEOHead from '../../components/SEOHead';
import Image from 'next/image';
import Link from 'next/link';
import Breadcrumbs from '../../components/Breadcrumbs';
import CityCard from '../../components/CityCard';
import { siteConfig } from '../../site.config';
import { resolveI18n } from '../../utils/i18n';

const { getAllRegions, getRegionBySlug } = require('../../lib/regions');
const { getAllCities } = require('../../lib/cities');

interface RegionPageProps {
  region: any;
  cities: any[];
}

export default function RegionPage({ region, cities }: RegionPageProps) {
  if (!region) return <div>Region not found</div>;

  const regionName = resolveI18n(region.name);
  const regionDesc = resolveI18n(region.description);

  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: 'Regions', href: '/region/' },
    { name: regionName, href: `/region/${region.slug}/` }
  ];

  return (
    <>
      <SEOHead
        title={region.seo?.metaTitle ? resolveI18n(region.seo.metaTitle) : `${regionName} Travel Guide | ${siteConfig.name}`}
        description={region.seo?.metaDescription ? resolveI18n(region.seo.metaDescription) : regionDesc}
        ogImage={region.image?.startsWith('http') ? region.image : `https://go2-spain.com${region.image || ''}`}
      >
        <meta name="keywords" content={`${regionName}, Spain, ${(region.cities || []).join(', ')}, travel guide, attractions, culture`} />
      </SEOHead>

      <div className="bg-surface-cream min-h-screen">
        <section className="relative h-96 lg:h-[500px] overflow-hidden">
          <div className="absolute inset-0">
            {region.image && <Image src={region.image} alt={`${regionName}, Spain`} fill className="object-cover" priority />}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
          </div>
          <div className="relative z-10 h-full flex items-end">
            <div className="container-custom pb-12 text-white">
              <div className="max-w-4xl">
                <div className="flex items-center mb-4">
                  <span className="bg-spain-red text-white px-3 py-1 rounded-xl text-sm font-semibold mr-3">{cities.length} Cities</span>
                  {region.bestTimeToVisit && <span className="text-gray-200 text-sm">Best time: {region.bestTimeToVisit}</span>}
                </div>
                <span className="font-script text-spain-gold text-lg">Explore the region</span>
                <h1 className="text-4xl lg:text-6xl font-bold font-heading mb-4">{regionName}</h1>
                <p className="text-xl lg:text-2xl text-gray-200 max-w-3xl">{regionDesc}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-surface-cream">
          <div className="container-custom py-8">
            <Breadcrumbs items={breadcrumbs} />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2">
                <div className="mb-12">
                  <h2 className="text-3xl font-bold font-heading text-gray-900 mb-6">About {regionName}</h2>
                  <p className="text-gray-700 leading-relaxed mb-6">{regionDesc}</p>
                </div>

                {(region.geography || region.culture) && (
                  <div className="mb-12">
                    <h2 className="text-3xl font-bold font-heading text-gray-900 mb-6">Geography & Culture</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {region.geography && (
                        <div className="bg-white rounded-2xl shadow-sm p-6">
                          <h3 className="text-lg font-semibold font-heading mb-2">Geography</h3>
                          <p className="text-gray-700">{resolveI18n(region.geography)}</p>
                        </div>
                      )}
                      {region.culture && (
                        <div className="bg-white rounded-2xl shadow-sm p-6">
                          <h3 className="text-lg font-semibold font-heading mb-2">Culture</h3>
                          <p className="text-gray-700">{resolveI18n(region.culture)}</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {region.cuisine && (
                  <div className="mb-12">
                    <h2 className="text-3xl font-bold font-heading text-gray-900 mb-6">Regional Cuisine</h2>
                    <div className="bg-white rounded-2xl shadow-sm p-6">
                      <p className="text-gray-700">{resolveI18n(region.cuisine)}</p>
                    </div>
                  </div>
                )}

                {region.topActivities && region.topActivities.length > 0 && (
                  <div className="mb-12">
                    <h2 className="text-3xl font-bold font-heading text-gray-900 mb-6">Top Activities</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {region.topActivities.map((activity: any, index: number) => (
                        <div key={index} className="bg-white rounded-xl shadow-sm p-4 flex items-start">
                          <span className="bg-spain-red text-white w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold mr-3 flex-shrink-0">{index + 1}</span>
                          <p className="text-gray-700">{resolveI18n(activity)}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {cities.length > 0 && (
                  <div className="mb-12">
                    <h2 className="text-3xl font-bold font-heading text-gray-900 mb-6">Cities in {regionName}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {cities.map((city: any) => (
                        <CityCard
                          key={city.slug}
                          city={city}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {region.hiddenGems && region.hiddenGems.length > 0 && (
                  <div className="mb-12">
                    <h2 className="text-3xl font-bold font-heading text-gray-900 mb-6">Hidden Gems</h2>
                    <div className="space-y-3">
                      {region.hiddenGems.map((gem: any, index: number) => (
                        <div key={index} className="bg-white rounded-xl shadow-sm p-4 flex items-start">
                          <span className="text-spain-gold mr-3 text-xl">&#9733;</span>
                          <p className="text-gray-700">{resolveI18n(gem)}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <aside>
                <div className="lg:sticky lg:top-4 space-y-6">
                  {region.statistics && (
                    <div className="bg-white rounded-2xl shadow-sm p-6">
                      <h3 className="text-lg font-bold font-heading text-gray-900 mb-4">Quick Facts</h3>
                      <dl className="space-y-3">
                        {region.statistics.area && <div className="flex justify-between"><dt className="text-gray-500 text-sm">Area</dt><dd className="font-medium text-sm">{region.statistics.area}</dd></div>}
                        {region.statistics.population && <div className="flex justify-between"><dt className="text-gray-500 text-sm">Population</dt><dd className="font-medium text-sm">{region.statistics.population}</dd></div>}
                        {region.statistics.majorCity && <div className="flex justify-between"><dt className="text-gray-500 text-sm">Major City</dt><dd className="font-medium text-sm">{region.statistics.majorCity}</dd></div>}
                      </dl>
                    </div>
                  )}

                  {region.highlights && region.highlights.length > 0 && (
                    <div className="bg-white rounded-2xl shadow-sm p-6">
                      <h3 className="text-lg font-bold font-heading text-gray-900 mb-4">Highlights</h3>
                      <ul className="space-y-2">
                        {region.highlights.map((highlight: any, index: number) => (
                          <li key={index} className="flex items-start text-sm">
                            <svg className="w-4 h-4 text-spain-red mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            {resolveI18n(highlight)}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {region.travelTips && region.travelTips.length > 0 && (
                    <div className="bg-white rounded-2xl shadow-sm p-6">
                      <h3 className="text-lg font-bold font-heading text-gray-900 mb-4">Travel Tips</h3>
                      <ul className="space-y-2">
                        {region.travelTips.map((tip: any, index: number) => (
                          <li key={index} className="flex items-start text-sm">
                            <span className="text-spain-gold mr-2">&#8226;</span>
                            <span className="text-gray-700">{resolveI18n(tip)}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="bg-surface-dark text-white rounded-2xl p-6">
                    <h3 className="text-lg font-bold font-heading mb-3">Book Hotels in {regionName}</h3>
                    <p className="text-sm opacity-90 mb-4">Find the best deals on accommodation in {regionName}.</p>
                    <div className="space-y-3">
                      <a href={siteConfig.affiliateLinks.booking} target="_blank" rel="noopener noreferrer" className="block bg-white text-spain-red text-center px-4 py-2 rounded-xl font-semibold hover:bg-gray-100 transition-colors text-sm">Booking.com</a>
                      <a href={siteConfig.affiliateLinks.tripcom} target="_blank" rel="noopener noreferrer" className="block bg-white text-spain-red text-center px-4 py-2 rounded-xl font-semibold hover:bg-gray-100 transition-colors text-sm">Trip.com</a>
                    </div>
                    <p className="text-xs opacity-70 mt-3 text-center">Affiliate links</p>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </section>

        <section className="bg-surface-dark text-white section-padding">
          <div className="container-custom text-center">
            <span className="font-script text-spain-gold text-lg">Keep exploring</span>
            <h2 className="text-3xl lg:text-4xl font-bold font-heading mb-6 mt-2">Discover More of Spain</h2>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/region/" className="bg-spain-red text-white px-8 py-3 rounded-xl font-semibold hover:bg-spain-red/90 transition-colors">All Regions</Link>
              <Link href="/city/" className="bg-white bg-opacity-20 text-white border-2 border-white px-8 py-3 rounded-xl font-semibold hover:bg-white hover:text-spain-red transition-colors">Explore Cities</Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const regions = getAllRegions();
  const paths = regions.map((region: any) => ({ params: { slug: region.slug } }));
  return { paths, fallback: 'blocking' };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string;
  let region = getRegionBySlug(slug);

  if (!region) {
    const allRegions = getAllRegions();
    region = allRegions.find((r: any) => r.slug === slug) || null;
  }

  if (!region) return { notFound: true };

  const allCities = getAllCities();
  const regionName = resolveI18n(region.name);
  const regionCities = allCities.filter((city: any) => city.region === regionName);

  return { props: { region, cities: regionCities } };
};
