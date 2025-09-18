import { useState } from 'react'
import Button from '../../components/common/Button.jsx'
import ToolSection from '../../components/common/ToolSection.jsx'
import { copyToClipboard } from '../../utils/clipboard.js'
import { generateUuid } from '../../utils/random.js'

const UuidGenerator = () => {
  const [value, setValue] = useState(generateUuid())
  const [history, setHistory] = useState([value])

  const handleGenerate = () => {
    const id = generateUuid()
    setValue(id)
    setHistory((prev) => [id, ...prev].slice(0, 10))
  }

  return (
    <ToolSection
      title="UUID 生成"
      description="生成 v4 UUID，并保留最近的历史记录。"
      actions={
        <div className="flex gap-2">
          <Button onClick={handleGenerate}>生成新的 UUID</Button>
          <Button variant="secondary" onClick={() => copyToClipboard(value)}>
            复制
          </Button>
        </div>
      }
    >
      <div className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 font-mono text-lg text-slate-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200">
        {value}
      </div>
      <div className="mt-4 text-sm text-slate-500 dark:text-slate-300">历史记录</div>
      <ul className="mt-2 space-y-2 text-sm">
        {history.map((item) => (
          <li key={item} className="rounded border border-slate-200 bg-white/80 px-3 py-2 font-mono dark:border-slate-800 dark:bg-slate-900">
            {item}
          </li>
        ))}
      </ul>
    </ToolSection>
  )
}

export default UuidGenerator
