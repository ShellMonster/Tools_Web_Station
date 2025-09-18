import { useState } from 'react'
import Button from '../../components/common/Button.jsx'
import TextArea from '../../components/common/TextArea.jsx'
import ToolSection from '../../components/common/ToolSection.jsx'
import { parseUserAgent } from '../../utils/network.js'

const UserAgentParser = () => {
  const [input, setInput] = useState(window.navigator.userAgent)
  const [result, setResult] = useState(parseUserAgent(window.navigator.userAgent))

  const handleParse = () => {
    setResult(parseUserAgent(input))
  }

  return (
    <ToolSection
      title="User-Agent 解析"
      description="解析浏览器 UA 字符串，识别设备、系统与浏览器信息。"
      actions={
        <div className="flex gap-2">
          <Button onClick={handleParse} disabled={!input.trim()}>
            解析
          </Button>
          <Button variant="secondary" onClick={() => setInput(window.navigator.userAgent)}>
            使用当前 UA
          </Button>
        </div>
      }
    >
      <TextArea
        value={input}
        onChange={(event) => setInput(event.target.value)}
        className="min-h-[120px]"
      />
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        {Object.entries(result).map(([key, value]) => (
          <div key={key} className="rounded-lg border border-slate-200 bg-white/80 p-4 text-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="text-xs uppercase tracking-wide text-slate-400">{key}</div>
            <pre className="mt-2 whitespace-pre-wrap font-mono text-slate-600 dark:text-slate-300">
              {JSON.stringify(value, null, 2)}
            </pre>
          </div>
        ))}
      </div>
    </ToolSection>
  )
}

export default UserAgentParser
