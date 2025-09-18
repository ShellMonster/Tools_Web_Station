import { useState } from 'react'
import Button from '../../components/common/Button.jsx'
import Input from '../../components/common/Input.jsx'
import ToolSection from '../../components/common/ToolSection.jsx'
import { unixToDate, dateToUnix } from '../../utils/time.js'
import { useTranslation } from '../../i18n/index.jsx'

const UnixTimeConverter = () => {
  const [timestamp, setTimestamp] = useState('')
  const [dateTime, setDateTime] = useState('')
  const [offset, setOffset] = useState(8)
  const [error, setError] = useState('')
  const { t } = useTranslation()

  const handleTimestampToDate = () => {
    try {
      const result = unixToDate(timestamp, offset * 60)
      setDateTime(result)
      setError('')
    } catch (err) {
      setError(err.message)
    }
  }

  const handleDateToTimestamp = () => {
    try {
      const result = dateToUnix(dateTime)
      setTimestamp(String(result.milliseconds))
      setError('')
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <ToolSection
      title="Unix 时间戳转换"
      description="在 Unix 时间戳与日期时间格式之间来回转换。"
      actions={
        <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-300">
          <span>{t('时区偏移 (小时)')}</span>
          <Input
            type="number"
            className="w-24"
            value={offset}
            onChange={(event) => setOffset(Number(event.target.value))}
          />
        </div>
      }
    >
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="text-sm text-slate-500 dark:text-slate-300">{t('Unix 时间戳 (秒/毫秒)')}</label>
          <Input value={timestamp} onChange={(event) => setTimestamp(event.target.value)} placeholder="例如 1700000000" />
          <Button className="mt-2" onClick={handleTimestampToDate} disabled={!timestamp.trim()}>
            转换为日期
          </Button>
        </div>
        <div>
          <label className="text-sm text-slate-500 dark:text-slate-300">{t('日期时间')}</label>
          <Input
            type="datetime-local"
            value={dateTime}
            onChange={(event) => setDateTime(event.target.value)}
          />
          <Button className="mt-2" onClick={handleDateToTimestamp} disabled={!dateTime}>
            转换为时间戳
          </Button>
        </div>
      </div>
      {error ? <p className="mt-3 text-sm text-red-500">{t(error)}</p> : null}
    </ToolSection>
  )
}

export default UnixTimeConverter
