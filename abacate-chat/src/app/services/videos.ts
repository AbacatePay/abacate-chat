export interface InterfaceVideo {
  id: string;
  title: string;
  youtubeId: string;
  category: string[];
  verified?: boolean;
}

export const videos: InterfaceVideo[] = [
  {
    id: "2",
    title: "Como integrar com Lovable",
    youtubeId: "uC1efuEXD_E",
    category: ["all", "vibe-code"],
    verified: true,
  },
  {
    id: "6",
    title: "Entenda Gateway de pagamentos em 5 min - Abacatepay",
    youtubeId: "_LR4uLO-yL0",
    category: ["all", "conceitos"],
    verified: true,
  },
  {
    id: "7",
    title: "Como usar WEBHOOK em menos de 5min 🪝🥑",
    youtubeId: "3mrXW2BP1a0",
    category: ["all"],
    verified: true,
  },
  {
    id: "8",
    title: "Como integrar PIX com Javascript em de 5 min - Node js 🥑",
    youtubeId: "w0KvHkM9aBE",
    category: ["all"],
    verified: true,
  },
  {
    id: "5",
    title:
      "Do Zero ao Micro-SaaS: Criando Projeto com Next.JS 15, Supabase e ShadCn UI",
    youtubeId: "eOctEl8XfW0",
    category: ["all", "conceitos"],
  },
  {
    id: "9",
    title: "Como integrar PIX com Python em menos de 5 min 🥑",
    youtubeId: "LDXk-mOzzHM",
    category: ["all"],
    verified: true,
  },
  {
    id: "10",
    title: "Lovable Cloud: CRIE um MICRO SAAS em 20 MINUTOS ( MUITO FÁCIL!)",
    youtubeId: "ztmItLD0efk",
    category: ["all"],
    verified: true,
  },
  {
    id: "4",
    title: "Aceite PIX no seu site com Next.js + Abacate Pay - Rápido e Fácil!💸⚡",
    youtubeId: "ZZOJNEzAPQg",
    category: ["all", "code"],
  },
  {
    id: "1",
    title: "Como integrar com Bubble.io",
    youtubeId: "N0WnJexaXbE",
    category: ["all", "low-code"],
  },
  {
    id: "3",
    title: "Como integrar com Woocommerce",
    youtubeId: "r0cfpxkSfIM",
    category: ["all", "no-code"],
  },
];
