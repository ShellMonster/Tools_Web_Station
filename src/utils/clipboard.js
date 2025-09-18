export async function copyToClipboard(value) {
  try {
    await navigator.clipboard.writeText(value)
    return true
  } catch (error) {
    console.error('Clipboard copy failed', error)
    return false
  }
}
