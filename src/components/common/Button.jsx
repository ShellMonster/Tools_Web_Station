import { useTranslation } from '../../i18n/index.jsx'

const baseClass =
  'inline-flex items-center justify-center rounded-md border border-transparent px-3 py-2 text-sm font-medium transition focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 disabled:cursor-not-allowed disabled:opacity-50'

const variantStyles = {
  primary:
    'bg-primary text-white shadow-sm hover:bg-primary/90 focus-visible:ring-offset-1 dark:bg-primary dark:hover:bg-primary/90',
  secondary:
    'border-slate-300 bg-white text-slate-700 hover:bg-slate-100 focus-visible:ring-slate-400 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800',
  ghost:
    'border-transparent bg-transparent text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800',
}

const Button = ({ variant = 'primary', className = '', children, ...props }) => {
  const { t } = useTranslation()
  const content = typeof children === 'string' ? t(children) : children

  return (
    <button className={`${baseClass} ${variantStyles[variant]} ${className}`} {...props}>
      {content}
    </button>
  )
}

export default Button
