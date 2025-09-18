import { useEffect, useMemo, useState } from 'react'
import Button from '../../components/common/Button.jsx'
import TextArea from '../../components/common/TextArea.jsx'
import ToolSection from '../../components/common/ToolSection.jsx'
import dayjs from 'dayjs'

const buildCalendar = (reference) => {
  const start = reference.startOf('month')
  const end = reference.endOf('month')
  const days = []
  const startWeekday = start.day()
  for (let i = 0; i < startWeekday; i += 1) {
    days.push(null)
  }
  for (let d = 1; d <= end.date(); d += 1) {
    days.push(start.date(d))
  }
  return days
}

const CalendarNotes = () => {
  const [current, setCurrent] = useState(dayjs())
  const [notes, setNotes] = useState('')

  useEffect(() => {
    const stored = window.localStorage.getItem('tool-notes')
    if (stored) setNotes(stored)
  }, [])

  useEffect(() => {
    window.localStorage.setItem('tool-notes', notes)
  }, [notes])

  const days = useMemo(() => buildCalendar(current), [current])
  const today = dayjs()

  return (
    <div className="space-y-6">
      <ToolSection
        title="月份日历"
        description="快速查看当月日历，支持切换月份。"
        actions={
          <div className="flex gap-2">
            <Button variant="secondary" onClick={() => setCurrent(current.subtract(1, 'month'))}>
              上个月
            </Button>
            <Button variant="secondary" onClick={() => setCurrent(current.add(1, 'month'))}>
              下个月
            </Button>
            <Button onClick={() => setCurrent(dayjs())}>回到今天</Button>
          </div>
        }
      >
        <div className="text-lg font-semibold text-slate-700 dark:text-slate-100">
          {current.format('YYYY 年 MMMM')}
        </div>
        <div className="mt-4 grid grid-cols-7 gap-2 text-center text-sm text-slate-500">
          {['日', '一', '二', '三', '四', '五', '六'].map((label) => (
            <div key={label} className="font-medium">
              {label}
            </div>
          ))}
          {days.map((day, index) => (
            <div
              key={index}
              className={`rounded-lg border px-2 py-3 text-sm ${
                day && day.isSame(today, 'day')
                  ? 'border-primary bg-primary/10 font-semibold text-primary'
                  : 'border-slate-200 dark:border-slate-800'
              } ${!day ? 'bg-transparent border-none' : 'bg-white dark:bg-slate-900'}`}
            >
              {day ? day.date() : ''}
            </div>
          ))}
        </div>
      </ToolSection>

      <ToolSection
        title="记事本"
        description="简单的本地记事本，自动保存到浏览器本地。"
        actions={
          <Button variant="secondary" onClick={() => setNotes('')}>
            清空
          </Button>
        }
      >
        <TextArea
          value={notes}
          onChange={(event) => setNotes(event.target.value)}
          className="min-h-[200px]"
          placeholder="记录待办、灵感或备忘"
        />
      </ToolSection>
    </div>
  )
}

export default CalendarNotes
