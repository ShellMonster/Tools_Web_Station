import { useTranslation } from '../../i18n/index.jsx'

const MobileSidebar = ({ groups, activeToolId, onSelect, filterText, onClose }) => {
  const { t, locale } = useTranslation()
  const normalizedFilter = filterText.trim().toLowerCase()

  return (
    <div className="fixed inset-0 z-40 flex lg:hidden">
      <div
        className="fixed inset-0 bg-slate-900/60"
        onClick={onClose}
        aria-hidden="true"
      />
      <div className="relative ml-auto h-full w-80 overflow-y-auto border-l border-slate-200 bg-white px-6 py-6 dark:border-slate-800 dark:bg-slate-900">
        <button
          type="button"
          onClick={onClose}
          className="mb-4 w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
        >
          {t('关闭')}
        </button>
        <div className="text-lg font-semibold text-slate-900 dark:text-slate-100">{t('工具列表')}</div>
        <nav className="mt-4 space-y-4 text-sm">
          {groups.map(({ id, name, tools }) => {
            const filteredTools = tools.filter((tool) => {
              const label = locale === 'zh' ? tool.name : t(tool.name)
              return label.toLowerCase().includes(normalizedFilter)
            })

            if (!filteredTools.length && filterText) return null

            return (
              <div key={id}>
                <div className="text-xs uppercase tracking-widest text-slate-500 dark:text-slate-400">
                  {t(name)}
                </div>
                <ul className="mt-2 space-y-1">
                  {filteredTools.map((tool) => (
                    <li key={tool.id}>
                      <button
                        type="button"
                        onClick={() => {
                          onSelect(tool.id)
                          onClose()
                        }}
                        className={`${
                          tool.id === activeToolId
                            ? 'bg-primary/10 text-primary dark:bg-primary/20'
                            : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'
                        } w-full rounded-lg px-3 py-2 text-left transition`}
                      >
                        {locale === 'zh' ? tool.name : t(tool.name)}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </nav>
      </div>
    </div>
  )
}

export default MobileSidebar
