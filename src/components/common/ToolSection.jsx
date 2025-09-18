import { useTranslation } from '../../i18n/index.jsx'

const ToolSection = ({ title, description, actions, children }) => {
  const { t } = useTranslation()
  const translatedTitle = typeof title === 'string' ? t(title) : title
  const translatedDescription = typeof description === 'string' ? t(description) : description

  return (
    <section className="mb-8 rounded-2xl border border-slate-200 bg-white/70 p-6 shadow-sm backdrop-blur-sm transition dark:border-slate-800 dark:bg-slate-900/60">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">{translatedTitle}</h2>
          {translatedDescription ? (
            <p className="mt-1 max-w-3xl text-sm text-slate-500 dark:text-slate-400">{translatedDescription}</p>
          ) : null}
        </div>
        {actions ? <div className="flex flex-wrap items-center gap-2">{actions}</div> : null}
      </div>
      <div className="mt-4">{children}</div>
    </section>
  )
}

export default ToolSection
