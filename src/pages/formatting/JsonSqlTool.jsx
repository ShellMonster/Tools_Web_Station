import { useMemo, useState } from 'react'
import Button from '../../components/common/Button.jsx'
import Select from '../../components/common/Select.jsx'
import TextArea from '../../components/common/TextArea.jsx'
import ToolSection from '../../components/common/ToolSection.jsx'
import { copyToClipboard } from '../../utils/clipboard.js'
import { jsonToSql, sqlToJson } from '../../utils/sql.js'
import { useTranslation } from '../../i18n/index.jsx'

const operations = [
  { value: 'select', label: { zh: '查询 (SELECT)', en: 'Query (SELECT)' } },
  { value: 'insert', label: { zh: '新增 (INSERT)', en: 'Insert (INSERT)' } },
  { value: 'update', label: { zh: '更新 (UPDATE)', en: 'Update (UPDATE)' } },
  { value: 'delete', label: { zh: '删除 (DELETE)', en: 'Delete (DELETE)' } },
]

const JsonSqlTool = () => {
  const [jsonInput, setJsonInput] = useState('')
  const [sqlOutput, setSqlOutput] = useState('')
  const [sqlInput, setSqlInput] = useState('')
  const [jsonOutput, setJsonOutput] = useState('')
  const [mode, setMode] = useState('select')
  const [error, setError] = useState('')
  const { t, locale } = useTranslation()

  const handleJsonToSql = () => {
    try {
      const sql = jsonToSql(jsonInput, mode)
      setSqlOutput(sql)
      setError('')
    } catch (err) {
      setError(t(err.message))
    }
  }

  const handleSqlToJson = () => {
    try {
      const result = sqlToJson(sqlInput)
      setJsonOutput(JSON.stringify(result, null, 2))
      setError('')
    } catch (err) {
      setError(t(err.message))
    }
  }

  const handleClear = () => {
    setJsonInput('')
    setSqlOutput('')
    setSqlInput('')
    setJsonOutput('')
    setError('')
  }

  return (
    <div className="space-y-6">
      <ToolSection
        title="JSON ↔ SQL 转换"
        description="将结构化 JSON 转为常见 SQL 语句，支持 SELECT / INSERT / UPDATE / DELETE；也能解析简单 SQL 为 JSON 结构。"
        actions={
          <div className="flex flex-wrap items-center gap-2">
            <Select value={mode} onChange={(event) => setMode(event.target.value)} className="w-48">
              {operations.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label[locale]}
                </option>
              ))}
            </Select>
            <Button onClick={handleJsonToSql} disabled={!jsonInput.trim()}>
              JSON → SQL
            </Button>
            <Button variant="secondary" onClick={handleSqlToJson} disabled={!sqlInput.trim()}>
              SQL → JSON
            </Button>
            <Button variant="ghost" onClick={handleClear}>
              清空
            </Button>
          </div>
        }
      >
        <div className="grid gap-6 lg:grid-cols-2">
          <div>
            <h3 className="text-sm font-medium text-slate-600 dark:text-slate-300">{t('JSON 输入')}</h3>
            <TextArea
              className="mt-2 h-72 font-mono"
              placeholder={`示例：\n{\n  "table": "users",\n  "columns": ["id", "name"],\n  "where": [\n    {"field": "status", "operator": "=", "value": "active"}\n  ],\n  "limit": 20\n}`}
              value={jsonInput}
              onChange={(event) => setJsonInput(event.target.value)}
            />
            <div className="mt-2 flex gap-2">
              <Button variant="secondary" onClick={() => copyToClipboard(jsonInput)} disabled={!jsonInput}>
                复制输入
              </Button>
              <Button
                variant="ghost"
                onClick={() =>
                  setJsonInput(`{
  "table": "orders",
  "columns": ["id", "total", "user_id"],
  "where": [
    { "field": "status", "operator": "=", "value": "paid" },
    { "field": "total", "operator": ">", "value": 100, "logical": "AND" }
  ],
  "orderBy": { "field": "created_at", "direction": "DESC" },
  "limit": 20
}`)
                }
              >
                载入示例
              </Button>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-medium text-slate-600 dark:text-slate-300">{t('SQL 结果')}</h3>
            <TextArea className="mt-2 h-72 font-mono" value={sqlOutput} readOnly placeholder="转换结果将在此显示" />
            <div className="mt-2 flex gap-2">
              <Button variant="secondary" onClick={() => copyToClipboard(sqlOutput)} disabled={!sqlOutput}>
                复制 SQL
              </Button>
            </div>
          </div>
        </div>
      </ToolSection>

      <ToolSection title="SQL ↔ JSON 解析">
        <div className="grid gap-6 lg:grid-cols-2">
          <div>
            <h3 className="text-sm font-medium text-slate-600 dark:text-slate-300">{t('SQL 输入')}</h3>
            <TextArea
              className="mt-2 h-72 font-mono"
              placeholder={`SELECT id, name FROM users WHERE status = 'active';`}
              value={sqlInput}
              onChange={(event) => setSqlInput(event.target.value)}
            />
            <div className="mt-2 flex gap-2">
              <Button variant="secondary" onClick={() => copyToClipboard(sqlInput)} disabled={!sqlInput}>
                复制输入
              </Button>
              <Button
                variant="ghost"
                onClick={() =>
                  setSqlInput("INSERT INTO users (name, email) VALUES ('Alice', 'alice@example.com');")
                }
              >
                载入示例
              </Button>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-medium text-slate-600 dark:text-slate-300">{t('JSON 结果')}</h3>
            <TextArea className="mt-2 h-72 font-mono" value={jsonOutput} readOnly placeholder="解析结果将在此显示" />
            <div className="mt-2 flex gap-2">
              <Button variant="secondary" onClick={() => copyToClipboard(jsonOutput)} disabled={!jsonOutput}>
                复制 JSON
              </Button>
            </div>
          </div>
        </div>
        {error ? <p className="mt-4 text-sm text-red-500">{error}</p> : null}
        <JsonStructureHelp locale={locale} />
      </ToolSection>
    </div>
  )
}

const JsonStructureHelp = ({ locale }) => {
  const isEnglish = locale === 'en'

  const referenceItems = useMemo(
    () =>
      isEnglish
        ? [
            {
              label: 'SELECT:',
              description: (
                <>
                  Required field <code className="whitespace-pre">table</code>; optional{' '}
                  <code>columns</code>, <code>where</code> (object or array), <code>orderBy</code>, <code>limit</code>,
                  and <code>offset</code>.
                </>
              ),
            },
            {
              label: 'INSERT:',
              description: (
                <>
                  Provide <code>values</code> as an object or array. Keys are mapped to column names automatically.
                </>
              ),
            },
            {
              label: 'UPDATE:',
              description: (
                <>
                  Use <code>set</code> for columns to update and <code>where</code> for conditions. The tool warns when
                  WHERE is missing.
                </>
              ),
            },
            {
              label: 'DELETE:',
              description: (
                <>
                  Always include a <code>where</code> clause to avoid deleting entire tables.
                </>
              ),
            },
          ]
        : [
            {
              label: 'SELECT：',
              description: (
                <>
                  必填字段 <code className="whitespace-pre">table</code>；可选 <code>columns</code>、<code>where</code>{' '}
                  (对象或数组)、<code>orderBy</code>、<code>limit</code>、<code>offset</code>。
                </>
              ),
            },
            {
              label: 'INSERT：',
              description: (
                <>
                  使用 <code>values</code> 指定对象或对象数组，字段名将自动映射列名。
                </>
              ),
            },
            {
              label: 'UPDATE：',
              description: (
                <>
                  通过 <code>set</code> 指定要更新的列，<code>where</code> 描述条件；工具会提醒缺失 WHERE 的风险。
                </>
              ),
            },
            {
              label: 'DELETE：',
              description: (
                <>
                  必须包含 <code>where</code> 条件，避免误删整表。
                </>
              ),
            },
          ],
    [isEnglish],
  )

  return (
    <div className="mt-6 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-xs leading-relaxed text-slate-500 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300">
      <p className="font-semibold text-slate-600 dark:text-slate-200">
        {isEnglish ? 'JSON structure reference:' : 'JSON 结构参考：'}
      </p>
      <ul className="mt-2 space-y-2">
        {referenceItems.map((item) => (
          <li key={item.label}>
            <span className="font-medium">{item.label}</span> {item.description}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default JsonSqlTool
