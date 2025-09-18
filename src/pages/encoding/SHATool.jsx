import { useState } from 'react'
import Button from '../../components/common/Button.jsx'
import Select from '../../components/common/Select.jsx'
import TextArea from '../../components/common/TextArea.jsx'
import ToolSection from '../../components/common/ToolSection.jsx'
import { copyToClipboard } from '../../utils/clipboard.js'
import { shaHash } from '../../utils/encoding.js'
import { useTranslation } from '../../i18n/index.jsx'

const algorithms = [
  { key: 'SHA1', label: 'SHA1' },
  { key: 'SHA256', label: 'SHA256' },
  { key: 'SHA512', label: 'SHA512' },
]

const SHATool = () => {
  const [algorithm, setAlgorithm] = useState('SHA256')
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [copied, setCopied] = useState(false)
  const { t } = useTranslation()

  const handleGenerate = () => {
    setCopied(false)
    setOutput(shaHash(input, algorithm))
  }

  const handleCopy = async () => {
    if (!output) return
    const success = await copyToClipboard(output)
    setCopied(success)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <div className="space-y-6">
      <ToolSection
        title="SHA 系列哈希"
        description="支持 SHA1 / SHA256 / SHA512 哈希计算。"
        actions={
          <div className="flex items-center gap-2">
            <Select value={algorithm} onChange={(event) => setAlgorithm(event.target.value)} className="w-40">
              {algorithms.map((item) => (
                <option key={item.key} value={item.key}>
                  {item.label}
                </option>
              ))}
            </Select>
            <Button variant="secondary" onClick={() => setInput('')}>
              清空
            </Button>
            <Button onClick={handleGenerate} disabled={!input.trim()}>
              计算哈希
            </Button>
          </div>
        }
      >
        <TextArea
          placeholder="输入需要计算哈希的文本"
          value={input}
          onChange={(event) => setInput(event.target.value)}
        />
      </ToolSection>

      <ToolSection
        title="结果"
        actions={
          <Button variant="secondary" onClick={handleCopy} disabled={!output}>
            {copied ? '已复制' : '复制结果'}
          </Button>
        }
      >
        <div className="rounded-md border border-slate-200 bg-white px-3 py-3 font-mono text-sm tracking-widest dark:border-slate-800 dark:bg-slate-900">
          {output || t('结果将在此处显示')}
        </div>
      </ToolSection>
    </div>
  )
}

export default SHATool
