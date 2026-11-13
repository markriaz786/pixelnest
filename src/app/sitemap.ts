import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { caseStudies } from "@/content/work";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/about", "/case-studies", "/contact", "/legal/privacy-policy", "/legal/terms-and-conditions"];
  return [
    ...pages.map((p) => ({ url: `${site.url}${p}` })),
    ...caseStudies.filter((c) => c.hasPage).map((c) => ({ url: `${site.url}/case-studies/${c.slug}` })),
  ];
}
