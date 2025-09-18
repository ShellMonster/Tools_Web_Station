import { useMemo, useState } from 'react'
import Button from '../../components/common/Button.jsx'
import Input from '../../components/common/Input.jsx'
import TextArea from '../../components/common/TextArea.jsx'
import ToolSection from '../../components/common/ToolSection.jsx'

const RegexTester = () => {
  const [pattern, setPattern] = useState('\\d+')
  const [flags, setFlags] = useState('g')
  const [text, setText] = useState('数字 123 与 456 会被匹配')
  const [error, setError] = useState('')

  const matches = useMemo(() => {
    if (!pattern) return []
    try {
      const regex = new RegExp(pattern, flags)
      setError('')
      const result = []
      if (regex.global) {
        let match
        while ((match = regex.exec(text)) !== null) {
          result.push({ match: match[0], index: match.index, groups: match.slice(1) })
        }
      } else {
        const match = regex.exec(text)
        if (match) {
          result.push({ match: match[0], index: match.index, groups: match.slice(1) })
        }
      }
      return result
    } catch (err) {
      setError(err.message)
      return []
    }
  }, [pattern, flags, text])

  return (
    <ToolSection
      title="正则表达式测试"
      description="在线测试正则表达式，查看匹配结果。"
      actions={
        <div className="flex items-center gap-2">
          <Button variant="secondary" onClick={() => { setPattern(''); setFlags(''); setText(''); setError('') }}>
            清空
          </Button>
        </div>
      }
    >
      <div className="grid gap-4 md:grid-cols-[2fr_1fr]">
        <div>
          <label className="text-sm text-slate-500 dark:text-slate-300">测试文本</label>
          <TextArea value={text} onChange={(event) => setText(event.target.value)} className="min-h-[220px] font-mono" />
        </div>
        <div className="space-y-4">
          <div>
            <label className="text-sm text-slate-500 dark:text-slate-300">正则表达式</label>
            <Input value={pattern} onChange={(event) => setPattern(event.target.value)} placeholder="例如 ^\\d+$" />
          </div>
          <div>
            <label className="text-sm text-slate-500 dark:text-slate-300">标志 (g i m u y s)</label>
            <Input value={flags} onChange={(event) => setFlags(event.target.value)} />
          </div>
          <div className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200">
            共匹配 {matches.length} 项
          </div>
        </div>
      </div>
      {error ? <p className="mt-3 text-sm text-red-500">{error}</p> : null}
      <div className="mt-4 space-y-3">
        {matches.map((item, index) => (
          <div
            key={`${item.match}-${index}`}
            className="rounded-lg border border-slate-200 bg-white/80 px-4 py-3 text-sm dark:border-slate-800 dark:bg-slate-900"
          >
            <div className="font-mono text-primary">{item.match}</div>
            <div className="text-xs text-slate-500 dark:text-slate-300">索引：{item.index}</div>
            {item.groups.length ? (
              <div className="mt-2 space-y-1">
                {item.groups.map((group, groupIndex) => (
                  <div key={groupIndex} className="text-xs text-slate-500 dark:text-slate-300">
                    捕获组 {groupIndex + 1}: <span className="font-mono">{group}</span>
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        ))}
      </div>
    </ToolSection>
  )
}

export default RegexTester
