import dayjs from 'dayjs'

const configModules = import.meta.glob('../../config/siteConfig.{js,ts}', { eager: true })
const configModule = Object.values(configModules)[0] || null
const siteConfig = configModule?.siteConfig ?? configModule?.default ?? null

const currentYear = dayjs().year()

const Footer = () => {
  if (!siteConfig) return null

  const copyright = siteConfig?.copyright ?? {}
  const icp = siteConfig?.icp ?? {}

  const hasOwner = Boolean(copyright.owner)
  const hasIcp = Boolean(icp.number)

  if (!hasOwner && !hasIcp) return null

  const startYear = Number(copyright.startYear)
  const showYearRange = hasOwner && Number.isFinite(startYear) && startYear < currentYear

  return (
    <footer className="border-t border-slate-200 bg-white/70 px-4 py-4 text-xs text-slate-500 shadow-sm backdrop-blur dark:border-slate-800 dark:bg-slate-900/60 lg:px-10">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        {hasOwner ? (
          <span>
            © {showYearRange ? `${startYear}—${currentYear}` : currentYear} {copyright.owner}
          </span>
        ) : (
          <span />
        )}
        {hasIcp ? (
          <a
            className="text-slate-600 underline decoration-dotted transition hover:text-primary dark:text-slate-300"
            href={icp.url || 'https://beian.miit.gov.cn/'}
            target="_blank"
            rel="noreferrer"
          >
            {icp.number}
          </a>
        ) : null}
      </div>
    </footer>
  )
}

export default Footer
