import CryptoJS from 'crypto-js'

export function md5Hash(value) {
  return CryptoJS.MD5(value).toString(CryptoJS.enc.Hex)
}

export function shaHash(value, algorithm = 'SHA256') {
  const normalized = algorithm.toUpperCase()
  switch (normalized) {
    case 'SHA1':
      return CryptoJS.SHA1(value).toString(CryptoJS.enc.Hex)
    case 'SHA256':
      return CryptoJS.SHA256(value).toString(CryptoJS.enc.Hex)
    case 'SHA512':
      return CryptoJS.SHA512(value).toString(CryptoJS.enc.Hex)
    default:
      throw new Error(`Unsupported algorithm: ${algorithm}`)
  }
}

export function base64Encode(value) {
  return CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(value))
}

export function base64Decode(value) {
  const words = CryptoJS.enc.Base64.parse(value)
  return CryptoJS.enc.Utf8.stringify(words)
}

export function urlEncode(value) {
  return encodeURIComponent(value)
}

export function urlDecode(value) {
  return decodeURIComponent(value)
}

export function decodeJwt(token) {
  const parts = token.split('.')
  if (parts.length < 2) {
    throw new Error('Invalid JWT token')
  }
  const decodeSegment = (segment) => {
    const normalized = segment.replace(/-/g, '+').replace(/_/g, '/')
    const padded = normalized.padEnd(normalized.length + ((4 - (normalized.length % 4)) % 4), '=')
    const decoded = atob(padded)
    try {
      return JSON.parse(decoded)
    } catch (error) {
      return decoded
    }
  }
  const [header, payload, signature] = parts
  return {
    header: decodeSegment(header),
    payload: decodeSegment(payload),
    signature,
  }
}
