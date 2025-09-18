import { useMemo, useState } from 'react'
import Button from '../../components/common/Button.jsx'
import TextArea from '../../components/common/TextArea.jsx'
import ToolSection from '../../components/common/ToolSection.jsx'
import { textStatistics } from '../../utils/text.js'

const TextStatistics = () => {
  const [input, setInput] = useState('')
  const stats = useMemo(() => textStatistics(input), [input])

  return (
    <ToolSection
      title="文本统计"
      description="统计字数、行数与词频，支持中文/英文混合文本。"
      actions={
        <Button variant="secondary" onClick={() => setInput('')}>
          清空
        </Button>
      }
    >
      <TextArea
        placeholder="输入文本"
        value={input}
        onChange={(event) => setInput(event.target.value)}
        className="min-h-[200px]"
      />
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <div className="rounded-lg border border-slate-200 bg-white/80 p-4 text-center dark:border-slate-800 dark:bg-slate-900">
          <div className="text-xs uppercase tracking-wide text-slate-400">行数</div>
          <div className="mt-2 text-2xl font-semibold text-slate-700 dark:text-slate-100">{stats.lines}</div>
        </div>
        <div className="rounded-lg border border-slate-200 bg-white/80 p-4 text-center dark:border-slate-800 dark:bg-slate-900">
          <div className="text-xs uppercase tracking-wide text-slate-400">词数</div>
          <div className="mt-2 text-2xl font-semibold text-slate-700 dark:text-slate-100">{stats.words}</div>
        </div>
        <div className="rounded-lg border border-slate-200 bg-white/80 p-4 text-center dark:border-slate-800 dark:bg-slate-900">
          <div className="text-xs uppercase tracking-wide text-slate-400">字符数</div>
          <div className="mt-2 text-2xl font-semibold text-slate-700 dark:text-slate-100">{stats.characters}</div>
        </div>
      </div>
      <div className="mt-6">
        <h3 className="text-sm font-medium text-slate-600 dark:text-slate-300">词频统计</h3>
        <div className="mt-2 max-h-60 overflow-y-auto rounded-lg border border-slate-200 dark:border-slate-800">
          <table className="w-full text-sm">
            <thead className="bg-slate-100/70 text-left text-slate-600 dark:bg-slate-800/50 dark:text-slate-300">
              <tr>
                <th className="px-4 py-2">词语</th>
                <th className="px-4 py-2">频次</th>
              </tr>
            </thead>
            <tbody>
              {stats.frequency.length ? (
                stats.frequency.map((item) => (
                  <tr key={item.token}>
                    <td className="border-t border-slate-200 px-4 py-2 font-mono text-slate-600 dark:border-slate-800 dark:text-slate-200">{item.token}</td>
                    <td className="border-t border-slate-200 px-4 py-2 dark:border-slate-800">{item.count}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="px-4 py-3 text-slate-400" colSpan={2}>
                    暂无数据
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </ToolSection>
  )
}

export default TextStatistics
