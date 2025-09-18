import { useTranslation } from '../../i18n/index.jsx'

const ThemeToggle = ({ isDark, onToggle }) => {
  const { t } = useTranslation()

  return (
    <button
      type="button"
      className="flex items-center gap-1 rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
      onClick={onToggle}
    >
      <span>{isDark ? '🌙' : '☀️'}</span>
      <span>{isDark ? t('暗色') : t('亮色')}</span>
    </button>
  )
}

export default ThemeToggle
