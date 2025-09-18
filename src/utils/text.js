import DiffMatchPatch from 'diff-match-patch'

export function toTitleCase(value) {
  return value.replace(/\w\S*/g, (word) => word.charAt(0).toUpperCase() + word.substr(1).toLowerCase())
}

export function toCamelCase(value) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+([a-z0-9])/g, (_, char) => char.toUpperCase())
    .replace(/^[A-Z]/, (char) => char.toLowerCase())
}

export function toSnakeCase(value) {
  return value
    .replace(/([a-z0-9])([A-Z])/g, '$1_$2')
    .replace(/[^a-zA-Z0-9]+/g, '_')
    .toLowerCase()
    .replace(/^_+|_+$/g, '')
}

export function toKebabCase(value) {
  return value
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/[^a-zA-Z0-9]+/g, '-')
    .toLowerCase()
    .replace(/^-+|-+$/g, '')
}

export function camelToPascal(value) {
  return value.charAt(0).toUpperCase() + value.slice(1)
}

export function removeBlankLines(value) {
  return value
    .split(/\r?\n/)
    .filter((line) => line.trim().length > 0)
    .join('\n')
}

export function uniqueLines(value) {
  const seen = new Set()
  return value
    .split(/\r?\n/)
    .filter((line) => {
      const normalized = line.trim()
      if (seen.has(normalized)) return false
      seen.add(normalized)
      return true
    })
    .join('\n')
}

export function sortLines(value) {
  return value
    .split(/\r?\n/)
    .sort((a, b) => a.localeCompare(b))
    .join('\n')
}

export function textStatistics(value) {
  const lines = value.split(/\r?\n/)
  const words = value.trim() ? value.trim().split(/\s+/) : []
  const characters = value.length
  const frequency = words.reduce((acc, word) => {
    const key = word.toLowerCase()
    acc[key] = (acc[key] || 0) + 1
    return acc
  }, {})
  return {
    lines: lines.length,
    words: words.length,
    characters,
    frequency: Object.entries(frequency)
      .map(([token, count]) => ({ token, count }))
      .sort((a, b) => b.count - a.count || a.token.localeCompare(b.token)),
  }
}

export function diffTexts(left, right) {
  const dmp = new DiffMatchPatch()
  const diffs = dmp.diff_main(left, right)
  dmp.diff_cleanupSemantic(diffs)
  return diffs
}
