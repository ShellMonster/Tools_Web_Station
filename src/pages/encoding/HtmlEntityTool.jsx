import { useState } from 'react'
import Button from '../../components/common/Button.jsx'
import TextArea from '../../components/common/TextArea.jsx'
import ToolSection from '../../components/common/ToolSection.jsx'
import { copyToClipboard } from '../../utils/clipboard.js'
import { decodeHtmlEntities, encodeHtmlEntities } from '../../utils/format.js'

const HtmlEntityTool = () => {
  const [plain, setPlain] = useState('')
  const [encoded, setEncoded] = useState('')

  const handleEncode = () => {
    setEncoded(encodeHtmlEntities(plain))
  }

  const handleDecode = () => {
    setPlain(decodeHtmlEntities(encoded))
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
            <Button onClick={handleEncode} disabled={!plain.trim()}>
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
            <Button onClick={handleDecode} disabled={!encoded.trim()}>
              ← 解码
            </Button>
            <Button variant="secondary" onClick={() => copyToClipboard(encoded)} disabled={!encoded}>
              复制
            </Button>
          </div>
        </div>
      </div>
    </ToolSection>
  )
}

export default HtmlEntityTool
