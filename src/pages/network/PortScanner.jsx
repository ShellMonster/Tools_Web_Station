import { useState } from 'react'
import Button from '../../components/common/Button.jsx'
import Input from '../../components/common/Input.jsx'
import ToolSection from '../../components/common/ToolSection.jsx'
import { simulatePortScan } from '../../utils/network.js'
import { useTranslation } from '../../i18n/index.jsx'

const PortScanner = () => {
  const [host, setHost] = useState('example.com')
  const [startPort, setStartPort] = useState(70)
  const [endPort, setEndPort] = useState(90)
  const [result, setResult] = useState(null)
  const { t } = useTranslation()

  const handleScan = () => {
    if (startPort > endPort) return
    const data = simulatePortScan({ host, startPort: Number(startPort), endPort: Number(endPort) })
    setResult(data)
  }

  return (
    <ToolSection
      title="端口扫描示例"
      description="仅用于前端演示的端口扫描效果，不进行真实网络访问。"
      actions={
        <Button variant="secondary" onClick={() => setResult(null)}>
          清空结果
        </Button>
      }
    >
      <div className="grid gap-4 md:grid-cols-3">
        <Input placeholder="目标主机" value={host} onChange={(event) => setHost(event.target.value)} />
        <Input
          type="number"
          value={startPort}
          onChange={(event) => setStartPort(Number(event.target.value))}
          min={1}
          max={65535}
        />
        <Input
          type="number"
          value={endPort}
          onChange={(event) => setEndPort(Number(event.target.value))}
          min={1}
          max={65535}
        />
      </div>
      <Button className="mt-4" onClick={handleScan}>
        生成示例扫描结果
      </Button>
      {result ? (
        <div className="mt-6">
          <p className="text-sm text-slate-500 dark:text-slate-300">
            {result.host} · {t('端口范围')} {result.range} · {t('生成时间')} {new Date(result.generatedAt).toLocaleString()}
          </p>
          <div className="mt-3 max-h-72 overflow-y-auto rounded-lg border border-slate-200 dark:border-slate-800">
            <table className="w-full text-sm">
              <thead className="bg-slate-100/70 text-left text-slate-600 dark:bg-slate-800/50 dark:text-slate-300">
                <tr>
                  <th className="px-4 py-2">{t('端口')}</th>
                  <th className="px-4 py-2">{t('状态')}</th>
                  <th className="px-4 py-2">{t('延迟 (ms)')}</th>
                </tr>
              </thead>
              <tbody>
                {result.results.map((item) => (
                  <tr key={item.port}>
                    <td className="border-t border-slate-200 px-4 py-2 dark:border-slate-800">{item.port}</td>
                    <td className="border-t border-slate-200 px-4 py-2 capitalize dark:border-slate-800">{item.status}</td>
                    <td className="border-t border-slate-200 px-4 py-2 dark:border-slate-800">{item.latency}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : null}
    </ToolSection>
  )
}

export default PortScanner
