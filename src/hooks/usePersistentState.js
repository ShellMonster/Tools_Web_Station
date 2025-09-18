import { useCallback, useMemo, useRef, useState } from 'react'

const isBrowser = typeof window !== 'undefined'

const readStorage = (key) => {
  if (!isBrowser) return null
  try {
    return window.localStorage.getItem(key)
  } catch (error) {
    console.warn('[usePersistentState] Failed to read storage', error)
    return null
  }
}

const writeStorage = (key, value) => {
  if (!isBrowser) return
  try {
    window.localStorage.setItem(key, JSON.stringify(value))
  } catch (error) {
    console.warn('[usePersistentState] Failed to write storage', error)
  }
}

export const usePersistentState = (key, initializer) => {
  const initializerRef = useRef(initializer)

  const getInitialValue = useCallback(() => {
    const init = initializerRef.current
    const fallback = typeof init === 'function' ? init() : init

    const stored = readStorage(key)
    if (stored == null) return fallback
    try {
      return JSON.parse(stored)
    } catch (error) {
      console.warn('[usePersistentState] Failed to parse storage', error)
      return fallback
    }
  }, [key])

  const [state, setState] = useState(getInitialValue)

  useMemo(() => {
    initializerRef.current = initializer
  }, [initializer])

  const setPersistedState = useCallback(
    (value) => {
      setState((prev) => {
        const next = typeof value === 'function' ? value(prev) : value
        writeStorage(key, next)
        return next
      })
    },
    [key],
  )

  const resetState = useCallback(() => {
    const init = initializerRef.current
    const next = typeof init === 'function' ? init() : init
    writeStorage(key, next)
    setState(next)
  }, [key])

  return [state, setPersistedState, resetState]
}

export default usePersistentState
