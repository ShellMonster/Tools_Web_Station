import { useState } from 'react'
import Input from '../../components/common/Input.jsx'
import ToolSection from '../../components/common/ToolSection.jsx'
import { hexToRgb, rgbToHex, rgbToHsl, hslToRgb, hexToHsl, hslToHex } from '../../utils/colors.js'
import { useTranslation } from '../../i18n/index.jsx'

const clamp = (value, min, max) => Math.min(Math.max(value, min), max)

const ColorConverter = () => {
  const [hex, setHex] = useState('#2563eb')
  const [rgb, setRgb] = useState('37, 99, 235')
  const [hsl, setHsl] = useState('221, 83, 53')
  const [error, setError] = useState('')
  const { t } = useTranslation()

  const syncFromHex = (value) => {
    try {
      const normalized = value.startsWith('#') ? value : `#${value}`
      const rgbVal = hexToRgb(normalized)
      const hslVal = hexToHsl(normalized)
      setHex(normalized)
      setRgb(`${rgbVal.r}, ${rgbVal.g}, ${rgbVal.b}`)
      setHsl(`${hslVal.h}, ${hslVal.s}, ${hslVal.l}`)
      setError('')
    } catch (err) {
      setError(t('请输入合法的十六进制颜色，例如 #2563eb'))
    }
  }

  const syncFromRgb = (value) => {
    try {
      const [r, g, b] = value.split(',').map((item) => clamp(Number(item.trim()), 0, 255))
      if ([r, g, b].some((num) => Number.isNaN(num))) throw new Error('Invalid RGB')
      const hexVal = rgbToHex({ r, g, b })
      const hslVal = rgbToHsl({ r, g, b })
      setHex(hexVal)
      setRgb(`${r}, ${g}, ${b}`)
      setHsl(`${hslVal.h}, ${hslVal.s}, ${hslVal.l}`)
      setError('')
    } catch (err) {
      setError(t('请输入合法的 RGB，例如 37, 99, 235'))
    }
  }

  const syncFromHsl = (value) => {
    try {
      const [h, s, l] = value.split(',').map((item, index) => {
        const num = Number(item.trim())
        if (index === 0) return ((num % 360) + 360) % 360
        return clamp(num, 0, 100)
      })
      if ([h, s, l].some((num) => Number.isNaN(num))) throw new Error('Invalid HSL')
      const hexVal = hslToHex({ h, s, l })
      const rgbVal = hslToRgb({ h, s, l })
      setHex(hexVal)
      setRgb(`${rgbVal.r}, ${rgbVal.g}, ${rgbVal.b}`)
      setHsl(`${h}, ${s}, ${l}`)
      setError('')
    } catch (err) {
      setError(t('请输入合法的 HSL，例如 221, 83, 53'))
    }
  }

  return (
    <ToolSection
      title="RGB ↔ HEX ↔ HSL"
      description="在常见颜色表示之间转换，实时预览颜色。"
    >
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="text-sm text-slate-500 dark:text-slate-300">HEX</label>
          <Input
            value={hex}
            onChange={(event) => setHex(event.target.value)}
            onBlur={(event) => syncFromHex(event.target.value)}
            placeholder="#2563eb"
          />
        </div>
        <div className="flex items-end">
          <div
            className="h-14 w-full rounded-lg border border-slate-200 shadow-inner dark:border-slate-700"
            style={{ backgroundColor: hex }}
          />
        </div>
        <div>
          <label className="text-sm text-slate-500 dark:text-slate-300">RGB</label>
          <Input
            value={rgb}
            onChange={(event) => setRgb(event.target.value)}
            onBlur={(event) => syncFromRgb(event.target.value)}
            placeholder="37, 99, 235"
          />
        </div>
        <div>
          <label className="text-sm text-slate-500 dark:text-slate-300">HSL</label>
          <Input
            value={hsl}
            onChange={(event) => setHsl(event.target.value)}
            onBlur={(event) => syncFromHsl(event.target.value)}
            placeholder="221, 83, 53"
          />
        </div>
      </div>
      {error ? <p className="mt-3 text-sm text-red-500">{error}</p> : null}
    </ToolSection>
  )
}

export default ColorConverter
