import { academy, siteUrl } from "@/content/academy";

export function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["MusicSchool", "EducationalOrganization", "LocalBusiness"],
        name: academy.brandFull,
        image: `${siteUrl}/opengraph-image`,
        telephone: academy.phone.international,
        address: {
          "@type": "PostalAddress",
          streetAddress: academy.location.street,
          postalCode: academy.location.zip,
          addressLocality: academy.location.city,
          addressCountry: academy.location.countryCode,
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: academy.location.lat,
          longitude: academy.location.lng,
        },
        url: siteUrl,
        areaServed: academy.location.city,
        employee: {
          "@type": "Person",
          name: academy.teacher.name,
          jobTitle: "Piano teacher",
          alumniOf: academy.teacher.institution,
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
