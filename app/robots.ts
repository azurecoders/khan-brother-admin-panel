import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  // Admin panel should NOT be indexed by search engines
  return {
    rules: [
      {
        userAgent: "*",
        disallow: "/", // Block all crawlers from entire admin site
      },
      {
        userAgent: "Googlebot",
        disallow: "/",
      },
      {
        userAgent: "Bingbot",
        disallow: "/",
      },
      {
        userAgent: "Yandex",
        disallow: "/",
      },
      {
        userAgent: "Baiduspider",
        disallow: "/",
      },
    ],
    // No sitemap for admin panel
  };
}
