import { useMemo, useState } from 'react'
import Button from '../../components/common/Button.jsx'
import TextArea from '../../components/common/TextArea.jsx'
import ToolSection from '../../components/common/ToolSection.jsx'
import { copyToClipboard } from '../../utils/clipboard.js'
import { md5Hash } from '../../utils/encoding.js'
import { useTranslation } from '../../i18n/index.jsx'

const buildHashSet = (value) => {
  const normalized = value.trim()
  if (!normalized) return null
  const full = md5Hash(normalized)
  const short = full.slice(8, 24)
  return {
    '32-lower': { label: '32 位（小写）', value: full },
    '32-upper': { label: '32 位（大写）', value: full.toUpperCase() },
    '16-lower': { label: '16 位（小写）', value: short },
    '16-upper': { label: '16 位（大写）', value: short.toUpperCase() },
  }
}

const MD5Generator = () => {
  const [input, setInput] = useState('')
  const [copiedKey, setCopiedKey] = useState('')
  const { t } = useTranslation()

  const hashMap = useMemo(() => buildHashSet(input), [input])

  const handleClear = () => {
    setInput('')
    setCopiedKey('')
  }

  const handleCopy = async (key, value) => {
    if (!value) return
    const success = await copyToClipboard(value)
    if (success) {
      setCopiedKey(key)
      setTimeout(() => setCopiedKey(''), 1500)
    }
  }

  return (
    <div className="space-y-6">
      <ToolSection
        title="MD5 生成"
        description="输入文本后自动计算 MD5，展示 16 / 32 位大小写变体。"
        actions={
          <Button variant="secondary" onClick={handleClear}>
            清空
          </Button>
        }
      >
        <TextArea
          placeholder="输入需要计算 MD5 的文本"
          value={input}
          onChange={(event) => setInput(event.target.value)}
        />
      </ToolSection>

      <ToolSection title="结果">
        {hashMap ? (
          <div className="grid gap-4 md:grid-cols-2">
            {Object.entries(hashMap).map(([key, item]) => (
              <div
                key={key}
                className="rounded-xl border border-slate-200 bg-white/80 p-4 dark:border-slate-800 dark:bg-slate-900"
              >
                <div className="flex items-center justify-between text-sm text-slate-600 dark:text-slate-300">
                  <span>{t(item.label)}</span>
                  <Button
                    variant="secondary"
                    onClick={() => handleCopy(key, item.value)}
                    disabled={!item.value}
                    className="ml-2 shrink-0"
                  >
                    {copiedKey === key ? '已复制' : '复制'}
                  </Button>
                </div>
                <div className="mt-3 break-all font-mono text-sm tracking-widest text-slate-700 dark:text-slate-100">
                  {item.value}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-lg border border-dashed border-slate-300 bg-white/70 p-6 text-center text-sm text-slate-400 dark:border-slate-700 dark:bg-slate-900/40">
            {t('输入文本后自动生成结果')}
          </div>
        )}
      </ToolSection>
    </div>
  )
}

export default MD5Generator
