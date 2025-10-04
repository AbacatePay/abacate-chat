export interface InterfaceVideo {
  id: string;
  title: string;
  youtubeId: string;
  category: string[];
}

export const videos: InterfaceVideo[] = [
  {
    id: "1",
    title: "Como integrar com Bubble.io",
    youtubeId: "N0WnJexaXbE",
    category: ["all", "low-code"],
  },
  {
    id: "2",
    title: "Como integrar com Lovable",
    youtubeId: "uC1efuEXD_E",
    category: ["all", "vibe-code"],
  },
  {
    id: "3",
    title: "Como integrar com Woocommerce",
    youtubeId: "r0cfpxkSfIM",
    category: ["all", "no-code"],
  },
  {
    id: "4",
    title: "Como integrar com NextJS",
    youtubeId: "ZZOJNEzAPQg",
    category: ["all", "code"],
  },
  {
    id: "5",
    title: "Como integrar com um SaaS",
    youtubeId: "eOctEl8XfW0",
    category: ["all", "conceitos"],
  },
  {
    id: "6",
    title: "Entenda Gateway de pagamentos em 5 min - Abacatepay",
    youtubeId: "_LR4uLO-yL0",
    category: ["all", "conceitos"],
  },
];
