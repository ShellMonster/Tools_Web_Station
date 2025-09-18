import { useState } from 'react'
import Button from '../../components/common/Button.jsx'
import TextArea from '../../components/common/TextArea.jsx'
import ToolSection from '../../components/common/ToolSection.jsx'
import { useTranslation } from '../../i18n/index.jsx'

const Base64ToImage = () => {
  const [input, setInput] = useState('')
  const [preview, setPreview] = useState('')
  const [error, setError] = useState('')
  const { t } = useTranslation()

  const handlePreview = () => {
    try {
      if (!input.startsWith('data:')) {
        setPreview(`data:image/png;base64,${input}`)
      } else {
        setPreview(input)
      }
      setError('')
    } catch (err) {
      setError(t('Base64 字符串无效'))
    }
  }

  return (
    <ToolSection
      title="Base64 转图片"
      description="将 Base64 字符串预览为图片。"
      actions={
        <div className="flex gap-2">
          <Button onClick={handlePreview} disabled={!input.trim()}>
            生成图片
          </Button>
          <Button variant="secondary" onClick={() => { setInput(''); setPreview('') }}>
            清空
          </Button>
        </div>
      }
    >
      <TextArea
        placeholder="粘贴 Base64 内容"
        value={input}
        onChange={(event) => setInput(event.target.value)}
        className="min-h-[180px] font-mono"
      />
      {error ? <p className="mt-2 text-sm text-red-500">{error}</p> : null}
      {preview ? (
        <div className="mt-4">
          <img src={preview} alt="Base64 preview" className="max-h-64 rounded-lg border border-slate-200 object-contain dark:border-slate-800" />
        </div>
      ) : null}
    </ToolSection>
  )
}

export default Base64ToImage
