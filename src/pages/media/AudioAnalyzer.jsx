import { useEffect, useRef, useState } from 'react'
import ToolSection from '../../components/common/ToolSection.jsx'
import { useTranslation } from '../../i18n/index.jsx'

const AudioAnalyzer = () => {
  const [audioUrl, setAudioUrl] = useState('')
  const audioRef = useRef(null)
  const canvasRef = useRef(null)
  const animationRef = useRef(null)
  const analyserRef = useRef(null)
  const { t } = useTranslation()

  useEffect(() => {
    if (!audioUrl || !audioRef.current) return undefined
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)()
    const source = audioCtx.createMediaElementSource(audioRef.current)
    const analyser = audioCtx.createAnalyser()
    analyser.fftSize = 256
    source.connect(analyser)
    analyser.connect(audioCtx.destination)
    analyserRef.current = analyser

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const bufferLength = analyser.frequencyBinCount
    const dataArray = new Uint8Array(bufferLength)

    const draw = () => {
      analyser.getByteFrequencyData(dataArray)
      ctx.fillStyle = '#0f172a'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      const barWidth = (canvas.width / bufferLength) * 2.5
      let x = 0
      for (let i = 0; i < bufferLength; i += 1) {
        const barHeight = dataArray[i]
        ctx.fillStyle = `hsl(${(i / bufferLength) * 180 + 200}, 80%, 60%)`
        ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight)
        x += barWidth + 1
      }
      animationRef.current = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      cancelAnimationFrame(animationRef.current)
      analyser.disconnect()
      source.disconnect()
      audioCtx.close()
    }
  }, [audioUrl])

  return (
    <ToolSection
      title="音频频率分析"
      description="上传音频文件，实时查看频谱变化。"
    >
      <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-dashed border-slate-300 bg-white px-4 py-3 text-sm text-slate-600 shadow-sm transition hover:border-primary hover:text-primary dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-primary/80">
        <span>📁 {t('选择音频文件')}</span>
        <input
          type="file"
          accept="audio/*"
          onChange={(event) => {
            const file = event.target.files?.[0]
            if (!file) return
            const url = URL.createObjectURL(file)
            setAudioUrl(url)
          }}
          className="hidden"
        />
      </label>
      {audioUrl ? (
        <div className="mt-4 space-y-3">
          <audio ref={audioRef} src={audioUrl} controls className="w-full" />
          <canvas ref={canvasRef} width={640} height={220} className="w-full rounded-lg border border-slate-200 bg-slate-900 dark:border-slate-800" />
        </div>
      ) : null}
    </ToolSection>
  )
}

export default AudioAnalyzer
