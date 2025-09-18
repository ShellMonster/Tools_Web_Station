import { useTranslation } from '../../i18n/index.jsx'

const LanguageToggle = () => {
  const { locale, setLocale, t } = useTranslation()
  const nextLocale = locale === 'zh' ? 'en' : 'zh'

  const handleToggle = () => {
    setLocale(nextLocale)
  }

  const label = locale === 'zh' ? 'English' : '中文'

  return (
    <button
      type="button"
      onClick={handleToggle}
      className="rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
      aria-label={t('切换语言') || 'Switch language'}
    >
      {label}
    </button>
  )
}

export default LanguageToggle
