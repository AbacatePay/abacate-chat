import type { Metadata } from "next";
import { Fustat } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./components/theme/theme-provider";
import { Suspense } from "react";

const fustat = Fustat({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://chat.abacatepay.com"),
  title: {
    default: "AbacateChat - Assistente Virtual AbacatePay",
    template: "%s | AbacatePay",
  },
  description:
    "Assistente virtual inteligente da AbacatePay. Tire dúvidas sobre nossa plataforma de pagamentos, APIs, SDKs e integração com sistema PIX.",
  keywords: [
    "AbacatePay",
    "chat",
    "assistente virtual",
    "pagamentos",
    "PIX",
    "API",
    "SDK",
    "integração",
    "pagamento online",
    "chatbot",
  ],
  authors: [{ name: "AbacatePay" }],
  creator: "AbacatePay",
  publisher: "AbacatePay",
  openGraph: {
    title: "AbacateChat - Assistente Virtual AbacatePay",
    description:
      "Assistente virtual inteligente da AbacatePay. Tire dúvidas sobre nossa plataforma de pagamentos, APIs, SDKs e integração com sistema PIX.",
    siteName: "AbacateChat",
    locale: "pt_BR",
    type: "website",
    url: "https://chat.abacatepay.com",
    images: [
      {
        url: "/opengraph-image.jpeg",
        width: 1200,
        height: 630,
        alt: "AbacateChat - Assistente Virtual AbacatePay",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AbacateChat - Assistente Virtual AbacatePay",
    description:
      "Assistente virtual inteligente da AbacatePay. Tire dúvidas sobre nossa plataforma de pagamentos.",
    images: ["/opengraph-image.jpeg"],
    creator: "@abacatepay",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${fustat.className} antialiased`}>
        <ThemeProvider>
          <Suspense
            fallback={
              <div className="flex justify-center items-center h-full">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
              </div>
            }
          >
            {children}
          </Suspense>
        </ThemeProvider>
      </body>
    </html>
  );
}
