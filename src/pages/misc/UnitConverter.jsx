import { useMemo, useState } from 'react'
import Input from '../../components/common/Input.jsx'
import Select from '../../components/common/Select.jsx'
import ToolSection from '../../components/common/ToolSection.jsx'
import { unitDefinitions } from '../../utils/constants.js'

const convertValue = (category, from, to, value) => {
  const config = unitDefinitions[category]
  if (!config) return value
  const fromUnit = config.units[from]
  const toUnit = config.units[to]
  if (!fromUnit || !toUnit) return value

  const toBase = fromUnit.toBase ? fromUnit.toBase : (v) => v * fromUnit.ratio
  const fromBase = toUnit.fromBase ? toUnit.fromBase : (v) => v / toUnit.ratio

  return fromBase(toBase(value))
}

const UnitConverter = () => {
  const [category, setCategory] = useState('length')
  const [fromUnit, setFromUnit] = useState('meter')
  const [toUnit, setToUnit] = useState('kilometer')
  const [value, setValue] = useState(1)

  const result = useMemo(() => {
    const numeric = Number(value)
    if (!Number.isFinite(numeric)) return 0
    return convertValue(category, fromUnit, toUnit, numeric)
  }, [category, fromUnit, toUnit, value])

  const config = unitDefinitions[category]

  const handleCategoryChange = (nextCategory) => {
    const nextConfig = unitDefinitions[nextCategory]
    const entries = Object.keys(nextConfig.units)
    const base = nextConfig.base || entries[0]
    const fallback = entries.find((key) => key !== base) || base
    setCategory(nextCategory)
    setFromUnit(base)
    setToUnit(fallback)
  }

  return (
    <ToolSection
      title="单位换算器"
      description="支持长度、重量、温度、体积、面积等单位换算。"
    >
      <div className="grid gap-4 md:grid-cols-4">
        <Select value={category} onChange={(event) => handleCategoryChange(event.target.value)} className="w-full">
          {Object.entries(unitDefinitions).map(([key, item]) => (
            <option key={key} value={key}>
              {item.label}
            </option>
          ))}
        </Select>
        <Select value={fromUnit} onChange={(event) => setFromUnit(event.target.value)} className="w-full">
          {Object.entries(config.units).map(([key, unit]) => (
            <option key={key} value={key}>
              {unit.label}
            </option>
          ))}
        </Select>
        <Select value={toUnit} onChange={(event) => setToUnit(event.target.value)} className="w-full">
          {Object.entries(config.units).map(([key, unit]) => (
            <option key={key} value={key}>
              {unit.label}
            </option>
          ))}
        </Select>
        <Input type="number" value={value} onChange={(event) => setValue(event.target.value)} />
      </div>
      <div className="mt-6 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-lg font-medium text-slate-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100">
        {Number.isFinite(result) ? result.toFixed(6) : '—'}
      </div>
    </ToolSection>
  )
}

export default UnitConverter
