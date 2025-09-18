import { useState } from 'react'
import Button from '../../components/common/Button.jsx'
import Input from '../../components/common/Input.jsx'
import TextArea from '../../components/common/TextArea.jsx'
import ToolSection from '../../components/common/ToolSection.jsx'
import { randomInt } from '../../utils/random.js'

const RandomTool = () => {
  const [min, setMin] = useState(1)
  const [max, setMax] = useState(100)
  const [numberResult, setNumberResult] = useState(null)
  const [diceResult, setDiceResult] = useState(null)
  const [options, setOptions] = useState('A\nB\nC')
  const [drawResult, setDrawResult] = useState('')

  const handleNumber = () => {
    const parsedMin = Number(min)
    const parsedMax = Number(max)
    if (parsedMin > parsedMax) return
    setNumberResult(randomInt(parsedMin, parsedMax))
  }

  const handleDice = () => {
    setDiceResult(randomInt(1, 6))
  }

  const handleDraw = () => {
    const list = options
      .split(/\r?\n/)
      .map((item) => item.trim())
      .filter(Boolean)
    if (!list.length) return
    const index = randomInt(0, list.length - 1)
    setDrawResult(list[index])
  }

  return (
    <div className="space-y-6">
      <ToolSection title="随机数">
        <div className="flex flex-wrap items-end gap-3">
          <div>
            <label className="text-sm text-slate-500 dark:text-slate-300">最小值</label>
            <Input type="number" value={min} onChange={(event) => setMin(event.target.value)} className="w-32" />
          </div>
          <div>
            <label className="text-sm text-slate-500 dark:text-slate-300">最大值</label>
            <Input type="number" value={max} onChange={(event) => setMax(event.target.value)} className="w-32" />
          </div>
          <Button onClick={handleNumber}>生成</Button>
        </div>
        {numberResult !== null ? (
          <div className="mt-3 text-3xl font-bold text-primary">{numberResult}</div>
        ) : null}
      </ToolSection>

      <ToolSection title="骰子">
        <Button onClick={handleDice}>掷骰子</Button>
        {diceResult !== null ? <div className="mt-3 text-4xl font-bold">🎲 {diceResult}</div> : null}
      </ToolSection>

      <ToolSection title="随机抽签">
        <TextArea value={options} onChange={(event) => setOptions(event.target.value)} className="min-h-[140px]" placeholder="每行一项" />
        <Button className="mt-3" onClick={handleDraw}>
          抽取
        </Button>
        {drawResult ? (
          <div className="mt-3 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-lg font-semibold text-slate-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100">
            {drawResult}
          </div>
        ) : null}
      </ToolSection>
    </div>
  )
}

export default RandomTool
