import { useMemo, useState } from 'react'
import Button from '../../components/common/Button.jsx'
import Input from '../../components/common/Input.jsx'
import ToolSection from '../../components/common/ToolSection.jsx'

const sizes = [16, 32, 64, 128]

const renderIcon = ({ text, bgColor, textColor, size }) => {
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  const ctx = canvas.getContext('2d')
  ctx.fillStyle = bgColor
  ctx.fillRect(0, 0, size, size)
  ctx.fillStyle = textColor
  ctx.font = `${size * 0.6}px sans-serif`
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText(text.slice(0, 2).toUpperCase(), size / 2, size / 2 + size * 0.05)
  return canvas.toDataURL('image/png')
}

const FaviconGenerator = () => {
  const [text, setText] = useState('F')
  const [bgColor, setBgColor] = useState('#2563eb')
  const [textColor, setTextColor] = useState('#ffffff')

  const previews = useMemo(() => {
    const result = new Map()
    sizes.forEach((size) => {
      result.set(size, renderIcon({ text, bgColor, textColor, size }))
    })
    return result
  }, [text, bgColor, textColor])

  const handleDownload = (size) => {
    const dataUrl = previews.get(size)
    if (!dataUrl) return
    const link = document.createElement('a')
    link.href = dataUrl
    link.download = `favicon-${size}.png`
    link.click()
  }

  return (
    <ToolSection
      title="图标生成 (Favicon)"
      description="根据文本快速生成 favicon 预览，可下载多种尺寸。"
    >
      <div className="grid gap-4 md:grid-cols-4">
        <div className="md:col-span-2">
          <label className="text-sm text-slate-500 dark:text-slate-300">文本</label>
          <Input value={text} onChange={(event) => setText(event.target.value)} placeholder="输入字符" />
        </div>
        <div>
          <label className="text-sm text-slate-500 dark:text-slate-300">背景色</label>
          <input type="color" value={bgColor} onChange={(event) => setBgColor(event.target.value)} className="h-10 w-full" />
        </div>
        <div>
          <label className="text-sm text-slate-500 dark:text-slate-300">文字颜色</label>
          <input type="color" value={textColor} onChange={(event) => setTextColor(event.target.value)} className="h-10 w-full" />
        </div>
      </div>
      <div className="mt-6 flex flex-wrap items-center gap-6">
        {sizes.map((size) => (
          <div key={size} className="flex flex-col items-center gap-2">
            <img src={previews.get(size)} alt={`favicon-${size}`} className="rounded-lg border border-slate-200 p-2 dark:border-slate-800" width={size + 16} height={size + 16} />
            <Button variant="secondary" onClick={() => handleDownload(size)}>
              下载 {size}px
            </Button>
          </div>
        ))}
      </div>
    </ToolSection>
  )
}

export default FaviconGenerator
