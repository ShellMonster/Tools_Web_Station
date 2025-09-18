import { Suspense, useEffect, useState } from 'react'
import Sidebar from './components/layout/Sidebar.jsx'
import TopBar from './components/layout/TopBar.jsx'
import ThemeToggle from './components/common/ThemeToggle.jsx'
import MobileSidebar from './components/layout/MobileSidebar.jsx'
import { toolComponents, toolGroups } from './pages/toolRegistry.js'
import DelayedFallback from './components/common/DelayedFallback.jsx'
import Footer from './components/layout/Footer.jsx'
import LanguageToggle from './components/common/LanguageToggle.jsx'
import { useTranslation } from './i18n/index.jsx'

const defaultToolId = toolGroups[0]?.tools[0]?.id ?? ''

function App() {
  const { t } = useTranslation()
  const [activeToolId, setActiveToolId] = useState(defaultToolId)
  const [searchValue, setSearchValue] = useState('')
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window === 'undefined') return false
    return window.localStorage.getItem('theme') === 'dark'
  })
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)

  useEffect(() => {
    if (typeof document === 'undefined') return
    document.documentElement.classList.toggle('dark', isDarkMode)
    window.localStorage.setItem('theme', isDarkMode ? 'dark' : 'light')
  }, [isDarkMode])

  useEffect(() => {
    const storedTool = window.localStorage.getItem('active-tool')
    if (storedTool && toolComponents[storedTool]) {
      setActiveToolId(storedTool)
    }
  }, [])

  useEffect(() => {
    window.localStorage.setItem('active-tool', activeToolId)
  }, [activeToolId])

  const ActiveToolComponent = toolComponents[activeToolId]

  return (
    <div className={isDarkMode ? 'dark' : ''}>
      <div className="flex h-screen overflow-hidden bg-slate-100/60 text-slate-700 transition dark:bg-slate-950 dark:text-slate-200">
        <Sidebar
          groups={toolGroups}
          activeToolId={activeToolId}
          onSelect={setActiveToolId}
          filterText={searchValue}
        />
        <div className="flex h-full flex-1 flex-col overflow-hidden">
          <div className="shrink-0">
            <TopBar
              onToggleSidebar={() => setIsMobileSidebarOpen(true)}
              showSidebarButton
              search={searchValue}
              onSearchChange={setSearchValue}
            >
              <LanguageToggle />
              <ThemeToggle isDark={isDarkMode} onToggle={() => setIsDarkMode((prev) => !prev)} />
            </TopBar>
          </div>
          <main className="flex-1 overflow-y-auto">
            <div className="px-4 py-6 lg:px-10">
              <Suspense
                fallback={
                  <DelayedFallback>
                    <div className="flex h-40 items-center justify-center rounded-xl border border-dashed border-slate-300 bg-white/70 text-sm text-slate-500 dark:border-slate-700 dark:bg-slate-900/40">
                      {t('正在加载模块…')}
                    </div>
                  </DelayedFallback>
                }
              >
                {ActiveToolComponent ? (
                  <ActiveToolComponent />
                ) : (
                  <div className="rounded-xl border border-dashed border-slate-300 bg-white/70 p-8 text-center text-slate-500 dark:border-slate-700 dark:bg-slate-900/40">
                    {t('请选择左侧的一个工具开始使用。')}
                  </div>
                )}
              </Suspense>
            </div>
          </main>
          <div className="shrink-0">
            <Footer />
          </div>
        </div>
        {isMobileSidebarOpen ? (
          <MobileSidebar
            groups={toolGroups}
            activeToolId={activeToolId}
            filterText={searchValue}
            onSelect={setActiveToolId}
            onClose={() => setIsMobileSidebarOpen(false)}
          />
        ) : null}
      </div>
    </div>
  )
}

export default App
