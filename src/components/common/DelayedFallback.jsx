import { useEffect, useState } from 'react'

const DelayedFallback = ({ delay = 200, children }) => {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), delay)
    return () => clearTimeout(timer)
  }, [delay])

  if (!visible) return null
  return <>{children}</>
}

export default DelayedFallback
