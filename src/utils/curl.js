const tokenize = (input) => {
  const tokens = []
  const regex = /"([^"\\]*(?:\\.[^"\\]*)*)"|'([^'\\]*(?:\\.[^'\\]*)*)'|(\S+)/g
  let match
  while ((match = regex.exec(input)) !== null) {
    if (match[1] !== undefined) {
      tokens.push(match[1].replace(/\\"/g, '"'))
    } else if (match[2] !== undefined) {
      tokens.push(match[2].replace(/\\'/g, "'"))
    } else if (match[3] !== undefined) {
      tokens.push(match[3])
    }
  }
  return tokens
}

const looksLikeJson = (value) => {
  if (typeof value !== 'string') return false
  const trimmed = value.trim()
  if (!trimmed.startsWith('{') && !trimmed.startsWith('[')) return false
  try {
    JSON.parse(trimmed)
    return true
  } catch (error) {
    return false
  }
}

export const parseCurlCommand = (command) => {
  if (!command || !command.trim()) throw new Error('请输入有效的 cURL 命令')
  const tokens = tokenize(command)
  if (!tokens.length || tokens[0] !== 'curl') throw new Error('命令必须以 curl 开头')

  const info = {
    method: 'GET',
    url: '',
    headers: {},
    data: undefined,
    json: undefined,
    timeout: undefined,
  }

  let i = 1
  while (i < tokens.length) {
    const token = tokens[i]
    switch (token) {
      case '-X':
      case '--request':
        info.method = tokens[i + 1] ? tokens[i + 1].toUpperCase() : info.method
        i += 2
        break
      case '-H':
      case '--header': {
        const headerValue = tokens[i + 1]
        if (headerValue && headerValue.includes(':')) {
          const [name, ...rest] = headerValue.split(':')
          info.headers[name.trim()] = rest.join(':').trim()
        }
        i += 2
        break
      }
      case '-d':
      case '--data':
      case '--data-raw':
      case '--data-binary':
      case '--data-ascii': {
        const value = tokens[i + 1] || ''
        if (looksLikeJson(value)) {
          info.json = JSON.parse(value)
          info.method = info.method === 'GET' ? 'POST' : info.method
        } else {
          info.data = value
          info.method = info.method === 'GET' ? 'POST' : info.method
        }
        i += 2
        break
      }
      case '--url':
        info.url = tokens[i + 1] || info.url
        i += 2
        break
      case '--compressed':
      case '-L':
      case '--insecure':
        i += 1
        break
      default:
        if (!token.startsWith('-') && !info.url) {
          info.url = token
        }
        i += 1
        break
    }
  }

  if (!info.url) throw new Error('无法解析 URL，请确认命令格式')
  if (!info.method) info.method = info.data || info.json ? 'POST' : 'GET'

  return info
}

export const buildPythonRequestsSnippet = ({ method, url, headers = {}, data, json }) => {
  if (!url) throw new Error('缺少 URL')
  const lines = ["import requests", '', `url = "${url}"`]

  if (json) {
    lines.push('payload = ' + JSON.stringify(json, null, 2))
  } else if (data !== undefined) {
    lines.push(typeof data === 'string' ? `payload = ${JSON.stringify(data)}` : `payload = ${JSON.stringify(data, null, 2)}`)
  }

  if (headers && Object.keys(headers).length) {
    lines.push('headers = ' + JSON.stringify(headers, null, 2))
  }

  const requestLineParts = ['response = requests.request(']
  requestLineParts.push(`"${(method || 'GET').toUpperCase()}"`)
  requestLineParts.push(', url')
  if (headers && Object.keys(headers).length) {
    requestLineParts.push(', headers=headers')
  }
  if (json) {
    requestLineParts.push(', json=payload')
  } else if (data !== undefined) {
    requestLineParts.push(', data=payload')
  }
  requestLineParts.push(')')
  lines.push(requestLineParts.join(''))
  lines.push('', 'print(response.text)')

  return lines.join('\n')
}

const extractObjectLiteral = (code, key) => {
  const regex = new RegExp(`${key}\\s*=\\s*({[\\s\\S]*?})`)
  const match = code.match(regex)
  if (!match) return undefined
  const literal = match[1]
  try {
    const sanitized = literal
      .replace(/(['\"])?([a-zA-Z0-9_]+)(['\"])?\s*:/g, '"$2":')
      .replace(/'/g, '"')
    return JSON.parse(sanitized)
  } catch (error) {
    return undefined
  }
}

const extractPayloadLiteral = (code, key) => {
  const regex = new RegExp(`${key}\\s*=\\s*([^\n]+)`) // until newline
  const match = code.match(regex)
  if (!match) return undefined
  const value = match[1].trim()
  if (value.startsWith('{') || value.startsWith('[')) {
    try {
      const sanitized = value
        .replace(/(['\"])?([a-zA-Z0-9_]+)(['\"])?\s*:/g, '"$2":')
        .replace(/'/g, '"')
      return JSON.parse(sanitized)
    } catch (error) {
      return value
    }
  }
  if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith('\'') && value.endsWith('\''))) {
    return value.slice(1, -1)
  }
  return value
}

export const parsePythonRequestsSnippet = (code) => {
  if (!code || !code.trim()) throw new Error('请输入 Python requests 代码')
  const info = {
    method: 'GET',
    url: '',
    headers: {},
    data: undefined,
    json: undefined,
  }

  const methodMatch = code.match(/requests\.(get|post|put|delete|patch|head|options)\s*\(/i)
  if (methodMatch) {
    info.method = methodMatch[1].toUpperCase()
    const args = code.slice(methodMatch.index).match(/\(([^)]*)\)/)
    if (args && args[1]) {
      const parts = args[1].split(',')
      if (parts.length) {
        const urlCandidate = parts[0].trim()
        if ((urlCandidate.startsWith('"') && urlCandidate.endsWith('"')) || (urlCandidate.startsWith('\'') && urlCandidate.endsWith('\''))) {
          info.url = urlCandidate.slice(1, -1)
        }
      }
    }
  } else {
    const requestMatch = code.match(/requests\.request\s*\(\s*['\"](\w+)['\"]\s*,\s*['\"]([^'\"]+)['\"]/i)
    if (requestMatch) {
      info.method = requestMatch[1].toUpperCase()
      info.url = requestMatch[2]
    }
  }

  const urlAssignMatch = code.match(/url\s*=\s*['\"]([^'\"]+)['\"]/i)
  if (urlAssignMatch) {
    info.url = urlAssignMatch[1]
  }

  const headers = extractObjectLiteral(code, 'headers')
  if (headers) info.headers = headers

  const jsonPayload = extractObjectLiteral(code, 'json') || extractPayloadLiteral(code, 'json')
  if (jsonPayload !== undefined) {
    info.json = jsonPayload
  }

  const dataPayload = extractPayloadLiteral(code, 'data')
  if (dataPayload !== undefined) {
    info.data = dataPayload
  }

  if (!info.url) throw new Error('无法解析 URL，请检查代码格式')
  return info
}

export const buildCurlCommand = ({ method, url, headers = {}, data, json }) => {
  if (!url) throw new Error('缺少 URL')
  const parts = ['curl']
  const upperMethod = (method || 'GET').toUpperCase()
  if (upperMethod && upperMethod !== 'GET') {
    parts.push('-X', upperMethod)
  }
  parts.push(url.includes(' ') ? `'${url}'` : url)

  Object.entries(headers).forEach(([key, value]) => {
    parts.push('-H')
    parts.push(`'${key}: ${value}'`)
  })

  if (json !== undefined) {
    const payload = typeof json === 'string' ? json : JSON.stringify(json)
    parts.push('--data')
    parts.push(`'${payload.replace(/'/g, "'\''")}'`)
  } else if (data !== undefined) {
    const payload = typeof data === 'string' ? data : JSON.stringify(data)
    parts.push('--data')
    parts.push(`'${payload.replace(/'/g, "'\''")}'`)
  }

  return parts.join(' ')
}
