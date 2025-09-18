import { useMemo, useState } from 'react'
import Input from '../../components/common/Input.jsx'
import Select from '../../components/common/Select.jsx'
import ToolSection from '../../components/common/ToolSection.jsx'
import { useTranslation } from '../../i18n/index.jsx'

const bases = [
  { value: 2, label: '二进制 (2)' },
  { value: 8, label: '八进制 (8)' },
  { value: 10, label: '十进制 (10)' },
  { value: 16, label: '十六进制 (16)' },
]

const BaseConverter = () => {
  const [inputValue, setInputValue] = useState('')
  const [inputBase, setInputBase] = useState(10)
  const { t } = useTranslation()

  const results = useMemo(() => {
    if (!inputValue) return null
    try {
      const parsed = Number.parseInt(inputValue, inputBase)
      if (Number.isNaN(parsed)) return null
      return {
        2: parsed.toString(2),
        8: parsed.toString(8),
        10: parsed.toString(10),
        16: parsed.toString(16).toUpperCase(),
      }
    } catch (error) {
      return null
    }
  }, [inputValue, inputBase])

  return (
    <ToolSection
      title="进制转换"
      description="支持在 2/8/10/16 进制之间互转，实时显示所有结果。"
    >
      <div className="grid gap-4 md:grid-cols-3">
        <div className="md:col-span-2">
          <label className="text-sm text-slate-500 dark:text-slate-300">{t('数值')}</label>
          <Input value={inputValue} onChange={(event) => setInputValue(event.target.value)} placeholder={t('输入数值')} />
        </div>
        <div>
          <label className="text-sm text-slate-500 dark:text-slate-300">{t('输入进制')}</label>
          <Select className="w-full" value={inputBase} onChange={(event) => setInputBase(Number(event.target.value))}>
            {bases.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </Select>
        </div>
      </div>
      <div className="mt-6 grid gap-3 md:grid-cols-2">
        {bases.map((item) => (
          <div
            key={item.value}
            className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm dark:border-slate-800 dark:bg-slate-900"
          >
            <div className="text-xs uppercase tracking-wide text-slate-400">{item.label}</div>
            <div className="mt-2 font-mono text-lg text-slate-700 dark:text-slate-100">
              {results ? results[item.value] : '--'}
            </div>
          </div>
        ))}
      </div>
    </ToolSection>
  )
}

export default BaseConverter
