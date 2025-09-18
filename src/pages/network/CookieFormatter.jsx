import { useState } from 'react'
import Button from '../../components/common/Button.jsx'
import TextArea from '../../components/common/TextArea.jsx'
import ToolSection from '../../components/common/ToolSection.jsx'
import { parseCookies } from '../../utils/network.js'
import { useTranslation } from '../../i18n/index.jsx'

const CookieFormatter = () => {
  const [input, setInput] = useState('')
  const [pairs, setPairs] = useState([])
  const { t } = useTranslation()

  const handleParse = () => {
    setPairs(parseCookies(input))
  }

  return (
    <ToolSection
      title="Cookie 格式化"
      description="解析 document.cookie 字符串为可视化键值对。"
      actions={
        <div className="flex gap-2">
          <Button onClick={handleParse} disabled={!input.trim()}>
            格式化
          </Button>
          <Button variant="secondary" onClick={() => { setInput(''); setPairs([]) }}>
            清空
          </Button>
        </div>
      }
    >
      <TextArea
        placeholder="粘贴 Cookie 字符串"
        value={input}
        onChange={(event) => setInput(event.target.value)}
        className="min-h-[160px] font-mono"
      />
      <div className="mt-4 space-y-2">
        {pairs.length ? (
          pairs.map((pair, index) => (
            <div
              key={`${pair.key}-${index}`}
              className="flex items-start justify-between rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm dark:border-slate-800 dark:bg-slate-900"
            >
              <div>
                <div className="font-medium text-slate-600 dark:text-slate-200">{pair.key}</div>
                <div className="mt-1 text-slate-500 dark:text-slate-300 break-all">{pair.value}</div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-sm text-slate-400">{t('暂无 Cookie 数据')}</p>
        )}
      </div>
    </ToolSection>
  )
}

export default CookieFormatter
