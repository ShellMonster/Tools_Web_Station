let yamlModulePromise
let tomlModulePromise
let papaModulePromise
let beautifyModulePromise
let sqlFormatterPromise
let xmlFormatterPromise
let htmlEntitiesPromise

const loadYaml = async () => {
  if (!yamlModulePromise) yamlModulePromise = import('yaml')
  return yamlModulePromise
}

const loadToml = async () => {
  if (!tomlModulePromise) tomlModulePromise = import('@ltd/j-toml')
  return tomlModulePromise
}

const loadPapa = async () => {
  if (!papaModulePromise) papaModulePromise = import('papaparse')
  return papaModulePromise
}

const loadBeautify = async () => {
  if (!beautifyModulePromise) beautifyModulePromise = import('js-beautify')
  return beautifyModulePromise
}

const loadSqlFormatter = async () => {
  if (!sqlFormatterPromise) sqlFormatterPromise = import('sql-formatter')
  return sqlFormatterPromise
}

const loadXmlFormatter = async () => {
  if (!xmlFormatterPromise) xmlFormatterPromise = import('xml-formatter')
  return xmlFormatterPromise
}

const loadHtmlEntities = async () => {
  if (!htmlEntitiesPromise) htmlEntitiesPromise = import('he')
  return htmlEntitiesPromise
}

export function formatJson(value) {
  const parsed = JSON.parse(value)
  return JSON.stringify(parsed, null, 2)
}

export function minifyJson(value) {
  const parsed = JSON.parse(value)
  return JSON.stringify(parsed)
}

export function validateJson(value) {
  try {
    JSON.parse(value)
    return { valid: true }
  } catch (error) {
    return { valid: false, message: error.message }
  }
}

export async function formatYaml(yamlString) {
  const { default: YAML } = await loadYaml()
  const doc = YAML.parse(yamlString)
  return YAML.stringify(doc)
}

export async function yamlToJson(yamlString) {
  const { default: YAML } = await loadYaml()
  const doc = YAML.parse(yamlString)
  return JSON.stringify(doc, null, 2)
}

export async function jsonToYaml(jsonString) {
  const { default: YAML } = await loadYaml()
  const doc = JSON.parse(jsonString)
  return YAML.stringify(doc)
}

export async function tomlToJson(tomlString) {
  const { parse: parseToml } = await loadToml()
  const doc = parseToml(tomlString, { joiner: '\n', bigint: false })
  return JSON.stringify(doc, null, 2)
}

export async function jsonToToml(jsonString) {
  const { stringify: stringifyToml } = await loadToml()
  const doc = JSON.parse(jsonString)
  return stringifyToml(doc, {
    newline: '\n',
    indent: '  ',
    sort: false,
  })
}

export async function csvToJson(csvString) {
  const { default: Papa } = await loadPapa()
  const parsed = Papa.parse(csvString.trim(), { header: true, skipEmptyLines: true })
  return JSON.stringify(parsed.data, null, 2)
}

export async function jsonToCsv(jsonString) {
  const { default: Papa } = await loadPapa()
  const data = JSON.parse(jsonString)
  return Papa.unparse(data)
}

export async function formatHtml(value) {
  const beautify = await loadBeautify()
  return beautify.html(value, { indent_size: 2, wrap_line_length: 120 })
}

export async function formatCss(value) {
  const beautify = await loadBeautify()
  return beautify.css(value, { indent_size: 2 })
}

export async function formatJavascript(value) {
  const beautify = await loadBeautify()
  return beautify.js(value, { indent_size: 2 })
}

export function minifyHtml(value) {
  return value
    .replace(/<!--[^]*?-->/g, '')
    .replace(/>\s+</g, '><')
    .replace(/\s{2,}/g, ' ')
    .trim()
}

export function minifyCss(value) {
  return value
    .replace(/\/\*[^]*?\*\//g, '')
    .replace(/\s*([{}:;,])\s*/g, '$1')
    .replace(/;}/g, '}')
    .replace(/\s+/g, ' ')
    .trim()
}

export function minifyJavascript(value) {
  return value
    .replace(/\/\/.*$/gm, '')
    .replace(/\/\*[^]*?\*\//g, '')
    .replace(/\s+/g, ' ')
    .replace(/\s*([=+\-*/{}();,:<>])\s*/g, '$1')
    .trim()
}

export async function formatXml(value) {
  const { default: xmlFormat } = await loadXmlFormatter()
  return xmlFormat(value, {
    indentation: '  ',
    collapseContent: true,
    lineSeparator: '\n',
  })
}

export function minifyXml(value) {
  return value
    .replace(/>\s+</g, '><')
    .replace(/\s{2,}/g, ' ')
    .trim()
}

export async function encodeHtmlEntities(value) {
  const { default: he } = await loadHtmlEntities()
  return he.encode(value)
}

export async function decodeHtmlEntities(value) {
  const { default: he } = await loadHtmlEntities()
  return he.decode(value)
}

export async function formatSql(value) {
  const { format: sqlFormat } = await loadSqlFormatter()
  return sqlFormat(value, { language: 'sql' })
}
