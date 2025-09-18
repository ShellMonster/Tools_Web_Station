import dayjs from 'dayjs'
import durationPlugin from 'dayjs/plugin/duration'
import relativeTimePlugin from 'dayjs/plugin/relativeTime'

dayjs.extend(durationPlugin)
dayjs.extend(relativeTimePlugin)

export function unixToDate(value, timezoneOffsetMinutes = 0) {
  const ts = Number(value)
  if (Number.isNaN(ts)) throw new Error('Invalid timestamp')
  const isMilliseconds = ts.toString().length === 13
  const date = isMilliseconds ? dayjs(ts) : dayjs.unix(ts)
  return date.add(timezoneOffsetMinutes, 'minute').format('YYYY-MM-DD HH:mm:ss')
}

export function dateToUnix(dateString) {
  const date = dayjs(dateString)
  if (!date.isValid()) throw new Error('Invalid date')
  return {
    seconds: date.unix(),
    milliseconds: date.valueOf(),
  }
}

export function formatDuration(seconds) {
  const d = dayjs.duration(seconds, 'seconds')
  return {
    humanize: d.humanize(),
    hours: d.hours(),
    minutes: d.minutes(),
    seconds: d.seconds(),
  }
}

export async function parseCronToText(expression) {
  const { default: cronstrue } = await import('cronstrue/dist/cronstrue-i18n.js')
  return cronstrue.toString(expression, { locale: 'zh_CN' })
}
