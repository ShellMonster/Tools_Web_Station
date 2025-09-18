import { useTranslation } from '../../i18n/index.jsx'

const CategoryHeader = ({ name }) => {
  const { t } = useTranslation()
  return (
    <div className="mt-8 text-xs uppercase tracking-widest text-slate-500 dark:text-slate-400 first:mt-0">
      {t(name)}
    </div>
  )
}

const Sidebar = ({ groups, activeToolId, onSelect, filterText }) => {
  const { t, locale } = useTranslation()
  const normalizedFilter = filterText.trim().toLowerCase()

  return (
    <aside className="hidden h-full w-72 shrink-0 border-r border-slate-200 bg-white/80 px-6 py-6 backdrop-blur-sm dark:border-slate-800 dark:bg-slate-900/80 lg:flex lg:flex-col">
      <div className="text-lg font-semibold text-slate-900 dark:text-slate-100">{t('工具列表')}</div>
      <nav className="mt-6 flex-1 space-y-4 overflow-y-auto pr-2 text-sm">
        {groups.map(({ id, name, tools }) => {
          const filteredTools = tools.filter((tool) => {
            const label = locale === 'zh' ? tool.name : t(tool.name)
            return label.toLowerCase().includes(normalizedFilter)
          })

          if (!filteredTools.length && normalizedFilter) {
            return null
          }

          return (
            <div key={id}>
              <CategoryHeader name={name} />
              <ul className="mt-2 space-y-1">
                {filteredTools.map((tool) => {
                  const isActive = tool.id === activeToolId
                  const label = locale === 'zh' ? tool.name : t(tool.name)

                  return (
                    <li key={tool.id}>
                      <button
                        type="button"
                        onClick={() => onSelect(tool.id)}
                        className={`${
                          isActive
                            ? 'bg-primary/10 text-primary dark:bg-primary/20'
                            : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'
                        } w-full rounded-lg px-3 py-2 text-left transition`}
                      >
                        {label}
                      </button>
                    </li>
                  )
                })}
              </ul>
            </div>
          )
        })}
      </nav>
    </aside>
  )
}

export default Sidebar
