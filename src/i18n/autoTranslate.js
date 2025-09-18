import React from 'react'
import { translateText } from './index.jsx'

if (!React.__AUTO_TRANSLATE_PATCHED__) {
  const originalCreateElement = React.createElement

  const translateChild = (child) => {
    if (typeof child === 'string') {
      return translateText(child)
    }
    if (Array.isArray(child)) {
      return child.map((item) => translateChild(item))
    }
    return child
  }

  React.createElement = (type, props, ...children) => {
    const translatedChildren = children.map((child) => translateChild(child))
    return originalCreateElement(type, props, ...translatedChildren)
  }

  React.__AUTO_TRANSLATE_PATCHED__ = true
}
