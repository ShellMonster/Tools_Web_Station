import { useMemo, useState } from 'react'
import Button from '../../components/common/Button.jsx'
import Select from '../../components/common/Select.jsx'
import TextArea from '../../components/common/TextArea.jsx'
import ToolSection from '../../components/common/ToolSection.jsx'
import { copyToClipboard } from '../../utils/clipboard.js'
import { marked } from 'marked'
import TurndownService from 'turndown'
import { useTranslation } from '../../i18n/index.jsx'

const turndown = new TurndownService()

const MarkdownHtmlTool = () => {
  const [mode, setMode] = useState('md2html')
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const { t } = useTranslation()
  const hint = useMemo(() => (mode === 'md2html' ? t('输入 Markdown') : t('输入 HTML')), [mode, t])

  const handleConvert = () => {
    if (mode === 'md2html') {
      setOutput(marked.parse(input))
    } else {
      setOutput(turndown.turndown(input))
    }
  }

  return (
    <ToolSection
      title="Markdown ↔ HTML 转换"
      description="支持 Markdown 与 HTML 之间的双向转换。"
      actions={
        <div className="flex items-center gap-2">
          <Select value={mode} onChange={(event) => { setMode(event.target.value); setInput(''); setOutput('') }} className="w-48">
            <option value="md2html">Markdown → HTML</option>
            <option value="html2md">HTML → Markdown</option>
          </Select>
          <Button onClick={handleConvert} disabled={!input.trim()}>
            {t('转换')}
          </Button>
          <Button variant="secondary" onClick={() => { setInput(''); setOutput('') }}>
            清空
          </Button>
        </div>
      }
    >
      <TextArea
        placeholder={hint}
        value={input}
        onChange={(event) => setInput(event.target.value)}
        className="min-h-[200px] font-mono"
      />
      <div className="mt-4">
        <h3 className="text-sm font-medium text-slate-600 dark:text-slate-300">{t('输出')}</h3>
        <TextArea value={output} readOnly className="mt-2 min-h-[200px] font-mono" />
        <Button className="mt-3" variant="secondary" onClick={() => copyToClipboard(output)} disabled={!output}>
          复制结果
        </Button>
      </div>
    </ToolSection>
  )
}

export default MarkdownHtmlTool
