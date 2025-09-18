import { useState } from 'react'
import Button from '../../components/common/Button.jsx'
import TextArea from '../../components/common/TextArea.jsx'
import ToolSection from '../../components/common/ToolSection.jsx'
import { copyToClipboard } from '../../utils/clipboard.js'
import { formatSql } from '../../utils/format.js'
import { useTranslation } from '../../i18n/index.jsx'

const SqlFormatter = () => {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')
  const { t } = useTranslation()

  const handleFormat = () => {
    try {
      setOutput(formatSql(input))
      setError('')
    } catch (err) {
      setError(t('格式化失败: ${err.message}').replace('${err.message}', err.message))
    }
  }

  return (
    <div className="space-y-6">
      <ToolSection
        title="SQL 格式化"
        description="格式化 SQL 语句，自动缩进关键字。"
        actions={
          <div className="flex gap-2">
            <Button onClick={handleFormat} disabled={!input.trim()}>
              格式化
            </Button>
            <Button variant="secondary" onClick={() => { setInput(''); setOutput(''); setError('') }}>
              清空
            </Button>
          </div>
        }
      >
        <TextArea
          placeholder="粘贴 SQL 语句"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          className="min-h-[220px] font-mono"
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
        <TextArea value={output} readOnly className="min-h-[220px] font-mono" />
      </ToolSection>
    </div>
  )
}

export default SqlFormatter
