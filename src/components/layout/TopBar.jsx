import { useTranslation } from '../../i18n/index.jsx'

const TopBar = ({ onToggleSidebar, showSidebarButton, search, onSearchChange, children }) => {
  const { t } = useTranslation()

  return (
    <header className="flex items-center justify-between border-b border-slate-200 bg-white/80 px-4 py-3 backdrop-blur-sm dark:border-slate-800 dark:bg-slate-900/80">
      <div className="flex items-center gap-2">
        {showSidebarButton ? (
          <button
            type="button"
            className="lg:hidden rounded-md border border-slate-300 px-2 py-1 text-sm text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
            onClick={onToggleSidebar}
          >
            {t('菜单')}
          </button>
        ) : null}
        <input
          className="w-60 rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
          placeholder={t('搜索工具')}
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
        />
      </div>
      <div className="flex items-center gap-3">{children}</div>
    </header>
  )
}

export default TopBar
