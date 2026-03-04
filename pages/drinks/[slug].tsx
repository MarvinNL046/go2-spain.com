import { GetStaticProps, GetStaticPaths } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import Breadcrumbs from '../../components/Breadcrumbs';
import SEOHead from '../../components/SEOHead';
import { siteConfig } from '../../site.config';
import { resolveI18n } from '../../utils/i18n';

const { getDrinkBySlug, getDrinkSlugs, getRelatedDrinks } = require('../../lib/drinks');

interface DrinkPageProps {
  drink: any;
  relatedDrinks: any[];
}

export default function DrinkPage({ drink, relatedDrinks }: DrinkPageProps) {
  if (!drink) return <div>Drink not found</div>;

  const drinkName = resolveI18n(drink.name);
  const drinkEs = typeof drink.name === 'object' ? (drink.name.es || '') : '';
  const drinkDesc = drink.enhanced_description || resolveI18n(drink.description);

  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: 'Spanish Drinks', href: '/drinks/' },
    { name: drinkName, href: `/drinks/${drink.slug}/` }
  ];

  return (
    <>
      <SEOHead
        title={`${drinkName} -- Recipe, Where to Try & History | ${siteConfig.name}`}
        description={`${drinkName}${drinkEs ? ` (${drinkEs})` : ''} -- learn how it's made, where to find it and what makes this Spanish ${drink.category || ''} drink special.`}
      >
        <meta name="keywords" content={`${drinkName}, ${drinkEs}, Spanish ${drink.category || ''}, Spanish drinks, Spain beverages`} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org", "@type": "Recipe", "name": drinkName,
          "description": drinkDesc,
          "author": { "@type": "Organization", "name": "Go2Spain", "url": "https://go2-spain.com" },
          "recipeCuisine": "Spanish", "recipeCategory": drink.category || '',
          "image": drink.image?.startsWith('http') ? drink.image : `https://go2-spain.com${drink.image || ''}`,
          ...(drink.ingredients && { "recipeIngredient": drink.ingredients }),
          "keywords": `${drinkName}, ${drinkEs}, Spanish ${drink.category || ''}`
        }) }} />
      </SEOHead>

      <div className="min-h-screen bg-surface-cream">
        <section className="bg-white py-4">
          <div className="container-custom"><Breadcrumbs items={breadcrumbs} /></div>
        </section>

        <section className="bg-white pb-12">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="relative h-96 lg:h-full rounded-2xl overflow-hidden">
                {drink.image && <Image src={drink.image} alt={drinkName} fill className="object-cover" priority />}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  {drink.alcohol_content && drink.alcohol_content !== 'none' && (
                    <span className="bg-spain-red text-white px-3 py-1 rounded-full text-sm font-medium">{drink.alcohol_content} alcohol</span>
                  )}
                  {drink.temperature && (
                    <span className="bg-spain-red text-white px-3 py-1 rounded-full text-sm font-medium">{drink.temperature}</span>
                  )}
                </div>
              </div>
              <div>
                <h1 className="text-4xl font-heading font-bold text-gray-900 mb-2">{drinkName}</h1>
                {drinkEs && <p className="text-2xl text-gray-500 mb-4">{drinkEs}</p>}
                <div className="flex flex-wrap gap-2 mb-6">
                  {drink.category && <span className="bg-surface-cream px-3 py-1 rounded-full text-sm capitalize">{drink.category}</span>}
                  {drink.price_range && <span className="bg-surface-cream px-3 py-1 rounded-full text-sm">{drink.price_range}</span>}
                  {drink.region && <span className="bg-surface-cream px-3 py-1 rounded-full text-sm">{drink.region === 'all' ? 'All Spain' : `${drink.region} region`}</span>}
                </div>
                <p className="text-lg text-gray-700 mb-6">{drinkDesc || 'More information coming soon.'}</p>
                {drink.occasions && drink.occasions.length > 0 && (
                  <div className="bg-surface-cream p-6 rounded-2xl">
                    <h3 className="font-heading font-semibold mb-4">Quick Information</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div><p className="text-sm text-gray-600">Best Occasions</p><p className="font-medium">{drink.occasions.join(', ')}</p></div>
                      {drink.type && <div><p className="text-sm text-gray-600">Type</p><p className="font-medium capitalize">{drink.type}</p></div>}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {drink.ingredients && drink.ingredients.length > 0 && (
          <section className="bg-white py-12 border-t">
            <div className="container-custom">
              <p className="section-label font-script text-spain-gold">Recipe</p>
              <h2 className="text-2xl font-heading font-bold mb-6">Ingredients</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {drink.detailed_ingredients ? (
                  drink.detailed_ingredients.map((ing: any, index: number) => (
                    <div key={index} className="bg-surface-cream p-4 rounded-2xl">
                      <h4 className="font-heading font-semibold mb-2">{resolveI18n(ing.name)}</h4>
                      {ing.purpose && <p className="text-sm text-gray-600 mb-2">{ing.purpose}</p>}
                    </div>
                  ))
                ) : (
                  drink.ingredients.map((ing: string, index: number) => (
                    <div key={index} className="bg-surface-cream p-3 rounded-2xl"><p className="font-medium">{ing}</p></div>
                  ))
                )}
              </div>
            </div>
          </section>
        )}

        {drink.preparation_method && (
          <section className="bg-surface-cream py-12">
            <div className="container-custom">
              <p className="section-label font-script text-spain-gold">How To</p>
              <h2 className="text-2xl font-heading font-bold mb-6">How to Make {drinkName}</h2>
              <div className="bg-white p-8 rounded-2xl">
                {drink.preparation_method.overview && <p className="text-gray-700 mb-6">{drink.preparation_method.overview}</p>}
                {drink.preparation_method.steps && (
                  <div>
                    <h3 className="font-heading font-semibold mb-4">Steps:</h3>
                    <ol className="space-y-3">
                      {drink.preparation_method.steps.map((step: string, index: number) => (
                        <li key={index} className="flex">
                          <span className="bg-spain-red text-white w-6 h-6 rounded-xl flex items-center justify-center text-sm font-medium mr-3 flex-shrink-0">{index + 1}</span>
                          <span className="text-gray-700">{step}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                )}
              </div>
            </div>
          </section>
        )}

        {drink.cultural_significance && (
          <section className="bg-white py-12">
            <div className="container-custom">
              <p className="section-label font-script text-spain-gold">Heritage</p>
              <h2 className="text-2xl font-heading font-bold mb-6">Cultural Background</h2>
              <div className="prose max-w-none">
                {drink.cultural_significance.history && <p className="text-gray-700">{drink.cultural_significance.history}</p>}
              </div>
            </div>
          </section>
        )}

        {relatedDrinks && relatedDrinks.length > 0 && (
          <section className="bg-white py-12">
            <div className="container-custom">
              <h2 className="text-2xl font-heading font-bold mb-6">Related Spanish Drinks</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedDrinks.map((rd: any) => {
                  const rdName = resolveI18n(rd.name);
                  return (
                    <Link key={rd.slug} href={`/drinks/${rd.slug}/`} className="group">
                      <div className="bg-surface-cream rounded-2xl overflow-hidden shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                        {rd.image && (
                          <div className="relative h-32">
                            <Image src={rd.image} alt={rdName} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
                          </div>
                        )}
                        <div className="p-4">
                          <h3 className="font-heading font-semibold text-gray-900 group-hover:text-spain-red transition-colors">{rdName}</h3>
                          <p className="text-gray-600 text-sm capitalize">{rd.category}</p>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </section>
        )}
      </div>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const slugs = getDrinkSlugs();
  const paths = slugs.map((slug: string) => ({ params: { slug } }));
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string;
  const drink = getDrinkBySlug(slug);
  if (!drink) return { notFound: true };
  const relatedDrinks = getRelatedDrinks(drink, 4);
  return { props: { drink, relatedDrinks } };
};
