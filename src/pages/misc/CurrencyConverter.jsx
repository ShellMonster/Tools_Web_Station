import { useMemo, useState } from 'react'
import Input from '../../components/common/Input.jsx'
import Select from '../../components/common/Select.jsx'
import ToolSection from '../../components/common/ToolSection.jsx'
import { staticRates } from '../../utils/constants.js'

const CurrencyConverter = () => {
  const [amount, setAmount] = useState(100)
  const [from, setFrom] = useState('CNY')
  const [to, setTo] = useState('USD')

  const result = useMemo(() => {
    const numeric = Number(amount)
    if (!Number.isFinite(numeric)) return 0
    const fromRate = staticRates[from]?.rate ?? 1
    const toRate = staticRates[to]?.rate ?? 1
    return (numeric * toRate) / fromRate
  }, [amount, from, to])

  return (
    <ToolSection
      title="货币汇率换算"
      description="基于静态示例汇率的换算，实时项目请接入真实 API。"
    >
      <div className="grid gap-4 md:grid-cols-4">
        <Input type="number" value={amount} onChange={(event) => setAmount(event.target.value)} />
        <Select value={from} onChange={(event) => setFrom(event.target.value)} className="w-full">
          {Object.entries(staticRates).map(([code, item]) => (
            <option key={code} value={code}>
              {item.label}
            </option>
          ))}
        </Select>
        <div className="flex items-center justify-center text-slate-400">→</div>
        <Select value={to} onChange={(event) => setTo(event.target.value)} className="w-full">
          {Object.entries(staticRates).map(([code, item]) => (
            <option key={code} value={code}>
              {item.label}
            </option>
          ))}
        </Select>
      </div>
      <div className="mt-6 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-lg font-medium text-slate-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100">
        ≈ {result.toFixed(2)} {to}
      </div>
    </ToolSection>
  )
}

export default CurrencyConverter
