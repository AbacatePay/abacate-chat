import type { Metadata } from "next";
import { videos } from "@/app/services/videos";
import { ReactNode } from "react";

interface VideoLayoutProps {
  children: ReactNode;
  params: Promise<{
    slug: string;
  }>;
}

export function generateStaticParams() {
  return videos.map((video) => ({
    slug: video.id,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const video = videos.find((v) => v.id === slug);

  if (!video) {
    return {
      title: "Vídeo não encontrado",
      description: "O vídeo solicitado não foi encontrado na Academy.",
    };
  }

  const categories = video.category
    .filter((cat) => cat !== "all")
    .map((cat) => cat.charAt(0).toUpperCase() + cat.slice(1))
    .join(", ");

  return {
    title: video.title,
    description: `Aprenda ${categories} com AbacatePay. ${video.title}${
      video.verified ? " - Conteúdo oficial verificado." : ""
    }`,
    keywords: [
      "AbacatePay",
      "tutorial",
      "vídeo tutorial",
      ...video.category,
      "integração",
      "pagamentos PIX",
      "SDK",
    ],
    openGraph: {
      title: video.title,
      description: `Aprenda ${categories} com AbacatePay. Tutorial completo em vídeo.`,
      url: `https://chat.abacatepay.com/academy/${video.id}`,
      siteName: "AbacateChat",
      locale: "pt_BR",
      type: "video.other",
      videos: [
        {
          url: `https://www.youtube.com/watch?v=${video.youtubeId}`,
          width: 1280,
          height: 720,
        },
      ],
      images: [
        {
          url: `https://img.youtube.com/vi/${video.youtubeId}/maxresdefault.jpg`,
          width: 1280,
          height: 720,
          alt: video.title,
        },
      ],
    },
    twitter: {
      card: "player",
      title: video.title,
      description: `Aprenda ${categories} com AbacatePay.`,
      images: [
        `https://img.youtube.com/vi/${video.youtubeId}/maxresdefault.jpg`,
      ],
      creator: "@abacatepay",
      players: [
        {
          playerUrl: `https://www.youtube.com/embed/${video.youtubeId}`,
          streamUrl: `https://www.youtube.com/watch?v=${video.youtubeId}`,
          width: 1280,
          height: 720,
        },
      ],
    },
    alternates: {
      canonical: `https://chat.abacatepay.com/academy/${video.id}`,
    },
  };
}

export default async function VideoLayout({ children, params }: VideoLayoutProps) {
  return <>{children}</>;
}
