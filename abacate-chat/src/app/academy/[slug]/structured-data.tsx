interface Video {
  id: string;
  title: string;
  youtubeId: string;
  category: string[];
  verified?: boolean;
}

interface VideoStructuredDataProps {
  video: Video;
}

export function VideoStructuredData({ video }: VideoStructuredDataProps) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: video.title,
    description: `Aprenda ${video.category
      .filter((c) => c !== "all")
      .join(", ")} com AbacatePay`,
    thumbnailUrl: `https://img.youtube.com/vi/${video.youtubeId}/maxresdefault.jpg`,
    uploadDate: new Date().toISOString(),
    contentUrl: `https://www.youtube.com/watch?v=${video.youtubeId}`,
    embedUrl: `https://www.youtube.com/embed/${video.youtubeId}`,
    publisher: {
      "@type": "Organization",
      name: "AbacatePay",
      logo: {
        "@type": "ImageObject",
        url: "https://chat.abacatepay.com/logo.svg",
      },
    },
    author: {
      "@type": "Organization",
      name: "AbacatePay",
    },
    keywords: [
      "AbacatePay",
      "tutorial",
      "pagamentos PIX",
      ...video.category,
    ].join(", "),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
