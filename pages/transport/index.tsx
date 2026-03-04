import React from 'react';
import SEOHead from '../../components/SEOHead';
import Link from 'next/link';
import { GetStaticProps } from 'next';
import Breadcrumbs from '../../components/Breadcrumbs';
import { siteConfig } from '../../site.config';

const TransportIndex: React.FC = () => {
  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: 'Transport Guide', href: '/transport' }
  ];

  const transportModes = [
    {
      name: 'Renfe AVE High-Speed Trains',
      icon: '🚄',
      description: 'Spain operates one of the world\'s most extensive high-speed rail networks. The AVE (Alta Velocidad Espanola) connects major cities at speeds up to 310 km/h. Madrid to Barcelona takes just 2.5 hours, Madrid to Seville 2.5 hours, and Madrid to Valencia 1.5 hours. Book through the Renfe website or app for the best fares -- tickets open 2-3 months in advance.',
      tips: ['Book 2-3 months ahead for Promo fares (from 15 EUR)', 'Use the Renfe app for mobile tickets and real-time updates', 'Preferente class includes meals on long routes', 'AVLO is the budget high-speed option with fares from 7 EUR'],
      priceRange: '7-120 EUR depending on route and booking time'
    },
    {
      name: 'Regional Trains (Cercanias & Media Distancia)',
      icon: '🚆',
      description: 'Cercanias are commuter trains connecting city centers with suburbs and nearby towns, available in Madrid, Barcelona, Valencia, Seville, and other major cities. Media Distancia trains connect mid-range destinations within each region. They are slower than the AVE but significantly cheaper and ideal for day trips.',
      tips: ['Cercanias tickets are very affordable (1-5 EUR)', 'Buy tickets at the station or use the Renfe Cercanias app', 'Media Distancia trains connect smaller cities not served by AVE', 'Multi-trip cards (Abono) offer significant savings for regular travel'],
      priceRange: '1-25 EUR per journey'
    },
    {
      name: 'Metro Systems',
      icon: '🚇',
      description: 'Madrid and Barcelona have extensive metro systems. The Madrid Metro has 13 lines and 302 stations, making it one of the largest in Europe. Barcelona\'s TMB Metro has 12 lines. Other cities with metro systems include Valencia, Seville, Bilbao, and Malaga. Single tickets cost around 1.50-2.00 EUR, with multi-trip cards offering better value.',
      tips: ['Madrid: Buy a Multi card and load 10-trip passes (12.20 EUR for 10 trips)', 'Barcelona: T-casual card offers 10 trips for 11.35 EUR', 'Bilbao\'s Metro is known for its stunning design by Norman Foster', 'Metro hours are typically 6:00 AM to 1:30 AM (later on weekends)'],
      priceRange: '1.50-2.00 EUR single ticket, 11-13 EUR for 10-trip card'
    },
    {
      name: 'Long-Distance Buses',
      icon: '🚌',
      description: 'ALSA is Spain\'s largest long-distance bus operator, connecting cities and towns across the country. Other operators include Avanza, Socibus, and FlixBus. Buses are often cheaper than trains and serve routes that rail does not cover well, especially to smaller towns and rural areas. Most buses have WiFi, power outlets, and comfortable seating.',
      tips: ['Book early on ALSA for web-only discounts from 5 EUR', 'FlixBus also operates many Spanish routes', 'Buses are the best option for reaching smaller towns', 'Night buses (bus nocturno) save on accommodation costs'],
      priceRange: '5-45 EUR for most routes'
    },
    {
      name: 'Car Rental & Driving',
      icon: '🚗',
      description: 'Renting a car is the best way to explore rural Spain -- the white villages (pueblos blancos) of Andalusia, the wine country of La Rioja, the Basque coast, and the hidden coves of the Costa Brava. Spain has excellent autopistas (motorways) -- some charge tolls, others are free (autovias). Most rental cars have manual transmission; request automatic specifically if needed.',
      tips: ['Autopista tolls vary: Barcelona to Valencia costs approximately 40 EUR', 'Fuel averages 1.60-1.80 EUR per liter', 'International Driving Permit recommended for non-EU licenses', 'City center driving is challenging -- use park-and-ride facilities', 'Speed cameras and radar traps are common -- obey limits strictly'],
      priceRange: '20-50 EUR per day for a compact car'
    },
    {
      name: 'Ferries to Islands',
      icon: '⛴️',
      description: 'Ferries connect mainland Spain to the Balearic Islands (Mallorca, Menorca, Ibiza, Formentera) and between the Canary Islands. Major operators include Balearia, Trasmediterranea (Naviera Armas), and Fred. Olsen (Canaries). Barcelona and Valencia are the main ports for Balearic ferries. Inter-island ferries in the Canaries are frequent and affordable.',
      tips: ['Book Balearic ferries 2-3 months ahead in summer for best prices', 'Fast ferries (Barcelona to Mallorca): 4-5 hours vs 7-8 hours on standard', 'Balearia and Trasmediterranea are the main Balearic operators', 'Fred. Olsen and Naviera Armas connect the Canary Islands', 'Night ferries save on accommodation -- book a cabin for comfort'],
      priceRange: '30-120 EUR one-way (Balearics), 15-50 EUR inter-island (Canaries)'
    },
    {
      name: 'Domestic Flights',
      icon: '✈️',
      description: 'Domestic flights are especially useful for reaching the Canary Islands (2.5-3 hours from Madrid) and the Balearic Islands. Vueling, Iberia Express, and Ryanair offer competitive fares on domestic routes. For mainland routes, the AVE high-speed train is often faster door-to-door when including airport time.',
      tips: ['Canary Islands flights from mainland: book 4-6 weeks ahead for best fares', 'Madrid-Barajas (MAD) and Barcelona-El Prat (BCN) are the main hubs', 'Vueling is based in Barcelona and offers many domestic routes', 'AVE is often faster than flying for Madrid-Barcelona and Madrid-Seville', 'Interisland flights in the Canaries are short and frequent'],
      priceRange: '25-150 EUR one-way'
    },
    {
      name: 'Cycling',
      icon: '🚲',
      description: 'Spain has excellent cycling infrastructure, particularly in cities like Barcelona, Seville, and Valencia. The Via Verde network converts old railway lines into cycling and walking paths across the country, with over 3,000 km of routes. City bike-sharing systems are available in most major cities -- Bicing in Barcelona, BiciMAD in Madrid, and Sevici in Seville.',
      tips: ['BiciMAD (Madrid) costs 2 EUR for occasional users per ride', 'Barcelona\'s Bicing is for residents only -- use Donkey Republic instead', 'Seville has one of Spain\'s best cycling networks with flat terrain', 'Via Verde routes are mostly flat and scenic -- ideal for families', 'Electric bikes are increasingly available in tourist areas'],
      priceRange: '2-20 EUR for city bike share; 15-35 EUR for day rentals'
    }
  ];

  return (
    <div className="min-h-screen bg-surface-cream">
      <SEOHead
        title={`Spain Transport Guide 2026 | AVE Trains, Metro, Buses & Ferries | ${siteConfig.name}`}
        description="Complete guide to traveling in Spain. Renfe AVE high-speed trains, Metro systems, long-distance buses, ferries to islands, car rental, cycling and domestic flights. Prices, tips and booking advice."
      >
        <meta name="keywords" content="Spain transport, AVE trains, Renfe, Madrid Metro, Barcelona Metro, Spain buses, car rental Spain, ferries Spain, getting around Spain" />
      </SEOHead>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumbs items={breadcrumbs} />

        <p className="font-script text-spain-gold mb-2">Getting Around</p>
        <h1 className="text-4xl font-bold font-heading text-gray-900 mb-4">Spain Transport Guide 2026</h1>
        <p className="text-xl text-gray-600 mb-8">
          Spain has one of the best transport networks in Europe. From the world-class AVE high-speed trains to island ferries, here is everything you need to know about getting around.
        </p>

        {/* Booking Widget */}
        <section className="bg-white rounded-2xl shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold font-heading mb-4">Book Trains, Buses & Transfers</h2>
          <p className="text-gray-600 mb-4">Search and compare transport options across Spain and Europe.</p>
          <div className="flex flex-wrap gap-4">
            <a
              href={siteConfig.affiliateLinks.transport}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-spain-red text-white px-6 py-3 rounded-xl font-semibold hover:bg-spain-red/90 transition-colors"
            >
              Search Routes on 12Go
            </a>
            <a
              href="https://www.renfe.com/es/en"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-spain-red border-2 border-spain-red px-6 py-3 rounded-xl font-semibold hover:bg-spain-red hover:text-white transition-colors"
            >
              Book on Renfe
            </a>
          </div>
          <p className="text-xs text-gray-500 mt-2">Some links are affiliate links -- we earn a commission at no extra cost to you</p>
        </section>

        {/* Transport Modes */}
        <section className="space-y-8 mb-12">
          {transportModes.map((mode) => (
            <div key={mode.name} className="bg-white rounded-2xl shadow-md p-6">
              <div className="flex items-start gap-4 mb-4">
                <span className="text-4xl">{mode.icon}</span>
                <div>
                  <h2 className="text-2xl font-bold font-heading text-gray-900">{mode.name}</h2>
                  <p className="text-sm text-spain-red font-medium">{mode.priceRange}</p>
                </div>
              </div>
              <p className="text-gray-700 mb-4">{mode.description}</p>
              <div className="bg-surface-cream rounded-xl p-4">
                <h3 className="font-semibold font-heading mb-2">Tips:</h3>
                <ul className="space-y-1">
                  {mode.tips.map((tip, index) => (
                    <li key={index} className="flex items-start text-sm text-gray-700">
                      <span className="text-spain-gold mr-2 flex-shrink-0">&#8226;</span>
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </section>

        {/* Transport Tips */}
        <section className="bg-white rounded-2xl shadow-md p-6 mb-12">
          <h2 className="text-2xl font-bold font-heading mb-4">Spain Transport Tips</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold font-heading mb-2">Best Transport by Distance</h3>
              <ul className="space-y-2 text-gray-700">
                <li>&#8226; <strong>Under 100 km:</strong> Cercanias, regional train, or bus</li>
                <li>&#8226; <strong>100-500 km:</strong> AVE high-speed train (fastest value)</li>
                <li>&#8226; <strong>Over 500 km:</strong> AVE or flight (compare both)</li>
                <li>&#8226; <strong>Islands:</strong> Ferry or domestic flight</li>
                <li>&#8226; <strong>Rural areas:</strong> Car rental is essential</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold font-heading mb-2">Money-Saving Tips</h3>
              <ul className="space-y-2 text-gray-700">
                <li>&#8226; Book AVE tickets 2-3 months in advance for Promo fares</li>
                <li>&#8226; AVLO offers AVE-speed travel from 7 EUR</li>
                <li>&#8226; Renfe Spain Pass: 4-12 train journeys within a month</li>
                <li>&#8226; BlaBlaCar ridesharing is very popular in Spain</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold font-heading mb-2">Rail Passes</h3>
              <ul className="space-y-2 text-gray-700">
                <li>&#8226; <strong>Renfe Spain Pass:</strong> 4, 6, 8, or 12 journeys within 1 month</li>
                <li>&#8226; <strong>Eurail Spain Pass:</strong> Flexible train travel for non-Europeans</li>
                <li>&#8226; <strong>Metro passes:</strong> Multi-trip cards in Madrid and Barcelona</li>
                <li>&#8226; <strong>Youth discount:</strong> Under 26 gets reductions on Renfe</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold font-heading mb-2">Important Notes</h3>
              <ul className="space-y-2 text-gray-700">
                <li>&#8226; AVE and long-distance trains require seat reservations</li>
                <li>&#8226; Strikes can disrupt services -- check Renfe alerts</li>
                <li>&#8226; Download the Renfe app for real-time schedules</li>
                <li>&#8226; Siesta hours (2-5 PM) may affect local bus schedules in smaller towns</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Booking CTA */}
        <section className="mb-12">
          <div className="bg-surface-dark rounded-2xl shadow-md p-8 text-white">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold font-heading mb-4">Book Spain Transport Online</h2>
              <p className="text-lg mb-6 opacity-90">
                Compare and book trains, buses, ferries, and transfers across Spain and Europe.
              </p>
              <div className="flex flex-wrap justify-center gap-4 mb-6">
                <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium">AVE & Regional Trains</div>
                <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium">Intercity Buses</div>
                <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium">Island Ferries</div>
                <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium">Car Rental</div>
              </div>
              <a
                href={siteConfig.affiliateLinks.transport}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-spain-red text-white px-8 py-3 rounded-xl font-semibold hover:bg-spain-red/90 transition-colors shadow-md"
              >
                Search Routes on 12Go
              </a>
              <p className="text-xs mt-4 opacity-75">
                We earn a commission when you book through our links at no extra cost to you
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {}
  };
};

export default TransportIndex;
