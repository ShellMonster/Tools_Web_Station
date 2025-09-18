import { v4 as uuidv4 } from 'uuid'

const lowercase = 'abcdefghijklmnopqrstuvwxyz'
const uppercase = lowercase.toUpperCase()
const digits = '0123456789'
const symbols = '!@#$%^&*()_+-={}[]|:;"\'<>?,./'

export function generatePassword({ length = 12, useUpper = true, useNumbers = true, useSymbols = true }) {
  let pool = lowercase
  if (useUpper) pool += uppercase
  if (useNumbers) pool += digits
  if (useSymbols) pool += symbols
  if (!pool) throw new Error('No charset selected')
  let password = ''
  const randomValues = new Uint32Array(length)
  crypto.getRandomValues(randomValues)
  for (let i = 0; i < length; i += 1) {
    const idx = randomValues[i] % pool.length
    password += pool[idx]
  }
  return password
}

export function generateUuid() {
  return uuidv4()
}

export function randomInt(min, max) {
  const range = max - min + 1
  const randomBuffer = new Uint32Array(1)
  crypto.getRandomValues(randomBuffer)
  return min + (randomBuffer[0] % range)
}
