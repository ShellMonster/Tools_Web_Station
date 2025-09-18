import { useState } from 'react'
import Button from '../../components/common/Button.jsx'
import TextArea from '../../components/common/TextArea.jsx'
import ToolSection from '../../components/common/ToolSection.jsx'
import { copyToClipboard } from '../../utils/clipboard.js'
import { decodeHtmlEntities, encodeHtmlEntities } from '../../utils/format.js'
import { useTranslation } from '../../i18n/index.jsx'

const HtmlEntityTool = () => {
  const [plain, setPlain] = useState('')
  const [encoded, setEncoded] = useState('')
  const [loading, setLoading] = useState(false)
  const { t } = useTranslation()

  const handleEncode = async () => {
    setLoading(true)
    try {
      const result = await encodeHtmlEntities(plain)
      setEncoded(result)
    } finally {
      setLoading(false)
    }
  }

  const handleDecode = async () => {
    setLoading(true)
    try {
      const result = await decodeHtmlEntities(encoded)
      setPlain(result)
    } finally {
      setLoading(false)
    }
  }

  return (
    <ToolSection
      title="HTML 实体编码/解码"
      description="安全处理 HTML 字符实体，防止特殊字符导致解析错误。"
      actions={
        <Button variant="secondary" onClick={() => { setPlain(''); setEncoded('') }}>
          清空
        </Button>
      }
    >
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <TextArea
            placeholder="原始文本"
            value={plain}
            onChange={(event) => setPlain(event.target.value)}
          />
          <div className="mt-2 flex gap-2">
            <Button onClick={handleEncode} disabled={!plain.trim() || loading}>
              编码 →
            </Button>
            <Button variant="secondary" onClick={() => copyToClipboard(plain)} disabled={!plain}>
              复制
            </Button>
          </div>
        </div>
        <div>
          <TextArea
            placeholder="实体文本"
            value={encoded}
            onChange={(event) => setEncoded(event.target.value)}
          />
          <div className="mt-2 flex gap-2">
            <Button onClick={handleDecode} disabled={!encoded.trim() || loading}>
              ← 解码
            </Button>
            <Button variant="secondary" onClick={() => copyToClipboard(encoded)} disabled={!encoded}>
              复制
            </Button>
          </div>
        </div>
      </div>
      {loading ? <p className="mt-2 text-sm text-slate-500">{t('处理中…')}</p> : null}
    </ToolSection>
  )
}

export default HtmlEntityTool
