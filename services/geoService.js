import fetch from "node-fetch"

export const getGeoRanking = async (website, location = "new_york") => {
  const apiKey = process.env.SERP_API_KEY
  const url = `https://serpapi.com/search.json?engine=google_maps&q=${website}&location=${encodeURIComponent(location)}&api_key=${apiKey}`

  const response = await fetch(url)
  const data = await response.json()

  const rank = data.local_results?.findIndex(r => r.website?.includes(website)) + 1 || -1
  return { location, rank, mapsCount: data.local_results?.length || 0 }
}
