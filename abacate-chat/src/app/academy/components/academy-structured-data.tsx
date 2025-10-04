export function AcademyStructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: "AbacatePay Academy",
    description:
      "Domine a integração e uso da AbacatePay através de vídeos tutoriais, documentação e exemplos práticos.",
    url: "https://chat.abacatepay.com/academy",
    logo: {
      "@type": "ImageObject",
      url: "https://chat.abacatepay.com/logo-abacademy.svg",
    },
    sameAs: [
      "https://www.youtube.com/@abacatepay",
      "https://github.com/abacatepay",
      "https://twitter.com/abacatepay",
    ],
    parentOrganization: {
      "@type": "Organization",
      name: "AbacatePay",
      url: "https://abacatepay.com",
    },
    knowsAbout: [
      "PIX payments",
      "Payment integration",
      "SDK development",
      "JavaScript",
      "Python",
      "PHP",
      "Java",
      "Ruby",
      "Payment gateway",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
