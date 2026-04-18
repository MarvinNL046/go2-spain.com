import { GetStaticProps } from 'next';
import Link from 'next/link';
import SEOHead from '../../components/SEOHead';
import Breadcrumbs from '../../components/Breadcrumbs';
import { siteConfig } from '../../site.config';

const whyCards = [
  {
    icon: '🎟️',
    title: '#1 Barcelona Attraction Sells Out',
    body: 'Sagrada Família is the most-visited monument in Spain. In peak season (Jun-Sep and Easter) standard entries sell out 2 to 3 weeks in advance. Tower reservations and sunset slots go first. Walking up to the ticket window is no longer a viable plan in summer 2026.',
  },
  {
    icon: '🌅',
    title: 'Book Early = Better Time Slots',
    body: 'Interior light is the whole point. Morning sun (9-11am) fires the Nativity side stained glass in blues and greens. Late afternoon (4-6pm) lights the Passion side in reds and oranges. These slots book out first. Midday windows sit around noon but never look the same.',
  },
  {
    icon: '🗼',
    title: 'Towers Add ~€10 + Vertigo Reward',
    body: 'Tower tickets cost €36 total, roughly €10 above basic entry. You ride an elevator up, then walk down a tight spiral stair. The Nativity tower overlooks the gardens and Mediterranean. The Passion tower faces central Barcelona. Not recommended if stairs or heights bother you.',
  },
];

const ticketTypes = [
  { type: 'Basic Entry (Adult)', price: '€26', usd: '$28', notes: 'Interior access only, 60-90 min visit' },
  { type: 'Entry + Audio Guide', price: '€30', usd: '$32', notes: 'Recommended if solo, 15+ languages' },
  { type: 'Entry + Nativity Towers', price: '€36', usd: '$39', notes: 'East side, gardens + sea views' },
  { type: 'Entry + Passion Towers', price: '€36', usd: '$39', notes: 'West side, Barcelona skyline' },
  { type: 'Entry + Guided Tour (1h)', price: '€40', usd: '$43', notes: 'Expert guide, small group' },
  { type: 'Fast-Track Skip-Line (reseller)', price: '€36-45', usd: '$39-48', notes: 'Bundled priority entry via GYG/Viator' },
  { type: 'Gaudí Pass Combo', price: '€75-95', usd: '$81-102', notes: 'Sagrada + Park Güell + Casa Batlló' },
  { type: 'Under-11', price: 'FREE', usd: 'FREE', notes: 'Must still have a booked ticket' },
  { type: 'Reduced (Age 11-30)', price: '€24-34', usd: '$26-37', notes: 'Student and youth pricing tiers' },
];

const providers = [
  {
    name: 'GetYourGuide',
    tagline: 'Best Cancellation Terms',
    url: siteConfig.affiliateLinks.getYourGuide,
    color: 'bg-blue-600',
    bullets: [
      '24-hour free cancellation on most tickets',
      'Mobile QR tickets, no printing needed',
      'Verified reviews, millions of bookings',
      'English support plus 15+ languages',
    ],
    priceNote: 'From €30 (basic + audio)',
  },
  {
    name: 'Viator',
    tagline: 'Biggest Tour Selection',
    url: siteConfig.affiliateLinks.viator,
    color: 'bg-red-600',
    bullets: [
      'TripAdvisor-owned, trust signals baked in',
      '40+ Sagrada Família tour combinations',
      'Skip-line + expert guide packages',
      'Strong combo pricing with Park Güell',
    ],
    priceNote: 'From €40 (skip-line + guide)',
  },
  {
    name: 'Klook',
    tagline: 'Mobile-First for Asian Travelers',
    url: siteConfig.affiliateLinks.klook,
    color: 'bg-orange-500',
    bullets: [
      'Instant confirmation, app-first flow',
      'Localized for JP, KR, CN, TW, SG travelers',
      'Frequent promo credits for repeat users',
      'Clear multilingual voucher redemption',
    ],
    priceNote: 'From €32 (basic + audio)',
  },
  {
    name: 'Sagrada Família Official',
    tagline: 'Cheapest Base Price',
    url: 'https://sagradafamilia.org/en/',
    color: 'bg-gray-700',
    bullets: [
      'Official €26 base price, no markup',
      'No combo options with other Gaudí sites',
      'Sells out fastest, limited inventory',
      'Strict 24-hour cancellation, less flexible',
    ],
    priceNote: 'From €26 (basic entry)',
  },
];

const towerComparison = [
  { feature: 'Side of basilica', nativity: 'East (Mallorca St side)', passion: 'West (Sardenya St side)' },
  { feature: 'Sculpture style', nativity: 'Ornate, organic, by Gaudí himself', passion: 'Angular, stark, by Josep Subirachs' },
  { feature: 'View from top', nativity: 'Gardens, Diagonal, Mediterranean Sea', passion: 'Central Barcelona, Tibidabo hill' },
  { feature: 'Best light for photos', nativity: 'Morning (sun rising behind you)', passion: 'Late afternoon (sun rising behind you)' },
  { feature: 'Crowd level', nativity: 'Often busier (tourists pick Gaudí original)', passion: 'Slightly quieter, faster queue' },
  { feature: 'Stair count on descent', nativity: '~400 steps down', passion: '~400 steps down' },
  { feature: 'Our pick', nativity: 'First-timers and photographers', passion: 'City-skyline lovers and return visitors' },
];

const bestTimeToVisit = [
  { season: 'April-May', morning: 'Soft light, mild temps, fewer crowds', afternoon: 'Best overall balance for first visit' },
  { season: 'June-August', morning: '9-10am before tour buses arrive', afternoon: 'Avoid midday, heat + crowds peak' },
  { season: 'September-October', morning: 'Warm light, shoulder season pricing', afternoon: 'Sunset slots are spectacular' },
  { season: 'November-March', morning: '9am opening has short queues', afternoon: 'Closes 6pm, plan 4pm entry max' },
];

const commonMistakes = [
  'Booking same-day in summer — 95% of dates sell out 2-3 weeks ahead',
  'Paying for tower access without checking if you have vertigo or knee issues',
  'Skipping the €4 audio guide upgrade, then missing the building context',
  'Not knowing 2026 is the Gaudí centenary — crowds and prices are up 15-20%',
  'Picking the wrong tower side for your preferred photo light direction',
  'Wearing shorts or tank tops — shoulders and knees must be covered to enter',
];

const faqItems = [
  {
    q: 'How much are Sagrada Família tickets in 2026?',
    a: 'Basic adult entry costs €26 in 2026. Adding an audio guide brings it to €30. Tower access (Nativity or Passion) costs €36. A 1-hour guided tour is €40. Through resellers like GetYourGuide, Viator, or Klook, skip-line combos run €36-45, and the Gaudí Pass (Sagrada + Park Güell + Casa Batlló) sits at €75-95.',
  },
  {
    q: 'Do I need to book Sagrada Família tickets in advance?',
    a: 'Yes. In peak season (June through September and Easter week) dates typically sell out 2 to 3 weeks in advance. In shoulder season (April, May, October) book at least 1 week ahead. Even in low season, morning and sunset slots disappear first. Same-day walk-up tickets are rarely available in 2026.',
  },
  {
    q: 'Is the Sagrada Família tower visit worth it?',
    a: 'If you are mobile and comfortable with heights, yes. The €10 upgrade over basic entry gets you an elevator ride up and a unique view over Barcelona or the Mediterranean. The walk down is around 400 steps on a tight spiral staircase, which is not suitable for anyone with knee issues, vertigo, or claustrophobia. Pregnant visitors and young children are not permitted on towers.',
  },
  {
    q: 'What is the difference between Nativity and Passion tower tickets?',
    a: 'Both cost the same (€36) and both offer similar height views, but the direction differs. Nativity towers (east side) look over the gardens and toward the Mediterranean, with morning light hitting the original Gaudí-designed facade. Passion towers (west side) look toward central Barcelona and Tibidabo, with late-afternoon light on the starker Subirachs sculptures. First-timers usually pick Nativity.',
  },
  {
    q: 'Is Sagrada Família finished in 2026?',
    a: 'Symbolically yes, practically partially. 2026 marks the centenary of Antoni Gaudí\'s death (June 1926), which the basilica has targeted as a completion milestone since the 1950s. The central Jesus Christ tower (the tallest) is expected to reach structural completion in 2026. Final sculpture, the main staircase, and some exterior work will continue into the early 2030s. Expect scaffolding in some photos.',
  },
  {
    q: 'Can I buy tickets at the door?',
    a: 'Technically the ticket office exists, but in 2026 peak season there are almost never same-day tickets available. If you arrive without a booking you will likely be told to come back next week. In low season (November to March, excluding Christmas) same-day tickets sometimes appear for afternoon slots. Do not plan on this strategy.',
  },
  {
    q: 'Is a guided tour of Sagrada Família worth €40?',
    a: 'For a first visit, yes, if you want to understand the symbolism. A guide decodes the animal iconography on the Nativity facade, the mathematical grids Gaudí used, and the Passion facade narrative. A €4 audio guide covers the basics for a third of the price. Pick the tour if you are into architecture or Catholic symbolism; pick the audio guide if you just want context while wandering.',
  },
  {
    q: 'Can I visit Sagrada Família with kids?',
    a: 'Yes. Children under 11 are free but still need a booked ticket. Strollers are allowed inside the basilica on the main level. Towers are NOT suitable for young children — kids under 6 are not permitted on the tower elevators, and the spiral descent is unsafe for small children even if age-eligible. Average kid-friendly visit: 60 to 75 minutes.',
  },
];

export default function SagradaFamiliaTicketsPage() {
  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: 'Sagrada Família Tickets', href: '/sagrada-familia-tickets/' },
  ];

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Sagrada Família Tickets 2026: Prices, Skip-the-Line & Where to Book',
    description:
      'Real 2026 Sagrada Família prices (€26-95), skip-the-line + tower tickets, and whether to book through GetYourGuide, Viator, Klook, or the official site.',
    datePublished: '2026-04-18',
    dateModified: '2026-04-18',
    author: { '@type': 'Organization', name: siteConfig.name },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.name,
      logo: { '@type': 'ImageObject', url: `${siteConfig.seo.siteUrl}/images/logo.png` },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${siteConfig.seo.siteUrl}/sagrada-familia-tickets/`,
    },
  };

  const faqJsonLd = {
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
      <SEOHead
        title={`Sagrada Família Tickets 2026: Prices, Skip-the-Line & Where to Book | ${siteConfig.name}`}
        description="Real 2026 Sagrada Família prices (€26-95), skip-the-line + tower tickets, and whether to book through GetYourGuide, Viator, Klook, or the official site."
      >
        <link rel="canonical" href={`${siteConfig.seo.siteUrl}/sagrada-familia-tickets/`} />
        <meta
          name="keywords"
          content="Sagrada Familia tickets, Sagrada Familia skip the line, Sagrada Familia tower tickets, Sagrada Familia 2026, Barcelona attractions, Gaudi centenary"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      </SEOHead>

      <div className="bg-surface-cream min-h-screen">
        {/* Hero */}
        <section className="bg-surface-dark text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center">
              <p className="font-script text-spain-gold mb-2">Barcelona&apos;s #1</p>
              <h1 className="text-4xl lg:text-6xl font-bold font-heading mb-6">
                Sagrada Família Tickets 2026: Prices, Skip-the-Line &amp; Where to Book
              </h1>
              <p className="text-xl lg:text-2xl mb-8 max-w-3xl mx-auto opacity-90">
                Real 2026 prices, tower tickets explained, and which booking platform gets you the best slot.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <div className="bg-white bg-opacity-20 px-4 py-2 rounded-full text-sm font-medium">From €26</div>
                <div className="bg-white bg-opacity-20 px-4 py-2 rounded-full text-sm font-medium">Book 2-4 Weeks Ahead</div>
                <div className="bg-white bg-opacity-20 px-4 py-2 rounded-full text-sm font-medium">Towers €36</div>
              </div>
            </div>
          </div>
        </section>

        {/* Breadcrumbs + Disclaimer */}
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

        {/* Why book early */}
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold font-heading text-center mb-8">Why You Need to Book Sagrada Família Early</h2>
            <div className="grid md:grid-cols-3 gap-6 mb-4">
              {whyCards.map((card, i) => (
                <div key={i} className="text-center">
                  <div className="text-4xl mb-4">{card.icon}</div>
                  <h3 className="font-semibold font-heading mb-2">{card.title}</h3>
                  <p className="text-gray-600 text-sm">{card.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Real 2026 Prices */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold font-heading text-center mb-4">Real 2026 Sagrada Família Prices</h2>
            <p className="text-gray-600 text-center mb-8 max-w-2xl mx-auto">
              Prices sourced from the official basilica rates and major resellers. Euro is primary; USD shown for reference.
            </p>
            <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-md overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-surface-cream">
                    <tr>
                      <th className="px-6 py-4 font-heading font-semibold text-sm">Ticket Type</th>
                      <th className="px-6 py-4 font-heading font-semibold text-sm">EUR</th>
                      <th className="px-6 py-4 font-heading font-semibold text-sm">USD</th>
                      <th className="px-6 py-4 font-heading font-semibold text-sm">Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ticketTypes.map((t, i) => (
                      <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-surface-cream/30'}>
                        <td className="px-6 py-3 text-sm font-medium">{t.type}</td>
                        <td className="px-6 py-3 text-sm font-bold text-spain-red">{t.price}</td>
                        <td className="px-6 py-3 text-sm text-gray-600">({t.usd})</td>
                        <td className="px-6 py-3 text-sm text-gray-700">{t.notes}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* Where to Book */}
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold font-heading text-center mb-4">Where to Book Sagrada Família Tickets</h2>
            <p className="text-gray-600 text-center mb-8 max-w-2xl mx-auto">
              Four legitimate options. Resellers cost a few euro more but give you better cancellation terms and combo packages. The official site is cheapest but sells out fastest.
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {providers.map((p, i) => (
                <div key={i} className="bg-white rounded-2xl shadow-md overflow-hidden flex flex-col">
                  <div className={`${p.color} text-white px-6 py-5`}>
                    <h3 className="text-xl font-bold font-heading">{p.name}</h3>
                    <p className="text-sm opacity-90">{p.tagline}</p>
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <p className="text-sm font-semibold text-gray-700 mb-3">{p.priceNote}</p>
                    <ul className="text-sm space-y-2 mb-6 flex-1">
                      {p.bullets.map((b, j) => (
                        <li key={j} className="flex items-start">
                          <span className="text-green-500 mr-2">&#10003;</span>
                          <span className="text-gray-700">{b}</span>
                        </li>
                      ))}
                    </ul>
                    <a
                      href={p.url}
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      className={`block w-full ${p.color} text-white text-center py-3 rounded-xl font-semibold hover:opacity-90 transition-opacity`}
                    >
                      Check Availability &rarr;
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Nativity vs Passion Towers */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold font-heading text-center mb-4">Nativity vs Passion Towers: Which to Pick</h2>
            <p className="text-gray-600 text-center mb-8 max-w-2xl mx-auto">
              You can only pick one tower per visit (both cost €36). Here is the honest breakdown.
            </p>
            <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-md overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-surface-cream">
                    <tr>
                      <th className="px-6 py-4 font-heading font-semibold text-sm">Feature</th>
                      <th className="px-6 py-4 font-heading font-semibold text-sm">Nativity Tower</th>
                      <th className="px-6 py-4 font-heading font-semibold text-sm">Passion Tower</th>
                    </tr>
                  </thead>
                  <tbody>
                    {towerComparison.map((row, i) => (
                      <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-surface-cream/30'}>
                        <td className="px-6 py-3 text-sm font-medium">{row.feature}</td>
                        <td className="px-6 py-3 text-sm text-gray-700">{row.nativity}</td>
                        <td className="px-6 py-3 text-sm text-gray-700">{row.passion}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="max-w-3xl mx-auto mt-6 bg-blue-50 border-l-4 border-blue-400 p-4 rounded">
              <p className="text-gray-700 text-sm">
                <strong>Our call:</strong> First-timer or photographer? Pick <strong>Nativity</strong>. Already seen Sagrada and want a proper Barcelona skyline shot? Pick <strong>Passion</strong>.
              </p>
            </div>
          </div>
        </section>

        {/* Best Time to Visit */}
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold font-heading text-center mb-4">Best Time to Visit Sagrada Família</h2>
            <p className="text-gray-600 text-center mb-8 max-w-2xl mx-auto">
              Light is everything inside Sagrada Família. Nativity side stained glass (blues and greens) glows in the morning. Passion side (reds and oranges) peaks in late afternoon.
            </p>
            <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-md overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-surface-cream">
                    <tr>
                      <th className="px-6 py-4 font-heading font-semibold text-sm">Season</th>
                      <th className="px-6 py-4 font-heading font-semibold text-sm">Morning (Nativity glow)</th>
                      <th className="px-6 py-4 font-heading font-semibold text-sm">Afternoon (Passion glow)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bestTimeToVisit.map((row, i) => (
                      <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-surface-cream/30'}>
                        <td className="px-6 py-3 text-sm font-medium">{row.season}</td>
                        <td className="px-6 py-3 text-sm text-gray-700">{row.morning}</td>
                        <td className="px-6 py-3 text-sm text-gray-700">{row.afternoon}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <p className="text-xs text-gray-500 text-center mt-4">
              Opening hours: 9am-8pm Apr-Sept, 9am-6pm Oct-Mar. Last entry ~30 min before closing.
            </p>
          </div>
        </section>

        {/* 2026 Centenary Context */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold font-heading text-center mb-8">The 2026 Gaudí Centenary Context</h2>
            <div className="max-w-3xl mx-auto space-y-4">
              <div className="bg-white rounded-2xl p-6 shadow-md">
                <p className="text-gray-700">
                  Antoni Gaudí died on 10 June 1926 after being struck by a tram. 2026 is the 100-year anniversary. The basilica has used this date as a symbolic completion target since the 1950s. The central Jesus Christ tower, which will make Sagrada Família the tallest church in the world at 172.5m, is on track for structural completion in 2026.
                </p>
              </div>
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
                <h3 className="font-semibold font-heading mb-2">What this means for visitors</h3>
                <ul className="text-gray-700 text-sm space-y-1 list-disc list-inside">
                  <li>Expect 15-20% more visitors than 2025 — book 3-4 weeks ahead, not 1-2</li>
                  <li>Ticket prices have already adjusted upward; expect small mid-year bumps</li>
                  <li>A Papal visit is rumored but not confirmed; if it happens, expect closures</li>
                  <li>Special centenary events and illuminations are planned around 10 June 2026</li>
                  <li>Some scaffolding will still be visible in photos through early 2026</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Combos Worth It */}
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold font-heading text-center mb-8">Combo Tickets Worth Buying</h2>
            <div className="max-w-3xl mx-auto space-y-4">
              <div className="bg-surface-cream rounded-2xl p-6 shadow-md">
                <h3 className="font-semibold font-heading mb-2 text-lg">Gaudí Pass: Sagrada + Park Güell + Casa Batlló</h3>
                <p className="text-gray-700 text-sm mb-3">
                  Sold through GetYourGuide and Viator at €75-95 depending on date. Bought separately these three run roughly €26 + €18 + €45 = €89. The combo saves €15-25 and usually includes skip-line at each site.
                </p>
                <p className="text-gray-700 text-sm"><strong>Verdict:</strong> Worth it for 2-3 day Barcelona visitors who want the Gaudí hit list in one pass.</p>
              </div>
              <div className="bg-surface-cream rounded-2xl p-6 shadow-md">
                <h3 className="font-semibold font-heading mb-2 text-lg">Sagrada + Park Güell</h3>
                <p className="text-gray-700 text-sm mb-3">
                  Two-site pass runs €45-55 on resellers. Separate purchase is €26 + €18 = €44. The combo only saves ~€1 but guarantees both time slots and skip-line.
                </p>
                <p className="text-gray-700 text-sm"><strong>Verdict:</strong> Skip the combo and book them separately unless you want the skip-line convenience.</p>
              </div>
              <div className="bg-surface-cream rounded-2xl p-6 shadow-md">
                <h3 className="font-semibold font-heading mb-2 text-lg">Sagrada + Casa Batlló</h3>
                <p className="text-gray-700 text-sm mb-3">
                  Runs €50-60 combined. Separately: €26 + €45 = €71. Real savings here: €11-21.
                </p>
                <p className="text-gray-700 text-sm"><strong>Verdict:</strong> Solid value if Casa Batlló was already on your list.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Dress Code + Photography */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold font-heading text-center mb-8">Dress Code and Photography Rules</h2>
            <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              <div className="bg-white rounded-2xl p-6 shadow-md">
                <h3 className="font-semibold font-heading mb-3 text-lg">Dress Code (enforced)</h3>
                <ul className="text-gray-700 text-sm space-y-2">
                  <li className="flex items-start"><span className="text-spain-red mr-2">&#8226;</span><span>Shoulders must be covered — no tank tops, spaghetti straps, or bare-shoulder dresses</span></li>
                  <li className="flex items-start"><span className="text-spain-red mr-2">&#8226;</span><span>Knees must be covered — no short shorts or mini skirts</span></li>
                  <li className="flex items-start"><span className="text-spain-red mr-2">&#8226;</span><span>Hats and caps must be removed inside the basilica</span></li>
                  <li className="flex items-start"><span className="text-spain-red mr-2">&#8226;</span><span>A scarf or light shawl is acceptable as a shoulder cover</span></li>
                  <li className="flex items-start"><span className="text-spain-red mr-2">&#8226;</span><span>Staff will deny entry at the security check if dress code is not met</span></li>
                </ul>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-md">
                <h3 className="font-semibold font-heading mb-3 text-lg">Photography Rules</h3>
                <ul className="text-gray-700 text-sm space-y-2">
                  <li className="flex items-start"><span className="text-spain-red mr-2">&#8226;</span><span>Phone and handheld camera photos are welcome</span></li>
                  <li className="flex items-start"><span className="text-spain-red mr-2">&#8226;</span><span>No flash — it damages the stained glass sensors</span></li>
                  <li className="flex items-start"><span className="text-spain-red mr-2">&#8226;</span><span>No tripods or monopods without a pre-arranged permit</span></li>
                  <li className="flex items-start"><span className="text-spain-red mr-2">&#8226;</span><span>No drones anywhere on or near the property</span></li>
                  <li className="flex items-start"><span className="text-spain-red mr-2">&#8226;</span><span>Commercial shoots require official written permission</span></li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Common Mistakes */}
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold font-heading text-center mb-8">Common Sagrada Família Mistakes to Avoid</h2>
            <div className="max-w-3xl mx-auto bg-orange-50 rounded-2xl p-6 border-l-4 border-orange-400">
              <ul className="space-y-3">
                {commonMistakes.map((m, i) => (
                  <li key={i} className="flex items-start">
                    <span className="text-orange-500 font-bold mr-3">{i + 1}.</span>
                    <span className="text-gray-800 text-sm">{m}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Access from Barcelona Center */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold font-heading text-center mb-8">Getting to Sagrada Família</h2>
            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              <div className="bg-white rounded-2xl p-6 shadow-md">
                <h3 className="font-semibold font-heading mb-2">Metro (Easiest)</h3>
                <p className="text-gray-700 text-sm">
                  Lines L2 (purple) and L5 (blue) both stop at station &quot;Sagrada Família&quot;. Exit directly faces the Nativity facade. From Plaça Catalunya (city center) the trip takes 10-12 minutes. Single ticket €2.65 in 2026, or use a T-casual 10-ride card at €12.55.
                </p>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-md">
                <h3 className="font-semibold font-heading mb-2">Walking from Eixample</h3>
                <p className="text-gray-700 text-sm">
                  From Passeig de Gràcia (where Casa Batlló and La Pedrera sit) it is a 25-30 minute walk east along Avinguda Diagonal then down Carrer Mallorca. A natural Gaudí walking route if you have the morning free.
                </p>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-md">
                <h3 className="font-semibold font-heading mb-2">Taxi / Rideshare</h3>
                <p className="text-gray-700 text-sm">
                  From Barcelona city center expect €10-14 by metered taxi or Cabify. Address: <strong>Mallorca 401, 08013 Barcelona</strong>. Drivers know the basilica by name. Drop-off is on Carrer Mallorca, a 2-minute walk from the main entrance.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Accessibility */}
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold font-heading text-center mb-8">Accessibility</h2>
            <div className="max-w-3xl mx-auto space-y-4">
              <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded">
                <h3 className="font-semibold font-heading mb-2">Wheelchair access — Yes (main basilica)</h3>
                <p className="text-gray-700 text-sm">The main entrance, interior, and museum are wheelchair accessible. Step-free paths throughout the nave. Accessible toilets on-site. Companion gets reduced-rate ticket.</p>
              </div>
              <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded">
                <h3 className="font-semibold font-heading mb-2">Towers — No wheelchair access</h3>
                <p className="text-gray-700 text-sm">Elevators go up only. The descent is via a ~400-step tight spiral staircase. Towers are not accessible for wheelchair users, people with severe knee issues, or anyone who cannot manage narrow stairs.</p>
              </div>
              <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded">
                <h3 className="font-semibold font-heading mb-2">Service dogs — Yes</h3>
                <p className="text-gray-700 text-sm">Certified service dogs are welcome throughout the basilica. Pet dogs are not permitted. Bring documentation if asked at security.</p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold font-heading text-center mb-8">Frequently Asked Questions</h2>
            <div className="max-w-3xl mx-auto space-y-4">
              {faqItems.map((f, i) => (
                <details key={i} className="bg-white rounded-2xl p-6 shadow-md group">
                  <summary className="font-semibold font-heading cursor-pointer list-none flex justify-between items-center">
                    <span>{f.q}</span>
                    <span className="text-spain-red ml-4 group-open:rotate-45 transition-transform text-2xl leading-none">+</span>
                  </summary>
                  <p className="text-gray-700 mt-4 text-sm leading-relaxed">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Sibling Pillars */}
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold font-heading text-center mb-4">More Spain Icon Tickets</h2>
            <p className="text-gray-600 text-center mb-8 max-w-2xl mx-auto">
              Planning the full Spain icon run? These pillar guides cover the other unmissable sites.
            </p>
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <Link
                href="/alhambra-tickets/"
                className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl hover:-translate-y-1 transition-all block border border-gray-100"
              >
                <div className="text-4xl mb-3">🏰</div>
                <h3 className="font-semibold font-heading text-gray-900 mb-2 text-lg">Alhambra Tickets Guide</h3>
                <p className="text-gray-600 text-sm">
                  Granada&apos;s Moorish palace sells out faster than Sagrada Família. Prices, Nasrid Palace timing, and where to book.
                </p>
              </Link>
              <Link
                href="/park-guell-tickets/"
                className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl hover:-translate-y-1 transition-all block border border-gray-100"
              >
                <div className="text-4xl mb-3">🦎</div>
                <h3 className="font-semibold font-heading text-gray-900 mb-2 text-lg">Park Güell Tickets Guide</h3>
                <p className="text-gray-600 text-sm">
                  Gaudí&apos;s mosaic park is a natural combo with Sagrada. Prices, Monumental Zone access, and best time of day.
                </p>
              </Link>
            </div>
          </div>
        </section>

        {/* Related Reading */}
        <section className="py-12 bg-surface-cream">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold font-heading text-center mb-4">Related Reading</h2>
            <p className="text-gray-600 text-center mb-8 max-w-2xl mx-auto">
              Planning Barcelona and Spain travel in 2026? These guides pair well with your Sagrada Família visit.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <Link
                href="/blog/is-barcelona-safe-2026/"
                className="bg-white rounded-2xl shadow-md p-6 text-center hover:shadow-xl hover:-translate-y-1 transition-all block"
              >
                <div className="text-4xl mb-3">🛡️</div>
                <h3 className="font-semibold font-heading text-gray-900 mb-2">Is Barcelona Safe in 2026?</h3>
                <p className="text-gray-600 text-sm">Pickpocket zones, tourist areas, and honest safety data.</p>
              </Link>
              <Link
                href="/blog/is-spain-expensive-2026/"
                className="bg-white rounded-2xl shadow-md p-6 text-center hover:shadow-xl hover:-translate-y-1 transition-all block"
              >
                <div className="text-4xl mb-3">💶</div>
                <h3 className="font-semibold font-heading text-gray-900 mb-2">Is Spain Expensive in 2026?</h3>
                <p className="text-gray-600 text-sm">Real daily budgets for Barcelona, Madrid, and beyond.</p>
              </Link>
              <Link
                href="/blog/barcelona-vs-madrid-for-tourists/"
                className="bg-white rounded-2xl shadow-md p-6 text-center hover:shadow-xl hover:-translate-y-1 transition-all block"
              >
                <div className="text-4xl mb-3">⚖️</div>
                <h3 className="font-semibold font-heading text-gray-900 mb-2">Barcelona vs Madrid</h3>
                <p className="text-gray-600 text-sm">Which city wins for first-time tourists in 2026?</p>
              </Link>
              <Link
                href="/blog/best-time-to-visit-spain-2026/"
                className="bg-white rounded-2xl shadow-md p-6 text-center hover:shadow-xl hover:-translate-y-1 transition-all block"
              >
                <div className="text-4xl mb-3">📅</div>
                <h3 className="font-semibold font-heading text-gray-900 mb-2">Best Time to Visit Spain</h3>
                <p className="text-gray-600 text-sm">Month-by-month weather, crowds, and pricing guide.</p>
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
