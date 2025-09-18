import { useEffect, useMemo, useState } from 'react'
import Button from '../../components/common/Button.jsx'
import Input from '../../components/common/Input.jsx'
import Select from '../../components/common/Select.jsx'
import TextArea from '../../components/common/TextArea.jsx'
import ToolSection from '../../components/common/ToolSection.jsx'
import { copyToClipboard } from '../../utils/clipboard.js'
import { useTranslation } from '../../i18n/index.jsx'

const defaultFormByLocale = {
  zh: {
    name: '张三',
    title: '品牌营销经理',
    company: '星云互动科技有限公司',
    phone: '138-0000-0000',
    email: 'zhangsan@example.com',
    website: 'https://example.com',
    address: '上海市浦东新区世纪大道 100 号',
    tagline: '以创意点亮品牌未来',
  },
  en: {
    name: 'Alex Johnson',
    title: 'Brand Marketing Manager',
    company: 'Nebula Interactive Ltd.',
    phone: '+1 (415) 555-1234',
    email: 'alex.johnson@example.com',
    website: 'https://example.com',
    address: '100 Market Street, San Francisco, CA 94105',
    tagline: 'Lighting up brands with creativity',
  },
}

const getInitialForm = (locale) => ({
  ...defaultFormByLocale[locale] ?? defaultFormByLocale.zh,
})

const isFormEqual = (a, b) =>
  ['name', 'title', 'company', 'phone', 'email', 'website', 'address', 'tagline'].every(
    (key) => (a?.[key] || '') === (b?.[key] || ''),
  )

const templates = [
  {
    id: 'modern-blue',
    label: '现代蓝带',
    accent: '#2563eb',
    secondary: '#1e3a8a',
    background: '#f8fafc',
    border: '4px solid #2563eb',
    layout: 'left-border',
    labelColor: '#1e3a8a',
    valueColor: '#0f172a',
    taglineColor: '#1e3a8a',
  },
  {
    id: 'elegant-gold',
    label: '优雅金饰',
    accent: '#b45309',
    secondary: '#92400e',
    background: '#fffbeb',
    border: '2px solid #fcd34d',
    layout: 'top-border',
    labelColor: '#b45309',
    valueColor: '#7c2d12',
    taglineColor: '#92400e',
  },
  {
    id: 'minimal-dark',
    label: '极简黑白',
    accent: '#0f172a',
    secondary: '#334155',
    background: '#ffffff',
    border: '1px solid #1e293b',
    layout: 'inline',
    labelColor: '#334155',
    valueColor: '#111827',
    taglineColor: '#4b5563',
  },
  {
    id: 'split-card',
    label: '双色分栏',
    accent: '#0ea5e9',
    secondary: '#0369a1',
    background: '#ffffff',
    border: '1px solid #e2e8f0',
    layout: 'split-card',
    labelColor: '#0ea5e9',
    valueColor: '#0f172a',
    taglineColor: '#0f172a',
  },
  {
    id: 'badge-accent',
    label: '徽章红',
    accent: '#dc2626',
    secondary: '#991b1b',
    background: '#fff5f5',
    border: '1px solid #fecaca',
    layout: 'badge',
    labelColor: '#dc2626',
    valueColor: '#7f1d1d',
    taglineColor: '#9f1239',
  },
  {
    id: 'gradient-night',
    label: '霓虹夜光',
    accent: '#38bdf8',
    secondary: '#bae6fd',
    background: 'linear-gradient(135deg, #0f172a 0%, #1e3a8a 48%, #312e81 100%)',
    border: '1px solid rgba(148, 163, 184, 0.45)',
    layout: 'gradient',
    labelColor: '#38bdf8',
    valueColor: '#e2e8f0',
    taglineColor: 'rgba(226, 232, 240, 0.85)',
    linkColor: '#7dd3fc',
    taglineStyle: 'font-style:normal; letter-spacing:0.08em; text-transform:uppercase;',
    previewShadow: '0 22px 48px -24px rgba(56, 189, 248, 0.75)',
  },
  {
    id: 'inline-highlight',
    label: '柔合彩块',
    accent: '#f97316',
    secondary: '#fb923c',
    background: '#fffaf5',
    border: '1px solid #fed7aa',
    layout: 'inline-highlight',
    labelColor: '#f97316',
    valueColor: '#4b5563',
    taglineColor: '#fb923c',
    taglineStyle: 'font-style:normal;',
  },
]

const getInitials = (value = '') =>
  value
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join('') || 'ID'

const buildContactRow = (label, value, labelColor, valueColor, linkColor = valueColor) => {
  if (!value) return ''
  return `
    <tr>
      <td style=\"padding:2px 0; color:${labelColor}; font-weight:600; white-space:nowrap;\">${label}</td>
      <td style=\"padding:2px 0; color:${valueColor};\">
        ${value.startsWith('http') ? `<a href=\"${value}\" style=\"color:${linkColor}; text-decoration:none;\">${value}</a>` : value}
      </td>
    </tr>`
}

const renderSignatureHtml = (form, template, t) => {
  const fontFamily = `'Helvetica Neue', 'Segoe UI', Arial, sans-serif'`
  const descriptor = [form.title, form.company].filter(Boolean).join(' · ')
  const labelColor = template.labelColor ?? template.secondary ?? '#334155'
  const valueColor = template.valueColor ?? '#1f2937'
  const linkColor = template.linkColor ?? valueColor
  const taglineColor = template.taglineColor ?? template.secondary ?? valueColor
  const taglineStyle = template.taglineStyle ?? 'font-style:italic;'

  const contactRows = [
    buildContactRow(t('手机号'), form.phone, labelColor, valueColor, linkColor),
    buildContactRow(t('邮箱'), form.email, labelColor, valueColor, linkColor),
    buildContactRow(t('公司'), form.company, labelColor, valueColor, linkColor),
    buildContactRow(t('办公室地址'), form.address, labelColor, valueColor, linkColor),
    buildContactRow(t('网站'), form.website, labelColor, valueColor, linkColor),
  ]
    .filter(Boolean)
    .join('')

  const taglineRow = form.tagline
    ? `<tr><td colspan=\"2\" style=\"padding-top:12px; color:${taglineColor}; ${taglineStyle}\">${form.tagline}</td></tr>`
    : ''

  const buildContactTable = (withTagline = true, extraTableStyle = '') => {
    const content = `${contactRows}${withTagline ? taglineRow : ''}`
    if (!content) return ''
    return `<table cellpadding=\"0\" cellspacing=\"0\" style=\"border-collapse:collapse; ${extraTableStyle}\">${content}</table>`
  }

  const contactTableWithTagline = buildContactTable(true)
  const contactTableWithoutTagline = buildContactTable(false)

  if (template.layout === 'left-border') {
    return `
      <table cellpadding=\"0\" cellspacing=\"0\" style=\"font-family:${fontFamily}; color:${valueColor}; font-size:14px; border-collapse:collapse;\">
        <tr>
          <td style=\"padding:14px 20px; border-left:${template.border}; background:${template.background};\">
            <table cellpadding=\"0\" cellspacing=\"0\" style=\"border-collapse:collapse;\">
              <tr>
                <td style=\"font-size:20px; font-weight:700; color:${template.accent};\">${form.name || ''}</td>
              </tr>
              ${descriptor ? `<tr><td style=\"padding-top:4px; color:${template.secondary}; font-weight:600;\">${descriptor}</td></tr>` : ''}
              ${contactTableWithTagline ? `<tr><td style=\"padding-top:12px;\">${contactTableWithTagline}</td></tr>` : ''}
            </table>
          </td>
        </tr>
      </table>`
  }

  if (template.layout === 'top-border') {
    return `
      <table cellpadding=\"0\" cellspacing=\"0\" style=\"font-family:${fontFamily}; color:${valueColor}; font-size:14px; border-collapse:collapse; border:${template.border}; background:${template.background};\">
        <tr>
          <td style=\"padding:18px 26px;\">
            <div style=\"font-size:22px; color:${template.secondary}; font-weight:700;\">${form.name || ''}</div>
            ${descriptor ? `<div style=\"margin-top:4px; font-size:15px; color:${template.accent}; font-weight:600;\">${descriptor}</div>` : ''}
            ${contactTableWithTagline ? `<div style=\"margin-top:18px;\">${contactTableWithTagline}</div>` : ''}
          </td>
        </tr>
      </table>`
  }

  if (template.layout === 'split-card') {
    const initials = getInitials(form.name || form.company)
    const leftTagline = form.tagline
      ? `<div style=\"margin-top:16px; font-size:12px; line-height:1.6; opacity:0.85;\">${form.tagline}</div>`
      : ''

    return `
      <table cellpadding=\"0\" cellspacing=\"0\" style=\"font-family:${fontFamily}; font-size:14px; border-collapse:collapse; border:${template.border}; background:${template.background};\">
        <tr>
          <td style=\"background:${template.accent}; color:#ffffff; padding:24px 20px; text-align:center; width:120px;\">
            <div style=\"font-size:30px; font-weight:700; letter-spacing:1px;\">${initials}</div>
            ${form.company ? `<div style=\"margin-top:10px; font-size:13px; font-weight:600;\">${form.company}</div>` : ''}
            ${leftTagline}
          </td>
          <td style=\"padding:22px 28px; color:${valueColor};\">
            <div style=\"font-size:20px; font-weight:700; color:${template.accent};\">${form.name || ''}</div>
            ${form.title ? `<div style=\"margin-top:4px; color:${template.secondary}; font-weight:500;\">${form.title}</div>` : ''}
            ${contactTableWithoutTagline ? `<div style=\"margin-top:16px;\">${contactTableWithoutTagline}</div>` : ''}
          </td>
        </tr>
      </table>`
  }

  if (template.layout === 'badge') {
    const initials = getInitials(form.name)
    const contactBlock = buildContactTable(true)

    return `
      <table cellpadding=\"0\" cellspacing=\"0\" style=\"font-family:${fontFamily}; color:${valueColor}; font-size:14px; border-collapse:collapse; border:${template.border}; background:${template.background};\">
        <tr>
          <td style=\"padding:20px 26px;\">
            <div style=\"display:flex; align-items:center; gap:16px;\">
              <span style=\"display:inline-flex; align-items:center; justify-content:center; padding:10px 16px; border-radius:999px; background:${template.accent}; color:#ffffff; font-weight:700; letter-spacing:1px;\">${initials}</span>
              <div>
                <div style=\"font-size:20px; font-weight:700; color:${template.secondary};\">${form.name || ''}</div>
                ${descriptor ? `<div style=\"margin-top:4px; color:${template.valueColor}; font-size:14px;\">${descriptor}</div>` : ''}
              </div>
            </div>
            ${contactBlock ? `<div style=\"margin-top:18px;\">${contactBlock}</div>` : ''}
          </td>
        </tr>
      </table>`
  }

  if (template.layout === 'gradient') {
    const gradientContacts = buildContactTable(true, `color:${valueColor};`)

    return `
      <table cellpadding=\"0\" cellspacing=\"0\" style=\"font-family:${fontFamily}; color:${valueColor}; font-size:14px; border-collapse:collapse; border:${template.border}; background:${template.background};\">
        <tr>
          <td style=\"padding:24px 32px;\">
            <div style=\"font-size:24px; font-weight:700; color:${template.secondary};\">${form.name || ''}</div>
            ${descriptor ? `<div style=\"margin-top:8px; color:${template.labelColor}; font-size:12px; letter-spacing:0.08em; text-transform:uppercase;\">${descriptor}</div>` : ''}
            ${gradientContacts ? `<div style=\"margin-top:22px;\">${gradientContacts}</div>` : ''}
          </td>
        </tr>
      </table>`
  }

  if (template.layout === 'inline-highlight') {
    const contactBlock = buildContactTable(true)

    return `
      <table cellpadding=\"0\" cellspacing=\"0\" style=\"font-family:${fontFamily}; color:${valueColor}; font-size:14px; border-collapse:collapse; border:${template.border}; background:${template.background};\">
        <tr>
          <td style=\"padding:20px 26px;\">
            <div style=\"display:inline-flex; align-items:center; gap:10px; background:${template.accent}; color:#ffffff; padding:6px 16px; border-radius:999px; font-weight:600;\">
              <span>${form.name || ''}</span>
            </div>
            ${descriptor ? `<div style=\"margin-top:10px; color:${template.secondary}; font-weight:500;\">${descriptor}</div>` : ''}
            ${contactBlock ? `<div style=\"margin-top:18px;\">${contactBlock}</div>` : ''}
          </td>
        </tr>
      </table>`
  }

  const contactBlock = buildContactTable(true)

  return `
    <table cellpadding=\"0\" cellspacing=\"0\" style=\"font-family:${fontFamily}; color:${valueColor}; font-size:14px; border-collapse:collapse;\">
      <tr>
        <td style=\"padding:6px 0; border-bottom:${template.border};\">
          <span style=\"font-size:20px; font-weight:700; color:${template.accent};\">${form.name || ''}</span>
          ${descriptor ? `<span style=\"margin-left:12px; color:${template.secondary}; font-weight:500;\">${descriptor}</span>` : ''}
        </td>
      </tr>
      ${contactBlock ? `<tr><td style=\"padding-top:12px;\">${contactBlock}</td></tr>` : ''}
    </table>`
}

const buildPlainText = (form, t) =>
  [
    `${form.name || ''} | ${form.title || ''}`.trim(),
    form.company,
    form.phone ? `${t('手机号')}: ${form.phone}` : '',
    form.email ? `${t('邮箱')}: ${form.email}` : '',
    form.website ? `${t('网站')}: ${form.website}` : '',
    form.address ? `${t('办公室地址')}: ${form.address}` : '',
    form.tagline ? `—— ${form.tagline}` : '',
  ]
    .filter(Boolean)
    .join('\n')

const EmailSignatureGenerator = () => {
  const { t, locale } = useTranslation()
  const [form, setForm] = useState(() => getInitialForm(locale))
  const [templateId, setTemplateId] = useState(templates[0].id)
  const [copiedType, setCopiedType] = useState('')

  const activeTemplate = useMemo(
    () => templates.find((item) => item.id === templateId) ?? templates[0],
    [templateId],
  )

  const htmlSignature = useMemo(() => renderSignatureHtml(form, activeTemplate, t), [form, activeTemplate, t])
  const plainSignature = useMemo(() => buildPlainText(form, t), [form, t])

  const previewStyle = useMemo(() => {
    const style = {}
    if (activeTemplate.previewBackground || activeTemplate.background) {
      style.background = activeTemplate.previewBackground ?? activeTemplate.background
    }
    if (activeTemplate.wrapperBorder) {
      style.border = activeTemplate.wrapperBorder
    }
    if (activeTemplate.previewShadow) {
      style.boxShadow = activeTemplate.previewShadow
    }
    return style
  }, [activeTemplate])

  useEffect(() => {
    setForm((previous) => {
      if (
        isFormEqual(previous, defaultFormByLocale.zh) ||
        isFormEqual(previous, defaultFormByLocale.en)
      ) {
        return getInitialForm(locale)
      }
      return previous
    })
  }, [locale])

  const handleCopy = async (type) => {
    const value = type === 'html' ? htmlSignature : plainSignature
    if (!value) return
    const success = await copyToClipboard(value)
    if (success) {
      setCopiedType(type)
      setTimeout(() => setCopiedType(''), 1500)
    }
  }

  const handleReset = () => {
    setForm(getInitialForm(locale))
    setCopiedType('')
  }

  return (
    <div className="space-y-6">
      <ToolSection
        title="邮箱签名生成"
        description="填写个人与公司信息，选择模板即可生成精美邮箱签名。"
        actions={
          <Button variant="secondary" onClick={handleReset}>
            恢复示例
          </Button>
        }
      >
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="text-sm text-slate-500 dark:text-slate-300">{t('姓名')}</label>
            <Input value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} />
          </div>
          <div>
            <label className="text-sm text-slate-500 dark:text-slate-300">{t('职位')}</label>
            <Input value={form.title} onChange={(event) => setForm({ ...form, title: event.target.value })} />
          </div>
          <div>
            <label className="text-sm text-slate-500 dark:text-slate-300">{t('公司')}</label>
            <Input value={form.company} onChange={(event) => setForm({ ...form, company: event.target.value })} />
          </div>
          <div>
            <label className="text-sm text-slate-500 dark:text-slate-300">{t('手机号')}</label>
            <Input value={form.phone} onChange={(event) => setForm({ ...form, phone: event.target.value })} />
          </div>
          <div>
            <label className="text-sm text-slate-500 dark:text-slate-300">{t('邮箱')}</label>
            <Input type="email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} />
          </div>
          <div>
            <label className="text-sm text-slate-500 dark:text-slate-300">{t('网站')}</label>
            <Input value={form.website} onChange={(event) => setForm({ ...form, website: event.target.value })} />
          </div>
          <div className="md:col-span-2">
            <label className="text-sm text-slate-500 dark:text-slate-300">{t('办公室地址')}</label>
            <Input value={form.address} onChange={(event) => setForm({ ...form, address: event.target.value })} />
          </div>
          <div className="md:col-span-2">
            <label className="text-sm text-slate-500 dark:text-slate-300">{t('宣传语 / 签名寄语')}</label>
            <TextArea
              className="min-h-[88px]"
              value={form.tagline}
              onChange={(event) => setForm({ ...form, tagline: event.target.value })}
            />
          </div>
        </div>
        <div className="mt-4 flex flex-col gap-3 md:flex-row md:items-center">
          <span className="text-sm text-slate-500 dark:text-slate-300">{t('模板风格')}</span>
          <Select
            value={templateId}
            onChange={(event) => setTemplateId(event.target.value)}
            className="w-full md:w-64"
          >
            {templates.map((item) => (
              <option key={item.id} value={item.id}>
                {t(item.label)}
              </option>
            ))}
          </Select>
        </div>
      </ToolSection>

      <ToolSection
        title="签名预览"
        description="复制 HTML 嵌入邮箱设置，或复制纯文本用于 IM 签名。"
        actions={
          <div className="flex flex-wrap items-center gap-2">
            <Button onClick={() => handleCopy('html')}>
              {copiedType === 'html' ? '已复制 HTML' : '复制 HTML'}
            </Button>
            <Button variant="secondary" onClick={() => handleCopy('plain')}>
              {copiedType === 'plain' ? '已复制文本' : '复制纯文本'}
            </Button>
          </div>
        }
      >
        <div className="rounded-2xl border border-slate-200 p-6 shadow-sm dark:border-slate-800" style={previewStyle}>
          <div dangerouslySetInnerHTML={{ __html: htmlSignature }} />
        </div>
        <div className="mt-6">
          <label className="text-sm text-slate-500 dark:text-slate-300">{t('HTML 代码')}</label>
          <TextArea value={htmlSignature} readOnly className="mt-2 h-48 font-mono" />
        </div>
        <div className="mt-4">
          <label className="text-sm text-slate-500 dark:text-slate-300">{t('纯文本')}</label>
          <TextArea value={plainSignature} readOnly className="mt-2 h-32 font-mono" />
        </div>
      </ToolSection>
    </div>
  )
}

export default EmailSignatureGenerator
