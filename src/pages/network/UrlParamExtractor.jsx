import { useState } from 'react'
import Button from '../../components/common/Button.jsx'
import Input from '../../components/common/Input.jsx'
import ToolSection from '../../components/common/ToolSection.jsx'
import { extractUrlParams } from '../../utils/network.js'
import { useTranslation } from '../../i18n/index.jsx'

const UrlParamExtractor = () => {
  const [url, setUrl] = useState('')
  const [params, setParams] = useState([])
  const { t } = useTranslation()

  const handleExtract = () => {
    setParams(extractUrlParams(url))
  }

  return (
    <ToolSection
      title="URL 参数提取"
      description="解析 URL 中的查询参数，快速查看键值对。"
      actions={
        <div className="flex items-center gap-2">
          <Button onClick={handleExtract} disabled={!url.trim()}>
            提取参数
          </Button>
          <Button variant="secondary" onClick={() => { setUrl(''); setParams([]) }}>
            清空
          </Button>
        </div>
      }
    >
      <Input
        placeholder="输入 URL"
        value={url}
        onChange={(event) => setUrl(event.target.value)}
      />
      <div className="mt-4 overflow-hidden rounded-lg border border-slate-200 dark:border-slate-800">
        <table className="w-full text-sm">
          <thead className="bg-slate-100/70 text-left text-slate-600 dark:bg-slate-800/50 dark:text-slate-300">
            <tr>
              <th className="px-4 py-2">{t('参数名')}</th>
              <th className="px-4 py-2">{t('值')}</th>
            </tr>
          </thead>
          <tbody>
            {params.length ? (
              params.map((item, index) => (
                <tr key={`${item.key}-${index}`}>
                  <td className="border-t border-slate-200 px-4 py-2 dark:border-slate-800">{item.key}</td>
                  <td className="border-t border-slate-200 px-4 py-2 dark:border-slate-800">{item.value}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="px-4 py-3 text-slate-400" colSpan={2}>
                  {t('暂无参数')}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </ToolSection>
  )
}

export default UrlParamExtractor
