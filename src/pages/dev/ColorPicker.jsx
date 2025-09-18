import { useMemo, useState } from 'react'
import ToolSection from '../../components/common/ToolSection.jsx'
import { hexToRgb, rgbToHsl } from '../../utils/colors.js'

const ColorPicker = () => {
  const [color, setColor] = useState('#2563eb')

  const meta = useMemo(() => {
    const rgb = hexToRgb(color)
    const hsl = rgbToHsl(rgb)
    return {
      rgb: `${rgb.r}, ${rgb.g}, ${rgb.b}`,
      hsl: `${Math.round(hsl.h)}, ${Math.round(hsl.s)}, ${Math.round(hsl.l)}`,
    }
  }, [color])

  return (
    <ToolSection
      title="取色器"
      description="选择颜色并查看对应的 HEX / RGB / HSL 数值。"
    >
      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        <input
          type="color"
          value={color}
          onChange={(event) => setColor(event.target.value)}
          className="h-32 w-32 cursor-pointer appearance-none border-none bg-transparent p-0"
        />
        <div className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
          <div>
            <span className="font-medium">HEX：</span>
            <span className="font-mono">{color.toUpperCase()}</span>
          </div>
          <div>
            <span className="font-medium">RGB：</span>
            <span className="font-mono">{meta.rgb}</span>
          </div>
          <div>
            <span className="font-medium">HSL：</span>
            <span className="font-mono">{meta.hsl}</span>
          </div>
        </div>
      </div>
    </ToolSection>
  )
}

export default ColorPicker
