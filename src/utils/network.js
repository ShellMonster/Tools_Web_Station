import { UAParser } from 'ua-parser-js'

export function extractUrlParams(url) {
  try {
    const target = new URL(url)
    return Array.from(target.searchParams.entries()).map(([key, value]) => ({ key, value }))
  } catch (error) {
    return []
  }
}

export function parseCookies(cookieString) {
  if (!cookieString.trim()) return []
  return cookieString
    .split(';')
    .map((pair) => pair.trim())
    .filter(Boolean)
    .map((pair) => {
      const [key, ...rest] = pair.split('=')
      return { key: key.trim(), value: rest.join('=').trim() }
    })
}

export function parseUserAgent(uaString) {
  const parser = new UAParser(uaString)
  return {
    browser: parser.getBrowser(),
    os: parser.getOS(),
    device: parser.getDevice(),
    engine: parser.getEngine(),
  }
}

export function ipv4ToNumber(ip) {
  return ip.split('.').reduce((acc, octet) => (acc << 8) + Number.parseInt(octet, 10), 0)
}

export function numberToIpv4(num) {
  return [24, 16, 8, 0].map((shift) => ((num >> shift) & 255).toString()).join('.')
}

export function normalizeHeaders(input) {
  return input
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [key, ...rest] = line.split(':')
      return { key: key.trim(), value: rest.join(':').trim() }
    })
}

export function simulatePortScan({ host, startPort, endPort }) {
  const results = []
  for (let port = startPort; port <= endPort; port += 1) {
    const status = port % 2 === 0 ? 'open' : 'filtered'
    const latency = Math.floor(Math.random() * 200) + 20
    results.push({ port, status, latency })
  }
  return {
    host,
    range: `${startPort}-${endPort}`,
    generatedAt: new Date().toISOString(),
    results,
  }
}
