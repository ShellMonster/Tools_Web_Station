import { useMemo, useState } from 'react'
import Button from '../../components/common/Button.jsx'
import TextArea from '../../components/common/TextArea.jsx'
import ToolSection from '../../components/common/ToolSection.jsx'
import { copyToClipboard } from '../../utils/clipboard.js'
import { decodeJwt } from '../../utils/encoding.js'
import { useTranslation } from '../../i18n/index.jsx'

const JwtDecoder = () => {
  const [token, setToken] = useState('')
  const [header, setHeader] = useState('')
  const [payload, setPayload] = useState('')
  const [signature, setSignature] = useState('')
  const [error, setError] = useState(null)
  const { t } = useTranslation()

  const handleDecode = () => {
    if (!token.trim()) return
    try {
      const result = decodeJwt(token.trim())
      setHeader(JSON.stringify(result.header, null, 2))
      setPayload(JSON.stringify(result.payload, null, 2))
      setSignature(result.signature)
      setError(null)
    } catch (err) {
      setError({ message: err.message })
    }
  }

  const handleClear = () => {
    setToken('')
    setHeader('')
    setPayload('')
    setSignature('')
    setError(null)
  }

  const errorMessage = useMemo(() => {
    if (!error) return ''
    return t('解析失败: ${err.message}').replace('${err.message}', error.message)
  }, [error, t])

  return (
    <div className="space-y-6">
      <ToolSection
        title="JWT 解码"
        description="解析 JWT 的 Header / Payload / Signature 部分，协助调试。"
        actions={
          <div className="flex gap-2">
            <Button variant="secondary" onClick={handleClear}>
              清空
            </Button>
            <Button onClick={handleDecode} disabled={!token.trim()}>
              解码 JWT
            </Button>
          </div>
        }
      >
        <TextArea
          placeholder="粘贴 JWT Token"
          value={token}
          onChange={(event) => setToken(event.target.value)}
        />
        {error ? <p className="mt-3 text-sm text-red-500">{errorMessage}</p> : null}
      </ToolSection>

      <ToolSection
        title="Header"
        actions={
          <Button variant="secondary" onClick={() => copyToClipboard(header)} disabled={!header}>
            复制
          </Button>
        }
      >
        <TextArea value={header} readOnly className="min-h-[120px] font-mono" />
      </ToolSection>

      <ToolSection
        title="Payload"
        actions={
          <Button variant="secondary" onClick={() => copyToClipboard(payload)} disabled={!payload}>
            复制
          </Button>
        }
      >
        <TextArea value={payload} readOnly className="min-h-[160px] font-mono" />
      </ToolSection>

      <ToolSection
        title="Signature"
        actions={
          <Button variant="secondary" onClick={() => copyToClipboard(signature)} disabled={!signature}>
            复制
          </Button>
        }
      >
        <div className="rounded-md border border-slate-200 bg-white px-3 py-3 font-mono text-sm dark:border-slate-800 dark:bg-slate-900">
          {signature || t('Signature 将显示在此处')}
        </div>
      </ToolSection>
    </div>
  )
}

export default JwtDecoder
