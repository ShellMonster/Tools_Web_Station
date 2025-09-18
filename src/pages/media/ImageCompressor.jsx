import { useState } from 'react'
import ToolSection from '../../components/common/ToolSection.jsx'
import imageCompression from 'browser-image-compression'
import { useTranslation } from '../../i18n/index.jsx'

const ImageCompressor = () => {
  const [quality, setQuality] = useState(0.7)
  const [originalInfo, setOriginalInfo] = useState(null)
  const [compressedInfo, setCompressedInfo] = useState(null)
  const [preview, setPreview] = useState({ original: '', compressed: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { t } = useTranslation()

  const handleFileChange = async (event) => {
    const file = event.target.files?.[0]
    if (!file) return
    setLoading(true)
    try {
      setOriginalInfo({ name: file.name, size: file.size })
      const compressed = await imageCompression(file, {
        maxSizeMB: quality,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
      })
      setCompressedInfo({ name: compressed.name, size: compressed.size })
      const originalUrl = URL.createObjectURL(file)
      const compressedUrl = URL.createObjectURL(compressed)
      setPreview({ original: originalUrl, compressed: compressedUrl })
      setError('')
    } catch (err) {
      setError(`压缩失败: ${err.message}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <ToolSection
      title="图片压缩"
      description="在浏览器内压缩图片，支持调整目标大小。"
    >
      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        <label className={`inline-flex cursor-pointer items-center gap-2 rounded-lg border border-dashed border-slate-300 bg-white px-4 py-3 text-sm text-slate-600 shadow-sm transition hover:border-primary hover:text-primary dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-primary/80 ${loading ? 'opacity-60' : ''}`}>
          <span>📁 {loading ? t('处理中…') : t('选择图片')}</span>
          <input type="file" accept="image/*" onChange={handleFileChange} disabled={loading} className="hidden" />
        </label>
        <label className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-300">
          {t('目标大小 (MB)')}
          <input
            type="number"
            min={0.2}
            max={5}
            step={0.1}
            value={quality}
            onChange={(event) => setQuality(Number(event.target.value))}
            className="w-24 rounded-md border border-slate-200 bg-white px-2 py-1 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
          />
        </label>
      </div>
      {error ? <p className="mt-2 text-sm text-red-500">{error}</p> : null}
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        {preview.original ? (
          <div>
            <h3 className="text-sm font-medium text-slate-600 dark:text-slate-300">{t('原始')}</h3>
            <p className="text-xs text-slate-500">{originalInfo.name} · {(originalInfo.size / 1024).toFixed(1)} KB</p>
            <img src={preview.original} alt="original" className="mt-2 max-h-64 rounded-lg object-contain" />
          </div>
        ) : null}
        {preview.compressed ? (
          <div>
            <h3 className="text-sm font-medium text-slate-600 dark:text-slate-300">{t('压缩后')}</h3>
            <p className="text-xs text-slate-500">{compressedInfo.name} · {(compressedInfo.size / 1024).toFixed(1)} KB</p>
            <img src={preview.compressed} alt="compressed" className="mt-2 max-h-64 rounded-lg object-contain" />
          </div>
        ) : null}
      </div>
    </ToolSection>
  )
}

export default ImageCompressor
