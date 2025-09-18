import { useTranslation } from '../../i18n/index.jsx'

const baseClass =
  'w-full min-h-[160px] rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 shadow-sm transition placeholder:text-slate-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200'

const TextArea = ({ className = '', placeholder, ...props }) => {
  const { t } = useTranslation()
  const translatedPlaceholder = typeof placeholder === 'string' ? t(placeholder) : placeholder

  return <textarea className={`${baseClass} ${className}`} placeholder={translatedPlaceholder} {...props} />
}

export default TextArea
