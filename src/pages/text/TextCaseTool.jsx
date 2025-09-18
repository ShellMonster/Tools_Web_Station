import { useMemo, useState } from 'react'
import Button from '../../components/common/Button.jsx'
import Select from '../../components/common/Select.jsx'
import TextArea from '../../components/common/TextArea.jsx'
import ToolSection from '../../components/common/ToolSection.jsx'
import { copyToClipboard } from '../../utils/clipboard.js'
import { camelToPascal, toCamelCase, toKebabCase, toSnakeCase, toTitleCase } from '../../utils/text.js'

const transformations = {
  upper: {
    label: '大写',
    transform: (value) => value.toUpperCase(),
  },
  lower: {
    label: '小写',
    transform: (value) => value.toLowerCase(),
  },
  title: {
    label: '首字母大写',
    transform: toTitleCase,
  },
  camel: {
    label: '驼峰命名',
    transform: toCamelCase,
  },
  pascal: {
    label: '帕斯卡命名',
    transform: (value) => camelToPascal(toCamelCase(value)),
  },
  snake: {
    label: '下划线命名',
    transform: toSnakeCase,
  },
  kebab: {
    label: '短横线命名',
    transform: toKebabCase,
  },
}

const TextCaseTool = () => {
  const [input, setInput] = useState('')
  const [mode, setMode] = useState('upper')
  const [output, setOutput] = useState('')

  const currentLabel = useMemo(() => transformations[mode].label, [mode])

  const handleTransform = () => {
    const fn = transformations[mode].transform
    setOutput(fn(input))
  }

  return (
    <div className="space-y-6">
      <ToolSection
        title="大小写转换"
        description="支持常见命名风格之间的快速转换。"
        actions={
          <div className="flex flex-wrap items-center gap-2">
            <Select value={mode} onChange={(event) => setMode(event.target.value)} className="w-48">
              {Object.entries(transformations).map(([key, value]) => (
                <option key={key} value={key}>
                  {value.label}
                </option>
              ))}
            </Select>
            <Button onClick={handleTransform} disabled={!input.trim()}>
              转换
            </Button>
            <Button variant="secondary" onClick={() => { setInput(''); setOutput('') }}>
              清空
            </Button>
          </div>
        }
      >
        <TextArea
          placeholder="输入文本"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          className="min-h-[160px]"
        />
      </ToolSection>

      <ToolSection
        title={`${currentLabel} 结果`}
        actions={
          <Button variant="secondary" onClick={() => copyToClipboard(output)} disabled={!output}>
            复制
          </Button>
        }
      >
        <TextArea value={output} readOnly className="min-h-[160px]" />
      </ToolSection>
    </div>
  )
}

export default TextCaseTool
