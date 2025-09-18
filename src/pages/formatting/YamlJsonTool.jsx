import { useState } from 'react'
import Button from '../../components/common/Button.jsx'
import TextArea from '../../components/common/TextArea.jsx'
import ToolSection from '../../components/common/ToolSection.jsx'
import { yamlToJson, jsonToYaml } from '../../utils/format.js'
import { useTranslation } from '../../i18n/index.jsx'

const YamlJsonTool = () => {
  const [yamlContent, setYamlContent] = useState('')
  const [jsonContent, setJsonContent] = useState('')
  const [error, setError] = useState('')
  const { t } = useTranslation()

  const handleYamlToJson = () => {
    try {
      setJsonContent(yamlToJson(yamlContent))
      setError('')
    } catch (err) {
      setError(t('转换失败: ${err.message}').replace('${err.message}', err.message))
    }
  }

  const handleJsonToYaml = () => {
    try {
      setYamlContent(jsonToYaml(jsonContent))
      setError('')
    } catch (err) {
      setError(t('转换失败: ${err.message}').replace('${err.message}', err.message))
    }
  }

  return (
    <ToolSection
      title="YAML ↔ JSON 转换"
      description="在 YAML 与 JSON 之间进行双向转换。"
      actions={
        <Button
          variant="secondary"
          onClick={() => {
            setYamlContent('')
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
            placeholder="YAML 内容"
            value={yamlContent}
            onChange={(event) => setYamlContent(event.target.value)}
            className="min-h-[220px] font-mono"
          />
          <div className="mt-2 flex gap-2">
            <Button onClick={handleYamlToJson} disabled={!yamlContent.trim()}>
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
            <Button onClick={handleJsonToYaml} disabled={!jsonContent.trim()}>
              {t('← 转换为 YAML')}
            </Button>
          </div>
        </div>
      </div>
      {error ? <p className="mt-3 text-sm text-red-500">{error}</p> : null}
    </ToolSection>
  )
}

export default YamlJsonTool
