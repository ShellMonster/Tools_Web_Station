import { useMemo, useState } from 'react'
import Input from '../../components/common/Input.jsx'
import ToolSection from '../../components/common/ToolSection.jsx'
import { QRCodeCanvas } from 'qrcode.react'

const buildVCard = ({ name, phone, email, company, title }) => `BEGIN:VCARD\nVERSION:3.0\nFN:${name}\n${company ? `ORG:${company}\n` : ''}${title ? `TITLE:${title}\n` : ''}${phone ? `TEL;TYPE=CELL:${phone}\n` : ''}${email ? `EMAIL:${email}\n` : ''}END:VCARD`

const VCardGenerator = () => {
  const [form, setForm] = useState({ name: '张三', phone: '13800000000', email: 'demo@example.com', company: '示例公司', title: '前端开发' })

  const vcard = useMemo(() => buildVCard(form), [form])

  const handleChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  return (
    <ToolSection
      title="二维码名片生成"
      description="填写基本信息，生成 vCard 二维码。"
    >
      <div className="grid gap-4 md:grid-cols-2">
        <Input value={form.name} onChange={(event) => handleChange('name', event.target.value)} placeholder="姓名" />
        <Input value={form.phone} onChange={(event) => handleChange('phone', event.target.value)} placeholder="电话" />
        <Input value={form.email} onChange={(event) => handleChange('email', event.target.value)} placeholder="邮箱" />
        <Input value={form.company} onChange={(event) => handleChange('company', event.target.value)} placeholder="公司" />
        <Input value={form.title} onChange={(event) => handleChange('title', event.target.value)} placeholder="职位" />
      </div>
      <div className="mt-6 flex flex-col items-start gap-4 md:flex-row md:items-center">
        <div className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
          <QRCodeCanvas value={vcard} size={180} level="H" />
        </div>
        <textarea
          className="h-40 w-full rounded-md border border-slate-200 bg-white p-3 text-sm font-mono dark:border-slate-800 dark:bg-slate-900"
          value={vcard}
          readOnly
        />
      </div>
    </ToolSection>
  )
}

export default VCardGenerator
