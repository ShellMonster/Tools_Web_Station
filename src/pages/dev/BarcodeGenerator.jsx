import { useEffect, useRef, useState } from 'react'
import Button from '../../components/common/Button.jsx'
import Input from '../../components/common/Input.jsx'
import ToolSection from '../../components/common/ToolSection.jsx'
import JsBarcode from 'jsbarcode'

const BarcodeGenerator = () => {
  const [value, setValue] = useState('9787300000000')
  const svgRef = useRef(null)

  useEffect(() => {
    if (!svgRef.current) return
    try {
      JsBarcode(svgRef.current, value || ' ', {
        format: 'CODE128',
        lineColor: '#2563eb',
        width: 2,
        height: 80,
        displayValue: true,
      })
    } catch (error) {
      // ignore invalid input
    }
  }, [value])

  const handleDownload = () => {
    if (!svgRef.current) return
    const serializer = new XMLSerializer()
    const source = serializer.serializeToString(svgRef.current)
    const blob = new Blob([source], { type: 'image/svg+xml;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'barcode.svg'
    link.click()
    URL.revokeObjectURL(url)
  }

  return (
    <ToolSection
      title="条形码生成"
      description="生成 CODE128 条形码，支持下载 SVG。"
      actions={
        <Button onClick={handleDownload}>
          下载 SVG
        </Button>
      }
    >
      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        <div className="rounded-lg border border-slate-200 bg-white px-4 py-3 dark:border-slate-800 dark:bg-slate-900">
          <svg ref={svgRef} />
        </div>
        <Input value={value} onChange={(event) => setValue(event.target.value)} className="md:w-80" />
      </div>
    </ToolSection>
  )
}

export default BarcodeGenerator
