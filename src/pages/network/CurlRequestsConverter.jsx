import { useCallback, useState } from 'react'
import Button from '../../components/common/Button.jsx'
import Select from '../../components/common/Select.jsx'
import TextArea from '../../components/common/TextArea.jsx'
import ToolSection from '../../components/common/ToolSection.jsx'
import { copyToClipboard } from '../../utils/clipboard.js'
import {
  parseCurlCommand,
  buildPythonRequestsSnippet,
  parsePythonRequestsSnippet,
  buildCurlCommand,
} from '../../utils/curl.js'
import { useTranslation } from '../../i18n/index.jsx'
import usePersistentState from '../../hooks/usePersistentState.js'

const sampleCurl =
  "curl https://api.example.com/users -H 'Authorization: Bearer token' --data '{\"name\":\"Alice\"}'"

const sampleRequests = `import requests

url = "https://api.example.com/users"
headers = {
  "Authorization": "Bearer token"
}
payload = {
  "name": "Alice"
}

response = requests.post(url, headers=headers, json=payload)
print(response.text)`

const CurlRequestsConverter = () => {
  const [state, setState, resetState] = usePersistentState('tool:curl-requests', () => ({
    curlInput: sampleCurl,
    requestsInput: sampleRequests,
    defaultMethod: 'GET',
  }))
  const { curlInput, requestsInput, defaultMethod } = state
  const [error, setError] = useState('')
  const { t, locale } = useTranslation()

  const hasCurl = curlInput.trim().length > 0
  const hasRequests = requestsInput.trim().length > 0

  const handleCurlToRequests = () => {
    try {
      const info = parseCurlCommand(curlInput)
      const snippet = buildPythonRequestsSnippet(info)
      setState((prev) => ({ ...prev, requestsInput: snippet }))
      setError('')
    } catch (err) {
      setError(t(err.message))
    }
  }

  const handleRequestsToCurl = () => {
    try {
      const info = parsePythonRequestsSnippet(requestsInput)
      if (!info.method && defaultMethod) {
        info.method = defaultMethod
      }
      const curl = buildCurlCommand(info)
      setState((prev) => ({ ...prev, curlInput: curl }))
      setError('')
    } catch (err) {
      setError(t(err.message))
    }
  }

  const handleReset = () => {
    resetState()
    setError('')
  }

  const handleMethodChange = useCallback((nextMethod) => {
    setState((prev) => ({ ...prev, defaultMethod: nextMethod }))
  }, [setState])

  return (
    <div className="space-y-6">
      <ToolSection
        title="cURL ↔ Python requests 转换"
        description="在 cURL 命令与 Python requests 示例代码之间快速互转，方便调试 HTTP 接口。"
        actions={
          <div className="flex flex-wrap items-center gap-2">
            <Button onClick={handleCurlToRequests} disabled={!hasCurl}>
              cURL → requests
            </Button>
            <Button variant="secondary" onClick={handleRequestsToCurl} disabled={!hasRequests}>
              requests → cURL
            </Button>
            <Select value={defaultMethod} onChange={(event) => handleMethodChange(event.target.value)} className="w-36">
              <option value="GET">默认 GET</option>
              <option value="POST">默认 POST</option>
              <option value="PUT">默认 PUT</option>
              <option value="DELETE">默认 DELETE</option>
            </Select>
            <Button variant="ghost" onClick={handleReset}>
              清空
            </Button>
          </div>
        }
      >
        <div className="grid gap-6 lg:grid-cols-2">
          <div>
            <h3 className="text-sm font-medium text-slate-600 dark:text-slate-300">cURL</h3>
            <TextArea
              className="mt-2 h-64 font-mono"
              placeholder={`curl https://api.example.com/users -X POST -H 'Content-Type: application/json' --data '{"name":"Alice"}'`}
              value={curlInput}
              onChange={(event) => setState((prev) => ({ ...prev, curlInput: event.target.value }))}
            />
            <div className="mt-2 flex gap-2">
              <Button variant="secondary" onClick={() => copyToClipboard(curlInput)} disabled={!hasCurl}>
                复制
              </Button>
              <Button variant="ghost" onClick={() => setCurlInput(sampleCurl)}>
                载入示例
              </Button>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-medium text-slate-600 dark:text-slate-300">Python requests</h3>
            <TextArea
              className="mt-2 h-64 font-mono"
              placeholder={"requests.post('https://api.example.com/users', headers={'Content-Type': 'application/json'}, json={'name': 'Alice'})"}
              value={requestsInput}
              onChange={(event) => setState((prev) => ({ ...prev, requestsInput: event.target.value }))}
            />
            <div className="mt-2 flex gap-2">
              <Button variant="secondary" onClick={() => copyToClipboard(requestsInput)} disabled={!hasRequests}>
                复制
              </Button>
              <Button variant="ghost" onClick={() => setRequestsInput(sampleRequests)}>
                载入示例
              </Button>
            </div>
          </div>
        </div>
        {error ? <p className="mt-4 text-sm text-red-500">{error}</p> : null}
        <CurlFeatureList locale={locale} />
      </ToolSection>
    </div>
  )
}

const CurlFeatureList = ({ locale }) => {
  const isEnglish = locale === 'en'

  const items = isEnglish
    ? [
        (
          <>
            Detects common cURL flags such as <code>-X</code>/<code>--request</code>, <code>-H</code>, <code>--data</code>, and
            <code>--data-raw</code>.
          </>
        ),
        (
          <>
            Maps JSON payloads to the <code>json=</code> argument automatically; other payloads use <code>data=</code>.
          </>
        ),
        (
          <>
            Parses <code>headers</code>, <code>json</code>, and <code>data</code> variables in requests code to rebuild the
            cURL command.
          </>
        ),
        <>If parsing fails, tweak the input manually and convert again.</>,
      ]
    : [
        (
          <>
            识别常见 cURL 参数：<code>-X</code>/<code>--request</code>、<code>-H</code>、<code>--data</code>、<code>--data-raw</code>{' '}
            等。
          </>
        ),
        (
          <>
            自动映射 JSON 负载为 <code>json=</code> 参数，其他内容使用 <code>data=</code>。
          </>
        ),
        (
          <>
            解析 requests 中的 <code>headers</code>、<code>json</code>、<code>data</code> 变量，尽量还原为 cURL。
          </>
        ),
        <>若自动解析失败，可手动调整输入后再次转换。</>,
      ]

  return (
    <div className="mt-6 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-xs leading-relaxed text-slate-500 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300">
      <p className="font-semibold text-slate-600 dark:text-slate-200">
        {isEnglish ? 'Supported features:' : '支持特性：'}
      </p>
      <ul className="mt-2 list-disc space-y-2 pl-5">
        {items.map((content, index) => (
          <li key={index}>{content}</li>
        ))}
      </ul>
    </div>
  )
}

export default CurlRequestsConverter
