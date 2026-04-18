import { GetStaticProps } from 'next';
import Link from 'next/link';
import SEOHead from '../../components/SEOHead';
import Breadcrumbs from '../../components/Breadcrumbs';
import { siteConfig } from '../../site.config';

const whyCards = [
  {
    icon: '🦎',
    title: "Gaudí's Public Park Masterwork",
    body: "Park Güell is Antoni Gaudí's urban park commission turned UNESCO World Heritage site. Inside the paid Monumental Zone you meet the mosaic lizard El Drac on the dragon stairway, the Hypostyle Hall of 86 columns, and the serpentine terrace benches covered in trencadís tile work above the city.",
  },
  {
    icon: '⏰',
    title: 'Timed Entry = Book Ahead',
    body: 'The Monumental Zone uses 30-minute timed slots with a hard cap of 400 visitors per slot. In May, June, September and October slots sell out days in advance. In July and August summer weeks sell out completely online, so same-day walk-ups are refused.',
  },
  {
    icon: '📸',
    title: 'Free Panorama Zones Exist',
    body: 'Most of the park is free forever. Carmel Hill above the Monumental Zone, El Turó de les Tres Creus and the Austria Gardens give you 360-degree Barcelona panoramas, Sagrada Família in the distance and the Mediterranean beyond. Many visitors skip the paid zone and photograph from here.',
  },
];

const ticketTypes = [
  { label: 'Monumental Zone Adult', price: '€10', usd: '$11', note: 'Official base ticket, 30-min timed entry' },
  { label: 'Audio Guide Combo', price: '€13', usd: '$14', note: 'Monumental Zone plus English audio guide' },
  { label: 'Guided Tour (1h)', price: '€25-40', usd: '$27-43', note: 'GetYourGuide or Viator, live English guide' },
  { label: 'Park Güell + Sagrada Família Combo', price: '€45-55', usd: '$49-60', note: 'Skip-the-line both sites, same day' },
  { label: 'Gaudí Pass (4 sites)', price: '€75-95', usd: '$81-103', note: 'Sagrada + Park Güell + Casa Batlló + Casa Milà' },
  { label: 'Under-6 Child', price: 'FREE', usd: 'FREE', note: 'Free ticket still required at entry' },
  { label: 'Reduced 7-12 Child', price: '€7', usd: '$8', note: 'Children 7-12 discounted rate' },
  { label: 'Senior 65+', price: '€7', usd: '$8', note: 'ID required at entrance' },
  { label: 'Free Zones (Carmel Hill)', price: '€0', usd: '$0', note: 'Always open, no ticket ever needed' },
];

const providers = [
  {
    name: 'GetYourGuide',
    tagline: 'Best Cancellation Terms',
    url: siteConfig.affiliateLinks.getYourGuide,
    color: 'bg-blue-600',
    bullets: ['24h free cancellation on most tickets', 'Mobile QR code, no printing needed', 'Verified English reviews and photos'],
  },
  {
    name: 'Viator',
    tagline: 'Best Tour Combos',
    url: siteConfig.affiliateLinks.viator,
    color: 'bg-red-600',
    bullets: ['TripAdvisor-owned marketplace', 'Strong Gaudí tour bundles and private tours', 'Sunset and photography-focused tours'],
  },
  {
    name: 'Klook',
    tagline: 'Asian Market Mobile-First',
    url: siteConfig.affiliateLinks.klook,
    color: 'bg-orange-500',
    bullets: ['Instant confirmation on most slots', 'App-based QR entry', 'Often price-matched with combo deals'],
  },
  {
    name: 'Park Güell Official',
    tagline: 'Lowest Base €10',
    url: 'https://parkguell.barcelona/en/',
    color: 'bg-gray-700',
    bullets: ['Official cheapest base price', 'Booking UX is clunky on mobile', 'English version available but no tour add-ons'],
  },
];

const monumentalVsFree = [
  {
    type: 'Monumental Zone (paid €10)',
    includes: ['Dragon Stairway and El Drac mosaic lizard', 'Gaudí House Museum exterior (interior is €7.50 extra)', 'Hypostyle Hall of 86 columns', 'Greek Theatre terrace with trencadís mosaic benches'],
    verdict: 'Pay the €10 if this is your first Barcelona visit and you want the iconic Gaudí postcard shots.',
  },
  {
    type: 'Free Zones (€0 always)',
    includes: ['Carmel Hill summit with the best Barcelona panorama', 'El Turó de les Tres Creus viewpoint', 'Austria Gardens and most wooded paths', 'Free viewpoints over Sagrada Família in the distance'],
    verdict: 'Skip the ticket if you mainly want skyline views and you already saw Gaudí mosaics at Casa Batlló or Sagrada.',
  },
];

const bestTimeToVisit = [
  { when: 'Morning 9:30 slot', why: 'Cooler air and soft light on the Dragon Stairway, shortest queues for photos on the terrace.' },
  { when: 'Sunset slot (90 min before close)', why: 'Golden hour on the mosaic benches, the most photographed window of the day, but also the most crowded.' },
  { when: 'May, June, September, October', why: 'Ideal weather at 20-26°C, no extreme heat, and most consistent blue-sky light.' },
  { when: 'July and August', why: 'Hot at 30°C+ with direct sun on open terraces. Book the earliest slot only, bring a hat and water.' },
  { when: 'November to February', why: 'Quietest window of the year, cheaper Barcelona hotels overall, occasional rain but clear winter light.' },
];

const gettingThere = [
  { option: 'Metro L3 (green) to Lesseps', detail: '15-20 minute uphill walk, quite steep at the end, free but the hardest option on a hot day.' },
  { option: 'Metro L3 (green) to Vallcarca', detail: '10-minute walk plus the public outdoor escalator system up the hill, easier than Lesseps.' },
  { option: 'Bus 24 from Passeig de Gràcia', detail: 'Direct bus that stops near the main entrance, easiest public transport option door-to-door.' },
  { option: 'Walk from Sagrada Família', detail: 'About 45 minutes uphill through residential Gràcia, not recommended in summer.' },
  { option: 'Taxi from Eixample', detail: '€10-15 one way, roughly 15 minutes, best option for families and older travellers.' },
];

const commonMistakes = [
  'Buying a Monumental Zone ticket thinking it covers the whole park, when in fact most of Park Güell is free.',
  'Missing the 30-minute timed entry window. Arrive late and your ticket is void with no refund from the official site.',
  'Walking up from Sagrada Família on foot in July or August, ending up exhausted before you reach the entrance.',
  'Paying for the Gaudí House Museum on the day. It is €7.50 extra on top of your Monumental Zone ticket.',
  'Booking a random mid-afternoon slot and missing the far more photogenic sunset or early-morning light.',
  'Skipping Carmel Hill above the Monumental Zone. The free viewpoint arguably beats the paid terrace for sheer panorama.',
];

const faqItems = [
  {
    q: 'How much are Park Güell tickets in 2026?',
    a: 'The standard Monumental Zone adult ticket is €10 in 2026. An audio-guide combo is €13, a live guided tour on GetYourGuide or Viator runs €25-40, a Park Güell plus Sagrada Família combo is €45-55, and the full Gaudí Pass covering four sites is €75-95. Children under 6 enter free, children 7-12 and seniors 65+ pay €7.',
  },
  {
    q: 'Is Park Güell free?',
    a: 'Most of Park Güell is genuinely free and open to everyone. The ticket only applies to the Monumental Zone, which contains the iconic Gaudí mosaics, the Dragon Stairway, the Hypostyle Hall and the terrace benches. Carmel Hill, El Turó de les Tres Creus, the Austria Gardens and most park paths never require a ticket.',
  },
  {
    q: 'Do I need to book Park Güell tickets in advance?',
    a: 'Yes, especially between May and October. The Monumental Zone runs on 30-minute timed slots capped at 400 visitors. Summer weeks sell out days or even weeks in advance, and in July and August walk-up tickets are often refused completely because online allocation is full.',
  },
  {
    q: 'What is the difference between the Monumental Zone and the free areas?',
    a: 'The Monumental Zone is the paid Gaudí section with the mosaic lizard El Drac, the dragon stairway, the Hypostyle Hall and the mosaic benches. The free areas are the wooded hillsides, viewpoints and gardens surrounding it. The free zones have better panoramic photos of Barcelona, while the Monumental Zone has the close-up Gaudí detail.',
  },
  {
    q: 'Is the Gaudí Pass worth it?',
    a: 'The Gaudí Pass at €75-95 covers Sagrada Família, Park Güell, Casa Batlló and Casa Milà. Buying those four tickets separately costs roughly €26 plus €10 plus €29 plus €28, so around €93. If you genuinely want to visit all four in one trip, the pass saves time on queues and often a few euros. If you are skipping Casa Batlló or Casa Milà, individual tickets are cheaper.',
  },
  {
    q: 'How do I get to Park Güell from central Barcelona?',
    a: 'The easiest option is bus 24 from Passeig de Gràcia, which stops near the main entrance. Metro L3 to Vallcarca plus the public escalators is the second easiest. Metro L3 to Lesseps involves a steep 15-20 minute walk uphill. A taxi from Eixample costs €10-15 and takes about 15 minutes.',
  },
  {
    q: 'What is the best time to visit Park Güell?',
    a: 'The first 9:30 morning slot is coolest and has the best light on the Dragon Stairway. The last 90 minutes before closing give you golden-hour photos on the mosaic benches but with heavier crowds. May, June, September and October offer the best weather balance. Avoid midday in July and August.',
  },
  {
    q: 'Is Park Güell worth visiting with kids?',
    a: 'Yes, children generally love the dragon stairway, the mosaic lizard and the serpentine benches. Under-6s are free but still need a ticket issued at booking. Children 7-12 pay €7. The walk up the hill is steep, so younger kids do better arriving by bus 24 or taxi rather than hiking from a metro station.',
  },
];

export default function ParkGuellTicketsPage() {
  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: 'Park Güell Tickets', href: '/park-guell-tickets' },
  ];

  const canonical = `${siteConfig.seo.siteUrl}/park-guell-tickets/`;
  const title = `Park Güell Tickets 2026: Prices, Free Zones & Where to Book | ${siteConfig.name}`;
  const description = `Real 2026 Park Güell prices (€10 Monumental) and how the free zones stack up, compare GetYourGuide, Viator, Klook, official and the Gaudí Pass combo math.`;

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Park Güell Tickets 2026: Prices, Free Zones & Where to Book',
    description,
    author: { '@type': 'Organization', name: siteConfig.name },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.name,
      logo: { '@type': 'ImageObject', url: `${siteConfig.seo.siteUrl}/images/logo.png` },
    },
    datePublished: '2026-04-18',
    dateModified: '2026-04-18',
    mainEntityOfPage: { '@type': 'WebPage', '@id': canonical },
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  return (
    <>
      <SEOHead title={title} description={description}>
        <link rel="canonical" href={canonical} />
        <meta name="keywords" content="Park Guell tickets, Park Guell Barcelona, Park Guell price 2026, Gaudi pass, Park Guell free zones, Park Guell timed entry" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      </SEOHead>

      <div className="bg-surface-cream min-h-screen">
        {/* Hero */}
        <section className="bg-surface-dark text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center">
              <p className="font-script text-spain-gold mb-2">Gaudí&apos;s Public Masterwork</p>
              <h1 className="text-4xl lg:text-6xl font-bold font-heading mb-6">Park Güell Tickets 2026: Prices, Free Zones, Where to Book</h1>
              <p className="text-xl lg:text-2xl mb-8 max-w-3xl mx-auto opacity-90">
                Real 2026 prices, a breakdown of what is genuinely free inside the park, and an honest comparison of GetYourGuide, Viator, Klook and the official website.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <div className="bg-white bg-opacity-20 px-4 py-2 rounded-full text-sm font-medium">From €10</div>
                <div className="bg-white bg-opacity-20 px-4 py-2 rounded-full text-sm font-medium">Timed Entry</div>
                <div className="bg-white bg-opacity-20 px-4 py-2 rounded-full text-sm font-medium">Free Panoramas</div>
              </div>
            </div>
          </div>
        </section>

        {/* Breadcrumbs + disclaimer */}
        <section className="bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <Breadcrumbs items={breadcrumbs} />
            <div className="bg-orange-50 border-0 rounded-2xl mt-4">
              <div className="px-4 py-3">
                <p className="text-sm text-center text-orange-800">
                  This page contains affiliate links. We may earn a commission at no extra cost to you when you purchase through our links.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Why book ahead */}
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold font-heading text-center mb-8">Why You Should Book Park Güell Ahead</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {whyCards.map((c, i) => (
                <div key={i} className="bg-surface-cream rounded-2xl p-6 text-center">
                  <div className="text-4xl mb-4">{c.icon}</div>
                  <h3 className="font-semibold font-heading mb-2 text-lg">{c.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{c.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Prices table */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold font-heading text-center mb-4">Real 2026 Park Güell Prices</h2>
            <p className="text-gray-600 text-center mb-8 max-w-2xl mx-auto">Euro prices are official, USD figures are a rough guide at current exchange.</p>
            <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-md overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-surface-dark text-white">
                    <tr>
                      <th className="text-left px-4 py-3 font-semibold">Ticket Type</th>
                      <th className="text-left px-4 py-3 font-semibold">EUR</th>
                      <th className="text-left px-4 py-3 font-semibold">USD</th>
                      <th className="text-left px-4 py-3 font-semibold hidden md:table-cell">Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ticketTypes.map((t, i) => (
                      <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-surface-cream'}>
                        <td className="px-4 py-3 font-medium text-gray-900">{t.label}</td>
                        <td className="px-4 py-3 font-semibold text-spain-red">{t.price}</td>
                        <td className="px-4 py-3 text-gray-700">({t.usd})</td>
                        <td className="px-4 py-3 text-gray-600 hidden md:table-cell">{t.note}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* Providers */}
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold font-heading text-center mb-4">Where to Book Park Güell Tickets</h2>
            <p className="text-gray-600 text-center mb-8 max-w-2xl mx-auto">Four reliable options. Price is similar across platforms, so pick by cancellation terms, tour combos and UX.</p>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {providers.map((p, i) => (
                <div key={i} className="bg-surface-cream rounded-2xl shadow-md overflow-hidden flex flex-col">
                  <div className={`${p.color} text-white px-4 py-3`}>
                    <h3 className="font-bold font-heading text-lg">{p.name}</h3>
                    <p className="text-xs opacity-90">{p.tagline}</p>
                  </div>
                  <div className="p-4 flex flex-col flex-grow">
                    <ul className="text-sm space-y-2 mb-4 flex-grow">
                      {p.bullets.map((b, j) => (
                        <li key={j} className="flex items-start">
                          <span className="text-green-500 mr-2 mt-0.5">&#10003;</span>
                          <span className="text-gray-700">{b}</span>
                        </li>
                      ))}
                    </ul>
                    <a
                      href={p.url}
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      className={`block w-full ${p.color} text-white text-center py-2.5 rounded-xl font-semibold hover:opacity-90 transition-opacity text-sm`}
                    >
                      Check {p.name} &rarr;
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Monumental vs Free */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold font-heading text-center mb-4">Monumental Zone (Paid) vs Free Zones</h2>
            <p className="text-gray-600 text-center mb-8 max-w-2xl mx-auto">The honest breakdown. Most visitors pay €10 on reflex without realising how much of the park is genuinely free.</p>
            <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {monumentalVsFree.map((m, i) => (
                <div key={i} className="bg-white rounded-2xl shadow-md p-6">
                  <h3 className="text-xl font-bold font-heading mb-4">{m.type}</h3>
                  <ul className="space-y-2 mb-4">
                    {m.includes.map((x, j) => (
                      <li key={j} className="flex items-start text-sm">
                        <span className="text-spain-red mr-2">&#8226;</span>
                        <span className="text-gray-700">{x}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="bg-surface-cream rounded-xl p-4">
                    <p className="text-sm text-gray-800"><span className="font-semibold">Verdict: </span>{m.verdict}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Best time to visit */}
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold font-heading text-center mb-8">Best Time to Visit Park Güell</h2>
            <div className="max-w-3xl mx-auto space-y-4">
              {bestTimeToVisit.map((b, i) => (
                <div key={i} className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-xl">
                  <h3 className="font-semibold font-heading mb-1">{b.when}</h3>
                  <p className="text-gray-700 text-sm">{b.why}</p>
                </div>
              ))}
              <p className="text-sm text-gray-600 text-center pt-2">
                Opening hours: 9:30 AM to 7:30 PM April to October, 9:30 AM to 5:30 PM November to March.
              </p>
            </div>
          </div>
        </section>

        {/* Getting there */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold font-heading text-center mb-8">Getting to Park Güell</h2>
            <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-4">
              {gettingThere.map((g, i) => (
                <div key={i} className="bg-white rounded-2xl shadow-md p-5">
                  <h3 className="font-semibold font-heading mb-2 text-gray-900">{g.option}</h3>
                  <p className="text-gray-700 text-sm">{g.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Combo pass math */}
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold font-heading text-center mb-4">Are the Combo Passes Worth It?</h2>
            <div className="max-w-3xl mx-auto bg-surface-cream rounded-2xl p-6">
              <h3 className="font-semibold font-heading mb-3 text-lg">Gaudí Pass math</h3>
              <p className="text-gray-700 text-sm mb-4">
                Buying each ticket separately in 2026: Sagrada Família around €26, Park Güell €10, Casa Batlló €29, Casa Milà €28. That totals roughly €93. The Gaudí Pass runs €75-95 depending on provider and date.
              </p>
              <ul className="text-sm space-y-2 mb-4">
                <li className="flex items-start"><span className="text-green-500 mr-2">&#10003;</span><span className="text-gray-700">Worth it if you are visiting all four sites in one trip and hate queueing twice.</span></li>
                <li className="flex items-start"><span className="text-green-500 mr-2">&#10003;</span><span className="text-gray-700">Worth it for first-time Barcelona visitors who want the full Gaudí arc in 2-3 days.</span></li>
                <li className="flex items-start"><span className="text-red-500 mr-2">&#10007;</span><span className="text-gray-700">Skip it if you are only doing Sagrada plus Park Güell. The 2-site combo at €45-55 is the smarter pick.</span></li>
                <li className="flex items-start"><span className="text-red-500 mr-2">&#10007;</span><span className="text-gray-700">Skip it if you already visited Casa Batlló or Casa Milà on a previous trip.</span></li>
              </ul>
              <a
                href={siteConfig.affiliateLinks.getYourGuide}
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="inline-block bg-spain-red text-white px-6 py-3 rounded-xl font-semibold hover:bg-spain-red/90 transition-colors text-sm"
              >
                Compare Gaudí Pass Prices &rarr;
              </a>
            </div>
          </div>
        </section>

        {/* Accessibility */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold font-heading text-center mb-6">Accessibility at Park Güell</h2>
            <div className="max-w-3xl mx-auto bg-yellow-50 border-l-4 border-yellow-400 p-5 rounded-r-xl">
              <p className="text-gray-800 text-sm leading-relaxed mb-3">
                Park Güell sits on a steep hillside and is not fully wheelchair-friendly. The Monumental Zone has stairs at key points including the Dragon Stairway, and many paths in the free zones are sloped or cobbled.
              </p>
              <p className="text-gray-800 text-sm leading-relaxed mb-3">
                The easiest approach for reduced mobility is bus 24 directly to the main entrance on Carretera del Carmel, which avoids the worst climbs. The public outdoor escalator system from Vallcarca metro helps with the uphill approach but does not replace stairs inside the park.
              </p>
              <p className="text-gray-800 text-sm leading-relaxed">
                Strollers work but require effort. Wheelchair users should plan routes in advance and consider visiting Casa Batlló or Casa Milà instead, both of which have full lift access.
              </p>
            </div>
          </div>
        </section>

        {/* Free Carmel Hill viewpoint */}
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold font-heading text-center mb-4">The Free Carmel Hill Viewpoint</h2>
            <p className="text-gray-600 text-center mb-8 max-w-2xl mx-auto">The secret most guidebooks skip.</p>
            <div className="max-w-3xl mx-auto bg-surface-cream rounded-2xl p-6">
              <p className="text-gray-700 mb-4">
                Above the Monumental Zone, a short 5-minute climb takes you to the summit of Carmel Hill, also known as El Turó de les Tres Creus. This is public land, always open, never ticketed.
              </p>
              <p className="text-gray-700 mb-4">
                From the top you get a full 360-degree panorama of Barcelona with Sagrada Família in the middle distance, the Mediterranean behind it, and on clear winter days the Montserrat mountains inland. Many photographers rate this view above anything inside the paid zone.
              </p>
              <p className="text-gray-700">
                For sunset it is the single best free spot in Barcelona. Bring water, wear shoes with grip, and arrive 20 minutes before sunset to claim a good rock. Come back down with a headlamp or phone torch because the path is unlit.
              </p>
            </div>
          </div>
        </section>

        {/* What to bring */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold font-heading text-center mb-8">What to Bring</h2>
            <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="bg-white rounded-2xl p-5 text-center shadow-md">
                <div className="text-4xl mb-3">💧</div>
                <h3 className="font-semibold font-heading mb-1">Water</h3>
                <p className="text-gray-600 text-sm">At least 1 litre per person in summer, the park has few shops inside.</p>
              </div>
              <div className="bg-white rounded-2xl p-5 text-center shadow-md">
                <div className="text-4xl mb-3">👟</div>
                <h3 className="font-semibold font-heading mb-1">Walking Shoes</h3>
                <p className="text-gray-600 text-sm">Steep slopes and cobbled paths, no sandals or heels.</p>
              </div>
              <div className="bg-white rounded-2xl p-5 text-center shadow-md">
                <div className="text-4xl mb-3">🧢</div>
                <h3 className="font-semibold font-heading mb-1">Sun Hat + SPF</h3>
                <p className="text-gray-600 text-sm">The Monumental Zone terraces have almost no shade in midday.</p>
              </div>
              <div className="bg-white rounded-2xl p-5 text-center shadow-md">
                <div className="text-4xl mb-3">📷</div>
                <h3 className="font-semibold font-heading mb-1">Camera</h3>
                <p className="text-gray-600 text-sm">Wide-angle lens helps on the terrace benches and Carmel Hill.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Common mistakes */}
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold font-heading text-center mb-8">Common Park Güell Mistakes</h2>
            <div className="max-w-3xl mx-auto bg-orange-50 border-l-4 border-orange-400 rounded-r-2xl p-6">
              <ul className="space-y-3">
                {commonMistakes.map((m, i) => (
                  <li key={i} className="flex items-start">
                    <span className="text-orange-600 mr-3 font-bold">{i + 1}.</span>
                    <span className="text-gray-800 text-sm">{m}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold font-heading text-center mb-8">Frequently Asked Questions</h2>
            <div className="max-w-3xl mx-auto space-y-4">
              {faqItems.map((f, i) => (
                <details key={i} className="bg-white rounded-2xl shadow-md p-5 group">
                  <summary className="font-semibold font-heading cursor-pointer list-none flex justify-between items-center">
                    <span>{f.q}</span>
                    <span className="text-spain-red text-2xl group-open:rotate-45 transition-transform">+</span>
                  </summary>
                  <p className="text-gray-700 mt-3 text-sm leading-relaxed">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Cross-links sibling pillars */}
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold font-heading text-center mb-8">Other Must-Book Spain Icons</h2>
            <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
              <Link href="/sagrada-familia-tickets/" className="bg-surface-cream rounded-2xl shadow-md p-6 hover:shadow-xl hover:-translate-y-1 transition-all block">
                <div className="text-4xl mb-3">⛪</div>
                <h3 className="font-semibold font-heading text-gray-900 mb-2 text-lg">Sagrada Família Tickets</h3>
                <p className="text-gray-700 text-sm">Gaudí&apos;s unfinished basilica, the number-one Barcelona ticket. Prices, tower access and when to book.</p>
              </Link>
              <Link href="/alhambra-tickets/" className="bg-surface-cream rounded-2xl shadow-md p-6 hover:shadow-xl hover:-translate-y-1 transition-all block">
                <div className="text-4xl mb-3">🕌</div>
                <h3 className="font-semibold font-heading text-gray-900 mb-2 text-lg">Alhambra Tickets</h3>
                <p className="text-gray-700 text-sm">Granada&apos;s Moorish palace fortress. Nasrid Palaces quota, night tickets and booking windows.</p>
              </Link>
            </div>
          </div>
        </section>

        {/* Related reading */}
        <section className="py-12 bg-surface-cream">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold font-heading text-center mb-4">Related Spain Reading</h2>
            <p className="text-gray-600 text-center mb-8 max-w-2xl mx-auto">Plan the rest of your Barcelona and Spain trip.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <Link href="/blog/is-barcelona-safe-2026/" className="bg-white rounded-2xl shadow-md p-6 text-center hover:shadow-xl hover:-translate-y-1 transition-all block">
                <div className="text-4xl mb-3">🛡️</div>
                <h3 className="font-semibold font-heading text-gray-900 mb-2">Is Barcelona Safe 2026</h3>
                <p className="text-gray-600 text-sm">Pickpocket-heavy zones, scams and honest safety read.</p>
              </Link>
              <Link href="/blog/barcelona-vs-madrid-for-tourists/" className="bg-white rounded-2xl shadow-md p-6 text-center hover:shadow-xl hover:-translate-y-1 transition-all block">
                <div className="text-4xl mb-3">🏙️</div>
                <h3 className="font-semibold font-heading text-gray-900 mb-2">Barcelona vs Madrid</h3>
                <p className="text-gray-600 text-sm">Which city first if you only have 4 days in Spain.</p>
              </Link>
              <Link href="/blog/is-spain-expensive-2026/" className="bg-white rounded-2xl shadow-md p-6 text-center hover:shadow-xl hover:-translate-y-1 transition-all block">
                <div className="text-4xl mb-3">💶</div>
                <h3 className="font-semibold font-heading text-gray-900 mb-2">Is Spain Expensive 2026</h3>
                <p className="text-gray-600 text-sm">Real daily budgets for Barcelona, Madrid and the coast.</p>
              </Link>
              <Link href="/blog/best-time-to-visit-spain-2026/" className="bg-white rounded-2xl shadow-md p-6 text-center hover:shadow-xl hover:-translate-y-1 transition-all block">
                <div className="text-4xl mb-3">📅</div>
                <h3 className="font-semibold font-heading text-gray-900 mb-2">Best Time to Visit Spain</h3>
                <p className="text-gray-600 text-sm">Month-by-month weather, crowds and price guide.</p>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  return { props: {} };
};
