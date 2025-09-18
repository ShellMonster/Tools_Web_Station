import { useMemo, useState } from 'react'
import Button from '../../components/common/Button.jsx'
import TextArea from '../../components/common/TextArea.jsx'
import ToolSection from '../../components/common/ToolSection.jsx'
import { copyToClipboard } from '../../utils/clipboard.js'
import { base64Decode, base64Encode } from '../../utils/encoding.js'
import { useTranslation } from '../../i18n/index.jsx'

const Base64Tool = () => {
  const [plain, setPlain] = useState('')
  const [encoded, setEncoded] = useState('')
  const [error, setError] = useState(null)
  const { t } = useTranslation()

  const handleEncode = () => {
    setError(null)
    try {
      setEncoded(base64Encode(plain))
    } catch (err) {
      setError({ type: 'encode', message: err.message })
    }
  }

  const handleDecode = () => {
    setError(null)
    try {
      setPlain(base64Decode(encoded))
    } catch (err) {
      setError({ type: 'decode', message: err.message })
    }
  }

  const handleClear = () => {
    setPlain('')
    setEncoded('')
    setError(null)
  }

  const errorMessage = useMemo(() => {
    if (!error) return ''
    const template = error.type === 'encode' ? t('编码失败: ${err.message}') : t('解码失败: ${err.message}')
    return template.replace('${err.message}', error.message)
  }, [error, t])

  return (
    <div className="space-y-6">
      <ToolSection
        title="Base64 编码/解码"
        description="支持 UTF-8 文本的 Base64 编码与解码。"
        actions={
          <div className="flex gap-2">
            <Button variant="secondary" onClick={handleClear}>
              清空
            </Button>
          </div>
        }
      >
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <h3 className="mb-2 text-sm font-medium text-slate-600 dark:text-slate-300">{t('原始文本')}</h3>
            <TextArea
              placeholder="输入原始文本"
              value={plain}
              onChange={(event) => setPlain(event.target.value)}
            />
            <div className="mt-2 flex gap-2">
              <Button onClick={handleEncode} disabled={!plain.trim()}>
                编码 →
              </Button>
              <Button
                variant="secondary"
                onClick={() => copyToClipboard(plain)}
                disabled={!plain}
              >
                复制
              </Button>
            </div>
          </div>
          <div>
            <h3 className="mb-2 text-sm font-medium text-slate-600 dark:text-slate-300">Base64</h3>
            <TextArea
              placeholder="Base64 结果"
              value={encoded}
              onChange={(event) => setEncoded(event.target.value)}
            />
            <div className="mt-2 flex gap-2">
              <Button onClick={handleDecode} disabled={!encoded.trim()}>
                ← 解码
              </Button>
              <Button
                variant="secondary"
                onClick={() => copyToClipboard(encoded)}
                disabled={!encoded}
              >
                复制
              </Button>
            </div>
          </div>
        </div>
        {error ? <p className="mt-3 text-sm text-red-500">{errorMessage}</p> : null}
      </ToolSection>
    </div>
  )
}

export default Base64Tool
