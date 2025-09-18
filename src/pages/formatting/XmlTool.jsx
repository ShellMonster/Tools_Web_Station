import { useState } from 'react'
import Button from '../../components/common/Button.jsx'
import TextArea from '../../components/common/TextArea.jsx'
import ToolSection from '../../components/common/ToolSection.jsx'
import { copyToClipboard } from '../../utils/clipboard.js'
import { formatXml, minifyXml } from '../../utils/format.js'
import { useTranslation } from '../../i18n/index.jsx'

const XmlTool = () => {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')
  const { t } = useTranslation()

  const handleFormat = () => {
    try {
      setOutput(formatXml(input))
      setError('')
    } catch (err) {
      setError(t('格式化失败: ${err.message}').replace('${err.message}', err.message))
    }
  }

  const handleMinify = () => {
    try {
      setOutput(minifyXml(input))
      setError('')
    } catch (err) {
      setError(t('压缩失败: ${err.message}').replace('${err.message}', err.message))
    }
  }

  return (
    <div className="space-y-6">
      <ToolSection
        title="XML 格式化/压缩"
        description="格式化 XML 文档或压缩成单行，便于调试与传输。"
        actions={
          <div className="flex items-center gap-2">
            <Button onClick={handleFormat} disabled={!input.trim()}>
              格式化
            </Button>
            <Button onClick={handleMinify} disabled={!input.trim()}>
              压缩
            </Button>
            <Button
              variant="secondary"
              onClick={() => {
                setInput('')
                setOutput('')
                setError('')
              }}
            >
              清空
            </Button>
          </div>
        }
      >
        <TextArea
          placeholder="粘贴 XML 文本"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          className="min-h-[240px] font-mono"
        />
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

export default XmlTool
