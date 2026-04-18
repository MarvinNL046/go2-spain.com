import { GetStaticProps } from 'next';
import Link from 'next/link';
import SEOHead from '../../components/SEOHead';
import Breadcrumbs from '../../components/Breadcrumbs';
import { siteConfig } from '../../site.config';

const whyCards = [
  {
    icon: '⏳',
    title: 'Sells Out 2-3 Months Ahead',
    body: 'Peak season (Apr-Oct) the Nasrid Palaces regularly sell out 8-12 weeks before arrival. Tickets are released on a rolling basis roughly 3 months out, so book as soon as your dates are confirmed or you will be chasing resellers at a premium.',
  },
  {
    icon: '⏰',
    title: 'Nasrid Palaces Need Timed Entry',
    body: 'Your ticket has a 30-minute window printed on it. Arrive 15 minutes early at the Nasrid Palaces entrance (not the main gate, which is a 10-minute walk away). Miss the window and staff will not let you in, no refunds, no exceptions.',
  },
  {
    icon: '🌙',
    title: 'Night Visits Book Separately',
    body: 'The night visit to the Nasrid Palaces (€10) and Generalife Gardens (€8) are sold as separate tickets and sell out fastest. Cheapest, most atmospheric way to see the palace without daytime crowds, but book 4+ months ahead in summer.',
  },
];

const ticketTypes = [
  { name: 'General Ticket (Alhambra + Nasrid Palaces + Generalife)', eur: '€19', usd: '$21', note: 'The complete experience, book first' },
  { name: 'Nasrid Palaces Only (PM 2pm+)', eur: '€16', usd: '$17', note: 'Half-price afternoon entry, legit workaround' },
  { name: 'Gardens + Generalife Only', eur: '€10', usd: '$11', note: 'No Nasrid Palaces included' },
  { name: 'Dobla de Oro (combo Granada Moorish houses)', eur: '€27', usd: '$29', note: 'Adds 6 Moorish houses in the Albaicin' },
  { name: 'Night Visit Nasrid Palaces', eur: '€10', usd: '$11', note: 'Most atmospheric, sells out fastest' },
  { name: 'Night Visit Generalife Gardens', eur: '€8', usd: '$9', note: 'Gardens only, quieter slots available' },
  { name: 'Under-12 (free ticket required)', eur: 'FREE', usd: 'FREE', note: 'Still need to reserve a named ticket' },
  { name: 'Reduced 12-15', eur: '€10-13', usd: '$11-14', note: 'Varies by ticket type' },
  { name: 'Senior 65+', eur: '€13', usd: '$14', note: 'Only on official Patronato site' },
  { name: 'Guided Tour (2.5h reseller)', eur: '€45-55', usd: '$49-60', note: 'Skip-line + English guide + context' },
];

const providers = [
  {
    name: 'GetYourGuide',
    tagline: 'Best When Official Sells Out',
    href: siteConfig.affiliateLinks.getYourGuide,
    color: 'bg-blue-600',
    points: [
      'Usually has inventory when the official Patronato site is sold out',
      'English-speaking customer support, 24/7 chat',
      'Free cancellation up to 24 hours before your slot',
      'Skip-line + English guide combos clearly priced',
    ],
  },
  {
    name: 'Viator',
    tagline: 'Tours + Skip-Line Combos',
    href: siteConfig.affiliateLinks.viator,
    color: 'bg-red-600',
    points: [
      'TripAdvisor-owned with thousands of verified reviews',
      '30+ Alhambra tour listings with English guides',
      'Strong choice for private and small-group tours',
      'Skip-line access included in most guided options',
    ],
  },
  {
    name: 'Klook',
    tagline: 'Mobile-First Asian Market',
    href: siteConfig.affiliateLinks.klook,
    color: 'bg-orange-500',
    points: [
      'Instant ticket confirmation in the app',
      'Strong option for travelers from Asia and Oceania',
      'Mobile QR tickets, no printing required',
      'Occasional promo codes on bundled experiences',
    ],
  },
  {
    name: 'Alhambra Patronato (Official)',
    tagline: 'Cheapest Base + Fastest Release',
    href: 'https://tickets.alhambra-patronato.es/en/',
    color: 'bg-gray-700',
    points: [
      'Official base price at €19, no markup',
      'First to release new inventory 3 months out',
      'Tickets are ID-matched (must bring passport on the day)',
      'Website is slow and often sells out fast, refresh 8am CET',
    ],
  },
];

const bookingStrategy = [
  {
    step: '1',
    title: '3 months out: hit the official Patronato daily',
    body: 'Set a reminder for exactly 90 days before your visit and check tickets.alhambra-patronato.es at 8am CET. This is when new dates unlock on a rolling basis at the base €19 price.',
  },
  {
    step: '2',
    title: 'If sold out on official: switch to resellers',
    body: 'Jump to GetYourGuide and Viator straight away. They hold allocation that the official site does not always show, and you will often find slots for sold-out dates at a €5-15 markup.',
  },
  {
    step: '3',
    title: 'Last resort: book a guided tour',
    body: 'When both the official site and aggregators show sold out, a guided tour (€45-55) usually still has access because guides hold reserved group slots. You pay more but get skip-line entry + context.',
  },
  {
    step: '4',
    title: 'AVOID street vendors in Granada',
    body: 'People near Plaza Nueva and along the Cuesta de Gomerez offering cheap Alhambra tickets are running scams. Tickets are named and ID-matched, so a resold ticket will be rejected at the gate.',
  },
];

const bestTimeToVisit = [
  { label: 'May + September', detail: 'Ideal temperature 22-28°C, gardens in bloom, still very crowded' },
  { label: 'July + August', detail: 'Hot 35-40°C, aim for 8:30am slot or evening night visit only' },
  { label: 'November to February', detail: 'Cheap, wide availability, cold marble mornings, snowy Sierra Nevada backdrop' },
  { label: 'Morning 8:30am slot', detail: 'Cooler temps and best Nasrid Palace interior light for photos' },
  { label: 'Afternoon 2pm+', detail: 'Qualifies for the €16 half-price Nasrid ticket' },
  { label: 'Night visit', detail: 'Most atmospheric, shortest crowds, palace lit in warm light' },
];

const commonMistakes = [
  'Showing up without the passport or ID used at booking, which triggers an automatic rejection at the Nasrid Palaces gate.',
  'Missing the 30-minute Nasrid Palaces timed window because you arrived at the wrong gate (main entrance is 10 minutes from Nasrid entrance).',
  'Buying the Gardens + Generalife ticket thinking it includes the Nasrid Palaces. It does not, and they are a completely separate €16 ticket.',
  'Buying tickets from street vendors near Plaza Nueva or the Cuesta de Gomerez. These are either fake or named to someone else.',
  'Underestimating the hill walk from Plaza Nueva, which is 20-25 minutes uphill on cobblestones, brutal in July.',
  'Booking a hotel far from the city center without knowing about the C3 microbus, which is the only cheap way up the hill.',
];

const faqItems = [
  {
    q: 'How much are Alhambra tickets in 2026?',
    a: 'The General Ticket covering the Nasrid Palaces, Alcazaba and Generalife costs €19 for adults on the official Patronato site. Gardens-only is €10, the afternoon half-price Nasrid ticket is €16, night visits are €8-10, and guided tours through GetYourGuide or Viator run €45-55. Under-12s are free but still need a named ticket.',
  },
  {
    q: 'How far in advance should I book Alhambra tickets?',
    a: 'Book at least 2-3 months in advance for April through October. Tickets are released on a rolling basis roughly 90 days out on the official site. For night visits and peak summer dates, aim for 4 months ahead. In winter (November to February) you can often book a week out, though not same-day.',
  },
  {
    q: 'What if Alhambra tickets are sold out?',
    a: 'When the official Patronato site shows sold out, check GetYourGuide, Viator and Klook immediately. Resellers hold allocation that is not visible on the official site and often have slots available at a €5-15 markup. If those are also sold out, a guided tour (€45-55) almost always has access because guides reserve group slots separately.',
  },
  {
    q: 'Do I need ID to enter the Alhambra?',
    a: 'Yes. All Alhambra tickets are named and ID-matched. You must bring the passport or ID document you used at booking. Staff check IDs at the Nasrid Palaces entrance and will refuse entry if the name does not match, with no refund. This is why street-vendor tickets (named to someone else) do not work.',
  },
  {
    q: "What is the difference between Nasrid Palaces and Generalife?",
    a: 'The Nasrid Palaces are the stunning 14th-century Moorish royal residence with the Court of the Lions, Comares Palace and Hall of the Ambassadors. The Generalife is the separate summer gardens and villa 10 minutes walk up the hill. The General Ticket covers both, but there are also cheaper Gardens-only (€10) and half-price Nasrid-only (€16) tickets.',
  },
  {
    q: 'Is the Alhambra night visit worth it?',
    a: 'For most travelers, yes. The Nasrid Palaces night visit (€10) shows the palace lit in warm amber with far smaller crowds than daytime, and the acoustics are haunting. You do not see the exterior views as well and the Generalife is not included, so a night visit is best as a second visit or pair it with a morning Gardens ticket the next day.',
  },
  {
    q: 'Is the €16 afternoon half-price ticket worth it?',
    a: 'If you are on a budget and do not mind seeing the palaces at 2pm+ in summer heat, yes. You get the full Nasrid Palaces experience at a €3 saving over the General Ticket, but you lose access to the Alcazaba fortress and Generalife gardens. It is also easier to book than morning slots because fewer tour groups compete for these windows.',
  },
  {
    q: 'Can I visit Alhambra with kids?',
    a: 'Yes, and under-12s are free, but they still need a named ticket reserved at booking. The site involves 2-3 hours of walking on uneven cobblestones, so strollers are awkward. Bring water and a hat in summer. Older kids enjoy the Alcazaba fortress towers and the Gardens, while the Nasrid Palaces work better for ages 8+.',
  },
];

const articleJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Alhambra Tickets 2026: Prices, Booking Strategy When Sold Out',
  description:
    'Real 2026 Alhambra prices (€19-55) and how to book when the Nasrid Palaces sell out 3 months ahead, comparing GetYourGuide, Viator, Klook, and the official Patronato site.',
  author: {
    '@type': 'Organization',
    name: siteConfig.name,
    url: siteConfig.seo.siteUrl,
  },
  publisher: {
    '@type': 'Organization',
    name: siteConfig.name,
    url: siteConfig.seo.siteUrl,
  },
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': `${siteConfig.seo.siteUrl}/alhambra-tickets/`,
  },
  datePublished: '2026-04-18',
  dateModified: '2026-04-18',
};

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqItems.map((item) => ({
    '@type': 'Question',
    name: item.q,
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.a,
    },
  })),
};

export default function AlhambraTicketsPage() {
  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: 'Alhambra Tickets', href: '/alhambra-tickets' },
  ];

  return (
    <>
      <SEOHead
        title={`Alhambra Tickets 2026: Prices, Booking Strategy When Sold Out | ${siteConfig.name}`}
        description="Real 2026 Alhambra prices (€19-55) and how to book when the Nasrid Palaces sell out 3 months ahead, compare GetYourGuide, Viator, Klook, and the official Patronato site."
      >
        <link rel="canonical" href={`${siteConfig.seo.siteUrl}/alhambra-tickets/`} />
        <meta name="keywords" content="Alhambra tickets, Alhambra Granada tickets, Nasrid Palaces booking, Alhambra sold out, Alhambra night visit, Generalife tickets" />
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
        {/* Hero Section */}
        <section className="bg-surface-dark text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center">
              <p className="font-script text-spain-gold mb-2">Europe&apos;s Hardest Ticket</p>
              <h1 className="text-4xl lg:text-6xl font-bold font-heading mb-6">
                Alhambra Tickets 2026: Prices, How to Book When Sold Out
              </h1>
              <p className="text-xl lg:text-2xl mb-8 max-w-3xl mx-auto opacity-90">
                Granada&apos;s top attraction sells out 2-3 months ahead in peak season. Here is how to get a slot anyway.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <div className="bg-white bg-opacity-20 px-4 py-2 rounded-full text-sm font-medium">From €19</div>
                <div className="bg-white bg-opacity-20 px-4 py-2 rounded-full text-sm font-medium">Book 3 Months Ahead</div>
                <div className="bg-white bg-opacity-20 px-4 py-2 rounded-full text-sm font-medium">Night Visits €10</div>
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

        {/* Why Alhambra is hard */}
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold font-heading text-center mb-8">Why Alhambra Tickets Are Hard to Get</h2>
            <div className="grid md:grid-cols-3 gap-6 mb-4">
              {whyCards.map((card) => (
                <div key={card.title} className="bg-surface-cream rounded-2xl p-6 text-center">
                  <div className="text-4xl mb-4">{card.icon}</div>
                  <h3 className="font-semibold font-heading mb-2">{card.title}</h3>
                  <p className="text-gray-700 text-sm">{card.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Real 2026 Prices */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold font-heading text-center mb-4">Real 2026 Alhambra Ticket Prices</h2>
            <p className="text-gray-600 text-center mb-8 max-w-2xl mx-auto">
              Official prices from the Patronato de la Alhambra. USD is rough conversion and varies with your card&apos;s FX rate.
            </p>
            <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-md overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-surface-dark text-white">
                    <tr>
                      <th className="px-4 py-3 text-left font-heading">Ticket Type</th>
                      <th className="px-4 py-3 text-left font-heading">EUR</th>
                      <th className="px-4 py-3 text-left font-heading">USD</th>
                      <th className="px-4 py-3 text-left font-heading">Notes</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {ticketTypes.map((ticket) => (
                      <tr key={ticket.name} className="hover:bg-surface-cream">
                        <td className="px-4 py-3 font-medium">{ticket.name}</td>
                        <td className="px-4 py-3 text-spain-red font-bold">{ticket.eur}</td>
                        <td className="px-4 py-3 text-gray-600">({ticket.usd})</td>
                        <td className="px-4 py-3 text-gray-700">{ticket.note}</td>
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
            <h2 className="text-3xl font-bold font-heading text-center mb-4">Where to Book Alhambra Tickets</h2>
            <p className="text-gray-600 text-center mb-8 max-w-2xl mx-auto">
              Start with the official Patronato for the cheapest base price. Switch to resellers the moment it shows sold out.
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              {providers.map((provider) => (
                <div key={provider.name} className="bg-surface-cream rounded-2xl shadow-md overflow-hidden flex flex-col">
                  <div className={`${provider.color} text-white px-6 py-4`}>
                    <h3 className="text-2xl font-bold font-heading">{provider.name}</h3>
                    <p className="text-sm opacity-90">{provider.tagline}</p>
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <ul className="text-sm space-y-2 mb-6 flex-1">
                      {provider.points.map((point, i) => (
                        <li key={i} className="flex items-start">
                          <span className="text-green-500 mr-2">&#10003;</span>
                          <span className="text-gray-700">{point}</span>
                        </li>
                      ))}
                    </ul>
                    <a
                      href={provider.href}
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      className={`block w-full ${provider.color} text-white text-center py-3 rounded-xl font-semibold hover:opacity-90 transition-opacity`}
                    >
                      Check {provider.name} &rarr;
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Booking Strategy */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold font-heading text-center mb-8">Booking Strategy When Sold Out</h2>
            <div className="max-w-3xl mx-auto bg-orange-50 rounded-2xl p-8">
              <ol className="space-y-6">
                {bookingStrategy.map((item) => (
                  <li key={item.step} className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-spain-red text-white rounded-full flex items-center justify-center font-bold">
                      {item.step}
                    </div>
                    <div>
                      <h3 className="font-semibold font-heading mb-1">{item.title}</h3>
                      <p className="text-gray-700 text-sm">{item.body}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        {/* Nasrid Timed Entry Trap */}
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold font-heading text-center mb-8">Nasrid Palaces: the Timed-Entry Trap</h2>
            <div className="max-w-3xl mx-auto space-y-4">
              <div className="bg-red-50 border-l-4 border-red-500 p-4">
                <h3 className="font-semibold font-heading mb-2">30-minute window, printed on your ticket</h3>
                <p className="text-gray-700">Your ticket shows a specific 30-minute window for Nasrid Palaces entry. This is the only part of the Alhambra that enforces timed entry. The Alcazaba fortress and Generalife gardens are open access for the full day.</p>
              </div>
              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4">
                <h3 className="font-semibold font-heading mb-2">Arrive 15 minutes early, at the right gate</h3>
                <p className="text-gray-700">The Nasrid Palaces have their own entrance, roughly a 10-minute walk from the main Alhambra gate (Puerta del Generalife). Walk there immediately after entering. Miss the window and you lose the Nasrid visit entirely, with no refund.</p>
              </div>
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
                <h3 className="font-semibold font-heading mb-2">Non-transferable and ID-matched</h3>
                <p className="text-gray-700">Tickets are printed with your full name and passport or ID number. Staff scan the ticket, then check your ID against it. You cannot give an unused ticket to a friend. This is why the secondary market for Alhambra tickets does not work.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Night Visits */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold font-heading text-center mb-8">Night Visits Explained</h2>
            <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
              <div className="bg-surface-dark text-white rounded-2xl p-6">
                <h3 className="text-2xl font-bold font-heading mb-2">Nasrid Palaces at Night</h3>
                <p className="text-spain-gold text-3xl font-bold mb-4">€10 <span className="text-base font-normal opacity-70">($11)</span></p>
                <p className="text-sm opacity-90 mb-3">The most atmospheric way to see the Alhambra. Crowds drop by 70%, the palace is lit in warm amber, and the Court of the Lions feels completely different. Offered Tue-Sat.</p>
                <p className="text-sm opacity-80">Books out fastest, aim for 4+ months ahead in summer.</p>
              </div>
              <div className="bg-surface-dark text-white rounded-2xl p-6">
                <h3 className="text-2xl font-bold font-heading mb-2">Generalife Gardens at Night</h3>
                <p className="text-spain-gold text-3xl font-bold mb-4">€8 <span className="text-base font-normal opacity-70">($9)</span></p>
                <p className="text-sm opacity-90 mb-3">Quieter alternative that opens only on select dates in summer and autumn. You get the gardens and summer palace lit up, but no Nasrid Palace access. Pair it with a morning visit the next day.</p>
                <p className="text-sm opacity-80">Shorter season and fewer slots, but easier to score than Nasrid night.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Half-Price Afternoon Ticket */}
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold font-heading text-center mb-8">Half-Price Afternoon Nasrid Ticket</h2>
            <div className="max-w-3xl mx-auto bg-green-50 border-l-4 border-green-500 p-6 rounded-r-2xl">
              <div className="flex items-baseline gap-3 mb-3">
                <span className="text-spain-red text-3xl font-bold">€16</span>
                <span className="text-gray-600">($17)</span>
                <span className="text-sm text-gray-500">vs €19 General Ticket</span>
              </div>
              <p className="text-gray-700 mb-3">
                From 2pm onwards in summer (and 2pm onwards year-round, with earlier cutoffs in winter), the Patronato sells a Nasrid-only ticket at €16. You still get the full Nasrid Palaces experience, which is what most travelers come for.
              </p>
              <p className="text-gray-700 mb-3">
                <strong>Trade-off:</strong> You lose the Alcazaba fortress and the Generalife gardens. If you just want to see the Court of the Lions and Hall of the Ambassadors, this is the cheapest legitimate way in.
              </p>
              <p className="text-gray-700">
                <strong>Bonus:</strong> Afternoon slots are also less contested than 8:30am slots, so availability is often better 4-6 weeks out when peak morning slots are gone.
              </p>
            </div>
          </div>
        </section>

        {/* Best Time to Visit */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold font-heading text-center mb-8">Best Time to Visit Alhambra</h2>
            <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-4">
              {bestTimeToVisit.map((item) => (
                <div key={item.label} className="bg-white rounded-2xl p-5 shadow-md">
                  <h3 className="font-semibold font-heading text-spain-red mb-1">{item.label}</h3>
                  <p className="text-gray-700 text-sm">{item.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Getting There */}
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold font-heading text-center mb-8">Getting There from Granada Center</h2>
            <div className="max-w-3xl mx-auto space-y-4">
              <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
                <h3 className="font-semibold font-heading mb-2">Bus C3 or C4 from Plaza Nueva (recommended)</h3>
                <p className="text-gray-700">The C3 microbus leaves Plaza Isabel la Catolica every 10 minutes, costs €1.40, and drops you at the main Alhambra entrance in about 12 minutes. The C4 is slower but also works. Buy a single ticket or a Credibus card for multi-use.</p>
              </div>
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                <h3 className="font-semibold font-heading mb-2">Walking up Cuesta de Gomerez (20-25 minutes)</h3>
                <p className="text-gray-700">Scenic but steep cobblestone climb through a wooded park from Plaza Nueva. Pleasant in spring and autumn, brutal in July-August afternoon heat. Skip if you have mobility issues or bad knees.</p>
              </div>
              <div className="bg-green-50 border-l-4 border-green-400 p-4">
                <h3 className="font-semibold font-heading mb-2">Taxi (€8-12)</h3>
                <p className="text-gray-700">Fine if you are running late for your Nasrid slot. Drops you at the upper parking area near the main gate, 5-minute walk to the Nasrid entrance. Uber is not widely available in Granada but Cabify works.</p>
              </div>
            </div>
          </div>
        </section>

        {/* What to Bring */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold font-heading text-center mb-8">What to Bring</h2>
            <div className="max-w-3xl mx-auto grid sm:grid-cols-2 gap-4">
              <div className="bg-white rounded-2xl p-5 shadow-md flex gap-3">
                <div className="text-3xl">🪪</div>
                <div>
                  <h3 className="font-semibold font-heading mb-1">Passport or ID</h3>
                  <p className="text-sm text-gray-700">Must match the name on your ticket, non-negotiable.</p>
                </div>
              </div>
              <div className="bg-white rounded-2xl p-5 shadow-md flex gap-3">
                <div className="text-3xl">💧</div>
                <div>
                  <h3 className="font-semibold font-heading mb-1">Water bottle</h3>
                  <p className="text-sm text-gray-700">Refill at fountains, very limited shop options inside.</p>
                </div>
              </div>
              <div className="bg-white rounded-2xl p-5 shadow-md flex gap-3">
                <div className="text-3xl">🧥</div>
                <div>
                  <h3 className="font-semibold font-heading mb-1">Light jacket</h3>
                  <p className="text-sm text-gray-700">Nasrid Palaces marble stays cold even in summer.</p>
                </div>
              </div>
              <div className="bg-white rounded-2xl p-5 shadow-md flex gap-3">
                <div className="text-3xl">👟</div>
                <div>
                  <h3 className="font-semibold font-heading mb-1">Good walking shoes</h3>
                  <p className="text-sm text-gray-700">2-3 hours on uneven cobblestones, avoid new shoes.</p>
                </div>
              </div>
              <div className="bg-white rounded-2xl p-5 shadow-md flex gap-3">
                <div className="text-3xl">🎧</div>
                <div>
                  <h3 className="font-semibold font-heading mb-1">Audio guide (€5 extra)</h3>
                  <p className="text-sm text-gray-700">Highly recommended if you are not on a guided tour.</p>
                </div>
              </div>
              <div className="bg-white rounded-2xl p-5 shadow-md flex gap-3">
                <div className="text-3xl">☀️</div>
                <div>
                  <h3 className="font-semibold font-heading mb-1">Hat + sunscreen (summer)</h3>
                  <p className="text-sm text-gray-700">Alcazaba and Generalife have minimal shade.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Common Mistakes */}
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold font-heading text-center mb-8">Common Mistakes to Avoid</h2>
            <div className="max-w-3xl mx-auto bg-orange-50 rounded-2xl p-6">
              <ul className="space-y-3">
                {commonMistakes.map((mistake, i) => (
                  <li key={i} className="flex items-start">
                    <span className="flex-shrink-0 w-6 h-6 bg-spain-red text-white rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-0.5">
                      {i + 1}
                    </span>
                    <span className="text-gray-800">{mistake}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Sacromonte + Flamenco */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold font-heading text-center mb-8">Combining with Sacromonte + Flamenco</h2>
            <div className="max-w-3xl mx-auto space-y-4">
              <div className="bg-white rounded-2xl p-6 shadow-md">
                <h3 className="font-semibold font-heading mb-2">Morning Alhambra + evening Sacromonte flamenco</h3>
                <p className="text-gray-700">If you have the 8:30am or 10am Nasrid slot, you are out by noon. Lunch in the Albaicin with Alhambra views, rest in the afternoon, then head to Sacromonte for a cave-venue flamenco show at 8pm or 10pm. Most zambras include dinner and cost €30-45.</p>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-md">
                <h3 className="font-semibold font-heading mb-2">Afternoon Alhambra + late dinner</h3>
                <p className="text-gray-700">With the €16 half-price 2pm Nasrid ticket, you finish around 5-6pm and can walk down through the Albaicin at golden hour, which is a world-class sunset photo spot. Dinner after 9pm is the local norm.</p>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-md">
                <h3 className="font-semibold font-heading mb-2">Night visit + early morning Generalife</h3>
                <p className="text-gray-700">If you scored the Nasrid night visit, book a Generalife-only Gardens ticket for the next morning at €10. You cover both the interior and gardens experience at different times of day without paying for the €19 General Ticket twice.</p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold font-heading text-center mb-8">Frequently Asked Questions</h2>
            <div className="max-w-3xl mx-auto space-y-4">
              {faqItems.map((faq, i) => (
                <details key={i} className="bg-surface-cream rounded-2xl p-6 shadow-sm group">
                  <summary className="font-semibold font-heading cursor-pointer flex justify-between items-center">
                    <span>{faq.q}</span>
                    <span className="text-spain-red text-xl group-open:rotate-45 transition-transform">+</span>
                  </summary>
                  <p className="text-gray-700 mt-3">{faq.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Cross-Links to Sibling Pillars */}
        <section className="py-12 bg-surface-cream">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold font-heading text-center mb-4">Other Spain Bucket-List Tickets</h2>
            <p className="text-gray-600 text-center mb-8 max-w-2xl mx-auto">Spain&apos;s other two notoriously hard-to-book attractions, also by Gaudi in Barcelona.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <Link href="/sagrada-familia-tickets/" className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl hover:-translate-y-1 transition-all block">
                <div className="text-4xl mb-3">⛪</div>
                <h3 className="font-semibold font-heading text-gray-900 mb-2">Sagrada Familia Tickets</h3>
                <p className="text-gray-600 text-sm">Gaudi&apos;s Barcelona masterpiece, from €26, tower access, best booking times.</p>
              </Link>
              <Link href="/park-guell-tickets/" className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl hover:-translate-y-1 transition-all block">
                <div className="text-4xl mb-3">🦎</div>
                <h3 className="font-semibold font-heading text-gray-900 mb-2">Park Guell Tickets</h3>
                <p className="text-gray-600 text-sm">Barcelona&apos;s mosaic park, €18, timed entry, how to combine with Sagrada.</p>
              </Link>
            </div>
          </div>
        </section>

        {/* Related Reading */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold font-heading text-center mb-4">Related Reading</h2>
            <p className="text-gray-600 text-center mb-8 max-w-2xl mx-auto">Plan the rest of your Spain trip around your Alhambra visit.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <Link href="/blog/alhambra-day-trip-planning-guide/" className="bg-white rounded-2xl shadow-md p-6 text-center hover:shadow-xl hover:-translate-y-1 transition-all block">
                <div className="text-4xl mb-3">🗺️</div>
                <h3 className="font-semibold font-heading text-gray-900 mb-2">Alhambra Day Trip Guide</h3>
                <p className="text-gray-600 text-sm">Full-day Granada itinerary around your Alhambra slot.</p>
              </Link>
              <Link href="/blog/two-weeks-southern-spain-region-by-region/" className="bg-white rounded-2xl shadow-md p-6 text-center hover:shadow-xl hover:-translate-y-1 transition-all block">
                <div className="text-4xl mb-3">🌄</div>
                <h3 className="font-semibold font-heading text-gray-900 mb-2">Two Weeks in Southern Spain</h3>
                <p className="text-gray-600 text-sm">Region-by-region itinerary covering Andalusia including Granada.</p>
              </Link>
              <Link href="/blog/best-time-to-visit-spain-2026/" className="bg-white rounded-2xl shadow-md p-6 text-center hover:shadow-xl hover:-translate-y-1 transition-all block">
                <div className="text-4xl mb-3">📅</div>
                <h3 className="font-semibold font-heading text-gray-900 mb-2">Best Time to Visit Spain 2026</h3>
                <p className="text-gray-600 text-sm">Month-by-month breakdown of weather, crowds, and prices.</p>
              </Link>
              <Link href="/blog/is-spain-expensive-2026/" className="bg-white rounded-2xl shadow-md p-6 text-center hover:shadow-xl hover:-translate-y-1 transition-all block">
                <div className="text-4xl mb-3">💶</div>
                <h3 className="font-semibold font-heading text-gray-900 mb-2">Is Spain Expensive in 2026?</h3>
                <p className="text-gray-600 text-sm">Real 2026 budget data for hotels, food, transport, and tickets.</p>
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
