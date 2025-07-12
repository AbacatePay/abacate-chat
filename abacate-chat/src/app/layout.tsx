
import type { Metadata } from "next";
import { Fustat } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./components/theme/theme-provider";

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
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
