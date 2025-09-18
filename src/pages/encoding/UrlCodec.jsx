import { useState } from 'react'
import Button from '../../components/common/Button.jsx'
import TextArea from '../../components/common/TextArea.jsx'
import ToolSection from '../../components/common/ToolSection.jsx'
import { copyToClipboard } from '../../utils/clipboard.js'
import { urlDecode, urlEncode } from '../../utils/encoding.js'

const UrlCodec = () => {
  const [plain, setPlain] = useState('')
  const [encoded, setEncoded] = useState('')
  const [error, setError] = useState('')

  const handleEncode = () => {
    try {
      setEncoded(urlEncode(plain))
      setError('')
    } catch (err) {
      setError(`编码失败: ${err.message}`)
    }
  }

  const handleDecode = () => {
    try {
      setPlain(urlDecode(encoded))
      setError('')
    } catch (err) {
      setError(`解码失败: ${err.message}`)
    }
  }

  return (
    <ToolSection
      title="URL 编码/解码"
      description="快速进行 URL 编码与解码，适用于查询字符串处理。"
      actions={
        <Button variant="secondary" onClick={() => { setPlain(''); setEncoded(''); setError('') }}>
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
            placeholder="编码结果"
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
      {error ? <p className="mt-3 text-sm text-red-500">{error}</p> : null}
    </ToolSection>
  )
}

export default UrlCodec
