import fetch from "node-fetch"
import { calculateSEOScore } from "../utils/scoreCalculator.js"

export const getSERPRank = async (website, keywords = [], location = "us") => {
  const apiKey = process.env.SERP_API_KEY
  const results = []

  const keywordList = Array.isArray(keywords)
    ? keywords
    : keywords.split(",").map(k => k.trim()).filter(Boolean)

  for (const keyword of keywordList) {
    const url = `https://serpapi.com/search.json?q=${encodeURIComponent(keyword)}&engine=google&gl=${location}&api_key=${apiKey}`
    const response = await fetch(url)
    const data = await response.json()

    const position =
      data.organic_results?.findIndex(r => r.link.includes(website)) + 1 || -1

    results.push({ keyword, position })
  }

  const seoScore = calculateSEOScore(results)
  return { results, seoScore }
}
