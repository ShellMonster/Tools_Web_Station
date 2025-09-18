import { useState } from 'react'
import Button from '../../components/common/Button.jsx'
import TextArea from '../../components/common/TextArea.jsx'
import ToolSection from '../../components/common/ToolSection.jsx'
import { jsonToToml, tomlToJson } from '../../utils/format.js'
import { useTranslation } from '../../i18n/index.jsx'

const TomlJsonTool = () => {
  const [tomlContent, setTomlContent] = useState('')
  const [jsonContent, setJsonContent] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { t } = useTranslation()

  const handleTomlToJson = async () => {
    setLoading(true)
    try {
      const result = await tomlToJson(tomlContent)
      setJsonContent(result)
      setError('')
    } catch (err) {
      setError(t('转换失败: ${err.message}').replace('${err.message}', err.message))
    } finally {
      setLoading(false)
    }
  }

  const handleJsonToToml = async () => {
    setLoading(true)
    try {
      const result = await jsonToToml(jsonContent)
      setTomlContent(result)
      setError('')
    } catch (err) {
      setError(t('转换失败: ${err.message}').replace('${err.message}', err.message))
    } finally {
      setLoading(false)
    }
  }

  return (
    <ToolSection
      title="TOML ↔ JSON 转换"
      description="快速转换 TOML 与 JSON 数据结构。"
      actions={
        <Button
          variant="secondary"
          onClick={() => {
            setTomlContent('')
            setJsonContent('')
            setError('')
          }}
        >
          清空
        </Button>
      }
    >
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <TextArea
            placeholder="TOML 内容"
            value={tomlContent}
            onChange={(event) => setTomlContent(event.target.value)}
            className="min-h-[220px] font-mono"
          />
          <div className="mt-2 flex gap-2">
            <Button onClick={handleTomlToJson} disabled={!tomlContent.trim() || loading}>
              {t('转换为 JSON →')}
            </Button>
          </div>
        </div>
        <div>
          <TextArea
            placeholder="JSON 内容"
            value={jsonContent}
            onChange={(event) => setJsonContent(event.target.value)}
            className="min-h-[220px] font-mono"
          />
          <div className="mt-2 flex gap-2">
            <Button onClick={handleJsonToToml} disabled={!jsonContent.trim() || loading}>
              {t('← 转换为 TOML')}
            </Button>
          </div>
        </div>
      </div>
      {loading ? <p className="mt-2 text-sm text-slate-500">{t('处理中…')}</p> : null}
      {error ? <p className="mt-3 text-sm text-red-500">{error}</p> : null}
    </ToolSection>
  )
}

export default TomlJsonTool
