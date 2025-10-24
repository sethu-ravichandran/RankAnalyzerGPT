export const generateRecommendations = (serp, audit, geo) => {
  const suggestions = []

  if (serp.seoScore < 50) {
    suggestions.push("Improve on-page SEO: add meta titles, keyword density, and internal linking.")
  }

  if (audit.performance < 70) {
    suggestions.push("Optimize images, enable caching, and use a CDN to boost site speed.")
  }

  if (geo.rank === -1) {
    suggestions.push("Add or verify your Google My Business listing for better local ranking.")
  }

  if (audit.seo < 70) {
    suggestions.push("Ensure proper headings, structured data, and mobile-friendly design.")
  }

  return { suggestions, summary: "Apply these changes to improve overall SEO & GEO visibility." }
}
