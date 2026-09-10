export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://pianoforte-aelgvv3q6-mischa1.vercel.app";

export const locales = ["de", "ru", "en", "fr", "it"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "de";

export const localeLabels: Record<Locale, string> = {
  de: "DE",
  ru: "RU",
  en: "EN",
  fr: "FR",
  it: "IT",
};

export const localeNames: Record<Locale, string> = {
  de: "Deutsch",
  ru: "Русский",
  en: "English",
  fr: "Français",
  it: "Italiano",
};

export const academy = {
  brand: "Pianoforte",
  brandFull: "Pianoforte Akademie",
  category: "Private Musikschule / Klavierakademie",
  teacher: {
    name: "Elena Vinogradova",
    firstName: "Elena",
    lastName: "Vinogradova",
    roles: ["Konzertpianistin", "Pädagogin", "Pianoforte Akademie"],
    teachingSince: 2014,
    zhdkYears: "2006–2011",
    qualification: "Master of Advanced Studies ZFH in Musikpraxis",
    institution: "Zürcher Hochschule der Künste",
    languages: ["Deutsch", "Russisch"] as const,
    audienceFromAge: 4,
  },
  location: {
    street: "Zwimattstrasse 10",
    zip: "6403",
    city: "Küssnacht am Rigi",
    country: "Switzerland",
    countryCode: "CH",
    mapsQuery: "Zwimattstrasse 10, 6403 Küssnacht am Rigi",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Zwimattstrasse+10%2C+6403+K%C3%BCssnacht+am+Rigi",
    lat: 47.0856,
    lng: 8.4386,
  },
  phone: {
    display: "077 474 26 40",
    international: "+41 77 474 26 40",
    tel: "+41774742640",
  },
  whatsapp: {
    number: "41774742640",
    messages: {
      de: "Guten Tag Frau Vinogradova, ich interessiere mich für Klavierunterricht bei der Pianoforte Akademie und würde gerne weitere Informationen erhalten.",
      ru: "Здравствуйте, госпожа Виноградова. Меня интересуют уроки фортепиано в академии Pianoforte, и я хотел(а) бы получить дополнительную информацию.",
      en: "Good day Ms Vinogradova, I am interested in piano lessons at Pianoforte Akademie and would like to receive further information.",
      fr: "Bonjour Madame Vinogradova, je m’intéresse aux cours de piano de la Pianoforte Akademie et souhaiterais recevoir davantage d’informations.",
      it: "Buongiorno signora Vinogradova, sono interessato/a alle lezioni di pianoforte presso la Pianoforte Akademie e vorrei ricevere ulteriori informazioni.",
    } satisfies Record<Locale, string>,
  },
  concerts: {
    frequencyPerYear: 2,
  },
  reviews: {
    rating: 5.0,
    count: 4,
    source: "Google",
  },
  formats: ["studio", "online", "home"] as const,
  levels: ["beginner", "experienced", "advanced", "professional"] as const,
  // Prices confirmed by the client on 2026-09-10.
  pricing: {
    children30: {
      amount: 46,
      currency: "CHF" as const,
      duration: 30,
      sourceStatus: "client-confirmed" as const,
    },
    adults45: {
      amount: 77,
      currency: "CHF" as const,
      duration: 45,
      sourceStatus: "client-confirmed" as const,
    },
    package60: {
      amount: 570,
      currency: "CHF" as const,
      lessons: 5,
      duration: 60,
      sourceStatus: "client-confirmed" as const,
    },
  },
  assets: {
    portrait: "/images/elena-portrait.svg",
    teaching: "/images/elena-teaching.svg",
    studio: "/images/piano-studio.svg",
    lesson: "/images/student-lesson.svg",
    concert: "/images/concert.svg",
    hands: "/images/hands-keyboard.svg",
    environment: "/images/academy-environment.svg",
    pianoFallback: "/images/piano-cinematic.svg",
  },
} as const;

export function whatsappHref(locale: Locale, extra?: string) {
  const text = extra
    ? `${academy.whatsapp.messages[locale]}\n\n${extra}`
    : academy.whatsapp.messages[locale];
  return `https://wa.me/${academy.whatsapp.number}?text=${encodeURIComponent(text)}`;
}

export function telHref() {
  return `tel:${academy.phone.tel}`;
}

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}
