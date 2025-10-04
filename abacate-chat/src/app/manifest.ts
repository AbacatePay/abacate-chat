import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "AbacateChat - Assistente Virtual AbacatePay",
    short_name: "AbacateChat",
    description:
      "Assistente virtual inteligente da AbacatePay. Tire dúvidas sobre nossa plataforma de pagamentos, APIs, SDKs e integração com sistema PIX.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#10b981",
    orientation: "portrait-primary",
    scope: "/",
    lang: "pt-BR",
    dir: "ltr",
    icons: [
      {
        src: "/logo.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
      {
        src: "/favicon.ico",
        sizes: "48x48",
        type: "image/x-icon",
      },
    ],
    categories: ["productivity", "finance", "business"],
    shortcuts: [
      {
        name: "Nova Conversa",
        short_name: "Chat",
        description: "Iniciar uma nova conversa com o assistente",
        url: "/",
        icons: [{ src: "/logo.svg", sizes: "96x96" }],
      },
      {
        name: "AbacatePay Academy",
        short_name: "AbacatePay Academy",
        description: "Acessar o AbacatePay Academy",
        url: "/academy",
        icons: [{ src: "/logo.svg", sizes: "96x96" }],
      },
    ],
  };
}
