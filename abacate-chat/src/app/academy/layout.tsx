import type { Metadata } from "next";
import { PageLayout } from "@/app/components/layout/page-layout";
import { ReactNode } from "react";

interface AcademyLayoutProps {
  children: ReactNode;
}

export const metadata: Metadata = {
  title: "Academy - Aprenda AbacatePay",
  description:
    "Domine a integração e uso da AbacatePay através de vídeos tutoriais, documentação e exemplos práticos. Aprenda a implementar pagamentos PIX com nossos SDKs em JavaScript, Python, PHP, Java e Ruby.",
  keywords: [
    "AbacatePay Academy",
    "tutoriais AbacatePay",
    "vídeos AbacatePay",
    "documentação",
    "integração PIX",
    "SDK tutoriais",
    "JavaScript",
    "Python",
    "PHP",
    "Java",
    "Ruby",
    "exemplos práticos",
    "curso AbacatePay",
    "aprender pagamentos",
  ],
  openGraph: {
    title: "Academy - Aprenda AbacatePay",
    description:
      "Domine a integração e uso da AbacatePay através de vídeos tutoriais, documentação e exemplos práticos.",
    url: "https://chat.abacatepay.com/academy",
    siteName: "AbacateChat",
    locale: "pt_BR",
    type: "website",
    images: [
      {
        url: "/opengraph-image.jpeg",
        width: 1200,
        height: 630,
        alt: "AbacatePay Academy - Tutoriais e Documentação",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Academy - Aprenda AbacatePay",
    description:
      "Domine a integração e uso da AbacatePay através de vídeos tutoriais e documentação.",
    images: ["/opengraph-image.jpeg"],
    creator: "@abacatepay",
  },
  alternates: {
    canonical: "https://chat.abacatepay.com/academy",
  },
};

export default function AcademyLayout({ children }: AcademyLayoutProps) {
  return <PageLayout title="Academy">{children}</PageLayout>;
}
