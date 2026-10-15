import type { MetadataRoute } from "next";
import { site } from "@/content";

// one-page site: the home page is the only url
export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: site.url, changeFrequency: "weekly", priority: 1 }];
}
