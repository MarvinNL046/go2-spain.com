import { GetStaticProps } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import Breadcrumbs from '../../components/Breadcrumbs';
import SEOHead from '../../components/SEOHead';
import { siteConfig } from '../../site.config';
import { resolveI18n } from '../../utils/i18n';

const { getAllDrinks } = require('../../lib/drinks');

interface DrinksPageProps {
  drinks: any[];
}

function getCategoryIcon(category: string) {
  const icons: Record<string, string> = {
    'wine': '', 'sherry': '', 'spirits': '', 'liqueur': '', 'beer': '',
    'coffee': '', 'tea': '', 'juice': '', 'cocktail': '', 'sangria': '',
    'non-alcoholic': '', 'aperitif': '', 'water': '',
  };
  return icons[category] || '';
}

export default function DrinksPage({ drinks }: DrinksPageProps) {
  const drinksByCategory = drinks.reduce((acc: Record<string, any[]>, drink: any) => {
    const cat = drink.category || 'other';
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(drink);
    return acc;
  }, {});

  const categories = Object.keys(drinksByCategory);

  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: 'Spanish Drinks', href: '/drinks/' }
  ];

  return (
    <>
      <SEOHead
        title={`Spanish Drinks Guide 2026 -- ${drinks.length} Beverages You Must Try | ${siteConfig.name}`}
        description={`Discover ${drinks.length} authentic Spanish drinks from Rioja wine to sangria, sherry and horchata. Recipes, prices and where to find them across Spain.`}
      >
        <meta name="keywords" content="Spanish drinks, Spanish wine, Rioja, sangria, sherry, cava, Spanish coffee, Spanish beverages" />
      </SEOHead>

      <div className="min-h-screen bg-surface-cream">
        <section className="relative bg-surface-dark py-20">
          <div className="relative container-custom text-center text-white">
            <p className="font-script text-spain-gold mb-2">Salud!</p>
            <h1 className="text-4xl lg:text-5xl font-heading font-bold mb-4">
              Spanish Drinks &amp; Beverages
            </h1>
            <p className="text-xl max-w-3xl mx-auto">
              From world-renowned wines and cava to refreshing sangria and horchata, explore the diverse world of Spanish beverages
            </p>
          </div>
        </section>

        <section className="bg-white py-4">
          <div className="container-custom">
            <Breadcrumbs items={breadcrumbs} />
          </div>
        </section>

        {categories.length > 0 && (
          <section className="bg-white py-8 border-b">
            <div className="container-custom">
              <p className="section-label font-script text-spain-gold text-center">Categories</p>
              <h2 className="text-2xl font-heading font-bold text-center mb-6">Browse by Category</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {categories.slice(0, 5).map(category => (
                  <div key={category} className="bg-surface-cream p-4 rounded-2xl text-center hover:shadow-xl hover:-translate-y-1 transition-all">
                    <div className="text-3xl mb-2">{getCategoryIcon(category)}</div>
                    <h3 className="font-heading font-semibold capitalize">{category}</h3>
                    <p className="text-sm text-gray-600">{drinksByCategory[category]?.length || 0} drinks</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        <section className="py-12">
          <div className="container-custom">
            {drinks.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-gray-500 text-lg font-medium mb-2">Content coming soon!</p>
                <p className="text-gray-400 text-sm">We are working on adding Spanish drink guides.</p>
              </div>
            ) : (
              categories.map((category) => (
                <div key={category} className="mb-12">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-heading font-bold capitalize flex items-center gap-2">
                      {getCategoryIcon(category)} {category} Drinks
                    </h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {drinksByCategory[category].slice(0, 4).map((drink: any) => {
                      const drinkName = resolveI18n(drink.name);
                      const drinkEs = typeof drink.name === 'object' ? drink.name.es : '';
                      const drinkDesc = drink.enhanced_description || resolveI18n(drink.description);
                      return (
                        <Link key={drink.slug} href={`/drinks/${drink.slug}/`}>
                          <div className="bg-white rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden group">
                            <div className="relative h-48">
                              {drink.image && (
                                <Image src={drink.image} alt={drinkName} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
                              )}
                              {drink.alcohol_content && drink.alcohol_content !== 'none' && (
                                <div className="absolute top-2 left-2">
                                  <span className="bg-spain-red text-white px-2 py-1 rounded-full text-xs font-medium">
                                    {drink.alcohol_content}
                                  </span>
                                </div>
                              )}
                            </div>
                            <div className="p-4">
                              <h3 className="font-heading font-bold text-lg mb-1 group-hover:text-spain-red transition-colors">
                                {drinkName}
                              </h3>
                              {drinkEs && <p className="text-sm text-gray-500 mb-2">{drinkEs}</p>}
                              <p className="text-sm text-gray-600 mb-3 line-clamp-2">{drinkDesc}</p>
                              <div className="flex items-center justify-between text-sm">
                                <span className="text-gray-500">{drink.price_range}</span>
                                <span className="text-spain-red group-hover:text-spain-gold font-medium">Learn more &rarr;</span>
                              </div>
                            </div>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              ))
            )}
          </div>
        </section>

        <section className="bg-white py-16">
          <div className="container-custom">
            <div className="text-center mb-10">
              <p className="section-label font-script text-spain-gold">Experience</p>
              <h2 className="text-3xl lg:text-4xl font-heading font-bold text-gray-900 mb-4">
                Experience Spanish Food &amp; Drink Culture
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Taste the best of Spain with guided wine tours, tapas walks, and hands-on cooking experiences
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="bg-white rounded-2xl shadow-md p-8 text-center">
                <h3 className="text-xl font-heading font-bold text-gray-900 mb-2">Wine Tours &amp; Tastings</h3>
                <p className="text-gray-600 mb-6">Wine tours and tastings across Spain</p>
                <a href={siteConfig.affiliateLinks.klook} target="_blank" rel="noopener noreferrer"
                  className="inline-block bg-spain-red text-white px-8 py-3 rounded-xl font-semibold hover:bg-spain-red/90 transition-colors">Browse on Klook</a>
              </div>
              <div className="bg-white rounded-2xl shadow-md p-8 text-center">
                <h3 className="text-xl font-heading font-bold text-gray-900 mb-2">Cooking &amp; Tasting Experiences</h3>
                <p className="text-gray-600 mb-6">Spanish cooking and tasting experiences</p>
                <a href={siteConfig.affiliateLinks.getYourGuide} target="_blank" rel="noopener noreferrer"
                  className="inline-block bg-spain-red text-white px-8 py-3 rounded-xl font-semibold hover:bg-spain-red/90 transition-colors">Browse on GetYourGuide</a>
              </div>
            </div>
            <p className="text-center text-xs text-gray-400 mt-6">We may earn a commission when you book through our links, at no extra cost to you.</p>
          </div>
        </section>

        <section className="bg-white py-12">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto text-center">
              <p className="section-label font-script text-spain-gold">Culture</p>
              <h2 className="text-3xl font-heading font-bold mb-4">Spanish Drinking Culture</h2>
              <p className="text-gray-600 mb-8">
                Spain's beverage culture is deeply woven into daily life and social traditions. From the morning cafe con leche
                to afternoon wine with tapas and an evening copa, drinks are central to the Spanish art of living.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-surface-cream p-6 rounded-2xl">
                  <h3 className="font-heading font-semibold mb-2">La Hora del Vermut</h3>
                  <p className="text-sm text-gray-600">The pre-lunch vermouth hour is a cherished Spanish social ritual</p>
                </div>
                <div className="bg-surface-cream p-6 rounded-2xl">
                  <h3 className="font-heading font-semibold mb-2">Wine Regions</h3>
                  <p className="text-sm text-gray-600">Spain boasts world-famous wine regions like Rioja, Ribera del Duero and Priorat</p>
                </div>
                <div className="bg-surface-cream p-6 rounded-2xl">
                  <h3 className="font-heading font-semibold mb-2">La Sobremesa</h3>
                  <p className="text-sm text-gray-600">After-meal conversation with coffee and digestifs is a beloved tradition</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const drinks = getAllDrinks();
  return { props: { drinks } };
};
