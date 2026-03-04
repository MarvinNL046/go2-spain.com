import Link from 'next/link';

interface AuthorBioProps {
  name: string;
  locale?: string;
}

const authorData: Record<string, { bio: Record<string, string>; credentials: Record<string, string> }> = {
  'Go2Spain Team': {
    bio: {
      en: 'We are a team of travel writers and Spain enthusiasts who explore the country year-round. Our guides are based on first-hand experience, local knowledge, and verified official sources.',
      es: 'Somos un equipo de escritores de viajes y entusiastas de Espana que exploran el pais durante todo el ano. Nuestras guias se basan en experiencia directa, conocimiento local y fuentes oficiales verificadas.',
      nl: 'Wij zijn een team van reisschrijvers en Spanje-liefhebbers die het land het hele jaar door verkennen. Onze gidsen zijn gebaseerd op eigen ervaring, lokale kennis en geverifieerde officiele bronnen.',
    },
    credentials: {
      en: 'Based in Spain since 2020 | All 13 regions visited | Updated monthly',
      es: 'Con base en Espana desde 2020 | Todas las 17 comunidades visitadas | Actualizado mensualmente',
      nl: 'Gevestigd in Spanje sinds 2020 | Alle 17 regio\'s bezocht | Maandelijks bijgewerkt',
    },
  },
};

export default function AuthorBio({ name, locale = 'en' }: AuthorBioProps) {
  const lang = locale === 'es' ? 'es' : locale === 'nl' ? 'nl' : 'en';
  const author = authorData[name] || authorData['Go2Spain Team'];

  return (
    <div className="mt-12 pt-8 border-t" itemScope itemType="https://schema.org/Person">
      <div className="flex items-start gap-4">
        <div className="w-16 h-16 bg-gradient-to-br from-spain-red to-spain-gold rounded-full flex items-center justify-center flex-shrink-0">
          <span className="text-2xl font-bold text-white" itemProp="name">
            {name.charAt(0)}
          </span>
        </div>
        <div>
          <h3 className="font-bold text-lg" itemProp="name">{name}</h3>
          <p className="text-sm text-spain-red font-medium mt-0.5">
            {author.credentials[lang]}
          </p>
          <p className="text-gray-600 mt-2 text-sm" itemProp="description">
            {author.bio[lang]}
          </p>
          <Link
            href="/"
            className="text-spain-red text-sm hover:underline mt-2 inline-block"
          >
            {lang === 'es' ? 'Mas sobre nosotros' : lang === 'nl' ? 'Meer over ons' : 'More about us'} &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}
