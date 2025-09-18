import { useState } from 'react'
import Button from '../../components/common/Button.jsx'
import TextArea from '../../components/common/TextArea.jsx'
import ToolSection from '../../components/common/ToolSection.jsx'
import { copyToClipboard } from '../../utils/clipboard.js'
import { removeBlankLines, sortLines, uniqueLines } from '../../utils/text.js'

const TextCleaner = () => {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [removeBlank, setRemoveBlank] = useState(true)
  const [deduplicate, setDeduplicate] = useState(true)
  const [sortAsc, setSortAsc] = useState(false)

  const handleProcess = () => {
    let result = input
    if (removeBlank) result = removeBlankLines(result)
    if (deduplicate) result = uniqueLines(result)
    if (sortAsc) result = sortLines(result)
    setOutput(result)
  }

  return (
    <div className="space-y-6">
      <ToolSection
        title="文本去重 / 排序 / 去空行"
        description="针对多行文本进行常见整理操作。"
        actions={
          <div className="flex flex-wrap items-center gap-4">
            <label className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
              <input type="checkbox" checked={removeBlank} onChange={(event) => setRemoveBlank(event.target.checked)} />
              去空行
            </label>
            <label className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
              <input type="checkbox" checked={deduplicate} onChange={(event) => setDeduplicate(event.target.checked)} />
              去重
            </label>
            <label className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
              <input type="checkbox" checked={sortAsc} onChange={(event) => setSortAsc(event.target.checked)} />
              排序 (升序)
            </label>
            <Button onClick={handleProcess} disabled={!input.trim()}>
              处理
            </Button>
            <Button variant="secondary" onClick={() => { setInput(''); setOutput('') }}>
              清空
            </Button>
          </div>
        }
      >
        <TextArea
          placeholder="输入多行文本"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          className="min-h-[200px]"
        />
      </ToolSection>

      <ToolSection
        title="输出"
        actions={
          <Button variant="secondary" onClick={() => copyToClipboard(output)} disabled={!output}>
            复制
          </Button>
        }
      >
        <TextArea value={output} readOnly className="min-h-[200px]" />
      </ToolSection>
    </div>
  )
}

export default TextCleaner
