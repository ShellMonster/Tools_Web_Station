import { useEffect, useMemo, useRef, useState } from 'react'
import Button from '../../components/common/Button.jsx'
import Input from '../../components/common/Input.jsx'
import ToolSection from '../../components/common/ToolSection.jsx'
import { formatDuration } from '../../utils/time.js'
import { useTranslation } from '../../i18n/index.jsx'

const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`
}

const CountdownTimer = () => {
  const [minutes, setMinutes] = useState(1)
  const [seconds, setSeconds] = useState(0)
  const [remaining, setRemaining] = useState(0)
  const [running, setRunning] = useState(false)
  const intervalRef = useRef(null)
  const { t } = useTranslation()

  const totalSeconds = useMemo(() => minutes * 60 + seconds, [minutes, seconds])
  const progress = totalSeconds ? Math.max(0, Math.round(((totalSeconds - remaining) / totalSeconds) * 100)) : 0

  useEffect(() => {
    if (!running) return undefined
    intervalRef.current = setInterval(() => {
      setRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(intervalRef.current)
  }, [running])

  const handleStart = () => {
    if (!totalSeconds) return
    setRemaining(totalSeconds)
    setRunning(true)
  }

  const handlePause = () => {
    clearInterval(intervalRef.current)
    setRunning(false)
  }

  const handleReset = () => {
    clearInterval(intervalRef.current)
    setRunning(false)
    setRemaining(0)
  }

  const durationMeta = formatDuration(remaining)

  return (
    <ToolSection
      title="倒计时/定时器"
      description="设置倒计时提醒，支持开始、暂停与重置。"
      actions={
        <div className="flex gap-2">
          <Button onClick={handleStart} disabled={!totalSeconds}>
            开始
          </Button>
          <Button variant="secondary" onClick={handlePause} disabled={!running}>
            暂停
          </Button>
          <Button variant="ghost" onClick={handleReset}>
            重置
          </Button>
        </div>
      }
    >
      <div className="grid gap-4 md:grid-cols-3">
        <div>
          <label className="text-sm text-slate-500 dark:text-slate-300">{t('分钟')}</label>
          <Input
            type="number"
            min={0}
            value={minutes}
            onChange={(event) => setMinutes(Number(event.target.value))}
          />
        </div>
        <div>
          <label className="text-sm text-slate-500 dark:text-slate-300">{t('秒')}</label>
          <Input
            type="number"
            min={0}
            max={59}
            value={seconds}
            onChange={(event) => setSeconds(Number(event.target.value))}
          />
        </div>
        <div className="flex flex-col justify-end">
          <p className="text-sm text-slate-500 dark:text-slate-300">
            {t('总时长: ${total} 秒').replace('${total}', totalSeconds)}
          </p>
        </div>
      </div>
      <div className="mt-6 flex flex-col items-center gap-3">
        <div className="text-5xl font-bold tracking-wider text-slate-700 dark:text-slate-100">
          {formatTime(remaining)}
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
          <div className="h-full bg-primary transition-all" style={{ width: `${progress}%` }} />
        </div>
        <p className="text-sm text-slate-500 dark:text-slate-300">{durationMeta.humanize}</p>
      </div>
    </ToolSection>
  )
}

export default CountdownTimer
