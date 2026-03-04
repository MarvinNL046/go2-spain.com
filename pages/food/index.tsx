import { GetStaticProps } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import Breadcrumbs from '../../components/Breadcrumbs';
import SEOHead from '../../components/SEOHead';
import { siteConfig } from '../../site.config';
import { resolveI18n } from '../../utils/i18n';

const { getAllDishes } = require('../../lib/food');

interface FoodIndexPageProps { dishes: any[]; categories: string[]; }

export default function FoodIndexPage({ dishes, categories }: FoodIndexPageProps) {
  const initialLoad = Math.min(12, dishes.length);
  const [visibleDishes, setVisibleDishes] = useState(initialLoad);
  const [isLoading, setIsLoading] = useState(false);

  const handleShowMore = () => {
    setIsLoading(true);
    setTimeout(() => { setVisibleDishes(prev => Math.min(prev + 12, dishes.length)); setIsLoading(false); }, 300);
  };

  const remainingDishes = dishes.length - visibleDishes;

  return (
    <>
      <SEOHead title={`Spanish Food Guide 2026 -- ${dishes.length} Authentic Dishes & Recipes | ${siteConfig.name}`} description={`Explore ${dishes.length} authentic Spanish dishes with recipes, restaurant tips and local picks. From Paella to Tapas -- your complete Spanish cuisine guide.`}>
        <meta name="keywords" content="Spanish food, Spanish cuisine, Spanish recipes, Paella, Tapas, Gazpacho, Spanish dishes, authentic Spanish cooking" />
      </SEOHead>
      <div className="bg-surface-cream min-h-screen">
        <section className="bg-surface-dark text-white">
          <div className="container-custom py-16">
            <div className="text-center">
              <p className="font-script text-spain-gold mb-2">Authentic Flavors</p>
              <h1 className="text-4xl lg:text-6xl font-heading font-bold mb-6">Spanish Food Guide</h1>
              <p className="text-xl lg:text-2xl mb-8 max-w-3xl mx-auto opacity-90">Discover the authentic flavors of Spain -- from tapas and paella to churros and jamon iberico</p>
              <div className="flex flex-wrap justify-center gap-4">
                {categories.map((category) => (<span key={category} className="bg-white bg-opacity-20 px-4 py-2 rounded-full text-sm font-medium">{category.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}</span>))}
              </div>
            </div>
          </div>
        </section>
        <section className="bg-white"><div className="container-custom py-6"><Breadcrumbs items={[{ name: 'Home', href: '/' }, { name: 'Spanish Food Guide', href: '/food' }]} /></div></section>
        <section className="section-padding">
          <div className="container-custom">
            <p className="section-label font-script text-spain-gold text-center">Discover</p>
            <h2 className="text-3xl font-heading font-bold text-center mb-8">All Spanish Dishes</h2>
            {dishes.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-gray-500 text-lg">Content coming soon! We are working on adding Spanish dishes.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {dishes.slice(0, visibleDishes).map((dish: any) => (
                  <Link key={dish.id || dish.slug} href={`/food/${dish.slug}`} className="group">
                    <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                      <div className="relative w-full h-48 overflow-hidden">
                        <Image src={dish.image || '/images/placeholder.webp'} alt={resolveI18n(dish.name)} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
                        {dish.preparation_time && (
                          <div className="absolute top-3 right-3"><span className="bg-white bg-opacity-90 text-spain-red px-2 py-1 rounded-full text-xs font-medium">{dish.preparation_time}</span></div>
                        )}
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl font-heading font-bold text-gray-900 mb-2 group-hover:text-spain-red transition-colors">{resolveI18n(dish.name)}</h3>
                        {dish.name?.es && <p className="text-gray-600 text-sm mb-3">{dish.name.es}</p>}
                        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                          {dish.preparation_time && <span>{dish.preparation_time}</span>}
                          {dish.region && <span>{dish.region}</span>}
                          {dish.price_range && <span>{dish.price_range}</span>}
                        </div>
                        {dish.ingredients && (
                          <div className="flex flex-wrap gap-1">
                            {dish.ingredients.slice(0, 3).map((ingredient: string, index: number) => (<span key={index} className="bg-surface-cream text-gray-600 px-2 py-1 rounded-full text-xs">{ingredient}</span>))}
                            {dish.ingredients.length > 3 && (<span className="bg-surface-cream text-gray-600 px-2 py-1 rounded-full text-xs">+{dish.ingredients.length - 3} more</span>)}
                          </div>
                        )}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
            {visibleDishes < dishes.length && (
              <div className="text-center mt-12">
                <button onClick={handleShowMore} disabled={isLoading} className="bg-spain-red text-white px-8 py-3 rounded-xl font-semibold hover:bg-spain-red/90 transition-all duration-300 shadow-md hover:shadow-xl disabled:opacity-50">
                  {isLoading ? 'Loading...' : `Show More Dishes (${remainingDishes} remaining)`}
                </button>
              </div>
            )}
          </div>
        </section>
        <section className="bg-white section-padding">
          <div className="container-custom">
            <div className="text-center mb-10">
              <p className="section-label font-script text-spain-gold">Experience</p>
              <h2 className="text-3xl lg:text-4xl font-heading font-bold text-gray-900 mb-4">Book a Spanish Cooking Class</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">Learn to cook authentic Spanish dishes with expert local chefs</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="bg-white rounded-2xl shadow-md p-8 text-center">
                <h3 className="text-xl font-heading font-bold text-gray-900 mb-2">Cooking Classes &amp; Food Tours</h3>
                <p className="text-gray-600 mb-6">Cooking classes and food tours across Spain</p>
                <a href={siteConfig.affiliateLinks.klook} target="_blank" rel="noopener noreferrer" className="inline-block bg-spain-red text-white px-8 py-3 rounded-xl font-semibold hover:bg-spain-red/90 transition-colors">Browse on Klook</a>
              </div>
              <div className="bg-white rounded-2xl shadow-md p-8 text-center">
                <h3 className="text-xl font-heading font-bold text-gray-900 mb-2">Food Walking Tours</h3>
                <p className="text-gray-600 mb-6">Guided tapas walks and food tours</p>
                <a href={siteConfig.affiliateLinks.getYourGuide} target="_blank" rel="noopener noreferrer" className="inline-block bg-spain-red text-white px-8 py-3 rounded-xl font-semibold hover:bg-spain-red/90 transition-colors">Browse on GetYourGuide</a>
              </div>
            </div>
            <p className="text-center text-xs text-gray-400 mt-6">We may earn a commission when you book through our links, at no extra cost to you.</p>
          </div>
        </section>
        <section className="bg-surface-dark text-white section-padding">
          <div className="container-custom text-center">
            <p className="font-script text-spain-gold mb-2">Explore More</p>
            <h2 className="text-3xl lg:text-4xl font-heading font-bold mb-6">Ready to Explore Spain?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">Discover the cities where these amazing dishes come from</p>
            <Link href="/city/" className="bg-white text-spain-red px-8 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors">Explore Spanish Cities</Link>
          </div>
        </section>
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const dishes = getAllDishes();
  const categorySet = new Set(dishes.map((dish: any) => dish.category).filter(Boolean));
  const categories = Array.from(categorySet) as string[];
  return { props: { dishes, categories } };
};
