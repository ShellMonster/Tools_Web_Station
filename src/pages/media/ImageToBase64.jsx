import { useState } from 'react'
import Button from '../../components/common/Button.jsx'
import ToolSection from '../../components/common/ToolSection.jsx'
import { copyToClipboard } from '../../utils/clipboard.js'
import { useTranslation } from '../../i18n/index.jsx'

const ImageToBase64 = () => {
  const [preview, setPreview] = useState('')
  const [base64, setBase64] = useState('')
  const { t } = useTranslation()

  const handleFileChange = (event) => {
    const file = event.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      setBase64(reader.result)
      setPreview(reader.result)
    }
    reader.readAsDataURL(file)
  }

  return (
    <ToolSection
      title="图片转 Base64"
      description="将本地图像文件转换为 Base64 DataURL，便于内嵌资源。"
      actions={
        <Button variant="secondary" onClick={() => copyToClipboard(base64)} disabled={!base64}>
          复制 Base64
        </Button>
      }
    >
      <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-dashed border-slate-300 bg-white px-4 py-3 text-sm text-slate-600 shadow-sm transition hover:border-primary hover:text-primary dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-primary/80">
        <span>📁 {t('选择图片')}</span>
        <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
      </label>
      {preview ? (
        <div className="mt-4 flex flex-col gap-4 md:flex-row">
          <img src={preview} alt="preview" className="h-48 w-48 rounded-lg object-cover" />
          <textarea
            className="h-48 w-full rounded-md border border-slate-200 bg-white p-3 text-xs font-mono dark:border-slate-800 dark:bg-slate-900"
            value={base64}
            readOnly
          />
        </div>
      ) : null}
    </ToolSection>
  )
}

export default ImageToBase64
