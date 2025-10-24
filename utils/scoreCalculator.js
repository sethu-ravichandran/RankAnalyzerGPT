export const calculateSEOScore = (results) => {
  const valid = results.filter(r => r.position > 0)
  if (valid.length === 0) return 0
  const avgPos = valid.reduce((sum, r) => sum + r.position, 0) / valid.length
  return Math.max(0, 100 - avgPos * 5)
}
