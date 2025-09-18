import { useEffect, useRef, useState } from 'react'
import Button from '../../components/common/Button.jsx'
import TextArea from '../../components/common/TextArea.jsx'
import ToolSection from '../../components/common/ToolSection.jsx'
import { useTranslation } from '../../i18n/index.jsx'

const defaultDiagram = `flowchart TD
  A[开始] --> B{条件}
  B -- 是 --> C[处理1]
  B -- 否 --> D[处理2]
  C --> E[结束]
  D --> E`

let mermaidModulePromise

const loadMermaid = async () => {
  if (!mermaidModulePromise) {
    mermaidModulePromise = import('mermaid/dist/mermaid.esm.mjs')
  }
  return mermaidModulePromise
}

const MermaidDiagram = () => {
  const [code, setCode] = useState(defaultDiagram)
  const [error, setError] = useState('')
  const containerRef = useRef(null)
  const { t } = useTranslation()

  useEffect(() => {
    let active = true
    const render = async () => {
      try {
        const mermaid = await loadMermaid()
        mermaid.default.initialize({ startOnLoad: false, theme: 'neutral' })
        const id = `mermaid-${Date.now()}`
        const { svg } = await mermaid.default.render(id, code)
        if (!active) return
        if (containerRef.current) {
          containerRef.current.innerHTML = svg
        }
        setError('')
      } catch (err) {
        setError(err.message)
      }
    }
    render()
    return () => {
      active = false
    }
  }, [code])

  return (
    <ToolSection
      title="思维导图 / 流程图"
      description="基于 Mermaid.js 语法渲染流程图、思维导图。"
      actions={
        <Button variant="secondary" onClick={() => setCode(defaultDiagram)}>
          {t('重置模板')}
        </Button>
      }
    >
      <TextArea
        value={code}
        onChange={(event) => setCode(event.target.value)}
        className="min-h-[200px] font-mono"
      />
      {error ? <p className="mt-2 text-sm text-red-500">{error}</p> : null}
      <div className="mt-6 overflow-x-auto rounded-lg border border-slate-200 bg-white/80 p-4 dark:border-slate-800 dark:bg-slate-900">
        <div ref={containerRef} />
      </div>
    </ToolSection>
  )
}

export default MermaidDiagram
