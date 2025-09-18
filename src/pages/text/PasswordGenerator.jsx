import { useState } from 'react'
import Button from '../../components/common/Button.jsx'
import Input from '../../components/common/Input.jsx'
import ToolSection from '../../components/common/ToolSection.jsx'
import { copyToClipboard } from '../../utils/clipboard.js'
import { generatePassword } from '../../utils/random.js'

const PasswordGenerator = () => {
  const [length, setLength] = useState(16)
  const [useUpper, setUseUpper] = useState(true)
  const [useNumbers, setUseNumbers] = useState(true)
  const [useSymbols, setUseSymbols] = useState(true)
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleGenerate = () => {
    try {
      const result = generatePassword({ length, useUpper, useNumbers, useSymbols })
      setPassword(result)
      setError('')
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <ToolSection
      title="随机密码生成器"
      description="根据需求生成高强度密码，包含长度与字符类型选择。"
      actions={
        <Button onClick={handleGenerate}>
          生成密码
        </Button>
      }
    >
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="text-sm text-slate-500 dark:text-slate-300">密码长度</label>
          <Input
            type="number"
            min={4}
            max={128}
            value={length}
            onChange={(event) => setLength(Number(event.target.value))}
          />
        </div>
        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
            <input type="checkbox" checked={useUpper} onChange={(event) => setUseUpper(event.target.checked)} />
            大写字母
          </label>
          <label className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
            <input type="checkbox" checked={useNumbers} onChange={(event) => setUseNumbers(event.target.checked)} />
            数字
          </label>
          <label className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
            <input type="checkbox" checked={useSymbols} onChange={(event) => setUseSymbols(event.target.checked)} />
            符号
          </label>
        </div>
      </div>
      {error ? <p className="mt-3 text-sm text-red-500">{error}</p> : null}
      <div className="mt-4 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 font-mono text-lg tracking-wide dark:border-slate-800 dark:bg-slate-900">
        {password || '点击生成密码'}
      </div>
      <div className="mt-3 flex gap-2">
        <Button variant="secondary" onClick={() => copyToClipboard(password)} disabled={!password}>
          复制
        </Button>
        <Button variant="ghost" onClick={() => setPassword('')}>
          清空
        </Button>
      </div>
    </ToolSection>
  )
}

export default PasswordGenerator
