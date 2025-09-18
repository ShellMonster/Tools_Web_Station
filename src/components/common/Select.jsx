import { Children, cloneElement, isValidElement } from 'react'
import { useTranslation } from '../../i18n/index.jsx'

const baseSelectClass =
  'w-full appearance-none rounded-md border border-slate-200 bg-white px-3 py-2 pr-9 text-sm text-slate-700 shadow-sm transition focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200'

const Select = ({ className = '', children, ...props }) => {
  const { t } = useTranslation()
  const wrapperClass = className
    ? `relative inline-flex items-center ${className}`
    : 'relative inline-flex w-full items-center'

  const translatedChildren = Children.map(children, (child) => {
    if (typeof child === 'string') return t(child)
    if (isValidElement(child) && typeof child.props.children === 'string') {
      return cloneElement(child, {}, t(child.props.children))
    }
    return child
  })

  return (
    <div className={wrapperClass}>
      <select className={baseSelectClass} {...props}>
        {translatedChildren}
      </select>
      <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-500 dark:text-slate-400">
        ▼
      </span>
    </div>
  )
}

export default Select
