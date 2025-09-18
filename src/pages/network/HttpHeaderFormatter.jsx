import { useState } from 'react'
import Button from '../../components/common/Button.jsx'
import TextArea from '../../components/common/TextArea.jsx'
import ToolSection from '../../components/common/ToolSection.jsx'
import { copyToClipboard } from '../../utils/clipboard.js'
import { normalizeHeaders } from '../../utils/network.js'

const HttpHeaderFormatter = () => {
  const [input, setInput] = useState('')
  const [items, setItems] = useState([])

  const handleFormat = () => {
    const parsed = normalizeHeaders(input)
    setItems(parsed)
  }

  const handleCopyJson = async () => {
    if (!items.length) return
    const json = JSON.stringify(Object.fromEntries(items.map(({ key, value }) => [key, value])), null, 2)
    await copyToClipboard(json)
  }

  return (
    <ToolSection
      title="HTTP Header 格式化"
      description="将请求头文本转换为结构化格式，便于调试。"
      actions={
        <div className="flex gap-2">
          <Button onClick={handleFormat} disabled={!input.trim()}>
            格式化
          </Button>
          <Button variant="secondary" onClick={() => { setInput(''); setItems([]) }}>
            清空
          </Button>
        </div>
      }
    >
      <TextArea
        placeholder={"例如:\nContent-Type: application/json\nAuthorization: Bearer xxx"}
        value={input}
        onChange={(event) => setInput(event.target.value)}
        className="min-h-[160px] font-mono"
      />
      {items.length ? (
        <div className="mt-4 space-y-3">
          <div className="flex justify-end">
            <Button variant="secondary" onClick={handleCopyJson}>
              复制为 JSON
            </Button>
          </div>
          {items.map((item, index) => (
            <div
              key={`${item.key}-${index}`}
              className="flex items-start justify-between rounded-lg border border-slate-200 bg-white/80 px-4 py-3 text-sm dark:border-slate-800 dark:bg-slate-900"
            >
              <span className="font-mono text-slate-600 dark:text-slate-200">{item.key}</span>
              <span className="ml-4 flex-1 break-all text-slate-500 dark:text-slate-300">{item.value}</span>
            </div>
          ))}
        </div>
      ) : null}
    </ToolSection>
  )
}

export default HttpHeaderFormatter
