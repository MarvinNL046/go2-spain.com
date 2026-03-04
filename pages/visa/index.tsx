import { GetStaticProps } from 'next';
import SEOHead from '../../components/SEOHead';
import Link from 'next/link';
import Breadcrumbs from '../../components/Breadcrumbs';
import { siteConfig } from '../../site.config';

const { getAllVisas } = require('../../lib/visas');

interface VisaPageProps {
  visas: any[];
}

export default function VisaIndexPage({ visas }: VisaPageProps) {
  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: 'Visa Guide', href: '/visa/' }
  ];

  const categories = [
    { key: 'schengen', label: 'Schengen Visa Types', icon: '🇪🇺' },
    { key: 'visa-free', label: 'Visa-Free Entry', icon: '✈️' },
    { key: 'long-stay', label: 'Long-Stay Visas', icon: '🏠' },
    { key: 'work', label: 'Work & Student Visas', icon: '💼' },
    { key: 'general', label: 'Processes & Info', icon: '📋' }
  ];

  return (
    <>
      <SEOHead
        title={`Spain Visa Guide 2026 | Schengen Requirements & Entry Rules | ${siteConfig.name}`}
        description="Complete Spain visa guide 2026. Schengen visa requirements, visa-free entry for US/UK/Canada/Australia (90 days), long-stay visas, work permits & student visas."
      >
        <meta name="keywords" content="Spain visa, Schengen visa, Spain visa requirements, visa-free Spain, long-stay visa Spain, Spain work permit, Spain student visa" />
      </SEOHead>

      <div className="bg-surface-cream min-h-screen">
        <section className="bg-surface-dark text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center">
              <p className="font-script text-spain-gold mb-2">Visa Information</p>
              <h1 className="text-4xl lg:text-6xl font-bold font-heading mb-6">Spain Visa Guide 2026</h1>
              <p className="text-xl lg:text-2xl mb-4 max-w-3xl mx-auto opacity-90">
                Everything you need to know about visas and entry requirements for Spain
              </p>
              <p className="text-lg max-w-2xl mx-auto opacity-80">
                From Schengen visa-free entry to long-stay visas and work permits -- find the right option for your trip
              </p>
            </div>
          </div>
        </section>

        <section className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <Breadcrumbs items={breadcrumbs} />
          </div>
        </section>

        <section className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="bg-blue-50 border-0 rounded-2xl p-6">
              <h2 className="text-lg font-bold font-heading text-blue-800 mb-2">Good news for many travelers!</h2>
              <p className="text-blue-700">
                Citizens of the USA, Canada, Australia, UK, Japan, and 60+ other countries can enter Spain and the entire Schengen Area visa-free for up to 90 days within any 180-day period. Starting in 2026, the ETIAS (European Travel Information and Authorisation System) will be required for visa-exempt travelers -- a simple online application costing 7 EUR.
              </p>
            </div>
          </div>
        </section>

        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {visas.length > 0 ? (
              categories.map(category => {
                const categoryVisas = visas.filter((v: any) => v.category === category.key);
                if (categoryVisas.length === 0) return null;
                return (
                  <div key={category.key} className="mb-12">
                    <h2 className="text-2xl font-bold font-heading text-gray-900 mb-6">{category.icon} {category.label}</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {categoryVisas.map((visa: any) => (
                        <Link key={visa.id || visa.slug} href={`/visa/${visa.slug}/`} className="bg-white rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all p-6 group">
                          <div className="flex items-start justify-between mb-4">
                            <span className="text-3xl">{visa.icon}</span>
                            <span className="bg-spain-red/10 text-spain-red px-2 py-1 rounded-full text-xs font-medium">{visa.cost}</span>
                          </div>
                          <h3 className="text-lg font-bold font-heading text-gray-900 group-hover:text-spain-red transition-colors mb-2">
                            {visa.title?.en || visa.title}
                          </h3>
                          <div className="flex items-center text-sm text-gray-600">
                            <span>Duration: {visa.duration}</span>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="space-y-12">
                <div>
                  <h2 className="text-2xl font-bold font-heading text-gray-900 mb-6">Visa-Free Entry (Schengen Area)</h2>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="bg-white rounded-2xl shadow-md p-6">
                      <span className="text-3xl mb-4 block">🇺🇸</span>
                      <h3 className="text-lg font-bold font-heading text-gray-900 mb-2">USA, Canada, Australia</h3>
                      <p className="text-gray-600 text-sm mb-2">90 days visa-free within any 180-day period. Valid for tourism, business meetings, and short courses.</p>
                      <span className="text-xs text-spain-red font-medium">No visa fee</span>
                    </div>
                    <div className="bg-white rounded-2xl shadow-md p-6">
                      <span className="text-3xl mb-4 block">🇬🇧</span>
                      <h3 className="text-lg font-bold font-heading text-gray-900 mb-2">UK Citizens (Post-Brexit)</h3>
                      <p className="text-gray-600 text-sm mb-2">90 days visa-free in the Schengen Area per 180-day period. ETIAS required from 2026.</p>
                      <span className="text-xs text-spain-red font-medium">ETIAS: 7 EUR</span>
                    </div>
                    <div className="bg-white rounded-2xl shadow-md p-6">
                      <span className="text-3xl mb-4 block">🇪🇺</span>
                      <h3 className="text-lg font-bold font-heading text-gray-900 mb-2">EU/EEA Citizens</h3>
                      <p className="text-gray-600 text-sm mb-2">Unlimited stay and right to work. No visa or permit needed. Just bring a valid passport or national ID card.</p>
                      <span className="text-xs text-spain-red font-medium">Free movement</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h2 className="text-2xl font-bold font-heading text-gray-900 mb-6">Long-Stay Visas</h2>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="bg-white rounded-2xl shadow-md p-6">
                      <span className="text-3xl mb-4 block">🎓</span>
                      <h3 className="text-lg font-bold font-heading text-gray-900 mb-2">Student Visa</h3>
                      <p className="text-gray-600 text-sm mb-2">For studies lasting more than 90 days. Apply through the Spanish consulate in your home country. Allows part-time work (20 hours per week).</p>
                      <span className="text-xs text-spain-red font-medium">60 EUR application fee</span>
                    </div>
                    <div className="bg-white rounded-2xl shadow-md p-6">
                      <span className="text-3xl mb-4 block">💼</span>
                      <h3 className="text-lg font-bold font-heading text-gray-900 mb-2">Work Visa</h3>
                      <p className="text-gray-600 text-sm mb-2">Required for employment in Spain. Your employer must obtain a work authorization first. Valid for 1 year, renewable.</p>
                      <span className="text-xs text-spain-red font-medium">80 EUR application fee</span>
                    </div>
                    <div className="bg-white rounded-2xl shadow-md p-6">
                      <span className="text-3xl mb-4 block">💻</span>
                      <h3 className="text-lg font-bold font-heading text-gray-900 mb-2">Digital Nomad Visa</h3>
                      <p className="text-gray-600 text-sm mb-2">Spain introduced a digital nomad visa in 2023. For remote workers employed by non-Spanish companies. Valid up to 5 years.</p>
                      <span className="text-xs text-spain-red font-medium">80 EUR application fee</span>
                    </div>
                    <div className="bg-white rounded-2xl shadow-md p-6">
                      <span className="text-3xl mb-4 block">🏖️</span>
                      <h3 className="text-lg font-bold font-heading text-gray-900 mb-2">Non-Lucrative Visa</h3>
                      <p className="text-gray-600 text-sm mb-2">For retirees and those not working. Must demonstrate sufficient income (approximately 2,400 EUR per month). No work allowed.</p>
                      <span className="text-xs text-spain-red font-medium">80 EUR application fee</span>
                    </div>
                    <div className="bg-white rounded-2xl shadow-md p-6">
                      <span className="text-3xl mb-4 block">💰</span>
                      <h3 className="text-lg font-bold font-heading text-gray-900 mb-2">Golden Visa</h3>
                      <p className="text-gray-600 text-sm mb-2">Residency through investment. Real estate investment of 500,000+ EUR or other qualifying investments. Includes family members.</p>
                      <span className="text-xs text-spain-red font-medium">Varies by investment</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        <section className="py-12 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold font-heading text-gray-900 mb-6">Spain Visa Overview 2026</h2>
            <div className="prose prose-lg max-w-none text-gray-700">
              <p>
                Spain, as a member of the Schengen Area, follows the unified European visa policy that allows travelers to move freely between 27 European countries with a single visa. For most short-term visitors from the USA, Canada, Australia, UK, Japan, and many other countries, no visa is needed for stays up to 90 days within any 180-day period.
              </p>
              <p>
                Spain stands out among Schengen countries for its Digital Nomad Visa, introduced in 2023, which allows remote workers to live in Spain for up to 5 years. This has made Spain one of the most attractive destinations for location-independent professionals.
              </p>
              <h3 className="font-heading">Key Points for 2026</h3>
              <ul>
                <li><strong>Schengen visa-free countries:</strong> 90 days within 180 days for 60+ nationalities</li>
                <li><strong>EU/EEA citizens:</strong> Unlimited stay with right to work -- just bring a valid ID</li>
                <li><strong>UK citizens (post-Brexit):</strong> 90-day visa-free access, ETIAS required from 2026</li>
                <li><strong>ETIAS:</strong> New pre-travel authorization for visa-exempt travelers (7 EUR, valid 3 years)</li>
                <li><strong>Digital Nomad Visa:</strong> Remote workers can apply for up to 5 years of residency</li>
                <li><strong>Golden Visa:</strong> Residency through investment (500,000+ EUR in real estate)</li>
                <li><strong>Non-Lucrative Visa:</strong> Popular with retirees -- requires proof of passive income</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="bg-surface-dark">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-white">
                <h2 className="text-2xl font-bold font-heading mb-1">Plan Your Spain Trip</h2>
                <p className="opacity-90 text-sm">Book hotels, transport and more</p>
              </div>
              <div className="flex flex-wrap justify-center gap-3">
                <a href={siteConfig.affiliateLinks.booking} target="_blank" rel="noopener noreferrer" className="bg-white text-spain-red px-5 py-2 rounded-full font-semibold text-sm hover:bg-gray-100 transition-colors">Booking.com</a>
                <a href={siteConfig.affiliateLinks.tripcom} target="_blank" rel="noopener noreferrer" className="bg-white text-spain-red px-5 py-2 rounded-full font-semibold text-sm hover:bg-gray-100 transition-colors">Trip.com</a>
                <Link href="/travel-insurance/" className="bg-white text-spain-red px-5 py-2 rounded-full font-semibold text-sm hover:bg-gray-100 transition-colors">Travel Insurance</Link>
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
  const visas = getAllVisas();
  return { props: { visas } };
};
