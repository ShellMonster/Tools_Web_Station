import { useState } from 'react'
import Button from '../../components/common/Button.jsx'
import TextArea from '../../components/common/TextArea.jsx'
import ToolSection from '../../components/common/ToolSection.jsx'
import { csvToJson, jsonToCsv } from '../../utils/format.js'
import { useTranslation } from '../../i18n/index.jsx'

const CsvJsonTool = () => {
  const [csvContent, setCsvContent] = useState('')
  const [jsonContent, setJsonContent] = useState('')
  const [error, setError] = useState('')
  const { t } = useTranslation()

  const handleCsvToJson = () => {
    try {
      setJsonContent(csvToJson(csvContent))
      setError('')
    } catch (err) {
      setError(t('转换失败: ${err.message}').replace('${err.message}', err.message))
    }
  }

  const handleJsonToCsv = () => {
    try {
      setCsvContent(jsonToCsv(jsonContent))
      setError('')
    } catch (err) {
      setError(t('转换失败: ${err.message}').replace('${err.message}', err.message))
    }
  }

  return (
    <ToolSection
      title="CSV ↔ JSON 转换"
      description="在 CSV 与 JSON 数据之间快速切换，自动处理表头。"
      actions={
        <Button variant="secondary" onClick={() => { setCsvContent(''); setJsonContent(''); setError('') }}>
          清空
        </Button>
      }
    >
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <TextArea
            placeholder="CSV 内容"
            value={csvContent}
            onChange={(event) => setCsvContent(event.target.value)}
            className="min-h-[220px] font-mono"
          />
          <div className="mt-2 flex gap-2">
            <Button onClick={handleCsvToJson} disabled={!csvContent.trim()}>
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
            <Button onClick={handleJsonToCsv} disabled={!jsonContent.trim()}>
              {t('← 转换为 CSV')}
            </Button>
          </div>
        </div>
      </div>
      {error ? <p className="mt-3 text-sm text-red-500">{error}</p> : null}
    </ToolSection>
  )
}

export default CsvJsonTool
