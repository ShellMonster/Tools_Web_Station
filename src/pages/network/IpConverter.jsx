import { useState } from 'react'
import Button from '../../components/common/Button.jsx'
import Input from '../../components/common/Input.jsx'
import ToolSection from '../../components/common/ToolSection.jsx'
import { ipv4ToNumber, numberToIpv4 } from '../../utils/network.js'
import { useTranslation } from '../../i18n/index.jsx'

const isValidIpv4 = (value) => /^((25[0-5]|2[0-4]\d|[01]?\d?\d)\.){3}(25[0-5]|2[0-4]\d|[01]?\d?\d)$/.test(value)

const IpConverter = () => {
  const [ip, setIp] = useState('')
  const [number, setNumber] = useState('')
  const [error, setError] = useState('')
  const { t } = useTranslation()

  const handleIpToNumber = () => {
    if (!isValidIpv4(ip)) {
      setError(t('请输入合法的 IPv4 地址'))
      return
    }
    setError('')
    setNumber(String(ipv4ToNumber(ip)))
  }

  const handleNumberToIp = () => {
    const value = Number(number)
    if (!Number.isInteger(value) || value < 0 || value > 4294967295) {
      setError(t('请输入合法的整数 (0 - 4294967295)'))
      return
    }
    setError('')
    setIp(numberToIpv4(value))
  }

  return (
    <ToolSection
      title="IP 地址转换"
      description="在 IPv4 与整数之间转换，便于网络调试存储。"
      actions={
        <Button variant="secondary" onClick={() => { setIp(''); setNumber(''); setError('') }}>
          清空
        </Button>
      }
    >
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <Input placeholder="IPv4 地址" value={ip} onChange={(event) => setIp(event.target.value)} />
          <div className="mt-2 flex gap-2">
            <Button onClick={handleIpToNumber} disabled={!ip.trim()}>
              转换为整数
            </Button>
          </div>
        </div>
        <div>
          <Input placeholder="整数" value={number} onChange={(event) => setNumber(event.target.value)} />
          <div className="mt-2 flex gap-2">
            <Button onClick={handleNumberToIp} disabled={!number.trim()}>
              转换为 IPv4
            </Button>
          </div>
        </div>
      </div>
      {error ? <p className="mt-3 text-sm text-red-500">{error}</p> : null}
    </ToolSection>
  )
}

export default IpConverter
