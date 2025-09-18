import { useMemo } from 'react'
import Button from '../../components/common/Button.jsx'
import TextArea from '../../components/common/TextArea.jsx'
import ToolSection from '../../components/common/ToolSection.jsx'
import { copyToClipboard } from '../../utils/clipboard.js'
import { formatJson, minifyJson, validateJson } from '../../utils/format.js'
import { useTranslation } from '../../i18n/index.jsx'
import usePersistentState from '../../hooks/usePersistentState.js'

const createDefaultState = () => ({
  input: '',
  output: '',
  status: '',
})

const SAMPLE_JSON = `{
  "service": "web-tools-station",
  "version": "1.0.0",
  "features": ["format", "minify", "validate"],
  "metadata": {
    "updatedAt": "2025-01-08T09:30:00Z",
    "owner": "dev-team"
  }
}`

const JsonTool = () => {
  const [state, setState, resetState] = usePersistentState('tool:json', createDefaultState)
  const { input, output, status } = state
  const { t } = useTranslation()

  const handleAction = (action) => {
    try {
      if (action === 'format') {
        setState((prev) => ({ ...prev, output: formatJson(input), status: t('格式化成功') }))
      }
      if (action === 'minify') {
        setState((prev) => ({ ...prev, output: minifyJson(input), status: t('压缩成功') }))
      }
      if (action === 'validate') {
        const result = validateJson(input)
        if (result.valid) {
          setState((prev) => ({ ...prev, status: t('JSON 校验通过') }))
        } else {
          setState((prev) => ({
            ...prev,
            status: t('无效的 JSON: ${result.message}').replace('${result.message}', result.message),
          }))
        }
      }
    } catch (error) {
      setState((prev) => ({
        ...prev,
        status: t('操作失败: ${error.message}').replace('${error.message}', error.message),
      }))
    }
  }

  const handleClear = () => {
    resetState()
  }

  const handleLoadSample = () => {
    setState((prev) => ({ ...prev, input: SAMPLE_JSON, output: '', status: '' }))
  }

  const statusMessage = useMemo(() => status, [status])

  return (
    <div className="space-y-6">
      <ToolSection
        title="JSON 工具"
        description="支持 JSON 的格式化、压缩与结构校验。"
        actions={
          <div className="flex flex-wrap items-center gap-2">
            <Button onClick={() => handleAction('format')} disabled={!input.trim()}>
              格式化
            </Button>
            <Button onClick={() => handleAction('minify')} disabled={!input.trim()}>
              压缩
            </Button>
            <Button variant="secondary" onClick={() => handleAction('validate')} disabled={!input.trim()}>
              校验
            </Button>
            <Button variant="ghost" onClick={handleLoadSample}>
              {t('载入示例')}
            </Button>
            <Button variant="secondary" onClick={handleClear}>
              清空
            </Button>
          </div>
        }
      >
        <TextArea
          placeholder="粘贴 JSON 数据"
          value={input}
          onChange={(event) =>
            setState((prev) => ({ ...prev, input: event.target.value }))
          }
          className="min-h-[240px] font-mono"
        />
        {statusMessage ? (
          <p className="mt-3 text-sm text-slate-500 dark:text-slate-300">{statusMessage}</p>
        ) : null}
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

export default JsonTool
