import { useRef, useState } from 'react'
import Button from '../../components/common/Button.jsx'
import Input from '../../components/common/Input.jsx'
import ToolSection from '../../components/common/ToolSection.jsx'
import { copyToClipboard } from '../../utils/clipboard.js'
import jsQR from 'jsqr'
import { QRCodeCanvas } from 'qrcode.react'
import { useTranslation } from '../../i18n/index.jsx'

const QrTool = () => {
  const [text, setText] = useState('https://example.com')
  const [decoded, setDecoded] = useState('')
  const [error, setError] = useState('')
  const canvasRef = useRef(null)
  const { t } = useTranslation()

  const handleDownload = () => {
    const canvas = canvasRef.current?.querySelector('canvas')
    if (!canvas) return
    const link = document.createElement('a')
    link.href = canvas.toDataURL('image/png')
    link.download = 'qrcode.png'
    link.click()
  }

  const handleDecode = async (event) => {
    const file = event.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      const image = new Image()
      image.onload = () => {
        const canvas = document.createElement('canvas')
        canvas.width = image.width
        canvas.height = image.height
        const ctx = canvas.getContext('2d')
        ctx.drawImage(image, 0, 0)
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
        const code = jsQR(imageData.data, imageData.width, imageData.height)
        if (code) {
          setDecoded(code.data)
          setError('')
        } else {
          setDecoded('')
          setError(t('未识别到二维码'))
        }
      }
      image.onerror = () => {
        setError(t('图片加载失败'))
      }
      image.src = reader.result
    }
    reader.readAsDataURL(file)
  }

  return (
    <div className="space-y-6">
      <ToolSection
        title="二维码生成"
        description="输入文本生成二维码，支持下载。"
        actions={
          <div className="flex gap-2">
            <Button onClick={handleDownload}>{t('下载 PNG')}</Button>
            <Button variant="secondary" onClick={() => copyToClipboard(text)}>
              {t('复制文本')}
            </Button>
          </div>
        }
      >
        <div className="flex flex-col items-start gap-4 md:flex-row md:items-center">
          <div ref={canvasRef} className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
            <QRCodeCanvas value={text || ''} size={180} level="M" includeMargin />
          </div>
          <Input value={text} onChange={(event) => setText(event.target.value)} className="md:w-80" />
        </div>
      </ToolSection>

      <ToolSection
        title="二维码解码"
        description="上传图片识别二维码内容。"
      >
        <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-dashed border-slate-300 bg-white px-4 py-3 text-sm text-slate-600 shadow-sm transition hover:border-primary hover:text-primary dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-primary/80">
          <span>📁 {t('选择二维码图片')}</span>
          <input type="file" accept="image/*" onChange={handleDecode} className="hidden" />
        </label>
        {decoded ? (
          <div className="mt-3 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-mono text-slate-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200">
            {decoded}
          </div>
        ) : null}
        {error ? <p className="mt-2 text-sm text-red-500">{error}</p> : null}
      </ToolSection>
    </div>
  )
}

export default QrTool
