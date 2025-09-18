import { useState } from 'react'
import Button from '../../components/common/Button.jsx'
import Select from '../../components/common/Select.jsx'
import TextArea from '../../components/common/TextArea.jsx'
import ToolSection from '../../components/common/ToolSection.jsx'
import { copyToClipboard } from '../../utils/clipboard.js'
import {
  formatHtml,
  formatJavascript,
  formatCss,
  minifyCss,
  minifyHtml,
  minifyJavascript,
} from '../../utils/format.js'
import { useTranslation } from '../../i18n/index.jsx'

const CodeBeautify = () => {
  const [language, setLanguage] = useState('html')
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { t } = useTranslation()

  const handleFormat = async () => {
    setLoading(true)
    try {
      switch (language) {
        case 'html':
          setOutput(await formatHtml(input))
          break
        case 'css':
          setOutput(await formatCss(input))
          break
        default:
          setOutput(await formatJavascript(input))
      }
      setError('')
    } catch (err) {
      setError(t('格式化失败: ${err.message}').replace('${err.message}', err.message))
    } finally {
      setLoading(false)
    }
  }

  const handleMinify = async () => {
    setLoading(true)
    try {
      switch (language) {
        case 'html':
          setOutput(await minifyHtml(input))
          break
        case 'css':
          setOutput(await minifyCss(input))
          break
        default:
          setOutput(await minifyJavascript(input))
      }
      setError('')
    } catch (err) {
      setError(t('压缩失败: ${err.message}').replace('${err.message}', err.message))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <ToolSection
        title="HTML/JS/CSS 美化/压缩"
        description="对代码进行格式化或压缩，快速整理页面资源。"
        actions={
          <div className="flex flex-wrap items-center gap-2">
            <Select value={language} onChange={(event) => setLanguage(event.target.value)} className="w-40">
              <option value="html">HTML</option>
              <option value="css">CSS</option>
              <option value="js">JavaScript</option>
            </Select>
            <Button onClick={handleFormat} disabled={!input.trim() || loading}>
              格式化
            </Button>
            <Button onClick={handleMinify} disabled={!input.trim() || loading}>
              压缩
            </Button>
            <Button variant="secondary" onClick={() => { setInput(''); setOutput(''); setError('') }}>
              清空
            </Button>
          </div>
        }
      >
        <TextArea
          placeholder="粘贴代码"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          className="min-h-[240px] font-mono"
        />
        {loading ? <p className="mt-3 text-sm text-slate-500">{t('处理中…')}</p> : null}
        {error ? <p className="mt-3 text-sm text-red-500">{error}</p> : null}
      </ToolSection>

      <ToolSection
        title="输出"
        actions={
          <Button variant="secondary" onClick={() => copyToClipboard(output)} disabled={!output}>
            复制结果
          </Button>
        }
      >
        <TextArea value={output} readOnly className="min-h-[240px] font-mono" />
      </ToolSection>
    </div>
  )
}

export default CodeBeautify
