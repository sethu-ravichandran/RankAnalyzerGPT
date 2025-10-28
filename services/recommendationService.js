import { writeData } from "../utils/localStore.js"

export const generateRecommendations = (serp, audit, geo) => {
  const suggestions = []

  // --- SERP Analysis ---
  if (!serp || serp.seoScore === 0) {
    suggestions.push("No SERP data found. Verify your domain or add relevant keywords.")
  } else if (serp.seoScore < 50) {
    suggestions.push("Improve on-page SEO: add optimized meta titles, descriptions, and internal linking.")
  } else if (serp.seoScore < 80) {
    suggestions.push("Good progress! Continue optimizing keyword density and content freshness to reach top positions.")
  }

  // --- GEO Ranking ---
  if (!geo || geo.rank === -1) {
    suggestions.push("Your business isn't appearing in Google Maps results. Verify and optimize your Google My Business profile.")
  } else if (geo.rank > 5) {
    suggestions.push(`Your local rank is #${geo.rank}. Improve local signals: collect reviews, add schema markup, and maintain NAP consistency.`)
  }

  // --- Technical Performance ---
  if (audit?.performance !== null && audit.performance < 80) {
    suggestions.push("Boost page performance: compress images, use caching, and remove render-blocking scripts.")
  }

  // --- SEO Category ---
  if (audit?.seo !== null && audit.seo < 80) {
    suggestions.push("Your technical SEO score needs improvement: fix meta tags, structured data, and ensure mobile responsiveness.")
  }

  // --- Accessibility ---
  if (audit?.accessibility !== null && audit.accessibility < 80) {
    suggestions.push("Accessibility improvements needed: add alt text, improve color contrast, and use semantic HTML.")
  }

  // --- Best Practices ---
  if (audit?.bestPractices !== null && audit.bestPractices < 85) {
    suggestions.push("Adopt modern best practices: enforce HTTPS, remove deprecated JS, and minimize console warnings.")
  }

  // --- Summary Object ---
  const summary = {
    seoScore: serp?.seoScore || 0,
    performance: audit?.performance || null,
    seoAudit: audit?.seo || null,
    accessibility: audit?.accessibility || null,
    bestPractices: audit?.bestPractices || null,
    geoRank: geo?.rank || -1
  }

  const recommendationSummary = `Overall, your site has a performance score of ${summary.performance || "N/A"} and SEO score of ${summary.seoAudit || "N/A"}. Local rank: ${summary.geoRank === -1 ? "Not Found" : "#" + summary.geoRank}. Focus on improving technical SEO, speed, and local optimization.`

  writeData({
    serp: {},
    audit: {},
    geo: {}
  })

  return {
    summary,
    suggestions,
    recommendationSummary
  }
}
