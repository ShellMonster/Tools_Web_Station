import { useState } from 'react'
import Button from '../../components/common/Button.jsx'
import Select from '../../components/common/Select.jsx'
import TextArea from '../../components/common/TextArea.jsx'
import ToolSection from '../../components/common/ToolSection.jsx'
import { copyToClipboard } from '../../utils/clipboard.js'
import { loremPresets } from '../../utils/constants.js'

const paragraphs = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ut nisl sed turpis facilisis commodo vitae vitae enim.',
  'Suspendisse potenti. Sed efficitur, urna sed porta ultricies, leo nunc pretium turpis, non dignissim mi urna in quam.',
  'Quisque vel mattis sapien. Donec non leo vitae elit congue luctus. Proin sit amet eros nec mi accumsan rutrum.',
  'Phasellus id lectus egestas, luctus odio at, iaculis mauris. Sed gravida, mauris non tristique dapibus, quam elit fermentum augue, vitae porttitor lectus quam id lacus.',
]

const buildLorem = (count) => {
  const result = []
  for (let i = 0; i < count; i += 1) {
    result.push(paragraphs[i % paragraphs.length])
  }
  return result.join('\n\n')
}

const LoremIpsum = () => {
  const [preset, setPreset] = useState('medium')
  const [output, setOutput] = useState('')

  const handleGenerate = () => {
    const count = loremPresets[preset] ?? 3
    setOutput(buildLorem(count))
  }

  return (
    <ToolSection
      title="占位符文本生成"
      description="快速生成英文 Lorem Ipsum 占位段落，可选长度。"
      actions={
        <div className="flex items-center gap-2">
          <Select value={preset} onChange={(event) => setPreset(event.target.value)} className="w-40">
            <option value="short">短段 (2)</option>
            <option value="medium">中等 (4)</option>
            <option value="long">长段 (6)</option>
          </Select>
          <Button onClick={handleGenerate}>生成</Button>
          <Button variant="secondary" onClick={() => setOutput('')}>
            清空
          </Button>
        </div>
      }
    >
      <TextArea value={output} readOnly className="min-h-[200px]" />
      <div className="mt-3">
        <Button variant="secondary" onClick={() => copyToClipboard(output)} disabled={!output}>
          复制
        </Button>
      </div>
    </ToolSection>
  )
}

export default LoremIpsum
