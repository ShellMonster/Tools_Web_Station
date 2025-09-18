import { useMemo, useState } from 'react'
import Button from '../../components/common/Button.jsx'
import Input from '../../components/common/Input.jsx'
import ToolSection from '../../components/common/ToolSection.jsx'
import { parseCronToText } from '../../utils/time.js'
import usePersistentState from '../../hooks/usePersistentState.js'
import { useTranslation } from '../../i18n/index.jsx'

const CronParser = () => {
  const [persistentState, setPersistentState, resetPersistentState] = usePersistentState('tool:cron', () => ({
    expression: '*/5 * * * *',
  }))
  const { expression } = persistentState
  const [description, setDescription] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { t } = useTranslation()

  const handleParse = async () => {
    setLoading(true)
    try {
      const text = await parseCronToText(expression)
      setDescription(text)
      setError('')
    } catch (err) {
      setError(t('解析失败: ${err.message}').replace('${err.message}', err.message))
    } finally {
      setLoading(false)
    }
  }

  const handleLoadSample = () => {
    setPersistentState(() => ({ expression: '0 9 * * 1-5' }))
    setDescription('')
    setError('')
  }

  const sampleHint = useMemo(() => t('例如 */5 * * * *'), [t])

  return (
    <ToolSection
      title="Cron 表达式解析"
      description="解析标准 Cron 表达式，转换为自然语言描述。"
      actions={
        <div className="flex gap-2">
          <Button onClick={handleParse} disabled={!expression.trim() || loading}>
            {loading ? '解析中…' : '解析'}
          </Button>
          <Button variant="ghost" onClick={handleLoadSample}>
            {t('载入示例')}
          </Button>
          <Button
            variant="secondary"
            onClick={() => {
              resetPersistentState()
              setDescription('')
              setError('')
            }}
          >
            清空
          </Button>
        </div>
      }
    >
      <Input
        value={expression}
        onChange={(event) =>
          setPersistentState(() => ({ expression: event.target.value }))
        }
        placeholder={sampleHint}
      />
      {description ? (
        <p className="mt-4 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200">
          {description}
        </p>
      ) : null}
      {error ? <p className="mt-2 text-sm text-red-500">{error}</p> : null}
    </ToolSection>
  )
}

export default CronParser
