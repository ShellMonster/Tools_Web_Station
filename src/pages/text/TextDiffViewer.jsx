import { useState } from 'react'
import Button from '../../components/common/Button.jsx'
import TextArea from '../../components/common/TextArea.jsx'
import ToolSection from '../../components/common/ToolSection.jsx'
import { diffTexts } from '../../utils/text.js'

const TextDiffViewer = () => {
  const [left, setLeft] = useState('')
  const [right, setRight] = useState('')
  const [diff, setDiff] = useState([])

  const handleCompare = () => {
    const result = diffTexts(left, right)
    setDiff(result)
  }

  return (
    <div className="space-y-6">
      <ToolSection
        title="文本差异对比"
        description="基于 diff-match-patch 计算差异，突出显示新增与删除。"
        actions={
          <div className="flex gap-2">
            <Button onClick={handleCompare} disabled={!left && !right}>
              开始对比
            </Button>
            <Button variant="secondary" onClick={() => { setLeft(''); setRight(''); setDiff([]) }}>
              清空
            </Button>
          </div>
        }
      >
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <h3 className="mb-2 text-sm font-medium text-slate-600 dark:text-slate-300">文本 A</h3>
            <TextArea value={left} onChange={(event) => setLeft(event.target.value)} className="min-h-[220px] font-mono" />
          </div>
          <div>
            <h3 className="mb-2 text-sm font-medium text-slate-600 dark:text-slate-300">文本 B</h3>
            <TextArea value={right} onChange={(event) => setRight(event.target.value)} className="min-h-[220px] font-mono" />
          </div>
        </div>
      </ToolSection>

      <ToolSection title="差异结果">
        <div className="rounded-lg border border-slate-200 bg-white/80 p-4 font-mono text-sm leading-6 dark:border-slate-800 dark:bg-slate-900">
          {diff.length ? (
            diff.map(([op, text], index) => {
              const baseClass = 'whitespace-pre-wrap break-words'
              if (op === 0) {
                return (
                  <span key={index} className={`${baseClass} text-slate-600 dark:text-slate-300`}>
                    {text}
                  </span>
                )
              }
              if (op === -1) {
                return (
                  <span key={index} className={`${baseClass} bg-red-100/80 text-red-700 dark:bg-red-500/20 dark:text-red-300`}>
                    {text}
                  </span>
                )
              }
              return (
                <span key={index} className={`${baseClass} bg-emerald-100/80 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300`}>
                  {text}
                </span>
              )
            })
          ) : (
            <p className="text-slate-400">暂无差异结果</p>
          )}
        </div>
      </ToolSection>
    </div>
  )
}

export default TextDiffViewer
