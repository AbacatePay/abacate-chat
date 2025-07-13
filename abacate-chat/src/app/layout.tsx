
import type { Metadata } from "next";
import { Fustat } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./components/theme/theme-provider";
import { Suspense } from "react";

const fustat = Fustat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Abacate Chat",
  description: "Assitente virtual da Abacate",
  openGraph: {
    title: "Abacate Chat",
    description: "Assitente virtual da Abacate",
    siteName: "Abacate Chat",
    locale: "pt_BR",
    type: "website",
    url: "https://chat.abacatepay.com",
  },
  twitter: {
    card: "summary_large_image",
    title: "Abacate Chat",
    description: "Assitente virtual da Abacate",
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
          <Suspense fallback={<div className="flex justify-center items-center h-full">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
        </div>}>
          {children}
          </Suspense>
        </ThemeProvider>
      </body>
    </html>
  );
}
