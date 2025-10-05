import type { MetadataRoute } from "next";
import { videos } from "./services/videos";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://chat.abacatepay.com";
  const currentDate = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${baseUrl}/academy`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];

  const videoPages: MetadataRoute.Sitemap = videos.map((video) => ({
    url: `${baseUrl}/academy/${video.id}`,
    lastModified: currentDate,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticPages, ...videoPages];
}
